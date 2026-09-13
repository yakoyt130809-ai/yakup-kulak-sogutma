export default function LogoMark({ className = "", idSuffix = "brand" }) {
  const markId = `sogukservis-mark-${idSuffix}`;
  const shineId = `sogukservis-shine-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={markId} x1="7" y1="5" x2="42" y2="44">
          <stop offset="0" stopColor="#1687ff" />
          <stop offset="0.55" stopColor="#0e5bd6" />
          <stop offset="1" stopColor="#082854" />
        </linearGradient>
        <linearGradient id={shineId} x1="13" y1="8" x2="34" y2="39">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="1" y="1" width="46" height="46" rx="14" fill={`url(#${markId})`} />
      <path
        d="M7.5 25.5C10.5 15.2 18.2 8.8 29 7.3C20.7 11.6 16.2 18.4 15.6 27.8C14.2 28.1 12.7 28.3 11.1 28.3C9.2 28.3 7.6 27.1 7.5 25.5Z"
        fill={`url(#${shineId})`}
      />
      <path
        d="M31.2 16.8C29.1 14.8 26.4 13.7 23.5 13.7C19.2 13.7 16.3 15.8 16.3 18.9C16.3 22.3 19.1 23.5 23.8 24.4C28.4 25.3 31.4 26.5 31.4 29.8C31.4 33.2 28.2 35.5 23.5 35.5C20.1 35.5 17 34.3 14.7 32.2"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g stroke="#9de3ff" strokeWidth="1.8" strokeLinecap="round">
        <path d="M35 8.5V17.5" />
        <path d="M31.1 10.8L38.9 15.2" />
        <path d="M38.9 10.8L31.1 15.2" />
      </g>
      <circle cx="35" cy="13" r="1.7" fill="#ffffff" />
      <circle cx="37.5" cy="36.5" r="2" fill="#57c9ff" fillOpacity="0.9" />
    </svg>
  );
}
