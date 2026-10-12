import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { FieldError } from "./field-error";

export type CheckboxProps = {
  label: ReactNode;
  hint?: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ label, hint, error, id, className, disabled, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer items-start gap-3",
          disabled && "cursor-not-allowed opacity-45",
        )}
      >
        <span className="inline-flex size-touch shrink-0 items-center justify-center">
          <input
            {...props}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "size-5 rounded-sm border-input-border accent-rosewood",
              "disabled:cursor-not-allowed",
              className,
            )}
          />
        </span>
        <span className="type-body pt-2.5 text-plum-ink">{label}</span>
      </label>
      {hint ? (
        <p id={hintId} className="type-small pl-touch text-mauve">
          {hint}
        </p>
      ) : null}
      {error ? (
        <div className="pl-touch">
          <FieldError id={errorId}>{error}</FieldError>
        </div>
      ) : null}
    </div>
  );
}
