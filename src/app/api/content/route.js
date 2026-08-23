import { getContent, saveContent } from "@/lib/content";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

// İçeriği getir (herkese açık — site de bunu kullanabilir).
export async function GET() {
  const content = await getContent();
  return Response.json(content);
}

// İçeriği kaydet (sadece giriş yapmış admin).
export async function PUT(request) {
  if (!(await isAuthed())) {
    return Response.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
  }
  try {
    const data = await request.json();
    await saveContent(data);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { ok: false, error: "Kaydedilemedi: " + e.message },
      { status: 500 }
    );
  }
}
