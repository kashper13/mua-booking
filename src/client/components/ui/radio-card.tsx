import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";

export type RadioCardProps = {
  children: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children">;

export function RadioCard({ children, id, className, disabled, ...props }: RadioCardProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "ds-pressable flex min-h-control cursor-pointer rounded-lg border-2 border-border bg-surface p-4 has-[:checked]:border-rosewood has-[:checked]:bg-blush-tint",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-plum-ink",
        "hover:border-border-hover has-[:checked]:hover:border-rosewood",
        disabled && "cursor-not-allowed opacity-45 hover:border-border",
        className,
      )}
    >
      <input {...props} id={inputId} type="radio" disabled={disabled} className="sr-only" />
      <span className="type-body-lg text-plum-ink">{children}</span>
    </label>
  );
}
