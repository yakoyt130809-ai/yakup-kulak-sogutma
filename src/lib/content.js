import fallbackData from "../../data/content.json";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const CONTENT_URL = `https://res.cloudinary.com/${cloudName}/raw/upload/site-content.json`;

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

export async function saveContent(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  const uploadForm = new FormData();
  uploadForm.append("file", blob, "site-content.json");
  uploadForm.append("upload_preset", "site_uploads");
  uploadForm.append("public_id", "site-content");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
    method: "POST",
    body: uploadForm,
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error?.message || "Kaydetme başarısız");
  }
}