import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Unterseiten (siehe src/router.ts – dort dieselben Pfade eintragen!).
// Beim Bauen bekommt jede Seite einen eigenen Ordner mit index.html, z. B. dist/armbaender/index.html.
// So liefert GitHub Pages /mkdir-digital/armbaender/ direkt aus (Status 200) und Google findet
// jede Seite einzeln – mit eigenem Titel und eigener Beschreibung.
const pageRoutes = [
  { path: "karten", title: "NFC-Karten & Designs", description: "NFC-Visitenkarten von PVC bis Gold, 30 Designbeispiele, Single-Karten und Spielekarte." },
  { path: "gestalten", title: "Karte gestalten", description: "Gestalten Sie Ihre NFC-Visitenkarte selbst: Motiv wählen, Daten eintragen, Vorschau speichern und anfragen." },
  { path: "armbaender", title: "NFC-Armbänder", description: "NFC-Armbänder für Festival, Verein, Notfall und Kinder – wasserfest, ohne Akku, in Ihrer Farbe." },
  { path: "zubehoer", title: "NFC-Zubehör", description: "NFC-Tischaufsteller, Schlüsselanhänger, Sticker und Haustier-Marken – einfach antippen." },
  { path: "unternehmen", title: "Für Unternehmen", description: "NFC-Teamkarten, Google-Bewertungen, Treue-, Gutschein- und Gewinnspielkarten für Ihr Unternehmen." },
  { path: "webdesign", title: "Webdesign", description: "Landingpages, Firmenwebsites, Logos und Automatisierung mit WhatsApp und n8n." },
  { path: "impressum", title: "Impressum", description: "Impressum von MKDIR-Design." },
  { path: "datenschutz", title: "Datenschutz", description: "Datenschutzerklärung von MKDIR-Design." },
];

function pageFolders(): Plugin {
  return {
    name: "mkdir-page-folders",
    apply: "build",
    enforce: "post",
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset") {
        this.error("index.html fehlt im Build – Unterseiten konnten nicht angelegt werden.");
        return;
      }
      const html = String(index.source);
      for (const r of pageRoutes) {
        const page = html
          .replace(/<title>[^<]*<\/title>/, `<title>${r.title} | MKDIR-Design</title>`)
          .replace(/(<meta name="description" content=")[^"]*/, `$1${r.description}`);
        this.emitFile({ type: "asset", fileName: `${r.path}/index.html`, source: page });
      }
      // Unbekannte Adressen zeigen die Startseite statt einer GitHub-Fehlerseite.
      this.emitFile({ type: "asset", fileName: "404.html", source: html });
    },
  };
}

export default defineConfig({
  plugins: [react(), pageFolders()],
  base: "/mkdir-digital/",
});
