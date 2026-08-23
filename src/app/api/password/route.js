import { isAuthed } from "@/lib/auth";
import { verifyPassword, setPassword } from "@/lib/settings";

export const dynamic = "force-dynamic";

// Admin şifresini değiştirir (giriş yapmış olmak + mevcut şifreyi bilmek gerekir).
export async function POST(request) {
  if (!(await isAuthed())) {
    return Response.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
  }

  const { current, next } = await request.json();

  if (!next || String(next).length < 4) {
    return Response.json(
      { ok: false, error: "Yeni şifre en az 4 karakter olmalı." },
      { status: 400 }
    );
  }

  if (!(await verifyPassword(current))) {
    return Response.json(
      { ok: false, error: "Mevcut şifre hatalı." },
      { status: 401 }
    );
  }

  await setPassword(next);
  return Response.json({ ok: true });
}
