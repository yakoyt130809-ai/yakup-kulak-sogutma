import { v2 as cloudinary } from "cloudinary";
import fallbackData from "../../data/content.json";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const CONTENT_URL = `https://res.cloudinary.com/${cloudName}/raw/upload/site-content.json`;

export async function getContent() {
  try {
    const res = await fetch(`${CONTENT_URL}?t=${Date.now()}`, { cache: "no-store" });
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
  const json = JSON.stringify(data, null, 2);
  const base64 = Buffer.from(json).toString("base64");
  const dataUri = `data:application/json;base64,${base64}`;

  await cloudinary.uploader.upload(dataUri, {
    resource_type: "raw",
    public_id: "site-content.json",
    overwrite: true,
    invalidate: true,
  });
}