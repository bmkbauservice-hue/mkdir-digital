import { contact, legal } from "../content";

// Datenschutzerklärung – beschreibt genau das, was diese Seite technisch tut:
// Hosting bei GitHub Pages, Schriften von Google Fonts, Kontakt per E-Mail/Telefon/WhatsApp.
// Keine Cookies, kein Tracking, keine Formulare.
// Wichtig: Wenn sich die Technik ändert (Shop, Formular, Analyse-Tool, Server für Spiele),
// muss dieser Text angepasst werden.
export function Privacy() {
  const address = [legal.street, legal.city].filter(Boolean);
  return (
    <main className="legal" id="datenschutz-inhalt">
      <div className="wrap legal__inner">
        <a className="legal__back" href="#start">
          ← Zurück zur Startseite
        </a>
        <p className="kicker">Rechtliches</p>
        <h1>Datenschutzerklärung</h1>
        <p className="legal__stand">Stand: {legal.privacyDate}</p>

        <section>
          <h2>1. Wer ist verantwortlich?</h2>
          <p>
            {legal.name}
            <br />
            {address.length ? (
              address.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))
            ) : (
              <>
                <span className="legal__todo">Anschrift wird vor dem Start ergänzt.</span>
                <br />
              </>
            )}
            E-Mail: <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            Telefon: {contact.phoneHref ? <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a> : contact.phone}
          </p>
        </section>

        <section>
          <h2>2. Das Wichtigste in Kürze</h2>
          <ul>
            <li>Diese Website setzt keine Cookies und nutzt keine Analyse- oder Werbe-Tools.</li>
            <li>Es gibt keine Kontaktformulare und kein Kundenkonto.</li>
            <li>Daten fallen nur an, wenn Sie die Seite aufrufen (Server-Protokolle) und wenn Sie mich selbst kontaktieren.</li>
          </ul>
        </section>

        <section>
          <h2>3. Hosting bei GitHub Pages</h2>
          <p>
            Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub Inc., 88 Colin P. Kelly Jr. Street,
            San Francisco, CA 94107, USA (eine Tochter der Microsoft Corporation). Beim Aufruf der Seite verarbeitet
            GitHub technisch notwendige Daten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Aufrufs, die
            aufgerufene Adresse sowie Informationen zu Browser und Betriebssystem. Das ist nötig, um die Seite
            auszuliefern und vor Angriffen zu schützen.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und stabilen
            Bereitstellung der Website). Eine Übermittlung in die USA ist möglich; GitHub ist nach dem
            EU-US Data Privacy Framework zertifiziert. Weitere Informationen:{" "}
            <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" rel="noopener noreferrer" target="_blank">
              Datenschutzerklärung von GitHub
            </a>
            .
          </p>
        </section>

        <section>
          <h2>4. Schriftarten von Google Fonts</h2>
          <p>
            Für eine einheitliche Darstellung nutzt diese Seite Schriftarten von Google Fonts, einem Dienst der Google
            Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Aufruf der Seite lädt Ihr Browser die
            Schriften von Servern von Google. Dabei wird Ihre IP-Adresse an Google übermittelt; eine Übermittlung in die
            USA kann nicht ausgeschlossen werden.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen,
            ansprechenden Darstellung). Weitere Informationen:{" "}
            <a href="https://policies.google.com/privacy?hl=de" rel="noopener noreferrer" target="_blank">
              Datenschutzerklärung von Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2>5. Kontakt per E-Mail, Telefon oder WhatsApp</h2>
          <p>
            Wenn Sie mich per E-Mail, Telefon oder WhatsApp kontaktieren – zum Beispiel über die Schaltflächen „Anfragen“
            oder „Auf die Warteliste“ –, verarbeite ich die Angaben, die Sie mir dabei mitteilen (etwa Name,
            E-Mail-Adresse, Telefonnummer und Ihre Nachricht), um Ihre Anfrage zu beantworten.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn Ihre Anfrage auf einen Auftrag abzielt, sonst
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Ich lösche die Daten,
            sobald sie nicht mehr benötigt werden, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
          <p>
            E-Mails laufen über den Anbieter Proton (Proton AG, Schweiz). Bei Nutzung von WhatsApp gelten zusätzlich die
            Datenschutzbestimmungen von WhatsApp (Meta). Wenn Sie das nicht möchten, schreiben Sie mir bitte per E-Mail.
          </p>
        </section>

        <section>
          <h2>6. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht auf</p>
          <ul>
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO),</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
            <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO).</li>
          </ul>
          <p>
            Schreiben Sie dazu einfach an <a href={`mailto:${contact.email}`}>{contact.email}</a>. Außerdem können Sie
            sich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der für Brandenburg zuständigen
            Landesbeauftragten für den Datenschutz und für das Recht auf Akteneinsicht.
          </p>
        </section>

        <section>
          <h2>7. Externe Links</h2>
          <p>
            Diese Seite enthält Links zu Angeboten anderer Anbieter. Für deren Inhalte und Datenverarbeitung sind die
            jeweiligen Anbieter verantwortlich.
          </p>
        </section>
      </div>
    </main>
  );
}
