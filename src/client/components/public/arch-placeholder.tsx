import { cn } from "../../lib/cn";

const toneClass = {
  "photo-1": "bg-photo-1",
  "photo-2": "bg-photo-2",
  "photo-3": "bg-photo-3",
} as const;

export type ArchTone = keyof typeof toneClass;

type ArchPlaceholderProps = {
  label: string;
  tone?: ArchTone;
  decorative?: boolean;
  className?: string;
};

export function ArchPlaceholder({
  label,
  tone = "photo-1",
  decorative = false,
  className,
}: ArchPlaceholderProps) {
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      className={cn("relative overflow-hidden rounded-arch", toneClass[tone], className)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 rounded-arch border border-sage/50"
      />
      <span className="absolute inset-x-1 bottom-2 text-center type-micro leading-tight text-plum-ink">
        Placeholder
      </span>
    </div>
  );
}
