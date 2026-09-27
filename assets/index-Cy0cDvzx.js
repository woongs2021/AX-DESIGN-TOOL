(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}})();const ki="ig-feed-square",ne=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function vt(t){return ne.find(e=>e.id===t)??ne[0]}const yt=0,Ct=120,Wi=28,B=100,K=4e3,se=5,ai=10,At=100,re=4e3,rt=240,di=360,ae=280,de=6,zi="시즌",Ci=`새로운 컬렉션
브랜드의 첫 인상을 한 장으로 전합니다.`,qt=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Ue="rgb(0, 0, 0)",Xe="rgb(255, 255, 255)";function li(t){return Number.isFinite(t)?Math.min(Ct,Math.max(yt,Math.round(t))):yt}function U(t){return Number.isFinite(t)?Math.min(K,Math.max(B,Math.round(t))):B}function Ai(t,e,i){const n=Math.max(1,Math.round(t)),a=Math.max(1,Math.round(e))/n;let d=U(i);const f=Math.round(d*a);let h=U(f);return f!==h&&(d=U(Math.round(h/a)),h=U(Math.round(d*a))),{cardWidth:d,cardHeight:h}}function pe(t){return Math.max(se,U(t)-ai*2)}function X(t,e){const i=pe(e);return Number.isFinite(t)?Math.min(i,Math.max(se,Math.round(t))):se}function me(t){return Number.isFinite(t)?Math.min(re,Math.max(At,Math.round(t))):At}function Y(t,e,i){const n=Math.max(0,Math.round(e)-Math.min(Math.max(i,0),Math.round(e)));return Number.isFinite(t)?Math.min(n,Math.max(0,Math.round(t))):0}function Ye(t,e,i){const n=Math.round(-i+40),r=Math.round(e-40);return Number.isFinite(t)?n>r?Math.round((e-i)/2):Math.min(r,Math.max(n,Math.round(t))):0}function qi(t,e){const i=Math.max(rt,Math.round(e)-ae-de);return Number.isFinite(t)?Math.min(i,Math.max(rt,Math.round(t))):di}function Fi(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function _t(t,e=[]){var n;const i=qt.find(r=>r.id===t);return i?i.stack:((n=e.find(r=>r.id===t))==null?void 0:n.stack)??qt[0].stack}function ci(t,e){const i=vt(ki),n=X(Math.round(i.width*.046),i.width),r=X(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:zi,body:Ci,themeSlug:t,color:e,radius:Wi,code:"",panel:"design",controlsWidth:di,titleSize:n,bodySize:r,titleX:Y(Math.round(i.width*.06),i.width,n),titleY:Y(a,i.height,n),bodyX:Y(Math.round(i.width*.06),i.width,r),bodyY:Y(a+Math.round(n*1.6),i.height,r),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:$t(e),bodyColor:$t(e),imageWidth:me(i.width),imageX:0,imageY:0}}function Hi(t,e){const i=ci(t.themeSlug,e);i.controlsWidth=t.controlsWidth,i.panel=t.panel,Object.assign(t,i)}function F(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function Ft(t,e,i){const n=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${n(t)}${n(e)}${n(i)}`}function fe(t){const e=F(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const i=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function nt(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function je(t,e){const i=.2126*nt(t.r)+.7152*nt(t.g)+.0722*nt(t.b),n=.2126*nt(e.r)+.7152*nt(e.g)+.0722*nt(e.b),r=Math.max(i,n),a=Math.min(i,n);return(r+.05)/(a+.05)}function $t(t){const e=fe(ui(t));return e?Ft(e.r,e.g,e.b):Ft(0,0,0)}function ui(t){const e=fe(t)??{r:255,g:255,b:255},i=je({r:0,g:0,b:0},e),n=je({r:255,g:255,b:255},e);return i>=4.5&&i>=n?Ue:n>=4.5?Xe:i>=n?Ue:Xe}function Ti(t,e,i){if(e<=0)return[];const n=[];for(const r of t.split(`
`)){const a=r.split(/\s+/).filter(Boolean);if(a.length===0){n.push("");continue}let d="";const f=h=>{if(i(h)<=e){d=h;return}let p="";for(const b of h){const g=p+b;i(g)<=e?p=g:(p&&n.push(p),p=b)}d=p};for(const h of a){const p=d?`${d} ${h}`:h;i(p)<=e?d=p:(d&&n.push(d),f(h))}d&&n.push(d)}return n}function Qt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ri(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Ni(t,e){return Ri(t).replaceAll("{{title}}",Qt(e.title)).replaceAll("{{body}}",Qt(e.body)).replaceAll("{{themeImage}}",Qt(e.themeImage))}function le(){return`<article class="studio-card">
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
</style>`}function hi(t){const e=F(t.color)??t.color,i=ui(e),n=F(t.titleColor)??$t(e),r=F(t.bodyColor)??$t(e),a=li(t.radius),d=vt("ig-feed-square"),f=t.width>0?t.width:d.width,h=t.height>0?t.height:d.height,p=t.titleFontStack.replaceAll(";",""),b=t.bodyFontStack.replaceAll(";",""),g=Ni(t.code.trim()||le(),t),x=[`--studio-color:${e}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${f}px`,`--studio-height:${h}px`,`--studio-title-font:${p}`,`--studio-body-font:${b}`,`--studio-title-size:${X(t.titleSize,f)}px`,`--studio-body-size:${X(t.bodySize,f)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${me(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${n}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${h}px;margin:0;background:transparent;${x}">${g}</div>`}function Pi(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${hi(t)}</body>
</html>`}const pi="design-llm-wiki-pins";function Ht(){try{const t=localStorage.getItem(pi);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(i=>typeof i=="string"):[]}catch{return[]}}function Oi(t){const e=[...new Set(t)];localStorage.setItem(pi,JSON.stringify(e))}function Di(t){const e=Ht(),i=e.includes(t)?e.filter(n=>n!==t):[...e,t];return Oi(i),Ht()}const mi="[a-z0-9]+(?:-[a-z0-9]+)*";function fi(t){const e=t.startsWith("#")?t.slice(1):t,i=e.indexOf("?"),n=i>=0?e.slice(0,i):e,r=i>=0?e.slice(i+1):"",a=n.startsWith("/")?n:`/${n}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:r}}function Bi(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${mi}$`).test(e)?null:e}function gi(t){const{path:e}=fi(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function ce(t=window.location.hash){const{path:e,query:i}=fi(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||gi(t))return{name:"studio",theme:e==="/studio"?Bi(i):null};const n=e.match(new RegExp(`^/capture/(${mi})$`));return n?{name:"capture",slug:n[1]}:{name:"notfound",path:e}}function J(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function Ui(t){const e=()=>t(ce());return window.addEventListener("hashchange",e),t(ce()),()=>window.removeEventListener("hashchange",e)}function Xi(t){return[...t].sort((e,i)=>e.capturedAt!==i.capturedAt?e.capturedAt<i.capturedAt?1:-1:e.slug.localeCompare(i.slug))}function u(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function at(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let kt=null;function Yi(t){const e=t.querySelector(".archive-tabs__indicator"),i=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!i)return;const n=i.offsetLeft,r=i.offsetWidth;kt&&(e.style.transition="none",e.style.transform=`translateX(${kt.left}px)`,e.style.width=`${kt.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${n}px)`,e.style.width=`${r}px`,kt={left:n,width:r}})}function te(t){const e=t.querySelector(".capture-grid");if(!e)return;const i=window.getComputedStyle(e),n=Number.parseFloat(i.gridAutoRows)||1,r=Number.parseFloat(i.rowGap)||0;e.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,h=Math.ceil((d+f+r)/(n+r));a.style.gridRowEnd=`span ${Math.max(1,h)}`})}function ji(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${u(at(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function Gi(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${J({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${ji(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${u(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${u(t.title)}</h2>
          <p class="capture-card__insight">${u(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Ki(t,e){const i=new Set(e),n=Xi(t),r=n.filter(p=>i.has(p.slug)),a=n.filter(p=>!i.has(p.slug)),d=new Map(n.map(p=>[p.slug,p])),f=e.map(p=>d.get(p)).filter(p=>!!p),h=r.filter(p=>!e.includes(p.slug));return[...f,...h,...a]}function Zi(t,e,i){const n=new Set(e),r=i==="pin"?t.captures.filter(d=>n.has(d.slug)):t.captures,a=Ki(r,e);return t.captures.length===0?`
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
          <p class="gallery__meta">Target ${u(t.target)} · ${a.length} · ${e.length} pinned</p>
        </div>
      </header>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${i==="all"?"true":"false"}">
          All <span class="archive-tab__count">${t.captures.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${i==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${e.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${a.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${i==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${i==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${a.map(d=>Gi(d,e.includes(d.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Ji(t,e){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.archiveTab;(a==="all"||a==="pin")&&e.onTabChange(a)})}),Yi(t),requestAnimationFrame(()=>te(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>te(t),{once:!0})});const i=new ResizeObserver(()=>te(t)),n=t.querySelector(".capture-grid");n&&i.observe(n)}function Vi(t){const e=t.replace(/\r\n/g,`
`).split(`
`),i=[];let n=!1;const r=()=>{n&&(i.push("</ul>"),n=!1)};for(const a of e){const d=a.trim();if(!d){r();continue}if(d.startsWith("### ")){r(),i.push(`<h3>${mt(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){r(),i.push(`<h2>${mt(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){r(),i.push(`<h1>${mt(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){n||(i.push("<ul>"),n=!0),i.push(`<li>${mt(d.slice(2))}</li>`);continue}r(),i.push(`<p>${mt(d)}</p>`)}return r(),i.join(`
`)}function mt(t){let e=u(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,n)=>`<a href="${J({name:"capture",slug:n})}">${n}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,n,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${n}</span>`:`<a href="${u(r)}">${n}</a>`),e}const Qi=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function to(t){return Math.max(35,Math.min(98,Math.round(t)))}function eo(t){let e=0;for(const i of t)e=(e*31+i.charCodeAt(0))%997;return e}function io(t){var p;if((p=t.analysisScores)!=null&&p.length)return t.analysisScores;const e=eo(`${t.slug}:${t.title}:${t.insight}`),i=t.tags.includes("density")?7:0,n=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),a=t.asset.width/Math.max(1,t.asset.height),d=a>1.2?6:0,f=a<.75?5:0,h=[68+r+d+e%9,66+i+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+n+(t.uiPatterns.includes("filter-chips")?7:0),62+f+r+(e>>3)%8].map(to);return Qi.map(([b,g],x)=>({key:b,label:g,score:h[x]??60,description:no(g,h[x]??60,t)}))}function oo(t){return t.length===0?0:Math.round(t.reduce((e,i)=>e+i.score,0)/t.length)}function no(t,e,i){return t==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function so(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function ro(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${u(at(t.asset.posterPath))}"`:""}>
        <source src="${u(at(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${u(at(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function ao(t){const e=io(t),i=t.analysisTotal??oo(e),n=160,r=110,a=[.25,.5,.75,1].map(h=>e.map((p,b)=>{const g=-Math.PI/2+b*Math.PI*2/e.length,x=n+Math.cos(g)*r*h,y=n+Math.sin(g)*r*h;return`${x.toFixed(1)},${y.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),d=e.map((h,p)=>{const b=-Math.PI/2+p*Math.PI*2/e.length,g=r*(h.score/100),x=n+Math.cos(b)*g,y=n+Math.sin(b)*g;return`${x.toFixed(1)},${y.toFixed(1)}`}).join(" "),f=e.map((h,p)=>{const b=-Math.PI/2+p*Math.PI*2/e.length,g=n+Math.cos(b)*r,x=n+Math.sin(b)*r,y=n+Math.cos(b)*r*(h.score/100),w=n+Math.sin(b)*r*(h.score/100),H=n+Math.cos(b)*(r+26),L=n+Math.sin(b)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${n}" y1="${n}" x2="${g.toFixed(1)}" y2="${x.toFixed(1)}" />
          <circle class="spider-point" cx="${y.toFixed(1)}" cy="${w.toFixed(1)}" r="6" />
          <text class="spider-label" x="${H.toFixed(1)}" y="${L.toFixed(1)}">${u(h.label)}</text>
          <text class="spider-callout" x="${H.toFixed(1)}" y="${(L+18).toFixed(1)}">${h.score}</text>
        </g>
      `}).join("");return`
    <section class="detail__section analysis-score">
      <div class="analysis-score__summary">
        <p class="detail__eyebrow">Image analysis score</p>
        <h2>총합 점수 ${i}</h2>
        <p class="detail__empty">항목 위에 마우스를 올리거나 키보드 포커스를 주면 해당 점수가 강조됩니다.</p>
      </div>
      <div class="spider-layout">
        <svg class="spider-chart" viewBox="0 0 320 320" role="img" aria-label="이미지 분석 스파이더 다이어그램">
          ${a}
          <polygon class="spider-area" points="${d}" />
          ${f}
        </svg>
        <dl class="score-list">
          ${e.map(h=>`
            <div class="score-list__item">
              <dt>${u(h.label)} <strong>${h.score}</strong></dt>
              <dd>${u(h.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function lo(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${u(i)}</span>`).join("")}function co(t,e,i){const n=t.captures.find(a=>a.slug===e);if(!n)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${u(e)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=i.includes(e);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${u(n.service)} · ${u(n.platform)}</p>
          <h1 class="detail__title">${u(n.title)}</h1>
          <p class="detail__insight">${u(n.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${u(J({name:"studio",theme:e}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${u(e)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${ro(n)}</div>

      ${ao(n)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${u(n.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${u(n.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${n.asset.width} × ${n.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${so(n.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${n.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${n.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${u(n.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${lo(n)}
        </p>
        <p class="detail__meta-line">
          ${u(n.screenType)} · ${u(n.tone)} · ${u(n.copyTone)} · ${u(n.capturedAt)}
          ${n.sourceUrl?` · <a href="${u(n.sourceUrl)}">${u(n.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Vi(n.body)}
      </section>
    </article>
  `}function uo(t,e){var i;(i=t.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",n=>{const r=n.currentTarget.dataset.pinSlug;r&&e(r)})}function ho(t){const e=t.wiki.logEntries;return e.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${e.length} entries · target ${u(t.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${e.map(i=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${u(i.date)}">${u(i.date)}</time>
            <span class="history-item__op">${u(i.operation)}</span>
            <strong class="history-item__title">${u(i.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function po(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${u(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Ge=.5,Ke=3,Ze=.25,Je=40;let _=1,P=[],ft=[],st=[],Wt=[],gt=null,Ve=1;function zt(t){return{...t}}function Qe(t,e){return JSON.stringify(t)===JSON.stringify(e)}const ue=new Map,ti=new Map;function bi(t){const e=ue.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((i,n)=>{const r=e??new Image;r.onload=()=>i(r),r.onerror=()=>n(new Error(`Image failed: ${t}`)),e||(ue.set(t,r),r.src=t)})}function ei(t){const e=ti.get(t);if(e)return e;const i=fetch(t).then(n=>{if(!n.ok)throw new Error(`Theme image HTTP ${n.status}`);return n.blob()}).then(n=>new Promise((r,a)=>{const d=new FileReader;d.onload=()=>r(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(n)}));return ti.set(t,i),i}const mo=Object.assign({}),ii=new Set;function fo(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function xt(){const t=new Set(qt.map(i=>i.label.toLowerCase())),e=[];for(const[i,n]of Object.entries(mo)){const r=Fi(i);if(!r||t.has(r.toLowerCase()))continue;const a=`local:${r}`;if(!e.some(d=>d.id===a)){if(!ii.has(r)){ii.add(r);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${n}") format("${fo(n)}");font-display:swap;}`,document.head.append(d)}e.push({id:a,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return e}function go(){return[...qt,...xt()]}function bo(t,e,i,n){const r=Math.max(0,Math.min(n,e/2,i/2));t.beginPath(),t.roundRect(0,0,e,i,r)}function oi(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:_t(t.titleFontId,xt()),bodyFontStack:_t(t.bodyFontId,xt()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function ee(t,e,i){const n=t.getContext("2d");if(!n)return[];const r=e.cardWidth,a=e.cardHeight;t.width=r,t.height=a,n.clearRect(0,0,r,a),n.save(),bo(n,r,a,e.radius),n.clip(),n.fillStyle=e.color,n.fillRect(0,0,r,a);const d=[];if(i&&i.naturalWidth>0){const b=e.imageWidth,g=b*(i.naturalHeight/i.naturalWidth);n.drawImage(i,e.imageX,e.imageY,b,g),d.push({kind:"image",x:e.imageX,y:e.imageY,w:b,h:g})}const f=Math.max(1,r-ai*2);n.textBaseline="top";const h=(b,g,x,y,w,H,L,dt)=>{if(!g.trim())return;n.fillStyle=dt,n.font=`${H} ${w}px ${L}`;const j=Ti(g.trim(),f,T=>n.measureText(T).width),G=Math.round(w*1.25);let D=0;j.forEach((T,V)=>{n.fillText(T,x,y+V*G),D=Math.max(D,n.measureText(T).width)}),d.push({kind:b,x,y,w:Math.max(D,w),h:Math.max(j.length,1)*G})},p=xt();return h("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,_t(e.bodyFontId,p),e.bodyColor),h("title",e.title,e.titleX,e.titleY,e.titleSize,600,_t(e.titleFontId,p),e.titleColor),n.restore(),d}function ni(t,e){t.toBlob(i=>{if(!i)return;const n=URL.createObjectURL(i),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)},"image/png")}async function yo(t,e,i,n){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${n}"><foreignObject x="0" y="0" width="${i}" height="${n}">${e}</foreignObject></svg>`,a=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const f=await bi(d),h=t.getContext("2d");if(!h)return;t.width=i,t.height=n,h.clearRect(0,0,i,n),h.drawImage(f,0,0,i,n)}finally{URL.revokeObjectURL(d),ue.delete(d)}}let bt=null;function vo(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=$t(t.color);t.titleColor=F(String(t.titleColor??""))??i,t.bodyColor=F(String(t.bodyColor??""))??i;const n=t.fontId;t.titleFontId||(t.titleFontId=n||"pretendard"),t.bodyFontId||(t.bodyFontId=n||"pretendard");const r=vt(t.presetId),a=ne.map(y=>`<option value="${u(y.id)}"${y.id===r.id?" selected":""}>${u(y.name)} · ${y.width}×${y.height}</option>`).join(""),d=e.map(y=>{const w=y.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${u(y.slug)}"
          aria-checked="${w?"true":"false"}"
          tabindex="${w?"0":"-1"}"
        >
          <img src="${u(at(y.asset.path))}" alt="${u(y.title)}" />
        </button>
      `}).join(""),f=t.panel==="design",h=go(),p=pe(t.cardWidth),b=y=>h.map(w=>`<option value="${u(w.id)}"${w.id===y?" selected":""}>${u(w.label)}</option>`).join("");return`
    <section class="studio" style="--studio-controls-width:${t.controlsWidth}px">
      <div class="studio__controls-wrap">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${f?"true":"false"}" tabindex="${f?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${f?"false":"true"}" tabindex="${f?"-1":"0"}">Code</button>
        </div>

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${f?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${a}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${B}" max="${K}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${B}" max="${K}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${B}" max="${K}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${B}" max="${K}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${B}" max="${K}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${B}" max="${K}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${u(t.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${u(t.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${u(t.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${p}" step="1" value="${t.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${p}" step="1" value="${t.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${b(t.titleFontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${u(t.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${u(t.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${u(t.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${p}" step="1" value="${t.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${p}" step="1" value="${t.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${b(t.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${d}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${At}" max="${re}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${At}" max="${re}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${u(t.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${u(t.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${yt}" max="${Ct}" step="1" value="${t.radius}" aria-valuemin="${yt}" aria-valuemax="${Ct}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${yt}" max="${Ct}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${f?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${u(t.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>
      <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${rt}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__stage" id="studio-stage">
          <div class="studio__stage-frame">
            <div class="studio__fit" id="studio-fit">
              <div class="studio__scaler" id="studio-scaler">
                <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
                <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
                <div class="studio__safe" id="studio-safe" hidden></div>
              </div>
            </div>
          </div>
        </div>
        <div class="studio__bar">
          <p class="studio__meta" id="studio-meta" aria-live="polite"></p>
          <div class="studio__bar-actions">
            <div class="studio__history" role="group" aria-label="편집 기록">
              <button type="button" class="studio__zoom-btn" id="studio-undo" aria-label="이전 동작" disabled><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg></button>
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg></button>
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
  `}function _o(t,e,i,n){var Ae,qe,Fe,He,Te,Re,Ne,Pe,Oe;if(i.length===0)return;const r=t.querySelector("#studio-preset"),a=t.querySelector("#studio-size"),d=t.querySelector("#studio-size-number"),f=t.querySelector("#studio-width"),h=t.querySelector("#studio-width-number"),p=t.querySelector("#studio-height"),b=t.querySelector("#studio-height-number"),g=t.querySelector("#studio-title"),x=t.querySelector("#studio-title-color"),y=t.querySelector("#studio-title-hex"),w=t.querySelector("#studio-title-size"),H=t.querySelector("#studio-title-size-number"),L=t.querySelector("#studio-body"),dt=t.querySelector("#studio-body-color"),j=t.querySelector("#studio-body-hex"),G=t.querySelector("#studio-body-size"),D=t.querySelector("#studio-body-size-number"),T=t.querySelector("#studio-title-font"),V=t.querySelector("#studio-body-font"),Rt=t.querySelector("#studio-image-width"),Nt=t.querySelector("#studio-image-width-number"),Pt=t.querySelector("#studio-color"),wt=t.querySelector("#studio-hex"),E=t.querySelector("#studio-radius"),A=t.querySelector("#studio-radius-number"),R=t.querySelector("#studio-code"),$=t.querySelector("#studio-canvas"),St=t.querySelector("#studio-iframe"),ge=t.querySelector("#studio-meta"),lt=t.querySelector("#studio-safe"),Mt=t.querySelector("#studio-scaler"),Ot=t.querySelector("#studio-fit"),Et=t.querySelector("#studio-stage"),Dt=t.querySelector("#studio-zoom-out"),Bt=t.querySelector("#studio-zoom-in"),be=t.querySelector("#studio-zoom-label"),ye=t.querySelector("#studio-undo"),ve=t.querySelector("#studio-redo"),ct=t.querySelector("#studio-scroll-thumb"),Ut=t.querySelector(".studio__controls-wrap"),Xt=t.querySelector("#studio-export"),z=t.querySelector("#studio-splitter"),Yt=t.querySelector(".studio");if(!r||!a||!d||!f||!h||!p||!b||!g||!x||!y||!w||!H||!L||!dt||!j||!G||!D||!T||!V||!Rt||!Nt||!Pt||!wt||!E||!A||!R||!$||!St||!ge||!lt||!Mt||!Ot||!Et||!Dt||!Bt||!be||!ye||!ve||!ct||!Ut||!Xt||!z||!Yt)return;const _e=()=>{const o=i.find(s=>s.slug===e.themeSlug)??i[0];return o?at(o.asset.path):""};let Lt=0;const $i=()=>{(!Number.isFinite(_)||_<=0)&&(_=1),Dt.disabled=_<=Ge+.001,Bt.disabled=_>=Ke-.001,be.textContent=`${Math.round(_*100)}%`},jt=(o,s)=>{const l=Et.getBoundingClientRect(),c=20,m=Math.min(Math.max(l.width-c,1)/o,Math.max(l.height-c,1)/s);return Number.isFinite(m)&&m>0?m:1},Q=()=>{const o=jt(e.cardWidth,e.cardHeight);$i();const s=o*_;Ot.style.width=`${e.cardWidth*s}px`,Ot.style.height=`${e.cardHeight*s}px`,Mt.style.width=`${e.cardWidth}px`,Mt.style.height=`${e.cardHeight}px`,Mt.style.transform=`scale(${s})`};Dt.addEventListener("click",()=>{_=Math.max(Ge,_-Ze),Q()}),Bt.addEventListener("click",()=>{_=Math.min(Ke,_+Ze),Q()}),(Ae=t.querySelector("#studio-zoom-fit"))==null||Ae.addEventListener("click",()=>{_=1,Q(),Et.scrollTo(0,0)});const C=t.querySelector("#studio-controls");let $e=0;const xe=()=>{if(!C)return;const o=C.scrollHeight-C.clientHeight;if(o<=1){ct.hidden=!0;return}ct.hidden=!1;const s=Math.max(32,C.clientHeight/C.scrollHeight*C.clientHeight),l=Math.max(0,C.clientHeight-s);ct.style.height=`${s}px`,ct.style.transform=`translateY(${C.scrollTop/o*l}px)`};C==null||C.addEventListener("scroll",()=>{xe(),Ut.classList.add("is-scrolling"),window.clearTimeout($e),$e=window.setTimeout(()=>Ut.classList.remove("is-scrolling"),700)}),xe();const tt=()=>{const o=document.querySelector("#studio-undo"),s=document.querySelector("#studio-redo");o&&(o.disabled=P.length===0),s&&(s.disabled=ft.length===0)};let ut=null;const v=o=>{if(o&&ut!==o)return;if(!gt){ut=null;return}const s=gt,l=Ve;gt=null,ut=null,!(Qe(s,e)&&l===_)&&(P.push(s),st.push(l),P.length>Je&&(P.shift(),st.shift()),ft=[],Wt=[],tt())},S=o=>{o&&ut===o&&gt||(v(),gt=zt(e),Ve=_,ut=o??null)},xi=o=>{const s=Number(o.min),l=Number(o.max),c=Number(o.value),m=l>s?(c-s)/(l-s)*100:0;o.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,m))}%`)};let we=e.cardHeight/Math.max(1,e.cardWidth);const Gt=()=>{we=e.cardHeight/Math.max(1,e.cardWidth)};let N=null,It=1,et=[];const wi=()=>e.imageWidth*It,Kt=()=>{e.cardWidth=U(e.cardWidth),e.cardHeight=U(e.cardHeight),e.imageWidth=me(e.imageWidth)},it=(o,s,l)=>{o.value=String(l),document.activeElement!==s&&(s.value=String(l))},Si=()=>{const o=pe(e.cardWidth),s=String(Math.max(o,e.titleSize)),l=String(Math.max(o,e.bodySize));for(const c of[w,H])c.min="5",c.max=s;for(const c of[G,D])c.min="5",c.max=l;it(a,d,e.cardWidth),it(f,h,e.cardWidth),it(p,b,e.cardHeight),it(w,H,e.titleSize),it(G,D,e.bodySize),it(Rt,Nt,e.imageWidth)},Se=()=>{E.value=String(e.radius),E.setAttribute("aria-valuenow",String(e.radius)),A.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},Me=(o,s)=>{e.themeSlug=o;for(const l of t.querySelectorAll("[data-theme-slug]")){const c=l.dataset.themeSlug===o;l.setAttribute("aria-checked",c?"true":"false"),l.tabIndex=c?0:-1,c&&s&&l.focus()}I()},Zt=o=>{var m,M;e.panel=o;const s=o==="design";(m=t.querySelector("#studio-panel-design"))==null||m.toggleAttribute("hidden",!s),(M=t.querySelector("#studio-panel-code"))==null||M.toggleAttribute("hidden",s);const l=t.querySelector("#studio-tab-design"),c=t.querySelector("#studio-tab-code");l==null||l.setAttribute("aria-selected",s?"true":"false"),c==null||c.setAttribute("aria-selected",s?"false":"true"),l&&(l.tabIndex=s?0:-1),c&&(c.tabIndex=s?-1:0),I()},Mi=()=>{r.value=e.presetId,document.activeElement!==g&&(g.value=e.title),document.activeElement!==L&&(L.value=e.body),document.activeElement!==y&&(x.value=e.titleColor,y.value=e.titleColor),document.activeElement!==j&&(dt.value=e.bodyColor,j.value=e.bodyColor),document.activeElement!==wt&&(Pt.value=e.color,wt.value=e.color),T.value=e.titleFontId,V.value=e.bodyFontId,document.activeElement!==R&&(R.value=e.code);for(const o of t.querySelectorAll("[data-theme-slug]")){const s=o.dataset.themeSlug===e.themeSlug;o.setAttribute("aria-checked",s?"true":"false"),o.tabIndex=s?0:-1}},I=async()=>{const o=++Lt;Kt(),Mi(),Si(),t.querySelectorAll('input[type="range"]').forEach(xi);const s=vt(e.presetId),l=e.cardWidth===s.width&&e.cardHeight===s.height,c=l&&s.safe?` · 안전 영역 ${s.safe.width} × ${s.safe.height}`:"";ge.textContent=`${e.cardWidth} × ${e.cardHeight} · ${s.name}${c}`,Xt.textContent=le(),Se(),Q(),l&&s.safe?(lt.hidden=!1,lt.style.width=`${s.safe.width}px`,lt.style.height=`${s.safe.height}px`):lt.hidden=!0;const m=(pt,Li,Ii)=>{var Be;const De=(Be=_t(pt,xt()).split(",")[0])==null?void 0:Be.replaceAll('"',"").trim();return De?document.fonts.load(`${Li} ${Ii}px "${De}"`):Promise.resolve()};try{await Promise.all([m(e.titleFontId,600,e.titleSize),m(e.bodyFontId,400,e.bodySize)])}catch{}if(o!==Lt)return;const M=_e();if(e.code.trim()){$.hidden=!0,St.hidden=!1;const pt=M?await ei(M):"";if(o!==Lt)return;St.srcdoc=Pi(oi(e,pt));return}if(St.hidden=!0,$.hidden=!1,M)try{N=await bi(M),N.naturalWidth>0&&(It=N.naturalHeight/N.naturalWidth)}catch{N=null,It=1}else N=null,It=1;o===Lt&&(Kt(),et=ee($,e,N))},ot=(o,s,l,c)=>{o.addEventListener("pointerdown",()=>S(o)),o.addEventListener("keydown",()=>S(o)),o.addEventListener("pointerup",()=>v(o)),o.addEventListener("pointercancel",()=>v(o)),o.addEventListener("keyup",()=>v(o)),o.addEventListener("input",()=>{l(Number(o.value)),I()});const m=()=>{Kt(),s.value=String(c()),v(s)};s.addEventListener("focus",()=>S(s)),s.addEventListener("input",()=>{s.value.trim()!==""&&(l(Number(s.value)),I())}),s.addEventListener("change",m),s.addEventListener("blur",m)};r.addEventListener("focus",()=>S(r)),r.addEventListener("change",()=>{const o=vt(r.value);e.presetId=o.id,e.cardWidth=o.width,e.cardHeight=o.height,v(r),I()}),r.addEventListener("blur",()=>v(r)),a.addEventListener("pointerdown",Gt),a.addEventListener("keydown",Gt),d.addEventListener("focus",Gt),ot(a,d,o=>{const s=jt(e.cardWidth,e.cardHeight)*_,l=Ai(Math.max(1,e.cardWidth),Math.max(1,Math.round(e.cardWidth*we)),o);e.cardWidth=l.cardWidth,e.cardHeight=l.cardHeight;const c=jt(e.cardWidth,e.cardHeight);c>0&&Number.isFinite(s)&&s>0&&(_=s/c)},()=>e.cardWidth),ot(f,h,o=>{e.cardWidth=U(o),e.titleSize=X(e.titleSize,e.cardWidth),e.bodySize=X(e.bodySize,e.cardWidth)},()=>e.cardWidth),ot(p,b,o=>{e.cardHeight=o},()=>e.cardHeight),ot(w,H,o=>{e.titleSize=X(o,e.cardWidth)},()=>e.titleSize),ot(G,D,o=>{e.bodySize=X(o,e.cardWidth)},()=>e.bodySize),ot(Rt,Nt,o=>{e.imageWidth=o},()=>e.imageWidth);const Ee=(o,s)=>{o.addEventListener("focus",()=>S(o)),o.addEventListener("change",()=>{s(),v(o),I()}),o.addEventListener("blur",()=>v(o))};Ee(T,()=>{e.titleFontId=T.value}),Ee(V,()=>{e.bodyFontId=V.value}),(qe=t.querySelector("#studio-reset"))==null||qe.addEventListener("click",()=>{v();const o=zt(e),s=_;n(),(!Qe(o,e)||s!==_)&&(P.push(o),st.push(s),P.length>Je&&(P.shift(),st.shift()),ft=[],Wt=[]),tt()}),g.addEventListener("focus",()=>S(g)),g.addEventListener("input",()=>{e.title=g.value,I()}),g.addEventListener("blur",()=>v(g)),L.addEventListener("focus",()=>S(L)),L.addEventListener("input",()=>{e.body=L.value,I()}),L.addEventListener("blur",()=>v(L));const Jt=(o,s,l,c)=>{o.addEventListener("pointerdown",()=>S(o)),o.addEventListener("change",()=>v(o)),o.addEventListener("input",()=>{const m=F(o.value);m&&(l(m),s.value=m,I())}),s.addEventListener("focus",()=>S(s)),s.addEventListener("input",()=>{const m=F(s.value);m&&(l(m),o.value=m,I())}),s.addEventListener("blur",()=>{F(s.value)||(s.value=c()),v(s)})};Jt(Pt,wt,o=>{e.color=o},()=>e.color),Jt(x,y,o=>{e.titleColor=o},()=>e.titleColor),Jt(dt,j,o=>{e.bodyColor=o},()=>e.bodyColor);const Le=o=>{e.radius=li(Number(o)),Se(),I()};E.addEventListener("pointerdown",()=>S(E)),E.addEventListener("keydown",()=>S(E)),E.addEventListener("pointerup",()=>v(E)),E.addEventListener("pointercancel",()=>v(E)),E.addEventListener("keyup",()=>v(E)),E.addEventListener("input",()=>Le(E.value)),A.addEventListener("focus",()=>S(A)),A.addEventListener("input",()=>Le(A.value)),A.addEventListener("blur",()=>v(A)),A.addEventListener("change",()=>v(A)),R.addEventListener("focus",()=>S(R)),R.addEventListener("input",()=>{e.code=R.value,I()}),R.addEventListener("blur",()=>v(R));const Ie=(o,s)=>{Object.assign(e,o),_=s,tt(),I()};ye.addEventListener("click",()=>{v();const o=P.pop(),s=st.pop();if(!o||s===void 0){tt();return}ft.push(zt(e)),Wt.push(_),Ie(o,s)}),ve.addEventListener("click",()=>{v();const o=ft.pop(),s=Wt.pop();if(!o||s===void 0){tt();return}P.push(zt(e)),st.push(_),Ie(o,s)}),tt(),(Fe=t.querySelector("#studio-tab-design"))==null||Fe.addEventListener("click",()=>Zt("design")),(He=t.querySelector("#studio-tab-code"))==null||He.addEventListener("click",()=>Zt("code")),(Te=t.querySelector(".studio__tabs"))==null||Te.addEventListener("keydown",o=>{var l;if(!(o instanceof KeyboardEvent)||o.key!=="ArrowRight"&&o.key!=="ArrowLeft")return;o.preventDefault();const s=e.panel==="design"?"code":"design";Zt(s),(l=t.querySelector(s==="design"?"#studio-tab-design":"#studio-tab-code"))==null||l.focus()});const ht=[...t.querySelectorAll("[data-theme-slug]")];for(const o of ht)o.addEventListener("click",()=>{const s=o.dataset.themeSlug;!s||s===e.themeSlug||(S(o),Me(s,!1),v(o))});(Re=t.querySelector(".studio__themes"))==null||Re.addEventListener("keydown",o=>{if(!(o instanceof KeyboardEvent))return;const s=o.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(s))return;o.preventDefault();const l=ht.findIndex(pt=>pt.dataset.themeSlug===e.themeSlug),m=ht[(l+(s==="ArrowLeft"||s==="ArrowUp"?-1:1)+ht.length)%ht.length],M=m==null?void 0:m.dataset.themeSlug;!M||M===e.themeSlug||(S(m),Me(M,!0),v(m))}),(Ne=t.querySelector("#studio-copy"))==null||Ne.addEventListener("click",async()=>{const o=le();Xt.textContent=o;try{await navigator.clipboard.writeText(o)}catch{const l=document.createElement("textarea");l.value=o,document.body.append(l),l.select(),document.execCommand("copy"),l.remove()}const s=t.querySelector("#studio-copy");s&&(s.textContent="복사됨",window.setTimeout(()=>{s.textContent="현재 디자인을 코드로 복사"},1200))}),(Pe=t.querySelector("#studio-download"))==null||Pe.addEventListener("click",()=>{(async()=>{const o=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){ni($,o);return}const s=_e(),l=s?await ei(s):"",c=document.createElement("canvas");await yo(c,hi(oi(e,l)),e.cardWidth,e.cardHeight),ni(c,o)})()});const ke=o=>{const s=$.getBoundingClientRect();return{x:s.width>0?(o.clientX-s.left)/s.width*e.cardWidth:0,y:s.height>0?(o.clientY-s.top)/s.height*e.cardHeight:0}},We=(o,s)=>{for(let c=et.length-1;c>=0;c-=1){const m=et[c];if(m&&o>=m.x-8&&s>=m.y-8&&o<=m.x+m.w+8&&s<=m.y+m.h+8)return m}return null},Ei=o=>{const s=$.getContext("2d");if(!s)return;const l=$.getBoundingClientRect().width,c=l>0?e.cardWidth/l:1;s.save(),s.lineJoin="round",s.lineCap="round",s.strokeStyle="rgba(0, 0, 0, 0.7)",s.lineWidth=c*3,s.strokeRect(o.x,o.y,Math.max(c,o.w),Math.max(c,o.h)),s.strokeStyle="rgba(255, 255, 255, 0.92)",s.lineWidth=c*1.5,s.strokeRect(o.x,o.y,Math.max(c,o.w),Math.max(c,o.h)),s.restore()},ze=()=>{if(!k)return;const o=et.find(s=>s.kind===(k==null?void 0:k.kind));o&&Ei(o)};let k=null;$.addEventListener("pointerdown",o=>{if(e.code.trim())return;const s=ke(o),l=We(s.x,s.y);if(l){try{$.setPointerCapture(o.pointerId)}catch{}S($),k={kind:l.kind,dx:s.x-l.x,dy:s.y-l.y,pointerId:o.pointerId},$.dataset.dragging="true",ze()}}),$.addEventListener("pointermove",o=>{const s=ke(o);if(!k||k.pointerId!==o.pointerId){$.dataset.hover=We(s.x,s.y)?"true":"false";return}const l=s.x-k.dx,c=s.y-k.dy;k.kind==="title"?(e.titleX=Y(l,e.cardWidth,e.titleSize),e.titleY=Y(c,e.cardHeight,e.titleSize)):k.kind==="body"?(e.bodyX=Y(l,e.cardWidth,e.bodySize),e.bodyY=Y(c,e.cardHeight,e.bodySize)):(e.imageX=Ye(l,e.cardWidth,e.imageWidth),e.imageY=Ye(c,e.cardHeight,wi())),et=ee($,e,N),ze()});const Ce=o=>{!k||k.pointerId!==o.pointerId||(k=null,delete $.dataset.dragging,v($),et=ee($,e,N))};$.addEventListener("pointerup",Ce),$.addEventListener("pointercancel",Ce);const Vt=o=>{const s=Yt.getBoundingClientRect().width,l=rt+ae+de,c=Number.isFinite(o)?o:e.controlsWidth;e.controlsWidth=s>=l?qi(c,s):Math.max(rt,Math.round(c)),Yt.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),z.setAttribute("aria-valuenow",String(e.controlsWidth)),z.setAttribute("aria-valuemax",String(s>=l?Math.max(rt,Math.round(s)-ae-de):e.controlsWidth)),Q()};Vt(e.controlsWidth),z.addEventListener("pointerdown",o=>{if(window.matchMedia("(max-width: 1023px)").matches)return;try{z.setPointerCapture(o.pointerId)}catch{}const s=o.clientX,l=e.controlsWidth,c=M=>{M.pointerId===o.pointerId&&Vt(l+M.clientX-s)},m=M=>{M.pointerId===o.pointerId&&(z.removeEventListener("pointermove",c),z.removeEventListener("pointerup",m),z.removeEventListener("pointercancel",m))};z.addEventListener("pointermove",c),z.addEventListener("pointerup",m),z.addEventListener("pointercancel",m)}),z.addEventListener("keydown",o=>{if(o.key!=="ArrowLeft"&&o.key!=="ArrowRight")return;o.preventDefault();const s=o.shiftKey?48:16;Vt(e.controlsWidth+(o.key==="ArrowRight"?s:-s))}),(Oe=t.querySelector("#studio-controls"))==null||Oe.addEventListener("submit",o=>{o.preventDefault()}),bt==null||bt.disconnect(),bt=new ResizeObserver(()=>Q()),bt.observe(Et),I()}const yi="ax-design-studio-mode",si="./data/index.json";let q={status:"loading"},Tt=Ht(),vi="all",O=null,ie=null,W=ce();function he(){const t=localStorage.getItem(yi);return t==="light"||t==="dark"?t:"dark"}function ri(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(yi,t)}function oe(t,e,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${e}" ${i?'aria-current="page"':""}>${t}</a>`}function $o(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function _i(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=fe(t);return e?Ft(e.r,e.g,e.b):F(t)??Ft(216,241,255)}function xo(t,e){var n;const i=t&&e.some(r=>r.slug===t)?t:null;return O?(t&&t!==ie&&i&&(O.themeSlug=i,ie=t),O):(O=ci(i??((n=e[0])==null?void 0:n.slug)??"",_i()),ie=t,O)}function wo(t){const e=he(),i=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",n=W.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${oe("Graphic Library",J({name:"archive"}),W.name==="archive"||W.name==="capture")}
        ${oe("Online Marketing Studio",J({name:"studio",theme:null}),W.name==="studio")}
        ${oe("History",J({name:"history"}),W.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${$o(e)}
        </button>
      </div>
    </header>
    <main class="shell${n?" shell--studio":""}" id="main">${t}</main>
  `}function So(){if(q.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(q.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${q.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
      </section>
    `;const t=q.index;switch(W.name){case"archive":return Zi(t,Tt,vi);case"capture":return co(t,W.slug,Tt);case"studio":return vo(xo(W.theme,t.captures),t.captures);case"history":return ho(t);case"notfound":return po(W.path)}}function Z(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");ri(he()),Tt=Ht(),t.innerHTML=wo(So()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{ri(he()==="dark"?"light":"dark"),Z()}),q.status==="ready"&&(W.name==="archive"&&Ji(t,{onTabChange:i=>{var n;vi=i,Z(),(n=document.querySelector(`[data-archive-tab="${i}"]`))==null||n.focus()}}),W.name==="capture"&&uo(t,i=>{Tt=Di(i),Z()}),W.name==="studio"&&q.status==="ready"&&O&&_o(t,O,q.index.captures,()=>{var i;O&&(Hi(O,_i()),Z(),(i=document.querySelector("#studio-reset"))==null||i.focus())}))}async function Mo(){q={status:"loading"},Z();try{const t=await fetch(si,{cache:"no-store"});if(!t.ok)throw new Error(`${si} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");q={status:"ready",index:e}}catch(t){q={status:"error",message:t instanceof Error?t.message:String(t)}}Z()}Ui(t=>{if(gi(window.location.hash)){window.location.replace(J({name:"studio",theme:null}));return}W=t,Z()});Mo();
