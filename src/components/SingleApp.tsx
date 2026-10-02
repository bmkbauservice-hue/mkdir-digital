import { useEffect, useRef, useState, type PointerEvent } from "react";
import { singleAnswers, type SingleProfile } from "../content";
import { ProfilePhoto } from "./ProfilePhoto";

// Animierte Vorführung der Single-App: Karte antippen → Profil mit Fotos → Über mich → Antworten.
// Läuft von allein in Schleife, solange der Bereich sichtbar ist. Sobald man selbst etwas antippt,
// stoppt die Automatik und man kann frei ausprobieren. Alles nur Demo – es wird nichts gesendet.

type Phase = "tap" | "profil" | "about" | "frage";

const steps: { id: Phase; title: string; text: string }[] = [
  { id: "tap", title: "Karte antippen", text: "Handy an die Karte halten – ohne App, ohne Anmeldung." },
  { id: "profil", title: "Fotos ansehen", text: "Durch die Bilder wischen wie bei einer Story." },
  { id: "about", title: "Kennenlernen", text: "Ein paar Zeilen und was die Person ausmacht." },
  { id: "frage", title: "Antworten", text: "Ein Klick – anonym, bis man die eigene Nummer selbst teilt." },
];

// Dauer der einzelnen Schritte in Millisekunden
const TIMING = { tap: 2800, photo: 1600, about: 2800, pick: 1700, after: 3400 };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function SingleApp({ profile }: { profile: SingleProfile }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "profil" : "tap");
  const [photo, setPhoto] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(!reduced);
  const [inView, setInView] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  const n = profile.photos.length;
  const playing = autoplay && inView && !reduced;

  // Neues Profil (Tab gewechselt) → Vorführung von vorn.
  useEffect(() => {
    setPhase(reduced ? "profil" : "tap");
    setPhoto(0);
    setPicked(null);
  }, [profile, reduced]);

  // Nur abspielen, wenn der Bereich wirklich im Bild ist (spart Akku, nichts läuft heimlich weiter).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Der Ablauf: immer nur den nächsten Schritt planen. Ändert sich etwas, wird neu geplant.
  useEffect(() => {
    if (!playing) return;
    let t: number;
    if (phase === "tap") t = window.setTimeout(() => setPhase("profil"), TIMING.tap);
    else if (phase === "profil")
      t = window.setTimeout(() => (photo < n - 1 ? setPhoto(photo + 1) : setPhase("about")), TIMING.photo);
    else if (phase === "about") t = window.setTimeout(() => setPhase("frage"), TIMING.about);
    else if (!picked) t = window.setTimeout(() => setPicked(singleAnswers[0]), TIMING.pick);
    else
      t = window.setTimeout(() => {
        setPhase("tap");
        setPhoto(0);
        setPicked(null);
      }, TIMING.after);
    return () => window.clearTimeout(t);
  }, [playing, phase, photo, picked, n]);

  // Im Handy zum passenden Teil des Profils scrollen (nur innerhalb des Handys, nicht die Seite).
  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;
    const target = phase === "about" ? aboutRef.current : phase === "frage" ? askRef.current : null;
    box.scrollTo({ top: target ? target.offsetTop - 12 : 0, behavior: reduced ? "auto" : "smooth" });
  }, [phase, reduced]);

  // Nach einer Antwort ganz nach unten, damit die Bestätigung den gewählten Button nicht verdeckt.
  useEffect(() => {
    const box = scrollRef.current;
    if (box && picked) box.scrollTo({ top: box.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [picked, reduced]);

  // Selbst ausprobieren: Automatik aus.
  const takeOver = () => setAutoplay(false);

  const goPhase = (p: Phase) => {
    takeOver();
    setPhase(p);
    if (p === "tap") {
      setPhoto(0);
      setPicked(null);
    }
  };

  const goPhoto = (step: number) => {
    takeOver();
    if (phase !== "profil") setPhase("profil");
    setPhoto((i) => Math.min(n - 1, Math.max(0, i + step)));
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = e.clientX;
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) goPhoto(dx < 0 ? 1 : -1);
  };

  const pick = (a: string) => {
    takeOver();
    setPhase("frage");
    setPicked(a);
  };

  const toast =
    picked === "Nein, danke"
      ? `Alles klar – ${profile.name} bekommt ein freundliches Nein.`
      : picked === "Vielleicht"
        ? `${profile.name} erfährt: Vielleicht. Kein Druck.`
        : `Gesendet! ${profile.name} sieht deine Antwort – deine Nummer nur, wenn du willst.`;

  const restart = () => {
    setPhase("tap");
    setPhoto(0);
    setPicked(null);
    setAutoplay(true);
  };

  const current = steps.findIndex((s) => s.id === phase);

  return (
    <div className="single-demo" ref={rootRef} data-phase={phase} data-playing={playing || undefined}>
      <div className="single-demo__copy">
        <ol className="single-demo__steps">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={i === current ? "is-current" : i < current ? "is-done" : undefined}
                aria-current={i === current ? "step" : undefined}
                onClick={() => goPhase(s.id)}
              >
                <span className="single-demo__num">{i + 1}</span>
                <span>
                  <strong>{s.title}</strong>
                  <small>{s.text}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="single-demo__play" onClick={autoplay ? takeOver : restart} disabled={reduced}>
          {autoplay ? "❚❚ Animation anhalten" : "▶ Animation abspielen"}
        </button>
      </div>

      <div className="single-demo__stage">
        <img
          className="single-demo__card"
          src={`${import.meta.env.BASE_URL}single/${profile.card}`}
          alt=""
          width={1200}
          height={706}
          draggable={false}
        />
        <span className="single-demo__waves" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <div className="single-phone" role="group" aria-label={`Vorschau der Single-App: Profil von ${profile.name}`}>
          <div className="single-phone__screen">
            {/* Sperrbildschirm mit Mitteilung – sichtbar im Schritt "Karte antippen" */}
            <div className="single-lock" inert={phase !== "tap"}>
              <span className="single-lock__time">21:47</span>
              <span className="single-lock__date">Freitag</span>
              <button type="button" className="single-lock__note" onClick={() => goPhase("profil")}>
                <span className="single-lock__icon">M</span>
                <span>
                  <strong>MKDIR Single</strong>
                  <small>Jemand möchte dich kennenlernen. Tippe zum Ansehen.</small>
                </span>
              </button>
            </div>

            {/* Die App */}
            <div className="single-app" inert={phase === "tap"}>
              <div className="single-app__bar">
                <span>
                  MKDIR <b>Single</b>
                </span>
                <span className="single-app__badge">Unikat ✓</span>
              </div>
              <div className="single-app__scroll" ref={scrollRef}>
                <div className="single-app__photos" onPointerDown={down} onPointerUp={up}>
                  {profile.photos.map((p, i) => (
                    <div key={`${profile.name}-${i}`} className={`single-app__photo${i === photo ? " is-active" : ""}`}>
                      <ProfilePhoto photo={p} look={profile.look} />
                    </div>
                  ))}
                  <div className="single-app__progress" aria-hidden="true">
                    {profile.photos.map((_, i) => (
                      <span key={i} className={i < photo ? "is-done" : undefined}>
                        {i === photo && (
                          <i
                            key={`${photo}-${playing && phase === "profil"}`}
                            className={playing && phase === "profil" ? "is-running" : "is-full"}
                          />
                        )}
                      </span>
                    ))}
                  </div>
                  <button type="button" className="single-app__zone single-app__zone--prev" onClick={() => goPhoto(-1)}>
                    <span className="sr-only">Vorheriges Foto</span>
                  </button>
                  <button type="button" className="single-app__zone single-app__zone--next" onClick={() => goPhoto(1)}>
                    <span className="sr-only">Nächstes Foto</span>
                  </button>
                  <div className="single-app__name">
                    <strong>
                      {profile.name}, {profile.age}
                    </strong>
                    <span>
                      {profile.place} · {profile.photos[photo].caption}
                    </span>
                  </div>
                </div>

                <div className="single-app__about" ref={aboutRef}>
                  <h4>Über mich</h4>
                  <p>{profile.bio}</p>
                  <ul>
                    {profile.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="single-app__ask" ref={askRef}>
                  <strong>{profile.question}</strong>
                  <div className="single-app__answers">
                    {singleAnswers.map((a, i) => (
                      <button
                        key={a}
                        type="button"
                        className={picked === a ? "is-picked" : undefined}
                        aria-pressed={picked === a}
                        onClick={() => pick(a)}
                      >
                        {a}
                        {i === 0 && playing && phase === "frage" && !picked && (
                          <span className="single-finger" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className={`single-app__toast${picked ? " is-shown" : ""}`} role="status">
                {picked ? toast : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
