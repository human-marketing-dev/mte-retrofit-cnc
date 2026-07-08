import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
};

/**
 * Labeled field wrapper. Wraps its control in a <label>, so the control needs
 * no explicit htmlFor/id pairing.
 *
 * Focus styling (the 3px cyan glow) lives in globals.css on .field-control, so
 * these stay Server Components — upstream used onFocus/onBlur handlers.
 */
export function Field({ label, required = false, hint, children }: FieldProps) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "14px",
          color: "var(--text-heading)",
          marginBottom: "6px",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--mte-danger)" }}> *</span>}
      </span>
      {children}
      {hint && (
        <span
          style={{
            display: "block",
            fontSize: "12px",
            color: "var(--text-muted)",
            marginTop: "5px",
          }}
        >
          {hint}
        </span>
      )}
    </label>
  );
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={["field-control", className].filter(Boolean).join(" ")} {...rest} />;
}

export function Textarea({
  className,
  rows = 3,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      className={["field-control", className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={["field-control", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </select>
  );
}
