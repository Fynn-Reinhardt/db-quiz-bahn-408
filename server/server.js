#!/usr/bin/env node
/* =====================================================================
   Quiz-Bahn 408 – eigener Spielserver
   ---------------------------------------------------------------------
   * liefert das Spiel (Ordner über diesem) als Webseite aus
   * leitet unter /ws?room=CODE alle Nachrichten eines Raums an die
     übrigen Geräte desselben Raums weiter (Beamer <-> Handys)
   * keine zusätzlichen Pakete nötig – nur Node.js ab Version 18

   Start:   node server/server.js            (Port 8080)
            PORT=3000 node server/server.js  (anderer Port)
   Danach im Browser: http://<server>:8080
   Hinter einem Reverse-Proxy (nginx, Apache) muss /ws als WebSocket
   durchgereicht werden – siehe README.md.
   ===================================================================== */
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = path.resolve(__dirname, "..");
const MAX_MESSAGE = 256 * 1024;        // größte erlaubte Nachricht (Bytes)
const MAX_CLIENTS_PER_ROOM = 40;       // 10 Spieler + Beamer + Reserve für Neuverbindungen
const PING_INTERVAL = 25000;           // hält Verbindungen durch Proxys offen

const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".md": "text/plain; charset=utf-8", ".txt": "text/plain; charset=utf-8"
};

/* ---------- Webseite ausliefern ---------- */
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/server-info.js") {      // sagt dem Spiel: "eigener Server vorhanden"
    res.writeHead(200, { "Content-Type": TYPES[".js"], "Cache-Control": "no-store" });
    return res.end("window.QB_SERVER=true;");
  }
  if (url.pathname === "/status") {               // kleine Statusabfrage für den Betrieb
    res.writeHead(200, { "Content-Type": TYPES[".json"] });
    return res.end(JSON.stringify({ ok: true, rooms: rooms.size, clients: [...rooms.values()].reduce((n, r) => n + r.size, 0) }));
  }
  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.resolve(ROOT, "." + rel);
  if (!file.startsWith(ROOT + path.sep) || rel.includes("\0") || /(^|[\\/])(server|\.)/.test(path.relative(ROOT, file))) {
    res.writeHead(404); return res.end("Nicht gefunden");
  }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { "Content-Type": TYPES[".txt"] }); return res.end("Nicht gefunden"); }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Content-Length": st.size, "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff"
    });
    fs.createReadStream(file).pipe(res);
  });
});

/* ---------- WebSocket (RFC 6455), minimal ---------- */
const rooms = new Map();   // Raumcode -> Set von Verbindungen

server.on("upgrade", (req, socket) => {
  const url = new URL(req.url, "http://x");
  const key = req.headers["sec-websocket-key"];
  const room = String(url.searchParams.get("room") || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
  if (url.pathname !== "/ws" || !key || !room || (req.headers.upgrade || "").toLowerCase() !== "websocket") {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n"); return;
  }
  const set = rooms.get(room) || new Set();
  if (set.size >= MAX_CLIENTS_PER_ROOM) { socket.end("HTTP/1.1 503 Service Unavailable\r\n\r\n"); return; }
  const accept = crypto.createHash("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
  socket.write("HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: " + accept + "\r\n\r\n");
  socket.setNoDelay(true);

  const client = { socket, room, buf: Buffer.alloc(0), frags: [], alive: true };
  set.add(client); rooms.set(room, set);

  socket.on("data", chunk => {
    client.buf = Buffer.concat([client.buf, chunk]);
    if (client.buf.length > MAX_MESSAGE * 2) return drop(client);
    let frame;
    while ((frame = readFrame(client)) !== null) {
      if (frame === false) return drop(client);
      handleFrame(client, frame);
    }
  });
  socket.on("close", () => leave(client));
  socket.on("error", () => leave(client));
});

function readFrame(c) {
  const b = c.buf;
  if (b.length < 2) return null;
  const fin = (b[0] & 0x80) !== 0, op = b[0] & 0x0f, masked = (b[1] & 0x80) !== 0;
  let len = b[1] & 0x7f, off = 2;
  if (len === 126) { if (b.length < 4) return null; len = b.readUInt16BE(2); off = 4; }
  else if (len === 127) { if (b.length < 10) return null; const hi = b.readUInt32BE(2); if (hi) return false; len = b.readUInt32BE(6); off = 10; }
  if (!masked || len > MAX_MESSAGE) return false;          // Browser senden immer maskiert
  if (b.length < off + 4 + len) return null;
  const mask = b.slice(off, off + 4), data = Buffer.from(b.slice(off + 4, off + 4 + len));
  for (let i = 0; i < data.length; i++) data[i] ^= mask[i & 3];
  c.buf = b.slice(off + 4 + len);
  return { fin, op, data };
}

function handleFrame(c, f) {
  c.alive = true;
  if (f.op === 0x8) { send(c, 0x8, Buffer.alloc(0)); return drop(c); }   // Schließen
  if (f.op === 0x9) return send(c, 0xA, f.data);                        // Ping -> Pong
  if (f.op === 0xA) return;                                             // Pong
  if (f.op === 0x1 || f.op === 0x0) {                                   // Text (ggf. in Teilen)
    c.frags.push(f.data);
    if (!f.fin) return;
    const msg = Buffer.concat(c.frags); c.frags = [];
    if (msg.length > MAX_MESSAGE) return drop(c);
    const set = rooms.get(c.room);
    if (set) for (const other of set) if (other !== c) send(other, 0x1, msg);   // an alle anderen im Raum
    return;
  }
  drop(c);   // Binärdaten werden nicht unterstützt
}

function send(c, op, data) {
  if (c.socket.destroyed) return;
  const len = data.length;
  let head;
  if (len < 126) { head = Buffer.from([0x80 | op, len]); }
  else if (len < 65536) { head = Buffer.alloc(4); head[0] = 0x80 | op; head[1] = 126; head.writeUInt16BE(len, 2); }
  else { head = Buffer.alloc(10); head[0] = 0x80 | op; head[1] = 127; head.writeUInt32BE(0, 2); head.writeUInt32BE(len, 6); }
  c.socket.write(Buffer.concat([head, data]));
}

function leave(c) {
  const set = rooms.get(c.room);
  if (set) { set.delete(c); if (!set.size) rooms.delete(c.room); }
}
function drop(c) { leave(c); c.socket.destroy(); }

// Tote Verbindungen erkennen und Proxys wach halten
setInterval(() => {
  for (const set of rooms.values()) for (const c of set) {
    if (!c.alive) { drop(c); continue; }
    c.alive = false; send(c, 0x9, Buffer.alloc(0));
  }
}, PING_INTERVAL).unref();

server.listen(PORT, () => {
  console.log(`Quiz-Bahn läuft auf http://localhost:${PORT}  (WebSocket: /ws)`);
});
