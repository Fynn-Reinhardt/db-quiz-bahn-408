# Quiz-Bahn 408 – Fahrdienstvorschrift

Brettspiel-Quiz für den Unterricht „Eisenbahner/-in in der Zugverkehrssteuerung“ mit **100 Fragen** zur Ril 408.

| Modus | Spieler | So läuft es |
|---|---|---|
| 📱 **Klassenmodus** | bis zu 20 Handys | Der Beamer zeigt Brett, Frage und Timer. Alle treten per **QR-Code** bei, geben ihren **Namen** ein und antworten **gleichzeitig** am eigenen Handy. Wer schneller richtig antwortet, kommt weiter. |
| 🖥️ **Reihum** | 1–4 an einem Gerät | Wie das ursprüngliche Spiel: abwechselnd antworten, allein gegen 3 NPCs. |

## Regeln im Klassenmodus

* Richtig im **ersten Drittel** der Antwortzeit: **3 Felder**, im zweiten Drittel: **2 Felder**, danach: **1 Feld**. Falsch oder keine Antwort: stehen bleiben.
* Punkte: richtig **+2**, falsch **−1**, keine Antwort 0, schnellste richtige Antwort **+1 Bonus**.
* 🚧 **Bahnübergang:** Wer darüber fährt, erwischt mit 1/3 Wahrscheinlichkeit eine Störung. Dann gibt es eine Störfallfrage aufs Handy (25 s). Falsch oder zu spät: 2 Felder zurück.
* ⭐ **Ereignisfelder:** zufällige Ereignisse wie Freie Fahrt oder Langsamfahrstelle.
* 🍾 **Flaschen-Regel:** Nach 4 richtigen Antworten in Folge kann man einen Mitspieler 5 Felder zurückschicken.
* Sieger ist, wer nach einer Frage zuerst die eingestellte Rundenzahl geschafft hat. 1 Runde dauert etwa 8 bis 12 Fragen.
* Die höchste Spielerzahl steht in `js/config.js` unter `maxSpieler` (2–20, voreingestellt 20).

## Ordnerstruktur

```
index.html            Seitenaufbau
css/style.css         Gestaltung
js/config.js          ⚙️ EINSTELLUNGEN (Verbindung, Spieleranzahl …)
js/basis.js           Grundlagen: Speicher, Fragenauswahl, Spielbrett
js/netz.js            Verbindung Beamer ↔ Handys
js/klasse-beamer.js   Klassenmodus: Spielleitung am Beamer
js/klasse-handy.js    Klassenmodus: Ansicht auf dem Handy
js/reihum.js          Reihum-Modus an einem Gerät
js/lehrkraft.js       Lösungsübersicht und Fragen-Editor
js/start.js           Programmstart
js/qrcode.js          QR-Code-Erzeugung (MIT-Lizenz, K. Arase)
data/fragen.js        📚 FRAGENKATALOG (100 Fragen)
server/server.js      eigener Spielserver (Node.js, ohne weitere Pakete)
```

## Betrieb – Variante A: eigener Server (empfohlen)

Voraussetzung: **Node.js ab Version 18** auf dem Host-Server. Es müssen keine Pakete installiert werden.

```bash
git clone <repo-url> quizbahn
cd quizbahn
node server/server.js            # läuft auf Port 8080
# anderer Port:  PORT=3000 node server/server.js
```

Danach im Browser `http://<server>:8080` öffnen. Das Spiel erkennt den eigenen Server automatisch (`verbindung: "auto"` in `js/config.js`).

**Dauerhaft laufen lassen**, zum Beispiel mit pm2:

```bash
npm install -g pm2
pm2 start server/server.js --name quizbahn
pm2 save && pm2 startup
```

**Hinter nginx mit HTTPS:** Der Pfad `/ws` muss als WebSocket weitergereicht werden.

```nginx
location / {
    proxy_pass http://127.0.0.1:8080;
}
location /ws {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 3600s;
}
```

Kontrolle: `http://<server>:8080/status` zeigt die offenen Räume und Verbindungen an.

## Betrieb – Variante B: reines Webhosting (GitHub Pages, pie.host …)

Den Ordner einfach hochladen. Ohne eigenen Server laufen die Nachrichten über den Dienst **PieSocket**: In `js/config.js` müssen Cluster-ID und API-Key eingetragen sein (nur den Key, **niemals das Secret**). Der Key steht dann öffentlich im Quelltext. Wer das nicht möchte, lässt die Felder leer und gibt den Zugang am Beamer unter „PieSocket-Zugang eingeben“ ein.

## Ausprobieren ohne Handys

Die Adresse mit `?net=local` aufrufen, also `http://<server>:8080/?net=local` oder `index.html?net=local`. Dann verbinden sich nur Browser-Tabs auf demselben Gerät. Den Beitrittslink in weiteren Tabs öffnen.

## Fragen bearbeiten

* **Dauerhaft:** in `data/fragen.js`. Jede Frage hat eine eindeutige `id`, ein `thema`, die Antworten `a` und den Index `correct` der richtigen Antwort (ab 0). Die Antworten werden im Spiel gemischt.
* **Nur in einem Browser:** im Spiel unter „🛠️ Fragen verwalten“.
* Fragen mit `src` sind gegen die Ril 408 geprüft (Handbuch 40800, V9.0, gültig ab 14.12.2025). Fragen ohne `src` sind nicht geprüft. `korrigiert` markiert Schülerfragen, die fachlich korrigiert wurden.

## Datenschutz

Gespeichert werden nur die Vornamen, die die Spieler selbst eingeben, und zwar im Browser des Beamers (localStorage). Der eigene Server speichert nichts, er leitet Nachrichten nur weiter. Bei PieSocket laufen die Spielnachrichten über einen externen Dienst.
