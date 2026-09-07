import { motion } from "motion/react";

export function HeroCardVisual() {
  return (
    <div className="relative mx-auto min-h-[470px] w-full max-w-2xl" aria-label="MKDIR NFC-Karte mit digitaler VCard">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_48%,rgba(24,214,255,0.15),transparent_42%)]" />
      <motion.div animate={{ y: [0, -8, 0], rotate: [-4, -2.5, -4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="card-surface absolute left-[2%] top-16 aspect-[1.586/1] w-[70%] overflow-hidden rounded-xl border border-mkdir-gold/45 shadow-2xl">
        <div className="hex-card-pattern absolute inset-0" />
        <div className="absolute inset-x-7 top-7 h-px bg-gradient-to-r from-transparent via-mkdir-neon-blue/80 to-transparent" />
        <span className="relative z-10 grid h-full place-items-center font-serif text-7xl text-mkdir-gold-light">M</span>
        <div className="absolute bottom-7 left-7 z-10"><p className="font-serif text-base tracking-[0.16em] text-mkdir-gold">MKDIR DESIGN</p><p className="mt-1 text-xs tracking-[0.12em] text-zinc-500">PREMIUM NFC IDENTITY</p></div>
        <span className="absolute right-6 top-5 z-10 text-xl text-mkdir-gold">)))</span>
      </motion.div>
      <motion.div animate={{ y: [0, 6, 0], rotate: [4, 2, 4] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-0 right-[3%] h-[82%] w-[31%] min-w-[150px] rounded-[2.2rem] border border-mkdir-gold/50 bg-[#07090d] p-3 shadow-2xl">
        <div className="mx-auto mt-1 h-4 w-14 rounded-full bg-black" />
        <div className="mt-8 text-center"><span className="font-serif text-5xl text-mkdir-gold-light">M</span><p className="mt-2 text-xs tracking-[0.12em] text-mkdir-gold">DIGITAL VCARD</p><p className="mt-6 text-sm font-semibold text-white">Max Mustermann</p><p className="mt-1 text-xs text-zinc-500">Unternehmen · Position</p></div>
        <div className="mt-6 grid grid-cols-2 gap-2">{["Anruf", "WhatsApp", "E-Mail", "Speichern"].map((item) => <div key={item} className="grid h-12 place-items-center border border-mkdir-neon-blue/15 bg-white/[0.02] px-1 text-center text-xs text-mkdir-gold">{item}</div>)}</div>
      </motion.div>
    </div>
  );
}
