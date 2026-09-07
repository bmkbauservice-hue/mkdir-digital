export type ProductCategory =
  | "card"
  | "exclusive"
  | "accessory"
  | "digital";

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  eyebrow: string;
  price: number | null;
  priceLabel: string;
  designIncluded: boolean;
  configurable: boolean;
  featured?: boolean;
  description: string;
  quantities: number[];
};

export const products: Product[] = [
  {
    id: "digital",
    slug: "digital",
    category: "digital",
    name: "MKDIR Digital",
    eyebrow: "Digitale VCard",
    price: 0,
    priceLabel: "Basisprofil kostenlos",
    designIncluded: true,
    configurable: true,
    description: "Dein browserbasiertes Kontaktprofil – jederzeit änderbar und ohne App-Zwang teilbar.",
    quantities: [1],
  },
  {
    id: "metal",
    slug: "metal",
    category: "card",
    name: "MKDIR Metal",
    eyebrow: "NFC Metallkarte",
    price: 79,
    priceLabel: "ab 79 €",
    designIncluded: true,
    configurable: true,
    description: "Schwarz eloxierte NFC-Metallkarte mit individueller Vorderseite und digitaler VCard.",
    quantities: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    id: "signature",
    slug: "signature",
    category: "card",
    name: "MKDIR Signature",
    eyebrow: "Premium Empfehlung",
    price: 129,
    priceLabel: "ab 129 €",
    designIncluded: true,
    configurable: true,
    featured: true,
    description: "Premium-Veredelung, beidseitiges Design, VCard und persönliche Designprüfung.",
    quantities: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    id: "exclusive",
    slug: "exclusive-gold",
    category: "exclusive",
    name: "MKDIR Exclusive",
    eyebrow: "Exclusive Division",
    price: null,
    priceLabel: "auf Anfrage",
    designIncluded: true,
    configurable: false,
    description: "Gold, Sondermaterialien, limitierte Editionen und Luxusverpackungen.",
    quantities: [1, 2, 5, 10, 25, 50],
  },
  {
    id: "keytag",
    slug: "keytag",
    category: "accessory",
    name: "MKDIR KeyTag",
    eyebrow: "NFC Zubehör",
    price: 29,
    priceLabel: "ab 29 €",
    designIncluded: true,
    configurable: true,
    description: "NFC-Schlüsselanhänger mit digitaler VCard-Verknüpfung.",
    quantities: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    id: "tag",
    slug: "nfc-tag",
    category: "accessory",
    name: "MKDIR NFC Tag",
    eyebrow: "Für Tresen, Tür & Fahrzeug",
    price: 19,
    priceLabel: "ab 19 €",
    designIncluded: true,
    configurable: true,
    description: "Kompakter NFC-Tag mit frei änderbarem Ziel und optionalem Markendesign.",
    quantities: [1, 5, 10, 25, 50, 100],
  },
  {
    id: "wristband",
    slug: "nfc-armband",
    category: "accessory",
    name: "MKDIR Band",
    eyebrow: "NFC Armband",
    price: 39,
    priceLabel: "ab 39 €",
    designIncluded: true,
    configurable: true,
    description: "Robustes NFC-Armband für Events, Teams, Service und schnellen Kontaktaustausch.",
    quantities: [1, 5, 10, 25, 50, 100],
  },
];
