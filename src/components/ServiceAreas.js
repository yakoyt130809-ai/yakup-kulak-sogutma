import Link from "next/link";
import Icon from "./Icon";
import { getAreaPageByName } from "@/lib/area-pages";

export default function ServiceAreas({ serviceAreas }) {
  return (
    <section
      id="bolgeler"
      className="section-anchor bg-[var(--navy)] py-16 text-white sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-300">
            Hizmet Bölgeleri
          </span>
          <h2 className="mt-2 font-heading text-3xl font-extrabold sm:text-4xl">
            {serviceAreas.title}
          </h2>
          <p className="mt-4 text-blue-100">{serviceAreas.intro}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {serviceAreas.areas.map((a) => {
            const areaPage = getAreaPageByName(a);
            const className =
              "inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15";

            return areaPage ? (
              <Link
                key={a}
                href={`/servis-bolgeleri/${areaPage.slug}`}
                className={`${className} transition hover:bg-white hover:text-[var(--navy)]`}
              >
                <Icon name="mapPin" className="h-4 w-4 text-blue-300" />
                {a}
              </Link>
            ) : (
              <span key={a} className={className}>
                <Icon name="mapPin" className="h-4 w-4 text-blue-300" />
                {a}
              </span>
            );
          })}
        </div>
        <div className="mt-9 text-center">
          <Link
            href="/servis-bolgeleri"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--navy)] transition hover:bg-blue-50"
          >
            Tüm servis bölgelerini incele →
          </Link>
        </div>
      </div>
    </section>
  );
}
