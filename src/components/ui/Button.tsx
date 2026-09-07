import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "neon" | "ghost";
};

export function Button({
  variant = "gold",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-xs font-bold uppercase tracking-[0.08em] transition",
        variant === "gold" &&
          "bg-gradient-to-r from-mkdir-gold-dark via-mkdir-gold to-mkdir-gold-light text-black hover:brightness-110",
        variant === "neon" &&
          "border border-mkdir-neon-blue/50 bg-mkdir-neon-blue/5 text-mkdir-neon-blue hover:bg-mkdir-neon-blue/10",
        variant === "ghost" &&
          "border border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/20 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
