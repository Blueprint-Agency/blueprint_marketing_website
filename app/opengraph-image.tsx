import { ImageResponse } from "next/og";

export const alt =
  "Blueprint. The crowd is already walking past your door.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Shared into WhatsApp, this is the whole first impression. The old site had
 * no OG tags at all, so every share previewed as a bare URL — on the one
 * channel the entire funnel depends on.
 */
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
          background: "linear-gradient(160deg,#120926 0%,#1c1039 45%,#341751 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* string lights */}
        <div style={{ display: "flex", gap: 22 }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 99,
                background: "#ffe3a8",
                boxShadow: "0 0 18px 5px rgba(255,177,60,0.55)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: "#ffb13c",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            Marketing &amp; systems · Kuala Lumpur
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              color: "#e9f5ff",
              fontWeight: 900,
              marginTop: 20,
              letterSpacing: -2,
            }}
          >
            The crowd is already
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.02,
              color: "#ffb13c",
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            walking past your door.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 30, color: "#eaf2fb", fontWeight: 600 }}>
            We make them stop.
          </div>
          <div
            style={{
              display: "flex",
              background: "#25d366",
              color: "#0d0619",
              fontSize: 28,
              fontWeight: 900,
              padding: "14px 26px",
              borderRadius: 8,
            }}
          >
            Blueprint
          </div>
        </div>
      </div>
    ),
    size,
  );
}
