// Bilder gibt es in zwei Größen: das Original (1200 px breit) und eine kleine Fassung
// (600 px, gleicher Name mit Endung "-600.webp", liegt im selben Ordner).
// Mit srcSet + sizes sucht sich der Browser selbst die passende aus: Auf kleinen Kacheln
// lädt er nur die kleine Fassung, in der Großansicht oder auf Retina-Bildschirmen das Original.
// Neue Bilder: Original + "-600"-Fassung in den Ordner legen (siehe stand.md: "Neue Bilder einbauen").
const base = import.meta.env.BASE_URL;

// widths = [Breite der kleinen Fassung, Breite des Originals]. Standard 600/1200;
// die Schlüsselanhänger sind kleiner (300/600), heißen aber genauso ("-600" = kleine Fassung).
export function imgSet(folder: string, file: string, widths: [number, number] = [600, 1200]) {
  const small = file.replace(/\.webp$/, "-600.webp");
  return {
    src: `${base}${folder}/${file}`,
    srcSet: `${base}${folder}/${small} ${widths[0]}w, ${base}${folder}/${file} ${widths[1]}w`,
  };
}
