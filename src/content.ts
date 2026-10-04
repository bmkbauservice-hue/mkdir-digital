import type { PageId } from "./router";

// Alle Texte, Preise und Kontaktdaten der Seite an einem Ort.
// Wer etwas ändern will, ändert es hier – die Komponenten lesen nur aus dieser Datei.

// Angaben für Datenschutz (und später Impressum).
// TODO: ladungsfähige Anschrift eintragen – ohne Anschrift sind Impressum und Datenschutz unvollständig.
export const legal = {
  name: "Mario Kujoth",
  business: "MKDIR Design – NFC-Karten & Webdesign",
  street: "", // TODO: ladungsfähige Anschrift (kein Postfach), z. B. "Musterstraße 1"
  city: "", // z. B. "12345 Musterstadt"
  vatId: "", // USt-IdNr., sobald vom Finanzamt vergeben – dann erscheint sie im Impressum
  privacyDate: "Oktober 2026",
};

export const contact = {
  email: "IT-mkdir@proton.me",
  phone: "0151 21679480",
  phoneHref: "+4915121679480",
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
  { file: "tusche-burg.webp", name: "Tusche-Burg", technique: "Vollfarbdruck auf schwarzem PVC, Linien in Goldfolie", width: 1200, height: 706 },
  { file: "art-deco.webp", name: "Art déco", technique: "Goldfolie mit Prägung auf schwarz-cremefarbenem Karton", width: 1200, height: 706 },
  { file: "panther.webp", name: "Panther", technique: "Vollfarbdruck, Schriftzug in Goldfolie", width: 1200, height: 706 },
  { file: "architektur.webp", name: "Architektur", technique: "Kupferfolie auf nachtblauem Karton", width: 1200, height: 706 },
  { file: "schwarz-gold.webp", name: "Schwarz-Gold", technique: "Schwarzes Metall, Monogramm goldveredelt", width: 1200, height: 706 },
  { file: "holo-folie.webp", name: "Holo-Folie", technique: "Holografische Folie und Blindprägung auf Schwarz", width: 1200, height: 706 },
  { file: "kosmos-gold.webp", name: "Kosmos", technique: "Feine Linien in Goldfolie auf mattem Schwarz", width: 1200, height: 706 },
  { file: "acryl.webp", name: "Acryl", technique: "Mattiertes Acryl mit Silberdruck", width: 1200, height: 706 },
  { file: "smaragd.webp", name: "Smaragd", technique: "Mehrlagiger Karton, Goldfolie", width: 1200, height: 706 },
  { file: "letterpress.webp", name: "Letterpress", technique: "Tiefdruck und Blindprägung auf Naturkarton", width: 1200, height: 706 },
  { file: "edelstahl-m.webp", name: "Edelstahl", technique: "Gebürsteter Edelstahl, Monogramm tief gelasert und eingefärbt", width: 1200, height: 706 },
  { file: "art-deco-marmor.webp", name: "Art déco Marmor", technique: "Vollfarbdruck, Linien und Kreise in Goldfolie", width: 1200, height: 706 },
  { file: "kosmos-blau.webp", name: "Kosmos Blau", technique: "Goldfolie auf nachtblauem Karton, goldener Rand", width: 1200, height: 706 },
  { file: "topo-praegung.webp", name: "Topo-Prägung", technique: "Blindprägung auf Naturkarton, farbiger Kartenrand", width: 1200, height: 706 },
  { file: "holo-schwung.webp", name: "Holo-Schwung", technique: "Holografische Folie auf Schwarz", width: 1200, height: 706 },
  { file: "editorial.webp", name: "Editorial", technique: "Zweifarbdruck mit Neongelb auf Naturkarton", width: 1200, height: 706 },
  { file: "swiss-orange.webp", name: "Swiss Orange", technique: "Zweifarbdruck auf Naturkarton", width: 1200, height: 706 },
  { file: "kraft-berge.webp", name: "Kraft-Berge", technique: "Schwarzdruck mit Neongrün auf Kraftkarton", width: 1200, height: 706 },
  { file: "bauhaus-bogen.webp", name: "Bauhaus-Bogen", technique: "Dreifarbdruck, Kontur gestanzt", width: 1200, height: 706 },
  { file: "rose-acryl.webp", name: "Rosé-Acryl", technique: "Getöntes, mattiertes Acryl mit Weißdruck", width: 1200, height: 706 },
  { file: "kraftpapier.webp", name: "Kraftpapier", technique: "Zweifarbdruck auf Kraftkarton, farbiger Kartenrand", width: 1200, height: 706 },
  { file: "bauhaus.webp", name: "Bauhaus", technique: "Zweifarbdruck auf Naturkarton", width: 1200, height: 706 },
  { file: "neon-city.webp", name: "Neon-City", technique: "Vollfarbdruck, Logo in Silberfolie", width: 1200, height: 706 },
  { file: "rot-geometrie.webp", name: "Rot-Geometrie", technique: "Vollfarbdruck auf PVC, matt", width: 1200, height: 706 },
  { file: "chrom-glas.webp", name: "Chrom-Glas", technique: "Milchglas-PVC, Chrom-Effekt gedruckt", width: 1200, height: 706 },
  { file: "portraet-skyline.webp", name: "Skyline-Porträt", technique: "Vollfarbdruck, Akzente in Goldfolie", width: 1200, height: 706 },
  { file: "galaxie.webp", name: "Galaxie", technique: "Vollfarbdruck, Logo in Roségoldfolie", width: 1200, height: 706 },
  { file: "portraet-farbe.webp", name: "Farbexplosion", technique: "Vollfarbdruck, Schriftzug in Goldfolie", width: 1200, height: 706 },
  { file: "holo.webp", name: "Holo-Glitch", technique: "Holografische Folie auf Schwarz", width: 1200, height: 706 },
  { file: "neon.webp", name: "Neon", technique: "Vollfarbdruck – das Leuchten gibt es nur im Bild", width: 1200, height: 706 },
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
  // Erklär-Animation: So sieht die App aus, wenn das Armband ans Handy gehalten wird (Neon-Look).
  app: { icon: string; status: string; action: string; toast: string; theme: DemoTheme };
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
    app: {
      icon: "✓",
      status: "Summer Beats · Tag 2",
      action: "Am Stand bezahlen",
      toast: "Bezahlt: 2 × Limo, 7,00 € – Guthaben 17,50 €",
      theme: {
        bg: "radial-gradient(90% 50% at 50% 0%, rgba(255,47,180,0.35), transparent 70%), linear-gradient(rgba(46,242,255,0.06) 1px, transparent 1px) 0 0 / 100% 22px, linear-gradient(170deg, #1a0430, #08020f)",
        surface: "rgba(255,47,180,0.08)",
        text: "#fff0fa",
        muted: "rgba(255,240,250,0.62)",
        accent: "#ff2fb4",
        accent2: "#2ef2ff",
        accentText: "#1a0612",
        line: "rgba(255,47,180,0.4)",
        font: "display",
      },
    },
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
    app: {
      icon: "★",
      status: "Mitglied seit 2024",
      action: "Spind 042 öffnen",
      toast: "Spind 042 ist offen – viel Spaß beim Training!",
      theme: {
        bg: "radial-gradient(90% 50% at 50% 0%, rgba(61,255,194,0.28), transparent 70%), repeating-linear-gradient(135deg, rgba(198,255,61,0.04) 0 2px, transparent 2px 14px), linear-gradient(170deg, #04140f, #010805)",
        surface: "rgba(61,255,194,0.07)",
        text: "#eafff8",
        muted: "rgba(234,255,248,0.6)",
        accent: "#3dffc2",
        accent2: "#c6ff3d",
        accentText: "#02140d",
        line: "rgba(61,255,194,0.38)",
        font: "display",
      },
    },
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
    app: {
      icon: "✚",
      status: "Bitte helfen Sie mir",
      action: "Sabine anrufen",
      toast: "Anruf an Sabine wird gestartet …",
      theme: {
        bg: "radial-gradient(90% 50% at 50% 0%, rgba(255,51,85,0.38), transparent 70%), linear-gradient(170deg, #1f0307, #0a0103)",
        surface: "rgba(255,51,85,0.08)",
        text: "#fff1f3",
        muted: "rgba(255,241,243,0.62)",
        accent: "#ff3355",
        accent2: "#ffd23d",
        accentText: "#ffffff",
        line: "rgba(255,51,85,0.42)",
        font: "display",
      },
    },
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
    app: {
      icon: "☺",
      status: "Ich habe mich verlaufen",
      action: "Mama anrufen",
      toast: "Mama wird angerufen – danke fürs Helfen!",
      theme: {
        bg: "radial-gradient(90% 50% at 50% 0%, rgba(46,196,255,0.34), transparent 70%), radial-gradient(circle at 15% 85%, rgba(255,226,61,0.14) 0 40px, transparent 41px), linear-gradient(170deg, #031a2b, #010a12)",
        surface: "rgba(46,196,255,0.08)",
        text: "#eefaff",
        muted: "rgba(238,250,255,0.62)",
        accent: "#2ec4ff",
        accent2: "#ffe23d",
        accentText: "#04202c",
        line: "rgba(46,196,255,0.4)",
        font: "display",
      },
    },
  },
];

