"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, Input } from "@/components/ui/Field";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

export function ContactoCTA() {
  const [sent, setSent] = useState(false);

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
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 12px" }} role="status">
              <CheckCircle
                className="ic-lg"
                style={{ color: "var(--mte-success)", display: "inline-flex" }}
                aria-hidden="true"
              />
              <h3 style={{ fontFamily: "var(--font-display)", marginTop: "14px" }}>
                ¡Gracias! Le contactaremos pronto.
              </h3>
              <p style={{ marginTop: "8px" }}>
                Un especialista revisará su caso y le responderá a la brevedad.
              </p>
            </div>
          ) : (
            /* NOTE: the design ships a front-end-only submit — it flips to the
               thank-you state without sending anything anywhere. Wire this to a
               Server Action or route handler before going live. */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  marginBottom: "6px",
                  color: "var(--text-heading)",
                }}
              >
                Solicite su diagnóstico sin costo
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "20px" }}>
                Respuesta en menos de 24 h hábiles.
              </p>
              <div style={{ display: "grid", gap: "14px" }}>
                <Field label="Nombre" required>
                  <Input name="nombre" required placeholder="Su nombre" autoComplete="name" />
                </Field>
                <div className="grid-2" style={{ gap: "14px" }}>
                  <Field label="Empresa">
                    <Input name="empresa" placeholder="Empresa" autoComplete="organization" />
                  </Field>
                  <Field label="Teléfono / WhatsApp" required>
                    <Input
                      name="telefono"
                      type="tel"
                      required
                      placeholder="+52..."
                      autoComplete="tel"
                    />
                  </Field>
                </div>
                <Field label="Correo">
                  <Input
                    name="correo"
                    type="email"
                    placeholder="correo@empresa.com"
                    autoComplete="email"
                  />
                </Field>
                <Field
                  label="Tipo de máquina y marca de control"
                  hint="Ej. Torno Fanuc 0i, Fresadora Siemens 840D"
                >
                  <Input name="equipo" placeholder="Describa su equipo" />
                </Field>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  type="submit"
                  iconRight={<ArrowRight className="ic-sm" aria-hidden="true" />}
                >
                  Solicitar diagnóstico sin costo
                </Button>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
                  Sus datos se usan únicamente para contactarle sobre su proyecto.
                </p>
              </div>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}
