import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { App } from "./app";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("application shell routing", () => {
  it("renders the public home stub", () => {
    renderAt("/");

    expect(screen.getByRole("heading", { name: "Professional makeup" })).toBeInTheDocument();
  });

  it("renders the admin placeholder", () => {
    renderAt("/admin");

    expect(screen.getByRole("heading", { name: "Admin placeholder" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/not authenticated/i);
  });

  it("renders not found for unknown public routes", () => {
    renderAt("/missing");

    expect(screen.getByRole("heading", { name: "Not found" })).toBeInTheDocument();
  });

  it("renders the design system showcase in development", async () => {
    renderAt("/dev/design-system");

    expect(
      await screen.findByRole("heading", { name: "Rosé Arch design system" }),
    ).toBeInTheDocument();
  });
});
