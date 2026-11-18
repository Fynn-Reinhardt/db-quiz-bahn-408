"use strict";
/* ---------- Lehrkraft ---------- */
function renderCatalog(){
  const f=$("catFilter").value;
  const list=QUESTIONS.map((q,i)=>({q,i})).filter(({q})=>f==="all"||(f==="hz"?q.hz:f==="korr"?q.korrigiert:q.thema===f));
  $("catalog").innerHTML=`<thead><tr><th>Nr.</th><th>Thema</th><th>Frage</th><th>Richtige Antwort</th><th>Fundstelle</th></tr></thead><tbody>${list.map(({q,i})=>`<tr><td>${i+1}${q.hz?" 🚧":""}</td><td>${esc(q.thema||"")}</td><td>${esc(q.q)}</td><td>${esc(q.a[q.correct])}</td><td>${esc(q.src||"nicht geprüft")}${q.korrigiert?`<br><b>⚠ ${esc(q.korrigiert)}</b>`:""}</td></tr>`).join("")}</tbody>`;
}
function fillEditor(){$("editor").value=JSON.stringify(QUESTIONS,null,2)}
function saveEditor(){
  let v;try{v=JSON.parse($("editor").value)}catch(e){$("editorMsg").textContent="❌ Kein gültiges JSON.";return}
  const r=validQuestions(v);if(r!==true){$("editorMsg").textContent="❌ "+r;return}
  QUESTIONS=v;store.set(Q_KEY,JSON.stringify(v));$("editorMsg").textContent=`✅ ${v.length} Fragen gespeichert. Wirksam ab dem nächsten Spiel.`;renderCatalog();
  if(S){S.used=[];S.usedHz=[]}if(C){C.used=[];C.usedHz=[]}
}
function copyEditor(){const t=$("editor").value;
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(()=>$("editorMsg").textContent="📋 Kopiert.",()=>{$("editor").select();$("editorMsg").textContent="Bitte mit Strg+C kopieren."})}
  else{$("editor").select();$("editorMsg").textContent="Bitte mit Strg+C kopieren."}}
function resetQuestions(){QUESTIONS=JSON.parse(JSON.stringify(window.QB_FRAGEN||[]));store.del(Q_KEY);fillEditor();renderCatalog();$("editorMsg").textContent="✅ Standardfragen wiederhergestellt.";if(S){S.used=[];S.usedHz=[]}}

