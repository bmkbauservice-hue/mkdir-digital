import { Check, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router";
import { products } from "../../features/products/data/products";

export function ProductsPage() {
  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-[1440px] px-5 py-16 lg:px-8">
      <div className="grid gap-8 border-b border-white/8 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">NFC Produktwelt</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.04em]">Ein Profil.<br /><span className="font-serif text-mkdir-gold-light">Mehrere Berührungspunkte.</span></h1></div>
        <p className="text-base leading-8 text-zinc-500">Alle MKDIR-Produkte öffnen dieselbe dauerhaft änderbare Profilseite. Du entscheidest nur, wie deine Kunden, Gäste oder Mitarbeitenden sie erreichen.</p>
      </div>
      <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <article key={product.id} className="flex min-h-[420px] flex-col border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7">
          <div className="flex items-start justify-between gap-4"><p className="text-xs font-bold uppercase tracking-[0.12em] text-mkdir-neon-blue">{product.eyebrow}</p>{product.featured && <span className="bg-mkdir-gold px-2 py-1 text-xs font-black text-black">EMPFOHLEN</span>}</div>
          <div className="my-8 grid h-24 place-items-center"><div className="mini-product-card"><span>M</span><small>NFC</small></div></div>
          <h2 className="text-2xl font-bold">{product.name}</h2><p className="mt-3 text-base leading-7 text-zinc-500">{product.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-zinc-400"><li className="flex gap-2"><Check className="size-4 text-mkdir-gold" />Digitales Basisprofil inklusive</li><li className="flex gap-2"><Check className="size-4 text-mkdir-gold" />Persönlicher Designcheck</li><li className="flex gap-2"><Check className="size-4 text-mkdir-gold" />NFC-Funktionstest</li></ul>
          <div className="mt-auto flex items-end justify-between gap-4 pt-8"><strong className="font-serif text-3xl text-mkdir-gold-light">{product.priceLabel}</strong><Link to={product.configurable ? `/konfigurator?produkt=${product.slug}` : `/produkte/${product.slug}`} className="inline-flex min-h-11 items-center gap-2 bg-mkdir-gold px-4 text-sm font-bold text-black"><SlidersHorizontal className="size-4" />{product.configurable ? "Gestalten" : "Ansehen"}</Link></div>
        </article>)}
      </div>
      <div className="mt-10 border border-mkdir-neon-blue/20 bg-mkdir-neon-blue/[0.03] p-6 text-base leading-7 text-zinc-400"><strong className="text-white">Für Unternehmen:</strong> Team-Sets, einheitliche Vorlagen, mehrere Mitarbeitende und Mengenstaffeln werden individuell kalkuliert. Die technische Grundlage ist bereits im MKDIR-System vorgesehen.</div>
    </main>
  );
}
