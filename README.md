# MKDIR Design

Moderne Verkaufswebsite für digitale VCards, NFC-Metallkarten, NFC-Tags,
Schlüsselanhänger und NFC-Armbänder. Der Neubau enthält einen interaktiven
Produktkonfigurator mit Live-Vorschau, Preisberechnung und Warenkorb-Übergabe.

## Aktueller Stand

- responsive Startseite und Produktkatalog
- Produktdetails und Premium-/Exclusive-Bereich
- dreistufiger NFC-Konfigurator mit lokaler Warenkorb-Speicherung
- Checkout-Oberfläche für Kontakt, Lieferadresse und Zahlungsart
- Vorbereitung auf das spätere MKDIR-Ökosystem aus VCard-Websites und Zeiterfassung

Der Checkout ist derzeit ein Prototyp und führt noch keine echte Zahlung aus.
Vor dem Live-Verkauf müssen Zahlungsanbieter, Backend, Rechtstexte, Steuern und
der Fulfillment-Prozess verbindlich eingerichtet werden.

## Lokal starten

```bash
npm ci
npm run dev
```

## Qualität prüfen

```bash
npm run lint
npm run build
```

Die Veröffentlichung erfolgt automatisch über den eigenen GitHub-Actions-Workflow nach jedem Push auf `main`. Die Anwendung nutzt Hash-Routing, damit Unterseiten auch auf GitHub Pages zuverlässig geöffnet werden.