// Armband-Beispiele (KI-Visualisierungen, ChatGPT). Bilder in public/bands/.
export const bandDesigns = [
  { file: "festival.webp", name: "Festival · VIP", technique: "Neon-Silikon, Siebdruck, NFC-Kapsel", width: 1200, height: 800 },
  { file: "mitglied.webp", name: "Mitglied", technique: "Schwarzes Silikon, Prägung mit Goldfüllung, Metall-Clip", width: 1200, height: 800 },
  { file: "premium.webp", name: "Premium", technique: "Schwarzes Silikon, Blindprägung, goldener Clip", width: 1200, height: 900 },
  { file: "kinder.webp", name: "Kinder", technique: "Hellblaues Silikon, Zweifarbdruck, NFC-Kapsel", width: 1200, height: 900 },
  { file: "night-run.webp", name: "Night Run", technique: "Glow-in-the-dark-Silikon, Siebdruck", width: 1200, height: 900 },
  { file: "swirl.webp", name: "Swirl", technique: "Zweifarb-Silikon marmoriert, NFC-Symbol gedruckt", width: 1200, height: 900 },
];

// Single-Karten: Karte hinlegen, die andere Person tippt an, sieht das Profil und antwortet.
// Bilder in public/single/ (KI-Visualisierungen, ChatGPT).
export const singleCards = {
  him: [
    { file: "fingerabdruck.webp", name: "Fingerabdruck", technique: "Mattschwarz, Roségoldfolie", width: 1200, height: 706 },
    { file: "sternbild.webp", name: "Sternbild", technique: "Nachtblau, Goldfolie", width: 1200, height: 706 },
    { file: "schwarz-gold.webp", name: "Schwarz-Gold", technique: "Schwarzes Metall, Goldveredelung", width: 1200, height: 706 },
    { file: "bar-schild.webp", name: "Bar-Schild", technique: "Dunkelgrün, Goldfolie, Art-déco-Rahmen", width: 1200, height: 706 },
    { file: "origami.webp", name: "Origami", technique: "Strukturkarton, Roségoldfolie mit Prägung", width: 1200, height: 706 },
    { file: "eintrittskarte.webp", name: "Eintrittskarte", technique: "Vintage-Ticket, gestanzter Abriss", width: 1200, height: 706 },
    { file: "puzzle.webp", name: "Puzzleteil", technique: "Creme, Goldfolie mit Prägung", width: 1200, height: 706 },
    { file: "wachssiegel.webp", name: "Wachssiegel", technique: "Weinrot mit Leinenstruktur, Goldfolie", width: 1200, height: 706 },
    { file: "pop-art.webp", name: "Pop-Art", technique: "Vollfarbdruck in Neongelb und Pink, matt", width: 1200, height: 706 },
  ],
  her: [
    { file: "sie-lippenstift.webp", name: "Lippenstift", technique: "Mattschwarz, roter Spot-UV-Lack", width: 1200, height: 706 },
    { file: "sie-schachdame.webp", name: "Schachdame", technique: "Creme, Goldfolie mit Prägung", width: 1200, height: 706 },
    { file: "sie-mondphasen.webp", name: "Mondphasen", technique: "Mitternachtsblau, Silberfolie", width: 1200, height: 706 },
    { file: "sie-champagner.webp", name: "Champagner", technique: "Mattschwarz, Goldfolie", width: 1200, height: 706 },
    { file: "sie-pfingstrose.webp", name: "Pfingstrose", technique: "Salbeigrün, Roségoldfolie", width: 1200, height: 706 },
    { file: "sie-erster-schritt.webp", name: "Erster Schritt", technique: "Puderbeige, Blindprägung", width: 1200, height: 706 },
    { file: "sie-kristall-acryl.webp", name: "Kristall", technique: "Mattiertes Acryl, Silberdruck", width: 1200, height: 706 },
    { file: "sie-terrazzo.webp", name: "Terrazzo", technique: "Naturkarton, Vierfarbdruck", width: 1200, height: 706 },
    { file: "sie-comic.webp", name: "Comic-Heldin", technique: "Vollfarbdruck im Retro-Comic-Stil", width: 1200, height: 706 },
  ],
};

