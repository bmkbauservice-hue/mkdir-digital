import { LogoMark } from "./Logo";
import type { CardLine } from "../content";

type Props = {
  finish: CardLine["finish"];
  name?: string;
  role?: string;
  large?: boolean;
};

// Eine NFC-Karte im Scheckkartenformat (85,6 × 54 mm), rein aus CSS gezeichnet.
export function CardVisual({ finish, name, role, large = false }: Props) {
  return (
    <div className={`nfc-card nfc-card--${finish}${large ? " nfc-card--large" : ""}`} aria-hidden="true">
      <div className="nfc-card__hex" />
      <div className="nfc-card__top">
        <LogoMark size={large ? 44 : 26} />
        <svg className="nfc-card__signal" viewBox="0 0 24 24">
          <path d="M8 7a7 7 0 0 1 0 10M12 4.5a11 11 0 0 1 0 15M16 2a15 15 0 0 1 0 20" />
        </svg>
      </div>
      <div className="nfc-card__bottom">
        {name ? (
          <>
            <strong>{name}</strong>
            {role && <span>{role}</span>}
          </>
        ) : (
          <strong className="nfc-card__brand">MKDIR</strong>
        )}
      </div>
    </div>
  );
}
