import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  return [
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
}
