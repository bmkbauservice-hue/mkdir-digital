import { Link } from "react-router";
import { BrandLogo } from "../branding/BrandLogo";
import { siteConfig } from "../../app/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black/30">
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <BrandLogo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-500">
            Individuelle NFC-Karten, Tags und Armbänder – verbunden mit einer digitalen Identität, die mit dir wächst.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-mkdir-gold">
            Produkte
          </p>
          <div className="mt-4 grid gap-2 text-sm text-zinc-500">
            <Link to="/produkte">NFC Karten</Link>
            <Link to="/konfigurator">Konfigurator</Link>
            <Link to="/exclusive">Exclusive</Link>
            <Link to="/zubehoer">Zubehör</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-mkdir-gold">
            Kontakt
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 block text-sm text-zinc-300 hover:text-mkdir-gold"
          >
            {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phoneHref}`} className="mt-2 block text-sm text-zinc-300 hover:text-mkdir-gold">{siteConfig.phone}</a>
          <p className="mt-8 text-xs leading-5 text-zinc-600">Produktion, Qualitätsprüfung, Verpackung und Direktversand erfolgen je nach Produkt über geprüfte Fertigungspartner.</p>
        </div>
      </div>
      <div className="border-t border-white/8 px-5 py-5 text-center text-xs text-zinc-600">© 2026 MKDIR Design · Impressum und Datenschutz vor Verkaufsstart ergänzen</div>
    </footer>
  );
}
