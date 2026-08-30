import { isAuthed } from "@/lib/auth";
import { getCloudName } from "@/lib/cloudinary";

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

  let cloudName;
  try {
    cloudName = getCloudName();
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
  const uploadForm = new FormData();
  uploadForm.append("file", file);
  uploadForm.append("upload_preset", "site_uploads");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadForm,
  });

  const result = await res.json();
  if (!res.ok) {
    return Response.json({ ok: false, error: result.error?.message || "Yükleme başarısız" }, { status: 500 });
  }

  return Response.json({ ok: true, path: result.secure_url });
}
