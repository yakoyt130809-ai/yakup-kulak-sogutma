import fallbackData from "../../data/content.json";
import { getCloudinary, getCloudName } from "@/lib/cloudinary";

const CONTENT_PUBLIC_ID = "site-content.json";

function contentUrl() {
  return `https://res.cloudinary.com/${getCloudName()}/raw/upload/${CONTENT_PUBLIC_ID}`;
}

export async function getContent() {
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