export const singleAnswers = ["Kaffee? Gern!", "Lass uns essen gehen", "Vielleicht", "Nein, danke"];

export const singleRules = [
  "Ihr Profil mit Fotos gestalten Sie selbst – und nehmen es mit einem Klick offline.",
  "Die andere Person antwortet anonym – ihre Nummer gibt sie nur freiwillig an.",
  "Ein Nein ist ein Nein: kein Nachschreiben über die Karte.",
  "Keine Ortung, keine Suche nach anderen Profilen, nur ab 18.",
];

// ---------- Single-App (Demo) ----------
// Das sieht die Person, die die Single-Karte antippt: Profil mit Fotos, kurzer Text, eine Frage.
// Die Profile sind ausgedacht. Fotos sind gezeichnete Platzhalter-Motive (scene),
// bis echte Bilder da sind: dann Datei nach public/single-profil/ legen und `image` setzen,
// z. B. { scene: "portrait", image: "jonas-1.webp", caption: "…" } – das Bild ersetzt das Motiv.
// WICHTIG: Sobald es die App wirklich gibt (Server, echte Fotos, Antworten),
// muss die Datenschutzerklärung erweitert werden.
export type ProfileScene = "portrait" | "meer" | "berge" | "kaffee" | "konzert" | "stadt";

export type ProfilePhoto = { scene: ProfileScene; caption: string; image?: string };

