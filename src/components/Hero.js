import Icon from "./Icon";
import { waLink, generalMessage } from "@/lib/wa";

export default function Hero({ site, hero }) {
  const wa = waLink(site.whatsapp, generalMessage(site.businessName));
  const stats = hero.stats || [];

  return (
    <section
      id="anasayfa"
      className="section-anchor hero-pattern relative overflow-hidden text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <div className="max-w-3xl animate-fade-up">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20">
            <Icon name="clock" className="h-4 w-4" />
            {site.workingHours}
          </span>
          <h1 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-bold text-[var(--navy)] shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Icon name="phone" className="h-5 w-5" />
              {hero.primaryCta} · {site.phone}
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Icon name="whatsapp" className="h-5 w-5" filled />
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Güven istatistikleri */}
        {stats.length > 0 && (
          <div className="mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/10 px-4 py-5 text-center ring-1 ring-white/15 backdrop-blur-sm"
              >
                <div className="font-heading text-2xl font-extrabold sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
