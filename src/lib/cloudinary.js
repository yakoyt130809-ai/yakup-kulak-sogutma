import { v2 as cloudinary } from "cloudinary";

let configured = false;

export function getCloudinary() {
  if (!configured) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName || apiKey || apiSecret) {
      if (!cloudName || !apiKey || !apiSecret) {
        throw new Error(
          "Cloudinary ayarlari eksik: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY ve CLOUDINARY_API_SECRET birlikte tanimlanmali."
        );
      }
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    } else if (!process.env.CLOUDINARY_URL) {
      throw new Error(
        "Cloudinary ayari bulunamadi. CLOUDINARY_URL veya uc ayri CLOUDINARY_* degiskenini tanimlayin."
      );
    }

    configured = true;
  }

  return cloudinary;
}

export function getCloudName() {
  const instance = getCloudinary();
  const cloudName = instance.config("cloud_name");
  if (!cloudName) throw new Error("Cloudinary cloud_name ayari okunamadi.");
  return cloudName;
}
