/* Fragenkatalog Quiz-Bahn 408
 * 100 Fragen. Felder:
 *   id       eindeutige Kennung (nicht ändern, wird für "schon gestellt" genutzt)
 *   thema    Themenbereich (Filter in den Einstellungen)
 *   d        easy | medium | hard  (Reihum-Modus: 1 | 2 | 3 Felder)
 *   hz       true = Störfallfrage am Bahnübergang
 *   q, a     Frage und 4–5 Antworten
 *   correct  Index der richtigen Antwort in a (ab 0) – die Antworten werden im Spiel gemischt
 *   ex, src  Erklärung und Fundstelle (Ril 408, Handbuch 40800 V9.0, gültig ab 14.12.2025)
 *   korrigiert  Hinweis, wenn eine Schülerfrage fachlich korrigiert wurde
 */
window.QB_FRAGEN = [
 {
  "id": "F001",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Stelle bzw. Zentrale ist nachfolgend beschrieben? „Hier wird der gesamte Zugverkehr auf dem Schienennetz der Deutschen Bahn koordiniert. Darauf aufbauend koordiniert sie bei Ereignissen mit überregionalen und bahngrenzüberschreitenden Auswirkungen die erforderlichen Maßnahmen.“",
  "a": [
   "Infoleitstelle",
   "Notfallleitstelle",
   "Betriebszentrale",
   "Netzleitzentrale",
   "Steuerzentrale"
  ],
  "correct": 3
 },
 {
  "id": "F002",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wie lautet der Wortlaut der Zugmeldung, wenn ein bereits abgemeldeter Zug zunächst nicht abfährt und deshalb die Zugmeldung zurückgenommen werden muss?",
  "a": [
   "„Berichtigte Zugmeldung, Zug 60300 kommt nicht.“",
   "„Zugmeldung, Abmeldung für Zug 60300 wird zurückgenommen.“",
   "„Zugmeldung, Zug 60300 kommt nicht.“",
   "„Berichtigte Zugmeldung, Zugmeldung für Zug 60300 wird zurückgenommen.“",
   "„Berichtigte Zugmeldung, Abmeldung für Zug 60300 wird zurückgenommen.“"
  ],
  "correct": 4
 },
 {
  "id": "F003",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Zur Fahrwegprüfung gehört auch das Feststellen, ob die zu befahrenden Weichen richtig gestellt sind. Bei welchen Weichen muss an der Außenanlage die richtige Stellung überprüft werden?",
  "a": [
   "Bei geriegelten Weichen",
   "Bei elektrisch gestellten Weichen",
   "Bei ortsgestellten Weichen, die weder geriegelt noch durch Handverschluss gesichert sind",
   "Bei ortsgestellten Weichen, die geriegelt sind",
   "Bei Rückfallweichen"
  ],
  "correct": 2,
  "src": "Ril 408.0601 Abschnitt 1 Absatz (1) a)"
 },
 {
  "id": "F004",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Die Zustimmung zu einer Zugfahrt soll zurückgenommen werden. Wann darf ein Hauptsignal auf Halt gestellt und die Fahrstraße aufgelöst werden?",
  "a": [
   "Eine durch Hauptsignal erteilte Zustimmung darf immer zurückgenommen werden, wenn es der Fahrdienstleiter für erforderlich hält",
   "Bei fahrenden Zügen, wenn die Zugspitze noch nicht am zurückzunehmenden Signal vorbeigefahren ist",
   "Bei fahrenden Zügen, wenn die Zugspitze sich noch im ausreichenden Abstand zum zurückzunehmenden Signal befindet",
   "Bei haltenden Zügen, wenn anzunehmen ist, dass der Zug halten bleibt",
   "Bei haltenden Zügen, wenn der Triebfahrzeugführer bestätigt hat, dass der Zug halten bleibt"
  ],
  "correct": 4,
  "src": "Ril 408.0458 Abschnitt 2 Absatz (1)"
 },
 {
  "id": "F005",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Es soll ein Zug in einen Bahnhof einfahren. Dazu muss unter anderem geprüft werden, dass der Fahrweg frei von Fahrzeugen ist. Wie erfolgt die Prüfung auf Freisein, wenn keine Gleisfreimeldeanlage vorhanden ist?",
  "a": [
   "Durch eine Abschnittsprüfung",
   "Durch Hinsehen",
   "Durch eine Räumungsprüfung",
   "Durch die Feststellung, dass der zuletzt ausgefahrene Zug den Bahnhof mit Zg 2 verlassen hat",
   "Durch eine Zugvollständigkeitsmeldung des Tf"
  ],
  "correct": 1
 },
 {
  "id": "F006",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welcher Fdl ist für das Einführen des Fahrens auf dem Gegengleis zuständig, wenn kein Gleiswechselbetrieb eingerichtet ist?",
  "a": [
   "Der Fdl, der planmäßig Zugfahrten in dieses Gleis zulässt",
   "Der Fdl, der die Züge auf das Gegengleis ablassen will",
   "Der für das Sperren von Gleisen zuständige Fdl",
   "Der von der Betriebszentrale bestimmte Fdl",
   "Der Fdl, dem ein Zug auf dem Gegengleis abgemeldet wird"
  ],
  "correct": 1,
  "src": "Ril 408.0463 Abschnitt 1 Absatz (1) c)"
 },
 {
  "id": "F007",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Aussage zu Sperrfahrten ist richtig?",
  "a": [
   "Sperrfahrten erhalten für Hin- und Rückfahrt je eine Zugnummer.",
   "Unvorhergesehene Sperrfahrten fahren nach dem Sonderfahrplan.",
   "Bei geplanten Sperrfahrten dürfen die Angaben der Fahrplan-Mitteilung durch Eintrag im Befehl 14 bekannt gegeben werden.",
   "Sperrfahrten müssen von Zugmeldestelle zu Zugmeldestelle verkehren.",
   "In ein gesperrtes Streckengleis dürfen mehrere Sperrfahrten eingelassen werden."
  ],
  "correct": 4,
  "src": "Ril 408.0481 Abschnitt 1 Absatz (2)"
 },
 {
  "id": "F008",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welches der aufgeführten Signale darf als Zielsignal für einfahrende Züge verwendet werden?",
  "a": [
   "Haltetafel",
   "Hochstehendes Lichtsperrsignal",
   "Wartezeichen",
   "Haltepunktetafel",
   "Vorsignal"
  ],
  "correct": 1
 },
 {
  "id": "F009",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Auf der orangefarbenen Tafel eines Kesselwagens ist der Nummer zur Kennzeichnung der Gefahr ein „X“ vorangestellt. Welche Bedeutung hat dieses Zeichen?",
  "a": [
   "Es handelt sich um ein stark giftiges Gut.",
   "Es handelt sich um ein Gut, das mit Luft heftig reagiert.",
   "Es handelt sich um ein Gut, das mit Wasser gefährlich reagiert.",
   "Es handelt sich um ein schwach radioaktives Gut.",
   "Es handelt sich um ein Gut, von dem nur eine sehr geringe Gefahr ausgeht."
  ],
  "correct": 2
 },
 {
  "id": "F010",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "hz": true,
  "q": "Wegen drohender Gefahr wurden Züge angehalten. Wann dürfen diese ihre Fahrt fortsetzen?",
  "a": [
   "Wenn der Triebfahrzeugführer festgestellt hat, dass die drohende Gefahr beseitigt ist",
   "Wenn der Notfallmanager die Zustimmung zur Weiterfahrt gegeben hat",
   "Wenn die Betriebszentrale die Zustimmung zur Weiterfahrt gegeben hat",
   "Wenn der Fahrdienstleiter die Zustimmung zur Weiterfahrt gegeben hat",
   "Wenn ein sonstiger Mitarbeiter mit betrieblichen Aufgaben die Zustimmung zur Weiterfahrt gegeben hat"
  ],
  "correct": 3,
  "src": "Ril 408.0581 Abschnitt 5"
 },
 {
  "id": "F011",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wie wird eine Räumungsprüfung bestätigt?",
  "a": [
   "Mit der Abmeldung eines Zuges",
   "Mit der Ankunftsmeldung aller Fahrzeuge eines Zuges",
   "Mit der Rückmeldung eines Zuges",
   "Mit einer Zugschlussmeldung eines Zuges"
  ],
  "correct": 2
 },
 {
  "id": "F012",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Bedeutung hat die untere Nummer (UN-Nummer) auf einer orangefarbenen Tafel?",
  "a": [
   "Hinweis auf die schriftlichen Weisungen gemäß RID",
   "Kennzeichnung des Gefahrguts",
   "Kennzeichnung des Wageneinstellers",
   "Kennzeichnung der Gefahr",
   "Klasse und Ziffer nach RID"
  ],
  "correct": 1
 },
 {
  "id": "F013",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Mit welcher Geschwindigkeit darf der Zug zurücksetzen, wenn sich der Tf nicht an der Spitze des Zuges befindet?",
  "a": [
   "Schrittgeschwindigkeit",
   "10 km/h",
   "20 km/h",
   "30 km/h",
   "40 km/h"
  ],
  "correct": 1,
  "ex": "Beim Zurücksetzen muss der Zug so langsam fahren, dass er jederzeit anhalten kann – höchstens 10 km/h. Befindet sich der Tf an der Spitze, sind 20 km/h zulässig.",
  "src": "Ril 408.0572 Abschnitt 5",
  "korrigiert": "Lösung war 20 km/h – korrigiert auf 10 km/h"
 },
 {
  "id": "F014",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was muss Ihnen der Tf zusätzlich zur Meldung, dass das Zurücksetzen beendet ist, noch melden?",
  "a": [
   "Das Freisein des vorliegenden Gleisabschnitts",
   "Die Vollständigkeit des Zuges",
   "Das Räumen der Zugschlussstelle",
   "Die Rückkehr aller Fahrzeuge",
   "Die Stellung des Hauptsignals"
  ],
  "correct": 1,
  "src": "Ril 408.0572 Abschnitt 6 Absatz (1)"
 },
 {
  "id": "F015",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Maßnahmen muss der Fdl treffen, wenn an einem Hauptsignal gearbeitet werden soll?",
  "a": [
   "Zugangsweichen in abweisender Stellung sperren",
   "Merkhinweis „!“ neben der Signaltaste",
   "Hilfssperre beim Fahrdienstleiter an der Einrichtung für die Fahrstraßenprüfung",
   "Einzelsperrung des Signals",
   "Bedienungsausschaltung der Signalwahlgruppen"
  ],
  "correct": 3
 },
 {
  "id": "F016",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wer legt die Qualitätspolitik und die Qualitätsziele für das QM-System im Unternehmen fest?",
  "a": [
   "Der QM-Auditor",
   "Der QM-Manager",
   "Die Kunden",
   "Die Unternehmensleitung",
   "Die jeweilige DIN-Norm"
  ],
  "correct": 3
 },
 {
  "id": "F017",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Es wird entschieden, dass der Zug zurückgesetzt werden soll. Welche Aussage ist richtig?",
  "a": [
   "Das Zurücksetzen des Zugs im Bahnhof ist nur zulässig, wenn es im Streckenbuch erlaubt ist",
   "Das Zurücksetzen des Zuges erfolgt im Bahnhof als Rangierfahrt",
   "Ein Zurücksetzen des Zugs ist nur bei sichtigem Wetter erlaubt",
   "Die Zustimmung zum Zurücksetzen des Zugs erfolgt mündlich",
   "Die Zustimmung zum Zurücksetzen des Zugs erfolgt mit Befehl"
  ],
  "correct": 4,
  "ex": "Die Zustimmung erteilt der Fdl durch Befehl 95 mit Auftrag 95.95.",
  "src": "Ril 408.0572 Abschnitt 3 Absatz (2)"
 },
 {
  "id": "F018",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Zugmeldungen müssen für eine Zugfahrt auf Gegengleis gegeben werden, wenn auf der Strecke Gleiswechselbetrieb ständig eingerichtet ist?",
  "a": [
   "Anbieten, Annehmen, Abmelden mit dem Zusatz „auf dem Gegengleis“ und Rückmelden",
   "Anbieten, Annehmen, Abmelden mit dem Zusatz „auf dem Gegengleis“",
   "Abmelden mit dem Zusatz „auf dem Gegengleis“ und Rückmelden",
   "Nur Abmelden mit dem Zusatz „auf dem Gegengleis“",
   "Nur Rückmelden"
  ],
  "correct": 1,
  "src": "Ril 408.0463 Abschnitte 5 und 7"
 },
 {
  "id": "F019",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Sie wollen auf einer eingleisigen Strecke von der planmäßigen Reihenfolge der Züge abweichen. Unter welchen Voraussetzungen ist dies zugelassen?",
  "a": [
   "Wenn die Zustimmung durch den Netzkoordinator erteilt wurde",
   "Wenn die BZ von der geänderten Reihenfolge unterrichtet wurde",
   "Wenn dies mit den beteiligten Zugmeldestellen vereinbart und die beteiligten Mitarbeiter auf den Betriebsstellen unterrichtet wurden",
   "Wenn mit der Zugmeldung die geänderte Reihenfolge der Züge bekannt gegeben wurde",
   "Wenn der Tf der betroffenen Zugfahrt von der geänderten Reihenfolge unterrichtet wurde"
  ],
  "correct": 2
 },
 {
  "id": "F020",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wie nennt man ein auf das QM-System ausgerichtetes Audit, bei dem die Wirksamkeit der QM-Maßnahmen im Ablauf der Gesamtabwicklung des QM-Systems überprüft wird?",
  "a": [
   "System-Audit",
   "Prozess-Audit",
   "QM-Audit",
   "Personal-Audit",
   "Produkt-Audit"
  ],
  "correct": 0
 },
 {
  "id": "F021",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wofür gilt die Fahrdienstvorschrift (Ril 408) im Wesentlichen?",
  "a": [
   "Für die Durchführung des Bahnbetriebs und Zugfahrten sowie Rangierfahrten",
   "Ausschließlich für die Instandhaltung von Fahrzeugen",
   "Nur für die Fahrkartenkontrolle",
   "Nur für den Güterverkehr"
  ],
  "correct": 0
 },
 {
  "id": "F022",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Regelwerksfamilie enthält die Fahrdienstvorschrift?",
  "a": [
   "Ril 100",
   "Ril 408",
   "Ril 400",
   "Ril 915"
  ],
  "correct": 1
 },
 {
  "id": "F023",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet die Abkürzung Fdl?",
  "a": [
   "Fahrdienstleiter",
   "Fahrzeugdienstleitung",
   "Fahrplanlotse",
   "Fernverkehrsdisponent"
  ],
  "correct": 0
 },
 {
  "id": "F024",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet die Abkürzung Tf?",
  "a": [
   "Technischer Fahrplan",
   "Triebfahrzeugführer",
   "Transportführer",
   "Teilfahrdienstleiter"
  ],
  "correct": 1
 },
 {
  "id": "F025",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wofür steht EIU?",
  "a": [
   "Eisenbahn-Infrastrukturunternehmen",
   "Einsatz- und Informationsunterlage",
   "Europäische Intercity-Union",
   "Eisenbahninterne Untersuchung"
  ],
  "correct": 0
 },
 {
  "id": "F026",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wofür steht EVU?",
  "a": [
   "Eisenbahn-Verkehrsunternehmen",
   "Einsatzverkehrsunterstützung",
   "Elektronische Verkehrsüberwachung",
   "Europäische Verkehrsunion"
  ],
  "correct": 0
 },
 {
  "id": "F027",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet PZB?",
  "a": [
   "Punktförmige Zugbeeinflussung",
   "Permanente Zugbegleitüberwachung",
   "Personenzug-Betriebszentrale",
   "Prüfung Zugbremsen"
  ],
  "correct": 0
 },
 {
  "id": "F028",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet LZB?",
  "a": [
   "Linienförmige Zugbeeinflussung",
   "Lokale Zugbetriebssteuerung",
   "Leitstellen-Zug-Betrieb",
   "Langsamfahr-Zugbeeinflussung"
  ],
  "correct": 0
 },
 {
  "id": "F029",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wofür steht BÜ?",
  "a": [
   "Bahnübergang",
   "Betriebsüberwachung",
   "Bahnüberleitung",
   "Befehlsübermittlung"
  ],
  "correct": 0
 },
 {
  "id": "F030",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet Asig?",
  "a": [
   "Ausfahrsignal",
   "Anschlussgleis",
   "Außensignal",
   "Ankunftssignal"
  ],
  "correct": 0,
  "src": "Ril 408.0054 (Abkürzungen)"
 },
 {
  "id": "F031",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet Zmb?",
  "a": [
   "Zugmeldebuch",
   "Zugnummernmelder",
   "Zugbewegungsbefehl",
   "Zugmeldemeldung"
  ],
  "correct": 0
 },
 {
  "id": "F032",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wofür steht Ggl?",
  "a": [
   "Gegengleis",
   "Gleisgruppe",
   "Gütergleis",
   "Grenzgleis"
  ],
  "correct": 0,
  "src": "Ril 408.0054 (Abkürzungen)"
 },
 {
  "id": "F033",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet Rp im betrieblichen Zusammenhang?",
  "a": [
   "Räumungsprüfung",
   "Rangierpersonal",
   "Rückmeldepunkt",
   "Regelpersonenzug"
  ],
  "correct": 0,
  "ex": "Rp ist die Abkürzung für Räumungsprüfung.",
  "src": "Ril 408.0054 (Abkürzungen)",
  "korrigiert": "Lösung war „Rangierpersonal“ – korrigiert auf „Räumungsprüfung“"
 },
 {
  "id": "F034",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet Ww?",
  "a": [
   "Weichenwärter",
   "Wagenwärter",
   "Wagenwerkstatt",
   "Weichenwärterwagen"
  ],
  "correct": 0
 },
 {
  "id": "F035",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was umfasst der Begriff Bahnbetrieb?",
  "a": [
   "Zugfahrten und Rangierfahrten",
   "Nur Zugfahrten",
   "Nur Rangierfahrten",
   "Ausschließlich die Fahrzeuginstandhaltung"
  ],
  "correct": 0
 },
 {
  "id": "F036",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was bedeutet Abstellen im Bahnbetrieb?",
  "a": [
   "Züge und Triebfahrzeuge sind abgestellt, wenn sie nicht mit einem Tf besetzt sind oder nicht gesteuert werden",
   "Fahrzeuge für eine Zugfahrt bereitstellen",
   "Fahrzeuge während der Fahrt bremsen",
   "Fahrzeuge an einen anderen Zug kuppeln"
  ],
  "correct": 0,
  "ex": "Züge und Triebfahrzeuge sind abgestellt, wenn sie nicht mit einem Tf besetzt sind oder nicht gesteuert werden; Wagen, wenn sie nicht in Züge eingestellt sind oder nicht rangiert werden. Das Sichern gegen Wegrollen heißt Festlegen.",
  "src": "Ril 408.0055 (Begriffe: Abstellen)",
  "korrigiert": "Lösung beschrieb das Festlegen – korrigiert auf die Begriffsbestimmung"
 },
 {
  "id": "F037",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist Abstoßen?",
  "a": [
   "Geschobene, nicht mit einem arbeitenden Triebfahrzeug gekuppelte Fahrzeuge werden beschleunigt und fahren allein weiter, nachdem das Triebfahrzeug angehalten hat",
   "Fahrzeuge rollen aus eigener Kraft in ein Gleis",
   "Ein Zug fährt rückwärts in einen Bahnhof",
   "Ein Fahrzeug wird mit einem Kran angehoben"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Abstoßen)",
  "korrigiert": "Antworttext an die Begriffsbestimmung angepasst"
 },
 {
  "id": "F038",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was versteht man unter Ablaufen?",
  "a": [
   "Fahrzeuge bewegen sich durch Schwerkraft, im Allgemeinen von einem Ablaufberg herab",
   "Ein Zug fährt mit verminderter Geschwindigkeit",
   "Ein Zug hält vor einem Hauptsignal",
   "Ein Fahrzeug wird auf eine andere Strecke überführt"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Ablaufen)"
 },
 {
  "id": "F039",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist eine Abzweigstelle?",
  "a": [
   "Eine Blockstelle der freien Strecke, wo Züge von einer Strecke auf eine andere Strecke übergehen können",
   "Ein Bahnhofsteil ohne Weichen",
   "Ein Haltepunkt mit mehreren Bahnsteigen",
   "Eine ausschließlich dem Rangieren dienende Anlage"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Abzweigstellen)"
 },
 {
  "id": "F040",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist ein Bahnhof im Sinne der Fahrdienstvorschrift?",
  "a": [
   "Bahnanlagen mit mindestens einer Weiche, wo Züge beginnen, enden, halten, kreuzen, überholen oder wenden dürfen",
   "Jede Stelle mit einem Bahnsteig",
   "Jede Betriebsstelle ohne Weichen",
   "Nur eine große Personenverkehrsanlage"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Bahnhöfe)"
 },
 {
  "id": "F041",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was kennzeichnet einen Haltepunkt?",
  "a": [
   "Eine Bahnanlage ohne Weichen, wo Züge planmäßig halten, beginnen oder enden dürfen",
   "Eine Bahnanlage mit mindestens zwei Weichen",
   "Eine Stelle zum Kreuzen von Zügen",
   "Eine ausschließlich für Güterzüge vorgesehene Anlage"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Haltepunkte)"
 },
 {
  "id": "F042",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was sind Hauptgleise?",
  "a": [
   "Die von Zügen planmäßig befahrenen Gleise",
   "Ausschließlich Gleise zum Abstellen",
   "Nur Gleise für Rangierfahrten",
   "Gleise ohne Signalabhängigkeit"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Hauptgleise)",
  "korrigiert": "Antworttext an die Begriffsbestimmung angepasst"
 },
 {
  "id": "F043",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was sind Nebengleise?",
  "a": [
   "Gleise, die planmäßig nicht von Zügen befahren werden",
   "Alle durchgehenden Hauptgleise",
   "Ausschließlich Streckengleise",
   "Gleise, die nur von Reisezügen befahren werden"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Nebengleise)",
  "korrigiert": "Antworttext an die Begriffsbestimmung angepasst"
 },
 {
  "id": "F044",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist eine Blockstrecke?",
  "a": [
   "Ein Gleisabschnitt, in den ein Zug nur einfahren darf, wenn er frei von Fahrzeugen ist",
   "Ein Gleisabschnitt innerhalb eines Bahnsteigs",
   "Ein Gleis zum Abstellen von Fahrzeugen",
   "Ein Abschnitt, der nur von Rangierfahrten befahren wird"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Blockstrecken)",
  "korrigiert": "Antworttext an die Begriffsbestimmung angepasst"
 },
 {
  "id": "F045",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist eine Blockstelle?",
  "a": [
   "Eine Bahnanlage, die eine Blockstrecke begrenzt",
   "Ein Aufenthaltsraum für Fahrdienstleiter",
   "Eine Weiche zwischen zwei Bahnhöfen",
   "Ein Bahnübergang mit Schranken"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Blockstellen)"
 },
 {
  "id": "F046",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist eine Deckungsstelle?",
  "a": [
   "Eine Bahnanlage der freien Strecke, die den Bahnbetrieb z. B. an beweglichen Brücken, Kreuzungen von Bahnen oder Baustellen sichert",
   "Ein Bahnhof ohne Zugverkehr",
   "Ein Gleis zum Abstellen von Zügen",
   "Eine Stelle zum Wechseln des Triebfahrzeugs"
  ],
  "correct": 0,
  "src": "Ril 408.0055 (Begriffe: Deckungsstellen)"
 },
 {
  "id": "F047",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist eine Einfahrweiche?",
  "a": [
   "Eine Weiche, über die ein Zug in einen Bahnhof einfährt",
   "Die letzte Weiche vor einem Bahnübergang",
   "Eine Weiche ausschließlich im Rangierbezirk",
   "Eine Weiche, die nur bei Ausfahrten benutzt wird"
  ],
  "correct": 0
 },
 {
  "id": "F048",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist ein Bedarfshalt?",
  "a": [
   "Ein Halt, der nur bei Bedarf bzw. nach entsprechendem Haltewunsch erfolgt",
   "Ein Halt, der bei jeder Zugfahrt vorgeschrieben ist",
   "Ein Halt ausschließlich für Güterzüge",
   "Ein Halt bei jeder Signalstörung"
  ],
  "correct": 0
 },
 {
  "id": "F049",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist ein Betriebshalt?",
  "a": [
   "Ein Halt aus betrieblichen Gründen, zum Beispiel zum Kreuzen oder Überholen",
   "Ein Halt ausschließlich zum Ein- und Aussteigen",
   "Ein Halt nur an einem Haltepunkt",
   "Ein Halt aufgrund eines Fahrgastwunsches"
  ],
  "correct": 0
 },
 {
  "id": "F050",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was kennzeichnet einen geschobenen Zug?",
  "a": [
   "Das Triebfahrzeug befindet sich nicht an der Spitze des Zuges",
   "Das Triebfahrzeug befindet sich immer an der Zugspitze",
   "Der Zug wird ohne Triebfahrzeug bewegt",
   "Der Zug besteht ausschließlich aus Triebwagen"
  ],
  "correct": 0
 },
 {
  "id": "F051",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist das Gegengleis?",
  "a": [
   "Das Streckengleis der Gegenrichtung auf einer zweigleisigen Strecke",
   "Ein Nebengleis im Bahnhof",
   "Ein Gleis für Rangierfahrten",
   "Ein ausschließlich gesperrtes Gleis"
  ],
  "correct": 0
 },
 {
  "id": "F052",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Wofür steht EOA bei der LZB?",
  "a": [
   "End Of Authority – Ende der Erlaubnis zur Fahrt",
   "Einfahrtsorientierungsanzeige",
   "Elektronische Ortsaufsicht",
   "Erlaubnis zur Ortsbedienung"
  ],
  "correct": 0,
  "ex": "EOA (End Of Authority) ist das Ende der Erlaubnis zur Fahrt; für signalgeführte Züge gelten Halt zeigende Signale als EOA.",
  "src": "Ril 408.0055 (Begriffe: EOA)",
  "korrigiert": "Lösung war „Ende der LZB-Führung“ – korrigiert"
 },
 {
  "id": "F053",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Aufgabe hat die Fahrdienstvorschrift grundsätzlich?",
  "a": [
   "Sie regelt die sichere und geordnete Durchführung des Bahnbetriebs",
   "Sie regelt ausschließlich die Arbeitszeiten",
   "Sie legt Fahrpreise fest",
   "Sie beschreibt nur die Fahrzeugtechnik"
  ],
  "correct": 0
 },
 {
  "id": "F054",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Aussage beschreibt eine Zugfahrt?",
  "a": [
   "Eine Fahrt eines Zuges auf der freien Strecke oder in Bahnhöfen nach den dafür geltenden Regeln",
   "Jede Bewegung eines einzelnen Wagens beim Rangieren",
   "Das Abstellen eines Triebfahrzeugs",
   "Eine Fahrt ausschließlich innerhalb einer Werkstatt"
  ],
  "correct": 0
 },
 {
  "id": "F055",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Aussage zum Rangieren trifft zu?",
  "a": [
   "Rangieren sind Fahrzeugbewegungen, die nicht zu Zugfahrten gehören",
   "Rangieren ist jede Fahrt auf der freien Strecke",
   "Rangieren ist nur das Abstellen von Wagen",
   "Rangieren findet ausschließlich auf Hauptgleisen statt"
  ],
  "correct": 0
 },
 {
  "id": "F056",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Betriebsstelle kann Züge beginnen und enden lassen sowie Zugkreuzungen ermöglichen?",
  "a": [
   "Bahnhof",
   "Haltepunkt",
   "Bahnübergang",
   "Blockstelle ohne weitere Bahnhofsanlagen"
  ],
  "correct": 0
 },
 {
  "id": "F057",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Welche Anlage besitzt definitionsgemäß keine Weichen?",
  "a": [
   "Haltepunkt",
   "Bahnhof",
   "Abzweigstelle",
   "Überleitstelle"
  ],
  "correct": 0
 },
 {
  "id": "F058",
  "thema": "Prüfungsfragen der Klasse",
  "d": "medium",
  "q": "Was ist der wesentliche Zweck einer Blockstelle?",
  "a": [
   "Die Zugfolge auf der Strecke zu sichern und zu regeln",
   "Das Ein- und Aussteigen von Reisenden zu ermöglichen",
   "Wagen für den Güterverkehr zu wiegen",
   "Rangierpersonal unterzubringen"
  ],
  "correct": 0
 },
 {
  "id": "F059",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Ein Zug setzt zurück, der Tf befindet sich auf dem Fahrzeug an der Spitze des zurücksetzenden Zuges. Welche Geschwindigkeit ist zulässig?",
  "a": [
   "20 km/h",
   "10 km/h",
   "30 km/h",
   "40 km/h",
   "Schrittgeschwindigkeit"
  ],
  "correct": 0,
  "ex": "Befindet sich der Tf an der Spitze des zurücksetzenden Zuges oder Zugteils, beträgt die zulässige Geschwindigkeit 20 km/h (sonst höchstens 10 km/h).",
  "src": "Ril 408.0572 Abschnitt 5"
 },
 {
  "id": "F060",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Ein Zug soll auf der freien Strecke zurücksetzen. Welcher Fdl muss dem Zurücksetzen zugestimmt haben?",
  "a": [
   "Der Fdl der rückgelegenen Zugmeldestelle",
   "Der Fdl der vorgelegenen Zugmeldestelle",
   "Die Betriebszentrale",
   "Der Notfallmanager",
   "Jeder Fdl, der den Zug zuletzt abgemeldet hat"
  ],
  "correct": 0,
  "ex": "Beim Zurücksetzen auf freier Strecke muss der Fdl der rückgelegenen Zugmeldestelle – also der, in deren Richtung der Zug zurücksetzt – zugestimmt haben.",
  "src": "Ril 408.0572 Abschnitt 3 Absatz (1)"
 },
 {
  "id": "F061",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "hard",
  "q": "Beim Zurücksetzen werden technisch gesicherte Bahnübergänge (ohne wärterbediente Schranken) befahren. Welchen Befehl muss der Fdl dem Tf dafür übermitteln?",
  "a": [
   "Befehl 8",
   "Befehl 1",
   "Befehl 2",
   "Befehl 6",
   "Befehl 32"
  ],
  "correct": 0,
  "ex": "Bevor der Fdl dem Zurücksetzen zustimmt, muss er für alle technisch gesicherten Bahnübergänge, die nicht durch wärterbediente Schranken gesichert sind, dem Tf Befehl 8 übermittelt haben.",
  "src": "Ril 408.0572 Abschnitt 1 Absatz (2) f)"
 },
 {
  "id": "F062",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Auf einer Strecke ist Gleiswechselbetrieb ständig eingerichtet. Muss der Fdl das Fahren auf dem Gegengleis einführen?",
  "a": [
   "Nein – auch dann nicht, wenn er den Auftrag durch Signal Zs 8 oder Befehl erteilt",
   "Ja, vor jeder Fahrt auf dem Gegengleis",
   "Nur, wenn er den Auftrag durch Befehl erteilt",
   "Nur mit Zustimmung der Betriebszentrale",
   "Nur bei Fahrten in der Nacht"
  ],
  "correct": 0,
  "ex": "Wo Gleiswechselbetrieb ständig eingerichtet ist, muss der Fdl Fahren auf dem Gegengleis nicht einführen – auch nicht, wenn der Auftrag durch Signal Zs 8 oder Befehl erteilt wird.",
  "src": "Ril 408.0463 Abschnitt 1 Absatz (1) a)"
 },
 {
  "id": "F063",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Auf der Strecke ist KEIN Gleiswechselbetrieb eingerichtet. Bis wohin muss der Fdl das Fahren auf dem Gegengleis einführen?",
  "a": [
   "Bis zur nächsten Zugmeldestelle",
   "Bis zur nächsten Blockstelle",
   "Bis zum nächsten Bahnhof mit Gleiswechselbetrieb",
   "Bis zum Ende der Strecke",
   "Nur bis zum ersten Hauptsignal"
  ],
  "correct": 0,
  "ex": "Ohne Gleiswechselbetrieb verständigt sich der Fdl mit den beteiligten Fdl und führt Fahren auf dem Gegengleis bis zur nächsten Zugmeldestelle ein. Selbststellbetrieb darf nicht eingeschaltet sein; Sperre nach Ril 408.0403 Nr. 7.",
  "src": "Ril 408.0463 Abschnitt 1 Absatz (1) c)"
 },
 {
  "id": "F064",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Gleiswechselbetrieb ist nicht eingerichtet, die Nachbar-Zugmeldestelle ist einem anderen Fdl zugeteilt. Welche Züge müssen angeboten und angenommen werden?",
  "a": [
   "Züge auf dem Regelgleis und auf dem Gegengleis – auf dem Gegengleis mit dem Zusatz „auf dem Gegengleis“",
   "Nur Züge auf dem Gegengleis",
   "Nur Züge auf dem Regelgleis",
   "Keine – es genügt das Abmelden",
   "Nur Züge, die außerplanmäßig verkehren"
  ],
  "correct": 0,
  "ex": "Wo kein Gleiswechselbetrieb eingerichtet ist, muss der Fdl Züge auf dem Regel- und auf dem Gegengleis anbieten und annehmen, Züge auf dem Gegengleis mit dem Zusatz „auf dem Gegengleis“.",
  "src": "Ril 408.0463 Abschnitt 5 Absatz (2)"
 },
 {
  "id": "F065",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "easy",
  "q": "Gleiswechselbetrieb ist nicht eingerichtet. In welchem Fall ist das Fahren auf dem Gegengleis trotzdem zugelassen?",
  "a": [
   "Wenn das Regelgleis vorübergehend nicht befahren werden kann oder darf (z. B. gesperrtes Gleis, liegengebliebener Zug)",
   "Wenn ein verspäteter Zug überholen soll",
   "Immer, wenn der Tf es wünscht",
   "Nur auf eingleisigen Strecken",
   "Nur zwischen 22 und 6 Uhr"
  ],
  "correct": 0,
  "ex": "Ohne (ständigen) Gleiswechselbetrieb ist Fahren auf dem Gegengleis u. a. zugelassen, wenn das Regelgleis vorübergehend nicht befahren werden kann oder darf – z. B. gesperrtes Gleis, liegengebliebener Zug, ausgeschaltete Oberleitung.",
  "src": "Ril 408.0462 Abschnitt 1 Absatz (2) b) Nr. 3"
 },
 {
  "id": "F066",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "easy",
  "q": "Bei welchem Anlass muss der Fdl ein Gleis der freien Strecke sperren?",
  "a": [
   "Ein Zug ist liegengeblieben",
   "Ein Zug hat mehr als 10 Minuten Verspätung",
   "Die Zuglenkung ist ausgeschaltet",
   "Es findet ein Schichtwechsel statt",
   "Ein Zug fährt ohne Halt durch"
  ],
  "correct": 0,
  "ex": "Anlässe sind u. a.: Gleis unbefahrbar, Arbeiten nach Antrag, liegengebliebener Zug oder zurückgelassener Zugteil, Sperrfahrten, mehrere Fahrten in einen Zugfolgeabschnitt, Schutz von Personen, Einsetzen von Fahrzeugen.",
  "src": "Ril 408.0471 Abschnitt 1 Absatz (1) c)"
 },
 {
  "id": "F067",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "hard",
  "q": "Ab welchem Zeitpunkt gilt ein Gleis der freien Strecke als gesperrt?",
  "a": [
   "Wenn auch der Fdl der benachbarten Zugmeldestelle seine Sicherungsmaßnahmen getroffen und „Gleis von … nach … gesperrt“ sowie „Sicherungsmaßnahmen durchgeführt“ wiederholt hat",
   "Sobald der zuständige Fdl die Sperrung im Zugmeldebuch eingetragen hat",
   "Sobald der Antrag auf Sperrung gestellt wurde",
   "Sobald die Fachkraft das Gleis betreten hat",
   "Sobald der zuständige Fdl seine Hilfssperre angebracht hat"
  ],
  "correct": 0,
  "ex": "Beide Fdl treffen die Sicherungsmaßnahmen. Der benachbarte Fdl wiederholt „Gleis von … nach … gesperrt“ und bestätigt mit „Sicherungsmaßnahmen durchgeführt“. Erst ab diesem Zeitpunkt gilt das Gleis als gesperrt.",
  "src": "Ril 408.0471 Abschnitt 1 Absatz (6)"
 },
 {
  "id": "F068",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Ein Bahnhofsgleis wurde gesperrt. Wann gilt es als abgeriegelt?",
  "a": [
   "Wenn Zugangsweichen in abweisender Stellung bzw. Gleissperren in aufgelegter Stellung sind",
   "Wenn am Stelltisch ein Merkhinweis angebracht ist",
   "Wenn alle Tf mündlich verständigt wurden",
   "Wenn ein Schild „Gleis gesperrt“ am Bahnsteig hängt",
   "Wenn die Gleisfreimeldeanlage das Gleis als besetzt anzeigt"
  ],
  "correct": 0,
  "ex": "Abgeriegelt ist ein Gleis, wenn Zugangsweichen abweisend und Gleissperren aufgelegt sind – oder Hauptsignale ohne Signal Zs 103 bzw. Sperrsignale in Haltstellung sind bzw. Signale Ra 11a die Fahrt verbieten.",
  "src": "Ril 408.0471 Abschnitt 2 Absatz (2) a) Nr. 1"
 },
 {
  "id": "F069",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Wer darf einer Sperrfahrt in ein gesperrtes Gleis zustimmen?",
  "a": [
   "Nur der Fdl, der das Gleis gesperrt hat",
   "Jeder Fdl einer benachbarten Zugmeldestelle",
   "Der Technisch Berechtigte",
   "Die Betriebszentrale",
   "Der Tf der Sperrfahrt nach Rücksprache mit der Fachkraft"
  ],
  "correct": 0,
  "ex": "Sperrfahrten dürfen nur mit Zustimmung des Fdl zugelassen werden, der das Gleis gesperrt hat.",
  "src": "Ril 408.0481 Abschnitt 4 Absatz (1)"
 },
 {
  "id": "F070",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Eine Sperrfahrt ist unvorhergesehen erforderlich. Was gilt für Zugnummer und Fahrplan?",
  "a": [
   "Der ablassende Fdl erfragt die Zugnummer bei der Betriebszentrale; die Sperrfahrt fährt nach dem Ersatzfahrplan",
   "Die Sperrfahrt fährt ohne Zugnummer nach Weisung des Tf",
   "Der Fdl vergibt selbst eine Zugnummer; es gilt der Regelfahrplan",
   "Die Zugnummer steht in der Betra; es gilt der Sonderfahrplan",
   "Der Notfallmanager vergibt Zugnummer und Fahrplan"
  ],
  "correct": 0,
  "ex": "Bei unvorhergesehenen Fahrten erfragt der Fdl der ablassenden Zugmeldestelle die Zugnummer bei der Betriebszentrale. Unvorhergesehene Sperrfahrten fahren nach dem Ersatzfahrplan.",
  "src": "Ril 408.0481 Abschnitt 3"
 },
 {
  "id": "F071",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "In welchem Fall darf ein Zug geschoben werden (Triebfahrzeug nicht an der Spitze)?",
  "a": [
   "In Störungsfällen",
   "Immer, wenn es Fahrzeit spart",
   "Bei allen Reisezügen",
   "Nur bei Nebel",
   "Wenn der Tf es wünscht"
  ],
  "correct": 0,
  "ex": "Geschoben werden dürfen u. a. Züge zur Ver- und Entsorgung von Arbeitsstellen, Züge von/nach Anschlussstellen, Züge bei besonderen örtlichen Verhältnissen (Streckenbuch) und Züge in Störungsfällen.",
  "src": "Ril 408.0445 Absatz (1) d)"
 },
 {
  "id": "F072",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Mit welchem Mittel darf der Fdl eine Zugfahrt mit besonderem Auftrag für einen LZB-geführten (anzeigegeführten) Zug NICHT zulassen?",
  "a": [
   "Signal Ts 3",
   "Signal Zs 1",
   "Signal Zs 7",
   "Befehl 1",
   "Befehl 2"
  ],
  "correct": 0,
  "ex": "Laut Übersicht ist Signal Ts 3 (wie Befehl 7, Befehl 25 und der mündliche Auftrag bei Zs 12) nur für signalgeführte Züge zulässig. Zs 1, Zs 7, Befehl 1 und 2 sind auch für anzeigegeführte Züge zulässig.",
  "src": "Ril 408.0455 Abschnitt 1 Absatz (1) (Übersicht)"
 },
 {
  "id": "F073",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "easy",
  "q": "Ein Zug muss an einer Wärterhaltscheibe vorbeifahren. Womit lässt der Fdl dies zu?",
  "a": [
   "Befehl 1",
   "Signal Zs 1",
   "Mündlicher Auftrag",
   "Signal Sh 1",
   "Befehl 9"
  ],
  "correct": 0,
  "ex": "Wenn ein Zug an einer Wärterhaltscheibe vorbeifahren muss, muss der Fdl Befehl 1 erteilen.",
  "src": "Ril 408.0455 Abschnitt 1 Absatz (5)"
 },
 {
  "id": "F074",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "hard",
  "q": "Der Fdl stellt ein Hauptsignal sofort auf Halt, weil ein Zug sonst fehlgeleitet würde. Wann darf er die Fahrstraße auflösen?",
  "a": [
   "Wenn der Zug zum Halten gekommen ist und der Tf bestätigt hat, dass der Zug halten bleibt (bei LZB/ETCS zusätzlich Nachfrage beim Tf)",
   "Sofort nach dem Haltstellen",
   "Nach Ablauf von zwei Minuten",
   "Wenn die Zugspitze am Signal vorbeigefahren ist",
   "Nach Zustimmung der Betriebszentrale"
  ],
  "correct": 0,
  "ex": "Bei drohender Fehlleitung stellt der Bediener das Signal sofort auf Halt. Auflösen darf er die Fahrstraße erst, wenn der Zug hält und der Tf bestätigt hat, dass er halten bleibt; auf LZB-/ETCS-Strecken muss er zusätzlich nachfragen, ob der Zug LZB- bzw. ETCS-geführt ist.",
  "src": "Ril 408.0458 Abschnitt 1 Absatz (2)"
 },
 {
  "id": "F075",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Ein Zug soll in ein Gleis einfahren, das zum Teil besetzt ist. Welche Geschwindigkeit ist zulässig?",
  "a": [
   "20 km/h",
   "30 km/h",
   "40 km/h",
   "10 km/h",
   "25 km/h"
  ],
  "correct": 0,
  "ex": "Fahrt in ein teilweise besetztes oder teilweise gesperrtes Gleis: 20 km/h. Bei besetztem oder nicht ausreichendem Durchrutschweg: 30 km/h.",
  "src": "Ril 408.0451 Abschnitt 1 Absatz (1) a)"
 },
 {
  "id": "F076",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "easy",
  "q": "Ein Zug hält aus unvorhergesehenem Anlass. Hilfe ist nicht nötig, der Aufenthalt dauert aber voraussichtlich länger als fünf Minuten. Was muss der Tf tun?",
  "a": [
   "Das Halten dem Fdl einer benachbarten Zugmeldestelle melden",
   "Die Notfallleitstelle anrufen",
   "Die Betriebszentrale informieren",
   "Nichts – erst ab 15 Minuten melden",
   "Den Zug sofort zurücksetzen"
  ],
  "correct": 0,
  "ex": "Dauert der Aufenthalt voraussichtlich länger als fünf Minuten, muss der Tf das Halten dem Fdl einer benachbarten Zugmeldestelle melden.",
  "src": "Ril 408.0571 Abschnitt 2"
 },
 {
  "id": "F077",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Ein Zug hat aus unvorhergesehenem Anlass auf der freien Strecke gehalten und kann nun weiterfahren. Unter welcher Bedingung darf er weiterfahren?",
  "a": [
   "Wenn der Fdl der rückgelegenen Zugmeldestelle zugestimmt hat",
   "Sofort, sobald der Anlass beseitigt ist",
   "Wenn der Fdl der vorgelegenen Zugmeldestelle zugestimmt hat",
   "Wenn der Notfallmanager zugestimmt hat",
   "Nach Ablauf von fünf Minuten"
  ],
  "correct": 0,
  "ex": "Der Tf verständigt den Fdl von der beabsichtigten Weiterfahrt. Er darf nur weiterfahren, wenn der Fdl der rückgelegenen Zugmeldestelle zugestimmt hat.",
  "src": "Ril 408.0571 Abschnitt 4 Absatz (1)"
 },
 {
  "id": "F078",
  "thema": "Abweichungen vom Regelbetrieb (LF 8)",
  "lf": "8",
  "d": "medium",
  "q": "Ein Zug kann auf der freien Strecke nicht mehr aus eigener Kraft weiterfahren. Was muss der zuständige Fdl tun?",
  "a": [
   "Das Gleis sperren und die Räumung des Gleises veranlassen",
   "Eine Räumungsprüfung für diesen Zug durchführen",
   "Den nachfolgenden Zug mit Zs 7 hinterherschicken",
   "Nur das Störungsbuch ausfüllen",
   "Den Tf zum Zurücksetzen auffordern"
  ],
  "correct": 0,
  "ex": "Kann ein Zug nicht aus eigener Kraft weiterfahren, muss der zuständige Fdl das Gleis sperren und die Räumung des Gleises veranlassen.",
  "src": "Ril 408.0571 Abschnitt 7 Absatz (1)"
 },
 {
  "id": "F079",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "q": "Ein Hauptsignal kommt nach der Vorbeifahrt eines Zuges nicht wieder in die Haltstellung. Die Strecke hat nichtselbsttätigen Streckenblock. Was muss der Fdl tun?",
  "a": [
   "Rückmelden einführen; der Streckenblock darf nicht bedient werden",
   "Den Streckenblock wie gewohnt bedienen",
   "Das Gleis für 24 Stunden sperren",
   "Allen Zügen Signal Zs 1 geben",
   "Nur die Notfallleitstelle informieren"
  ],
  "correct": 0,
  "ex": "Bei nichtselbsttätigem Streckenblock muss der Fdl Rückmelden einführen; der Streckenblock darf nicht bedient werden.",
  "src": "Ril 408.0611 Abschnitt 1 Absatz (1)"
 },
 {
  "id": "F080",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "hard",
  "q": "Ein Hauptsignal kann nicht mehr auf Halt gestellt werden. Wie weist der Fdl den Tf eines signalgeführten Zuges am letzten rückgelegenen Hauptsignal an?",
  "a": [
   "Durch Befehl 32: vor dem gestörten Signal halten",
   "Durch Befehl 1: am gestörten Signal vorbeifahren",
   "Durch Befehl 8",
   "Nur mündlich über Zugfunk",
   "Durch Signal Zs 7"
  ],
  "correct": 0,
  "ex": "Signalgeführte Züge erhalten am letzten rückgelegenen Hauptsignal Befehl 32 (vor dem gestörten Signal halten); die Vorbeifahrt am gestörten Signal lässt der Fdl dann mit Befehl 1 (bzw. mündlich bei Zs 12) zu.",
  "src": "Ril 408.0611 Abschnitt 1 Absatz (2) b)"
 },
 {
  "id": "F081",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "q": "Das Signalbild eines Lichthauptsignals ist erloschen. Was gilt abweichend vom Fall „Haltstellung nicht möglich“?",
  "a": [
   "Der Fdl verständigt den Tf mündlich statt mit Befehl 32/33 und darf die Vorbeifahrt mit Zs 1, Zs 7 oder Zs 8 zulassen",
   "Der Fdl muss immer Befehl 32 und Befehl 1 erteilen",
   "Der Tf darf ohne Verständigung vorbeifahren",
   "Das Gleis muss gesperrt werden",
   "Nur Befehl 9 ist zulässig"
  ],
  "correct": 0,
  "ex": "Bei einem erloschenen Lichthauptsignal verständigt der Fdl die Tf mündlich (statt Befehl 32 bzw. 33) und darf für die Vorbeifahrt die Signale Zs 1, Zs 7 oder Zs 8 bedienen bzw. bei Zs 12 mündlichen Auftrag erteilen.",
  "src": "Ril 408.0611 Abschnitt 2"
 },
 {
  "id": "F082",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "easy",
  "q": "Ein Hauptsignal fällt vorzeitig auf Halt. Was muss der Bediener zuerst prüfen?",
  "a": [
   "Ob eine Signalnottaste bedient wurde",
   "Ob der Zug vollständig ist",
   "Ob die Notfallleitstelle informiert ist",
   "Ob die Achszähler in Grundstellung sind",
   "Ob die Uhrzeit richtig ist"
  ],
  "correct": 0,
  "ex": "Fällt ein Hauptsignal vorzeitig auf Halt, muss der Bediener prüfen, ob eine Signalnottaste bedient wurde. Er darf es wieder auf Fahrt stellen, wenn es bedienbar ist und die Voraussetzungen erfüllt sind.",
  "src": "Ril 408.0611 Abschnitt 6"
 },
 {
  "id": "F083",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "q": "Ein Abschnitt mit Gleisstromkreisen wurde als besetzt angezeigt, obwohl er frei sein müsste. Inzwischen zeigt er wieder frei. Was gilt?",
  "a": [
   "Trotzdem muss eine Abschnittsprüfung durchgeführt werden",
   "Nichts – die Freimeldung ist maßgebend",
   "Es muss die Achszählgrundstellung hergestellt werden",
   "Das Gleis muss gesperrt werden",
   "Der nächste Zug erhält immer Zs 1"
  ],
  "correct": 0,
  "ex": "Auch wenn der Abschnitt inzwischen als frei angezeigt wird, muss eine Abschnittsprüfung durchgeführt werden.",
  "src": "Ril 408.0625 Abschnitt 1 Absatz (1)"
 },
 {
  "id": "F084",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "q": "Ein Achszählabschnitt wird als besetzt angezeigt, obwohl er frei sein müsste. Wann darf die Achszählgrundstellung hergestellt werden?",
  "a": [
   "Wenn festgestellt wurde, dass sich keine Fahrzeuge im Abschnitt befinden und keine Fahrten in Richtung des Abschnitts zugelassen sind",
   "Sofort, ohne weitere Prüfung",
   "Wenn der Tf des nächsten Zuges zugestimmt hat",
   "Erst nach 24 Stunden",
   "Nur durch die Betriebszentrale"
  ],
  "correct": 0,
  "ex": "Nach der Abschnittsprüfung: keine Fahrzeuge im Abschnitt und keine Fahrten in Richtung des Abschnitts zugelassen – dann darf die Achszählgrundstellung hergestellt werden.",
  "src": "Ril 408.0625 Abschnitt 2 Absatz (1)"
 },
 {
  "id": "F085",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "easy",
  "q": "Ein Weichenabschnitt wird als besetzt angezeigt. Durch Hinsehen stellen Sie fest, dass die Weiche frei von Fahrzeugen ist. Was dürfen Sie?",
  "a": [
   "Die Weiche umstellen",
   "Die Weiche erst nach Eintrag der Fachkraft umstellen",
   "Die Weiche gar nicht mehr umstellen",
   "Die Weiche erst nach 24 Stunden umstellen",
   "Die Weiche nur mit Zustimmung der BZ umstellen"
  ],
  "correct": 0,
  "ex": "Kann durch Hinsehen festgestellt werden, dass die Weiche frei von Fahrzeugen ist, darf der Bediener sie umstellen. Sonst gilt Abschnitt 4 b) (Befehl 6 für den nächsten Zug).",
  "src": "Ril 408.0625 Abschnitt 4 a)"
 },
 {
  "id": "F086",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "q": "Bei einer Weiche ist der Zungenverschluss nicht in Ordnung. Unter welcher Bedingung darf sie befahren werden?",
  "a": [
   "Nur wenn sie durch Handverschlüsse gesichert ist – bis dahin muss die Weiche gesperrt werden",
   "Mit höchstens 20 km/h",
   "Nur bei Rangierfahrten",
   "Mit Befehl 6 auf Sicht",
   "Ohne Einschränkung, wenn sie richtig liegt"
  ],
  "correct": 0,
  "ex": "Eine Weiche mit nicht ordnungsgemäßem Zungen- oder Herzstückverschluss darf nur befahren werden, wenn sie durch Handverschlüsse gesichert ist. Bis dahin muss der Bediener sie nach Ril 408.0471 sperren.",
  "src": "Ril 408.0601 Abschnitt 2 Absatz (2)"
 },
 {
  "id": "F087",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "hard",
  "q": "Die Blockeinrichtungen des selbsttätigen Streckenblocks haben nicht ordnungsgemäß gewirkt. Welche Aussage ist richtig?",
  "a": [
   "Der für den ersten Zug nötige Befehl 6 darf nicht durch Signal Zs 7, LZB-Vorsichtauftrag oder ETCS-Betriebsart OS ersetzt werden",
   "Befehl 6 darf durch Signal Zs 7 ersetzt werden",
   "Die Blockeinrichtungen dürfen sofort in Grundstellung gebracht werden",
   "Eine Räumungsprüfung ist nie erforderlich",
   "Selbststellbetrieb muss eingeschaltet bleiben"
  ],
  "correct": 0,
  "ex": "Der Fdl führt eine Einzelräumungsprüfung durch oder stellt die Ankunft des letzten Zuges fest und erteilt dem ersten Zug Befehl 6 mit Grund Nr. 10. Diesen Befehl darf er nicht durch Zs 7, LZB-Vorsichtauftrag oder ETCS-OS ersetzen.",
  "src": "Ril 408.0622 Abschnitt 1 Absatz (1) d)"
 },
 {
  "id": "F088",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "easy",
  "q": "Die Verständigung zwischen Zugfolgestellen ist völlig gestört (keine Telekommunikation möglich). Was gilt für den Fdl?",
  "a": [
   "Er darf keine Züge mehr ablassen",
   "Er darf Züge im Abstand der Zugmeldestellen ablassen",
   "Er lässt Züge mit Befehl 6 auf Sicht ab",
   "Er lässt Züge über Zugfunk weiter ab",
   "Er lässt nur Güterzüge ab"
  ],
  "correct": 0,
  "ex": "Ist keine Verständigung über Telekommunikationseinrichtungen möglich, gilt sie als völlig gestört – der Fdl darf dann keine Züge mehr ablassen und muss die Unregelmäßigkeit nachweisen.",
  "src": "Ril 408.0631 Abschnitte 1 und 2"
 },
 {
  "id": "F089",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "hard",
  "q": "Ein Tf meldet, dass er gesandet hat. Im betroffenen Bahnhofsgleis gibt es Gleisstromkreise. Was gilt?",
  "a": [
   "Die Gleisfreimeldeanlage gilt als nicht ordnungsgemäß wirkend – auch wenn eine Besetzung angezeigt wird",
   "Nichts – Sanden beeinflusst nur Achszähler",
   "Das Gleis muss für 24 Stunden gesperrt werden",
   "Der Tf muss den Sand entfernen",
   "Die Achszählgrundstellung ist herzustellen"
  ],
  "correct": 0,
  "ex": "Nach dem Sanden prüft der Fdl, ob Gleisstromkreise vorhanden sind. Dann gilt die Anlage als nicht ordnungsgemäß wirkend – auch wenn eine Besetzung angezeigt wird (Merkhinweis, Sperre, kein Selbststellbetrieb).",
  "src": "Ril 408.0581 Abschnitt 7 i. V. m. Ril 408.0625 Abschnitt 1 Absatz (4)"
 },
 {
  "id": "F090",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Die technische Sicherung eines Bahnübergangs ist ausgefallen, der BÜ ist nicht gesichert. Welche Maßnahmen trifft der Fdl?",
  "a": [
   "Maßnahmen bei Gefahr treffen, den benachbarten Fdl verständigen und den Tf Befehl 8 erteilen",
   "Nur Befehl 5 mit 20 km/h erteilen",
   "Nur einen Eintrag im Arbeits- und Störungsbuch machen",
   "Das Gleis für 24 Stunden sperren",
   "Nur die Polizei verständigen"
  ],
  "correct": 0,
  "ex": "Bei nicht gesichertem BÜ: Maßnahmen bei Gefahr, benachbarten Fdl verständigen; die Fdl, die Zugfahrten in Richtung BÜ zulassen können, erteilen den Tf Befehl 8.",
  "src": "Ril 408.0641 Abschnitt 3 Absatz (1)"
 },
 {
  "id": "F091",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "hard",
  "hz": true,
  "q": "In welchem Fall ist Befehl 8 bei einem nicht gesicherten Bahnübergang NICHT erforderlich?",
  "a": [
   "Bei Bahnübergängen mit Überwachungssignalen",
   "Bei Güterzügen",
   "Bei Nacht",
   "Wenn der Tf die Strecke kennt",
   "Bei Bahnübergängen mit Halbschranken"
  ],
  "correct": 0,
  "ex": "Befehl 8 ist u. a. nicht erforderlich bei BÜ mit Überwachungssignalen oder wenn vor dem BÜ ein selbsttätiges Blocksignal mit Signal Zs 9 steht.",
  "src": "Ril 408.0641 Abschnitt 3 Absatz (1) c)"
 },
 {
  "id": "F092",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Ein Bahnübergang ist nicht ausreichend gesichert. Wie weisen die Fdl die Tf an?",
  "a": [
   "Befehl 5: BÜ mit höchstens 20 km/h befahren, zusätzlich Befehl 95 mit Auftrag 95.20",
   "Befehl 8 ohne Geschwindigkeitsangabe",
   "Befehl 5: höchstens 50 km/h",
   "Befehl 5: höchstens 10 km/h",
   "Befehl 6: auf Sicht bis zum nächsten Bahnhof"
  ],
  "correct": 0,
  "ex": "Bei nicht ausreichend gesichertem BÜ: Maßnahmen bei Gefahr, Nachbar-Fdl verständigen, Befehl 5 (Grund Nr. 19) mit höchstens 20 km/h und zusätzlich Befehl 95 mit Auftrag 95.20.",
  "src": "Ril 408.0641 Abschnitt 3 Absatz (2)"
 },
 {
  "id": "F093",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "easy",
  "hz": true,
  "q": "Ein Tf, dem Sie Befehl 8 erteilt haben, meldet: Verkehrsteilnehmer sind zwischen den Schranken eingeschlossen. Was tun Sie?",
  "a": [
   "Die Schranken öffnen, damit sie den BÜ verlassen können",
   "Die Polizei rufen und abwarten",
   "Den Zug sofort weiterfahren lassen",
   "Die Schranken geschlossen halten",
   "Nur das Störungsbuch ausfüllen"
  ],
  "correct": 0,
  "ex": "Der Fdl muss die Schranken öffnen, um den Verkehrsteilnehmern das Verlassen des Bahnübergangs zu ermöglichen.",
  "src": "Ril 408.0641 Abschnitt 3 Absatz (4)"
 },
 {
  "id": "F094",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Es wird ein geringfügiger Schaden an der Oberleitung vermutet. Was darf der Fdl bei Tage und sichtigem Wetter tun?",
  "a": [
   "Einen Tf mit Befehl 6 anweisen, das Gleis auf Sicht zu befahren und das Prüfergebnis zu melden; die Zentralschaltstelle entscheidet über die Freigabe",
   "Das Gleis selbst wieder freigeben",
   "Alle Züge mit gehobenem Stromabnehmer fahren lassen",
   "Die Oberleitung selbst ausschalten und prüfen",
   "Nichts – nur die Fachkraft darf prüfen"
  ],
  "correct": 0,
  "ex": "Bei Tage und sichtigem Wetter: Befehl 6 (Grund Nr. 30) – Gleis auf Sicht befahren und Ergebnis melden. Das Ergebnis geht an die Zentralschaltstelle; sie entscheidet über das uneingeschränkte Befahren.",
  "src": "Ril 408.0641 Abschnitt 4 Absatz (1)"
 },
 {
  "id": "F095",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "easy",
  "hz": true,
  "q": "Es droht Gefahr. Wann sind Züge NICHT anzuhalten?",
  "a": [
   "Wenn die Gefahr durch das Anhalten vergrößert wird",
   "Wenn es sich um einen Güterzug handelt",
   "Wenn der Zug verspätet ist",
   "Wenn der Tf nicht erreichbar ist",
   "Wenn der Zug weniger als 1 km entfernt ist"
  ],
  "correct": 0,
  "ex": "Bei Gefahr sind Züge anzuhalten, sofern nicht die Gefahr durch das Anhalten vergrößert wird.",
  "src": "Ril 408.0581 Abschnitt 2 Absatz (1)"
 },
 {
  "id": "F096",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Ein Zug kommt aus nicht erkennbarem Anlass zum Halten. Was gilt für die Nachbargleise?",
  "a": [
   "Die Gefahr ist auch für Nachbargleise anzunehmen, solange nicht einwandfrei festgestellt ist, dass sie befahren werden können",
   "Nachbargleise sind nicht betroffen",
   "Nachbargleise dürfen mit 40 km/h befahren werden",
   "Nur bei Reisezügen sind Nachbargleise betroffen",
   "Der Tf entscheidet allein"
  ],
  "correct": 0,
  "ex": "Wird ein Zug wegen Gefahr angehalten oder hält er aus nicht erkennbarem Anlass, muss die Gefahr auch für Züge in Nachbargleisen angenommen werden, bis die Befahrbarkeit einwandfrei festgestellt ist.",
  "src": "Ril 408.0581 Abschnitt 2 Absatz (2)"
 },
 {
  "id": "F097",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "easy",
  "hz": true,
  "q": "Mit welchen Worten beginnt ein fernmündlicher Nothaltauftrag?",
  "a": [
   "„Mayday, mayday, mayday …“",
   "„Achtung, Achtung, Achtung …“",
   "„Notfall, Notfall, Notfall …“",
   "„Halt, Halt, Halt …“",
   "„SOS, SOS, SOS …“"
  ],
  "correct": 0,
  "ex": "Z. B. auf der Streckenfernsprechverbindung: „Mayday, mayday, mayday, alle Fahrten sofort anhalten! Ich wiederhole: …“ – der Auftrag wird wiederholt und mit „Hier …“ abgeschlossen.",
  "src": "Ril 408.0581 Abschnitt 3 Absatz (1)"
 },
 {
  "id": "F098",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Bei einem Tf geht ein Notruf ein. Was muss er sofort tun?",
  "a": [
   "Die Geschwindigkeit sofort auf höchstens 40 km/h verringern",
   "Eine Schnellbremsung einleiten",
   "Die Geschwindigkeit auf 20 km/h verringern",
   "Ohne Änderung weiterfahren und zuhören",
   "Die Geschwindigkeit auf 60 km/h verringern"
  ],
  "correct": 0,
  "ex": "Bei Eingang eines Notrufs verringert der Tf sofort auf höchstens 40 km/h. Folgt kein Nothaltauftrag, fährt er auf Sicht weiter, bis klar ist, dass er nicht betroffen ist.",
  "src": "Ril 408.0581 Abschnitt 3 Absatz (4)"
 },
 {
  "id": "F099",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Ihnen werden Kinder im Gleis gemeldet. Welche Maßnahmen sind richtig?",
  "a": [
   "Betroffene Züge stellen, betroffene Gleise sperren, Nachbar-Fdl und Notfallleitstelle benachrichtigen",
   "Nur die Tf mündlich verständigen, auf die Kinder zu achten",
   "Die Züge mit 40 km/h weiterfahren lassen",
   "Nur die Polizei verständigen",
   "Abwarten, bis ein Tf die Kinder sieht"
  ],
  "correct": 0,
  "ex": "Kinder im Gleis: Züge stellen (ggf. Nothaltauftrag), Gleise sperren, Nachbar-Fdl und Notfallleitstelle benachrichtigen. Aufheben erst nach Meldung von Notfallleitstelle oder Notfallmanager, dass kein Kind mehr im Gleisbereich ist.",
  "src": "Ril 408.0581A01 (Handlungsanweisung Personen im/am Gleis)"
 },
 {
  "id": "F100",
  "thema": "Störungen (LF 9)",
  "lf": "9",
  "d": "medium",
  "hz": true,
  "q": "Ihnen werden erwachsene Personen AM Gleis (nicht im Gleis) gemeldet. Was tun Sie?",
  "a": [
   "Tf mündlich beauftragen, auf die Personen zu achten und zu berichten; Nachbar-Fdl benachrichtigen",
   "Sofort alle Gleise sperren",
   "Nothaltauftrag an alle Züge geben",
   "Nichts – Personen am Gleis sind unproblematisch",
   "Nur die Notfallleitstelle informieren"
  ],
  "correct": 0,
  "ex": "Personen am Gleis: Tf mündlich beauftragen, darauf zu achten und zu berichten; Nachbar-Fdl benachrichtigen. Aufheben, wenn der zuletzt gefahrene Zug keine Personen mehr meldet. Gibt es Hinweise auf Hilflosigkeit, wie bei Kindern verfahren.",
  "src": "Ril 408.0581A01 (Handlungsanweisung Personen im/am Gleis)"
 }
];
