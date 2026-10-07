(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const u of r)if(u.type==="childList")for(const l of u.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const u={};return r.integrity&&(u.integrity=r.integrity),r.referrerPolicy&&(u.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?u.credentials="include":r.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(r){if(r.ep)return;r.ep=!0;const u=o(r);fetch(r.href,u)}})();const Nn="ig-feed-square",Fn=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function Mt(t){return Fn.find(n=>n.id===t)??Fn[0]}const ce=0,Ye=120,Ss=28,bt=100,Et=4e3,Bn=5,Vn=10,kt=100,Un=4e3,Ft=240,ko=360,jn=280,Kn=6,Io="Hello",Ao=`헤르메스의 대표 브랜드 에셋입니다.
에이전트의 그래픽 결과물을 합성하였습니다.`,To="black-mountain-red-horizon",Qn=100,ti=32,qo=71,Co=99,zo=77,Wo=209,Qe=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],co="rgb(0, 0, 0)",lo="rgb(255, 255, 255)";function ei(t){return Number.isFinite(t)?Math.min(Ye,Math.max(ce,Math.round(t))):ce}function at(t){return Number.isFinite(t)?Math.min(Et,Math.max(bt,Math.round(t))):bt}function Es(t,n,o){const s=Math.max(1,Math.round(t)),u=Math.max(1,Math.round(n))/s;let l=at(o);const m=Math.round(l*u);let h=at(m);return m!==h&&(l=at(Math.round(h/u)),h=at(Math.round(l*u))),{cardWidth:l,cardHeight:h}}function ni(t){return Math.max(Bn,at(t)-Vn*2)}function Bt(t,n){const o=ni(n);return Number.isFinite(t)?Math.min(o,Math.max(Bn,Math.round(t))):Bn}function ht(t){return Number.isFinite(t)?Math.min(Un,Math.max(kt,Math.round(t))):kt}function vt(t){return Math.round(t*2)/2}function tn(t,n,o){const s=Math.max(0,Math.round(n)-Math.min(Math.max(o,0),Math.round(n)));return Number.isFinite(t)?Math.min(s,Math.max(0,vt(t))):0}function De(t,n,o){const s=Math.round(-o+40),r=Math.round(n-40);return Number.isFinite(t)?s>r?Math.round((n-o)/2):Math.min(r,Math.max(s,vt(t))):0}function He(t,n,o,s){const r=ht(n),u=r/Math.max(1,t.width);return{x:Math.round(o-(o-t.x)*u),y:Math.round(s-(s-t.y)*u),width:r}}function Ls(t,n){const o=Math.max(Ft,Math.round(n)-jn-Kn);return Number.isFinite(t)?Math.min(o,Math.max(Ft,Math.round(t))):ko}function Ms(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function Ut(t,n=[]){var s;const o=Qe.find(r=>r.id===t);return o?o.stack:((s=n.find(r=>r.id===t))==null?void 0:s.stack)??Qe[0].stack}function Xe(t,n,o=Mt(Nn).width,s=Mt(Nn).height){if(t==="image")return{id:"image",kind:t,src:n,x:0,y:0,width:ht(o),crop:null};const r=t==="title",u=Bt(r?Qn:ti,o);return{id:t,kind:t,text:r?Io:Ao,x:tn(r?qo:zo,o,u),y:tn(r?Co:Wo,s,u),size:u,fontId:r?"montserrat":"pretendard",color:le(0,0,0)}}function dn(t,n){const o=Mt(Nn);return{presetId:o.id,cardWidth:o.width,cardHeight:o.height,themeSlug:t,color:n,radius:Ss,code:"",panel:"design",controlsWidth:ko,layers:[Xe("image",t),Xe("body",t),Xe("title",t)]}}function en(){return`layer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function Pe(t){return t.kind!=="image"}const Do="upload:";function ks(t){return t.startsWith(Do)}function uo(t,n){t.themeSlug=n;const o=nn(t,"image");o&&(o.src=n)}function nn(t,n){return t.layers.find(o=>o.kind===n)}function G(t,n){const o=t.layers.find(r=>r.kind===n);if(o)return o;const s=Xe(n,t.themeSlug,t.cardWidth,t.cardHeight);return s.id=en(),n==="image"?t.layers.unshift(s):t.layers.push(s),s}function ii(t,n){const o=t.crop;return o?t.width*n*o.h/o.w:t.width*n}function Ho(t,n){const o=t.crop??{x:0,y:0,w:1},s=t.width/o.w,r=s*n;return{x:t.x-o.x*s,y:t.y-o.y*r,w:s,h:r}}function Is(t,n){const o={x:(n.x-t.x)/t.w,y:(n.y-t.y)/t.h,w:n.w/t.w,h:n.h/t.h},s=(r,u)=>Math.abs(r-u)<.001;return s(o.x,0)&&s(o.y,0)&&s(o.w,1)&&s(o.h,1)?null:o}const As=20;function Rt(t,n,o){return Math.min(Math.max(t,n),Math.max(n,o))}function Ts(t,n,o,s,r){const u=Math.min(kt,t.w),l=Math.min(As,t.h);let m=n.x,h=n.y,f=n.x+n.w,w=n.y+n.h;return o.includes("w")&&(m=Rt(m+s,t.x,f-u)),o.includes("e")&&(f=Rt(f+s,m+u,t.x+t.w)),o.includes("n")&&(h=Rt(h+r,t.y,w-l)),o.includes("s")&&(w=Rt(w+r,h+l,t.y+t.h)),{x:m,y:h,w:f-m,h:w-h}}function qs(t,n,o,s){return{...n,x:Rt(n.x+o,t.x,t.x+t.w-n.w),y:Rt(n.y+s,t.y,t.y+t.h-n.h)}}function Cs(t,n,o){if(!t||typeof t!="object")return null;const s=t,r=h=>typeof h=="number"&&Number.isFinite(h)?h:null,u=typeof s.id=="string"&&s.id?s.id:en(),l=r(s.x)??0,m=r(s.y)??0;if(s.kind==="image"){const h=s.crop,f=r(h==null?void 0:h.x),w=r(h==null?void 0:h.y),v=r(h==null?void 0:h.w),b=r(h==null?void 0:h.h);return{id:u,kind:"image",src:typeof s.src=="string"&&s.src?s.src:o,x:l,y:m,width:ht(r(s.width)??kt),crop:f!==null&&w!==null&&v&&b?{x:f,y:w,w:v,h:b}:null}}return s.kind!=="title"&&s.kind!=="body"?null:{id:u,kind:s.kind,text:typeof s.text=="string"?s.text:"",x:l,y:m,size:r(s.size)??(s.kind==="title"?Qn:ti),fontId:typeof s.fontId=="string"&&s.fontId?s.fontId:"pretendard",color:st(String(s.color??""))??n}}function zs(t,n,o){const s=(l,m)=>typeof l=="number"&&Number.isFinite(l)?l:m,r=(l,m)=>typeof l=="string"?l:m,u=r(t.fontId,"pretendard");return[{id:"image",kind:"image",src:o,x:s(t.imageX,0),y:s(t.imageY,0),width:ht(s(t.imageWidth,kt)),crop:null},{id:"body",kind:"body",text:r(t.body,Ao),x:s(t.bodyX,zo),y:s(t.bodyY,Wo),size:s(t.bodySize,ti),fontId:r(t.bodyFontId,u)||u,color:st(r(t.bodyColor,""))??n},{id:"title",kind:"title",text:r(t.title,Io),x:s(t.titleX,qo),y:s(t.titleY,Co),size:s(t.titleSize,Qn),fontId:r(t.titleFontId,u)||u,color:st(r(t.titleColor,""))??n}]}function Po(t){if(!t||typeof t!="object")return null;const n=t;if(typeof n.themeSlug!="string"||typeof n.color!="string")return null;const o=(l,m)=>typeof l=="number"&&Number.isFinite(l)?l:m,s=dn(n.themeSlug,n.color),r=Yn(n.color),u={...s,presetId:typeof n.presetId=="string"?n.presetId:s.presetId,cardWidth:at(o(n.cardWidth,s.cardWidth)),cardHeight:at(o(n.cardHeight,s.cardHeight)),radius:ei(o(n.radius,s.radius)),code:typeof n.code=="string"?n.code:"",panel:n.panel==="code"?"code":"design",controlsWidth:o(n.controlsWidth,s.controlsWidth),layers:Array.isArray(n.layers)?n.layers.map(l=>Cs(l,r,n.themeSlug)).filter(l=>l!==null):zs(n,r,n.themeSlug)};return G(u,"image"),G(u,"body"),G(u,"title"),u}function Ws(t,n){const o=dn(t.themeSlug,n);o.controlsWidth=t.controlsWidth,o.panel=t.panel,Object.assign(t,o)}function Ds(t,n,o){if(!n){Ws(t,o);return}Object.assign(t,structuredClone(n))}function st(t){const n=t.trim().match(/^#([0-9a-fA-F]{6})$/);return n?`#${n[1].toLowerCase()}`:null}function le(t,n,o){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(t)}${s(n)}${s(o)}`}function oi(t){const n=st(t);if(n)return{r:Number.parseInt(n.slice(1,3),16),g:Number.parseInt(n.slice(3,5),16),b:Number.parseInt(n.slice(5,7),16)};const o=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return o?{r:Number(o[1]),g:Number(o[2]),b:Number(o[3])}:null}function Ht(t){const n=t/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function ho(t,n){const o=.2126*Ht(t.r)+.7152*Ht(t.g)+.0722*Ht(t.b),s=.2126*Ht(n.r)+.7152*Ht(n.g)+.0722*Ht(n.b),r=Math.max(o,s),u=Math.min(o,s);return(r+.05)/(u+.05)}function Yn(t){const n=oi(Oo(t));return n?le(n.r,n.g,n.b):le(0,0,0)}function Oo(t){const n=oi(t)??{r:255,g:255,b:255},o=ho({r:0,g:0,b:0},n),s=ho({r:255,g:255,b:255},n);return o>=4.5&&o>=s?co:s>=4.5?lo:o>=s?co:lo}function Hs(t,n,o){if(n<=0)return[];const s=[];for(const r of t.split(`
`)){const u=r.split(/\s+/).filter(Boolean);if(u.length===0){s.push("");continue}let l="";const m=h=>{if(o(h)<=n){l=h;return}let f="";for(const w of h){const v=f+w;o(v)<=n?f=v:(f&&s.push(f),f=w)}l=f};for(const h of u){const f=l?`${l} ${h}`:h;o(f)<=n?l=f:(l&&s.push(l),m(h))}l&&s.push(l)}return s}function Nt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ps(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Os(t,n){return Ps(t).replaceAll("{{title}}",Nt(n.title)).replaceAll("{{body}}",Nt(n.body)).replaceAll("{{themeImage}}",Nt(n.themeImage)).replace(/\{\{image:([^}]+)\}\}/g,(s,r)=>{var u;return Nt(((u=n.images)==null?void 0:u[r])??"")})}function Ze(t,n=1,o=[]){const s=f=>typeof n=="number"?n:n(f),r=f=>`${Math.round(f*100)/100}px`,u=nn(t,"title"),l=nn(t,"body"),m=[],h=[];return t.layers.forEach((f,w)=>{const v=`layer-${w+1}`,b=`left: ${r(f.x)}; top: ${r(f.y)};`;if(f.kind==="image"){const z=f.src===t.themeSlug?"{{themeImage}}":`{{image:${Nt(f.src)}}}`,$=s(f);if(f.crop){const N=Ho(f,$);m.push(`  <div class="studio-crop ${v}"><img src="${z}" alt="" /></div>`),h.push(`  .studio-card .${v} { ${b} width: ${r(f.width)}; height: ${r(ii(f,$))}; }`),h.push(`  .studio-card .${v} img { left: ${r(N.x-f.x)}; top: ${r(N.y-f.y)}; width: ${r(N.w)}; }`)}else m.push(`  <img class="${v}" src="${z}" alt="" />`),h.push(`  .studio-card .${v} { ${b} width: ${r(f.width)}; }`);return}const M=f.kind==="title"?"h1":"p",D=f===u?"{{title}}":f===l?"{{body}}":Nt(f.text);m.push(`  <${M} class="${v}">${D}</${M}>`),h.push(`  .studio-card .${v} { ${b} font-size: ${r(f.size)}; font-family: ${Ut(f.fontId,o)}; color: ${f.color}; }`)}),`<article class="studio-card">
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
  .studio-card h1 { font-weight: 600; }
  .studio-card p { font-weight: 400; }
${h.join(`
`)}
</style>`}function Xn(t){const n=st(t.color)??t.color,o=Oo(n),s=st(t.titleColor)??Yn(n),r=st(t.bodyColor)??Yn(n),u=ei(t.radius),l=Mt("ig-feed-square"),m=t.width>0?t.width:l.width,h=t.height>0?t.height:l.height,f=t.titleFontStack.replaceAll(";",""),w=t.bodyFontStack.replaceAll(";",""),v=Os(t.code.trim()||t.design,t),b=[`--studio-color:${n}`,`--studio-ink:${o}`,`--studio-radius:${u}px`,`--studio-width:${m}px`,`--studio-height:${h}px`,`--studio-title-font:${f}`,`--studio-body-font:${w}`,`--studio-title-size:${Bt(t.titleSize,m)}px`,`--studio-body-size:${Bt(t.bodySize,m)}px`,`--studio-title-x:${vt(t.titleX)}px`,`--studio-title-y:${vt(t.titleY)}px`,`--studio-body-x:${vt(t.bodyX)}px`,`--studio-body-y:${vt(t.bodyY)}px`,`--studio-image-width:${ht(t.imageWidth)}px`,`--studio-image-x:${vt(t.imageX)}px`,`--studio-image-y:${vt(t.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${m}px;height:${h}px;margin:0;background:transparent;${b}">${v}</div>`}function Rs(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Xn(t)}</body>
</html>`}const Ro="design-llm-wiki-pins";function on(){try{const t=localStorage.getItem(Ro);if(!t)return[];const n=JSON.parse(t);return Array.isArray(n)?n.filter(o=>typeof o=="string"):[]}catch{return[]}}function Ns(t){const n=[...new Set(t)];localStorage.setItem(Ro,JSON.stringify(n))}function Fs(t){const n=on(),o=n.includes(t)?n.filter(s=>s!==t):[...n,t];return Ns(o),on()}const si="ax-studio-baseline";function No(){try{const t=localStorage.getItem(si);return t?Po(JSON.parse(t)):null}catch{return null}}function Bs(t){localStorage.setItem(si,JSON.stringify(t))}function Us(){localStorage.removeItem(si)}const js="ax-design-studio",jt="cards";let ue=[];function Fo(){return ue}function Bo(){return new Promise((t,n)=>{const o=indexedDB.open(js,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(jt)||s.createObjectStore(jt,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function Ks(){const t=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`saved-${t}-${n}`}async function Ys(){try{const t=await Bo(),n=await new Promise((o,s)=>{const r=t.transaction(jt,"readonly").objectStore(jt).getAll();r.onsuccess=()=>o(r.result??[]),r.onerror=()=>s(r.error??new Error("indexedDB read failed"))});t.close(),ue=n.sort((o,s)=>o.createdAt<s.createdAt?1:-1)}catch{ue=[]}}async function Xs(t,n){var s;const o={id:Ks(),title:((s=nn(t,"title"))==null?void 0:s.text.trim())||"제목 없음",createdAt:new Date().toISOString(),state:structuredClone(t),thumbnail:n};try{const r=await Bo();return await new Promise((u,l)=>{const m=r.transaction(jt,"readwrite").objectStore(jt).put(o);m.onsuccess=()=>u(),m.onerror=()=>l(m.error??new Error("indexedDB write failed"))}),r.close(),ue=[o,...ue],o}catch{return null}}const Zs="ax-studio-uploads",sn="images";let dt=[];function Uo(){return dt}function jo(t){return`${Do}${t.id}`}function Gs(t){return dt.find(n=>jo(n)===t)}function Js(){return new Promise((t,n)=>{const o=indexedDB.open(Zs,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(sn)||s.createObjectStore(sn,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function ri(t,n){return Js().then(o=>new Promise((s,r)=>{const u=n(o.transaction(sn,t).objectStore(sn));u.onsuccess=()=>{o.close(),s(u.result)},u.onerror=()=>{o.close(),r(u.error??new Error("indexedDB request failed"))}}))}function Ko(t){return{id:t.id,name:t.name,createdAt:t.createdAt,url:URL.createObjectURL(t.blob)}}async function Vs(){try{const t=await ri("readonly",n=>n.getAll())??[];for(const n of dt)URL.revokeObjectURL(n.url);dt=t.sort((n,o)=>n.createdAt<o.createdAt?-1:1).map(Ko)}catch{dt=[]}}async function Qs(t){const n={id:`upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`,name:t.name,createdAt:new Date().toISOString(),blob:t};try{await ri("readwrite",s=>s.put(n));const o=Ko(n);return dt=[...dt,o],o}catch{return null}}async function tr(t){try{await ri("readwrite",o=>o.delete(t));const n=dt.find(o=>o.id===t);return n&&URL.revokeObjectURL(n.url),dt=dt.filter(o=>o.id!==t),!0}catch{return!1}}let po=0;function Ge(t){return new Promise(n=>{var h,f,w;const o=document.createElement("div");o.className="confirm-backdrop",o.innerHTML=`
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-message">
        <p class="confirm-dialog__message" id="confirm-message"></p>
        <div class="confirm-dialog__actions">
          <button type="button" class="button button--secondary" data-confirm="cancel">취소</button>
          <button type="button" class="button" data-confirm="ok">진행</button>
        </div>
      </div>
    `;const s=o.querySelector("#confirm-message");s&&(s.textContent=t);const r=document.activeElement instanceof HTMLElement?document.activeElement:null;let u=!1;const l=v=>{u||(u=!0,document.removeEventListener("keydown",m),o.remove(),r==null||r.focus(),n(v))},m=v=>{v.key==="Escape"&&(v.preventDefault(),l(!1))};o.addEventListener("click",v=>{v.target===o&&l(!1)}),(h=o.querySelector("[data-confirm='cancel']"))==null||h.addEventListener("click",()=>l(!1)),(f=o.querySelector("[data-confirm='ok']"))==null||f.addEventListener("click",()=>l(!0)),document.addEventListener("keydown",m),document.body.append(o),(w=o.querySelector("[data-confirm='ok']"))==null||w.focus()})}function Ot(t){var o;(o=document.querySelector(".toast"))==null||o.remove(),window.clearTimeout(po);const n=document.createElement("div");n.className="toast",n.setAttribute("role","status"),n.textContent=t,document.body.append(n),po=window.setTimeout(()=>n.remove(),2400)}const Yo="[a-z0-9]+(?:-[a-z0-9]+)*";function Xo(t){const n=t.startsWith("#")?t.slice(1):t,o=n.indexOf("?"),s=o>=0?n.slice(0,o):n,r=o>=0?n.slice(o+1):"",u=s.startsWith("/")?s:`/${s}`;return{path:u==="/"||u===""?"/":u.replace(/\/+$/,"")||"/",query:r}}function fo(t,n){const o=new URLSearchParams(t).get(n);return!o||!new RegExp(`^${Yo}$`).test(o)?null:o}function Zo(t){const{path:n}=Xo(t);return n==="/intake"||n==="/design-system"||n==="/stats"}function Zn(t=window.location.hash){const{path:n,query:o}=Xo(t);if(n==="/"||n==="/gallery")return{name:"archive"};if(n==="/history")return{name:"history"};if(n==="/studio"||Zo(t))return{name:"studio",theme:n==="/studio"?fo(o,"theme"):null,card:n==="/studio"?fo(o,"card"):null};const s=n.match(new RegExp(`^/capture/(${Yo})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:n}}function ft(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":{const n=new URLSearchParams;t.card?n.set("card",t.card):t.theme&&n.set("theme",t.theme);const o=n.toString();return o?`#/studio?${o}`:"#/studio"}case"history":return"#/history";case"notfound":return`#${t.path}`}}function er(t){const n=()=>t(Zn());return window.addEventListener("hashchange",n),t(Zn()),()=>window.removeEventListener("hashchange",n)}function nr(t){return[...t].sort((n,o)=>n.capturedAt!==o.capturedAt?n.capturedAt<o.capturedAt?1:-1:n.slug.localeCompare(o.slug))}function y(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Lt(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let Oe=null;function ir(t){const n=t.querySelector(".archive-tabs__indicator"),o=t.querySelector('.archive-tab[aria-selected="true"]');if(!n||!o)return;const s=o.offsetLeft,r=o.offsetWidth;Oe&&(n.style.transition="none",n.style.transform=`translateX(${Oe.left}px)`,n.style.width=`${Oe.width}px`,n.offsetWidth,n.style.transition=""),requestAnimationFrame(()=>{n.style.transform=`translateX(${s}px)`,n.style.width=`${r}px`,Oe={left:s,width:r}})}function Dn(t){const n=t.querySelector(".capture-grid");if(!n)return;const o=window.getComputedStyle(n),s=Number.parseFloat(o.gridAutoRows)||1,r=Number.parseFloat(o.rowGap)||0;n.querySelectorAll(".capture-card").forEach(u=>{u.style.gridRowEnd="";const l=u.getBoundingClientRect().height,m=Number.parseFloat(window.getComputedStyle(u).marginBottom)||0,h=Math.ceil((l+m+r)/(s+r));u.style.gridRowEnd=`span ${Math.max(1,h)}`})}function or(t){const n=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.thumbPath??t.asset.path;return`<img class="capture-card__media" src="${y(Lt(n))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function sr(t){const n=`${t.state.cardWidth} × ${t.state.cardHeight}`;return`
    <article class="capture-card">
      <a class="capture-card__link" href="${ft({name:"studio",theme:null,card:t.id})}">
        <div class="capture-card__frame">
          <img class="capture-card__media" src="${y(t.thumbnail)}" alt="" width="${t.state.cardWidth}" height="${t.state.cardHeight}" />
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${y(t.title)}</h2>
          <p class="capture-card__insight">${y(n)}</p>
        </div>
      </a>
    </article>
  `}function rr(t,n){return`
    <article class="capture-card${n?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${ft({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${or(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${y(t.asset.kind)}</span>`}
          ${n?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${y(t.title)}</h2>
          <p class="capture-card__insight">${y(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function ar(t,n){const o=new Set(n),s=nr(t),r=s.filter(f=>o.has(f.slug)),u=s.filter(f=>!o.has(f.slug)),l=new Map(s.map(f=>[f.slug,f])),m=n.map(f=>l.get(f)).filter(f=>!!f),h=r.filter(f=>!n.includes(f.slug));return[...m,...h,...u]}function dr(t,n,o,s){const r=new Set(n),u=o==="pin"?t.captures.filter(m=>r.has(m.slug)):t.captures,l=ar(u,n);return t.captures.length===0?`
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
          <p class="gallery__meta">${o==="saved"?`Saved ${s.length}`:`Target ${y(t.target)} · ${l.length} · ${n.length} pinned`}</p>
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
                </section>`:`<div class="capture-grid">${s.map(m=>sr(m)).join("")}</div>`:l.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${o==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${o==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${l.map(m=>rr(m,n.includes(m.slug))).join("")}</div>`}
      </div>
    </section>
  `}function cr(t,n){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const u=r.dataset.archiveTab;(u==="all"||u==="pin"||u==="saved")&&n.onTabChange(u)})}),ir(t),requestAnimationFrame(()=>Dn(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>Dn(t),{once:!0})});const o=new ResizeObserver(()=>Dn(t)),s=t.querySelector(".capture-grid");s&&o.observe(s)}function lr(t){const n=t.replace(/\r\n/g,`
`).split(`
`),o=[];let s=!1;const r=()=>{s&&(o.push("</ul>"),s=!1)};for(const u of n){const l=u.trim();if(!l){r();continue}if(l.startsWith("### ")){r(),o.push(`<h3>${ne(l.slice(4))}</h3>`);continue}if(l.startsWith("## ")){r(),o.push(`<h2>${ne(l.slice(3))}</h2>`);continue}if(l.startsWith("# ")){r(),o.push(`<h1>${ne(l.slice(2))}</h1>`);continue}if(l.startsWith("- ")){s||(o.push("<ul>"),s=!0),o.push(`<li>${ne(l.slice(2))}</li>`);continue}r(),o.push(`<p>${ne(l)}</p>`)}return r(),o.join(`
`)}function ne(t){let n=y(t);return n=n.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(o,s)=>`<a href="${ft({name:"capture",slug:s})}">${s}</a>`),n=n.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(o,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${y(r)}">${s}</a>`),n}const ur=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function hr(t){return Math.max(35,Math.min(98,Math.round(t)))}function pr(t){let n=0;for(const o of t)n=(n*31+o.charCodeAt(0))%997;return n}function fr(t){var f;if((f=t.analysisScores)!=null&&f.length)return t.analysisScores;const n=pr(`${t.slug}:${t.title}:${t.insight}`),o=t.tags.includes("density")?7:0,s=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),u=t.asset.width/Math.max(1,t.asset.height),l=u>1.2?6:0,m=u<.75?5:0,h=[68+r+l+n%9,66+o+(n>>1)%10,64+(t.insight.length>45?8:3)+(n>>2)%9,58+s+(t.uiPatterns.includes("filter-chips")?7:0),62+m+r+(n>>3)%8].map(hr);return ur.map(([w,v],b)=>({key:w,label:v,score:h[b]??60,description:gr(v,h[b]??60,t)}))}function mr(t){return t.length===0?0:Math.round(t.reduce((n,o)=>n+o.score,0)/t.length)}function gr(t,n,o){return t==="레이아웃"?`${o.screenType} 화면 구조와 ${o.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?o.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":n>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function yr(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function br(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${y(Lt(t.asset.posterPath))}"`:""}>
        <source src="${y(Lt(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${y(Lt(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function vr(t){const n=fr(t),o=t.analysisTotal??mr(n),s=160,r=110,u=[.25,.5,.75,1].map(h=>n.map((f,w)=>{const v=-Math.PI/2+w*Math.PI*2/n.length,b=s+Math.cos(v)*r*h,M=s+Math.sin(v)*r*h;return`${b.toFixed(1)},${M.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),l=n.map((h,f)=>{const w=-Math.PI/2+f*Math.PI*2/n.length,v=r*(h.score/100),b=s+Math.cos(w)*v,M=s+Math.sin(w)*v;return`${b.toFixed(1)},${M.toFixed(1)}`}).join(" "),m=n.map((h,f)=>{const w=-Math.PI/2+f*Math.PI*2/n.length,v=s+Math.cos(w)*r,b=s+Math.sin(w)*r,M=s+Math.cos(w)*r*(h.score/100),D=s+Math.sin(w)*r*(h.score/100),z=s+Math.cos(w)*(r+26),$=s+Math.sin(w)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${v.toFixed(1)}" y2="${b.toFixed(1)}" />
          <circle class="spider-point" cx="${M.toFixed(1)}" cy="${D.toFixed(1)}" r="6" />
          <text class="spider-label" x="${z.toFixed(1)}" y="${$.toFixed(1)}">${y(h.label)}</text>
          <text class="spider-callout" x="${z.toFixed(1)}" y="${($+18).toFixed(1)}">${h.score}</text>
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
          <polygon class="spider-area" points="${l}" />
          ${m}
        </svg>
        <dl class="score-list">
          ${n.map(h=>`
            <div class="score-list__item">
              <dt>${y(h.label)} <strong>${h.score}</strong></dt>
              <dd>${y(h.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function xr(t){const n=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(n)].map(o=>`<span class="chip detail-hashtag" aria-pressed="true">#${y(o)}</span>`).join("")}function wr(t,n,o){const s=t.captures.find(u=>u.slug===n);if(!s)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${y(n)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=o.includes(n);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${y(s.service)} · ${y(s.platform)}</p>
          <h1 class="detail__title">${y(s.title)}</h1>
          <p class="detail__insight">${y(s.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${y(ft({name:"studio",theme:n,card:null}))}">이 테마로 만들기</a>
          <a class="button button--secondary" href="${y(Lt(s.asset.path))}" download="${y(`${n}.${s.asset.originalName.split(".").pop()}`)}">원본 다운로드</a>
          <button type="button" class="button button--secondary" data-pin-slug="${y(n)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${br(s)}</div>

      ${vr(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${y(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${y(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${yr(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${y(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${xr(s)}
        </p>
        <p class="detail__meta-line">
          ${y(s.screenType)} · ${y(s.tone)} · ${y(s.copyTone)} · ${y(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${y(s.sourceUrl)}">${y(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${lr(s.body)}
      </section>
    </article>
  `}function _r(t,n){var o;(o=t.querySelector("[data-pin-slug]"))==null||o.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&n(r)})}function $r(t){const n=t.wiki.logEntries;return n.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${n.length} entries · target ${y(t.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${n.map(o=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${y(o.date)}">${y(o.date)}</time>
            <span class="history-item__op">${y(o.operation)}</span>
            <strong class="history-item__title">${y(o.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function Sr(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${y(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Hn=.5,Pn=3,mo=.25,Er=.5,Lr=10,ie=/Mac|iPhone|iPad|iPod/.test(navigator.userAgent),go=40;let q=1,ut=[],oe=[],Pt=[],Re=[],se=null,yo=1;const Mr=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],Go="(min-width: 768px)",Jo="(min-width: 1025px)";let Je=null,Ne=null,Fe=null,Be=null,re=[],Ue=null;const kr=500,bo=20;function ai(){return window.matchMedia(Jo).matches?"desktop":window.matchMedia(Go).matches?"tablet":"mobile"}function Vo(){const t=["mobile","tablet","desktop"],n=ai();return Je&&t.indexOf(Je)<=t.indexOf(n)?Je:n}function je(t){return structuredClone(t)}function vo(t,n){return JSON.stringify(t)===JSON.stringify(n)}const rn=new Map,xo=new Map;function Gn(t){const n=rn.get(t);return n!=null&&n.complete&&n.naturalWidth>0?Promise.resolve(n):new Promise((o,s)=>{const r=n??new Image;r.onload=()=>o(r),r.onerror=()=>s(new Error(`Image failed: ${t}`)),n||(rn.set(t,r),r.src=t)})}function Ir(t){const n=xo.get(t);if(n)return n;const o=fetch(t).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,u)=>{const l=new FileReader;l.onload=()=>r(String(l.result)),l.onerror=()=>u(l.error??new Error("data url failed")),l.readAsDataURL(s)}));return xo.set(t,o),o}const Ar=Object.assign({}),wo=new Set;function Tr(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function xt(){const t=new Set(Qe.map(o=>o.label.toLowerCase())),n=[];for(const[o,s]of Object.entries(Ar)){const r=Ms(o);if(!r||t.has(r.toLowerCase()))continue;const u=`local:${r}`;if(!n.some(l=>l.id===u)){if(!wo.has(r)){wo.add(r);const l=document.createElement("style");l.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${Tr(s)}");font-display:swap;}`,document.head.append(l)}n.push({id:u,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return n}function qr(){return[...Qe,...xt()]}function Cr(t,n,o,s){const r=Math.max(0,Math.min(s,n/2,o/2));t.beginPath(),t.roundRect(0,0,n,o,r)}function zr(t,n,o,s){const r=G(t,"title"),u=G(t,"body"),l=G(t,"image"),m=xt();return{title:r.text,body:u.text,themeImage:n,images:o,design:Ze(t,s,m),color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:Ut(r.fontId,m),bodyFontStack:Ut(u.fontId,m),titleSize:r.size,bodySize:u.size,titleX:r.x,titleY:r.y,bodyX:u.x,bodyY:u.y,imageWidth:l.width,imageX:l.x,imageY:l.y,titleColor:r.color,bodyColor:u.color}}function _o(t,n,o,s){const r=t.getContext("2d");if(!r)return[];const u=n.cardWidth,l=n.cardHeight;t.width=u,t.height=l,r.clearRect(0,0,u,l),r.save(),Cr(r,u,l,n.radius),r.clip(),r.fillStyle=n.color,r.fillRect(0,0,u,l);const m=[],h=Math.max(1,u-Vn*2);r.textBaseline="top";const f=xt(),w=b=>{const M=o(b);if(!M)return;const D=ii(b,M.naturalHeight/M.naturalWidth);if(b.id!==s){const z=b.crop;if(z){const $=M.naturalWidth,N=M.naturalHeight;r.drawImage(M,z.x*$,z.y*N,z.w*$,z.h*N,b.x,b.y,b.width,D)}else r.drawImage(M,b.x,b.y,b.width,D)}m.push({id:b.id,kind:"image",x:b.x,y:b.y,w:b.width,h:D})},v=b=>{if(!b.text.trim())return;r.fillStyle=b.color,r.font=`${b.kind==="title"?600:400} ${b.size}px ${Ut(b.fontId,f)}`;const M=Hs(b.text.trim(),h,$=>r.measureText($).width),D=Math.round(b.size*1.25);let z=0;M.forEach(($,N)=>{b.id!==s&&r.fillText($,b.x,b.y+N*D),z=Math.max(z,r.measureText($).width)}),m.push({id:b.id,kind:b.kind,x:b.x,y:b.y,w:Math.max(z,b.size),h:Math.max(M.length,1)*D})};for(const b of n.layers)b.kind==="image"?w(b):v(b);return r.restore(),m}function $o(t,n){t.toBlob(o=>{if(!o)return;const s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=n,r.click(),URL.revokeObjectURL(s)},"image/png")}async function So(t,n,o,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}"><foreignObject x="0" y="0" width="${o}" height="${s}">${n}</foreignObject></svg>`,u=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(u);try{const m=await Gn(l),h=t.getContext("2d");if(!h)return;t.width=o,t.height=s,h.clearRect(0,0,o,s),h.drawImage(m,0,0,o,s)}finally{URL.revokeObjectURL(l),rn.delete(l)}}let ae=null;function Eo(t,n,o){let s=0;const r=()=>{const u=t.scrollHeight-t.clientHeight;if(u<=1){n.hidden=!0;return}n.hidden=!1;const l=Math.max(32,t.clientHeight/t.scrollHeight*t.clientHeight),m=Math.max(0,t.clientHeight-l);n.style.height=`${l}px`,n.style.transform=`translateY(${t.scrollTop/u*m}px)`};return t.addEventListener("scroll",()=>{r(),o.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>o.classList.remove("is-scrolling"),700)}),r(),r}const On="application/x-ax-studio-image";function Qo(t,n){const o=(l,m,h)=>{const f=l===n;return`
      <button
        type="button"
        class="studio__theme"
        role="radio"
        data-theme-slug="${y(l)}"
        aria-checked="${f?"true":"false"}"
        tabindex="${f?"0":"-1"}"
        draggable="true"
      >
        <img src="${y(m)}" alt="${y(h)}" draggable="false" />
      </button>
    `},s=t.map(l=>o(l.slug,Lt(l.asset.thumbPath??l.asset.path),l.title)),r=Uo().map(l=>`
      <div class="studio__theme-item">
        ${o(jo(l),l.url,l.name)}
        <button type="button" class="studio__theme-remove" data-upload-remove="${y(l.id)}" aria-label="${y(l.name)} 삭제" title="삭제">×</button>
      </div>
    `);return[...s,...r,'<button type="button" class="studio__theme studio__theme--add" id="studio-theme-add" aria-label="이미지 추가" title="이미지 추가">+</button>'].join("")}function Wr(t,n){if(n.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const o=G(t,"title"),s=G(t,"body"),r=G(t,"image"),u=Mt(t.presetId),l=Fn.map($=>`<option value="${y($.id)}"${$.id===u.id?" selected":""}>${y($.name)} · ${$.width}×${$.height}</option>`).join(""),m=Qo(n,r.src),h=t.panel==="design",f=qr(),w=ni(t.cardWidth),v=$=>f.map(N=>`<option value="${y(N.id)}"${N.id===$?" selected":""}>${y(N.label)}</option>`).join(""),b='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',M='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',D=Vo();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${Mr.map($=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${$.id}" aria-label="${$.label}" title="${$.label}" aria-pressed="${$.id===D?"true":"false"}">${$.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${D}" data-framed="${D===ai()?"false":"true"}">
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
            <select id="studio-preset" class="studio__control">${l}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${bt}" max="${Et}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${bt}" max="${Et}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${bt}" max="${Et}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${bt}" max="${Et}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${bt}" max="${Et}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${bt}" max="${Et}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${y(o.text)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${y(o.color)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${y(o.color)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${w}" step="1" value="${o.size}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${w}" step="1" value="${o.size}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${v(o.fontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${y(s.text)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${y(s.color)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${y(s.color)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${w}" step="1" value="${s.size}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${w}" step="1" value="${s.size}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${v(s.fontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${m}</div>
            <input type="file" id="studio-theme-file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" multiple hidden />
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${kt}" max="${Un}" step="1" value="${r.width}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${kt}" max="${Un}" step="1" value="${r.width}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮기고, 핀치하거나 클릭 후 가장자리 핸들을 끌어 크기를 조절할 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${y(t.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${y(t.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${ce}" max="${Ye}" step="1" value="${t.radius}" aria-valuemin="${ce}" aria-valuemax="${Ye}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${ce}" max="${Ye}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-set-baseline">초기화로 세팅</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-save-library">그래픽 라이브러리에 추가</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${h?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${y(t.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
        </div>
        <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
        </div>
      </form>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${Ft}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
              <button type="button" class="studio__zoom-btn" id="studio-undo" aria-label="이전 동작" disabled>${b}</button>
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
  `}function Dr(t,n,o,s){var Ji,Vi,Qi,to,eo,no,io,oo,so,ro;if(o.length===0)return;const r=t.querySelector("#studio-preset"),u=t.querySelector("#studio-size"),l=t.querySelector("#studio-size-number"),m=t.querySelector("#studio-width"),h=t.querySelector("#studio-width-number"),f=t.querySelector("#studio-height"),w=t.querySelector("#studio-height-number"),v=t.querySelector("#studio-title"),b=t.querySelector("#studio-title-color"),M=t.querySelector("#studio-title-hex"),D=t.querySelector("#studio-title-size"),z=t.querySelector("#studio-title-size-number"),$=t.querySelector("#studio-body"),N=t.querySelector("#studio-body-color"),he=t.querySelector("#studio-body-hex"),pe=t.querySelector("#studio-body-size"),fe=t.querySelector("#studio-body-size-number"),me=t.querySelector("#studio-title-font"),ge=t.querySelector("#studio-body-font"),cn=t.querySelector("#studio-image-width"),ln=t.querySelector("#studio-image-width-number"),un=t.querySelector("#studio-color"),ye=t.querySelector("#studio-hex"),U=t.querySelector("#studio-radius"),rt=t.querySelector("#studio-radius-number"),J=t.querySelector("#studio-code"),S=t.querySelector("#studio-canvas"),be=t.querySelector("#studio-iframe"),ci=t.querySelector("#studio-meta"),Kt=t.querySelector("#studio-safe"),ve=t.querySelector("#studio-scaler"),hn=t.querySelector("#studio-fit"),F=t.querySelector("#studio-stage"),xe=t.querySelector("#studio-zoom-out"),we=t.querySelector("#studio-zoom-in"),li=t.querySelector("#studio-zoom-label"),_e=t.querySelector("#studio-undo"),pn=t.querySelector("#studio-redo"),fn=t.querySelector("#studio-scroll-thumb"),mn=t.querySelector(".studio__controls-wrap"),$e=t.querySelector("#studio-export"),V=t.querySelector("#studio-splitter"),Se=t.querySelector(".studio"),ui=t.querySelector("#studio-overlay"),Yt=t.querySelector("#studio-crop-frame"),k=t.querySelector("#studio-editor"),gn=[...t.querySelectorAll(".studio__handle[data-handle]")],yn=[...t.querySelectorAll(".studio__handle[data-crop]")];if(!ui||!Yt||!k||!r||!u||!l||!m||!h||!f||!w||!v||!b||!M||!D||!z||!$||!N||!he||!pe||!fe||!me||!ge||!cn||!ln||!un||!ye||!U||!rt||!J||!S||!be||!ci||!Kt||!ve||!hn||!F||!xe||!we||!li||!_e||!pn||!fn||!mn||!$e||!V||!Se||!t.querySelector("#studio-set-baseline")||!t.querySelector("#studio-save-library"))return;const Ee=e=>{const i=Gs(e);if(i)return i.url;const d=o.find(a=>a.slug===e)??o.find(a=>a.slug===n.themeSlug)??o[0];return d?Lt(d.asset.path):""},wt=e=>{const i=rn.get(Ee(e.src));return i!=null&&i.complete&&i.naturalWidth>0?i:null},It=e=>{const i=wt(e);return i?i.naturalHeight/i.naturalWidth:1},bn=async()=>{const e=p=>{const g=Ee(p);return g?Ir(g).catch(()=>""):Promise.resolve("")},i=[...new Set(n.layers.flatMap(p=>p.kind==="image"&&p.src!==n.themeSlug?[p.src]:[]))],[d,...a]=await Promise.all([e(n.themeSlug),...i.map(e)]),c=Object.fromEntries(i.map((p,g)=>[p,a[g]??""]));return zr(n,d??"",c,It)};let Le=0,it=1;const x=new Set;let j=null,L=null,H=()=>{},Me=()=>{};const ot=e=>n.layers.find(i=>i.id===e),At=()=>n.layers.filter(e=>x.has(e.id)),B=e=>{for(let i=n.layers.length-1;i>=0;i-=1){const d=n.layers[i];if(d&&d.kind===e&&x.has(d.id))return d}return G(n,e)},Tt=()=>{for(let e=n.layers.length-1;e>=0;e-=1){const i=n.layers[e];if(i&&i.kind==="image"&&x.has(i.id))return i}return G(n,"image")},Xt=()=>n.layers.filter(e=>e.kind==="image"),vn=()=>Xt().some(e=>wt(e)),is=()=>{(!Number.isFinite(q)||q<=0)&&(q=1),xe.disabled=q<=Hn+.001,we.disabled=q>=Pn-.001,li.textContent=`${Math.round(q*100)}%`},xn=(e,i)=>{const d=F.getBoundingClientRect(),a=20,c=Math.min(Math.max(d.width-a,1)/e,Math.max(d.height-a,1)/i);return Number.isFinite(c)&&c>0?c:1},_t=()=>{const e=xn(n.cardWidth,n.cardHeight);is();const i=e*q;hn.style.width=`${n.cardWidth*i}px`,hn.style.height=`${n.cardHeight*i}px`,ve.style.width=`${n.cardWidth}px`,ve.style.height=`${n.cardHeight}px`,ve.style.transform=`scale(${i})`,it=i,Me()};xe.addEventListener("click",()=>{q=Math.max(Hn,q-mo),_t()}),we.addEventListener("click",()=>{q=Math.min(Pn,q+mo),_t()}),(Ji=t.querySelector("#studio-zoom-fit"))==null||Ji.addEventListener("click",()=>{q=1,_t(),F.scrollTo(0,0)});const hi=t.querySelector("#studio-panel-scroll"),os=hi&&fn&&mn?Eo(hi,fn,mn):()=>{},ss=()=>{J.style.height="auto",J.style.height=`${Math.max(180,J.scrollHeight)}px`,os()},qt=()=>{const e=document.querySelector("#studio-undo"),i=document.querySelector("#studio-redo");e&&(e.disabled=ut.length===0),i&&(i.disabled=oe.length===0)};let Zt=null;const E=e=>{if(e&&Zt!==e)return;if(!se){Zt=null;return}const i=se,d=yo;se=null,Zt=null,!(vo(i,n)&&d===q)&&(ut.push(i),Pt.push(d),ut.length>go&&(ut.shift(),Pt.shift()),oe=[],Re=[],qt())},I=e=>{e&&Zt===e&&se||(E(),se=je(n),yo=q,Zt=e??null)},pi=e=>{const i=Number(e.min),d=Number(e.max),a=Number(e.value),c=d>i?(a-i)/(d-i)*100:0;e.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,c))}%`)};let fi=n.cardHeight/Math.max(1,n.cardWidth);const mi=()=>new Map(Xt().map(e=>[e.id,{width:e.width,x:e.x,y:e.y}]));let wn={cardWidth:n.cardWidth,images:mi()};const _n=()=>{fi=n.cardHeight/Math.max(1,n.cardWidth),wn={cardWidth:n.cardWidth,images:mi()}};let ct=[];const $n=e=>ii(e,It(e)),Sn=()=>{n.cardWidth=at(n.cardWidth),n.cardHeight=at(n.cardHeight);for(const e of Xt())e.width=ht(e.width)},Ct=(e,i,d)=>{e.value=String(d),document.activeElement!==i&&(i.value=String(d))},gi=()=>{const e=B("title"),i=B("body"),d=ni(n.cardWidth),a=String(Math.max(d,e.size)),c=String(Math.max(d,i.size));for(const p of[D,z])p.min="5",p.max=a;for(const p of[pe,fe])p.min="5",p.max=c;Ct(u,l,n.cardWidth),Ct(m,h,n.cardWidth),Ct(f,w,n.cardHeight),Ct(D,z,e.size),Ct(pe,fe,i.size),Ct(cn,ln,Tt().width)},yi=()=>{U.value=String(n.radius),U.setAttribute("aria-valuenow",String(n.radius)),rt.value=String(n.radius),t.style.setProperty("--studio-card-radius",`${n.radius}px`)},bi=(e,i=!1)=>{for(const d of t.querySelectorAll("[data-theme-slug]")){const a=d.dataset.themeSlug===e;d.setAttribute("aria-checked",a?"true":"false"),d.tabIndex=a?0:-1,a&&i&&d.focus()}},rs=(e,i)=>{const d=At().filter(c=>c.kind==="image");for(const c of d.length>0?d:[G(n,"image")])c.src=e;const a=G(n,"image");ks(a.src)||(n.themeSlug=a.src),bi(e,i),A()},En=e=>{var c,p;n.panel=e;const i=e==="design";(c=t.querySelector("#studio-panel-design"))==null||c.toggleAttribute("hidden",!i),(p=t.querySelector("#studio-panel-code"))==null||p.toggleAttribute("hidden",i);const d=t.querySelector("#studio-tab-design"),a=t.querySelector("#studio-tab-code");d==null||d.setAttribute("aria-selected",i?"true":"false"),a==null||a.setAttribute("aria-selected",i?"false":"true"),d&&(d.tabIndex=i?0:-1),a&&(a.tabIndex=i?-1:0),A()},Ln=()=>{const e=B("title"),i=B("body");r.value=n.presetId,document.activeElement!==v&&(v.value=e.text),document.activeElement!==$&&($.value=i.text),document.activeElement!==M&&(b.value=e.color,M.value=e.color),document.activeElement!==he&&(N.value=i.color,he.value=i.color),document.activeElement!==ye&&(un.value=n.color,ye.value=n.color),me.value=e.fontId,ge.value=i.fontId,document.activeElement!==J&&(J.value=n.code),bi(Tt().src)},A=async()=>{const e=++Le;Sn(),Ln(),gi(),t.querySelectorAll('input[type="range"]').forEach(pi);const i=Mt(n.presetId),d=n.cardWidth===i.width&&n.cardHeight===i.height,a=d&&i.safe?` · 안전 영역 ${i.safe.width} × ${i.safe.height}`:"";ci.textContent=`${n.cardWidth} × ${n.cardHeight} · ${i.name}${a}`,$e.textContent=Ze(n,It,xt()),ss(),yi(),_t(),d&&i.safe?(Kt.hidden=!1,Kt.style.width=`${i.safe.width}px`,Kt.style.height=`${i.safe.height}px`):Kt.hidden=!0;const c=(g,_,W)=>{var T;const X=(T=Ut(g,xt()).split(",")[0])==null?void 0:T.replaceAll('"',"").trim();return X?document.fonts.load(`${_} ${W}px "${X}"`):Promise.resolve()};try{await Promise.all(n.layers.filter(Pe).map(g=>c(g.fontId,g.kind==="title"?600:400,g.size)))}catch{}if(e!==Le)return;if(n.code.trim()){S.hidden=!0,be.hidden=!1;const g=await bn();if(e!==Le)return;be.srcdoc=Rs(g),Me();return}be.hidden=!0,S.hidden=!1;const p=new Set(Xt().map(g=>Ee(g.src)).filter(Boolean));await Promise.all([...p].map(g=>Gn(g).catch(()=>null))),e===Le&&(Sn(),$e.textContent=Ze(n,It,xt()),H())},zt=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>I(e)),e.addEventListener("keydown",()=>I(e)),e.addEventListener("pointerup",()=>E(e)),e.addEventListener("pointercancel",()=>E(e)),e.addEventListener("keyup",()=>E(e)),e.addEventListener("input",()=>{d(Number(e.value)),A()});const c=()=>{Sn(),i.value=String(a()),E(i)};i.addEventListener("focus",()=>I(i)),i.addEventListener("input",()=>{i.value.trim()!==""&&(d(Number(i.value)),A())}),i.addEventListener("change",c),i.addEventListener("blur",c)};r.addEventListener("focus",()=>I(r)),r.addEventListener("change",()=>{const e=Mt(r.value);n.presetId=e.id,n.cardWidth=e.width,n.cardHeight=e.height,E(r),A()}),r.addEventListener("blur",()=>E(r)),u.addEventListener("pointerdown",_n),u.addEventListener("keydown",_n),l.addEventListener("focus",_n),zt(u,l,e=>{const i=xn(n.cardWidth,n.cardHeight)*q,d=Es(Math.max(1,n.cardWidth),Math.max(1,Math.round(n.cardWidth*fi)),e);n.cardWidth=d.cardWidth,n.cardHeight=d.cardHeight;const a=n.cardWidth/Math.max(1,wn.cardWidth);for(const p of Xt()){const g=wn.images.get(p.id);if(!g)continue;p.width=ht(g.width*a);const _=p.width/Math.max(1,g.width);p.x=Math.round(g.x*_),p.y=Math.round(g.y*_)}const c=xn(n.cardWidth,n.cardHeight);c>0&&Number.isFinite(i)&&i>0&&(q=i/c)},()=>n.cardWidth),zt(m,h,e=>{n.cardWidth=at(e);for(const i of n.layers)Pe(i)&&(i.size=Bt(i.size,n.cardWidth))},()=>n.cardWidth),zt(f,w,e=>{n.cardHeight=e},()=>n.cardHeight),zt(D,z,e=>{B("title").size=Bt(e,n.cardWidth)},()=>B("title").size),zt(pe,fe,e=>{B("body").size=Bt(e,n.cardWidth)},()=>B("body").size),zt(cn,ln,e=>{Tt().width=e},()=>Tt().width);const vi=(e,i)=>{e.addEventListener("focus",()=>I(e)),e.addEventListener("change",()=>{i(),E(e),A()}),e.addEventListener("blur",()=>E(e))};vi(me,()=>{B("title").fontId=me.value}),vi(ge,()=>{B("body").fontId=ge.value});const as=async()=>{var p;const e=document.createElement("canvas");n.code.trim()?await So(e,Xn(await bn()),n.cardWidth,n.cardHeight):_o(e,n,wt);const i=1080,d=Math.max(n.cardWidth,n.cardHeight);if(d<=i)return e.toDataURL("image/png");const a=i/d,c=document.createElement("canvas");return c.width=Math.max(1,Math.round(n.cardWidth*a)),c.height=Math.max(1,Math.round(n.cardHeight*a)),(p=c.getContext("2d"))==null||p.drawImage(e,0,0,c.width,c.height),c.toDataURL("image/png")};(Vi=t.querySelector("#studio-set-baseline"))==null||Vi.addEventListener("click",()=>{(async()=>await Ge("현재 레이아웃을 초기화 기준으로 세팅하고 진행하시겠습니까?")&&(s.onSetBaseline(),Ot("초기화로 세팅하였습니다.")))()}),(Qi=t.querySelector("#studio-save-library"))==null||Qi.addEventListener("click",()=>{(async()=>{if(!await Ge("현재 카드를 그래픽 라이브러리에 추가하고 진행하시겠습니까?"))return;const i=await s.onAddToLibrary(await as());Ot(i?"그래픽 라이브러리에 추가하였습니다.":"그래픽 라이브러리에 추가하지 못했습니다.")})()}),(to=t.querySelector("#studio-reset"))==null||to.addEventListener("click",()=>{E();const e=je(n),i=q;s.onReset(),(!vo(e,n)||i!==q)&&(ut.push(e),Pt.push(i),ut.length>go&&(ut.shift(),Pt.shift()),oe=[],Re=[]),qt()}),v.addEventListener("focus",()=>I(v)),v.addEventListener("input",()=>{B("title").text=v.value,A()}),v.addEventListener("blur",()=>E(v)),$.addEventListener("focus",()=>I($)),$.addEventListener("input",()=>{B("body").text=$.value,A()}),$.addEventListener("blur",()=>E($));const Mn=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>I(e)),e.addEventListener("change",()=>E(e)),e.addEventListener("input",()=>{const c=st(e.value);c&&(d(c),i.value=c,A())}),i.addEventListener("focus",()=>I(i)),i.addEventListener("input",()=>{const c=st(i.value);c&&(d(c),e.value=c,A())}),i.addEventListener("blur",()=>{st(i.value)||(i.value=a()),E(i)})};Mn(un,ye,e=>{n.color=e},()=>n.color),Mn(b,M,e=>{B("title").color=e},()=>B("title").color),Mn(N,he,e=>{B("body").color=e},()=>B("body").color);const xi=e=>{n.radius=ei(Number(e)),yi(),A()};U.addEventListener("pointerdown",()=>I(U)),U.addEventListener("keydown",()=>I(U)),U.addEventListener("pointerup",()=>E(U)),U.addEventListener("pointercancel",()=>E(U)),U.addEventListener("keyup",()=>E(U)),U.addEventListener("input",()=>xi(U.value)),rt.addEventListener("focus",()=>I(rt)),rt.addEventListener("input",()=>xi(rt.value)),rt.addEventListener("blur",()=>E(rt)),rt.addEventListener("change",()=>E(rt)),J.addEventListener("focus",()=>I(J)),J.addEventListener("input",()=>{n.code=J.value,A()}),J.addEventListener("blur",()=>E(J));const wi=(e,i)=>{Object.assign(n,e),q=i,qt(),A()};_e.addEventListener("click",()=>{Dt(!1),E();const e=ut.pop(),i=Pt.pop();if(!e||i===void 0){qt();return}oe.push(je(n)),Re.push(q),wi(e,i)}),pn.addEventListener("click",()=>{Dt(!1),E();const e=oe.pop(),i=Re.pop();if(!e||i===void 0){qt();return}ut.push(je(n)),Pt.push(q),wi(e,i)}),qt(),(eo=t.querySelector("#studio-tab-design"))==null||eo.addEventListener("click",()=>En("design")),(no=t.querySelector("#studio-tab-code"))==null||no.addEventListener("click",()=>En("code")),(io=t.querySelector(".studio__tabs"))==null||io.addEventListener("keydown",e=>{var d;if(!(e instanceof KeyboardEvent)||e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();const i=n.panel==="design"?"code":"design";En(i),(d=t.querySelector(i==="design"?"#studio-tab-design":"#studio-tab-code"))==null||d.focus()});const K=t.querySelector(".studio__themes"),mt=t.querySelector("#studio-theme-file"),ds=()=>[...t.querySelectorAll("[data-theme-slug]")],_i=()=>{K&&(K.innerHTML=Qo(o,Tt().src))},$i=(e,i)=>{const d=e.dataset.themeSlug;d&&(I(e),rs(d,i),E(e))},cs=async e=>{const i=Uo().find(d=>d.id===e);if(!(!i||!await Ge(`"${i.name}" 이미지를 테마에서 지울까요? 이 이미지를 쓰던 레이어는 테마 이미지로 바뀝니다.`))){if(!await tr(e)){Ot("이미지를 지우지 못했습니다.");return}_i(),A()}};K==null||K.addEventListener("click",e=>{const i=e.target instanceof Element?e.target:null,d=i==null?void 0:i.closest("[data-upload-remove]");if(d){cs(d.dataset.uploadRemove??"");return}if(i!=null&&i.closest("#studio-theme-add")){mt==null||mt.click();return}const a=i==null?void 0:i.closest("[data-theme-slug]");a&&$i(a,!1)}),K==null||K.addEventListener("keydown",e=>{const i=e.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(i)||!(e.target instanceof Element&&e.target.matches("[data-theme-slug]")))return;e.preventDefault();const d=ds(),a=d.findIndex(g=>g===e.target),p=d[(a+(i==="ArrowLeft"||i==="ArrowUp"?-1:1)+d.length)%d.length];p&&$i(p,!0)}),mt==null||mt.addEventListener("change",()=>{const e=[...mt.files??[]].filter(i=>i.type.startsWith("image/"));mt.value="",e.length!==0&&(async()=>{var d;const i=(await Promise.all(e.map(a=>Qs(a)))).filter(a=>a!==null);i.length<e.length&&Ot("이미지를 저장하지 못했습니다."),i.length!==0&&(_i(),(d=t.querySelector("#studio-theme-add"))==null||d.focus())})()}),K==null||K.addEventListener("dragstart",e=>{const i=e.target instanceof Element?e.target.closest("[data-theme-slug]"):null,d=i==null?void 0:i.dataset.themeSlug;if(!i||!d||!e.dataTransfer)return;e.dataTransfer.setData(On,d),e.dataTransfer.effectAllowed="copy";const a=i.querySelector("img");a&&e.dataTransfer.setDragImage(a,a.width/2,a.height/2)}),(oo=t.querySelector("#studio-copy"))==null||oo.addEventListener("click",async()=>{const e=Ze(n,It,xt());$e.textContent=e;try{await navigator.clipboard.writeText(e)}catch{const d=document.createElement("textarea");d.value=e,document.body.append(d),d.select(),document.execCommand("copy"),d.remove()}const i=t.querySelector("#studio-copy");i&&(i.textContent="복사됨",window.setTimeout(()=>{i.textContent="현재 디자인을 코드로 복사"},1200))}),(so=t.querySelector("#studio-download"))==null||so.addEventListener("click",()=>{(async()=>{const e=`ax-studio-${n.cardWidth}x${n.cardHeight}-${n.themeSlug||"theme"}.png`;if(!n.code.trim()){$o(S,e);return}const i=document.createElement("canvas");await So(i,Xn(await bn()),n.cardWidth,n.cardHeight),$o(i,e)})()});const Q=e=>{const i=S.getBoundingClientRect();return{x:i.width>0?(e.clientX-i.left)/i.width*n.cardWidth:0,y:i.height>0?(e.clientY-i.top)/i.height*n.cardHeight:0}},kn=(e,i)=>{for(let a=ct.length-1;a>=0;a-=1){const c=ct[a];if(c&&e>=c.x-8&&i>=c.y-8&&e<=c.x+c.w+8&&i<=c.y+c.h+8)return c}return null},ls=e=>{const i=S.getContext("2d");if(!i)return;const d=S.getBoundingClientRect().width,a=d>0?n.cardWidth/d:1;i.save(),i.lineJoin="round",i.lineCap="round",i.strokeStyle="rgba(0, 0, 0, 0.7)",i.lineWidth=a*3,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.strokeStyle="rgba(255, 255, 255, 0.92)",i.lineWidth=a*1.5,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.restore()},us=()=>{if(O)for(const e of ct)O.start.has(e.id)&&ls(e)},hs=()=>{const e=S.getContext("2d"),i=L?ot(L.id):void 0,d=(i==null?void 0:i.kind)==="image"?wt(i):null;if(!L||!d||!e)return;const{full:a,box:c}=L;e.save(),e.globalAlpha=.35,e.drawImage(d,a.x,a.y,a.w,a.h),e.globalAlpha=1,e.beginPath(),e.rect(c.x,c.y,c.w,c.h),e.clip(),e.drawImage(d,a.x,a.y,a.w,a.h),e.restore()};let O=null,tt=null,$t=null;const lt=new Map;let Y=null,Z=null,In=null,Si="";const ke=e=>({x:e.x,y:e.y,width:e.width}),Gt=(e,i,d)=>e.kind==="image"?{x:De(i,n.cardWidth,e.width),y:De(d,n.cardHeight,$n(e))}:{x:tn(i,n.cardWidth,e.size),y:tn(d,n.cardHeight,e.size)},Ei=e=>{const i=new Map;for(const d of e){const a=ot(d);a&&i.set(d,{x:a.x,y:a.y})}return i},An=(e,i,d)=>{const a=(p,g)=>Math.abs(g)<Math.abs(p)?g:p,c=[];for(const[p,g]of e){const _=ot(p);_&&c.push({layer:_,from:g})}for(const{layer:p,from:g}of c){const _=Gt(p,g.x+i,g.y+d);i=a(i,_.x-g.x),d=a(d,_.y-g.y)}for(const{layer:p,from:g}of c){const _=Gt(p,g.x+i,g.y+d);p.x=_.x,p.y=_.y}},Ie=(e,i)=>{e.width=i.width,e.x=De(i.x,n.cardWidth,e.width),e.y=De(i.y,n.cardHeight,$n(e))},Tn=e=>{for(let i=ct.length-1;i>=0;i-=1){const d=ct[i];if(!d||d.kind!=="image"||e.x<d.x||e.y<d.y||e.x>d.x+d.w||e.y>d.y+d.h)continue;const a=ot(d.id);if((a==null?void 0:a.kind)==="image")return a}return Tt()};H=()=>{for(const i of[...x])ot(i)||x.delete(i);ct=_o(S,n,wt,(j==null?void 0:j.id)??(L==null?void 0:L.id)),hs(),us(),Me();const e=[...x].join(" ");e!==Si&&(Si=e,Ln(),gi(),t.querySelectorAll('input[type="range"]').forEach(pi))};const gt=(e,i,d)=>{e.style.left=`${i*it}px`,e.style.top=`${d*it}px`},Ae=()=>{const e=j?ot(j.id):void 0;return e&&Pe(e)?e:null},ps=()=>{const e=Ae();if(!e)return;const i=e.size*it,d=Math.max(16,i),a=i/d;gt(k,e.x,e.y),k.style.font=`${e.kind==="title"?600:400} ${d}px ${Ut(e.fontId,xt())}`,k.style.lineHeight=`${Math.round(e.size*1.25)*it/a}px`,k.style.color=e.color,k.style.width=`${Math.max(1,n.cardWidth-Vn*2)*it/a}px`,k.style.transform=`scale(${a})`,k.style.height="auto",k.style.height=`${k.scrollHeight}px`},Te=new Map,fs=()=>{const e=L&&!n.code.trim()?L:null;Yt.hidden=!e;for(const d of yn)d.hidden=!e;if(!e)return;const{box:i}=e;gt(Yt,i.x,i.y),Yt.style.width=`${i.w*it}px`,Yt.style.height=`${i.h*it}px`;for(const d of yn){const a=d.dataset.crop??"",c=a.includes("w")?i.x:a.includes("e")?i.x+i.w:i.x+i.w/2,p=a.includes("n")?i.y:a.includes("s")?i.y+i.h:i.y+i.h/2;gt(d,c,p)}},Jt=()=>{const[e]=x.size===1?[...x]:[],i=e?ot(e):void 0;return(i==null?void 0:i.kind)==="image"?i:null};Me=()=>{const e=!j&&!L&&!n.code.trim(),i=new Set;if(e)for(const p of x){const g=ct.find(W=>W.id===p);if(!g)continue;let _=Te.get(p);_||(_=document.createElement("div"),_.className="studio__select-frame",ui.prepend(_),Te.set(p,_)),gt(_,g.x,g.y),_.style.width=`${g.w*it}px`,_.style.height=`${g.h*it}px`,i.add(p)}for(const[p,g]of Te)i.has(p)||(g.remove(),Te.delete(p));const d=Jt(),a=d?ct.find(p=>p.id===d.id):void 0,c=e&&!!a;for(const p of gn)p.hidden=!c;if(c&&a){const p=12/Math.max(it,.001),g=T=>Math.min(n.cardWidth-p,Math.max(p,T)),_=T=>Math.min(n.cardHeight-p,Math.max(p,T)),W=g(a.x+a.w/2),X=_(a.y+a.h/2);for(const T of gn){const et=T.dataset.handle;et==="top"?gt(T,W,_(a.y)):et==="bottom"?gt(T,W,_(a.y+a.h)):et==="left"?gt(T,g(a.x),X):gt(T,g(a.x+a.w),X)}}fs(),ps()};for(const e of gn)e.addEventListener("pointerdown",i=>{const d=Jt(),a=d?ct.find(et=>et.id===d.id):void 0;if(!d||!a)return;i.preventDefault();try{e.setPointerCapture(i.pointerId)}catch{}I(e);const c=e.dataset.handle,p=ke(d),g=a.h/Math.max(1,a.w),_=c==="right"?{x:a.x,y:a.y+a.h/2}:c==="left"?{x:a.x+a.w,y:a.y+a.h/2}:c==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},W=Q(i),X=et=>{if(et.pointerId!==i.pointerId)return;const We=Q(et),ee=We.x-W.x,St=We.y-W.y,Wn=c==="right"?a.w+ee:c==="left"?a.w-ee:c==="bottom"?(a.h+St)/g:(a.h-St)/g;Ie(d,He(p,Wn,_.x,_.y)),H()},T=et=>{et.pointerId===i.pointerId&&(e.removeEventListener("pointermove",X),e.removeEventListener("pointerup",T),e.removeEventListener("pointercancel",T),E(e),A())};e.addEventListener("pointermove",X),e.addEventListener("pointerup",T),e.addEventListener("pointercancel",T)});const ms=e=>{n.code.trim()||(j={id:e.id,original:e.text},x.clear(),x.add(e.id),I(k),k.value=e.text,k.hidden=!1,H(),k.focus(),k.setSelectionRange(k.value.length,k.value.length))},Wt=e=>{if(!j)return;const i=Ae();!e&&i&&(i.text=j.original),j=null,k.hidden=!0,H(),E(k),A()};k.addEventListener("input",()=>{const e=Ae();e&&(e.text=e.kind==="title"?k.value.replace(/\n/g," "):k.value,H(),Ln())}),k.addEventListener("keydown",e=>{var i;e.isComposing||(e.key==="Escape"?(e.preventDefault(),Wt(!1)):e.key==="Enter"&&(((i=Ae())==null?void 0:i.kind)==="title"||e.metaKey||e.ctrlKey)&&(e.preventDefault(),Wt(!0)))}),k.addEventListener("blur",()=>Wt(!0));const gs=(e,i)=>{const d=$t&&$t.id===e&&i.timeStamp-$t.time<400&&Math.hypot(i.clientX-$t.x,i.clientY-$t.y)<24,a=ot(e);if(d&&a&&Pe(a)){$t=null,ms(a);return}$t={id:e,time:i.timeStamp,x:i.clientX,y:i.clientY}},Li=new EventTarget,Mi=e=>{const i=e.target;i===S||i instanceof Element&&i.closest(".studio__handle--crop")||Dt(!0)},ys=e=>{!wt(e)||n.code.trim()||(E(),x.clear(),x.add(e.id),L={id:e.id,full:Ho(e,It(e)),box:{x:e.x,y:e.y,w:e.width,h:$n(e)}},I(Li),document.addEventListener("pointerdown",Mi,!0),H())};function Dt(e){if(!L)return;const{id:i,full:d,box:a}=L;L=null,document.removeEventListener("pointerdown",Mi,!0);const c=ot(i);if(e&&(c==null?void 0:c.kind)==="image"){c.crop=Is(d,a),c.width=ht(a.w);const p=Gt(c,a.x,a.y);c.x=p.x,c.y=p.y}E(Li),A()}const ki=(e,i,d)=>{if(!L)return;e.preventDefault();try{i.setPointerCapture(e.pointerId)}catch{}const a=Q(e),c={...L.box},p=_=>{if(_.pointerId!==e.pointerId||!L)return;const W=Q(_),X=W.x-a.x,T=W.y-a.y;L.box=d?Ts(L.full,c,d,X,T):qs(L.full,c,X,T),H()},g=_=>{_.pointerId===e.pointerId&&(i.removeEventListener("pointermove",p),i.removeEventListener("pointerup",g),i.removeEventListener("pointercancel",g))};i.addEventListener("pointermove",p),i.addEventListener("pointerup",g),i.addEventListener("pointercancel",g)};for(const e of yn)e.addEventListener("pointerdown",i=>ki(i,e,e.dataset.crop??null));const qe=e=>{E();const i=new EventTarget;I(i),e(),E(i),A()},Ii=()=>{const e=At();e.length>0&&(re=structuredClone(e))},Ai=e=>{re.length!==0&&qe(()=>{const i=structuredClone(re),d=e?e.x-Math.min(...i.map(c=>c.x)):bo,a=e?e.y-Math.min(...i.map(c=>c.y)):bo;x.clear();for(const c of i){c.id=en();const p=Gt(c,c.x+d,c.y+a);c.x=p.x,c.y=p.y,x.add(c.id)}n.layers.push(...i)})},bs=e=>{const i=At();i.length!==0&&qe(()=>{const d=n.layers.filter(a=>!x.has(a.id));n.layers=e?[...d,...i]:[...i,...d]})},qn=e=>["title","body","image"].every(i=>!e.some(d=>d.kind===i)||n.layers.some(d=>d.kind===i&&!x.has(d.id))),Ti=()=>{const e=At();e.length===0||!qn(e)||qe(()=>{n.layers=n.layers.filter(i=>!x.has(i.id)),x.clear()})};Ue==null||Ue.remove();const qi=e=>ie?`⌘${e}`:`Ctrl+${e}`,vs=[{action:"copy",label:"복사",hint:qi("C")},{action:"paste",label:"붙여넣기",hint:qi("V")},{action:"front",label:"맨 위로 보내기"},{action:"back",label:"맨 밑으로 보내기"},{action:"crop",label:"크롭하기"},{action:"delete",label:"삭제",hint:ie?"⌫":"Delete"}],P=document.createElement("div");P.className="nav-popover studio-menu",P.setAttribute("role","menu"),P.setAttribute("aria-label","객체 메뉴"),P.hidden=!0,P.innerHTML=vs.map(e=>`<button type="button" class="nav-popover__item" role="menuitem" data-layer-action="${e.action}">${e.label}${e.hint?`<span class="studio-menu__hint">${e.hint}</span>`:""}</button>`).join(""),document.body.append(P),Ue=P;let Ci=null;const Cn=e=>P.querySelector(`[data-layer-action="${e}"]`),zi=()=>[...P.querySelectorAll("[data-layer-action]")].filter(e=>!e.hidden&&!e.disabled),Wi=e=>{e.target instanceof Node&&P.contains(e.target)||Vt()};function Vt(){P.hidden||(document.activeElement instanceof HTMLElement&&P.contains(document.activeElement)&&document.activeElement.blur(),P.hidden=!0,document.removeEventListener("pointerdown",Wi,!0))}const Di=(e,i)=>{var ee;const d=Q({clientX:e,clientY:i}),a=kn(d.x,d.y);a?x.has(a.id)||(x.clear(),x.add(a.id)):x.clear(),Ci=d,H();const c=At(),p=(St,Wn)=>{const ao=Cn(St);ao&&(ao.disabled=!Wn)};p("copy",c.length>0),p("paste",re.length>0),p("front",c.length>0),p("back",c.length>0);const g=Cn("crop");if(g){g.hidden=!Jt();const St=Jt();g.disabled=!St||!wt(St)}const _=Cn("delete");_&&(_.disabled=c.length===0||!qn(c),_.title=c.length>0&&_.disabled?"타이틀·본문·이미지는 하나씩 남아 있어야 합니다.":""),P.hidden=!1;const W=8,{width:X,height:T}=P.getBoundingClientRect(),et=e+X+W>window.innerWidth?e-X:e,We=i+T+W>window.innerHeight?i-T:i;P.style.left=`${Math.max(W,et)}px`,P.style.top=`${Math.max(W,We)}px`,document.addEventListener("pointerdown",Wi,!0),(ee=zi()[0])==null||ee.focus({preventScroll:!0})};P.addEventListener("click",e=>{const i=e.target instanceof Element?e.target.closest("[data-layer-action]"):null;if(!i||i.disabled)return;const d=Ci;Vt();const a=i.dataset.layerAction;if(a==="copy")Ii();else if(a==="paste")Ai(d);else if(a==="front"||a==="back")bs(a==="front");else if(a==="delete")Ti();else if(a==="crop"){const c=Jt();c&&ys(c)}}),P.addEventListener("keydown",e=>{var c;if(e.key==="Escape"||e.key==="Tab"){e.preventDefault(),Vt();return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const i=zi(),d=i.indexOf(document.activeElement),a=e.key==="ArrowDown"?1:-1;(c=i[(d+a+i.length)%i.length])==null||c.focus()}),F.addEventListener("scroll",Vt);const Qt=()=>{Z&&window.clearTimeout(Z.timer),Z=null},xs=e=>{Qt();const{clientX:i,clientY:d,pointerId:a}=e;Z={timer:window.setTimeout(()=>{Z=null,(O==null?void 0:O.pointerId)===a&&(An(O.start,0,0),O=null,delete S.dataset.dragging,E(S)),tt=null,Di(i,d)},kr),pointerId:a,x:i,y:d}},Hi=()=>{const[e,i]=[...lt.values()];return!e||!i?null:{distance:Math.hypot(i.x-e.x,i.y-e.y),mid:Q({clientX:(e.x+i.x)/2,clientY:(e.y+i.y)/2})}},ws=()=>{const e=Hi();if(!e)return;Qt(),O=null,tt=null,delete S.dataset.dragging,I(S);const i=Tn(e.mid);Y={...e,layerId:i.id,image:ke(i)},H()};S.addEventListener("pointerdown",e=>{var c;if(n.code.trim())return;const i=e.pointerType==="mouse";if(i&&(e.button!==0||ie&&e.ctrlKey))return;if((c=window.getSelection())==null||c.removeAllRanges(),Vt(),j&&Wt(!0),L){const p=Q(e),{box:g}=L;p.x>=g.x&&p.y>=g.y&&p.x<=g.x+g.w&&p.y<=g.y+g.h?ki(e,S,null):Dt(!0);return}if(e.pointerType==="touch"){lt.set(e.pointerId,{x:e.clientX,y:e.clientY});try{S.setPointerCapture(e.pointerId)}catch{}if(lt.size===2&&vn()){ws();return}if(lt.size>1)return;xs(e)}const d=Q(e),a=kn(d.x,d.y);if(i?e.shiftKey?a&&x.has(a.id)?x.delete(a.id):a&&x.add(a.id):a?x.has(a.id)||(x.clear(),x.add(a.id)):x.clear():(x.clear(),a&&x.add(a.id)),!a||i&&!x.has(a.id)){tt=null,H();return}tt={x:e.clientX,y:e.clientY,moved:!1,shift:e.shiftKey};try{S.setPointerCapture(e.pointerId)}catch{}I(S),O={id:a.id,origin:d,start:Ei(i?x:[a.id]),pointerId:e.pointerId},S.dataset.dragging="true",H()}),S.addEventListener("contextmenu",e=>{e.preventDefault(),!(n.code.trim()||L)&&(Qt(),j&&Wt(!0),Di(e.clientX,e.clientY))}),S.addEventListener("pointermove",e=>{if(lt.has(e.pointerId)&&lt.set(e.pointerId,{x:e.clientX,y:e.clientY}),(Z==null?void 0:Z.pointerId)===e.pointerId&&Math.hypot(e.clientX-Z.x,e.clientY-Z.y)>8&&Qt(),Y){const d=lt.has(e.pointerId)?Hi():null,a=ot(Y.layerId);if(!d||(a==null?void 0:a.kind)!=="image")return;const c=d.distance/Math.max(1,Y.distance),p=He(Y.image,Y.image.width*c,Y.mid.x,Y.mid.y);Ie(a,{x:p.x+d.mid.x-Y.mid.x,y:p.y+d.mid.y-Y.mid.y,width:p.width}),H();return}tt&&Math.hypot(e.clientX-tt.x,e.clientY-tt.y)>6&&(tt.moved=!0);const i=Q(e);if(In=i,!O||O.pointerId!==e.pointerId){S.dataset.hover=kn(i.x,i.y)?"true":"false";return}An(O.start,i.x-O.origin.x,i.y-O.origin.y),H()}),S.addEventListener("pointerleave",()=>{In=null});const Pi=e=>{if(lt.delete(e.pointerId),(Z==null?void 0:Z.pointerId)===e.pointerId&&Qt(),Y){lt.size<2&&(Y=null,E(S),A());return}if(!O||O.pointerId!==e.pointerId)return;const i=O.id;O=null,delete S.dataset.dragging,E(S),e.type==="pointerup"&&tt&&!tt.moved&&!tt.shift&&(x.size>1&&(x.clear(),x.add(i)),gs(i,e)),tt=null,H()};S.addEventListener("pointerup",Pi),S.addEventListener("pointercancel",Pi);const Oi=new EventTarget;let Ri=0;S.addEventListener("wheel",e=>{if(!ie||!e.ctrlKey||n.code.trim()||L||!vn())return;e.preventDefault(),I(Oi);const i=Q(e),d=Tn(i);Ie(d,He(ke(d),d.width*Math.exp(-e.deltaY*.01),i.x,i.y)),H(),window.clearTimeout(Ri),Ri=window.setTimeout(()=>{E(Oi),A()},250)},{passive:!1}),F.addEventListener("wheel",e=>{if(!(ie?e.metaKey:e.ctrlKey))return;e.preventDefault();const i=e.deltaMode===WheelEvent.DOM_DELTA_LINE?e.deltaY*33:e.deltaY;q=Math.min(Pn,Math.max(Hn,q*Math.exp(-i*.002))),_t()},{passive:!1});const Ni=new EventTarget;let te=null;S.addEventListener("gesturestart",e=>{if(e.preventDefault(),Y||n.code.trim()||L||!vn())return;I(Ni);const i=Q(e),d=Tn(i);te={layerId:d.id,image:ke(d),anchor:i}}),S.addEventListener("gesturechange",e=>{if(e.preventDefault(),!te||Y)return;const{layerId:i,image:d,anchor:a}=te,c=ot(i);(c==null?void 0:c.kind)==="image"&&(Ie(c,He(d,d.width*e.scale,a.x,a.y)),H())}),S.addEventListener("gestureend",e=>{e.preventDefault(),te&&(te=null,E(Ni),A())}),F.addEventListener("pointerdown",e=>{e.target===S||x.size===0||e.target instanceof Element&&e.target.closest(".studio__handle")||(x.clear(),H())});const _s=async(e,i)=>{const d=Ee(e),a=d?await Gn(d).catch(()=>null):null,c=a&&a.naturalWidth>0?a.naturalHeight/a.naturalWidth:1;j&&Wt(!0),L&&Dt(!0),qe(()=>{const p=ht(n.cardWidth/2),g={id:en(),kind:"image",src:e,x:0,y:0,width:p,crop:null};Object.assign(g,Gt(g,i.x-p/2,i.y-p*c/2)),n.layers.push(g),x.clear(),x.add(g.id)})},Fi=e=>{var i;return!n.code.trim()&&!!((i=e.dataTransfer)!=null&&i.types.includes(On))};F.addEventListener("dragover",e=>{Fi(e)&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect="copy"),F.dataset.dropping="true")}),F.addEventListener("dragleave",e=>{e.relatedTarget instanceof Node&&F.contains(e.relatedTarget)||delete F.dataset.dropping}),F.addEventListener("drop",e=>{var d;if(delete F.dataset.dropping,!Fi(e))return;const i=(d=e.dataTransfer)==null?void 0:d.getData(On);i&&(e.preventDefault(),_s(i,Q(e)))}),K==null||K.addEventListener("dragend",()=>delete F.dataset.dropping);const Ce=e=>{const i=Se.getBoundingClientRect().width,d=Ft+jn+Kn,a=Number.isFinite(e)?e:n.controlsWidth;n.controlsWidth=i>=d?Ls(a,i):Math.max(Ft,Math.round(a)),Se.style.setProperty("--studio-controls-width",`${n.controlsWidth}px`),V.setAttribute("aria-valuenow",String(n.controlsWidth)),V.setAttribute("aria-valuemax",String(i>=d?Math.max(Ft,Math.round(i)-jn-Kn):n.controlsWidth)),_t()};Ce(n.controlsWidth);const yt=t.querySelector("#studio-device"),Bi=[...t.querySelectorAll(".studio-devices__btn")],Ui=t.querySelector("#studio-device-thumb"),ji=yt==null?void 0:yt.parentElement,zn=yt&&Ui&&ji?Eo(yt,Ui,ji):null,ze=()=>{if(!yt)return;const e=Vo();yt.dataset.device=e,yt.dataset.framed=e===ai()?"false":"true";for(const i of Bi)i.setAttribute("aria-pressed",i.dataset.device===e?"true":"false");Ce(n.controlsWidth),zn==null||zn()};ze();for(const e of Bi)e.addEventListener("click",()=>{Je=e.dataset.device,ze()});Ne==null||Ne();const Ki=[window.matchMedia(Go),window.matchMedia(Jo)];for(const e of Ki)e.addEventListener("change",ze);Ne=()=>{for(const e of Ki)e.removeEventListener("change",ze)},Fe==null||Fe();const Yi=e=>{if(!(e.metaKey||e.ctrlKey)||e.altKey)return;const i=e.code==="KeyZ"&&e.shiftKey||e.code==="KeyY"&&e.ctrlKey&&!e.shiftKey;if(!(e.code==="KeyZ"&&!e.shiftKey)&&!i)return;const a=i?pn:_e;if(!a.isConnected||a.disabled)return;const c=e.target;c instanceof HTMLElement&&(c.isContentEditable||c.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"))||(e.preventDefault(),a.click())};document.addEventListener("keydown",Yi),Fe=()=>document.removeEventListener("keydown",Yi),Be==null||Be();const Xi=new EventTarget;let Zi=0;const $s={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}},Gi=e=>{var W;if(!S.isConnected)return;const i=(e.metaKey||e.ctrlKey)&&!e.altKey,d=i?e.code==="Equal"||e.code==="NumpadAdd"?we:e.code==="Minus"||e.code==="NumpadSubtract"?xe:null:null;if(d){e.preventDefault(),d.click();return}const a=e.target,c=a===document.body||a instanceof Node&&F.contains(a);if(j||n.code.trim())return;const p=a instanceof HTMLElement&&(a.isContentEditable||a.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button], [type=file])"));if(!i&&!L&&!p&&(e.key==="Delete"||e.key==="Backspace")&&x.size>0){e.preventDefault(),qn(At())?Ti():Ot("타이틀·본문·이미지는 하나씩 남아 있어야 합니다.");return}if(i&&!L){if(p||(W=window.getSelection())!=null&&W.toString())return;e.code==="KeyC"&&x.size>0?(e.preventDefault(),Ii()):e.code==="KeyV"&&re.length>0&&(e.preventDefault(),Ai(In));return}if(!c)return;if(L){if(e.key!=="Enter"&&e.key!=="Escape")return;e.preventDefault(),Dt(e.key==="Enter");return}if(i)return;const g=$s[e.key];if(!g||e.altKey||x.size===0)return;e.preventDefault();const _=e.shiftKey?Lr:Er;I(Xi),An(Ei(x),g.x*_,g.y*_),_e.disabled=!1,H(),window.clearTimeout(Zi),Zi=window.setTimeout(()=>{E(Xi),A()},400)};document.addEventListener("keydown",Gi),Be=()=>document.removeEventListener("keydown",Gi),V.addEventListener("pointerdown",e=>{if(Se.getBoundingClientRect().width<768)return;try{V.setPointerCapture(e.pointerId)}catch{}const i=e.clientX,d=n.controlsWidth,a=p=>{p.pointerId===e.pointerId&&Ce(d+p.clientX-i)},c=p=>{p.pointerId===e.pointerId&&(V.removeEventListener("pointermove",a),V.removeEventListener("pointerup",c),V.removeEventListener("pointercancel",c))};V.addEventListener("pointermove",a),V.addEventListener("pointerup",c),V.addEventListener("pointercancel",c)}),V.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const i=e.shiftKey?48:16;Ce(n.controlsWidth+(e.key==="ArrowRight"?i:-i))}),(ro=t.querySelector("#studio-controls"))==null||ro.addEventListener("submit",e=>{e.preventDefault()}),ae==null||ae.disconnect(),ae=new ResizeObserver(()=>_t()),ae.observe(F),A()}const ts="ax-design-studio-mode",Lo="./data/index.json";let nt={status:"loading"},an=on(),es="all",C=null,Ke=null,Ve=null,R=Zn();function Jn(){const t=localStorage.getItem(ts);return t==="light"||t==="dark"?t:"dark"}function Mo(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(ts,t)}function Rn(t,n,o){return`<a class="nav-link${o?" nav-link--current":""}" href="${n}" ${o?'aria-current="page"':""}>${t}</a>`}function Hr(){return`
    <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.8-1.4-2-3.4-2.2.7a8 8 0 0 0-1.9-1.1L14.6 3h-5.2l-.55 2.7a8 8 0 0 0-1.9 1.1l-2.2-.7-2 3.4 1.8 1.4a7.7 7.7 0 0 0 .05 2.2l-1.8 1.4 2 3.4 2.2-.7a8 8 0 0 0 1.9 1.1l.55 2.7h5.2l.55-2.7a8 8 0 0 0 1.9-1.1l2.2.7 2-3.4-1.8-1.4Z" />
    </svg>
  `}function Pr(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function di(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),n=oi(t);return n?le(n.r,n.g,n.b):st(t)??le(216,241,255)}function de(t,n){return n.some(o=>o.slug===t)?t:null}function Or(t,n,o){var r,u,l;const s=t?de(t,o):null;if(n&&n!==Ve){const m=Fo().find(f=>f.id===n),h=m?Po(structuredClone(m.state)):null;if(h)return C=h,de(C.themeSlug,o)||(C.themeSlug=((r=o[0])==null?void 0:r.slug)??""),Ve=n,Ke=t,C}if(n||(Ve=null),!C){const m=No();return C=m?structuredClone(m):dn(s??de(To,o)??((u=o[0])==null?void 0:u.slug)??"",di()),m&&s&&uo(C,s),m&&!de(C.themeSlug,o)&&(C.themeSlug=s??((l=o[0])==null?void 0:l.slug)??""),Ke=t,C}return t&&t!==Ke&&s&&(uo(C,s),Ke=t),C}function Rr(t){const n=Jn(),o=n==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=R.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${Rn("Graphic Library",ft({name:"archive"}),R.name==="archive"||R.name==="capture")}
        ${Rn("Online Marketing Studio",ft({name:"studio",theme:null,card:null}),R.name==="studio")}
        ${Rn("History",ft({name:"history"}),R.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${o}" title="${o}">
          ${Pr(n)}
        </button>
        <div class="nav-settings">
          <button type="button" class="button button--secondary" id="nav-settings" aria-label="설정" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-settings-menu">
            ${Hr()}
          </button>
          <div class="nav-popover" id="nav-settings-menu" role="menu" hidden>
            <button type="button" class="nav-popover__item" id="nav-reset" role="menuitem">리셋</button>
          </div>
        </div>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${t}</main>
  `}function Nr(){if(nt.status==="loading")return`
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
    `;const t=nt.index;switch(R.name){case"archive":return dr(t,an,es,Fo());case"capture":return wr(t,R.slug,an);case"studio":return Wr(Or(R.theme,R.card,t.captures),t.captures);case"history":return $r(t);case"notfound":return Sr(R.path)}}function pt(){var n,o;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Mo(Jn()),an=on(),t.innerHTML=Rr(Nr()),(n=t.querySelector("#index-retry"))==null||n.addEventListener("click",()=>{ns()}),(o=t.querySelector("#mode-toggle"))==null||o.addEventListener("click",()=>{Mo(Jn()==="dark"?"light":"dark"),pt()}),Fr(t),nt.status==="ready"&&(R.name==="archive"&&cr(t,{onTabChange:s=>{var r;es=s,pt(),(r=document.querySelector(`[data-archive-tab="${s}"]`))==null||r.focus()}}),R.name==="capture"&&_r(t,s=>{an=Fs(s),pt()}),R.name==="studio"&&nt.status==="ready"&&C&&Dr(t,C,nt.index.captures,{onReset:()=>{var s;C&&(Ds(C,No(),di()),pt(),(s=document.querySelector("#studio-reset"))==null||s.focus())},onSetBaseline:()=>{C&&Bs(structuredClone(C))},onAddToLibrary:s=>C?Xs(C,s).then(r=>r!==null):Promise.resolve(!1)}))}function Fr(t){var m;const n=t.querySelector("#nav-settings"),o=t.querySelector("#nav-settings-menu"),s=t.querySelector(".nav-settings");if(!n||!o||!s)return;const r=()=>{o.hidden=!0,n.setAttribute("aria-expanded","false"),document.removeEventListener("click",u),document.removeEventListener("keydown",l)},u=h=>{h.target instanceof Node&&s.contains(h.target)||r()},l=h=>{h.key==="Escape"&&r()};n.addEventListener("click",h=>{if(h.stopPropagation(),!o.hidden){r();return}o.hidden=!1,n.setAttribute("aria-expanded","true"),document.addEventListener("click",u),document.addEventListener("keydown",l)}),(m=t.querySelector("#nav-reset"))==null||m.addEventListener("click",()=>{r(),(async()=>{if(await Ge("세팅한 초기화 기준을 지우고 진행하시겠습니까?")){if(Us(),Ve=null,C){const f=nt.status==="ready"?nt.index.captures:[],w=de(To,f)??C.themeSlug;C=dn(w,di())}R.name==="studio"&&R.card&&(R={name:"studio",theme:null,card:null},history.replaceState(null,"",ft(R))),pt(),Ot("리셋하였습니다.")}})()})}async function Br(){const t=await fetch(`${Lo}?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)throw new Error(`${Lo} → HTTP ${t.status}`);const n=await t.text();if(n.trimStart().startsWith("<"))throw new Error("index.json 대신 HTML이 왔습니다. 데이터 빌드가 끝나는 중일 수 있습니다.");const o=JSON.parse(n);if(!o||!Array.isArray(o.captures)||!o.facets)throw new Error("Index JSON is missing captures or facets");return o}async function ns(){nt={status:"loading"},pt();let t;for(let n=0;n<20;n+=1)try{const o=await Br();await Promise.all([Ys(),Vs()]),nt={status:"ready",index:o},pt();return}catch(o){t=o,await new Promise(s=>window.setTimeout(s,400))}nt={status:"error",message:t instanceof Error?t.message:String(t)},pt()}er(t=>{if(Zo(window.location.hash)){window.location.replace(ft({name:"studio",theme:null,card:null}));return}R=t,pt()});ns();
