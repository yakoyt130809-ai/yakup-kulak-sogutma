import Icon from "./Icon";

export default function Footer({ site, services }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--navy)] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-heading text-2xl font-extrabold text-white">
            {site.businessName}
          </div>
          <div className="font-elegant italic text-blue-300">{site.tagline}</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            İstanbul&apos;un Avrupa ve Anadolu yakasında soğuk oda, kasap,
            pastane, süt ve sanayi tipi soğutma sistemleri tamiri. 7/24 acil
            servis.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            Hizmetler
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-white">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
            İletişim
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${site.phoneRaw}`}
                className="flex items-center gap-2 hover:text-white"
              >
                <Icon name="phone" className="h-4 w-4 text-blue-300" />
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
              {site.address}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="clock" className="h-4 w-4 text-blue-300" />
              {site.workingHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-500 sm:px-6">
          © {year} {site.businessName} — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
