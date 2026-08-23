import Icon from "./Icon";
import { waLink, generalMessage } from "@/lib/wa";

// Mobilde ekranın altına sabitlenen "Ara / WhatsApp" çubuğu — dönüşüm için kritik.
export default function MobileCTABar({ site }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <a
        href={`tel:${site.phoneRaw}`}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-[var(--navy)]"
      >
        <Icon name="phone" className="h-5 w-5 text-brand" />
        Hemen Ara
      </a>
      <a
        href={waLink(site.whatsapp, generalMessage(site.businessName))}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-bold text-white"
      >
        <Icon name="whatsapp" className="h-5 w-5" filled />
        WhatsApp
      </a>
    </div>
  );
}
