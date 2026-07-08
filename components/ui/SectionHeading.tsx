import type { CSSProperties, ReactNode } from "react";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onBrand?: boolean;
  style?: CSSProperties;
};

/** Section heading block: eyebrow + H2 + optional lead. onBrand for dark sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onBrand = false,
  style,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      style={{
        textAlign: align,
        maxWidth: centered ? "760px" : "none",
        marginInline: centered ? "auto" : 0,
        ...style,
      }}
    >
      {eyebrow && (
        <div className="mte-eyebrow" style={{ marginBottom: "var(--space-3)" }}>
          {eyebrow}
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "var(--fs-h2)",
          lineHeight: "var(--lh-snug)",
          letterSpacing: "var(--ls-tight)",
          color: onBrand ? "#fff" : "var(--text-heading)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {lead && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-lead)",
            lineHeight: "var(--lh-normal)",
            color: onBrand ? "var(--mte-blue-200)" : "var(--text-body)",
            marginTop: "var(--space-4)",
            marginInline: centered ? "auto" : 0,
          }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
