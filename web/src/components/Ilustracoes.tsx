// Ilustrações em traço fino. Ocupam o lugar da foto até as fotos reais chegarem.
const traco = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function Chapeu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <path d="M4 34c6 5 18 8 28 8s22-3 28-8c-3-2-6-3-9-4" />
      <path d="M14 30c0-10 4-20 18-20s18 10 18 20" />
      <path d="M15 27c10 3 24 3 34 0" />
      <path d="M22 14c3 2 17 2 20 0" />
    </svg>
  );
}

export function XicaraLatte({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <ellipse cx="30" cy="38" rx="24" ry="8" />
      <path d="M12 26v6c0 7 8 12 18 12s18-5 18-12v-6" />
      <ellipse cx="30" cy="26" rx="18" ry="5" />
      <path d="M48 28c8-2 11 6 4 10-2 1-4 2-6 2" />
      <path d="M30 24c-2-1-3 0-3 1s2 2 3 1c1 1 3 0 3-1s-1-2-3-1z" />
      <path d="M24 12c-2-3 2-4 0-7M31 12c-2-3 2-4 0-7M38 12c-2-3 2-4 0-7" />
    </svg>
  );
}

export function Graos({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 48" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <g transform="rotate(-30 20 26)">
        <ellipse cx="20" cy="26" rx="12" ry="18" />
        <path d="M20 8c-6 7 6 11 0 18s6 11 0 18" />
      </g>
      <g transform="rotate(35 40 20)">
        <ellipse cx="40" cy="20" rx="9" ry="14" />
        <path d="M40 6c-5 6 5 9 0 14s5 9 0 14" />
      </g>
    </svg>
  );
}

type P = { className?: string };

export function Croissant({ className }: P) {
  return (
    <svg viewBox="0 0 64 40" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <path d="M6 28c-3-8 4-18 14-20 4-1 8-1 12-1s8 0 12 1c10 2 17 12 14 20-3-3-7-3-10-1-3-3-7-3-10-1-3-2-7-2-10 0-3-2-7-2-10 1-3-2-7-2-10 1z" />
      <path d="M22 8c-2 6-2 12 0 19M32 7c-1 7-1 13 0 20M42 8c2 6 2 12 0 19" />
    </svg>
  );
}

export function Waffle({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <circle cx="24" cy="24" r="19" />
      <path d="M12 12l24 24M20 8l20 20M8 20l20 20M36 12L12 36M40 20L20 40M28 8L8 28" />
    </svg>
  );
}

export function Copo({ className }: P) {
  return (
    <svg viewBox="0 0 48 64" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <path d="M8 14h32l-4 44H12L8 14z" />
      <path d="M10 26h28" />
      <path d="M28 14l6-10" />
      <rect x="15" y="32" width="8" height="8" rx="1.5" />
      <rect x="25" y="40" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function Caneca({ className }: P) {
  return (
    <svg viewBox="0 0 56 56" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <path d="M8 18h32v18c0 8-6 14-16 14S8 44 8 36V18z" />
      <path d="M40 22h4c6 0 6 12 0 12h-4" />
      <path d="M16 10c-2-3 2-3 0-6M24 10c-2-3 2-3 0-6M32 10c-2-3 2-3 0-6" />
    </svg>
  );
}

export function Sanduiche({ className }: P) {
  return (
    <svg viewBox="0 0 64 56" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <path d="M15 14C8 14 6 24 11 28v20c0 3 2 5 5 5h32c3 0 5-2 5-5V28c5-4 3-14-4-14-3-4-9-5-17-5s-14 1-17 5z" />
      <path d="M17 28c-2 0-3 1-3 3v15c0 2 1 3 3 3h30c2 0 3-1 3-3V31c0-2-1-3-3-3z" />
      <path d="M21 36h22M21 42h14" />
    </svg>
  );
}

export function Prato({ className }: P) {
  return (
    <svg viewBox="0 0 64 48" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <ellipse cx="32" cy="28" rx="28" ry="14" />
      <ellipse cx="32" cy="28" rx="18" ry="8" />
      <path d="M22 24c2-5 8-6 11-2 3-3 9-1 9 3" />
    </svg>
  );
}

export function Ambiente({ className }: P) {
  return (
    <svg viewBox="0 0 96 64" className={`ilu ${className ?? ""}`} aria-hidden="true" {...traco}>
      <path d="M48 2v12" />
      <path d="M38 26c0-8 4-12 10-12s10 4 10 12z" />
      <path d="M30 44h36" />
      <path d="M48 44v16M40 60h16" />
      <path d="M14 40v20M14 40h10M14 40c0-8 2-14 4-16M82 40v20M82 40H72M82 40c0-8-2-14-4-16" />
    </svg>
  );
}
