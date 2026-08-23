"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import Brand from "./Brand";

const NAV = [
  { href: "#anasayfa", label: "Ana Sayfa" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#bolgeler", label: "Bölgeler" },
  { href: "#portfoy", label: "Portföy" },
  { href: "#referanslar", label: "Referanslar" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Header({ site }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const linkRefs = useRef([]);

  // Sayfa kaydırıldıkça hangi bölümdeyiz? Menüdeki sıra ile paralel ilerler.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 10);

      // Menünün hemen altındaki hayali çizgi: hangi bölüm bu çizgiyi geçtiyse o aktif.
      const line = y + 140;
      let idx = 0;
      NAV.forEach((item, i) => {
        const el = document.querySelector(item.href);
        if (!el) return;
        const top = el.getBoundingClientRect().top + y;
        if (top <= line) idx = i;
      });

      // Sayfanın en dibindeysek son bölüm (İletişim) aktif kalsın.
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      if (max > 0 && y >= max - 4) idx = NAV.length - 1;

      setActive(idx);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Kayan vurguyu aktif linkin altına yerleştir.
  useEffect(() => {
    const place = () => {
      const el = linkRefs.current[active];
      if (!el) return;
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur border-slate-200 shadow-sm"
          : "bg-white border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Marka */}
        <Brand name={site.businessName} tagline={site.tagline} />

        {/* Masaüstü menü */}
        <nav className="relative hidden items-center gap-1 lg:flex">
          {/* Aktif bölümü gösteren, soldan sağa kayan vurgu */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 rounded-lg bg-brand/10 transition-all duration-500 ease-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-brand transition-all duration-500 ease-out"
            style={{
              left: indicator.left + 12,
              width: Math.max(0, indicator.width - 24),
              opacity: indicator.ready ? 1 : 0,
            }}
          />
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => (linkRefs.current[i] = el)}
              onClick={() => setActive(i)}
              aria-current={active === i ? "true" : undefined}
              className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                active === i
                  ? "font-semibold text-brand"
                  : "font-medium text-slate-700 hover:text-brand"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Telefon butonu */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneRaw}`}
            className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark sm:flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 lg:hidden"
            aria-label="Menü"
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Sayfanın ne kadarını kaydırdığını gösteren ince çizgi */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand/70"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* Mobil menü */}
      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-2">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActive(i);
                  setOpen(false);
                }}
                aria-current={active === i ? "true" : undefined}
                className={`block border-l-2 px-3 py-3 text-base transition-colors ${
                  active === i
                    ? "border-brand bg-brand/5 font-semibold text-brand"
                    : "border-transparent font-medium text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${site.phoneRaw}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-base font-semibold text-white"
            >
              <Icon name="phone" className="h-5 w-5" />
              {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
