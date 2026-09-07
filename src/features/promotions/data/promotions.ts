export type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  active: boolean;
  startsAt: string;
  endsAt: string;
  badge: string;
  href: string;
};

export const promotions: Promotion[] = [
  {
    id: "launch-signature",
    title: "Signature Launch",
    subtitle: "Limitierte Einführungskampagne für MKDIR Signature.",
    active: true,
    startsAt: "2026-09-01",
    endsAt: "2026-12-31",
    badge: "LIMITED",
    href: "/produkte/signature",
  },
];
