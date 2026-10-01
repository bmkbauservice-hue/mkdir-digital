import { useMemo, useState } from "react";
import {
  gameCardVariants,
  gameCategories,
  gamePackSizes,
  games,
  mailto,
  type GameCategory,
} from "../content";

type Mode = "paket" | "selbst";

// Gezeichnete Platzhalter-Karte für Varianten ohne Bild.
function CssCard({ symbol }: { symbol: string }) {
  return (
    <span className="game-variant__card" aria-hidden="true">
      <span className="game-variant__symbol">{symbol}</span>
      <span className="game-variant__brand">MKDIR</span>
      <span className="game-variant__label">SPIELEKARTE</span>
    </span>
  );
}

// Spielekarte – IN VORBEREITUNG.
// Zeigt die vier Kartenvarianten und einen Paket-Konfigurator.
// Ergebnis ist (noch) keine Bestellung, sondern ein Eintrag auf der Warteliste per E-Mail.
export function GameCard() {
  const [variant, setVariant] = useState(gameCardVariants[0].id);
  const [mode, setMode] = useState<Mode>("paket");
  const [size, setSize] = useState(5);
  const [picked, setPicked] = useState<string[]>([]);

  const limit = size >= games.length ? games.length : size;
  const full = picked.length >= limit;

  // Themenpaket: füllt die Auswahl mit den Spielen einer Kategorie (bis zur Paketgröße).
  const pickCategory = (cat: GameCategory) => {
    const ids = games.filter((g) => g.category === cat).map((g) => g.id);
    setMode("selbst");
    setSize((s) => Math.max(s, ids.length));
    setPicked(ids);
  };

  const toggle = (id: string) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : full ? p : [...p, id]));
  };

  const chooseSize = (s: number) => {
    setSize(s);
    setPicked((p) => (s >= games.length ? games.map((g) => g.id) : p.slice(0, s)));
  };

  const current = gameCardVariants.find((v) => v.id === variant)!;
  const variantName = current.name;
  const summary = useMemo(() => {
    const names = games.filter((g) => picked.includes(g.id)).map((g) => g.name);
    const pack = gamePackSizes.find((p) => p.size === size)!.name;
    return { names, pack };
  }, [picked, size]);

  const waitlistHref = mailto(
    `Warteliste Spielekarte – ${variantName}, ${summary.pack}${summary.names.length ? ": " + summary.names.join(", ") : ""}`,
  );

  const done = games.filter((g) => g.status === "fertig").length;

  return (
    <section className="section section--games" id="spielekarte">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Spielekarte</p>
          <h2>
            Antippen. Mitspielen. <span className="games__soon">In Vorbereitung</span>
          </h2>
          <p>
            Eine Karte, bis zu {games.length} Spiele im Browser. Wer Ihre Karte antippt, sitzt mit am Tisch – ohne App,
            ohne Anmeldung. Spiele lassen sich jederzeit nachbuchen.
          </p>
        </div>

        <div className={`games__stage game-variant--${current.id}`}>
          {current.image ? (
            <img
              key={current.id}
              src={`${import.meta.env.BASE_URL}spiele/${current.image}`}
              alt={`MKDIR Spielekarte im Design ${current.name} mit Spieleliste`}
              width={1200}
              height={740}
            />
          ) : (
            <div key={current.id} className="games__stage-css">
              <CssCard symbol={current.symbol} />
              <span>Bild folgt</span>
            </div>
          )}
        </div>

        <div className="games__variants" role="radiogroup" aria-label="Kartenvariante wählen">
          {gameCardVariants.map((v) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={variant === v.id}
              className={`game-variant game-variant--${v.id}`}
              onClick={() => setVariant(v.id)}
            >
              {v.image ? (
                <img
                  className="game-variant__img"
                  src={`${import.meta.env.BASE_URL}spiele/${v.image}`}
                  alt=""
                  width={1200}
                  height={740}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <CssCard symbol={v.symbol} />
              )}
              <strong>{v.name}</strong>
              <span>{v.text}</span>
            </button>
          ))}
        </div>

        <div className="games__config">
          <div className="games__modes" role="tablist" aria-label="Auswahl">
            <button type="button" role="tab" aria-selected={mode === "paket"} onClick={() => setMode("paket")}>
              Themenpakete
            </button>
            <button type="button" role="tab" aria-selected={mode === "selbst"} onClick={() => setMode("selbst")}>
              Selbst zusammenstellen
            </button>
          </div>

          {mode === "paket" ? (
            <div className="games__packs">
              {gameCategories.map((c) => {
                const list = games.filter((g) => g.category === c.id);
                return (
                  <article key={c.id} className={`game-pack game-pack--${c.id}`}>
                    <h3>{c.name}</h3>
                    <p>{c.text}</p>
                    <ul>
                      {list.map((g) => (
                        <li key={g.id}>{g.name}</li>
                      ))}
                    </ul>
                    <button type="button" className="btn btn--line btn--small" onClick={() => pickCategory(c.id)}>
                      Paket wählen ({list.length} Spiele)
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="games__picker">
              <div className="games__sizes" role="radiogroup" aria-label="Paketgröße">
                {gamePackSizes.map((p) => (
                  <button
                    key={p.size}
                    type="button"
                    role="radio"
                    aria-checked={size === p.size}
                    onClick={() => chooseSize(p.size)}
                  >
                    <strong>{p.name}</strong>
                    <span>{p.text}</span>
                  </button>
                ))}
              </div>

              <p className="games__counter" aria-live="polite">
                <strong>
                  {picked.length} von {limit}
                </strong>{" "}
                Spielen gewählt{full && limit < games.length ? " – Paket ist voll" : ""}
              </p>

              <div className="games__list">
                {gameCategories.map((c) => (
                  <fieldset key={c.id}>
                    <legend>{c.name}</legend>
                    {games
                      .filter((g) => g.category === c.id)
                      .map((g) => {
                        const on = picked.includes(g.id);
                        return (
                          <label key={g.id} className={`game-chip${on ? " is-on" : ""}${!on && full ? " is-disabled" : ""}`}>
                            <input type="checkbox" checked={on} disabled={!on && full} onChange={() => toggle(g.id)} />
                            <span>{g.name}</span>
                            <small>{g.players}</small>
                          </label>
                        );
                      })}
                  </fieldset>
                ))}
              </div>
            </div>
          )}

          <div className="games__footer">
            <p>
              <strong>{variantName}</strong> · {summary.pack}
              {summary.names.length > 0 && <> · {summary.names.length} Spiele gewählt</>}
            </p>
            <a className="btn btn--gold" href={waitlistHref}>
              Auf die Warteliste
            </a>
          </div>
        </div>

        <p className="fineprint">
          Stand der Entwicklung: {done} von {games.length} Spielen fertig. Gespielt wird ohne Einsatz – keine Geldspiele,
          keine Gewinne. Spielenamen sind eigene Umsetzungen bekannter Spielprinzipien.
        </p>
      </div>
    </section>
  );
}
