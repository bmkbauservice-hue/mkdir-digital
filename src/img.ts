// Bilder gibt es in zwei Größen: das Original (1200 px breit) und eine kleine Fassung
// (600 px, gleicher Name mit Endung "-600.webp", liegt im selben Ordner).
// Mit srcSet + sizes sucht sich der Browser selbst die passende aus: Auf kleinen Kacheln
// lädt er nur die kleine Fassung, in der Großansicht oder auf Retina-Bildschirmen das Original.
// Neue Bilder: Original + "-600"-Fassung in den Ordner legen (siehe stand.md: "Neue Bilder einbauen").
const base = import.meta.env.BASE_URL;

export function imgSet(folder: string, file: string) {
  const small = file.replace(/\.webp$/, "-600.webp");
  return {
    src: `${base}${folder}/${file}`,
    srcSet: `${base}${folder}/${small} 600w, ${base}${folder}/${file} 1200w`,
  };
}
