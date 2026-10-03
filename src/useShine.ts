import { useEffect } from "react";

// Licht-Effekt für Kartenbilder: Jedes Element mit dem Attribut data-shine neigt sich leicht
// zur Maus, und ein Glanzpunkt folgt dem Zeiger – wie ein echtes Stück Karte im Licht.
// Am Handy läuft beim Antippen einmal ein Glanzstreifen über das Bild.
//
// Ein einziger Zuhörer für die ganze Seite (Event-Delegation) statt einem pro Bild:
// Neue Bilder brauchen nur data-shine, keinen eigenen Code.
// Kein React-State – die Werte landen direkt als CSS-Variablen am Element, das spart Neu-Rendern.
const VARS = ["--rx", "--ry", "--gx", "--gy"];

function shineTarget(e: Event) {
  return e.target instanceof Element ? e.target.closest<HTMLElement>("[data-shine]") : null;
}

export function useShine() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.classList.remove("is-lit");
      for (const v of VARS) el.style.removeProperty(v);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = shineTarget(e);
      if (el !== current) {
        if (current) reset(current);
        current = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.classList.add("is-lit");
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      if (!reduce.matches) {
        el.style.setProperty("--ry", `${((x - 0.5) * 10).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - y) * 8).toFixed(2)}deg`);
      }
    };

    const leavePage = () => {
      if (current) reset(current);
      current = null;
    };

    const tap = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || reduce.matches) return;
      const el = shineTarget(e);
      if (!el) return;
      el.classList.remove("is-swept");
      el.getBoundingClientRect(); // Layout erzwingen, damit die Animation auch beim zweiten Antippen neu startet
      el.classList.add("is-swept");
    };

    const sweepDone = (e: AnimationEvent) => {
      if (e.animationName === "shine-sweep" && e.target instanceof HTMLElement) e.target.classList.remove("is-swept");
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", tap, { passive: true });
    document.addEventListener("animationend", sweepDone);
    document.documentElement.addEventListener("pointerleave", leavePage);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", tap);
      document.removeEventListener("animationend", sweepDone);
      document.documentElement.removeEventListener("pointerleave", leavePage);
    };
  }, []);
}
