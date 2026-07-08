import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CardTone = "light" | "flat" | "soft" | "brand" | "accent";

const tones: Record<CardTone, CSSProperties> = {
  light: {
    background: "var(--surface-card)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-body)",
  },
  flat: {
    background: "var(--surface-card)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-body)",
  },
  soft: {
    background: "var(--mte-gray-50)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-body)",
  },
  brand: {
    background: "var(--mte-blue)",
    color: "#fff",
    boxShadow: "var(--shadow-brand)",
  },
  accent: {
    background: "var(--mte-blue-50)",
    borderLeft: "4px solid var(--mte-cyan)",
    color: "var(--text-body)",
  },
};

export type CardProps = {
  children: ReactNode;
  tone?: CardTone;
  padding?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Surface card. tone: 'light' (white, shadow), 'flat' (bordered, no shadow),
 * 'soft' (gray), 'brand' (deep blue), 'accent' (cyan left keyline for ROI
 * callouts).
 */
export function Card({
  children,
  tone = "light",
  padding = "var(--space-6)",
  style,
  ...rest
}: CardProps) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        padding,
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
