import { Link } from "react-router";
import { cn } from "../../lib/cn";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <Link
      to="/"
      aria-label="MKDIR-DESIGN Startseite"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span className="brand-mark grid size-11 place-items-center font-serif text-2xl font-bold text-black">
        M
      </span>
      {!compact && (
        <span className="brand-wordmark font-serif text-sm font-semibold tracking-[0.16em]">
          MKDIR-DESIGN
        </span>
      )}
    </Link>
  );
}
