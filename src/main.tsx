import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { redirectOldLinks } from "./router";
// Schriften liegen selbst gehostet im Build (Fontsource) – keine Verbindung zu Google Fonts (DSGVO).
import "@fontsource-variable/archivo/standard.css"; // variable Breite + Dicke ("Archivo Variable")
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/hanken-grotesk/700.css";
import "@fontsource/parisienne";
import "./index.css";

// Alte Links aus der One-Pager-Zeit (…/#armbaender) auf die neue Unterseite umbiegen.
redirectOldLinks();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
