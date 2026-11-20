"use strict";
/* Quiz-Bahn 408 – Grundlagen: Konstanten, Speicher, Fragenauswahl, Spielbrett, Einstellungen */
const FIELDS=20, BUE=[4,9,14,19], EVENTS=[2,7,12,17];
const COLORS=["Rot","Blau","Grün","Gelb","Lila","Orange","Türkis","Pink","Braun","Schwarz","Hellblau","Hellgrün","Dunkelrot","Marine","Oliv","Flieder","Lachs","Grau","Tannengrün","Gold"];
const HEX=["#ec0016","#1769aa","#16803c","#f5b800","#7b3fb3","#e66a19","#0aa3a3","#d6338a","#7a4a1f","#3a3a3a","#6cc4f5","#9ccc65","#8b0012","#1b2a6b","#6b7a1f","#c3a6e8","#f7a08f","#a3a3a3","#0b4d2a","#c9a227"];
/* farbiger Punkt als HTML (Emojis gibt es nicht in 20 Farben) */
const EMO=HEX.map((h,i)=>`<i class="dot c${i}" title="${COLORS[i]}"></i>`);
const CFG=window.QB_CONFIG||{};
const MAXP=Math.max(2,Math.min(20,Number(CFG.maxSpieler)||20));   // Klassenmodus: höchstens 20 Handys
const HZ_MS=1000*Math.max(10,Number(CFG.bueAntwortzeit)||25);       // Störfallfrage Klassenmodus
const AUTO_MS=1000*Math.max(5,Number(CFG.autoWeiterSekunden)||15);   // automatisch weiter
const STEPS={easy:1,medium:2,hard:3};
const DIFF_LABEL={easy:"Leicht",medium:"Mittel",hard:"Schwer"};
const NPC_CFG={leicht:.55,mittel:.72,schwer:.88};
const NPC_NAMES=["🤖 Lokführer","🤖 Zugchef","🤖 Stellwerker"];
/* Schlüssel für den Browser-Speicher (localStorage) */
const SAVE_KEY="qb408_reihum_v2", CL_KEY="qb408_klasse_v2", Q_KEY="qb408_fragen_v2", NAME_KEY="qb408_namen", LAYOUT_KEY="qb408_layout", PIE_KEY="qb408_piesocket";
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fld=pos=>((pos%FIELDS)+FIELDS)%FIELDS;
const lapsOf=pos=>Math.floor(pos/FIELDS);
const rid=n=>{const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let s="";for(let i=0;i<n;i++)s+=c[Math.floor(Math.random()*c.length)];return s};

let QUESTIONS=loadQuestions();
function loadQuestions(){
  const raw=store.get(Q_KEY);
  if(raw){try{const v=JSON.parse(raw);if(validQuestions(v)===true)return v}catch(e){}}
  return JSON.parse(JSON.stringify(window.QB_FRAGEN||[]));
}
function validQuestions(v){
  if(!Array.isArray(v)||!v.length)return "Es muss eine Liste mit mindestens einer Frage sein.";
  for(let i=0;i<v.length;i++){const q=v[i];
    if(!q||typeof q.q!=="string"||!q.q.trim())return `Frage ${i+1}: Feld „q“ fehlt.`;
    if(!Array.isArray(q.a)||q.a.length<4||q.a.length>5)return `Frage ${i+1}: 4 oder 5 Antworten nötig.`;
    const c=Number(q.correct);if(!Number.isInteger(c)||c<0||c>=q.a.length)return `Frage ${i+1}: „correct“ ungültig.`;
    if(q.d&&!STEPS[q.d])return `Frage ${i+1}: „d“ muss easy, medium oder hard sein.`;
  }
  return true;
}
function poolFor(cfg,hz){
  if(hz&&QUESTIONS.filter(q=>q.hz).length<5)hz=false; // zu wenige Störfallfragen: alle Fragen verwenden
  return QUESTIONS.map((q,i)=>i).filter(i=>{const q=QUESTIONS[i];
    if(hz)return !!q.hz;
    if(cfg.diff!=="all"&&(q.d||"medium")!==cfg.diff)return false;
    if(cfg.thema!=="all"&&q.thema!==cfg.thema)return false;return true});
}
function drawFrom(cfg,list,hz,avoid){
  const p=poolFor(cfg,hz);const src=p.length?p:QUESTIONS.map((q,i)=>i);
  let avail=src.filter(i=>!list.includes(i)&&i!==avoid);
  if(!avail.length){list.length=0;avail=src.filter(i=>i!==avoid);if(!avail.length)avail=src}
  const idx=avail[Math.floor(Math.random()*avail.length)];list.push(idx);return idx;
}

