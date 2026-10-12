import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../app";
import * as publicSite from "../content/public-site";

function Pathname() {
  const { pathname } = useLocation();
  return <div data-testid="pathname">{pathname}</div>;
}

function renderAt(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Pathname />
      <App />
    </MemoryRouter>,
  );
}

function installMatchMedia(matchesQuery: (query: string) => boolean) {
  window.matchMedia = (query: string) =>
    ({
      matches: matchesQuery(query),
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin = "";
  readonly scrollMargin = "";
  readonly thresholds: number[] = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

function focusableHeaderItems(header: HTMLElement) {
  return [...header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
    (element) => !element.closest("[hidden]") && element.getAttribute("aria-hidden") !== "true",
  );
}

afterEach(() => {
  Reflect.deleteProperty(window, "matchMedia");
  Reflect.deleteProperty(window, "IntersectionObserver");
  document.body.style.overflow = "";
  MockIntersectionObserver.instances = [];
});

describe("public homepage", () => {
  it("renders the homepage heading and placeholder identity", async () => {
    renderAt("/");

    expect(
      screen.getByRole("heading", { level: 1, name: "Professional makeup" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Professional makeup services for bridal, debut, graduation, and special events.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("[Artist Name]").length).toBeGreaterThan(0);
    expect(screen.getByText("Placeholder business name")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Biography placeholder. A short introduction from the makeup artist will replace this text.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("₱ [price]")).toHaveLength(2);
    expect(screen.getByText("Price to be confirmed by the makeup artist.")).toBeInTheDocument();
    expect(screen.getAllByText("Basilan, Philippines").length).toBeGreaterThan(0);
    expect(await screen.findByRole("heading", { name: "Testimonials" })).toBeInTheDocument();
    expect(screen.getByText(/no approved customer reviews yet/i)).toBeInTheDocument();
    expect(screen.getByText(/design placeholder/i)).toBeInTheDocument();
  });

  it("keeps navigation on real routes and labels unfinished destinations", () => {
    renderAt("/");

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    fireEvent.click(screen.getByRole("button", { name: /services/i }));
    fireEvent.click(screen.getByRole("button", { name: /check booking status/i }));
    expect(screen.getByTestId("pathname")).toHaveTextContent("/");

    for (const href of [...document.querySelectorAll("a")].map((anchor) =>
      anchor.getAttribute("href"),
    )) {
      expect(href === "/" || href === "#main-content").toBe(true);
      expect(href).not.toMatch(/m\.me|facebook|instagram|messenger|mailto:|tel:/i);
    }
  });

  it("opens and closes the mobile menu from the button and keyboard", () => {
    renderAt("/");

    const openMenu = screen.getByRole("button", { name: "Open menu" });
    expect(openMenu).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(openMenu);

    const dialog = screen.getByRole("dialog", { name: "Menu" });
    expect(openMenu).toHaveAttribute("aria-expanded", "true");
    expect(within(dialog).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: /portfolio/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    const header = screen.getByRole("banner");
    const items = focusableHeaderItems(header);
    const last = items[items.length - 1];
    const first = items[0];
    last?.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("does not send a booking or link to a fabricated Messenger address", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderAt("/");

    expect(document.querySelector("form")).toBeNull();
    for (const button of screen.getAllByRole("button", { name: "Online booking coming soon" })) {
      expect(button).toHaveAttribute("aria-disabled", "true");
      fireEvent.click(button);
    }
    fireEvent.click(screen.getByRole("button", { name: "Messenger isn't available yet" }));

    expect(screen.getByTestId("pathname")).toHaveTextContent("/");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(document.body.innerHTML).not.toMatch(/m\.me|facebook\.com|instagram\.com|https?:\/\//i);
    expect(JSON.stringify(publicSite)).not.toMatch(/https?:|m\.me|facebook\.com|instagram\.com/i);
    expect(screen.getByText("Facebook — Not added yet").closest("a")).toBeNull();
    expect(screen.getByText("Instagram — Not added yet").closest("a")).toBeNull();

    fetchSpy.mockRestore();
  });

  it("shows the sticky coming-soon bar only after the hero action leaves view", () => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    renderAt("/");

    expect(
      screen.queryByRole("region", { name: "Online booking coming soon" }),
    ).not.toBeInTheDocument();

    act(() => {
      for (const observer of MockIntersectionObserver.instances) {
        observer.trigger(false);
      }
    });

    const bar = screen.getByRole("region", { name: "Online booking coming soon" });
    const action = within(bar).getByRole("button", { name: "Online booking coming soon" });
    expect(action).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(action);
    expect(screen.getByTestId("pathname")).toHaveTextContent("/");
    expect(document.querySelector("form")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(
      screen.queryByRole("region", { name: "Online booking coming soon" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the compact menu until the navigation fits on one row", () => {
    installMatchMedia((query) => query.includes("min-width: 768px"));
    renderAt("/");

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Primary" })).not.toBeInTheDocument();
  });

  it("uses a single-row navigation once the desktop width fits", () => {
    installMatchMedia((query) => query.includes("min-width: 1024px"));
    renderAt("/");

    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(primary.querySelector("ul")).toHaveClass("flex-nowrap");
    expect(within(primary).getByRole("button", { name: /messenger/i })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.queryByRole("button", { name: "Open menu" })).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Online booking coming soon" }).length,
    ).toBeGreaterThan(0);
  });

  it("keeps the admin placeholder and unknown routes working", () => {
    renderAt("/admin");
    expect(screen.getByRole("heading", { name: "Admin placeholder" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/not authenticated/i);
  });

  it("keeps unknown public routes on the not-found page", () => {
    renderAt("/missing");
    expect(screen.getByRole("heading", { name: "Not found" })).toBeInTheDocument();
  });
});
