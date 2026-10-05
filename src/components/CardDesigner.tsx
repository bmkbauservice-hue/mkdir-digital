import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type CSSProperties } from "react";
import { cardLines, contact, designs } from "../content";
import { imgSet } from "../img";
import { qrMatrix, qrPath } from "../lib/qr";

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
  return i >= 0 ? i : 0;
}

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

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
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

export function CardDesigner() {
  const uid = useId();
  const [motif, setMotif] = useState(initialMotif);
  const [line, setLine] = useState(cardLines.find((l) => l.recommended)?.id ?? cardLines[0].id);
  const [accent, setAccent] = useState(accents[0]);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [logo, setLogo] = useState<{ url: string; name: string } | null>(null);
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
    setLogo({ url, name: file.name });
    setSaved(false);
  };

  const removeLogo = () => {
    if (logoUrl.current) URL.revokeObjectURL(logoUrl.current);
    logoUrl.current = null;
    setLogo(null);
    setSaved(false);
  };

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

      const img = await loadImage(`${import.meta.env.BASE_URL}designs/${d.file}`);
      ctx.save();
      roundRect(ctx, 70, 110, 1060, 624, 34);
      ctx.clip();
      ctx.drawImage(img, 70, 110, 1060, 624);
      ctx.restore();

      const font = (size: number, weight = 400) => `${weight} ${size}px "Hanken Grotesk", Arial, sans-serif`;
      ctx.fillStyle = "#d6b062";
      ctx.font = font(30, 700);
      ctx.fillText("MKDIR DESIGN · KARTENENTWURF", 70, 70);
      ctx.fillStyle = "#a19b8f";
      ctx.font = font(26);
      ctx.fillText(`Motiv „${d.name}“ – gestaltet mit Ihren Angaben statt der Platzhalter`, 70, 790);
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
                {designs.map((m, i) => (
                  <button
                    key={m.file}
                    type="button"
                    role="radio"
                    aria-checked={i === motif}
                    aria-label={m.name}
                    title={m.name}
                    onClick={() => {
                      setMotif(i);
                      setSaved(false);
                    }}
                  >
                    <img {...imgSet("designs", m.file)} sizes="120px" alt="" width={m.width} height={m.height} loading="lazy" decoding="async" />
                  </button>
                ))}
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
              <img {...imgSet("designs", d.file)} sizes="(max-width: 1000px) 90vw, 520px" alt={`Motiv ${d.name}`} width={d.width} height={d.height} />
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
              <small>Die Platzhalter auf dem Motiv werden durch Ihre Angaben ersetzt.</small>
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

            <div className="designer__send">
              <button type="button" className="btn btn--line" disabled={!ready || busy} onClick={savePreview}>
                {busy ? "Bild wird erstellt …" : saved ? "✓ Vorschau gespeichert" : "1. Vorschau speichern"}
              </button>
              <a
                className={`btn btn--gold${ready ? "" : " is-disabled"}`}
                href={ready ? mailHref() : undefined}
                aria-disabled={!ready}
              >
                2. Per E-Mail anfragen
              </a>
              <p className="designer__hint">
                {ready
                  ? "Hängen Sie das gespeicherte Vorschaubild an die E-Mail an – und Ihr Logo, falls Sie eins gewählt haben."
                  : "Bitte zuerst Ihren Namen eintragen."}
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
