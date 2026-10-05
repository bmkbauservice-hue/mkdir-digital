import { useEffect, useState } from "react";

// Mini-Router ohne Zusatzpaket: echte Pfade wie /mkdir-digital/armbaender/.
// - Beim Bauen legt vite.config.ts für jede Seite einen eigenen Ordner mit index.html an
//   → GitHub Pages liefert jede Unterseite direkt aus (Status 200, Google kann sie einzeln finden).
// - Im Browser fängt useLinkInterception() Klicks auf interne Links ab und wechselt die Seite
//   ohne Neuladen (history.pushState). Zurück/Vor funktioniert über "popstate".
// WICHTIG: Neue Seite = hier eintragen UND in vite.config.ts (pageRoutes).

export type PageId =
  | "start"
  | "karten"
  | "gestalten"
  | "armbaender"
  | "zubehoer"
  | "unternehmen"
  | "webdesign"
  | "impressum"
  | "datenschutz";

export const pages: Record<PageId, { path: string; title: string }> = {
  start: { path: "", title: "NFC-Visitenkarten" },
  karten: { path: "karten/", title: "NFC-Karten & Designs" },
  gestalten: { path: "gestalten/", title: "Karte gestalten" },
  armbaender: { path: "armbaender/", title: "NFC-Armbänder" },
  zubehoer: { path: "zubehoer/", title: "NFC-Zubehör" },
  unternehmen: { path: "unternehmen/", title: "Für Unternehmen" },
  webdesign: { path: "webdesign/", title: "Webdesign" },
  impressum: { path: "impressum/", title: "Impressum" },
  datenschutz: { path: "datenschutz/", title: "Datenschutz" },
};

// Alte Links aus der Zeit als One-Pager (…/#armbaender) → auf welcher Seite liegt der Abschnitt jetzt?
const oldHash: Record<string, { page: PageId; section?: string }> = {
  karten: { page: "karten" },
  designs: { page: "karten", section: "designs" },
  "weitere-designs": { page: "karten", section: "weitere-designs" },
  "single-karten": { page: "karten", section: "single-karten" },
  kennenlernen: { page: "karten", section: "single-karten" },
  spielekarte: { page: "karten", section: "spielekarte" },
  armbaender: { page: "armbaender" },
  zubehoer: { page: "zubehoer" },
  unternehmen: { page: "unternehmen" },
  kartensysteme: { page: "unternehmen", section: "kartensysteme" },
  webdesign: { page: "webdesign" },
  impressum: { page: "impressum" },
  datenschutz: { page: "datenschutz" },
};

const base = import.meta.env.BASE_URL; // "/mkdir-digital/"

export function href(page: PageId, section?: string) {
  return `${base}${pages[page].path}${section ? `#${section}` : ""}`;
}

function pageFromPath(pathname: string): PageId {
  const slug = pathname.startsWith(base) ? pathname.slice(base.length).replace(/\/+$/, "") : "";
  const ids = Object.keys(pages) as PageId[];
  return ids.find((id) => pages[id].path.replace(/\/$/, "") === slug) ?? "start";
}

function readRoute() {
  return { page: pageFromPath(window.location.pathname), hash: window.location.hash.slice(1) };
}

// Einmal beim Start aufrufen (main.tsx): alte Hash-Links still auf die neue Adresse umbiegen.
export function redirectOldLinks() {
  const { page, hash } = readRoute();
  const target = page === "start" ? oldHash[hash] : undefined;
  if (target) window.history.replaceState(null, "", href(target.page, target.section));
}

export function navigate(url: string) {
  window.history.pushState(null, "", url);
  window.dispatchEvent(new Event("mkdir:navigate"));
}

// Aktuelle Seite + Anker, aktualisiert sich bei Klicks, Zurück/Vor und Ankern.
export function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    window.addEventListener("mkdir:navigate", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("mkdir:navigate", update);
    };
  }, []);
  return route;
}

// Ein Zuhörer für die ganze Seite: interne Links wechseln die Seite ohne Neuladen.
// Links auf dieselbe Seite (nur anderer Anker) erledigt der Browser selbst.
export function useLinkInterception() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith(base)) return;
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      navigate(url.pathname + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
