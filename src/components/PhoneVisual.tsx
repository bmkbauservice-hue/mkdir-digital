import type { CSSProperties } from "react";
import { contact, type DeckCard } from "../content";

const actions = ["Anrufen", "WhatsApp", "E-Mail", "Website", "Standort", "Teilen"];

// Das Handy zeigt, was nach dem Antippen der Karte erscheint: die digitale Visitenkarte.
// Ihr Look kommt aus dem Theme der aktiven Karte – jede Karte hat ihre eigene App.
export function PhoneVisual({ card }: { card: DeckCard }) {
  const t = card.theme;
  const vars = {
    "--app-bg": t.bg,
    "--app-text": t.text,
    "--app-muted": t.muted,
    "--app-accent": t.accent,
    "--app-accent2": t.accent2,
    "--app-save": t.save,
    "--app-save-text": t.saveText,
    "--app-font": t.font === "ink" ? "var(--font-ink)" : "var(--font-display)",
    "--app-cover": `url(${import.meta.env.BASE_URL}hero/${card.cover})`,
  } as CSSProperties;

  return (
    <div className="phone" aria-hidden="true" style={vars}>
      {/* key: Bei jedem Kartenwechsel wird der Bildschirm neu aufgebaut – das startet die Einblend-Animation. */}
      <div className="phone__screen" key={card.id}>
        <div className="phone__cover" />
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
