"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";

import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * An anchor to wa.me that reports the click as `whatsapp_click`.
 *
 * Every link that actually hands the visitor over to WhatsApp goes through this
 * component, so the conversion is counted exactly once per departure and never
 * depends on someone remembering to add a handler. `linkLocation` is what makes
 * the placements separable in GA4 and Google Ads.
 *
 * Note this is the *departure*, not the intent: the floating widget's bubble
 * opens a preview card and is not tracked — only the "Iniciar conversación"
 * button inside it, which is the click that leaves the site.
 */
export type WhatsAppLinkProps = {
  href: string;
  /** Where on the page this link lives, e.g. "floating_widget". */
  linkLocation: string;
  children: ReactNode;
  /** React 19 passes ref as an ordinary prop — no forwardRef needed. */
  ref?: Ref<HTMLAnchorElement>;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">;

export function WhatsAppLink({
  href,
  linkLocation,
  children,
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  ref,
  ...rest
}: WhatsAppLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // The push is synchronous into the dataLayer array, so it is queued before
    // the browser starts the navigation even without preventDefault.
    trackWhatsAppClick({ link_location: linkLocation, link_url: href });
    onClick?.(e);
  }

  return (
    <a ref={ref} href={href} target={target} rel={rel} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
