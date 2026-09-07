import { ImageResponse } from "next/og";

export const alt = "SoğukServis - İstanbul ticari soğutma tamiri";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        color: "white",
        background:
          "linear-gradient(135deg, #071a33 0%, #0b3b70 58%, #0d79c9 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "76px",
            height: "76px",
            borderRadius: "22px",
            background: "#ffffff",
            color: "#0b5fa5",
            fontSize: "42px",
            fontWeight: 800,
          }}
        >
          S
        </div>
        <div style={{ display: "flex", fontSize: "42px", fontWeight: 800 }}>
          SoğukServis
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        <div
          style={{
            display: "flex",
            maxWidth: "980px",
            fontSize: "66px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          İstanbul Ticari Soğutma Tamiri
        </div>
        <div style={{ display: "flex", fontSize: "30px", color: "#d7ebff" }}>
          Soğuk oda · Kasap dolabı · Pastane dolabı · Sanayi tipi buzdolabı
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "26px",
          color: "#d7ebff",
        }}
      >
        <div style={{ display: "flex" }}>30 yıllık tecrübe · 7/24 servis</div>
        <div
          style={{
            display: "flex",
            padding: "14px 24px",
            borderRadius: "999px",
            background: "#ffffff",
            color: "#0b3b70",
            fontWeight: 800,
          }}
        >
          0535 580 14 93
        </div>
      </div>
    </div>,
    size,
  );
}
