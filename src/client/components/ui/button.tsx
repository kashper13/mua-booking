import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { SpinnerIcon } from "./icons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "approve"
  | "destructive"
  | "destructive-outline"
  | "text-link";

export type ButtonSize = "lg" | "md" | "sm";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-rosewood text-white hover:bg-rosewood-dark",
  secondary: "bg-blush text-rosewood-dark hover:bg-blush-hover",
  outline: "border border-input-border bg-surface text-plum-ink hover:border-border-hover",
  approve: "bg-action-approve text-white hover:opacity-90",
  destructive: "bg-feedback-error text-white hover:opacity-90",
  "destructive-outline":
    "border-2 border-feedback-error bg-surface text-feedback-error-text hover:bg-feedback-error-bg",
  "text-link":
    "bg-transparent text-rosewood underline-offset-4 hover:text-rosewood-dark hover:underline",
};

const sizeClass: Record<ButtonSize, string> = {
  lg: "min-h-control px-6 type-body-lg font-semibold",
  md: "min-h-control-dense px-5 type-body-lg font-semibold",
  sm: "min-h-touch px-4 type-small font-semibold",
};

export function Button({
  variant = "primary",
  size,
  loading = false,
  loadingLabel = "Loading…",
  icon,
  className,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const resolvedSize =
    size ?? (variant === "primary" ? "lg" : variant === "text-link" ? "sm" : "md");

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "ds-pressable relative inline-flex items-center justify-center gap-2 rounded-pill",
        "disabled:cursor-not-allowed disabled:opacity-45",
        variantClass[variant],
        sizeClass[resolvedSize],
        className,
      )}
    >
      <span
        className={cn("inline-flex items-center justify-center gap-2", loading && "invisible")}
        aria-hidden={loading || undefined}
      >
        {icon ? <span className="size-4 shrink-0 [&_svg]:size-4">{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className="absolute inset-0 inline-flex items-center justify-center gap-2">
          <SpinnerIcon className="size-4 motion-safe:animate-spin" />
          <span>{loadingLabel}</span>
        </span>
      ) : null}
    </button>
  );
}
