import { attributionPayload } from "./attribution";
import { pushEvent } from "./dataLayer";
import type { DataLayerObject, FormContext, UserData } from "./types";

/**
 * The custom events this site sends, and the payload each one carries.
 *
 * The names are fixed by the GTM container (GTM-5G5699ZJ): `generate_lead`
 * fires "GA4 - Lead submission", "GAds - Form Submit Convertion Tracking" and
 * "Meta-Completar Registro"; `whatsapp_click` fires "GA4 - Event - JoinChat
 * clic", "GAds - JoinChat Clic" and "Meta-Contact (WhatsApp)". Renaming either
 * string here silently kills six tags — change the container first.
 */
export const EVENTS = {
  GENERATE_LEAD: "generate_lead",
  WHATSAPP_CLICK: "whatsapp_click",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

/** Page context, resolved at push time so SPA navigations report the real URL. */
function pageContext(): DataLayerObject {
  if (typeof window === "undefined") return {};
  return {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    page_referrer: document.referrer || undefined,
  };
}

/**
 * Every event goes out with the same envelope: page context + attribution.
 *
 * That is the whole point of the layer — a tag can read `utm_source` off any
 * event without the caller having to remember to attach it.
 */
function track(event: EventName, payload: DataLayerObject = {}): boolean {
  return pushEvent(event, {
    ...pageContext(),
    ...attributionPayload(),
    ...payload,
  });
}

export type LeadEventInput = FormContext & {
  /** Normalized email/phone/name for enhanced conversions. */
  user_data?: UserData;
  /** Non-identifying business context: company, equipment described, etc. */
  lead_details?: DataLayerObject;
  /** Optional conversion value, if the business ever assigns one to a lead. */
  value?: number;
  currency?: string;
};

/**
 * `generate_lead` — fired when a lead form submission is accepted by the API.
 *
 * Deliberately not fired on the click: a submission that fails to reach
 * /api/lead produces no lead, and counting it would inflate the Google Ads and
 * Meta conversion numbers the campaigns are optimized against.
 */
export function trackLead({
  user_data,
  lead_details,
  value,
  currency,
  ...form
}: LeadEventInput): boolean {
  return track(EVENTS.GENERATE_LEAD, {
    ...form,
    ...(user_data && { user_data }),
    ...(lead_details && { lead_details }),
    ...(typeof value === "number" && { value, currency: currency ?? "MXN" }),
  });
}

export type WhatsAppEventInput = {
  /** Where on the page the click happened, e.g. "floating_widget". */
  link_location: string;
  link_url: string;
};

/**
 * `whatsapp_click` — fired on the click that actually opens WhatsApp.
 *
 * In the floating widget that is the "Iniciar conversación" button inside the
 * chat card, not the bubble that opens it: opening the card is intent, leaving
 * for WhatsApp is the conversion.
 */
export function trackWhatsAppClick(input: WhatsAppEventInput): boolean {
  return track(EVENTS.WHATSAPP_CLICK, { ...input });
}
