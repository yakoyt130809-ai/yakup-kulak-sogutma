"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function Contact({ site }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const waNumber = site.whatsapp.replace(/[^0-9]/g, "");

  const submit = (e) => {
    e.preventDefault();
    const text =
      `Merhaba, adım ${form.name || "-"}. ` +
      `Telefonum: ${form.phone || "-"}. ` +
      `${form.message || "Soğutma tamiri hakkında bilgi almak istiyorum."}`;
    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address
  )}&output=embed`;

  return (
    <section id="iletisim" className="section-anchor bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            İletişim
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[var(--navy)] sm:text-4xl">
            Bize Ulaşın
          </h2>
          <p className="mt-4 text-slate-600">
            7/24 acil servis için hemen arayın ya da aşağıdan mesaj bırakın,
            WhatsApp'tan size dönelim.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Bilgiler */}
          <div className="space-y-4">
            <a
              href={`tel:${site.phoneRaw}`}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon name="phone" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-slate-500">
                  Telefon
                </span>
                <span className="font-heading text-lg font-bold text-[var(--navy)]">
                  {site.phone}
                </span>
              </span>
            </a>

            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#128C4B]">
                <Icon name="whatsapp" className="h-6 w-6" filled />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-slate-500">
                  WhatsApp
                </span>
                <span className="font-heading text-lg font-bold text-[var(--navy)]">
                  {site.phone}
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon name="mapPin" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-slate-500">
                  Adres
                </span>
                <span className="font-medium text-[var(--navy)]">
                  {site.address}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Icon name="clock" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-slate-500">
                  Çalışma Saatleri
                </span>
                <span className="font-medium text-[var(--navy)]">
                  {site.workingHours}
                </span>
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Konum"
                src={mapSrc}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="font-heading text-lg font-bold text-[var(--navy)]">
              Mesaj Bırakın
            </h3>
            <input
              type="text"
              placeholder="Adınız"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <input
              type="tel"
              placeholder="Telefon Numaranız"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <textarea
              placeholder="Arızanızı kısaca yazın (örn: Kasap dolabım soğutmuyor)"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#1eb257]"
            >
              <Icon name="whatsapp" className="h-5 w-5" filled />
              WhatsApp'tan Gönder
            </button>
            <p className="text-center text-xs text-slate-400">
              Gönder'e basınca WhatsApp uygulaması açılır ve mesajınız hazır gelir.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
