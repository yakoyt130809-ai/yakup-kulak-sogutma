import fs from "fs/promises";
import path from "path";

const FILE = path.join(process.cwd(), "data", "content.json");

// İçeriği JSON dosyasından okur (site her yerde bunu kullanır).
export async function getContent() {
  const raw = await fs.readFile(FILE, "utf-8");
  return JSON.parse(raw);
}

// İçeriği JSON dosyasına kaydeder (admin paneli bunu kullanır).
export async function saveContent(data) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf-8");
}
