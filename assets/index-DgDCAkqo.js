(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const Bn="ig-feed-square",Ne=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function Bt(e){return Ne.find(t=>t.id===e)??Ne[0]}const Ot=0,ue=120,Yn=28,nt=100,ht=4e3,Oe=5,ti=10,pe=100,Be=4e3,$t=240,ln=360,Ye=280,Xe=6,Xn="Hello",Un=`헤르메스의 대표 브랜드 에셋입니다.
에이전트의 그래픽 결과물을 합성하였습니다.`,cn="black-mountain-red-horizon",jn=100,Kn=32,Zn=71,Gn=99,Jn=77,Vn=209,fe=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Bi="rgb(0, 0, 0)",Yi="rgb(255, 255, 255)";function un(e){return Number.isFinite(e)?Math.min(ue,Math.max(Ot,Math.round(e))):Ot}function ot(e){return Number.isFinite(e)?Math.min(ht,Math.max(nt,Math.round(e))):nt}function Qn(e,t,n){const s=Math.max(1,Math.round(e)),l=Math.max(1,Math.round(t))/s;let c=ot(n);const m=Math.round(c*l);let h=ot(m);return m!==h&&(c=ot(Math.round(h/l)),h=ot(Math.round(c*l))),{cardWidth:c,cardHeight:h}}function ei(e){return Math.max(Oe,ot(e)-ti*2)}function st(e,t){const n=ei(t);return Number.isFinite(e)?Math.min(n,Math.max(Oe,Math.round(e))):Oe}function Yt(e){return Number.isFinite(e)?Math.min(Be,Math.max(pe,Math.round(e))):pe}function rt(e,t,n){const s=Math.max(0,Math.round(t)-Math.min(Math.max(n,0),Math.round(t)));return Number.isFinite(e)?Math.min(s,Math.max(0,Math.round(e))):0}function ne(e,t,n){const s=Math.round(-n+40),r=Math.round(t-40);return Number.isFinite(e)?s>r?Math.round((t-n)/2):Math.min(r,Math.max(s,Math.round(e))):0}function oe(e,t,n,s){const r=Yt(t),l=r/Math.max(1,e.width);return{x:Math.round(n-(n-e.x)*l),y:Math.round(s-(s-e.y)*l),width:r}}function to(e,t){const n=Math.max($t,Math.round(t)-Ye-Xe);return Number.isFinite(e)?Math.min(n,Math.max($t,Math.round(e))):ln}function eo(e){return(e.split(/[/\\]/).pop()??e).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function Et(e,t=[]){var s;const n=fe.find(r=>r.id===e);return n?n.stack:((s=t.find(r=>r.id===e))==null?void 0:s.stack)??fe[0].stack}function ii(e,t){const n=Bt(Bn),s=st(jn,n.width),r=st(Kn,n.width),l=Xt(0,0,0);return{presetId:n.id,cardWidth:n.width,cardHeight:n.height,title:Xn,body:Un,themeSlug:e,color:t,radius:Yn,code:"",panel:"design",controlsWidth:ln,titleSize:s,bodySize:r,titleX:rt(Zn,n.width,s),titleY:rt(Gn,n.height,s),bodyX:rt(Jn,n.width,r),bodyY:rt(Vn,n.height,r),titleFontId:"montserrat",bodyFontId:"pretendard",titleColor:l,bodyColor:l,imageWidth:Yt(n.width),imageX:0,imageY:0}}function io(e,t){const n=ii(e.themeSlug,t);n.controlsWidth=e.controlsWidth,n.panel=e.panel,Object.assign(e,n)}function no(e,t,n){if(!t){io(e,n);return}Object.assign(e,structuredClone(t))}function K(e){const t=e.trim().match(/^#([0-9a-fA-F]{6})$/);return t?`#${t[1].toLowerCase()}`:null}function Xt(e,t,n){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(e)}${s(t)}${s(n)}`}function ni(e){const t=K(e);if(t)return{r:Number.parseInt(t.slice(1,3),16),g:Number.parseInt(t.slice(3,5),16),b:Number.parseInt(t.slice(5,7),16)};const n=e.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return n?{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])}:null}function xt(e){const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4}function Xi(e,t){const n=.2126*xt(e.r)+.7152*xt(e.g)+.0722*xt(e.b),s=.2126*xt(t.r)+.7152*xt(t.g)+.0722*xt(t.b),r=Math.max(n,s),l=Math.min(n,s);return(r+.05)/(l+.05)}function Ue(e){const t=ni(hn(e));return t?Xt(t.r,t.g,t.b):Xt(0,0,0)}function hn(e){const t=ni(e)??{r:255,g:255,b:255},n=Xi({r:0,g:0,b:0},t),s=Xi({r:255,g:255,b:255},t);return n>=4.5&&n>=s?Bi:s>=4.5?Yi:n>=s?Bi:Yi}function oo(e,t,n){if(t<=0)return[];const s=[];for(const r of e.split(`
`)){const l=r.split(/\s+/).filter(Boolean);if(l.length===0){s.push("");continue}let c="";const m=h=>{if(n(h)<=t){c=h;return}let f="";for(const b of h){const y=f+b;n(y)<=t?f=y:(f&&s.push(f),f=b)}c=f};for(const h of l){const f=c?`${c} ${h}`:h;n(f)<=t?c=f:(c&&s.push(c),m(h))}c&&s.push(c)}return s}function Fe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function so(e){return e.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function ro(e,t){return so(e).replaceAll("{{title}}",Fe(t.title)).replaceAll("{{body}}",Fe(t.body)).replaceAll("{{themeImage}}",Fe(t.themeImage))}function je(){return`<article class="studio-card">
  <img src="{{themeImage}}" alt="" />
  <h1>{{title}}</h1>
  <p>{{body}}</p>
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
  .studio-card img {
    position: absolute;
    left: var(--studio-image-x);
    top: var(--studio-image-y);
    width: var(--studio-image-width);
    height: auto;
  }
  .studio-card h1:empty, .studio-card p:empty { display: none; }
  .studio-card h1, .studio-card p { position: absolute; margin: 0; line-height: 1.25; }
  .studio-card h1 {
    left: var(--studio-title-x);
    top: var(--studio-title-y);
    font-size: var(--studio-title-size);
    font-weight: 600;
    font-family: var(--studio-title-font);
    color: var(--studio-title-color);
  }
  .studio-card p {
    left: var(--studio-body-x);
    top: var(--studio-body-y);
    font-size: var(--studio-body-size);
    font-weight: 400;
    font-family: var(--studio-body-font);
    color: var(--studio-body-color);
  }
</style>`}function Ke(e){const t=K(e.color)??e.color,n=hn(t),s=K(e.titleColor)??Ue(t),r=K(e.bodyColor)??Ue(t),l=un(e.radius),c=Bt("ig-feed-square"),m=e.width>0?e.width:c.width,h=e.height>0?e.height:c.height,f=e.titleFontStack.replaceAll(";",""),b=e.bodyFontStack.replaceAll(";",""),y=ro(e.code.trim()||je(),e),E=[`--studio-color:${t}`,`--studio-ink:${n}`,`--studio-radius:${l}px`,`--studio-width:${m}px`,`--studio-height:${h}px`,`--studio-title-font:${f}`,`--studio-body-font:${b}`,`--studio-title-size:${st(e.titleSize,m)}px`,`--studio-body-size:${st(e.bodySize,m)}px`,`--studio-title-x:${Math.round(e.titleX)}px`,`--studio-title-y:${Math.round(e.titleY)}px`,`--studio-body-x:${Math.round(e.bodyX)}px`,`--studio-body-y:${Math.round(e.bodyY)}px`,`--studio-image-width:${Yt(e.imageWidth)}px`,`--studio-image-x:${Math.round(e.imageX)}px`,`--studio-image-y:${Math.round(e.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${m}px;height:${h}px;margin:0;background:transparent;${E}">${y}</div>`}function ao(e){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Ke(e)}</body>
</html>`}const mn="design-llm-wiki-pins";function ge(){try{const e=localStorage.getItem(mn);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter(n=>typeof n=="string"):[]}catch{return[]}}function lo(e){const t=[...new Set(e)];localStorage.setItem(mn,JSON.stringify(t))}function co(e){const t=ge(),n=t.includes(e)?t.filter(s=>s!==e):[...t,e];return lo(n),ge()}const oi="ax-studio-baseline";function uo(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.presetId=="string"&&typeof t.cardWidth=="number"&&typeof t.cardHeight=="number"&&typeof t.title=="string"&&typeof t.body=="string"&&typeof t.themeSlug=="string"&&typeof t.color=="string"&&typeof t.radius=="number"&&typeof t.code=="string"&&(t.panel==="design"||t.panel==="code")&&typeof t.controlsWidth=="number"&&typeof t.titleSize=="number"&&typeof t.bodySize=="number"&&typeof t.titleX=="number"&&typeof t.titleY=="number"&&typeof t.bodyX=="number"&&typeof t.bodyY=="number"&&typeof t.titleFontId=="string"&&typeof t.bodyFontId=="string"&&typeof t.titleColor=="string"&&typeof t.bodyColor=="string"&&typeof t.imageWidth=="number"&&typeof t.imageX=="number"&&typeof t.imageY=="number"}function pn(){try{const e=localStorage.getItem(oi);if(!e)return null;const t=JSON.parse(e);return uo(t)?t:null}catch{return null}}function ho(e){localStorage.setItem(oi,JSON.stringify(e))}function mo(){localStorage.removeItem(oi)}const po="ax-design-studio",Mt="cards";let Ut=[];function fn(){return Ut}function gn(){return new Promise((e,t)=>{const n=indexedDB.open(po,1);n.onupgradeneeded=()=>{const s=n.result;s.objectStoreNames.contains(Mt)||s.createObjectStore(Mt,{keyPath:"id"})},n.onsuccess=()=>e(n.result),n.onerror=()=>t(n.error??new Error("indexedDB open failed"))})}function fo(){const e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`saved-${e}-${t}`}async function go(){try{const e=await gn(),t=await new Promise((n,s)=>{const r=e.transaction(Mt,"readonly").objectStore(Mt).getAll();r.onsuccess=()=>n(r.result??[]),r.onerror=()=>s(r.error??new Error("indexedDB read failed"))});e.close(),Ut=t.sort((n,s)=>n.createdAt<s.createdAt?1:-1)}catch{Ut=[]}}async function yo(e,t){const n={id:fo(),title:e.title.trim()||"제목 없음",createdAt:new Date().toISOString(),state:structuredClone(e),thumbnail:t};try{const s=await gn();return await new Promise((r,l)=>{const c=s.transaction(Mt,"readwrite").objectStore(Mt).put(n);c.onsuccess=()=>r(),c.onerror=()=>l(c.error??new Error("indexedDB write failed"))}),s.close(),Ut=[n,...Ut],n}catch{return null}}let Ui=0;function Ze(e){return new Promise(t=>{var h,f,b;const n=document.createElement("div");n.className="confirm-backdrop",n.innerHTML=`
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-message">
        <p class="confirm-dialog__message" id="confirm-message"></p>
        <div class="confirm-dialog__actions">
          <button type="button" class="button button--secondary" data-confirm="cancel">취소</button>
          <button type="button" class="button" data-confirm="ok">진행</button>
        </div>
      </div>
    `;const s=n.querySelector("#confirm-message");s&&(s.textContent=e);const r=document.activeElement instanceof HTMLElement?document.activeElement:null;let l=!1;const c=y=>{l||(l=!0,document.removeEventListener("keydown",m),n.remove(),r==null||r.focus(),t(y))},m=y=>{y.key==="Escape"&&(y.preventDefault(),c(!1))};n.addEventListener("click",y=>{y.target===n&&c(!1)}),(h=n.querySelector("[data-confirm='cancel']"))==null||h.addEventListener("click",()=>c(!1)),(f=n.querySelector("[data-confirm='ok']"))==null||f.addEventListener("click",()=>c(!0)),document.addEventListener("keydown",m),document.body.append(n),(b=n.querySelector("[data-confirm='ok']"))==null||b.focus()})}function Ge(e){var n;(n=document.querySelector(".toast"))==null||n.remove(),window.clearTimeout(Ui);const t=document.createElement("div");t.className="toast",t.setAttribute("role","status"),t.textContent=e,document.body.append(t),Ui=window.setTimeout(()=>t.remove(),2400)}const yn="[a-z0-9]+(?:-[a-z0-9]+)*";function bn(e){const t=e.startsWith("#")?e.slice(1):e,n=t.indexOf("?"),s=n>=0?t.slice(0,n):t,r=n>=0?t.slice(n+1):"",l=s.startsWith("/")?s:`/${s}`;return{path:l==="/"||l===""?"/":l.replace(/\/+$/,"")||"/",query:r}}function ji(e,t){const n=new URLSearchParams(e).get(t);return!n||!new RegExp(`^${yn}$`).test(n)?null:n}function vn(e){const{path:t}=bn(e);return t==="/intake"||t==="/design-system"||t==="/stats"}function Je(e=window.location.hash){const{path:t,query:n}=bn(e);if(t==="/"||t==="/gallery")return{name:"archive"};if(t==="/history")return{name:"history"};if(t==="/studio"||vn(e))return{name:"studio",theme:t==="/studio"?ji(n,"theme"):null,card:t==="/studio"?ji(n,"card"):null};const s=t.match(new RegExp(`^/capture/(${yn})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:t}}function tt(e){switch(e.name){case"archive":return"#/";case"capture":return`#/capture/${e.slug}`;case"studio":{const t=new URLSearchParams;e.card?t.set("card",e.card):e.theme&&t.set("theme",e.theme);const n=t.toString();return n?`#/studio?${n}`:"#/studio"}case"history":return"#/history";case"notfound":return`#${e.path}`}}function bo(e){const t=()=>e(Je());return window.addEventListener("hashchange",t),e(Je()),()=>window.removeEventListener("hashchange",t)}function vo(e){return[...e].sort((t,n)=>t.capturedAt!==n.capturedAt?t.capturedAt<n.capturedAt?1:-1:t.slug.localeCompare(n.slug))}function p(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function St(e){return e.startsWith("./")||e.startsWith("/")||e.startsWith("blob:")||e.startsWith("data:")||e.startsWith("http://")||e.startsWith("https://")?e:`./${e}`}let se=null;function _o(e){const t=e.querySelector(".archive-tabs__indicator"),n=e.querySelector('.archive-tab[aria-selected="true"]');if(!t||!n)return;const s=n.offsetLeft,r=n.offsetWidth;se&&(t.style.transition="none",t.style.transform=`translateX(${se.left}px)`,t.style.width=`${se.width}px`,t.offsetWidth,t.style.transition=""),requestAnimationFrame(()=>{t.style.transform=`translateX(${s}px)`,t.style.width=`${r}px`,se={left:s,width:r}})}function He(e){const t=e.querySelector(".capture-grid");if(!t)return;const n=window.getComputedStyle(t),s=Number.parseFloat(n.gridAutoRows)||1,r=Number.parseFloat(n.rowGap)||0;t.querySelectorAll(".capture-card").forEach(l=>{l.style.gridRowEnd="";const c=l.getBoundingClientRect().height,m=Number.parseFloat(window.getComputedStyle(l).marginBottom)||0,h=Math.ceil((c+m+r)/(s+r));l.style.gridRowEnd=`span ${Math.max(1,h)}`})}function xo(e){const t=e.asset.kind==="motion"&&e.asset.posterPath?e.asset.posterPath:e.asset.path;return`<img class="capture-card__media" src="${p(St(t))}" alt="" loading="lazy" width="${e.asset.width}" height="${e.asset.height}" />`}function wo(e){const t=`${e.state.cardWidth} × ${e.state.cardHeight}`;return`
    <article class="capture-card">
      <a class="capture-card__link" href="${tt({name:"studio",theme:null,card:e.id})}">
        <div class="capture-card__frame">
          <img class="capture-card__media" src="${p(e.thumbnail)}" alt="" width="${e.state.cardWidth}" height="${e.state.cardHeight}" />
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${p(e.title)}</h2>
          <p class="capture-card__insight">${p(t)}</p>
        </div>
      </a>
    </article>
  `}function $o(e,t){return`
    <article class="capture-card${t?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${tt({name:"capture",slug:e.slug})}">
        <div class="capture-card__frame">
          ${xo(e)}
          ${e.asset.kind==="still"?"":`<span class="capture-card__kind">${p(e.asset.kind)}</span>`}
          ${t?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${p(e.title)}</h2>
          <p class="capture-card__insight">${p(e.insight)}</p>
        </div>
      </a>
    </article>
  `}function So(e,t){const n=new Set(t),s=vo(e),r=s.filter(f=>n.has(f.slug)),l=s.filter(f=>!n.has(f.slug)),c=new Map(s.map(f=>[f.slug,f])),m=t.map(f=>c.get(f)).filter(f=>!!f),h=r.filter(f=>!t.includes(f.slug));return[...m,...h,...l]}function Eo(e,t,n,s){const r=new Set(t),l=n==="pin"?e.captures.filter(m=>r.has(m.slug)):e.captures,c=So(l,t);return e.captures.length===0?`
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
          <p class="gallery__meta">${n==="saved"?`Saved ${s.length}`:`Target ${p(e.target)} · ${c.length} · ${t.length} pinned`}</p>
        </div>
      </header>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${n==="all"?"true":"false"}">
          All <span class="archive-tab__count">${e.captures.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${n==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${t.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-saved" data-archive-tab="saved" aria-selected="${n==="saved"?"true":"false"}">
          Saved <span class="archive-tab__count">${s.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${n==="saved"?s.length===0?`<section class="state-panel state-panel--tint">
                  <h2 class="state-panel__title">저장된 카드가 없습니다</h2>
                  <p class="state-panel__text">스튜디오에서 그래픽 라이브러리에 추가를 누르면 이 탭에 모입니다.</p>
                </section>`:`<div class="capture-grid">${s.map(m=>wo(m)).join("")}</div>`:c.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${n==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${n==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${c.map(m=>$o(m,t.includes(m.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Mo(e,t){e.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.archiveTab;(l==="all"||l==="pin"||l==="saved")&&t.onTabChange(l)})}),_o(e),requestAnimationFrame(()=>He(e)),e.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>He(e),{once:!0})});const n=new ResizeObserver(()=>He(e)),s=e.querySelector(".capture-grid");s&&n.observe(s)}function Lo(e){const t=e.replace(/\r\n/g,`
`).split(`
`),n=[];let s=!1;const r=()=>{s&&(n.push("</ul>"),s=!1)};for(const l of t){const c=l.trim();if(!c){r();continue}if(c.startsWith("### ")){r(),n.push(`<h3>${Ht(c.slice(4))}</h3>`);continue}if(c.startsWith("## ")){r(),n.push(`<h2>${Ht(c.slice(3))}</h2>`);continue}if(c.startsWith("# ")){r(),n.push(`<h1>${Ht(c.slice(2))}</h1>`);continue}if(c.startsWith("- ")){s||(n.push("<ul>"),s=!0),n.push(`<li>${Ht(c.slice(2))}</li>`);continue}r(),n.push(`<p>${Ht(c)}</p>`)}return r(),n.join(`
`)}function Ht(e){let t=p(e);return t=t.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(n,s)=>`<a href="${tt({name:"capture",slug:s})}">${s}</a>`),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(n,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${p(r)}">${s}</a>`),t}const ko=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Io(e){return Math.max(35,Math.min(98,Math.round(e)))}function Wo(e){let t=0;for(const n of e)t=(t*31+n.charCodeAt(0))%997;return t}function Ao(e){var f;if((f=e.analysisScores)!=null&&f.length)return e.analysisScores;const t=Wo(`${e.slug}:${e.title}:${e.insight}`),n=e.tags.includes("density")?7:0,s=e.asset.kind==="motion"?8:0,r=Math.min(12,e.uiPatterns.length*3),l=e.asset.width/Math.max(1,e.asset.height),c=l>1.2?6:0,m=l<.75?5:0,h=[68+r+c+t%9,66+n+(t>>1)%10,64+(e.insight.length>45?8:3)+(t>>2)%9,58+s+(e.uiPatterns.includes("filter-chips")?7:0),62+m+r+(t>>3)%8].map(Io);return ko.map(([b,y],E)=>({key:b,label:y,score:h[E]??60,description:qo(y,h[E]??60,e)}))}function Co(e){return e.length===0?0:Math.round(e.reduce((t,n)=>t+n.score,0)/e.length)}function qo(e,t,n){return e==="레이아웃"?`${n.screenType} 화면 구조와 ${n.uiPatterns.join(", ")} 패턴의 배치 안정성.`:e==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":e==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":e==="인터랙션 단서"?n.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":t>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function zo(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(2)} MB`}function To(e){return e.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${e.asset.posterPath?` poster="${p(St(e.asset.posterPath))}"`:""}>
        <source src="${p(St(e.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${p(St(e.asset.path))}"
      alt=""
      width="${e.asset.width}"
      height="${e.asset.height}"
    />
  `}function Fo(e){const t=Ao(e),n=e.analysisTotal??Co(t),s=160,r=110,l=[.25,.5,.75,1].map(h=>t.map((f,b)=>{const y=-Math.PI/2+b*Math.PI*2/t.length,E=s+Math.cos(y)*r*h,q=s+Math.sin(y)*r*h;return`${E.toFixed(1)},${q.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),c=t.map((h,f)=>{const b=-Math.PI/2+f*Math.PI*2/t.length,y=r*(h.score/100),E=s+Math.cos(b)*y,q=s+Math.sin(b)*y;return`${E.toFixed(1)},${q.toFixed(1)}`}).join(" "),m=t.map((h,f)=>{const b=-Math.PI/2+f*Math.PI*2/t.length,y=s+Math.cos(b)*r,E=s+Math.sin(b)*r,q=s+Math.cos(b)*r*(h.score/100),U=s+Math.sin(b)*r*(h.score/100),v=s+Math.cos(b)*(r+26),M=s+Math.sin(b)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${y.toFixed(1)}" y2="${E.toFixed(1)}" />
          <circle class="spider-point" cx="${q.toFixed(1)}" cy="${U.toFixed(1)}" r="6" />
          <text class="spider-label" x="${v.toFixed(1)}" y="${M.toFixed(1)}">${p(h.label)}</text>
          <text class="spider-callout" x="${v.toFixed(1)}" y="${(M+18).toFixed(1)}">${h.score}</text>
        </g>
      `}).join("");return`
    <section class="detail__section analysis-score">
      <div class="analysis-score__summary">
        <p class="detail__eyebrow">Image analysis score</p>
        <h2>총합 점수 ${n}</h2>
        <p class="detail__empty">항목 위에 마우스를 올리거나 키보드 포커스를 주면 해당 점수가 강조됩니다.</p>
      </div>
      <div class="spider-layout">
        <svg class="spider-chart" viewBox="0 0 320 320" role="img" aria-label="이미지 분석 스파이더 다이어그램">
          ${l}
          <polygon class="spider-area" points="${c}" />
          ${m}
        </svg>
        <dl class="score-list">
          ${t.map(h=>`
            <div class="score-list__item">
              <dt>${p(h.label)} <strong>${h.score}</strong></dt>
              <dd>${p(h.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function Ho(e){const t=[...e.tags,...e.uiPatterns,e.screenType,e.platform,e.tone,e.copyTone];return[...new Set(t)].map(n=>`<span class="chip detail-hashtag" aria-pressed="true">#${p(n)}</span>`).join("")}function Po(e,t,n){const s=e.captures.find(l=>l.slug===t);if(!s)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${p(t)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=n.includes(t);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${p(s.service)} · ${p(s.platform)}</p>
          <h1 class="detail__title">${p(s.title)}</h1>
          <p class="detail__insight">${p(s.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${p(tt({name:"studio",theme:t,card:null}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${p(t)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${To(s)}</div>

      ${Fo(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${p(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${p(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${zo(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${p(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${Ho(s)}
        </p>
        <p class="detail__meta-line">
          ${p(s.screenType)} · ${p(s.tone)} · ${p(s.copyTone)} · ${p(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${p(s.sourceUrl)}">${p(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Lo(s.body)}
      </section>
    </article>
  `}function Ro(e,t){var n;(n=e.querySelector("[data-pin-slug]"))==null||n.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&t(r)})}function Do(e){const t=e.wiki.logEntries;return t.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${t.length} entries · target ${p(e.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${t.map(n=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${p(n.date)}">${p(n.date)}</time>
            <span class="history-item__op">${p(n.operation)}</span>
            <strong class="history-item__title">${p(n.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function No(e){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${p(e)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Ki=.5,Zi=3,Gi=.25,Ji=40;let k=1,V=[],Pt=[],wt=[],re=[],Rt=null,Vi=1;const Oo=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],_n="(min-width: 768px)",xn="(min-width: 1025px)";let he=null,ae=null,de=null;function si(){return window.matchMedia(xn).matches?"desktop":window.matchMedia(_n).matches?"tablet":"mobile"}function wn(){const e=["mobile","tablet","desktop"],t=si();return he&&e.indexOf(he)<=e.indexOf(t)?he:t}function le(e){return{...e}}function Qi(e,t){return JSON.stringify(e)===JSON.stringify(t)}const Ve=new Map,tn=new Map;function $n(e){const t=Ve.get(e);return t!=null&&t.complete&&t.naturalWidth>0?Promise.resolve(t):new Promise((n,s)=>{const r=t??new Image;r.onload=()=>n(r),r.onerror=()=>s(new Error(`Image failed: ${e}`)),t||(Ve.set(e,r),r.src=e)})}function Pe(e){const t=tn.get(e);if(t)return t;const n=fetch(e).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,l)=>{const c=new FileReader;c.onload=()=>r(String(c.result)),c.onerror=()=>l(c.error??new Error("data url failed")),c.readAsDataURL(s)}));return tn.set(e,n),n}const Bo=Object.assign({}),en=new Set;function Yo(e){return e.includes(".woff2")?"woff2":e.includes(".woff")?"woff":e.includes(".otf")?"opentype":"truetype"}function Lt(){const e=new Set(fe.map(n=>n.label.toLowerCase())),t=[];for(const[n,s]of Object.entries(Bo)){const r=eo(n);if(!r||e.has(r.toLowerCase()))continue;const l=`local:${r}`;if(!t.some(c=>c.id===l)){if(!en.has(r)){en.add(r);const c=document.createElement("style");c.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${Yo(s)}");font-display:swap;}`,document.head.append(c)}t.push({id:l,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return t}function Xo(){return[...fe,...Lt()]}function Uo(e,t,n,s){const r=Math.max(0,Math.min(s,t/2,n/2));e.beginPath(),e.roundRect(0,0,t,n,r)}function Re(e,t){return{title:e.title,body:e.body,themeImage:t,color:e.color,radius:e.radius,width:e.cardWidth,height:e.cardHeight,code:e.code,titleFontStack:Et(e.titleFontId,Lt()),bodyFontStack:Et(e.bodyFontId,Lt()),titleSize:e.titleSize,bodySize:e.bodySize,titleX:e.titleX,titleY:e.titleY,bodyX:e.bodyX,bodyY:e.bodyY,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY,titleColor:e.titleColor,bodyColor:e.bodyColor}}function nn(e,t,n,s){const r=e.getContext("2d");if(!r)return[];const l=t.cardWidth,c=t.cardHeight;e.width=l,e.height=c,r.clearRect(0,0,l,c),r.save(),Uo(r,l,c,t.radius),r.clip(),r.fillStyle=t.color,r.fillRect(0,0,l,c);const m=[];if(n&&n.naturalWidth>0){const y=t.imageWidth,E=y*(n.naturalHeight/n.naturalWidth);r.drawImage(n,t.imageX,t.imageY,y,E),m.push({kind:"image",x:t.imageX,y:t.imageY,w:y,h:E})}const h=Math.max(1,l-ti*2);r.textBaseline="top";const f=(y,E,q,U,v,M,kt,mt)=>{if(!E.trim())return;r.fillStyle=mt,r.font=`${M} ${v}px ${kt}`;const at=oo(E.trim(),h,Z=>r.measureText(Z).width),dt=Math.round(v*1.25);let et=0;at.forEach((Z,It)=>{y!==s&&r.fillText(Z,q,U+It*dt),et=Math.max(et,r.measureText(Z).width)}),m.push({kind:y,x:q,y:U,w:Math.max(et,v),h:Math.max(at.length,1)*dt})},b=Lt();return f("body",t.body,t.bodyX,t.bodyY,t.bodySize,400,Et(t.bodyFontId,b),t.bodyColor),f("title",t.title,t.titleX,t.titleY,t.titleSize,600,Et(t.titleFontId,b),t.titleColor),r.restore(),m}function on(e,t){e.toBlob(n=>{if(!n)return;const s=URL.createObjectURL(n),r=document.createElement("a");r.href=s,r.download=t,r.click(),URL.revokeObjectURL(s)},"image/png")}async function sn(e,t,n,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${t}</foreignObject></svg>`,l=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),c=URL.createObjectURL(l);try{const m=await $n(c),h=e.getContext("2d");if(!h)return;e.width=n,e.height=s,h.clearRect(0,0,n,s),h.drawImage(m,0,0,n,s)}finally{URL.revokeObjectURL(c),Ve.delete(c)}}let Dt=null;function rn(e,t,n){let s=0;const r=()=>{const l=e.scrollHeight-e.clientHeight;if(l<=1){t.hidden=!0;return}t.hidden=!1;const c=Math.max(32,e.clientHeight/e.scrollHeight*e.clientHeight),m=Math.max(0,e.clientHeight-c);t.style.height=`${c}px`,t.style.transform=`translateY(${e.scrollTop/l*m}px)`};return e.addEventListener("scroll",()=>{r(),n.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>n.classList.remove("is-scrolling"),700)}),r(),r}function jo(e,t){if(t.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const n=Ue(e.color);e.titleColor=K(String(e.titleColor??""))??n,e.bodyColor=K(String(e.bodyColor??""))??n;const s=e.fontId;e.titleFontId||(e.titleFontId=s||"pretendard"),e.bodyFontId||(e.bodyFontId=s||"pretendard");const r=Bt(e.presetId),l=Ne.map(v=>`<option value="${p(v.id)}"${v.id===r.id?" selected":""}>${p(v.name)} · ${v.width}×${v.height}</option>`).join(""),c=t.map(v=>{const M=v.slug===e.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${p(v.slug)}"
          aria-checked="${M?"true":"false"}"
          tabindex="${M?"0":"-1"}"
        >
          <img src="${p(St(v.asset.path))}" alt="${p(v.title)}" />
        </button>
      `}).join(""),m=e.panel==="design",h=Xo(),f=ei(e.cardWidth),b=v=>h.map(M=>`<option value="${p(M.id)}"${M.id===v?" selected":""}>${p(M.label)}</option>`).join(""),y='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',E='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',q=wn();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${Oo.map(v=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${v.id}" aria-label="${v.label}" title="${v.label}" aria-pressed="${v.id===q?"true":"false"}">${v.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${q}" data-framed="${q===si()?"false":"true"}">
    <section class="studio" style="--studio-controls-width:${e.controlsWidth}px">
      <div class="studio__controls-wrap">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${m?"true":"false"}" tabindex="${m?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${m?"false":"true"}" tabindex="${m?"-1":"0"}">Code</button>
        </div>
        <div class="studio__panel-host">
        <div class="studio__panel-scroll" id="studio-panel-scroll">
        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${m?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${l}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${nt}" max="${ht}" step="1" value="${e.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${nt}" max="${ht}" step="1" value="${e.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${nt}" max="${ht}" step="1" value="${e.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${nt}" max="${ht}" step="1" value="${e.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${nt}" max="${ht}" step="1" value="${e.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${nt}" max="${ht}" step="1" value="${e.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${p(e.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${p(e.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${p(e.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${f}" step="1" value="${e.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${f}" step="1" value="${e.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${b(e.titleFontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${p(e.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${p(e.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${p(e.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${f}" step="1" value="${e.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${f}" step="1" value="${e.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${b(e.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${c}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${pe}" max="${Be}" step="1" value="${e.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${pe}" max="${Be}" step="1" value="${e.imageWidth}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮기고, 핀치하거나 클릭 후 가장자리 핸들을 끌어 크기를 조절할 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${p(e.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${p(e.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${Ot}" max="${ue}" step="1" value="${e.radius}" aria-valuemin="${Ot}" aria-valuemax="${ue}" aria-valuenow="${e.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${Ot}" max="${ue}" step="1" value="${e.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-set-baseline">초기화로 세팅</button>
          <button type="button" class="button button--secondary studio__reset" id="studio-save-library">그래픽 라이브러리에 추가</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${m?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${p(e.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
        </div>
        <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
        </div>
      </form>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${$t}" aria-valuenow="${e.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__stage" id="studio-stage">
          <div class="studio__stage-frame">
            <div class="studio__fit" id="studio-fit">
              <div class="studio__scaler" id="studio-scaler">
                <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
                <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
                <div class="studio__safe" id="studio-safe" hidden></div>
              </div>
              <div class="studio__overlay">
                <div class="studio__select-frame" data-frame="image" hidden></div>
                <div class="studio__select-frame" data-frame="title" hidden></div>
                <div class="studio__select-frame" data-frame="body" hidden></div>
                <span class="studio__handle" data-handle="top" hidden></span>
                <span class="studio__handle" data-handle="right" hidden></span>
                <span class="studio__handle" data-handle="bottom" hidden></span>
                <span class="studio__handle" data-handle="left" hidden></span>
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
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled>${E}</button>
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
  `}function Ko(e,t,n,s){var Wi,Ai,Ci,qi,zi,Ti,Fi,Hi,Pi,Ri,Di;if(n.length===0)return;const r=e.querySelector("#studio-preset"),l=e.querySelector("#studio-size"),c=e.querySelector("#studio-size-number"),m=e.querySelector("#studio-width"),h=e.querySelector("#studio-width-number"),f=e.querySelector("#studio-height"),b=e.querySelector("#studio-height-number"),y=e.querySelector("#studio-title"),E=e.querySelector("#studio-title-color"),q=e.querySelector("#studio-title-hex"),U=e.querySelector("#studio-title-size"),v=e.querySelector("#studio-title-size-number"),M=e.querySelector("#studio-body"),kt=e.querySelector("#studio-body-color"),mt=e.querySelector("#studio-body-hex"),at=e.querySelector("#studio-body-size"),dt=e.querySelector("#studio-body-size-number"),et=e.querySelector("#studio-title-font"),Z=e.querySelector("#studio-body-font"),It=e.querySelector("#studio-image-width"),be=e.querySelector("#studio-image-width-number"),ve=e.querySelector("#studio-color"),jt=e.querySelector("#studio-hex"),F=e.querySelector("#studio-radius"),j=e.querySelector("#studio-radius-number"),N=e.querySelector("#studio-code"),w=e.querySelector("#studio-canvas"),Kt=e.querySelector("#studio-iframe"),ai=e.querySelector("#studio-meta"),Wt=e.querySelector("#studio-safe"),Zt=e.querySelector("#studio-scaler"),_e=e.querySelector("#studio-fit"),At=e.querySelector("#studio-stage"),xe=e.querySelector("#studio-zoom-out"),we=e.querySelector("#studio-zoom-in"),di=e.querySelector("#studio-zoom-label"),$e=e.querySelector("#studio-undo"),Se=e.querySelector("#studio-redo"),Ee=e.querySelector("#studio-scroll-thumb"),Me=e.querySelector(".studio__controls-wrap"),Le=e.querySelector("#studio-export"),O=e.querySelector("#studio-splitter"),Gt=e.querySelector(".studio"),Ln=[...e.querySelectorAll(".studio__select-frame")],$=e.querySelector("#studio-editor"),ke=[...e.querySelectorAll(".studio__handle")];if(!$||!r||!l||!c||!m||!h||!f||!b||!y||!E||!q||!U||!v||!M||!kt||!mt||!at||!dt||!et||!Z||!It||!be||!ve||!jt||!F||!j||!N||!w||!Kt||!ai||!Wt||!Zt||!_e||!At||!xe||!we||!di||!$e||!Se||!Ee||!Me||!Le||!O||!Gt||!e.querySelector("#studio-set-baseline")||!e.querySelector("#studio-save-library"))return;const Ie=()=>{const i=n.find(o=>o.slug===t.themeSlug)??n[0];return i?St(i.asset.path):""};let Jt=0,G=1;const I=new Set;let A=null,H=()=>{},Ct=()=>{};const kn=()=>{(!Number.isFinite(k)||k<=0)&&(k=1),xe.disabled=k<=Ki+.001,we.disabled=k>=Zi-.001,di.textContent=`${Math.round(k*100)}%`},We=(i,o)=>{const a=At.getBoundingClientRect(),d=20,u=Math.min(Math.max(a.width-d,1)/i,Math.max(a.height-d,1)/o);return Number.isFinite(u)&&u>0?u:1},pt=()=>{const i=We(t.cardWidth,t.cardHeight);kn();const o=i*k;_e.style.width=`${t.cardWidth*o}px`,_e.style.height=`${t.cardHeight*o}px`,Zt.style.width=`${t.cardWidth}px`,Zt.style.height=`${t.cardHeight}px`,Zt.style.transform=`scale(${o})`,G=o,Ct()};xe.addEventListener("click",()=>{k=Math.max(Ki,k-Gi),pt()}),we.addEventListener("click",()=>{k=Math.min(Zi,k+Gi),pt()}),(Wi=e.querySelector("#studio-zoom-fit"))==null||Wi.addEventListener("click",()=>{k=1,pt(),At.scrollTo(0,0)});const li=e.querySelector("#studio-panel-scroll"),In=li&&Ee&&Me?rn(li,Ee,Me):()=>{},Wn=()=>{N.style.height="auto",N.style.height=`${Math.max(180,N.scrollHeight)}px`,In()},ft=()=>{const i=document.querySelector("#studio-undo"),o=document.querySelector("#studio-redo");i&&(i.disabled=V.length===0),o&&(o.disabled=Pt.length===0)};let qt=null;const _=i=>{if(i&&qt!==i)return;if(!Rt){qt=null;return}const o=Rt,a=Vi;Rt=null,qt=null,!(Qi(o,t)&&a===k)&&(V.push(o),wt.push(a),V.length>Ji&&(V.shift(),wt.shift()),Pt=[],re=[],ft())},L=i=>{i&&qt===i&&Rt||(_(),Rt=le(t),Vi=k,qt=i??null)},An=i=>{const o=Number(i.min),a=Number(i.max),d=Number(i.value),u=a>o?(d-o)/(a-o)*100:0;i.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,u))}%`)};let ci=t.cardHeight/Math.max(1,t.cardWidth),gt={cardWidth:t.cardWidth,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY};const Ae=()=>{ci=t.cardHeight/Math.max(1,t.cardWidth),gt={cardWidth:t.cardWidth,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY}};let Y=null,yt=1,lt=[];const ui=()=>t.imageWidth*yt,Ce=()=>{t.cardWidth=ot(t.cardWidth),t.cardHeight=ot(t.cardHeight),t.imageWidth=Yt(t.imageWidth)},bt=(i,o,a)=>{i.value=String(a),document.activeElement!==o&&(o.value=String(a))},Cn=()=>{const i=ei(t.cardWidth),o=String(Math.max(i,t.titleSize)),a=String(Math.max(i,t.bodySize));for(const d of[U,v])d.min="5",d.max=o;for(const d of[at,dt])d.min="5",d.max=a;bt(l,c,t.cardWidth),bt(m,h,t.cardWidth),bt(f,b,t.cardHeight),bt(U,v,t.titleSize),bt(at,dt,t.bodySize),bt(It,be,t.imageWidth)},hi=()=>{F.value=String(t.radius),F.setAttribute("aria-valuenow",String(t.radius)),j.value=String(t.radius),e.style.setProperty("--studio-card-radius",`${t.radius}px`)},mi=(i,o)=>{t.themeSlug=i;for(const a of e.querySelectorAll("[data-theme-slug]")){const d=a.dataset.themeSlug===i;a.setAttribute("aria-checked",d?"true":"false"),a.tabIndex=d?0:-1,d&&o&&a.focus()}W()},qe=i=>{var u,g;t.panel=i;const o=i==="design";(u=e.querySelector("#studio-panel-design"))==null||u.toggleAttribute("hidden",!o),(g=e.querySelector("#studio-panel-code"))==null||g.toggleAttribute("hidden",o);const a=e.querySelector("#studio-tab-design"),d=e.querySelector("#studio-tab-code");a==null||a.setAttribute("aria-selected",o?"true":"false"),d==null||d.setAttribute("aria-selected",o?"false":"true"),a&&(a.tabIndex=o?0:-1),d&&(d.tabIndex=o?-1:0),W()},pi=()=>{r.value=t.presetId,document.activeElement!==y&&(y.value=t.title),document.activeElement!==M&&(M.value=t.body),document.activeElement!==q&&(E.value=t.titleColor,q.value=t.titleColor),document.activeElement!==mt&&(kt.value=t.bodyColor,mt.value=t.bodyColor),document.activeElement!==jt&&(ve.value=t.color,jt.value=t.color),et.value=t.titleFontId,Z.value=t.bodyFontId,document.activeElement!==N&&(N.value=t.code);for(const i of e.querySelectorAll("[data-theme-slug]")){const o=i.dataset.themeSlug===t.themeSlug;i.setAttribute("aria-checked",o?"true":"false"),i.tabIndex=o?0:-1}},W=async()=>{const i=++Jt;Ce(),pi(),Cn(),e.querySelectorAll('input[type="range"]').forEach(An);const o=Bt(t.presetId),a=t.cardWidth===o.width&&t.cardHeight===o.height,d=a&&o.safe?` · 안전 영역 ${o.safe.width} × ${o.safe.height}`:"";ai.textContent=`${t.cardWidth} × ${t.cardHeight} · ${o.name}${d}`,Le.textContent=je(),Wn(),hi(),pt(),a&&o.safe?(Wt.hidden=!1,Wt.style.width=`${o.safe.width}px`,Wt.style.height=`${o.safe.height}px`):Wt.hidden=!0;const u=(x,z,T)=>{var Ft;const D=(Ft=Et(x,Lt()).split(",")[0])==null?void 0:Ft.replaceAll('"',"").trim();return D?document.fonts.load(`${z} ${T}px "${D}"`):Promise.resolve()};try{await Promise.all([u(t.titleFontId,600,t.titleSize),u(t.bodyFontId,400,t.bodySize)])}catch{}if(i!==Jt)return;const g=Ie();if(t.code.trim()){w.hidden=!0,Kt.hidden=!1;const x=g?await Pe(g):"";if(i!==Jt)return;Kt.srcdoc=ao(Re(t,x)),Ct();return}if(Kt.hidden=!0,w.hidden=!1,g)try{Y=await $n(g),Y.naturalWidth>0&&(yt=Y.naturalHeight/Y.naturalWidth)}catch{Y=null,yt=1}else Y=null,yt=1;i===Jt&&(Ce(),H())},vt=(i,o,a,d)=>{i.addEventListener("pointerdown",()=>L(i)),i.addEventListener("keydown",()=>L(i)),i.addEventListener("pointerup",()=>_(i)),i.addEventListener("pointercancel",()=>_(i)),i.addEventListener("keyup",()=>_(i)),i.addEventListener("input",()=>{a(Number(i.value)),W()});const u=()=>{Ce(),o.value=String(d()),_(o)};o.addEventListener("focus",()=>L(o)),o.addEventListener("input",()=>{o.value.trim()!==""&&(a(Number(o.value)),W())}),o.addEventListener("change",u),o.addEventListener("blur",u)};r.addEventListener("focus",()=>L(r)),r.addEventListener("change",()=>{const i=Bt(r.value);t.presetId=i.id,t.cardWidth=i.width,t.cardHeight=i.height,_(r),W()}),r.addEventListener("blur",()=>_(r)),l.addEventListener("pointerdown",Ae),l.addEventListener("keydown",Ae),c.addEventListener("focus",Ae),vt(l,c,i=>{const o=We(t.cardWidth,t.cardHeight)*k,a=Qn(Math.max(1,t.cardWidth),Math.max(1,Math.round(t.cardWidth*ci)),i);t.cardWidth=a.cardWidth,t.cardHeight=a.cardHeight;const d=t.cardWidth/Math.max(1,gt.cardWidth);t.imageWidth=Yt(gt.imageWidth*d);const u=t.imageWidth/Math.max(1,gt.imageWidth);t.imageX=Math.round(gt.imageX*u),t.imageY=Math.round(gt.imageY*u);const g=We(t.cardWidth,t.cardHeight);g>0&&Number.isFinite(o)&&o>0&&(k=o/g)},()=>t.cardWidth),vt(m,h,i=>{t.cardWidth=ot(i),t.titleSize=st(t.titleSize,t.cardWidth),t.bodySize=st(t.bodySize,t.cardWidth)},()=>t.cardWidth),vt(f,b,i=>{t.cardHeight=i},()=>t.cardHeight),vt(U,v,i=>{t.titleSize=st(i,t.cardWidth)},()=>t.titleSize),vt(at,dt,i=>{t.bodySize=st(i,t.cardWidth)},()=>t.bodySize),vt(It,be,i=>{t.imageWidth=i},()=>t.imageWidth);const fi=(i,o)=>{i.addEventListener("focus",()=>L(i)),i.addEventListener("change",()=>{o(),_(i),W()}),i.addEventListener("blur",()=>_(i))};fi(et,()=>{t.titleFontId=et.value}),fi(Z,()=>{t.bodyFontId=Z.value});const qn=async()=>{var g;const i=document.createElement("canvas");if(t.code.trim()){const x=Ie(),z=x?await Pe(x):"";await sn(i,Ke(Re(t,z)),t.cardWidth,t.cardHeight)}else nn(i,t,Y);const o=1080,a=Math.max(t.cardWidth,t.cardHeight);if(a<=o)return i.toDataURL("image/png");const d=o/a,u=document.createElement("canvas");return u.width=Math.max(1,Math.round(t.cardWidth*d)),u.height=Math.max(1,Math.round(t.cardHeight*d)),(g=u.getContext("2d"))==null||g.drawImage(i,0,0,u.width,u.height),u.toDataURL("image/png")};(Ai=e.querySelector("#studio-set-baseline"))==null||Ai.addEventListener("click",()=>{(async()=>await Ze("현재 레이아웃을 초기화 기준으로 세팅하고 진행하시겠습니까?")&&(s.onSetBaseline(),Ge("초기화로 세팅하였습니다.")))()}),(Ci=e.querySelector("#studio-save-library"))==null||Ci.addEventListener("click",()=>{(async()=>{if(!await Ze("현재 카드를 그래픽 라이브러리에 추가하고 진행하시겠습니까?"))return;const o=await s.onAddToLibrary(await qn());Ge(o?"그래픽 라이브러리에 추가하였습니다.":"그래픽 라이브러리에 추가하지 못했습니다.")})()}),(qi=e.querySelector("#studio-reset"))==null||qi.addEventListener("click",()=>{_();const i=le(t),o=k;s.onReset(),(!Qi(i,t)||o!==k)&&(V.push(i),wt.push(o),V.length>Ji&&(V.shift(),wt.shift()),Pt=[],re=[]),ft()}),y.addEventListener("focus",()=>L(y)),y.addEventListener("input",()=>{t.title=y.value,W()}),y.addEventListener("blur",()=>_(y)),M.addEventListener("focus",()=>L(M)),M.addEventListener("input",()=>{t.body=M.value,W()}),M.addEventListener("blur",()=>_(M));const ze=(i,o,a,d)=>{i.addEventListener("pointerdown",()=>L(i)),i.addEventListener("change",()=>_(i)),i.addEventListener("input",()=>{const u=K(i.value);u&&(a(u),o.value=u,W())}),o.addEventListener("focus",()=>L(o)),o.addEventListener("input",()=>{const u=K(o.value);u&&(a(u),i.value=u,W())}),o.addEventListener("blur",()=>{K(o.value)||(o.value=d()),_(o)})};ze(ve,jt,i=>{t.color=i},()=>t.color),ze(E,q,i=>{t.titleColor=i},()=>t.titleColor),ze(kt,mt,i=>{t.bodyColor=i},()=>t.bodyColor);const gi=i=>{t.radius=un(Number(i)),hi(),W()};F.addEventListener("pointerdown",()=>L(F)),F.addEventListener("keydown",()=>L(F)),F.addEventListener("pointerup",()=>_(F)),F.addEventListener("pointercancel",()=>_(F)),F.addEventListener("keyup",()=>_(F)),F.addEventListener("input",()=>gi(F.value)),j.addEventListener("focus",()=>L(j)),j.addEventListener("input",()=>gi(j.value)),j.addEventListener("blur",()=>_(j)),j.addEventListener("change",()=>_(j)),N.addEventListener("focus",()=>L(N)),N.addEventListener("input",()=>{t.code=N.value,W()}),N.addEventListener("blur",()=>_(N));const yi=(i,o)=>{Object.assign(t,i),k=o,ft(),W()};$e.addEventListener("click",()=>{_();const i=V.pop(),o=wt.pop();if(!i||o===void 0){ft();return}Pt.push(le(t)),re.push(k),yi(i,o)}),Se.addEventListener("click",()=>{_();const i=Pt.pop(),o=re.pop();if(!i||o===void 0){ft();return}V.push(le(t)),wt.push(k),yi(i,o)}),ft(),(zi=e.querySelector("#studio-tab-design"))==null||zi.addEventListener("click",()=>qe("design")),(Ti=e.querySelector("#studio-tab-code"))==null||Ti.addEventListener("click",()=>qe("code")),(Fi=e.querySelector(".studio__tabs"))==null||Fi.addEventListener("keydown",i=>{var a;if(!(i instanceof KeyboardEvent)||i.key!=="ArrowRight"&&i.key!=="ArrowLeft")return;i.preventDefault();const o=t.panel==="design"?"code":"design";qe(o),(a=e.querySelector(o==="design"?"#studio-tab-design":"#studio-tab-code"))==null||a.focus()});const zt=[...e.querySelectorAll("[data-theme-slug]")];for(const i of zt)i.addEventListener("click",()=>{const o=i.dataset.themeSlug;!o||o===t.themeSlug||(L(i),mi(o,!1),_(i))});(Hi=e.querySelector(".studio__themes"))==null||Hi.addEventListener("keydown",i=>{if(!(i instanceof KeyboardEvent))return;const o=i.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(o))return;i.preventDefault();const a=zt.findIndex(x=>x.dataset.themeSlug===t.themeSlug),u=zt[(a+(o==="ArrowLeft"||o==="ArrowUp"?-1:1)+zt.length)%zt.length],g=u==null?void 0:u.dataset.themeSlug;!g||g===t.themeSlug||(L(u),mi(g,!0),_(u))}),(Pi=e.querySelector("#studio-copy"))==null||Pi.addEventListener("click",async()=>{const i=je();Le.textContent=i;try{await navigator.clipboard.writeText(i)}catch{const a=document.createElement("textarea");a.value=i,document.body.append(a),a.select(),document.execCommand("copy"),a.remove()}const o=e.querySelector("#studio-copy");o&&(o.textContent="복사됨",window.setTimeout(()=>{o.textContent="현재 디자인을 코드로 복사"},1200))}),(Ri=e.querySelector("#studio-download"))==null||Ri.addEventListener("click",()=>{(async()=>{const i=`ax-studio-${t.cardWidth}x${t.cardHeight}-${t.themeSlug||"theme"}.png`;if(!t.code.trim()){on(w,i);return}const o=Ie(),a=o?await Pe(o):"",d=document.createElement("canvas");await sn(d,Ke(Re(t,a)),t.cardWidth,t.cardHeight),on(d,i)})()});const ct=i=>{const o=w.getBoundingClientRect();return{x:o.width>0?(i.clientX-o.left)/o.width*t.cardWidth:0,y:o.height>0?(i.clientY-o.top)/o.height*t.cardHeight:0}},bi=(i,o)=>{for(let d=lt.length-1;d>=0;d-=1){const u=lt[d];if(u&&i>=u.x-8&&o>=u.y-8&&i<=u.x+u.w+8&&o<=u.y+u.h+8)return u}return null},zn=i=>{const o=w.getContext("2d");if(!o)return;const a=w.getBoundingClientRect().width,d=a>0?t.cardWidth/a:1;o.save(),o.lineJoin="round",o.lineCap="round",o.strokeStyle="rgba(0, 0, 0, 0.7)",o.lineWidth=d*3,o.strokeRect(i.x,i.y,Math.max(d,i.w),Math.max(d,i.h)),o.strokeStyle="rgba(255, 255, 255, 0.92)",o.lineWidth=d*1.5,o.strokeRect(i.x,i.y,Math.max(d,i.w),Math.max(d,i.h)),o.restore()},Tn=()=>{if(P)for(const i of lt)P.kinds.includes(i.kind)&&zn(i)};let P=null,X=null,ut=null;const J=new Map;let R=null;const Vt=()=>({x:t.imageX,y:t.imageY,width:t.imageWidth}),Fn=i=>i==="title"?{x:t.titleX,y:t.titleY}:i==="body"?{x:t.bodyX,y:t.bodyY}:{x:t.imageX,y:t.imageY},vi=(i,o,a)=>i==="title"?{x:rt(o,t.cardWidth,t.titleSize),y:rt(a,t.cardHeight,t.titleSize)}:i==="body"?{x:rt(o,t.cardWidth,t.bodySize),y:rt(a,t.cardHeight,t.bodySize)}:{x:ne(o,t.cardWidth,t.imageWidth),y:ne(a,t.cardHeight,ui())},Hn=(i,o)=>{i==="title"?(t.titleX=o.x,t.titleY=o.y):i==="body"?(t.bodyX=o.x,t.bodyY=o.y):(t.imageX=o.x,t.imageY=o.y)},Qt=i=>{t.imageWidth=i.width,t.imageX=ne(i.x,t.cardWidth,t.imageWidth),t.imageY=ne(i.y,t.cardHeight,ui())};H=()=>{lt=nn(w,t,Y,A==null?void 0:A.kind),Tn(),Ct()};const _t=(i,o,a)=>{i.style.left=`${o*G}px`,i.style.top=`${a*G}px`},Pn=()=>{if(!A)return;const i=A.kind==="title",o=i?t.titleSize:t.bodySize,a=o*G,d=Math.max(16,a),u=a/d;_t($,i?t.titleX:t.bodyX,i?t.titleY:t.bodyY),$.style.font=`${i?600:400} ${d}px ${Et(i?t.titleFontId:t.bodyFontId,Lt())}`,$.style.lineHeight=`${Math.round(o*1.25)*G/u}px`,$.style.color=i?t.titleColor:t.bodyColor,$.style.width=`${Math.max(1,t.cardWidth-ti*2)*G/u}px`,$.style.transform=`scale(${u})`,$.style.height="auto",$.style.height=`${$.scrollHeight}px`};Ct=()=>{const i=!A&&!t.code.trim();for(const d of Ln){const u=lt.find(x=>x.kind===d.dataset.frame),g=i&&!!u&&I.has(d.dataset.frame);d.hidden=!g,g&&u&&(_t(d,u.x,u.y),d.style.width=`${u.w*G}px`,d.style.height=`${u.h*G}px`)}const o=lt.find(d=>d.kind==="image"),a=i&&I.size===1&&I.has("image")&&!!o;for(const d of ke)d.hidden=!a;if(a&&o){const d=12/Math.max(G,.001),u=T=>Math.min(t.cardWidth-d,Math.max(d,T)),g=T=>Math.min(t.cardHeight-d,Math.max(d,T)),x=u(o.x+o.w/2),z=g(o.y+o.h/2);for(const T of ke){const D=T.dataset.handle;D==="top"?_t(T,x,g(o.y)):D==="bottom"?_t(T,x,g(o.y+o.h)):D==="left"?_t(T,u(o.x),z):_t(T,u(o.x+o.w),z)}}Pn()};for(const i of ke)i.addEventListener("pointerdown",o=>{const a=lt.find(D=>D.kind==="image");if(!a)return;o.preventDefault();try{i.setPointerCapture(o.pointerId)}catch{}L(i);const d=i.dataset.handle,u=Vt(),g=d==="right"?{x:a.x,y:a.y+a.h/2}:d==="left"?{x:a.x+a.w,y:a.y+a.h/2}:d==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},x=ct(o),z=D=>{if(D.pointerId!==o.pointerId)return;const Ft=ct(D),Ni=Ft.x-x.x,Oi=Ft.y-x.y,On=d==="right"?a.w+Ni:d==="left"?a.w-Ni:d==="bottom"?(a.h+Oi)/yt:(a.h-Oi)/yt;Qt(oe(u,On,g.x,g.y)),H()},T=D=>{D.pointerId===o.pointerId&&(i.removeEventListener("pointermove",z),i.removeEventListener("pointerup",T),i.removeEventListener("pointercancel",T),_(i),W())};i.addEventListener("pointermove",z),i.addEventListener("pointerup",T),i.addEventListener("pointercancel",T)});const Rn=i=>{t.code.trim()||(A={kind:i,original:t[i]},I.clear(),L($),$.value=t[i],$.hidden=!1,H(),$.focus(),$.setSelectionRange($.value.length,$.value.length))},te=i=>{A&&(i||(t[A.kind]=A.original),A=null,$.hidden=!0,H(),_($),W())};$.addEventListener("input",()=>{A&&(t[A.kind]=A.kind==="title"?$.value.replace(/\n/g," "):$.value,H(),pi())}),$.addEventListener("keydown",i=>{i.isComposing||(i.key==="Escape"?(i.preventDefault(),te(!1)):i.key==="Enter"&&((A==null?void 0:A.kind)==="title"||i.metaKey||i.ctrlKey)&&(i.preventDefault(),te(!0)))}),$.addEventListener("blur",()=>te(!0));const Dn=(i,o)=>{if(ut&&ut.kind===i&&o.timeStamp-ut.time<400&&Math.hypot(o.clientX-ut.x,o.clientY-ut.y)<24&&i!=="image"){ut=null,Rn(i);return}ut={kind:i,time:o.timeStamp,x:o.clientX,y:o.clientY}},_i=()=>{const[i,o]=[...J.values()];return!i||!o?null:{distance:Math.hypot(o.x-i.x,o.y-i.y),mid:ct({clientX:(i.x+o.x)/2,clientY:(i.y+o.y)/2})}},Nn=()=>{const i=_i();i&&(P=null,X=null,delete w.dataset.dragging,L(w),R={...i,image:Vt()},H())};w.addEventListener("pointerdown",i=>{if(t.code.trim())return;if(A&&te(!0),i.pointerType==="touch"){J.set(i.pointerId,{x:i.clientX,y:i.clientY});try{w.setPointerCapture(i.pointerId)}catch{}if(J.size===2&&Y){Nn();return}if(J.size>1)return}const o=ct(i),a=bi(o.x,o.y),d=i.pointerType==="mouse";if(d?i.shiftKey?a&&I.has(a.kind)?I.delete(a.kind):a&&I.add(a.kind):a?I.has(a.kind)||(I.clear(),I.add(a.kind)):I.clear():I.clear(),!a||d&&!I.has(a.kind)){X=null,H();return}X={x:i.clientX,y:i.clientY,moved:!1,shift:i.shiftKey};try{w.setPointerCapture(i.pointerId)}catch{}L(w);const u=d?[...I]:[a.kind];P={kind:a.kind,kinds:u,origin:o,start:new Map(u.map(g=>[g,Fn(g)])),pointerId:i.pointerId},w.dataset.dragging="true",H()}),w.addEventListener("pointermove",i=>{if(J.has(i.pointerId)&&J.set(i.pointerId,{x:i.clientX,y:i.clientY}),R){const g=J.has(i.pointerId)?_i():null;if(!g)return;const x=g.distance/Math.max(1,R.distance),z=oe(R.image,R.image.width*x,R.mid.x,R.mid.y);Qt({x:z.x+g.mid.x-R.mid.x,y:z.y+g.mid.y-R.mid.y,width:z.width}),H();return}X&&Math.hypot(i.clientX-X.x,i.clientY-X.y)>6&&(X.moved=!0);const o=ct(i);if(!P||P.pointerId!==i.pointerId){w.dataset.hover=bi(o.x,o.y)?"true":"false";return}const a=(g,x)=>Math.abs(x)<Math.abs(g)?x:g;let d=o.x-P.origin.x,u=o.y-P.origin.y;for(const[g,x]of P.start){const z=vi(g,x.x+d,x.y+u);d=a(d,z.x-x.x),u=a(u,z.y-x.y)}for(const[g,x]of P.start)Hn(g,vi(g,x.x+d,x.y+u));H()});const xi=i=>{if(J.delete(i.pointerId),R){J.size<2&&(R=null,_(w),W());return}if(!P||P.pointerId!==i.pointerId)return;const o=P.kind;P=null,delete w.dataset.dragging,_(w),i.type==="pointerup"&&X&&!X.moved&&!X.shift&&(I.size>1&&(I.clear(),I.add(o)),Dn(o,i)),X=null,H()};w.addEventListener("pointerup",xi),w.addEventListener("pointercancel",xi);const wi=new EventTarget;let $i=0;w.addEventListener("wheel",i=>{if(!i.ctrlKey||t.code.trim()||!Y)return;i.preventDefault(),L(wi);const o=ct(i);Qt(oe(Vt(),t.imageWidth*Math.exp(-i.deltaY*.01),o.x,o.y)),H(),window.clearTimeout($i),$i=window.setTimeout(()=>{_(wi),W()},250)},{passive:!1});const Si=new EventTarget;let Tt=null;w.addEventListener("gesturestart",i=>{i.preventDefault(),!(R||t.code.trim()||!Y)&&(L(Si),Tt={image:Vt(),anchor:ct(i)})}),w.addEventListener("gesturechange",i=>{if(i.preventDefault(),!Tt||R)return;const{image:o,anchor:a}=Tt;Qt(oe(o,o.width*i.scale,a.x,a.y)),H()}),w.addEventListener("gestureend",i=>{i.preventDefault(),Tt&&(Tt=null,_(Si),W())}),At.addEventListener("pointerdown",i=>{i.target===w||I.size===0||i.target instanceof Element&&i.target.closest(".studio__handle")||(I.clear(),Ct())});const ee=i=>{const o=Gt.getBoundingClientRect().width,a=$t+Ye+Xe,d=Number.isFinite(i)?i:t.controlsWidth;t.controlsWidth=o>=a?to(d,o):Math.max($t,Math.round(d)),Gt.style.setProperty("--studio-controls-width",`${t.controlsWidth}px`),O.setAttribute("aria-valuenow",String(t.controlsWidth)),O.setAttribute("aria-valuemax",String(o>=a?Math.max($t,Math.round(o)-Ye-Xe):t.controlsWidth)),pt()};ee(t.controlsWidth);const it=e.querySelector("#studio-device"),Ei=[...e.querySelectorAll(".studio-devices__btn")],Mi=e.querySelector("#studio-device-thumb"),Li=it==null?void 0:it.parentElement,Te=it&&Mi&&Li?rn(it,Mi,Li):null,ie=()=>{if(!it)return;const i=wn();it.dataset.device=i,it.dataset.framed=i===si()?"false":"true";for(const o of Ei)o.setAttribute("aria-pressed",o.dataset.device===i?"true":"false");ee(t.controlsWidth),Te==null||Te()};ie();for(const i of Ei)i.addEventListener("click",()=>{he=i.dataset.device,ie()});ae==null||ae();const ki=[window.matchMedia(_n),window.matchMedia(xn)];for(const i of ki)i.addEventListener("change",ie);ae=()=>{for(const i of ki)i.removeEventListener("change",ie)},de==null||de();const Ii=i=>{if(!(i.metaKey||i.ctrlKey)||i.altKey)return;const o=i.code==="KeyZ"&&i.shiftKey||i.code==="KeyY"&&i.ctrlKey&&!i.shiftKey;if(!(i.code==="KeyZ"&&!i.shiftKey)&&!o)return;const d=o?Se:$e;if(!d.isConnected||d.disabled)return;const u=i.target;u instanceof HTMLElement&&(u.isContentEditable||u.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"))||(i.preventDefault(),d.click())};document.addEventListener("keydown",Ii),de=()=>document.removeEventListener("keydown",Ii),O.addEventListener("pointerdown",i=>{if(Gt.getBoundingClientRect().width<768)return;try{O.setPointerCapture(i.pointerId)}catch{}const o=i.clientX,a=t.controlsWidth,d=g=>{g.pointerId===i.pointerId&&ee(a+g.clientX-o)},u=g=>{g.pointerId===i.pointerId&&(O.removeEventListener("pointermove",d),O.removeEventListener("pointerup",u),O.removeEventListener("pointercancel",u))};O.addEventListener("pointermove",d),O.addEventListener("pointerup",u),O.addEventListener("pointercancel",u)}),O.addEventListener("keydown",i=>{if(i.key!=="ArrowLeft"&&i.key!=="ArrowRight")return;i.preventDefault();const o=i.shiftKey?48:16;ee(t.controlsWidth+(i.key==="ArrowRight"?o:-o))}),(Di=e.querySelector("#studio-controls"))==null||Di.addEventListener("submit",i=>{i.preventDefault()}),Dt==null||Dt.disconnect(),Dt=new ResizeObserver(()=>pt()),Dt.observe(At),W()}const Sn="ax-design-studio-mode",an="./data/index.json";let B={status:"loading"},ye=ge(),En="all",S=null,ce=null,me=null,C=Je();function Qe(){const e=localStorage.getItem(Sn);return e==="light"||e==="dark"?e:"dark"}function dn(e){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=e,localStorage.setItem(Sn,e)}function De(e,t,n){return`<a class="nav-link${n?" nav-link--current":""}" href="${t}" ${n?'aria-current="page"':""}>${e}</a>`}function Zo(){return`
    <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
      <path d="M19.4 13.1a7.7 7.7 0 0 0 .05-2.2l1.8-1.4-2-3.4-2.2.7a8 8 0 0 0-1.9-1.1L14.6 3h-5.2l-.55 2.7a8 8 0 0 0-1.9 1.1l-2.2-.7-2 3.4 1.8 1.4a7.7 7.7 0 0 0 .05 2.2l-1.8 1.4 2 3.4 2.2-.7a8 8 0 0 0 1.9 1.1l.55 2.7h5.2l.55-2.7a8 8 0 0 0 1.9-1.1l2.2.7 2-3.4-1.8-1.4Z" />
    </svg>
  `}function Go(e){return e==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function ri(){const e=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),t=ni(e);return t?Xt(t.r,t.g,t.b):K(e)??Xt(216,241,255)}function Nt(e,t){return t.some(n=>n.slug===e)?e:null}function Jo(e,t,n){var r,l,c;const s=e?Nt(e,n):null;if(t&&t!==me){const m=fn().find(h=>h.id===t);if(m)return S=structuredClone(m.state),Nt(S.themeSlug,n)||(S.themeSlug=((r=n[0])==null?void 0:r.slug)??""),me=t,ce=e,S}if(t||(me=null),!S){const m=pn();return S=m?structuredClone(m):ii(s??Nt(cn,n)??((l=n[0])==null?void 0:l.slug)??"",ri()),m&&s&&(S.themeSlug=s),m&&!Nt(S.themeSlug,n)&&(S.themeSlug=s??((c=n[0])==null?void 0:c.slug)??""),ce=e,S}return e&&e!==ce&&s&&(S.themeSlug=s,ce=e),S}function Vo(e){const t=Qe(),n=t==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=C.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${De("Graphic Library",tt({name:"archive"}),C.name==="archive"||C.name==="capture")}
        ${De("Online Marketing Studio",tt({name:"studio",theme:null,card:null}),C.name==="studio")}
        ${De("History",tt({name:"history"}),C.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${n}" title="${n}">
          ${Go(t)}
        </button>
        <div class="nav-settings">
          <button type="button" class="button button--secondary" id="nav-settings" aria-label="설정" aria-haspopup="menu" aria-expanded="false" aria-controls="nav-settings-menu">
            ${Zo()}
          </button>
          <div class="nav-popover" id="nav-settings-menu" role="menu" hidden>
            <button type="button" class="nav-popover__item" id="nav-reset" role="menuitem">리셋</button>
          </div>
        </div>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${e}</main>
  `}function Qo(){if(B.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(B.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${B.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
        <p class="state-panel__text"><button type="button" class="button" id="index-retry">다시 불러오기</button></p>
      </section>
    `;const e=B.index;switch(C.name){case"archive":return Eo(e,ye,En,fn());case"capture":return Po(e,C.slug,ye);case"studio":return jo(Jo(C.theme,C.card,e.captures),e.captures);case"history":return Do(e);case"notfound":return No(C.path)}}function Q(){var t,n;const e=document.querySelector("#app");if(!e)throw new Error("#app not found");dn(Qe()),ye=ge(),e.innerHTML=Vo(Qo()),(t=e.querySelector("#index-retry"))==null||t.addEventListener("click",()=>{Mn()}),(n=e.querySelector("#mode-toggle"))==null||n.addEventListener("click",()=>{dn(Qe()==="dark"?"light":"dark"),Q()}),ts(e),B.status==="ready"&&(C.name==="archive"&&Mo(e,{onTabChange:s=>{var r;En=s,Q(),(r=document.querySelector(`[data-archive-tab="${s}"]`))==null||r.focus()}}),C.name==="capture"&&Ro(e,s=>{ye=co(s),Q()}),C.name==="studio"&&B.status==="ready"&&S&&Ko(e,S,B.index.captures,{onReset:()=>{var s;S&&(no(S,pn(),ri()),Q(),(s=document.querySelector("#studio-reset"))==null||s.focus())},onSetBaseline:()=>{S&&ho(structuredClone(S))},onAddToLibrary:s=>S?yo(S,s).then(r=>r!==null):Promise.resolve(!1)}))}function ts(e){var m;const t=e.querySelector("#nav-settings"),n=e.querySelector("#nav-settings-menu"),s=e.querySelector(".nav-settings");if(!t||!n||!s)return;const r=()=>{n.hidden=!0,t.setAttribute("aria-expanded","false"),document.removeEventListener("click",l),document.removeEventListener("keydown",c)},l=h=>{h.target instanceof Node&&s.contains(h.target)||r()},c=h=>{h.key==="Escape"&&r()};t.addEventListener("click",h=>{if(h.stopPropagation(),!n.hidden){r();return}n.hidden=!1,t.setAttribute("aria-expanded","true"),document.addEventListener("click",l),document.addEventListener("keydown",c)}),(m=e.querySelector("#nav-reset"))==null||m.addEventListener("click",()=>{r(),(async()=>{if(await Ze("세팅한 초기화 기준을 지우고 진행하시겠습니까?")){if(mo(),me=null,S){const f=B.status==="ready"?B.index.captures:[],b=Nt(cn,f)??S.themeSlug;S=ii(b,ri())}C.name==="studio"&&C.card&&(C={name:"studio",theme:null,card:null},history.replaceState(null,"",tt(C))),Q(),Ge("리셋하였습니다.")}})()})}async function es(){const e=await fetch(`${an}?t=${Date.now()}`,{cache:"no-store"});if(!e.ok)throw new Error(`${an} → HTTP ${e.status}`);const t=await e.text();if(t.trimStart().startsWith("<"))throw new Error("index.json 대신 HTML이 왔습니다. 데이터 빌드가 끝나는 중일 수 있습니다.");const n=JSON.parse(t);if(!n||!Array.isArray(n.captures)||!n.facets)throw new Error("Index JSON is missing captures or facets");return n}async function Mn(){B={status:"loading"},Q();let e;for(let t=0;t<20;t+=1)try{const n=await es();await go(),B={status:"ready",index:n},Q();return}catch(n){e=n,await new Promise(s=>window.setTimeout(s,400))}B={status:"error",message:e instanceof Error?e.message:String(e)},Q()}bo(e=>{if(vn(window.location.hash)){window.location.replace(tt({name:"studio",theme:null,card:null}));return}C=e,Q()});Mn();
