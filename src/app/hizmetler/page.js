import Link from "next/link";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import { getContent } from "@/lib/content";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const PAGE_URL = `${SITE_URL}/hizmetler`;
const PAGE_DESCRIPTION =
  "İstanbul'da market dolabı, soğuk oda, sütlük, kasap, pastane ve sanayi tipi buzdolabı tamiri ile endüstriyel soğutma bakım hizmetlerini inceleyin.";

export const metadata = {
  title: "İstanbul Ticari ve Endüstriyel Soğutma Hizmetleri",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "SoğukServis",
    title: "İstanbul Ticari ve Endüstriyel Soğutma Hizmetleri | SoğukServis",
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "İstanbul Ticari ve Endüstriyel Soğutma Hizmetleri | SoğukServis",
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function ServicesPage() {
  const content = await getContent();
  const { site, services } = content;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "İstanbul Ticari Soğutma Tamir Hizmetleri",
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    numberOfItems: SERVICE_PAGES.length,
    itemListElement: SERVICE_PAGES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.shortTitle,
      url: `${SITE_URL}/hizmetler/${service.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
      <Header site={site} isHome={false} />

      <main className="flex-1 bg-white">
        <section className="hero-pattern text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <nav aria-label="Sayfa yolu" className="mb-7 flex items-center gap-2 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Hizmetler</span>
            </nav>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
              İstanbul Avrupa ve Anadolu Yakası
            </span>
            <h1 className="mt-5 max-w-5xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Ticari ve Endüstriyel Soğutma Tamir Hizmetleri
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
              Market, restoran, kasap, pastane, otel ve gıda işletmelerindeki soğuk oda ile ticari dolaplar için ölçümlü arıza tespiti, tamir ve bakım hizmeti veriyoruz.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Hizmet seçin</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                İstanbul Soğutma Tamiri ve Teknik Servis
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Her hizmet sayfasında sık görülen arızaları, kontrol ve onarım adımlarını, problem–çözüm açıklamalarını ve sık sorulan soruları inceleyebilirsiniz.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICE_PAGES.map((service) => (
                <article key={service.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon name="wrench" className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-heading text-xl font-extrabold text-[var(--navy)]">{service.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{service.metaDescription}</p>
                  <Link href={`/hizmetler/${service.slug}`} className="mt-5 inline-flex font-bold text-brand hover:text-brand-dark">
                    Hizmet detayları →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Cihazınız soğutmuyor mu?</h2>
              <p className="mt-2 text-slate-600">Cihaz türünü, mevcut sıcaklığı ve arıza belirtisini iletin; uygun servis planını oluşturalım.</p>
            </div>
            <a href={`tel:${site.phoneRaw}`} className="shrink-0 rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-lg hover:bg-brand-dark">
              Hemen Ara · {site.phone}
            </a>
          </div>
        </section>
      </main>

      <Footer site={site} services={services} />
      <FloatingButtons site={site} />
      <MobileCTABar site={site} />
    </>
  );
}