// Look der App in den Erklär-Animationen – passend zur Karte, wie beim Hero-Deck.
// bg darf ein ganzer CSS-Hintergrund sein (Verläufe, Muster).
export type DemoTheme = {
  bg: string;
  surface: string; // Flächen und Buttons in der App
  text: string;
  muted: string;
  accent: string; // Hauptfarbe (Rahmen, Hervorhebung)
  accent2: string; // zweite Farbe
  accentText: string; // Schrift auf der Hauptfarbe
  line: string; // dünne Rahmen
  font: "ink" | "display";
};

export type SingleProfile = {
  id: string;
  name: string;
  age: number;
  place: string;
  look: "him" | "her"; // für das gezeichnete Porträt und die Beschriftung
  card: string; // Kartenbild aus public/single – so sieht auch die App aus
  cardName: string;
  question: string;
  bio: string;
  tags: string[];
  photos: ProfilePhoto[];
  theme: DemoTheme;
};

// Fünf Demo-Profile (ausgedacht): drei Männer, zwei Frauen. Die Animation wechselt nach jeder Runde weiter.
export const singleProfiles: SingleProfile[] = [
  {
    id: "jonas",
    name: "Jonas",
    age: 34,
    place: "Potsdam",
    look: "him",
    card: "schwarz-gold.webp",
    cardName: "Schwarz-Gold",
    question: "Hast du Lust?",
    bio: "Koche besser, als ich tanze. Suche jemanden für Sonntagsfrühstück und spontane Ostsee-Trips.",
    tags: ["Kochen", "Ostsee", "Konzerte", "Hunde"],
    photos: [
      { scene: "portrait", caption: "Das bin ich" },
      { scene: "meer", caption: "Warnemünde, 21 Uhr" },
      { scene: "kaffee", caption: "Mein Sonntag" },
      { scene: "konzert", caption: "Lieber vorne als hinten" },
    ],
    theme: {
      bg: "repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px), linear-gradient(160deg, #1a1a1c, #0a0a0b 60%, #141414)",
      surface: "rgba(255,255,255,0.04)",
      text: "#f3e6c4",
      muted: "rgba(243,230,196,0.62)",
      accent: "#d4a85a",
      accent2: "#f1d48f",
      accentText: "#1a1206",
      line: "rgba(212,168,90,0.45)",
      font: "ink",
    },
  },
  {
    id: "malik",
    name: "Malik",
    age: 31,
    place: "Leipzig",
    look: "him",
    card: "sternbild.webp",
    cardName: "Sternbild",
    question: "Lust, mit mir Sterne zu zählen?",
    bio: "Hobby-Astronom mit Thermoskanne. Ich zeig dir den Großen Wagen, du mir deinen Lieblingsort.",
    tags: ["Sterne", "Camping", "Fahrrad", "Kochen"],
    photos: [
      { scene: "portrait", caption: "Das bin ich" },
      { scene: "berge", caption: "Sonnenaufgang im Harz" },
      { scene: "stadt", caption: "Mein Viertel bei Nacht" },
      { scene: "kaffee", caption: "Erst Kaffee, dann reden" },
    ],
    theme: {
      bg: "radial-gradient(1.2px 1.2px at 20% 18%, #fff8, transparent), radial-gradient(1px 1px at 72% 9%, #fff9, transparent), radial-gradient(1.4px 1.4px at 86% 34%, #f3dc9a, transparent), radial-gradient(1px 1px at 38% 52%, #fff7, transparent), radial-gradient(1.2px 1.2px at 12% 78%, #fff6, transparent), radial-gradient(1px 1px at 64% 88%, #f3dc9a, transparent), linear-gradient(170deg, #13254a, #0b1730 65%, #0a1328)",
      surface: "rgba(255,255,255,0.05)",
      text: "#f1e4c3",
      muted: "rgba(241,228,195,0.62)",
      accent: "#e2be72",
      accent2: "#f6e2a8",
      accentText: "#14203a",
      line: "rgba(226,190,114,0.42)",
      font: "ink",
    },
  },
  {
    id: "tim",
    name: "Tim",
    age: 38,
    place: "Cottbus",
    look: "him",
    card: "pop-art.webp",
    cardName: "Pop-Art",
    question: "Lust auf ein Abenteuer?",
    bio: "Lache laut, tanze schlecht, komme pünktlich. Comics, Flohmärkte und Currywurst um Mitternacht.",
    tags: ["Comics", "Flohmarkt", "Festivals", "Kino"],
    photos: [
      { scene: "portrait", caption: "Das bin ich" },
      { scene: "konzert", caption: "Festival-Saison!" },
      { scene: "stadt", caption: "Nachtschicht im Kiez" },
      { scene: "meer", caption: "Ostsee mit Pommes" },
    ],
    theme: {
      bg: "radial-gradient(circle, rgba(255,47,143,0.35) 1.2px, transparent 1.6px) 0 0 / 9px 9px, #ffe600",
      surface: "#ffffff",
      text: "#141414",
      muted: "rgba(20,20,20,0.7)",
      accent: "#ff2f8f",
      accent2: "#141414",
      accentText: "#ffffff",
      line: "#141414",
      font: "display",
    },
  },
  {
    id: "lena",
    name: "Lena",
    age: 31,
    place: "Berlin",
    look: "her",
    card: "sie-lippenstift.webp",
    cardName: "Lippenstift",
    question: "Diesmal frag ich: Hast du Lust?",
    bio: "Bergmensch mit Großstadtadresse. Ich bring den Kaffee mit, du die Geschichten.",
    tags: ["Wandern", "Fotografie", "Brunch", "Jazz"],
    photos: [
      { scene: "portrait", caption: "Das bin ich" },
      { scene: "berge", caption: "Zugspitze, 5:40 Uhr" },
      { scene: "stadt", caption: "Mein Kiez bei Nacht" },
      { scene: "kaffee", caption: "Flat White, sonst nichts" },
    ],
    theme: {
      bg: "radial-gradient(80% 40% at 50% 0%, rgba(179,18,46,0.22), transparent 70%), linear-gradient(170deg, #1b1b1b, #0e0e0e)",
      surface: "rgba(255,255,255,0.05)",
      text: "#f5f2ef",
      muted: "rgba(245,242,239,0.6)",
      accent: "#c4142f",
      accent2: "#ff5a6e",
      accentText: "#ffffff",
      line: "rgba(196,20,47,0.55)",
      font: "ink",
    },
  },
  {
    id: "sophie",
    name: "Sophie",
    age: 28,
    place: "Dresden",
    look: "her",
    card: "sie-mondphasen.webp",
    cardName: "Mondphasen",
    question: "Diesmal frag ich: Spaziergang bei Vollmond?",
    bio: "Nachtmensch und Buchhändlerin. Erzähl mir etwas, das in keinem Buch steht.",
    tags: ["Bücher", "Elbufer", "Yoga", "Fotografie"],
    photos: [
      { scene: "portrait", caption: "Das bin ich" },
      { scene: "meer", caption: "Abends an der Elbe" },
      { scene: "berge", caption: "Sächsische Schweiz" },
      { scene: "kaffee", caption: "Lesepause" },
    ],
    theme: {
      bg: "radial-gradient(90% 45% at 50% 0%, rgba(201,209,220,0.14), transparent 70%), linear-gradient(170deg, #182a48, #0e1c34 65%, #0b1629)",
      surface: "rgba(255,255,255,0.05)",
      text: "#e9edf3",
      muted: "rgba(233,237,243,0.62)",
      accent: "#c9d1dc",
      accent2: "#ffffff",
      accentText: "#0e1c34",
      line: "rgba(201,209,220,0.4)",
      font: "ink",
    },
  },
];

