import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import { getContent } from "@/lib/content";
import { getFaultGuidesForService } from "@/lib/fault-guides";
import { SERVICE_PAGES, getServicePage } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/site";
import { serviceMessage, waLink } from "@/lib/wa";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return { title: "Hizmet Bulunamadı", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/hizmetler/${service.slug}`;
  const socialImage = `${SITE_URL}/opengraph-image`;

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url,
      siteName: "SoğukServis",
      title: `${service.title} | SoğukServis`,
      description: service.metaDescription,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "SoğukServis - İstanbul ticari soğutma tamiri",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | SoğukServis`,
      description: service.metaDescription,
      images: [socialImage],
    },
  };
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function ServiceJsonLd({ service, site }) {
  const url = `${SITE_URL}/hizmetler/${service.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}/#hizmet`,
      name: service.shortTitle,
      serviceType: service.shortTitle,
      description: service.metaDescription,
      url,
      image: `${SITE_URL}${service.image}`,
      provider: {
        "@type": "HVACBusiness",
        "@id": `${SITE_URL}/#isletme`,
        name: site.businessName,
        telephone: site.phoneRaw,
        url: SITE_URL,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: "Fatih",
          addressRegion: "İstanbul",
          addressCountry: "TR",
        },
      },
      areaServed: { "@type": "City", name: "İstanbul" },
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
          name: "Hizmetler",
          item: `${SITE_URL}/#hizmetler`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.shortTitle,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
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

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const content = await getContent();
  const { site, services, serviceAreas } = content;
  const liveService = services.find((item) => item.id === service.id);
  const related = SERVICE_PAGES.filter((item) => item.slug !== service.slug).slice(0, 3);
  const relatedGuides = getFaultGuidesForService(service.slug);
  const whatsapp = waLink(
    site.whatsapp,
    serviceMessage(site.businessName, service.shortTitle),
  );

  return (
    <>
      <ServiceJsonLd service={service} site={site} />
      <Header site={site} isHome={false} />

      <main className="flex-1 bg-white">
        <section className="hero-pattern text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <nav aria-label="Sayfa yolu" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <Link href="/#hizmetler" className="hover:text-white">Hizmetler</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">{service.shortTitle}</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
                  İstanbul Avrupa ve Anadolu Yakası
                </span>
                <h1 className="mt-5 max-w-3xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                  {liveService?.description || service.lead}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`tel:${site.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[var(--navy)] shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Icon name="phone" className="h-5 w-5" />
                    Hemen Ara · {site.phone}
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Icon name="whatsapp" className="h-5 w-5" filled />
                    WhatsApp’tan Yaz
                  </a>
                </div>
              </div>

              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <article>
          <section className="py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Uzman servis</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                  {service.shortTitle} Nasıl Yapılır?
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">{service.lead}</p>
                {service.details.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-8 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">
                  Sık Görülen Arızalar
                </h2>
                <ul className="mt-6 space-y-4">
                  {service.issues.map((item) => (
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

          <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Hizmet kapsamı</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                  Kontrol ve Onarım Adımları
                </h2>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {service.scope.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <span className="font-heading text-sm font-extrabold text-brand">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-heading text-lg font-bold text-[var(--navy)]">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wider text-brand">Servis bölgeleri</span>
                  <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">
                    İstanbul Genelinde Yerinde Servis
                  </h2>
                  <p className="mt-5 leading-7 text-slate-600">
                    Avrupa ve Anadolu yakasında servis talebi alıyoruz. Ekip uygunluğu ve ulaşım süresi, konum ve arıza durumuna göre telefon görüşmesinde netleştirilir.
                  </p>
                </div>
                <ul className="flex flex-wrap content-start gap-2.5">
                  {serviceAreas.areas.map((area) => (
                    <li key={area} className="rounded-full bg-brand/5 px-4 py-2 text-sm font-medium text-[var(--navy)] ring-1 ring-brand/15">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[var(--navy)] py-14 text-white">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">Arızayı büyümeden çözelim</h2>
                <p className="mt-2 text-blue-100">Servis talebiniz için arayın veya cihaz bilgilerini WhatsApp’tan gönderin.</p>
              </div>
              <a href={`tel:${site.phoneRaw}`} className="shrink-0 rounded-full bg-white px-7 py-3.5 font-bold text-[var(--navy)] shadow-lg">
                {site.phone}
              </a>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <div className="text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Merak edilenler</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">Sık Sorulan Sorular</h2>
              </div>
              <div className="mt-10 space-y-4">
                {service.faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm">
                    <summary className="cursor-pointer list-none pr-6 font-heading font-bold text-[var(--navy)]">
                      {item.q}
                    </summary>
                    <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {relatedGuides.length > 0 && (
            <section className="border-t border-slate-200 bg-white py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Sorunu tanıyın</span>
                <h2 className="mt-2 font-heading text-2xl font-extrabold text-[var(--navy)]">İlgili Arıza Rehberi</h2>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/ariza-rehberi/${guide.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-brand/40 hover:shadow-sm"
                    >
                      <h3 className="font-heading text-lg font-bold text-[var(--navy)] group-hover:text-brand">{guide.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{guide.metaDescription}</p>
                      <span className="mt-4 inline-flex text-sm font-bold text-brand">Rehberi incele →</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="border-t border-slate-200 bg-slate-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Diğer Hizmetlerimiz</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/hizmetler/${item.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
                  >
                    <h3 className="font-heading text-lg font-bold text-[var(--navy)] group-hover:text-brand">{item.shortTitle}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.metaDescription}</p>
                    <span className="mt-4 inline-flex text-sm font-bold text-brand">Hizmeti incele →</span>
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
