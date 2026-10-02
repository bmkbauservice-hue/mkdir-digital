import { useState } from "react";
import { mailto, singleCards, singleRules } from "../content";
import { DesignLightbox } from "./DesignLightbox";
import { SingleApp } from "./SingleApp";

type Tab = "him" | "her";

// Single-Karten: oben die animierte App-Vorführung (was die angetippte Person sieht),
// darunter die Kartendesigns in zwei Reitern. Der Reiter steuert Demo-Profil und Galerie gemeinsam.
export function SingleCards() {
  const [tab, setTab] = useState<Tab>("him");
  const [zoom, setZoom] = useState<number | null>(null);
  const items = singleCards[tab];

  return (
    <section className="section section--single" id="single-karten">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Single-Karten</p>
          <h2>Ich bin ein Unikat.</h2>
          <p>
            Mich gibt's in keiner Single-Börse – und diesmal frag ich. Statt Swipen: Karte hinlegen. Wer antippt, sieht
            Ihr Profil mit Fotos – in einer App, die genauso aussieht wie Ihre Karte.
          </p>
        </div>

        <SingleApp />

        <div className="single__info">
          <ul className="single__rules">
            {singleRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <a className="btn btn--gold" href={mailto("Anfrage Single-Karte")}>
            Single-Karte anfragen
          </a>
        </div>

        <h3 className="single__gallery-title">Alle Designs</h3>
        <div className="single__tabs" role="tablist" aria-label="Serie wählen">
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
              <span>{singleCards[t].length}</span>
            </button>
          ))}
        </div>

        <ul className="single__grid">
          {items.map((d, i) => (
            <li key={d.file}>
              <button type="button" onClick={() => setZoom(i)} aria-label={`${d.name} groß ansehen`}>
                <img
                  src={`${import.meta.env.BASE_URL}single/${d.file}`}
                  alt={`Single-Karte ${d.name}`}
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
        <p className="fineprint">
          Die Kartenbilder sind KI-Visualisierungen, die Profile in der App-Vorschau sind ausgedacht. Fotos echter Muster
          folgen.
        </p>
      </div>

      <DesignLightbox
        items={items}
        folder="single"
        kind="Single-Karte"
        index={zoom}
        onClose={() => setZoom(null)}
        onGo={setZoom}
      />
    </section>
  );
}
