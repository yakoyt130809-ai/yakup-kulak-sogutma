import Link from "next/link";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import MobileCTABar from "@/components/MobileCTABar";
import { getContent } from "@/lib/content";
import { FAULT_GUIDES } from "@/lib/fault-guides";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ticari Soğutma Arıza Rehberi",
  description:
    "Ticari buzdolabı, soğuk oda ve kompresör arızalarında belirtileri, güvenli ilk kontrolleri ve ne zaman servis çağırmanız gerektiğini öğrenin.",
  alternates: { canonical: `${SITE_URL}/ariza-rehberi` },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${SITE_URL}/ariza-rehberi`,
    siteName: "SoğukServis",
    title: "Ticari Soğutma Arıza Rehberi | SoğukServis",
    description:
      "Soğuk oda ve ticari dolap arızalarında doğru belirtileri tanıyın, güvenli ilk adımları uygulayın.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ticari Soğutma Arıza Rehberi | SoğukServis",
    description:
      "Soğuk oda ve ticari dolap arızalarında doğru belirtileri tanıyın, güvenli ilk adımları uygulayın.",
    images: [`${SITE_URL}/opengraph-image`],
  },
};

export default async function FaultGuideHubPage() {
  const content = await getContent();
  const { site, services } = content;
  const url = `${SITE_URL}/ariza-rehberi`;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ticari Soğutma Arıza Rehberi",
    url,
    itemListElement: FAULT_GUIDES.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `${url}/${guide.slug}`,
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
              <span aria-current="page" className="text-white">Arıza Rehberi</span>
            </nav>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/20">
              Belirtiler · Güvenli Kontroller · Servis
            </span>
            <h1 className="mt-5 max-w-4xl font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Ticari Soğutma Arıza Rehberi
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
              Soğuk oda ve ticari dolap arızalarında doğru belirtiyi tanımak, ürün kaybını ve gereksiz parça değişimini önlemeye yardımcı olur. Güvenli ilk kontrolleri öğrenin; elektrik ve soğutma devresi müdahalesini uzmanına bırakın.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand">Arızayı tanıyın</span>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)]">Güncel Arıza Rehberleri</h2>
              <p className="mt-4 leading-7 text-slate-600">
                Her rehber, evde veya işletmede güvenle yapılabilecek gözlemleri ve teknik servis ölçümü gerektiren noktaları birbirinden ayırır.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {FAULT_GUIDES.map((guide) => (
                <article key={guide.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon name="wrench" className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-brand">{guide.eyebrow}</p>
                  <h2 className="mt-2 font-heading text-xl font-extrabold text-[var(--navy)]">{guide.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{guide.metaDescription}</p>
                  <Link
                    href={`/ariza-rehberi/${guide.slug}`}
                    className="mt-5 inline-flex font-bold text-brand hover:text-brand-dark"
                  >
                    Rehberi incele →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
            <div>
              <h2 className="font-heading text-2xl font-extrabold text-[var(--navy)]">Ürün sıcaklığı yükseliyor mu?</h2>
              <p className="mt-2 text-slate-600">Cihaz türünü, ekrandaki değeri ve arıza belirtisini iletin; servis planlamasını netleştirelim.</p>
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
