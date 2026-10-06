(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const u of r)if(u.type==="childList")for(const l of u.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const u={};return r.integrity&&(u.integrity=r.integrity),r.referrerPolicy&&(u.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?u.credentials="include":r.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(r){if(r.ep)return;r.ep=!0;const u=o(r);fetch(r.href,u)}})();const Tn="ig-feed-square",qn=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function Et(t){return qn.find(n=>n.id===t)??qn[0]}const te=0,Re=120,as=28,gt=100,$t=4e3,Cn=5,jn=10,Lt=100,zn=4e3,zt=240,bo=360,Wn=280,Hn=6,vo="Hello",xo=`헤르메스의 대표 브랜드 에셋입니다.
에이전트의 그래픽 결과물을 합성하였습니다.`,_o="black-mountain-red-horizon",Kn=100,Yn=32,wo=71,$o=99,So=77,Eo=209,Ke=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Qi="rgb(0, 0, 0)",to="rgb(255, 255, 255)";function Xn(t){return Number.isFinite(t)?Math.min(Re,Math.max(te,Math.round(t))):te}function dt(t){return Number.isFinite(t)?Math.min($t,Math.max(gt,Math.round(t))):gt}function ds(t,n,o){const s=Math.max(1,Math.round(t)),u=Math.max(1,Math.round(n))/s;let l=dt(o);const f=Math.round(l*u);let h=dt(f);return f!==h&&(l=dt(Math.round(h/u)),h=dt(Math.round(l*u))),{cardWidth:l,cardHeight:h}}function Zn(t){return Math.max(Cn,dt(t)-jn*2)}function Wt(t,n){const o=Zn(n);return Number.isFinite(t)?Math.min(o,Math.max(Cn,Math.round(t))):Cn}function xt(t){return Number.isFinite(t)?Math.min(zn,Math.max(Lt,Math.round(t))):Lt}function bt(t){return Math.round(t*2)/2}function Ye(t,n,o){const s=Math.max(0,Math.round(n)-Math.min(Math.max(o,0),Math.round(n)));return Number.isFinite(t)?Math.min(s,Math.max(0,bt(t))):0}function ke(t,n,o){const s=Math.round(-o+40),r=Math.round(n-40);return Number.isFinite(t)?s>r?Math.round((n-o)/2):Math.min(r,Math.max(s,bt(t))):0}function Ie(t,n,o,s){const r=xt(n),u=r/Math.max(1,t.width);return{x:Math.round(o-(o-t.x)*u),y:Math.round(s-(s-t.y)*u),width:r}}function cs(t,n){const o=Math.max(zt,Math.round(n)-Wn-Hn);return Number.isFinite(t)?Math.min(o,Math.max(zt,Math.round(t))):bo}function ls(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function Ht(t,n=[]){var s;const o=Ke.find(r=>r.id===t);return o?o.stack:((s=n.find(r=>r.id===t))==null?void 0:s.stack)??Ke[0].stack}function Fe(t,n=Et(Tn).width,o=Et(Tn).height){if(t==="image")return{id:"image",kind:t,x:0,y:0,width:xt(n),crop:null};const s=t==="title",r=Wt(s?Kn:Yn,n);return{id:t,kind:t,text:s?vo:xo,x:Ye(s?wo:So,n,r),y:Ye(s?$o:Eo,o,r),size:r,fontId:s?"montserrat":"pretendard",color:ee(0,0,0)}}function Ge(t,n){const o=Et(Tn);return{presetId:o.id,cardWidth:o.width,cardHeight:o.height,themeSlug:t,color:n,radius:as,code:"",panel:"design",controlsWidth:bo,layers:[Fe("image"),Fe("body"),Fe("title")]}}function Gn(){return`layer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}function Ae(t){return t.kind!=="image"}function Dn(t,n){return t.layers.find(o=>o.kind===n)}function ot(t,n){const o=t.layers.find(r=>r.kind===n);if(o)return o;const s=Fe(n,t.cardWidth,t.cardHeight);return s.id=Gn(),n==="image"?t.layers.unshift(s):t.layers.push(s),s}function Jn(t,n){const o=t.crop;return o?t.width*n*o.h/o.w:t.width*n}function Lo(t,n){const o=t.crop??{x:0,y:0,w:1},s=t.width/o.w,r=s*n;return{x:t.x-o.x*s,y:t.y-o.y*r,w:s,h:r}}function us(t,n){const o={x:(n.x-t.x)/t.w,y:(n.y-t.y)/t.h,w:n.w/t.w,h:n.h/t.h},s=(r,u)=>Math.abs(r-u)<.001;return s(o.x,0)&&s(o.y,0)&&s(o.w,1)&&s(o.h,1)?null:o}const hs=20;function Ct(t,n,o){return Math.min(Math.max(t,n),Math.max(n,o))}function ps(t,n,o,s,r){const u=Math.min(Lt,t.w),l=Math.min(hs,t.h);let f=n.x,h=n.y,y=n.x+n.w,g=n.y+n.h;return o.includes("w")&&(f=Ct(f+s,t.x,y-u)),o.includes("e")&&(y=Ct(y+s,f+u,t.x+t.w)),o.includes("n")&&(h=Ct(h+r,t.y,g-l)),o.includes("s")&&(g=Ct(g+r,h+l,t.y+t.h)),{x:f,y:h,w:y-f,h:g-h}}function fs(t,n,o,s){return{...n,x:Ct(n.x+o,t.x,t.x+t.w-n.w),y:Ct(n.y+s,t.y,t.y+t.h-n.h)}}function ms(t,n){if(!t||typeof t!="object")return null;const o=t,s=f=>typeof f=="number"&&Number.isFinite(f)?f:null,r=typeof o.id=="string"&&o.id?o.id:Gn(),u=s(o.x)??0,l=s(o.y)??0;if(o.kind==="image"){const f=o.crop,h=s(f==null?void 0:f.x),y=s(f==null?void 0:f.y),g=s(f==null?void 0:f.w),x=s(f==null?void 0:f.h);return{id:r,kind:"image",x:u,y:l,width:xt(s(o.width)??Lt),crop:h!==null&&y!==null&&g&&x?{x:h,y,w:g,h:x}:null}}return o.kind!=="title"&&o.kind!=="body"?null:{id:r,kind:o.kind,text:typeof o.text=="string"?o.text:"",x:u,y:l,size:s(o.size)??(o.kind==="title"?Kn:Yn),fontId:typeof o.fontId=="string"&&o.fontId?o.fontId:"pretendard",color:st(String(o.color??""))??n}}function ys(t,n){const o=(u,l)=>typeof u=="number"&&Number.isFinite(u)?u:l,s=(u,l)=>typeof u=="string"?u:l,r=s(t.fontId,"pretendard");return[{id:"image",kind:"image",x:o(t.imageX,0),y:o(t.imageY,0),width:xt(o(t.imageWidth,Lt)),crop:null},{id:"body",kind:"body",text:s(t.body,xo),x:o(t.bodyX,So),y:o(t.bodyY,Eo),size:o(t.bodySize,Yn),fontId:s(t.bodyFontId,r)||r,color:st(s(t.bodyColor,""))??n},{id:"title",kind:"title",text:s(t.title,vo),x:o(t.titleX,wo),y:o(t.titleY,$o),size:o(t.titleSize,Kn),fontId:s(t.titleFontId,r)||r,color:st(s(t.titleColor,""))??n}]}function Mo(t){if(!t||typeof t!="object")return null;const n=t;if(typeof n.themeSlug!="string"||typeof n.color!="string")return null;const o=(l,f)=>typeof l=="number"&&Number.isFinite(l)?l:f,s=Ge(n.themeSlug,n.color),r=Pn(n.color),u={...s,presetId:typeof n.presetId=="string"?n.presetId:s.presetId,cardWidth:dt(o(n.cardWidth,s.cardWidth)),cardHeight:dt(o(n.cardHeight,s.cardHeight)),radius:Xn(o(n.radius,s.radius)),code:typeof n.code=="string"?n.code:"",panel:n.panel==="code"?"code":"design",controlsWidth:o(n.controlsWidth,s.controlsWidth),layers:Array.isArray(n.layers)?n.layers.map(l=>ms(l,r)).filter(l=>l!==null):ys(n,r)};return ot(u,"image"),ot(u,"body"),ot(u,"title"),u}function gs(t,n){const o=Ge(t.themeSlug,n);o.controlsWidth=t.controlsWidth,o.panel=t.panel,Object.assign(t,o)}function bs(t,n,o){if(!n){gs(t,o);return}Object.assign(t,structuredClone(n))}function st(t){const n=t.trim().match(/^#([0-9a-fA-F]{6})$/);return n?`#${n[1].toLowerCase()}`:null}function ee(t,n,o){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(t)}${s(n)}${s(o)}`}function Vn(t){const n=st(t);if(n)return{r:Number.parseInt(n.slice(1,3),16),g:Number.parseInt(n.slice(3,5),16),b:Number.parseInt(n.slice(5,7),16)};const o=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return o?{r:Number(o[1]),g:Number(o[2]),b:Number(o[3])}:null}function Tt(t){const n=t/255;return n<=.03928?n/12.92:((n+.055)/1.055)**2.4}function eo(t,n){const o=.2126*Tt(t.r)+.7152*Tt(t.g)+.0722*Tt(t.b),s=.2126*Tt(n.r)+.7152*Tt(n.g)+.0722*Tt(n.b),r=Math.max(o,s),u=Math.min(o,s);return(r+.05)/(u+.05)}function Pn(t){const n=Vn(ko(t));return n?ee(n.r,n.g,n.b):ee(0,0,0)}function ko(t){const n=Vn(t)??{r:255,g:255,b:255},o=eo({r:0,g:0,b:0},n),s=eo({r:255,g:255,b:255},n);return o>=4.5&&o>=s?Qi:s>=4.5?to:o>=s?Qi:to}function vs(t,n,o){if(n<=0)return[];const s=[];for(const r of t.split(`
`)){const u=r.split(/\s+/).filter(Boolean);if(u.length===0){s.push("");continue}let l="";const f=h=>{if(o(h)<=n){l=h;return}let y="";for(const g of h){const x=y+g;o(x)<=n?y=x:(y&&s.push(y),y=g)}l=y};for(const h of u){const y=l?`${l} ${h}`:h;o(y)<=n?l=y:(l&&s.push(l),f(h))}l&&s.push(l)}return s}function Oe(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function xs(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function _s(t,n){return xs(t).replaceAll("{{title}}",Oe(n.title)).replaceAll("{{body}}",Oe(n.body)).replaceAll("{{themeImage}}",Oe(n.themeImage))}function Be(t,n=1,o=[]){const s=h=>`${Math.round(h*100)/100}px`,r=Dn(t,"title"),u=Dn(t,"body"),l=[],f=[];return t.layers.forEach((h,y)=>{const g=`layer-${y+1}`,x=`left: ${s(h.x)}; top: ${s(h.y)};`;if(h.kind==="image"){if(h.crop){const v=Lo(h,n);l.push(`  <div class="studio-crop ${g}"><img src="{{themeImage}}" alt="" /></div>`),f.push(`  .studio-card .${g} { ${x} width: ${s(h.width)}; height: ${s(Jn(h,n))}; }`),f.push(`  .studio-card .${g} img { left: ${s(v.x-h.x)}; top: ${s(v.y-h.y)}; width: ${s(v.w)}; }`)}else l.push(`  <img class="${g}" src="{{themeImage}}" alt="" />`),f.push(`  .studio-card .${g} { ${x} width: ${s(h.width)}; }`);return}const C=h.kind==="title"?"h1":"p",R=h===r?"{{title}}":h===u?"{{body}}":Oe(h.text);l.push(`  <${C} class="${g}">${R}</${C}>`),f.push(`  .studio-card .${g} { ${x} font-size: ${s(h.size)}; font-family: ${Ht(h.fontId,o)}; color: ${h.color}; }`)}),`<article class="studio-card">
${l.join(`
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
${f.join(`
`)}
</style>`}function Nn(t){const n=st(t.color)??t.color,o=ko(n),s=st(t.titleColor)??Pn(n),r=st(t.bodyColor)??Pn(n),u=Xn(t.radius),l=Et("ig-feed-square"),f=t.width>0?t.width:l.width,h=t.height>0?t.height:l.height,y=t.titleFontStack.replaceAll(";",""),g=t.bodyFontStack.replaceAll(";",""),x=_s(t.code.trim()||t.design,t),C=[`--studio-color:${n}`,`--studio-ink:${o}`,`--studio-radius:${u}px`,`--studio-width:${f}px`,`--studio-height:${h}px`,`--studio-title-font:${y}`,`--studio-body-font:${g}`,`--studio-title-size:${Wt(t.titleSize,f)}px`,`--studio-body-size:${Wt(t.bodySize,f)}px`,`--studio-title-x:${bt(t.titleX)}px`,`--studio-title-y:${bt(t.titleY)}px`,`--studio-body-x:${bt(t.bodyX)}px`,`--studio-body-y:${bt(t.bodyY)}px`,`--studio-image-width:${xt(t.imageWidth)}px`,`--studio-image-x:${bt(t.imageX)}px`,`--studio-image-y:${bt(t.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${h}px;margin:0;background:transparent;${C}">${x}</div>`}function ws(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Nn(t)}</body>
</html>`}const Io="design-llm-wiki-pins";function Xe(){try{const t=localStorage.getItem(Io);if(!t)return[];const n=JSON.parse(t);return Array.isArray(n)?n.filter(o=>typeof o=="string"):[]}catch{return[]}}function $s(t){const n=[...new Set(t)];localStorage.setItem(Io,JSON.stringify(n))}function Ss(t){const n=Xe(),o=n.includes(t)?n.filter(s=>s!==t):[...n,t];return $s(o),Xe()}const Qn="ax-studio-baseline";function Ao(){try{const t=localStorage.getItem(Qn);return t?Mo(JSON.parse(t)):null}catch{return null}}function Es(t){localStorage.setItem(Qn,JSON.stringify(t))}function Ls(){localStorage.removeItem(Qn)}const Ms="ax-design-studio",Dt="cards";let ne=[];function To(){return ne}function qo(){return new Promise((t,n)=>{const o=indexedDB.open(Ms,1);o.onupgradeneeded=()=>{const s=o.result;s.objectStoreNames.contains(Dt)||s.createObjectStore(Dt,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error??new Error("indexedDB open failed"))})}function ks(){const t=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`saved-${t}-${n}`}async function Is(){try{const t=await qo(),n=await new Promise((o,s)=>{const r=t.transaction(Dt,"readonly").objectStore(Dt).getAll();r.onsuccess=()=>o(r.result??[]),r.onerror=()=>s(r.error??new Error("indexedDB read failed"))});t.close(),ne=n.sort((o,s)=>o.createdAt<s.createdAt?1:-1)}catch{ne=[]}}async function As(t,n){var s;const o={id:ks(),title:((s=Dn(t,"title"))==null?void 0:s.text.trim())||"제목 없음",createdAt:new Date().toISOString(),state:structuredClone(t),thumbnail:n};try{const r=await qo();return await new Promise((u,l)=>{const f=r.transaction(Dt,"readwrite").objectStore(Dt).put(o);f.onsuccess=()=>u(),f.onerror=()=>l(f.error??new Error("indexedDB write failed"))}),r.close(),ne=[o,...ne],o}catch{return null}}let no=0;function Rn(t){return new Promise(n=>{var h,y,g;const o=document.createElement("div");o.className="confirm-backdrop",o.innerHTML=`
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-message">
        <p class="confirm-dialog__message" id="confirm-message"></p>
        <div class="confirm-dialog__actions">
          <button type="button" class="button button--secondary" data-confirm="cancel">취소</button>
          <button type="button" class="button" data-confirm="ok">진행</button>
        </div>
      </div>
    `;const s=o.querySelector("#confirm-message");s&&(s.textContent=t);const r=document.activeElement instanceof HTMLElement?document.activeElement:null;let u=!1;const l=x=>{u||(u=!0,document.removeEventListener("keydown",f),o.remove(),r==null||r.focus(),n(x))},f=x=>{x.key==="Escape"&&(x.preventDefault(),l(!1))};o.addEventListener("click",x=>{x.target===o&&l(!1)}),(h=o.querySelector("[data-confirm='cancel']"))==null||h.addEventListener("click",()=>l(!1)),(y=o.querySelector("[data-confirm='ok']"))==null||y.addEventListener("click",()=>l(!0)),document.addEventListener("keydown",f),document.body.append(o),(g=o.querySelector("[data-confirm='ok']"))==null||g.focus()})}function Fn(t){var o;(o=document.querySelector(".toast"))==null||o.remove(),window.clearTimeout(no);const n=document.createElement("div");n.className="toast",n.setAttribute("role","status"),n.textContent=t,document.body.append(n),no=window.setTimeout(()=>n.remove(),2400)}const Co="[a-z0-9]+(?:-[a-z0-9]+)*";function zo(t){const n=t.startsWith("#")?t.slice(1):t,o=n.indexOf("?"),s=o>=0?n.slice(0,o):n,r=o>=0?n.slice(o+1):"",u=s.startsWith("/")?s:`/${s}`;return{path:u==="/"||u===""?"/":u.replace(/\/+$/,"")||"/",query:r}}function io(t,n){const o=new URLSearchParams(t).get(n);return!o||!new RegExp(`^${Co}$`).test(o)?null:o}function Wo(t){const{path:n}=zo(t);return n==="/intake"||n==="/design-system"||n==="/stats"}function On(t=window.location.hash){const{path:n,query:o}=zo(t);if(n==="/"||n==="/gallery")return{name:"archive"};if(n==="/history")return{name:"history"};if(n==="/studio"||Wo(t))return{name:"studio",theme:n==="/studio"?io(o,"theme"):null,card:n==="/studio"?io(o,"card"):null};const s=n.match(new RegExp(`^/capture/(${Co})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:n}}function pt(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":{const n=new URLSearchParams;t.card?n.set("card",t.card):t.theme&&n.set("theme",t.theme);const o=n.toString();return o?`#/studio?${o}`:"#/studio"}case"history":return"#/history";case"notfound":return`#${t.path}`}}function Ts(t){const n=()=>t(On());return window.addEventListener("hashchange",n),t(On()),()=>window.removeEventListener("hashchange",n)}function qs(t){return[...t].sort((n,o)=>n.capturedAt!==o.capturedAt?n.capturedAt<o.capturedAt?1:-1:n.slug.localeCompare(o.slug))}function b(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function St(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let Te=null;function Cs(t){const n=t.querySelector(".archive-tabs__indicator"),o=t.querySelector('.archive-tab[aria-selected="true"]');if(!n||!o)return;const s=o.offsetLeft,r=o.offsetWidth;Te&&(n.style.transition="none",n.style.transform=`translateX(${Te.left}px)`,n.style.width=`${Te.width}px`,n.offsetWidth,n.style.transition=""),requestAnimationFrame(()=>{n.style.transform=`translateX(${s}px)`,n.style.width=`${r}px`,Te={left:s,width:r}})}function En(t){const n=t.querySelector(".capture-grid");if(!n)return;const o=window.getComputedStyle(n),s=Number.parseFloat(o.gridAutoRows)||1,r=Number.parseFloat(o.rowGap)||0;n.querySelectorAll(".capture-card").forEach(u=>{u.style.gridRowEnd="";const l=u.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(u).marginBottom)||0,h=Math.ceil((l+f+r)/(s+r));u.style.gridRowEnd=`span ${Math.max(1,h)}`})}function zs(t){const n=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.thumbPath??t.asset.path;return`<img class="capture-card__media" src="${b(St(n))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function Ws(t){const n=`${t.state.cardWidth} × ${t.state.cardHeight}`;return`
    <article class="capture-card">
      <a class="capture-card__link" href="${pt({name:"studio",theme:null,card:t.id})}">
        <div class="capture-card__frame">
          <img class="capture-card__media" src="${b(t.thumbnail)}" alt="" width="${t.state.cardWidth}" height="${t.state.cardHeight}" />
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${b(t.title)}</h2>
          <p class="capture-card__insight">${b(n)}</p>
        </div>
      </a>
    </article>
  `}function Hs(t,n){return`
    <article class="capture-card${n?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${pt({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${zs(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${b(t.asset.kind)}</span>`}
          ${n?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${b(t.title)}</h2>
          <p class="capture-card__insight">${b(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Ds(t,n){const o=new Set(n),s=qs(t),r=s.filter(y=>o.has(y.slug)),u=s.filter(y=>!o.has(y.slug)),l=new Map(s.map(y=>[y.slug,y])),f=n.map(y=>l.get(y)).filter(y=>!!y),h=r.filter(y=>!n.includes(y.slug));return[...f,...h,...u]}function Ps(t,n,o,s){const r=new Set(n),u=o==="pin"?t.captures.filter(f=>r.has(f.slug)):t.captures,l=Ds(u,n);return t.captures.length===0?`
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
          <p class="gallery__meta">${o==="saved"?`Saved ${s.length}`:`Target ${b(t.target)} · ${l.length} · ${n.length} pinned`}</p>
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
                </section>`:`<div class="capture-grid">${s.map(f=>Ws(f)).join("")}</div>`:l.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${o==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${o==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${l.map(f=>Hs(f,n.includes(f.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Ns(t,n){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const u=r.dataset.archiveTab;(u==="all"||u==="pin"||u==="saved")&&n.onTabChange(u)})}),Cs(t),requestAnimationFrame(()=>En(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>En(t),{once:!0})});const o=new ResizeObserver(()=>En(t)),s=t.querySelector(".capture-grid");s&&o.observe(s)}function Rs(t){const n=t.replace(/\r\n/g,`
`).split(`
`),o=[];let s=!1;const r=()=>{s&&(o.push("</ul>"),s=!1)};for(const u of n){const l=u.trim();if(!l){r();continue}if(l.startsWith("### ")){r(),o.push(`<h3>${Xt(l.slice(4))}</h3>`);continue}if(l.startsWith("## ")){r(),o.push(`<h2>${Xt(l.slice(3))}</h2>`);continue}if(l.startsWith("# ")){r(),o.push(`<h1>${Xt(l.slice(2))}</h1>`);continue}if(l.startsWith("- ")){s||(o.push("<ul>"),s=!0),o.push(`<li>${Xt(l.slice(2))}</li>`);continue}r(),o.push(`<p>${Xt(l)}</p>`)}return r(),o.join(`
`)}function Xt(t){let n=b(t);return n=n.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(o,s)=>`<a href="${pt({name:"capture",slug:s})}">${s}</a>`),n=n.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(o,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${b(r)}">${s}</a>`),n}const Fs=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Os(t){return Math.max(35,Math.min(98,Math.round(t)))}function Bs(t){let n=0;for(const o of t)n=(n*31+o.charCodeAt(0))%997;return n}function Us(t){var y;if((y=t.analysisScores)!=null&&y.length)return t.analysisScores;const n=Bs(`${t.slug}:${t.title}:${t.insight}`),o=t.tags.includes("density")?7:0,s=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),u=t.asset.width/Math.max(1,t.asset.height),l=u>1.2?6:0,f=u<.75?5:0,h=[68+r+l+n%9,66+o+(n>>1)%10,64+(t.insight.length>45?8:3)+(n>>2)%9,58+s+(t.uiPatterns.includes("filter-chips")?7:0),62+f+r+(n>>3)%8].map(Os);return Fs.map(([g,x],C)=>({key:g,label:x,score:h[C]??60,description:Ks(x,h[C]??60,t)}))}function js(t){return t.length===0?0:Math.round(t.reduce((n,o)=>n+o.score,0)/t.length)}function Ks(t,n,o){return t==="레이아웃"?`${o.screenType} 화면 구조와 ${o.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?o.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":n>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function Ys(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Xs(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${b(St(t.asset.posterPath))}"`:""}>
        <source src="${b(St(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${b(St(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function Zs(t){const n=Us(t),o=t.analysisTotal??js(n),s=160,r=110,u=[.25,.5,.75,1].map(h=>n.map((y,g)=>{const x=-Math.PI/2+g*Math.PI*2/n.length,C=s+Math.cos(x)*r*h,R=s+Math.sin(x)*r*h;return`${C.toFixed(1)},${R.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),l=n.map((h,y)=>{const g=-Math.PI/2+y*Math.PI*2/n.length,x=r*(h.score/100),C=s+Math.cos(g)*x,R=s+Math.sin(g)*x;return`${C.toFixed(1)},${R.toFixed(1)}`}).join(" "),f=n.map((h,y)=>{const g=-Math.PI/2+y*Math.PI*2/n.length,x=s+Math.cos(g)*r,C=s+Math.sin(g)*r,R=s+Math.cos(g)*r*(h.score/100),v=s+Math.sin(g)*r*(h.score/100),B=s+Math.cos(g)*(r+26),w=s+Math.sin(g)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${x.toFixed(1)}" y2="${C.toFixed(1)}" />
          <circle class="spider-point" cx="${R.toFixed(1)}" cy="${v.toFixed(1)}" r="6" />
          <text class="spider-label" x="${B.toFixed(1)}" y="${w.toFixed(1)}">${b(h.label)}</text>
          <text class="spider-callout" x="${B.toFixed(1)}" y="${(w+18).toFixed(1)}">${h.score}</text>
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
          ${f}
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
  `}function Gs(t){const n=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(n)].map(o=>`<span class="chip detail-hashtag" aria-pressed="true">#${b(o)}</span>`).join("")}function Js(t,n,o){const s=t.captures.find(u=>u.slug===n);if(!s)return`
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
          <a class="button button--secondary" href="${b(pt({name:"studio",theme:n,card:null}))}">이 테마로 만들기</a>
          <a class="button button--secondary" href="${b(St(s.asset.path))}" download="${b(`${n}.${s.asset.originalName.split(".").pop()}`)}">원본 다운로드</a>
          <button type="button" class="button button--secondary" data-pin-slug="${b(n)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Xs(s)}</div>

      ${Zs(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${b(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${b(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${Ys(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${b(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${Gs(s)}
        </p>
        <p class="detail__meta-line">
          ${b(s.screenType)} · ${b(s.tone)} · ${b(s.copyTone)} · ${b(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${b(s.sourceUrl)}">${b(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Rs(s.body)}
      </section>
    </article>
  `}function Vs(t,n){var o;(o=t.querySelector("[data-pin-slug]"))==null||o.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&n(r)})}function Qs(t){const n=t.wiki.logEntries;return n.length===0?`
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
  `}function tr(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${b(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Ln=.5,Mn=3,oo=.25,er=.5,nr=10,qe=/Mac|iPhone|iPad|iPod/.test(navigator.userAgent),so=40;let A=1,ut=[],Zt=[],qt=[],Ce=[],Gt=null,ro=1;const ir=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],Ho="(min-width: 768px)",Do="(min-width: 1025px)";let Ue=null,ze=null,We=null,He=null,Jt=[],De=null;const or=500,ao=20;function ti(){return window.matchMedia(Do).matches?"desktop":window.matchMedia(Ho).matches?"tablet":"mobile"}function Po(){const t=["mobile","tablet","desktop"],n=ti();return Ue&&t.indexOf(Ue)<=t.indexOf(n)?Ue:n}function Pe(t){return structuredClone(t)}function co(t,n){return JSON.stringify(t)===JSON.stringify(n)}const Bn=new Map,lo=new Map;function No(t){const n=Bn.get(t);return n!=null&&n.complete&&n.naturalWidth>0?Promise.resolve(n):new Promise((o,s)=>{const r=n??new Image;r.onload=()=>o(r),r.onerror=()=>s(new Error(`Image failed: ${t}`)),n||(Bn.set(t,r),r.src=t)})}function kn(t){const n=lo.get(t);if(n)return n;const o=fetch(t).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,u)=>{const l=new FileReader;l.onload=()=>r(String(l.result)),l.onerror=()=>u(l.error??new Error("data url failed")),l.readAsDataURL(s)}));return lo.set(t,o),o}const sr=Object.assign({}),uo=new Set;function rr(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function vt(){const t=new Set(Ke.map(o=>o.label.toLowerCase())),n=[];for(const[o,s]of Object.entries(sr)){const r=ls(o);if(!r||t.has(r.toLowerCase()))continue;const u=`local:${r}`;if(!n.some(l=>l.id===u)){if(!uo.has(r)){uo.add(r);const l=document.createElement("style");l.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${rr(s)}");font-display:swap;}`,document.head.append(l)}n.push({id:u,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return n}function ar(){return[...Ke,...vt()]}function dr(t,n,o,s){const r=Math.max(0,Math.min(s,n/2,o/2));t.beginPath(),t.roundRect(0,0,n,o,r)}function In(t,n,o){const s=ot(t,"title"),r=ot(t,"body"),u=ot(t,"image"),l=vt();return{title:s.text,body:r.text,themeImage:n,design:Be(t,o,l),color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:Ht(s.fontId,l),bodyFontStack:Ht(r.fontId,l),titleSize:s.size,bodySize:r.size,titleX:s.x,titleY:s.y,bodyX:r.x,bodyY:r.y,imageWidth:u.width,imageX:u.x,imageY:u.y,titleColor:s.color,bodyColor:r.color}}function ho(t,n,o,s){const r=t.getContext("2d");if(!r)return[];const u=n.cardWidth,l=n.cardHeight;t.width=u,t.height=l,r.clearRect(0,0,u,l),r.save(),dr(r,u,l,n.radius),r.clip(),r.fillStyle=n.color,r.fillRect(0,0,u,l);const f=[],h=Math.max(1,u-jn*2);r.textBaseline="top";const y=vt(),g=o&&o.naturalWidth>0?o:null,x=g?g.naturalHeight/g.naturalWidth:1,C=v=>{if(!g)return;const B=Jn(v,x);if(v.id!==s){const w=v.crop;if(w){const P=g.naturalWidth,Z=g.naturalHeight;r.drawImage(g,w.x*P,w.y*Z,w.w*P,w.h*Z,v.x,v.y,v.width,B)}else r.drawImage(g,v.x,v.y,v.width,B)}f.push({id:v.id,kind:"image",x:v.x,y:v.y,w:v.width,h:B})},R=v=>{if(!v.text.trim())return;r.fillStyle=v.color,r.font=`${v.kind==="title"?600:400} ${v.size}px ${Ht(v.fontId,y)}`;const B=vs(v.text.trim(),h,Z=>r.measureText(Z).width),w=Math.round(v.size*1.25);let P=0;B.forEach((Z,Mt)=>{v.id!==s&&r.fillText(Z,v.x,v.y+Mt*w),P=Math.max(P,r.measureText(Z).width)}),f.push({id:v.id,kind:v.kind,x:v.x,y:v.y,w:Math.max(P,v.size),h:Math.max(B.length,1)*w})};for(const v of n.layers)v.kind==="image"?C(v):R(v);return r.restore(),f}function po(t,n){t.toBlob(o=>{if(!o)return;const s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=n,r.click(),URL.revokeObjectURL(s)},"image/png")}async function fo(t,n,o,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}"><foreignObject x="0" y="0" width="${o}" height="${s}">${n}</foreignObject></svg>`,u=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(u);try{const f=await No(l),h=t.getContext("2d");if(!h)return;t.width=o,t.height=s,h.clearRect(0,0,o,s),h.drawImage(f,0,0,o,s)}finally{URL.revokeObjectURL(l),Bn.delete(l)}}let Vt=null;function mo(t,n,o){let s=0;const r=()=>{const u=t.scrollHeight-t.clientHeight;if(u<=1){n.hidden=!0;return}n.hidden=!1;const l=Math.max(32,t.clientHeight/t.scrollHeight*t.clientHeight),f=Math.max(0,t.clientHeight-l);n.style.height=`${l}px`,n.style.transform=`translateY(${t.scrollTop/u*f}px)`};return t.addEventListener("scroll",()=>{r(),o.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>o.classList.remove("is-scrolling"),700)}),r(),r}function cr(t,n){if(n.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const o=ot(t,"title"),s=ot(t,"body"),r=ot(t,"image"),u=Et(t.presetId),l=qn.map(w=>`<option value="${b(w.id)}"${w.id===u.id?" selected":""}>${b(w.name)} · ${w.width}×${w.height}</option>`).join(""),f=n.map(w=>{const P=w.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${b(w.slug)}"
          aria-checked="${P?"true":"false"}"
          tabindex="${P?"0":"-1"}"
        >
          <img src="${b(St(w.asset.thumbPath??w.asset.path))}" alt="${b(w.title)}" />
        </button>
      `}).join(""),h=t.panel==="design",y=ar(),g=Zn(t.cardWidth),x=w=>y.map(P=>`<option value="${b(P.id)}"${P.id===w?" selected":""}>${b(P.label)}</option>`).join(""),C='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',R='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',v=Po();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${ir.map(w=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${w.id}" aria-label="${w.label}" title="${w.label}" aria-pressed="${w.id===v?"true":"false"}">${w.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${v}" data-framed="${v===ti()?"false":"true"}">
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
              <input id="studio-size" type="range" min="${gt}" max="${$t}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${gt}" max="${$t}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${gt}" max="${$t}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${gt}" max="${$t}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${gt}" max="${$t}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${gt}" max="${$t}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
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
              <input id="studio-title-size" type="range" min="5" max="${g}" step="1" value="${o.size}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${g}" step="1" value="${o.size}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${x(o.fontId)}</select>
          </div>
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
              <input id="studio-body-size" type="range" min="5" max="${g}" step="1" value="${s.size}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${g}" step="1" value="${s.size}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${x(s.fontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${f}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${Lt}" max="${zn}" step="1" value="${r.width}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${Lt}" max="${zn}" step="1" value="${r.width}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius" type="range" min="${te}" max="${Re}" step="1" value="${t.radius}" aria-valuemin="${te}" aria-valuemax="${Re}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${te}" max="${Re}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
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
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${zt}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
                ${["nw","n","ne","e","se","s","sw","w"].map(w=>`<span class="studio__handle studio__handle--crop" data-crop="${w}" hidden></span>`).join("")}
                <textarea class="studio__editor" id="studio-editor" rows="1" spellcheck="false" aria-label="텍스트 편집" hidden></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="studio__bar">
          <p class="studio__meta" id="studio-meta" aria-live="polite"></p>
          <div class="studio__bar-actions">
            <div class="studio__history" role="group" aria-label="편집 기록">
              <button type="button" class="studio__zoom-btn" id="studio-undo" aria-label="이전 동작" disabled>${C}</button>
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled>${R}</button>
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
  `}function lr(t,n,o,s){var Fi,Oi,Bi,Ui,ji,Ki,Yi,Xi,Zi,Gi,Ji;if(o.length===0)return;const r=t.querySelector("#studio-preset"),u=t.querySelector("#studio-size"),l=t.querySelector("#studio-size-number"),f=t.querySelector("#studio-width"),h=t.querySelector("#studio-width-number"),y=t.querySelector("#studio-height"),g=t.querySelector("#studio-height-number"),x=t.querySelector("#studio-title"),C=t.querySelector("#studio-title-color"),R=t.querySelector("#studio-title-hex"),v=t.querySelector("#studio-title-size"),B=t.querySelector("#studio-title-size-number"),w=t.querySelector("#studio-body"),P=t.querySelector("#studio-body-color"),Z=t.querySelector("#studio-body-hex"),Mt=t.querySelector("#studio-body-size"),ie=t.querySelector("#studio-body-size-number"),oe=t.querySelector("#studio-title-font"),se=t.querySelector("#studio-body-font"),Je=t.querySelector("#studio-image-width"),Ve=t.querySelector("#studio-image-width-number"),Qe=t.querySelector("#studio-color"),re=t.querySelector("#studio-hex"),U=t.querySelector("#studio-radius"),rt=t.querySelector("#studio-radius-number"),G=t.querySelector("#studio-code"),E=t.querySelector("#studio-canvas"),ae=t.querySelector("#studio-iframe"),ni=t.querySelector("#studio-meta"),Pt=t.querySelector("#studio-safe"),de=t.querySelector("#studio-scaler"),tn=t.querySelector("#studio-fit"),ft=t.querySelector("#studio-stage"),ce=t.querySelector("#studio-zoom-out"),le=t.querySelector("#studio-zoom-in"),ii=t.querySelector("#studio-zoom-label"),ue=t.querySelector("#studio-undo"),en=t.querySelector("#studio-redo"),nn=t.querySelector("#studio-scroll-thumb"),on=t.querySelector(".studio__controls-wrap"),he=t.querySelector("#studio-export"),J=t.querySelector("#studio-splitter"),pe=t.querySelector(".studio"),oi=t.querySelector("#studio-overlay"),Nt=t.querySelector("#studio-crop-frame"),L=t.querySelector("#studio-editor"),sn=[...t.querySelectorAll(".studio__handle[data-handle]")],rn=[...t.querySelectorAll(".studio__handle[data-crop]")];if(!oi||!Nt||!L||!r||!u||!l||!f||!h||!y||!g||!x||!C||!R||!v||!B||!w||!P||!Z||!Mt||!ie||!oe||!se||!Je||!Ve||!Qe||!re||!U||!rt||!G||!E||!ae||!ni||!Pt||!de||!tn||!ft||!ce||!le||!ii||!ue||!en||!nn||!on||!he||!J||!pe||!t.querySelector("#studio-set-baseline")||!t.querySelector("#studio-save-library"))return;const an=()=>{const e=o.find(i=>i.slug===n.themeSlug)??o[0];return e?St(e.asset.path):""};let fe=0,et=1;const $=new Set;let Y=null,M=null,z=()=>{},me=()=>{};const at=e=>n.layers.find(i=>i.id===e),ye=()=>n.layers.filter(e=>$.has(e.id)),F=e=>{for(let i=n.layers.length-1;i>=0;i-=1){const d=n.layers[i];if(d&&d.kind===e&&$.has(d.id))return d}return ot(n,e)},ge=()=>{for(let e=n.layers.length-1;e>=0;e-=1){const i=n.layers[e];if(i&&i.kind==="image"&&$.has(i.id))return i}return ot(n,"image")},dn=()=>n.layers.filter(e=>e.kind==="image"),Bo=()=>{(!Number.isFinite(A)||A<=0)&&(A=1),ce.disabled=A<=Ln+.001,le.disabled=A>=Mn-.001,ii.textContent=`${Math.round(A*100)}%`},cn=(e,i)=>{const d=ft.getBoundingClientRect(),a=20,c=Math.min(Math.max(d.width-a,1)/e,Math.max(d.height-a,1)/i);return Number.isFinite(c)&&c>0?c:1},_t=()=>{const e=cn(n.cardWidth,n.cardHeight);Bo();const i=e*A;tn.style.width=`${n.cardWidth*i}px`,tn.style.height=`${n.cardHeight*i}px`,de.style.width=`${n.cardWidth}px`,de.style.height=`${n.cardHeight}px`,de.style.transform=`scale(${i})`,et=i,me()};ce.addEventListener("click",()=>{A=Math.max(Ln,A-oo),_t()}),le.addEventListener("click",()=>{A=Math.min(Mn,A+oo),_t()}),(Fi=t.querySelector("#studio-zoom-fit"))==null||Fi.addEventListener("click",()=>{A=1,_t(),ft.scrollTo(0,0)});const si=t.querySelector("#studio-panel-scroll"),Uo=si&&nn&&on?mo(si,nn,on):()=>{},jo=()=>{G.style.height="auto",G.style.height=`${Math.max(180,G.scrollHeight)}px`,Uo()},kt=()=>{const e=document.querySelector("#studio-undo"),i=document.querySelector("#studio-redo");e&&(e.disabled=ut.length===0),i&&(i.disabled=Zt.length===0)};let Rt=null;const S=e=>{if(e&&Rt!==e)return;if(!Gt){Rt=null;return}const i=Gt,d=ro;Gt=null,Rt=null,!(co(i,n)&&d===A)&&(ut.push(i),qt.push(d),ut.length>so&&(ut.shift(),qt.shift()),Zt=[],Ce=[],kt())},k=e=>{e&&Rt===e&&Gt||(S(),Gt=Pe(n),ro=A,Rt=e??null)},ri=e=>{const i=Number(e.min),d=Number(e.max),a=Number(e.value),c=d>i?(a-i)/(d-i)*100:0;e.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,c))}%`)};let ai=n.cardHeight/Math.max(1,n.cardWidth);const di=()=>new Map(dn().map(e=>[e.id,{width:e.width,x:e.x,y:e.y}]));let ln={cardWidth:n.cardWidth,images:di()};const un=()=>{ai=n.cardHeight/Math.max(1,n.cardWidth),ln={cardWidth:n.cardWidth,images:di()}};let O=null,nt=1,ct=[];const hn=e=>Jn(e,nt),pn=()=>{n.cardWidth=dt(n.cardWidth),n.cardHeight=dt(n.cardHeight);for(const e of dn())e.width=xt(e.width)},It=(e,i,d)=>{e.value=String(d),document.activeElement!==i&&(i.value=String(d))},ci=()=>{const e=F("title"),i=F("body"),d=Zn(n.cardWidth),a=String(Math.max(d,e.size)),c=String(Math.max(d,i.size));for(const p of[v,B])p.min="5",p.max=a;for(const p of[Mt,ie])p.min="5",p.max=c;It(u,l,n.cardWidth),It(f,h,n.cardWidth),It(y,g,n.cardHeight),It(v,B,e.size),It(Mt,ie,i.size),It(Je,Ve,ge().width)},li=()=>{U.value=String(n.radius),U.setAttribute("aria-valuenow",String(n.radius)),rt.value=String(n.radius),t.style.setProperty("--studio-card-radius",`${n.radius}px`)},ui=(e,i)=>{n.themeSlug=e;for(const d of t.querySelectorAll("[data-theme-slug]")){const a=d.dataset.themeSlug===e;d.setAttribute("aria-checked",a?"true":"false"),d.tabIndex=a?0:-1,a&&i&&d.focus()}q()},fn=e=>{var c,p;n.panel=e;const i=e==="design";(c=t.querySelector("#studio-panel-design"))==null||c.toggleAttribute("hidden",!i),(p=t.querySelector("#studio-panel-code"))==null||p.toggleAttribute("hidden",i);const d=t.querySelector("#studio-tab-design"),a=t.querySelector("#studio-tab-code");d==null||d.setAttribute("aria-selected",i?"true":"false"),a==null||a.setAttribute("aria-selected",i?"false":"true"),d&&(d.tabIndex=i?0:-1),a&&(a.tabIndex=i?-1:0),q()},mn=()=>{const e=F("title"),i=F("body");r.value=n.presetId,document.activeElement!==x&&(x.value=e.text),document.activeElement!==w&&(w.value=i.text),document.activeElement!==R&&(C.value=e.color,R.value=e.color),document.activeElement!==Z&&(P.value=i.color,Z.value=i.color),document.activeElement!==re&&(Qe.value=n.color,re.value=n.color),oe.value=e.fontId,se.value=i.fontId,document.activeElement!==G&&(G.value=n.code);for(const d of t.querySelectorAll("[data-theme-slug]")){const a=d.dataset.themeSlug===n.themeSlug;d.setAttribute("aria-checked",a?"true":"false"),d.tabIndex=a?0:-1}},q=async()=>{const e=++fe;pn(),mn(),ci(),t.querySelectorAll('input[type="range"]').forEach(ri);const i=Et(n.presetId),d=n.cardWidth===i.width&&n.cardHeight===i.height,a=d&&i.safe?` · 안전 영역 ${i.safe.width} × ${i.safe.height}`:"";ni.textContent=`${n.cardWidth} × ${n.cardHeight} · ${i.name}${a}`,he.textContent=Be(n,nt,vt()),jo(),li(),_t(),d&&i.safe?(Pt.hidden=!1,Pt.style.width=`${i.safe.width}px`,Pt.style.height=`${i.safe.height}px`):Pt.hidden=!0;const c=(m,_,N)=>{var I;const K=(I=Ht(m,vt()).split(",")[0])==null?void 0:I.replaceAll('"',"").trim();return K?document.fonts.load(`${_} ${N}px "${K}"`):Promise.resolve()};try{await Promise.all(n.layers.filter(Ae).map(m=>c(m.fontId,m.kind==="title"?600:400,m.size)))}catch{}if(e!==fe)return;const p=an();if(n.code.trim()){E.hidden=!0,ae.hidden=!1;const m=p?await kn(p):"";if(e!==fe)return;ae.srcdoc=ws(In(n,m,nt)),me();return}if(ae.hidden=!0,E.hidden=!1,p)try{O=await No(p),O.naturalWidth>0&&(nt=O.naturalHeight/O.naturalWidth)}catch{O=null,nt=1}else O=null,nt=1;e===fe&&(pn(),he.textContent=Be(n,nt,vt()),z())},At=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>k(e)),e.addEventListener("keydown",()=>k(e)),e.addEventListener("pointerup",()=>S(e)),e.addEventListener("pointercancel",()=>S(e)),e.addEventListener("keyup",()=>S(e)),e.addEventListener("input",()=>{d(Number(e.value)),q()});const c=()=>{pn(),i.value=String(a()),S(i)};i.addEventListener("focus",()=>k(i)),i.addEventListener("input",()=>{i.value.trim()!==""&&(d(Number(i.value)),q())}),i.addEventListener("change",c),i.addEventListener("blur",c)};r.addEventListener("focus",()=>k(r)),r.addEventListener("change",()=>{const e=Et(r.value);n.presetId=e.id,n.cardWidth=e.width,n.cardHeight=e.height,S(r),q()}),r.addEventListener("blur",()=>S(r)),u.addEventListener("pointerdown",un),u.addEventListener("keydown",un),l.addEventListener("focus",un),At(u,l,e=>{const i=cn(n.cardWidth,n.cardHeight)*A,d=ds(Math.max(1,n.cardWidth),Math.max(1,Math.round(n.cardWidth*ai)),e);n.cardWidth=d.cardWidth,n.cardHeight=d.cardHeight;const a=n.cardWidth/Math.max(1,ln.cardWidth);for(const p of dn()){const m=ln.images.get(p.id);if(!m)continue;p.width=xt(m.width*a);const _=p.width/Math.max(1,m.width);p.x=Math.round(m.x*_),p.y=Math.round(m.y*_)}const c=cn(n.cardWidth,n.cardHeight);c>0&&Number.isFinite(i)&&i>0&&(A=i/c)},()=>n.cardWidth),At(f,h,e=>{n.cardWidth=dt(e);for(const i of n.layers)Ae(i)&&(i.size=Wt(i.size,n.cardWidth))},()=>n.cardWidth),At(y,g,e=>{n.cardHeight=e},()=>n.cardHeight),At(v,B,e=>{F("title").size=Wt(e,n.cardWidth)},()=>F("title").size),At(Mt,ie,e=>{F("body").size=Wt(e,n.cardWidth)},()=>F("body").size),At(Je,Ve,e=>{ge().width=e},()=>ge().width);const hi=(e,i)=>{e.addEventListener("focus",()=>k(e)),e.addEventListener("change",()=>{i(),S(e),q()}),e.addEventListener("blur",()=>S(e))};hi(oe,()=>{F("title").fontId=oe.value}),hi(se,()=>{F("body").fontId=se.value});const Ko=async()=>{var p;const e=document.createElement("canvas");if(n.code.trim()){const m=an(),_=m?await kn(m):"";await fo(e,Nn(In(n,_,nt)),n.cardWidth,n.cardHeight)}else ho(e,n,O);const i=1080,d=Math.max(n.cardWidth,n.cardHeight);if(d<=i)return e.toDataURL("image/png");const a=i/d,c=document.createElement("canvas");return c.width=Math.max(1,Math.round(n.cardWidth*a)),c.height=Math.max(1,Math.round(n.cardHeight*a)),(p=c.getContext("2d"))==null||p.drawImage(e,0,0,c.width,c.height),c.toDataURL("image/png")};(Oi=t.querySelector("#studio-set-baseline"))==null||Oi.addEventListener("click",()=>{(async()=>await Rn("현재 레이아웃을 초기화 기준으로 세팅하고 진행하시겠습니까?")&&(s.onSetBaseline(),Fn("초기화로 세팅하였습니다.")))()}),(Bi=t.querySelector("#studio-save-library"))==null||Bi.addEventListener("click",()=>{(async()=>{if(!await Rn("현재 카드를 그래픽 라이브러리에 추가하고 진행하시겠습니까?"))return;const i=await s.onAddToLibrary(await Ko());Fn(i?"그래픽 라이브러리에 추가하였습니다.":"그래픽 라이브러리에 추가하지 못했습니다.")})()}),(Ui=t.querySelector("#studio-reset"))==null||Ui.addEventListener("click",()=>{S();const e=Pe(n),i=A;s.onReset(),(!co(e,n)||i!==A)&&(ut.push(e),qt.push(i),ut.length>so&&(ut.shift(),qt.shift()),Zt=[],Ce=[]),kt()}),x.addEventListener("focus",()=>k(x)),x.addEventListener("input",()=>{F("title").text=x.value,q()}),x.addEventListener("blur",()=>S(x)),w.addEventListener("focus",()=>k(w)),w.addEventListener("input",()=>{F("body").text=w.value,q()}),w.addEventListener("blur",()=>S(w));const yn=(e,i,d,a)=>{e.addEventListener("pointerdown",()=>k(e)),e.addEventListener("change",()=>S(e)),e.addEventListener("input",()=>{const c=st(e.value);c&&(d(c),i.value=c,q())}),i.addEventListener("focus",()=>k(i)),i.addEventListener("input",()=>{const c=st(i.value);c&&(d(c),e.value=c,q())}),i.addEventListener("blur",()=>{st(i.value)||(i.value=a()),S(i)})};yn(Qe,re,e=>{n.color=e},()=>n.color),yn(C,R,e=>{F("title").color=e},()=>F("title").color),yn(P,Z,e=>{F("body").color=e},()=>F("body").color);const pi=e=>{n.radius=Xn(Number(e)),li(),q()};U.addEventListener("pointerdown",()=>k(U)),U.addEventListener("keydown",()=>k(U)),U.addEventListener("pointerup",()=>S(U)),U.addEventListener("pointercancel",()=>S(U)),U.addEventListener("keyup",()=>S(U)),U.addEventListener("input",()=>pi(U.value)),rt.addEventListener("focus",()=>k(rt)),rt.addEventListener("input",()=>pi(rt.value)),rt.addEventListener("blur",()=>S(rt)),rt.addEventListener("change",()=>S(rt)),G.addEventListener("focus",()=>k(G)),G.addEventListener("input",()=>{n.code=G.value,q()}),G.addEventListener("blur",()=>S(G));const fi=(e,i)=>{Object.assign(n,e),A=i,kt(),q()};ue.addEventListener("click",()=>{Bt(!1),S();const e=ut.pop(),i=qt.pop();if(!e||i===void 0){kt();return}Zt.push(Pe(n)),Ce.push(A),fi(e,i)}),en.addEventListener("click",()=>{Bt(!1),S();const e=Zt.pop(),i=Ce.pop();if(!e||i===void 0){kt();return}ut.push(Pe(n)),qt.push(A),fi(e,i)}),kt(),(ji=t.querySelector("#studio-tab-design"))==null||ji.addEventListener("click",()=>fn("design")),(Ki=t.querySelector("#studio-tab-code"))==null||Ki.addEventListener("click",()=>fn("code")),(Yi=t.querySelector(".studio__tabs"))==null||Yi.addEventListener("keydown",e=>{var d;if(!(e instanceof KeyboardEvent)||e.key!=="ArrowRight"&&e.key!=="ArrowLeft")return;e.preventDefault();const i=n.panel==="design"?"code":"design";fn(i),(d=t.querySelector(i==="design"?"#studio-tab-design":"#studio-tab-code"))==null||d.focus()});const Ft=[...t.querySelectorAll("[data-theme-slug]")];for(const e of Ft)e.addEventListener("click",()=>{const i=e.dataset.themeSlug;!i||i===n.themeSlug||(k(e),ui(i,!1),S(e))});(Xi=t.querySelector(".studio__themes"))==null||Xi.addEventListener("keydown",e=>{if(!(e instanceof KeyboardEvent))return;const i=e.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(i))return;e.preventDefault();const d=Ft.findIndex(m=>m.dataset.themeSlug===n.themeSlug),c=Ft[(d+(i==="ArrowLeft"||i==="ArrowUp"?-1:1)+Ft.length)%Ft.length],p=c==null?void 0:c.dataset.themeSlug;!p||p===n.themeSlug||(k(c),ui(p,!0),S(c))}),(Zi=t.querySelector("#studio-copy"))==null||Zi.addEventListener("click",async()=>{const e=Be(n,nt,vt());he.textContent=e;try{await navigator.clipboard.writeText(e)}catch{const d=document.createElement("textarea");d.value=e,document.body.append(d),d.select(),document.execCommand("copy"),d.remove()}const i=t.querySelector("#studio-copy");i&&(i.textContent="복사됨",window.setTimeout(()=>{i.textContent="현재 디자인을 코드로 복사"},1200))}),(Gi=t.querySelector("#studio-download"))==null||Gi.addEventListener("click",()=>{(async()=>{const e=`ax-studio-${n.cardWidth}x${n.cardHeight}-${n.themeSlug||"theme"}.png`;if(!n.code.trim()){po(E,e);return}const i=an(),d=i?await kn(i):"",a=document.createElement("canvas");await fo(a,Nn(In(n,d,nt)),n.cardWidth,n.cardHeight),po(a,e)})()});const it=e=>{const i=E.getBoundingClientRect();return{x:i.width>0?(e.clientX-i.left)/i.width*n.cardWidth:0,y:i.height>0?(e.clientY-i.top)/i.height*n.cardHeight:0}},gn=(e,i)=>{for(let a=ct.length-1;a>=0;a-=1){const c=ct[a];if(c&&e>=c.x-8&&i>=c.y-8&&e<=c.x+c.w+8&&i<=c.y+c.h+8)return c}return null},Yo=e=>{const i=E.getContext("2d");if(!i)return;const d=E.getBoundingClientRect().width,a=d>0?n.cardWidth/d:1;i.save(),i.lineJoin="round",i.lineCap="round",i.strokeStyle="rgba(0, 0, 0, 0.7)",i.lineWidth=a*3,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.strokeStyle="rgba(255, 255, 255, 0.92)",i.lineWidth=a*1.5,i.strokeRect(e.x,e.y,Math.max(a,e.w),Math.max(a,e.h)),i.restore()},Xo=()=>{if(H)for(const e of ct)H.start.has(e.id)&&Yo(e)},Zo=()=>{const e=E.getContext("2d");if(!M||!O||!e)return;const{full:i,box:d}=M;e.save(),e.globalAlpha=.35,e.drawImage(O,i.x,i.y,i.w,i.h),e.globalAlpha=1,e.beginPath(),e.rect(d.x,d.y,d.w,d.h),e.clip(),e.drawImage(O,i.x,i.y,i.w,i.h),e.restore()};let H=null,V=null,wt=null;const lt=new Map;let j=null,X=null,bn=null,mi="";const be=e=>({x:e.x,y:e.y,width:e.width}),ve=(e,i,d)=>e.kind==="image"?{x:ke(i,n.cardWidth,e.width),y:ke(d,n.cardHeight,hn(e))}:{x:Ye(i,n.cardWidth,e.size),y:Ye(d,n.cardHeight,e.size)},yi=e=>{const i=new Map;for(const d of e){const a=at(d);a&&i.set(d,{x:a.x,y:a.y})}return i},vn=(e,i,d)=>{const a=(p,m)=>Math.abs(m)<Math.abs(p)?m:p,c=[];for(const[p,m]of e){const _=at(p);_&&c.push({layer:_,from:m})}for(const{layer:p,from:m}of c){const _=ve(p,m.x+i,m.y+d);i=a(i,_.x-m.x),d=a(d,_.y-m.y)}for(const{layer:p,from:m}of c){const _=ve(p,m.x+i,m.y+d);p.x=_.x,p.y=_.y}},xe=(e,i)=>{e.width=i.width,e.x=ke(i.x,n.cardWidth,e.width),e.y=ke(i.y,n.cardHeight,hn(e))},xn=e=>{for(let i=ct.length-1;i>=0;i-=1){const d=ct[i];if(!d||d.kind!=="image"||e.x<d.x||e.y<d.y||e.x>d.x+d.w||e.y>d.y+d.h)continue;const a=at(d.id);if((a==null?void 0:a.kind)==="image")return a}return ge()};z=()=>{for(const i of[...$])at(i)||$.delete(i);ct=ho(E,n,O,(Y==null?void 0:Y.id)??(M==null?void 0:M.id)),Zo(),Xo(),me();const e=[...$].join(" ");e!==mi&&(mi=e,mn(),ci(),t.querySelectorAll('input[type="range"]').forEach(ri))};const mt=(e,i,d)=>{e.style.left=`${i*et}px`,e.style.top=`${d*et}px`},_e=()=>{const e=Y?at(Y.id):void 0;return e&&Ae(e)?e:null},Go=()=>{const e=_e();if(!e)return;const i=e.size*et,d=Math.max(16,i),a=i/d;mt(L,e.x,e.y),L.style.font=`${e.kind==="title"?600:400} ${d}px ${Ht(e.fontId,vt())}`,L.style.lineHeight=`${Math.round(e.size*1.25)*et/a}px`,L.style.color=e.color,L.style.width=`${Math.max(1,n.cardWidth-jn*2)*et/a}px`,L.style.transform=`scale(${a})`,L.style.height="auto",L.style.height=`${L.scrollHeight}px`},we=new Map,Jo=()=>{const e=M&&!n.code.trim()?M:null;Nt.hidden=!e;for(const d of rn)d.hidden=!e;if(!e)return;const{box:i}=e;mt(Nt,i.x,i.y),Nt.style.width=`${i.w*et}px`,Nt.style.height=`${i.h*et}px`;for(const d of rn){const a=d.dataset.crop??"",c=a.includes("w")?i.x:a.includes("e")?i.x+i.w:i.x+i.w/2,p=a.includes("n")?i.y:a.includes("s")?i.y+i.h:i.y+i.h/2;mt(d,c,p)}},$e=()=>{const[e]=$.size===1?[...$]:[],i=e?at(e):void 0;return(i==null?void 0:i.kind)==="image"?i:null};me=()=>{const e=!Y&&!M&&!n.code.trim(),i=new Set;if(e)for(const p of $){const m=ct.find(N=>N.id===p);if(!m)continue;let _=we.get(p);_||(_=document.createElement("div"),_.className="studio__select-frame",oi.prepend(_),we.set(p,_)),mt(_,m.x,m.y),_.style.width=`${m.w*et}px`,_.style.height=`${m.h*et}px`,i.add(p)}for(const[p,m]of we)i.has(p)||(m.remove(),we.delete(p));const d=$e(),a=d?ct.find(p=>p.id===d.id):void 0,c=e&&!!a;for(const p of sn)p.hidden=!c;if(c&&a){const p=12/Math.max(et,.001),m=I=>Math.min(n.cardWidth-p,Math.max(p,I)),_=I=>Math.min(n.cardHeight-p,Math.max(p,I)),N=m(a.x+a.w/2),K=_(a.y+a.h/2);for(const I of sn){const Q=I.dataset.handle;Q==="top"?mt(I,N,_(a.y)):Q==="bottom"?mt(I,N,_(a.y+a.h)):Q==="left"?mt(I,m(a.x),K):mt(I,m(a.x+a.w),K)}}Jo(),Go()};for(const e of sn)e.addEventListener("pointerdown",i=>{const d=$e(),a=d?ct.find(Q=>Q.id===d.id):void 0;if(!d||!a)return;i.preventDefault();try{e.setPointerCapture(i.pointerId)}catch{}k(e);const c=e.dataset.handle,p=be(d),m=a.h/Math.max(1,a.w),_=c==="right"?{x:a.x,y:a.y+a.h/2}:c==="left"?{x:a.x+a.w,y:a.y+a.h/2}:c==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},N=it(i),K=Q=>{if(Q.pointerId!==i.pointerId)return;const Le=it(Q),Yt=Le.x-N.x,Me=Le.y-N.y,Sn=c==="right"?a.w+Yt:c==="left"?a.w-Yt:c==="bottom"?(a.h+Me)/m:(a.h-Me)/m;xe(d,Ie(p,Sn,_.x,_.y)),z()},I=Q=>{Q.pointerId===i.pointerId&&(e.removeEventListener("pointermove",K),e.removeEventListener("pointerup",I),e.removeEventListener("pointercancel",I),S(e),q())};e.addEventListener("pointermove",K),e.addEventListener("pointerup",I),e.addEventListener("pointercancel",I)});const Vo=e=>{n.code.trim()||(Y={id:e.id,original:e.text},$.clear(),$.add(e.id),k(L),L.value=e.text,L.hidden=!1,z(),L.focus(),L.setSelectionRange(L.value.length,L.value.length))},Ot=e=>{if(!Y)return;const i=_e();!e&&i&&(i.text=Y.original),Y=null,L.hidden=!0,z(),S(L),q()};L.addEventListener("input",()=>{const e=_e();e&&(e.text=e.kind==="title"?L.value.replace(/\n/g," "):L.value,z(),mn())}),L.addEventListener("keydown",e=>{var i;e.isComposing||(e.key==="Escape"?(e.preventDefault(),Ot(!1)):e.key==="Enter"&&(((i=_e())==null?void 0:i.kind)==="title"||e.metaKey||e.ctrlKey)&&(e.preventDefault(),Ot(!0)))}),L.addEventListener("blur",()=>Ot(!0));const Qo=(e,i)=>{const d=wt&&wt.id===e&&i.timeStamp-wt.time<400&&Math.hypot(i.clientX-wt.x,i.clientY-wt.y)<24,a=at(e);if(d&&a&&Ae(a)){wt=null,Vo(a);return}wt={id:e,time:i.timeStamp,x:i.clientX,y:i.clientY}},gi=new EventTarget,bi=e=>{const i=e.target;i===E||i instanceof Element&&i.closest(".studio__handle--crop")||Bt(!0)},ts=e=>{!O||n.code.trim()||(S(),$.clear(),$.add(e.id),M={id:e.id,full:Lo(e,nt),box:{x:e.x,y:e.y,w:e.width,h:hn(e)}},k(gi),document.addEventListener("pointerdown",bi,!0),z())};function Bt(e){if(!M)return;const{id:i,full:d,box:a}=M;M=null,document.removeEventListener("pointerdown",bi,!0);const c=at(i);if(e&&(c==null?void 0:c.kind)==="image"){c.crop=us(d,a),c.width=xt(a.w);const p=ve(c,a.x,a.y);c.x=p.x,c.y=p.y}S(gi),q()}const vi=(e,i,d)=>{if(!M)return;e.preventDefault();try{i.setPointerCapture(e.pointerId)}catch{}const a=it(e),c={...M.box},p=_=>{if(_.pointerId!==e.pointerId||!M)return;const N=it(_),K=N.x-a.x,I=N.y-a.y;M.box=d?ps(M.full,c,d,K,I):fs(M.full,c,K,I),z()},m=_=>{_.pointerId===e.pointerId&&(i.removeEventListener("pointermove",p),i.removeEventListener("pointerup",m),i.removeEventListener("pointercancel",m))};i.addEventListener("pointermove",p),i.addEventListener("pointerup",m),i.addEventListener("pointercancel",m)};for(const e of rn)e.addEventListener("pointerdown",i=>vi(i,e,e.dataset.crop??null));const _n=e=>{S();const i=new EventTarget;k(i),e(),S(i),q()},xi=()=>{const e=ye();e.length>0&&(Jt=structuredClone(e))},_i=e=>{Jt.length!==0&&_n(()=>{const i=structuredClone(Jt),d=e?e.x-Math.min(...i.map(c=>c.x)):ao,a=e?e.y-Math.min(...i.map(c=>c.y)):ao;$.clear();for(const c of i){c.id=Gn();const p=ve(c,c.x+d,c.y+a);c.x=p.x,c.y=p.y,$.add(c.id)}n.layers.push(...i)})},es=e=>{const i=ye();i.length!==0&&_n(()=>{const d=n.layers.filter(a=>!$.has(a.id));n.layers=e?[...d,...i]:[...i,...d]})},wi=e=>["title","body","image"].every(i=>!e.some(d=>d.kind===i)||n.layers.some(d=>d.kind===i&&!$.has(d.id))),ns=()=>{const e=ye();e.length===0||!wi(e)||_n(()=>{n.layers=n.layers.filter(i=>!$.has(i.id)),$.clear()})};De==null||De.remove();const $i=e=>qe?`⌘${e}`:`Ctrl+${e}`,is=[{action:"copy",label:"복사",hint:$i("C")},{action:"paste",label:"붙여넣기",hint:$i("V")},{action:"front",label:"맨 위로 보내기"},{action:"back",label:"맨 밑으로 보내기"},{action:"crop",label:"크롭하기"},{action:"delete",label:"삭제"}],W=document.createElement("div");W.className="nav-popover studio-menu",W.setAttribute("role","menu"),W.setAttribute("aria-label","객체 메뉴"),W.hidden=!0,W.innerHTML=is.map(e=>`<button type="button" class="nav-popover__item" role="menuitem" data-layer-action="${e.action}">${e.label}${e.hint?`<span class="studio-menu__hint">${e.hint}</span>`:""}</button>`).join(""),document.body.append(W),De=W;let Si=null;const wn=e=>W.querySelector(`[data-layer-action="${e}"]`),Ei=()=>[...W.querySelectorAll("[data-layer-action]")].filter(e=>!e.hidden&&!e.disabled),Li=e=>{e.target instanceof Node&&W.contains(e.target)||Ut()};function Ut(){W.hidden||(document.activeElement instanceof HTMLElement&&W.contains(document.activeElement)&&document.activeElement.blur(),W.hidden=!0,document.removeEventListener("pointerdown",Li,!0))}const Mi=(e,i)=>{var Yt;const d=it({clientX:e,clientY:i}),a=gn(d.x,d.y);a?$.has(a.id)||($.clear(),$.add(a.id)):$.clear(),Si=d,z();const c=ye(),p=(Me,Sn)=>{const Vi=wn(Me);Vi&&(Vi.disabled=!Sn)};p("copy",c.length>0),p("paste",Jt.length>0),p("front",c.length>0),p("back",c.length>0);const m=wn("crop");m&&(m.hidden=!$e(),m.disabled=!O);const _=wn("delete");_&&(_.disabled=c.length===0||!wi(c),_.title=c.length>0&&_.disabled?"타이틀·본문·이미지는 하나씩 남아 있어야 합니다.":""),W.hidden=!1;const N=8,{width:K,height:I}=W.getBoundingClientRect(),Q=e+K+N>window.innerWidth?e-K:e,Le=i+I+N>window.innerHeight?i-I:i;W.style.left=`${Math.max(N,Q)}px`,W.style.top=`${Math.max(N,Le)}px`,document.addEventListener("pointerdown",Li,!0),(Yt=Ei()[0])==null||Yt.focus({preventScroll:!0})};W.addEventListener("click",e=>{const i=e.target instanceof Element?e.target.closest("[data-layer-action]"):null;if(!i||i.disabled)return;const d=Si;Ut();const a=i.dataset.layerAction;if(a==="copy")xi();else if(a==="paste")_i(d);else if(a==="front"||a==="back")es(a==="front");else if(a==="delete")ns();else if(a==="crop"){const c=$e();c&&ts(c)}}),W.addEventListener("keydown",e=>{var c;if(e.key==="Escape"||e.key==="Tab"){e.preventDefault(),Ut();return}if(e.key!=="ArrowDown"&&e.key!=="ArrowUp")return;e.preventDefault();const i=Ei(),d=i.indexOf(document.activeElement),a=e.key==="ArrowDown"?1:-1;(c=i[(d+a+i.length)%i.length])==null||c.focus()}),ft.addEventListener("scroll",Ut);const jt=()=>{X&&window.clearTimeout(X.timer),X=null},os=e=>{jt();const{clientX:i,clientY:d,pointerId:a}=e;X={timer:window.setTimeout(()=>{X=null,(H==null?void 0:H.pointerId)===a&&(vn(H.start,0,0),H=null,delete E.dataset.dragging,S(E)),V=null,Mi(i,d)},or),pointerId:a,x:i,y:d}},ki=()=>{const[e,i]=[...lt.values()];return!e||!i?null:{distance:Math.hypot(i.x-e.x,i.y-e.y),mid:it({clientX:(e.x+i.x)/2,clientY:(e.y+i.y)/2})}},ss=()=>{const e=ki();if(!e)return;jt(),H=null,V=null,delete E.dataset.dragging,k(E);const i=xn(e.mid);j={...e,layerId:i.id,image:be(i)},z()};E.addEventListener("pointerdown",e=>{if(n.code.trim())return;const i=e.pointerType==="mouse";if(i&&(e.button!==0||qe&&e.ctrlKey))return;if(Ut(),Y&&Ot(!0),M){const c=it(e),{box:p}=M;c.x>=p.x&&c.y>=p.y&&c.x<=p.x+p.w&&c.y<=p.y+p.h?vi(e,E,null):Bt(!0);return}if(e.pointerType==="touch"){lt.set(e.pointerId,{x:e.clientX,y:e.clientY});try{E.setPointerCapture(e.pointerId)}catch{}if(lt.size===2&&O){ss();return}if(lt.size>1)return;os(e)}const d=it(e),a=gn(d.x,d.y);if(i?e.shiftKey?a&&$.has(a.id)?$.delete(a.id):a&&$.add(a.id):a?$.has(a.id)||($.clear(),$.add(a.id)):$.clear():($.clear(),a&&$.add(a.id)),!a||i&&!$.has(a.id)){V=null,z();return}V={x:e.clientX,y:e.clientY,moved:!1,shift:e.shiftKey};try{E.setPointerCapture(e.pointerId)}catch{}k(E),H={id:a.id,origin:d,start:yi(i?$:[a.id]),pointerId:e.pointerId},E.dataset.dragging="true",z()}),E.addEventListener("contextmenu",e=>{e.preventDefault(),!(n.code.trim()||M)&&(jt(),Y&&Ot(!0),Mi(e.clientX,e.clientY))}),E.addEventListener("pointermove",e=>{if(lt.has(e.pointerId)&&lt.set(e.pointerId,{x:e.clientX,y:e.clientY}),(X==null?void 0:X.pointerId)===e.pointerId&&Math.hypot(e.clientX-X.x,e.clientY-X.y)>8&&jt(),j){const d=lt.has(e.pointerId)?ki():null,a=at(j.layerId);if(!d||(a==null?void 0:a.kind)!=="image")return;const c=d.distance/Math.max(1,j.distance),p=Ie(j.image,j.image.width*c,j.mid.x,j.mid.y);xe(a,{x:p.x+d.mid.x-j.mid.x,y:p.y+d.mid.y-j.mid.y,width:p.width}),z();return}V&&Math.hypot(e.clientX-V.x,e.clientY-V.y)>6&&(V.moved=!0);const i=it(e);if(bn=i,!H||H.pointerId!==e.pointerId){E.dataset.hover=gn(i.x,i.y)?"true":"false";return}vn(H.start,i.x-H.origin.x,i.y-H.origin.y),z()}),E.addEventListener("pointerleave",()=>{bn=null});const Ii=e=>{if(lt.delete(e.pointerId),(X==null?void 0:X.pointerId)===e.pointerId&&jt(),j){lt.size<2&&(j=null,S(E),q());return}if(!H||H.pointerId!==e.pointerId)return;const i=H.id;H=null,delete E.dataset.dragging,S(E),e.type==="pointerup"&&V&&!V.moved&&!V.shift&&($.size>1&&($.clear(),$.add(i)),Qo(i,e)),V=null,z()};E.addEventListener("pointerup",Ii),E.addEventListener("pointercancel",Ii);const Ai=new EventTarget;let Ti=0;E.addEventListener("wheel",e=>{if(!qe||!e.ctrlKey||n.code.trim()||M||!O)return;e.preventDefault(),k(Ai);const i=it(e),d=xn(i);xe(d,Ie(be(d),d.width*Math.exp(-e.deltaY*.01),i.x,i.y)),z(),window.clearTimeout(Ti),Ti=window.setTimeout(()=>{S(Ai),q()},250)},{passive:!1}),ft.addEventListener("wheel",e=>{if(!(qe?e.metaKey:e.ctrlKey))return;e.preventDefault();const i=e.deltaMode===WheelEvent.DOM_DELTA_LINE?e.deltaY*33:e.deltaY;A=Math.min(Mn,Math.max(Ln,A*Math.exp(-i*.002))),_t()},{passive:!1});const qi=new EventTarget;let Kt=null;E.addEventListener("gesturestart",e=>{if(e.preventDefault(),j||n.code.trim()||M||!O)return;k(qi);const i=it(e),d=xn(i);Kt={layerId:d.id,image:be(d),anchor:i}}),E.addEventListener("gesturechange",e=>{if(e.preventDefault(),!Kt||j)return;const{layerId:i,image:d,anchor:a}=Kt,c=at(i);(c==null?void 0:c.kind)==="image"&&(xe(c,Ie(d,d.width*e.scale,a.x,a.y)),z())}),E.addEventListener("gestureend",e=>{e.preventDefault(),Kt&&(Kt=null,S(qi),q())}),ft.addEventListener("pointerdown",e=>{e.target===E||$.size===0||e.target instanceof Element&&e.target.closest(".studio__handle")||($.clear(),z())});const Se=e=>{const i=pe.getBoundingClientRect().width,d=zt+Wn+Hn,a=Number.isFinite(e)?e:n.controlsWidth;n.controlsWidth=i>=d?cs(a,i):Math.max(zt,Math.round(a)),pe.style.setProperty("--studio-controls-width",`${n.controlsWidth}px`),J.setAttribute("aria-valuenow",String(n.controlsWidth)),J.setAttribute("aria-valuemax",String(i>=d?Math.max(zt,Math.round(i)-Wn-Hn):n.controlsWidth)),_t()};Se(n.controlsWidth);const yt=t.querySelector("#studio-device"),Ci=[...t.querySelectorAll(".studio-devices__btn")],zi=t.querySelector("#studio-device-thumb"),Wi=yt==null?void 0:yt.parentElement,$n=yt&&zi&&Wi?mo(yt,zi,Wi):null,Ee=()=>{if(!yt)return;const e=Po();yt.dataset.device=e,yt.dataset.framed=e===ti()?"false":"true";for(const i of Ci)i.setAttribute("aria-pressed",i.dataset.device===e?"true":"false");Se(n.controlsWidth),$n==null||$n()};Ee();for(const e of Ci)e.addEventListener("click",()=>{Ue=e.dataset.device,Ee()});ze==null||ze();const Hi=[window.matchMedia(Ho),window.matchMedia(Do)];for(const e of Hi)e.addEventListener("change",Ee);ze=()=>{for(const e of Hi)e.removeEventListener("change",Ee)},We==null||We();const Di=e=>{if(!(e.metaKey||e.ctrlKey)||e.altKey)return;const i=e.code==="KeyZ"&&e.shiftKey||e.code==="KeyY"&&e.ctrlKey&&!e.shiftKey;if(!(e.code==="KeyZ"&&!e.shiftKey)&&!i)return;const a=i?en:ue;if(!a.isConnected||a.disabled)return;const c=e.target;c instanceof HTMLElement&&(c.isContentEditable||c.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"))||(e.preventDefault(),a.click())};document.addEventListener("keydown",Di),We=()=>document.removeEventListener("keydown",Di),He==null||He();const Pi=new EventTarget;let Ni=0;const rs={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}},Ri=e=>{var _;if(!E.isConnected)return;const i=(e.metaKey||e.ctrlKey)&&!e.altKey,d=i?e.code==="Equal"||e.code==="NumpadAdd"?le:e.code==="Minus"||e.code==="NumpadSubtract"?ce:null:null;if(d){e.preventDefault(),d.click();return}const a=e.target;if(!(a===document.body||a instanceof Node&&ft.contains(a))||Y||n.code.trim())return;if(M){if(e.key!=="Enter"&&e.key!=="Escape")return;e.preventDefault(),Bt(e.key==="Enter");return}if(i){if((_=window.getSelection())!=null&&_.toString())return;e.code==="KeyC"&&$.size>0?(e.preventDefault(),xi()):e.code==="KeyV"&&Jt.length>0&&(e.preventDefault(),_i(bn));return}const p=rs[e.key];if(!p||e.altKey||$.size===0)return;e.preventDefault();const m=e.shiftKey?nr:er;k(Pi),vn(yi($),p.x*m,p.y*m),ue.disabled=!1,z(),window.clearTimeout(Ni),Ni=window.setTimeout(()=>{S(Pi),q()},400)};document.addEventListener("keydown",Ri),He=()=>document.removeEventListener("keydown",Ri),J.addEventListener("pointerdown",e=>{if(pe.getBoundingClientRect().width<768)return;try{J.setPointerCapture(e.pointerId)}catch{}const i=e.clientX,d=n.controlsWidth,a=p=>{p.pointerId===e.pointerId&&Se(d+p.clientX-i)},c=p=>{p.pointerId===e.pointerId&&(J.removeEventListener("pointermove",a),J.removeEventListener("pointerup",c),J.removeEventListener("pointercancel",c))};J.addEventListener("pointermove",a),J.addEventListener("pointerup",c),J.addEventListener("pointercancel",c)}),J.addEventListener("keydown",e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const i=e.shiftKey?48:16;Se(n.controlsWidth+(e.key==="ArrowRight"?i:-i))}),(Ji=t.querySelector("#studio-controls"))==null||Ji.addEventListener("submit",e=>{e.preventDefault()}),Vt==null||Vt.disconnect(),Vt=new ResizeObserver(()=>_t()),Vt.observe(ft),q()}const Ro="ax-design-studio-mode",yo="./data/index.json";let tt={status:"loading"},Ze=Xe(),Fo="all",T=null,Ne=null,je=null,D=On();function Un(){const t=localStorage.getItem(Ro);return t==="light"||t==="dark"?t:"dark"}function go(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(Ro,t)}function An(t,n,o){return`<a class="nav-link${o?" nav-link--current":""}" href="${n}" ${o?'aria-current="page"':""}>${t}</a>`}function ur(){return`
    <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.8-1.4-2-3.4-2.2.7a8 8 0 0 0-1.9-1.1L14.6 3h-5.2l-.55 2.7a8 8 0 0 0-1.9 1.1l-2.2-.7-2 3.4 1.8 1.4a7.7 7.7 0 0 0 .05 2.2l-1.8 1.4 2 3.4 2.2-.7a8 8 0 0 0 1.9 1.1l.55 2.7h5.2l.55-2.7a8 8 0 0 0 1.9-1.1l2.2.7 2-3.4-1.8-1.4Z" />
    </svg>
  `}function hr(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function ei(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),n=Vn(t);return n?ee(n.r,n.g,n.b):st(t)??ee(216,241,255)}function Qt(t,n){return n.some(o=>o.slug===t)?t:null}function pr(t,n,o){var r,u,l;const s=t?Qt(t,o):null;if(n&&n!==je){const f=To().find(y=>y.id===n),h=f?Mo(structuredClone(f.state)):null;if(h)return T=h,Qt(T.themeSlug,o)||(T.themeSlug=((r=o[0])==null?void 0:r.slug)??""),je=n,Ne=t,T}if(n||(je=null),!T){const f=Ao();return T=f?structuredClone(f):Ge(s??Qt(_o,o)??((u=o[0])==null?void 0:u.slug)??"",ei()),f&&s&&(T.themeSlug=s),f&&!Qt(T.themeSlug,o)&&(T.themeSlug=s??((l=o[0])==null?void 0:l.slug)??""),Ne=t,T}return t&&t!==Ne&&s&&(T.themeSlug=s,Ne=t),T}function fr(t){const n=Un(),o=n==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=D.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${An("Graphic Library",pt({name:"archive"}),D.name==="archive"||D.name==="capture")}
        ${An("Online Marketing Studio",pt({name:"studio",theme:null,card:null}),D.name==="studio")}
        ${An("History",pt({name:"history"}),D.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${o}" title="${o}">
          ${hr(n)}
        </button>
        <div class="nav-settings">
          <button type="button" class="button button--secondary" id="nav-settings" aria-label="설정" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-settings-menu">
            ${ur()}
          </button>
          <div class="nav-popover" id="nav-settings-menu" role="menu" hidden>
            <button type="button" class="nav-popover__item" id="nav-reset" role="menuitem">리셋</button>
          </div>
        </div>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${t}</main>
  `}function mr(){if(tt.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(tt.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${tt.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
        <p class="state-panel__text"><button type="button" class="button" id="index-retry">다시 불러오기</button></p>
      </section>
    `;const t=tt.index;switch(D.name){case"archive":return Ps(t,Ze,Fo,To());case"capture":return Js(t,D.slug,Ze);case"studio":return cr(pr(D.theme,D.card,t.captures),t.captures);case"history":return Qs(t);case"notfound":return tr(D.path)}}function ht(){var n,o;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");go(Un()),Ze=Xe(),t.innerHTML=fr(mr()),(n=t.querySelector("#index-retry"))==null||n.addEventListener("click",()=>{Oo()}),(o=t.querySelector("#mode-toggle"))==null||o.addEventListener("click",()=>{go(Un()==="dark"?"light":"dark"),ht()}),yr(t),tt.status==="ready"&&(D.name==="archive"&&Ns(t,{onTabChange:s=>{var r;Fo=s,ht(),(r=document.querySelector(`[data-archive-tab="${s}"]`))==null||r.focus()}}),D.name==="capture"&&Vs(t,s=>{Ze=Ss(s),ht()}),D.name==="studio"&&tt.status==="ready"&&T&&lr(t,T,tt.index.captures,{onReset:()=>{var s;T&&(bs(T,Ao(),ei()),ht(),(s=document.querySelector("#studio-reset"))==null||s.focus())},onSetBaseline:()=>{T&&Es(structuredClone(T))},onAddToLibrary:s=>T?As(T,s).then(r=>r!==null):Promise.resolve(!1)}))}function yr(t){var f;const n=t.querySelector("#nav-settings"),o=t.querySelector("#nav-settings-menu"),s=t.querySelector(".nav-settings");if(!n||!o||!s)return;const r=()=>{o.hidden=!0,n.setAttribute("aria-expanded","false"),document.removeEventListener("click",u),document.removeEventListener("keydown",l)},u=h=>{h.target instanceof Node&&s.contains(h.target)||r()},l=h=>{h.key==="Escape"&&r()};n.addEventListener("click",h=>{if(h.stopPropagation(),!o.hidden){r();return}o.hidden=!1,n.setAttribute("aria-expanded","true"),document.addEventListener("click",u),document.addEventListener("keydown",l)}),(f=t.querySelector("#nav-reset"))==null||f.addEventListener("click",()=>{r(),(async()=>{if(await Rn("세팅한 초기화 기준을 지우고 진행하시겠습니까?")){if(Ls(),je=null,T){const y=tt.status==="ready"?tt.index.captures:[],g=Qt(_o,y)??T.themeSlug;T=Ge(g,ei())}D.name==="studio"&&D.card&&(D={name:"studio",theme:null,card:null},history.replaceState(null,"",pt(D))),ht(),Fn("리셋하였습니다.")}})()})}async function gr(){const t=await fetch(`${yo}?t=${Date.now()}`,{cache:"no-store"});if(!t.ok)throw new Error(`${yo} → HTTP ${t.status}`);const n=await t.text();if(n.trimStart().startsWith("<"))throw new Error("index.json 대신 HTML이 왔습니다. 데이터 빌드가 끝나는 중일 수 있습니다.");const o=JSON.parse(n);if(!o||!Array.isArray(o.captures)||!o.facets)throw new Error("Index JSON is missing captures or facets");return o}async function Oo(){tt={status:"loading"},ht();let t;for(let n=0;n<20;n+=1)try{const o=await gr();await Is(),tt={status:"ready",index:o},ht();return}catch(o){t=o,await new Promise(s=>window.setTimeout(s,400))}tt={status:"error",message:t instanceof Error?t.message:String(t)},ht()}Ts(t=>{if(Wo(window.location.hash)){window.location.replace(pt({name:"studio",theme:null,card:null}));return}D=t,ht()});Oo();
