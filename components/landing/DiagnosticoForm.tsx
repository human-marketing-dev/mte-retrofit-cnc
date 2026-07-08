"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

/**
 * The lead-capture form. Rendered twice on the landing — once in the hero, once
 * in the closing CTA — so it lives here rather than being copy-pasted; the two
 * instances can never drift apart.
 *
 * Each instance owns its own `sent` state, which is what we want: submitting the
 * hero form should not blank out the one at the bottom of the page.
 *
 * Fields carry `name` but no `id`. <Field> wraps its control in a <label>, so
 * the association is structural — that is what makes two instances on one page
 * safe. Adding ids here would produce duplicates and break the labels.
 *
 * NOTE: the submit is still front-end only — it flips to the thank-you state
 * without sending anything anywhere. Wire this to a Server Action or route
 * handler before going live.
 */

type DiagnosticoFormProps = {
  /** Heading level, so the hero copy keeps a sane document outline. */
  headingAs?: "h2" | "h3";
  /** Trim the vertical rhythm for tighter placements like the hero. */
  compact?: boolean;
};

export function DiagnosticoForm({ headingAs = "h3", compact = false }: DiagnosticoFormProps) {
  const [sent, setSent] = useState(false);
  const Heading = headingAs;

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: compact ? "28px 12px" : "40px 12px" }} role="status">
        <CheckCircle
          className="ic-lg"
          style={{ color: "var(--mte-success)", display: "inline-flex" }}
          aria-hidden="true"
        />
        <Heading style={{ fontFamily: "var(--font-display)", marginTop: "14px" }}>
          ¡Gracias! Le contactaremos pronto.
        </Heading>
        <p style={{ marginTop: "8px" }}>
          Un especialista revisará su caso y le responderá a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Heading
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: compact ? "1.3rem" : "1.4rem",
          marginBottom: "6px",
          color: "var(--text-heading)",
        }}
      >
        Solicite su diagnóstico sin costo
      </Heading>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          marginBottom: compact ? "16px" : "20px",
        }}
      >
        Respuesta en menos de 24 h hábiles.
      </p>
      <div style={{ display: "grid", gap: compact ? "12px" : "14px" }}>
        <Field label="Nombre" required>
          <Input name="nombre" required placeholder="Su nombre" autoComplete="name" />
        </Field>
        <div className="grid-2" style={{ gap: compact ? "12px" : "14px" }}>
          <Field label="Empresa">
            <Input name="empresa" placeholder="Empresa" autoComplete="organization" />
          </Field>
          <Field label="Teléfono / WhatsApp" required>
            <Input name="telefono" type="tel" required placeholder="+52..." autoComplete="tel" />
          </Field>
        </div>
        <Field label="Correo">
          <Input name="correo" type="email" placeholder="correo@empresa.com" autoComplete="email" />
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
  );
}
