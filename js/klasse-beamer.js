"use strict";
/* =====================================================================
   KLASSENMODUS – BEAMER (Host, führt das Spiel)
   ===================================================================== */
let C=null, hostNet=null, hostLoop=null, bcTimer=null, lastBc=0, autoAt=0;
const ONLINE_MS=25000;
function clNetFromSetup(){
  const cluster=$("pieCluster").value.trim(),key=$("pieKey").value.trim();
  if(!pieCfg().fromConfig)store.set(PIE_KEY,JSON.stringify({cluster,key}));
  return netConfig();
}
function clOpenRoom(){
  const cfg=cfgFromSetup();
  if(poolFor(cfg,false).length===0){showDialog(`<h3>Keine Fragen gefunden</h3><p>Für diese Kombination gibt es keine Fragen.</p><div class="row"><button class="btn" onclick="closeDialog()">OK</button></div>`);return}
  const net=clNetFromSetup();
  C={room:rid(5),net,cfg,players:[],phase:"lobby",serial:0,q:null,hz:null,res:null,used:[],usedHz:[],log:[],auto:false,winners:null};
  clLog("Raum geöffnet.");clStartHost();
}
function clResume(){
  try{C=JSON.parse(store.get(CL_KEY))}catch(e){C=null}
  if(!C){updateSetup();return}
  if(C.phase==="question"&&C.q){C.q.deadline=Date.now()+C.cfg.secs*1000;C.q.started=Date.now()}
  if(C.phase==="hazard"&&C.hz){C.hz.deadline=Date.now()+HZ_MS;C.hz.started=Date.now()}
  C.players.forEach(p=>p.seen=0);clStartHost();
}
function clStartHost(){
  clStopHost();
  hostNet=new Net(C.room,C.net,clOnMsg,(ok,msg)=>{C._net=ok?"verbunden":(msg||"getrennt");clRenderHost()});
  hostNet.onOpen=()=>clBroadcast(true);
  const link=joinLink(C.room,C.net);
  renderQR($("qrBox"),link);renderQR($("qrSmall"),link);
  $("roomCode").textContent=C.room;$("roomCode2").textContent=C.room;$("joinUrl").textContent=link;
  $("netInfo").innerHTML=C.net.mode==="local"?"⚠️ <b>Testmodus:</b> verbindet nur Tabs auf diesem Gerät. Für Handys bitte in js/config.js die Verbindung einrichten.":NET_LABEL[C.net.mode];
  $("hAuto").checked=!!C.auto;
  hostLoop=setInterval(clTick,250);
  showOnly(C.phase==="lobby"?"lobby":"hostPlay");clRenderHost();clBroadcast(true);
}
function clStopHost(){clearInterval(hostLoop);hostLoop=null;if(hostNet){hostNet.close();hostNet=null}}
function clCancel(){clStopHost();store.del(CL_KEY);C=null;toSetup()}
function clLog(t){C.log.unshift(stamp()+" – "+t);C.log=C.log.slice(0,40)}
function clSave(){if(C)store.set(CL_KEY,JSON.stringify(C))}
function clOnline(p){return Date.now()-(p.seen||0)<ONLINE_MS}
function clPlayer(cid){return C.players.find(p=>p.cid===cid)}
function clOnMsg(m){
  if(!C)return;const p=clPlayer(m.from_cid||m.cid);
  if(p)p.seen=Date.now();
  if(m.t==="join"){
    if(p){if(m.name)p.name=String(m.name).slice(0,16);clBroadcast(true);return}
    if(C.phase==="over"){hostNet.send("full",{to:m.cid,reason:"Das Spiel ist bereits beendet."});return}
    if(C.players.length>=MAXP){hostNet.send("full",{to:m.cid,reason:`Der Raum ist voll (${MAXP} Spieler).`});return}
    const used=C.players.map(x=>x.c);let c=0;while(used.includes(c))c++;
    const name=(String(m.name||"").trim()||"Spieler "+COLORS[c]).slice(0,16);
    C.players.push({cid:m.cid,name,c,pos:0,points:0,right:0,wrong:0,none:0,streak:0,bottle:false,seen:Date.now(),fast:0});
    clLog(`${name} ist beigetreten${C.phase!=="lobby"?" (startet auf Feld 0)":""}.`);clSave();clRenderHost();clBroadcast(true);return;
  }
  if(m.t==="hello"||m.t==="hb"){clBroadcast(m.t==="hello");return}
  if(!p)return;
  if(m.t==="ans"&&C.phase==="question"&&m.serial===C.serial&&!C.q.ans[p.cid]){
    if(Date.now()>C.q.deadline+2000)return;
    const T=C.cfg.secs*1000;const ms=Math.max(0,Math.min(T,Number(m.ms)||T));
    const n=Number(m.n);if(!(n>=0&&n<C.q.order.length))return;
    C.q.ans[p.cid]={n,ms};clSave();clRenderHost();clBroadcast();return;
  }
  if(m.t==="hzans"&&C.phase==="hazard"&&m.serial===C.serial&&C.hz.who.includes(p.cid)&&!C.hz.ans[p.cid]){
    const n=Number(m.n);if(!(n>=0&&n<C.hz.order.length))return;
    C.hz.ans[p.cid]={n};clSave();clRenderHost();clBroadcast();return;
  }
  if(m.t==="bottle"&&(C.phase==="reveal"||C.phase==="hzreveal")&&p.bottle){
    const t=clPlayer(m.target);if(!t||t===p)return;
    p.bottle=false;t.pos=Math.max(lapsOf(t.pos)*FIELDS,t.pos-5);clLog(`🍾 ${p.name} schickt ${t.name} 5 Felder zurück!`);
    C.flash=`🍾 ${p.name} schickt ${t.name} 5 Felder zurück!`;clSave();clRenderHost();clBroadcast(true);return;
  }
}
function clStartGame(){
  if(!C.players.length)return;C.phase="ready";clLog(`Spiel gestartet – Ziel: ${C.cfg.goal} Runde${C.cfg.goal>1?"n":""}.`);showOnly("hostPlay");clNextQuestion();
}
function clNextQuestion(){
  C.serial++;C.flash="";C.res=null;C.hz=null;
  const idx=drawFrom(C.cfg,C.used,false,C.q?C.q.idx:-1);
  C.q={idx,order:shuffle(QUESTIONS[idx].a.map((_,k)=>k)),started:Date.now(),deadline:Date.now()+C.cfg.secs*1000,ans:{}};
  C.phase="question";autoAt=0;clSave();clRenderHost();clBroadcast(true);
}
function clEndEarly(){if(C&&C.phase==="question")clReveal();else if(C&&C.phase==="hazard")clHzReveal()}
function clTick(){
  if(!C)return;const now=Date.now();
  if(C.phase==="question"){
    const active=C.players.filter(clOnline);const all=active.length>0&&active.every(p=>C.q.ans[p.cid]);
    if(now>=C.q.deadline||all)clReveal();else clTimerUI();
  }else if(C.phase==="hazard"){
    const all=C.hz.who.every(cid=>C.hz.ans[cid]||!clOnline(clPlayer(cid)||{}));
    if(now>=C.hz.deadline||all)clHzReveal();else clTimerUI();
  }else if((C.phase==="reveal"||C.phase==="hzreveal")&&C.auto){
    if(!autoAt)autoAt=now+AUTO_MS;const left=Math.ceil((autoAt-now)/1000);$("hNext").textContent=clNextLabel()+` (${left})`;
    if(now>=autoAt){autoAt=0;clContinue()}
  }
  if(now-lastBc>4000)clBroadcast(true);
}
function clReveal(){
  const q=QUESTIONS[C.q.idx],T=C.cfg.secs*1000;C.phase="reveal";
  const res=[];let fastest=null;
  C.players.forEach(p=>{
    const a=C.q.ans[p.cid];const r={cid:p.cid,n:a?a.n:null,ms:a?a.ms:null,ok:false,steps:0,pts:0,ev:"",bue:false};
    if(a&&C.q.order[a.n]===q.correct){r.ok=true;r.steps=a.ms<=T/3?3:a.ms<=2*T/3?2:1;r.pts=2;p.right++;p.streak++;
      if(!fastest||a.ms<fastest.ms)fastest=r}
    else if(a){r.pts=-1;p.wrong++;p.streak=0}else{p.none++;p.streak=0}
    res.push(r);
  });
  if(fastest){fastest.pts+=1;fastest.fast=true;clPlayer(fastest.cid).fast++}
  C.hz={who:[]};
  res.forEach(r=>{const p=clPlayer(r.cid);p.points+=r.pts;
    if(p.streak>=4&&!p.bottle){p.bottle=true;p.streak=0;r.bottle=true;clLog(`🍾 ${p.name}: 4 richtig in Folge – Rückschick-Fähigkeit bereit!`)}
    if(r.steps){const old=p.pos;p.pos+=r.steps;
      if(lapsOf(p.pos)<C.cfg.goal){
        for(let x=old+1;x<=p.pos;x++){if(BUE.includes(fld(x))){r.bue=true;break}}
        if(r.bue&&Math.random()<1/3)C.hz.who.push(p.cid);
        if(EVENTS.includes(fld(p.pos))&&Math.random()<.5)r.ev=clEvent(p);
      }}
  });
  const right=res.filter(r=>r.ok).length;
  clLog(`Frage ${C.serial}: ${right} von ${res.length} richtig${fastest?` – am schnellsten: ${clPlayer(fastest.cid).name} (${(fastest.ms/1000).toFixed(1)} s)`:""}.`);
  C.res=res;autoAt=0;clSave();clRenderHost();clBroadcast(true);
}
function clEvent(p){
  const E=[{t:"🚦 Freie Fahrt! 2 Felder vor.",f:2},{t:"🐌 Langsamfahrstelle – 1 Feld zurück.",f:-1},{t:"🛑 Signal zeigt Halt – 2 Felder zurück.",f:-2},{t:"⭐ Pünktlich angekommen – +1 Punkt.",p:1},{t:"🔧 Weichenstörung – 1 Punkt Abzug.",p:-1}];
  const e=E[Math.floor(Math.random()*E.length)];if(e.f)p.pos=Math.max(0,p.pos+e.f);if(e.p)p.points+=e.p;clLog(`⭐ ${p.name}: ${e.t}`);return e.t;
}
function clNextLabel(){
  if(C.phase==="reveal"&&C.hz&&C.hz.who.length)return"Weiter zum Bahnübergang 🚧";
  if(clWinners().length)return"Zur Siegerehrung 🏆";return"Nächste Frage ➜";
}
function clWinners(){return C.players.filter(p=>lapsOf(p.pos)>=C.cfg.goal)}
function clContinue(){
  if(!C)return;autoAt=0;
  if(C.phase==="reveal"&&C.hz&&C.hz.who.length){clStartHazard();return}
  if(C.phase!=="reveal"&&C.phase!=="hzreveal")return;
  if(clWinners().length){clOver();return}
  clNextQuestion();
}
function clStartHazard(){
  C.serial++;C.flash="";
  const idx=drawFrom(C.cfg,C.usedHz,true,C.q.idx);
  C.hz={who:C.hz.who,idx,order:shuffle(QUESTIONS[idx].a.map((_,k)=>k)),started:Date.now(),deadline:Date.now()+HZ_MS,ans:{}};
  C.phase="hazard";clLog(`🚧 Gestörter Bahnübergang für: ${C.hz.who.map(c=>clPlayer(c).name).join(", ")}.`);clSave();clRenderHost();clBroadcast(true);
}
function clHzReveal(){
  const q=QUESTIONS[C.hz.idx];C.phase="hzreveal";C.hz.res=C.hz.who.map(cid=>{const p=clPlayer(cid),a=C.hz.ans[cid];const ok=!!a&&C.hz.order[a.n]===q.correct;
    if(ok){p.points+=1;clLog(`✅ ${p.name} sichert den Bahnübergang.`)}else{p.pos=Math.max(0,p.pos-2);clLog(`⚠️ ${p.name}: Betriebsgefahr – 2 Felder zurück.`)}
    return{cid,n:a?a.n:null,ok}});
  autoAt=0;clSave();clRenderHost();clBroadcast(true);
}
function clOver(){C.phase="over";const r=clRanking();clLog(`🏆 ${r[0].name} gewinnt!`);clSave();clRenderHost();clBroadcast(true);
  store.del(CL_KEY);
  showDialog(`<h3>🏆 Siegerehrung</h3>${clRankTable(true)}<div class="row" style="margin-top:12px"><button class="btn" onclick="closeDialog();clRematch()">🔄 Nochmal (gleiche Spieler)</button><button class="btn sec" onclick="closeDialog()">Schließen</button></div>`)}
