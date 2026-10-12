import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type LoadingSkeletonProps = {
  label?: string;
} & HTMLAttributes<HTMLDivElement>;

export function LoadingSkeleton({ label = "Loading", className, ...props }: LoadingSkeletonProps) {
  return (
    <div
      {...props}
      role="status"
      aria-busy="true"
      aria-label={label}
      className={cn("ds-skeleton rounded-md", className ?? "h-4 w-full")}
    />
  );
}
