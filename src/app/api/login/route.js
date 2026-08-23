import { cookies } from "next/headers";
import { COOKIE_NAME, SECRET } from "@/lib/auth";
import { verifyPassword } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const { password } = await request.json();

  if (!(await verifyPassword(password))) {
    return Response.json({ ok: false, error: "Şifre hatalı" }, { status: 401 });
  }

  const store = await cookies();
  store.set(COOKIE_NAME, SECRET, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 gün
  });

  return Response.json({ ok: true });
}
