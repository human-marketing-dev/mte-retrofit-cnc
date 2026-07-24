import Script from "next/script";

/**
 * Google Tag Manager container loader.
 *
 * The container id is inlined at build time from NEXT_PUBLIC_GTM_ID, falling
 * back to the production container so a fresh clone measures correctly without
 * any env setup. Set the variable to an empty string to disable GTM entirely
 * (useful for preview deployments that should not pollute reporting).
 *
 * `afterInteractive` is the documented strategy for tag managers: the container
 * loads as soon as hydration starts, but never blocks first paint. Anything the
 * site pushes before then is safe — the GTM snippet reuses the existing
 * window.dataLayer array rather than replacing it.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5G5699ZJ";

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * The `<noscript>` half of the snippet, for visitors without JavaScript.
 *
 * Must render inside <body>, immediately after the opening tag, per Google's
 * install instructions.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
