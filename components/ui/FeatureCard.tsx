import type { CSSProperties, ReactNode } from "react";

export type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  style?: CSSProperties;
};

/**
 * Benefit / feature tile: icon chip + title + body. Used in the ROI/benefits
 * grid. The 3px hover lift lives in globals.css (.feature-card:hover).
 */
export function FeatureCard({ icon, title, children, style }: FeatureCardProps) {
  return (
    <div className="feature-card" style={style}>
      {icon != null && (
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "var(--radius-md)",
            background: "var(--mte-blue-50)",
            color: "var(--mte-blue)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "var(--space-4)",
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "var(--fs-h4)",
          color: "var(--text-heading)",
          margin: "0 0 8px",
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
  );
}
