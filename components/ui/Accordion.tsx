"use client";

import { useId, useState, type ReactNode } from "react";

export type AccordionProps = {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/**
 * Single collapsible FAQ row.
 *
 * Upstream animated a `max-height: 320px` cap, which silently clips answers
 * taller than that (the pricing answer wraps past 320px on narrow viewports).
 * The `grid-template-rows: 0fr -> 1fr` technique animates to the content's
 * natural height with no cap, and degrades to an instant open under
 * prefers-reduced-motion.
 */
export function Accordion({ question, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "20px 4px",
          textAlign: "left",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "17px",
          color: "var(--text-heading)",
        }}
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "var(--radius-sm)",
            background: open ? "var(--mte-blue)" : "var(--mte-blue-50)",
            color: open ? "#fff" : "var(--mte-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            lineHeight: 1,
            transition: "all var(--dur-fast)",
          }}
        >
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--dur-base) var(--ease-standard)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--fs-body)",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--text-body)",
              margin: 0,
              padding: "0 4px 20px",
            }}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
