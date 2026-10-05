import { qrcodegen } from "./qrcodegen";

// QR-Code als Raster aus true (dunkel) / false (hell), Fehlerkorrektur "M" (≈ 15 % dürfen fehlen).
export function qrMatrix(text: string): boolean[][] {
  const qr = qrcodegen.QrCode.encodeText(text, qrcodegen.QrCode.Ecc.MEDIUM);
  return Array.from({ length: qr.size }, (_, y) => Array.from({ length: qr.size }, (_, x) => qr.getModule(x, y)));
}

// SVG-Pfad für alle dunklen Felder – ein einziger <path>, damit es schnell bleibt.
export function qrPath(m: boolean[][], border = 2) {
  let d = "";
  m.forEach((row, y) =>
    row.forEach((on, x) => {
      if (on) d += `M${x + border} ${y + border}h1v1h-1z`;
    }),
  );
  return { d, size: m.length + border * 2 };
}
