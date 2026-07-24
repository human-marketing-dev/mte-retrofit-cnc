"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { buildUserData, getAttribution, trackLead } from "@/lib/analytics";

/**
 * The reusable lead-capture form.
 *
 * Every instance is self-contained: its own state, its own input ids (derived
 * from `formId`), its own analytics identity. Drop it on any page, in any
 * number of places, and the instances cannot interfere with each other —
 * submitting the hero form does not touch the one in the closing CTA.
 *
 * Copy, endpoint and which optional fields appear are all props, so a new
 * placement is a configuration change rather than a fork of this file. The
 * landing's specific wording lives in the `DiagnosticoForm` preset.
 *
 * On a successful submit it fires the `generate_lead` custom event with the
 * full payload — form fields, campaign attribution, and normalized user data
 * for enhanced conversions. See lib/analytics/events.ts.
 */

type Status = "idle" | "sending" | "success" | "error";

export type LeadFormCopy = {
  title: string;
  subtitle: string;
  submitLabel: string;
  sendingLabel: string;
  privacyLabel: string;
  privacyLinkText: string;
  successTitle: string;
  successBody: string;
  errorMessage: string;
  footnote: string;
};

const DEFAULT_COPY: LeadFormCopy = {
  title: "Solicite su diagnóstico sin costo",
  subtitle: "Respuesta en menos de 24 h hábiles.",
  submitLabel: "Solicitar diagnóstico sin costo",
  sendingLabel: "Enviando…",
  privacyLabel: "Acepto el",
  privacyLinkText: "aviso de privacidad",
  successTitle: "¡Gracias! Le contactaremos pronto.",
  successBody: "Un especialista revisará su caso y le responderá a la brevedad.",
  errorMessage:
    "No pudimos enviar su solicitud. Verifique su conexión e inténtelo de nuevo, o escríbanos por WhatsApp.",
  footnote: "Sus datos se usan únicamente para contactarle sobre su proyecto.",
};

export type LeadFormProps = {
  /** Stable identifier for this placement. Prefixes input ids and is reported
   *  as `form_id` on the analytics event — keep it unique per instance. */
  formId: string;
  /** Human-readable name reported as `form_name`. */
  formName?: string;
  /** Heading level, so each placement keeps a sane document outline. */
  headingAs?: "h2" | "h3";
  /** Trim the vertical rhythm for tighter placements like the hero. */
  compact?: boolean;
  /** Where the submission is POSTed. */
  endpoint?: string;
  /** Target of the privacy-notice link next to the consent checkbox. */
  privacyHref?: string;
  /** Optional fields, on by default. Required fields are never hidden. */
  showFields?: { empresa?: boolean; equipo?: boolean };
  /** Overrides for any piece of copy. */
  copy?: Partial<LeadFormCopy>;
};

