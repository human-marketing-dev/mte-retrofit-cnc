/**
 * MTE logo lockup: isotype (diamond cluster of squares) + "mte" + GLOBAL SOLUTIONS.
 *
 * ⚠️ PLACEHOLDER ISOTYPE — the real mark ships in the design system as
 * `assets/mte-mark-white.png` / `assets/mte-mark-blue.png` (2950×3276 RGBA).
 * Both exceed the design MCP's 256 KiB per-file transport cap, so they could
 * not be pulled down; `<LogoMark>` below is a hand-built SVG stand-in of the
 * square-cluster motif, not the licensed artwork.
 *
 * To swap in the real mark: drop the two PNGs into `public/`, then replace the
 * <LogoMark /> call in <Logo> with:
 *
 *   <Image
 *     src={onBrand ? "/mte-mark-white.png" : "/mte-mark-blue.png"}
 *     alt=""
 *     width={height}
 *     height={height}
 *     style={{ height, width: "auto" }}
 *   />
 *
 * Nothing else needs to change — sizing and colour already flow from `height`
 * and `currentColor`.
 */

type LogoProps = {
  onBrand?: boolean;
  height?: number;
};

/** Diamond cluster of squares, drawn in currentColor. */
function LogoMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* Squares laid out on a diamond (45°-rotated) lattice. */}
      <g fill="currentColor">
        <rect x="42" y="4" width="16" height="16" />
        <rect x="23" y="23" width="16" height="16" />
        <rect x="61" y="23" width="16" height="16" />
        <rect x="4" y="42" width="16" height="16" />
        <rect x="42" y="42" width="16" height="16" />
        <rect x="80" y="42" width="16" height="16" />
        <rect x="23" y="61" width="16" height="16" />
        <rect x="61" y="61" width="16" height="16" />
        <rect x="42" y="80" width="16" height="16" />
      </g>
    </svg>
  );
}

export function Logo({ onBrand = false, height = 38 }: LogoProps) {
  const color = onBrand ? "#fff" : "var(--mte-blue)";

  return (
    <a
      href="#top"
      aria-label="MTE Global Solutions — inicio"
      style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color }}
    >
      <LogoMark size={height} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: `${height * 0.74}px`,
            color,
            letterSpacing: "-.01em",
          }}
        >
          mte
        </span>
        {/* The descriptor must never wrap — the lockup is one line by design.
            Below 560px it would push the header past the viewport, so it is
            hidden there rather than allowed to break (see globals.css). */}
        <span
          className="logo-descriptor"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: `${height * 0.2}px`,
            letterSpacing: ".32em",
            color,
            marginTop: "3px",
            whiteSpace: "nowrap",
          }}
        >
          GLOBAL SOLUTIONS
        </span>
      </span>
    </a>
  );
}
