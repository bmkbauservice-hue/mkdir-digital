import { ArrowLeft, Check } from "lucide-react";
import { Link, useParams } from "react-router";
import { products } from "../../features/products/data/products";

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <main className="mx-auto min-h-[60vh] max-w-[1440px] px-5 py-20"><h1 className="text-4xl font-bold">Produkt nicht gefunden</h1><Link to="/produkte" className="mt-6 inline-block text-mkdir-gold">Zur Produktübersicht</Link></main>;

  return <main className="mx-auto min-h-[70vh] w-full max-w-[1440px] px-5 py-16 lg:px-8">
    <Link to="/produkte" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-mkdir-gold"><ArrowLeft className="size-4" />Alle Produkte</Link>
    <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
      <div className="relative grid min-h-[460px] place-items-center overflow-hidden border border-white/10 bg-[#07090d]"><div className="neon-orb neon-orb-blue" /><div className="config-card relative aspect-[1.586/1] w-[76%] max-w-xl rotate-[-4deg] overflow-hidden rounded-xl border border-mkdir-gold/50 p-8 shadow-2xl"><div className="hex-card-pattern absolute inset-0" /><span className="relative font-serif text-8xl text-mkdir-gold-light">M</span><div className="absolute bottom-8 left-8"><strong className="text-xl">MKDIR DESIGN</strong><p className="mt-2 text-sm text-zinc-500">PREMIUM NFC IDENTITY</p></div><span className="absolute right-7 top-6 text-2xl text-mkdir-gold">)))</span></div></div>
      <div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">{product.eyebrow}</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.04em]">{product.name}</h1><p className="mt-6 text-lg leading-8 text-zinc-400">{product.description}</p><strong className="mt-8 block font-serif text-4xl text-mkdir-gold-light">{product.priceLabel}</strong>
        <ul className="mt-8 grid gap-3 text-base text-zinc-300">{["Individuelle Gestaltung", "Dauerhaft änderbare digitale VCard", "NFC-Programmierung und Funktionstest", "Designfreigabe vor Produktion", "Tracking nach Versand"].map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-mkdir-gold" />{item}</li>)}</ul>
        <div className="mt-10 flex flex-wrap gap-3">{product.configurable ? <Link to={`/konfigurator?produkt=${product.slug}`} className="inline-flex min-h-12 items-center bg-mkdir-gold px-7 text-sm font-black text-black">Jetzt konfigurieren</Link> : <a href="mailto:IT-mkdir@proton.me?subject=Anfrage%20MKDIR%20Exclusive" className="inline-flex min-h-12 items-center bg-mkdir-gold px-7 text-sm font-black text-black">Persönlich anfragen</a>}<a href="tel:+4915121679480" className="inline-flex min-h-12 items-center border border-white/15 px-7 text-sm font-bold">Beratung anrufen</a></div>
      </div>
    </div>
  </main>;
}
