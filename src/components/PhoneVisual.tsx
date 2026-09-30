import { contact } from "../content";

const actions = ["Anrufen", "WhatsApp", "E-Mail", "Website", "Standort", "Teilen"];

// Das Handy zeigt, was nach dem Antippen der Karte erscheint: die digitale Visitenkarte.
export function PhoneVisual() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__screen">
        <div className="phone__notch" />
        <div className="phone__avatar">MK</div>
        <strong className="phone__name">Mario Kujoth</strong>
        <span className="phone__role">Inhaber · MKDIR-Design</span>
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
