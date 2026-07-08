import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "onBrand"
  | "onBrandOutline"
  | "whatsapp"
  | "phone";

export type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
) {
  return [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * MTE primary action button. Variants map to the landing CTA hierarchy:
 * primary (solid blue), secondary (blue outline), ghost, onBrand /
 * onBrandOutline (for dark-blue sections), whatsapp, phone.
 *
 * Renders an <a> when `href` is passed, otherwise a <button>. Hover and focus
 * live in globals.css so this stays a Server Component.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    icon = null,
    iconRight = null,
    fullWidth = false,
    className,
    ...rest
  } = props;

  const cn = classes(variant, size, fullWidth, className);

  if (rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={cn}>
        {icon}
        {children}
        {iconRight}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={cn}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
