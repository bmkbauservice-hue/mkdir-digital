import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import type { DemoTheme } from "../content";

// Gemeinsames Gerüst für die animierten Erklärungen (Single-Karte, Spielekarte):
// Karte wandert ans Handy → Sperrbildschirm mit Mitteilung → App im Look der Karte.
// Der Ablauf ist eine Zeitleiste aus Phasen, jede Phase hat einen oder mehrere "Ticks" (Teilschritte).

export type DemoPhase = { id: string; ticks: number[] }; // ticks = Dauer jedes Teilschritts in ms
export type DemoStep = { id: string; title: string; text: string };

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

// Die Zeitleiste. Plant immer nur den nächsten Teilschritt – ändert sich etwas, wird neu geplant.
// onLoopEnd wird am Ende einer Runde aufgerufen (z. B. um zur nächsten Karte zu wechseln).
// rootRef legt die Komponente selbst an (useRef) und gibt ihn hier hinein. Der Hook gibt ihn NICHT zurück –
// sonst behandelt die Lint-Regel react-hooks/refs das ganze Rückgabe-Objekt wie eine Ref.
export function useDemoTimeline(
  phases: DemoPhase[],
  resetKey: unknown,
  rootRef: RefObject<HTMLElement | null>,
  onLoopEnd?: () => void,
) {
  const reduced = usePrefersReducedMotion();
  const start = reduced ? 1 : 0; // ohne Bewegung: gleich die App zeigen
  const [pos, setPos] = useState({ phase: start, tick: 0 });
  const [autoplay, setAutoplay] = useState(!reduced);
  const [inView, setInView] = useState(false);
  const loopEnd = useRef(onLoopEnd);
  // Immer den neuesten Callback merken – im Effekt, nicht beim Rendern (Lint-Regel react-hooks/refs).
  useEffect(() => {
    loopEnd.current = onLoopEnd;
  });

  const playing = autoplay && inView && !reduced;

  // Neue Karte / neues Profil → von vorn. Bewusst direkt beim Rendern statt in einem Effekt:
  // So empfiehlt es React für "State zurücksetzen, wenn sich eine Eingabe ändert"
  // (setState in useEffect verbietet die Lint-Regel react-hooks/set-state-in-effect).
  const [prevKey, setPrevKey] = useState(resetKey);
  if (prevKey !== resetKey) {
    setPrevKey(resetKey);
    setPos({ phase: start, tick: 0 });
  }

  // Nur abspielen, wenn der Bereich wirklich im Bild ist.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [rootRef]);

  useEffect(() => {
    if (!playing) return;
    const ph = phases[pos.phase];
    const t = window.setTimeout(() => {
      if (pos.tick < ph.ticks.length - 1) setPos({ phase: pos.phase, tick: pos.tick + 1 });
      else if (pos.phase < phases.length - 1) setPos({ phase: pos.phase + 1, tick: 0 });
      else {
        setPos({ phase: 0, tick: 0 });
        loopEnd.current?.();
      }
    }, ph.ticks[pos.tick] ?? 1000);
    return () => window.clearTimeout(t);
  }, [playing, pos, phases]);

  // Selbst steuern: springt zu einer Phase und schaltet die Automatik aus.
  const goTo = useCallback(
    (id: string, tick = 0) => {
      const i = phases.findIndex((p) => p.id === id);
      if (i < 0) return;
      setAutoplay(false);
      setPos({ phase: i, tick });
    },
    [phases],
  );

  const restart = () => {
    setPos({ phase: 0, tick: 0 });
    setAutoplay(true);
  };

  return {
    phase: phases[pos.phase].id,
    phaseIndex: pos.phase,
    tick: pos.tick,
    playing,
    autoplay,
    reduced,
    goTo,
    pause: () => setAutoplay(false),
    restart,
  };
}

// CSS-Variablen aus einem Theme – die App übernimmt damit Farben und Schrift der Karte.
export function themeVars(t: DemoTheme): CSSProperties {
  return {
    "--app-bg": t.bg,
    "--app-surface": t.surface,
    "--app-text": t.text,
    "--app-muted": t.muted,
    "--app-accent": t.accent,
    "--app-accent2": t.accent2,
    "--app-accent-text": t.accentText,
    "--app-line": t.line,
    "--app-font": t.font === "ink" ? "var(--font-ink)" : "var(--font-display)",
  } as CSSProperties;
}

// Linke Spalte: die Schritte als anklickbare Liste plus Start/Stopp.
export function DemoSteps({
  steps,
  current,
  onPick,
  autoplay,
  reduced,
  onPause,
  onRestart,
  children,
}: {
  steps: DemoStep[];
  current: number;
  onPick: (id: string) => void;
  autoplay: boolean;
  reduced: boolean;
  onPause: () => void;
  onRestart: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="tap-demo__copy">
      <ol className="tap-demo__steps">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={i === current ? "is-current" : i < current ? "is-done" : undefined}
              aria-current={i === current ? "step" : undefined}
              onClick={() => onPick(s.id)}
            >
              <span className="tap-demo__num">{i + 1}</span>
              <span>
                <strong>{s.title}</strong>
                <small>{s.text}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
      {children}
      {!reduced && (
        <button type="button" className="tap-demo__play" onClick={autoplay ? onPause : onRestart}>
          {autoplay ? "❚❚ Animation anhalten" : "▶ Animation abspielen"}
        </button>
      )}
    </div>
  );
}

// Rechte Spalte: Karte, Funkwellen, Handy mit Sperrbildschirm und App.
export function TapStage({
  card,
  cardKey,
  theme,
  themeId,
  label,
  note,
  onNote,
  locked,
  children,
}: {
  card: ReactNode; // Kartenbild oder gezeichnete Karte
  cardKey: string; // wechselt die Karte → Einblend-Animation
  theme: DemoTheme;
  themeId: string; // für Sonderregeln im CSS (z. B. Pop-Art-Rahmen)
  label: string;
  note: { app: string; text: string };
  onNote: () => void;
  locked: boolean; // true = Sperrbildschirm sichtbar
  children: ReactNode; // Inhalt der App
}) {
  return (
    <div className="tap-stage">
      <div className="tap-stage__card" key={cardKey}>
        {card}
      </div>
      <span className="tap-stage__waves" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <div className="tap-phone" role="group" aria-label={label} style={themeVars(theme)} data-theme={themeId}>
        <div className="tap-phone__screen">
          <div className="tap-lock" inert={!locked}>
            <span className="tap-lock__time">21:47</span>
            <span className="tap-lock__date">Freitag</span>
            <button type="button" className="tap-lock__note" onClick={onNote}>
              <span className="tap-lock__icon">M</span>
              <span>
                <strong>{note.app}</strong>
                <small>{note.text}</small>
              </span>
            </button>
          </div>
          <div className="tap-app" inert={locked}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
