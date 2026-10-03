import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Wristband } from "../content";
import { DemoSteps, TapStage, useDemoTimeline, type DemoPhase, type DemoStep } from "./TapDemo";

// Animierte Erklärung der NFC-Armbänder, im Neon-Look des gewählten Armbands:
// Armband ans Handy → Mitteilung → die Infos erscheinen nacheinander → eine Aktion mit einem Tipp.
// Gleiches Gerüst wie Single- und Spielekarte (TapDemo.tsx).

const steps: DemoStep[] = [
  { id: "tap", title: "Armband antippen", text: "Handy ans Handgelenk halten – ohne App, ohne Akku im Armband." },
  { id: "info", title: "Infos erscheinen", text: "Genau das, was Sie für Ihren Einsatz festlegen." },
  { id: "aktion", title: "Mit einem Tipp", text: "Bezahlen, Spind öffnen oder anrufen – direkt auf dem Handy." },
];

const phases: DemoPhase[] = [
  { id: "tap", ticks: [2800] },
  { id: "info", ticks: [700, 700, 700, 1100] }, // Kopf → Zeile 1 → 2 → 3
  { id: "aktion", ticks: [1400, 3200] }, // Finger tippt → Bestätigung
];

export function BandApp({ band, card, onLoopEnd }: { band: Wristband; card: ReactNode; onLoopEnd: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const demo = useDemoTimeline(phases, band.id, rootRef, onLoopEnd);
  const { phase, phaseIndex, tick } = demo;

  // Wie viele Zeilen sind schon zu sehen? Kopf zuerst, dann eine Zeile pro Teilschritt.
  const all = band.tap.lines.length;
  const shown = demo.reduced ? all : phase === "info" ? tick : phaseIndex > 1 ? all : 0;
  const tapped = phase === "aktion" && tick >= 1;
  const current = steps.findIndex((s) => s.id === phase);

  return (
    <div
      className="tap-demo band-demo"
      ref={rootRef}
      data-tap={phase === "tap" || undefined}
      data-playing={demo.playing || undefined}
      style={{ "--band": band.band, "--ink": band.ink, "--neon": band.app.theme.accent, "--neon2": band.app.theme.accent2 } as CSSProperties}
    >
      <DemoSteps
        steps={steps}
        current={current}
        onPick={(id) => demo.goTo(id, id === "info" ? band.tap.lines.length : 0)}
        autoplay={demo.autoplay}
        reduced={demo.reduced}
        onPause={demo.pause}
        onRestart={demo.restart}
      />

      <TapStage
        card={card}
        cardKey={band.id}
        theme={band.app.theme}
        themeId={`band-${band.id}`}
        label={`Vorschau: Das sieht man beim Antippen des Armbands ${band.name}`}
        note={{ app: "MKDIR Band", text: `${band.name}-Armband erkannt. Tippe zum Öffnen.` }}
        onNote={() => demo.goTo("info", band.tap.lines.length)}
        locked={phase === "tap"}
      >
        <div className="band-app__bar">
          <span>
            MKDIR <b>Band</b>
          </span>
          <span className="band-app__badge">NFC</span>
        </div>

        <div className="band-app__body">
          <div className="band-app__head">
            <span className="band-app__icon" aria-hidden="true">
              {band.app.icon}
            </span>
            <h4>{band.tap.title}</h4>
            <p>{band.app.status}</p>
          </div>

          <ul className="band-app__lines">
            {band.tap.lines.map((l, i) => (
              <li key={l} className={i < shown ? "is-in" : undefined}>
                {l}
              </li>
            ))}
          </ul>

          <button type="button" tabIndex={-1} className={`band-app__action${tapped ? " is-done" : ""}`}>
            {band.app.action}
            {demo.playing && phase === "aktion" && tick === 0 && <span className="tap-finger" aria-hidden="true" />}
          </button>
        </div>

        <p className={`tap-app__toast${tapped ? " is-shown" : ""}`} role="status">
          {tapped ? band.app.toast : ""}
        </p>
      </TapStage>
    </div>
  );
}
