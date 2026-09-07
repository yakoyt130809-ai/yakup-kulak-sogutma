import Link from "next/link";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import { getContent } from "@/lib/content";
import { AREA_PAGES } from "@/lib/area-pages";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "İstanbul Ticari Soğutma Servis Bölgeleri",
  description:
    "İstanbul Avrupa ve Anadolu yakasında soğuk oda, kasap, pastane, sütlük ve sanayi tipi buzdolabı tamiri verdiğimiz servis bölgeleri.",
  alternates: { canonical: `${SITE_URL}/servis-bolgeleri` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${SITE_URL}/servis-bolgeleri`,
    siteName: "SoğukServis",
    title: "İstanbul Ticari Soğutma Servis Bölgeleri | SoğukServis",
    description:
      "İstanbul genelinde soğuk oda ve ticari buzdolabı tamiri verdiğimiz servis bölgeleri.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default async function ServiceAreasPage() {
  const content = await getContent();
  const { site, services, serviceAreas } = content;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "İstanbul Ticari Soğutma Servis Bölgeleri",
    itemListElement: AREA_PAGES.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: area.name,
      url: `${SITE_URL}/servis-bolgeleri/${area.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemList).replace(/</g, "\\u003c"),
        }}
      />
      <Header site={site} isHome={false} />

      <main className="flex-1">
        <section className="hero-pattern text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <nav aria-label="Sayfa yolu" className="mb-7 flex items-center gap-2 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Servis Bölgeleri</span>
            </nav>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
              Avrupa ve Anadolu Yakası
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              İstanbul Ticari Soğutma Servis Bölgeleri
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
              Soğuk oda, market, kasap, pastane ve sanayi tipi buzdolapları için İstanbul genelinde yerinde servis talebi alıyoruz. Aşağıdaki öncelikli bölgeler için ayrıntılı servis bilgilerini inceleyebilirsiniz.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Öncelikli bölgeler</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">Bölgenize Özel Servis Bilgileri</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Bu sayfalar konum, işletme yoğunluğu ve sık kullanılan ticari soğutma sistemlerine göre özgün olarak hazırlanmıştır.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AREA_PAGES.map((area) => (
                <Link
                  key={area.slug}
                  href={`/servis-bolgeleri/${area.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon name="mapPin" className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-heading text-xl font-extrabold text-[var(--navy)] group-hover:text-brand">
                    {area.name} Soğutma Servisi
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{area.metaDescription}</p>
                  <span className="mt-5 text-sm font-bold text-brand">Bölgeyi incele →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Hizmet ağı</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">İstanbul Genelinde Servis</h2>
              <p className="mt-5 leading-7 text-slate-600">
                Öncelikli ilçe sayfalarının dışında aşağıdaki bölgelerden de servis talebi alıyoruz. Ekip uygunluğu ve ulaşım süresi telefon görüşmesinde netleştirilir.
              </p>
              <a
                href={`tel:${site.phoneRaw}`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-bold text-white shadow-sm hover:bg-brand-dark"
              >
                <Icon name="phone" className="h-5 w-5" />
                {site.phone}
              </a>
            </div>
            <ul className="flex flex-wrap content-start gap-2.5">
              {serviceAreas.areas.map((area) => (
                <li key={area} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--navy)] ring-1 ring-slate-200">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold text-[var(--navy)]">Tüm Soğutma Hizmetleri</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_PAGES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/hizmetler/${service.slug}`}
                  className="rounded-2xl border border-slate-200 p-5 font-heading font-bold text-[var(--navy)] transition hover:border-brand/40 hover:text-brand hover:shadow-sm"
                >
                  {service.shortTitle} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer site={site} services={services} />
      <FloatingButtons site={site} />
      <MobileCTABar site={site} />
    </>
  );
}