export const gpsNote =
  "GPS-Kinderarmband mit Ortung ist in Vorbereitung – erst wenn Datenschutz und Zulassung sauber geklärt sind.";

// ---------- Spielekarte (IN VORBEREITUNG) ----------
// Die Spiele liegen nicht auf dem Chip, sondern als freigeschaltete Rechte zur Karten-Nummer
// auf dem Server – so lassen sich später weitere Spiele nachbuchen, ohne neue Karte.
// TODO Preise festlegen, sobald die ersten Spiele laufen. Bis dahin nur Warteliste.

export type GameCategory = "klassiker" | "karten" | "party" | "familie";

export const gameCategories: { id: GameCategory; name: string; text: string }[] = [
  { id: "klassiker", name: "Klassiker", text: "Brettspiele für zwei, die jeder kennt" },
  { id: "karten", name: "Kartenspiele", text: "Für den Stammtisch und lange Abende" },
  { id: "party", name: "Würfel & Party", text: "Laut, schnell, für die ganze Runde" },
  { id: "familie", name: "Familie & Kinder", text: "Einfach erklärt, ab 6 Jahren" },
];

// status: "geplant" = steht auf der To-do-Liste, "in Arbeit", "fertig"
export const games: { id: string; name: string; category: GameCategory; players: string; status: "geplant" | "in Arbeit" | "fertig" }[] = [
  { id: "tictactoe", name: "Tic Tac Toe", category: "klassiker", players: "2", status: "geplant" },
  { id: "vier", name: "Vier in einer Reihe", category: "klassiker", players: "2", status: "geplant" },
  { id: "muehle", name: "Mühle", category: "klassiker", players: "2", status: "geplant" },
  { id: "dame", name: "Dame", category: "klassiker", players: "2", status: "geplant" },
  { id: "schach", name: "Schach", category: "klassiker", players: "2", status: "geplant" },
  { id: "backgammon", name: "Backgammon", category: "klassiker", players: "2", status: "geplant" },
  { id: "maumau", name: "Mau Mau", category: "karten", players: "2–6", status: "geplant" },
  { id: "skat", name: "Skat", category: "karten", players: "3", status: "geplant" },
  { id: "elferraus", name: "Elfer raus", category: "karten", players: "2–6", status: "geplant" },
  { id: "schwimmen", name: "Schwimmen (31)", category: "karten", players: "2–8", status: "geplant" },
  { id: "knack", name: "Knack", category: "karten", players: "2–6", status: "geplant" },
  { id: "romme", name: "Rommé", category: "karten", players: "2–6", status: "geplant" },
  { id: "wuerfelpoker", name: "Würfelpoker", category: "party", players: "1–6", status: "geplant" },
  { id: "rausmitdir", name: "Raus mit dir!", category: "party", players: "2–4", status: "geplant" },
  { id: "stadtland", name: "Stadt, Land, Fluss", category: "party", players: "2–10", status: "geplant" },
  { id: "quiz", name: "Kneipenquiz", category: "party", players: "2–10", status: "geplant" },
  { id: "burgduell", name: "Burgduell", category: "party", players: "2", status: "geplant" },
  { id: "memory", name: "Memory", category: "familie", players: "1–4", status: "geplant" },
  { id: "schiffe", name: "Schiffe versenken", category: "familie", players: "2", status: "geplant" },
  { id: "woerter", name: "Wörter raten", category: "familie", players: "2–6", status: "geplant" },
  { id: "malen", name: "Malen & Raten", category: "familie", players: "3–8", status: "geplant" },
  { id: "bingo", name: "Bingo", category: "familie", players: "2–20", status: "geplant" },
];

