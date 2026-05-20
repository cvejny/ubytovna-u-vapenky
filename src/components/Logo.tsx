interface LogoMarkProps {
  size?: number;
  className?: string;
}

export const LogoMark = ({ size = 40, className = "" }: LogoMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer circle badge */}
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.4" />

    {/* Main kiln tower (vápenka) — tall tapered shaft */}
    <path
      d="M20 28 L21.5 12 Q24 10 26.5 12 L28 28 Z"
      fill="currentColor"
    />
    {/* Round opening at top of kiln */}
    <circle cx="24" cy="11" r="3.2" fill="currentColor" />

    {/* Kiln arch at base (characteristic circular opening) */}
    <path
      d="M20 28 Q20 33 24 33 Q28 33 28 28 Z"
      fill="currentColor"
    />
    {/* Arch cutout — light to show the opening */}
    <path
      d="M21.5 28 Q21.5 31.5 24 31.5 Q26.5 31.5 26.5 28 Z"
      fill="hsl(35, 30%, 97%)"
    />

    {/* Rolling hills / landscape (Barrandovské skály) */}
    <path
      d="M5 38 Q10 33 16 37 Q20 34 24 36 Q28 34 32 37 Q38 33 43 38"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      fill="none"
      opacity="0.55"
    />
  </svg>
);

interface LogoProps {
  size?: number;
  className?: string;
  /** light = white text/icon (on dark backgrounds), dark = foreground color */
  variant?: "light" | "dark";
}

export const Logo = ({ size = 40, className = "", variant = "dark" }: LogoProps) => {
  const color = variant === "light" ? "text-background" : "text-foreground";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} className={color} />
      <div>
        <p className={`font-display font-bold leading-tight ${color} ${size >= 36 ? "text-xl" : "text-base"}`}>
          U Vápenky
        </p>
        <p className={`text-xs font-body leading-tight ${variant === "light" ? "text-background/65" : "text-muted-foreground"}`}>
          Ubytovna Praha
        </p>
      </div>
    </div>
  );
};
