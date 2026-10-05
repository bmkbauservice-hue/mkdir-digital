import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { cardLines, cardTemplates, contact, designs } from "../content";
import { imgSet } from "../img";
import { qrMatrix, qrPath } from "../lib/qr";
import { drawCard, loadImage, type CardTemplate, type CardText } from "../lib/cardRender";

// Karten-Designer: Motiv wählen, Kartenlinie wählen, eigene Angaben eintragen, Live-Vorschau.
// Am Ende: Vorschaubild speichern (PNG, im Browser erzeugt) und Anfrage per E-Mail.
// Es gibt keinen Server – alle Angaben und das Logo bleiben auf dem Gerät, bis man die E-Mail selbst abschickt.

type Fields = { name: string; role: string; company: string; phone: string; email: string; web: string; note: string };

const emptyFields: Fields = { name: "", role: "", company: "", phone: "", email: "", web: "", note: "" };

const accents = [
  { id: "gold", name: "Gold", color: "#d6b062" },
  { id: "silber", name: "Silber", color: "#c9d1dc" },
  { id: "mint", name: "Neon-Mint", color: "#3dffc2" },
  { id: "pink", name: "Neon-Pink", color: "#ff2fb4" },
  { id: "rot", name: "Rot", color: "#e2343f" },
  { id: "weiss", name: "Weiß", color: "#ffffff" },
];

const fieldList: { key: keyof Fields; label: string; type: string; placeholder: string; max: number }[] = [
  { key: "name", label: "Name *", type: "text", placeholder: "Anna Beispiel", max: 60 },
  { key: "role", label: "Position", type: "text", placeholder: "Geschäftsführerin", max: 60 },
  { key: "company", label: "Firma", type: "text", placeholder: "Beispiel GmbH", max: 60 },
  { key: "phone", label: "Telefon", type: "tel", placeholder: "0151 1234567", max: 30 },
  { key: "email", label: "E-Mail", type: "email", placeholder: "anna@beispiel.de", max: 80 },
  { key: "web", label: "Website oder Instagram", type: "text", placeholder: "beispiel.de", max: 80 },
];

// Extra: zusätzlicher QR-Code auf der Rückseite (funktioniert auch auf Handys ohne NFC)
type QrType = "web" | "map" | "insta";
const qrTypes: { id: QrType; name: string; label: string; placeholder: string; caption: string }[] = [
  { id: "web", name: "Internetseite", label: "Internetadresse", placeholder: "beispiel.de", caption: "Zur Website" },
  { id: "map", name: "Standort", label: "Adresse oder Google-Maps-Link", placeholder: "Hauptstraße 1, 14467 Potsdam", caption: "So finden Sie uns" },
  { id: "insta", name: "Instagram", label: "Instagram-Name", placeholder: "@beispiel", caption: "Folgen Sie uns" },
];

// Aus der Eingabe wird die Adresse, die der QR-Code öffnet.
function qrTarget(type: QrType, input: string): string | null {
  const v = input.trim();
  if (!v) return null;
  const isUrl = /^https?:\/\//i.test(v);
  if (type === "web") return isUrl ? v : `https://${v}`;
  if (type === "map") return isUrl ? v : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v)}`;
  const handle = v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").split(/[/?#\s]/)[0];
  return handle ? `https://instagram.com/${handle}` : null;
}

const stem = (file: string) => file.replace(/\.webp$/, "");

// Vorauswahl über den Link: …/gestalten/#motiv-panther (z. B. aus der Großansicht der Designs)
function initialMotif() {
  const m = window.location.hash.match(/^#motiv-(.+)$/);
  const i = m ? designs.findIndex((d) => stem(d.file) === m[1]) : -1;
  if (i >= 0) return i;
  const live = designs.findIndex((d) => cardTemplates.some((t) => t.id === stem(d.file)));
  return live >= 0 ? live : 0;
}

const templateFor = (file: string) => cardTemplates.find((t) => t.id === stem(file));
// Live-Motive zuerst, dann die übrigen (Reihenfolge innerhalb bleibt)
const motifOrder = designs.map((_, i) => i).sort((a, b) => Number(!templateFor(designs[a].file)) - Number(!templateFor(designs[b].file)));

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join("") || "?"
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

// QR-Code als SVG (schwarz auf weiß, gestochen scharf in jeder Größe)
function QrSvg({ matrix, label }: { matrix: boolean[][]; label: string }) {
  const { d, size } = qrPath(matrix);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} shapeRendering="crispEdges">
      <rect width={size} height={size} fill="#fff" />
      <path d={d} fill="#000" />
    </svg>
  );
}

