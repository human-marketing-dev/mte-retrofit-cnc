/**
 * Public surface of the measurement layer.
 *
 * Components import from `@/lib/analytics`, never from the individual modules —
 * so the internals (storage keys, dataLayer reset, normalization rules) can
 * change without touching the UI.
 *
 * Typical use from a Client Component:
 *
 *   import { trackLead, buildUserData } from "@/lib/analytics";
 *
 *   trackLead({
 *     form_id: "hero",
 *     form_name: "Diagnóstico sin costo",
 *     user_data: buildUserData({ email, phone, firstName, lastName }),
 *   });
 */

export { AnalyticsProvider } from "./AnalyticsProvider";
export { GoogleAds, GOOGLE_ADS_ID } from "./GoogleAds";
export { GoogleTagManager, GoogleTagManagerNoScript, GTM_ID } from "./GoogleTagManager";
export {
  CLICK_ID_KEYS,
  UTM_KEYS,
  attributionPayload,
  captureAttribution,
  getAttribution,
} from "./attribution";
export { pushData, pushEvent } from "./dataLayer";
export { EVENTS, trackLead, trackWhatsAppClick } from "./events";
export type { EventName, LeadEventInput, WhatsAppEventInput } from "./events";
export { buildUserData, normalizeEmail, normalizeName, normalizePhone } from "./userData";
export type { UserDataInput } from "./userData";
export type {
  Attribution,
  ClickIds,
  DataLayerObject,
  FormContext,
  Touch,
  UserData,
  UtmParams,
} from "./types";
