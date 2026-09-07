import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import { BrandLogo } from "../branding/BrandLogo";
import { cn } from "../../lib/cn";
import { useCommerce } from "../../features/commerce/CommerceContext";

const navigation = [
  { label: "Produkte", to: "/produkte" },
  { label: "Konfigurator", to: "/konfigurator" },
  { label: "NFC Armbänder & Tags", to: "/zubehoer" },
  { label: "Exclusive", to: "/exclusive" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { design } = useCommerce();

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-mkdir-black/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center gap-8 px-5 lg:px-8">
        <BrandLogo />
        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cn("text-sm font-semibold text-zinc-400 transition hover:text-mkdir-gold", isActive && "text-mkdir-gold")}>{item.label}</NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <Link to="/checkout" className="relative grid size-11 place-items-center border border-white/10 text-zinc-300 transition hover:border-mkdir-neon-blue/40 hover:text-mkdir-neon-blue" aria-label="Warenkorb">
            <ShoppingBag className="size-5" />
            {design && <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-mkdir-gold text-xs font-bold text-black">1</span>}
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="grid size-11 place-items-center border border-white/10 text-zinc-300 lg:hidden" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-white/8 bg-[#06080b] px-5 py-5 lg:hidden" aria-label="Mobile Navigation">
          <div className="mx-auto grid max-w-[1440px] gap-1">
            {navigation.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-white/8 py-3 text-base text-zinc-300">{item.label}</NavLink>)}
          </div>
        </nav>
      )}
    </header>
  );
}
