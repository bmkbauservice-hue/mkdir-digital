import { contact } from "../content";

const actions = ["Anrufen", "WhatsApp", "E-Mail", "Website", "Standort", "Teilen"];

// Das Handy zeigt, was nach dem Antippen der Karte erscheint: die digitale Visitenkarte –
// im selben Tusche-Look wie die Karte, mit Neon-Akzenten.
export function PhoneVisual() {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__screen">
        <div className="phone__cover" style={{ backgroundImage: `url(${base}hero/tusche-app.webp)` }} />
        <div className="phone__notch" />
        <div className="phone__head">
          <div className="phone__avatar">M</div>
          <strong className="phone__name">MKDIR Design</strong>
          <span className="phone__role">NFC-Visitenkarten · Webdesign</span>
        </div>
        <div className="phone__actions">
          {actions.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        <dl className="phone__details">
          <div>
            <dt>E-Mail</dt>
            <dd>{contact.email}</dd>
          </div>
          <div>
            <dt>Web</dt>
            <dd>{contact.domain}</dd>
          </div>
        </dl>
        <span className="phone__save">Kontakt speichern</span>
      </div>
    </div>
  );
}
