"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";

import { WA_DISPLAY, WA_LINK } from "./constants";

/**
 * Floating WhatsApp launcher with a click-to-chat preview.
 *
 * Clicking the bubble no longer jumps straight to WhatsApp — it opens a small
 * chat card (agent header + a greeting message + a green "Iniciar conversación"
 * button). Only that button navigates to wa.me, so the user sees who they are
 * about to message before leaving the site.
 *
 * This is the one genuinely interactive piece of chrome, so it carries its own
 * "use client" boundary and lives apart from Header.tsx, which stays a Server
 * Component.
 */
export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Close on Escape and on a click outside the widget; move focus into the card
  // when it opens and back to the bubble when it closes.
  useEffect(() => {
    if (!open) return;

    ctaRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        right: "22px",
        bottom: "22px",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "14px",
      }}
    >
      {open && (
        <div
          className="wa-pop"
          role="dialog"
          aria-label="Chat de WhatsApp con MTE Global Solutions"
          style={{
            width: "min(320px, calc(100vw - 44px))",
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
          }}
        >
          {/* Header strip — WhatsApp green, agent identity */}
          <div
            style={{
              background: "var(--whatsapp)",
              color: "#fff",
              padding: "14px 44px 14px 16px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Image
                src="/MTE Isotipo.webp"
                alt=""
                width={40}
                height={40}
                style={{ width: "72%", height: "72%", objectFit: "contain" }}
              />
            </span>
            <span style={{ lineHeight: 1.3 }}>
              <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px" }}>
                MTE Global Solutions
              </span>
              <span style={{ display: "block", fontSize: "12px", opacity: 0.9 }}>
                Normalmente responde en pocos minutos
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "26px",
                height: "26px",
                border: "none",
                borderRadius: "var(--radius-sm)",
                background: "rgba(255,255,255,0.18)",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <X style={{ width: "16px", height: "16px" }} aria-hidden="true" />
            </button>
          </div>

          {/* Chat body — a received message bubble */}
          <div style={{ background: "var(--mte-gray-50)", padding: "18px 16px" }}>
            <div
              style={{
                background: "#fff",
                borderRadius: "2px 12px 12px 12px",
                boxShadow: "var(--shadow-xs)",
                padding: "12px 14px",
                fontSize: "14px",
                lineHeight: 1.5,
                color: "var(--text-body)",
              }}
            >
              ¿Su máquina CNC está detenida o sin refacciones? Escríbanos y le ayudamos con el
              diagnóstico de su retrofit, sin costo.
            </div>
          </div>

          {/* CTA — the only thing that actually opens WhatsApp */}
          <div style={{ padding: "0 16px 16px" }}>
            <a
              ref={ctaRef}
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
                height: "48px",
                borderRadius: "var(--radius-sm)",
                background: "var(--whatsapp)",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              <MessageCircle style={{ width: "20px", height: "20px" }} aria-hidden="true" />
              Iniciar conversación
            </a>
            <p
              style={{
                margin: "10px 0 0",
                textAlign: "center",
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              {WA_DISPLAY}
            </p>
          </div>
        </div>
      )}

      <button
        ref={bubbleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{
          alignSelf: "flex-end",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "var(--whatsapp)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(37,211,102,0.45)",
          cursor: "pointer",
        }}
      >
        {open ? (
          <X style={{ width: "28px", height: "28px" }} aria-hidden="true" />
        ) : (
          <MessageCircle style={{ width: "30px", height: "30px" }} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
