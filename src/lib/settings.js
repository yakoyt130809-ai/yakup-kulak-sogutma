import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const FILE = path.join(process.cwd(), "data", "settings.json");

// Ayarları okur (yoksa boş obje döner).
export async function getSettings() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Ayarları kaydeder.
export async function saveSettings(data) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Şifreyi scrypt ile hashler (düz metin saklamayız).
export function hashPassword(password, salt) {
  const useSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), useSalt, 64).toString("hex");
  return { salt: useSalt, hash };
}

// Girilen şifre doğru mu? Önce settings.json'daki hash'e, yoksa .env'deki
// ADMIN_PASSWORD'a bakar (ilk kurulum kolaylığı için).
export async function verifyPassword(password) {
  const s = await getSettings();
  if (s.passwordHash && s.passwordSalt) {
    const { hash } = hashPassword(password, s.passwordSalt);
    const a = Buffer.from(hash, "hex");
    const b = Buffer.from(s.passwordHash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }
  const envPw = process.env.ADMIN_PASSWORD || "yakupkulak2024";
  return String(password) === envPw;
}

// Yeni şifreyi kaydeder.
export async function setPassword(newPassword) {
  const s = await getSettings();
  const { salt, hash } = hashPassword(newPassword);
  await saveSettings({ ...s, passwordSalt: salt, passwordHash: hash });
}
