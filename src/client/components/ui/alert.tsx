import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { ClockIcon, InfoIcon, WarningIcon, XCircleIcon } from "./icons";

export type AlertVariant = "info" | "warning" | "error" | "pending";

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const variantClass: Record<AlertVariant, string> = {
  info: "border-transparent bg-feedback-info-bg text-feedback-info-text",
  warning: "border-transparent bg-feedback-warn-bg text-feedback-warn-text",
  error: "border border-feedback-error-border bg-feedback-error-bg text-feedback-error-text",
  pending: "border-transparent bg-status-pending text-status-pending-fg",
};

const variantIcon: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon className="size-5 shrink-0" />,
  warning: <WarningIcon className="size-5 shrink-0" />,
  error: <XCircleIcon className="size-5 shrink-0" />,
  pending: <ClockIcon className="size-5 shrink-0" />,
};

export function Alert({ variant = "info", title, children, className, ...props }: AlertProps) {
  return (
    <div
      {...props}
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "flex gap-3 rounded-md border px-4 py-3 type-body",
        variantClass[variant],
        className,
      )}
    >
      {variantIcon[variant]}
      <div className="min-w-0">
        {title ? <p className="type-label">{title}</p> : null}
        <div className={title ? "mt-1" : undefined}>{children}</div>
      </div>
    </div>
  );
}
