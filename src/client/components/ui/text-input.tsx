import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "../../lib/cn";
import { FieldError } from "./field-error";

export type TextInputProps = {
  label: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "prefix">;

export function TextInput({
  label,
  hint,
  error,
  prefix,
  id,
  className,
  disabled,
  ...props
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="type-label text-plum-ink">
        {label}
      </label>
      <div
        className={cn(
          "flex min-h-control items-stretch overflow-hidden rounded-md border bg-surface",
          error ? "border-2 border-feedback-error" : "border-input-border",
          disabled && "cursor-not-allowed opacity-45",
        )}
      >
        {prefix ? (
          <span className="flex items-center bg-blush-tint px-3 type-body-lg text-rosewood-dark">
            {prefix}
          </span>
        ) : null}
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-control w-full bg-transparent px-3 type-body-lg text-plum-ink",
            "placeholder:text-mauve disabled:cursor-not-allowed",
            className,
          )}
        />
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
