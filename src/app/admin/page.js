"use client";

import { useEffect, useState, useCallback } from "react";
import { Field, Input, Textarea, Btn, Card, IconPicker, Reorder } from "@/components/admin/ui";
import Icon from "@/components/Icon";

const ICONS = [
  "clock", "medal", "handshake", "shield", "snowflake", "milk",
  "meat", "cake", "fridge", "wrench", "calendar", "phone", "mapPin",
  "mail", "hospital", "factory", "utensils", "hotel", "ship", "star",
  "gauge", "check",
];

const TABS = [
  { id: "ozet", label: "Özet", icon: "gauge" },
  { id: "genel", label: "Genel & İletişim", icon: "phone" },
  { id: "hero", label: "Ana Sayfa (Üst)", icon: "star" },
  { id: "rozetler", label: "Rozetler", icon: "shield" },
  { id: "hakkimizda", label: "Hakkımızda", icon: "medal" },
  { id: "hizmetler", label: "Hizmetler", icon: "wrench" },
  { id: "bolgeler", label: "Bölgeler", icon: "mapPin" },
  { id: "portfoy", label: "Portföy", icon: "image" },
  { id: "referanslar", label: "Referanslar", icon: "handshake" },
  { id: "sss", label: "S.S.S.", icon: "clock" },
  { id: "guvenlik", label: "Güvenlik", icon: "lock" },
];

