// Alle Texte, Preise und Kontaktdaten der Seite an einem Ort.
// Wer etwas ändern will, ändert es hier – die Komponenten lesen nur aus dieser Datei.

export const contact = {
  email: "IT-mkdir@proton.me",
  // TODO: vollständige Geschäftsnummer eintragen (bisher nur der Anfang bekannt).
  phone: "0151 2167 …",
  phoneHref: "", // z. B. "+49151216xxxxx" – leer lassen, solange die Nummer unvollständig ist
  domain: "mkdir-design.de",
  region: "Brandenburg",
};

// TODO: Endpreise nach Musterbestellung festlegen. Für Privatkunden müssen Preise inkl. MwSt. angezeigt werden.
export const priceNote = "Alle Preise inkl. MwSt., zzgl. Versand. Vorläufige Preise – Stand Oktober 2026.";

export type CardLine = {
  id: string;
  name: string;
  material: string;
  pitch: string;
  price: string;
  includes: string[];
  finish: "pvc" | "brushed" | "signature" | "exclusive";
  recommended?: boolean;
};

export const cardLines: CardLine[] = [
  {
    id: "digital",
    name: "MKDIR Digital",
    material: "PVC, matt",
    pitch: "Der Einstieg: NFC-Karte mit QR-Code und Ihrer digitalen Visitenkarte.",
    price: "149 €",
    includes: ["Karte im eigenen Design", "Digitale Visitenkarte", "QR-Code auf der Rückseite"],
    finish: "pvc",
  },
  {
    id: "metal",
    name: "MKDIR Metal",
    material: "Edelstahl, gebürstet",
    pitch: "Spürbares Gewicht und eine Gravur, die man nicht vergisst.",
    price: "249 €",
    includes: ["Metallkarte mit Lasergravur", "Digitale Visitenkarte", "NFC und QR-Code"],
    finish: "brushed",
  },
  {
    id: "signature",
    name: "MKDIR Signature",
    material: "Edelstahl schwarz, Goldveredelung",
    pitch: "Die Karte für Geschäftsführer: edel, persönlich und mit Betreuung.",
    price: "349 €",
    includes: ["Schwarze Metallkarte mit Goldveredelung", "Digitale Visitenkarte", "12 Monate Betreuung und Änderungen"],
    finish: "signature",
    recommended: true,
  },
  {
    id: "exclusive",
    name: "MKDIR Exclusive",
    material: "Sonderanfertigung",
    pitch: "Limitierte Editionen und Einzelstücke nach Ihren Wünschen.",
    price: "ab 499 €",
    includes: ["Material und Veredelung frei wählbar", "Persönliche Abstimmung", "Auf Wunsch eigene App dahinter"],
    finish: "exclusive",
  },
];

export const benefits = [
  { title: "Nie wieder neu drucken", text: "Neue Nummer, neue Adresse? Sie ändern die Daten online – die Karte bleibt dieselbe." },
  { title: "Ohne App", text: "Antippen genügt. Funktioniert mit aktuellen iPhones und Android-Geräten." },
  { title: "QR-Code inklusive", text: "Für ältere Handys liegt der QR-Code als zweiter Weg immer mit dabei." },
  { title: "Ihr eigenes Design", text: "Logo, Farben und Gravur werden für Sie gestaltet, nicht aus einem Baukasten." },
];

export const steps = [
  { title: "Design abstimmen", text: "Sie schicken Logo und Wünsche, ich schicke Ihnen einen Entwurf zur Freigabe." },
  { title: "Fertigung", text: "Die Karte wird gefertigt, programmiert und getestet." },
  { title: "Antippen", text: "Karte ans Handy halten – Ihr Kontakt öffnet sich sofort." },
  { title: "Selbst aktualisieren", text: "Daten, Fotos und Links ändern Sie jederzeit online." },
];

export const business = [
  {
    title: "Karten für das ganze Team",
    text: "Alle Mitarbeiterkarten zentral verwalten. Verlässt jemand die Firma, wird die Karte umgeschrieben statt neu gedruckt.",
  },
  {
    title: "Google-Bewertungen per NFC",
    text: "Aufsteller für Theke oder Tisch: Kunden tippen an und landen direkt bei Ihrer Bewertungsseite.",
  },
  {
    title: "Sonderlösungen",
    text: "Eigene Apps und Systeme hinter der Karte – vom Mitgliedsausweis bis zur Zugangskontrolle.",
  },
];

export const accessories = [
  { name: "NFC-Armbänder", use: "Events, Fitnessstudios, Vereine" },
  { name: "Schlüsselanhänger", use: "Kontakt immer am Schlüsselbund" },
  { name: "Tags und Sticker", use: "Für Handyhülle, Laptop oder Schaufenster" },
  { name: "Tischaufsteller", use: "Speisekarte, WLAN oder Instagram per Antippen" },
  { name: "Haustier-Marke", use: "Finder tippen an und erreichen Sie sofort" },
];

export const webServices = [
  { name: "Landingpage", price: "ab 700 €" },
  { name: "Firmenwebsite mit 3–5 Seiten", price: "ab 1.500 €" },
  { name: "Logo und Geschäftsausstattung", price: "ab 250 €" },
  { name: "Automatisierung mit WhatsApp und n8n", price: "auf Anfrage" },
];

export const mailto = (subject: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
