"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { attributionPayload, captureAttribution } from "./attribution";
import { pushData } from "./dataLayer";

/**
 * Site-wide measurement bootstrap.
 *
 * Mounted once in the root layout, it snapshots the campaign parameters off the
 * landing URL and republishes the attribution into the dataLayer on every route
 * change — so a tag firing on a later page view still sees the utm_source that
 * brought the visitor in, even though that page's URL is clean.
 *
 * These are ambient variables, not an event: pushed with `pushData` so they do
 * not trigger anything on their own and stay readable by every later tag.
 *
 * Uses `usePathname` rather than `useSearchParams` on purpose — the latter opts
 * the whole tree into client-side rendering, and the query string is read
 * straight off `window.location` inside `captureAttribution` anyway.
 */
export function AnalyticsProvider({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const attribution = captureAttribution();
    pushData(attributionPayload(attribution));
  }, [pathname]);

  return <>{children}</>;
}
