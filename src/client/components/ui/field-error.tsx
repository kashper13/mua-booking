import type { ReactNode } from "react";

import { XCircleIcon } from "./icons";

type FieldErrorProps = {
  id?: string;
  children: ReactNode;
};

export function FieldError({ id, children }: FieldErrorProps) {
  return (
    <p
      id={id}
      className="flex items-start gap-1.5 type-small text-feedback-error-text"
      role="alert"
    >
      <XCircleIcon className="mt-0.5 size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
