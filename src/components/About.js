import Icon from "./Icon";

export default function About({ about, site }) {
  return (
    <section id="hakkimizda" className="section-anchor bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            {about.title}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
            {about.lead}
          </h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8" data-reveal>
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-5xl font-extrabold text-brand">
              30+
            </span>
            <span className="font-elegant italic text-lg text-slate-600">
              yıllık tecrübe
            </span>
          </div>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {about.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2.5 text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{h}</span>
              </li>
            ))}
          </ul>
          <a
            href={`tel:${site.phoneRaw}`}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-dark"
          >
            <Icon name="phone" className="h-5 w-5" />
            Hemen Ara: {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
