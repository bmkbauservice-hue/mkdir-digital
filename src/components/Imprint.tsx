import { contact, legal } from "../content";
import { href } from "../router";

// Impressum nach § 5 DDG (Digitale-Dienste-Gesetz, seit Mai 2024 statt TMG).
// Pflicht: Name, ladungsfähige Anschrift (kein Postfach), schnelle Kontaktmöglichkeit (E-Mail + Telefon),
// USt-IdNr. sobald vorhanden. Der Link zur EU-OS-Plattform entfällt – die Plattform ist seit 20.07.2025 abgeschaltet.
// Gleiche Technik wie die Datenschutzseite: eigener Hash (#impressum), Inhalt aus content.ts (legal, contact).
export function Imprint() {
  const address = [legal.street, legal.city].filter(Boolean);
  return (
    <main className="legal" id="impressum-inhalt">
      <div className="wrap legal__inner">
        <a className="legal__back" href={href("start")}>
          ← Zurück zur Startseite
        </a>
        <p className="kicker">Rechtliches</p>
        <h1>Impressum</h1>

        <section>
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            {legal.name}
            <br />
            {legal.business}
            <br />
            {address.length ? (
              address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))
            ) : (
              <span className="legal__todo">Anschrift wird vor dem Start ergänzt.</span>
            )}
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            Telefon: {contact.phoneHref ? <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a> : contact.phone}
          </p>
        </section>

        {legal.vatId && (
          <section>
            <h2>Umsatzsteuer</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {legal.vatId}</p>
          </section>
        )}

        <section>
          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            {legal.name}
            {address.length > 0 && (
              <>
                <br />
                {address.join(", ")}
              </>
            )}
          </p>
        </section>

        <section>
          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2>Bilder</h2>
          <p>
            Die Karten- und Armbandbilder auf dieser Seite sind KI-Visualisierungen von Entwürfen. Fotos echter Muster
            folgen.
          </p>
        </section>
      </div>
    </main>
  );
}
