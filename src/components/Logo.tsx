import { useId } from "react";

// Das MKDIR-Monogramm: ein kantiges M aus zwei Schenkeln und einem Mittelzug.
export function LogoMark({ size = 36 }: { size?: number }) {
  const id = useId();
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6dd97" />
          <stop offset="0.45" stopColor="#c99a45" />
          <stop offset="0.7" stopColor="#8a6424" />
          <stop offset="1" stopColor="#e9c878" />
        </linearGradient>
      </defs>
      <path d="M6 42V8l6 2.4V42z" fill={`url(#${id}-gold)`} />
      <path d="M42 42V8l-6 2.4V42z" fill={`url(#${id}-gold)`} />
      <path d="M12 10.4 24 27l12-16.6V19L24 35 12 19z" fill={`url(#${id}-gold)`} opacity="0.92" />
    </svg>
  );
}

// Wort-Bild-Marke: das goldene MKDIR-Logo (public/logo-mkdir.webp), daneben klein "Design".
export function Logo() {
  return (
    <a className="logo" href="#start" aria-label="MKDIR-Design, zur Startseite">
      <img
        className="logo-img"
        src={`${import.meta.env.BASE_URL}logo-mkdir.webp`}
        alt="MKDIR"
        width={264}
        height={132}
      />
      <span className="logo-word" aria-hidden="true">
        Design
      </span>
    </a>
  );
}
