import Icon from "./Icon";
import { waLink, serviceMessage } from "@/lib/wa";

export default function Services({ services, site }) {
  return (
    <section id="hizmetler" className="section-anchor bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            Hizmetlerimiz
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
            Ticari ve Sanayi Tipi Soğutma Tamiri
          </h2>
          <p className="mt-4 text-slate-600">
            Marka fark etmeksizin tüm soğutma sistemlerinize hızlı, garantili ve
            faturalı servis.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              data-reveal
              className="section-anchor group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon name={s.icon} className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-[var(--navy)]">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {s.description}
              </p>
              <a
                href={waLink(site.whatsapp, serviceMessage(site.businessName, s.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Bu hizmet için yaz
                <Icon name="whatsapp" className="h-4 w-4" filled />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
