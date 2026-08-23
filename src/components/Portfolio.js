"use client";

import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import { waLink, portfolioMessage } from "@/lib/wa";

function Placeholder({ title }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
      <Icon name="snowflake" className="h-10 w-10" />
      <span className="mt-2 px-4 text-center text-xs font-medium">{title}</span>
    </div>
  );
}

export default function Portfolio({ portfolio = [], site }) {
  const [filter, setFilter] = useState("Tümü");
  const [active, setActive] = useState(null); // lightbox için seçili iş

  // Kategorileri içerikten üret.
  const categories = useMemo(() => {
    const set = [];
    portfolio.forEach((p) => {
      const c = (p.category || "").trim();
      if (c && !set.includes(c)) set.push(c);
    });
    return ["Tümü", ...set];
  }, [portfolio]);

  const items =
    filter === "Tümü"
      ? portfolio
      : portfolio.filter((p) => (p.category || "").trim() === filter);

  // Lightbox açıkken body scroll kilidi + ESC ile kapama.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="portfoy" className="section-anchor bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            Portföy
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
            Yaptığımız İşlerden Örnekler
          </h2>
          <p className="mt-4 text-slate-600">
            Tamamladığımız kurulum, tamir ve bakım işlerinden bir seçki. Görsele
            tıklayarak büyütebilirsiniz.
          </p>
        </div>

        {/* Kategori filtresi */}
        {categories.length > 2 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2" data-reveal>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === c
                    ? "bg-brand text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.id}
              data-reveal
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <button
                type="button"
                onClick={() => item.image && setActive(item)}
                className={`relative block aspect-[4/3] w-full overflow-hidden ${
                  item.image ? "cursor-zoom-in" : "cursor-default"
                }`}
                aria-label={`${item.title} görselini büyüt`}
              >
                {item.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
                      <span className="rounded-full bg-white/90 p-3 text-[var(--navy)]">
                        <Icon name="search" className="h-5 w-5" />
                      </span>
                    </span>
                  </>
                ) : (
                  <Placeholder title={item.title} />
                )}
                {item.category && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    {item.category}
                  </span>
                )}
              </button>

              <figcaption className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-base font-bold text-[var(--navy)]">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                )}
                {site?.whatsapp && (
                  <a
                    href={waLink(
                      site.whatsapp,
                      portfolioMessage(site.businessName, item.title)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    Benzer iş için teklif al
                    <Icon name="whatsapp" className="h-4 w-4" filled />
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {items.length === 0 && (
          <p className="mt-10 text-center text-slate-500">
            Bu kategoride henüz görsel eklenmedi.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="lb-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 transition-colors hover:bg-white/20"
            aria-label="Kapat"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>
          <figure
            className="lb-panel max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={active.title}
              className="max-h-[70vh] w-full object-contain bg-slate-900"
            />
            <figcaption className="p-5">
              {active.category && (
                <span className="mb-1 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                  {active.category}
                </span>
              )}
              <h3 className="font-heading text-lg font-bold text-[var(--navy)]">
                {active.title}
              </h3>
              {active.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {active.description}
                </p>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
