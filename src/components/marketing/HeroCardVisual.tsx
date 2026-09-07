import { motion } from "motion/react";

export function HeroCardVisual() {
  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(22,207,255,0.12),transparent_45%)]" />

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-5, -3, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="card-surface absolute left-[6%] top-14 aspect-[1.586/1] w-[64%] overflow-hidden rounded-xl border border-mkdir-gold/40 p-6 shadow-2xl"
      >
<span className="relative z-10 font-serif text-7xl text-mkdir-gold-light">
          M
        </span>
        <div className="absolute bottom-6 left-6 z-10">
          <p className="font-serif text-sm tracking-[0.16em] text-mkdir-gold">
            MKDIR-DESIGN
          </p>
          <p className="mt-1 text-[8px] tracking-[0.18em] text-zinc-600">
            PREMIUM NFC IDENTITY
          </p>
        </div>
        <span className="absolute right-5 top-5 z-10 text-lg text-mkdir-gold">
          )))
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0], rotate: [4, 2, 4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-[5%] h-[78%] w-[29%] rounded-[2.2rem] border border-mkdir-gold/50 bg-[#07090d] p-3 shadow-2xl"
      >
        <div className="mx-auto mt-1 h-4 w-14 rounded-full bg-black" />
        <div className="mt-8 text-center">
          <span className="font-serif text-5xl text-mkdir-gold-light">M</span>
          <p className="mt-2 text-[7px] tracking-[0.16em] text-mkdir-gold">
            MKDIR DIGITAL VCARD
          </p>
          <p className="mt-5 text-xs font-semibold text-white">Max Mustermann</p>
          <p className="mt-1 text-[7px] text-zinc-500">Unternehmen · Position</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-1.5">
          {["Call", "WA", "Mail", "Save"].map((item) => (
            <div
              key={item}
              className="grid h-11 place-items-center border border-mkdir-neon-blue/15 bg-white/[0.02] text-[7px] text-mkdir-gold"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
