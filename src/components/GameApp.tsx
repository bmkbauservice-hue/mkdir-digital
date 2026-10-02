import { useMemo } from "react";
import { gameCardVariants, games } from "../content";
import { DemoSteps, TapStage, useDemoTimeline, type DemoPhase, type DemoStep } from "./TapDemo";

type Variant = (typeof gameCardVariants)[number];

// Gezeichnete Platzhalter-Karte für Varianten ohne Bild (z. B. Familie).
export function CssCard({ symbol }: { symbol: string }) {
  return (
    <span className="game-variant__card" aria-hidden="true">
      <span className="game-variant__symbol">{symbol}</span>
      <span className="game-variant__brand">MKDIR</span>
      <span className="game-variant__label">SPIELEKARTE</span>
    </span>
  );
}

// Animierte Erklärung der Spielekarte, im Look der gewählten Kartenvariante:
// Karte antippen → Spiel wählen → Kollegen kommen in den Raum → eine Runde Tic Tac Toe.
// Nur Vorführung – die Spiele selbst sind noch in Arbeit.

const steps: DemoStep[] = [
  { id: "tap", title: "Karte antippen", text: "Handy an die Spielekarte halten – das Spielmenü öffnet sich im Browser." },
  { id: "wahl", title: "Spiel wählen", text: "Alle Spiele aus Ihrem Paket auf einen Blick." },
  { id: "raum", title: "Mitspieler holen", text: "Kollegen tippen dieselbe Karte an und sind sofort im Raum." },
  { id: "spielen", title: "Losspielen", text: "Live auf allen Handys im Raum – ohne App, ohne Konto." },
];

// Sechs Spiele aus der Liste als Beispiel-Paket, mit kleinem Symbol
const tileIds: [string, string][] = [
  ["tictactoe", "✕○"],
  ["vier", "●●●"],
  ["maumau", "♠♥"],
  ["wuerfelpoker", "⚂⚄"],
  ["quiz", "?!"],
  ["memory", "◆◇"],
];
const tiles = tileIds.map(([id, icon]) => ({ ...games.find((g) => g.id === id)!, icon }));

const players = [
  { name: "Du", note: "hast den Raum eröffnet" },
  { name: "Sven", note: "hat die Karte angetippt" },
  { name: "Aylin", note: "schaut zu" },
];

// Die Partie: abwechselnd X (du) und O (Sven). Nach dem 7. Zug gewinnt X mit der Diagonale 2-4-6.
const moves = [4, 1, 0, 8, 6, 3, 2];
const winLine = [2, 4, 6];

const phases: DemoPhase[] = [
  { id: "tap", ticks: [2800] },
  { id: "wahl", ticks: [1100, 1100, 1300] }, // Liste → Tic Tac Toe markiert → gewählt
  { id: "raum", ticks: [900, 1100, 1100, 1500] }, // Du → Sven → Aylin → Los geht's
  { id: "spielen", ticks: [900, 650, 650, 650, 650, 650, 650, 3400] }, // leeres Feld, 7 Züge, Sieg
];

