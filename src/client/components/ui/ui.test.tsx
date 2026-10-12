import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./alert";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { EmptyState } from "./empty-state";
import { IconButton } from "./icon-button";
import { PaperPlaneIcon } from "./icons";
import { LoadingSkeleton } from "./loading-skeleton";
import { RadioCard } from "./radio-card";
import { StatusChip } from "./status-chip";
import { TextInput } from "./text-input";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Request a booking</Button>);

    expect(screen.getByRole("button", { name: "Request a booking" })).toBeEnabled();
  });

  it("does not accept presses when disabled", () => {
    render(<Button disabled>Continue</Button>);

    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("exposes a busy state while loading", () => {
    render(
      <Button loading loadingLabel="Sending request…">
        Send booking request
      </Button>,
    );

    const button = screen.getByRole("button", { name: /sending request/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});

describe("IconButton", () => {
  it("requires an accessible name", () => {
    render(
      <IconButton aria-label="Message on Messenger">
        <PaperPlaneIcon />
      </IconButton>,
    );

    expect(screen.getByRole("button", { name: "Message on Messenger" })).toBeInTheDocument();
  });
});

describe("TextInput", () => {
  it("associates a visible label with the field", () => {
    render(<TextInput label="Full name" />);

    expect(screen.getByRole("textbox", { name: "Full name" })).toBeInTheDocument();
  });

  it("announces an error with aria-invalid and describedby", () => {
    render(
      <TextInput
        label="Mobile number"
        error="Enter a 10-digit number after +63, e.g. 917 123 4567"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Mobile number" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/10-digit number after \+63/i);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(/10-digit number/i);
    expect(alert.querySelector("svg")).not.toBeNull();
  });
});

describe("Checkbox", () => {
  it("toggles through a labelled control", () => {
    render(<Checkbox label="I understand this request is not yet confirmed" />);

    const checkbox = screen.getByRole("checkbox", {
      name: "I understand this request is not yet confirmed",
    });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe("RadioCard", () => {
  it("selects a labelled radio option", () => {
    render(
      <fieldset>
        <legend>Service</legend>
        <RadioCard name="service" value="bridal">
          Bridal makeup
        </RadioCard>
      </fieldset>,
    );

    const radio = screen.getByRole("radio", { name: "Bridal makeup" });
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });
});

describe("StatusChip", () => {
  it("labels each status with text, not color alone", () => {
    render(<StatusChip status="pending" />);

    expect(screen.getByText("Pending approval")).toBeInTheDocument();
  });
});

describe("Alert", () => {
  it("uses an alert role for errors", () => {
    render(<Alert variant="error">We couldn&apos;t send your request.</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent(/couldn.t send your request/i);
  });
});

describe("LoadingSkeleton", () => {
  it("exposes a busy loading status", () => {
    render(<LoadingSkeleton label="Checking availability" />);

    const status = screen.getByRole("status", { name: "Checking availability" });
    expect(status).toHaveAttribute("aria-busy", "true");
  });
});

describe("EmptyState", () => {
  it("renders the title and actions", () => {
    render(<EmptyState title="No bookings today" actions={<Button>Refresh</Button>} />);

    expect(screen.getByRole("heading", { name: "No bookings today" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
  });
});
