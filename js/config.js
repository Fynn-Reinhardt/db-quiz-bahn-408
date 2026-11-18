/* =====================================================================
   Quiz-Bahn 408 – Einstellungen
   Diese Datei ist die EINZIGE, die für den Betrieb angepasst werden muss.
   ===================================================================== */
window.QB_CONFIG = {

  /* Verbindung zwischen Beamer und Handys – eine der drei Möglichkeiten:
   *
   *   "server"     Eigener Server: Spiel mit `node server/server.js` starten
   *                (siehe README). Empfohlen, wenn ein Host-Server mit Node.js
   *                vorhanden ist – keine Fremddienste, keine Nutzungsgrenzen.
   *
   *   "piesocket"  Reines Webhosting (z. B. GitHub Pages, pie.host): Die
   *                Nachrichten laufen über den Dienst PieSocket. Unten Cluster-ID
   *                und API-Key eintragen (nur den KEY, niemals das SECRET).
   *
   *   "auto"       "server", wenn die Seite vom eigenen Server kommt,
   *                sonst "piesocket".
   */
  verbindung: "auto",

  piesocket: {
    clusterId: "free.blr2",
    apiKey: "Fg0ZT3jFOIBEGbDgIPvrztwvCAaeQuli2cUHfSRA"
  },

  /* Spielregeln */
  maxSpieler: 10,          // Klassenmodus: höchstens so viele Handys
  bueAntwortzeit: 25,      // Sekunden für die Störfallfrage am Bahnübergang (Klassenmodus)
  autoWeiterSekunden: 15   // "automatisch weiter" nach der Auflösung
};
