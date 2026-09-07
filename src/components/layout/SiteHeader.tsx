import { Menu, ShoppingBag, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router";
import { BrandLogo } from "../branding/BrandLogo";
import { cn } from "../../lib/cn";

const navigation = [
  { label: "NFC Karten", to: "/produkte" },
  { label: "Konfigurator", to: "/konfigurator" },
  { label: "Aktionen", to: "/aktionen" },
  { label: "Exclusive", to: "/exclusive" },
  { label: "Zubehör", to: "/zubehoer" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-mkdir-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center gap-8 px-5 lg:px-8">
        <BrandLogo />

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-400 transition hover:text-mkdir-gold",
                  isActive && "text-mkdir-gold",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <Link
            to="/login"
            className="hidden h-10 items-center gap-2 border border-white/10 px-3 text-xs text-zinc-300 transition hover:border-mkdir-gold/40 hover:text-mkdir-gold sm:flex"
          >
            <UserRound className="size-4" />
            Login
          </Link>

          <Link
            to="/checkout"
            className="relative grid size-10 place-items-center border border-white/10 text-zinc-300 transition hover:border-mkdir-neon-blue/40 hover:text-mkdir-neon-blue"
            aria-label="Warenkorb"
          >
            <ShoppingBag className="size-4" />
            <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-mkdir-gold text-[8px] font-bold text-black">
              0
            </span>
          </Link>

          <button
            type="button"
            className="grid size-10 place-items-center border border-white/10 text-zinc-300 lg:hidden"
            aria-label="Menü öffnen"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
