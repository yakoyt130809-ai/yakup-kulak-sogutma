// Basit, bağımlılıksız SVG ikon seti. name ile ikon seçilir.
const PATHS = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.5 7 21l5-3 5 3-1.5-7.5" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 0 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a2 2 0 0 0-2.6-.2l-1.6 1.1a2 2 0 0 1-2.6-.2L7 8" />
      <path d="m21 3-4 1-4 4" />
      <path d="M3 5l4-1 5 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 2v20M2 12h20" />
      <path d="m4.9 4.9 14.2 14.2M19.1 4.9 4.9 19.1" />
    </>
  ),
  milk: (
    <>
      <path d="M8 2h8M8 2v3l-2 3v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8l-2-3V2" />
      <path d="M6 12h12" />
    </>
  ),
  meat: (
    <>
      <path d="M13.5 3a5.5 5.5 0 0 1 5.5 5.5c0 2-1 3.5-2.5 4.5L9 20a3 3 0 0 1-5-4l7-7C11.5 4 12.5 3 13.5 3Z" />
      <circle cx="15" cy="8" r="1.2" />
    </>
  ),
  cake: (
    <>
      <path d="M4 21h16v-6a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v6Z" />
      <path d="M4 16c1.5 1.5 3 1.5 4 0s2.5-1.5 4 0 2.5 1.5 4 0" />
      <path d="M12 8V5M12 5l1-1-1-1-1 1 1 1Z" />
    </>
  ),
  fridge: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M6 10h12" />
      <path d="M9 5v2M9 13v3" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18l3 3 6.4-6.3a4 4 0 0 0 5.3-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  phone: (
    <>
      <path d="M5 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.5 8.2c-.2 0-.5 0-.7.4-.2.4-.8 1-.8 2.2s.9 2.5 1 2.7c.1.2 1.7 2.9 4.3 3.9 2.1.8 2.6.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.2l-1.7-.8c-.2-.1-.5-.2-.7.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.5-.7-2.3-1.7-.6-.7-.6-1-.4-1.2l.4-.6c.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.3-.6-.3Z" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  hospital: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M3 21h18" />
      <path d="M12 9.5v5M9.5 12h5" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10l5 3v-3l5 3V6h4v15" />
      <path d="M9 17h2M14 17h2" />
    </>
  ),
  utensils: (
    <>
      <path d="M6 3v5a2.5 2.5 0 0 0 5 0V3" />
      <path d="M8.5 10.5V21" />
      <path d="M17.5 3c-1.5 1.6-2 3.5-2 5.5 0 1.9.7 3 2 3.5V21" />
    </>
  ),
  hotel: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2" />
      <path d="M10 21v-4h4v4" />
    </>
  ),
  ship: (
    <>
      <path d="M4 17.5 5.6 12a1 1 0 0 1 1-.7h10.8a1 1 0 0 1 1 .7L20 17.5" />
      <path d="M12 11.3V4.5M12 4.5h5l-5 3" />
      <path d="M2 20c1.7 0 1.7 1.4 3.3 1.4S7 20 8.7 20s1.6 1.4 3.3 1.4S13.7 20 15.3 20s1.7 1.4 3.4 1.4S20.3 20 22 20" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  star: (
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
    </>
  ),
  check2: <path d="m4 12 5 5L20 6" />,
  chevronUp: <path d="m6 15 6-6 6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
      <path d="M9 7V4h6v3" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 13 16 9" />
      <path d="M4 20a8 8 0 1 1 16 0" />
      <circle cx="12" cy="13" r="1.4" />
    </>
  ),
};

export default function Icon({ name, className = "", filled = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] || null}
    </svg>
  );
}
