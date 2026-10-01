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

// Designbeispiele: KI-Visualisierungen (ChatGPT), bis echte Muster fotografiert sind.
// Bilder liegen in public/designs/. "technique" ehrlich halten: nur, was sich wirklich herstellen lässt.
export const designs = [
  { file: "tusche-burg.webp", name: "Tusche-Burg", technique: "Vollfarbdruck auf schwarzem PVC, Linien in Goldfolie", width: 1200, height: 751 },
  { file: "art-deco.webp", name: "Art déco", technique: "Goldfolie mit Prägung auf schwarz-cremefarbenem Karton", width: 1200, height: 686 },
  { file: "panther.webp", name: "Panther", technique: "Vollfarbdruck, Schriftzug in Goldfolie", width: 1200, height: 669 },
  { file: "architektur.webp", name: "Architektur", technique: "Kupferfolie auf nachtblauem Karton", width: 1200, height: 697 },
  { file: "schwarz-gold.webp", name: "Schwarz-Gold", technique: "Schwarzes Metall, Monogramm goldveredelt", width: 1200, height: 669 },
  { file: "holo-folie.webp", name: "Holo-Folie", technique: "Holografische Folie und Blindprägung auf Schwarz", width: 1200, height: 639 },
  { file: "kosmos-gold.webp", name: "Kosmos", technique: "Feine Linien in Goldfolie auf mattem Schwarz", width: 1200, height: 646 },
  { file: "acryl.webp", name: "Acryl", technique: "Mattiertes Acryl mit Silberdruck", width: 1200, height: 727 },
  { file: "smaragd.webp", name: "Smaragd", technique: "Mehrlagiger Karton, Goldfolie", width: 1200, height: 687 },
  { file: "letterpress.webp", name: "Letterpress", technique: "Tiefdruck und Blindprägung auf Naturkarton", width: 1200, height: 703 },
  { file: "edelstahl-m.webp", name: "Edelstahl", technique: "Gebürsteter Edelstahl, Monogramm tief gelasert und eingefärbt", width: 1200, height: 665 },
  { file: "art-deco-marmor.webp", name: "Art déco Marmor", technique: "Vollfarbdruck, Linien und Kreise in Goldfolie", width: 1200, height: 683 },
  { file: "kosmos-blau.webp", name: "Kosmos Blau", technique: "Goldfolie auf nachtblauem Karton, goldener Rand", width: 1200, height: 687 },
  { file: "topo-praegung.webp", name: "Topo-Prägung", technique: "Blindprägung auf Naturkarton, farbiger Kartenrand", width: 1151, height: 648 },
  { file: "holo-schwung.webp", name: "Holo-Schwung", technique: "Holografische Folie auf Schwarz", width: 1200, height: 704 },
  { file: "editorial.webp", name: "Editorial", technique: "Zweifarbdruck mit Neongelb auf Naturkarton", width: 1079, height: 661 },
  { file: "swiss-orange.webp", name: "Swiss Orange", technique: "Zweifarbdruck auf Naturkarton", width: 1200, height: 673 },
  { file: "kraft-berge.webp", name: "Kraft-Berge", technique: "Schwarzdruck mit Neongrün auf Kraftkarton", width: 1200, height: 672 },
  { file: "bauhaus-bogen.webp", name: "Bauhaus-Bogen", technique: "Dreifarbdruck, Kontur gestanzt", width: 1200, height: 673 },
  { file: "rose-acryl.webp", name: "Rosé-Acryl", technique: "Getöntes, mattiertes Acryl mit Weißdruck", width: 1200, height: 673 },
  { file: "kraftpapier.webp", name: "Kraftpapier", technique: "Zweifarbdruck auf Kraftkarton, farbiger Kartenrand", width: 1200, height: 651 },
  { file: "bauhaus.webp", name: "Bauhaus", technique: "Zweifarbdruck auf Naturkarton", width: 1200, height: 690 },
  { file: "neon-city.webp", name: "Neon-City", technique: "Vollfarbdruck, Logo in Silberfolie", width: 1200, height: 622 },
  { file: "rot-geometrie.webp", name: "Rot-Geometrie", technique: "Vollfarbdruck auf PVC, matt", width: 1200, height: 648 },
  { file: "chrom-glas.webp", name: "Chrom-Glas", technique: "Milchglas-PVC, Chrom-Effekt gedruckt", width: 1200, height: 667 },
  { file: "portraet-skyline.webp", name: "Skyline-Porträt", technique: "Vollfarbdruck, Akzente in Goldfolie", width: 1200, height: 650 },
  { file: "galaxie.webp", name: "Galaxie", technique: "Vollfarbdruck, Logo in Roségoldfolie", width: 1200, height: 751 },
  { file: "portraet-farbe.webp", name: "Farbexplosion", technique: "Vollfarbdruck, Schriftzug in Goldfolie", width: 1200, height: 751 },
  { file: "holo.webp", name: "Holo-Glitch", technique: "Holografische Folie auf Schwarz", width: 1200, height: 639 },
  { file: "neon.webp", name: "Neon", technique: "Vollfarbdruck – das Leuchten gibt es nur im Bild", width: 1200, height: 632 },
];

