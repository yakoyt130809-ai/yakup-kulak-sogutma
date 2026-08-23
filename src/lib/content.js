import { put, list } from "@vercel/blob";
import fallbackData from "../../data/content.json";

const FILENAME = "content.json";
const BLOB_TOKEN = process.env.BLOB2_READ_WRITE_TOKEN;

export async function getContent() {
  try {
    const { blobs } = await list({ prefix: FILENAME, limit: 1, token: BLOB_TOKEN });
    if (blobs.length === 0) {
      return fallbackData;
    }
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    return res.json();
  } catch (err) {
    console.error("Blob okuma hatası, yedek veri kullanılıyor:", err);
    return fallbackData;
  }
}

export async function saveContent(data) {
  await put(FILENAME, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    token: BLOB_TOKEN,
  });
}