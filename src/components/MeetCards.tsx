import { useState } from "react";
import { mailto, meetAnswers, meetCards, meetRules } from "../content";
import { DesignLightbox } from "./DesignLightbox";

type Tab = "him" | "her";

// Kennenlern-Karten: Galerie in zwei Reitern plus kleine Vorschau,
// was die angetippte Person sieht. Die Antwort-Buttons sind nur eine Demo (kein Server).
export function MeetCards() {
  const [tab, setTab] = useState<Tab>("him");
  const [zoom, setZoom] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const items = meetCards[tab];

  return (
    <section className="section section--meet" id="kennenlernen">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Kennenlern-Karten</p>
          <h2>Ich bin ein Unikat.</h2>
          <p>
            {tab === "him" ? "Mich gibt's in keiner Single-Börse." : "Diesmal frag ich."} Statt Swipen: Karte hinlegen,
            die andere Person tippt an und antwortet mit einem Klick. Ausgang offen.
          </p>
        </div>

        <div className="meet">
          <div className="meet__main">
            <div className="meet__tabs" role="tablist" aria-label="Serie wählen">
              {(["him", "her"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => {
                    setTab(t);
                    setZoom(null);
                  }}
                >
                  {t === "him" ? "Für ihn" : "Für sie"}
                  <span>{meetCards[t].length || "bald"}</span>
                </button>
              ))}
            </div>

            {items.length > 0 ? (
              <ul className="meet__grid">
                {items.map((d, i) => (
                  <li key={d.file}>
                    <button type="button" onClick={() => setZoom(i)} aria-label={`${d.name} groß ansehen`}>
                      <img
                        src={`${import.meta.env.BASE_URL}kennenlernen/${d.file}`}
                        alt={`Kennenlern-Karte ${d.name}`}
                        width={d.width}
                        height={d.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                    <strong>{d.name}</strong>
                    <span>{d.technique}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="meet__soon">
                <strong>„Diesmal frag ich.“</strong>
                <p>Die Serie für Frauen ist in Arbeit – selbstbewusst statt rosa.</p>
              </div>
            )}
          </div>

          <aside className="meet__phone" aria-label="Vorschau: Das sieht die angetippte Person">
            <div className="meet__screen">
              <span className="meet__kicker">Jemand findet dich interessant</span>
              <strong>Hast du Lust?</strong>
              <div className="meet__answers">
                {meetAnswers.map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={answer === a ? "is-picked" : undefined}
                    aria-pressed={answer === a}
                    onClick={() => setAnswer(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <p className="meet__result" aria-live="polite">
                {answer ? `Gesendet: „${answer}“` : "Tippen Sie eine Antwort an."}
              </p>
            </div>
            <ul className="meet__rules">
              {meetRules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <a className="btn btn--gold btn--small" href={mailto("Anfrage Kennenlern-Karte")}>
              Kennenlern-Karte anfragen
            </a>
          </aside>
        </div>
        <p className="fineprint">Die Bilder sind KI-Visualisierungen. Fotos echter Muster folgen.</p>
      </div>

      <DesignLightbox
        items={items}
        folder="kennenlernen"
        kind="Kennenlern-Karte"
        index={zoom}
        onClose={() => setZoom(null)}
        onGo={setZoom}
      />
    </section>
  );
}
