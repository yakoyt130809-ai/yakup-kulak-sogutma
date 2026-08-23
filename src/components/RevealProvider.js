"use client";

import { useEffect } from "react";

// Sayfadaki [data-reveal] elemanlarını izler; görünür olunca .is-visible ekler.
// Tek sefer mount olur, tüm bölümler için çalışır. IntersectionObserver yoksa
// veya bir şey ters giderse hepsini görünür yapar (içerik asla gizli kalmaz).
export default function RevealProvider() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach((el) => io.observe(el));

    // Güvenlik ağı: 3 sn sonra hâlâ gizli kalan olursa göster.
    const t = setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
    }, 3000);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return null;
}
