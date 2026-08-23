// WhatsApp "click-to-chat" (deep link) yardımcıları.
// NOT: Resmi WhatsApp Business Platform API ücretli bir servis sağlayıcı (Twilio,
// Meta Cloud API vb.) gerektirir. Küçük/lokal işletme için doğru ve ÜCRETSIZ yöntem
// wa.me linkleridir: kullanıcının telefonunda WhatsApp'ı hazır mesajla açar.

// Numaradaki boşluk, +, parantez vb. temizler → sadece rakam bırakır.
export function waDigits(raw = "") {
  return String(raw).replace(/[^0-9]/g, "");
}

// Hazır mesajlı WhatsApp linki üretir.
export function waLink(raw, message = "") {
  const n = waDigits(raw);
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${n}${q}`;
}

// Belirli bir hizmet için hazır mesaj metni.
export function serviceMessage(businessName, serviceTitle) {
  return `Merhaba ${businessName}, "${serviceTitle}" hizmeti için bilgi ve fiyat almak istiyorum.`;
}

// Portföydeki bir işe benzer iş için hazır mesaj.
export function portfolioMessage(businessName, workTitle) {
  return `Merhaba ${businessName}, portföyünüzdeki "${workTitle}" işine benzer bir ihtiyacım var. Bilgi alabilir miyim?`;
}

// Genel iletişim mesajı.
export function generalMessage(businessName) {
  return `Merhaba ${businessName}, soğutma sistemim için servis talep etmek istiyorum.`;
}
