import fallbackData from "../../data/content.json";
import { getCloudinary, getCloudName } from "@/lib/cloudinary";
import { HOME_META_TITLE, LEGACY_HOME_META_TITLE } from "@/lib/site";

const CONTENT_PUBLIC_ID = "site-content.json";

function contentUrl() {
  return `https://res.cloudinary.com/${getCloudName()}/raw/upload/${CONTENT_PUBLIC_ID}`;
}

// Cloudinary'deki eski kişi odaklı başlığı, hizmet odaklı güncel başlığa geçirir.
// Panelden daha sonra farklı bir başlık yazılırsa kullanıcının tercihi korunur.
function normalizeSeoContent(data) {
  if (!data || typeof data !== "object") return fallbackData;

  let normalized = data;

  if (normalized.site?.metaTitle === LEGACY_HOME_META_TITLE) {
    normalized = {
      ...normalized,
      site: { ...normalized.site, metaTitle: HOME_META_TITLE },
    };
  }

  const currentServices = Array.isArray(normalized.services) ? normalized.services : [];
  const missingServices = fallbackData.services.filter(
    (fallbackService) => !currentServices.some((service) => service.id === fallbackService.id),
  );
  if (missingServices.length > 0) {
    normalized = {
      ...normalized,
      services: [...missingServices, ...currentServices],
    };
  }

  const legacyAboutParagraph =
    "Yakup Kulak olarak 30 yılı aşkın süredir İstanbul'da ticari ve sanayi tipi soğutma sistemlerinin kurulumu, tamiri ve bakımını yapıyoruz. Soğuk oda, kasap teşhir dolabı, pastane dolabı, süt soğutma tankı ve sanayi tipi buzdolaplarında marka fark etmeksizin her arızaya çözüm üretiyoruz.";
  if (normalized.about?.paragraphs?.[0] === legacyAboutParagraph) {
    normalized = {
      ...normalized,
      about: {
        ...normalized.about,
        paragraphs: [fallbackData.about.paragraphs[0], ...normalized.about.paragraphs.slice(1)],
      },
    };
  }

  return normalized;
}

export async function getContent() {
  try {
    const res = await fetch(`${contentUrl()}?v=${Date.now()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.error("Cloudinary content okunamadı, status:", res.status, res.statusText);
      return fallbackData;
    }
    return normalizeSeoContent(await res.json());
  } catch (err) {
    console.error("Cloudinary okuma hatası, yedek veri kullanılıyor:", err);
    return normalizeSeoContent(fallbackData);
  }
}

export async function saveContent(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Gecersiz icerik verisi.");
  }

  const json = JSON.stringify(data, null, 2);
  const base64 = Buffer.from(json).toString("base64");
  const dataUri = `data:application/json;base64,${base64}`;

  const result = await getCloudinary().uploader.upload(dataUri, {
    resource_type: "raw",
    public_id: CONTENT_PUBLIC_ID,
    overwrite: true,
    invalidate: true,
  });

  if (!result?.secure_url) {
    throw new Error("Cloudinary kayit yanitinda dosya adresi yok.");
  }

  const verification = await fetch(`${result.secure_url}?v=${result.version}`, {
    cache: "no-store",
  });
  if (!verification.ok) {
    throw new Error(`Kaydedilen icerik dogrulanamadi (${verification.status}).`);
  }
  await verification.json();
}