// So viele Entwürfe sind sofort sichtbar (der erste groß), der Rest kommt per Button.
export const designsVisible = 6;

// Karten-Deck im Hero: Jede Karte bringt ihr eigenes App-Design mit.
// Die Werte landen als CSS-Variablen auf dem Handy (siehe .phone in index.css).
export type AppTheme = {
  bg: string; // Hintergrund der App
  text: string;
  muted: string;
  accent: string; // Rahmen der Buttons
  accent2: string; // jeder zweite Button
  save: string; // Hintergrund "Kontakt speichern"
  saveText: string;
  font: "ink" | "display";
  glow: string; // Leuchten hinter der Bühne
  glow2: string;
};

export type DeckCard = {
  id: string;
  name: string;
  card: string; // Bild in public/designs
  cover: string; // Kopfbild der App in public/hero
  theme: AppTheme;
};

export const heroDeck: DeckCard[] = [
  {
    id: "tusche",
    name: "Tusche-Burg",
    card: "tusche-burg.webp",
    cover: "tusche-app.webp",
    theme: {
      bg: "#060607",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.6)",
      accent: "#2ef2ff",
      accent2: "#ff2fb4",
      save: "linear-gradient(90deg, #2ef2ff, #ff2fb4)",
      saveText: "#08080a",
      font: "ink",
      glow: "rgba(46,242,255,0.16)",
      glow2: "rgba(255,47,180,0.14)",
    },
  },
  {
    id: "artdeco",
    name: "Art déco",
    card: "art-deco.webp",
    cover: "art-deco-app.webp",
    theme: {
      bg: "#efe6d2",
      text: "#1a1408",
      muted: "#6b5a3a",
      accent: "#b8893a",
      accent2: "#1a1408",
      save: "linear-gradient(120deg, #f6dd97, #c99a45 45%, #8a6424 70%, #e9c878)",
      saveText: "#1a1206",
      font: "ink",
      glow: "rgba(214,176,98,0.2)",
      glow2: "rgba(214,176,98,0.1)",
    },
  },
  {
    id: "edelstahl",
    name: "Edelstahl",
    card: "edelstahl-m.webp",
    cover: "edelstahl-app.webp",
    theme: {
      bg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 3px), linear-gradient(160deg, #e4e5e8, #a9acb2 55%, #d6d8dc)",
      text: "#12233f",
      muted: "#44506a",
      accent: "#1d3a66",
      accent2: "#1d3a66",
      save: "#1d3a66",
      saveText: "#ffffff",
      font: "display",
      glow: "rgba(120,160,220,0.18)",
      glow2: "rgba(200,205,215,0.1)",
    },
  },
  {
    id: "holo",
    name: "Holo-Folie",
    card: "holo-folie.webp",
    cover: "holo-app.webp",
    theme: {
      bg: "#050505",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.6)",
      accent: "#7af0c8",
      accent2: "#c89bff",
      save: "linear-gradient(90deg, #ff8ad8, #ffe27a, #7af0c8, #7ab8ff, #c89bff)",
      saveText: "#0a0a0a",
      font: "display",
      glow: "rgba(122,240,200,0.14)",
      glow2: "rgba(200,155,255,0.18)",
    },
  },
  {
    id: "kosmos",
    name: "Kosmos",
    card: "kosmos-gold.webp",
    cover: "kosmos-app.webp",
    theme: {
      bg: "#08102a",
      text: "#f3dc9a",
      muted: "rgba(243,220,154,0.65)",
      accent: "#d6b062",
      accent2: "#d6b062",
      save: "linear-gradient(120deg, #f6dd97, #c99a45 45%, #8a6424 70%, #e9c878)",
      saveText: "#1a1206",
      font: "ink",
      glow: "rgba(70,100,220,0.2)",
      glow2: "rgba(214,176,98,0.12)",
    },
  },
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

// "Mehr aus der Karte machen": Die Karte ist nur der Schlüssel, dahinter läuft eigene Software.
// Bewusst NICHT im Angebot: Guthaben, das bei mehreren Geschäften gilt (wäre E-Geld, BaFin-Lizenz nötig).
export const loyalty = {
  title: "Treue- und Bonuskarte",
  text: "Die Stempelkarte aus Papier geht verloren, die NFC-Karte nicht. Ihre Kunden tippen beim Bezahlen an und sammeln Punkte – der zehnte Kaffee oder die zehnte Wäsche geht aufs Haus.",
  points: [
    "Für Tankstellen, Bäckereien, Cafés und Friseure",
    "Punkte und Prämien legen Sie selbst fest",
    "Sie sehen, wie oft Ihre Stammkunden wiederkommen",
  ],
  price: "Karten plus monatliches System-Abo",
  stamps: { total: 10, filled: 7 },
};

