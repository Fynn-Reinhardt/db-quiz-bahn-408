"use strict";
/* =====================================================================
   NETZWERK – PieSocket (Internet) oder BroadcastChannel (Testmodus)
   ===================================================================== */
function Net(room,net,onData,onStatus){
  this.room=room;this.net=net;this.onData=onData;this.onStatus=onStatus||(()=>{});this.id=rid(10);this.ws=null;this.bc=null;this.tries=0;this.closed=false;this.connect();
}
Net.prototype.connect=function(){
  if(this.net.mode==="server"){ // eigener Server (server/server.js)
    const url=(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws?room="+encodeURIComponent(this.room);
    return this.openWs(url);
  }
  if(this.net.mode==="local"){
    try{this.bc=new BroadcastChannel("quizbahn-"+this.room);this.bc.onmessage=e=>this.recv(e.data);this.onStatus(true);setTimeout(()=>this.onOpen&&this.onOpen(),50)}catch(e){this.onStatus(false,"BroadcastChannel nicht verfügbar")}
    return;
  }
  this.openWs("wss://"+this.net.cluster+".piesocket.com/v4/quizbahn-"+encodeURIComponent(this.room)+"?api_key="+encodeURIComponent(this.net.key)+"&notify_self=0");
};
Net.prototype.openWs=function(url){
  let ws;try{ws=new WebSocket(url)}catch(e){this.onStatus(false,"Verbindung nicht möglich");return}
  this.ws=ws;
  ws.onopen=()=>{this.tries=0;this.onStatus(true);this.onOpen&&this.onOpen()};
  ws.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(err){return}if(m&&m.event==="qb")this.recv(m.data);else if(m&&m.event==="system:error"||m&&m.event==="system::error")this.onStatus(false,"PieSocket meldet einen Fehler – API-Key prüfen.")};
  ws.onclose=()=>{this.onStatus(false,"getrennt – verbinde neu …");if(this.closed)return;const d=Math.min(15000,1000*Math.pow(2,this.tries++));setTimeout(()=>{if(!this.closed)this.connect()},d)};
  ws.onerror=()=>{};
};
Net.prototype.recv=function(d){if(!d||d.from===this.id||d.room!==this.room)return;this.onData(d)};
Net.prototype.send=function(t,data){const msg=Object.assign({t,from:this.id,room:this.room},data||{});
  if(this.bc){this.bc.postMessage(msg);return true}
  if(this.ws&&this.ws.readyState===1){this.ws.send(JSON.stringify({event:"qb",data:msg}));return true}return false};
Net.prototype.close=function(){this.closed=true;try{this.ws&&this.ws.close()}catch(e){}try{this.bc&&this.bc.close()}catch(e){}};

function joinLink(room,net){
  const u=new URL(location.href);u.search="";u.hash="";u.searchParams.set("room",room);
  if(net.mode==="local")u.searchParams.set("net","local");
  else if(net.mode==="pie"&&!net.fromConfig){u.searchParams.set("c",net.cluster);u.searchParams.set("k",net.key)}
  return u.toString();
}
function renderQR(el,text){
  el.innerHTML="";
  try{el.innerHTML=qrSvg(text);return}catch(e){}
  const img=new Image();img.alt="QR-Code";img.src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+encodeURIComponent(text);
  img.onerror=()=>{el.innerHTML='<div style="line-height:1.3;padding:20px;max-width:220px">QR-Code konnte nicht geladen werden – bitte Link oder Raumcode nutzen.</div>'};el.appendChild(img);
}

