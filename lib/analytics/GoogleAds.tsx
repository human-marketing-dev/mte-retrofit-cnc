import Script from "next/script";

/**
 * Google Ads global site tag (gtag.js).
 *
 * Loads the Google Ads tag so conversions and remarketing can be attributed to
 * ad clicks. The tag id is inlined at build time from NEXT_PUBLIC_GOOGLE_ADS_ID,
 * falling back to the production account so a fresh clone measures correctly
 * without env setup. Set the variable to an empty string to disable it (e.g. on
 * preview deployments that should not report into the live Ads account).
 *
 * gtag.js and the existing Google Tag Manager container (GoogleTagManager.tsx)
 * coexist deliberately: both push to the same window.dataLayer, so loading one
 * never clobbers the other. If the Google Ads tag is ever moved *into* GTM,
 * drop this component to avoid firing the account twice.
 *
 * `afterInteractive` matches the GTM loader: the tag starts as hydration begins
 * and never blocks first paint. gtag() queues onto dataLayer, so the config
 * call is safe even before the external script finishes loading.
 */

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-16767249946";

export function GoogleAds() {
  if (!GOOGLE_ADS_ID) return null;

  return (
    <>
      <Script
        id="google-ads-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
