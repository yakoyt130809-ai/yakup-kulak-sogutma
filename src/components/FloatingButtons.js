"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { waLink } from "@/lib/wa";

// Hazır mesaj şablonları (WhatsApp hızlı başlangıç).
const QUICK = [
  "Soğuk odam soğutmuyor, acil servis istiyorum.",
  "Kasap/pastane teşhir dolabım ısı yapıyor.",
  "Sanayi tipi buzdolabım için fiyat almak istiyorum.",
  "Periyodik bakım anlaşması hakkında bilgi almak istiyorum.",
];

export default function FloatingButtons({ site }) {
  const [openChat, setOpenChat] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // Sadece masaüstü/tablet — mobilde alttaki CTA çubuğu var.
    <div className="fixed bottom-5 right-5 z-50 hidden flex-col items-end gap-3 md:flex">
      {/* Yukarı çık */}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Yukarı çık"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--navy)] text-white shadow-lg transition-transform hover:scale-110"
        >
          <Icon name="arrowUp" className="h-5 w-5" />
        </button>
      )}

      {/* WhatsApp hızlı sohbet balonu */}
      {openChat && (
        <div className="lb-panel w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Icon name="whatsapp" className="h-5 w-5" filled />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-bold">{site.businessName}</div>
              <div className="text-xs text-white/90">Genellikle hemen yanıtlar</div>
            </div>
            <button
              type="button"
              onClick={() => setOpenChat(false)}
              aria-label="Kapat"
              className="ml-auto text-white/90 hover:text-white"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-2 p-3">
            <p className="px-1 text-xs text-slate-500">
              Bir konu seçin, WhatsApp hazır mesajla açılsın:
            </p>
            {QUICK.map((q, i) => (
              <a
                key={i}
                href={waLink(site.whatsapp, q)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand hover:text-white"
              >
                {q}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setOpenChat((v) => !v)}
          aria-label="WhatsApp ile yaz"
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 ${
            openChat ? "" : "wa-pulse"
          }`}
        >
          <Icon name={openChat ? "close" : "whatsapp"} className="h-7 w-7" filled={!openChat} />
        </button>
        <a
          href={`tel:${site.phoneRaw}`}
          aria-label="Ara"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform hover:scale-110"
        >
          <Icon name="phone" className="h-7 w-7" />
        </a>
      </div>
    </div>
  );
}