export default function Admin() {
  const [authed, setAuthed] = useState(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("ozet");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/session")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authed))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (authed) {
      fetch("/api/content")
        .then((r) => r.json())
        .then(setData);
    }
  }, [authed]);

  // Kaydedilmemiş değişiklik varken sayfadan çıkarken uyar.
  useEffect(() => {
    const handler = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const login = async (e) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) setAuthed(true);
    else setLoginError("Şifre hatalı, tekrar deneyin.");
  };

  const logout = async () => {
    if (dirty && !confirm("Kaydedilmemiş değişiklikler var. Yine de çıkılsın mı?")) return;
    await fetch("/api/logout", { method: "POST" });
    setAuthed(false);
    setData(null);
    setDirty(false);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      setDirty(false);
      setMsg("✓ Kaydedildi! Site güncellendi.");
    } else {
      setMsg("✗ Kaydedilemedi.");
    }
    setTimeout(() => setMsg(""), 4000);
  };

  // Tüm değişiklikleri tek noktadan geçirip "kaydedilmedi" işareti koyar.
  const update = useCallback((fn) => {
    setData((d) => fn(d));
    setDirty(true);
  }, []);

  // ---- yardımcılar ----
  const setSection = (section, key, value) =>
    update((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));

  const setArrItem = (section, i, key, value) =>
    update((d) => ({
      ...d,
      [section]: d[section].map((it, idx) => (idx === i ? { ...it, [key]: value } : it)),
    }));

  const addArrItem = (section, template) =>
    update((d) => ({ ...d, [section]: [...d[section], template] }));

  const removeArrItem = (section, i) =>
    update((d) => ({ ...d, [section]: d[section].filter((_, idx) => idx !== i) }));

  const moveArrItem = (section, i, dir) =>
    update((d) => {
      const arr = [...d[section]];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return d;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...d, [section]: arr };
    });

  const setSub = (section, key, value) =>
    update((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));

  // hero.stats (dizi)
  const setStat = (i, key, value) =>
    update((d) => ({
      ...d,
      hero: {
        ...d.hero,
        stats: (d.hero.stats || []).map((s, idx) => (idx === i ? { ...s, [key]: value } : s)),
      },
    }));
  const addStat = () =>
    update((d) => ({
      ...d,
      hero: { ...d.hero, stats: [...(d.hero.stats || []), { value: "", label: "" }] },
    }));
  const removeStat = (i) =>
    update((d) => ({
      ...d,
      hero: { ...d.hero, stats: (d.hero.stats || []).filter((_, idx) => idx !== i) },
    }));

  // ---- referanslar (iç içe) ----
  const setRefField = (key, value) =>
    update((d) => ({ ...d, references: { ...d.references, [key]: value } }));
  const setRefGroups = (groups) =>
    update((d) => ({ ...d, references: { ...d.references, groups } }));
  const setRefGroup = (i, key, value) =>
    update((d) => ({
      ...d,
      references: {
        ...d.references,
        groups: d.references.groups.map((g, idx) => (idx === i ? { ...g, [key]: value } : g)),
      },
    }));

  // ---- portföy görsel yükleme ----
  const [uploading, setUploading] = useState(null);
  const uploadImage = async (file, i) => {
    setUploading(i);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.ok) setArrItem("portfolio", i, "image", json.path);
      else alert("Yükleme başarısız: " + (json.error || "bilinmeyen hata"));
    } catch (err) {
      alert("Yükleme başarısız: " + err.message);
    } finally {
      setUploading(null);
    }
  };

  // ---- şifre değiştirme ----
  const [pw, setPw] = useState({ current: "", next: "", again: "" });
  const [pwMsg, setPwMsg] = useState("");
  const changePassword = async (e) => {
    e.preventDefault();
    setPwMsg("");
    if (pw.next !== pw.again) return setPwMsg("Yeni şifreler eşleşmiyor.");
    if (pw.next.length < 4) return setPwMsg("Yeni şifre en az 4 karakter olmalı.");
    const res = await fetch("/api/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: pw.current, next: pw.next }),
    });
    const json = await res.json();
    if (res.ok) {
      setPwMsg("✓ Şifre güncellendi.");
      setPw({ current: "", next: "", again: "" });
    } else {
      setPwMsg("✗ " + (json.error || "Değiştirilemedi."));
    }
  };

  // ---- LOGIN EKRANI ----
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Yükleniyor…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h1 className="font-heading text-2xl font-extrabold text-[var(--navy)]">
            YAKUP KULAK
          </h1>
          <p className="mt-1 text-sm text-slate-500">Yönetim Paneli Girişi</p>
          <div className="mt-6">
            <Field label="Şifre">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </Field>
          </div>
          {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
          <Btn type="submit" className="mt-4 w-full">
            Giriş Yap
          </Btn>
        </form>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        İçerik yükleniyor…
      </div>
    );
  }

  const refGroups = data.references?.groups || [];
  const refCount = refGroups.reduce(
    (s, g) => s + (g.items || []).filter((x) => x.trim()).length,
    0
  );

  // ---- PANEL ----
  return (
    <div className="flex min-h-screen flex-col">
      {/* Üst bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-extrabold text-[var(--navy)]">
            YAKUP KULAK
          </span>
          <span className="hidden text-sm text-slate-400 sm:inline">Yönetim Paneli</span>
          {dirty && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
              Kaydedilmedi
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {msg && <span className="hidden text-sm font-medium text-slate-600 sm:inline">{msg}</span>}
          <a
            href="/"
            target="_blank"
            className="hidden text-sm font-medium text-brand hover:underline sm:inline"
          >
            Siteyi Gör ↗
          </a>
          <Btn onClick={save} disabled={saving || !dirty} variant={dirty ? "primary" : "ghost"}>
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </Btn>
          <Btn variant="ghost" onClick={logout}>
            Çıkış
          </Btn>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row">
        {/* Sekmeler */}
        <nav className="flex flex-row flex-wrap gap-1 lg:w-56 lg:flex-col">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                tab === t.id ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>

        {/* İçerik */}
        <div className="flex-1 space-y-5">
          {msg && <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:hidden">{msg}</div>}

          {tab === "ozet" && (
            <>
              <Card title="Hoş geldin, Yakup Usta 👋" subtitle="Sitenin tüm içeriğini buradan yönetebilirsin. Değişiklik yaptıktan sonra sağ üstteki “Kaydet”e bas.">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Stat label="Hizmet" value={data.services.length} icon="wrench" />
                  <Stat label="Portföy İşi" value={data.portfolio.length} icon="image" />
                  <Stat label="Referans Kurum" value={refCount} icon="handshake" />
                  <Stat label="Hizmet Bölgesi" value={data.serviceAreas.areas.length} icon="mapPin" />
                  <Stat label="S.S.S." value={data.faq.length} icon="clock" />
                </div>
              </Card>
              <Card title="Hızlı İşlemler">
                <div className="flex flex-wrap gap-2">
                  <Btn variant="ghost" onClick={() => setTab("portfoy")}>Portföy fotoğrafı ekle</Btn>
                  <Btn variant="ghost" onClick={() => setTab("referanslar")}>Referans ekle</Btn>
                  <Btn variant="ghost" onClick={() => setTab("genel")}>İletişim bilgisi düzenle</Btn>
                  <Btn variant="ghost" onClick={() => setTab("guvenlik")}>Şifre değiştir</Btn>
                  <a href="/" target="_blank">
                    <Btn variant="success">Siteyi Görüntüle ↗</Btn>
                  </a>
                </div>
              </Card>
            </>
          )}

          {tab === "genel" && (
            <Card title="Genel & İletişim Bilgileri">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="İşletme / Usta Adı">
                  <Input value={data.site.businessName} onChange={(e) => setSection("site", "businessName", e.target.value)} />
                </Field>
                <Field label="Slogan (isim altı)">
                  <Input value={data.site.tagline} onChange={(e) => setSection("site", "tagline", e.target.value)} />
                </Field>
                <Field label="Telefon (görünen)">
                  <Input value={data.site.phone} onChange={(e) => setSection("site", "phone", e.target.value)} />
                </Field>
                <Field label="Telefon (tıklanabilir, +90...)" hint="Örn: +905355801493">
                  <Input value={data.site.phoneRaw} onChange={(e) => setSection("site", "phoneRaw", e.target.value)} />
                </Field>
                <Field label="WhatsApp (+90...)" hint="Tüm WhatsApp butonları bu numarayı kullanır.">
                  <Input value={data.site.whatsapp} onChange={(e) => setSection("site", "whatsapp", e.target.value)} />
                </Field>
                <Field label="E-posta">
                  <Input value={data.site.email} onChange={(e) => setSection("site", "email", e.target.value)} />
                </Field>
                <Field label="Adres">
                  <Input value={data.site.address} onChange={(e) => setSection("site", "address", e.target.value)} />
                </Field>
                <Field label="Çalışma Saatleri">
                  <Input value={data.site.workingHours} onChange={(e) => setSection("site", "workingHours", e.target.value)} />
                </Field>
              </div>
              <div className="mt-4 grid gap-4">
                <Field label="Google Başlığı (SEO title)" hint="~55-60 karakter ideal">
                  <Input value={data.site.metaTitle} onChange={(e) => setSection("site", "metaTitle", e.target.value)} />
                </Field>
                <Field label="Google Açıklaması (meta description)" hint="~150-160 karakter ideal">
                  <Textarea rows={3} value={data.site.metaDescription} onChange={(e) => setSection("site", "metaDescription", e.target.value)} />
                </Field>
              </div>
            </Card>
          )}

          {tab === "hero" && (
            <>
              <Card title="Ana Sayfa Üst Bölüm">
                <div className="grid gap-4">
                  <Field label="Büyük Başlık">
                    <Textarea rows={2} value={data.hero.title} onChange={(e) => setSection("hero", "title", e.target.value)} />
                  </Field>
                  <Field label="Alt Metin">
                    <Textarea rows={3} value={data.hero.subtitle} onChange={(e) => setSection("hero", "subtitle", e.target.value)} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Ara Butonu Yazısı">
                      <Input value={data.hero.primaryCta} onChange={(e) => setSection("hero", "primaryCta", e.target.value)} />
                    </Field>
                    <Field label="WhatsApp Butonu Yazısı">
                      <Input value={data.hero.secondaryCta} onChange={(e) => setSection("hero", "secondaryCta", e.target.value)} />
                    </Field>
                  </div>
                </div>
              </Card>
              <Card
                title="Üst Bölüm İstatistikleri"
                subtitle="Ana sayfanın üstünde görünen güven kutucukları."
                action={<Btn variant="ghost" onClick={addStat}>+ Ekle</Btn>}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {(data.hero.stats || []).map((s, i) => (
                    <div key={i} className="flex items-end gap-2 rounded-lg border border-slate-200 p-3">
                      <Field label="Değer" hint="Örn: 30+">
                        <Input value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} />
                      </Field>
                      <Field label="Etiket" hint="Örn: Yıllık Tecrübe">
                        <Input value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} />
                      </Field>
                      <Btn variant="danger" onClick={() => removeStat(i)}>×</Btn>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === "rozetler" && (
            <Card
              title="Güven Rozetleri"
              action={<Btn variant="ghost" onClick={() => addArrItem("badges", { icon: "shield", title: "Yeni Rozet", text: "" })}>+ Ekle</Btn>}
            >
              <div className="space-y-4">
                {data.badges.map((b, i) => (
                  <div key={i} className="grid gap-3 rounded-lg border border-slate-200 p-4 sm:grid-cols-[150px_1fr_auto_auto]">
                    <Field label="İkon">
                      <IconPicker value={b.icon} onChange={(v) => setArrItem("badges", i, "icon", v)} icons={ICONS} />
                    </Field>
                    <div className="grid gap-2">
                      <Input value={b.title} onChange={(e) => setArrItem("badges", i, "title", e.target.value)} placeholder="Başlık" />
                      <Input value={b.text} onChange={(e) => setArrItem("badges", i, "text", e.target.value)} placeholder="Açıklama" />
                    </div>
                    <div className="flex items-center">
                      <Reorder
                        onUp={() => moveArrItem("badges", i, -1)}
                        onDown={() => moveArrItem("badges", i, 1)}
                        canUp={i > 0}
                        canDown={i < data.badges.length - 1}
                      />
                    </div>
                    <div className="flex items-end">
                      <Btn variant="danger" onClick={() => removeArrItem("badges", i)}>Sil</Btn>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "hakkimizda" && (
            <Card title="Hakkımızda">
              <div className="grid gap-4">
                <Field label="Kısa Vurgu Cümlesi">
                  <Input value={data.about.lead} onChange={(e) => setSection("about", "lead", e.target.value)} />
                </Field>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Paragraflar</span>
                    <Btn variant="ghost" onClick={() => setSection("about", "paragraphs", [...data.about.paragraphs, ""])}>+ Paragraf</Btn>
                  </div>
                  <div className="space-y-2">
                    {data.about.paragraphs.map((p, i) => (
                      <div key={i} className="flex gap-2">
                        <Textarea rows={3} value={p} onChange={(e) => setSection("about", "paragraphs", data.about.paragraphs.map((x, idx) => (idx === i ? e.target.value : x)))} />
                        <Btn variant="danger" onClick={() => setSection("about", "paragraphs", data.about.paragraphs.filter((_, idx) => idx !== i))}>Sil</Btn>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Öne Çıkanlar (maddeler)</span>
                    <Btn variant="ghost" onClick={() => setSection("about", "highlights", [...data.about.highlights, ""])}>+ Madde</Btn>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {data.about.highlights.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={h} onChange={(e) => setSection("about", "highlights", data.about.highlights.map((x, idx) => (idx === i ? e.target.value : x)))} />
                        <Btn variant="danger" onClick={() => setSection("about", "highlights", data.about.highlights.filter((_, idx) => idx !== i))}>×</Btn>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {tab === "hizmetler" && (
            <Card
              title="Hizmetler"
              action={<Btn variant="ghost" onClick={() => addArrItem("services", { id: "hizmet-" + Date.now(), title: "Yeni Hizmet", icon: "wrench", description: "" })}>+ Ekle</Btn>}
            >
              <div className="space-y-4">
                {data.services.map((s, i) => (
                  <div key={i} className="grid gap-3 rounded-lg border border-slate-200 p-4">
                    <div className="grid gap-3 sm:grid-cols-[170px_1fr_auto]">
                      <Field label="İkon">
                        <IconPicker value={s.icon} onChange={(v) => setArrItem("services", i, "icon", v)} icons={ICONS} />
                      </Field>
                      <Field label="Hizmet Adı">
                        <Input value={s.title} onChange={(e) => setArrItem("services", i, "title", e.target.value)} />
                      </Field>
                      <div className="flex items-center pt-6">
                        <Reorder
                          onUp={() => moveArrItem("services", i, -1)}
                          onDown={() => moveArrItem("services", i, 1)}
                          canUp={i > 0}
                          canDown={i < data.services.length - 1}
                        />
                      </div>
                    </div>
                    <Field label="Açıklama">
                      <Textarea rows={2} value={s.description} onChange={(e) => setArrItem("services", i, "description", e.target.value)} />
                    </Field>
                    <div className="flex justify-end">
                      <Btn variant="danger" onClick={() => removeArrItem("services", i)}>Hizmeti Sil</Btn>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "bolgeler" && (
            <Card title="Hizmet Bölgeleri">
              <div className="grid gap-4">
                <Field label="Başlık">
                  <Input value={data.serviceAreas.title} onChange={(e) => setSection("serviceAreas", "title", e.target.value)} />
                </Field>
                <Field label="Açıklama">
                  <Textarea rows={2} value={data.serviceAreas.intro} onChange={(e) => setSection("serviceAreas", "intro", e.target.value)} />
                </Field>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">İlçeler / Bölgeler</span>
                    <Btn variant="ghost" onClick={() => setSection("serviceAreas", "areas", [...data.serviceAreas.areas, ""])}>+ Bölge</Btn>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {data.serviceAreas.areas.map((a, i) => (
                      <div key={i} className="flex gap-1">
                        <Input value={a} onChange={(e) => setSection("serviceAreas", "areas", data.serviceAreas.areas.map((x, idx) => (idx === i ? e.target.value : x)))} />
                        <Btn variant="danger" onClick={() => setSection("serviceAreas", "areas", data.serviceAreas.areas.filter((_, idx) => idx !== i))}>×</Btn>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {tab === "portfoy" && (
            <Card
              title="Portföy"
              subtitle="İşlerinizin fotoğrafını, kategorisini ve açıklamasını ekleyin. Fotoğraflar site açılınca büyüyebilir (lightbox)."
              action={<Btn variant="ghost" onClick={() => addArrItem("portfolio", { id: "p" + Date.now(), title: "Yeni İş", category: "", description: "", image: null })}>+ Ekle</Btn>}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {data.portfolio.map((p, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-4">
                    <div className="mb-3 aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-1 text-xs text-slate-400">
                          <Icon name="image" className="h-8 w-8" />
                          Fotoğraf yok
                        </div>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Field label="Başlık">
                        <Input value={p.title} onChange={(e) => setArrItem("portfolio", i, "title", e.target.value)} />
                      </Field>
                      <Field label="Kategori" hint="Filtre için. Örn: Soğuk Oda, Kasap Dolabı">
                        <Input value={p.category || ""} onChange={(e) => setArrItem("portfolio", i, "category", e.target.value)} />
                      </Field>
                      <Field label="Açıklama">
                        <Textarea rows={2} value={p.description || ""} onChange={(e) => setArrItem("portfolio", i, "description", e.target.value)} />
                      </Field>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <label className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold ${uploading === i ? "bg-slate-200 text-slate-400" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                        {uploading === i ? "Yükleniyor…" : p.image ? "Fotoğrafı Değiştir" : "Fotoğraf Yükle"}
                        <input type="file" accept="image/*" className="hidden" disabled={uploading === i} onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0], i)} />
                      </label>
                      {p.image && (
                        <Btn variant="ghost" onClick={() => setArrItem("portfolio", i, "image", null)}>Fotoğrafı Kaldır</Btn>
                      )}
                      <div className="ml-auto flex items-center gap-2">
                        <Reorder
                          onUp={() => moveArrItem("portfolio", i, -1)}
                          onDown={() => moveArrItem("portfolio", i, 1)}
                          canUp={i > 0}
                          canDown={i < data.portfolio.length - 1}
                        />
                        <Btn variant="danger" onClick={() => removeArrItem("portfolio", i)}>Sil</Btn>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "referanslar" && data.references && (
            <>
              <Card title="Referanslar — Bölüm Yazıları">
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Üst Küçük Yazı">
                      <Input value={data.references.eyebrow || ""} onChange={(e) => setRefField("eyebrow", e.target.value)} />
                    </Field>
                    <Field label="Başlık">
                      <Input value={data.references.title || ""} onChange={(e) => setRefField("title", e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Açıklama">
                    <Textarea rows={3} value={data.references.intro || ""} onChange={(e) => setRefField("intro", e.target.value)} />
                  </Field>
                  <Field label="Alt Not" hint="Listenin altında, telefon butonunun yanında çıkar.">
                    <Textarea rows={2} value={data.references.note || ""} onChange={(e) => setRefField("note", e.target.value)} />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Tecrübe Sayısı" hint="Sadece rakam. Örn: 30">
                      <Input value={data.references.years || ""} onChange={(e) => setRefField("years", e.target.value)} />
                    </Field>
                    <Field label="Tecrübe Yazısı">
                      <Input value={data.references.yearsLabel || ""} onChange={(e) => setRefField("yearsLabel", e.target.value)} />
                    </Field>
                  </div>
                </div>
              </Card>

              <Card
                title="Sektör Grupları ve Kurumlar"
                action={
                  <Btn variant="ghost" onClick={() => setRefGroups([...refGroups, { id: "g" + Date.now(), icon: "handshake", label: "Yeni Grup", items: [] }])}>
                    + Grup Ekle
                  </Btn>
                }
              >
                <div className="space-y-4">
                  {refGroups.map((g, i) => (
                    <div key={g.id || i} className="grid gap-3 rounded-lg border border-slate-200 p-4">
                      <div className="grid gap-3 sm:grid-cols-[170px_1fr]">
                        <Field label="İkon">
                          <IconPicker value={g.icon} onChange={(v) => setRefGroup(i, "icon", v)} icons={ICONS} />
                        </Field>
                        <Field label="Grup Adı">
                          <Input value={g.label} onChange={(e) => setRefGroup(i, "label", e.target.value)} />
                        </Field>
                      </div>
                      <Field
                        label={`Kurumlar (${(g.items || []).filter((x) => x.trim()).length} adet)`}
                        hint="Her satıra bir kurum adı yazın."
                      >
                        <Textarea
                          rows={Math.max(4, (g.items || []).length + 1)}
                          value={(g.items || []).join("\n")}
                          onChange={(e) => setRefGroup(i, "items", e.target.value.split("\n"))}
                        />
                      </Field>
                      <div className="flex justify-end">
                        <Btn variant="danger" onClick={() => setRefGroups(refGroups.filter((_, idx) => idx !== i))}>
                          Grubu Sil
                        </Btn>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === "sss" && (
            <Card
              title="Sıkça Sorulan Sorular"
              action={<Btn variant="ghost" onClick={() => addArrItem("faq", { q: "", a: "" })}>+ Ekle</Btn>}
            >
              <div className="space-y-4">
                {data.faq.map((f, i) => (
                  <div key={i} className="grid gap-2 rounded-lg border border-slate-200 p-4">
                    <Field label="Soru">
                      <Input value={f.q} onChange={(e) => setArrItem("faq", i, "q", e.target.value)} />
                    </Field>
                    <Field label="Cevap">
                      <Textarea rows={2} value={f.a} onChange={(e) => setArrItem("faq", i, "a", e.target.value)} />
                    </Field>
                    <div className="flex items-center justify-between">
                      <Reorder
                        onUp={() => moveArrItem("faq", i, -1)}
                        onDown={() => moveArrItem("faq", i, 1)}
                        canUp={i > 0}
                        canDown={i < data.faq.length - 1}
                      />
                      <Btn variant="danger" onClick={() => removeArrItem("faq", i)}>Sil</Btn>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "guvenlik" && (
            <Card title="Şifre Değiştir" subtitle="Panel giriş şifrenizi buradan güncelleyebilirsiniz.">
              <form onSubmit={changePassword} className="grid max-w-md gap-4">
                <Field label="Mevcut Şifre">
                  <Input type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
                </Field>
                <Field label="Yeni Şifre" hint="En az 4 karakter.">
                  <Input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
                </Field>
                <Field label="Yeni Şifre (Tekrar)">
                  <Input type="password" value={pw.again} onChange={(e) => setPw({ ...pw, again: e.target.value })} />
                </Field>
                {pwMsg && (
                  <p className={`text-sm font-medium ${pwMsg.startsWith("✓") ? "text-emerald-600" : "text-red-600"}`}>{pwMsg}</p>
                )}
                <Btn type="submit" className="w-fit">Şifreyi Güncelle</Btn>
              </form>
            </Card>
          )}

          {/* Alt kaydet */}
          {tab !== "ozet" && tab !== "guvenlik" && (
            <div className="flex justify-end pb-24 md:pb-10">
              <Btn onClick={save} disabled={saving || !dirty}>
                {saving ? "Kaydediliyor…" : "Değişiklikleri Kaydet"}
              </Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <div className="font-heading text-xl font-extrabold text-[var(--navy)]">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  );
}
