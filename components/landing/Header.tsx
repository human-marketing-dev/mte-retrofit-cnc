import type { CSSProperties } from "react";
import { ArrowRight, Award, BadgeCheck, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DiagnosticoForm } from "./DiagnosticoForm";
import { Logo } from "./Logo";
import { PATTERN_SRC, PHONE_DISPLAY, PHONE_HREF } from "./constants";

const navLink: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 500,
  fontSize: "15px",
  color: "var(--mte-gray-700)",
  textDecoration: "none",
};

export function Header() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "74px",
          gap: "20px",
        }}
      >
        <Logo height={46} />
        <nav className="hdr-nav" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <a href="#proceso" style={navLink}>
            Proceso
          </a>
          <a href="#beneficios" style={navLink}>
            Beneficios
          </a>
          <a href="#maquinas" style={navLink}>
            Máquinas
          </a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <a
            href={PHONE_HREF}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--mte-blue)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            <Phone className="ic-sm" aria-hidden="true" />
            <span className="hdr-phone">{PHONE_DISPLAY}</span>
          </a>
          <Button variant="primary" size="sm" href="#contacto">
            Diagnóstico sin costo
          </Button>
        </div>
      </div>
    </header>
  );
}

const TRUST_MARKS = [
  { Icon: MapPin, label: "Servicio en todo México" },
  { Icon: BadgeCheck, label: "Garantía sobre el retrofit" },
  { Icon: Award, label: "+30 años en maquinaria CNC" },
] as const;

export function Hero() {
  return (
    <section id="top" style={{ position: "relative", background: "var(--mte-blue)", overflow: "hidden" }}>
      {/* signature square pattern, right side */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, no optimization wanted */}
      <img
        src={PATTERN_SRC}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-60px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "125%",
          width: "auto",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
      {/* subtle fade, purely to keep hero text legible over the pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, var(--mte-blue) 38%, rgba(0,51,153,0.6) 100%)",
        }}
      />
      <div
        className="container grid-2"
        style={{
          position: "relative",
          paddingBlock: "clamp(3.5rem, 7vw, 6.5rem)",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#fff" }}>
          <div className="mte-eyebrow" style={{ marginBottom: "18px" }}>
            Especialistas en control numérico · México
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--fs-display)",
              lineHeight: 1.04,
              letterSpacing: "-.02em",
              color: "#fff",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Retrofit de Maquinaria CNC en México
          </h1>
          <p
            style={{
              fontSize: "1.3rem",
              lineHeight: 1.45,
              color: "var(--mte-blue-100)",
              marginTop: "22px",
              maxWidth: "640px",
            }}
          >
            Su torno, fresadora o centro de maquinado puede volver a producir con la confiabilidad
            de un equipo nuevo. Retiramos la electrónica obsoleta, conservamos la estructura
            mecánica que ya tiene y le devolvemos su máquina lista para trabajar,{" "}
            <strong style={{ color: "#fff", fontWeight: 600 }}>a una fracción del costo.</strong>
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--mte-blue-200)",
              marginTop: "14px",
              maxWidth: "620px",
            }}
          >
            Sustituimos su control obsoleto por Fanuc o Heidenhain de última generación, en
            cualquier tipo de máquina CNC.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "32px" }}>
            <Button
              variant="onBrand"
              size="lg"
              href="#contacto"
              iconRight={<ArrowRight className="ic-sm" aria-hidden="true" />}
            >
              Solicitar diagnóstico sin costo
            </Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: "36px" }}>
            {TRUST_MARKS.map(({ Icon, label }) => (
              <span
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  color: "#fff",
                  fontSize: "14px",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Icon className="ic-sm" style={{ color: "var(--mte-cyan)" }} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Lead form, above the fold. Same component as the closing CTA — each
            instance keeps its own submitted state. */}
        <Card tone="light" padding="clamp(22px,2.5vw,32px)">
          <DiagnosticoForm headingAs="h2" compact />
        </Card>
      </div>
    </section>
  );
}

/* FloatingWhatsApp moved to its own client component (it now opens a chat
   popup), so Header.tsx stays a Server Component. */
