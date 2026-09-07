import { SITE_URL } from "@/lib/site";
import { SERVICE_PAGES } from "@/lib/service-pages";

export default function sitemap() {
  const home = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${SITE_URL}/portfolio-generated/market-soguk-oda.png`,
        `${SITE_URL}/portfolio-generated/kasap-teshir-dolabi.png`,
        `${SITE_URL}/portfolio-generated/pastane-dolabi.png`,
        `${SITE_URL}/portfolio-generated/sanayi-tipi-buzdolabi.png`,
        `${SITE_URL}/portfolio-generated/sut-sogutma-tanki.png`,
        `${SITE_URL}/portfolio-generated/kompresor-degisimi.png`,
      ],
    },
  ];

  const services = SERVICE_PAGES.map((service) => ({
    url: `${SITE_URL}/hizmetler/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE_URL}${service.image}`],
  }));

  return [...home, ...services];
}
