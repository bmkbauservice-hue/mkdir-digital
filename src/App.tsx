const services = [
  { tag: "Webdesign & Entwicklung", title: "Websites, die professionell aussehen und Kunden gewinnen.", text: "Individuell entwickelt, schnell, mobil optimiert und exakt auf dein Unternehmen zugeschnitten.", price: "ab 700 €", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85" },
  { tag: "Grafik & Print", title: "Ein starker Auftritt – vom Logo bis zur Visitenkarte.", text: "Durchgängiges Design für Visitenkarten, Flyer, Plakate, Gutscheine und komplette Geschäftsausstattung.", price: "ab 80 €", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85" },
  { tag: "Social Media", title: "Beiträge, die im Feed nicht untergehen.", text: "Moderne Motive und Vorlagen für Facebook und Instagram – einzeln oder als monatliches Paket.", price: "ab 50 €", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85" },
];

const packages = [
  { name: "Business Starter", price: "1.490 €", note: "Für den professionellen Start", features: ["Hochwertiger Onepager", "Visitenkarte Vorder- & Rückseite", "Gutschein- oder Bonuskarte", "Facebook Titel- & Profilbild", "5 Social-Media-Vorlagen"], featured: false },
  { name: "Business Komplett", price: "2.490 €", note: "Der komplette Firmenauftritt", features: ["Firmenwebsite mit bis zu 5 Seiten", "Individuelles Design & Mobiloptimierung", "Visitenkarten & Gutscheine", "Facebook- & Instagram-Design", "SEO-Grundeinrichtung"], featured: true },
  { name: "Business Premium", price: "ab 3.500 €", note: "Für besondere Ansprüche", features: ["Individuelle Website mit Sonderfunktionen", "Komplettes Corporate Design", "Social-Media-Gesamtpaket", "Diverse Druckvorlagen", "Animationen & Premium-Effekte"], featured: false },
];

const websitePrices = [
  ["Einfache Landingpage", "700–1.000 €"], ["Hochwertiger Onepager", "1.000–1.500 €"], ["Firmenwebsite · 3–5 Seiten", "1.500–2.200 €"], ["Firmenwebsite · 5–8 Seiten", "2.000–3.000 €"], ["Individuelle Premium-Website", "2.500–4.000 €"], ["Website mit Spezialfunktionen", "ab 3.000 €"],
];

const designPrices = [
  ["Visitenkarte · eine Seite", "120–180 €"], ["Visitenkarte · Vorder- & Rückseite", "180–250 €"], ["Flyer · Vorder- & Rückseite", "250–350 €"], ["Einfaches Logo", "250–400 €"], ["Individuelles Logo + Varianten", "450–750 €"], ["Kleines Corporate Design", "600–900 €"],
];

const metalNfcProducts = [
  { type: "METALLKARTE", name: "Mirror Gold & Roségold", text: "Spiegelnde Premiumkarte aus Metall mit Gold- oder Roségold-Finish – ideal für besonders repräsentative Auftritte.", specs: ["85,5 × 54 mm oder Sonderformat", "Gravur, UV-Druck & Codierung", "ab 100 Stück"], tone: "mirror" },
  { type: "SIGNATURE EDITION", name: "24K Gold Signature", text: "Edle Metallkarte mit 24K-Gold-Finish, geätztem Wappen, Logo oder Namenszug und frei wählbarer Oberfläche.", specs: ["Matt, gebürstet oder spiegelnd", "0,15–0,8 mm", "Menge auf Anfrage"], tone: "signature" },
  { type: "FULL COLOR", name: "Color Metal Card", text: "Vollfarbig personalisierte Metallkarte für Marken, Motive und Designs, die mehr als Gold und Schwarz zeigen sollen.", specs: ["CMYK- & Digitaldruck", "Prägung oder Ausschnitt möglich", "Menge auf Anfrage"], tone: "color" },
  { type: "METALL + DRUCK", name: "Hybrid Metal Premium", text: "Metallbasis und hochwertiger Druck kombiniert – für feine Farbflächen, klare Kontaktdaten und besondere Veredelungen.", specs: ["85,5 × 54 mm", "Siebdruck, Offset & Sonderfarben", "Menge auf Anfrage"], tone: "hybrid" },
  { type: "NTAG213", name: "Color Logo Edition", text: "Farbstarke NFC-Metallkarte mit individuellem Logo, Digitaldruck und Smartphone-kompatiblem NFC-Chip.", specs: ["0,8–1,5 mm oder Sonderstärke", "Laser, Ätzung & Farbdruck", "Menge auf Anfrage"], tone: "logo" },
  { type: "NTAG213 · 215 · 216", name: "Custom Chip Series", text: "Flexible Serie mit passender Speicherkapazität für VCard-Link, Website oder individuelle digitale Anwendung.", specs: ["Matt oder spiegelnd", "Farben & Oberfläche frei wählbar", "ab 500 Stück"], tone: "custom" },
  { type: "SOCIAL MEDIA", name: "Matte Social Card", text: "Robuste, matte Metallkarte für Social Media, Online-VCard und Kontaktdaten – modern, wetterfest und markant.", specs: ["Eloxiertes Aluminium", "0,5–1 mm", "Menge auf Anfrage"], tone: "matte" },
  { type: "NFC KEYTAG", name: "24K Gold Keytag", text: "Kompakter Metallanhänger mit NFC-Funktion für Schlüsselbund, Tasche, Zugang oder mobile Kontaktdaten.", specs: ["25, 30 oder 35 mm", "Logo, Nummerierung & Codierung", "ab 500 Stück"], tone: "keytag" },
  { type: "PREMIUM ZUBEHÖR", name: "Luxury Gift Box", text: "Schwarze Präsentbox für eine Metallkarte – mit Logo in Gold oder Silber für Übergabe, Geschenk und Verkauf.", specs: ["147 × 88 × 8 mm", "Leder- oder Papieroptik", "Menge auf Anfrage"], tone: "box" },
];

const eniliveImage = `${import.meta.env.BASE_URL}images/enilive-vcard-background.webp`;
const aureusImage = `${import.meta.env.BASE_URL}images/aureus-luxury-nfc.webp`;

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#start" aria-label="MKDIR-Digital Startseite"><span className="brand-mark">M</span><span>MKDIR‑<strong>DIGITAL</strong></span></a>
        <nav aria-label="Hauptnavigation"><a href="#leistungen">Leistungen</a><a href="#online-vcard">Online‑VCard</a><a href="#nfc-metall">NFC‑Metall</a><a href="#preise">Preise</a><a href="#referenzen">Referenzen</a><a href="#kontakt" className="nav-cta">Projekt anfragen</a></nav>
      </header>

      <section className="hero" id="start">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Digital. Persönlich. Einzigartig.</p>
            <h1>Dein Unternehmen.<br /><em>Stark in Szene gesetzt.</em></h1>
            <p className="hero-text">Ich entwickle moderne Websites, starke Markenauftritte und Werbung, die nicht nur gut aussieht – sondern wirkt.</p>
            <div className="hero-actions"><a href="#pakete" className="button button-primary">Pakete ansehen <span>↗</span></a><a href="#kontakt" className="button button-ghost">Kostenlos anfragen</a></div>
            <div className="trust-row"><div><strong>30+</strong><span>Jahre Geschäftserfahrung</span></div><div><strong>100%</strong><span>individuelle Gestaltung</span></div><div><strong>Direkt</strong><span>ein Ansprechpartner</span></div></div>
          </div>
          <div className="hero-visual" aria-label="Beispiel eines modernen Webprojekts">
            <div className="browser-card"><div className="browser-top"><i /><i /><i /><span>mkdir-digital.de</span></div><div className="browser-image"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90" alt="Modernes Büro als Beispiel für einen hochwertigen Firmenauftritt" /><div className="browser-overlay"><small>WEB · DESIGN · MARKE</small><strong>Ideen werden<br />sichtbar.</strong></div></div></div>
            <div className="floating-badge badge-top"><b>✓</b><span><strong>Modern entwickelt</strong>React · TypeScript</span></div>
            <div className="floating-badge badge-bottom"><span className="pulse" /><span><strong>Mobil optimiert</strong>für jedes Gerät</span></div>
          </div>
        </div>
        <div className="section nfc-showcase">
          <div className="nfc-demo" aria-hidden="true">
            <div className="nfc-glow" />
            <div className="nfc-card-demo">
              <div className="nfc-card-head"><span>MKDIR‑DIGITAL</span><b>NFC</b></div>
              <div className="nfc-chip"><i /><i /><i /><i /></div>
              <div className="nfc-card-name"><small>DIGITALE VISITENKARTE</small><strong>Antippen.<br />Direkt verbinden.</strong></div>
              <div className="nfc-card-footer"><span>● ONLINE</span><b>)))</b></div>
            </div>
            <div className="nfc-phone-demo">
              <div className="nfc-phone-speaker" />
              <div className="nfc-phone-screen"><span className="brand-mark">M</span><small>ONLINE‑VCARD</small><strong>Kontakt wird geöffnet</strong><i>✓</i></div>
            </div>
            <div className="nfc-waves"><i /><i /><i /></div>
          </div>

          <div className="nfc-offer-copy">
            <div className="nfc-label">NEU · NFC‑ERWEITERUNG</div>
            <p className="eyebrow"><span /> Einfach kurz ans Smartphone halten</p>
            <h3>Deine VCard öffnet sich<br /><em>mit einer Berührung.</em></h3>
            <p>Die programmierte NFC‑Karte öffnet deine digitale Visitenkarte direkt auf modernen iPhones und Android‑Geräten – ohne App und ohne QR‑Scanner.</p>
            <ul>
              <li><b>✓</b> Zwei programmierte NFC‑Karten im eigenen Design</li>
              <li><b>✓</b> Direkte Verknüpfung mit deiner Online‑VCard</li>
              <li><b>✓</b> Funktioniert ohne Batterie oder Aufladen</li>
              <li><b>✓</b> Weitere Karten jederzeit nachbestellbar</li>
            </ul>
            <div className="nfc-offer-bottom">
              <div><small>ZUSATZ ZUR ONLINE‑VCARD</small><strong>+79 €</strong><span>einmalig · inklusive 2 Karten</span></div>
              <a className="button button-primary" href="mailto:IT-mkdir@proton.me?subject=NFC-Erweiterung%20zur%20Online-VCard">NFC‑Paket anfragen <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="metal-products" id="nfc-metall">
        <div className="section">
          <div className="metal-products-head">
            <div>
              <div className="metal-kicker">NEU · INDIVIDUELLE AUFTRAGSFERTIGUNG</div>
              <p className="eyebrow"><span /> NFC Metallkollektion</p>
              <h2>Kontakt, der sich<br /><em>wertvoll anfühlt.</em></h2>
            </div>
            <div className="metal-products-intro">
              <p>Wir gestalten, personalisieren und programmieren deine NFC‑Metallprodukte. Nach deiner Freigabe lassen wir sie beim spezialisierten Produktionspartner fertigen und prüfen die Funktion vor der Übergabe.</p>
              <div><span>Design</span><i>→</i><span>Freigabe</span><i>→</i><span>Fertigung</span><i>→</i><span>NFC‑Setup</span></div>
            </div>
          </div>

          <article className="aureus-feature">
            <div className="aureus-image">
              <img src={aureusImage} alt="MKDIR Aureus Luxury Edition aus Gold mit graviertem Kudamm-Immobilien-Wappen und digitaler NFC-VCard" />
            </div>
            <div className="aureus-copy">
              <div className="aureus-label">ULTIMATE LUXURY EDITION · INDIVIDUELLE EINZELANFERTIGUNG</div>
              <p className="eyebrow"><span /> Die außergewöhnlichste Art, sich vorzustellen</p>
              <h3>Ein Kontakt.<br /><em>Ein echtes Statement.</em></h3>
              <p className="aureus-lead">Die <strong>MKDIR AUREUS Luxury Edition</strong> wird aus 18‑karätigem Massivgold gefertigt und mit einer edlen 24K‑Goldoberfläche vollendet. Das spürbare Gewicht, der charakteristische Metallklang und die präzise Tiefengravur machen bereits die Übergabe zu einem besonderen Erlebnis.</p>
              <div className="aureus-specs">
                <div><b>18K</b><span><strong>Massivgold</strong>750er Goldkörper</span></div>
                <div><b>24K</b><span><strong>Goldfinish</strong>edle Oberfläche</span></div>
                <div><b>NFC</b><span><strong>Digital verbunden</strong>VCard per Berührung</span></div>
                <div><b>1/1</b><span><strong>Einzelanfertigung</strong>Wappen, Logo & Name</span></div>
              </div>
              <ul>
                <li><b>✓</b> Persönliches Wappen, Firmenlogo oder Name als Tiefengravur</li>
                <li><b>✓</b> Programmierte NFC‑Funktion und optionaler QR‑Code</li>
                <li><b>✓</b> Individuelle MKDIR Online‑VCard im passenden Luxusdesign</li>
                <li><b>✓</b> Herstellerzertifikat mit Material und bestätigtem Endgewicht</li>
                <li><b>✓</b> Auf Wunsch nummerierte Edition und Präsentbox</li>
              </ul>
              <div className="aureus-price">
                <div><small>EXKLUSIVE AUFTRAGSFERTIGUNG</small><strong>ab 11.999 €</strong><span>Endpreis abhängig von Goldkurs, Gewicht und Ausstattung</span></div>
                <a className="aureus-button" href="mailto:IT-mkdir@proton.me?subject=Private%20Anfrage%20zur%20MKDIR%20Aureus%20Luxury%20Edition">Private Beratung anfragen <span>↗</span></a>
              </div>
            </div>
          </article>

          <div className="metal-product-grid">
            {metalNfcProducts.map((product, index) => (
              <article className={`metal-product-card metal-${product.tone}`} key={product.name}>
                <div className="metal-product-visual" aria-hidden="true">
                  <span className="metal-number">0{index + 1}</span>
                  <div className="metal-mini-card">
                    <small>MKDIR‑DIGITAL</small>
                    <b>{product.type}</b>
                    <strong>{product.name}</strong>
                    <i>)))</i>
                  </div>
                </div>
                <div className="metal-product-copy">
                  <small>{product.type}</small>
                  <h3>{product.name}</h3>
                  <p>{product.text}</p>
                  <ul>{product.specs.map(spec => <li key={spec}><b>✓</b>{spec}</li>)}</ul>
                  <div><strong>Preis auf Anfrage</strong><a href={`mailto:IT-mkdir@proton.me?subject=${encodeURIComponent(`Anfrage NFC Metallprodukt: ${product.name}`)}`}>Produkt anfragen <span>↗</span></a></div>
                </div>
              </article>
            ))}
          </div>

          <div className="metal-service-box">
            <div><small>MKDIR‑KOMPLETTSERVICE</small><h3>Mehr als nur eine Karte.</h3><p>Auf Wunsch übernehmen wir Gestaltung, digitale VCard, NFC‑Programmierung, Funktionstest und spätere Link‑Änderungen.</p></div>
            <a className="button button-primary" href="mailto:IT-mkdir@proton.me?subject=Beratung%20zur%20NFC-Metallkollektion">Kollektion anfragen <span>↗</span></a>
          </div>
          <p className="metal-legal">Alle Metallprodukte werden individuell nach Freigabe gefertigt. Mindestmenge, Lieferzeit und Endpreis hängen von Material, Chip, Veredelung und Stückzahl ab. Die NFC‑Erweiterung für 79 € gilt nicht automatisch für diese Metall‑Sonderanfertigungen.</p>
        </div>
      </section>

      <section className="section intro" id="leistungen">
        <div className="section-heading"><div><p className="eyebrow dark"><span /> Was ich für dich umsetze</p><h2>Alles für deinen<br /><em>starken Auftritt.</em></h2></div><p>Von der ersten Idee bis zum fertigen Ergebnis bekommst du Gestaltung und Technik aus einer Hand – verständlich, persönlich und ohne Baukasten-Einerlei.</p></div>
        <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.tag}><div className="service-image"><img src={service.image} alt="" /><span>0{index + 1}</span></div><div className="service-content"><p>{service.tag}</p><h3>{service.title}</h3><span>{service.text}</span><div><strong>{service.price}</strong><a href="#preise" aria-label={`Preise für ${service.tag}`}>Details ansehen →</a></div></div></article>)}</div>
      </section>

      <section className="vcard-section" id="online-vcard">
        <div className="vcard-honeycomb" aria-hidden="true" />
        <div className="section vcard-layout">
          <div className="vcard-copy">
            <div className="new-label">NEU · DIE VISITENKARTE DER ZUKUNFT</div>
            <p className="eyebrow"><span /> Online‑VCard</p>
            <h2>Eine Visitenkarte,<br />die <em>lebendig wird.</em></h2>
            <p className="vcard-lead">Dein kompletter Firmenkontakt als mobile Web‑App – erreichbar per QR‑Code, ohne Installation und immer aktuell.</p>
            <div className="vcard-features">
              <div><b>01</b><span><strong>Sofort erreichbar</strong>QR‑Code scannen und direkt öffnen</span></div>
              <div><b>02</b><span><strong>Ein Klick genügt</strong>Anrufen, Route, E‑Mail und Kontakt speichern</span></div>
              <div><b>03</b><span><strong>Dein eigenes Design</strong>Logo, Farben, Fotos und Leistungen</span></div>
              <div><b>04</b><span><strong>Immer aktuell</strong>Änderungen ohne Neudruck möglich</span></div>
            </div>
            <div className="vcard-promo"><span>START‑AKTION</span><strong>100 € PREISVORTEIL</strong><small>Gültig vom 01.09.2026 bis 31.12.2026</small></div>
            <div className="vcard-pricing">
              <div className="promo-price"><small>AKTIONSPREIS</small><strong><del>499 €</del> 399 €</strong><span>einmalig</span></div>
              <div><small>RUNDUM‑SERVICE</small><strong>149 €</strong><span>pro Jahr</span></div>
              <a className="button button-primary" href="mailto:IT-mkdir@proton.me?subject=Start-Aktion%20Online-VCard%20f%C3%BCr%20399%20Euro">Aktionspreis sichern <span>↗</span></a>
            </div>
            <p className="vcard-included">Inklusive 12 Monate Hosting, SSL, Domain, Backups und Wartung.</p>
          </div>

          <div className="vcard-stage" aria-label="Beispiel einer Online-VCard im Enilive-Design">
            <div className="vcard-light light-one" /><div className="vcard-light light-two" />
            <div className="digital-card">
              <div className="digital-card-top"><span className="enilive-mini">eni<strong>live</strong></span><span>GÜLZOWER CHAUSSEE</span></div>
              <div className="station-photo"><img src={eniliveImage} alt="Moderne Enilive Tankstelle als Beispiel für eine Online-VCard" /><div className="station-shade" /><div className="station-title"><small>DEINE TANKSTELLE</small><strong>Mobil. Direkt.<br />Immer dabei.</strong></div></div>
              <div className="digital-card-body">
                <div className="vcard-name"><div className="vcard-avatar">E</div><div><strong>Enilive Tankstelle</strong><span>24h Service · KFZ · Waschanlage</span></div><i>● ONLINE</i></div>
                <div className="vcard-actions"><button type="button"><b>☎</b><span>Jetzt anrufen</span></button><button type="button"><b>⌖</b><span>Route starten</span></button><button type="button"><b>✉</b><span>E‑Mail senden</span></button><button type="button"><b>＋</b><span>Kontakt speichern</span></button><button type="button"><b>•••</b><span>Sonstiges</span></button></div>
                <div className="vcard-bottom"><div><small>ÖFFNEN PER</small><strong>QR‑CODE</strong></div><div className="qr-code" aria-label="Stilisierter QR-Code"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
              </div>
            </div>
            <div className="vcard-float float-save"><b>✓</b><span><strong>Kontakt gespeichert</strong>direkt im Smartphone</span></div>
            <div className="vcard-float float-noapp"><b>⚡</b><span><strong>Keine App nötig</strong>einfach QR‑Code scannen</span></div>
          </div>
        </div>
      </section>

      <section className="dark-section" id="pakete">
        <div className="section packages-wrap">
          <div className="center-heading"><p className="eyebrow"><span /> Klare Pakete. Klare Leistungen.</p><h2>Dein Auftritt als <em>Gesamtpaket.</em></h2><p>Besonders attraktiv für kleine und mittlere Unternehmen: ein einheitlicher Auftritt, bei dem alles zusammenpasst.</p></div>
          <div className="package-grid">{packages.map((item) => <article className={`package-card ${item.featured ? "featured" : ""}`} key={item.name}>{item.featured && <div className="popular">BELIEBTESTES PAKET</div>}<p>{item.note}</p><h3>{item.name}</h3><div className="package-price">{item.price}<small>einmalig</small></div><ul>{item.features.map(feature => <li key={feature}><b>✓</b>{feature}</li>)}</ul><a className={`button ${item.featured ? "button-primary" : "package-button"}`} href={`mailto:IT-mkdir@proton.me?subject=Anfrage%20${encodeURIComponent(item.name)}`}>Paket anfragen <span>→</span></a></article>)}</div>
          <p className="price-note">Alle Preise sind Richtwerte für die Arbeitsleistung. Umfang, Hosting, Domain, Bildlizenzen und Fremdkosten werden vor Projektstart transparent abgestimmt.</p>
        </div>
      </section>

      <section className="section pricing" id="preise">
        <div className="section-heading"><div><p className="eyebrow dark"><span /> Einzelpreise zur Orientierung</p><h2>Fair kalkuliert.<br /><em>Transparent angeboten.</em></h2></div><p>Du erhältst vor Beginn ein verbindliches Angebot. So weißt du genau, welche Leistungen enthalten sind und was dein Projekt kostet.</p></div>
        <div className="price-columns">
          <article className="price-list"><div className="price-list-head"><span>01</span><div><small>WEB & TECHNIK</small><h3>Webseiten</h3></div></div>{websitePrices.map(row => <div className="price-row" key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong></div>)}<a href="mailto:IT-mkdir@proton.me?subject=Anfrage%20Webseite">Webprojekt anfragen →</a></article>
          <article className="price-list"><div className="price-list-head"><span>02</span><div><small>DESIGN & DRUCK</small><h3>Grafikleistungen</h3></div></div>{designPrices.map(row => <div className="price-row" key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong></div>)}<a href="mailto:IT-mkdir@proton.me?subject=Anfrage%20Grafikdesign">Design anfragen →</a></article>
        </div>
        <div className="extras"><div><small>ZUSATZLEISTUNGEN</small><h3>Wenn dein Projekt mehr können soll.</h3></div><div className="extra-tags"><span>Kontaktformular · 100–200 €</span><span>Galerie · 150–300 €</span><span>Dark Mode · 150–250 €</span><span>Animationen · 100–400 €</span><span>SEO-Basis · 200–400 €</span><span>Pflege · 55 €/Std.</span></div></div>
      </section>

      <section className="portfolio-section" id="referenzen">
        <div className="section">
          <div className="section-heading"><div><p className="eyebrow"><span /> Ausgewählte Arbeiten</p><h2>Projekte mit<br /><em>Charakter.</em></h2></div><p>Jedes Unternehmen ist anders. Genau deshalb entsteht jedes Design individuell – passend zu Angebot, Zielgruppe und Persönlichkeit.</p></div>
          <div className="portfolio-grid">
            <article className="portfolio-large"><img src={eniliveImage} alt="Enilive Tankstelle im modernen Marken- und Lichtdesign" /><div><small>WEBDESIGN · PRINT · MARKE</small><h3>Enilive Tankstellen</h3><p>Drei individuelle Standorte mit digitalen Visitenkarten, Bonuskarten und einheitlicher Markenwelt.</p></div></article>
            <article><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85" alt="Moderner Bau als Beispiel für eine Unternehmenswebsite" /><div><small>WEBSITE · CORPORATE DESIGN</small><h3>BMSB GmbH</h3><p>Robuster, moderner Firmenauftritt für Bau- und Industrieservice.</p></div></article>
            <article><img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85" alt="Digitale Projektentwicklung im Team" /><div><small>APP · SYSTEM · AUTOMATION</small><h3>Individuelle Lösungen</h3><p>Digitale Werkzeuge, die Abläufe vereinfachen und im Alltag Zeit sparen.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section tech-section">
        <div className="tech-grid"><div><p className="eyebrow dark"><span /> Modern unter der Haube</p><h2>Technik, die heute schnell ist – und <em>morgen noch passt.</em></h2><p>Kein schwerfälliger Baukasten: Deine Website wird mit aktuellen Webstandards entwickelt, auf Smartphones optimiert und lässt sich später flexibel erweitern.</p><a className="text-link" href="mailto:IT-mkdir@proton.me?subject=Kostenloses%20Erstgespr%C3%A4ch">Kostenloses Erstgespräch →</a></div><div className="tech-list"><article><b>TS</b><div><h3>TypeScript & React</h3><p>Sauberer, moderner Code für zuverlässige und erweiterbare Websites.</p></div></article><article><b>⚡</b><div><h3>Schnell & responsiv</h3><p>Optimierte Ladezeiten und perfekte Darstellung auf Handy, Tablet und Desktop.</p></div></article><article><b>↗</b><div><h3>SEO & Barrierearmut</h3><p>Gute technische Grundlage für Suchmaschinen und einfache Bedienung.</p></div></article><article><b>⌁</b><div><h3>Sicher & wartbar</h3><p>Aktuelle Technik, strukturierte Inhalte und klare Update-Möglichkeiten.</p></div></article></div></div>
      </section>

      <section className="process-section"><div className="section"><div className="center-heading"><p className="eyebrow dark"><span /> So läuft dein Projekt</p><h2>Einfach. Klar. <em>Persönlich.</em></h2></div><div className="process-grid"><article><span>01</span><h3>Kennenlernen</h3><p>Wir sprechen über dein Unternehmen, deine Wünsche und dein Ziel.</p></article><article><span>02</span><h3>Konzept & Angebot</h3><p>Du erhältst eine klare Idee, den Leistungsumfang und einen Festpreis.</p></article><article><span>03</span><h3>Design & Umsetzung</h3><p>Ich entwickle dein Projekt und stimme die wichtigen Schritte mit dir ab.</p></article><article><span>04</span><h3>Fertigstellung</h3><p>Nach deiner Freigabe geht alles online oder druckfertig an dich.</p></article></div></div></section>

      <section className="contact-section" id="kontakt"><div className="contact-inner"><div><p className="eyebrow"><span /> Bereit für etwas Neues?</p><h2>Lass uns deinen Auftritt<br /><em>gemeinsam stark machen.</em></h2><p>Schreib mir kurz, was du vorhast. Das erste Gespräch ist kostenlos und unverbindlich.</p></div><div className="contact-card"><small>DIREKTER KONTAKT</small><a href="mailto:IT-mkdir@proton.me">IT-mkdir@proton.me</a><p>Antwort in der Regel innerhalb von 24 Stunden.</p><a className="button button-primary" href="mailto:IT-mkdir@proton.me?subject=Neue%20Projektanfrage">Projekt kostenlos anfragen <span>↗</span></a></div></div></section>

      <footer><div className="footer-inner"><a className="brand" href="#start"><span className="brand-mark">M</span><span>MKDIR‑<strong>DIGITAL</strong></span></a><p>Webdesign · Grafik · Social Media<br />Persönlich entwickelt in Brandenburg.</p><div><a href="mailto:IT-mkdir@proton.me">Kontakt</a><a href="#preise">Preise</a><a href="#start">Nach oben ↑</a></div></div><div className="footer-bottom"><span>© 2026 MKDIR‑Digital</span><span>Impressum · Datenschutz</span></div></footer>
    </main>
  );
}
