import { useEffect, useMemo, useRef, useState } from "react";
import { mailto } from "../content";
import { href, type PageId } from "../router";
import { Logo } from "./Logo";

// Ein Menüpunkt führt auf eine Seite, optional direkt zu einem Abschnitt darauf.
// Ohne page: Abschnitt auf der aktuellen Seite (Kontakt steht auf jeder Seite unten).
type NavLink = { page?: PageId; section?: string; label: string; hint?: string };
type NavGroup = { label: string; items: NavLink[] };
type NavEntry = NavLink | NavGroup;

// Hauptmenü: zwei Gruppen mit Dropdown, vier direkte Links. Jede Produktwelt hat ihre eigene Seite.
const nav: NavEntry[] = [
  {
    label: "Karten",
    items: [
      { page: "karten", label: "NFC-Karten", hint: "Vier Kartenlinien von PVC bis Gold" },
      { page: "karten", section: "designs", label: "Designbeispiele", hint: "30 Entwürfe zum Anschauen" },
      { page: "karten", section: "single-karten", label: "Single-Karten", hint: "Ich bin ein Unikat." },
      { page: "karten", section: "spielekarte", label: "Spielekarte", hint: "Bald: Spiele zum Antippen" },
    ],
  },
  { page: "armbaender", label: "Armbänder" },
  { page: "zubehoer", label: "Zubehör" },
  {
    label: "Für Unternehmen",
    items: [
      { page: "unternehmen", label: "Firmenlösungen", hint: "Teamkarten und Google-Bewertungen" },
      { page: "unternehmen", section: "kartensysteme", label: "Kartensysteme", hint: "Treuekarte, Gutschein, Gewinnspiel" },
    ],
  },
  { page: "webdesign", label: "Webdesign" },
  { section: "kontakt", label: "Kontakt" },
];

const isGroup = (e: NavEntry): e is NavGroup => "items" in e;
const allLinks = nav.flatMap((e) => (isGroup(e) ? e.items : [e]));
// Die Abschnitts-ID eines Menüpunkts: der Anker, sonst heißt der erste Abschnitt der Seite wie die Seite.
const sectionId = (l: NavLink) => l.section ?? l.page ?? "";

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

export function SiteHeader({ page }: { page: PageId }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // Beobachtet werden nur die Abschnitte, die auf der aktuellen Seite liegen.
  const ids = useMemo(() => allLinks.filter((l) => !l.page || l.page === page).map(sectionId), [page]);
  const active = useActiveSection(ids);
  const legal = page === "impressum" || page === "datenschutz";
  const linkHref = (l: NavLink) => href(l.page ?? (legal ? "start" : page), l.section);
  const isCurrent = (l: NavLink) => (l.page ? l.page === page : active === l.section);
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
                    className={`nav-pill${entry.items.some(isCurrent) ? " is-active" : ""}`}
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
                        <li key={item.label}>
                          <a
                            href={linkHref(item)}
                            className={item.page === page && sectionId(item) === active ? "is-active" : undefined}
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
                <li key={entry.label}>
                  <a
                    href={linkHref(entry)}
                    className={`nav-pill${isCurrent(entry) ? " is-active" : ""}`}
                    aria-current={entry.page === page ? "page" : undefined}
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
