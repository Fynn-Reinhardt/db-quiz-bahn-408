"use strict";
/* ---------- Start ---------- */
setLayout(store.get(LAYOUT_KEY)||"auto");
buildBoard();
$("lobbyMax").textContent=MAXP;
(function init(){
  const params=new URLSearchParams(location.search);
  if(params.get("room")){clientInit(params);return}
  try{const raw=store.get(SAVE_KEY);if(raw){const s=JSON.parse(raw);if(s&&Array.isArray(s.players)&&s.q&&QUESTIONS[s.q.idx]&&s.phase!=="over")S=s}}catch(e){}
  updateSetup();renderCatalog();fillEditor();drawTokens([]);
})();
document.addEventListener("keydown",e=>{
  if(!$("overlay").classList.contains("hidden"))return;
  if(!$("client").classList.contains("hidden")&&V){const n="abcde".indexOf(e.key.toLowerCase());if(n>=0&&V.q&&n<V.q.answers.length)cAnswer(n);return}
  if(!S||$("play").classList.contains("hidden"))return;
  const n="abcde".indexOf(e.key.toLowerCase());
  if(n>=0&&!cur().npc){const qs=S.phase==="question"?S.q:S.phase==="hazard"?S.hz:null;if(qs&&qs.order[n]!==undefined)(S.phase==="question"?answer:answerHazard)(qs.order[n])}
  if(e.key==="Enter"&&!$("nextBtn").classList.contains("hidden")&&!cur().npc)nextStep();});
