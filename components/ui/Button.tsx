import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-light"
    | "primary-line"
    | "secondary"
    | "ghost"
    | "danger"
    | "danger-line";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const cn = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md";

  const sizeStyles: Record<string, string> = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-12 px-6 text-sm rounded-md",
    lg: "h-14 px-8 text-base rounded-md",
  };

  const variantStyles: Record<string, string> = {
    // Uses CSS variables defined in app/globals.css (e.g. --bg-primary, --bg-secondary, --bg-danger)
    primary:
      "bg-[var(--bg-primary)] text-white hover:opacity-90 focus:ring-[var(--bg-primary)]",
    "primary-light":
      "bg-[var(--bg-light)] text-[color:var(--bg-primary)] hover:opacity-90 focus:ring-[var(--bg-light)]",
    "primary-line":
      "bg-white text-[color:var(--bg-primary)] border border-[var(--bg-primary)] hover:bg-[var(--bg-primary)] hover:text-white focus:ring-[var(--bg-primary)]",
    secondary:
      "bg-[var(--bg-secondary)] text-[color:var(--foreground)] hover:opacity-90 focus:ring-[var(--bg-secondary)]",
    ghost:
      "bg-transparent text-[color:var(--bg-primary)] border border-[var(--bg-primary)] hover:bg-[var(--bg-primary)] hover:text-white focus:ring-[var(--bg-primary)]",
    danger:
      "bg-[var(--bg-danger)] text-white hover:opacity-90 focus:ring-[var(--bg-danger)]",
    "danger-line":
      "bg-white text-[var(--bg-danger)] border border-[var(--bg-danger)] hover:bg-[var(--bg-danger)] hover:text-white focus:ring-[var(--bg-danger)]",
  };

  const appliedVariant = variantStyles[variant] || variantStyles.primary;
  const appliedSize = sizeStyles[size] || sizeStyles.md;

  // spinner color: when button background is white (line variants) or ghost, spinner should use primary color
  const spinnerBorderClass = variant === "primary-line" || variant === "danger-line" || variant === "ghost"
    ? "border-[var(--bg-primary)] border-t-transparent"
    : "border-white border-t-transparent";

  const classes = cn(
    baseStyles,
    appliedVariant,
    appliedSize,
    fullWidth ? "w-full" : "",
    disabled || loading ? "opacity-50 cursor-not-allowed" : "",
    className
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && (
        <span
          className={cn(
            "mr-3 inline-block w-4 h-4 rounded-full border-2 animate-spin",
            spinnerBorderClass
          )}
          aria-hidden
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
