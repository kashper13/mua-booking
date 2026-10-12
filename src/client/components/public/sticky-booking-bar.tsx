import type { ReactNode } from "react";

import { bookingComingSoonLabel, bookingUnavailableDetail } from "../../content/public-site";
import { usePublicChrome } from "./public-chrome-context";
import { ComingSoonButton, MessengerUnavailable } from "./unavailable-controls";
import { useInView, useKeyboardObscured, useMediaQuery } from "./use-viewport";

type StickyBookingBarProps = {
  watchElementId?: string;
  title?: string;
  detail?: string;
  action?: ReactNode;
};

export function StickyBookingBar({
  watchElementId = "hero-booking-action",
  title = bookingComingSoonLabel,
  detail = bookingUnavailableDetail,
  action,
}: StickyBookingBarProps) {
  const heroInView = useInView(watchElementId);
  const compact = useMediaQuery("(max-width: 1023px)", true);
  const keyboardObscured = useKeyboardObscured();
  const { menuOpen } = usePublicChrome();
  const visible = compact && !heroInView && !menuOpen && !keyboardObscured;

  if (!visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label={title}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface shadow-sticky lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3 px-gutter py-3">
        <p className="min-w-0 flex-1">
          <span className="block type-label text-plum-ink">{title}</span>
          <span className="block type-small text-mauve">{detail}</span>
        </p>
        <MessengerUnavailable />
        {action ?? (
          <ComingSoonButton size="compact" aria-label={title} className="shrink-0">
            Coming soon
          </ComingSoonButton>
        )}
      </div>
    </div>
  );
}
