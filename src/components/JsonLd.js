// Google'ın işletmeyi ve hizmetleri anlaması için yapısal veri (Schema.org).
import { getServicePageById } from "@/lib/service-pages";

export default function JsonLd({ content, siteUrl }) {
  const { site, services, faq, serviceAreas } = content;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${siteUrl}/#isletme`,
    name: site.businessName,
    description: site.metaDescription,
    telephone: site.phoneRaw,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    priceRange: "₺₺",
    knowsAbout: [
      "Ticari soğutma",
      "Endüstriyel soğutma",
      "Sanayi tipi buzdolabı tamiri",
      "Market dolabı tamiri",
      "Soğuk oda tamiri",
      "Sütlük dolabı tamiri",
      "Kasap dolabı tamiri",
      "Pastane dolabı tamiri",
      "Soğutma kompresörü",
    ],
    founder: {
      "@type": "Person",
      "@id": `${siteUrl}/hakkimizda#yakup-kulak`,
      name: "Yakup Kulak",
      url: `${siteUrl}/hakkimizda`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Fatih",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    areaServed: serviceAreas.areas.map((a) => ({
      "@type": "City",
      name: a,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soğutma Tamir Hizmetleri",
      itemListElement: services.map((s) => {
        const servicePage = getServicePageById(s.id);
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.description,
            url: servicePage ? `${siteUrl}/hizmetler/${servicePage.slug}` : siteUrl,
            provider: { "@id": `${siteUrl}/#isletme` },
            areaServed: "İstanbul",
          },
        };
      }),
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.businessName,
    alternateName: "İstanbul Ticari Soğutma Servisi",
    description: site.metaDescription,
    inLanguage: "tr-TR",
    publisher: { "@id": `${siteUrl}/#isletme` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