export const gamePackSizes = [
  { size: 3, name: "Start", text: "3 Spiele inklusive" },
  { size: 5, name: "5er-Paket", text: "Fünf Spiele nach Wahl" },
  { size: 10, name: "10er-Paket", text: "Zehn Spiele nach Wahl" },
  { size: 99, name: "Alle Spiele", text: "Alles, auch alle neuen" },
];

// Vier Kartenvarianten. Mit "image" (public/spiele/) wird das ChatGPT-Bild gezeigt,
// ohne Bild die gezeichnete CSS-Karte als Platzhalter. "theme" = Look der App in der Erklär-Animation.
export const gameCardVariants: { id: string; name: string; text: string; symbol: string; image?: string; theme: DemoTheme }[] = [
  {
    id: "spieltisch",
    name: "Spieltisch",
    text: "Grüner Filz, Goldprägung – wie im Casino",
    symbol: "♠",
    image: "spieltisch.webp",
    theme: {
      bg: "radial-gradient(120% 70% at 50% 30%, #1d6b40, #0f4a2c 55%, #0a3520)",
      surface: "rgba(0,0,0,0.24)",
      text: "#f6e7b8",
      muted: "rgba(246,231,184,0.68)",
      accent: "#e0b754",
      accent2: "#fff4d6",
      accentText: "#1a1206",
      line: "rgba(224,183,84,0.5)",
      font: "ink",
    },
  },
  {
    id: "arcade",
    name: "Neon-Arcade",
    text: "Pixel, Neon und Highscore-Gefühl",
    symbol: "▶",
    image: "arcade.webp",
    theme: {
      bg: "linear-gradient(rgba(46,242,255,0.07) 1px, transparent 1px) 0 0 / 100% 18px, linear-gradient(90deg, rgba(255,47,180,0.07) 1px, transparent 1px) 0 0 / 18px 100%, linear-gradient(170deg, #1b0d44, #0d0626)",
      surface: "rgba(46,242,255,0.06)",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.65)",
      accent: "#2ef2ff",
      accent2: "#ff2fb4",
      accentText: "#0d0626",
      line: "rgba(46,242,255,0.55)",
      font: "display",
    },
  },
  {
    id: "kneipe",
    name: "Stammtisch",
    text: "Dunkles Holz und Bierdeckel-Charme",
    symbol: "♣",
    image: "stammtisch.webp",
    theme: {
      bg: "repeating-linear-gradient(90deg, rgba(0,0,0,0.16) 0 2px, transparent 2px 23px), linear-gradient(170deg, #5a3820, #3a2414 60%, #2a190d)",
      surface: "#1f2a24",
      text: "#f3e2bf",
      muted: "rgba(243,226,191,0.68)",
      accent: "#e8b04a",
      accent2: "#f7f1e3",
      accentText: "#2a190d",
      line: "rgba(232,176,74,0.5)",
      font: "ink",
    },
  },
  {
    id: "familie",
    name: "Familie",
    text: "Bunt, rund und kinderleicht",
    symbol: "★",
    theme: {
      bg: "radial-gradient(circle at 100% 0%, rgba(255,210,63,0.45) 0 70px, transparent 71px), radial-gradient(circle at 0% 55%, rgba(43,179,255,0.18) 0 44px, transparent 45px), radial-gradient(circle at 100% 100%, rgba(255,107,74,0.2) 0 90px, transparent 91px), #fff6e5",
      surface: "#ffffff",
      text: "#2b2140",
      muted: "rgba(43,33,64,0.65)",
      accent: "#ff6b4a",
      accent2: "#2bb3ff",
      accentText: "#ffffff",
      line: "rgba(43,33,64,0.18)",
      font: "display",
    },
  },
];

