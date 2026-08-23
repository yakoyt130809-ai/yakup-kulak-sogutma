import Icon from "./Icon";

export default function Badges({ badges }) {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {badges.map((b, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Icon name={b.icon} className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[var(--navy)]">
                {b.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
