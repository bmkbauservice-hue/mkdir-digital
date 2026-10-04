import { useEffect, useState, type CSSProperties } from "react";
import { Logo } from "./components/Logo";
import { SiteHeader } from "./components/SiteHeader";
import { CardVisual } from "./components/CardVisual";
import { HeroDeck } from "./components/HeroDeck";
import { DesignLightbox, type LightboxItem } from "./components/DesignLightbox";
import { Wristbands } from "./components/Wristbands";
import { SingleCards } from "./components/SingleCards";
import { GameCard } from "./components/GameCard";
import { Privacy } from "./components/Privacy";
import { Imprint } from "./components/Imprint";
import { useShine } from "./useShine";
import { imgSet } from "./img";
import { href, pages, useLinkInterception, useRoute, type PageId } from "./router";
import {
  accessories,
  benefits,
  business,
  cardIdeas,
  cardLines,
  contact,
  designs,
  designsVisible,
  keychains,
  loyalty,
  mailto,
  petTags,
  priceNote,
  securityNote,
  steps,
  stickers,
  tableStandScenes,
  tableStands,
  webServices,
  worlds,
} from "./content";

function Hero() {
  return (
    <section className="hero" id="start">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="kicker">NFC-Visitenkarten in Ihrem Design</p>
          <h1>
            Einmal antippen.
            <span>Für immer im Kontakt.</span>
          </h1>
          <p className="hero__lead">
            Ihre Karte öffnet beim Antippen Ihre digitale Visitenkarte. Telefonnummer, E-Mail und Angebote ändern Sie
            online – gedruckt wird nie wieder.
          </p>
          <div className="hero__actions">
            <a className="btn btn--gold" href={href("karten")}>
              Kartenlinien ansehen
            </a>
            <a className="btn btn--ghost" href={mailto("Beratung NFC-Karte")}>
              Beratung anfragen
            </a>
          </div>
        </div>
        <HeroDeck />
      </div>
      <ul className="wrap benefits">
        {benefits.map((b) => (
          <li key={b.title}>
            <strong>{b.title}</strong>
            <span>{b.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CardLines() {
  return (
    <section className="section" id="karten">
      <div className="wrap">
        <div className="section-head">
          <h2>Vier Karten, ein Prinzip</h2>
          <p>Jede Karte wird für Sie gestaltet, programmiert und getestet. Die digitale Visitenkarte ist immer dabei.</p>
        </div>
        <div className="lines">
          {cardLines.map((line) => (
            <article key={line.id} className={`line${line.recommended ? " line--recommended" : ""}`}>
              {line.recommended && <span className="line__badge">Meine Empfehlung</span>}
              <div className="line__visual">
                <CardVisual finish={line.finish} />
              </div>
              <h3>{line.name}</h3>
              <p className="line__material">{line.material}</p>
              <p className="line__pitch">{line.pitch}</p>
              <ul>
                {line.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="line__foot">
                <strong>{line.price}</strong>
                <a className="btn btn--line btn--small" href={mailto(`Anfrage ${line.name}`)}>
                  Anfragen
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="fineprint">{priceNote}</p>
      </div>
    </section>
  );
}

type Design = (typeof designs)[number];

function DesignTile({ d, feature = false, onOpen }: { d: Design; feature?: boolean; onOpen: () => void }) {
  return (
    <figure className={feature ? "gallery__item gallery__item--feature" : "gallery__item"}>
      <button type="button" className="gallery__frame" data-shine onClick={onOpen} aria-label={`${d.name} groß ansehen`}>
        <img
          {...imgSet("designs", d.file)}
          sizes="(max-width: 700px) 92vw, (max-width: 1080px) 45vw, 400px"
          alt={`Kartenentwurf ${d.name} mit Platzhalter-Kontaktdaten`}
          width={d.width}
          height={d.height}
          loading="lazy"
          decoding="async"
        />
      </button>
      <figcaption>
        <strong>
          {d.name} <span className="gallery__tag">Entwurf</span>
        </strong>
        <span>{d.technique}</span>
      </figcaption>
    </figure>
  );
}

function Designs() {
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const first = designs.slice(0, designsVisible);
  const rest = designs.slice(designsVisible);
  return (
    <section className="section section--gallery" id="designs">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Designbeispiele</p>
          <h2>Ihre Karte kann alles sein. Nur nicht langweilig.</h2>
          <p>
            Vom Tuschebild bis zur Goldveredelung: Jedes Motiv wird für Ihre Karte gestaltet. Hier ein paar Entwürfe als
            Anregung – mit Platzhalter-Daten. Zum Vergrößern einfach anklicken.
          </p>
        </div>
        <div className="gallery gallery--main">
          {first.map((d, i) => (
            <DesignTile key={d.file} d={d} onOpen={() => setOpen(i)} />
          ))}
        </div>
        {showAll && (
          <div className="gallery gallery--more" id="weitere-designs">
            {rest.map((d, i) => (
              <DesignTile key={d.file} d={d} onOpen={() => setOpen(designsVisible + i)} />
            ))}
            <a
              className="gallery__own"
              href={mailto("Anfrage eigenes Kartendesign")}
              // Die Kachel füllt die letzte Reihe auf, egal wie viele Entwürfe es gibt.
              style={{ "--span3": 3 - (rest.length % 3), "--span2": 2 - (rest.length % 2) } as CSSProperties}
            >
              <strong>Ihr eigenes Motiv</strong>
              <span>Logo, Foto oder eine Idee im Kopf – ich mache daraus eine Karte, die sich herstellen lässt.</span>
              <em>Design anfragen →</em>
            </a>
          </div>
        )}
        <div className="gallery__more-bar">
          {rest.length > 0 && (
            <button
              type="button"
              className="btn btn--line"
              aria-expanded={showAll}
              aria-controls="weitere-designs"
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? "Weniger anzeigen" : `Alle ${designs.length} Entwürfe zeigen`}
            </button>
          )}
          {!showAll && (
            <a className="gallery__own-link" href={mailto("Anfrage eigenes Kartendesign")}>
              Oder Ihr eigenes Motiv anfragen →
            </a>
          )}
        </div>
        <p className="fineprint">
          Die Bilder sind KI-Visualisierungen. Fotos der echten Muster folgen. Farben und Effekte können bei der Herstellung
          leicht abweichen.
        </p>
      </div>
      <DesignLightbox items={designs} folder="designs" kind="Kartendesign" index={open} onClose={() => setOpen(null)} onGo={setOpen} />
    </section>
  );
}

function Steps() {
  return (
    <section className="section section--band" id="ablauf">
      <div className="wrap">
        <div className="section-head">
          <h2>So kommt die Karte zu Ihnen</h2>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Business() {
  return (
    <section className="section" id="unternehmen">
      <div className="wrap split">
        <div className="section-head section-head--side">
          <h2>Für Unternehmen</h2>
          <p>Vom Handwerksbetrieb bis zur Tankstellenkette: NFC-Lösungen, die mit Ihrem Team mitwachsen.</p>
          <a className="btn btn--ghost" href={mailto("Anfrage Firmenlösung")}>
            Firmenangebot anfragen
          </a>
        </div>
        <div className="biz">
          {business.map((b) => (
            <article key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StampCard() {
  const { total, filled } = loyalty.stamps;
  return (
    <div className="stampcard" role="img" aria-label={`Beispiel-Treuekarte: ${filled} von ${total} Punkten gesammelt`}>
      <div className="stampcard__top">
        <span>Bonuskarte</span>
        <span className="stampcard__count">
          {filled}/{total}
        </span>
      </div>
      <ol className="stampcard__grid" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            className={
              i < filled ? "is-filled" : i === filled ? "is-next" : i === total - 1 ? "is-reward" : undefined
            }
          >
            {i === total - 1 ? "Gratis" : i + 1}
          </li>
        ))}
      </ol>
      <p className="stampcard__hint">Noch 3× antippen bis zur Prämie</p>
    </div>
  );
}

function CardSystems() {
  return (
    <section className="section section--systems" id="kartensysteme">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Mehr aus der Karte machen</p>
          <h2>Die Karte ist der Schlüssel. Dahinter steckt Ihr System.</h2>
          <p>
            Eine NFC-Karte öffnet nicht nur Kontaktdaten. Ich programmiere die Anwendung dahinter – passend zu Ihrem
            Geschäft und auf meinem Server betrieben.
          </p>
        </div>
        <div className="systems">
          <article className="systems__feature">
            <span className="line__badge">Für Geschäfte mit Stammkunden</span>
            <div className="systems__feature-copy">
              <h3>{loyalty.title}</h3>
              <p>{loyalty.text}</p>
              <ul>
                {loyalty.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <p className="systems__price">{loyalty.price}</p>
              <a className="btn btn--gold btn--small" href={mailto("Anfrage Treuekarten-System")}>
                Treuekarte anfragen
              </a>
            </div>
            <StampCard />
          </article>
          {cardIdeas.map((idea) => (
            <article key={idea.title} className="systems__idea">
              <h3>{idea.title}</h3>
              <p>{idea.text}</p>
              <span>{idea.for}</span>
            </article>
          ))}
        </div>
        <aside className="secure">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 4.5 5.5v6c0 4.6 3.1 8.4 7.5 10 4.4-1.6 7.5-5.4 7.5-10v-6z" />
            <path d="m8.5 12 2.4 2.4 4.6-4.8" />
          </svg>
          <div>
            <strong>{securityNote.title}</strong>
            <p>{securityNote.text}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

// Produkt-Galerie mit Großansicht (Schlüsselanhänger, Tags und Sticker …).
// widths = Breite der kleinen Fassung und des Originals (für srcSet), ratio = Seitenverhältnis der Kacheln.
function ProductGallery({
  id,
  title,
  text,
  items,
  folder,
  kind,
  widths,
  ratio,
  cols = 5,
  colsTablet = 2,
  colsMobile = 2,
  cta = true,
}: {
  id?: string;
  title: string;
  text?: string;
  items: LightboxItem[];
  folder: string;
  kind: string;
  widths: [number, number];
  ratio: string;
  cols?: number; // Spalten am Desktop
  colsTablet?: number; // Spalten bis 900 px Breite
  colsMobile?: number; // Spalten am Handy
  cta?: boolean; // Hinweis + Anfrage-Button darunter
}) {
  const [zoom, setZoom] = useState<number | null>(null);
  const gridStyle = { "--ratio": ratio, "--cols": cols, "--cols-t": colsTablet, "--cols-m": colsMobile } as CSSProperties;
  return (
    <div className="keys" id={id}>
      <div className="keys__head">
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
      <ul className="keys__grid" style={gridStyle}>
        {items.map((k, i) => (
          <li key={k.file}>
            <button type="button" data-shine onClick={() => setZoom(i)} aria-label={`${kind} ${k.name} groß ansehen`}>
              <img
                {...imgSet(folder, k.file, widths)}
                sizes="(max-width: 900px) 46vw, 220px"
                alt={`${kind} ${k.name}`}
                width={k.width}
                height={k.height}
                loading="lazy"
                decoding="async"
              />
            </button>
            <strong>{k.name}</strong>
            <span>{k.technique}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <>
          <p className="fineprint">Die Bilder sind KI-Visualisierungen. Fotos echter Muster folgen.</p>
          <a className="btn btn--gold btn--small" href={mailto(`Anfrage ${title}`)}>
            {title} anfragen
          </a>
        </>
      )}
      <DesignLightbox items={items} folder={folder} kind={kind} index={zoom} onClose={() => setZoom(null)} onGo={setZoom} />
    </div>
  );
}

function Accessories() {
  return (
    <section className="section section--band" id="zubehoer">
      <div className="wrap">
        <div className="section-head">
          <h2>Noch mehr zum Antippen</h2>
          <p>Alles lässt sich mit Ihrer digitalen Visitenkarte oder einem eigenen Link verbinden. Preise auf Anfrage.</p>
        </div>
        <ul className="acc">
          {accessories.map((a) => (
            <li key={a.name}>
              <strong>{a.name}</strong>
              <span>{a.use}</span>
              {a.section && (
                <a className="acc__more" href={`#${a.section}`}>
                  Modelle ansehen ↓
                </a>
              )}
            </li>
          ))}
        </ul>

        <ProductGallery
          id="schluesselanhaenger"
          title="Schlüsselanhänger"
          text="Rund oder eckig, in fünf Materialien. Mit NFC-Chip und Ihrem Logo – antippen öffnet Ihre digitale Visitenkarte."
          items={keychains}
          folder="anhaenger"
          kind="NFC-Schlüsselanhänger"
          widths={[300, 600]}
          ratio="3 / 4"
        />

        <ProductGallery
          id="tags-sticker"
          title="Tags und Sticker"
          text="NFC-Tags zum Anhängen und Sticker für Handyhülle, Laptop oder Schaufenster – klassisch, edel oder im Street-Look."
          items={stickers}
          folder="sticker"
          kind="NFC-Tag und Sticker"
          widths={[400, 800]}
          ratio="4 / 3"
          colsTablet={3}
        />

        <ProductGallery
          id="tischaufsteller"
          title="Tischaufsteller"
          text="Speisekarte, WLAN oder Instagram per Antippen – aus Acryl, Metall, Holz oder mattschwarz, passend zu Ihrem Lokal."
          items={tableStands}
          folder="aufsteller"
          kind="NFC-Tischaufsteller"
          widths={[250, 500]}
          ratio="5 / 6"
          cols={6}
          colsTablet={3}
          cta={false}
        />
        <ProductGallery
          title="So wird's genutzt"
          items={tableStandScenes}
          folder="aufsteller"
          kind="Einsatzbeispiel Tischaufsteller"
          widths={[300, 600]}
          ratio="3 / 2"
          cols={3}
          colsTablet={3}
          colsMobile={1}
        />

        <ProductGallery
          id="haustier-marken"
          title="Haustier-Marken"
          text="Wer Ihr Tier findet, tippt die Marke an und sieht sofort, wie er Sie erreicht. Welche Angaben erscheinen, bestimmen Sie selbst."
          items={petTags}
          folder="haustier"
          kind="NFC-Haustier-Marke"
          widths={[236, 472]}
          ratio="1 / 1"
        />
      </div>
    </section>
  );
}

function WebDesign() {
  return (
    <section className="section" id="webdesign">
      <div className="wrap split">
        <div className="section-head section-head--side">
          <h2>Websites und Design</h2>
          <p>
            Ich entwickle Websites mit React und TypeScript, gestalte Logos und Drucksachen und automatisiere Abläufe.
            Individuell programmiert, schnell und für das Handy gemacht.
          </p>
        </div>
        <div className="pricelist">
          {webServices.map((w) => (
            <div key={w.name} className="pricelist__row">
              <span>{w.name}</span>
              <strong>{w.price}</strong>
            </div>
          ))}
          <a className="btn btn--line" href={mailto("Anfrage Webdesign")}>
            Webprojekt anfragen
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="kontakt">
      <div className="wrap contact__inner">
        <div>
          <h2>Lassen Sie uns über Ihre Karte sprechen</h2>
          <p>Schreiben Sie mir, was Sie vorhaben. Das erste Gespräch ist kostenlos und unverbindlich.</p>
        </div>
        <dl className="contact__list">
          <div>
            <dt>E-Mail</dt>
            <dd>
              <a href={mailto("Anfrage über mkdir-design")}>{contact.email}</a>
            </dd>
          </div>
          <div>
            <dt>Telefon und WhatsApp</dt>
            <dd>{contact.phoneHref ? <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a> : contact.phone}</dd>
          </div>
          <div>
            <dt>Sitz</dt>
            <dd>{contact.region}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <Logo />
        <nav aria-label="Rechtliches">
          <a href={href("impressum")}>Impressum</a>
          <a href={href("datenschutz")}>Datenschutz</a>
          <a href="#rechtliches">AGB</a>
          <a href="#rechtliches">Widerruf</a>
        </nav>
      </div>
      <p className="wrap site-footer__note" id="rechtliches">
        © 2026 MKDIR-Design. AGB und Widerrufsbelehrung werden vor dem Start ergänzt.
      </p>
    </footer>
  );
}

// Startseite: Kacheln zu den Unterseiten – jede Produktwelt hat ihre eigene Seite.
function Worlds() {
  return (
    <section className="section" id="welten">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Alles zum Antippen</p>
          <h2>Was darf es sein?</h2>
        </div>
        <ul className="worlds">
          {worlds.map((w) => (
            <li key={w.title}>
              <a className="world" href={href(w.page, w.section)}>
                <span className="world__media" data-shine>
                  {w.image ? (
                    <img
                      {...imgSet(w.image.folder, w.image.file)}
                      sizes="(max-width: 700px) 92vw, 380px"
                      alt=""
                      width={1200}
                      height={706}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="world__symbol" aria-hidden="true">
                      {w.symbol}
                    </span>
                  )}
                  {w.badge && <span className="world__badge">{w.badge}</span>}
                </span>
                <strong>{w.title}</strong>
                <span>{w.text}</span>
                <span className="world__more" aria-hidden="true">
                  Ansehen →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Was auf welcher Seite steht. Kontakt kommt überall ans Ende.
function PageContent({ page }: { page: PageId }) {
  switch (page) {
    case "karten":
      return (
        <>
          <CardLines />
          <Designs />
          <SingleCards />
          <GameCard />
        </>
      );
    case "armbaender":
      return <Wristbands />;
    case "zubehoer":
      return <Accessories />;
    case "unternehmen":
      return (
        <>
          <Business />
          <CardSystems />
        </>
      );
    case "webdesign":
      return <WebDesign />;
    default:
      return (
        <>
          <Hero />
          <Worlds />
          <Steps />
        </>
      );
  }
}

export default function App() {
  const { page, hash } = useRoute();
  useShine();
  useLinkInterception();

  // Titel im Browser-Tab je Seite.
  useEffect(() => {
    document.title = page === "start" ? "MKDIR-Design | NFC-Visitenkarten" : `${pages[page].title} | MKDIR-Design`;
  }, [page]);

  // Neue Seite → nach oben, oder direkt zum Abschnitt, wenn der Link einen Anker hat (z. B. /karten/#designs).
  useEffect(() => {
    const target = hash ? document.getElementById(hash) : null;
    requestAnimationFrame(() => {
      if (target) target.scrollIntoView({ behavior: "instant" });
      else if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [page, hash]);

  const legal = page === "datenschutz" || page === "impressum";

  return (
    <>
      <a className="skip-link" href={legal ? `#${page}-inhalt` : "#inhalt"}>
        Zum Inhalt springen
      </a>
      <SiteHeader page={page} />
      {page === "datenschutz" ? (
        <Privacy />
      ) : page === "impressum" ? (
        <Imprint />
      ) : (
        <main id="inhalt">
          <PageContent page={page} />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  );
}
