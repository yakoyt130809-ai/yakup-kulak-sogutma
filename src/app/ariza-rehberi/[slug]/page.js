import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import { getContent } from "@/lib/content";
import { FAULT_GUIDES, getFaultGuide } from "@/lib/fault-guides";
import { SITE_URL } from "@/lib/site";
import { serviceMessage, waLink } from "@/lib/wa";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return FAULT_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getFaultGuide(slug);

  if (!guide) {
    return { title: "Rehber Bulunamadı", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/ariza-rehberi/${guide.slug}`;
  const socialImage = `${SITE_URL}/opengraph-image`;

  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      url,
      siteName: "SoğukServis",
      title: `${guide.title} | SoğukServis`,
      description: guide.metaDescription,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "SoğukServis ticari soğutma arıza rehberi" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | SoğukServis`,
      description: guide.metaDescription,
      images: [socialImage],
    },
  };
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function GuideJsonLd({ guide, site }) {
  const url = `${SITE_URL}/ariza-rehberi/${guide.slug}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "@id": `${url}/#rehber`,
      headline: guide.title,
      description: guide.metaDescription,
      url,
      inLanguage: "tr-TR",
      about: "Ticari soğutma arızaları",
      author: { "@type": "Organization", name: site.businessName, url: SITE_URL },
      publisher: { "@type": "Organization", name: site.businessName, url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Arıza Rehberi", item: `${SITE_URL}/ariza-rehberi` },
        { "@type": "ListItem", position: 3, name: guide.shortTitle, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return schemas.map((schema, index) => (
    <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
  ));
}

export default async function FaultGuidePage({ params }) {
  const { slug } = await params;
  const guide = getFaultGuide(slug);
  if (!guide) notFound();

  const content = await getContent();
  const { site, services } = content;
  const related = guide.relatedSlugs.map(getFaultGuide).filter(Boolean);
  const whatsapp = waLink(site.whatsapp, serviceMessage(site.businessName, guide.shortTitle));

  return (
    <>
      <GuideJsonLd guide={guide} site={site} />
      <Header site={site} isHome={false} />

      <main className="flex-1 bg-white">
        <section className="hero-pattern text-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <nav aria-label="Sayfa yolu" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-blue-100">
              <Link href="/" className="hover:text-white">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <Link href="/ariza-rehberi" className="hover:text-white">Arıza Rehberi</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">{guide.shortTitle}</span>
            </nav>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
              {guide.eyebrow}
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">{guide.intro}</p>
          </div>
        </section>

        <article>
          <section className="py-14 sm:py-18">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    <Icon name="shield" className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-heading text-lg font-extrabold text-amber-950">Önce güvenlik ve ürün koruması</h2>
                    <p className="mt-2 leading-7 text-amber-900">{guide.urgentNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-16 sm:pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Olası nedenler</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">Belirti Nereden Kaynaklanabilir?</h2>
              <div className="mt-9 grid gap-5 md:grid-cols-2">
                {guide.causes.map((cause, index) => (
                  <section key={cause.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <span className="font-heading text-sm font-extrabold text-brand">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-heading text-xl font-bold text-[var(--navy)]">{cause.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{cause.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Güvenle Yapılabilecek İlk Kontroller</h2>
                <ul className="mt-6 space-y-4">
                  {guide.safeChecks.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-7 text-slate-700">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Yapılmaması Gerekenler</h2>
                <ul className="mt-6 space-y-4">
                  {guide.avoid.map((item) => (
                    <li key={item} className="flex items-start gap-3 leading-7 text-slate-700">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-[var(--navy)] py-14 text-white">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
              <div>
                <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">Ölçümlü arıza tespiti gerekiyor mu?</h2>
                <p className="mt-2 text-blue-100">İlgili hizmeti inceleyin veya belirtileri WhatsApp’tan iletin.</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link href={`/hizmetler/${guide.serviceSlug}`} className="rounded-full bg-white px-6 py-3.5 font-bold text-[var(--navy)]">
                  {guide.serviceTitle}
                </Link>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3.5 font-bold text-white">
                  WhatsApp’tan Yaz
                </a>
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <div className="text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-brand">Merak edilenler</span>
                <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">Sık Sorulan Sorular</h2>
              </div>
              <div className="mt-10 space-y-4">
                {guide.faq.map((item) => (
                  <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-sm">
                    <summary className="cursor-pointer list-none pr-6 font-heading font-bold text-[var(--navy)]">{item.q}</summary>
                    <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-slate-200 bg-slate-50 py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Diğer Arıza Rehberleri</h2>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {related.map((item) => (
                  <Link key={item.slug} href={`/ariza-rehberi/${item.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand">{item.eyebrow}</p>
                    <h3 className="mt-2 font-heading text-lg font-bold text-[var(--navy)] group-hover:text-brand">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.metaDescription}</p>
                    <span className="mt-4 inline-flex text-sm font-bold text-brand">Rehberi incele →</span>
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
