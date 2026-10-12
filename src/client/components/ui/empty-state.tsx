import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { ArchMarkIcon } from "./icons";

export type EmptyStateProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  icon?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function EmptyState({
  title,
  description,
  actions,
  icon,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div {...props} className={cn("flex flex-col items-center px-6 py-10 text-center", className)}>
      <div className="mb-5 flex size-16 items-end justify-center rounded-arch bg-blush text-rosewood">
        {icon ?? <ArchMarkIcon className="size-8" />}
      </div>
      <h2 className="type-h2 text-plum-ink">{title}</h2>
      {description ? <p className="mt-2 max-w-md type-body text-mauve">{description}</p> : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      ) : null}
    </div>
  );
}
