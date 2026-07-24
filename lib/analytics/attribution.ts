import type { Attribution, Touch } from "./types";

/**
 * Marketing attribution capture.
 *
 * A visitor usually lands on an ad URL carrying `?utm_source=...&gclid=...`,
 * then navigates, then converts minutes later on a clean URL. Reading the query
 * string at submit time would therefore lose the campaign entirely. So we snap
 * the parameters on the first render and keep them:
 *
 *   first touch — localStorage, written once, never overwritten. Answers "which
 *                 campaign originally found this person".
 *   last  touch — sessionStorage, refreshed whenever a visit arrives with
 *                 campaign parameters. Answers "which campaign closed the
 *                 lead", and is what the flattened utm_* keys report.
 *
 * Storage can throw (Safari private mode, cookie-blocking extensions), so every
 * access is wrapped — losing attribution must never break the form.
 */

const FIRST_TOUCH_KEY = "mte_attr_first";
const LAST_TOUCH_KEY = "mte_attr_last";

/** The UTM parameters worth capturing, in the order marketing reads them. */
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_source_platform",
  "utm_creative_format",
  "utm_marketing_tactic",
] as const;

/** Ad-platform click ids. gbraid/wbraid are the iOS-era Google Ads pair. */
export const CLICK_ID_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "dclid",
  "fbclid",
  "msclkid",
  "ttclid",
  "li_fat_id",
  "twclid",
] as const;

const CAMPAIGN_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS] as const;

/** Cap stored values so a crafted URL cannot bloat storage or the payload. */
const MAX_VALUE_LENGTH = 256;

function readStore(store: Storage | undefined, key: string): Touch | null {
  try {
    const raw = store?.getItem(key);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Touch) : null;
  } catch {
    return null;
  }
}

function writeStore(store: Storage | undefined, key: string, value: Touch): void {
  try {
    store?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked — attribution is best-effort by design.
  }
}

/**
 * Pull the campaign parameters out of a query string.
 *
 * Returns null when the URL carries none, which is how `captureAttribution`
 * knows an organic/direct visit must not overwrite an existing last touch.
 */
function readCampaignParams(search: string): Touch | null {
  const params = new URLSearchParams(search);
  const touch: Touch = {};
  let found = false;

  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)?.trim();
    if (!value) continue;
    touch[key] = value.slice(0, MAX_VALUE_LENGTH);
    found = true;
  }

  return found ? touch : null;
}

/**
 * Read the current URL and update the stored touches.
 *
 * Idempotent: safe to call on every route change. Returns the attribution as it
 * stands after the update.
 */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return { first_touch: {}, last_touch: {} };

  const incoming = readCampaignParams(window.location.search);

  if (incoming) {
    incoming.landing_page = window.location.href.slice(0, 1024);
    incoming.referrer = document.referrer.slice(0, 1024);
    incoming.timestamp = new Date().toISOString();

    writeStore(window.sessionStorage, LAST_TOUCH_KEY, incoming);
    // First touch is written once and then left alone for good.
    if (!readStore(window.localStorage, FIRST_TOUCH_KEY)) {
      writeStore(window.localStorage, FIRST_TOUCH_KEY, incoming);
    }
  }

  return getAttribution();
}

/** The stored attribution, without touching the URL. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { first_touch: {}, last_touch: {} };
  return {
    first_touch: readStore(window.localStorage, FIRST_TOUCH_KEY) ?? {},
    last_touch: readStore(window.sessionStorage, LAST_TOUCH_KEY) ?? {},
  };
}

/**
 * Attribution flattened for the dataLayer.
 *
 * Tags overwhelmingly expect to read a bare `{{DLV - utm_source}}`, so the last
 * touch is spread at the top level. The nested `attribution` object carries
 * both touches for anyone who needs first-touch reporting.
 */
export function attributionPayload(attribution: Attribution = getAttribution()) {
  return {
    ...attribution.last_touch,
    attribution: {
      first_touch: attribution.first_touch,
      last_touch: attribution.last_touch,
    },
  };
}
