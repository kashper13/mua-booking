import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { EmptyState } from "../components/ui/empty-state";
import { IconButton } from "../components/ui/icon-button";
import { LoadingSkeleton } from "../components/ui/loading-skeleton";
import { RadioCard } from "../components/ui/radio-card";
import { Select } from "../components/ui/select";
import { StatusChip } from "../components/ui/status-chip";
import { Textarea } from "../components/ui/textarea";
import { TextInput } from "../components/ui/text-input";
import { Alert } from "../components/ui/alert";
import { PaperPlaneIcon } from "../components/ui/icons";

const colors = [
  ["Petal", "bg-petal", "#FFF7F4"],
  ["Blush", "bg-blush", "#F4DCD6"],
  ["Blush Tint", "bg-blush-tint", "#FBEAE5"],
  ["Rosewood", "bg-rosewood", "#8C4A55"],
  ["Rosewood Dark", "bg-rosewood-dark", "#6E3540"],
  ["Plum Ink", "bg-plum-ink", "#3B2A30"],
  ["Mauve", "bg-mauve", "#7A666C"],
  ["Sage", "bg-sage", "#7E8C76"],
  ["Sage Text", "bg-sage-text", "#5F6B58"],
  ["Surface", "bg-surface", "#FFFFFF"],
  ["Border", "bg-border", "#EBD3CC"],
] as const;

export function DesignSystemPage() {
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <main className="mx-auto max-w-4xl px-gutter-text py-10">
      <p className="type-eyebrow text-sage-text">Development only</p>
      <h1 className="type-display mt-3 text-plum-ink">Rosé Arch design system</h1>
      <p className="mt-4 max-w-2xl type-body-lg text-mauve">
        Token and component reference from design specification DRAFT v0.4. This page is omitted
        from production builds.
      </p>

      <section className="mt-12">
        <h2 className="type-h2">Brand colors</h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {colors.map(([name, swatch, hex]) => (
            <li key={name}>
              <div className={`h-16 rounded-lg border border-border ${swatch}`} />
              <p className="mt-2 type-label">{name}</p>
              <p className="type-small text-mauve">{hex}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="type-h2">Typography</h2>
        <div className="mt-6 space-y-4">
          <p className="type-display">Display heading</p>
          <p className="type-h1">Page heading</p>
          <p className="type-h2">Section heading</p>
          <p className="type-card-title">Card title</p>
          <p className="type-body-lg">Body large for reading and input text.</p>
          <p className="type-label">Form label</p>
          <p className="type-small text-mauve">Helper text sits under fields.</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-h2">Buttons</h2>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="approve">Approve</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="destructive-outline">Decline</Button>
          <Button variant="text-link">Text link</Button>
          <Button disabled>Disabled</Button>
          <Button loading loadingLabel="Sending request…">
            Send
          </Button>
          <IconButton aria-label="Message on Messenger">
            <PaperPlaneIcon />
          </IconButton>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-h2">Form controls</h2>
        <div className="mt-6 grid gap-field">
          <TextInput label="Full name" hint="As it should appear on the request." />
          <TextInput label="Mobile number" prefix="+63" defaultValue="917 123 4567" />
          <TextInput
            label="Email"
            error="Enter a valid email, or leave this blank."
            defaultValue="not-an-email"
          />
          <Textarea label="Notes" showCount maxLength={500} defaultValue="Optional notes" />
          <Select label="Preferred contact">
            <option value="text">Text/call</option>
            <option value="messenger">Messenger</option>
          </Select>
          <Checkbox label="I understand this request is not yet confirmed and agree to be contacted about it." />
          <fieldset className="grid gap-3">
            <legend className="type-label">Service</legend>
            <RadioCard name="service-preview" value="bridal" defaultChecked>
              Bridal makeup
            </RadioCard>
            <RadioCard name="service-preview" value="debut">
              Debut
            </RadioCard>
          </fieldset>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-h2">Status chips</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          <StatusChip status="requested" />
          <StatusChip status="pending" />
          <StatusChip status="confirmed" />
          <StatusChip status="declined" />
          <StatusChip status="cancelled" size="sm" />
        </div>
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="type-h2">Alerts</h2>
        <Alert variant="info">This date currently has no other bookings.</Alert>
        <Alert variant="pending">
          This is your preferred time. The schedule is not confirmed yet.
        </Alert>
        <Alert variant="warning">Declining cannot be undone from this sheet.</Alert>
        <Alert variant="error">
          We couldn&apos;t send your request. Try again or use Messenger.
        </Alert>
      </section>

      <section className="mt-12">
        <h2 className="type-h2">Cards and loading</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <p className="type-card-title">Service card</p>
            <p className="mt-2 type-body text-mauve">Surface, border, and editorial title.</p>
          </Card>
          <div className="space-y-3">
            <LoadingSkeleton className="h-4 w-2/3" />
            <LoadingSkeleton className="h-4 w-full" />
            <LoadingSkeleton className="h-24 w-full" />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-h2">Empty state</h2>
        <Card padding="lg" className="mt-6">
          <EmptyState
            title="No bookings today"
            description="New website requests will appear here."
            actions={<Button variant="secondary">Refresh</Button>}
          />
        </Card>
      </section>
    </main>
  );
}
