import { useEffect, useRef, useState } from "react";
import { mailto } from "../content";
import { Logo } from "./Logo";

type NavLink = { href: string; label: string; hint?: string };
type NavGroup = { label: string; items: NavLink[] };
type NavEntry = NavLink | NavGroup;

// Hauptmenü: zwei Gruppen mit Dropdown, drei direkte Links.
const nav: NavEntry[] = [
  {
    label: "Karten",
    items: [
      { href: "#karten", label: "NFC-Karten", hint: "Vier Kartenlinien von PVC bis Gold" },
      { href: "#designs", label: "Designbeispiele", hint: "30 Entwürfe zum Anschauen" },
      { href: "#kennenlernen", label: "Kennenlern-Karten", hint: "Ich bin ein Unikat." },
    ],
  },
  { href: "#armbaender", label: "Armbänder" },
  {
    label: "Für Unternehmen",
    items: [
      { href: "#unternehmen", label: "Firmenlösungen", hint: "Teamkarten und Google-Bewertungen" },
      { href: "#kartensysteme", label: "Kartensysteme", hint: "Treuekarte, Gutschein, Gewinnspiel" },
      { href: "#zubehoer", label: "Zubehör", hint: "Anhänger, Sticker, Aufsteller" },
    ],
  },
  { href: "#webdesign", label: "Webdesign" },
  { href: "#kontakt", label: "Kontakt" },
];

const isGroup = (e: NavEntry): e is NavGroup => "items" in e;
const allIds = nav.flatMap((e) => (isGroup(e) ? e.items : [e])).map((l) => l.href.slice(1));

// Merkt sich, welcher Abschnitt gerade im Bild ist (für die goldene Markierung).
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }, // nur ein schmaler Streifen in der Bildschirmmitte zählt
    );
    els.forEach((el) => io.observe(el));
    // Ganz oben (im Hero) ist kein Menüpunkt aktiv.
    const onScroll = () => window.scrollY < window.innerHeight * 0.5 && setActive(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);
  return active;
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(allIds);
  const navRef = useRef<HTMLElement>(null);
  // Hover öffnet nur auf dem Desktop. Ein Klick direkt danach soll das Menü nicht gleich wieder schließen.
  const hoverOpened = useRef(false);
  const isDesktop = () => window.matchMedia("(min-width: 1181px)").matches;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Klick daneben oder Esc schließt Dropdown und Mobilmenü.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap site-header__inner">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="hauptnavigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="menu-toggle__bars" aria-hidden="true" />
          <span className="sr-only">{mobileOpen ? "Menü schließen" : "Menü öffnen"}</span>
        </button>

        <nav
          ref={navRef}
          id="hauptnavigation"
          className={`main-nav${mobileOpen ? " is-open" : ""}`}
          aria-label="Hauptnavigation"
        >
          <ul className="main-nav__list">
            {nav.map((entry) =>
              isGroup(entry) ? (
                <li
                  key={entry.label}
                  className={`main-nav__group${openGroup === entry.label ? " is-open" : ""}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse" || !isDesktop()) return;
                    hoverOpened.current = true;
                    setOpenGroup(entry.label);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType !== "mouse" || !isDesktop()) return;
                    hoverOpened.current = false;
                    setOpenGroup(null);
                  }}
                >
                  <button
                    type="button"
                    className={`nav-pill${entry.items.some((i) => i.href.slice(1) === active) ? " is-active" : ""}`}
                    aria-expanded={openGroup === entry.label}
                    onClick={() => {
                      if (hoverOpened.current) {
                        hoverOpened.current = false;
                        return;
                      }
                      setOpenGroup((g) => (g === entry.label ? null : entry.label));
                    }}
                  >
                    {entry.label}
                    <svg className="nav-pill__chevron" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M3 4.5 6 7.5l3-3" />
                    </svg>
                  </button>
                  <div className="nav-dropdown">
                    <ul>
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className={item.href.slice(1) === active ? "is-active" : undefined}
                            onClick={close}
                          >
                            <strong>{item.label}</strong>
                            {item.hint && <span>{item.hint}</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={entry.href}>
                  <a
                    href={entry.href}
                    className={`nav-pill${entry.href.slice(1) === active ? " is-active" : ""}`}
                    onClick={close}
                  >
                    {entry.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <a className="nav-cta" href={mailto("Anfrage NFC-Karte")} onClick={close}>
            <span>Karte anfragen</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
