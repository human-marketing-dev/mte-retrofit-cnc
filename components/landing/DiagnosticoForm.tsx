"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";

/**
 * The lead-capture form. Rendered twice on the landing — once in the hero, once
 * in the closing CTA — so it lives here rather than being copy-pasted; the two
 * instances can never drift apart.
 *
 * Each instance owns its own state, which is what we want: submitting the hero
 * form should not touch the one at the bottom of the page.
 *
 * Fields carry `name` but no `id`. <Field> wraps its control in a <label>, so
 * the association is structural — that is what makes two instances on one page
 * safe. Adding ids here would produce duplicates and break the labels.
 *
 * Submit posts JSON to /api/lead, which fires a Brevo notification email. The
 * BREVO_API_KEY stays server-side in that route handler; nothing secret reaches
 * this Client Component.
 */

type Status = "idle" | "sending" | "success" | "error";

type DiagnosticoFormProps = {
  /** Heading level, so the hero copy keeps a sane document outline. */
  headingAs?: "h2" | "h3";
  /** Trim the vertical rhythm for tighter placements like the hero. */
  compact?: boolean;
};

export function DiagnosticoForm({ headingAs = "h3", compact = false }: DiagnosticoFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const Heading = headingAs;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
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

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
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
        {/* Honeypot: hidden off-screen (not display:none / type=hidden, which
            some bots skip). A real user never sees or fills it; if it arrives
            with content, the API treats the submission as spam. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        >
          <label>
            Website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <Field label="Nombre" required>
          <Input name="nombre" required placeholder="Su nombre" autoComplete="name" disabled={sending} />
        </Field>
        <div className="grid-2" style={{ gap: compact ? "12px" : "14px" }}>
          <Field label="Empresa">
            <Input name="empresa" placeholder="Empresa" autoComplete="organization" disabled={sending} />
          </Field>
          <Field label="Teléfono / WhatsApp" required>
            <Input
              name="telefono"
              type="tel"
              required
              placeholder="+52..."
              autoComplete="tel"
              disabled={sending}
            />
          </Field>
        </div>
        <Field label="Correo" required>
          <Input
            name="correo"
            type="email"
            required
            placeholder="correo@empresa.com"
            autoComplete="email"
            disabled={sending}
          />
        </Field>
        <Field
          label="Tipo de máquina y marca de control"
          hint="Ej. Torno Fanuc 0i, Fresadora Siemens 840D"
        >
          <Input name="equipo" placeholder="Describa su equipo" disabled={sending} />
        </Field>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          type="submit"
          disabled={sending}
          style={sending ? { opacity: 0.7, cursor: "wait" } : undefined}
          iconRight={sending ? undefined : <ArrowRight className="ic-sm" aria-hidden="true" />}
        >
          {sending ? "Enviando…" : "Solicitar diagnóstico sin costo"}
        </Button>

        {status === "error" && (
          <p
            role="alert"
            style={{
              fontSize: "14px",
              color: "var(--mte-danger)",
              textAlign: "center",
              margin: 0,
            }}
          >
            No pudimos enviar su solicitud. Verifique su conexión e inténtelo de nuevo, o
            escríbanos por WhatsApp.
          </p>
        )}

        <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
          Sus datos se usan únicamente para contactarle sobre su proyecto.
        </p>
      </div>
    </form>
  );
}
