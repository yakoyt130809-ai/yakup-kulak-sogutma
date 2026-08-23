# YAKUP KULAK — Soğutma Tamiri Web Sitesi

İstanbul geneli (Avrupa **ve** Anadolu Yakası) soğuk oda, kasap/pastane/süt dolabı ve
sanayi tipi buzdolabı tamiri için SEO odaklı tanıtım sitesi + WordPress tarzı admin paneli.

## Teknolojiler
- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4**
- İçerik veritabanı yerine **`data/content.json`** dosyasında tutulur (lokal için ideal).

---

## Nasıl Çalıştırılır (Lokal)

Bir defaya mahsus (zaten kuruldu):
```
npm install
```

Geliştirme sunucusu (her gün bunu çalıştır):
```
npm run dev
```
Sonra tarayıcıda aç:
- **Site:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

Sunucuyu durdurmak için terminalde `Ctrl + C`.

---

## Admin Paneli (WordPress tarzı)

Adres: **http://localhost:3000/admin**

Giriş şifresi `.env.local` dosyasındaki `ADMIN_PASSWORD` değeridir.
- Varsayılan şifre: `yakupkulak2024`  → **mutlaka değiştir.**

Panelden düzenlenebilenler:
| Sekme | Ne yönetilir |
|-------|--------------|
| **Özet** | Tek bakışta içerik sayıları (hizmet/portföy/yorum/referans) + hızlı işlem butonları |
| Genel & İletişim | İsim, telefon, WhatsApp, adres, saatler, SEO başlık/açıklama |
| Ana Sayfa (Üst) | Büyük başlık, alt metin, buton yazıları **+ üst istatistik kutucukları** |
| Rozetler | Güven rozetleri (görsel ikon seçici + yazı) — ekle/sil/**sırala** |
| Hakkımızda | Vurgu cümlesi, paragraflar, öne çıkanlar — ekle/sil |
| Hizmetler | Hizmet kartları (görsel ikon seçici, ad, açıklama) — ekle/sil/**sırala** |
| Bölgeler | Hizmet verilen ilçeler — ekle/sil |
| Portföy | İş fotoğrafı yükle/değiştir/kaldır, **kategori + açıklama** — ekle/sil/**sırala** |
| Referanslar | Bölüm yazıları + sektör grupları; her gruba kurum adlarını **alt alta** yaz |
| Yorumlar | Müşteri yorumları (isim, bölge, puan, metin) — ekle/sil/**sırala** |
| S.S.S. | Sıkça sorulan sorular — ekle/sil/**sırala** |
| **Güvenlik** | Panel giriş şifresini değiştir |

Değişiklikten sonra **"Kaydet"** butonuna bas, sonra siteyi yenile.
Kaydedilmemiş değişiklik varsa sağ üstte **"Kaydedilmedi"** uyarısı çıkar ve sayfadan
çıkmadan önce tarayıcı seni uyarır. Yüklenen fotoğraflar `public/uploads/` klasörüne kaydedilir.

### Şifre değiştirme
- **Güvenlik** sekmesinden mevcut şifre + yeni şifre ile değiştirilir.
- Yeni şifre `data/settings.json` içinde **scrypt ile hash'lenerek** saklanır (düz metin değil).
- settings.json yoksa sistem `.env.local` → `ADMIN_PASSWORD`'ı kullanır (ilk kurulum).
- settings.json ve `public/uploads` git'e gönderilmez (`.gitignore`).

## WhatsApp Entegrasyonu
- Tüm WhatsApp butonları **wa.me hazır-mesaj (click-to-chat)** linkleri kullanır — ücretsiz,
  kartsız, telefonda WhatsApp'ı hazır metinle açar (`src/lib/wa.js`).
- Her **hizmet kartı** ve her **portföy işi** kendi konusuna göre hazır mesajla açılır.
- Sağ altta **WhatsApp hızlı-sohbet balonu** (hazır konu şablonları) + yukarı çık butonu.
- Mobilde ekran altında sabit **"Ara / WhatsApp"** çubuğu (dönüşüm için).
- Not: Resmi WhatsApp Business **Platform API** ücretli sağlayıcı ister; küçük/lokal işletme
  için doğru yöntem burada kullanılan wa.me linkleridir. İstersen WhatsApp **Business
  uygulaması** (ücretsiz) ile aynı numarada işletme profili açılabilir.

## Site Özellikleri
- Kaydırınca beliren yumuşak animasyonlar (`RevealProvider`).
- Portföyde **kategori filtresi** + fotoğrafa tıklayınca **büyütme (lightbox)**.
- Ana sayfada güven **istatistik şeridi**; yorumlarda **ortalama puan** kartı.

### Referanslar bölümü nasıl çalışır
- İçerik `data/content.json` → `references` altında durur.
- `groups` = sektör kartları. Her kartın bir **ikonu**, bir **adı** ve **kurum listesi** vardır.
- Panelde kurumlar tek bir kutuya **her satıra bir isim** şeklinde yazılır; boş satırlar
  otomatik atılır. Kart üstündeki "x kurum" sayısı ve üstteki "toplam referans"
  rakamı listeden **kendiliğinden** hesaplanır, elle güncellemek gerekmez.
- Yeni sektör eklemek için "+ Grup Ekle" → ikonu seç, adı yaz, isimleri alt alta gir.
- Kullanılabilir ikonlar: `hospital`, `factory`, `meat`, `utensils`, `hotel`, `ship`,
  `snowflake`, `milk`, `cake`, `fridge`, `wrench` vb. (`src/components/Icon.js`).

---

## SEO — Neler Yapıldı

- ✅ **Teknik:** Next.js ile hızlı sayfa (Core Web Vitals), tam mobil uyum, otomatik `sitemap.xml` ve `robots.txt`, temiz URL yapısı.
- ✅ **Sayfa içi:** Anahtar kelime odaklı `<h1>/<h2>`, `<title>` ve meta açıklaması (panelden düzenlenebilir), görsellerde `alt` metni, iç linkleme (menü + footer + hizmet linkleri).
- ✅ **Yapısal veri (Schema):** `LocalBusiness (HVACBusiness)`, `Service`, `Review`, `AggregateRating`, `FAQPage` — Google'da yıldız/zengin sonuç şansı.
- ✅ **Yerel SEO:** İlçe bazlı bölge listesi, adres/telefon/saat tutarlılığı, harita.
- 🔜 **Sen yapacaksın (global'e geçince):**
  - Google İşletme Profili oluştur (en önemlisi!).
  - Google Search Console + Analytics ekle (siteyi doğrula, sitemap gönder).
  - Gerçek iş fotoğrafları ve gerçek müşteri yorumları ekle.
  - Backlink: sektör siteleri, yerel dizinler, sosyal medya.

---

## Lokal'den Global'e (Yayına Alma) Geçiş

1. `.env.local` içinde `NEXT_PUBLIC_SITE_URL` değerini kendi domainine çevir
   (örn: `https://yakupkulaksogutma.com`).
2. Ücretsiz yayın için **Vercel** önerilir (kart gerekmez):
   - Projeyi GitHub'a yükle → Vercel'e bağla → otomatik yayınlanır, HTTPS gelir.
   - Not: Vercel'de dosya sistemi kalıcı olmadığından, admin panelinin yazdığı
     `content.json` ve yüklenen fotoğraflar için küçük bir veritabanı/depolama
     (ör. Vercel Postgres/Blob veya Supabase — hepsi ücretsiz katman) eklenmeli.
     Bu, global'e geçerken yapılacak tek ek adımdır; site yapısı hazır.

---

## Klasör Yapısı (özet)
```
data/content.json          → tüm site içeriği (admin bunu düzenler)
data/settings.json         → şifre hash'i (ilk değişince oluşur, git'e gitmez)
src/app/page.js            → ana sayfa (tüm bölümler)
src/app/admin/             → yönetim paneli (Özet + tüm sekmeler)
src/app/api/               → giriş, çıkış, içerik kaydet, fotoğraf yükle, şifre değiştir
src/app/sitemap.js         → otomatik site haritası
src/app/robots.js          → robots.txt
src/lib/wa.js              → WhatsApp hazır-mesaj link yardımcıları
src/lib/settings.js        → şifre saklama/doğrulama (scrypt)
src/components/            → Header, Hero, Services, Portfolio(lightbox), MobileCTABar vb.
src/components/admin/ui.js → panel arayüz parçaları (IconPicker, Reorder vb.)
public/uploads/            → yüklenen fotoğraflar (git'e gitmez)
```
