import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { designs, mailto } from "../content";

type Props = {
  index: number | null; // null = geschlossen
  onClose: () => void;
  onGo: (index: number) => void;
};

// Großansicht eines Kartenentwurfs. Nutzt das native <dialog>:
// Esc schließt, der Fokus bleibt im Fenster, der Rest der Seite ist gesperrt.
export function DesignLightbox({ index, onClose, onGo }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const n = designs.length;

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

  const d = index !== null ? designs[index] : null;

  return (
    <dialog ref={ref} className="lightbox" aria-label="Kartenentwurf groß ansehen" onClose={onClose} onKeyDown={onKey} onClick={onBackdrop}>
      {d && (
        <div className="lightbox__inner" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <button type="button" className="lightbox__close" onClick={onClose} aria-label="Schließen">
            ×
          </button>
          <div className="lightbox__stage" onPointerDown={down} onPointerUp={up}>
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Vorheriger Entwurf">
              ←
            </button>
            {/* key: neues Bild = neue Einblend-Animation */}
            <img
              key={d.file}
              src={`${import.meta.env.BASE_URL}designs/${d.file}`}
              alt={`Kartenentwurf ${d.name} mit Platzhalter-Kontaktdaten`}
              width={d.width}
              height={d.height}
              draggable={false}
            />
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
            <a className="btn btn--gold btn--small" href={mailto(`Anfrage Kartendesign „${d.name}“`)}>
              Dieses Design anfragen
            </a>
          </div>
        </div>
      )}
    </dialog>
  );
}
