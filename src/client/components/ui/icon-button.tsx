import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

export type IconButtonVariant = "blush" | "ghost";

export type IconButtonProps = {
  variant?: IconButtonVariant;
  children: ReactNode;
  "aria-label": string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children">;

const variantClass: Record<IconButtonVariant, string> = {
  blush: "bg-blush text-rosewood-dark hover:bg-blush-hover",
  ghost: "bg-transparent text-plum-ink hover:bg-blush-tint",
};

export function IconButton({
  variant = "blush",
  className,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        "ds-pressable inline-flex size-touch items-center justify-center rounded-full",
        "disabled:cursor-not-allowed disabled:opacity-45",
        "[&_svg]:size-5",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}
