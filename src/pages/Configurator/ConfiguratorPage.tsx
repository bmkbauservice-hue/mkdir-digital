import { Check, ChevronRight, CreditCard, Eye, Palette, UserRound } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../../components/ui/Button";
import { useCommerce } from "../../features/commerce/CommerceContext";

const productOptions = [
  { id: "metal", name: "MKDIR Metal", base: 79 },
  { id: "signature", name: "MKDIR Signature", base: 129 },
  { id: "nfc-tag", name: "MKDIR NFC Tag", base: 19 },
  { id: "keytag", name: "MKDIR KeyTag", base: 29 },
  { id: "nfc-armband", name: "MKDIR Band", base: 39 },
];

const accents = ["#d6aa4d", "#18d6ff", "#e33a48", "#8a4dff"];

export function ConfiguratorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setDesign } = useCommerce();
  const [step, setStep] = useState(1);
  const requestedProduct = searchParams.get("produkt");
  const [productId, setProductId] = useState(productOptions.some((item) => item.id === requestedProduct) ? requestedProduct! : "signature");
  const [material, setMaterial] = useState("Schwarz eloxiertes Metall");
  const [finish, setFinish] = useState("Goldprägung");
  const [quantity, setQuantity] = useState(1);
  const [accent, setAccent] = useState(accents[0]);
  const [profile, setProfile] = useState({ name: "Max Mustermann", role: "Geschäftsführer", company: "Muster GmbH", email: "max@beispiel.de", phone: "+49 151 12345678", website: "www.beispiel.de" });

  const product = productOptions.find((item) => item.id === productId) ?? productOptions[1];
  const price = useMemo(() => {
    const finishPrice = finish === "Lasergravur" ? 15 : finish === "Goldprägung" ? 25 : 0;
    const quantityDiscount = quantity >= 25 ? 0.78 : quantity >= 10 ? 0.86 : quantity >= 5 ? 0.92 : 1;
    return Math.round((product.base + finishPrice) * quantity * quantityDiscount);
  }, [finish, product.base, quantity]);

  const updateProfile = (key: keyof typeof profile, value: string) => setProfile((current) => ({ ...current, [key]: value }));
  const addToCart = () => {
    setDesign({ productId, productName: product.name, material, finish, quantity, accent, price, ...profile });
    navigate("/checkout");
  };

  return (
    <main className="mx-auto w-full max-w-[1500px] px-5 py-12 lg:px-8 lg:py-16">
      <div className="mb-10 flex flex-col gap-5 border-b border-white/8 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-sm font-bold uppercase tracking-[0.14em] text-mkdir-neon-blue">Doppel-Konfigurator</p><h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Produkt und VCard.<br /><span className="font-serif text-mkdir-gold-light">Ein Entwurf.</span></h1></div>
        <div className="flex gap-2">{[[1, Palette, "Produkt"], [2, UserRound, "Profil"], [3, Eye, "Prüfen"]].map(([number, Icon, label]) => { const StepIcon = Icon as typeof Palette; return <button type="button" key={label as string} onClick={() => setStep(number as number)} className={`flex min-h-11 items-center gap-2 border px-4 text-sm ${step === number ? "border-mkdir-gold bg-mkdir-gold/10 text-mkdir-gold" : "border-white/10 text-zinc-500"}`}><StepIcon className="size-4" />{label as string}</button>; })}</div>
      </div>

      <div className="grid gap-7 xl:grid-cols-[0.82fr_1.18fr]">
        <section className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          {step === 1 && <div className="space-y-7">
            <FieldGroup label="1. Produkt"><div className="grid gap-2 sm:grid-cols-2">{productOptions.map((item) => <button type="button" key={item.id} onClick={() => setProductId(item.id)} className={`border p-4 text-left ${productId === item.id ? "border-mkdir-gold bg-mkdir-gold/10" : "border-white/10"}`}><strong className="block text-base">{item.name}</strong><span className="mt-1 block text-sm text-zinc-500">ab {item.base} €</span></button>)}</div></FieldGroup>
            <FieldGroup label="2. Material"><Select value={material} onChange={setMaterial} options={["Schwarz eloxiertes Metall", "Gebürstetes Edelstahl", "Premium PVC", "Silikon"]} /></FieldGroup>
            <FieldGroup label="3. Veredelung"><Select value={finish} onChange={setFinish} options={["Matt ohne Aufpreis", "Lasergravur", "Goldprägung"]} /></FieldGroup>
            <FieldGroup label="4. Menge"><div className="flex flex-wrap gap-2">{[1, 5, 10, 25, 50, 100].map((amount) => <button type="button" key={amount} onClick={() => setQuantity(amount)} className={`size-12 border text-sm font-bold ${quantity === amount ? "border-mkdir-gold bg-mkdir-gold text-black" : "border-white/10"}`}>{amount}</button>)}</div></FieldGroup>
          </div>}

          {step === 2 && <div className="grid gap-5 sm:grid-cols-2">
            <Input label="Name" value={profile.name} onChange={(value) => updateProfile("name", value)} />
            <Input label="Position" value={profile.role} onChange={(value) => updateProfile("role", value)} />
            <Input label="Unternehmen" value={profile.company} onChange={(value) => updateProfile("company", value)} />
            <Input label="E-Mail" type="email" value={profile.email} onChange={(value) => updateProfile("email", value)} />
            <Input label="Telefon" value={profile.phone} onChange={(value) => updateProfile("phone", value)} />
            <Input label="Webseite" value={profile.website} onChange={(value) => updateProfile("website", value)} />
            <FieldGroup label="Akzentfarbe"><div className="flex gap-3">{accents.map((color) => <button type="button" key={color} onClick={() => setAccent(color)} className={`size-11 rounded-full border-2 ${accent === color ? "border-white" : "border-transparent"}`} style={{ backgroundColor: color }} aria-label={`Akzentfarbe ${color}`} />)}</div></FieldGroup>
          </div>}

          {step === 3 && <div>
            <h2 className="text-2xl font-bold">Dein Entwurf ist bereit</h2>
            <div className="mt-7 space-y-3 text-sm">{[["Produkt", product.name], ["Material", material], ["Veredelung", finish], ["Menge", `${quantity} Stück`], ["Digitales Profil", "inklusive Basisprofil"]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-white/8 pb-3"><span className="text-zinc-500">{label}</span><strong className="text-right">{value}</strong></div>)}</div>
            <div className="mt-7 border border-mkdir-neon-blue/20 bg-mkdir-neon-blue/[0.04] p-4 text-sm leading-6 text-zinc-400"><Check className="mr-2 inline size-4 text-mkdir-neon-blue" />Vor der Fertigung erhältst du eine persönliche Designprüfung und eine verbindliche Freigabeansicht.</div>
          </div>}

          <div className="mt-9 flex items-center justify-between border-t border-white/8 pt-6">
            <button type="button" onClick={() => setStep((value) => Math.max(1, value - 1))} disabled={step === 1} className="text-sm text-zinc-500 disabled:opacity-30">Zurück</button>
            {step < 3 ? <Button onClick={() => setStep((value) => Math.min(3, value + 1))}>Weiter <ChevronRight className="size-4" /></Button> : <Button onClick={addToCart}><CreditCard className="size-4" />In den Warenkorb</Button>}
          </div>
        </section>

        <aside className="sticky top-28 self-start border border-white/10 bg-[#07090d] p-5 sm:p-8">
          <div className="flex items-center justify-between"><p className="text-sm font-bold uppercase tracking-[0.12em] text-mkdir-neon-blue">Live-Vorschau</p><span className="text-sm text-zinc-500">Vorderseite + Profil</span></div>
          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <div className="config-card relative mx-auto aspect-[1.586/1] w-full max-w-md overflow-hidden rounded-xl border p-6" style={{ borderColor: accent }}><div className="hex-card-pattern absolute inset-0" /><span className="relative font-serif text-6xl" style={{ color: accent }}>M</span><div className="absolute bottom-6 left-6"><strong className="block text-lg">{profile.name || "Dein Name"}</strong><span className="mt-1 block text-sm text-zinc-400">{profile.role || "Deine Position"}</span><span className="block text-sm text-zinc-500">{profile.company || "Dein Unternehmen"}</span></div><span className="absolute right-5 top-5 text-xl" style={{ color: accent }}>)))</span></div>
            <div className="mx-auto w-full max-w-[250px] rounded-[2rem] border border-white/15 bg-black p-4 shadow-2xl"><div className="mx-auto h-4 w-16 rounded-full bg-[#111]" /><div className="py-7 text-center"><span className="font-serif text-5xl" style={{ color: accent }}>M</span><h3 className="mt-5 text-lg font-bold">{profile.name || "Dein Name"}</h3><p className="text-sm text-zinc-500">{profile.company}</p><div className="mt-6 grid grid-cols-2 gap-2">{["Anrufen", "E-Mail", "Webseite", "Speichern"].map((item) => <span key={item} className="border border-white/10 py-3 text-xs" style={{ color: accent }}>{item}</span>)}</div></div></div>
          </div>
          <div className="mt-8 flex items-end justify-between border-t border-white/8 pt-6"><div><span className="block text-sm text-zinc-500">Aktueller Richtpreis</span><strong className="font-serif text-4xl text-mkdir-gold-light">{price} €</strong></div><span className="text-right text-xs leading-5 text-zinc-600">inkl. Design<br />zzgl. Versand</span></div>
        </aside>
      </div>
    </main>
  );
}

function FieldGroup({ label, children }: { label: string; children: ReactNode }) { return <div><h2 className="mb-3 text-sm font-bold text-zinc-300">{label}</h2>{children}</div>; }
function Select({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) { return <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 w-full border border-white/10 bg-[#090b0f] px-4 text-base text-white">{options.map((option) => <option key={option}>{option}</option>)}</select>; }
function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="grid gap-2 text-sm font-bold text-zinc-300">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 border border-white/10 bg-[#090b0f] px-4 text-base font-normal text-white outline-none transition focus:border-mkdir-gold" /></label>; }
