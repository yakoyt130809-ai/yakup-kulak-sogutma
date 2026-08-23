import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata() {
  const { site } = await getContent();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: site.metaTitle,
      template: `%s | ${site.businessName}`,
    },
    description: site.metaDescription,
    keywords: [
      "soğuk oda tamiri",
      "sanayi tipi buzdolabı tamiri",
      "kasap dolabı tamiri",
      "pastane dolabı tamiri",
      "süt soğutma dolabı tamiri",
      "soğuk hava deposu tamiri",
      "İstanbul soğutma servisi",
      "Avrupa Yakası soğutma tamiri",
      "Anadolu Yakası soğutma tamiri",
    ],
    authors: [{ name: site.businessName }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: SITE_URL,
      siteName: site.businessName,
      title: site.metaTitle,
      description: site.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${montserrat.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}