export const cardIdeas = [
  {
    title: "Gutscheinkarte",
    text: "Geschenkkarte in Ihrem Design. Antippen zeigt das Restguthaben – eingelöst wird in Ihrem Geschäft.",
    for: "Handel, Gastronomie, Studios",
  },
  {
    title: "Gewinnspiel beim Antippen",
    text: "Glücksrad oder Rubbellos direkt im Browser. Ein Marketing-Gag, über den Ihre Kunden reden.",
    for: "Aktionen, Eröffnungen, Messen",
  },
  {
    title: "Sammelkarten",
    text: "Jede Karte schaltet eigene Inhalte frei: Video, Song, Autogramm oder Rabatt.",
    for: "Vereine, Events, Musiker",
  },
  {
    title: "NFC-Schnitzeljagd",
    text: "Stationen mit NFC-Tags verteilen, Teilnehmer sammeln sie per Antippen. Mit Rangliste auf Wunsch.",
    for: "Firmenfeiern, Kindergeburtstage, Stadtmarketing",
  },
];

export const securityNote = {
  title: "Kopiergeschützt, wo es um Werte geht",
  text: "Für Punkte, Guthaben, Mitgliedsausweise und Zutritt nutze ich NFC-Chips vom Typ NTAG 424 DNA. Sie erzeugen bei jedem Antippen einen neuen Code, den der Server prüft – eine kopierte Karte ist wertlos.",
};

// NFC-Armbänder: vier Einsatzzwecke. Farbe und Aufdruck steuern die Armband-Grafik,
// "tap" ist das, was sich beim Antippen öffnet.
export type Wristband = {
  id: string;
  name: string;
  for: string;
  text: string;
  band: string; // Farbe des Armbands
  ink: string; // Farbe des Aufdrucks
  label: string; // Aufdruck auf dem Armband
  tap: { title: string; lines: string[] };
  note?: string;
};

export const wristbands: Wristband[] = [
  {
    id: "event",
    name: "Event & Festival",
    for: "Festivals, Konzerte, Firmenfeiern",
    text: "Ticket, Einlass und VIP-Bereich am Handgelenk. Bezahlen am Stand funktioniert innerhalb Ihres Events.",
    band: "#ff2fb4",
    ink: "#1a0612",
    label: "FESTIVAL · VIP · EINLASS",
    tap: { title: "Ticket gültig", lines: ["Einlass: Haupteingang", "VIP-Bereich freigeschaltet", "Guthaben am Stand: 24,50 €"] },
  },
  {
    id: "fitness",
    name: "Fitness & Verein",
    for: "Fitnessstudios, Sportvereine, Schwimmbäder",
    text: "Mitgliedsausweis und Spindschlüssel in einem. Wasserfest, rutscht nicht und geht nicht verloren.",
    band: "#2c2c31",
    ink: "#d6b062",
    label: "MITGLIED · SPIND 042",
    tap: { title: "Mitgliedschaft aktiv", lines: ["Spind 042 öffnen", "Nächster Kurs: Spinning 18 Uhr", "Check-in gespeichert"] },
  },
  {
    id: "notfall",
    name: "Notfall",
    for: "Ältere Menschen, Sportler, Allergiker",
    text: "Helfer tippen an und erreichen sofort Ihren Notfallkontakt – auch wenn Sie selbst nicht sprechen können.",
    band: "#d7263d",
    ink: "#ffffff",
    label: "NOTFALL · BITTE ANTIPPEN",
    tap: { title: "Notfallkontakt", lines: ["Sabine (Tochter) anrufen", "Standort per SMS senden", "Hinweis: bitte Notruf 112 wählen"] },
    note: "Gesundheitsdaten speichere ich nicht. Sie legen nur fest, wer angerufen wird.",
  },
  {
    id: "kinder",
    name: "Kinder",
    for: "Freizeitpark, Strand, Ausflüge",
    text: "Verloren gegangen? Jeder Erwachsene tippt an und erreicht sofort die Eltern. Ohne Akku, ohne Ortung.",
    band: "#2ec4ff",
    ink: "#04202c",
    label: "HALLO, ICH BIN LEO",
    tap: { title: "Hallo, ich bin Leo!", lines: ["Bitte ruf meine Mama an", "Anrufen: Mama", "Danke fürs Helfen!"] },
  },
];

export const gpsNote =
  "GPS-Kinderarmband mit Ortung ist in Vorbereitung – erst wenn Datenschutz und Zulassung sauber geklärt sind.";

export const accessories = [
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
