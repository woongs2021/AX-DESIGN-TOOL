(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const u of r)if(u.type==="childList")for(const c of u.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const u={};return r.integrity&&(u.integrity=r.integrity),r.referrerPolicy&&(u.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?u.credentials="include":r.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(r){if(r.ep)return;r.ep=!0;const u=o(r);fetch(r.href,u)}})();const jn="ig-feed-square",Kn=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function qt(t){return Kn.find(n=>n.id===t)??Kn[0]}const fe=0,Ze=120,Ds=28,xt=100,At=4e3,Yn=5,ni=10,Ct=100,Xn=4e3,Yt=240,zo=360,Gn=280,Zn=6,Do="Hello",Ho=`헤르메스의 대표 브랜드 에셋입니다.
에이전트의 그래픽 결과물을 합성하였습니다.`,Po="black-mountain-red-horizon",ii=100,oi=32,Oo=71,Ro=99,No=77,Bo=209,nn=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],si=["left","center","right"],fo="rgb(0, 0, 0)",po="rgb(255, 255, 255)";function ri(t){return Number.isFinite(t)?Math.min(Ze,Math.max(fe,Math.round(t))):fe}function dt(t){return Number.isFinite(t)?Math.min(At,Math.max(xt,Math.round(t))):xt}function Hs(t,n,o){const s=Math.max(1,Math.round(t)),u=Math.max(1,Math.round(n))/s;let c=dt(o);const m=Math.round(c*u);let h=dt(m);return m!==h&&(c=dt(Math.round(h/u)),h=dt(Math.round(c*u))),{cardWidth:c,cardHeight:h}}function ai(t){return Math.max(Yn,dt(t)-ni*2)}function Xt(t,n){const o=ai(n);return Number.isFinite(t)?Math.min(o,Math.max(Yn,Math.round(t))):Yn}function ft(t){return Number.isFinite(t)?Math.min(Xn,Math.max(Ct,Math.round(t))):Ct}function _t(t){return Math.round(t*2)/2}function on(t,n,o){const s=Math.max(0,Math.round(n)-Math.min(Math.max(o,0),Math.round(n)));return Number.isFinite(t)?Math.min(s,Math.max(0,_t(t))):0}function Oe(t,n,o){const s=Math.round(-o+40),r=Math.round(n-40);return Number.isFinite(t)?s>r?Math.round((n-o)/2):Math.min(r,Math.max(s,_t(t))):0}function Re(t,n,o,s){const r=ft(n),u=r/Math.max(1,t.width);return{x:Math.round(o-(o-t.x)*u),y:Math.round(s-(s-t.y)*u),width:r}}function Ps(t,n){const o=Math.max(Yt,Math.round(n)-Gn-Zn);return Number.isFinite(t)?Math.min(o,Math.max(Yt,Math.round(t))):zo}function Os(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function pe(t,n=[]){var s;const o=nn.find(r=>r.id===t);return o?o.stack:((s=n.find(r=>r.id===t))==null?void 0:s.stack)??nn[0].stack}function Je(t,n,o=qt(jn).width,s=qt(jn).height){if(t==="image")return{id:"image",kind:t,src:n,x:0,y:0,width:ft(o),crop:null};const r=t==="title",u=Xt(r?ii:oi,o);return{id:t,kind:t,text:r?Do:Ho,x:on(r?Oo:No,o,u),y:on(r?Ro:Bo,s,u),size:u,fontId:r?"montserrat":"pretendard",color:me(0,0,0),...rn({},t)}}function hn(t,n){const o=qt(jn);return{presetId:o.id,cardWidth:o.width,cardHeight:o.height,themeSlug:t,color:n,radius:Ds,code:"",panel:"design",controlsWidth:zo,layers:[Je("image",t),Je("body",t),Je("title",t)]}}function sn(){return`layer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}const Fo=[{value:300,label:"Light"},{value:400,label:"Regular"},{value:500,label:"Medium"},{value:600,label:"SemiBold"},{value:700,label:"Bold"}],Uo=400,Rs=700;function jo(t){return t.weight>=600}function rn(t,n){var s;return{weight:((s=Fo.find(r=>r.value===t.weight))==null?void 0:s.value)??(n==="title"?600:Uo),italic:t.italic===!0,underline:t.underline===!0,align:si.find(r=>r===t.align)??"left"}}function Ne(t){return t.kind!=="image"}const Ko="upload:";function Ns(t){return t.startsWith(Ko)}function mo(t,n){t.themeSlug=n;const o=an(t,"image");o&&(o.src=n)}function an(t,n){return t.layers.find(o=>o.kind===n)}function Z(t,n){const o=t.layers.find(r=>r.kind===n);if(o)return o;const s=Je(n,t.themeSlug,t.cardWidth,t.cardHeight);return s.id=sn(),n==="image"?t.layers.unshift(s):t.layers.push(s),s}function di(t,n){const o=t.crop;return o?t.width*n*o.h/o.w:t.width*n}function Yo(t,n){const o=t.crop??{x:0,y:0,w:1},s=t.width/o.w,r=s*n;return{x:t.x-o.x*s,y:t.y-o.y*r,w:s,h:r}}function Bs(t,n){const o={x:(n.x-t.x)/t.w,y:(n.y-t.y)/t.h,w:n.w/t.w,h:n.h/t.h},s=(r,u)=>Math.abs(r-u)<.001;return s(o.x,0)&&s(o.y,0)&&s(o.w,1)&&s(o.h,1)?null:o}const Fs=20;function jt(t,n,o){return Math.min(Math.max(t,n),Math.max(n,o))}function Us(t,n,o,s,r){const u=Math.min(Ct,t.w),c=Math.min(Fs,t.h);let m=n.x,h=n.y,p=n.x+n.w,_=n.y+n.h;return o.includes("w")&&(m=jt(m+s,t.x,p-u)),o.includes("e")&&(p=jt(p+s,m+u,t.x+t.w)),o.includes("n")&&(h=jt(h+r,t.y,_-c)),o.includes("s")&&(_=jt(_+r,h+c,t.y+t.h)),{x:m,y:h,w:p-m,h:_-h}}function js(t,n,o,s){return{...n,x:jt(n.x+o,t.x,t.x+t.w-n.w),y:jt(n.y+s,t.y,t.y+t.h-n.h)}}function Ks(t,n,o){if(!t||typeof t!="object")return null;const s=t,r=h=>typeof h=="number"&&Number.isFinite(h)?h:null,u=typeof s.id=="string"&&s.id?s.id:sn(),c=r(s.x)??0,m=r(s.y)??0;if(s.kind==="image"){const h=s.crop,p=r(h==null?void 0:h.x),_=r(h==null?void 0:h.y),v=r(h==null?void 0:h.w),y=r(h==null?void 0:h.h);return{id:u,kind:"image",src:typeof s.src=="string"&&s.src?s.src:o,x:c,y:m,width:ft(r(s.width)??Ct),crop:p!==null&&_!==null&&v&&y?{x:p,y:_,w:v,h:y}:null}}return s.kind!=="title"&&s.kind!=="body"?null:{id:u,kind:s.kind,text:typeof s.text=="string"?s.text:"",x:c,y:m,size:r(s.size)??(s.kind==="title"?ii:oi),fontId:typeof s.fontId=="string"&&s.fontId?s.fontId:"pretendard",color:rt(String(s.color??""))??n,...rn(s,s.kind)}}function Ys(t,n,o){const s=(c,m)=>typeof c=="number"&&Number.isFinite(c)?c:m,r=(c,m)=>typeof c=="string"?c:m,u=r(t.fontId,"pretendard");return[{id:"image",kind:"image",src:o,x:s(t.imageX,0),y:s(t.imageY,0),width:ft(s(t.imageWidth,Ct)),crop:null},{id:"body",kind:"body",text:r(t.body,Ho),x:s(t.bodyX,No),y:s(t.bodyY,Bo),size:s(t.bodySize,oi),fontId:r(t.bodyFontId,u)||u,color:rt(r(t.bodyColor,""))??n,...rn({},"body")},{id:"title",kind:"title",text:r(t.title,Do),x:s(t.titleX,Oo),y:s(t.titleY,Ro),size:s(t.titleSize,ii),fontId:r(t.titleFontId,u)||u,color:rt(r(t.titleColor,""))??n,...rn({},"title")}]}function Xo(t){if(!t||typeof t!="object")return null;const n=t;if(typeof n.themeSlug!="string"||typeof n.color!="string")return null;const o=(c,m)=>typeof c=="number"&&Number.isFinite(c)?c:m,s=hn(n.themeSlug,n.color),r=Jn(n.color),u={...s,presetId:typeof n.presetId=="string"?n.presetId:s.presetId,cardWidth:dt(o(n.cardWidth,s.cardWidth)),cardHeight:dt(o(n.cardHeight,s.cardHeight)),radius:ri(o(n.radius,s.radius)),code:typeof n.code=="string"?n.code:"",panel:n.panel==="code"?"code":"design",controlsWidth:o(n.controlsWidth,s.controlsWidth),layers:Array.isArray(n.layers)?n.layers.map(c=>Ks(c,r,n.themeSlug)).filter(c=>c!==null):Ys(n,r,n.themeSlug)};return Z(u,"image"),Z(u,"body"),Z(u,"title"),u}function Xs(t,n){const o=hn(t.themeSlug,n);o.controlsWidth=t.controlsWidth,o.panel=t.panel,Object.assign(t,o)}function Gs(t,n,o){if(!n){Xs(t,o);return}Object.assign(t,structuredClone(n))}function rt(t){const n=t.trim().match(/^#([0-9a-fA-F]{6})$/);return n?`#${n[1].toLowerCase()}`:null}function me(t,n,o){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(t)}${s(n)}${s(o)}`}function ci(t){const n=rt(t);if(n)return{r:Number.parseInt(n.slice(1,3),16),g:Number.parseInt(n.slice(3,5),16),b:Number.parseInt(n.slice(5,7),16)};const o=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return o?{r:Number(o[1]),g:Number(o[2]),b:Number(o[3])}:null}function Bt(t){const n=t/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function go(t,n){const o=.2126*Bt(t.r)+.7152*Bt(t.g)+.0722*Bt(t.b),s=.2126*Bt(n.r)+.7152*Bt(n.g)+.0722*Bt(n.b),r=Math.max(o,s),u=Math.min(o,s);return(r+.05)/(u+.05)}function Jn(t){const n=ci(Go(t));return n?me(n.r,n.g,n.b):me(0,0,0)}function Go(t){const n=ci(t)??{r:255,g:255,b:255},o=go({r:0,g:0,b:0},n),s=go({r:255,g:255,b:255},n);return o>=4.5&&o>=s?fo:s>=4.5?po:o>=s?fo:po}function Zs(t,n,o){if(n<=0)return[];const s=[];for(const r of t.split(`
`)){const u=r.split(/\s+/).filter(Boolean);if(u.length===0){s.push("");continue}let c="";const m=h=>{if(o(h)<=n){c=h;return}let p="";for(const _ of h){const v=p+_;o(v)<=n?p=v:(p&&s.push(p),p=_)}c=p};for(const h of u){const p=c?`${c} ${h}`:h;o(p)<=n?c=p:(c&&s.push(c),m(h))}c&&s.push(c)}return s}function Kt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Js(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Vs(t,n){return Js(t).replaceAll("{{title}}",Kt(n.title)).replaceAll("{{body}}",Kt(n.body)).replaceAll("{{themeImage}}",Kt(n.themeImage)).replace(/\{\{image:([^}]+)\}\}/g,(s,r)=>{var u;return Kt(((u=n.images)==null?void 0:u[r])??"")})}function Ve(t,n=1,o=[]){const s=p=>typeof n=="number"?n:n(p),r=p=>`${Math.round(p*100)/100}px`,u=an(t,"title"),c=an(t,"body"),m=[],h=[];return t.layers.forEach((p,_)=>{const v=`layer-${_+1}`,y=`left: ${r(p.x)}; top: ${r(p.y)};`;if(p.kind==="image"){const $=p.src===t.themeSlug?"{{themeImage}}":`{{image:${Kt(p.src)}}}`,F=s(p);if(p.crop){const j=Yo(p,F);m.push(`  <div class="studio-crop ${v}"><img src="${$}" alt="" /></div>`),h.push(`  .studio-card .${v} { ${y} width: ${r(p.width)}; height: ${r(di(p,F))}; }`),h.push(`  .studio-card .${v} img { left: ${r(j.x-p.x)}; top: ${r(j.y-p.y)}; width: ${r(j.w)}; }`)}else m.push(`  <img class="${v}" src="${$}" alt="" />`),h.push(`  .studio-card .${v} { ${y} width: ${r(p.width)}; }`);return}const M=p.kind==="title"?"h1":"p",z=p===u?"{{title}}":p===c?"{{body}}":Kt(p.text);m.push(`  <${M} class="${v}">${z}</${M}>`);const D=[`font-weight: ${p.weight};`,p.italic?"font-style: italic;":"",p.underline?"text-decoration: underline;":"",p.align!=="left"?`text-align: ${p.align};`:""].filter(Boolean).join(" ");h.push(`  .studio-card .${v} { ${y} font-size: ${r(p.size)}; font-family: ${pe(p.fontId,o)}; color: ${p.color}; ${D} }`)}),`<article class="studio-card">
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
${h.join(`
`)}
</style>`}function Vn(t){const n=rt(t.color)??t.color,o=Go(n),s=rt(t.titleColor)??Jn(n),r=rt(t.bodyColor)??Jn(n),u=ri(t.radius),c=qt("ig-feed-square"),m=t.width>0?t.width:c.width,h=t.height>0?t.height:c.height,p=t.titleFontStack.replaceAll(";",""),_=t.bodyFontStack.replaceAll(";",""),v=Vs(t.code.trim()||t.design,t),y=[`--studio-color:${n}`,`--studio-ink:${o}`,`--studio-radius:${u}px`,`--studio-width:${m}px`,`--studio-height:${h}px`,`--studio-title-font:${p}`,`--studio-body-font:${_}`,`--studio-title-size:${Xt(t.titleSize,m)}px`,`--studio-body-size:${Xt(t.bodySize,m)}px`,`--studio-title-x:${_t(t.titleX)}px`,`--studio-title-y:${_t(t.titleY)}px`,`--studio-body-x:${_t(t.bodyX)}px`,`--studio-body-y:${_t(t.bodyY)}px`,`--studio-image-width:${ft(t.imageWidth)}px`,`--studio-image-x:${_t(t.imageX)}px`,`--studio-image-y:${_t(t.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${m}px;height:${h}px;margin:0;background:transparent;${y}">${v}</div>`}function Qs(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..700;1,300..700&family=Roboto:ital,wght@0,300..700;1,300..700&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Vn(t)}</body>
</html>`}const Zo="design-llm-wiki-pins";function dn(){try{const t=localStorage.getItem(Zo);if(!t)return[];const n=JSON.parse(t);return Array.isArray(n)?n.filter(o=>typeof o=="string"):[]}catch{return[]}}function tr(t){const n=[...new Set(t)];localStorage.setItem(Zo,JSON.stringify(n))}function er(t){const n=dn(),o=n.includes(t)?n.filter(s=>s!==t):[...n,t];return tr(o),dn()}const li="ax-studio-baseline";function Jo(){try{const t=localStorage.getItem(li);return t?Xo(JSON.parse(t)):null}catch{return null}}function nr(t){localStorage.setItem(li,JSON.stringify(t))}function ir(){localStorage.removeItem(li)}const or="ax-design-studio",Gt="cards";let ge=[];function Vo(){return ge}function Qo(){return new Promise((t,n)=>{const o=indexedDB.open(or,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(Gt)||s.createObjectStore(Gt,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function sr(){const t=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`saved-${t}-${n}`}async function rr(){try{const t=await Qo(),n=await new Promise((o,s)=>{const r=t.transaction(Gt,"readonly").objectStore(Gt).getAll();r.onsuccess=()=>o(r.result??[]),r.onerror=()=>s(r.error??new Error("indexedDB read failed"))});t.close(),ge=n.sort((o,s)=>o.createdAt<s.createdAt?1:-1)}catch{ge=[]}}async function ar(t,n){var s;const o={id:sr(),title:((s=an(t,"title"))==null?void 0:s.text.trim())||"제목 없음",createdAt:new Date().toISOString(),state:structuredClone(t),thumbnail:n};try{const r=await Qo();return await new Promise((u,c)=>{const m=r.transaction(Gt,"readwrite").objectStore(Gt).put(o);m.onsuccess=()=>u(),m.onerror=()=>c(m.error??new Error("indexedDB write failed"))}),r.close(),ge=[o,...ge],o}catch{return null}}const dr="ax-studio-uploads",cn="images";let ct=[];function ts(){return ct}function es(t){return`${Ko}${t.id}`}function cr(t){return ct.find(n=>es(n)===t)}function lr(){return new Promise((t,n)=>{const o=indexedDB.open(dr,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(cn)||s.createObjectStore(cn,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function ui(t,n){return lr().then(o=>new Promise((s,r)=>{const u=n(o.transaction(cn,t).objectStore(cn));u.onsuccess=()=>{o.close(),s(u.result)},u.onerror=()=>{o.close(),r(u.error??new Error("indexedDB request failed"))}}))}function ns(t){return{id:t.id,name:t.name,createdAt:t.createdAt,url:URL.createObjectURL(t.blob)}}async function ur(){try{const t=await ui("readonly",n=>n.getAll())??[];for(const n of ct)URL.revokeObjectURL(n.url);ct=t.sort((n,o)=>n.createdAt<o.createdAt?-1:1).map(ns)}catch{ct=[]}}async function hr(t){const n={id:`upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,name:t.name,createdAt:new Date().toISOString(),blob:t};try{await ui("readwrite",s=>s.put(n));const o=ns(n);return ct=[...ct,o],o}catch{return null}}async function fr(t){try{await ui("readwrite",o=>o.delete(t));const n=ct.find(o=>o.id===t);return n&&URL.revokeObjectURL(n.url),ct=ct.filter(o=>o.id!==t),!0}catch{return!1}}let yo=0;function Qe(t){return new Promise(n=>{var h,p,_;const o=document.createElement("div");o.className="confirm-backdrop",o.innerHTML=`
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-message">
        <p class="confirm-dialog__message" id="confirm-message"></p>
        <div class="confirm-dialog__actions">
          <button type="button" class="button button--secondary" data-confirm="cancel">취소</button>
          <button type="button" class="button" data-confirm="ok">진행</button>
        </div>
      </div>
    `;const s=o.querySelector("#confirm-message");s&&(s.textContent=t);const r=document.activeElement instanceof HTMLElement?document.activeElement:null;let u=!1;const c=v=>{u||(u=!0,document.removeEventListener("keydown",m),o.remove(),r==null||r.focus(),n(v))},m=v=>{v.key==="Escape"&&(v.preventDefault(),c(!1))};o.addEventListener("click",v=>{v.target===o&&c(!1)}),(h=o.querySelector("[data-confirm='cancel']"))==null||h.addEventListener("click",()=>c(!1)),(p=o.querySelector("[data-confirm='ok']"))==null||p.addEventListener("click",()=>c(!0)),document.addEventListener("keydown",m),document.body.append(o),(_=o.querySelector("[data-confirm='ok']"))==null||_.focus()})}function Ut(t){var o;(o=document.querySelector(".toast"))==null||o.remove(),window.clearTimeout(yo);const n=document.createElement("div");n.className="toast",n.setAttribute("role","status"),n.textContent=t,document.body.append(n),yo=window.setTimeout(()=>n.remove(),2400)}const is="[a-z0-9]+(?:-[a-z0-9]+)*";function os(t){const n=t.startsWith("#")?t.slice(1):t,o=n.indexOf("?"),s=o>=0?n.slice(0,o):n,r=o>=0?n.slice(o+1):"",u=s.startsWith("/")?s:`/${s}`;return{path:u==="/"||u===""?"/":u.replace(/\/+$/,"")||"/",query:r}}function bo(t,n){const o=new URLSearchParams(t).get(n);return!o||!new RegExp(`^${is}$`).test(o)?null:o}function ss(t){const{path:n}=os(t);return n==="/intake"||n==="/design-system"||n==="/stats"}function Qn(t=window.location.hash){const{path:n,query:o}=os(t);if(n==="/"||n==="/gallery")return{name:"archive"};if(n==="/history")return{name:"history"};if(n==="/studio"||ss(t))return{name:"studio",theme:n==="/studio"?bo(o,"theme"):null,card:n==="/studio"?bo(o,"card"):null};const s=n.match(new RegExp(`^/capture/(${is})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:n}}function mt(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":{const n=new URLSearchParams;t.card?n.set("card",t.card):t.theme&&n.set("theme",t.theme);const o=n.toString();return o?`#/studio?${o}`:"#/studio"}case"history":return"#/history";case"notfound":return`#${t.path}`}}function pr(t){const n=()=>t(Qn());return window.addEventListener("hashchange",n),t(Qn()),()=>window.removeEventListener("hashchange",n)}function mr(t){return[...t].sort((n,o)=>n.capturedAt!==o.capturedAt?n.capturedAt<o.capturedAt?1:-1:n.slug.localeCompare(o.slug))}function b(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Tt(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let Be=null;function gr(t){const n=t.querySelector(".archive-tabs__indicator"),o=t.querySelector('.archive-tab[aria-selected="true"]');if(!n||!o)return;const s=o.offsetLeft,r=o.offsetWidth;Be&&(n.style.transition="none",n.style.transform=`translateX(${Be.left}px)`,n.style.width=`${Be.width}px`,n.offsetWidth,n.style.transition=""),requestAnimationFrame(()=>{n.style.transform=`translateX(${s}px)`,n.style.width=`${r}px`,Be={left:s,width:r}})}function Rn(t){const n=t.querySelector(".capture-grid");if(!n)return;const o=window.getComputedStyle(n),s=Number.parseFloat(o.gridAutoRows)||1,r=Number.parseFloat(o.rowGap)||0;n.querySelectorAll(".capture-card").forEach(u=>{u.style.gridRowEnd="";const c=u.getBoundingClientRect().height,m=Number.parseFloat(window.getComputedStyle(u).marginBottom)||0,h=Math.ceil((c+m+r)/(s+r));u.style.gridRowEnd=`span ${Math.max(1,h)}`})}function yr(t){const n=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.thumbPath??t.asset.path;return`<img class="capture-card__media" src="${b(Tt(n))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function br(t){const n=`${t.state.cardWidth} × ${t.state.cardHeight}`;return`
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
  `}function vr(t,n){return`
    <article class="capture-card${n?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${mt({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${yr(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${b(t.asset.kind)}</span>`}
          ${n?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${b(t.title)}</h2>
          <p class="capture-card__insight">${b(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function xr(t,n){const o=new Set(n),s=mr(t),r=s.filter(p=>o.has(p.slug)),u=s.filter(p=>!o.has(p.slug)),c=new Map(s.map(p=>[p.slug,p])),m=n.map(p=>c.get(p)).filter(p=>!!p),h=r.filter(p=>!n.includes(p.slug));return[...m,...h,...u]}function _r(t,n,o,s){const r=new Set(n),u=o==="pin"?t.captures.filter(m=>r.has(m.slug)):t.captures,c=xr(u,n);return t.captures.length===0?`
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
        ${o==="saved"?s.length===0?`<section class="state-panel state-panel--tint">
                  <h2 class="state-panel__title">저장된 카드가 없습니다</h2>
                  <p class="state-panel__text">스튜디오에서 그래픽 라이브러리에 추가를 누르면 이 탭에 모입니다.</p>
                </section>`:`<div class="capture-grid">${s.map(m=>br(m)).join("")}</div>`:c.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${o==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${o==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${c.map(m=>vr(m,n.includes(m.slug))).join("")}</div>`}
      </div>
    </section>
  `}function wr(t,n){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const u=r.dataset.archiveTab;(u==="all"||u==="pin"||u==="saved")&&n.onTabChange(u)})}),gr(t),requestAnimationFrame(()=>Rn(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>Rn(t),{once:!0})});const o=new ResizeObserver(()=>Rn(t)),s=t.querySelector(".capture-grid");s&&o.observe(s)}function $r(t){const n=t.replace(/\r\n/g,`
`).split(`
`),o=[];let s=!1;const r=()=>{s&&(o.push("</ul>"),s=!1)};for(const u of n){const c=u.trim();if(!c){r();continue}if(c.startsWith("### ")){r(),o.push(`<h3>${re(c.slice(4))}</h3>`);continue}if(c.startsWith("## ")){r(),o.push(`<h2>${re(c.slice(3))}</h2>`);continue}if(c.startsWith("# ")){r(),o.push(`<h1>${re(c.slice(2))}</h1>`);continue}if(c.startsWith("- ")){s||(o.push("<ul>"),s=!0),o.push(`<li>${re(c.slice(2))}</li>`);continue}r(),o.push(`<p>${re(c)}</p>`)}return r(),o.join(`
`)}function re(t){let n=b(t);return n=n.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(o,s)=>`<a href="${mt({name:"capture",slug:s})}">${s}</a>`),n=n.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(o,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${b(r)}">${s}</a>`),n}const Sr=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Er(t){return Math.max(35,Math.min(98,Math.round(t)))}function Lr(t){let n=0;for(const o of t)n=(n*31+o.charCodeAt(0))%997;return n}function Mr(t){var p;if((p=t.analysisScores)!=null&&p.length)return t.analysisScores;const n=Lr(`${t.slug}:${t.title}:${t.insight}`),o=t.tags.includes("density")?7:0,s=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),u=t.asset.width/Math.max(1,t.asset.height),c=u>1.2?6:0,m=u<.75?5:0,h=[68+r+c+n%9,66+o+(n>>1)%10,64+(t.insight.length>45?8:3)+(n>>2)%9,58+s+(t.uiPatterns.includes("filter-chips")?7:0),62+m+r+(n>>3)%8].map(Er);return Sr.map(([_,v],y)=>({key:_,label:v,score:h[y]??60,description:Ir(v,h[y]??60,t)}))}function kr(t){return t.length===0?0:Math.round(t.reduce((n,o)=>n+o.score,0)/t.length)}function Ir(t,n,o){return t==="레이아웃"?`${o.screenType} 화면 구조와 ${o.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?o.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":n>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function Ar(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Tr(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${b(Tt(t.asset.posterPath))}"`:""}>
        <source src="${b(Tt(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${b(Tt(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function qr(t){const n=Mr(t),o=t.analysisTotal??kr(n),s=160,r=110,u=[.25,.5,.75,1].map(h=>n.map((p,_)=>{const v=-Math.PI/2+_*Math.PI*2/n.length,y=s+Math.cos(v)*r*h,M=s+Math.sin(v)*r*h;return`${y.toFixed(1)},${M.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),c=n.map((h,p)=>{const _=-Math.PI/2+p*Math.PI*2/n.length,v=r*(h.score/100),y=s+Math.cos(_)*v,M=s+Math.sin(_)*v;return`${y.toFixed(1)},${M.toFixed(1)}`}).join(" "),m=n.map((h,p)=>{const _=-Math.PI/2+p*Math.PI*2/n.length,v=s+Math.cos(_)*r,y=s+Math.sin(_)*r,M=s+Math.cos(_)*r*(h.score/100),z=s+Math.sin(_)*r*(h.score/100),D=s+Math.cos(_)*(r+26),$=s+Math.sin(_)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${v.toFixed(1)}" y2="${y.toFixed(1)}" />
          <circle class="spider-point" cx="${M.toFixed(1)}" cy="${z.toFixed(1)}" r="6" />
          <text class="spider-label" x="${D.toFixed(1)}" y="${$.toFixed(1)}">${b(h.label)}</text>
          <text class="spider-callout" x="${D.toFixed(1)}" y="${($+18).toFixed(1)}">${h.score}</text>
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
          ${n.map(h=>`
            <div class="score-list__item">
              <dt>${b(h.label)} <strong>${h.score}</strong></dt>
              <dd>${b(h.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function Cr(t){const n=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(n)].map(o=>`<span class="chip detail-hashtag" aria-pressed="true">#${b(o)}</span>`).join("")}function Wr(t,n,o){const s=t.captures.find(u=>u.slug===n);if(!s)return`
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
          <a class="button button--secondary" href="${b(Tt(s.asset.path))}" download="${b(`${n}.${s.asset.originalName.split(".").pop()}`)}">원본 다운로드</a>
          <button type="button" class="button button--secondary" data-pin-slug="${b(n)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Tr(s)}</div>

      ${qr(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${b(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${b(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${Ar(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${b(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${Cr(s)}
        </p>
        <p class="detail__meta-line">
          ${b(s.screenType)} · ${b(s.tone)} · ${b(s.copyTone)} · ${b(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${b(s.sourceUrl)}">${b(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${$r(s.body)}
      </section>
    </article>
  `}function zr(t,n){var o;(o=t.querySelector("[data-pin-slug]"))==null||o.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&n(r)})}function Dr(t){const n=t.wiki.logEntries;return n.length===0?`
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
  `}function Hr(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${b(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Nn=.5,Bn=3,vo=.25,Pr=.5,Or=10,ae=/Mac|iPhone|iPad|iPod/.test(navigator.userAgent),xo=40;let T=1,ht=[],de=[],Ft=[],Fe=[],ce=null,_o=1;const Rr=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],rs="(min-width: 768px)",as="(min-width: 1025px)";let tn=null,Ue=null,je=null,Ke=null,le=[],Ye=null;const Nr=500,wo=20;function hi(){return window.matchMedia(as).matches?"desktop":window.matchMedia(rs).matches?"tablet":"mobile"}function ds(){const t=["mobile","tablet","desktop"],n=hi();return tn&&t.indexOf(tn)<=t.indexOf(n)?tn:n}function Xe(t){return structuredClone(t)}function $o(t,n){return JSON.stringify(t)===JSON.stringify(n)}const ln=new Map,So=new Map;function ti(t){const n=ln.get(t);return n!=null&&n.complete&&n.naturalWidth>0?Promise.resolve(n):new Promise((o,s)=>{const r=n??new Image;r.onload=()=>o(r),r.onerror=()=>s(new Error(`Image failed: ${t}`)),n||(ln.set(t,r),r.src=t)})}function Br(t){const n=So.get(t);if(n)return n;const o=fetch(t).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,u)=>{const c=new FileReader;c.onload=()=>r(String(c.result)),c.onerror=()=>u(c.error??new Error("data url failed")),c.readAsDataURL(s)}));return So.set(t,o),o}const Fr=Object.assign({});function cs(t,n,o){return`${t.italic?"italic ":""}${t.weight} ${n}px ${pe(t.fontId,o)}`}const Eo=new Set;function Ur(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function wt(){const t=new Set(nn.map(o=>o.label.toLowerCase())),n=[];for(const[o,s]of Object.entries(Fr)){const r=Os(o);if(!r||t.has(r.toLowerCase()))continue;const u=`local:${r}`;if(!n.some(c=>c.id===u)){if(!Eo.has(r)){Eo.add(r);const c=document.createElement("style");c.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${Ur(s)}");font-display:swap;}`,document.head.append(c)}n.push({id:u,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return n}function jr(){return[...nn,...wt()]}function Kr(t,n,o,s){const r=Math.max(0,Math.min(s,n/2,o/2));t.beginPath(),t.roundRect(0,0,n,o,r)}function Yr(t,n,o,s){const r=Z(t,"title"),u=Z(t,"body"),c=Z(t,"image"),m=wt();return{title:r.text,body:u.text,themeImage:n,images:o,design:Ve(t,s,m),color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:pe(r.fontId,m),bodyFontStack:pe(u.fontId,m),titleSize:r.size,bodySize:u.size,titleX:r.x,titleY:r.y,bodyX:u.x,bodyY:u.y,imageWidth:c.width,imageX:c.x,imageY:c.y,titleColor:r.color,bodyColor:u.color}}function Lo(t,n,o,s){const r=t.getContext("2d");if(!r)return[];const u=n.cardWidth,c=n.cardHeight;t.width=u,t.height=c,r.clearRect(0,0,u,c),r.save(),Kr(r,u,c,n.radius),r.clip(),r.fillStyle=n.color,r.fillRect(0,0,u,c);const m=[],h=Math.max(1,u-ni*2);r.textBaseline="top";const p=wt(),_=y=>{const M=o(y);if(!M)return;const z=di(y,M.naturalHeight/M.naturalWidth);if(y.id!==s){const D=y.crop;if(D){const $=M.naturalWidth,F=M.naturalHeight;r.drawImage(M,D.x*$,D.y*F,D.w*$,D.h*F,y.x,y.y,y.width,z)}else r.drawImage(M,y.x,y.y,y.width,z)}m.push({id:y.id,kind:"image",x:y.x,y:y.y,w:y.width,h:z})},v=y=>{if(!y.text.trim())return;r.fillStyle=y.color,r.font=cs(y,y.size,p);const M=Zs(y.text.trim(),h,j=>r.measureText(j).width),z=Math.round(y.size*1.25),D=M.map(j=>r.measureText(j).width),$=Math.max(0,...D),F=Math.max(1,Math.round(y.size/16));M.forEach((j,$t)=>{if(y.id===s)return;const gt=D[$t]??0,St=y.x+(y.align==="center"?($-gt)/2:y.align==="right"?$-gt:0),Et=y.y+$t*z;r.fillText(j,St,Et),y.underline&&r.fillRect(St,Et+y.size*.98,gt,F)}),m.push({id:y.id,kind:y.kind,x:y.x,y:y.y,w:Math.max($,y.size),h:Math.max(M.length,1)*z})};for(const y of n.layers)y.kind==="image"?_(y):v(y);return r.restore(),m}function Mo(t,n){t.toBlob(o=>{if(!o)return;const s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=n,r.click(),URL.revokeObjectURL(s)},"image/png")}async function ko(t,n,o,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}"><foreignObject x="0" y="0" width="${o}" height="${s}">${n}</foreignObject></svg>`,u=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),c=URL.createObjectURL(u);try{const m=await ti(c),h=t.getContext("2d");if(!h)return;t.width=o,t.height=s,h.clearRect(0,0,o,s),h.drawImage(m,0,0,o,s)}finally{URL.revokeObjectURL(c),ln.delete(c)}}let ue=null;function Io(t,n,o){let s=0;const r=()=>{const u=t.scrollHeight-t.clientHeight;if(u<=1){n.hidden=!0;return}n.hidden=!1;const c=Math.max(32,t.clientHeight/t.scrollHeight*t.clientHeight),m=Math.max(0,t.clientHeight-c);n.style.height=`${c}px`,n.style.transform=`translateY(${t.scrollTop/u*m}px)`};return t.addEventListener("scroll",()=>{r(),o.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>o.classList.remove("is-scrolling"),700)}),r(),r}const Fn="application/x-ax-studio-image",Xr=[{style:"bold",label:"볼드",glyph:"B"},{style:"italic",label:"이탤릭",glyph:"I"},{style:"underline",label:"밑줄",glyph:"U"}],Ao={left:"왼쪽 정렬",center:"가운데 정렬",right:"오른쪽 정렬"},Gr={left:"M4 6h16M4 10h10M4 14h16M4 18h10",center:"M4 6h16M7 10h10M4 14h16M7 18h10",right:"M4 6h16M10 10h10M4 14h16M10 18h10"};function ls(t,n){return n==="bold"?jo(t):t[n]}function To(t){return Fo.map(n=>`<option value="${n.value}"${n.value===t?" selected":""}>${n.label} · ${n.value}</option>`).join("")}function qo(t,n,o){const s=c=>`aria-pressed="${c?"true":"false"}"`,r=Xr.map(c=>`<button type="button" class="studio__style-btn studio__style-btn--${c.style}" data-text-kind="${t}" data-text-style="${c.style}" ${s(ls(o,c.style))} aria-label="${n} ${c.label}" title="${c.label}">${c.glyph}</button>`).join(""),u=si.map(c=>`<button type="button" class="studio__style-btn" data-text-kind="${t}" data-text-align="${c}" ${s(o.align===c)} aria-label="${n} ${Ao[c]}" title="${Ao[c]}"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${Gr[c]}" /></svg></button>`).join("");return`
          <div class="studio__field">
            <span id="studio-${t}-style-label">${n} 스타일</span>
            <div class="studio__text-style" role="group" aria-labelledby="studio-${t}-style-label">
              <div class="studio__style-set">${r}</div>
              <div class="studio__style-set">${u}</div>
            </div>
          </div>`}function us(t,n){const o=(c,m,h)=>{const p=c===n;return`
      <button
        type="button"
        class="studio__theme"
        role="radio"
        data-theme-slug="${b(c)}"
        aria-checked="${p?"true":"false"}"
        tabindex="${p?"0":"-1"}"
        draggable="true"
      >
        <img src="${b(m)}" alt="${b(h)}" draggable="false" />
      </button>
    `},s=t.map(c=>o(c.slug,Tt(c.asset.thumbPath??c.asset.path),c.title)),r=ts().map(c=>`
      <div class="studio__theme-item">
        ${o(es(c),c.url,c.name)}
        <button type="button" class="studio__theme-remove" data-upload-remove="${b(c.id)}" aria-label="${b(c.name)} 삭제" title="삭제">×</button>
      </div>
    `);return[...s,...r,'<button type="button" class="studio__theme studio__theme--add" id="studio-theme-add" aria-label="이미지 추가" title="이미지 추가">+</button>'].join("")}function Zr(t,n){if(n.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const o=Z(t,"title"),s=Z(t,"body"),r=Z(t,"image"),u=qt(t.presetId),c=Kn.map($=>`<option value="${b($.id)}"${$.id===u.id?" selected":""}>${b($.name)} · ${$.width}×${$.height}</option>`).join(""),m=us(n,r.src),h=t.panel==="design",p=jr(),_=ai(t.cardWidth),v=$=>p.map(F=>`<option value="${b(F.id)}"${F.id===$?" selected":""}>${b(F.label)}</option>`).join(""),y='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',M='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',z=ds();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${Rr.map($=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${$.id}" aria-label="${$.label}" title="${$.label}" aria-pressed="${$.id===z?"true":"false"}">${$.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${z}" data-framed="${z===hi()?"false":"true"}">
    <section class="studio" style="--studio-controls-width:${t.controlsWidth}px">
      <div class="studio__controls-wrap">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${h?"true":"false"}" tabindex="${h?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${h?"false":"true"}" tabindex="${h?"-1":"0"}">Code</button>
        </div>
        <div class="studio__panel-host">
        <div class="studio__panel-scroll" id="studio-panel-scroll">
        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${h?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${c}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${xt}" max="${At}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${xt}" max="${At}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${xt}" max="${At}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${xt}" max="${At}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${xt}" max="${At}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${xt}" max="${At}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
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
              <input id="studio-title-size" type="range" min="5" max="${_}" step="1" value="${o.size}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${_}" step="1" value="${o.size}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${v(o.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-title-weight">타이틀 굵기</label>
            <select id="studio-title-weight" class="studio__control">${To(o.weight)}</select>
          </div>
          ${qo("title","타이틀",o)}
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
              <input id="studio-body-size" type="range" min="5" max="${_}" step="1" value="${s.size}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${_}" step="1" value="${s.size}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${v(s.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body-weight">본문 굵기</label>
            <select id="studio-body-weight" class="studio__control">${To(s.weight)}</select>
          </div>
          ${qo("body","본문",s)}
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${m}</div>
            <input type="file" id="studio-theme-file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" multiple hidden />
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${Ct}" max="${Xn}" step="1" value="${r.width}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${Ct}" max="${Xn}" step="1" value="${r.width}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius" type="range" min="${fe}" max="${Ze}" step="1" value="${t.radius}" aria-valuemin="${fe}" aria-valuemax="${Ze}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${fe}" max="${Ze}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-set-baseline">초기화로 세팅</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-save-library">그래픽 라이브러리에 추가</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${h?" hidden":""}>
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
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${Yt}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
  `}function Jr(t,n,o,s){var eo,no,io,oo,so,ro,ao,co,lo,uo;if(o.length===0)return;const r=t.querySelector("#studio-preset"),u=t.querySelector("#studio-size"),c=t.querySelector("#studio-size-number"),m=t.querySelector("#studio-width"),h=t.querySelector("#studio-width-number"),p=t.querySelector("#studio-height"),_=t.querySelector("#studio-height-number"),v=t.querySelector("#studio-title"),y=t.querySelector("#studio-title-color"),M=t.querySelector("#studio-title-hex"),z=t.querySelector("#studio-title-size"),D=t.querySelector("#studio-title-size-number"),$=t.querySelector("#studio-body"),F=t.querySelector("#studio-body-color"),j=t.querySelector("#studio-body-hex"),$t=t.querySelector("#studio-body-size"),gt=t.querySelector("#studio-body-size-number"),St=t.querySelector("#studio-title-font"),Et=t.querySelector("#studio-body-font"),ye=t.querySelector("#studio-title-weight"),be=t.querySelector("#studio-body-weight"),fn=t.querySelector("#studio-image-width"),pn=t.querySelector("#studio-image-width-number"),mn=t.querySelector("#studio-color"),ve=t.querySelector("#studio-hex"),U=t.querySelector("#studio-radius"),at=t.querySelector("#studio-radius-number"),J=t.querySelector("#studio-code"),E=t.querySelector("#studio-canvas"),xe=t.querySelector("#studio-iframe"),pi=t.querySelector("#studio-meta"),Zt=t.querySelector("#studio-safe"),_e=t.querySelector("#studio-scaler"),gn=t.querySelector("#studio-fit"),B=t.querySelector("#studio-stage"),we=t.querySelector("#studio-zoom-out"),$e=t.querySelector("#studio-zoom-in"),mi=t.querySelector("#studio-zoom-label"),Se=t.querySelector("#studio-undo"),yn=t.querySelector("#studio-redo"),bn=t.querySelector("#studio-scroll-thumb"),vn=t.querySelector(".studio__controls-wrap"),Ee=t.querySelector("#studio-export"),V=t.querySelector("#studio-splitter"),Le=t.querySelector(".studio"),gi=t.querySelector("#studio-overlay"),Jt=t.querySelector("#studio-crop-frame"),k=t.querySelector("#studio-editor"),xn=[...t.querySelectorAll(".studio__handle[data-handle]")],_n=[...t.querySelectorAll(".studio__handle[data-crop]")];if(!gi||!Jt||!k||!r||!u||!c||!m||!h||!p||!_||!v||!y||!M||!z||!D||!$||!F||!j||!$t||!gt||!St||!Et||!ye||!be||!fn||!pn||!mn||!ve||!U||!at||!J||!E||!xe||!pi||!Zt||!_e||!gn||!B||!we||!$e||!mi||!Se||!yn||!bn||!vn||!Ee||!V||!Le||!t.querySelector("#studio-set-baseline")||!t.querySelector("#studio-save-library"))return;const Me=e=>{const i=cr(e);if(i)return i.url;const d=o.find(a=>a.slug===e)??o.find(a=>a.slug===n.themeSlug)??o[0];return d?Tt(d.asset.path):""},Lt=e=>{const i=ln.get(Me(e.src));return i!=null&&i.complete&&i.naturalWidth>0?i:null},Wt=e=>{const i=Lt(e);return i?i.naturalHeight/i.naturalWidth:1},wn=async()=>{const e=f=>{const g=Me(f);return g?Br(g).catch(()=>""):Promise.resolve("")},i=[...new Set(n.layers.flatMap(f=>f.kind==="image"&&f.src!==n.themeSlug?[f.src]:[]))],[d,...a]=await Promise.all([e(n.themeSlug),...i.map(e)]),l=Object.fromEntries(i.map((f,g)=>[f,a[g]??""]));return Yr(n,d??"",l,Wt)};let ke=0,it=1;const x=new Set;let K=null,L=null,H=()=>{},Ie=()=>{};const ot=e=>n.layers.find(i=>i.id===e),zt=()=>n.layers.filter(e=>x.has(e.id)),P=e=>{for(let i=n.layers.length-1;i>=0;i-=1){const d=n.layers[i];if(d&&d.kind===e&&x.has(d.id))return d}return Z(n,e)},Dt=()=>{for(let e=n.layers.length-1;e>=0;e-=1){const i=n.layers[e];if(i&&i.kind==="image"&&x.has(i.id))return i}return Z(n,"image")},Vt=()=>n.layers.filter(e=>e.kind==="image"),$n=()=>Vt().some(e=>Lt(e)),ms=()=>{(!Number.isFinite(T)||T<=0)&&(T=1),we.disabled=T<=Nn+.001,$e.disabled=T>=Bn-.001,mi.textContent=`${Math.round(T*100)}%`},Sn=(e,i)=>{const d=B.getBoundingClientRect(),a=20,l=Math.min(Math.max(d.width-a,1)/e,Math.max(d.height-a,1)/i);return Number.isFinite(l)&&l>0?l:1},Mt=()=>{const e=Sn(n.cardWidth,n.cardHeight);ms();const i=e*T;gn.style.width=`${n.cardWidth*i}px`,gn.style.height=`${n.cardHeight*i}px`,_e.style.width=`${n.cardWidth}px`,_e.style.height=`${n.cardHeight}px`,_e.style.transform=`scale(${i})`,it=i,Ie()};we.addEventListener("click",()=>{T=Math.max(Nn,T-vo),Mt()}),$e.addEventListener("click",()=>{T=Math.min(Bn,T+vo),Mt()}),(eo=t.querySelector("#studio-zoom-fit"))==null||eo.addEventListener("click",()=>{T=1,Mt(),B.scrollTo(0,0)});const yi=t.querySelector("#studio-panel-scroll"),gs=yi&&bn&&vn?Io(yi,bn,vn):()=>{},ys=()=>{J.style.height="auto",J.style.height=`${Math.max(180,J.scrollHeight)}px`,gs()},Ht=()=>{const e=document.querySelector("#studio-undo"),i=document.querySelector("#studio-redo");e&&(e.disabled=ht.length===0),i&&(i.disabled=de.length===0)};let Qt=null;const S=e=>{if(e&&Qt!==e)return;if(!ce){Qt=null;return}const i=ce,d=_o;ce=null,Qt=null,!($o(i,n)&&d===T)&&(ht.push(i),Ft.push(d),ht.length>xo&&(ht.shift(),Ft.shift()),de=[],Fe=[],Ht())},I=e=>{e&&Qt===e&&ce||(S(),ce=Xe(n),_o=T,Qt=e??null)},bi=e=>{const i=Number(e.min),d=Number(e.max),a=Number(e.value),l=d>i?(a-i)/(d-i)*100:0;e.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,l))}%`)};let vi=n.cardHeight/Math.max(1,n.cardWidth);const xi=()=>new Map(Vt().map(e=>[e.id,{width:e.width,x:e.x,y:e.y}]));let En={cardWidth:n.cardWidth,images:xi()};const Ln=()=>{vi=n.cardHeight/Math.max(1,n.cardWidth),En={cardWidth:n.cardWidth,images:xi()}};let lt=[];const Mn=e=>di(e,Wt(e)),kn=()=>{n.cardWidth=dt(n.cardWidth),n.cardHeight=dt(n.cardHeight);for(const e of Vt())e.width=ft(e.width)},Pt=(e,i,d)=>{e.value=String(d),document.activeElement!==i&&(i.value=String(d))},_i=()=>{const e=P("title"),i=P("body"),d=ai(n.cardWidth),a=String(Math.max(d,e.size)),l=String(Math.max(d,i.size));for(const f of[z,D])f.min="5",f.max=a;for(const f of[$t,gt])f.min="5",f.max=l;Pt(u,c,n.cardWidth),Pt(m,h,n.cardWidth),Pt(p,_,n.cardHeight),Pt(z,D,e.size),Pt($t,gt,i.size),Pt(fn,pn,Dt().width)},wi=()=>{U.value=String(n.radius),U.setAttribute("aria-valuenow",String(n.radius)),at.value=String(n.radius),t.style.setProperty("--studio-card-radius",`${n.radius}px`)},$i=(e,i=!1)=>{for(const d of t.querySelectorAll("[data-theme-slug]")){const a=d.dataset.themeSlug===e;d.setAttribute("aria-checked",a?"true":"false"),d.tabIndex=a?0:-1,a&&i&&d.focus()}},bs=(e,i)=>{const d=zt().filter(l=>l.kind==="image");for(const l of d.length>0?d:[Z(n,"image")])l.src=e;const a=Z(n,"image");Ns(a.src)||(n.themeSlug=a.src),$i(e,i),A()},In=e=>{var l,f;n.panel=e;const i=e==="design";(l=t.querySelector("#studio-panel-design"))==null||l.toggleAttribute("hidden",!i),(f=t.querySelector("#studio-panel-code"))==null||f.toggleAttribute("hidden",i);const d=t.querySelector("#studio-tab-design"),a=t.querySelector("#studio-tab-code");d==null||d.setAttribute("aria-selected",i?"true":"false"),a==null||a.setAttribute("aria-selected",i?"false":"true"),d&&(d.tabIndex=i?0:-1),a&&(a.tabIndex=i?-1:0),A()},An=()=>{const e=P("title"),i=P("body");r.value=n.presetId,document.activeElement!==v&&(v.value=e.text),document.activeElement!==$&&($.value=i.text),document.activeElement!==M&&(y.value=e.color,M.value=e.color),document.activeElement!==j&&(F.value=i.color,j.value=i.color),document.activeElement!==ve&&(mn.value=n.color,ve.value=n.color),St.value=e.fontId,Et.value=i.fontId,ye.value=String(e.weight),be.value=String(i.weight);for(const d of t.querySelectorAll("[data-text-kind]")){const a=d.dataset.textKind==="title"?e:i,l=d.dataset.textStyle,f=l?ls(a,l):a.align===d.dataset.textAlign;d.setAttribute("aria-pressed",f?"true":"false")}document.activeElement!==J&&(J.value=n.code),$i(Dt().src)},A=async()=>{const e=++ke;kn(),An(),_i(),t.querySelectorAll('input[type="range"]').forEach(bi);const i=qt(n.presetId),d=n.cardWidth===i.width&&n.cardHeight===i.height,a=d&&i.safe?` · 안전 영역 ${i.safe.width} × ${i.safe.height}`:"";pi.textContent=`${n.cardWidth} × ${n.cardHeight} · ${i.name}${a}`,Ee.textContent=Ve(n,Wt,wt()),ys(),wi(),Mt(),d&&i.safe?(Zt.hidden=!1,Zt.style.width=`${i.safe.width}px`,Zt.style.height=`${i.safe.height}px`):Zt.hidden=!0;const l=g=>{var C;const w=(C=pe(g.fontId,wt()).split(",")[0])==null?void 0:C.replaceAll('"',"").trim();return w?document.fonts.load(`${g.italic?"italic ":""}${g.weight} ${g.size}px "${w}"`):Promise.resolve()};try{await Promise.all(n.layers.filter(Ne).map(l))}catch{}if(e!==ke)return;if(n.code.trim()){E.hidden=!0,xe.hidden=!1;const g=await wn();if(e!==ke)return;xe.srcdoc=Qs(g),Ie();return}xe.hidden=!0,E.hidden=!1;const f=new Set(Vt().map(g=>Me(g.src)).filter(Boolean));await Promise.all([...f].map(g=>ti(g).catch(()=>null))),e===ke&&(kn(),Ee.textContent=Ve(n,Wt,wt()),H())},Ot=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>I(e)),e.addEventListener("keydown",()=>I(e)),e.addEventListener("pointerup",()=>S(e)),e.addEventListener("pointercancel",()=>S(e)),e.addEventListener("keyup",()=>S(e)),e.addEventListener("input",()=>{d(Number(e.value)),A()});const l=()=>{kn(),i.value=String(a()),S(i)};i.addEventListener("focus",()=>I(i)),i.addEventListener("input",()=>{i.value.trim()!==""&&(d(Number(i.value)),A())}),i.addEventListener("change",l),i.addEventListener("blur",l)};r.addEventListener("focus",()=>I(r)),r.addEventListener("change",()=>{const e=qt(r.value);n.presetId=e.id,n.cardWidth=e.width,n.cardHeight=e.height,S(r),A()}),r.addEventListener("blur",()=>S(r)),u.addEventListener("pointerdown",Ln),u.addEventListener("keydown",Ln),c.addEventListener("focus",Ln),Ot(u,c,e=>{const i=Sn(n.cardWidth,n.cardHeight)*T,d=Hs(Math.max(1,n.cardWidth),Math.max(1,Math.round(n.cardWidth*vi)),e);n.cardWidth=d.cardWidth,n.cardHeight=d.cardHeight;const a=n.cardWidth/Math.max(1,En.cardWidth);for(const f of Vt()){const g=En.images.get(f.id);if(!g)continue;f.width=ft(g.width*a);const w=f.width/Math.max(1,g.width);f.x=Math.round(g.x*w),f.y=Math.round(g.y*w)}const l=Sn(n.cardWidth,n.cardHeight);l>0&&Number.isFinite(i)&&i>0&&(T=i/l)},()=>n.cardWidth),Ot(m,h,e=>{n.cardWidth=dt(e);for(const i of n.layers)Ne(i)&&(i.size=Xt(i.size,n.cardWidth))},()=>n.cardWidth),Ot(p,_,e=>{n.cardHeight=e},()=>n.cardHeight),Ot(z,D,e=>{P("title").size=Xt(e,n.cardWidth)},()=>P("title").size),Ot($t,gt,e=>{P("body").size=Xt(e,n.cardWidth)},()=>P("body").size),Ot(fn,pn,e=>{Dt().width=e},()=>Dt().width);const Ae=(e,i)=>{e.addEventListener("focus",()=>I(e)),e.addEventListener("change",()=>{i(),S(e),A()}),e.addEventListener("blur",()=>S(e))};Ae(St,()=>{P("title").fontId=St.value}),Ae(Et,()=>{P("body").fontId=Et.value}),Ae(ye,()=>{P("title").weight=Number(ye.value)}),Ae(be,()=>{P("body").weight=Number(be.value)});for(const e of t.querySelectorAll("[data-text-kind]"))e.addEventListener("click",()=>{const i=P(e.dataset.textKind==="body"?"body":"title"),d=e.dataset.textStyle,a=si.find(l=>l===e.dataset.textAlign);I(e),d==="bold"?i.weight=jo(i)?Uo:Rs:d?i[d]=!i[d]:a&&(i.align=a),S(e),A()});const vs=async()=>{var f;const e=document.createElement("canvas");n.code.trim()?await ko(e,Vn(await wn()),n.cardWidth,n.cardHeight):Lo(e,n,Lt);const i=1080,d=Math.max(n.cardWidth,n.cardHeight);if(d<=i)return e.toDataURL("image/png");const a=i/d,l=document.createElement("canvas");return l.width=Math.max(1,Math.round(n.cardWidth*a)),l.height=Math.max(1,Math.round(n.cardHeight*a)),(f=l.getContext("2d"))==null||f.drawImage(e,0,0,l.width,l.height),l.toDataURL("image/png")};(no=t.querySelector("#studio-set-baseline"))==null||no.addEventListener("click",()=>{(async()=>await Qe("현재 레이아웃을 초기화 기준으로 세팅하고 진행하시겠습니까?")&&(s.onSetBaseline(),Ut("초기화로 세팅하였습니다.")))()}),(io=t.querySelector("#studio-save-library"))==null||io.addEventListener("click",()=>{(async()=>{if(!await Qe("현재 카드를 그래픽 라이브러리에 추가하고 진행하시겠습니까?"))return;const i=await s.onAddToLibrary(await vs());Ut(i?"그래픽 라이브러리에 추가하였습니다.":"그래픽 라이브러리에 추가하지 못했습니다.")})()}),(oo=t.querySelector("#studio-reset"))==null||oo.addEventListener("click",()=>{S();const e=Xe(n),i=T;s.onReset(),(!$o(e,n)||i!==T)&&(ht.push(e),Ft.push(i),ht.length>xo&&(ht.shift(),Ft.shift()),de=[],Fe=[]),Ht()}),v.addEventListener("focus",()=>I(v)),v.addEventListener("input",()=>{P("title").text=v.value,A()}),v.addEventListener("blur",()=>S(v)),$.addEventListener("focus",()=>I($)),$.addEventListener("input",()=>{P("body").text=$.value,A()}),$.addEventListener("blur",()=>S($));const Tn=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>I(e)),e.addEventListener("change",()=>S(e)),e.addEventListener("input",()=>{const l=rt(e.value);l&&(d(l),i.value=l,A())}),i.addEventListener("focus",()=>I(i)),i.addEventListener("input",()=>{const l=rt(i.value);l&&(d(l),e.value=l,A())}),i.addEventListener("blur",()=>{rt(i.value)||(i.value=a()),S(i)})};Tn(mn,ve,e=>{n.color=e},()=>n.color),Tn(y,M,e=>{P("title").color=e},()=>P("title").color),Tn(F,j,e=>{P("body").color=e},()=>P("body").color);const Si=e=>{n.radius=ri(Number(e)),wi(),A()};U.addEventListener("pointerdown",()=>I(U)),U.addEventListener("keydown",()=>I(U)),U.addEventListener("pointerup",()=>S(U)),U.addEventListener("pointercancel",()=>S(U)),U.addEventListener("keyup",()=>S(U)),U.addEventListener("input",()=>Si(U.value)),at.addEventListener("focus",()=>I(at)),at.addEventListener("input",()=>Si(at.value)),at.addEventListener("blur",()=>S(at)),at.addEventListener("change",()=>S(at)),J.addEventListener("focus",()=>I(J)),J.addEventListener("input",()=>{n.code=J.value,A()}),J.addEventListener("blur",()=>S(J));const Ei=(e,i)=>{Object.assign(n,e),T=i,Ht(),A()};Se.addEventListener("click",()=>{Nt(!1),S();const e=ht.pop(),i=Ft.pop();if(!e||i===void 0){Ht();return}de.push(Xe(n)),Fe.push(T),Ei(e,i)}),yn.addEventListener("click",()=>{Nt(!1),S();const e=de.pop(),i=Fe.pop();if(!e||i===void 0){Ht();return}ht.push(Xe(n)),Ft.push(T),Ei(e,i)}),Ht(),(so=t.querySelector("#studio-tab-design"))==null||so.addEventListener("click",()=>In("design")),(ro=t.querySelector("#studio-tab-code"))==null||ro.addEventListener("click",()=>In("code")),(ao=t.querySelector(".studio__tabs"))==null||ao.addEventListener("keydown",e=>{var d;if(!(e instanceof KeyboardEvent)||e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();const i=n.panel==="design"?"code":"design";In(i),(d=t.querySelector(i==="design"?"#studio-tab-design":"#studio-tab-code"))==null||d.focus()});const Y=t.querySelector(".studio__themes"),yt=t.querySelector("#studio-theme-file"),xs=()=>[...t.querySelectorAll("[data-theme-slug]")],Li=()=>{Y&&(Y.innerHTML=us(o,Dt().src))},Mi=(e,i)=>{const d=e.dataset.themeSlug;d&&(I(e),bs(d,i),S(e))},_s=async e=>{const i=ts().find(d=>d.id===e);if(!(!i||!await Qe(`"${i.name}" 이미지를 테마에서 지울까요? 이 이미지를 쓰던 레이어는 테마 이미지로 바뀝니다.`))){if(!await fr(e)){Ut("이미지를 지우지 못했습니다.");return}Li(),A()}};Y==null||Y.addEventListener("click",e=>{const i=e.target instanceof Element?e.target:null,d=i==null?void 0:i.closest("[data-upload-remove]");if(d){_s(d.dataset.uploadRemove??"");return}if(i!=null&&i.closest("#studio-theme-add")){yt==null||yt.click();return}const a=i==null?void 0:i.closest("[data-theme-slug]");a&&Mi(a,!1)}),Y==null||Y.addEventListener("keydown",e=>{const i=e.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(i)||!(e.target instanceof Element&&e.target.matches("[data-theme-slug]")))return;e.preventDefault();const d=xs(),a=d.findIndex(g=>g===e.target),f=d[(a+(i==="ArrowLeft"||i==="ArrowUp"?-1:1)+d.length)%d.length];f&&Mi(f,!0)}),yt==null||yt.addEventListener("change",()=>{const e=[...yt.files??[]].filter(i=>i.type.startsWith("image/"));yt.value="",e.length!==0&&(async()=>{var d;const i=(await Promise.all(e.map(a=>hr(a)))).filter(a=>a!==null);i.length<e.length&&Ut("이미지를 저장하지 못했습니다."),i.length!==0&&(Li(),(d=t.querySelector("#studio-theme-add"))==null||d.focus())})()}),Y==null||Y.addEventListener("dragstart",e=>{const i=e.target instanceof Element?e.target.closest("[data-theme-slug]"):null,d=i==null?void 0:i.dataset.themeSlug;if(!i||!d||!e.dataTransfer)return;e.dataTransfer.setData(Fn,d),e.dataTransfer.effectAllowed="copy";const a=i.querySelector("img");a&&e.dataTransfer.setDragImage(a,a.width/2,a.height/2)}),(co=t.querySelector("#studio-copy"))==null||co.addEventListener("click",async()=>{const e=Ve(n,Wt,wt());Ee.textContent=e;try{await navigator.clipboard.writeText(e)}catch{const d=document.createElement("textarea");d.value=e,document.body.append(d),d.select(),document.execCommand("copy"),d.remove()}const i=t.querySelector("#studio-copy");i&&(i.textContent="복사됨",window.setTimeout(()=>{i.textContent="현재 디자인을 코드로 복사"},1200))}),(lo=t.querySelector("#studio-download"))==null||lo.addEventListener("click",()=>{(async()=>{const e=`ax-studio-${n.cardWidth}x${n.cardHeight}-${n.themeSlug||"theme"}.png`;if(!n.code.trim()){Mo(E,e);return}const i=document.createElement("canvas");await ko(i,Vn(await wn()),n.cardWidth,n.cardHeight),Mo(i,e)})()});const Q=e=>{const i=E.getBoundingClientRect();return{x:i.width>0?(e.clientX-i.left)/i.width*n.cardWidth:0,y:i.height>0?(e.clientY-i.top)/i.height*n.cardHeight:0}},qn=(e,i)=>{for(let a=lt.length-1;a>=0;a-=1){const l=lt[a];if(l&&e>=l.x-8&&i>=l.y-8&&e<=l.x+l.w+8&&i<=l.y+l.h+8)return l}return null},ws=e=>{const i=E.getContext("2d");if(!i)return;const d=E.getBoundingClientRect().width,a=d>0?n.cardWidth/d:1;i.save(),i.lineJoin="round",i.lineCap="round",i.strokeStyle="rgba(0, 0, 0, 0.7)",i.lineWidth=a*3,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.strokeStyle="rgba(255, 255, 255, 0.92)",i.lineWidth=a*1.5,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.restore()},$s=()=>{if(R)for(const e of lt)R.start.has(e.id)&&ws(e)},Ss=()=>{const e=E.getContext("2d"),i=L?ot(L.id):void 0,d=(i==null?void 0:i.kind)==="image"?Lt(i):null;if(!L||!d||!e)return;const{full:a,box:l}=L;e.save(),e.globalAlpha=.35,e.drawImage(d,a.x,a.y,a.w,a.h),e.globalAlpha=1,e.beginPath(),e.rect(l.x,l.y,l.w,l.h),e.clip(),e.drawImage(d,a.x,a.y,a.w,a.h),e.restore()};let R=null,tt=null,kt=null;const ut=new Map;let X=null,G=null,Cn=null,ki="";const Te=e=>({x:e.x,y:e.y,width:e.width}),te=(e,i,d)=>e.kind==="image"?{x:Oe(i,n.cardWidth,e.width),y:Oe(d,n.cardHeight,Mn(e))}:{x:on(i,n.cardWidth,e.size),y:on(d,n.cardHeight,e.size)},Ii=e=>{const i=new Map;for(const d of e){const a=ot(d);a&&i.set(d,{x:a.x,y:a.y})}return i},Wn=(e,i,d)=>{const a=(f,g)=>Math.abs(g)<Math.abs(f)?g:f,l=[];for(const[f,g]of e){const w=ot(f);w&&l.push({layer:w,from:g})}for(const{layer:f,from:g}of l){const w=te(f,g.x+i,g.y+d);i=a(i,w.x-g.x),d=a(d,w.y-g.y)}for(const{layer:f,from:g}of l){const w=te(f,g.x+i,g.y+d);f.x=w.x,f.y=w.y}},qe=(e,i)=>{e.width=i.width,e.x=Oe(i.x,n.cardWidth,e.width),e.y=Oe(i.y,n.cardHeight,Mn(e))},zn=e=>{for(let i=lt.length-1;i>=0;i-=1){const d=lt[i];if(!d||d.kind!=="image"||e.x<d.x||e.y<d.y||e.x>d.x+d.w||e.y>d.y+d.h)continue;const a=ot(d.id);if((a==null?void 0:a.kind)==="image")return a}return Dt()};H=()=>{for(const i of[...x])ot(i)||x.delete(i);lt=Lo(E,n,Lt,(K==null?void 0:K.id)??(L==null?void 0:L.id)),Ss(),$s(),Ie();const e=[...x].join(" ");e!==ki&&(ki=e,An(),_i(),t.querySelectorAll('input[type="range"]').forEach(bi))};const bt=(e,i,d)=>{e.style.left=`${i*it}px`,e.style.top=`${d*it}px`},Ce=()=>{const e=K?ot(K.id):void 0;return e&&Ne(e)?e:null},Es=()=>{const e=Ce();if(!e)return;const i=e.size*it,d=Math.max(16,i),a=i/d;bt(k,e.x,e.y),k.style.font=cs(e,d,wt()),k.style.textDecoration=e.underline?"underline":"none",k.style.lineHeight=`${Math.round(e.size*1.25)*it/a}px`,k.style.color=e.color,k.style.width=`${Math.max(1,n.cardWidth-ni*2)*it/a}px`,k.style.transform=`scale(${a})`,k.style.height="auto",k.style.height=`${k.scrollHeight}px`},We=new Map,Ls=()=>{const e=L&&!n.code.trim()?L:null;Jt.hidden=!e;for(const d of _n)d.hidden=!e;if(!e)return;const{box:i}=e;bt(Jt,i.x,i.y),Jt.style.width=`${i.w*it}px`,Jt.style.height=`${i.h*it}px`;for(const d of _n){const a=d.dataset.crop??"",l=a.includes("w")?i.x:a.includes("e")?i.x+i.w:i.x+i.w/2,f=a.includes("n")?i.y:a.includes("s")?i.y+i.h:i.y+i.h/2;bt(d,l,f)}},ee=()=>{const[e]=x.size===1?[...x]:[],i=e?ot(e):void 0;return(i==null?void 0:i.kind)==="image"?i:null};Ie=()=>{const e=!K&&!L&&!n.code.trim(),i=new Set;if(e)for(const f of x){const g=lt.find(C=>C.id===f);if(!g)continue;let w=We.get(f);w||(w=document.createElement("div"),w.className="studio__select-frame",gi.prepend(w),We.set(f,w)),bt(w,g.x,g.y),w.style.width=`${g.w*it}px`,w.style.height=`${g.h*it}px`,i.add(f)}for(const[f,g]of We)i.has(f)||(g.remove(),We.delete(f));const d=ee(),a=d?lt.find(f=>f.id===d.id):void 0,l=e&&!!a;for(const f of xn)f.hidden=!l;if(l&&a){const f=12/Math.max(it,.001),g=W=>Math.min(n.cardWidth-f,Math.max(f,W)),w=W=>Math.min(n.cardHeight-f,Math.max(f,W)),C=g(a.x+a.w/2),st=w(a.y+a.h/2);for(const W of xn){const et=W.dataset.handle;et==="top"?bt(W,C,w(a.y)):et==="bottom"?bt(W,C,w(a.y+a.h)):et==="left"?bt(W,g(a.x),st):bt(W,g(a.x+a.w),st)}}Ls(),Es()};for(const e of xn)e.addEventListener("pointerdown",i=>{const d=ee(),a=d?lt.find(et=>et.id===d.id):void 0;if(!d||!a)return;i.preventDefault();try{e.setPointerCapture(i.pointerId)}catch{}I(e);const l=e.dataset.handle,f=Te(d),g=a.h/Math.max(1,a.w),w=l==="right"?{x:a.x,y:a.y+a.h/2}:l==="left"?{x:a.x+a.w,y:a.y+a.h/2}:l==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},C=Q(i),st=et=>{if(et.pointerId!==i.pointerId)return;const Pe=Q(et),se=Pe.x-C.x,It=Pe.y-C.y,On=l==="right"?a.w+se:l==="left"?a.w-se:l==="bottom"?(a.h+It)/g:(a.h-It)/g;qe(d,Re(f,On,w.x,w.y)),H()},W=et=>{et.pointerId===i.pointerId&&(e.removeEventListener("pointermove",st),e.removeEventListener("pointerup",W),e.removeEventListener("pointercancel",W),S(e),A())};e.addEventListener("pointermove",st),e.addEventListener("pointerup",W),e.addEventListener("pointercancel",W)});const Ms=e=>{n.code.trim()||(K={id:e.id,original:e.text},x.clear(),x.add(e.id),I(k),k.value=e.text,k.hidden=!1,H(),k.focus(),k.setSelectionRange(k.value.length,k.value.length))},Rt=e=>{if(!K)return;const i=Ce();!e&&i&&(i.text=K.original),K=null,k.hidden=!0,H(),S(k),A()};k.addEventListener("input",()=>{const e=Ce();e&&(e.text=e.kind==="title"?k.value.replace(/\n/g," "):k.value,H(),An())}),k.addEventListener("keydown",e=>{var i;e.isComposing||(e.key==="Escape"?(e.preventDefault(),Rt(!1)):e.key==="Enter"&&(((i=Ce())==null?void 0:i.kind)==="title"||e.metaKey||e.ctrlKey)&&(e.preventDefault(),Rt(!0)))}),k.addEventListener("blur",()=>Rt(!0));const ks=(e,i)=>{const d=kt&&kt.id===e&&i.timeStamp-kt.time<400&&Math.hypot(i.clientX-kt.x,i.clientY-kt.y)<24,a=ot(e);if(d&&a&&Ne(a)){kt=null,Ms(a);return}kt={id:e,time:i.timeStamp,x:i.clientX,y:i.clientY}},Ai=new EventTarget,Ti=e=>{const i=e.target;i===E||i instanceof Element&&i.closest(".studio__handle--crop")||Nt(!0)},Is=e=>{!Lt(e)||n.code.trim()||(S(),x.clear(),x.add(e.id),L={id:e.id,full:Yo(e,Wt(e)),box:{x:e.x,y:e.y,w:e.width,h:Mn(e)}},I(Ai),document.addEventListener("pointerdown",Ti,!0),H())};function Nt(e){if(!L)return;const{id:i,full:d,box:a}=L;L=null,document.removeEventListener("pointerdown",Ti,!0);const l=ot(i);if(e&&(l==null?void 0:l.kind)==="image"){l.crop=Bs(d,a),l.width=ft(a.w);const f=te(l,a.x,a.y);l.x=f.x,l.y=f.y}S(Ai),A()}const qi=(e,i,d)=>{if(!L)return;e.preventDefault();try{i.setPointerCapture(e.pointerId)}catch{}const a=Q(e),l={...L.box},f=w=>{if(w.pointerId!==e.pointerId||!L)return;const C=Q(w),st=C.x-a.x,W=C.y-a.y;L.box=d?Us(L.full,l,d,st,W):js(L.full,l,st,W),H()},g=w=>{w.pointerId===e.pointerId&&(i.removeEventListener("pointermove",f),i.removeEventListener("pointerup",g),i.removeEventListener("pointercancel",g))};i.addEventListener("pointermove",f),i.addEventListener("pointerup",g),i.addEventListener("pointercancel",g)};for(const e of _n)e.addEventListener("pointerdown",i=>qi(i,e,e.dataset.crop??null));const ze=e=>{S();const i=new EventTarget;I(i),e(),S(i),A()},Ci=()=>{const e=zt();e.length>0&&(le=structuredClone(e))},Wi=e=>{le.length!==0&&ze(()=>{const i=structuredClone(le),d=e?e.x-Math.min(...i.map(l=>l.x)):wo,a=e?e.y-Math.min(...i.map(l=>l.y)):wo;x.clear();for(const l of i){l.id=sn();const f=te(l,l.x+d,l.y+a);l.x=f.x,l.y=f.y,x.add(l.id)}n.layers.push(...i)})},As=e=>{const i=zt();i.length!==0&&ze(()=>{const d=n.layers.filter(a=>!x.has(a.id));n.layers=e?[...d,...i]:[...i,...d]})},Dn=e=>["title","body","image"].every(i=>!e.some(d=>d.kind===i)||n.layers.some(d=>d.kind===i&&!x.has(d.id))),zi=()=>{const e=zt();e.length===0||!Dn(e)||ze(()=>{n.layers=n.layers.filter(i=>!x.has(i.id)),x.clear()})};Ye==null||Ye.remove();const Di=e=>ae?`⌘${e}`:`Ctrl+${e}`,Ts=[{action:"copy",label:"복사",hint:Di("C")},{action:"paste",label:"붙여넣기",hint:Di("V")},{action:"front",label:"맨 위로 보내기"},{action:"back",label:"맨 밑으로 보내기"},{action:"crop",label:"크롭하기"},{action:"delete",label:"삭제",hint:ae?"⌫":"Delete"}],O=document.createElement("div");O.className="nav-popover studio-menu",O.setAttribute("role","menu"),O.setAttribute("aria-label","객체 메뉴"),O.hidden=!0,O.innerHTML=Ts.map(e=>`<button type="button" class="nav-popover__item" role="menuitem" data-layer-action="${e.action}">${e.label}${e.hint?`<span class="studio-menu__hint">${e.hint}</span>`:""}</button>`).join(""),document.body.append(O),Ye=O;let Hi=null;const Hn=e=>O.querySelector(`[data-layer-action="${e}"]`),Pi=()=>[...O.querySelectorAll("[data-layer-action]")].filter(e=>!e.hidden&&!e.disabled),Oi=e=>{e.target instanceof Node&&O.contains(e.target)||ne()};function ne(){O.hidden||(document.activeElement instanceof HTMLElement&&O.contains(document.activeElement)&&document.activeElement.blur(),O.hidden=!0,document.removeEventListener("pointerdown",Oi,!0))}const Ri=(e,i)=>{var se;const d=Q({clientX:e,clientY:i}),a=qn(d.x,d.y);a?x.has(a.id)||(x.clear(),x.add(a.id)):x.clear(),Hi=d,H();const l=zt(),f=(It,On)=>{const ho=Hn(It);ho&&(ho.disabled=!On)};f("copy",l.length>0),f("paste",le.length>0),f("front",l.length>0),f("back",l.length>0);const g=Hn("crop");if(g){g.hidden=!ee();const It=ee();g.disabled=!It||!Lt(It)}const w=Hn("delete");w&&(w.disabled=l.length===0||!Dn(l),w.title=l.length>0&&w.disabled?"타이틀·본문·이미지는 하나씩 남아 있어야 합니다.":""),O.hidden=!1;const C=8,{width:st,height:W}=O.getBoundingClientRect(),et=e+st+C>window.innerWidth?e-st:e,Pe=i+W+C>window.innerHeight?i-W:i;O.style.left=`${Math.max(C,et)}px`,O.style.top=`${Math.max(C,Pe)}px`,document.addEventListener("pointerdown",Oi,!0),(se=Pi()[0])==null||se.focus({preventScroll:!0})};O.addEventListener("click",e=>{const i=e.target instanceof Element?e.target.closest("[data-layer-action]"):null;if(!i||i.disabled)return;const d=Hi;ne();const a=i.dataset.layerAction;if(a==="copy")Ci();else if(a==="paste")Wi(d);else if(a==="front"||a==="back")As(a==="front");else if(a==="delete")zi();else if(a==="crop"){const l=ee();l&&Is(l)}}),O.addEventListener("keydown",e=>{var l;if(e.key==="Escape"||e.key==="Tab"){e.preventDefault(),ne();return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const i=Pi(),d=i.indexOf(document.activeElement),a=e.key==="ArrowDown"?1:-1;(l=i[(d+a+i.length)%i.length])==null||l.focus()}),B.addEventListener("scroll",ne);const ie=()=>{G&&window.clearTimeout(G.timer),G=null},qs=e=>{ie();const{clientX:i,clientY:d,pointerId:a}=e;G={timer:window.setTimeout(()=>{G=null,(R==null?void 0:R.pointerId)===a&&(Wn(R.start,0,0),R=null,delete E.dataset.dragging,S(E)),tt=null,Ri(i,d)},Nr),pointerId:a,x:i,y:d}},Ni=()=>{const[e,i]=[...ut.values()];return!e||!i?null:{distance:Math.hypot(i.x-e.x,i.y-e.y),mid:Q({clientX:(e.x+i.x)/2,clientY:(e.y+i.y)/2})}},Cs=()=>{const e=Ni();if(!e)return;ie(),R=null,tt=null,delete E.dataset.dragging,I(E);const i=zn(e.mid);X={...e,layerId:i.id,image:Te(i)},H()};E.addEventListener("pointerdown",e=>{var l;if(n.code.trim())return;const i=e.pointerType==="mouse";if(i&&(e.button!==0||ae&&e.ctrlKey))return;if((l=window.getSelection())==null||l.removeAllRanges(),ne(),K&&Rt(!0),L){const f=Q(e),{box:g}=L;f.x>=g.x&&f.y>=g.y&&f.x<=g.x+g.w&&f.y<=g.y+g.h?qi(e,E,null):Nt(!0);return}if(e.pointerType==="touch"){ut.set(e.pointerId,{x:e.clientX,y:e.clientY});try{E.setPointerCapture(e.pointerId)}catch{}if(ut.size===2&&$n()){Cs();return}if(ut.size>1)return;qs(e)}const d=Q(e),a=qn(d.x,d.y);if(i?e.shiftKey?a&&x.has(a.id)?x.delete(a.id):a&&x.add(a.id):a?x.has(a.id)||(x.clear(),x.add(a.id)):x.clear():(x.clear(),a&&x.add(a.id)),!a||i&&!x.has(a.id)){tt=null,H();return}tt={x:e.clientX,y:e.clientY,moved:!1,shift:e.shiftKey};try{E.setPointerCapture(e.pointerId)}catch{}I(E),R={id:a.id,origin:d,start:Ii(i?x:[a.id]),pointerId:e.pointerId},E.dataset.dragging="true",H()}),E.addEventListener("contextmenu",e=>{e.preventDefault(),!(n.code.trim()||L)&&(ie(),K&&Rt(!0),Ri(e.clientX,e.clientY))}),E.addEventListener("pointermove",e=>{if(ut.has(e.pointerId)&&ut.set(e.pointerId,{x:e.clientX,y:e.clientY}),(G==null?void 0:G.pointerId)===e.pointerId&&Math.hypot(e.clientX-G.x,e.clientY-G.y)>8&&ie(),X){const d=ut.has(e.pointerId)?Ni():null,a=ot(X.layerId);if(!d||(a==null?void 0:a.kind)!=="image")return;const l=d.distance/Math.max(1,X.distance),f=Re(X.image,X.image.width*l,X.mid.x,X.mid.y);qe(a,{x:f.x+d.mid.x-X.mid.x,y:f.y+d.mid.y-X.mid.y,width:f.width}),H();return}tt&&Math.hypot(e.clientX-tt.x,e.clientY-tt.y)>6&&(tt.moved=!0);const i=Q(e);if(Cn=i,!R||R.pointerId!==e.pointerId){E.dataset.hover=qn(i.x,i.y)?"true":"false";return}Wn(R.start,i.x-R.origin.x,i.y-R.origin.y),H()}),E.addEventListener("pointerleave",()=>{Cn=null});const Bi=e=>{if(ut.delete(e.pointerId),(G==null?void 0:G.pointerId)===e.pointerId&&ie(),X){ut.size<2&&(X=null,S(E),A());return}if(!R||R.pointerId!==e.pointerId)return;const i=R.id;R=null,delete E.dataset.dragging,S(E),e.type==="pointerup"&&tt&&!tt.moved&&!tt.shift&&(x.size>1&&(x.clear(),x.add(i)),ks(i,e)),tt=null,H()};E.addEventListener("pointerup",Bi),E.addEventListener("pointercancel",Bi);const Fi=new EventTarget;let Ui=0;E.addEventListener("wheel",e=>{if(!ae||!e.ctrlKey||n.code.trim()||L||!$n())return;e.preventDefault(),I(Fi);const i=Q(e),d=zn(i);qe(d,Re(Te(d),d.width*Math.exp(-e.deltaY*.01),i.x,i.y)),H(),window.clearTimeout(Ui),Ui=window.setTimeout(()=>{S(Fi),A()},250)},{passive:!1}),B.addEventListener("wheel",e=>{if(!(ae?e.metaKey:e.ctrlKey))return;e.preventDefault();const i=e.deltaMode===WheelEvent.DOM_DELTA_LINE?e.deltaY*33:e.deltaY;T=Math.min(Bn,Math.max(Nn,T*Math.exp(-i*.002))),Mt()},{passive:!1});const ji=new EventTarget;let oe=null;E.addEventListener("gesturestart",e=>{if(e.preventDefault(),X||n.code.trim()||L||!$n())return;I(ji);const i=Q(e),d=zn(i);oe={layerId:d.id,image:Te(d),anchor:i}}),E.addEventListener("gesturechange",e=>{if(e.preventDefault(),!oe||X)return;const{layerId:i,image:d,anchor:a}=oe,l=ot(i);(l==null?void 0:l.kind)==="image"&&(qe(l,Re(d,d.width*e.scale,a.x,a.y)),H())}),E.addEventListener("gestureend",e=>{e.preventDefault(),oe&&(oe=null,S(ji),A())}),B.addEventListener("pointerdown",e=>{e.target===E||x.size===0||e.target instanceof Element&&e.target.closest(".studio__handle")||(x.clear(),H())});const Ws=async(e,i)=>{const d=Me(e),a=d?await ti(d).catch(()=>null):null,l=a&&a.naturalWidth>0?a.naturalHeight/a.naturalWidth:1;K&&Rt(!0),L&&Nt(!0),ze(()=>{const f=ft(n.cardWidth/2),g={id:sn(),kind:"image",src:e,x:0,y:0,width:f,crop:null};Object.assign(g,te(g,i.x-f/2,i.y-f*l/2)),n.layers.push(g),x.clear(),x.add(g.id)})},Ki=e=>{var i;return!n.code.trim()&&!!((i=e.dataTransfer)!=null&&i.types.includes(Fn))};B.addEventListener("dragover",e=>{Ki(e)&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),B.dataset.dropping="true")}),B.addEventListener("dragleave",e=>{e.relatedTarget instanceof Node&&B.contains(e.relatedTarget)||delete B.dataset.dropping}),B.addEventListener("drop",e=>{var d;if(delete B.dataset.dropping,!Ki(e))return;const i=(d=e.dataTransfer)==null?void 0:d.getData(Fn);i&&(e.preventDefault(),Ws(i,Q(e)))}),Y==null||Y.addEventListener("dragend",()=>delete B.dataset.dropping);const De=e=>{const i=Le.getBoundingClientRect().width,d=Yt+Gn+Zn,a=Number.isFinite(e)?e:n.controlsWidth;n.controlsWidth=i>=d?Ps(a,i):Math.max(Yt,Math.round(a)),Le.style.setProperty("--studio-controls-width",`${n.controlsWidth}px`),V.setAttribute("aria-valuenow",String(n.controlsWidth)),V.setAttribute("aria-valuemax",String(i>=d?Math.max(Yt,Math.round(i)-Gn-Zn):n.controlsWidth)),Mt()};De(n.controlsWidth);const vt=t.querySelector("#studio-device"),Yi=[...t.querySelectorAll(".studio-devices__btn")],Xi=t.querySelector("#studio-device-thumb"),Gi=vt==null?void 0:vt.parentElement,Pn=vt&&Xi&&Gi?Io(vt,Xi,Gi):null,He=()=>{if(!vt)return;const e=ds();vt.dataset.device=e,vt.dataset.framed=e===hi()?"false":"true";for(const i of Yi)i.setAttribute("aria-pressed",i.dataset.device===e?"true":"false");De(n.controlsWidth),Pn==null||Pn()};He();for(const e of Yi)e.addEventListener("click",()=>{tn=e.dataset.device,He()});Ue==null||Ue();const Zi=[window.matchMedia(rs),window.matchMedia(as)];for(const e of Zi)e.addEventListener("change",He);Ue=()=>{for(const e of Zi)e.removeEventListener("change",He)},je==null||je();const Ji=e=>{if(!(e.metaKey||e.ctrlKey)||e.altKey)return;const i=e.code==="KeyZ"&&e.shiftKey||e.code==="KeyY"&&e.ctrlKey&&!e.shiftKey;if(!(e.code==="KeyZ"&&!e.shiftKey)&&!i)return;const a=i?yn:Se;if(!a.isConnected||a.disabled)return;const l=e.target;l instanceof HTMLElement&&(l.isContentEditable||l.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"))||(e.preventDefault(),a.click())};document.addEventListener("keydown",Ji),je=()=>document.removeEventListener("keydown",Ji),Ke==null||Ke();const Vi=new EventTarget;let Qi=0;const zs={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}},to=e=>{var C;if(!E.isConnected)return;const i=(e.metaKey||e.ctrlKey)&&!e.altKey,d=i?e.code==="Equal"||e.code==="NumpadAdd"?$e:e.code==="Minus"||e.code==="NumpadSubtract"?we:null:null;if(d){e.preventDefault(),d.click();return}const a=e.target,l=a===document.body||a instanceof Node&&B.contains(a);if(K||n.code.trim())return;const f=a instanceof HTMLElement&&(a.isContentEditable||a.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button], [type=file])"));if(!i&&!L&&!f&&(e.key==="Delete"||e.key==="Backspace")&&x.size>0){e.preventDefault(),Dn(zt())?zi():Ut("타이틀·본문·이미지는 하나씩 남아 있어야 합니다.");return}if(i&&!L){if(f||(C=window.getSelection())!=null&&C.toString())return;e.code==="KeyC"&&x.size>0?(e.preventDefault(),Ci()):e.code==="KeyV"&&le.length>0&&(e.preventDefault(),Wi(Cn));return}if(!l)return;if(L){if(e.key!=="Enter"&&e.key!=="Escape")return;e.preventDefault(),Nt(e.key==="Enter");return}if(i)return;const g=zs[e.key];if(!g||e.altKey||x.size===0)return;e.preventDefault();const w=e.shiftKey?Or:Pr;I(Vi),Wn(Ii(x),g.x*w,g.y*w),Se.disabled=!1,H(),window.clearTimeout(Qi),Qi=window.setTimeout(()=>{S(Vi),A()},400)};document.addEventListener("keydown",to),Ke=()=>document.removeEventListener("keydown",to),V.addEventListener("pointerdown",e=>{if(Le.getBoundingClientRect().width<768)return;try{V.setPointerCapture(e.pointerId)}catch{}const i=e.clientX,d=n.controlsWidth,a=f=>{f.pointerId===e.pointerId&&De(d+f.clientX-i)},l=f=>{f.pointerId===e.pointerId&&(V.removeEventListener("pointermove",a),V.removeEventListener("pointerup",l),V.removeEventListener("pointercancel",l))};V.addEventListener("pointermove",a),V.addEventListener("pointerup",l),V.addEventListener("pointercancel",l)}),V.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const i=e.shiftKey?48:16;De(n.controlsWidth+(e.key==="ArrowRight"?i:-i))}),(uo=t.querySelector("#studio-controls"))==null||uo.addEventListener("submit",e=>{e.preventDefault()}),ue==null||ue.disconnect(),ue=new ResizeObserver(()=>Mt()),ue.observe(B),A()}const hs="ax-design-studio-mode",Co="./data/index.json";let nt={status:"loading"},un=dn(),fs="all",q=null,Ge=null,en=null,N=Qn();function ei(){const t=localStorage.getItem(hs);return t==="light"||t==="dark"?t:"dark"}function Wo(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(hs,t)}function Un(t,n,o){return`<a class="nav-link${o?" nav-link--current":""}" href="${n}" ${o?'aria-current="page"':""}>${t}</a>`}function Vr(){return`
    <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.8-1.4-2-3.4-2.2.7a8 8 0 0 0-1.9-1.1L14.6 3h-5.2l-.55 2.7a8 8 0 0 0-1.9 1.1l-2.2-.7-2 3.4 1.8 1.4a7.7 7.7 0 0 0 .05 2.2l-1.8 1.4 2 3.4 2.2-.7a8 8 0 0 0 1.9 1.1l.55 2.7h5.2l.55-2.7a8 8 0 0 0 1.9-1.1l2.2.7 2-3.4-1.8-1.4Z" />
    </svg>
  `}function Qr(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function fi(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),n=ci(t);return n?me(n.r,n.g,n.b):rt(t)??me(216,241,255)}function he(t,n){return n.some(o=>o.slug===t)?t:null}function ta(t,n,o){var r,u,c;const s=t?he(t,o):null;if(n&&n!==en){const m=Vo().find(p=>p.id===n),h=m?Xo(structuredClone(m.state)):null;if(h)return q=h,he(q.themeSlug,o)||(q.themeSlug=((r=o[0])==null?void 0:r.slug)??""),en=n,Ge=t,q}if(n||(en=null),!q){const m=Jo();return q=m?structuredClone(m):hn(s??he(Po,o)??((u=o[0])==null?void 0:u.slug)??"",fi()),m&&s&&mo(q,s),m&&!he(q.themeSlug,o)&&(q.themeSlug=s??((c=o[0])==null?void 0:c.slug)??""),Ge=t,q}return t&&t!==Ge&&s&&(mo(q,s),Ge=t),q}function ea(t){const n=ei(),o=n==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=N.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${Un("Graphic Library",mt({name:"archive"}),N.name==="archive"||N.name==="capture")}
        ${Un("Online Marketing Studio",mt({name:"studio",theme:null,card:null}),N.name==="studio")}
        ${Un("History",mt({name:"history"}),N.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${o}" title="${o}">
          ${Qr(n)}
        </button>
        <div class="nav-settings">
          <button type="button" class="button button--secondary" id="nav-settings" aria-label="설정" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-settings-menu">
            ${Vr()}
          </button>
          <div class="nav-popover" id="nav-settings-menu" role="menu" hidden>
            <button type="button" class="nav-popover__item" id="nav-reset" role="menuitem">리셋</button>
          </div>
        </div>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${t}</main>
  `}function na(){if(nt.status==="loading")return`
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
    `;const t=nt.index;switch(N.name){case"archive":return _r(t,un,fs,Vo());case"capture":return Wr(t,N.slug,un);case"studio":return Zr(ta(N.theme,N.card,t.captures),t.captures);case"history":return Dr(t);case"notfound":return Hr(N.path)}}function pt(){var n,o;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Wo(ei()),un=dn(),t.innerHTML=ea(na()),(n=t.querySelector("#index-retry"))==null||n.addEventListener("click",()=>{ps()}),(o=t.querySelector("#mode-toggle"))==null||o.addEventListener("click",()=>{Wo(ei()==="dark"?"light":"dark"),pt()}),ia(t),nt.status==="ready"&&(N.name==="archive"&&wr(t,{onTabChange:s=>{var r;fs=s,pt(),(r=document.querySelector(`[data-archive-tab="${s}"]`))==null||r.focus()}}),N.name==="capture"&&zr(t,s=>{un=er(s),pt()}),N.name==="studio"&&nt.status==="ready"&&q&&Jr(t,q,nt.index.captures,{onReset:()=>{var s;q&&(Gs(q,Jo(),fi()),pt(),(s=document.querySelector("#studio-reset"))==null||s.focus())},onSetBaseline:()=>{q&&nr(structuredClone(q))},onAddToLibrary:s=>q?ar(q,s).then(r=>r!==null):Promise.resolve(!1)}))}function ia(t){var m;const n=t.querySelector("#nav-settings"),o=t.querySelector("#nav-settings-menu"),s=t.querySelector(".nav-settings");if(!n||!o||!s)return;const r=()=>{o.hidden=!0,n.setAttribute("aria-expanded","false"),document.removeEventListener("click",u),document.removeEventListener("keydown",c)},u=h=>{h.target instanceof Node&&s.contains(h.target)||r()},c=h=>{h.key==="Escape"&&r()};n.addEventListener("click",h=>{if(h.stopPropagation(),!o.hidden){r();return}o.hidden=!1,n.setAttribute("aria-expanded","true"),document.addEventListener("click",u),document.addEventListener("keydown",c)}),(m=t.querySelector("#nav-reset"))==null||m.addEventListener("click",()=>{r(),(async()=>{if(await Qe("세팅한 초기화 기준을 지우고 진행하시겠습니까?")){if(ir(),en=null,q){const p=nt.status==="ready"?nt.index.captures:[],_=he(Po,p)??q.themeSlug;q=hn(_,fi())}N.name==="studio"&&N.card&&(N={name:"studio",theme:null,card:null},history.replaceState(null,"",mt(N))),pt(),Ut("리셋하였습니다.")}})()})}async function oa(){const t=await fetch(`${Co}?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)throw new Error(`${Co} → HTTP ${t.status}`);const n=await t.text();if(n.trimStart().startsWith("<"))throw new Error("index.json 대신 HTML이 왔습니다. 데이터 빌드가 끝나는 중일 수 있습니다.");const o=JSON.parse(n);if(!o||!Array.isArray(o.captures)||!o.facets)throw new Error("Index JSON is missing captures or facets");return o}async function ps(){nt={status:"loading"},pt();let t;for(let n=0;n<20;n+=1)try{const o=await oa();await Promise.all([rr(),ur()]),nt={status:"ready",index:o},pt();return}catch(o){t=o,await new Promise(s=>window.setTimeout(s,400))}nt={status:"error",message:t instanceof Error?t.message:String(t)},pt()}pr(t=>{if(ss(window.location.hash)){window.location.replace(mt({name:"studio",theme:null,card:null}));return}N=t,pt()});ps();
