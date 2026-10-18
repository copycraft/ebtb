import { ImageResponse } from "next/og";

/** Social share card: the sticker look in flat blocks. Uses the default font — no network fetch at build time. */
export const alt = "EBTB — Minden, csak a bagel nem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#6B3FD4",
          border: "16px solid #241C33",
          padding: 64,
          color: "#FFFDF7",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              background: "#F7A81B",
              color: "#241C33",
              border: "4px solid #241C33",
              borderRadius: 999,
              padding: "10px 28px",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 3,
              transform: "rotate(-4deg)",
            }}
          >
            0 BAGEL
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 220, fontWeight: 900, lineHeight: 0.9, color: "#FFCB61", textShadow: "10px 10px 0 #241C33" }}>EBTB</div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 800, marginTop: 24 }}>Minden, csak a bagel nem</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#E6DDFB" }}>6 ÖSSZETEVŐ — 0 BAGEL — 2 NAP ALATT NÁLAD</div>
      </div>
    ),
    size,
  );
}
