import { ArrowRight, Boxes, Check, Cpu, Globe2, PackageCheck, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { HeroCardVisual } from "../../components/marketing/HeroCardVisual";
import { products } from "../../features/products/data/products";

const advantages = [
  [Palette, "Doppel-Konfigurator", "Gestalte das NFC-Produkt und deine digitale Profilseite gleichzeitig live."],
  [Cpu, "Dauerhaft änderbar", "Auf dem Chip liegt nur dein sicherer Profil-Link. Inhalte bleiben flexibel."],
  [PackageCheck, "Geprüfte Fertigung", "Produktion, Codierung, Qualitätskontrolle, Verpackung und Tracking aus einem Ablauf."],
  [ShieldCheck, "Service aus Deutschland", "Ein persönlicher Ansprechpartner vor und nach dem Kauf."],
];

const steps = [
  ["01", "Produkt wählen", "Karte, Tag oder Armband passend zu deinem Einsatz."],
  ["02", "Live gestalten", "Design und digitale VCard direkt nebeneinander konfigurieren."],
  ["03", "Freigeben & bezahlen", "Du siehst Preis, Druckansicht und Lieferumfang vor der Bestellung."],
  ["04", "Produktion & Versand", "Fertigung, Funktionstest, Verpackung und Sendungsverfolgung."],
];

export function HomePage() {
  return (
    <main>
      <section className="mkdir-clean-hero relative overflow-hidden border-b border-white/8">
        <div className="neon-orb neon-orb-blue left-[38%] top-[20%]" />
        <div className="neon-orb neon-orb-red right-[-5%] bottom-[-10%]" />
        <div className="relative mx-auto grid min-h-[700px] w-full max-w-[1440px] items-center gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-mkdir-neon-blue">NFC Produkte · digitale VCard · Business Plattform</p>
            <h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl xl:text-7xl">Deine Identität.<br /><span className="font-serif font-medium text-mkdir-gold-light">Ein Tap entfernt.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">Individuelle NFC-Karten, Tags und Armbänder verbinden dein hochwertiges Produkt mit einer digitalen VCard, die du jederzeit ändern kannst.</p>
            <div className="mt-8 grid max-w-xl gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              {["Kein App-Zwang", "NFC + optionaler QR-Fallback", "Persönlicher Designcheck", "Profil später selbst bearbeiten"].map((item) => <div key={item} className="flex items-center gap-2"><Check className="size-4 text-mkdir-gold" />{item}</div>)}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/konfigurator" className="inline-flex min-h-12 items-center gap-3 bg-gradient-to-r from-mkdir-gold-dark via-mkdir-gold to-mkdir-gold-light px-6 text-sm font-black text-black">Jetzt live gestalten <ArrowRight className="size-4" /></Link>
              <Link to="/produkte" className="inline-flex min-h-12 items-center border border-white/15 bg-white/[0.02] px-6 text-sm font-bold text-zinc-200">Produkte vergleichen</Link>
            </div>
            <p className="mt-5 text-sm text-zinc-600">Keine App nötig · Browserprofil · sicherer Checkout in Vorbereitung</p>
          </div>
          <HeroCardVisual />
        </div>
      </section>

      <section className="border-b border-white/8 bg-white/[0.015]">
        <div className="mx-auto grid w-full max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(([Icon, title, text]) => {
            const IconComponent = Icon as typeof Palette;
            return <article key={title as string} className="flex gap-4 border-b border-white/8 px-5 py-7 sm:border-r lg:border-b-0 lg:px-8"><IconComponent className="mt-1 size-5 shrink-0 text-mkdir-gold" /><div><h2 className="text-base font-bold text-white">{title as string}</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{text as string}</p></div></article>;
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 py-24 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-white/8 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">Die MKDIR Produktwelt</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Wenige Produkte.<br /><span className="font-serif text-mkdir-gold-light">Perfekt umgesetzt.</span></h2></div>
          <Link to="/produkte" className="text-sm font-bold text-mkdir-gold">Alle Produkte vergleichen →</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {products.filter((product) => product.category !== "digital").slice(0, 4).map((product) => (
            <Link key={product.id} to={`/produkte/${product.slug}`} className="group relative min-h-80 overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition hover:-translate-y-1 hover:border-mkdir-gold/40">
              {product.featured && <span className="absolute right-4 top-4 bg-mkdir-gold px-3 py-1 text-xs font-black text-black">EMPFOHLEN</span>}
              <div className="mb-8 grid h-24 place-items-center"><div className="mini-product-card"><span>M</span><small>NFC</small></div></div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-mkdir-neon-blue">{product.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-base leading-7 text-zinc-500">{product.description}</p>
              <strong className="mt-7 block font-serif text-3xl text-mkdir-gold-light">{product.priceLabel}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#07090d]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">Vom Entwurf bis zu dir</p><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em]">So einfach entsteht<br /><span className="font-serif text-mkdir-gold-light">dein MKDIR Produkt.</span></h2><p className="mt-6 text-base leading-8 text-zinc-500">Der komplette Weg bleibt nachvollziehbar – inklusive Designfreigabe, Funktionstest und Versandstatus.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{steps.map(([number, title, text]) => <article key={number} className="border border-white/10 bg-white/[0.02] p-6"><span className="font-serif text-3xl text-mkdir-gold">{number}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-base leading-7 text-zinc-500">{text}</p></article>)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-24 lg:grid-cols-3 lg:px-8">
        <article className="border border-mkdir-gold/20 bg-mkdir-gold/[0.04] p-7"><Globe2 className="size-7 text-mkdir-gold" /><h2 className="mt-6 text-2xl font-bold">Digitale VCard</h2><p className="mt-4 text-base leading-7 text-zinc-500">Kontaktdaten, Links, Leistungen, Terminbuchung und Medien – sofort im Browser.</p></article>
        <article className="border border-mkdir-neon-blue/20 bg-mkdir-neon-blue/[0.03] p-7"><Boxes className="size-7 text-mkdir-neon-blue" /><h2 className="mt-6 text-2xl font-bold">Webseite passend zum Profil</h2><p className="mt-4 text-base leading-7 text-zinc-500">Später wird aus deiner VCard auf Wunsch eine vollständige Markenwebsite ohne doppelte Datenpflege.</p></article>
        <article className="border border-white/10 bg-white/[0.02] p-7"><Sparkles className="size-7 text-mkdir-gold" /><h2 className="mt-6 text-2xl font-bold">Zeiterfassung als Ausbau</h2><p className="mt-4 text-base leading-7 text-zinc-500">NFC-Produkte, Teams und digitale Identitäten bilden später die Basis für MKDIR Worktime.</p></article>
      </section>

      <section className="border-t border-white/8 bg-gradient-to-r from-mkdir-gold-dark/10 via-transparent to-mkdir-neon-blue/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-5 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-gold">Dein erster Entwurf kostet noch nichts</p><h2 className="mt-3 text-3xl font-bold">Starte direkt im MKDIR-Konfigurator.</h2></div><Link to="/konfigurator" className="inline-flex min-h-12 items-center justify-center gap-3 bg-mkdir-gold px-7 text-sm font-black text-black">Produkt gestalten <ArrowRight className="size-4" /></Link></div>
      </section>
    </main>
  );
}
