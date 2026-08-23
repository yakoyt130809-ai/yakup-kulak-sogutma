import { getContent } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const { services } = await getContent();
  const now = new Date();

  const base = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  // Her hizmet ana sayfada bir bölüm (anchor) olduğu için onları da ekliyoruz.
  const serviceUrls = services.map((s) => ({
    url: `${SITE_URL}/#${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...base, ...serviceUrls];
}
