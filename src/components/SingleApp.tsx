import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { singleAnswers, singleProfiles } from "../content";
import { ProfilePhoto } from "./ProfilePhoto";
import { DemoSteps, TapStage, useDemoTimeline, type DemoPhase, type DemoStep } from "./TapDemo";

// Animierte Vorführung der Single-App. Jede der fünf Karten hat ihre eigene App im selben Look.
// Ablauf: Karte antippen → Fotos → Über mich → Antworten. Danach automatisch die nächste Karte.
// Wer selbst etwas antippt, übernimmt – die Automatik stoppt. Alles nur Demo, es wird nichts gesendet.

const steps: DemoStep[] = [
  { id: "tap", title: "Karte antippen", text: "Handy an die Karte halten – ohne App, ohne Anmeldung." },
  { id: "profil", title: "Fotos ansehen", text: "Durch die Bilder wischen wie bei einer Story." },
  { id: "about", title: "Kennenlernen", text: "Ein paar Zeilen und was die Person ausmacht." },
  { id: "frage", title: "Antworten", text: "Ein Klick – anonym, bis man die eigene Nummer selbst teilt." },
];

export function SingleApp() {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(true); // nach jeder Runde zur nächsten Karte?
  const [userPick, setUserPick] = useState<string | null>(null);
  const profile = singleProfiles[index];
  const n = profile.photos.length;

  // Zeitleiste: Dauer der Teilschritte in ms. useMemo, damit sie nicht bei jedem Rendern neu entsteht.
  const phases = useMemo<DemoPhase[]>(
    () => [
      { id: "tap", ticks: [2800] },
      { id: "profil", ticks: profile.photos.map(() => 1600) },
      { id: "about", ticks: [2800] },
      { id: "frage", ticks: [1700, 3400] }, // erst der Finger, dann die Antwort
    ],
    [profile],
  );

  // Am Ende einer Runde: eigene Antwort vergessen und ggf. zur nächsten Karte.
  // (Zurücksetzen passiert in Ereignissen wie diesem, nicht in einem Effekt.)
  const demo = useDemoTimeline(phases, profile.id, () => {
    setUserPick(null);
    if (cycle) setIndex((i) => (i + 1) % singleProfiles.length);
  });
  const { phase, tick } = demo;

  const scrollRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  // Welches Foto? In der Foto-Phase zählt der Teilschritt, danach bleibt das letzte stehen.
  const photo = phase === "profil" ? tick : phase === "tap" ? 0 : n - 1;
  // Antwort: die selbst gewählte – sonst wählt die Automatik im zweiten Teilschritt die erste.
  const picked = userPick ?? (phase === "frage" && tick >= 1 ? singleAnswers[0] : null);

  // Im Handy zum passenden Teil scrollen (nur innerhalb des Handys, nicht die Seite).
  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;
    const target = phase === "about" ? aboutRef.current : phase === "frage" ? askRef.current : null;
    box.scrollTo({ top: target ? target.offsetTop - 12 : 0, behavior: demo.reduced ? "auto" : "smooth" });
  }, [phase, demo.reduced, profile.id]);

  // Nach einer Antwort ganz nach unten, damit die Bestätigung den gewählten Button nicht verdeckt.
  useEffect(() => {
    const box = scrollRef.current;
    if (box && picked) box.scrollTo({ top: box.scrollHeight, behavior: demo.reduced ? "auto" : "smooth" });
  }, [picked, demo.reduced]);

  const choose = (i: number) => {
    setCycle(false); // eigene Wahl: bei dieser Karte bleiben
    setUserPick(null);
    setIndex(i);
  };

  const goPhoto = (step: number) => demo.goTo("profil", Math.min(n - 1, Math.max(0, photo + step)));

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
    demo.goTo("frage", 1);
    setUserPick(a);
  };

  const toast =
    picked === "Nein, danke"
      ? `Alles klar – ${profile.name} bekommt ein freundliches Nein.`
      : picked === "Vielleicht"
        ? `${profile.name} erfährt: Vielleicht. Kein Druck.`
        : `Gesendet! ${profile.name} sieht deine Antwort – deine Nummer nur, wenn du willst.`;

  const current = steps.findIndex((s) => s.id === phase);

  return (
    <div className="tap-demo" ref={demo.rootRef} data-tap={phase === "tap" || undefined} data-playing={demo.playing || undefined}>
      <DemoSteps
        steps={steps}
        current={current}
        onPick={(id) => {
          if (id === "tap" || id === "profil") setUserPick(null);
          demo.goTo(id);
        }}
        autoplay={demo.autoplay}
        reduced={demo.reduced}
        onPause={demo.pause}
        onRestart={() => {
          setCycle(true);
          setUserPick(null);
          demo.restart();
        }}
      >
        <div className="tap-demo__picker">
          <span className="tap-demo__picker-label">Karte wählen – jede hat ihre eigene App:</span>
          <div className="tap-demo__cards" role="radiogroup" aria-label="Single-Karte für die Vorschau">
            {singleProfiles.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={i === index}
                aria-label={`${p.cardName} (${p.look === "him" ? "für ihn" : "für sie"}) – Profil ${p.name}`}
                onClick={() => choose(i)}
              >
                <img src={`${import.meta.env.BASE_URL}single/${p.card}`} alt="" width={1200} height={706} loading="lazy" />
                <span>{p.cardName}</span>
              </button>
            ))}
          </div>
        </div>
      </DemoSteps>

      <TapStage
        card={
          <img src={`${import.meta.env.BASE_URL}single/${profile.card}`} alt="" width={1200} height={706} draggable={false} />
        }
        cardKey={profile.id}
        theme={profile.theme}
        themeId={profile.id}
        label={`Vorschau der Single-App im Design ${profile.cardName}: Profil von ${profile.name}`}
        note={{ app: "MKDIR Single", text: "Jemand möchte dich kennenlernen. Tippe zum Ansehen." }}
        onNote={() => demo.goTo("profil")}
        locked={phase === "tap"}
      >
        <div className="single-app__bar">
          <span>
            MKDIR <b>Single</b>
          </span>
          <span className="single-app__badge">Unikat ✓</span>
        </div>
        <div className="single-app__scroll" ref={scrollRef}>
          <div className="single-app__photos" onPointerDown={down} onPointerUp={up}>
            {profile.photos.map((p, i) => (
              <div key={`${profile.id}-${i}`} className={`single-app__photo${i === photo ? " is-active" : ""}`}>
                <ProfilePhoto photo={p} look={profile.look} palette={profile.id} />
              </div>
            ))}
            <div className="single-app__progress" aria-hidden="true">
              {profile.photos.map((_, i) => (
                <span key={i} className={i < photo ? "is-done" : undefined}>
                  {i === photo && (
                    <i
                      key={`${profile.id}-${photo}-${demo.playing && phase === "profil"}`}
                      className={demo.playing && phase === "profil" ? "is-running" : "is-full"}
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
                  {i === 0 && demo.playing && phase === "frage" && !picked && (
                    <span className="tap-finger" aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className={`tap-app__toast${picked ? " is-shown" : ""}`} role="status">
          {picked ? toast : ""}
        </p>
      </TapStage>
    </div>
  );
}
