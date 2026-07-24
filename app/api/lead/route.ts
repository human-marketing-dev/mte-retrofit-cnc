/**
 * Lead intake → Brevo transactional email.
 *
 * The landing form (components/landing/DiagnosticoForm.tsx) POSTs JSON here.
 * We do NOT store contacts in Brevo lists — this only fires a notification
 * email to the sales inbox, with the lead's own address set as replyTo so a
 * reply from the inbox goes straight back to them.
 *
 * The BREVO_API_KEY lives only in the server environment (process.env). This
 * file is a Route Handler — it never ships to the client — so the key is never
 * exposed. Do not import anything from here into a Client Component.
 */

// Defaults to Brevo's production endpoint. Overridable so the route can be
// pointed at a sandbox/staging mail API without a code change.
const BREVO_ENDPOINT = process.env.BREVO_ENDPOINT ?? "https://api.brevo.com/v3/smtp/email";

const SENDER = {
  name: "MTE Global Solutions",
  email: "alejandro.rico@mteglobalsolutions.com",
} as const;

const NOTIFY_TO = "alejandro.rico@mteglobalsolutions.com";

/** The fields the form sends, in the order we render them in the email. */
const LEAD_FIELDS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "empresa", label: "Empresa" },
  { key: "telefono", label: "Teléfono / WhatsApp" },
  { key: "correo", label: "Correo" },
  { key: "equipo", label: "Tipo de máquina y marca de control" },
];

/**
 * Campaign attribution, rendered as a second table in the notification.
 *
 * Sales gets to see which campaign produced the lead without opening GA4, and
 * the values survive in the mailbox even if the visitor's session storage is
 * long gone.
 */
const ATTRIBUTION_FIELDS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "utm_source", label: "Fuente (utm_source)" },
  { key: "utm_medium", label: "Medio (utm_medium)" },
  { key: "utm_campaign", label: "Campaña (utm_campaign)" },
  { key: "utm_term", label: "Término (utm_term)" },
  { key: "utm_content", label: "Contenido (utm_content)" },
  { key: "utm_id", label: "ID de campaña (utm_id)" },
  { key: "gclid", label: "Google Ads (gclid)" },
  { key: "fbclid", label: "Meta (fbclid)" },
  { key: "msclkid", label: "Microsoft (msclkid)" },
  { key: "landing_page", label: "Página de entrada" },
  { key: "referrer", label: "Referente" },
];

// Deliberately simple, permissive email shape — just enough to reject obvious
// garbage. Full RFC 5322 validation belongs to the mail server, not a regex.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escape user input before it goes into the email's htmlContent. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/** One `<tr>` per field that has a value, or null if the table would be empty. */
function buildRows(
  fields: ReadonlyArray<{ key: string; label: string }>,
  source: Record<string, unknown>,
  { skipEmpty = false }: { skipEmpty?: boolean } = {},
): string | null {
  const rows = fields
    .map(({ key, label }) => {
      const value = asString(source[key]);
      if (!value && skipEmpty) return "";
      return `<tr>
      <td style="padding:8px 12px;border:1px solid #dde0e7;font-weight:600;color:#141820;background:#f6f7f9;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border:1px solid #dde0e7;color:#353c49;">${value ? escapeHtml(value) : "—"}</td>
    </tr>`;
    })
    .join("");

  return rows || null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "JSON inválido." }, { status: 400 });
  }

  // Honeypot: a real user never fills the hidden "website" field. If it has any
  // content, silently pretend success — don't tell the bot it was caught.
  if (asString(body.website)) {
    return Response.json({ success: true });
  }

  const nombre = asString(body.nombre);
  const apellido = asString(body.apellido);
  const correo = asString(body.correo);

  if (!nombre || !correo || !EMAIL_RE.test(correo)) {
    return Response.json(
      { success: false, error: "Nombre y correo válido son obligatorios." },
      { status: 400 },
    );
  }

  // The consent checkbox gates the submit button in the UI; enforcing it here
  // too means a lead can never be stored or emailed without it, whatever the
  // client did. Consent is the lawful basis for the whole treatment.
  if (body.privacidad_aceptada !== true) {
    return Response.json(
      { success: false, error: "Debe aceptar el aviso de privacidad." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[lead] BREVO_API_KEY is not set — cannot send notification email.");
    return Response.json(
      { success: false, error: "No pudimos enviar su solicitud. Intente de nuevo." },
      { status: 500 },
    );
  }

  const rows = buildRows(LEAD_FIELDS, body) ?? "";

  const attribution = asRecord(body.attribution);
  const lastTouch = asRecord(attribution.last_touch);
  const firstTouch = asRecord(attribution.first_touch);
  const originRows = buildRows(ATTRIBUTION_FIELDS, lastTouch, { skipEmpty: true });
  const firstTouchRows = buildRows(ATTRIBUTION_FIELDS, firstTouch, { skipEmpty: true });

  const tableStyle = `border-collapse:collapse;width:100%;max-width:640px;`;
  const sectionTitle = `margin:24px 0 10px;color:#003399;font-size:15px;`;

  const formLabel = asString(body.form_name) || "Formulario de la landing";
  const formId = asString(body.form_id);
  const pageLocation = asString(body.page_location);

  const htmlContent = `<!doctype html>
<html lang="es"><body style="margin:0;padding:24px;background:#eef2fa;font-family:Arial,Helvetica,sans-serif;">
  <h2 style="margin:0 0 16px;color:#003399;">Nuevo lead de la landing de Retrofit CNC</h2>
  <table style="${tableStyle}">${rows}</table>

  ${
    originRows
      ? `<h3 style="${sectionTitle}">Origen de la visita (último contacto)</h3>
  <table style="${tableStyle}">${originRows}</table>`
      : `<p style="margin:24px 0 0;font-size:13px;color:#6c7484;">Sin parámetros de campaña: tráfico directo u orgánico.</p>`
  }
  ${
    firstTouchRows && firstTouchRows !== originRows
      ? `<h3 style="${sectionTitle}">Primer contacto</h3>
  <table style="${tableStyle}">${firstTouchRows}</table>`
      : ""
  }

  <p style="margin:20px 0 0;font-size:12px;color:#6c7484;">
    Formulario: ${escapeHtml(formLabel)}${formId ? ` (${escapeHtml(formId)})` : ""}${
      pageLocation ? `<br>Página: ${escapeHtml(pageLocation)}` : ""
    }<br>
    Aviso de privacidad aceptado por el prospecto al enviar el formulario.
  </p>
  <p style="margin:12px 0 0;font-size:12px;color:#6c7484;">
    Puede responder directamente a este correo para contactar al prospecto.
  </p>
</body></html>`;

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [{ email: NOTIFY_TO }],
        replyTo: { email: correo, name: [nombre, apellido].filter(Boolean).join(" ") },
        subject: `Nuevo lead: ${[nombre, apellido].filter(Boolean).join(" ")}`,
        htmlContent,
      }),
    });

    if (!res.ok) {
      // Brevo returns a JSON error body; capture it for the server log only.
      const detail = await res.text();
      console.error(`[lead] Brevo responded ${res.status}: ${detail}`);
      return Response.json(
        { success: false, error: "No pudimos enviar su solicitud. Intente de nuevo." },
        { status: 500 },
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[lead] Failed to reach Brevo:", err);
    return Response.json(
      { success: false, error: "No pudimos enviar su solicitud. Intente de nuevo." },
      { status: 500 },
    );
  }
}