// Startseite: eine Kachel pro Produktwelt, jede führt auf ihre Unterseite (siehe router.ts).
// image = Bild aus public/<folder>/ (es wird automatisch die kleine -600-Fassung geladen), sonst symbol.
export const worlds: {
  page: Exclude<PageId, "start" | "impressum" | "datenschutz">;
  section?: string;
  title: string;
  text: string;
  image?: { folder: string; file: string };
  symbol?: string;
  badge?: string;
}[] = [
  { page: "karten", title: "NFC-Visitenkarten", text: "Vier Kartenlinien von PVC bis Gold, 30 Designs zum Anschauen.", image: { folder: "designs", file: "tusche-burg.webp" } },
  { page: "karten", section: "single-karten", title: "Single-Karten", text: "Ich bin ein Unikat. Kennenlernen per Antippen.", image: { folder: "single", file: "fingerabdruck.webp" } },
  { page: "karten", section: "spielekarte", title: "Spielekarte", text: "Gesellschaftsspiele zum Antippen – fürs ganze Team.", image: { folder: "spiele", file: "spieltisch.webp" }, badge: "Bald" },
  { page: "armbaender", title: "NFC-Armbänder", text: "Festival, Verein, Notfall und Kinder – wasserfest und ohne Akku.", image: { folder: "bands", file: "festival.webp" } },
  { page: "zubehoer", title: "Zubehör", text: "Tischaufsteller, Schlüsselanhänger, Sticker und Haustier-Marken.", symbol: "◎" },
  { page: "unternehmen", title: "Für Unternehmen", text: "Teamkarten, Google-Bewertungen, Treue- und Gutscheinkarten.", image: { folder: "designs", file: "edelstahl-m.webp" } },
  { page: "webdesign", title: "Webdesign", text: "Websites, Logos und Automatisierung aus einer Hand.", symbol: "</>" },
];

export const accessories: { name: string; use: string; section?: string }[] = [
  { name: "Schlüsselanhänger", use: "Kontakt immer am Schlüsselbund", section: "schluesselanhaenger" },
  { name: "Tags und Sticker", use: "Für Handyhülle, Laptop oder Schaufenster", section: "tags-sticker" },
  { name: "Tischaufsteller", use: "Speisekarte, WLAN oder Instagram per Antippen", section: "tischaufsteller" },
  { name: "Haustier-Marke", use: "Finder tippen an und erreichen Sie sofort", section: "haustier-marken" },
];

// Schlüsselanhänger mit NFC-Chip – einzeln aus einem ChatGPT-Bild geschnitten (public/anhaenger/, 600 × 800 + "-600"-Fassung 300 × 400).
// TODO: Auf dem Bild steht "DESING" statt "DESIGN" – durch korrigierte Bilder ersetzen.
export const keychains = [
  { file: "rund-schwarz.webp", name: "Rund · Schwarz", technique: "Mattschwarz, weißer Druck", width: 600, height: 800 },
  { file: "rund-weiss.webp", name: "Rund · Weiß", technique: "Weiß, schwarzer Druck", width: 600, height: 800 },
  { file: "rund-edelstahl.webp", name: "Rund · Edelstahl", technique: "Gebürsteter Edelstahl, Gravur", width: 600, height: 800 },
  { file: "rund-acryl.webp", name: "Rund · Acryl", technique: "Klares Acryl, weißer Druck", width: 600, height: 800 },
  { file: "rund-marmor.webp", name: "Rund · Marmor", technique: "Schwarze Marmor-Optik, weißer Druck", width: 600, height: 800 },
  { file: "eckig-schwarz.webp", name: "Eckig · Schwarz", technique: "Mattschwarz, weißer Druck", width: 600, height: 800 },
  { file: "eckig-weiss.webp", name: "Eckig · Weiß", technique: "Weiß, schwarzer Druck", width: 600, height: 800 },
  { file: "eckig-bambus.webp", name: "Eckig · Bambus", technique: "Bambusholz, Lasergravur", width: 600, height: 800 },
  { file: "eckig-acryl.webp", name: "Eckig · Acryl", technique: "Klares Acryl, weißer Druck", width: 600, height: 800 },
  { file: "eckig-carbon.webp", name: "Eckig · Carbon", technique: "Carbon-Optik, weißer Druck", width: 600, height: 800 },
];

