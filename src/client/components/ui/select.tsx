import { useId, type SelectHTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { FieldError } from "./field-error";
import { ChevronDownIcon } from "./icons";

export type SelectProps = {
  label: string;
  hint?: string;
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  label,
  hint,
  error,
  id,
  className,
  disabled,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="type-label text-plum-ink">
        {label}
      </label>
      <div className="relative">
        <select
          {...props}
          id={selectId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-control w-full appearance-none rounded-md border bg-surface py-0 pr-11 pl-3",
            "type-body-lg text-plum-ink disabled:cursor-not-allowed disabled:opacity-45",
            error ? "border-2 border-feedback-error" : "border-input-border",
            className,
          )}
        >
          {children}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-mauve" />
      </div>
      {hint ? (
        <p id={hintId} className="type-small text-mauve">
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}
