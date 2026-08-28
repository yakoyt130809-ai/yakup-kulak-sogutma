import { v2 as cloudinary } from "cloudinary";
import fallbackData from "../../data/content.json";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CONTENT_URL = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/site-content.json`;

// İçeriği Cloudinary'den okur. Orada yoksa/hata varsa projeyle gelen
// yedek veriyi kullanır, site asla çökmez.
export async function getContent() {
  try {
    const res = await fetch(CONTENT_URL, { cache: "no-store" });
    if (!res.ok) return fallbackData;
    return await res.json();
  } catch (err) {
    console.error("Cloudinary okuma hatası, yedek veri kullanılıyor:", err);
    return fallbackData;
  }
}

// İçeriği Cloudinary'ye kaydeder (admin paneli bunu kullanır).
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