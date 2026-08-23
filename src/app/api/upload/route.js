import { put } from "@vercel/blob";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!(await isAuthed())) {
    return Response.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return Response.json({ ok: false, error: "Dosya yok" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const name = `uploads/${Date.now()}-${Math.floor(Math.random() * 10000)}.${safeExt}`;

  const blob = await put(name, file, {
    access: "public",
    token: process.env.BLOB2_READ_WRITE_TOKEN,
  });

  return Response.json({ ok: true, path: blob.url });
}