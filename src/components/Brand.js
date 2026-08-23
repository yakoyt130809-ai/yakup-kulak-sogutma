import Icon from "./Icon";

/**
 * Marka kilidi (logo + kelime işareti).
 * İsim "...Servis" ile bitiyorsa iki tonlu yazılır: "Soğuk" koyu + "Servis" mavi.
 */
function splitName(name = "") {
  const m = name.match(/^(.*?)(servis)$/i);
  if (m && m[1].trim()) return [m[1].trim(), m[2]];
  return [name, ""];
}

export default function Brand({ name, tagline, variant = "light", href = "#anasayfa" }) {
  const [head, tail] = splitName(name);
  const dark = variant === "dark";

  return (
    <a
      href={href}
      className="group flex items-center gap-2.5"
      aria-label={`${name} — ana sayfa`}
    >
      {/* Kar tanesi amblemi */}
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[var(--navy)] shadow-md shadow-brand/25 transition-transform duration-500 group-hover:scale-105 sm:h-11 sm:w-11">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-xl bg-white/0 transition-colors duration-500 group-hover:bg-white/10"
        />
        <Icon
          name="snowflake"
          className="h-5 w-5 text-white transition-transform duration-[900ms] ease-out group-hover:rotate-90 sm:h-6 sm:w-6"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-heading text-[21px] font-extrabold tracking-tight sm:text-[25px]">
          <span className={dark ? "text-white" : "text-[var(--navy)]"}>{head}</span>
          {tail && (
            <span className={dark ? "text-blue-300" : "text-brand"}>{tail}</span>
          )}
        </span>
        {tagline && (
          <span
            className={`mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
              dark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-1 w-1 rounded-full ${dark ? "bg-blue-300" : "bg-brand"}`}
            />
            {tagline}
          </span>
        )}
      </span>
    </a>
  );
}
