(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const u of r)if(u.type==="childList")for(const c of u.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const u={};return r.integrity&&(u.integrity=r.integrity),r.referrerPolicy&&(u.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?u.credentials="include":r.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(r){if(r.ep)return;r.ep=!0;const u=o(r);fetch(r.href,u)}})();const rn="ig-feed-square",Zn=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function Ct(t){return Zn.find(n=>n.id===t)??Zn[0]}const fe=0,Qe=120,js=28,xt=100,Tt=4e3,Jn=5,ci=10,Wt=100,Vn=4e3,Xt=240,jo=360,Qn=280,ti=6,Ko="Hello",Yo=`헤르메스의 대표 브랜드 에셋입니다.
에이전트의 그래픽 결과물을 합성하였습니다.`,Xo="black-mountain-red-horizon",li=100,ui=32,Go=71,Zo=99,Jo=77,Vo=209,an=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],hi=["left","center","right"],wo="rgb(0, 0, 0)",$o="rgb(255, 255, 255)";function dn(t){return Number.isFinite(t)?Math.min(Qe,Math.max(fe,Math.round(t))):fe}function ct(t){return Number.isFinite(t)?Math.min(Tt,Math.max(xt,Math.round(t))):xt}function Ks(t,n,o){const s=Math.max(1,Math.round(t)),u=Math.max(1,Math.round(n))/s;let c=ct(o);const m=Math.round(c*u);let p=ct(m);return m!==p&&(c=ct(Math.round(p/u)),p=ct(Math.round(c*u))),{cardWidth:c,cardHeight:p}}function pi(t){return Math.max(Jn,ct(t)-ci*2)}function Gt(t,n){const o=pi(n);return Number.isFinite(t)?Math.min(o,Math.max(Jn,Math.round(t))):Jn}function ft(t){return Number.isFinite(t)?Math.min(Vn,Math.max(Wt,Math.round(t))):Wt}function _t(t){return Math.round(t*2)/2}function cn(t,n,o){const s=Math.max(0,Math.round(n)-Math.min(Math.max(o,0),Math.round(n)));return Number.isFinite(t)?Math.min(s,Math.max(0,_t(t))):0}function Be(t,n,o){const s=Math.round(-o+40),r=Math.round(n-40);return Number.isFinite(t)?s>r?Math.round((n-o)/2):Math.min(r,Math.max(s,_t(t))):0}function Fe(t,n,o,s){const r=ft(n),u=r/Math.max(1,t.width);return{x:Math.round(o-(o-t.x)*u),y:Math.round(s-(s-t.y)*u),width:r}}function Ys(t,n){const o=Math.max(Xt,Math.round(n)-Qn-ti);return Number.isFinite(t)?Math.min(o,Math.max(Xt,Math.round(t))):jo}function Xs(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function me(t,n=[]){var s;const o=an.find(r=>r.id===t);return o?o.stack:((s=n.find(r=>r.id===t))==null?void 0:s.stack)??an[0].stack}function tn(t,n,o=Ct(rn).width,s=Ct(rn).height){if(t==="image")return{id:"image",kind:t,src:n,x:0,y:0,width:ft(o),crop:null};const r=t==="title",u=Gt(r?li:ui,o);return{id:t,kind:t,text:r?Ko:Yo,x:cn(r?Go:Jo,o,u),y:cn(r?Zo:Vo,s,u),size:u,fontId:r?"montserrat":"pretendard",color:ge(0,0,0),...un({},t)}}function bn(t,n,o=rn){const s=Ct(o);return{presetId:s.id,cardWidth:s.width,cardHeight:s.height,themeSlug:t,color:n,radius:js,code:"",panel:"design",controlsWidth:jo,layers:[tn("image",t,s.width,s.height),tn("body",t,s.width,s.height),tn("title",t,s.width,s.height)]}}function ln(){return`layer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}const Qo=[{value:300,label:"Light"},{value:400,label:"Regular"},{value:500,label:"Medium"},{value:600,label:"SemiBold"},{value:700,label:"Bold"}],ts=400,Gs=700;function es(t){return t.weight>=600}function un(t,n){var s;return{weight:((s=Qo.find(r=>r.value===t.weight))==null?void 0:s.value)??(n==="title"?600:ts),italic:t.italic===!0,underline:t.underline===!0,align:hi.find(r=>r===t.align)??"left"}}function Ue(t){return t.kind!=="image"}const ns="upload:";function Zs(t){return t.startsWith(ns)}function So(t,n){t.themeSlug=n;const o=hn(t,"image");o&&(o.src=n)}function hn(t,n){return t.layers.find(o=>o.kind===n)}function Z(t,n){const o=t.layers.find(r=>r.kind===n);if(o)return o;const s=tn(n,t.themeSlug,t.cardWidth,t.cardHeight);return s.id=ln(),n==="image"?t.layers.unshift(s):t.layers.push(s),s}function fi(t,n){const o=t.crop;return o?t.width*n*o.h/o.w:t.width*n}function is(t,n){const o=t.crop??{x:0,y:0,w:1},s=t.width/o.w,r=s*n;return{x:t.x-o.x*s,y:t.y-o.y*r,w:s,h:r}}function Js(t,n){const o={x:(n.x-t.x)/t.w,y:(n.y-t.y)/t.h,w:n.w/t.w,h:n.h/t.h},s=(r,u)=>Math.abs(r-u)<.001;return s(o.x,0)&&s(o.y,0)&&s(o.w,1)&&s(o.h,1)?null:o}const Vs=20;function Kt(t,n,o){return Math.min(Math.max(t,n),Math.max(n,o))}function Qs(t,n,o,s,r){const u=Math.min(Wt,t.w),c=Math.min(Vs,t.h);let m=n.x,p=n.y,f=n.x+n.w,w=n.y+n.h;return o.includes("w")&&(m=Kt(m+s,t.x,f-u)),o.includes("e")&&(f=Kt(f+s,m+u,t.x+t.w)),o.includes("n")&&(p=Kt(p+r,t.y,w-c)),o.includes("s")&&(w=Kt(w+r,p+c,t.y+t.h)),{x:m,y:p,w:f-m,h:w-p}}function tr(t,n,o,s){return{...n,x:Kt(n.x+o,t.x,t.x+t.w-n.w),y:Kt(n.y+s,t.y,t.y+t.h-n.h)}}function er(t,n,o){if(!t||typeof t!="object")return null;const s=t,r=p=>typeof p=="number"&&Number.isFinite(p)?p:null,u=typeof s.id=="string"&&s.id?s.id:ln(),c=r(s.x)??0,m=r(s.y)??0;if(s.kind==="image"){const p=s.crop,f=r(p==null?void 0:p.x),w=r(p==null?void 0:p.y),v=r(p==null?void 0:p.w),y=r(p==null?void 0:p.h);return{id:u,kind:"image",src:typeof s.src=="string"&&s.src?s.src:o,x:c,y:m,width:ft(r(s.width)??Wt),crop:f!==null&&w!==null&&v&&y?{x:f,y:w,w:v,h:y}:null}}return s.kind!=="title"&&s.kind!=="body"?null:{id:u,kind:s.kind,text:typeof s.text=="string"?s.text:"",x:c,y:m,size:r(s.size)??(s.kind==="title"?li:ui),fontId:typeof s.fontId=="string"&&s.fontId?s.fontId:"pretendard",color:rt(String(s.color??""))??n,...un(s,s.kind)}}function nr(t,n,o){const s=(c,m)=>typeof c=="number"&&Number.isFinite(c)?c:m,r=(c,m)=>typeof c=="string"?c:m,u=r(t.fontId,"pretendard");return[{id:"image",kind:"image",src:o,x:s(t.imageX,0),y:s(t.imageY,0),width:ft(s(t.imageWidth,Wt)),crop:null},{id:"body",kind:"body",text:r(t.body,Yo),x:s(t.bodyX,Jo),y:s(t.bodyY,Vo),size:s(t.bodySize,ui),fontId:r(t.bodyFontId,u)||u,color:rt(r(t.bodyColor,""))??n,...un({},"body")},{id:"title",kind:"title",text:r(t.title,Ko),x:s(t.titleX,Go),y:s(t.titleY,Zo),size:s(t.titleSize,li),fontId:r(t.titleFontId,u)||u,color:rt(r(t.titleColor,""))??n,...un({},"title")}]}function mi(t){if(!t||typeof t!="object")return null;const n=t;if(typeof n.themeSlug!="string"||typeof n.color!="string")return null;const o=(c,m)=>typeof c=="number"&&Number.isFinite(c)?c:m,s=bn(n.themeSlug,n.color),r=ei(n.color),u={...s,presetId:typeof n.presetId=="string"?n.presetId:s.presetId,cardWidth:ct(o(n.cardWidth,s.cardWidth)),cardHeight:ct(o(n.cardHeight,s.cardHeight)),radius:dn(o(n.radius,s.radius)),code:typeof n.code=="string"?n.code:"",panel:n.panel==="code"?"code":"design",controlsWidth:o(n.controlsWidth,s.controlsWidth),layers:Array.isArray(n.layers)?n.layers.map(c=>er(c,r,n.themeSlug)).filter(c=>c!==null):nr(n,r,n.themeSlug)};return Z(u,"image"),Z(u,"body"),Z(u,"title"),u}function ir(t,n){const o=bn(t.themeSlug,n,t.presetId);o.controlsWidth=t.controlsWidth,o.panel=t.panel,Object.assign(t,o)}function Eo(t,n,o){if(!n){ir(t,o);return}const{controlsWidth:s,panel:r}=t;Object.assign(t,structuredClone(n),{controlsWidth:s,panel:r})}function rt(t){const n=t.trim().match(/^#([0-9a-fA-F]{6})$/);return n?`#${n[1].toLowerCase()}`:null}function ge(t,n,o){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(t)}${s(n)}${s(o)}`}function gi(t){const n=rt(t);if(n)return{r:Number.parseInt(n.slice(1,3),16),g:Number.parseInt(n.slice(3,5),16),b:Number.parseInt(n.slice(5,7),16)};const o=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return o?{r:Number(o[1]),g:Number(o[2]),b:Number(o[3])}:null}function Ft(t){const n=t/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function Lo(t,n){const o=.2126*Ft(t.r)+.7152*Ft(t.g)+.0722*Ft(t.b),s=.2126*Ft(n.r)+.7152*Ft(n.g)+.0722*Ft(n.b),r=Math.max(o,s),u=Math.min(o,s);return(r+.05)/(u+.05)}function ei(t){const n=gi(os(t));return n?ge(n.r,n.g,n.b):ge(0,0,0)}function os(t){const n=gi(t)??{r:255,g:255,b:255},o=Lo({r:0,g:0,b:0},n),s=Lo({r:255,g:255,b:255},n);return o>=4.5&&o>=s?wo:s>=4.5?$o:o>=s?wo:$o}function or(t,n,o){if(n<=0)return[];const s=[];for(const r of t.split(`
`)){const u=r.split(/\s+/).filter(Boolean);if(u.length===0){s.push("");continue}let c="";const m=p=>{if(o(p)<=n){c=p;return}let f="";for(const w of p){const v=f+w;o(v)<=n?f=v:(f&&s.push(f),f=w)}c=f};for(const p of u){const f=c?`${c} ${p}`:p;o(f)<=n?c=f:(c&&s.push(c),m(p))}c&&s.push(c)}return s}function Yt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function sr(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function rr(t,n){return sr(t).replaceAll("{{title}}",Yt(n.title)).replaceAll("{{body}}",Yt(n.body)).replaceAll("{{themeImage}}",Yt(n.themeImage)).replace(/\{\{image:([^}]+)\}\}/g,(s,r)=>{var u;return Yt(((u=n.images)==null?void 0:u[r])??"")})}function en(t,n=1,o=[]){const s=f=>typeof n=="number"?n:n(f),r=f=>`${Math.round(f*100)/100}px`,u=hn(t,"title"),c=hn(t,"body"),m=[],p=[];return t.layers.forEach((f,w)=>{const v=`layer-${w+1}`,y=`left: ${r(f.x)}; top: ${r(f.y)};`;if(f.kind==="image"){const $=f.src===t.themeSlug?"{{themeImage}}":`{{image:${Yt(f.src)}}}`,O=s(f);if(f.crop){const F=is(f,O);m.push(`  <div class="studio-crop ${v}"><img src="${$}" alt="" /></div>`),p.push(`  .studio-card .${v} { ${y} width: ${r(f.width)}; height: ${r(fi(f,O))}; }`),p.push(`  .studio-card .${v} img { left: ${r(F.x-f.x)}; top: ${r(F.y-f.y)}; width: ${r(F.w)}; }`)}else m.push(`  <img class="${v}" src="${$}" alt="" />`),p.push(`  .studio-card .${v} { ${y} width: ${r(f.width)}; }`);return}const M=f.kind==="title"?"h1":"p",z=f===u?"{{title}}":f===c?"{{body}}":Yt(f.text);m.push(`  <${M} class="${v}">${z}</${M}>`);const D=[`font-weight: ${f.weight};`,f.italic?"font-style: italic;":"",f.underline?"text-decoration: underline;":"",f.align!=="left"?`text-align: ${f.align};`:""].filter(Boolean).join(" ");p.push(`  .studio-card .${v} { ${y} font-size: ${r(f.size)}; font-family: ${me(f.fontId,o)}; color: ${f.color}; ${D} }`)}),`<article class="studio-card">
${m.join(`
`)}
</article>
<style>
  .studio-card {
    position: relative;
    box-sizing: border-box;
    width: var(--studio-width);
    height: var(--studio-height);
    margin: 0;
    overflow: hidden;
    background: var(--studio-color);
    border-radius: var(--studio-radius);
    font-family: var(--studio-title-font);
    color: var(--studio-ink);
  }
  .studio-card img, .studio-card .studio-crop { position: absolute; }
  .studio-card img { height: auto; }
  .studio-card .studio-crop { overflow: hidden; }
  .studio-card h1:empty, .studio-card p:empty { display: none; }
  .studio-card h1, .studio-card p { position: absolute; margin: 0; line-height: 1.25; }
${p.join(`
`)}
</style>`}function ni(t){const n=rt(t.color)??t.color,o=os(n),s=rt(t.titleColor)??ei(n),r=rt(t.bodyColor)??ei(n),u=dn(t.radius),c=Ct("ig-feed-square"),m=t.width>0?t.width:c.width,p=t.height>0?t.height:c.height,f=t.titleFontStack.replaceAll(";",""),w=t.bodyFontStack.replaceAll(";",""),v=rr(t.code.trim()||t.design,t),y=[`--studio-color:${n}`,`--studio-ink:${o}`,`--studio-radius:${u}px`,`--studio-width:${m}px`,`--studio-height:${p}px`,`--studio-title-font:${f}`,`--studio-body-font:${w}`,`--studio-title-size:${Gt(t.titleSize,m)}px`,`--studio-body-size:${Gt(t.bodySize,m)}px`,`--studio-title-x:${_t(t.titleX)}px`,`--studio-title-y:${_t(t.titleY)}px`,`--studio-body-x:${_t(t.bodyX)}px`,`--studio-body-y:${_t(t.bodyY)}px`,`--studio-image-width:${ft(t.imageWidth)}px`,`--studio-image-x:${_t(t.imageX)}px`,`--studio-image-y:${_t(t.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${m}px;height:${p}px;margin:0;background:transparent;${y}">${v}</div>`}function ar(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..700;1,300..700&family=Roboto:ital,wght@0,300..700;1,300..700&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${ni(t)}</body>
</html>`}const ss="design-llm-wiki-pins";function pn(){try{const t=localStorage.getItem(ss);if(!t)return[];const n=JSON.parse(t);return Array.isArray(n)?n.filter(o=>typeof o=="string"):[]}catch{return[]}}function dr(t){const n=[...new Set(t)];localStorage.setItem(ss,JSON.stringify(n))}function cr(t){const n=pn(),o=n.includes(t)?n.filter(s=>s!==t):[...n,t];return dr(o),pn()}const yi="ax-studio-baselines",bi="ax-studio-baseline";function rs(){try{const t=localStorage.getItem(yi);if(t){const s=JSON.parse(t);if(s&&typeof s=="object")return s}const n=localStorage.getItem(bi),o=n?mi(JSON.parse(n)):null;if(o)return{[o.presetId]:o}}catch{}return{}}function ii(t){const n=mi(rs()[t]);return n&&n.presetId===t?n:null}function lr(t){localStorage.setItem(yi,JSON.stringify({...rs(),[t.presetId]:t})),localStorage.removeItem(bi)}function ur(){localStorage.removeItem(yi),localStorage.removeItem(bi)}const hr="ax-design-studio",Zt="cards";let ye=[];function as(){return ye}function ds(){return new Promise((t,n)=>{const o=indexedDB.open(hr,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(Zt)||s.createObjectStore(Zt,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function pr(){const t=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`saved-${t}-${n}`}async function fr(){try{const t=await ds(),n=await new Promise((o,s)=>{const r=t.transaction(Zt,"readonly").objectStore(Zt).getAll();r.onsuccess=()=>o(r.result??[]),r.onerror=()=>s(r.error??new Error("indexedDB read failed"))});t.close(),ye=n.sort((o,s)=>o.createdAt<s.createdAt?1:-1)}catch{ye=[]}}async function mr(t,n){var s;const o={id:pr(),title:((s=hn(t,"title"))==null?void 0:s.text.trim())||"제목 없음",createdAt:new Date().toISOString(),state:structuredClone(t),thumbnail:n};try{const r=await ds();return await new Promise((u,c)=>{const m=r.transaction(Zt,"readwrite").objectStore(Zt).put(o);m.onsuccess=()=>u(),m.onerror=()=>c(m.error??new Error("indexedDB write failed"))}),r.close(),ye=[o,...ye],o}catch{return null}}const gr="ax-studio-uploads",fn="images";let lt=[];function cs(){return lt}function ls(t){return`${ns}${t.id}`}function yr(t){return lt.find(n=>ls(n)===t)}function br(){return new Promise((t,n)=>{const o=indexedDB.open(gr,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(fn)||s.createObjectStore(fn,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function vi(t,n){return br().then(o=>new Promise((s,r)=>{const u=n(o.transaction(fn,t).objectStore(fn));u.onsuccess=()=>{o.close(),s(u.result)},u.onerror=()=>{o.close(),r(u.error??new Error("indexedDB request failed"))}}))}function us(t){return{id:t.id,name:t.name,createdAt:t.createdAt,url:URL.createObjectURL(t.blob)}}async function vr(){try{const t=await vi("readonly",n=>n.getAll())??[];for(const n of lt)URL.revokeObjectURL(n.url);lt=t.sort((n,o)=>n.createdAt<o.createdAt?-1:1).map(us)}catch{lt=[]}}async function xr(t){const n={id:`upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,name:t.name,createdAt:new Date().toISOString(),blob:t};try{await vi("readwrite",s=>s.put(n));const o=us(n);return lt=[...lt,o],o}catch{return null}}async function _r(t){try{await vi("readwrite",o=>o.delete(t));const n=lt.find(o=>o.id===t);return n&&URL.revokeObjectURL(n.url),lt=lt.filter(o=>o.id!==t),!0}catch{return!1}}let Mo=0;function nn(t){return new Promise(n=>{var p,f,w;const o=document.createElement("div");o.className="confirm-backdrop",o.innerHTML=`
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-message">
        <p class="confirm-dialog__message" id="confirm-message"></p>
        <div class="confirm-dialog__actions">
          <button type="button" class="button button--secondary" data-confirm="cancel">취소</button>
          <button type="button" class="button" data-confirm="ok">진행</button>
        </div>
      </div>
    `;const s=o.querySelector("#confirm-message");s&&(s.textContent=t);const r=document.activeElement instanceof HTMLElement?document.activeElement:null;let u=!1;const c=v=>{u||(u=!0,document.removeEventListener("keydown",m),o.remove(),r==null||r.focus(),n(v))},m=v=>{v.key==="Escape"&&(v.preventDefault(),c(!1))};o.addEventListener("click",v=>{v.target===o&&c(!1)}),(p=o.querySelector("[data-confirm='cancel']"))==null||p.addEventListener("click",()=>c(!1)),(f=o.querySelector("[data-confirm='ok']"))==null||f.addEventListener("click",()=>c(!0)),document.addEventListener("keydown",m),document.body.append(o),(w=o.querySelector("[data-confirm='ok']"))==null||w.focus()})}function jt(t){var o;(o=document.querySelector(".toast"))==null||o.remove(),window.clearTimeout(Mo);const n=document.createElement("div");n.className="toast",n.setAttribute("role","status"),n.textContent=t,document.body.append(n),Mo=window.setTimeout(()=>n.remove(),2400)}const hs="[a-z0-9]+(?:-[a-z0-9]+)*";function ps(t){const n=t.startsWith("#")?t.slice(1):t,o=n.indexOf("?"),s=o>=0?n.slice(0,o):n,r=o>=0?n.slice(o+1):"",u=s.startsWith("/")?s:`/${s}`;return{path:u==="/"||u===""?"/":u.replace(/\/+$/,"")||"/",query:r}}function ko(t,n){const o=new URLSearchParams(t).get(n);return!o||!new RegExp(`^${hs}$`).test(o)?null:o}function fs(t){const{path:n}=ps(t);return n==="/intake"||n==="/design-system"||n==="/stats"}function oi(t=window.location.hash){const{path:n,query:o}=ps(t);if(n==="/"||n==="/gallery")return{name:"archive"};if(n==="/history")return{name:"history"};if(n==="/studio"||fs(t))return{name:"studio",theme:n==="/studio"?ko(o,"theme"):null,card:n==="/studio"?ko(o,"card"):null};const s=n.match(new RegExp(`^/capture/(${hs})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:n}}function mt(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":{const n=new URLSearchParams;t.card?n.set("card",t.card):t.theme&&n.set("theme",t.theme);const o=n.toString();return o?`#/studio?${o}`:"#/studio"}case"history":return"#/history";case"notfound":return`#${t.path}`}}function wr(t){const n=()=>t(oi());return window.addEventListener("hashchange",n),t(oi()),()=>window.removeEventListener("hashchange",n)}function $r(t){return[...t].sort((n,o)=>n.capturedAt!==o.capturedAt?n.capturedAt<o.capturedAt?1:-1:n.slug.localeCompare(o.slug))}function b(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function qt(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let je=null;function Sr(t){const n=t.querySelector(".archive-tabs__indicator"),o=t.querySelector('.archive-tab[aria-selected="true"]');if(!n||!o)return;const s=o.offsetLeft,r=o.offsetWidth;je&&(n.style.transition="none",n.style.transform=`translateX(${je.left}px)`,n.style.width=`${je.width}px`,n.offsetWidth,n.style.transition=""),requestAnimationFrame(()=>{n.style.transform=`translateX(${s}px)`,n.style.width=`${r}px`,je={left:s,width:r}})}function jn(t){const n=t.querySelector(".capture-grid");if(!n)return;const o=window.getComputedStyle(n),s=Number.parseFloat(o.gridAutoRows)||1,r=Number.parseFloat(o.rowGap)||0;n.querySelectorAll(".capture-card").forEach(u=>{u.style.gridRowEnd="";const c=u.getBoundingClientRect().height,m=Number.parseFloat(window.getComputedStyle(u).marginBottom)||0,p=Math.ceil((c+m+r)/(s+r));u.style.gridRowEnd=`span ${Math.max(1,p)}`})}function Er(t){const n=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.thumbPath??t.asset.path;return`<img class="capture-card__media" src="${b(qt(n))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function Lr(t){const n=`${t.state.cardWidth} × ${t.state.cardHeight}`;return`
    <article class="capture-card">
      <a class="capture-card__link" href="${mt({name:"studio",theme:null,card:t.id})}">
        <div class="capture-card__frame">
          <img class="capture-card__media" src="${b(t.thumbnail)}" alt="" width="${t.state.cardWidth}" height="${t.state.cardHeight}" />
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${b(t.title)}</h2>
          <p class="capture-card__insight">${b(n)}</p>
        </div>
      </a>
    </article>
  `}function Mr(t,n){return`
    <article class="capture-card${n?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${mt({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${Er(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${b(t.asset.kind)}</span>`}
          ${n?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${b(t.title)}</h2>
          <p class="capture-card__insight">${b(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function kr(t,n){const o=new Set(n),s=$r(t),r=s.filter(f=>o.has(f.slug)),u=s.filter(f=>!o.has(f.slug)),c=new Map(s.map(f=>[f.slug,f])),m=n.map(f=>c.get(f)).filter(f=>!!f),p=r.filter(f=>!n.includes(f.slug));return[...m,...p,...u]}function Ir(t,n,o,s){const r=new Set(n),u=o==="pin"?t.captures.filter(m=>r.has(m.slug)):t.captures,c=kr(u,n);return t.captures.length===0?`
      <section class="state-panel state-panel--soft" aria-live="polite">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">이 번들에 캡처가 없습니다.</p>
      </section>
    `:`
    <section class="gallery archive">
      <header class="gallery__header archive__header">
        <div>
          <h1 class="gallery__title">Graphic Library</h1>
          <p class="gallery__lede">모든 마케팅 비주얼의 출발점이 되는 그래픽 라이브러리입니다. 브랜드 톤에 맞춰 선별한 에셋을 <span class="gallery__nowrap">형태·색·질감</span> 기준으로 탐색하고, Online Marketing Studio에서 채널별 규격에 맞는 카드로 바로 완성할 수 있습니다.</p>
          <p class="gallery__meta">${o==="saved"?`Saved ${s.length}`:`Target ${b(t.target)} · ${c.length} · ${n.length} pinned`}</p>
        </div>
      </header>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${o==="all"?"true":"false"}">
          All <span class="archive-tab__count">${t.captures.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${o==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${n.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-saved" data-archive-tab="saved" aria-selected="${o==="saved"?"true":"false"}">
          Saved <span class="archive-tab__count">${s.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${o==="saved"?s.length===0?`<section class="state-panel state-panel--tint state-panel--empty">
                  <h2 class="state-panel__title">저장된 카드가 없습니다</h2>
                  <p class="state-panel__text">스튜디오에서 그래픽 라이브러리에 추가를 누르면 이 탭에 모입니다.</p>
                </section>`:`<div class="capture-grid">${s.map(m=>Lr(m)).join("")}</div>`:c.length===0?`<section class="state-panel state-panel--tint state-panel--empty">
                <h2 class="state-panel__title">${o==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${o==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${c.map(m=>Mr(m,n.includes(m.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Ar(t,n){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const u=r.dataset.archiveTab;(u==="all"||u==="pin"||u==="saved")&&n.onTabChange(u)})}),Sr(t),requestAnimationFrame(()=>jn(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>jn(t),{once:!0})});const o=new ResizeObserver(()=>jn(t)),s=t.querySelector(".capture-grid");s&&o.observe(s)}function Tr(t){const n=t.replace(/\r\n/g,`
`).split(`
`),o=[];let s=!1;const r=()=>{s&&(o.push("</ul>"),s=!1)};for(const u of n){const c=u.trim();if(!c){r();continue}if(c.startsWith("### ")){r(),o.push(`<h3>${ae(c.slice(4))}</h3>`);continue}if(c.startsWith("## ")){r(),o.push(`<h2>${ae(c.slice(3))}</h2>`);continue}if(c.startsWith("# ")){r(),o.push(`<h1>${ae(c.slice(2))}</h1>`);continue}if(c.startsWith("- ")){s||(o.push("<ul>"),s=!0),o.push(`<li>${ae(c.slice(2))}</li>`);continue}r(),o.push(`<p>${ae(c)}</p>`)}return r(),o.join(`
`)}function ae(t){let n=b(t);return n=n.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(o,s)=>`<a href="${mt({name:"capture",slug:s})}">${s}</a>`),n=n.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(o,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${b(r)}">${s}</a>`),n}const qr=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Cr(t){return Math.max(35,Math.min(98,Math.round(t)))}function Wr(t){let n=0;for(const o of t)n=(n*31+o.charCodeAt(0))%997;return n}function zr(t){var f;if((f=t.analysisScores)!=null&&f.length)return t.analysisScores;const n=Wr(`${t.slug}:${t.title}:${t.insight}`),o=t.tags.includes("density")?7:0,s=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),u=t.asset.width/Math.max(1,t.asset.height),c=u>1.2?6:0,m=u<.75?5:0,p=[68+r+c+n%9,66+o+(n>>1)%10,64+(t.insight.length>45?8:3)+(n>>2)%9,58+s+(t.uiPatterns.includes("filter-chips")?7:0),62+m+r+(n>>3)%8].map(Cr);return qr.map(([w,v],y)=>({key:w,label:v,score:p[y]??60,description:Hr(v,p[y]??60,t)}))}function Dr(t){return t.length===0?0:Math.round(t.reduce((n,o)=>n+o.score,0)/t.length)}function Hr(t,n,o){return t==="레이아웃"?`${o.screenType} 화면 구조와 ${o.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?o.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":n>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function Pr(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Nr(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${b(qt(t.asset.posterPath))}"`:""}>
        <source src="${b(qt(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${b(qt(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function Or(t){const n=zr(t),o=t.analysisTotal??Dr(n),s=160,r=110,u=[.25,.5,.75,1].map(p=>n.map((f,w)=>{const v=-Math.PI/2+w*Math.PI*2/n.length,y=s+Math.cos(v)*r*p,M=s+Math.sin(v)*r*p;return`${y.toFixed(1)},${M.toFixed(1)}`}).join(" ")).map(p=>`<polygon class="spider-grid" points="${p}" />`).join(""),c=n.map((p,f)=>{const w=-Math.PI/2+f*Math.PI*2/n.length,v=r*(p.score/100),y=s+Math.cos(w)*v,M=s+Math.sin(w)*v;return`${y.toFixed(1)},${M.toFixed(1)}`}).join(" "),m=n.map((p,f)=>{const w=-Math.PI/2+f*Math.PI*2/n.length,v=s+Math.cos(w)*r,y=s+Math.sin(w)*r,M=s+Math.cos(w)*r*(p.score/100),z=s+Math.sin(w)*r*(p.score/100),D=s+Math.cos(w)*(r+26),$=s+Math.sin(w)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${v.toFixed(1)}" y2="${y.toFixed(1)}" />
          <circle class="spider-point" cx="${M.toFixed(1)}" cy="${z.toFixed(1)}" r="6" />
          <text class="spider-label" x="${D.toFixed(1)}" y="${$.toFixed(1)}">${b(p.label)}</text>
          <text class="spider-callout" x="${D.toFixed(1)}" y="${($+18).toFixed(1)}">${p.score}</text>
        </g>
      `}).join("");return`
    <section class="detail__section analysis-score">
      <div class="analysis-score__summary">
        <p class="detail__eyebrow">Image analysis score</p>
        <h2>총합 점수 ${o}</h2>
        <p class="detail__empty">항목 위에 마우스를 올리거나 키보드 포커스를 주면 해당 점수가 강조됩니다.</p>
      </div>
      <div class="spider-layout">
        <svg class="spider-chart" viewBox="0 0 320 320" role="img" aria-label="이미지 분석 스파이더 다이어그램">
          ${u}
          <polygon class="spider-area" points="${c}" />
          ${m}
        </svg>
        <dl class="score-list">
          ${n.map(p=>`
            <div class="score-list__item">
              <dt>${b(p.label)} <strong>${p.score}</strong></dt>
              <dd>${b(p.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function Rr(t){const n=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(n)].map(o=>`<span class="chip detail-hashtag" aria-pressed="true">#${b(o)}</span>`).join("")}function Br(t,n,o){const s=t.captures.find(u=>u.slug===n);if(!s)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${b(n)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=o.includes(n);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${b(s.service)} · ${b(s.platform)}</p>
          <h1 class="detail__title">${b(s.title)}</h1>
          <p class="detail__insight">${b(s.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${b(mt({name:"studio",theme:n,card:null}))}">이 테마로 만들기</a>
          <a class="button button--secondary" href="${b(qt(s.asset.path))}" download="${b(`${n}.${s.asset.originalName.split(".").pop()}`)}">원본 다운로드</a>
          <button type="button" class="button button--secondary" data-pin-slug="${b(n)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Nr(s)}</div>

      ${Or(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${b(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${b(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${Pr(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${b(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${Rr(s)}
        </p>
        <p class="detail__meta-line">
          ${b(s.screenType)} · ${b(s.tone)} · ${b(s.copyTone)} · ${b(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${b(s.sourceUrl)}">${b(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Tr(s.body)}
      </section>
    </article>
  `}function Fr(t,n){var o;(o=t.querySelector("[data-pin-slug]"))==null||o.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&n(r)})}function Ur(t){const n=t.wiki.logEntries;return n.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${n.length} entries · target ${b(t.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${n.map(o=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${b(o.date)}">${b(o.date)}</time>
            <span class="history-item__op">${b(o.operation)}</span>
            <strong class="history-item__title">${b(o.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function jr(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${b(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Kn=.5,Yn=3,Io=.25,Kr=.5,Yr=10,de=/Mac|iPhone|iPad|iPod/.test(navigator.userAgent),Ao=40;let q=1,pt=[],ce=[],Ut=[],Ke=[],le=null,To=1;const Xr=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],ms="(min-width: 768px)",gs="(min-width: 1025px)";let on=null,Ye=null,Xe=null,Ge=null,ue=[],Ze=null;const Gr=500,qo=20;function xi(){return window.matchMedia(gs).matches?"desktop":window.matchMedia(ms).matches?"tablet":"mobile"}function ys(){const t=["mobile","tablet","desktop"],n=xi();return on&&t.indexOf(on)<=t.indexOf(n)?on:n}function Je(t){return structuredClone(t)}function Co(t,n){return JSON.stringify(t)===JSON.stringify(n)}const mn=new Map,Wo=new Map;function si(t){const n=mn.get(t);return n!=null&&n.complete&&n.naturalWidth>0?Promise.resolve(n):new Promise((o,s)=>{const r=n??new Image;r.onload=()=>o(r),r.onerror=()=>s(new Error(`Image failed: ${t}`)),n||(mn.set(t,r),r.src=t)})}function Zr(t){const n=Wo.get(t);if(n)return n;const o=fetch(t).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,u)=>{const c=new FileReader;c.onload=()=>r(String(c.result)),c.onerror=()=>u(c.error??new Error("data url failed")),c.readAsDataURL(s)}));return Wo.set(t,o),o}const Jr=Object.assign({});function bs(t,n,o){return`${t.italic?"italic ":""}${t.weight} ${n}px ${me(t.fontId,o)}`}const zo=new Set;function Vr(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function wt(){const t=new Set(an.map(o=>o.label.toLowerCase())),n=[];for(const[o,s]of Object.entries(Jr)){const r=Xs(o);if(!r||t.has(r.toLowerCase()))continue;const u=`local:${r}`;if(!n.some(c=>c.id===u)){if(!zo.has(r)){zo.add(r);const c=document.createElement("style");c.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${Vr(s)}");font-display:swap;}`,document.head.append(c)}n.push({id:u,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return n}function Qr(){return[...an,...wt()]}function ta(t,n,o,s){const r=Math.max(0,Math.min(s,n/2,o/2));t.beginPath(),t.roundRect(0,0,n,o,r)}function ea(t,n,o,s){const r=Z(t,"title"),u=Z(t,"body"),c=Z(t,"image"),m=wt();return{title:r.text,body:u.text,themeImage:n,images:o,design:en(t,s,m),color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:me(r.fontId,m),bodyFontStack:me(u.fontId,m),titleSize:r.size,bodySize:u.size,titleX:r.x,titleY:r.y,bodyX:u.x,bodyY:u.y,imageWidth:c.width,imageX:c.x,imageY:c.y,titleColor:r.color,bodyColor:u.color}}function Do(t,n,o,s){const r=t.getContext("2d");if(!r)return[];const u=n.cardWidth,c=n.cardHeight;t.width=u,t.height=c,r.clearRect(0,0,u,c),r.save(),ta(r,u,c,n.radius),r.clip(),r.fillStyle=n.color,r.fillRect(0,0,u,c);const m=[],p=Math.max(1,u-ci*2);r.textBaseline="top";const f=wt(),w=y=>{const M=o(y);if(!M)return;const z=fi(y,M.naturalHeight/M.naturalWidth);if(y.id!==s){const D=y.crop;if(D){const $=M.naturalWidth,O=M.naturalHeight;r.drawImage(M,D.x*$,D.y*O,D.w*$,D.h*O,y.x,y.y,y.width,z)}else r.drawImage(M,y.x,y.y,y.width,z)}m.push({id:y.id,kind:"image",x:y.x,y:y.y,w:y.width,h:z})},v=y=>{if(!y.text.trim())return;r.fillStyle=y.color,r.font=bs(y,y.size,f);const M=or(y.text.trim(),p,F=>r.measureText(F).width),z=Math.round(y.size*1.25),D=M.map(F=>r.measureText(F).width),$=Math.max(0,...D),O=Math.max(1,Math.round(y.size/16));M.forEach((F,$t)=>{if(y.id===s)return;const gt=D[$t]??0,St=y.x+(y.align==="center"?($-gt)/2:y.align==="right"?$-gt:0),Et=y.y+$t*z;r.fillText(F,St,Et),y.underline&&r.fillRect(St,Et+y.size*.98,gt,O)}),m.push({id:y.id,kind:y.kind,x:y.x,y:y.y,w:Math.max($,y.size),h:Math.max(M.length,1)*z})};for(const y of n.layers)y.kind==="image"?w(y):v(y);return r.restore(),m}function Ho(t,n){t.toBlob(o=>{if(!o)return;const s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=n,r.click(),URL.revokeObjectURL(s)},"image/png")}async function Po(t,n,o,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}"><foreignObject x="0" y="0" width="${o}" height="${s}">${n}</foreignObject></svg>`,u=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),c=URL.createObjectURL(u);try{const m=await si(c),p=t.getContext("2d");if(!p)return;t.width=o,t.height=s,p.clearRect(0,0,o,s),p.drawImage(m,0,0,o,s)}finally{URL.revokeObjectURL(c),mn.delete(c)}}let he=null;function No(t,n,o){let s=0;const r=()=>{const u=t.scrollHeight-t.clientHeight;if(u<=1){n.hidden=!0;return}n.hidden=!1;const c=Math.max(32,t.clientHeight/t.scrollHeight*t.clientHeight),m=Math.max(0,t.clientHeight-c);n.style.height=`${c}px`,n.style.transform=`translateY(${t.scrollTop/u*m}px)`};return t.addEventListener("scroll",()=>{r(),o.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>o.classList.remove("is-scrolling"),700)}),r(),r}const Xn="application/x-ax-studio-image",na=28,ri=2,ai=10;function At(t){return`<span class="studio__steps">
                <button type="button" class="studio__step" data-step="-1" aria-label="${t} 줄이기" title="${ri}px 줄이기 · Shift ${ai}px">−</button>
                <button type="button" class="studio__step" data-step="1" aria-label="${t} 키우기" title="${ri}px 키우기 · Shift ${ai}px">+</button>
              </span>`}const ia=[{style:"bold",label:"볼드",glyph:"B"},{style:"italic",label:"이탤릭",glyph:"I"},{style:"underline",label:"밑줄",glyph:"U"}],Oo={left:"왼쪽 정렬",center:"가운데 정렬",right:"오른쪽 정렬"},oa={left:"M4 6h16M4 10h10M4 14h16M4 18h10",center:"M4 6h16M7 10h10M4 14h16M7 18h10",right:"M4 6h16M10 10h10M4 14h16M10 18h10"};function vs(t,n){return n==="bold"?es(t):t[n]}function Ro(t){return Qo.map(n=>`<option value="${n.value}"${n.value===t?" selected":""}>${n.label} · ${n.value}</option>`).join("")}function Bo(t,n,o){const s=c=>`aria-pressed="${c?"true":"false"}"`,r=ia.map(c=>`<button type="button" class="studio__style-btn studio__style-btn--${c.style}" data-text-kind="${t}" data-text-style="${c.style}" ${s(vs(o,c.style))} aria-label="${n} ${c.label}" title="${c.label}">${c.glyph}</button>`).join(""),u=hi.map(c=>`<button type="button" class="studio__style-btn" data-text-kind="${t}" data-text-align="${c}" ${s(o.align===c)} aria-label="${n} ${Oo[c]}" title="${Oo[c]}"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${oa[c]}" /></svg></button>`).join("");return`
          <div class="studio__field">
            <span id="studio-${t}-style-label">${n} 스타일</span>
            <div class="studio__text-style" role="group" aria-labelledby="studio-${t}-style-label">
              <div class="studio__style-set">${r}</div>
              <div class="studio__style-set">${u}</div>
            </div>
          </div>`}function xs(t,n){const o=(c,m,p)=>{const f=c===n;return`
      <button
        type="button"
        class="studio__theme"
        role="radio"
        data-theme-slug="${b(c)}"
        aria-checked="${f?"true":"false"}"
        tabindex="${f?"0":"-1"}"
        draggable="true"
      >
        <img src="${b(m)}" alt="${b(p)}" draggable="false" />
      </button>
    `},s=t.map(c=>o(c.slug,qt(c.asset.thumbPath??c.asset.path),c.title)),r=cs().map(c=>`
      <div class="studio__theme-item">
        ${o(ls(c),c.url,c.name)}
        <button type="button" class="studio__theme-remove" data-upload-remove="${b(c.id)}" aria-label="${b(c.name)} 삭제" title="삭제">×</button>
      </div>
    `);return[...s,...r,'<button type="button" class="studio__theme studio__theme--add" id="studio-theme-add" aria-label="이미지 추가" title="이미지 추가">+</button>'].join("")}function sa(t,n){if(n.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const o=Z(t,"title"),s=Z(t,"body"),r=Z(t,"image"),u=Ct(t.presetId),c=Zn.map($=>{const O=$.id===u.id,F=na/Math.max($.width,$.height);return`
      <button type="button" class="studio__preset" role="radio" data-preset-id="${b($.id)}" aria-checked="${O?"true":"false"}" tabindex="${O?"0":"-1"}">
        <span class="studio__preset-frame" aria-hidden="true"><span class="studio__preset-shape" style="width:${($.width*F).toFixed(2)}px;height:${($.height*F).toFixed(2)}px"></span></span>
        <span class="studio__preset-name">${b($.name)}</span>
        <span class="studio__preset-size">${$.width}×${$.height}</span>
      </button>`}).join(""),m=xs(n,r.src),p=t.panel==="design",f=Qr(),w=pi(t.cardWidth),v=$=>f.map(O=>`<option value="${b(O.id)}"${O.id===$?" selected":""}>${b(O.label)}</option>`).join(""),y='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',M='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',z=ys();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${Xr.map($=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${$.id}" aria-label="${$.label}" title="${$.label}" aria-pressed="${$.id===z?"true":"false"}">${$.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${z}" data-framed="${z===xi()?"false":"true"}">
    <section class="studio" style="--studio-controls-width:${t.controlsWidth}px">
      <div class="studio__controls-wrap">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${p?"true":"false"}" tabindex="${p?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${p?"false":"true"}" tabindex="${p?"-1":"0"}">Code</button>
        </div>
        <div class="studio__panel-host">
        <div class="studio__panel-scroll" id="studio-panel-scroll">
        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${p?"":" hidden"}>
          <div class="studio__field">
            <span id="studio-preset-label">카드 크기 프리셋</span>
            <div class="studio__presets" role="radiogroup" aria-labelledby="studio-preset-label">${c}</div>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${xt}" max="${Tt}" step="1" value="${t.cardWidth}" />
              ${At("너비·높이 함께")}
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${xt}" max="${Tt}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${xt}" max="${Tt}" step="1" value="${t.cardWidth}" />
              ${At("카드 너비")}
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${xt}" max="${Tt}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${xt}" max="${Tt}" step="1" value="${t.cardHeight}" />
              ${At("카드 높이")}
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${xt}" max="${Tt}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${b(o.text)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${b(o.color)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${b(o.color)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${w}" step="1" value="${o.size}" />
              ${At("타이틀 폰트 크기")}
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${w}" step="1" value="${o.size}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${v(o.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-title-weight">타이틀 굵기</label>
            <select id="studio-title-weight" class="studio__control">${Ro(o.weight)}</select>
          </div>
          ${Bo("title","타이틀",o)}
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${b(s.text)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${b(s.color)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${b(s.color)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${w}" step="1" value="${s.size}" />
              ${At("본문 폰트 크기")}
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${w}" step="1" value="${s.size}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${v(s.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body-weight">본문 굵기</label>
            <select id="studio-body-weight" class="studio__control">${Ro(s.weight)}</select>
          </div>
          ${Bo("body","본문",s)}
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${m}</div>
            <input type="file" id="studio-theme-file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" multiple hidden />
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${Wt}" max="${Vn}" step="1" value="${r.width}" />
              ${At("카드 이미지 크기")}
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${Wt}" max="${Vn}" step="1" value="${r.width}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮기고, 핀치하거나 클릭 후 가장자리 핸들을 끌어 크기를 조절할 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${b(t.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${b(t.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${fe}" max="${Qe}" step="1" value="${t.radius}" aria-valuemin="${fe}" aria-valuemax="${Qe}" aria-valuenow="${t.radius}" />
              ${At("카드 radius")}
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${fe}" max="${Qe}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-set-baseline">초기화로 세팅</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-save-library">그래픽 라이브러리에 추가</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${p?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${b(t.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
        </div>
        <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
        </div>
      </form>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${Xt}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__stage" id="studio-stage">
          <div class="studio__stage-frame">
            <div class="studio__fit" id="studio-fit">
              <div class="studio__scaler" id="studio-scaler">
                <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
                <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
                <div class="studio__safe" id="studio-safe" hidden></div>
              </div>
              <div class="studio__overlay" id="studio-overlay">
                <span class="studio__handle" data-handle="top" hidden></span>
                <span class="studio__handle" data-handle="right" hidden></span>
                <span class="studio__handle" data-handle="bottom" hidden></span>
                <span class="studio__handle" data-handle="left" hidden></span>
                <div class="studio__select-frame studio__crop-frame" id="studio-crop-frame" hidden></div>
                ${["nw","n","ne","e","se","s","sw","w"].map($=>`<span class="studio__handle studio__handle--crop" data-crop="${$}" hidden></span>`).join("")}
                <textarea class="studio__editor" id="studio-editor" rows="1" spellcheck="false" aria-label="텍스트 편집" hidden></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="studio__bar">
          <p class="studio__meta" id="studio-meta" aria-live="polite"></p>
          <div class="studio__bar-actions">
            <div class="studio__history" role="group" aria-label="편집 기록">
              <button type="button" class="studio__zoom-btn" id="studio-undo" aria-label="이전 동작" disabled>${y}</button>
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled>${M}</button>
            </div>
            <div class="studio__zoom" role="group" aria-label="프리뷰 확대">
              <button type="button" class="studio__zoom-btn" id="studio-zoom-out" aria-label="축소">−</button>
              <span class="studio__zoom-label" id="studio-zoom-label">100%</span>
              <button type="button" class="studio__zoom-btn" id="studio-zoom-in" aria-label="확대">+</button>
              <button type="button" class="studio__zoom-btn studio__zoom-btn--text" id="studio-zoom-fit" aria-label="프리뷰에 맞춤">Fit</button>
            </div>
            <button type="button" class="button" id="studio-download">PNG 다운로드</button>
          </div>
        </div>
      </div>
    </section>
    </div>
    <div class="studio__scroll-thumb studio-device__thumb" id="studio-device-thumb" hidden></div>
    </div>
    </div>
  `}function ra(t,n,o,s){var uo,ho,po,fo,mo,go,yo,bo,vo,xo;if(o.length===0)return;const r=[...t.querySelectorAll("[data-preset-id]")],u=t.querySelector("#studio-size"),c=t.querySelector("#studio-size-number"),m=t.querySelector("#studio-width"),p=t.querySelector("#studio-width-number"),f=t.querySelector("#studio-height"),w=t.querySelector("#studio-height-number"),v=t.querySelector("#studio-title"),y=t.querySelector("#studio-title-color"),M=t.querySelector("#studio-title-hex"),z=t.querySelector("#studio-title-size"),D=t.querySelector("#studio-title-size-number"),$=t.querySelector("#studio-body"),O=t.querySelector("#studio-body-color"),F=t.querySelector("#studio-body-hex"),$t=t.querySelector("#studio-body-size"),gt=t.querySelector("#studio-body-size-number"),St=t.querySelector("#studio-title-font"),Et=t.querySelector("#studio-body-font"),be=t.querySelector("#studio-title-weight"),ve=t.querySelector("#studio-body-weight"),vn=t.querySelector("#studio-image-width"),xn=t.querySelector("#studio-image-width-number"),_n=t.querySelector("#studio-color"),xe=t.querySelector("#studio-hex"),U=t.querySelector("#studio-radius"),at=t.querySelector("#studio-radius-number"),J=t.querySelector("#studio-code"),E=t.querySelector("#studio-canvas"),_e=t.querySelector("#studio-iframe"),_i=t.querySelector("#studio-meta"),Jt=t.querySelector("#studio-safe"),we=t.querySelector("#studio-scaler"),wn=t.querySelector("#studio-fit"),j=t.querySelector("#studio-stage"),$e=t.querySelector("#studio-zoom-out"),Se=t.querySelector("#studio-zoom-in"),wi=t.querySelector("#studio-zoom-label"),Ee=t.querySelector("#studio-undo"),$n=t.querySelector("#studio-redo"),Sn=t.querySelector("#studio-scroll-thumb"),En=t.querySelector(".studio__controls-wrap"),Le=t.querySelector("#studio-export"),V=t.querySelector("#studio-splitter"),Me=t.querySelector(".studio"),$i=t.querySelector("#studio-overlay"),Vt=t.querySelector("#studio-crop-frame"),I=t.querySelector("#studio-editor"),Ln=[...t.querySelectorAll(".studio__handle[data-handle]")],Mn=[...t.querySelectorAll(".studio__handle[data-crop]")];if(!$i||!Vt||!I||!u||!c||!m||!p||!f||!w||!v||!y||!M||!z||!D||!$||!O||!F||!$t||!gt||!St||!Et||!be||!ve||!vn||!xn||!_n||!xe||!U||!at||!J||!E||!_e||!_i||!Jt||!we||!wn||!j||!$e||!Se||!wi||!Ee||!$n||!Sn||!En||!Le||!V||!Me||!t.querySelector("#studio-set-baseline")||!t.querySelector("#studio-save-library"))return;const ke=e=>{const i=yr(e);if(i)return i.url;const d=o.find(a=>a.slug===e)??o.find(a=>a.slug===n.themeSlug)??o[0];return d?qt(d.asset.path):""},Lt=e=>{const i=mn.get(ke(e.src));return i!=null&&i.complete&&i.naturalWidth>0?i:null},zt=e=>{const i=Lt(e);return i?i.naturalHeight/i.naturalWidth:1},kn=async()=>{const e=h=>{const g=ke(h);return g?Zr(g).catch(()=>""):Promise.resolve("")},i=[...new Set(n.layers.flatMap(h=>h.kind==="image"&&h.src!==n.themeSlug?[h.src]:[]))],[d,...a]=await Promise.all([e(n.themeSlug),...i.map(e)]),l=Object.fromEntries(i.map((h,g)=>[h,a[g]??""]));return ea(n,d??"",l,zt)};let Ie=0,it=1;const _=new Set;let K=null,L=null,H=()=>{},Ae=()=>{};const ot=e=>n.layers.find(i=>i.id===e),Dt=()=>n.layers.filter(e=>_.has(e.id)),P=e=>{for(let i=n.layers.length-1;i>=0;i-=1){const d=n.layers[i];if(d&&d.kind===e&&_.has(d.id))return d}return Z(n,e)},Ht=()=>{for(let e=n.layers.length-1;e>=0;e-=1){const i=n.layers[e];if(i&&i.kind==="image"&&_.has(i.id))return i}return Z(n,"image")},Qt=()=>n.layers.filter(e=>e.kind==="image"),In=()=>Qt().some(e=>Lt(e)),Ss=()=>{(!Number.isFinite(q)||q<=0)&&(q=1),$e.disabled=q<=Kn+.001,Se.disabled=q>=Yn-.001,wi.textContent=`${Math.round(q*100)}%`},An=(e,i)=>{const d=j.getBoundingClientRect(),a=20,l=Math.min(Math.max(d.width-a,1)/e,Math.max(d.height-a,1)/i);return Number.isFinite(l)&&l>0?l:1},Mt=()=>{const e=An(n.cardWidth,n.cardHeight);Ss();const i=e*q;wn.style.width=`${n.cardWidth*i}px`,wn.style.height=`${n.cardHeight*i}px`,we.style.width=`${n.cardWidth}px`,we.style.height=`${n.cardHeight}px`,we.style.transform=`scale(${i})`,it=i,Ae()};$e.addEventListener("click",()=>{q=Math.max(Kn,q-Io),Mt()}),Se.addEventListener("click",()=>{q=Math.min(Yn,q+Io),Mt()}),(uo=t.querySelector("#studio-zoom-fit"))==null||uo.addEventListener("click",()=>{q=1,Mt(),j.scrollTo(0,0)});const Si=t.querySelector("#studio-panel-scroll"),Es=Si&&Sn&&En?No(Si,Sn,En):()=>{},Ls=()=>{J.style.height="auto",J.style.height=`${Math.max(180,J.scrollHeight)}px`,Es()},Pt=()=>{const e=document.querySelector("#studio-undo"),i=document.querySelector("#studio-redo");e&&(e.disabled=pt.length===0),i&&(i.disabled=ce.length===0)};let te=null;const S=e=>{if(e&&te!==e)return;if(!le){te=null;return}const i=le,d=To;le=null,te=null,!(Co(i,n)&&d===q)&&(pt.push(i),Ut.push(d),pt.length>Ao&&(pt.shift(),Ut.shift()),ce=[],Ke=[],Pt())},A=e=>{e&&te===e&&le||(S(),le=Je(n),To=q,te=e??null)},Ei=e=>{S();const i=Je(n),d=q;return e()?((!Co(i,n)||d!==q)&&(pt.push(i),Ut.push(d),pt.length>Ao&&(pt.shift(),Ut.shift()),ce=[],Ke=[]),Pt(),!0):!1},Li=e=>{const i=Number(e.min),d=Number(e.max),a=Number(e.value),l=d>i?(a-i)/(d-i)*100:0;e.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,l))}%`)};let Mi=n.cardHeight/Math.max(1,n.cardWidth);const ki=()=>new Map(Qt().map(e=>[e.id,{width:e.width,x:e.x,y:e.y}]));let Tn={cardWidth:n.cardWidth,images:ki()};const Te=()=>{Mi=n.cardHeight/Math.max(1,n.cardWidth),Tn={cardWidth:n.cardWidth,images:ki()}};let ut=[];const qn=e=>fi(e,zt(e)),qe=()=>{n.cardWidth=ct(n.cardWidth),n.cardHeight=ct(n.cardHeight);for(const e of Qt())e.width=ft(e.width)},Nt=(e,i,d)=>{e.value=String(d),document.activeElement!==i&&(i.value=String(d))},Ii=()=>{const e=P("title"),i=P("body"),d=pi(n.cardWidth),a=String(Math.max(d,e.size)),l=String(Math.max(d,i.size));for(const h of[z,D])h.min="5",h.max=a;for(const h of[$t,gt])h.min="5",h.max=l;Nt(u,c,n.cardWidth),Nt(m,p,n.cardWidth),Nt(f,w,n.cardHeight),Nt(z,D,e.size),Nt($t,gt,i.size),Nt(vn,xn,Ht().width)},Cn=()=>{U.value=String(n.radius),U.setAttribute("aria-valuenow",String(n.radius)),at.value=String(n.radius),t.style.setProperty("--studio-card-radius",`${n.radius}px`)},Ai=(e,i=!1)=>{for(const d of t.querySelectorAll("[data-theme-slug]")){const a=d.dataset.themeSlug===e;d.setAttribute("aria-checked",a?"true":"false"),d.tabIndex=a?0:-1,a&&i&&d.focus()}},Ms=(e,i)=>{const d=Dt().filter(l=>l.kind==="image");for(const l of d.length>0?d:[Z(n,"image")])l.src=e;const a=Z(n,"image");Zs(a.src)||(n.themeSlug=a.src),Ai(e,i),T()},Wn=e=>{var l,h;n.panel=e;const i=e==="design";(l=t.querySelector("#studio-panel-design"))==null||l.toggleAttribute("hidden",!i),(h=t.querySelector("#studio-panel-code"))==null||h.toggleAttribute("hidden",i);const d=t.querySelector("#studio-tab-design"),a=t.querySelector("#studio-tab-code");d==null||d.setAttribute("aria-selected",i?"true":"false"),a==null||a.setAttribute("aria-selected",i?"false":"true"),d&&(d.tabIndex=i?0:-1),a&&(a.tabIndex=i?-1:0),T()},zn=()=>{const e=P("title"),i=P("body");for(const d of r){const a=d.dataset.presetId===n.presetId;d.setAttribute("aria-checked",a?"true":"false"),d.tabIndex=a?0:-1}document.activeElement!==v&&(v.value=e.text),document.activeElement!==$&&($.value=i.text),document.activeElement!==M&&(y.value=e.color,M.value=e.color),document.activeElement!==F&&(O.value=i.color,F.value=i.color),document.activeElement!==xe&&(_n.value=n.color,xe.value=n.color),St.value=e.fontId,Et.value=i.fontId,be.value=String(e.weight),ve.value=String(i.weight);for(const d of t.querySelectorAll("[data-text-kind]")){const a=d.dataset.textKind==="title"?e:i,l=d.dataset.textStyle,h=l?vs(a,l):a.align===d.dataset.textAlign;d.setAttribute("aria-pressed",h?"true":"false")}document.activeElement!==J&&(J.value=n.code),Ai(Ht().src)},T=async()=>{const e=++Ie;qe(),zn(),Ii(),t.querySelectorAll('input[type="range"]').forEach(Li);const i=Ct(n.presetId),d=n.cardWidth===i.width&&n.cardHeight===i.height,a=d&&i.safe?` · 안전 영역 ${i.safe.width} × ${i.safe.height}`:"";_i.textContent=`${n.cardWidth} × ${n.cardHeight} · ${i.name}${a}`,Le.textContent=en(n,zt,wt()),Ls(),Cn(),Mt(),d&&i.safe?(Jt.hidden=!1,Jt.style.width=`${i.safe.width}px`,Jt.style.height=`${i.safe.height}px`):Jt.hidden=!0;const l=g=>{var C;const x=(C=me(g.fontId,wt()).split(",")[0])==null?void 0:C.replaceAll('"',"").trim();return x?document.fonts.load(`${g.italic?"italic ":""}${g.weight} ${g.size}px "${x}"`):Promise.resolve()};try{await Promise.all(n.layers.filter(Ue).map(l))}catch{}if(e!==Ie)return;if(n.code.trim()){E.hidden=!0,_e.hidden=!1;const g=await kn();if(e!==Ie)return;_e.srcdoc=ar(g),Ae();return}_e.hidden=!0,E.hidden=!1;const h=new Set(Qt().map(g=>ke(g.src)).filter(Boolean));await Promise.all([...h].map(g=>si(g).catch(()=>null))),e===Ie&&(qe(),Le.textContent=en(n,zt,wt()),H())},Ti=(e,i,d,a)=>{var l;for(const h of((l=e.parentElement)==null?void 0:l.querySelectorAll("[data-step]"))??[])h.addEventListener("click",g=>{a==null||a();const x=Number(h.dataset.step)*(g.shiftKey?ai:ri);A(h),i(Math.min(Number(e.max),Math.max(Number(e.min),d()+x))),qe(),S(h),T()})},Ot=(e,i,d,a,l)=>{Ti(e,d,a,l),e.addEventListener("pointerdown",()=>A(e)),e.addEventListener("keydown",()=>A(e)),e.addEventListener("pointerup",()=>S(e)),e.addEventListener("pointercancel",()=>S(e)),e.addEventListener("keyup",()=>S(e)),e.addEventListener("input",()=>{d(Number(e.value)),T()});const h=()=>{qe(),i.value=String(a()),S(i)};i.addEventListener("focus",()=>A(i)),i.addEventListener("input",()=>{i.value.trim()!==""&&(d(Number(i.value)),T())}),i.addEventListener("change",h),i.addEventListener("blur",h)},qi=e=>{var d;const i=Ct(e.dataset.presetId??"");if(Ei(()=>s.onLoadPreset(i.id))){(d=document.querySelector(`[data-preset-id="${i.id}"]`))==null||d.focus();return}A(e),n.presetId=i.id,n.cardWidth=i.width,n.cardHeight=i.height,S(e),T()};for(const e of r)e.addEventListener("click",()=>qi(e)),e.addEventListener("keydown",i=>{const d=i.key==="ArrowRight"||i.key==="ArrowDown"?1:i.key==="ArrowLeft"||i.key==="ArrowUp"?-1:0;if(!d)return;i.preventDefault();const a=r[(r.indexOf(e)+d+r.length)%r.length];a&&(qi(a),a.isConnected&&a.focus())});u.addEventListener("pointerdown",Te),u.addEventListener("keydown",Te),c.addEventListener("focus",Te),Ot(u,c,e=>{const i=An(n.cardWidth,n.cardHeight)*q,d=Ks(Math.max(1,n.cardWidth),Math.max(1,Math.round(n.cardWidth*Mi)),e);n.cardWidth=d.cardWidth,n.cardHeight=d.cardHeight;const a=n.cardWidth/Math.max(1,Tn.cardWidth);for(const h of Qt()){const g=Tn.images.get(h.id);if(!g)continue;h.width=ft(g.width*a);const x=h.width/Math.max(1,g.width);h.x=Math.round(g.x*x),h.y=Math.round(g.y*x)}const l=An(n.cardWidth,n.cardHeight);l>0&&Number.isFinite(i)&&i>0&&(q=i/l)},()=>n.cardWidth,Te),Ot(m,p,e=>{n.cardWidth=ct(e);for(const i of n.layers)Ue(i)&&(i.size=Gt(i.size,n.cardWidth))},()=>n.cardWidth),Ot(f,w,e=>{n.cardHeight=e},()=>n.cardHeight),Ot(z,D,e=>{P("title").size=Gt(e,n.cardWidth)},()=>P("title").size),Ot($t,gt,e=>{P("body").size=Gt(e,n.cardWidth)},()=>P("body").size),Ot(vn,xn,e=>{Ht().width=e},()=>Ht().width);const Ce=(e,i)=>{e.addEventListener("focus",()=>A(e)),e.addEventListener("change",()=>{i(),S(e),T()}),e.addEventListener("blur",()=>S(e))};Ce(St,()=>{P("title").fontId=St.value}),Ce(Et,()=>{P("body").fontId=Et.value}),Ce(be,()=>{P("title").weight=Number(be.value)}),Ce(ve,()=>{P("body").weight=Number(ve.value)});for(const e of t.querySelectorAll("[data-text-kind]"))e.addEventListener("click",()=>{const i=P(e.dataset.textKind==="body"?"body":"title"),d=e.dataset.textStyle,a=hi.find(l=>l===e.dataset.textAlign);A(e),d==="bold"?i.weight=es(i)?ts:Gs:d?i[d]=!i[d]:a&&(i.align=a),S(e),T()});const ks=async()=>{var h;const e=document.createElement("canvas");n.code.trim()?await Po(e,ni(await kn()),n.cardWidth,n.cardHeight):Do(e,n,Lt);const i=1080,d=Math.max(n.cardWidth,n.cardHeight);if(d<=i)return e.toDataURL("image/png");const a=i/d,l=document.createElement("canvas");return l.width=Math.max(1,Math.round(n.cardWidth*a)),l.height=Math.max(1,Math.round(n.cardHeight*a)),(h=l.getContext("2d"))==null||h.drawImage(e,0,0,l.width,l.height),l.toDataURL("image/png")};(ho=t.querySelector("#studio-set-baseline"))==null||ho.addEventListener("click",()=>{(async()=>await nn("현재 레이아웃을 초기화 기준으로 세팅하고 진행하시겠습니까?")&&(s.onSetBaseline(),jt("초기화로 세팅하였습니다.")))()}),(po=t.querySelector("#studio-save-library"))==null||po.addEventListener("click",()=>{(async()=>{if(!await nn("현재 카드를 그래픽 라이브러리에 추가하고 진행하시겠습니까?"))return;const i=await s.onAddToLibrary(await ks());jt(i?"그래픽 라이브러리에 추가하였습니다.":"그래픽 라이브러리에 추가하지 못했습니다.")})()}),(fo=t.querySelector("#studio-reset"))==null||fo.addEventListener("click",()=>{Ei(()=>(s.onReset(),!0))}),v.addEventListener("focus",()=>A(v)),v.addEventListener("input",()=>{P("title").text=v.value,T()}),v.addEventListener("blur",()=>S(v)),$.addEventListener("focus",()=>A($)),$.addEventListener("input",()=>{P("body").text=$.value,T()}),$.addEventListener("blur",()=>S($));const Dn=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>A(e)),e.addEventListener("change",()=>S(e)),e.addEventListener("input",()=>{const l=rt(e.value);l&&(d(l),i.value=l,T())}),i.addEventListener("focus",()=>A(i)),i.addEventListener("input",()=>{const l=rt(i.value);l&&(d(l),e.value=l,T())}),i.addEventListener("blur",()=>{rt(i.value)||(i.value=a()),S(i)})};Dn(_n,xe,e=>{n.color=e},()=>n.color),Dn(y,M,e=>{P("title").color=e},()=>P("title").color),Dn(O,F,e=>{P("body").color=e},()=>P("body").color);const Ci=e=>{n.radius=dn(Number(e)),Cn(),T()};Ti(U,e=>{n.radius=dn(e),Cn()},()=>n.radius),U.addEventListener("pointerdown",()=>A(U)),U.addEventListener("keydown",()=>A(U)),U.addEventListener("pointerup",()=>S(U)),U.addEventListener("pointercancel",()=>S(U)),U.addEventListener("keyup",()=>S(U)),U.addEventListener("input",()=>Ci(U.value)),at.addEventListener("focus",()=>A(at)),at.addEventListener("input",()=>Ci(at.value)),at.addEventListener("blur",()=>S(at)),at.addEventListener("change",()=>S(at)),J.addEventListener("focus",()=>A(J)),J.addEventListener("input",()=>{n.code=J.value,T()}),J.addEventListener("blur",()=>S(J));const Wi=(e,i)=>{Object.assign(n,e),q=i,Pt(),T()};Ee.addEventListener("click",()=>{Bt(!1),S();const e=pt.pop(),i=Ut.pop();if(!e||i===void 0){Pt();return}ce.push(Je(n)),Ke.push(q),Wi(e,i)}),$n.addEventListener("click",()=>{Bt(!1),S();const e=ce.pop(),i=Ke.pop();if(!e||i===void 0){Pt();return}pt.push(Je(n)),Ut.push(q),Wi(e,i)}),Pt(),(mo=t.querySelector("#studio-tab-design"))==null||mo.addEventListener("click",()=>Wn("design")),(go=t.querySelector("#studio-tab-code"))==null||go.addEventListener("click",()=>Wn("code")),(yo=t.querySelector(".studio__tabs"))==null||yo.addEventListener("keydown",e=>{var d;if(!(e instanceof KeyboardEvent)||e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();const i=n.panel==="design"?"code":"design";Wn(i),(d=t.querySelector(i==="design"?"#studio-tab-design":"#studio-tab-code"))==null||d.focus()});const Y=t.querySelector(".studio__themes"),yt=t.querySelector("#studio-theme-file"),Is=()=>[...t.querySelectorAll("[data-theme-slug]")],zi=()=>{Y&&(Y.innerHTML=xs(o,Ht().src))},Di=(e,i)=>{const d=e.dataset.themeSlug;d&&(A(e),Ms(d,i),S(e))},As=async e=>{const i=cs().find(d=>d.id===e);if(!(!i||!await nn(`"${i.name}" 이미지를 테마에서 지울까요? 이 이미지를 쓰던 레이어는 테마 이미지로 바뀝니다.`))){if(!await _r(e)){jt("이미지를 지우지 못했습니다.");return}zi(),T()}};Y==null||Y.addEventListener("click",e=>{const i=e.target instanceof Element?e.target:null,d=i==null?void 0:i.closest("[data-upload-remove]");if(d){As(d.dataset.uploadRemove??"");return}if(i!=null&&i.closest("#studio-theme-add")){yt==null||yt.click();return}const a=i==null?void 0:i.closest("[data-theme-slug]");a&&Di(a,!1)}),Y==null||Y.addEventListener("keydown",e=>{const i=e.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(i)||!(e.target instanceof Element&&e.target.matches("[data-theme-slug]")))return;e.preventDefault();const d=Is(),a=d.findIndex(g=>g===e.target),h=d[(a+(i==="ArrowLeft"||i==="ArrowUp"?-1:1)+d.length)%d.length];h&&Di(h,!0)}),yt==null||yt.addEventListener("change",()=>{const e=[...yt.files??[]].filter(i=>i.type.startsWith("image/"));yt.value="",e.length!==0&&(async()=>{var d;const i=(await Promise.all(e.map(a=>xr(a)))).filter(a=>a!==null);i.length<e.length&&jt("이미지를 저장하지 못했습니다."),i.length!==0&&(zi(),(d=t.querySelector("#studio-theme-add"))==null||d.focus())})()}),Y==null||Y.addEventListener("dragstart",e=>{const i=e.target instanceof Element?e.target.closest("[data-theme-slug]"):null,d=i==null?void 0:i.dataset.themeSlug;if(!i||!d||!e.dataTransfer)return;e.dataTransfer.setData(Xn,d),e.dataTransfer.effectAllowed="copy";const a=i.querySelector("img");a&&e.dataTransfer.setDragImage(a,a.width/2,a.height/2)}),(bo=t.querySelector("#studio-copy"))==null||bo.addEventListener("click",async()=>{const e=en(n,zt,wt());Le.textContent=e;try{await navigator.clipboard.writeText(e)}catch{const d=document.createElement("textarea");d.value=e,document.body.append(d),d.select(),document.execCommand("copy"),d.remove()}const i=t.querySelector("#studio-copy");i&&(i.textContent="복사됨",window.setTimeout(()=>{i.textContent="현재 디자인을 코드로 복사"},1200))}),(vo=t.querySelector("#studio-download"))==null||vo.addEventListener("click",()=>{(async()=>{const e=`ax-studio-${n.cardWidth}x${n.cardHeight}-${n.themeSlug||"theme"}.png`;if(!n.code.trim()){Ho(E,e);return}const i=document.createElement("canvas");await Po(i,ni(await kn()),n.cardWidth,n.cardHeight),Ho(i,e)})()});const Q=e=>{const i=E.getBoundingClientRect();return{x:i.width>0?(e.clientX-i.left)/i.width*n.cardWidth:0,y:i.height>0?(e.clientY-i.top)/i.height*n.cardHeight:0}},Hn=(e,i)=>{for(let a=ut.length-1;a>=0;a-=1){const l=ut[a];if(l&&e>=l.x-8&&i>=l.y-8&&e<=l.x+l.w+8&&i<=l.y+l.h+8)return l}return null},Ts=e=>{const i=E.getContext("2d");if(!i)return;const d=E.getBoundingClientRect().width,a=d>0?n.cardWidth/d:1;i.save(),i.lineJoin="round",i.lineCap="round",i.strokeStyle="rgba(0, 0, 0, 0.7)",i.lineWidth=a*3,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.strokeStyle="rgba(255, 255, 255, 0.92)",i.lineWidth=a*1.5,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.restore()},qs=()=>{if(R)for(const e of ut)R.start.has(e.id)&&Ts(e)},Cs=()=>{const e=E.getContext("2d"),i=L?ot(L.id):void 0,d=(i==null?void 0:i.kind)==="image"?Lt(i):null;if(!L||!d||!e)return;const{full:a,box:l}=L;e.save(),e.globalAlpha=.35,e.drawImage(d,a.x,a.y,a.w,a.h),e.globalAlpha=1,e.beginPath(),e.rect(l.x,l.y,l.w,l.h),e.clip(),e.drawImage(d,a.x,a.y,a.w,a.h),e.restore()};let R=null,tt=null,kt=null;const ht=new Map;let X=null,G=null,Pn=null,Hi="";const We=e=>({x:e.x,y:e.y,width:e.width}),ee=(e,i,d)=>e.kind==="image"?{x:Be(i,n.cardWidth,e.width),y:Be(d,n.cardHeight,qn(e))}:{x:cn(i,n.cardWidth,e.size),y:cn(d,n.cardHeight,e.size)},Pi=e=>{const i=new Map;for(const d of e){const a=ot(d);a&&i.set(d,{x:a.x,y:a.y})}return i},Nn=(e,i,d)=>{const a=(h,g)=>Math.abs(g)<Math.abs(h)?g:h,l=[];for(const[h,g]of e){const x=ot(h);x&&l.push({layer:x,from:g})}for(const{layer:h,from:g}of l){const x=ee(h,g.x+i,g.y+d);i=a(i,x.x-g.x),d=a(d,x.y-g.y)}for(const{layer:h,from:g}of l){const x=ee(h,g.x+i,g.y+d);h.x=x.x,h.y=x.y}},ze=(e,i)=>{e.width=i.width,e.x=Be(i.x,n.cardWidth,e.width),e.y=Be(i.y,n.cardHeight,qn(e))},On=e=>{for(let i=ut.length-1;i>=0;i-=1){const d=ut[i];if(!d||d.kind!=="image"||e.x<d.x||e.y<d.y||e.x>d.x+d.w||e.y>d.y+d.h)continue;const a=ot(d.id);if((a==null?void 0:a.kind)==="image")return a}return Ht()};H=()=>{for(const i of[..._])ot(i)||_.delete(i);ut=Do(E,n,Lt,(K==null?void 0:K.id)??(L==null?void 0:L.id)),Cs(),qs(),Ae();const e=[..._].join(" ");e!==Hi&&(Hi=e,zn(),Ii(),t.querySelectorAll('input[type="range"]').forEach(Li))};const bt=(e,i,d)=>{e.style.left=`${i*it}px`,e.style.top=`${d*it}px`},De=()=>{const e=K?ot(K.id):void 0;return e&&Ue(e)?e:null},Ws=()=>{const e=De();if(!e)return;const i=e.size*it,d=Math.max(16,i),a=i/d;bt(I,e.x,e.y),I.style.font=bs(e,d,wt()),I.style.textDecoration=e.underline?"underline":"none",I.style.lineHeight=`${Math.round(e.size*1.25)*it/a}px`,I.style.color=e.color,I.style.width=`${Math.max(1,n.cardWidth-ci*2)*it/a}px`,I.style.transform=`scale(${a})`,I.style.height="auto",I.style.height=`${I.scrollHeight}px`},He=new Map,zs=()=>{const e=L&&!n.code.trim()?L:null;Vt.hidden=!e;for(const d of Mn)d.hidden=!e;if(!e)return;const{box:i}=e;bt(Vt,i.x,i.y),Vt.style.width=`${i.w*it}px`,Vt.style.height=`${i.h*it}px`;for(const d of Mn){const a=d.dataset.crop??"",l=a.includes("w")?i.x:a.includes("e")?i.x+i.w:i.x+i.w/2,h=a.includes("n")?i.y:a.includes("s")?i.y+i.h:i.y+i.h/2;bt(d,l,h)}},ne=()=>{const[e]=_.size===1?[..._]:[],i=e?ot(e):void 0;return(i==null?void 0:i.kind)==="image"?i:null};Ae=()=>{const e=!K&&!L&&!n.code.trim(),i=new Set;if(e)for(const h of _){const g=ut.find(C=>C.id===h);if(!g)continue;let x=He.get(h);x||(x=document.createElement("div"),x.className="studio__select-frame",$i.prepend(x),He.set(h,x)),bt(x,g.x,g.y),x.style.width=`${g.w*it}px`,x.style.height=`${g.h*it}px`,i.add(h)}for(const[h,g]of He)i.has(h)||(g.remove(),He.delete(h));const d=ne(),a=d?ut.find(h=>h.id===d.id):void 0,l=e&&!!a;for(const h of Ln)h.hidden=!l;if(l&&a){const h=12/Math.max(it,.001),g=W=>Math.min(n.cardWidth-h,Math.max(h,W)),x=W=>Math.min(n.cardHeight-h,Math.max(h,W)),C=g(a.x+a.w/2),st=x(a.y+a.h/2);for(const W of Ln){const et=W.dataset.handle;et==="top"?bt(W,C,x(a.y)):et==="bottom"?bt(W,C,x(a.y+a.h)):et==="left"?bt(W,g(a.x),st):bt(W,g(a.x+a.w),st)}}zs(),Ws()};for(const e of Ln)e.addEventListener("pointerdown",i=>{const d=ne(),a=d?ut.find(et=>et.id===d.id):void 0;if(!d||!a)return;i.preventDefault();try{e.setPointerCapture(i.pointerId)}catch{}A(e);const l=e.dataset.handle,h=We(d),g=a.h/Math.max(1,a.w),x=l==="right"?{x:a.x,y:a.y+a.h/2}:l==="left"?{x:a.x+a.w,y:a.y+a.h/2}:l==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},C=Q(i),st=et=>{if(et.pointerId!==i.pointerId)return;const Re=Q(et),re=Re.x-C.x,It=Re.y-C.y,Un=l==="right"?a.w+re:l==="left"?a.w-re:l==="bottom"?(a.h+It)/g:(a.h-It)/g;ze(d,Fe(h,Un,x.x,x.y)),H()},W=et=>{et.pointerId===i.pointerId&&(e.removeEventListener("pointermove",st),e.removeEventListener("pointerup",W),e.removeEventListener("pointercancel",W),S(e),T())};e.addEventListener("pointermove",st),e.addEventListener("pointerup",W),e.addEventListener("pointercancel",W)});const Ds=e=>{n.code.trim()||(K={id:e.id,original:e.text},_.clear(),_.add(e.id),A(I),I.value=e.text,I.hidden=!1,H(),I.focus(),I.setSelectionRange(I.value.length,I.value.length))},Rt=e=>{if(!K)return;const i=De();!e&&i&&(i.text=K.original),K=null,I.hidden=!0,H(),S(I),T()};I.addEventListener("input",()=>{const e=De();e&&(e.text=e.kind==="title"?I.value.replace(/\n/g," "):I.value,H(),zn())}),I.addEventListener("keydown",e=>{var i;e.isComposing||(e.key==="Escape"?(e.preventDefault(),Rt(!1)):e.key==="Enter"&&(((i=De())==null?void 0:i.kind)==="title"||e.metaKey||e.ctrlKey)&&(e.preventDefault(),Rt(!0)))}),I.addEventListener("blur",()=>Rt(!0));const Hs=(e,i)=>{const d=kt&&kt.id===e&&i.timeStamp-kt.time<400&&Math.hypot(i.clientX-kt.x,i.clientY-kt.y)<24,a=ot(e);if(d&&a&&Ue(a)){kt=null,Ds(a);return}kt={id:e,time:i.timeStamp,x:i.clientX,y:i.clientY}},Ni=new EventTarget,Oi=e=>{const i=e.target;i===E||i instanceof Element&&i.closest(".studio__handle--crop")||Bt(!0)},Ps=e=>{!Lt(e)||n.code.trim()||(S(),_.clear(),_.add(e.id),L={id:e.id,full:is(e,zt(e)),box:{x:e.x,y:e.y,w:e.width,h:qn(e)}},A(Ni),document.addEventListener("pointerdown",Oi,!0),H())};function Bt(e){if(!L)return;const{id:i,full:d,box:a}=L;L=null,document.removeEventListener("pointerdown",Oi,!0);const l=ot(i);if(e&&(l==null?void 0:l.kind)==="image"){l.crop=Js(d,a),l.width=ft(a.w);const h=ee(l,a.x,a.y);l.x=h.x,l.y=h.y}S(Ni),T()}const Ri=(e,i,d)=>{if(!L)return;e.preventDefault();try{i.setPointerCapture(e.pointerId)}catch{}const a=Q(e),l={...L.box},h=x=>{if(x.pointerId!==e.pointerId||!L)return;const C=Q(x),st=C.x-a.x,W=C.y-a.y;L.box=d?Qs(L.full,l,d,st,W):tr(L.full,l,st,W),H()},g=x=>{x.pointerId===e.pointerId&&(i.removeEventListener("pointermove",h),i.removeEventListener("pointerup",g),i.removeEventListener("pointercancel",g))};i.addEventListener("pointermove",h),i.addEventListener("pointerup",g),i.addEventListener("pointercancel",g)};for(const e of Mn)e.addEventListener("pointerdown",i=>Ri(i,e,e.dataset.crop??null));const Pe=e=>{S();const i=new EventTarget;A(i),e(),S(i),T()},Bi=()=>{const e=Dt();e.length>0&&(ue=structuredClone(e))},Fi=e=>{ue.length!==0&&Pe(()=>{const i=structuredClone(ue),d=e?e.x-Math.min(...i.map(l=>l.x)):qo,a=e?e.y-Math.min(...i.map(l=>l.y)):qo;_.clear();for(const l of i){l.id=ln();const h=ee(l,l.x+d,l.y+a);l.x=h.x,l.y=h.y,_.add(l.id)}n.layers.push(...i)})},Ns=e=>{const i=Dt();i.length!==0&&Pe(()=>{const d=n.layers.filter(a=>!_.has(a.id));n.layers=e?[...d,...i]:[...i,...d]})},Rn=e=>["title","body","image"].every(i=>!e.some(d=>d.kind===i)||n.layers.some(d=>d.kind===i&&!_.has(d.id))),Ui=()=>{const e=Dt();e.length===0||!Rn(e)||Pe(()=>{n.layers=n.layers.filter(i=>!_.has(i.id)),_.clear()})};Ze==null||Ze.remove();const ji=e=>de?`⌘${e}`:`Ctrl+${e}`,Os=[{action:"copy",label:"복사",hint:ji("C")},{action:"paste",label:"붙여넣기",hint:ji("V")},{action:"front",label:"맨 위로 보내기"},{action:"back",label:"맨 밑으로 보내기"},{action:"crop",label:"크롭하기"},{action:"delete",label:"삭제",hint:de?"⌫":"Delete"}],N=document.createElement("div");N.className="nav-popover studio-menu",N.setAttribute("role","menu"),N.setAttribute("aria-label","객체 메뉴"),N.hidden=!0,N.innerHTML=Os.map(e=>`<button type="button" class="nav-popover__item" role="menuitem" data-layer-action="${e.action}">${e.label}${e.hint?`<span class="studio-menu__hint">${e.hint}</span>`:""}</button>`).join(""),document.body.append(N),Ze=N;let Ki=null;const Bn=e=>N.querySelector(`[data-layer-action="${e}"]`),Yi=()=>[...N.querySelectorAll("[data-layer-action]")].filter(e=>!e.hidden&&!e.disabled),Xi=e=>{e.target instanceof Node&&N.contains(e.target)||ie()};function ie(){N.hidden||(document.activeElement instanceof HTMLElement&&N.contains(document.activeElement)&&document.activeElement.blur(),N.hidden=!0,document.removeEventListener("pointerdown",Xi,!0))}const Gi=(e,i)=>{var re;const d=Q({clientX:e,clientY:i}),a=Hn(d.x,d.y);a?_.has(a.id)||(_.clear(),_.add(a.id)):_.clear(),Ki=d,H();const l=Dt(),h=(It,Un)=>{const _o=Bn(It);_o&&(_o.disabled=!Un)};h("copy",l.length>0),h("paste",ue.length>0),h("front",l.length>0),h("back",l.length>0);const g=Bn("crop");if(g){g.hidden=!ne();const It=ne();g.disabled=!It||!Lt(It)}const x=Bn("delete");x&&(x.disabled=l.length===0||!Rn(l),x.title=l.length>0&&x.disabled?"타이틀·본문·이미지는 하나씩 남아 있어야 합니다.":""),N.hidden=!1;const C=8,{width:st,height:W}=N.getBoundingClientRect(),et=e+st+C>window.innerWidth?e-st:e,Re=i+W+C>window.innerHeight?i-W:i;N.style.left=`${Math.max(C,et)}px`,N.style.top=`${Math.max(C,Re)}px`,document.addEventListener("pointerdown",Xi,!0),(re=Yi()[0])==null||re.focus({preventScroll:!0})};N.addEventListener("click",e=>{const i=e.target instanceof Element?e.target.closest("[data-layer-action]"):null;if(!i||i.disabled)return;const d=Ki;ie();const a=i.dataset.layerAction;if(a==="copy")Bi();else if(a==="paste")Fi(d);else if(a==="front"||a==="back")Ns(a==="front");else if(a==="delete")Ui();else if(a==="crop"){const l=ne();l&&Ps(l)}}),N.addEventListener("keydown",e=>{var l;if(e.key==="Escape"||e.key==="Tab"){e.preventDefault(),ie();return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const i=Yi(),d=i.indexOf(document.activeElement),a=e.key==="ArrowDown"?1:-1;(l=i[(d+a+i.length)%i.length])==null||l.focus()}),j.addEventListener("scroll",ie);const oe=()=>{G&&window.clearTimeout(G.timer),G=null},Rs=e=>{oe();const{clientX:i,clientY:d,pointerId:a}=e;G={timer:window.setTimeout(()=>{G=null,(R==null?void 0:R.pointerId)===a&&(Nn(R.start,0,0),R=null,delete E.dataset.dragging,S(E)),tt=null,Gi(i,d)},Gr),pointerId:a,x:i,y:d}},Zi=()=>{const[e,i]=[...ht.values()];return!e||!i?null:{distance:Math.hypot(i.x-e.x,i.y-e.y),mid:Q({clientX:(e.x+i.x)/2,clientY:(e.y+i.y)/2})}},Bs=()=>{const e=Zi();if(!e)return;oe(),R=null,tt=null,delete E.dataset.dragging,A(E);const i=On(e.mid);X={...e,layerId:i.id,image:We(i)},H()};E.addEventListener("pointerdown",e=>{var l;if(n.code.trim())return;const i=e.pointerType==="mouse";if(i&&(e.button!==0||de&&e.ctrlKey))return;if((l=window.getSelection())==null||l.removeAllRanges(),ie(),K&&Rt(!0),L){const h=Q(e),{box:g}=L;h.x>=g.x&&h.y>=g.y&&h.x<=g.x+g.w&&h.y<=g.y+g.h?Ri(e,E,null):Bt(!0);return}if(e.pointerType==="touch"){ht.set(e.pointerId,{x:e.clientX,y:e.clientY});try{E.setPointerCapture(e.pointerId)}catch{}if(ht.size===2&&In()){Bs();return}if(ht.size>1)return;Rs(e)}const d=Q(e),a=Hn(d.x,d.y);if(i?e.shiftKey?a&&_.has(a.id)?_.delete(a.id):a&&_.add(a.id):a?_.has(a.id)||(_.clear(),_.add(a.id)):_.clear():(_.clear(),a&&_.add(a.id)),!a||i&&!_.has(a.id)){tt=null,H();return}tt={x:e.clientX,y:e.clientY,moved:!1,shift:e.shiftKey};try{E.setPointerCapture(e.pointerId)}catch{}A(E),R={id:a.id,origin:d,start:Pi(i?_:[a.id]),pointerId:e.pointerId},E.dataset.dragging="true",H()}),E.addEventListener("contextmenu",e=>{e.preventDefault(),!(n.code.trim()||L)&&(oe(),K&&Rt(!0),Gi(e.clientX,e.clientY))}),E.addEventListener("pointermove",e=>{if(ht.has(e.pointerId)&&ht.set(e.pointerId,{x:e.clientX,y:e.clientY}),(G==null?void 0:G.pointerId)===e.pointerId&&Math.hypot(e.clientX-G.x,e.clientY-G.y)>8&&oe(),X){const d=ht.has(e.pointerId)?Zi():null,a=ot(X.layerId);if(!d||(a==null?void 0:a.kind)!=="image")return;const l=d.distance/Math.max(1,X.distance),h=Fe(X.image,X.image.width*l,X.mid.x,X.mid.y);ze(a,{x:h.x+d.mid.x-X.mid.x,y:h.y+d.mid.y-X.mid.y,width:h.width}),H();return}tt&&Math.hypot(e.clientX-tt.x,e.clientY-tt.y)>6&&(tt.moved=!0);const i=Q(e);if(Pn=i,!R||R.pointerId!==e.pointerId){E.dataset.hover=Hn(i.x,i.y)?"true":"false";return}Nn(R.start,i.x-R.origin.x,i.y-R.origin.y),H()}),E.addEventListener("pointerleave",()=>{Pn=null});const Ji=e=>{if(ht.delete(e.pointerId),(G==null?void 0:G.pointerId)===e.pointerId&&oe(),X){ht.size<2&&(X=null,S(E),T());return}if(!R||R.pointerId!==e.pointerId)return;const i=R.id;R=null,delete E.dataset.dragging,S(E),e.type==="pointerup"&&tt&&!tt.moved&&!tt.shift&&(_.size>1&&(_.clear(),_.add(i)),Hs(i,e)),tt=null,H()};E.addEventListener("pointerup",Ji),E.addEventListener("pointercancel",Ji);const Vi=new EventTarget;let Qi=0;E.addEventListener("wheel",e=>{if(!de||!e.ctrlKey||n.code.trim()||L||!In())return;e.preventDefault(),A(Vi);const i=Q(e),d=On(i);ze(d,Fe(We(d),d.width*Math.exp(-e.deltaY*.01),i.x,i.y)),H(),window.clearTimeout(Qi),Qi=window.setTimeout(()=>{S(Vi),T()},250)},{passive:!1}),j.addEventListener("wheel",e=>{if(!(de?e.metaKey:e.ctrlKey))return;e.preventDefault();const i=e.deltaMode===WheelEvent.DOM_DELTA_LINE?e.deltaY*33:e.deltaY;q=Math.min(Yn,Math.max(Kn,q*Math.exp(-i*.002))),Mt()},{passive:!1});const to=new EventTarget;let se=null;E.addEventListener("gesturestart",e=>{if(e.preventDefault(),X||n.code.trim()||L||!In())return;A(to);const i=Q(e),d=On(i);se={layerId:d.id,image:We(d),anchor:i}}),E.addEventListener("gesturechange",e=>{if(e.preventDefault(),!se||X)return;const{layerId:i,image:d,anchor:a}=se,l=ot(i);(l==null?void 0:l.kind)==="image"&&(ze(l,Fe(d,d.width*e.scale,a.x,a.y)),H())}),E.addEventListener("gestureend",e=>{e.preventDefault(),se&&(se=null,S(to),T())}),j.addEventListener("pointerdown",e=>{e.target===E||_.size===0||e.target instanceof Element&&e.target.closest(".studio__handle")||(_.clear(),H())});const Fs=async(e,i)=>{const d=ke(e),a=d?await si(d).catch(()=>null):null,l=a&&a.naturalWidth>0?a.naturalHeight/a.naturalWidth:1;K&&Rt(!0),L&&Bt(!0),Pe(()=>{const h=ft(n.cardWidth/2),g={id:ln(),kind:"image",src:e,x:0,y:0,width:h,crop:null};Object.assign(g,ee(g,i.x-h/2,i.y-h*l/2)),n.layers.push(g),_.clear(),_.add(g.id)})},eo=e=>{var i;return!n.code.trim()&&!!((i=e.dataTransfer)!=null&&i.types.includes(Xn))};j.addEventListener("dragover",e=>{eo(e)&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),j.dataset.dropping="true")}),j.addEventListener("dragleave",e=>{e.relatedTarget instanceof Node&&j.contains(e.relatedTarget)||delete j.dataset.dropping}),j.addEventListener("drop",e=>{var d;if(delete j.dataset.dropping,!eo(e))return;const i=(d=e.dataTransfer)==null?void 0:d.getData(Xn);i&&(e.preventDefault(),Fs(i,Q(e)))}),Y==null||Y.addEventListener("dragend",()=>delete j.dataset.dropping);const Ne=e=>{const i=Me.getBoundingClientRect().width,d=Xt+Qn+ti,a=Number.isFinite(e)?e:n.controlsWidth;n.controlsWidth=i>=d?Ys(a,i):Math.max(Xt,Math.round(a)),Me.style.setProperty("--studio-controls-width",`${n.controlsWidth}px`),V.setAttribute("aria-valuenow",String(n.controlsWidth)),V.setAttribute("aria-valuemax",String(i>=d?Math.max(Xt,Math.round(i)-Qn-ti):n.controlsWidth)),Mt()};Ne(n.controlsWidth);const vt=t.querySelector("#studio-device"),no=[...t.querySelectorAll(".studio-devices__btn")],io=t.querySelector("#studio-device-thumb"),oo=vt==null?void 0:vt.parentElement,Fn=vt&&io&&oo?No(vt,io,oo):null,Oe=()=>{if(!vt)return;const e=ys();vt.dataset.device=e,vt.dataset.framed=e===xi()?"false":"true";for(const i of no)i.setAttribute("aria-pressed",i.dataset.device===e?"true":"false");Ne(n.controlsWidth),Fn==null||Fn()};Oe();for(const e of no)e.addEventListener("click",()=>{on=e.dataset.device,Oe()});Ye==null||Ye();const so=[window.matchMedia(ms),window.matchMedia(gs)];for(const e of so)e.addEventListener("change",Oe);Ye=()=>{for(const e of so)e.removeEventListener("change",Oe)},Xe==null||Xe();const ro=e=>{if(!(e.metaKey||e.ctrlKey)||e.altKey)return;const i=e.code==="KeyZ"&&e.shiftKey||e.code==="KeyY"&&e.ctrlKey&&!e.shiftKey;if(!(e.code==="KeyZ"&&!e.shiftKey)&&!i)return;const a=i?$n:Ee;if(!a.isConnected||a.disabled)return;const l=e.target;l instanceof HTMLElement&&(l.isContentEditable||l.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"))||(e.preventDefault(),a.click())};document.addEventListener("keydown",ro),Xe=()=>document.removeEventListener("keydown",ro),Ge==null||Ge();const ao=new EventTarget;let co=0;const Us={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}},lo=e=>{var C;if(!E.isConnected)return;const i=(e.metaKey||e.ctrlKey)&&!e.altKey,d=i?e.code==="Equal"||e.code==="NumpadAdd"?Se:e.code==="Minus"||e.code==="NumpadSubtract"?$e:null:null;if(d){e.preventDefault(),d.click();return}const a=e.target,l=a===document.body||a instanceof Node&&j.contains(a);if(K||n.code.trim())return;const h=a instanceof HTMLElement&&(a.isContentEditable||a.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button], [type=file])"));if(!i&&!L&&!h&&(e.key==="Delete"||e.key==="Backspace")&&_.size>0){e.preventDefault(),Rn(Dt())?Ui():jt("타이틀·본문·이미지는 하나씩 남아 있어야 합니다.");return}if(i&&!L){if(h||(C=window.getSelection())!=null&&C.toString())return;e.code==="KeyC"&&_.size>0?(e.preventDefault(),Bi()):e.code==="KeyV"&&ue.length>0&&(e.preventDefault(),Fi(Pn));return}if(!l)return;if(L){if(e.key!=="Enter"&&e.key!=="Escape")return;e.preventDefault(),Bt(e.key==="Enter");return}if(i)return;const g=Us[e.key];if(!g||e.altKey||_.size===0)return;e.preventDefault();const x=e.shiftKey?Yr:Kr;A(ao),Nn(Pi(_),g.x*x,g.y*x),Ee.disabled=!1,H(),window.clearTimeout(co),co=window.setTimeout(()=>{S(ao),T()},400)};document.addEventListener("keydown",lo),Ge=()=>document.removeEventListener("keydown",lo),V.addEventListener("pointerdown",e=>{if(Me.getBoundingClientRect().width<768)return;try{V.setPointerCapture(e.pointerId)}catch{}const i=e.clientX,d=n.controlsWidth,a=h=>{h.pointerId===e.pointerId&&Ne(d+h.clientX-i)},l=h=>{h.pointerId===e.pointerId&&(V.removeEventListener("pointermove",a),V.removeEventListener("pointerup",l),V.removeEventListener("pointercancel",l))};V.addEventListener("pointermove",a),V.addEventListener("pointerup",l),V.addEventListener("pointercancel",l)}),V.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const i=e.shiftKey?48:16;Ne(n.controlsWidth+(e.key==="ArrowRight"?i:-i))}),(xo=t.querySelector("#studio-controls"))==null||xo.addEventListener("submit",e=>{e.preventDefault()}),he==null||he.disconnect(),he=new ResizeObserver(()=>Mt()),he.observe(j),T()}const _s="ax-design-studio-mode",Fo="./data/index.json";let nt={status:"loading"},gn=pn(),ws="all",k=null,Ve=null,sn=null,B=oi();function di(){const t=localStorage.getItem(_s);return t==="light"||t==="dark"?t:"dark"}function Uo(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(_s,t)}function Gn(t,n,o){return`<a class="nav-link${o?" nav-link--current":""}" href="${n}" ${o?'aria-current="page"':""}>${t}</a>`}function aa(){return`
    <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.8-1.4-2-3.4-2.2.7a8 8 0 0 0-1.9-1.1L14.6 3h-5.2l-.55 2.7a8 8 0 0 0-1.9 1.1l-2.2-.7-2 3.4 1.8 1.4a7.7 7.7 0 0 0 .05 2.2l-1.8 1.4 2 3.4 2.2-.7a8 8 0 0 0 1.9 1.1l.55 2.7h5.2l.55-2.7a8 8 0 0 0 1.9-1.1l2.2.7 2-3.4-1.8-1.4Z" />
    </svg>
  `}function da(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function yn(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),n=gi(t);return n?ge(n.r,n.g,n.b):rt(t)??ge(216,241,255)}function pe(t,n){return n.some(o=>o.slug===t)?t:null}function ca(t,n,o){var r,u,c;const s=t?pe(t,o):null;if(n&&n!==sn){const m=as().find(f=>f.id===n),p=m?mi(structuredClone(m.state)):null;if(p)return k=p,pe(k.themeSlug,o)||(k.themeSlug=((r=o[0])==null?void 0:r.slug)??""),sn=n,Ve=t,k}if(n||(sn=null),!k){const m=ii(rn);return k=m?structuredClone(m):bn(s??pe(Xo,o)??((u=o[0])==null?void 0:u.slug)??"",yn()),m&&s&&So(k,s),m&&!pe(k.themeSlug,o)&&(k.themeSlug=s??((c=o[0])==null?void 0:c.slug)??""),Ve=t,k}return t&&t!==Ve&&s&&(So(k,s),Ve=t),k}function la(t){const n=di(),o=n==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=B.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${Gn("Graphic Library",mt({name:"archive"}),B.name==="archive"||B.name==="capture")}
        ${Gn("Online Marketing Studio",mt({name:"studio",theme:null,card:null}),B.name==="studio")}
        ${Gn("History",mt({name:"history"}),B.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${o}" title="${o}">
          ${da(n)}
        </button>
        <div class="nav-settings">
          <button type="button" class="button button--secondary" id="nav-settings" aria-label="설정" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-settings-menu">
            ${aa()}
          </button>
          <div class="nav-popover" id="nav-settings-menu" role="menu" hidden>
            <button type="button" class="nav-popover__item" id="nav-reset" role="menuitem">리셋</button>
          </div>
        </div>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${t}</main>
  `}function ua(){if(nt.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(nt.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${nt.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
        <p class="state-panel__text"><button type="button" class="button" id="index-retry">다시 불러오기</button></p>
      </section>
    `;const t=nt.index;switch(B.name){case"archive":return Ir(t,gn,ws,as());case"capture":return Br(t,B.slug,gn);case"studio":return sa(ca(B.theme,B.card,t.captures),t.captures);case"history":return Ur(t);case"notfound":return jr(B.path)}}function dt(){var n,o;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Uo(di()),gn=pn(),t.innerHTML=la(ua()),(n=t.querySelector("#index-retry"))==null||n.addEventListener("click",()=>{$s()}),(o=t.querySelector("#mode-toggle"))==null||o.addEventListener("click",()=>{Uo(di()==="dark"?"light":"dark"),dt()}),ha(t),nt.status==="ready"&&(B.name==="archive"&&Ar(t,{onTabChange:s=>{var r;ws=s,dt(),(r=document.querySelector(`[data-archive-tab="${s}"]`))==null||r.focus()}}),B.name==="capture"&&Fr(t,s=>{gn=cr(s),dt()}),B.name==="studio"&&nt.status==="ready"&&k&&ra(t,k,nt.index.captures,{onReset:()=>{var s;k&&(Eo(k,ii(k.presetId),yn()),dt(),(s=document.querySelector("#studio-reset"))==null||s.focus())},onSetBaseline:()=>{k&&lr(structuredClone(k))},onLoadPreset:s=>{const r=ii(s);return!k||!r?!1:(Eo(k,r,yn()),dt(),!0)},onAddToLibrary:s=>k?mr(k,s).then(r=>r!==null):Promise.resolve(!1)}))}function ha(t){var m;const n=t.querySelector("#nav-settings"),o=t.querySelector("#nav-settings-menu"),s=t.querySelector(".nav-settings");if(!n||!o||!s)return;const r=()=>{o.hidden=!0,n.setAttribute("aria-expanded","false"),document.removeEventListener("click",u),document.removeEventListener("keydown",c)},u=p=>{p.target instanceof Node&&s.contains(p.target)||r()},c=p=>{p.key==="Escape"&&r()};n.addEventListener("click",p=>{if(p.stopPropagation(),!o.hidden){r();return}o.hidden=!1,n.setAttribute("aria-expanded","true"),document.addEventListener("click",u),document.addEventListener("keydown",c)}),(m=t.querySelector("#nav-reset"))==null||m.addEventListener("click",()=>{r(),(async()=>{if(await nn("세팅한 초기화 기준을 지우고 진행하시겠습니까?")){if(ur(),sn=null,k){const f=nt.status==="ready"?nt.index.captures:[],w=pe(Xo,f)??k.themeSlug;k=bn(w,yn())}B.name==="studio"&&B.card&&(B={name:"studio",theme:null,card:null},history.replaceState(null,"",mt(B))),dt(),jt("리셋하였습니다.")}})()})}async function pa(){const t=await fetch(`${Fo}?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)throw new Error(`${Fo} → HTTP ${t.status}`);const n=await t.text();if(n.trimStart().startsWith("<"))throw new Error("index.json 대신 HTML이 왔습니다. 데이터 빌드가 끝나는 중일 수 있습니다.");const o=JSON.parse(n);if(!o||!Array.isArray(o.captures)||!o.facets)throw new Error("Index JSON is missing captures or facets");return o}async function $s(){nt={status:"loading"},dt();let t;for(let n=0;n<20;n+=1)try{const o=await pa();await Promise.all([fr(),vr()]),nt={status:"ready",index:o},dt();return}catch(o){t=o,await new Promise(s=>window.setTimeout(s,400))}nt={status:"error",message:t instanceof Error?t.message:String(t)},dt()}wr(t=>{if(fs(window.location.hash)){window.location.replace(mt({name:"studio",theme:null,card:null}));return}B=t,dt()});$s();
