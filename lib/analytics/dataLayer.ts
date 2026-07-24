import type { DataLayerObject } from "./types";

/**
 * The one place the site talks to Google Tag Manager.
 *
 * Nothing else should touch `window.dataLayer` directly — routing every push
 * through here is what makes the measurement layer reusable: SSR safety, the
 * parameter reset below, and debug logging are all handled once.
 */

declare global {
  interface Window {
    dataLayer?: DataLayerObject[];
  }
}

/**
 * Keys pushed by the previous event, so we can clear them before the next one.
 *
 * The dataLayer is a persistent merge: a parameter pushed with `generate_lead`
 * is still readable when `whatsapp_click` fires later, which silently attaches
 * a lead's user_data to an unrelated conversion. Pushing the old keys back as
 * `undefined` first keeps every event self-contained.
 */
let previousKeys: string[] = [];

/** Never true on the server; guards every browser-only access below. */
function canPush(): boolean {
  return typeof window !== "undefined";
}

/** Ensure the queue exists even if the GTM snippet has not run yet. */
function queue(): DataLayerObject[] {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

/**
 * Push an event with its parameters.
 *
 * Returns false when called outside the browser (during SSR or prerender), so
 * callers can tell "not sent" from "sent" without try/catch.
 */
export function pushEvent(event: string, payload: DataLayerObject = {}): boolean {
  if (!canPush()) return false;

  const dl = queue();

  // Clear whatever the previous event left behind, minus the keys this event
  // is about to set (no point clearing and immediately re-setting them).
  const stale = previousKeys.filter((key) => !(key in payload));
  if (stale.length > 0) {
    // `null` rather than `undefined`: it is the reset value Google documents
    // for the ecommerce object, and it survives any serialization in between.
    const reset: DataLayerObject = {};
    for (const key of stale) reset[key] = null;
    dl.push(reset);
  }

  previousKeys = Object.keys(payload);
  dl.push({ event, ...payload });

  if (process.env.NODE_ENV !== "production") {
    // Mirrors what GTM's preview mode shows, without needing preview mode.
    console.debug("[analytics]", event, payload);
  }

  return true;
}

/**
 * Push parameters without an `event` key.
 *
 * Use for ambient context (attribution, page metadata) that tags read as
 * variables rather than trigger on. These keys are deliberately left out of the
 * reset bookkeeping — they are meant to persist for the whole page view.
 */
export function pushData(payload: DataLayerObject): boolean {
  if (!canPush()) return false;
  queue().push(payload);
  return true;
}
