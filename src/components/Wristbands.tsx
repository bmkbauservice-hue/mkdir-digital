import { useId, useState, type CSSProperties, type KeyboardEvent } from "react";
import { bandDesigns, gpsNote, mailto, wristbands, type Wristband } from "../content";
import { BandApp } from "./BandApp";
import { DesignLightbox } from "./DesignLightbox";

// Das Armband als SVG: ein Ring in leichter Perspektive.
// Hintere Hälfte dunkler, vordere Hälfte mit Aufdruck und NFC-Chip.
function BandVisual({ band }: { band: Wristband }) {
  // useId liefert Zeichen wie « », die in SVG-Links (href="#…") Ärger machen – daher bereinigen.
  const pathId = `band-path-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg className="band" viewBox="0 0 420 300" role="img" aria-label={`Armband ${band.name} mit Aufdruck „${band.label}“`}>
      {/* hintere Hälfte */}
      <path className="band__back" d="M45 140 A165 78 0 0 1 375 140" />
      <path className="band__back-edge" d="M45 140 A165 78 0 0 1 375 140" />
      {/* vordere Hälfte */}
      <path id={pathId} className="band__front" d="M45 140 A165 78 0 0 0 375 140" />
      <path className="band__shine" d="M70 168 A150 64 0 0 0 350 168" />
      <text className="band__label">
        <textPath href={`#${pathId}`} startOffset="44%" textAnchor="middle" dominantBaseline="central">
          {band.label}
        </textPath>
      </text>
      {/* NFC-Chip vorne */}
      <g className="band__chip" transform="translate(362 172) rotate(-18) scale(0.9)">
        <rect x="-34" y="-22" width="68" height="44" rx="12" />
        <path d="M-8 -8a11 11 0 0 1 0 16M-1 -13a18 18 0 0 1 0 26M6 -18a25 25 0 0 1 0 36" />
      </g>
    </svg>
  );
}

export function Wristbands() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const [cycle, setCycle] = useState(true); // Animation wechselt nach jeder Runde das Armband, bis man selbst wählt
  const band = wristbands[active];
  const tabsId = `bands-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Pfeiltasten wechseln zwischen den Tabs (Standard-Verhalten für role="tablist").
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + wristbands.length) % wristbands.length;
    setActive(next);
    setCycle(false);
    document.getElementById(`${tabsId}-tab-${next}`)?.focus();
  };

  const vars = { "--band": band.band, "--ink": band.ink } as CSSProperties;

  return (
    <section className="section section--bands" id="armbaender">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">NFC-Armbänder</p>
          <h2>Antippen geht auch am Handgelenk.</h2>
          <p>
            Silikon-Armbänder mit NFC-Chip – ohne Akku, wasserfest und in Ihrer Farbe. Was beim Antippen passiert,
            programmiere ich passend zu Ihrem Einsatz.
          </p>
        </div>

        <div className="bands">
          <div className="bands__tabs" role="tablist" aria-label="Einsatzzweck wählen" onKeyDown={onKey}>
            {wristbands.map((b, i) => (
              <button
                key={b.id}
                id={`${tabsId}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`${tabsId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className="bands__tab"
                style={{ "--dot": b.band } as CSSProperties}
                onClick={() => {
                  setCycle(false);
                  setActive(i);
                }}
              >
                <strong>{b.name}</strong>
                <span>{b.for}</span>
              </button>
            ))}
          </div>

          <div
            className="bands__stage"
            id={`${tabsId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${active}`}
            style={vars}
          >
            <div className="bands__visual">
              <BandVisual band={band} />
              <div className="bands__tap" key={band.id}>
                <span className="bands__tap-kicker">Beim Antippen</span>
                <strong>{band.tap.title}</strong>
                <ul>
                  {band.tap.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bands__copy" key={`${band.id}-copy`}>
              <p>{band.text}</p>
              {band.note && <p className="bands__note">{band.note}</p>}
              <a className="btn btn--gold btn--small" href={mailto(`Anfrage NFC-Armband ${band.name}`)}>
                Armband anfragen
              </a>
            </div>
          </div>
        </div>

        <div className="bands__demo">
          <span className="bands__demo-badge">So funktioniert's</span>
          <BandApp
            band={band}
            card={<BandVisual band={band} />}
            onLoopEnd={() => {
              if (cycle) setActive((a) => (a + 1) % wristbands.length);
            }}
          />
        </div>

        <h3 className="bands__gallery-title">Beispiele zum Anschauen</h3>
        <ul className="bands__gallery">
          {bandDesigns.map((d, i) => (
            <li key={d.file}>
              <button type="button" onClick={() => setZoom(i)} aria-label={`Armband ${d.name} groß ansehen`}>
                <img
                  src={`${import.meta.env.BASE_URL}bands/${d.file}`}
                  alt={`Armband ${d.name}`}
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
        <p className="fineprint">Die Bilder sind KI-Visualisierungen. Fotos echter Muster folgen.</p>

        <DesignLightbox
          items={bandDesigns}
          folder="bands"
          kind="Armband"
          index={zoom}
          onClose={() => setZoom(null)}
          onGo={setZoom}
        />

        <p className="bands__gps">
          <span>Bald</span>
          {gpsNote}
        </p>
      </div>
    </section>
  );
}
