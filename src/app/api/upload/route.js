import fs from "fs/promises";
import path from "path";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Fotoğraf yükler, /public/uploads içine kaydeder, yolunu döner.
export async function POST(request) {
  if (!(await isAuthed())) {
    return Response.json({ ok: false, error: "Yetkisiz" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return Response.json({ ok: false, error: "Dosya yok" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const name = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${safeExt}`;

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), bytes);

  return Response.json({ ok: true, path: `/uploads/${name}` });
}
