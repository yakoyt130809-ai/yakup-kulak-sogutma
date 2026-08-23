import Icon from "./Icon";

function Stat({ value, label }) {
  return (
    <div className="flex-1 px-4 py-5 text-center">
      <div className="font-heading text-3xl font-extrabold text-brand sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal">
        {label}
      </div>
    </div>
  );
}

export default function References({ references, site }) {
  if (!references || !references.groups?.length) return null;

  // Panelden satır satır girildiği için boş satırları ayıklıyoruz.
  const groups = references.groups
    .map((g) => ({ ...g, items: (g.items || []).map((s) => s.trim()).filter(Boolean) }))
    .filter((g) => g.items.length);
  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <section
      id="referanslar"
      className="section-anchor border-t border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Başlık */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            {references.eyebrow || "Referanslar"}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
            {references.title}
          </h2>
          {references.intro && (
            <p className="mt-4 text-slate-600">{references.intro}</p>
          )}
        </div>

        {/* Sayılarla özet */}
        <div className="mx-auto mt-10 flex max-w-3xl divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Stat value={`${total}+`} label="Kurumsal Referans" />
          <Stat value={groups.length} label="Farklı Sektör" />
          <Stat
            value={references.years || "30"}
            label={references.yearsLabel || "Yıllık Tecrübe"}
          />
        </div>

        {/* Sektöre göre kurum listeleri */}
        <div className="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon name={g.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-bold leading-snug text-[var(--navy)]">
                    {g.label}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {g.items.length} kurum
                  </p>
                </div>
              </div>

              <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
                {g.items.map((name, i) => (
                  <li
                    key={`${g.id}-${i}`}
                    className="flex items-start gap-2.5 py-2.5 text-sm leading-snug text-slate-700"
                  >
                    <Icon
                      name="check"
                      className="mt-[3px] h-4 w-4 shrink-0 text-brand"
                    />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt not + arama daveti */}
        <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-7 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          {references.note && (
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              {references.note}
            </p>
          )}
          {site?.phoneRaw && (
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
            >
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
