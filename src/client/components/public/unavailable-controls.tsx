import type { ButtonHTMLAttributes, ReactNode } from "react";

import { messengerUnavailableLabel } from "../../content/public-site";
import { cn } from "../../lib/cn";
import { MessageIcon } from "./icons";

type ComingSoonButtonProps = {
  children: ReactNode;
  size?: "default" | "compact";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "aria-disabled">;

const sizeClass = {
  default: "min-h-control px-4 type-body-lg",
  compact: "min-h-touch px-4 type-body",
} as const;

export function ComingSoonButton({
  children,
  size = "default",
  className,
  onClick,
  ...props
}: ComingSoonButtonProps) {
  return (
    <button
      {...props}
      type="button"
      aria-disabled="true"
      className={cn(
        "inline-flex max-w-full min-w-0 cursor-not-allowed items-center justify-center rounded-pill bg-blush text-center font-semibold whitespace-normal text-rosewood-dark",
        sizeClass[size],
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}

type UnavailableNavItemProps = {
  label: string;
  note: string;
  noteVisibility?: "visible" | "sr-only";
  className?: string;
};

export function UnavailableNavItem({
  label,
  note,
  noteVisibility = "visible",
  className,
}: UnavailableNavItemProps) {
  const compact = noteVisibility === "sr-only";

  return (
    <button
      type="button"
      aria-disabled="true"
      className={cn(
        "inline-flex min-h-touch cursor-not-allowed items-center gap-3 rounded-pill px-3 text-left type-body",
        compact
          ? "w-auto shrink-0 justify-start whitespace-nowrap text-mauve"
          : "w-full justify-between text-plum-ink md:w-auto md:justify-start",
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <span>{label}</span>
      <span
        className={cn(
          "shrink-0 rounded-pill bg-blush px-2 py-1 type-micro text-rosewood-dark",
          compact && "sr-only",
        )}
      >
        {note}
      </span>
    </button>
  );
}

export function MessengerUnavailable({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-disabled="true"
      aria-label={messengerUnavailableLabel}
      className={cn(
        "inline-flex size-touch shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-blush text-rosewood-dark",
        className,
      )}
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <MessageIcon className="size-5" />
    </button>
  );
}
