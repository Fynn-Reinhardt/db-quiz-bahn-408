"use strict";
/* =====================================================================
   EIN GERÄT – REIHUM (wie das Original-Quiz)
   ===================================================================== */
let S=null, npcTimer=null, autoTimer=null, hzInterval=null;
function startGame(){
  const cfg=cfgFromSetup();const n=cfg.n;
  const names=[];for(let i=0;i<(n===1?1:n);i++){names.push(($("nm"+i).value||"").trim()||"Spieler "+COLORS[i])}
  store.set(NAME_KEY,JSON.stringify(names));
  const players=[];const total=n===1?4:n;
  for(let i=0;i<total;i++){const npc=n===1&&i>0;players.push({name:npc?NPC_NAMES[i-1]:names[i],npc,pos:0,points:0,right:0,wrong:0,time:0,streak:0,bottle:false})}
  if(poolFor(cfg,false).length===0){showDialog(`<h3>Keine Fragen gefunden</h3><p>Für diese Kombination gibt es keine Fragen.</p><div class="row"><button class="btn" onclick="closeDialog()">OK</button></div>`);return}
  S={cfg,players,turn:0,phase:"question",q:null,hz:null,pendingHazard:false,used:[],usedHz:[],log:[],winner:-1,fb:null};
  addLog(`Spiel gestartet – Ziel: ${cfg.goal} Runde${cfg.goal>1?"n":""}.`);
  showOnly("play");startTurn();
}
function resumeLocal(){try{const s=JSON.parse(store.get(SAVE_KEY));if(s&&Array.isArray(s.players)&&s.q&&QUESTIONS[s.q.idx])S=s}catch(e){}
  if(!S){updateSetup();return}showOnly("play");if(S.phase==="hazard"){S.hz.deadline=Date.now()+60000}renderAll();resumeFlow()}
