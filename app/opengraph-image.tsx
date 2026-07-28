import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Blueprint. We get Malaysian businesses more customers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Shared into WhatsApp, this is the whole first impression. The old site had
 * no OG tags at all, so every share previewed as a bare URL, on the one
 * channel the entire funnel depends on.
 *
 * Rebuilt for the Plain world on 2026-07-28. It was a night-market gradient
 * with string lights; a share card in the deleted world's colours would have
 * been the first and last thing most people saw of a site that no longer
 * looks anything like it. Paper ground, ink type, the brand ramp as a top
 * rule, and the action green reserved for the WhatsApp line, exactly as the
 * page itself treats it.
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
          background: "#fcfcfd",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* The brand ramp as a top rule, the same device the page uses. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              "linear-gradient(90deg,#1e4fe0 0%,#6c4bf0 40%,#25c9e8 75%,#fcfcfd 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#0b0c0e",
              color: "#fcfcfd",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            B
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#0b0c0e" }}>
            Blueprint
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#0b0c0e",
              maxWidth: 940,
            }}
          >
            We get Malaysian businesses more customers.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.4,
              color: "#494e56",
              marginTop: 26,
              maxWidth: 880,
            }}
          >
            The marketing that brings people in, and the booking, CRM and
            WhatsApp systems that stop you losing them.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#25d366",
            }}
          />
          {/* display:flex is required, not cosmetic: Satori rejects any div
              with more than one child node, and the interpolation below
              counts as two. */}
          <div
            style={{
              display: "flex",
              fontSize: 25,
              fontWeight: 600,
              color: "#0b0c0e",
            }}
          >
            WhatsApp {SITE.whatsappDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
