import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import { getContent } from "@/lib/content";
import { AREA_PAGES, getAreaPage } from "@/lib/area-pages";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/site";
import { generalMessage, waLink } from "@/lib/wa";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return AREA_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = getAreaPage(slug);

  if (!area) {
    return { title: "Bölge Bulunamadı", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/servis-bolgeleri/${area.slug}`;
  const socialImage = `${SITE_URL}/opengraph-image`;

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: "SoğukServis",
      title: `${area.metaTitle} | SoğukServis`,
      description: area.metaDescription,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${area.metaTitle} | SoğukServis`,
      description: area.metaDescription,
      images: [socialImage],
    },
  };
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function AreaJsonLd({ area, site }) {
  const url = `${SITE_URL}/servis-bolgeleri/${area.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}/#yerel-servis`,
      name: area.title,
      description: area.metaDescription,
      url,
      serviceType: "Ticari soğutma sistemleri tamir ve bakım servisi",
      provider: {
        "@type": "HVACBusiness",
        "@id": `${SITE_URL}/#isletme`,
        name: site.businessName,
        telephone: site.phoneRaw,
        url: SITE_URL,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${area.name}, İstanbul`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${area.name} Soğutma Hizmetleri`,
        itemListElement: SERVICE_PAGES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.shortTitle,
            url: `${SITE_URL}/hizmetler/${service.slug}`,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Servis Bölgeleri", item: `${SITE_URL}/servis-bolgeleri` },
        { "@type": "ListItem", position: 3, name: area.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: area.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return schemas.map((schema, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
    />
  ));
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const area = getAreaPage(slug);
  if (!area) notFound();

  const content = await getContent();
  const { site, services } = content;
  const whatsapp = waLink(site.whatsapp, generalMessage(site.businessName));
  const relatedAreas = AREA_PAGES.filter((item) => item.slug !== area.slug);

  return (
    <>
      <AreaJsonLd area={area} site={site} />
      <Header site={site} isHome={false} />

      <main className="flex-1 bg-white">
        <section className="hero-pattern text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <nav aria-label="Sayfa yolu" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <Link href="/servis-bolgeleri" className="hover:text-white">Servis Bölgeleri</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">{area.name}</span>
            </nav>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
              <Icon name="mapPin" className="h-4 w-4" />
              {area.name}, İstanbul
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {area.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">{area.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${site.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[var(--navy)] shadow-lg"
              >
                <Icon name="phone" className="h-5 w-5" />
                Hemen Ara · {site.phone}
              </a>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-bold text-white shadow-lg"
              >
                <Icon name="whatsapp" className="h-5 w-5" filled />
                WhatsApp’tan Yaz
              </a>
            </div>
          </div>
        </section>

        <article>
          <section className="py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Yerel servis</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                  {area.name} Ticari Soğutma Servisi
                </h2>
                {area.localContext.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-base leading-8 text-slate-600">{paragraph}</p>
                ))}
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Hizmet Verilen İşletmeler</h2>
                <ul className="mt-6 space-y-4">
                  {area.businesses.map((business) => (
                    <li key={business} className="flex items-center gap-3 text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      {business}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Tamir ve bakım</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                {area.name} Bölgesinde Verdiğimiz Hizmetler
              </h2>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICE_PAGES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/hizmetler/${service.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
                  >
                    <h3 className="font-heading text-lg font-bold text-[var(--navy)] group-hover:text-brand">{service.shortTitle}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{service.metaDescription}</p>
                    <span className="mt-4 inline-flex text-sm font-bold text-brand">Hizmeti incele →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Yakın hizmet alanı</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">{area.name} Mahalleleri</h2>
                <p className="mt-5 leading-7 text-slate-600">
                  Aşağıdaki mahalle ve çevrelerinden servis talebi alıyoruz. Listede bulunmayan yakın konumlar için telefonla bilgi verebilirsiniz.
                </p>
              </div>
              <ul className="flex flex-wrap content-start gap-3">
                {area.neighborhoods.map((neighborhood) => (
                  <li key={neighborhood} className="rounded-full bg-brand/5 px-5 py-2.5 font-medium text-[var(--navy)] ring-1 ring-brand/15">
                    {neighborhood}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-[var(--navy)] py-16 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {area.advantages.map((advantage, index) => (
                  <div key={advantage} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                    <span className="font-heading text-sm font-extrabold text-blue-300">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="mt-3 font-heading text-lg font-bold">{advantage}</h2>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <div className="text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Bölgesel bilgiler</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">Sık Sorulan Sorular</h2>
              </div>
              <div className="mt-10 space-y-4">
                {area.faq.map((item) => (
                  <details key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm">
                    <summary className="cursor-pointer list-none font-heading font-bold text-[var(--navy)]">{item.q}</summary>
                    <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-brand">Yakın bölgeler</span>
                  <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--navy)]">Diğer Servis Bölgeleri</h2>
                </div>
                <Link href="/servis-bolgeleri" className="text-sm font-bold text-brand">Tüm bölgeleri gör →</Link>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedAreas.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/servis-bolgeleri/${item.slug}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5 font-heading font-bold text-[var(--navy)] transition hover:border-brand/40 hover:text-brand"
                  >
                    {item.name} Soğutma Servisi →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer site={site} services={services} />
      <FloatingButtons site={site} />
      <MobileCTABar site={site} />
    </>
  );
}
