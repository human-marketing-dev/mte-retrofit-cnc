import type { ReactNode } from "react";

export type ProcessStepProps = {
  number: number;
  title: string;
  children: ReactNode;
  last?: boolean;
};

/** Numbered timeline step for the retrofit process section. */
export function ProcessStep({ number, title, children, last = false }: ProcessStepProps) {
  return (
    <div style={{ display: "flex", gap: "var(--space-5)", position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "var(--radius-md)",
            background: "var(--mte-blue)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "22px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {number}
        </div>
        {!last && (
          <div
            style={{
              width: "2px",
              flex: 1,
              background: "var(--mte-gray-200)",
              marginTop: "8px",
              minHeight: "24px",
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: last ? 0 : "var(--space-7)" }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--fs-h4)",
            color: "var(--text-heading)",
            margin: "8px 0 6px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-body)",
            lineHeight: "var(--lh-relaxed)",
            color: "var(--text-body)",
            margin: 0,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