// Live-Vorschau der Karte: Vorlage ohne Text + Ihre Angaben, gezeichnet auf eine Canvas.
// Interne Auflösung fest 1200 × 706 – die Größe am Bildschirm regelt das CSS.
function LiveCard({ template, text, logoUrl }: { template: CardTemplate; text: CardText; logoUrl: string | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [bg, logo] = await Promise.all([
        loadImage(`${import.meta.env.BASE_URL}vorlagen/${template.file}`),
        logoUrl ? loadImage(logoUrl).catch(() => null) : Promise.resolve(null),
      ]);
      await document.fonts.ready; // erst zeichnen, wenn die Schriften geladen sind
      const canvas = ref.current;
      if (cancelled || !canvas) return;
      drawCard(canvas.getContext("2d")!, canvas.width, canvas.height, template, bg, text, logo);
    })().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [template, text, logoUrl]);
  const label = [text.name, text.role, text.company, text.phone, text.email, text.web].filter((v) => v.trim()).join(", ");
  return <canvas ref={ref} width={1200} height={706} role="img" aria-label={`Ihre Karte: ${label || "noch ohne Angaben"}`} />;
}

export function CardDesigner() {
  const uid = useId();
  const [motif, setMotif] = useState(initialMotif);
  const [line, setLine] = useState(cardLines.find((l) => l.recommended)?.id ?? cardLines[0].id);
  const [accent, setAccent] = useState(accents[0]);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [logo, setLogo] = useState<{ url: string; name: string; w: number; h: number; vector: boolean } | null>(null);
  const [okData, setOkData] = useState(false); // "Angaben geprüft"
  const [okRights, setOkRights] = useState(false); // "Rechte am Logo"
  const [logoError, setLogoError] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [qrOn, setQrOn] = useState(false);
  const [qrType, setQrType] = useState<QrType>("web");
  const [qrInput, setQrInput] = useState("");
  const logoUrl = useRef<string | null>(null);

  // Beim Verlassen der Seite den Speicher für das Logo freigeben.
  useEffect(() => {
    return () => {
      if (logoUrl.current) URL.revokeObjectURL(logoUrl.current);
    };
  }, []);

  const d = designs[motif];
  const lineData = cardLines.find((l) => l.id === line)!;
  const tpl = templateFor(d.file);
  // Nur die Felder, die auf die Karte kommen – useMemo, damit die Vorschau nicht bei jedem Rendern neu zeichnet
  const cardText = useMemo<CardText>(
    () => ({ name: fields.name, role: fields.role, company: fields.company, phone: fields.phone, email: fields.email, web: fields.web }),
    [fields.name, fields.role, fields.company, fields.phone, fields.email, fields.web],
  );
  const ready = fields.name.trim().length > 1;
  const qrInfo = qrTypes.find((q) => q.id === qrType)!;
  const qrUrl = qrOn ? qrTarget(qrType, qrInput) : null;
  // Lesbare Kurzform für Hinweis und Vorschaubild (statt der langen Maps-Adresse)
  const qrShown = !qrUrl
    ? ""
    : qrType === "map" && !/^https?:\/\//i.test(qrInput.trim())
      ? `Google Maps: ${qrInput.trim()}`
      : qrUrl.replace(/^https?:\/\/(www\.)?/i, "");
  // Das QR-Raster nur neu berechnen, wenn sich die Adresse ändert.
  const qr = useMemo(() => {
    if (!qrUrl) return null;
    try {
      return qrMatrix(qrUrl);
    } catch {
      return null; // zu lang für einen QR-Code
    }
  }, [qrUrl]);

  const setField = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setSaved(false);
  };

  const onLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLogoError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setLogoError("Bitte ein Bild wählen (PNG, JPG, SVG oder WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("Das Bild ist größer als 5 MB. Bitte eine kleinere Datei wählen.");
      return;
    }
    if (logoUrl.current) URL.revokeObjectURL(logoUrl.current);
    const url = URL.createObjectURL(file);
    logoUrl.current = url;
    const vector = file.type === "image/svg+xml";
    // Pixelgröße des Logos ermitteln – daraus berechnet die Prüfung, ob es scharf genug für den Druck ist
    loadImage(url)
      .then((img) => setLogo({ url, name: file.name, w: img.naturalWidth, h: img.naturalHeight, vector }))
      .catch(() => setLogoError("Das Bild konnte nicht gelesen werden. Bitte eine andere Datei wählen."));
    setOkRights(false);
    setSaved(false);
  };

  const removeLogo = () => {
    if (logoUrl.current) URL.revokeObjectURL(logoUrl.current);
    logoUrl.current = null;
    setLogo(null);
    setOkRights(false);
    setSaved(false);
  };

  // Automatische Prüfung vor dem Abschicken. "error" sperrt die Anfrage, "warn" ist nur ein Hinweis.
  type Check = { id: string; level: "ok" | "warn" | "error"; text: string };
  const checks: Check[] = [];
  const f = {
    name: fields.name.trim(),
    phone: fields.phone.trim(),
    email: fields.email.trim(),
    web: fields.web.trim(),
  };
  checks.push(
    f.name.length > 1
      ? { id: "name", level: "ok", text: "Name eingetragen" }
      : { id: "name", level: "error", text: "Bitte Ihren Namen eintragen." },
  );
  if (!f.phone && !f.email && !f.web)
    checks.push({ id: "kontakt", level: "warn", text: "Keine Kontaktdaten – die Karte zeigt dann nur Ihren Namen." });
  if (f.email)
    checks.push(
      /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(f.email)
        ? { id: "email", level: "ok", text: "E-Mail-Adresse sieht gültig aus" }
        : { id: "email", level: "error", text: "Die E-Mail-Adresse scheint unvollständig (z. B. name@firma.de)." },
    );
  if (f.phone) {
    const digits = f.phone.replace(/\D/g, "").length;
    checks.push(
      digits >= 7 && /^[+\d][\d\s/()-]*$/.test(f.phone)
        ? { id: "phone", level: "ok", text: "Telefonnummer vollständig" }
        : { id: "phone", level: "error", text: "Die Telefonnummer scheint unvollständig oder enthält Buchstaben." },
    );
  }
  if (f.web && /\s/.test(f.web)) checks.push({ id: "web", level: "error", text: "Die Website darf keine Leerzeichen enthalten." });
  if (logo) {
    // Logo wird auf der Karte bis ca. 25 mm breit gedruckt; für 300 dpi sind das ~300 px.
    const px = Math.max(logo.w, logo.h);
    checks.push(
      logo.vector || px >= 600
        ? { id: "logo", level: "ok", text: "Logo scharf genug für den Druck" }
        : px >= 300
          ? { id: "logo", level: "warn", text: `Logo hat nur ${px} px – für den Druck reicht es knapp. Besser: größere Datei oder SVG.` }
          : { id: "logo", level: "warn", text: `Logo hat nur ${px} px und wird im Druck unscharf. Bitte eine größere Datei oder SVG nachreichen.` },
    );
  }
  if (f.name.length > 30) checks.push({ id: "lang", level: "warn", text: "Sehr langer Name – die Schrift wird dafür kleiner." });
  const hasError = checks.some((c) => c.level === "error");
  // Anfrage erst, wenn keine Fehler und beide Bestätigungen gesetzt sind
  const canSend = !hasError && okData && (!logo || okRights);

  // Vorschaubild als PNG: Motiv links, Angaben rechts. Wird komplett im Browser gezeichnet.
  const savePreview = async () => {
    setBusy(true);
    try {
      await document.fonts.ready;
      const W = 1800;
      const H = 1000;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#03130e";
      ctx.fillRect(0, 0, W, H);

      // Karte links: bei Live-Motiven mit Ihren Angaben, sonst das Original-Motiv
      let cardImg: CanvasImageSource;
      if (tpl) {
        const card = document.createElement("canvas");
        card.width = 1200;
        card.height = 706;
        const [bg, lg] = await Promise.all([
          loadImage(`${import.meta.env.BASE_URL}vorlagen/${tpl.file}`),
          logo ? loadImage(logo.url).catch(() => null) : Promise.resolve(null),
        ]);
        drawCard(card.getContext("2d")!, 1200, 706, tpl, bg, cardText, lg);
        cardImg = card;
      } else {
        cardImg = await loadImage(`${import.meta.env.BASE_URL}designs/${d.file}`);
      }
      ctx.save();
      roundRect(ctx, 70, 110, 1060, 624, 34);
      ctx.clip();
      ctx.drawImage(cardImg, 70, 110, 1060, 624);
      ctx.restore();

      const font = (size: number, weight = 400) => `${weight} ${size}px "Hanken Grotesk", Arial, sans-serif`;
      ctx.fillStyle = "#d6b062";
      ctx.font = font(30, 700);
      ctx.fillText("MKDIR DESIGN · KARTENENTWURF", 70, 70);
      ctx.fillStyle = "#a19b8f";
      ctx.font = font(26);
      ctx.fillText(tpl ? `Motiv „${d.name}“ – Live-Entwurf mit Ihren Angaben` : `Motiv „${d.name}“ – gestaltet mit Ihren Angaben statt der Platzhalter`, 70, 790);
      ctx.fillText(`${lineData.name} · ${lineData.material}`, 70, 832);

      // rechte Spalte
      let y = 130;
      if (logo) {
        const l = await loadImage(logo.url);
        const s = Math.min(220 / l.width, 140 / l.height);
        ctx.drawImage(l, 1220, y, l.width * s, l.height * s);
        y += l.height * s + 40;
      }
      ctx.fillStyle = "#ffffff";
      ctx.font = font(54, 700);
      ctx.fillText(fields.name.trim(), 1220, y + 40);
      y += 70;
      ctx.fillStyle = accent.color;
      ctx.font = font(32, 600);
      for (const t of [fields.role, fields.company]) {
        if (t.trim()) {
          ctx.fillText(t.trim(), 1220, y + 30);
          y += 46;
        }
      }
      y += 30;
      ctx.fillStyle = "#efe9dc";
      ctx.font = font(30);
      for (const [label, value] of [
        ["Tel.", fields.phone],
        ["E-Mail", fields.email],
        ["Web", fields.web],
      ]) {
        if (value.trim()) {
          ctx.fillStyle = "#a19b8f";
          ctx.fillText(label, 1220, y + 28);
          ctx.fillStyle = "#efe9dc";
          ctx.fillText(value.trim(), 1340, y + 28);
          y += 50;
        }
      }
      // Akzentfarbe
      ctx.fillStyle = accent.color;
      ctx.beginPath();
      ctx.arc(1240, y + 50, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#a19b8f";
      ctx.font = font(26);
      ctx.fillText(`Akzentfarbe ${accent.name}`, 1272, y + 59);

      // Extra QR-Code
      if (qr && qrUrl) {
        const size = 130;
        const qy = Math.min(y + 100, 900 - size - 20);
        const cell = size / (qr.length + 4);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(1220, qy, size, size);
        ctx.fillStyle = "#000000";
        qr.forEach((row, ry) =>
          row.forEach((on, rx) => {
            if (on) ctx.fillRect(1220 + (rx + 2) * cell, qy + (ry + 2) * cell, Math.ceil(cell), Math.ceil(cell));
          }),
        );
        ctx.fillStyle = "#efe9dc";
        ctx.font = font(28, 700);
        ctx.fillText(`Extra: QR-Code (${qrInfo.name})`, 1375, qy + 50);
        ctx.fillStyle = "#a19b8f";
        ctx.font = font(22);
        ctx.fillText(qrShown.length > 34 ? `${qrShown.slice(0, 33)}…` : qrShown, 1375, qy + 88);
      }

      ctx.fillStyle = "rgba(214,176,98,0.35)";
      ctx.fillRect(70, 900, W - 140, 2);
      ctx.fillStyle = "#a19b8f";
      ctx.font = font(24);
      ctx.fillText(
        `Entwurf vom ${new Date().toLocaleDateString("de-DE")} · ${contact.email} · ${contact.domain}`,
        70,
        950,
      );

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Bild konnte nicht erzeugt werden");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mkdir-entwurf-${(fields.name.trim() || "karte").toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setSaved(true);
    } finally {
      setBusy(false);
    }
  };

  // Fertige E-Mail an Mario. Nur ausgefüllte Felder kommen hinein.
  const mailHref = () => {
    const f = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.trim()])) as Fields;
    const lines = [
      "Hallo Mario,",
      "",
      "ich möchte eine NFC-Karte mit diesem Entwurf anfragen:",
      "",
      `Motiv: ${d.name}`,
      `Kartenlinie: ${lineData.name} (${lineData.material}, ${lineData.price})`,
      `Akzentfarbe: ${accent.name}`,
      "",
      `Name: ${f.name}`,
    ];
    if (f.role) lines.push(`Position: ${f.role}`);
    if (f.company) lines.push(`Firma: ${f.company}`);
    if (f.phone) lines.push(`Telefon: ${f.phone}`);
    if (f.email) lines.push(`E-Mail: ${f.email}`);
    if (f.web) lines.push(`Website/Instagram: ${f.web}`);
    if (logo) lines.push(`Logo: ${logo.name} (im Anhang)`);
    if (qrUrl) lines.push("", `Extra: QR-Code auf der Rückseite (${qrInfo.name}) → ${qrUrl}`);
    if (f.note) lines.push("", `Wünsche: ${f.note}`);
    lines.push("", "Das Vorschaubild hänge ich an.");
    lines.push("", "Bestätigt:", "– Ich habe meine Angaben auf Tippfehler geprüft.", "– Vor dem Druck erhalte ich einen Korrekturabzug und gebe ihn frei.");
    if (logo) lines.push("– Ich habe die Rechte an dem hochgeladenen Logo.");
    const subject = `Kartenentwurf „${d.name}“ – ${f.name}`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const vars = { "--accent": accent.color, "--cover": `url(${import.meta.env.BASE_URL}designs/${d.file})` } as CSSProperties;
  const actions = [
    fields.phone.trim() && "Anrufen",
    fields.phone.trim() && "WhatsApp",
    fields.email.trim() && "E-Mail",
    fields.web.trim() && "Website",
  ].filter(Boolean) as string[];

  return (
    <section className="section designer" id="gestalten" aria-labelledby={`${uid}-title`}>
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">Karten-Designer</p>
          <h2 id={`${uid}-title`}>Gestalten Sie Ihre Karte.</h2>
          <p>
            Motiv aussuchen, Daten eintragen, Vorschau speichern und mir schicken. Ich setze Ihre Karte im Stil des Motivs
            um – mit Ihrem Namen statt der Platzhalter – und melde mich mit einem Entwurf.
          </p>
        </div>

        <div className="designer__grid">
          <div className="designer__form">
            {/* 1 Motiv */}
            <fieldset className="designer__step">
              <legend>
                <span>1</span> Motiv wählen <small>{d.name}</small>
              </legend>
              <div className="designer__motifs" role="radiogroup" aria-label="Motiv">
                {motifOrder.map((i) => {
                  const m = designs[i];
                  return (
                  <button
                    key={m.file}
                    type="button"
                    role="radio"
                    aria-checked={i === motif}
                    aria-label={templateFor(m.file) ? `${m.name} – Live-Vorschau` : m.name}
                    title={m.name}
                    className={templateFor(m.file) ? "is-live" : undefined}
                    onClick={() => {
                      setMotif(i);
                      setSaved(false);
                    }}
                  >
                    <img {...imgSet("designs", m.file)} sizes="120px" alt="" width={m.width} height={m.height} loading="lazy" decoding="async" />
                    {templateFor(m.file) && <span className="designer__live">Live</span>}
                  </button>
                  );
                })}
              </div>
            </fieldset>

            {/* 2 Kartenlinie */}
            <fieldset className="designer__step">
              <legend>
                <span>2</span> Kartenlinie
              </legend>
              <div className="designer__lines">
                {cardLines.map((l) => (
                  <label key={l.id} className={l.id === line ? "is-on" : undefined}>
                    <input
                      type="radio"
                      name={`${uid}-line`}
                      value={l.id}
                      checked={l.id === line}
                      onChange={() => {
                        setLine(l.id);
                        setSaved(false);
                      }}
                    />
                    <strong>{l.name}</strong>
                    <small>{l.material}</small>
                    <em>{l.price}</em>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 3 Angaben */}
            <fieldset className="designer__step">
              <legend>
                <span>3</span> Ihre Angaben
              </legend>
              <div className="designer__fields">
                {fieldList.map((f) => (
                  <label key={f.key}>
                    <span>{f.label}</span>
                    <input
                      id={`${uid}-${f.key}`}
                      type={f.type}
                      value={fields[f.key]}
                      onChange={setField(f.key)}
                      placeholder={f.placeholder}
                      maxLength={f.max}
                      autoComplete={f.key === "name" ? "name" : f.key === "email" ? "email" : f.key === "phone" ? "tel" : "off"}
                    />
                  </label>
                ))}
                <label className="designer__wide">
                  <span>Logo (optional)</span>
                  <span className="designer__file">
                    <input id={`${uid}-logo`} type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={onLogo} />
                    {logo && (
                      <button type="button" className="designer__remove" onClick={removeLogo}>
                        Logo entfernen
                      </button>
                    )}
                  </span>
                  {logoError && <em className="designer__error">{logoError}</em>}
                </label>
                <label className="designer__wide">
                  <span>Wünsche (optional)</span>
                  <textarea
                    id={`${uid}-note`}
                    rows={3}
                    value={fields.note}
                    onChange={setField("note")}
                    maxLength={400}
                    placeholder="z. B. Rückseite mit QR-Code, Gravur statt Druck, 25 Stück …"
                  />
                </label>
              </div>
            </fieldset>

            {/* 4 Farbe */}
            <fieldset className="designer__step">
              <legend>
                <span>4</span> Akzentfarbe für die digitale Visitenkarte <small>{accent.name}</small>
              </legend>
              <div className="designer__accents" role="radiogroup" aria-label="Akzentfarbe">
                {accents.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    role="radio"
                    aria-checked={a.id === accent.id}
                    aria-label={a.name}
                    title={a.name}
                    style={{ "--swatch": a.color } as CSSProperties}
                    onClick={() => setAccent(a)}
                  />
                ))}
              </div>
            </fieldset>

            {/* 5 Extra: QR-Code */}
            <fieldset className="designer__step">
              <legend>
                <span>5</span> Extra: QR-Code auf der Rückseite
              </legend>
              <label className="designer__toggle">
                <input
                  type="checkbox"
                  checked={qrOn}
                  onChange={(e) => {
                    setQrOn(e.target.checked);
                    setSaved(false);
                  }}
                />
                <span>QR-Code hinzufügen – öffnet z. B. Ihren Standort oder Ihre Internetseite, auch auf Handys ohne NFC.</span>
              </label>
              {qrOn && (
                <div className="designer__qr-form">
                  <div className="designer__qr-types" role="radiogroup" aria-label="Was soll der QR-Code öffnen?">
                    {qrTypes.map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        role="radio"
                        aria-checked={q.id === qrType}
                        onClick={() => {
                          setQrType(q.id);
                          setSaved(false);
                        }}
                      >
                        {q.name}
                      </button>
                    ))}
                  </div>
                  <label className="designer__qr-input">
                    <span>{qrInfo.label}</span>
                    <input
                      id={`${uid}-qr`}
                      type="text"
                      value={qrInput}
                      maxLength={300}
                      placeholder={qrInfo.placeholder}
                      onChange={(e) => {
                        setQrInput(e.target.value);
                        setSaved(false);
                      }}
                    />
                  </label>
                  <small className="designer__qr-note">
                    {qrUrl ? `Öffnet ${qrShown}.` : "Eingabe fehlt noch."} Aufpreis auf Anfrage.
                  </small>
                </div>
              )}
            </fieldset>
          </div>

          {/* Vorschau */}
          <aside className="designer__preview" style={vars} aria-label="Vorschau">
            <figure className="designer__card">
              {tpl ? (
                <LiveCard template={tpl} text={cardText} logoUrl={logo?.url ?? null} />
              ) : (
                <img {...imgSet("designs", d.file)} sizes="(max-width: 1000px) 90vw, 520px" alt={`Motiv ${d.name}`} width={d.width} height={d.height} />
              )}
            </figure>

            <div className="designer__phone" aria-label="So sieht Ihre digitale Visitenkarte aus">
              <div className="designer__screen">
                <div className="designer__cover" />
                <div className="designer__avatar">
                  {logo ? <img src={logo.url} alt="Ihr Logo" /> : <span>{initials(fields.name)}</span>}
                </div>
                <strong className="designer__name">{fields.name.trim() || "Ihr Name"}</strong>
                <span className="designer__role">
                  {[fields.role.trim(), fields.company.trim()].filter(Boolean).join(" · ") || "Position · Firma"}
                </span>
                <div className="designer__actions">
                  {(actions.length ? actions : ["Anrufen", "E-Mail"]).map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
                <span className="designer__save">Kontakt speichern</span>
              </div>
            </div>

            <p className="designer__caption">
              Motiv „{d.name}“ · {lineData.name}
              <small>
                {tpl
                  ? "Live-Vorschau: So steht es auf Ihrer Karte. Feinschliff bei Schrift und Abständen mache ich vor dem Druck."
                  : "Die Platzhalter auf dem Motiv werden durch Ihre Angaben ersetzt. Live-Vorschau gibt es bei den Motiven mit „Live“."}
              </small>
            </p>

            {qrOn && (
              <figure className="designer__back" aria-label="Rückseite mit QR-Code">
                <div className="designer__back-card">
                  <div className="designer__qr">
                    {qr ? <QrSvg matrix={qr} label={`QR-Code: ${qrUrl}`} /> : <span>QR</span>}
                  </div>
                  <div className="designer__back-text">
                    <strong>{qrInfo.caption}</strong>
                    <span>{fields.company.trim() || fields.name.trim() || "Ihr Name"}</span>
                  </div>
                </div>
                <figcaption>Rückseite · Tipp: Scannen Sie den Code zum Test mit Ihrem Handy.</figcaption>
              </figure>
            )}

            {/* Prüfung + Freigabe */}
            <div className="designer__check" aria-live="polite">
              <strong>Prüfung Ihres Entwurfs</strong>
              <ul>
                {checks.map((c) => (
                  <li key={c.id} className={`is-${c.level}`}>
                    <span aria-hidden="true">{c.level === "ok" ? "✓" : c.level === "warn" ? "!" : "✕"}</span>
                    {c.text}
                  </li>
                ))}
              </ul>
              <label className="designer__confirm">
                <input type="checkbox" checked={okData} onChange={(e) => setOkData(e.target.checked)} />
                <span>
                  Ich habe meine Angaben auf Tippfehler geprüft. Vor dem Druck bekomme ich einen <b>Korrekturabzug</b> und gebe
                  ihn ausdrücklich frei.
                </span>
              </label>
              {logo && (
                <label className="designer__confirm">
                  <input type="checkbox" checked={okRights} onChange={(e) => setOkRights(e.target.checked)} />
                  <span>Ich habe die Rechte an dem hochgeladenen Logo (eigenes Logo oder Erlaubnis des Inhabers).</span>
                </label>
              )}
              <ol className="designer__flow">
                <li>Anfrage senden</li>
                <li>Korrekturabzug von mir</li>
                <li>Ihre Freigabe</li>
                <li>Druck &amp; Versand</li>
              </ol>
            </div>

            <div className="designer__send">
              <button type="button" className="btn btn--line" disabled={!ready || busy} onClick={savePreview}>
                {busy ? "Bild wird erstellt …" : saved ? "✓ Vorschau gespeichert" : "1. Vorschau speichern"}
              </button>
              <a
                className={`btn btn--gold${canSend ? "" : " is-disabled"}`}
                href={canSend ? mailHref() : undefined}
                aria-disabled={!canSend}
              >
                2. Per E-Mail anfragen
              </a>
              <p className="designer__hint">
                {hasError
                  ? "Bitte zuerst die rot markierten Punkte korrigieren."
                  : !okData || (logo && !okRights)
                    ? "Bitte die Bestätigung oben anhaken."
                    : "Hängen Sie das gespeicherte Vorschaubild an die E-Mail an – und Ihr Logo, falls Sie eins gewählt haben."}
              </p>
              <p className="designer__privacy">
                Ihre Angaben und Ihr Logo bleiben auf Ihrem Gerät. Nichts wird hochgeladen – erst die E-Mail, die Sie selbst
                abschicken, erreicht mich.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
