// Zeichnet eine Visitenkarte live: Vorlage (Motiv ohne Text) + Logo + Name + Kontaktdaten.
// Wird für die Live-Vorschau UND das gespeicherte Bild benutzt – dadurch sehen beide gleich aus.
// Alle Maße sind Anteile der Kartenbreite (W), damit die Karte in jeder Größe gleich aussieht.

export type CardTemplate = {
  id: string; // = Dateiname des Original-Motivs ohne .webp
  file: string; // Vorlage in public/vorlagen/
  area: [number, number, number, number]; // freie Textfläche: x0, y0, x1, y1 (Anteile 0–1)
  align: "left" | "center";
  text: string; // Hauptfarbe (Name, Kontaktdaten)
  accent: string; // Position, Linie, Beschriftungen
  font: "ink" | "display";
  upper?: boolean; // Name in Großbuchstaben
  shadow?: boolean; // leichter Schatten für Lesbarkeit auf unruhigem Grund
};

export type CardText = {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  web: string;
};

const fonts = {
  ink: '"Cormorant Garamond", Georgia, serif',
  display: '"Archivo Variable", "Archivo", Arial, sans-serif',
  body: '"Hanken Grotesk", Arial, sans-serif',
};

type Line = { text: string; size: number; weight: number; family: string; color: string; spacing: number; gapAfter: number; label?: string };

// Baut die Zeilen der Karte (Größen als Anteil der Kartenbreite).
function buildLines(t: CardTemplate, d: CardText): Line[] {
  const lines: Line[] = [];
  const nameFamily = t.font === "ink" ? fonts.ink : fonts.display;
  const name = d.name.trim() || "Ihr Name";
  lines.push({
    text: t.upper ? name.toUpperCase() : name,
    size: 0.062,
    weight: t.font === "ink" ? 600 : 700,
    family: nameFamily,
    color: t.text,
    spacing: t.font === "ink" ? 0.002 : 0,
    gapAfter: 0.012,
  });
  const sub = [d.role.trim(), d.company.trim()].filter(Boolean).join(" · ");
  if (sub) lines.push({ text: sub, size: 0.028, weight: 500, family: fonts.body, color: t.accent, spacing: 0.0015, gapAfter: 0.012 });
  lines.push({ text: "—rule—", size: 0, weight: 0, family: "", color: t.accent, spacing: 0, gapAfter: 0.03 });
  const contacts: [string, string][] = [
    ["Tel", d.phone],
    ["Mail", d.email],
    ["Web", d.web],
  ];
  for (const [label, value] of contacts) {
    if (value.trim())
      lines.push({ text: value.trim(), label, size: 0.026, weight: 400, family: fonts.body, color: t.text, spacing: 0.0005, gapAfter: 0.014 });
  }
  return lines;
}

const fontOf = (l: Line, W: number, k: number) => `${l.weight} ${l.size * W * k}px ${l.family}`;

export function drawCard(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: CardTemplate,
  bg: HTMLImageElement,
  d: CardText,
  logo?: HTMLImageElement | null,
) {
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(bg, 0, 0, W, H);

  const [ax0, ay0, ax1, ay1] = t.area;
  const x0 = ax0 * W;
  const y0 = ay0 * H;
  const aw = (ax1 - ax0) * W;
  const ah = (ay1 - ay0) * H;
  const lines = buildLines(t, d);
  const labelW = 0.07 * W; // Platz für "Tel", "Mail", "Web"

  // Wie stark muss verkleinert werden, damit alles in die Fläche passt?
  const measure = (k: number) => {
    let maxW = 0;
    let h = 0;
    for (const l of lines) {
      if (l.text === "—rule—") {
        h += 0.004 * W * k + l.gapAfter * W * k;
        continue;
      }
      ctx.font = fontOf(l, W, k);
      ctx.letterSpacing = `${l.spacing * W * k}px`;
      const w = ctx.measureText(l.text).width + (l.label ? labelW * k : 0);
      maxW = Math.max(maxW, w);
      h += l.size * W * k * 1.15 + l.gapAfter * W * k;
    }
    return { maxW, h };
  };
  // Erst den Text einpassen, dann bekommt das Logo den Platz, der übrig bleibt
  // (mindestens 9 % der Kartenhöhe, höchstens 20 %). Notfalls wird der Text etwas kleiner.
  const gap = 0.025 * W;
  const minLogo = 0.09 * H;
  let k = 1;
  let logoH = 0;
  let logoW = 0;
  for (let i = 0; i < 40; i++) {
    const m = measure(k);
    const fitsWidth = m.maxW <= aw;
    const room = ah - m.h;
    if (logo) {
      const want = Math.min(0.2 * H, room - gap * k);
      if (fitsWidth && want >= minLogo) {
        const s = Math.min(want / logo.height, (aw * 0.5) / logo.width);
        logoW = logo.width * s;
        logoH = logo.height * s;
        break;
      }
    } else if (fitsWidth && room >= 0) break;
    k *= 0.95;
  }
  const { h: textH } = measure(k);
  const blockH = textH + (logoH ? logoH + gap * k : 0);
  let y = y0 + Math.max(0, (ah - blockH) / 2);
  const cx = x0 + aw / 2;

  ctx.save();
  if (t.shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.55)";
    ctx.shadowBlur = 0.006 * W;
    ctx.shadowOffsetY = 0.0015 * W;
  }
  if (logo && logoH) {
    const lx = t.align === "center" ? cx - logoW / 2 : x0;
    ctx.drawImage(logo, lx, y, logoW, logoH);
    y += logoH + gap * k;
  }

  // Kontaktzeilen bei zentrierter Karte als Block mittig, aber linksbündig untereinander
  const contactLines = lines.filter((l) => l.label);
  let contactX = x0;
  if (t.align === "center" && contactLines.length) {
    let w = 0;
    for (const l of contactLines) {
      ctx.font = fontOf(l, W, k);
      ctx.letterSpacing = `${l.spacing * W * k}px`;
      w = Math.max(w, ctx.measureText(l.text).width + labelW * k);
    }
    contactX = cx - w / 2;
  }

  ctx.textBaseline = "alphabetic";
  for (const l of lines) {
    if (l.text === "—rule—") {
      const rw = 0.07 * W * k;
      const rx = t.align === "center" ? cx - rw / 2 : x0;
      ctx.fillStyle = l.color;
      ctx.fillRect(rx, y, rw, Math.max(1, 0.0025 * W * k));
      y += 0.004 * W * k + l.gapAfter * W * k;
      continue;
    }
    const size = l.size * W * k;
    y += size;
    ctx.font = fontOf(l, W, k);
    ctx.letterSpacing = `${l.spacing * W * k}px`;
    ctx.fillStyle = l.color;
    if (l.label) {
      ctx.textAlign = "left";
      ctx.fillStyle = t.accent;
      ctx.font = `600 ${size * 0.72}px ${fonts.body}`;
      ctx.letterSpacing = `${0.002 * W * k}px`;
      ctx.fillText(l.label.toUpperCase(), contactX, y);
      ctx.font = fontOf(l, W, k);
      ctx.letterSpacing = `${l.spacing * W * k}px`;
      ctx.fillStyle = l.color;
      ctx.fillText(l.text, contactX + labelW * k, y);
    } else if (t.align === "center") {
      ctx.textAlign = "center";
      ctx.fillText(l.text, cx, y);
    } else {
      ctx.textAlign = "left";
      ctx.fillText(l.text, x0, y);
    }
    y += size * 0.15 + l.gapAfter * W * k;
  }
  ctx.restore();
  ctx.letterSpacing = "0px";
  ctx.textAlign = "left";
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
