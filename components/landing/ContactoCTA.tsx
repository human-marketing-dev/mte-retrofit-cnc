import type { CSSProperties } from "react";
import { MessageCircle, Phone } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiagnosticoForm } from "./DiagnosticoForm";
import { PATTERN_SRC, PHONE_DISPLAY, PHONE_HREF, WA_LINK } from "./constants";

const ctaRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  textDecoration: "none",
  color: "#fff",
};
const ctaIcon: CSSProperties = {
  flexShrink: 0,
  width: "46px",
  height: "46px",
  borderRadius: "var(--radius-md)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};
const ctaLbl: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "15px",
};
const ctaVal: CSSProperties = { fontSize: "13px", color: "var(--mte-blue-200)" };

/* The form is the only interactive part, and it now owns its own "use client"
   boundary — so this section is back to being a Server Component. */
export function ContactoCTA() {
  return (
    <section
      id="contacto"
      className="section section--brand"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, no optimization wanted */}
      <img
        src={PATTERN_SRC}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-80px",
          top: "-40px",
          height: "130%",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />
      <div className="container grid-2" style={{ position: "relative", alignItems: "start" }}>
        <div style={{ paddingTop: "8px" }}>
          <SectionHeading
            eyebrow="Hablemos"
            title="Recupere la confiabilidad de su máquina CNC"
            onBrand
          />
          <p
            style={{
              color: "var(--mte-blue-100)",
              fontSize: "1.15rem",
              lineHeight: 1.5,
              marginTop: "20px",
            }}
          >
            Solicite un diagnóstico sin costo. Le decimos con claridad si su equipo es candidato a
            retrofit y cuál es la mejor solución para su caso.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "28px" }}>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={ctaRow}>
              <span style={{ ...ctaIcon, background: "var(--whatsapp)" }}>
                <MessageCircle className="ic-md" aria-hidden="true" />
              </span>
              <div>
                <div style={ctaLbl}>WhatsApp directo</div>
                <div style={ctaVal}>Respuesta inmediata</div>
              </div>
            </a>
            <a href={PHONE_HREF} style={ctaRow}>
              <span style={{ ...ctaIcon, background: "var(--mte-cyan)" }}>
                <Phone className="ic-md" aria-hidden="true" />
              </span>
              <div>
                <div style={ctaLbl}>Llamar ahora</div>
                <div style={ctaVal}>{PHONE_DISPLAY}</div>
              </div>
            </a>
          </div>
        </div>

        <Card tone="light" padding="clamp(24px,3vw,36px)">
          <DiagnosticoForm />
        </Card>
      </div>
    </section>
  );
}
