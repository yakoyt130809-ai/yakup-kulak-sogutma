import Icon from "./Icon";

function Stars({ n }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className="h-4 w-4" filled={i < n} />
      ))}
    </div>
  );
}

export default function Reviews({ reviews }) {
  const count = reviews.length;
  const avg =
    count > 0
      ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / count).toFixed(1)
      : "5.0";

  return (
    <section id="yorumlar" className="section-anchor bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            Müşteri Yorumları
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
            Müşterilerimiz Ne Diyor?
          </h2>
        </div>

        {/* Toplu puan kartı */}
        {count > 0 && (
          <div
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm"
            data-reveal
          >
            <span className="font-heading text-4xl font-extrabold text-[var(--navy)]">
              {avg}
            </span>
            <span className="text-left">
              <Stars n={Math.round(avg)} />
              <span className="mt-1 block text-sm text-slate-500">
                {count} müşteri değerlendirmesi
              </span>
            </span>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <blockquote
              key={r.id}
              data-reveal
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <Stars n={r.rating} />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                “{r.text}”
              </p>
              <footer className="mt-4 border-t border-slate-100 pt-3">
                <span className="font-heading text-sm font-bold text-[var(--navy)]">
                  {r.name}
                </span>
                {r.location && (
                  <span className="ml-1 text-xs text-slate-500">
                    · {r.location}
                  </span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
