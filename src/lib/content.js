import fallbackData from "../../data/content.json";
import { get, put } from "@vercel/blob";
import { getCloudinary, getCloudName } from "@/lib/cloudinary";

const CONTENT_PUBLIC_ID = "site-content.json";
const BLOB_PATH = "site-content.json";

function blobOptions() {
  const token = process.env.BLOB2_READ_WRITE_TOKEN;
  if (!token) return null;
  return { access: "public", token };
}

function contentUrl() {
  return `https://res.cloudinary.com/${getCloudName()}/raw/upload/${CONTENT_PUBLIC_ID}`;
}

export async function getContent() {
  const blob = blobOptions();
  if (blob) {
    try {
      const result = await get(BLOB_PATH, { ...blob, useCache: false });
      if (result) return await new Response(result.stream).json();
    } catch (err) {
      console.error("Vercel Blob okuma hatasi, Cloudinary deneniyor:", err);
    }
  }

  try {
    const res = await fetch(`${contentUrl()}?v=${Date.now()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error("Cloudinary content okunamadı, status:", res.status, res.statusText);
      return fallbackData;
    }
    return await res.json();
  } catch (err) {
    console.error("Cloudinary okuma hatası, yedek veri kullanılıyor:", err);
    return fallbackData;
  }
}

export async function saveContent(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Gecersiz icerik verisi.");
  }

  const json = JSON.stringify(data, null, 2);
  const blob = blobOptions();

  if (blob) {
    await put(BLOB_PATH, json, {
      ...blob,
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: "application/json; charset=utf-8",
    });

    const verification = await get(BLOB_PATH, { ...blob, useCache: false });
    if (!verification) throw new Error("Vercel Blob kaydi dogrulanamadi.");
    await new Response(verification.stream).json();
    return;
  }

  const base64 = Buffer.from(json).toString("base64");
  const dataUri = `data:application/json;base64,${base64}`;

  const result = await getCloudinary().uploader.upload(dataUri, {
    resource_type: "raw",
    public_id: CONTENT_PUBLIC_ID,
    overwrite: true,
    invalidate: true,
  });

  if (!result?.secure_url) {
    throw new Error("Cloudinary kayit yanitinda dosya adresi yok.");
  }

  const verification = await fetch(`${result.secure_url}?v=${result.version}`, {
    cache: "no-store",
  });
  if (!verification.ok) {
    throw new Error(`Kaydedilen icerik dogrulanamadi (${verification.status}).`);
  }
  await verification.json();
}
