import { useId, useState, type TextareaHTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import { FieldError } from "./field-error";

export type TextareaProps = {
  label: string;
  hint?: string;
  error?: string;
  showCount?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
  label,
  hint,
  error,
  showCount = false,
  id,
  className,
  disabled,
  maxLength,
  value,
  defaultValue,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = hint ? `${textareaId}-hint` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const initialLength =
    typeof value === "string"
      ? value.length
      : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;
  const [uncontrolledLength, setUncontrolledLength] = useState(initialLength);
  const currentLength = typeof value === "string" ? value.length : uncontrolledLength;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="type-label text-plum-ink">
        {label}
      </label>
      <textarea
        {...props}
        id={textareaId}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(event) => {
          if (typeof value !== "string") {
            setUncontrolledLength(event.target.value.length);
          }
          props.onChange?.(event);
        }}
        className={cn(
          "min-h-24 w-full rounded-md border bg-surface px-3 py-3 type-body-lg text-plum-ink",
          "placeholder:text-mauve disabled:cursor-not-allowed disabled:opacity-45",
          error ? "border-2 border-feedback-error" : "border-input-border",
          className,
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {hint ? (
            <p id={hintId} className="type-small text-mauve">
              {hint}
            </p>
          ) : null}
          {error ? <FieldError id={errorId}>{error}</FieldError> : null}
        </div>
        {showCount && maxLength ? (
          <p className="type-small shrink-0 text-mauve">
            {currentLength}/{maxLength}
          </p>
        ) : null}
      </div>
    </div>
  );
}
