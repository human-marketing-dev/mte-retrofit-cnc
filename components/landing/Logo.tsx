import Image from "next/image";

/**
 * MTE logo lockup (isotype + "mte" + GLOBAL SOLUTIONS), in the two brand
 * colourways the client supplied:
 *
 *   - blue   (navy #0E2F4F + cyan #2EAADB) for light surfaces — the header
 *   - white  (solid #FFFFFF)               for dark surfaces  — the footer
 *
 * Sources are `public/mte-logo-{azul,blanco}.webp`, both 5000×3334 canvases
 * whose artwork occupies only ~63% of the frame. The `.png` files consumed here
 * are alpha-trimmed and downscaled to 1200px wide (≈4× the largest rendered
 * size). The originals are kept untouched.
 *
 * Each colourway has its own intrinsic size — the two trims differ by a pixel
 * in aspect — so width/height come from the variant, not a shared constant.
 * Passing the true intrinsic ratio to next/image is what prevents layout shift.
 */

const VARIANTS = {
  blue: { src: "/mte-logo-azul.png", w: 1200, h: 518 },
  white: { src: "/mte-logo-blanco.png", w: 1200, h: 517 },
} as const;

type LogoProps = {
  /** Render the white colourway, for dark backgrounds. */
  onBrand?: boolean;
  /** Rendered height of the lockup, in px. Width follows the aspect ratio. */
  height?: number;
};

export function Logo({ onBrand = false, height = 38 }: LogoProps) {
  const { src, w, h } = VARIANTS[onBrand ? "white" : "blue"];
  // Rendered width, used only to hint `sizes` — the box is reserved from the
  // intrinsic w/h below, so this never has to be pixel-exact.
  const displayWidth = Math.round(height * (w / h));

  return (
    <a
      href="#top"
      aria-label="MTE Global Solutions — inicio"
      style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
    >
      <Image
        src={src}
        alt="MTE Global Solutions"
        // Intrinsic dimensions, not display ones: next/image derives the
        // aspect-ratio box from these. Passing rounded display values instead
        // skews the ratio (46px tall × 2.3166 is 106.56, not 107).
        width={w}
        height={h}
        priority
        sizes={`${displayWidth}px`}
        style={{ height: `${height}px`, width: "auto" }}
      />
    </a>
  );
}
