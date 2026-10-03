import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { heroDeck } from "../content";
import { PhoneVisual } from "./PhoneVisual";

const AUTOPLAY_MS = 5000;
const TAP_MS = 900;

// Funken beim Antippen: Winkel (Grad), Flugweite (px), Verzögerung (s). Fest vorgegeben statt zufällig,
// damit jede Runde gleich aussieht und React beim Rendern nichts würfeln muss.
const sparks = [
  { a: -80, d: 70, t: 0.38 },
  { a: -52, d: 96, t: 0.4 },
  { a: -28, d: 84, t: 0.36 },
  { a: -6, d: 110, t: 0.42 },
  { a: 18, d: 90, t: 0.37 },
  { a: 40, d: 104, t: 0.41 },
  { a: 64, d: 78, t: 0.39 },
  { a: 88, d: 66, t: 0.43 },
  { a: 120, d: 58, t: 0.4 },
  { a: 160, d: 52, t: 0.38 },
  { a: -130, d: 56, t: 0.42 },
  { a: -105, d: 74, t: 0.37 },
];

// Wie weit eine Karte im Fächer vom aktiven Platz entfernt ist (0 = vorne, 1 = dahinter, ...).
function offsetOf(i: number, active: number, n: number) {
  return (i - active + n) % n;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Karten-Deck im Hero: Karten fächern sich auf, die vordere tippt ans Handy,
// und die App auf dem Handy übernimmt das Design der Karte.
export function HeroDeck() {
  const n = heroDeck.length;
  const [active, setActive] = useState(0);
  const [tapping, setTapping] = useState(false);
  const [paused, setPaused] = useState(false);
  const tapTimer = useRef<number | undefined>(undefined);
  const swipeStart = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setActive(((next % n) + n) % n);
      if (prefersReducedMotion()) return;
      setTapping(true);
      window.clearTimeout(tapTimer.current);
      tapTimer.current = window.setTimeout(() => setTapping(false), TAP_MS);
    },
    [n],
  );

  // Automatisch weiterblättern – pausiert bei Maus darüber und bei "weniger Bewegung".
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, paused, goTo]);

  useEffect(() => () => window.clearTimeout(tapTimer.current), []);

  // Leichte Neigung zur Maus, wie ein echtes Stück Karte im Licht.
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 12}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 8}deg`);
    e.currentTarget.style.setProperty("--shine", `${50 + x * 60}%`);
  };
  const leave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty("--ry");
    e.currentTarget.style.removeProperty("--rx");
    e.currentTarget.style.removeProperty("--shine");
    setPaused(false);
    swipeStart.current = null;
  };

  // Wischen auf dem Handy: mehr als 40 px nach links/rechts blättert.
  const down = (e: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = e.clientX;
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1));
  };

  const current = heroDeck[active];
  const stageVars = {
    "--glow": current.theme.glow,
    "--glow2": current.theme.glow2,
    "--accent": current.theme.accent,
    "--accent2": current.theme.accent2,
  } as CSSProperties;

  return (
    <div className="deck-stage" style={stageVars}>
      <div
        className="deck-stage__scene"
        onPointerMove={tilt}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={leave}
        onPointerDown={down}
        onPointerUp={up}
      >
        <div className={`deck${tapping ? " is-tapping" : ""}`}>
          {heroDeck.map((c, i) => {
            const off = offsetOf(i, active, n);
            return (
              <button
                key={c.id}
                type="button"
                className="deck__card"
                data-offset={off < 3 ? off : "hidden"}
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => off !== 0 && goTo(i)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}designs/${c.card}`}
                  alt=""
                  width={1200}
                  height={700}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </button>
            );
          })}
          <span className="deck__pulse" aria-hidden="true">
            <i />
            <i />
          </span>
          <span className="deck__sparks" aria-hidden="true">
            {sparks.map((sp, i) => (
              <i key={i} style={{ "--a": `${sp.a}deg`, "--d": `${sp.d}px`, "--t": `${sp.t}s` } as CSSProperties} />
            ))}
          </span>
        </div>
        <PhoneVisual card={current} />
      </div>

      <div className="deck-controls">
        <button type="button" className="deck-controls__arrow" onClick={() => goTo(active - 1)} aria-label="Vorheriges Design">
          ←
        </button>
        <div className="deck-controls__dots" role="group" aria-label="Kartendesign wählen">
          {heroDeck.map((c, i) => (
            <button
              key={c.id}
              type="button"
              className={i === active ? "is-active" : undefined}
              aria-label={c.name}
              aria-current={i === active}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button type="button" className="deck-controls__arrow" onClick={() => goTo(active + 1)} aria-label="Nächstes Design">
          →
        </button>
        <p className="deck-controls__label" aria-live="polite">
          <span>Design</span> {current.name}
        </p>
      </div>
    </div>
  );
}
