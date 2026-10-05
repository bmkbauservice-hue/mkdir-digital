import { useEffect, useRef, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { mailto } from "../content";

// Alles, was die Großansicht von einem Bild wissen muss – passt für Karten und Armbänder.
export type LightboxItem = {
  file: string;
  name: string;
  technique: string;
  width: number;
  height: number;
};

type Props = {
  items: LightboxItem[];
  folder: string; // Unterordner in public/, z. B. "designs" oder "bands"
  kind: string; // "Kartendesign" oder "Armband" – für Texte und Mail-Betreff
  index: number | null; // null = geschlossen
  onClose: () => void;
  onGo: (index: number) => void;
  // Optional eigener Button statt "Dieses Design anfragen" (z. B. "Mit diesem Motiv gestalten")
  action?: (item: LightboxItem) => { href: string; label: string };
};

const glowColors = ["var(--neon-mint)", "var(--neon-cyan)", "var(--neon-pink)", "var(--gold)"];

// Großansicht eines Entwurfs. Nutzt das native <dialog>:
// Esc schließt, der Fokus bleibt im Fenster, der Rest der Seite ist gesperrt.
export function DesignLightbox({ items, folder, kind, index, onClose, onGo, action }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const n = items.length;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const go = (step: number) => {
    if (index === null) return;
    onGo((index + step + n) % n);
  };

  const onKey = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  // Klick auf den dunklen Hintergrund (das <dialog> selbst, nicht sein Inhalt) schließt.
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = e.clientX;
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const d = index !== null ? items[index] : null;

  return (
    <dialog ref={ref} className="lightbox" aria-label={`${kind} groß ansehen`} onClose={onClose} onKeyDown={onKey} onClick={onBackdrop}>
      {d && (
        <div className="lightbox__inner" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <button type="button" className="lightbox__close" onClick={onClose} aria-label="Schließen">
            ×
          </button>
          <div className="lightbox__stage" onPointerDown={down} onPointerUp={up}>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Vorheriger Entwurf">
              ←
            </button>
            {/* key: neues Bild = neue Einblend-Animation. data-shine: Licht folgt der Maus (useShine.ts),
                --glow: Neon-Rand, reihum Mint, Cyan, Pink, Gold – wie bei den Kacheln */}
            <span
              key={d.file}
              className="lightbox__photo"
              data-shine
              style={{ "--glow": glowColors[index! % glowColors.length] } as CSSProperties}
            >
              <img
                src={`${import.meta.env.BASE_URL}${folder}/${d.file}`}
                alt={`${kind} ${d.name}`}
                width={d.width}
                height={d.height}
                draggable={false}
              />
            </span>
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Nächster Entwurf">
              →
            </button>
          </div>
          <div className="lightbox__bar">
            <div>
              <strong>{d.name}</strong>
              <span>{d.technique}</span>
            </div>
            <span className="lightbox__count">
              {index! + 1} / {n}
            </span>
            {action ? (
              <a className="btn btn--gold btn--small" href={action(d).href} onClick={onClose}>
                {action(d).label}
              </a>
            ) : (
              <a className="btn btn--gold btn--small" href={mailto(`Anfrage ${kind} „${d.name}“`)}>
                Dieses Design anfragen
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
