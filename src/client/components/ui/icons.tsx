import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function iconProps(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export function PaperPlaneIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M3.5 11.5 21 3.5 13.5 21l-2.5-7.5L3.5 11.5Z" />
      <path d="m11 13.5 10-10" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 8v4.5l3 1.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="m6 12 4 4 8-8" />
    </svg>
  );
}

export function XCircleIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="m9.2 9.2 5.6 5.6" />
      <path d="m14.8 9.2-5.6 5.6" />
    </svg>
  );
}

export function SlashCircleIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="m7.2 16.8 9.6-9.6" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 4.5 3.8 19h16.4L12 4.5Z" />
      <path d="M12 10v4" />
      <path d="M12 16.5h.01" />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} className={props.className}>
      <path d="M12 4.5a7.5 7.5 0 1 1-6.7 4.2" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArchMarkIcon(props: IconProps) {
  return (
    <svg {...iconProps({ fill: "currentColor", stroke: "none", ...props })}>
      <path d="M4 20V12a8 8 0 0 1 16 0v8H4Z" opacity="0.9" />
    </svg>
  );
}