// NFC-Tags und Sticker – einzeln aus einem ChatGPT-Bild geschnitten (public/sticker/, 800 × 600 + "-600"-Fassung 400 × 300).
// TODO: Auf den 5 Tags steht "DESIGG"/"DESING" statt "DESIGN" – durch korrigierte Bilder ersetzen. Die Sticker sind korrekt.
export const stickers = [
  { file: "tag-royal.webp", name: "Royal · NFC-Tag", technique: "Schwarz glänzend, Goldkrone", width: 800, height: 600 },
  { file: "tag-carbon.webp", name: "Carbon · NFC-Tag", technique: "Carbon-Optik, Silberdruck", width: 800, height: 600 },
  { file: "tag-premium.webp", name: "Premium · NFC-Tag", technique: "Gebürstetes Metall, schwarzer Druck", width: 800, height: 600 },
  { file: "tag-marble.webp", name: "Marmor · NFC-Tag", technique: "Schwarzer Marmor mit Goldadern", width: 800, height: 600 },
  { file: "tag-square.webp", name: "Eckig · NFC-Tag", technique: "Schwarz, Golddruck", width: 800, height: 600 },
  { file: "classic.webp", name: "Classic · Sticker", technique: "Schwarz glänzend, Goldkrone", width: 800, height: 600 },
  { file: "graffiti.webp", name: "Graffiti · Sticker", technique: "Konturgeschnitten, Silber-Graffiti", width: 800, height: 600 },
  { file: "circle.webp", name: "Kreis · Sticker", technique: "Rund, Goldrand im Used-Look", width: 800, height: 600 },
  { file: "skull.webp", name: "Skull · Sticker", technique: "Konturgeschnitten, Totenkopf mit Krone", width: 800, height: 600 },
  { file: "street.webp", name: "Street · Sticker", technique: "Konturgeschnitten, Gold-Graffiti", width: 800, height: 600 },
  { file: "minimal.webp", name: "Minimal · Sticker", technique: "Schwarz, weißer Druck", width: 800, height: 600 },
  { file: "marble.webp", name: "Marmor · Sticker", technique: "Schwarzer Marmor mit Goldadern", width: 800, height: 600 },
  { file: "metal.webp", name: "Metall · Sticker", technique: "Gebürstete Metall-Optik", width: 800, height: 600 },
  { file: "hologram.webp", name: "Hologramm · Sticker", technique: "Regenbogen-Holofolie", width: 800, height: 600 },
  { file: "qr.webp", name: "QR-Edition · Sticker", technique: "Mit QR-Code für Handys ohne NFC", width: 800, height: 600 },
];

// Tischaufsteller – aus einem ChatGPT-Bild geschnitten (public/aufsteller/, 500 × 600 + "-600"-Fassung 250 × 300).
export const tableStands = [
  { file: "acryl-klar.webp", name: "Acryl klar", technique: "Speisekarte per Antippen", width: 500, height: 600 },
  { file: "acryl-schwarz.webp", name: "Acryl schwarz", technique: "WLAN per Antippen", width: 500, height: 600 },
  { file: "metall.webp", name: "Metall gebürstet", technique: "Instagram per Antippen", width: 500, height: 600 },
  { file: "rund-premium.webp", name: "Rund Premium", technique: "Scan & Tap, Goldrand", width: 500, height: 600 },
  { file: "holz-eiche.webp", name: "Holz Eiche", technique: "Speisekarte per Antippen", width: 500, height: 600 },
  { file: "matt-schwarz.webp", name: "Matt schwarz", technique: "WLAN per Antippen", width: 500, height: 600 },
];

// Einsatzbeispiele zu den Tischaufstellern (600 × 400 + "-600"-Fassung 300 × 200)
export const tableStandScenes = [
  { file: "einsatz-restaurant.webp", name: "Restaurant", technique: "Digitale Speisekarte per Antippen", width: 600, height: 400 },
  { file: "einsatz-cafe.webp", name: "Café", technique: "Instagram öffnen und folgen", width: 600, height: 400 },
  { file: "einsatz-hotel.webp", name: "Hotel, Bar, Shop", technique: "WLAN-Zugang für Ihre Gäste", width: 600, height: 400 },
];

// Haustier-Marken – aus einem ChatGPT-Bild geschnitten (public/haustier/, 472 × 472 + "-600"-Fassung 236 × 236).
export const petTags = [
  { file: "luna.webp", name: "Rund · Schwarz/Gold", technique: "Gravur „Luna“ mit Krone", width: 472, height: 472 },
  { file: "buddy.webp", name: "Rund · Silber", technique: "Gravur „Buddy“ mit Pfote", width: 472, height: 472 },
  { file: "rocky.webp", name: "Rund · Marmor", technique: "Gravur „Rocky“ mit Bergen", width: 472, height: 472 },
  { file: "bella.webp", name: "Rund · Holz", technique: "Gravur „Bella“ mit Baum", width: 472, height: 472 },
  { file: "max.webp", name: "Knochen · Schwarz", technique: "Gravur „Max“ mit Pfote", width: 472, height: 472 },
  { file: "milo.webp", name: "Knochen · Silber", technique: "Gravur „Milo“ mit Pfote", width: 472, height: 472 },
  { file: "nala.webp", name: "Herz · Roségold", technique: "Gravur „Nala“ mit Herz", width: 472, height: 472 },
  { file: "coco.webp", name: "Schild · Schwarz", technique: "Gravur „Coco“ mit Bergen", width: 472, height: 472 },
  { file: "bruno.webp", name: "Pfote · Gold", technique: "Gravur „Bruno“", width: 472, height: 472 },
  { file: "leo.webp", name: "Rechteck · Mattschwarz", technique: "Gravur „Leo“ mit Tannen", width: 472, height: 472 },
];

export const webServices = [
  { name: "Landingpage", price: "ab 700 €" },
  { name: "Firmenwebsite mit 3–5 Seiten", price: "ab 1.500 €" },
  { name: "Logo und Geschäftsausstattung", price: "ab 250 €" },
  { name: "Automatisierung mit WhatsApp und n8n", price: "auf Anfrage" },
];

export const mailto = (subject: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
