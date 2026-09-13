import { isAuthed } from "@/lib/auth";
import { getClickStats, isClickType, recordClick } from "@/lib/click-stats";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await isAuthed())) {
    return Response.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const stats = await getClickStats();
    return Response.json(
      { ok: true, stats },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Tiklama sayaclari okunamadi:", error);
    return Response.json(
      { ok: false, error: "Sayaçlar okunamadı." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "Gecersiz istek." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 1024) {
    return Response.json({ ok: false, error: "Istek cok buyuk." }, { status: 413 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Gecersiz istek govdesi." },
      { status: 400 },
    );
  }

  const { type, page } = body;
  if (!isClickType(type)) {
    return Response.json(
      { ok: false, error: "Gecersiz tiklama turu." },
      { status: 400 },
    );
  }

  try {
    await recordClick(type, page);
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Tiklama kaydedilemedi:", error);
    return Response.json(
      { ok: false, error: "Tiklama kaydedilemedi." },
      { status: 500 },
    );
  }
}
