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
    price: 149,
    priceLabel: "149 €",
    designIncluded: true,
    configurable: true,
    description: "Digitale VCard mit QR-Code und persönlicher Einrichtung.",
    quantities: [1],
  },
  {
    id: "metal",
    slug: "metal",
    category: "card",
    name: "MKDIR Metal",
    eyebrow: "NFC Metallkarte",
    price: 249,
    priceLabel: "249 €",
    designIncluded: true,
    configurable: true,
    description: "Premium NFC-Metallkarte inklusive digitaler VCard.",
    quantities: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    id: "signature",
    slug: "signature",
    category: "card",
    name: "MKDIR Signature",
    eyebrow: "Premium Empfehlung",
    price: 349,
    priceLabel: "349 €",
    designIncluded: true,
    configurable: true,
    featured: true,
    description: "Premium Metallkarte, VCard und Betreuung als Komplettpaket.",
    quantities: [1, 2, 5, 10, 25, 50, 100],
  },
  {
    id: "exclusive",
    slug: "exclusive-gold",
    category: "exclusive",
    name: "MKDIR Exclusive",
    eyebrow: "Exclusive Division",
    price: null,
    priceLabel: "ab 499 €",
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
    price: null,
    priceLabel: "Preis folgt",
    designIncluded: true,
    configurable: true,
    description: "NFC-Schlüsselanhänger mit digitaler VCard-Verknüpfung.",
    quantities: [1, 2, 5, 10, 25, 50, 100],
  },
];
