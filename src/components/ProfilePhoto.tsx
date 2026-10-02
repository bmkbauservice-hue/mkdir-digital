import { useId } from "react";
import type { ProfilePhoto as Photo } from "../content";

// Kopf-und-Schultern-Umriss für das Porträt-Motiv (kein echtes Gesicht).
function Silhouette({ look }: { look: "him" | "her" }) {
  return (
    <>
      {look === "her" && <path d="M92 178C88 112 120 92 152 92c34 0 62 20 58 86 4 55 14 87 26 115H66c12-28 22-60 26-115Z" />}
      <path d="M40 400c5-90 50-132 110-138 60 6 105 48 110 138Z" />
      <rect x="132" y="210" width="36" height="58" rx="12" />
      <ellipse cx="150" cy="168" rx={look === "her" ? 42 : 46} ry={look === "her" ? 52 : 56} />
      {look === "him" && <path d="M104 160c-2-48 26-60 48-60 30 0 48 18 44 62-6-22-26-34-46-32-20 2-38 10-46 30Z" />}
    </>
  );
}

// Ein Foto im Profil der Single-App.
// Gibt es ein echtes Bild (photo.image), wird es angezeigt – sonst ein gezeichnetes Motiv als Platzhalter.
// Alle Motive sind 300 × 400 (Hochformat 3 : 4) und skalieren mit dem Rahmen.
export function ProfilePhoto({ photo, look }: { photo: Photo; look: "him" | "her" }) {
  // useId liefert Zeichen wie « », die in SVG-Verweisen (url(#…)) stören – daher bereinigen.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;

  if (photo.image) {
    return (
      <img
        className="profile-photo"
        src={`${import.meta.env.BASE_URL}single-profil/${photo.image}`}
        alt={photo.caption}
        draggable={false}
      />
    );
  }

  return (
    <svg className="profile-photo" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={photo.caption}>
      {photo.scene === "portrait" && (
        <>
          <defs>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a1240" />
              <stop offset="0.55" stopColor="#a8435a" />
              <stop offset="1" stopColor="#f0a35c" />
            </linearGradient>
            <linearGradient id={id("body")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0d0812" />
              <stop offset="0.7" stopColor="#1d1220" />
              <stop offset="1" stopColor="#4a2a2a" />
            </linearGradient>
            <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0.45" stopColor="#ffcf8a" stopOpacity="0" />
              <stop offset="1" stopColor="#ffcf8a" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect width="300" height="400" fill={url("sky")} />
          {/* Bokeh-Lichter */}
          <g fill="#ffd9a0">
            <circle cx="48" cy="92" r="16" opacity="0.18" />
            <circle cx="250" cy="70" r="24" opacity="0.14" />
            <circle cx="232" cy="190" r="10" opacity="0.25" />
            <circle cx="70" cy="220" r="12" opacity="0.2" />
            <circle cx="268" cy="250" r="18" opacity="0.12" />
          </g>
          {/* Erst nur die Kontur (Gegenlicht), darüber die Füllung: so bleibt nur der äußere Lichtrand sichtbar. */}
          <g fill="none" stroke={url("rim")} strokeWidth="5">
            <Silhouette look={look} />
          </g>
          <g fill={url("body")}>
            <Silhouette look={look} />
          </g>
        </>
      )}

      {photo.scene === "meer" && (
        <>
          <defs>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1b1446" />
              <stop offset="0.6" stopColor="#b0405f" />
              <stop offset="1" stopColor="#f59a4f" />
            </linearGradient>
            <linearGradient id={id("sea")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a2453" />
              <stop offset="1" stopColor="#0b0d2a" />
            </linearGradient>
          </defs>
          <rect width="300" height="252" fill={url("sky")} />
          <circle cx="150" cy="240" r="42" fill="#ffd27a" />
          <circle cx="150" cy="240" r="70" fill="#ffd27a" opacity="0.15" />
          <rect y="250" width="300" height="150" fill={url("sea")} />
          {/* Spiegelung der Sonne */}
          <g fill="#ffd27a">
            <rect x="112" y="258" width="76" height="3" rx="1.5" opacity="0.9" />
            <rect x="122" y="270" width="56" height="3" rx="1.5" opacity="0.7" />
            <rect x="130" y="284" width="40" height="3" rx="1.5" opacity="0.55" />
            <rect x="137" y="300" width="26" height="3" rx="1.5" opacity="0.4" />
            <rect x="142" y="318" width="16" height="3" rx="1.5" opacity="0.28" />
          </g>
          <g fill="none" stroke="#c98ab0" strokeWidth="1.5" opacity="0.35">
            <path d="M10 336q20-6 40 0t40 0" />
            <path d="M190 350q20-6 40 0t40 0" />
            <path d="M60 372q20-6 40 0t40 0" />
          </g>
        </>
      )}

      {photo.scene === "berge" && (
        <>
          <defs>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0c1a3a" />
              <stop offset="0.6" stopColor="#5a4a7a" />
              <stop offset="1" stopColor="#f2a070" />
            </linearGradient>
          </defs>
          <rect width="300" height="400" fill={url("sky")} />
          <g fill="#fff">
            <circle cx="40" cy="40" r="1.5" opacity="0.8" />
            <circle cx="120" cy="24" r="1.2" opacity="0.7" />
            <circle cx="210" cy="56" r="1.6" opacity="0.8" />
            <circle cx="268" cy="30" r="1.1" opacity="0.6" />
            <circle cx="80" cy="96" r="1" opacity="0.5" />
          </g>
          <circle cx="210" cy="250" r="60" fill="#ffc98a" opacity="0.25" />
          <path d="M0 290 70 170l50 70 60-110 120 170v170H0Z" fill="#4b3b66" />
          <path d="m180 130 26 38-14-6-12 14-10-16-14 8Z" fill="#f4eefc" opacity="0.9" />
          <path d="M0 330 90 230l60 60 50-40 100 100v50H0Z" fill="#2a2140" />
          <path d="M0 370 120 300l80 40 100-30v90H0Z" fill="#141026" />
        </>
      )}

      {photo.scene === "kaffee" && (
        <>
          <defs>
            <linearGradient id={id("wood")} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6a4429" />
              <stop offset="1" stopColor="#2e1c11" />
            </linearGradient>
            <radialGradient id={id("coffee")}>
              <stop offset="0" stopColor="#8a5530" />
              <stop offset="0.8" stopColor="#5a3218" />
              <stop offset="1" stopColor="#c58a52" />
            </radialGradient>
          </defs>
          <rect width="300" height="400" fill={url("wood")} />
          <g stroke="#1e120a" strokeWidth="2" opacity="0.5">
            <path d="M0 96h300M0 212h300M0 320h300" />
          </g>
          <circle cx="150" cy="210" r="100" fill="#2a1a10" opacity="0.35" />
          <circle cx="150" cy="200" r="96" fill="#ece5d9" />
          <rect x="232" y="180" width="54" height="26" rx="13" fill="#f6f1e9" transform="rotate(-20 232 193)" />
          <circle cx="150" cy="200" r="72" fill="#f6f1e9" />
          <circle cx="150" cy="200" r="60" fill={url("coffee")} />
          <path d="M150 230c-30-20-38-34-30-46 6-10 22-10 30 4 8-14 24-14 30-4 8 12 0 26-30 46Z" fill="#f3e3cc" opacity="0.92" />
        </>
      )}

      {photo.scene === "konzert" && (
        <>
          <defs>
            <linearGradient id={id("pink")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff2fb4" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ff2fb4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={id("cyan")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2ef2ff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#2ef2ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="300" height="400" fill="#08040f" />
          <path d="M60 0h18l90 330H0Z" fill={url("pink")} />
          <path d="M222 0h18l60 330H120Z" fill={url("cyan")} />
          <path d="M142 0h16l70 330H70Z" fill={url("pink")} opacity="0.5" />
          <g fill="#fff">
            <circle cx="69" cy="6" r="6" />
            <circle cx="231" cy="6" r="6" />
            <circle cx="150" cy="6" r="5" />
          </g>
          {/* Publikum */}
          <g fill="#040208">
            <path d="M0 400V350h300v50Z" />
            {[10, 46, 84, 120, 158, 196, 232, 270].map((x, i) => (
              <circle key={x} cx={x + 8} cy={340 + (i % 2) * 8} r="20" />
            ))}
            <path d="M96 330 82 268l10-2 14 60Z" />
            <path d="M210 334l18-60 10 3-16 60Z" />
          </g>
        </>
      )}

      {photo.scene === "stadt" && (
        <>
          <defs>
            <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#090e2a" />
              <stop offset="1" stopColor="#3a2150" />
            </linearGradient>
          </defs>
          <rect width="300" height="400" fill={url("sky")} />
          <circle cx="232" cy="70" r="20" fill="#f7ecd0" />
          <circle cx="240" cy="64" r="18" fill="#0f1230" />
          {/* Fernsehturm */}
          <g fill="#0a0b1c">
            <rect x="96" y="70" width="4" height="60" />
            <rect x="92" y="130" width="12" height="190" />
            <circle cx="98" cy="150" r="17" />
          </g>
          <circle cx="98" cy="70" r="2.5" fill="#ff4d5e" />
          <path
            d="M0 400V290h30v-30h34v40h26v-70h40v90h24v-50h36v30h22v-60h44v80h22v-20h22v170Z"
            fill="#0b0d1c"
          />
          <g fill="#ffd27a">
            {[
              [8, 300], [40, 270], [48, 290], [104, 250], [114, 280], [104, 310], [160, 300], [168, 320],
              [210, 250], [222, 270], [214, 300], [254, 320], [280, 310],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="6" height="8" opacity="0.85" />
            ))}
          </g>
        </>
      )}
    </svg>
  );
}
