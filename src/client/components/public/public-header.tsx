import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

import {
  artistNamePlaceholder,
  bookingComingSoonLabel,
  unavailableNavItems,
} from "../../content/public-site";
import { cn } from "../../lib/cn";
import { IconButton } from "../ui/icon-button";
import { CloseIcon, MenuIcon } from "./icons";
import { usePublicChrome } from "./public-chrome-context";
import { ComingSoonButton, UnavailableNavItem } from "./unavailable-controls";
import { useMediaQuery } from "./use-viewport";

const inertTargetIds = ["skip-to-content", "main-content", "public-footer"];

function setBackgroundInert(active: boolean) {
  for (const id of inertTargetIds) {
    const element = document.getElementById(id);
    if (!element) {
      continue;
    }
    if (active) {
      element.setAttribute("inert", "");
    } else {
      element.removeAttribute("inert");
    }
  }
}

function Wordmark({ compact }: { compact: boolean }) {
  return (
    <Link
      to="/"
      className={cn(
        "block font-display text-xl leading-none text-plum-ink md:text-2xl",
        compact ? "max-w-full min-w-0 truncate" : "shrink-0",
      )}
    >
      {artistNamePlaceholder}
      <span className="sr-only">, placeholder business name</span>
    </Link>
  );
}

function PrimaryNav({
  orientation,
  onNavigate,
}: {
  orientation: "row" | "column";
  onNavigate?: () => void;
}) {
  const { pathname } = useLocation();

  return (
    <nav aria-label={orientation === "row" ? "Primary" : "Mobile"}>
      <ul
        className={cn(
          orientation === "row" ? "flex flex-nowrap items-center gap-1" : "flex flex-col gap-1",
        )}
      >
        <li className={orientation === "row" ? "shrink-0" : undefined}>
          <Link
            to="/"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "inline-flex min-h-touch items-center rounded-pill px-3 type-body font-semibold whitespace-nowrap text-rosewood",
              orientation === "row" ? "w-auto" : "w-full",
            )}
          >
            Home
          </Link>
        </li>
        {unavailableNavItems.map((item) => (
          <li key={item.label} className={orientation === "row" ? "shrink-0" : undefined}>
            <UnavailableNavItem
              label={item.label}
              note={item.note}
              noteVisibility={orientation === "row" ? "sr-only" : "visible"}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function focusableIn(root: HTMLElement | null): HTMLElement[] {
  if (!root) {
    return [];
  }

  return [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
    (element) => !element.closest("[hidden]") && element.getAttribute("aria-hidden") !== "true",
  );
}

export function PublicHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuWasOpen = useRef(false);
  const desktopNav = useMediaQuery("(min-width: 1024px)", false);
  const { menuOpen, setMenuOpen } = usePublicChrome();

  useEffect(() => {
    if (desktopNav) {
      setMenuOpen(false);
    }
  }, [desktopNav, setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      if (menuWasOpen.current) {
        menuWasOpen.current = false;
        headerRef.current?.querySelector<HTMLButtonElement>('[aria-label="Open menu"]')?.focus();
      }
      return;
    }

    menuWasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setBackgroundInert(true);
    menuRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const items = focusableIn(headerRef.current);
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      setBackgroundInert(false);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <header ref={headerRef} className="relative z-50 border-b border-border bg-petal">
      <div className="relative z-50 mx-auto flex w-full max-w-[1200px] items-center gap-3 bg-petal px-gutter-text py-3 md:px-8 lg:gap-6 lg:px-10">
        <Wordmark compact={!desktopNav} />
        {desktopNav ? (
          <>
            <div className="min-w-0 flex-1">
              <PrimaryNav orientation="row" />
            </div>
            <ComingSoonButton
              size="compact"
              aria-label={bookingComingSoonLabel}
              className="shrink-0 whitespace-nowrap"
            >
              Coming soon
            </ComingSoonButton>
          </>
        ) : (
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-disabled="true"
              className="inline-flex min-h-touch items-center px-2 type-small font-semibold text-rosewood"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              Check status
              <span className="sr-only">, booking, coming soon</span>
            </button>
            <IconButton
              variant="ghost"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="public-menu"
              onClick={() => {
                setMenuOpen((open) => !open);
              }}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        )}
      </div>
      {desktopNav ? null : (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            hidden={!menuOpen}
            className="fixed inset-0 z-40 bg-plum-ink/40"
            onClick={() => {
              setMenuOpen(false);
            }}
          />
          <div
            id="public-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="public-menu-title"
            hidden={!menuOpen}
            className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-petal px-gutter-text py-4"
          >
            <p id="public-menu-title" className="px-3 type-label text-plum-ink">
              Menu
            </p>
            <PrimaryNav
              orientation="column"
              onNavigate={() => {
                setMenuOpen(false);
              }}
            />
          </div>
        </>
      )}
    </header>
  );
}
