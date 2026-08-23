import { cookies } from "next/headers";

export const COOKIE_NAME = "yk_admin";
export const SECRET = process.env.ADMIN_SECRET || "yk-sogutma-gizli-anahtar";

// İstek yapan kişi admin olarak giriş yapmış mı?
export async function isAuthed() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === SECRET;
}
