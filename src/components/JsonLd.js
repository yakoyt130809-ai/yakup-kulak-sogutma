// Google'ın işletmeyi ve hizmetleri anlaması için yapısal veri (Schema.org).
export default function JsonLd({ content, siteUrl }) {
  const { site, services, faq, serviceAreas } = content;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: site.businessName,
    description: site.metaDescription,
    telephone: site.phoneRaw,
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "İstanbul",
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
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
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
    </>
  );
}
