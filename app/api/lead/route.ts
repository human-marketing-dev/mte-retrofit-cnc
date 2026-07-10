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
  { key: "empresa", label: "Empresa" },
  { key: "telefono", label: "Teléfono / WhatsApp" },
  { key: "correo", label: "Correo" },
  { key: "equipo", label: "Tipo de máquina y marca de control" },
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
  const correo = asString(body.correo);

  if (!nombre || !correo || !EMAIL_RE.test(correo)) {
    return Response.json(
      { success: false, error: "Nombre y correo válido son obligatorios." },
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

  const rows = LEAD_FIELDS.map(({ key, label }) => {
    const value = asString(body[key]);
    return `<tr>
      <td style="padding:8px 12px;border:1px solid #dde0e7;font-weight:600;color:#141820;background:#f6f7f9;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border:1px solid #dde0e7;color:#353c49;">${value ? escapeHtml(value) : "—"}</td>
    </tr>`;
  }).join("");

  const htmlContent = `<!doctype html>
<html lang="es"><body style="margin:0;padding:24px;background:#eef2fa;font-family:Arial,Helvetica,sans-serif;">
  <h2 style="margin:0 0 16px;color:#003399;">Nuevo lead de la landing de Retrofit CNC</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows}</table>
  <p style="margin:20px 0 0;font-size:12px;color:#6c7484;">
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
        replyTo: { email: correo, name: nombre },
        subject: `Nuevo lead: ${nombre}`,
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
