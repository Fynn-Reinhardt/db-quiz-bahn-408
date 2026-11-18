"use strict";
/* =====================================================================
   KLASSENMODUS – HANDY (Mitspieler)
   ===================================================================== */
let cNet=null,cRoom="",cCid="",V=null,vAt=0,cMine={},cTimer=null,cHb=null,cLastState=0;
function clientInit(params){
  document.body.classList.add("client");showOnly("client");
  cRoom=params.get("room").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8);$("cRoom").textContent=cRoom;
  const net=netConfig();
  if(net.mode==="local"&&params.get("net")!=="local"){$("cJoinMsg").textContent="⚠️ Im Link fehlen die Verbindungsdaten. Bitte den QR-Code am Beamer erneut scannen.";$("cJoinBtn").disabled=true;return}
  const ck="quizbahn_cid_"+cRoom;cCid=store.get(ck)||rid(12);store.set(ck,cCid);
  $("cName").value=store.get("quizbahn_myname")||"";
  $("cName").addEventListener("keydown",e=>{if(e.key==="Enter")cJoin()});
  cNet=new Net(cRoom,net,cOnMsg,(ok,msg)=>{$("cJoinMsg").textContent=ok?"":"Verbindung: "+(msg||"getrennt");if(V)cRender()});
  cNet.onOpen=()=>{cNet.send("hello",{cid:cCid});if(store.get("quizbahn_joined_"+cRoom))cNet.send("join",{cid:cCid,name:store.get("quizbahn_myname")||""})};
  cHb=setInterval(()=>{cNet&&cNet.send("hb",{cid:cCid});if(Date.now()-cLastState>12000)cNet&&cNet.send("hello",{cid:cCid})},8000);
  cTimer=setInterval(cTick,250);
}
function cJoin(){
  const name=$("cName").value.trim();if(!name){$("cJoinMsg").textContent="Bitte einen Namen eingeben.";return}
  store.set("quizbahn_myname",name);store.set("quizbahn_joined_"+cRoom,"1");
  if(!cNet.send("join",{cid:cCid,name})){$("cJoinMsg").textContent="Noch keine Verbindung – bitte kurz warten und erneut tippen.";return}
  $("cJoinMsg").textContent="Verbinde …";
}
function cOnMsg(m){
  if(m.t==="state"){V=m.v;vAt=Date.now();cLastState=vAt;cRender();return}
  if(m.t==="full"&&m.to===cCid){store.del("quizbahn_joined_"+cRoom);$("cJoinMsg").textContent=m.reason||"Beitritt nicht möglich.";return}
  if(m.t==="kicked"&&m.to===cCid){store.del("quizbahn_joined_"+cRoom);V=null;$("cGame").classList.add("hidden");$("cJoin").classList.remove("hidden");$("cJoinMsg").textContent="Sie wurden vom Spielleiter entfernt.";}
}
function cMe(){return V&&V.players.find(p=>p.cid===cCid)}
function cLeft(){if(!V||!V.q)return 0;return Math.max(0,V.q.left-(Date.now()-vAt))}
function cTick(){
  if(!V||!V.q||!(V.phase==="question"||V.phase==="hazard"))return;
  const left=cLeft(),bar=$("cBar");bar.firstChild.style.width=(left/V.q.total*100)+"%";bar.classList.toggle("warn",left<6000);
  const me=cMe();const key=V.serial;
  if(me&&(V.phase==="question"||V.hzWho&&V.hzWho.includes(cCid))&&!cMine[key])$("cStatus").textContent=`⏱ ${Math.ceil(left/1000)} s – jetzt antworten!`;
  if(left<=0&&!cMine[key])$("cAnswers").querySelectorAll("button").forEach(b=>b.disabled=true);
}
function cAnswer(n){
  if(!V||cMine[V.serial]!==undefined)return;const me=cMe();if(!me)return;
  if(V.phase==="question"){const ms=V.q.total-cLeft();cMine[V.serial]={n,ms};cNet.send("ans",{cid:cCid,serial:V.serial,n,ms})}
  else if(V.phase==="hazard"&&V.hzWho.includes(cCid)){cMine[V.serial]={n};cNet.send("hzans",{cid:cCid,serial:V.serial,n})}
  cRender();
}
function cRender(){
  if(!V)return;const me=cMe();
  if(!me){$("cGame").classList.add("hidden");$("cJoin").classList.remove("hidden");drawTokens(V.players.map(p=>({pos:p.pos,c:p.c,name:p.name})));return}
  $("cJoin").classList.add("hidden");$("cGame").classList.remove("hidden");
  drawTokens(V.players.map(p=>({pos:p.pos,c:p.c,name:p.name,me:p.cid===cCid})));
  const rk=V.players.slice().sort((a,b)=>b.pos-a.pos||b.points-a.points);const place=rk.findIndex(p=>p.cid===cCid)+1;
  $("cMe").className="me c"+me.c;$("cMe").innerHTML=`<span style="font-size:26px">${me.c+1}</span><span>${esc(me.name)}<small>Runde ${Math.min(lapsOf(me.pos),V.goal)}/${V.goal} · Feld ${fld(me.pos)} · ${me.points} Punkte · Platz ${place} von ${V.players.length}${me.bottle?" · 🍾 bereit":""}</small></span>`;
  const mine=cMine[V.serial];const hz=V.q&&V.q.hz;const amIn=!hz||(V.hzWho||[]).includes(cCid);
  let st="";
  if(V.phase==="lobby")st="✅ Sie sind dabei! Warten auf den Spielstart …";
  else if(V.phase==="question")st=mine!==undefined?"✔ Antwort gespeichert – warten auf die anderen …":`⏱ ${Math.ceil(cLeft()/1000)} s – jetzt antworten!`;
  else if(V.phase==="hazard")st=amIn?(mine!==undefined?"✔ Antwort gespeichert …":"🚧 Ihr Zug steht an einem gestörten BÜ – schnell antworten!"):`🚧 Störfallfrage für: ${V.hzWho.map(c=>esc((V.players.find(p=>p.cid===c)||{}).name||"?")).join(", ")} – bitte warten.`;
  else if(V.phase==="reveal"||V.phase==="hzreveal")st=V.flash||"Auflösung – gleich geht es weiter.";
  else if(V.phase==="over")st=place===1?"🏆 Sie haben gewonnen!":`🏁 Spiel beendet – Sie sind auf Platz ${place}.`;
  $("cStatus").innerHTML=st;
  const showQ=!!V.q&&V.phase!=="lobby";$("cQWrap").classList.toggle("hidden",!showQ);
  if(showQ){
    $("cMeta").innerHTML=hz?'<span class="tag">🚧 Störfallfrage</span>':`${V.q.lf?`<span class="tag">LF ${esc(V.q.lf)}</span>`:""}<span class="tag ${V.q.d||"medium"}">${DIFF_LABEL[V.q.d||"medium"]||""}</span>`;
    $("cText").textContent=V.q.text;
    const open=(V.phase==="question"||(V.phase==="hazard"&&amIn))&&mine===undefined&&cLeft()>0;
    const myN=mine!==undefined?mine.n:(V.res?((V.res.find(r=>r.cid===cCid)||{}).n):V.hzRes?((V.hzRes.find(r=>r.cid===cCid)||{}).n):undefined);
    const akey=[V.serial,V.phase,open,myN,V.q.correctN].join("|");
    if($("cAnswers").dataset.key!==akey){$("cAnswers").dataset.key=akey;
    $("cAnswers").innerHTML="";V.q.answers.forEach((t,n)=>{const b=document.createElement("button");b.innerHTML=`<b>${"ABCDE"[n]}</b><span>${esc(t)}</span>`;b.disabled=!open;
      if(V.q.correctN!==undefined){if(n===V.q.correctN)b.classList.add("correct");else if(n===myN)b.classList.add("wrong")}else if(n===myN)b.classList.add("chosen");
      b.onclick=()=>cAnswer(n);$("cAnswers").appendChild(b)});}
    $("cBar").classList.toggle("hidden",!(V.phase==="question"||V.phase==="hazard"));
  }
  const fb=$("cFb");
  if(V.phase==="reveal"&&V.res){const r=V.res.find(x=>x.cid===cCid);
    if(r){fb.className="box feedback "+(r.ok?"ok":"bad");
      fb.innerHTML=(r.ok?`<div class="big-ok">✅ Richtig! +${r.steps} Feld${r.steps>1?"er":""}</div>${(r.ms/1000).toFixed(1)} s · ${r.pts>0?"+":""}${r.pts} Punkte${r.fast?" · ⚡ Schnellste/r!":""}`:r.n===null?`<div class="big-ok">⌛ Keine Antwort</div>Der Zug bleibt stehen.`:`<div class="big-ok">❌ Leider falsch</div>−1 Punkt · Der Zug bleibt stehen.`)
        +(r.ev?`<br>${esc(r.ev)}`:"")+(r.bottle?"<br>🍾 4 richtig in Folge – Rückschick-Fähigkeit bereit!":"")+((V.hzNext||[]).includes(cCid)?"<br><b>🚧 Achtung: Ihr Zug erreicht einen gestörten Bahnübergang!</b>":"")
        +`<br><br><b>Richtige Antwort:</b> ${esc(V.q.correctText)}${V.q.ex?`<br>📘 ${esc(V.q.ex)}`:""}${V.q.src?`<div class="src">📚 ${esc(V.q.src)}</div>`:""}`}
    else fb.className="box feedback hidden";
  }else if(V.phase==="hzreveal"){const r=(V.hzRes||[]).find(x=>x.cid===cCid);
    fb.className="box feedback "+(r?(r.ok?"ok":"bad"):"");
    fb.innerHTML=(r?(r.ok?'<div class="big-ok">✅ Bahnübergang gesichert! +1 Punkt</div>':'<div class="big-ok">⚠️ Betriebsgefahr – 2 Felder zurück</div>'):"")+`<b>Richtige Antwort:</b> ${esc(V.q.correctText)}${V.q.ex?`<br>📘 ${esc(V.q.ex)}`:""}${V.q.src?`<div class="src">📚 ${esc(V.q.src)}</div>`:""}`;
  }else fb.className="box feedback hidden";
  $("cBottle").classList.toggle("hidden",!(me.bottle&&(V.phase==="reveal"||V.phase==="hzreveal")));
  $("cRank").innerHTML=`<table><thead><tr><th>Spieler</th><th>Runde</th><th>Feld</th><th>Punkte</th></tr></thead><tbody>${rk.map((p,i)=>`<tr class="${p.cid===cCid?"on":""}"><td>${i+1}. ${EMO[p.c]} ${esc(p.name)}</td><td>${Math.min(lapsOf(p.pos),V.goal)}/${V.goal}</td><td>${fld(p.pos)}</td><td>${p.points}</td></tr>`).join("")}</tbody></table>`;
}
function cOpenBottle(){
  const opts=V.players.filter(p=>p.cid!==cCid).map(p=>`<button class="btn sec" style="text-align:left" onclick="cBottle('${p.cid}')">${EMO[p.c]} ${esc(p.name)} – Runde ${lapsOf(p.pos)}, Feld ${fld(p.pos)}</button>`).join("");
  showDialog(`<h3>🍾 Wen schicken Sie 5 Felder zurück?</h3><p class="hint">Der Zug fährt 5 Felder zurück – höchstens bis zum START-Feld seiner aktuellen Runde.</p><div style="display:grid;gap:8px">${opts}</div><div class="row" style="margin-top:10px"><button class="btn sec" onclick="closeDialog()">Abbrechen</button></div>`);
}
function cBottle(target){closeDialog();cNet.send("bottle",{cid:cCid,target})}