export function LeadForm({
  formId,
  formName = "Diagnóstico sin costo",
  headingAs = "h3",
  compact = false,
  endpoint = "/api/lead",
  privacyHref = "/privacidad",
  showFields,
  copy,
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const Heading = headingAs;
  const text = { ...DEFAULT_COPY, ...copy };
  const showEmpresa = showFields?.empresa ?? true;
  const showEquipo = showFields?.equipo ?? true;

  // useId keeps ids unique even if two placements are given the same formId.
  const uid = useId();
  const fieldId = (name: string) => `${formId}-${name}-${uid}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const nombre = value("nombre");
    const apellido = value("apellido");
    const correo = value("correo");
    const telefono = value("telefono");
    const empresa = value("empresa");
    const equipo = value("equipo");

    // Last-touch campaign data travels with the lead so sales sees, in the
    // notification email, which campaign produced it.
    const attribution = getAttribution();

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          empresa,
          telefono,
          correo,
          equipo,
          website: value("website"), // honeypot
          privacidad_aceptada: privacyAccepted,
          form_id: formId,
          form_name: formName,
          page_location: typeof window !== "undefined" ? window.location.href : undefined,
          attribution,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      // Only a lead the API accepted counts as a conversion.
      trackLead({
        form_id: formId,
        form_name: formName,
        form_destination: endpoint,
        user_data: buildUserData({
          email: correo,
          phone: telefono,
          firstName: nombre,
          lastName: apellido,
        }),
        lead_details: {
          empresa: empresa || undefined,
          equipo: equipo || undefined,
        },
      });

      form.reset();
      setPrivacyAccepted(false);
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
          {text.successTitle}
        </Heading>
        <p style={{ marginTop: "8px" }}>{text.successBody}</p>
      </div>
    );
  }

  const sending = status === "sending";
  const canSubmit = privacyAccepted && !sending;
  const gap = compact ? "12px" : "14px";

  return (
    <form onSubmit={handleSubmit} id={fieldId("form")} data-form-id={formId}>
      <Heading
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: compact ? "1.3rem" : "1.4rem",
          marginBottom: "6px",
          color: "var(--text-heading)",
        }}
      >
        {text.title}
      </Heading>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          marginBottom: compact ? "16px" : "20px",
        }}
      >
        {text.subtitle}
      </p>
      <div style={{ display: "grid", gap }}>
        {/* Honeypot: hidden off-screen (not display:none / type=hidden, which
            some bots skip). A real user never sees or fills it; if it arrives
            with content, the API treats the submission as spam. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        >
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid-2" style={{ gap }}>
          <Field label="Nombre" required>
            <Input
              id={fieldId("nombre")}
              name="nombre"
              required
              placeholder="Su nombre"
              autoComplete="given-name"
              disabled={sending}
            />
          </Field>
          <Field label="Apellido" required>
            <Input
              id={fieldId("apellido")}
              name="apellido"
              required
              placeholder="Su apellido"
              autoComplete="family-name"
              disabled={sending}
            />
          </Field>
        </div>

        <div className="grid-2" style={{ gap }}>
          {showEmpresa && (
            <Field label="Empresa">
              <Input
                id={fieldId("empresa")}
                name="empresa"
                placeholder="Empresa"
                autoComplete="organization"
                disabled={sending}
              />
            </Field>
          )}
          <Field label="Teléfono / WhatsApp" required>
            <Input
              id={fieldId("telefono")}
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
            id={fieldId("correo")}
            name="correo"
            type="email"
            required
            placeholder="correo@empresa.com"
            autoComplete="email"
            disabled={sending}
          />
        </Field>

        {showEquipo && (
          <Field
            label="Tipo de máquina y marca de control"
            hint="Ej. Torno Fanuc 0i, Fresadora Siemens 840D"
          >
            <Input
              id={fieldId("equipo")}
              name="equipo"
              placeholder="Describa su equipo"
              disabled={sending}
            />
          </Field>
        )}

        {/* Consent gate. The checkbox is a sibling of its label rather than a
            child, so the privacy link inside the label text can be clicked
            without toggling the box. */}
        <div className="check-row">
          <input
            id={fieldId("privacidad")}
            name="privacidad"
            type="checkbox"
            className="check-input"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            disabled={sending}
            required
          />
          <label htmlFor={fieldId("privacidad")} className="check-label">
            {text.privacyLabel}{" "}
            <a href={privacyHref} target="_blank" rel="noopener noreferrer">
              {text.privacyLinkText}
            </a>
            <span style={{ color: "var(--mte-danger)" }}> *</span>
          </label>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          type="submit"
          disabled={!canSubmit}
          // Explains the disabled state to screen readers and to anyone
          // hovering the button wondering why nothing happens.
          title={privacyAccepted ? undefined : "Acepte el aviso de privacidad para continuar"}
          style={sending ? { cursor: "wait" } : undefined}
          iconRight={sending ? undefined : <ArrowRight className="ic-sm" aria-hidden="true" />}
        >
          {sending ? text.sendingLabel : text.submitLabel}
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
            {text.errorMessage}
          </p>
        )}

        <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
          {text.footnote}
        </p>
      </div>
    </form>
  );
}
