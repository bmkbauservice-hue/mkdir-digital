import { useState, type CSSProperties } from "react";
import { Logo } from "./components/Logo";
import { CardVisual } from "./components/CardVisual";
import { HeroDeck } from "./components/HeroDeck";
import { DesignLightbox } from "./components/DesignLightbox";
import { Wristbands } from "./components/Wristbands";
import {
  accessories,
  benefits,
  business,
  cardIdeas,
  cardLines,
  contact,
  designs,
  designsVisible,
  loyalty,
  mailto,
  priceNote,
  securityNote,
  steps,
  webServices,
} from "./content";

const navItems = [
  { href: "#karten", label: "NFC-Karten" },
  { href: "#designs", label: "Designs" },
  { href: "#unternehmen", label: "Für Unternehmen" },
  { href: "#kartensysteme", label: "Kartensysteme" },
  { href: "#armbaender", label: "Armbänder" },
  { href: "#zubehoer", label: "Zubehör" },
  { href: "#webdesign", label: "Webdesign" },
  { href: "#kontakt", label: "Kontakt" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="hauptnavigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
          <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
        </button>
        <nav id="hauptnavigation" className={`main-nav${open ? " is-open" : ""}`} aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--gold btn--small" href={mailto("Anfrage NFC-Karte")}>
            Karte anfragen
          </a>
        </nav>
      </div>
    </header>
  );
}

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
            <a className="btn btn--gold" href="#karten">
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
      <button type="button" className="gallery__frame" onClick={onOpen} aria-label={`${d.name} groß ansehen`}>
        <img
          src={`${import.meta.env.BASE_URL}designs/${d.file}`}
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
            <DesignTile key={d.file} d={d} feature={i === 0} onOpen={() => setOpen(i)} />
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
      <DesignLightbox index={open} onClose={() => setOpen(null)} onGo={setOpen} />
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
            </li>
          ))}
        </ul>
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
          <a href="#rechtliches">Impressum</a>
          <a href="#rechtliches">Datenschutz</a>
          <a href="#rechtliches">AGB</a>
          <a href="#rechtliches">Widerruf</a>
        </nav>
      </div>
      <p className="wrap site-footer__note" id="rechtliches">
        © 2026 MKDIR-Design. Impressum, Datenschutzerklärung, AGB und Widerrufsbelehrung werden vor dem Start ergänzt.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#karten">
        Zum Inhalt springen
      </a>
      <Header />
      <main>
        <Hero />
        <CardLines />
        <Designs />
        <Steps />
        <Business />
        <CardSystems />
        <Wristbands />
        <Accessories />
        <WebDesign />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