function clRematch(){C.players.forEach(p=>Object.assign(p,{pos:0,points:0,right:0,wrong:0,none:0,streak:0,bottle:false,fast:0}));Object.assign(C,{used:[],usedHz:[],log:[],q:null,hz:null,res:null});clLog("Neue Partie gestartet.");clNextQuestion()}
function clToggleAuto(){if(C){C.auto=$("hAuto").checked;autoAt=0;clSave();clRenderHost()}}
function clRanking(){return C.players.slice().sort((a,b)=>b.pos-a.pos||b.points-a.points)}
function clRankTable(final){
  const rk=clRanking();const goal=C.cfg.goal*FIELDS;
  return `<table><thead><tr><th>Platz / Spieler</th><th>Runde</th><th>Feld</th><th>Strecke</th><th>Punkte</th><th>✓/✗</th>${final?"<th>⚡</th>":"<th>🍾</th>"}</tr></thead><tbody>${rk.map((p,i)=>`<tr><td>${i+1}. ${EMO[p.c]} ${esc(p.name)}${!final&&!clOnline(p)?' <span class="hint">(offline)</span>':""}</td><td>${Math.min(lapsOf(p.pos),C.cfg.goal)}/${C.cfg.goal}</td><td>${fld(p.pos)}</td><td><div class="bar"><i style="width:${Math.min(100,p.pos/goal*100)}%;background:${HEX[p.c]}"></i></div></td><td><b>${p.points}</b></td><td>${p.right}/${p.wrong}</td><td>${final?p.fast:(p.bottle?'<span class="ability">bereit</span>':p.streak+"/4")}</td></tr>`).join("")}</tbody></table>`;
}
/* --- Beamer-Ansicht --- */
function clTimerUI(){
  const qs=C.phase==="hazard"?C.hz:C.q;if(!qs||!qs.deadline)return;const T=C.phase==="hazard"?HZ_MS:C.cfg.secs*1000;
  const left=Math.max(0,qs.deadline-Date.now());const bar=$("hBar");bar.firstChild.style.width=(left/T*100)+"%";bar.classList.toggle("warn",left<6000);
  const n=C.phase==="hazard"?Object.keys(C.hz.ans).length:Object.keys(C.q.ans).length;const of=C.phase==="hazard"?C.hz.who.length:C.players.length;
  $("hStatus").textContent=`⏱ ${Math.ceil(left/1000)} s · ${n} von ${of} ${C.phase==="hazard"?"Betroffenen haben":"haben"} geantwortet`;
}
function clRenderHost(){
  if(!C)return;
  $("lobbyCount").textContent=C.players.length;$("lobbyStart").disabled=!C.players.length;
  $("lobbyList").innerHTML=C.players.map(p=>`<span class="chip${clOnline(p)?"":" off"}"><i class="c${p.c}"></i>${esc(p.name)}<button title="entfernen" onclick="clKick('${p.cid}')">×</button></span>`).join("")||'<span class="hint">Noch niemand – bitte QR-Code scannen.</span>';
  if(C.phase==="lobby"){drawTokens(C.players.map(p=>({pos:0,c:p.c,name:p.name})));return}
  drawTokens(C.players.map(p=>({pos:p.pos,c:p.c,name:p.name})));
  const inQ=C.phase==="question",inH=C.phase==="hazard",isRev=C.phase==="reveal",isHrev=C.phase==="hzreveal";
  const qs=(inH||isHrev)?C.hz:C.q;const q=qs&&QUESTIONS[qs.idx];
  $("hHead").innerHTML=C.phase==="over"?`🏆 ${esc(clRanking()[0].name)} gewinnt!`:(inH||isHrev)?"🚧 BAHNÜBERGANG – STÖRUNG!":`Frage ${C.serial} · Ziel: ${C.cfg.goal} Runde${C.cfg.goal>1?"n":""}`;
  $("hHead").style.borderColor=(inH||isHrev)?"#f5b800":"#ec0016";
  $("hQ").classList.toggle("hazard",inH||isHrev);
  if(q){
    $("hMeta").innerHTML=(inH||isHrev)?`<span class="tag">Störfallfrage für: ${C.hz.who.map(c=>esc(clPlayer(c).name)).join(", ")}</span>`:`${q.lf?`<span class="tag">LF ${esc(q.lf)}</span>`:""}<span class="tag ${q.d||"medium"}">${DIFF_LABEL[q.d||"medium"]}</span>`;
    $("hText").textContent=q.q;
    const reveal=isRev||isHrev||C.phase==="over";
    const counts={};Object.values(qs.ans||{}).forEach(a=>counts[a.n]=(counts[a.n]||0)+1);
    $("hAnswers").innerHTML=qs.order.map((k,n)=>`<button disabled class="${reveal&&k===q.correct?"correct":""}"><b>${"ABCDE"[n]}</b><span>${esc(q.a[k])}${reveal?` <span class="hint">· ${counts[n]||0}×</span>`:""}</span></button>`).join("");
  }
  $("hBar").classList.toggle("hidden",!(inQ||inH));
  if(inQ||inH)clTimerUI();
  else $("hStatus").textContent=C.flash||(C.phase==="over"?"Das Spiel ist beendet.":"Auflösung – besprechen, dann weiter.");
  const fb=$("hFb");
  if(isRev&&C.res){
    const T=C.cfg.secs*1000;
    const rows=C.res.slice().sort((a,b)=>(b.ok-a.ok)||((a.ms??1e9)-(b.ms??1e9))).map(r=>{const p=clPlayer(r.cid);if(!p)return"";
      return `<tr><td>${EMO[p.c]} ${esc(p.name)}</td><td>${r.n===null?"–":"ABCDE"[r.n]}</td><td>${r.ok?"✅":r.n===null?"⌛":"❌"}</td><td>${r.ms===null?"–":(r.ms/1000).toFixed(1)+" s"}</td><td>${r.steps?"+"+r.steps:"0"}</td><td>${r.pts>0?"+":""}${r.pts}${r.fast?" ⚡":""}</td><td style="text-align:left">${r.bue&&C.hz.who.includes(r.cid)?"🚧 ":""}${r.bottle?"🍾 ":""}${esc(r.ev||"")}</td></tr>`}).join("");
    fb.className="box feedback";fb.innerHTML=`<b>Richtige Antwort:</b> ${esc(q.a[q.correct])}${q.ex?`<br>📘 ${esc(q.ex)}`:""}${q.src?`<div class="src">📚 Fundstelle: ${esc(q.src)}</div>`:""}
      <div style="overflow:auto;margin-top:10px"><table class="res"><thead><tr><th>Spieler</th><th>Antw.</th><th></th><th>Zeit</th><th>Felder</th><th>Punkte</th><th>Ereignis</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="hint">Felder: richtig in ≤ ${Math.round(C.cfg.secs/3)} s = 3 · ≤ ${Math.round(2*C.cfg.secs/3)} s = 2 · danach 1. ⚡ = schnellste richtige Antwort (+1 Punkt).</div>`;
  }else if(isHrev){
    fb.className="box feedback";fb.innerHTML=`<b>Richtige Antwort:</b> ${esc(q.a[q.correct])}${q.ex?`<br>📘 ${esc(q.ex)}`:""}${q.src?`<div class="src">📚 Fundstelle: ${esc(q.src)}</div>`:""}<div style="margin-top:8px">${C.hz.res.map(r=>{const p=clPlayer(r.cid);return `${EMO[p.c]} ${esc(p.name)}: ${r.ok?"✅ BÜ gesichert (+1 Punkt)":"⚠️ Betriebsgefahr – 2 Felder zurück"}`}).join("<br>")}</div>`;
  }else fb.className="box feedback hidden";
  $("hEnd").classList.toggle("hidden",!(inQ||inH));
  $("hNext").classList.toggle("hidden",!(isRev||isHrev));$("hNext").textContent=clNextLabel();
  $("hRank").innerHTML=clRankTable(false);
  $("hLog").innerHTML=C.log.map(l=>`<div>${esc(l)}</div>`).join("");
}
function clKick(cid){if(!C)return;const p=clPlayer(cid);if(!p)return;C.players=C.players.filter(x=>x.cid!==cid);clLog(`${p.name} wurde entfernt.`);hostNet&&hostNet.send("kicked",{to:cid});clSave();clRenderHost();clBroadcast(true)}
/* --- Zustand an die Handys senden (ohne Lösung, solange gefragt wird) --- */
function clView(){
  const v={phase:C.phase,serial:C.serial,goal:C.cfg.goal,secs:C.cfg.secs,flash:C.flash||"",now:Date.now(),
    players:C.players.map(p=>({cid:p.cid,name:p.name,c:p.c,pos:p.pos,points:p.points,right:p.right,wrong:p.wrong,streak:p.streak,bottle:p.bottle,on:clOnline(p)}))};
  const pack=(qs,hz)=>{const q=QUESTIONS[qs.idx];const o={text:q.q,answers:qs.order.map(k=>q.a[k]),lf:q.lf,d:q.d,hz:!!hz,left:Math.max(0,qs.deadline-Date.now()),total:hz?HZ_MS:C.cfg.secs*1000,answered:Object.keys(qs.ans||{})};
    if(C.phase==="reveal"||C.phase==="hzreveal"||C.phase==="over"){o.correctN=qs.order.indexOf(q.correct);o.ex=q.ex||"";o.src=q.src||"";o.correctText=q.a[q.correct]}return o};
  if(C.q&&(C.phase==="question"||C.phase==="reveal"))v.q=pack(C.q,false);
  if(C.phase==="reveal")v.res=C.res;
  if(C.hz&&C.hz.idx!==undefined&&(C.phase==="hazard"||C.phase==="hzreveal")){v.q=pack(C.hz,true);v.hzWho=C.hz.who;if(C.phase==="hzreveal")v.hzRes=C.hz.res}
  else if(C.phase==="reveal")v.hzNext=C.hz?C.hz.who:[];
  return v;
}
function clBroadcast(force){
  if(!hostNet||!C)return;const now=Date.now();
  if(!force&&now-lastBc<300){if(!bcTimer)bcTimer=setTimeout(()=>{bcTimer=null;clBroadcast(true)},300);return}
  lastBc=now;hostNet.send("state",{v:clView()});
}

