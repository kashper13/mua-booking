import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type CardPadding = "none" | "md" | "lg";

export type CardProps = {
  padding?: CardPadding;
} & HTMLAttributes<HTMLDivElement>;

const paddingClass: Record<CardPadding, string> = {
  none: "p-0",
  md: "p-4",
  lg: "p-5",
};

export function Card({ padding = "md", className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-lg border border-border bg-surface text-plum-ink",
        paddingClass[padding],
        className,
      )}
    />
  );
}
