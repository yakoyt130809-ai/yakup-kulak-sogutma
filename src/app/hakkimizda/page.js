import Link from "next/link";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import References from "@/components/References";
import { getContent } from "@/lib/content";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const PAGE_URL = `${SITE_URL}/hakkimizda`;
const PAGE_TITLE = "Yakup Kulak | 30 Yıllık Ticari Soğutma Tecrübesi";
const PAGE_DESCRIPTION =
  "Yakup Kulak'ın İstanbul'da ticari soğutma, soğuk oda ve sanayi tipi buzdolabı servisindeki 30 yılı aşkın saha tecrübesini ve referanslarını inceleyin.";

export const metadata = {
  title: "Yakup Kulak - 30 Yıllık Ticari Soğutma Tecrübesi",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "profile",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "SoğukServis",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
};

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function ProfileJsonLd({ site }) {
  const personId = `${PAGE_URL}#yakup-kulak`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${PAGE_URL}#profil`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      inLanguage: "tr-TR",
      mainEntity: { "@id": personId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": personId,
      name: "Yakup Kulak",
      jobTitle: "Ticari Soğutma Ustası",
      description:
        "İstanbul'da soğuk oda, ticari soğutma sistemleri ve sanayi tipi buzdolaplarında 30 yılı aşkın saha tecrübesine sahip soğutma ustası.",
      url: PAGE_URL,
      telephone: site.phoneRaw,
      worksFor: {
        "@type": "HVACBusiness",
        "@id": `${SITE_URL}/#isletme`,
        name: site.businessName,
        url: SITE_URL,
      },
      areaServed: {
        "@type": "City",
        name: "İstanbul",
      },
      knowsAbout: [
        "Ticari soğutma sistemleri",
        "Soğuk oda tamiri",
        "Sanayi tipi buzdolabı tamiri",
        "Kasap ve pastane dolabı tamiri",
        "Kompresör değişimi ve soğutucu gaz uygulamaları",
        "Periyodik soğutma sistemi bakımı",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Yakup Kulak",
          item: PAGE_URL,
        },
      ],
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

export default async function AboutPage() {
  const content = await getContent();
  const { site, about, services, references } = content;

  return (
    <>
      <ProfileJsonLd site={site} />
      <Header site={site} isHome={false} />

      <main className="flex-1 bg-white">
        <section className="hero-pattern text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <nav
              aria-label="Sayfa yolu"
              className="mb-7 flex items-center gap-2 text-sm text-blue-100"
            >
              <Link href="/" className="hover:text-white">
                Ana Sayfa
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">
                Yakup Kulak
              </span>
            </nav>

            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
              30 yılı aşkın saha tecrübesi
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Yakup Kulak: Ticari Soğutma Ustası
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
              İstanbul&apos;da soğuk oda, sanayi tipi buzdolabı ve ticari
              soğutma sistemlerinde 30 yılı aşkın saha tecrübesiyle yerinde
              servis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${site.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[var(--navy)] shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Icon name="phone" className="h-5 w-5" />
                Hemen Ara · {site.phone}
              </a>
              <Link
                href="#referanslar"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3.5 font-bold text-white ring-1 ring-white/25 transition-colors hover:bg-white/15"
              >
                Referansları İncele
              </Link>
            </div>
          </div>
        </section>

        <article>
          <section className="py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Saha tecrübesi
                </span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
                  Teşhisten onarıma doğrudan usta tecrübesi
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                  {about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm sm:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-5xl font-extrabold text-brand">
                    30+
                  </span>
                  <span className="font-elegant text-lg italic text-slate-600">
                    yıllık tecrübe
                  </span>
                </div>
                <h2 className="mt-6 font-heading text-xl font-bold text-[var(--navy)]">
                  Uzmanlık alanları
                </h2>
                <ul className="mt-5 space-y-3">
                  {[
                    "Soğuk oda ve soğuk hava deposu sistemleri",
                    "Sanayi tipi ve ticari buzdolapları",
                    "Kasap, pastane ve sütlük dolapları",
                    "Kompresör, gaz kaçağı ve elektrik arızaları",
                    "Periyodik bakım ve yerinde arıza tespiti",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Çalışma yaklaşımı
                </span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                  Ticari soğutmada önce doğru arıza tespiti
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Her servis talebi cihazın türü, çalışma koşulları ve arıza
                  belirtisi birlikte değerlendirilerek ele alınır. Amaç yalnızca
                  geçici olarak çalıştırmak değil, arızanın kaynağını belirleyip
                  işletmenin soğutma ihtiyacına uygun onarımı uygulamaktır.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  ["01", "Ön bilgi", "Cihaz ve arıza belirtisi telefon veya WhatsApp üzerinden dinlenir."],
                  ["02", "Yerinde kontrol", "Soğutma sistemi ve ilgili bileşenler sahada kontrol edilir."],
                  ["03", "Uygun çözüm", "Tespit edilen arızaya göre onarım ve bakım kapsamı netleştirilir."],
                ].map(([number, title, text]) => (
                  <div key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="font-heading text-sm font-extrabold text-brand">{number}</span>
                    <h3 className="mt-3 font-heading text-lg font-bold text-[var(--navy)]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-3xl">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Yapılan işler
                </span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                  Ticari soğutma servis hizmetleri
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Aradığınız cihaz veya işlem için ilgili hizmet sayfasından
                  arıza belirtilerini, kontrol kapsamını ve sık sorulan soruları
                  inceleyebilirsiniz.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {SERVICE_PAGES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/hizmetler/${service.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
                  >
                    <h3 className="font-heading text-lg font-bold text-[var(--navy)] group-hover:text-brand">
                      {service.shortTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {service.metaDescription}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-bold text-brand">
                      Hizmeti incele →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <References references={references} site={site} />

          <section className="bg-[var(--navy)] py-14 text-white">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">
                  Ticari soğutma arızasını birlikte değerlendirelim
                </h2>
                <p className="mt-2 text-blue-100">
                  Cihaz türünü ve arıza belirtisini iletin; servis planlamasını netleştirelim.
                </p>
              </div>
              <a
                href={`tel:${site.phoneRaw}`}
                className="shrink-0 rounded-full bg-white px-7 py-3.5 font-bold text-[var(--navy)] shadow-lg"
              >
                {site.phone}
              </a>
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
