import { Check, CreditCard, LockKeyhole, PackageCheck, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { useCommerce } from "../../features/commerce/CommerceContext";

export function CheckoutPage() {
  const { design, clearDesign } = useCommerce();

  if (!design) return <main className="mx-auto grid min-h-[65vh] max-w-[900px] place-items-center px-5 py-20 text-center"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">Warenkorb</p><h1 className="mt-4 text-4xl font-bold">Noch kein Produkt konfiguriert.</h1><p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-500">Starte im Konfigurator. Dein Entwurf bleibt auf diesem Gerät gespeichert, bis du ihn entfernst.</p><Link to="/konfigurator" className="mt-8 inline-flex min-h-12 items-center bg-mkdir-gold px-7 text-sm font-black text-black">Jetzt Produkt gestalten</Link></div></main>;

  return <main className="mx-auto min-h-[70vh] w-full max-w-[1300px] px-5 py-16 lg:px-8">
    <div className="border-b border-white/8 pb-8"><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">Sicherer Checkout</p><h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">Bestellung prüfen</h1></div>
    <div className="mt-9 grid gap-7 lg:grid-cols-[1fr_0.72fr]">
      <section className="space-y-6">
        <div className="border border-white/10 bg-white/[0.02] p-6"><h2 className="text-xl font-bold">Kontaktdaten und Lieferadresse</h2><div className="mt-6 grid gap-4 sm:grid-cols-2"><Input label="Vorname" /><Input label="Nachname" /><Input label="E-Mail" type="email" /><Input label="Telefon" /><Input label="Straße und Hausnummer" wide /><Input label="PLZ" /><Input label="Ort" /><Input label="Land" value="Deutschland" /></div></div>
        <div className="border border-white/10 bg-white/[0.02] p-6"><h2 className="text-xl font-bold">Zahlungsart</h2><div className="mt-5 grid gap-3 sm:grid-cols-2"><PaymentOption icon={<CreditCard className="size-5" />} title="Karte" text="Visa, Mastercard" /><PaymentOption icon={<span className="font-black text-[#0070ba]">Pay</span>} title="PayPal" text="PayPal Checkout" /></div><p className="mt-5 flex gap-2 text-sm leading-6 text-zinc-500"><LockKeyhole className="mt-0.5 size-4 shrink-0" />Die echte Zahlungsübertragung wird aktiviert, sobald die MKDIR-Händlerkonten und rechtlichen Checkout-Texte freigegeben sind. Dieser Stand führt noch keine Abbuchung aus.</p></div>
      </section>
      <aside className="self-start border border-mkdir-gold/20 bg-mkdir-gold/[0.04] p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-mkdir-neon-blue">Dein Entwurf</p><h2 className="mt-2 text-2xl font-bold">{design.productName}</h2></div><button type="button" onClick={clearDesign} className="text-zinc-600 hover:text-red-400" aria-label="Produkt entfernen"><Trash2 className="size-5" /></button></div>
        <div className="mt-6 config-card relative aspect-[1.586/1] overflow-hidden rounded-xl border p-5" style={{ borderColor: design.accent }}><div className="hex-card-pattern absolute inset-0" /><span className="relative font-serif text-5xl" style={{ color: design.accent }}>M</span><div className="absolute bottom-5 left-5"><strong>{design.name}</strong><p className="text-sm text-zinc-500">{design.company}</p></div></div>
        <div className="mt-6 space-y-3 text-sm">{[["Material", design.material], ["Veredelung", design.finish], ["Menge", `${design.quantity} Stück`], ["VCard", "Basisprofil inklusive"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-white/8 pb-3"><span className="text-zinc-500">{label}</span><strong className="text-right">{value}</strong></div>)}</div>
        <div className="mt-6 flex items-end justify-between"><span className="text-sm text-zinc-500">Zwischensumme</span><strong className="font-serif text-4xl text-mkdir-gold-light">{design.price} €</strong></div><p className="mt-2 text-right text-xs text-zinc-600">Versand wird nach Lieferland berechnet</p>
        <button type="button" disabled className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 bg-mkdir-gold px-5 text-sm font-black text-black opacity-50"><LockKeyhole className="size-4" />Zahlung folgt nach Freigabe</button>
        <div className="mt-5 flex gap-3 border-t border-white/8 pt-5 text-sm leading-6 text-zinc-500"><PackageCheck className="mt-1 size-5 shrink-0 text-mkdir-gold" /><span><strong className="block text-zinc-300">Noch keine Produktion ohne Freigabe</strong>Du erhältst vor Fertigungsbeginn die finale Ansicht zur Bestätigung.</span></div>
      </aside>
    </div>
  </main>;
}

function Input({ label, type = "text", value, wide = false }: { label: string; type?: string; value?: string; wide?: boolean }) { return <label className={`grid gap-2 text-sm font-bold text-zinc-300 ${wide ? "sm:col-span-2" : ""}`}>{label}<input type={type} defaultValue={value} className="min-h-12 border border-white/10 bg-[#090b0f] px-4 text-base font-normal text-white outline-none focus:border-mkdir-gold" /></label>; }
function PaymentOption({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <button type="button" className="flex items-center gap-4 border border-white/10 bg-[#090b0f] p-4 text-left hover:border-mkdir-gold/40">{icon}<span><strong className="block text-sm">{title}</strong><span className="text-xs text-zinc-500">{text}</span></span><Check className="ml-auto size-4 text-zinc-700" /></button>; }