export function GameApp({ variant, onLoopEnd }: { variant: Variant; onLoopEnd: () => void }) {
  const demo = useDemoTimeline(phases, variant.id, onLoopEnd);
  const { phase, phaseIndex, tick } = demo;

  // Was ist gerade zu sehen? Alles wird aus Phase + Teilschritt berechnet.
  const hover = phase === "wahl" && tick >= 1;
  const chosen = (phase === "wahl" && tick >= 2) || phaseIndex > 1;
  const joined = phase === "raum" ? tick + 1 : phaseIndex > 2 ? players.length : 1;
  const ready = (phase === "raum" && tick >= 3) || phase === "spielen";
  const played = phase === "spielen" ? tick : 0; // Anzahl gespielter Züge
  const won = phase === "spielen" && played >= moves.length;

  const board = useMemo(() => {
    const cells: ("X" | "O" | "")[] = Array(9).fill("");
    moves.slice(0, played).forEach((c, i) => (cells[c] = i % 2 === 0 ? "X" : "O"));
    return cells;
  }, [played]);
  const xTurn = played % 2 === 0;

  const screen = (id: string) => {
    const i = phases.findIndex((p) => p.id === id);
    return `game-app__screen${phaseIndex === i ? " is-active" : phaseIndex > i ? " is-past" : ""}`;
  };

  const current = steps.findIndex((s) => s.id === phase);

  return (
    <div className="tap-demo" ref={demo.rootRef} data-tap={phase === "tap" || undefined} data-playing={demo.playing || undefined}>
      <DemoSteps
        steps={steps}
        current={current}
        onPick={(id) => demo.goTo(id, id === "spielen" ? moves.length : 0)}
        autoplay={demo.autoplay}
        reduced={demo.reduced}
        onPause={demo.pause}
        onRestart={demo.restart}
      />

      <TapStage
        card={
          variant.image ? (
            <img src={`${import.meta.env.BASE_URL}spiele/${variant.image}`} alt="" width={1200} height={740} draggable={false} />
          ) : (
            <span className={`tap-stage__css game-variant--${variant.id}`}>
              <CssCard symbol={variant.symbol} />
            </span>
          )
        }
        cardKey={variant.id}
        theme={variant.theme}
        themeId={variant.id}
        label={`Vorschau der Spiele-App im Design ${variant.name}`}
        note={{ app: "MKDIR Spiele", text: "Spielekarte erkannt. Tippe, um das Spielmenü zu öffnen." }}
        onNote={() => demo.goTo("wahl", 2)}
        locked={phase === "tap"}
      >
        <div className="game-app__bar">
          <span>
            MKDIR <b>Spiele</b>
          </span>
          <span className="game-app__badge">{chosen ? "Raum 4821" : "5er-Paket"}</span>
        </div>

        <div className="game-app__body">
          <div className={screen("wahl")}>
            <h4 className="game-app__title">Was spielen wir?</h4>
            <ul className="game-app__tiles">
              {tiles.map((t, i) => (
                <li key={t.id} className={i === 0 ? (chosen ? "is-picked" : hover ? "is-hover" : undefined) : undefined}>
                  <span className="game-app__icon" aria-hidden="true">
                    {t.icon}
                  </span>
                  <strong>{t.name}</strong>
                  <small>{t.players} Spieler</small>
                  {i === 0 && demo.playing && phase === "wahl" && tick === 1 && <span className="tap-finger" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </div>

          <div className={screen("raum")}>
            <h4 className="game-app__title">Tic Tac Toe</h4>
            <p className="game-app__hint">Kollegen tippen deine Karte an – schon sind sie im Raum.</p>
            <span className="game-app__code" aria-label="Raumnummer 4821">
              4821
            </span>
            <ul className="game-app__players">
              {players.map((p, i) => (
                <li key={p.name} className={i < joined ? "is-in" : "is-waiting"}>
                  <span className="game-app__avatar">{p.name[0]}</span>
                  <span>{i < joined ? p.name : "Wartet …"}</span>
                  {i < joined && <em>{p.note}</em>}
                </li>
              ))}
            </ul>
            <button type="button" tabIndex={-1} className={`game-app__start${ready ? " is-ready" : ""}`}>
              Los geht's!
              {demo.playing && phase === "raum" && tick === 3 && <span className="tap-finger" aria-hidden="true" />}
            </button>
          </div>

          <div className={screen("spielen")}>
            <div className="game-app__vs">
              <span className={!won && xTurn ? "is-turn" : undefined}>
                <b>Du</b> ✕
              </span>
              <span>{won ? "1 : 0" : xTurn ? "Du bist dran" : "Sven ist dran"}</span>
              <span className={!won && !xTurn ? "is-turn" : undefined}>
                ○ <b>Sven</b>
              </span>
            </div>
            <div className="game-app__board" role="img" aria-label={won ? "Spielfeld: Du gewinnst mit einer Diagonale" : "Spielfeld Tic Tac Toe"}>
              {board.map((c, i) => (
                <span
                  key={i}
                  className={[c === "X" ? "is-x" : c === "O" ? "is-o" : "", won && winLine.includes(i) ? "is-win" : ""]
                    .filter(Boolean)
                    .join(" ") || undefined}
                >
                  {c === "X" ? "✕" : ""}
                </span>
              ))}
            </div>
            <p className="game-app__watch">Aylin schaut zu</p>
          </div>
        </div>

        <p className={`tap-app__toast${won ? " is-shown" : ""}`} role="status">
          {won ? "Du gewinnst! Sven will Revanche – nächstes Spiel?" : ""}
        </p>
      </TapStage>
    </div>
  );
}