function draw(hz){const list=hz?S.usedHz:S.used;const idx=drawFrom(S.cfg,list,hz,S.q?S.q.idx:-1);return{idx,order:shuffle(QUESTIONS[idx].a.map((_,k)=>k)),start:Date.now(),answered:false,choice:null}}
function cur(){return S.players[S.turn]}
function startTurn(){
  clearTimers();S.phase="question";S.fb=null;S.pendingHazard=false;S.hz=null;
  S.q=draw(false);save();renderAll();
  const pl=cur();
  if(pl.npc){
    if(pl.bottle){const target=leaderExcept(S.turn);if(target>=0&&Math.random()<.6){useBottle(S.turn,target)}}
    npcTimer=setTimeout(()=>npcAnswer(false),1600+Math.random()*900);
  }
}
function resumeFlow(){
  const pl=cur();
  if(S.phase==="question"&&pl.npc)npcTimer=setTimeout(()=>npcAnswer(false),1200);
  if(S.phase==="hazard"){startHzTimer();if(pl.npc)npcTimer=setTimeout(()=>npcAnswer(true),2500)}
  if((S.phase==="feedback"||S.phase==="hzfeedback")&&pl.npc)autoTimer=setTimeout(nextStep,3500);
}
function npcAnswer(hz){
  const qs=hz?S.hz:S.q;if(!qs||qs.answered)return;
  const q=QUESTIONS[qs.idx];const ok=Math.random()<NPC_CFG[S.cfg.npc];
  let choice=q.correct;if(!ok){const wrong=q.a.map((_,k)=>k).filter(k=>k!==q.correct);choice=wrong[Math.floor(Math.random()*wrong.length)]}
  hz?answerHazard(choice):answer(choice);
}
function answer(choice){
  if(!S||S.phase!=="question"||S.q.answered)return;
  clearTimeout(npcTimer);
  const pl=cur(),q=QUESTIONS[S.q.idx];S.q.answered=true;S.q.choice=choice;
  const secs=(Date.now()-S.q.start)/1000;pl.time+=secs;
  let msg;
  if(choice===q.correct){
    pl.right++;pl.points+=2;pl.streak++;
    let bonus=0;if(!pl.npc&&S.cfg.bonus>0&&secs<=S.cfg.bonus){bonus=1;pl.points+=1}
    if(pl.streak>=4&&!pl.bottle){pl.bottle=true;pl.streak=0;addLog(`🍾 ${pl.name} hat 4 Fragen in Folge richtig – Rückschick-Fähigkeit bereit!`)}
    const steps=STEPS[q.d||"medium"]||2;const old=pl.pos;pl.pos+=steps;
    msg=`✅ <b>Richtig!</b> +2 Punkte${bonus?` · ⚡ Zeitbonus +1 (${secs.toFixed(1)} s)`:""} · ${steps} Feld${steps>1?"er":""} vor.`;
    addLog(`✅ ${pl.name} antwortet richtig und fährt ${steps} Feld${steps>1?"er":""}.`);
    if(lapsOf(pl.pos)>lapsOf(old))addLog(`🏁 ${pl.name} hat Runde ${lapsOf(pl.pos)} von ${S.cfg.goal} abgeschlossen.`);
    if(lapsOf(pl.pos)<S.cfg.goal){
      let crossed=false;for(let x=old+1;x<=pl.pos;x++)if(BUE.includes(fld(x)))crossed=true;
      if(crossed&&Math.random()<1/3)S.pendingHazard=true;
      if(EVENTS.includes(fld(pl.pos))&&Math.random()<.5)msg+="<br>"+triggerEvent(pl);
    }
  }else{
    pl.wrong++;pl.points-=1;pl.streak=0;
    msg=`❌ <b>Leider falsch.</b> −1 Punkt · Der Zug bleibt stehen.${pl.bottle?"":" Der 🍾-Zähler beginnt von vorn."}`;
    addLog(`❌ ${pl.name} antwortet falsch – der Zug bleibt stehen.`);
  }
  S.fb={kind:choice===q.correct?"ok":"bad",msg,idx:S.q.idx,choice};
  S.phase="feedback";save();renderAll();
  if(pl.npc)autoTimer=setTimeout(nextStep,3500);
}
function triggerEvent(pl){
  const E=[{t:"🚦 Ereignis: Freie Fahrt! 2 Felder vor.",f:2},{t:"🐌 Ereignis: Langsamfahrstelle – 1 Feld zurück.",f:-1},{t:"🛑 Ereignis: Signal zeigt Halt – 2 Felder zurück.",f:-2},{t:"⭐ Ereignis: Pünktlich angekommen – +1 Punkt.",p:1},{t:"🔧 Ereignis: Weichenstörung – 1 Punkt Abzug.",p:-1}];
  const e=E[Math.floor(Math.random()*E.length)];
  if(e.f)pl.pos=Math.max(0,pl.pos+e.f);if(e.p)pl.points+=e.p;
  addLog(`${e.t.replace("Ereignis:",pl.name+":")}`);return e.t;
}
function nextStep(){
  if(!S)return;clearTimeout(autoTimer);
  if(S.phase==="feedback"&&S.pendingHazard){S.pendingHazard=false;startHazard();return}
  if(S.phase==="feedback"||S.phase==="hzfeedback")endTurn();
}
function endTurn(){
  const pl=cur();
  if(lapsOf(pl.pos)>=S.cfg.goal){S.phase="over";S.winner=S.turn;addLog(`🏆 ${pl.name} gewinnt nach ${S.cfg.goal} Runde${S.cfg.goal>1?"n":""}!`);save();renderAll();showResult();return}
  S.turn=(S.turn+1)%S.players.length;startTurn();
}
function startHazard(){
  S.phase="hazard";S.hz=draw(true);S.hz.deadline=Date.now()+60000;S.fb=null;
  addLog(`🚧 ${cur().name} erreicht einen gestörten Bahnübergang!`);save();renderAll();startHzTimer();
  if(cur().npc)npcTimer=setTimeout(()=>npcAnswer(true),2500+Math.random()*2500);
}
function startHzTimer(){
  clearInterval(hzInterval);
  const tick=()=>{if(!S||S.phase!=="hazard"){clearInterval(hzInterval);return}
    const left=Math.max(0,Math.ceil((S.hz.deadline-Date.now())/1000));const el=$("hzTimer");el.textContent="⏱ "+left+" s";el.classList.toggle("warn",left<=10);
    if(left<=0){clearInterval(hzInterval);answerHazard(null)}};
  tick();hzInterval=setInterval(tick,250);
}
function answerHazard(choice){
  if(!S||S.phase!=="hazard"||S.hz.answered)return;
  clearInterval(hzInterval);clearTimeout(npcTimer);
  const pl=cur(),q=QUESTIONS[S.hz.idx];S.hz.answered=true;S.hz.choice=choice;
  let msg,kind;
  if(choice===q.correct){pl.points+=1;kind="ok";msg="✅ <b>Bahnübergang gesichert</b> – richtig gehandelt! +1 Punkt.";addLog(`✅ ${pl.name} sichert den Bahnübergang.`)}
  else{pl.pos=Math.max(0,pl.pos-2);kind="bad";msg=(choice===null?"⏱ <b>Zeit abgelaufen!</b> ":"❌ <b>Falsch!</b> ")+"⚠️ BETRIEBSGEFAHR – 2 Felder zurück.";addLog(`⚠️ ${pl.name}: Betriebsgefahr am Bahnübergang – 2 Felder zurück.`)}
  S.fb={kind,msg,idx:S.hz.idx,choice,hz:true};S.phase="hzfeedback";save();renderAll();
  if(pl.npc)autoTimer=setTimeout(nextStep,3500);
}
function leaderExcept(me){let best=-1;S.players.forEach((p,i)=>{if(i!==me&&p.pos%FIELDS>0&&(best<0||p.pos>S.players[best].pos))best=i});return best}
function openBottle(){
  const me=S.turn;const opts=S.players.map((p,i)=>i===me?"":`<button class="btn sec" style="text-align:left" onclick="useBottle(${me},${i});closeDialog()">${EMO[i]} ${esc(p.name)} – Runde ${lapsOf(p.pos)}, Feld ${fld(p.pos)}</button>`).join("");
  showDialog(`<h3>🍾 Wen schicken Sie zurück auf START?</h3><p class="hint">Der Zug fährt auf das START-Feld seiner aktuellen Runde zurück. Abgeschlossene Runden bleiben erhalten.</p><div style="display:grid;gap:8px">${opts}</div><div class="row" style="margin-top:10px"><button class="btn sec" onclick="closeDialog()">Abbrechen</button></div>`);
}
function useBottle(me,target){
  const a=S.players[me],b=S.players[target];if(!a.bottle)return;
  a.bottle=false;b.pos=lapsOf(b.pos)*FIELDS;addLog(`🍾 ${a.name} schickt ${b.name} zurück auf START!`);save();renderAll();
}
function renderAll(){if(!S)return;drawTokens(S.players.map((p,i)=>({pos:p.pos,c:i,name:p.name,active:S.phase!=="over"&&i===S.turn})));renderHeader();renderQuestion();renderHazard();renderFeedback();renderScore();renderLog()}
function renderHeader(){
  const pl=cur();
  $("current").innerHTML=S.phase==="over"?`🏆 ${esc(S.players[S.winner].name)} gewinnt!`:`${EMO[S.turn]} ${esc(pl.name)} ist am Zug · Runde ${Math.min(lapsOf(pl.pos)+1,S.cfg.goal)} von ${S.cfg.goal}`;
  $("current").style.borderColor=HEX[S.turn];
  let st="";
  if(S.phase==="question")st=pl.npc?"🤖 Der NPC überlegt …":"Beantworten Sie die Frage.";
  else if(S.phase==="hazard")st=pl.npc?"🤖 Der NPC bearbeitet die Störfallfrage …":"🚧 Störfallfrage – die Zeit läuft!";
  else if(S.phase==="feedback"||S.phase==="hzfeedback")st=pl.npc?"Weiter geht es automatisch …":"Erklärung lesen, dann „Weiter“.";
  else st="Das Spiel ist beendet.";
  $("status").textContent=st;
  $("bottleBtn").classList.toggle("hidden",!(S.phase==="question"&&!pl.npc&&pl.bottle&&!S.q.answered));
  $("nextBtn").classList.toggle("hidden",!(S.phase==="feedback"||S.phase==="hzfeedback"));
  $("nextBtn").textContent=S.phase==="feedback"&&S.pendingHazard?"Weiter zum Bahnübergang 🚧":"Weiter ➜";
}
function answerButtons(container,qs,handler,disabled){
  const q=QUESTIONS[qs.idx];container.innerHTML="";
  qs.order.forEach((k,n)=>{const b=document.createElement("button");b.innerHTML=`<b>${"ABCDE"[n]}</b><span>${esc(q.a[k])}</span>`;b.disabled=disabled||qs.answered;
    if(qs.answered){if(k===q.correct)b.classList.add("correct");else if(k===qs.choice)b.classList.add("wrong")}
    b.onclick=()=>handler(k);container.appendChild(b)});
}
function renderQuestion(){
  const qs=S.q;if(!qs)return;const q=QUESTIONS[qs.idx];
  $("qWrap").classList.toggle("hidden",S.phase==="hazard"||S.phase==="hzfeedback"||S.phase==="over");
  $("qMeta").innerHTML=`${q.lf?`<span class="tag">LF ${esc(q.lf)}</span>`:""}<span class="tag ${q.d||"medium"}">${DIFF_LABEL[q.d||"medium"]} · ${STEPS[q.d||"medium"]} Feld${STEPS[q.d||"medium"]>1?"er":""}</span>${q.hz?'<span class="tag">Störfall</span>':""}`;
  $("qText").textContent=q.q;
  answerButtons($("answers"),qs,answer,cur().npc||S.phase!=="question");
}
function renderHazard(){
  const show=S.phase==="hazard"||S.phase==="hzfeedback";$("hazard").classList.toggle("hidden",!show);if(!show||!S.hz)return;
  const q=QUESTIONS[S.hz.idx];$("hzText").textContent=q.q;
  answerButtons($("hzAnswers"),S.hz,answerHazard,cur().npc||S.phase!=="hazard");
  if(S.phase==="hzfeedback"){$("hzTimer").textContent=S.hz.choice===null?"⏱ 0 s":"✔"}
}
function renderFeedback(){
  const el=$("feedback");if(!S.fb){el.classList.add("hidden");return}
  const q=QUESTIONS[S.fb.idx];el.className="box feedback "+S.fb.kind;
  el.innerHTML=`${S.fb.msg}<br><br><b>Richtige Antwort:</b> ${esc(q.a[q.correct])}${q.ex?`<br>📘 ${esc(q.ex)}`:""}${q.src?`<div class="src">📚 Fundstelle: ${esc(q.src)}</div>`:""}`;
}
function renderScore(){
  const rows=S.players.map((p,i)=>({p,i})).sort((a,b)=>b.p.pos-a.p.pos||b.p.points-a.p.points);
  $("scoreboard").innerHTML=`<table><thead><tr><th>Spieler</th><th>Runde</th><th>Feld</th><th>Fortschritt</th><th>Punkte</th><th>R/F</th><th>🍾</th></tr></thead><tbody>${rows.map(({p,i})=>{
    const pct=Math.min(100,p.pos/(S.cfg.goal*FIELDS)*100);
    return `<tr class="${i===S.turn&&S.phase!=="over"?"on":""}"><td>${EMO[i]} ${esc(p.name)}</td><td>${Math.min(lapsOf(p.pos),S.cfg.goal)}/${S.cfg.goal}</td><td>${fld(p.pos)}</td><td><div class="bar"><i style="width:${pct}%;background:${HEX[i]}"></i></div></td><td><b>${p.points}</b></td><td>${p.right}/${p.wrong}</td><td>${p.bottle?'<span class="ability">bereit</span>':p.streak+"/4"}</td></tr>`}).join("")}</tbody></table>`;
}
function addLog(t){if(!S)return;S.log.unshift(stamp()+" – "+t);S.log=S.log.slice(0,40)}
function renderLog(){$("log").innerHTML=S.log.map(l=>`<div>${esc(l)}</div>`).join("")}
function showResult(){
  const rows=S.players.map((p,i)=>({p,i})).sort((a,b)=>b.p.pos-a.p.pos||b.p.points-a.p.points);
  const html=rows.map(({p},n)=>{const tot=p.right+p.wrong;return `<tr><td>${n+1}. ${esc(p.name)}</td><td>${lapsOf(p.pos)}</td><td><b>${p.points}</b></td><td>${p.right}</td><td>${p.wrong}</td><td>${tot?Math.round(p.right/tot*100):0} %</td></tr>`}).join("");
  showDialog(`<h3>🏆 Ergebnis</h3><table><thead><tr><th>Platz</th><th>Runden</th><th>Punkte</th><th>Richtig</th><th>Falsch</th><th>Quote</th></tr></thead><tbody>${html}</tbody></table><div class="row" style="margin-top:12px"><button class="btn" onclick="closeDialog();rematch()">🔄 Nochmal spielen</button><button class="btn sec" onclick="closeDialog();toSetup()">Einstellungen</button><button class="btn sec" onclick="closeDialog()">Schließen</button></div>`);
}
function rematch(){const cfg=S.cfg;S.players.forEach(p=>Object.assign(p,{pos:0,points:0,right:0,wrong:0,time:0,streak:0,bottle:false}));Object.assign(S,{turn:0,winner:-1,used:[],usedHz:[],log:[],q:null});addLog(`Neue Partie – Ziel: ${cfg.goal} Runde${cfg.goal>1?"n":""}.`);startTurn()}
function clearTimers(){clearTimeout(npcTimer);clearTimeout(autoTimer);clearInterval(hzInterval)}
function save(){if(S)store.set(SAVE_KEY,JSON.stringify(S))}

