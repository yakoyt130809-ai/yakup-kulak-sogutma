import { getContent } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Badges from "@/components/Badges";
import Services from "@/components/Services";
import About from "@/components/About";
import ServiceAreas from "@/components/ServiceAreas";
import Portfolio from "@/components/Portfolio";
import References from "@/components/References";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import MobileCTABar from "@/components/MobileCTABar";
import RevealProvider from "@/components/RevealProvider";
import JsonLd from "@/components/JsonLd";

// İçerik dosyadan okunduğu için her istekte güncel gösterilsin.
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function Home() {
  const content = await getContent();
  const {
    site,
    hero,
    badges,
    about,
    services,
    serviceAreas,
    portfolio,
    references,
    faq,
  } = content;

  return (
    <>
      <JsonLd content={content} siteUrl={SITE_URL} />
      <Header site={site} />
      <main className="flex-1">
        <Hero site={site} hero={hero} />
        <Badges badges={badges} />
        <About about={about} site={site} />
        <Services services={services} site={site} />
        <ServiceAreas serviceAreas={serviceAreas} />
        <Portfolio portfolio={portfolio} site={site} />
        <References references={references} site={site} />
        <Faq faq={faq} />
        <Contact site={site} />
      </main>
      <Footer site={site} services={services} />
      <FloatingButtons site={site} />
      <MobileCTABar site={site} />
      <RevealProvider />
    </>
  );
}
