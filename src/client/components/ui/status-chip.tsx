import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";
import { CheckIcon, ClockIcon, PaperPlaneIcon, SlashCircleIcon, XCircleIcon } from "./icons";

export type BookingStatus = "requested" | "pending" | "confirmed" | "declined" | "cancelled";

export type StatusChipSize = "md" | "sm";

export type StatusChipProps = {
  status: BookingStatus;
  size?: StatusChipSize;
} & HTMLAttributes<HTMLSpanElement>;

const statusClass: Record<BookingStatus, string> = {
  requested: "bg-status-requested text-status-requested-fg",
  pending: "bg-status-pending text-status-pending-fg",
  confirmed: "bg-status-confirmed text-status-confirmed-fg",
  declined: "bg-status-declined text-status-declined-fg",
  cancelled: "bg-status-cancelled text-status-cancelled-fg",
};

const statusLabel: Record<BookingStatus, string> = {
  requested: "Requested",
  pending: "Pending approval",
  confirmed: "Confirmed",
  declined: "Declined",
  cancelled: "Cancelled",
};

const statusIcon: Record<BookingStatus, ReactNode> = {
  requested: <PaperPlaneIcon className="size-3.5" />,
  pending: <ClockIcon className="size-3.5" />,
  confirmed: <CheckIcon className="size-3.5" />,
  declined: <XCircleIcon className="size-3.5" />,
  cancelled: <SlashCircleIcon className="size-3.5" />,
};

export function StatusChip({ status, size = "md", className, ...props }: StatusChipProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-semibold",
        size === "md" ? "text-[14px] leading-[1.3]" : "text-[12px] leading-[1.3]",
        statusClass[status],
        className,
      )}
    >
      {statusIcon[status]}
      <span>{statusLabel[status]}</span>
    </span>
  );
}