/* ---------- Layout ---------- */
function setLayout(m){if(!["auto","tablet","mobile"].includes(m))m="auto";document.body.classList.remove("layout-auto","layout-tablet","layout-mobile");document.body.classList.add("layout-"+m);
  document.querySelectorAll(".device-switch [data-layout]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.layout===m)));store.set(LAYOUT_KEY,m)}

/* ---------- Brett ---------- */
function xy(field,offsetDeg=0,r=32.6){const a=(field*18-90+offsetDeg)*Math.PI/180;return{x:50+r*Math.cos(a),y:50+r*Math.sin(a)}}
function buildBoard(){
  const b=$("board");
  for(let f=0;f<FIELDS;f++){
    let el=document.createElement("div");const p=xy(f);el.style.left=p.x+"%";el.style.top=p.y+"%";
    if(f===0){el.className="mk field start";el.textContent="START";const s=xy(0,0,42);el.style.left=s.x+"%";el.style.top=s.y+"%"}
    else if(BUE.includes(f)){el.className="mk bue";el.textContent="🚧";el.title="Bahnübergang (Feld "+f+")"}
    else if(EVENTS.includes(f)){el.className="mk ev";el.textContent="⭐";el.title="Ereignisfeld (Feld "+f+")"}
    else{el.className="mk field";el.title="Feld "+f}
    b.appendChild(el);
  }
}
/* list: [{pos,c,name,active,me}] */
function drawTokens(list){
  const b=$("board");b.querySelectorAll(".token").forEach(t=>{if(!list.some((x,i)=>"tok"+i===t.id))t.remove()});
  const size=list.length>10?" tiny":list.length>4?" many":"";
  const step=list.length>10?4.4:list.length>4?5.2:5.8;          // Winkelabstand der Figuren (Grad)
  // Figuren auf demselben Feld in bis zu drei Reihen nebeneinander auffächern
  const byField={};list.forEach((p,i)=>{const f=fld(p.pos);(byField[f]=byField[f]||[]).push(i)});
  list.forEach((p,i)=>{
    let t=$("tok"+i);if(!t){t=document.createElement("div");t.id="tok"+i;b.appendChild(t)}
    t.className="token c"+p.c+size+(p.active?" active":"")+(p.me?" me":"");
    t.textContent=p.c+1;
    const grp=byField[fld(p.pos)],k=grp.indexOf(i),n=grp.length;
    const rings=n<=2?1:n<=6?2:3, radii=[[32.6],[31.2,34.0],[30.0,32.6,35.2]][rings-1];
    const cols=Math.ceil(n/rings), col=Math.floor(k/rings), ring=k%rings;
    const q=xy(fld(p.pos),(col-(cols-1)/2)*step,radii[ring]);t.style.left=q.x+"%";t.style.top=q.y+"%";
    t.title=p.name+" – Runde "+lapsOf(p.pos)+", Feld "+fld(p.pos);
  });
  $("legend").innerHTML=list.map(p=>`<span><i class="dot c${p.c}"></i>${p.c+1} ${esc(p.name)}</span>`).join("")+`<span>🚧 Bahnübergang</span><span>⭐ Ereignisfeld</span>`;
}

/* ---------- Dialog & Allgemeines ---------- */
function showDialog(h){$("dialog").innerHTML=h;$("overlay").classList.remove("hidden")}
function closeDialog(){$("overlay").classList.add("hidden")}
function stamp(){const d=new Date();return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`}
function showOnly(id){["setup","lobby","hostPlay","client","play"].forEach(x=>$(x).classList.toggle("hidden",x!==id))}
function cfgFromSetup(){return{diff:$("cfgDiff").value,thema:$("cfgThema").value,goal:Number($("cfgLaps").value),secs:Number($("cfgSecs").value),npc:$("cfgNpc").value,bonus:Number($("cfgBonus").value),n:Number($("cfgPlayers").value)}}
function mode(){return document.querySelector('input[name=mode]:checked').value}
function savedNames(){try{return JSON.parse(store.get(NAME_KEY))||[]}catch(e){return[]}}
/* PieSocket-Zugang: config.js > im Browser gespeichert > aus dem QR-Link */
function pieCfg(){
  const c=CFG.piesocket||{};if(c.apiKey&&c.clusterId)return{cluster:c.clusterId,key:c.apiKey,fromConfig:true};
  let p={};try{p=JSON.parse(store.get(PIE_KEY))||{}}catch(e){}
  const u=new URLSearchParams(location.search);
  return{cluster:u.get("c")||p.cluster||"",key:u.get("k")||p.key||"",fromConfig:false};
}
/* Welche Verbindung wird genutzt? (siehe js/config.js) */
function netConfig(){
  if(new URLSearchParams(location.search).get("net")==="local")return{mode:"local"};
  const v=CFG.verbindung||"auto";
  if(v==="server"||(v==="auto"&&window.QB_SERVER))return{mode:"server"};
  const pc=pieCfg();if(pc.key&&pc.cluster)return{mode:"pie",cluster:pc.cluster,key:pc.key,fromConfig:pc.fromConfig};
  return{mode:"local"};
}
const NET_LABEL={server:"🌐 eigener Server",pie:"🌐 PieSocket (Internet)",local:"⚠️ Testmodus (nur dieses Gerät)"};
function fillThemen(){
  const sel=$("cfgThema");if(!sel||sel.options.length>1)return;
  [...new Set(QUESTIONS.map(q=>q.thema).filter(Boolean))].forEach(t=>{const o=document.createElement("option");o.value=t;o.textContent=t+" ("+QUESTIONS.filter(q=>q.thema===t).length+")";sel.appendChild(o)});
}
function updateSetup(){
  const m=mode();
  document.querySelectorAll(".classOnly").forEach(e=>e.classList.toggle("hidden",m!=="class"));
  document.querySelectorAll(".localOnly").forEach(e=>e.classList.toggle("hidden",m!=="local"));
  const n=Number($("cfgPlayers").value);$("npcWrap").style.visibility=n===1?"visible":"hidden";
  const names=savedNames();const box=$("nameInputs");const keep=[...box.querySelectorAll("input")].map(i=>i.value);
  box.innerHTML="";const count=n===1?1:n;
  for(let i=0;i<count;i++){box.insertAdjacentHTML("beforeend",`<label>${EMO[i]} <input maxlength="20" id="nm${i}" placeholder="Spieler ${COLORS[i]}" value="${esc(keep[i]??names[i]??"")}"></label>`)}
  if(n===1)box.insertAdjacentHTML("beforeend",`<div class="hint">Gegner: ${NPC_NAMES.join(", ")}</div>`);
  fillThemen();
  const pc=pieCfg();if(!$("pieCluster").value)$("pieCluster").value=pc.cluster;if(!$("pieKey").value)$("pieKey").value=pc.key;
  const nc=netConfig();
  $("netBox").classList.toggle("hidden",nc.mode==="server"||!!(nc.mode==="pie"&&nc.fromConfig));
  $("netStatus").textContent="Verbindung: "+NET_LABEL[nc.mode];
  $("startBtn").textContent=m==="class"?"📱 Raum öffnen & QR-Code zeigen":"🚦 Spiel starten";
  const hasLocal=!!store.get(SAVE_KEY),hasClass=!!store.get(CL_KEY);
  $("resumeBtn").classList.toggle("hidden",!(m==="class"?hasClass:hasLocal&&S&&S.phase!=="over"));
  $("setupHint").textContent=m==="class"?"Tipp: 1 Runde ≈ 8–12 Fragen. Für eine Doppelstunde eignen sich 1–2 Runden.":"Tipp: Für eine Unterrichtsstunde mit 4 Spielern reichen 1–2 Runden.";
}
function setupStart(){mode()==="class"?clOpenRoom():startGame()}
function resumeGame(){mode()==="class"?clResume():resumeLocal()}
function askNewGame(){
  showDialog(`<h3>Spiel verlassen?</h3><p>Sie kommen zu den Einstellungen. Der Spielstand bleibt gespeichert und kann fortgesetzt werden.</p><div class="row"><button class="btn" onclick="closeDialog();toSetup()">Zu den Einstellungen</button><button class="btn sec" onclick="closeDialog()">Abbrechen</button></div>`);
}
function toSetup(){clearTimers();clStopHost();showOnly("setup");updateSetup()}

