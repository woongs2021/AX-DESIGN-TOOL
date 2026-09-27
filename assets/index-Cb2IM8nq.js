(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}})();const Wi="ig-feed-square",re=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function _t(t){return re.find(e=>e.id===t)??re[0]}const vt=0,At=120,zi=28,D=100,K=4e3,ae=5,di=10,qt=100,de=4e3,at=240,li=360,le=280,ce=6,Ci="시즌",Ai=`새로운 컬렉션
브랜드의 첫 인상을 한 장으로 전합니다.`,Ft=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Ye="rgb(0, 0, 0)",Ue="rgb(255, 255, 255)";function ci(t){return Number.isFinite(t)?Math.min(At,Math.max(vt,Math.round(t))):vt}function X(t){return Number.isFinite(t)?Math.min(K,Math.max(D,Math.round(t))):D}function qi(t,e,i){const n=Math.max(1,Math.round(t)),a=Math.max(1,Math.round(e))/n;let d=X(i);const f=Math.round(d*a);let h=X(f);return f!==h&&(d=X(Math.round(h/a)),h=X(Math.round(d*a))),{cardWidth:d,cardHeight:h}}function fe(t){return Math.max(ae,X(t)-di*2)}function Y(t,e){const i=fe(e);return Number.isFinite(t)?Math.min(i,Math.max(ae,Math.round(t))):ae}function Ht(t){return Number.isFinite(t)?Math.min(de,Math.max(qt,Math.round(t))):qt}function U(t,e,i){const n=Math.max(0,Math.round(e)-Math.min(Math.max(i,0),Math.round(e)));return Number.isFinite(t)?Math.min(n,Math.max(0,Math.round(t))):0}function je(t,e,i){const n=Math.round(-i+40),r=Math.round(e-40);return Number.isFinite(t)?n>r?Math.round((e-i)/2):Math.min(r,Math.max(n,Math.round(t))):0}function Fi(t,e){const i=Math.max(at,Math.round(e)-le-ce);return Number.isFinite(t)?Math.min(i,Math.max(at,Math.round(t))):li}function Hi(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function $t(t,e=[]){var n;const i=Ft.find(r=>r.id===t);return i?i.stack:((n=e.find(r=>r.id===t))==null?void 0:n.stack)??Ft[0].stack}function ui(t,e){const i=_t(Wi),n=Y(Math.round(i.width*.046),i.width),r=Y(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:Ci,body:Ai,themeSlug:t,color:e,radius:zi,code:"",panel:"design",controlsWidth:li,titleSize:n,bodySize:r,titleX:U(Math.round(i.width*.06),i.width,n),titleY:U(a,i.height,n),bodyX:U(Math.round(i.width*.06),i.width,r),bodyY:U(a+Math.round(n*1.6),i.height,r),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:xt(e),bodyColor:xt(e),imageWidth:Ht(i.width),imageX:0,imageY:0}}function Ti(t,e){const i=ui(t.themeSlug,e);i.controlsWidth=t.controlsWidth,i.panel=t.panel,Object.assign(t,i)}function F(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function Tt(t,e,i){const n=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${n(t)}${n(e)}${n(i)}`}function ge(t){const e=F(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const i=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function st(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function Ge(t,e){const i=.2126*st(t.r)+.7152*st(t.g)+.0722*st(t.b),n=.2126*st(e.r)+.7152*st(e.g)+.0722*st(e.b),r=Math.max(i,n),a=Math.min(i,n);return(r+.05)/(a+.05)}function xt(t){const e=ge(hi(t));return e?Tt(e.r,e.g,e.b):Tt(0,0,0)}function hi(t){const e=ge(t)??{r:255,g:255,b:255},i=Ge({r:0,g:0,b:0},e),n=Ge({r:255,g:255,b:255},e);return i>=4.5&&i>=n?Ye:n>=4.5?Ue:i>=n?Ye:Ue}function Ri(t,e,i){if(e<=0)return[];const n=[];for(const r of t.split(`
`)){const a=r.split(/\s+/).filter(Boolean);if(a.length===0){n.push("");continue}let d="";const f=h=>{if(i(h)<=e){d=h;return}let m="";for(const b of h){const g=m+b;i(g)<=e?m=g:(m&&n.push(m),m=b)}d=m};for(const h of a){const m=d?`${d} ${h}`:h;i(m)<=e?d=m:(d&&n.push(d),f(h))}d&&n.push(d)}return n}function ee(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ni(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Pi(t,e){return Ni(t).replaceAll("{{title}}",ee(e.title)).replaceAll("{{body}}",ee(e.body)).replaceAll("{{themeImage}}",ee(e.themeImage))}function ue(){return`<article class="studio-card">
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
</style>`}function pi(t){const e=F(t.color)??t.color,i=hi(e),n=F(t.titleColor)??xt(e),r=F(t.bodyColor)??xt(e),a=ci(t.radius),d=_t("ig-feed-square"),f=t.width>0?t.width:d.width,h=t.height>0?t.height:d.height,m=t.titleFontStack.replaceAll(";",""),b=t.bodyFontStack.replaceAll(";",""),g=Pi(t.code.trim()||ue(),t),w=[`--studio-color:${e}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${f}px`,`--studio-height:${h}px`,`--studio-title-font:${m}`,`--studio-body-font:${b}`,`--studio-title-size:${Y(t.titleSize,f)}px`,`--studio-body-size:${Y(t.bodySize,f)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${Ht(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${n}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${h}px;margin:0;background:transparent;${w}">${g}</div>`}function Oi(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${pi(t)}</body>
</html>`}const mi="design-llm-wiki-pins";function Rt(){try{const t=localStorage.getItem(mi);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(i=>typeof i=="string"):[]}catch{return[]}}function Bi(t){const e=[...new Set(t)];localStorage.setItem(mi,JSON.stringify(e))}function Di(t){const e=Rt(),i=e.includes(t)?e.filter(n=>n!==t):[...e,t];return Bi(i),Rt()}const fi="[a-z0-9]+(?:-[a-z0-9]+)*";function gi(t){const e=t.startsWith("#")?t.slice(1):t,i=e.indexOf("?"),n=i>=0?e.slice(0,i):e,r=i>=0?e.slice(i+1):"",a=n.startsWith("/")?n:`/${n}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:r}}function Xi(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${fi}$`).test(e)?null:e}function bi(t){const{path:e}=gi(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function he(t=window.location.hash){const{path:e,query:i}=gi(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||bi(t))return{name:"studio",theme:e==="/studio"?Xi(i):null};const n=e.match(new RegExp(`^/capture/(${fi})$`));return n?{name:"capture",slug:n[1]}:{name:"notfound",path:e}}function J(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function Yi(t){const e=()=>t(he());return window.addEventListener("hashchange",e),t(he()),()=>window.removeEventListener("hashchange",e)}function Ui(t){return[...t].sort((e,i)=>e.capturedAt!==i.capturedAt?e.capturedAt<i.capturedAt?1:-1:e.slug.localeCompare(i.slug))}function u(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function dt(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let Wt=null;function ji(t){const e=t.querySelector(".archive-tabs__indicator"),i=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!i)return;const n=i.offsetLeft,r=i.offsetWidth;Wt&&(e.style.transition="none",e.style.transform=`translateX(${Wt.left}px)`,e.style.width=`${Wt.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${n}px)`,e.style.width=`${r}px`,Wt={left:n,width:r}})}function ie(t){const e=t.querySelector(".capture-grid");if(!e)return;const i=window.getComputedStyle(e),n=Number.parseFloat(i.gridAutoRows)||1,r=Number.parseFloat(i.rowGap)||0;e.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,h=Math.ceil((d+f+r)/(n+r));a.style.gridRowEnd=`span ${Math.max(1,h)}`})}function Gi(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${u(dt(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function Ki(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${J({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${Gi(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${u(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${u(t.title)}</h2>
          <p class="capture-card__insight">${u(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Zi(t,e){const i=new Set(e),n=Ui(t),r=n.filter(m=>i.has(m.slug)),a=n.filter(m=>!i.has(m.slug)),d=new Map(n.map(m=>[m.slug,m])),f=e.map(m=>d.get(m)).filter(m=>!!m),h=r.filter(m=>!e.includes(m.slug));return[...f,...h,...a]}function Ji(t,e,i){const n=new Set(e),r=i==="pin"?t.captures.filter(d=>n.has(d.slug)):t.captures,a=Zi(r,e);return t.captures.length===0?`
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
              </section>`:`<div class="capture-grid">${a.map(d=>Ki(d,e.includes(d.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Vi(t,e){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.archiveTab;(a==="all"||a==="pin")&&e.onTabChange(a)})}),ji(t),requestAnimationFrame(()=>ie(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>ie(t),{once:!0})});const i=new ResizeObserver(()=>ie(t)),n=t.querySelector(".capture-grid");n&&i.observe(n)}function Qi(t){const e=t.replace(/\r\n/g,`
`).split(`
`),i=[];let n=!1;const r=()=>{n&&(i.push("</ul>"),n=!1)};for(const a of e){const d=a.trim();if(!d){r();continue}if(d.startsWith("### ")){r(),i.push(`<h3>${ft(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){r(),i.push(`<h2>${ft(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){r(),i.push(`<h1>${ft(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){n||(i.push("<ul>"),n=!0),i.push(`<li>${ft(d.slice(2))}</li>`);continue}r(),i.push(`<p>${ft(d)}</p>`)}return r(),i.join(`
`)}function ft(t){let e=u(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,n)=>`<a href="${J({name:"capture",slug:n})}">${n}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,n,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${n}</span>`:`<a href="${u(r)}">${n}</a>`),e}const to=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function eo(t){return Math.max(35,Math.min(98,Math.round(t)))}function io(t){let e=0;for(const i of t)e=(e*31+i.charCodeAt(0))%997;return e}function oo(t){var m;if((m=t.analysisScores)!=null&&m.length)return t.analysisScores;const e=io(`${t.slug}:${t.title}:${t.insight}`),i=t.tags.includes("density")?7:0,n=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),a=t.asset.width/Math.max(1,t.asset.height),d=a>1.2?6:0,f=a<.75?5:0,h=[68+r+d+e%9,66+i+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+n+(t.uiPatterns.includes("filter-chips")?7:0),62+f+r+(e>>3)%8].map(eo);return to.map(([b,g],w)=>({key:b,label:g,score:h[w]??60,description:so(g,h[w]??60,t)}))}function no(t){return t.length===0?0:Math.round(t.reduce((e,i)=>e+i.score,0)/t.length)}function so(t,e,i){return t==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function ro(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function ao(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${u(dt(t.asset.posterPath))}"`:""}>
        <source src="${u(dt(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${u(dt(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function lo(t){const e=oo(t),i=t.analysisTotal??no(e),n=160,r=110,a=[.25,.5,.75,1].map(h=>e.map((m,b)=>{const g=-Math.PI/2+b*Math.PI*2/e.length,w=n+Math.cos(g)*r*h,y=n+Math.sin(g)*r*h;return`${w.toFixed(1)},${y.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),d=e.map((h,m)=>{const b=-Math.PI/2+m*Math.PI*2/e.length,g=r*(h.score/100),w=n+Math.cos(b)*g,y=n+Math.sin(b)*g;return`${w.toFixed(1)},${y.toFixed(1)}`}).join(" "),f=e.map((h,m)=>{const b=-Math.PI/2+m*Math.PI*2/e.length,g=n+Math.cos(b)*r,w=n+Math.sin(b)*r,y=n+Math.cos(b)*r*(h.score/100),S=n+Math.sin(b)*r*(h.score/100),H=n+Math.cos(b)*(r+26),L=n+Math.sin(b)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${n}" y1="${n}" x2="${g.toFixed(1)}" y2="${w.toFixed(1)}" />
          <circle class="spider-point" cx="${y.toFixed(1)}" cy="${S.toFixed(1)}" r="6" />
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
  `}function co(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${u(i)}</span>`).join("")}function uo(t,e,i){const n=t.captures.find(a=>a.slug===e);if(!n)return`
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

      <div class="detail__media-wrap detail__hero">${ao(n)}</div>

      ${lo(n)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${u(n.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${u(n.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${n.asset.width} × ${n.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${ro(n.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${n.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${n.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${u(n.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${co(n)}
        </p>
        <p class="detail__meta-line">
          ${u(n.screenType)} · ${u(n.tone)} · ${u(n.copyTone)} · ${u(n.capturedAt)}
          ${n.sourceUrl?` · <a href="${u(n.sourceUrl)}">${u(n.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Qi(n.body)}
      </section>
    </article>
  `}function ho(t,e){var i;(i=t.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",n=>{const r=n.currentTarget.dataset.pinSlug;r&&e(r)})}function po(t){const e=t.wiki.logEntries;return e.length===0?`
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
  `}function mo(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${u(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Ke=.5,Ze=3,Je=.25,Ve=40;let _=1,P=[],gt=[],rt=[],zt=[],bt=null,Qe=1;function Ct(t){return{...t}}function ti(t,e){return JSON.stringify(t)===JSON.stringify(e)}const pe=new Map,ei=new Map;function yi(t){const e=pe.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((i,n)=>{const r=e??new Image;r.onload=()=>i(r),r.onerror=()=>n(new Error(`Image failed: ${t}`)),e||(pe.set(t,r),r.src=t)})}function ii(t){const e=ei.get(t);if(e)return e;const i=fetch(t).then(n=>{if(!n.ok)throw new Error(`Theme image HTTP ${n.status}`);return n.blob()}).then(n=>new Promise((r,a)=>{const d=new FileReader;d.onload=()=>r(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(n)}));return ei.set(t,i),i}const fo=Object.assign({}),oi=new Set;function go(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function wt(){const t=new Set(Ft.map(i=>i.label.toLowerCase())),e=[];for(const[i,n]of Object.entries(fo)){const r=Hi(i);if(!r||t.has(r.toLowerCase()))continue;const a=`local:${r}`;if(!e.some(d=>d.id===a)){if(!oi.has(r)){oi.add(r);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${n}") format("${go(n)}");font-display:swap;}`,document.head.append(d)}e.push({id:a,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return e}function bo(){return[...Ft,...wt()]}function yo(t,e,i,n){const r=Math.max(0,Math.min(n,e/2,i/2));t.beginPath(),t.roundRect(0,0,e,i,r)}function ni(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:$t(t.titleFontId,wt()),bodyFontStack:$t(t.bodyFontId,wt()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function oe(t,e,i){const n=t.getContext("2d");if(!n)return[];const r=e.cardWidth,a=e.cardHeight;t.width=r,t.height=a,n.clearRect(0,0,r,a),n.save(),yo(n,r,a,e.radius),n.clip(),n.fillStyle=e.color,n.fillRect(0,0,r,a);const d=[];if(i&&i.naturalWidth>0){const b=e.imageWidth,g=b*(i.naturalHeight/i.naturalWidth);n.drawImage(i,e.imageX,e.imageY,b,g),d.push({kind:"image",x:e.imageX,y:e.imageY,w:b,h:g})}const f=Math.max(1,r-di*2);n.textBaseline="top";const h=(b,g,w,y,S,H,L,lt)=>{if(!g.trim())return;n.fillStyle=lt,n.font=`${H} ${S}px ${L}`;const j=Ri(g.trim(),f,T=>n.measureText(T).width),G=Math.round(S*1.25);let B=0;j.forEach((T,V)=>{n.fillText(T,w,y+V*G),B=Math.max(B,n.measureText(T).width)}),d.push({kind:b,x:w,y,w:Math.max(B,S),h:Math.max(j.length,1)*G})},m=wt();return h("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,$t(e.bodyFontId,m),e.bodyColor),h("title",e.title,e.titleX,e.titleY,e.titleSize,600,$t(e.titleFontId,m),e.titleColor),n.restore(),d}function si(t,e){t.toBlob(i=>{if(!i)return;const n=URL.createObjectURL(i),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)},"image/png")}async function vo(t,e,i,n){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${n}"><foreignObject x="0" y="0" width="${i}" height="${n}">${e}</foreignObject></svg>`,a=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const f=await yi(d),h=t.getContext("2d");if(!h)return;t.width=i,t.height=n,h.clearRect(0,0,i,n),h.drawImage(f,0,0,i,n)}finally{URL.revokeObjectURL(d),pe.delete(d)}}let yt=null;function _o(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=xt(t.color);t.titleColor=F(String(t.titleColor??""))??i,t.bodyColor=F(String(t.bodyColor??""))??i;const n=t.fontId;t.titleFontId||(t.titleFontId=n||"pretendard"),t.bodyFontId||(t.bodyFontId=n||"pretendard");const r=_t(t.presetId),a=re.map(y=>`<option value="${u(y.id)}"${y.id===r.id?" selected":""}>${u(y.name)} · ${y.width}×${y.height}</option>`).join(""),d=e.map(y=>{const S=y.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${u(y.slug)}"
          aria-checked="${S?"true":"false"}"
          tabindex="${S?"0":"-1"}"
        >
          <img src="${u(dt(y.asset.path))}" alt="${u(y.title)}" />
        </button>
      `}).join(""),f=t.panel==="design",h=bo(),m=fe(t.cardWidth),b=y=>h.map(S=>`<option value="${u(S.id)}"${S.id===y?" selected":""}>${u(S.label)}</option>`).join("");return`
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
              <input id="studio-size" type="range" min="${D}" max="${K}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${D}" max="${K}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${D}" max="${K}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${D}" max="${K}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${D}" max="${K}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${D}" max="${K}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
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
              <input id="studio-title-size" type="range" min="5" max="${m}" step="1" value="${t.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${m}" step="1" value="${t.titleSize}" aria-label="타이틀 폰트 크기 수치" />
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
              <input id="studio-body-size" type="range" min="5" max="${m}" step="1" value="${t.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${m}" step="1" value="${t.bodySize}" aria-label="본문 폰트 크기 수치" />
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
              <input id="studio-image-width" type="range" min="${qt}" max="${de}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${qt}" max="${de}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius" type="range" min="${vt}" max="${At}" step="1" value="${t.radius}" aria-valuemin="${vt}" aria-valuemax="${At}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${vt}" max="${At}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
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
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${at}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
  `}function $o(t,e,i,n){var qe,Fe,He,Te,Re,Ne,Pe,Oe,Be;if(i.length===0)return;const r=t.querySelector("#studio-preset"),a=t.querySelector("#studio-size"),d=t.querySelector("#studio-size-number"),f=t.querySelector("#studio-width"),h=t.querySelector("#studio-width-number"),m=t.querySelector("#studio-height"),b=t.querySelector("#studio-height-number"),g=t.querySelector("#studio-title"),w=t.querySelector("#studio-title-color"),y=t.querySelector("#studio-title-hex"),S=t.querySelector("#studio-title-size"),H=t.querySelector("#studio-title-size-number"),L=t.querySelector("#studio-body"),lt=t.querySelector("#studio-body-color"),j=t.querySelector("#studio-body-hex"),G=t.querySelector("#studio-body-size"),B=t.querySelector("#studio-body-size-number"),T=t.querySelector("#studio-title-font"),V=t.querySelector("#studio-body-font"),Pt=t.querySelector("#studio-image-width"),Ot=t.querySelector("#studio-image-width-number"),Bt=t.querySelector("#studio-color"),St=t.querySelector("#studio-hex"),E=t.querySelector("#studio-radius"),A=t.querySelector("#studio-radius-number"),R=t.querySelector("#studio-code"),$=t.querySelector("#studio-canvas"),Mt=t.querySelector("#studio-iframe"),be=t.querySelector("#studio-meta"),ct=t.querySelector("#studio-safe"),Et=t.querySelector("#studio-scaler"),Dt=t.querySelector("#studio-fit"),Lt=t.querySelector("#studio-stage"),Xt=t.querySelector("#studio-zoom-out"),Yt=t.querySelector("#studio-zoom-in"),ye=t.querySelector("#studio-zoom-label"),ve=t.querySelector("#studio-undo"),_e=t.querySelector("#studio-redo"),ut=t.querySelector("#studio-scroll-thumb"),Ut=t.querySelector(".studio__controls-wrap"),jt=t.querySelector("#studio-export"),z=t.querySelector("#studio-splitter"),Gt=t.querySelector(".studio");if(!r||!a||!d||!f||!h||!m||!b||!g||!w||!y||!S||!H||!L||!lt||!j||!G||!B||!T||!V||!Pt||!Ot||!Bt||!St||!E||!A||!R||!$||!Mt||!be||!ct||!Et||!Dt||!Lt||!Xt||!Yt||!ye||!ve||!_e||!ut||!Ut||!jt||!z||!Gt)return;const $e=()=>{const o=i.find(s=>s.slug===e.themeSlug)??i[0];return o?dt(o.asset.path):""};let It=0;const xi=()=>{(!Number.isFinite(_)||_<=0)&&(_=1),Xt.disabled=_<=Ke+.001,Yt.disabled=_>=Ze-.001,ye.textContent=`${Math.round(_*100)}%`},Kt=(o,s)=>{const l=Lt.getBoundingClientRect(),c=20,p=Math.min(Math.max(l.width-c,1)/o,Math.max(l.height-c,1)/s);return Number.isFinite(p)&&p>0?p:1},Q=()=>{const o=Kt(e.cardWidth,e.cardHeight);xi();const s=o*_;Dt.style.width=`${e.cardWidth*s}px`,Dt.style.height=`${e.cardHeight*s}px`,Et.style.width=`${e.cardWidth}px`,Et.style.height=`${e.cardHeight}px`,Et.style.transform=`scale(${s})`};Xt.addEventListener("click",()=>{_=Math.max(Ke,_-Je),Q()}),Yt.addEventListener("click",()=>{_=Math.min(Ze,_+Je),Q()}),(qe=t.querySelector("#studio-zoom-fit"))==null||qe.addEventListener("click",()=>{_=1,Q(),Lt.scrollTo(0,0)});const C=t.querySelector("#studio-controls");let xe=0;const we=()=>{if(!C)return;const o=C.scrollHeight-C.clientHeight;if(o<=1){ut.hidden=!0;return}ut.hidden=!1;const s=Math.max(32,C.clientHeight/C.scrollHeight*C.clientHeight),l=Math.max(0,C.clientHeight-s);ut.style.height=`${s}px`,ut.style.transform=`translateY(${C.scrollTop/o*l}px)`};C==null||C.addEventListener("scroll",()=>{we(),Ut.classList.add("is-scrolling"),window.clearTimeout(xe),xe=window.setTimeout(()=>Ut.classList.remove("is-scrolling"),700)}),we();const tt=()=>{const o=document.querySelector("#studio-undo"),s=document.querySelector("#studio-redo");o&&(o.disabled=P.length===0),s&&(s.disabled=gt.length===0)};let ht=null;const v=o=>{if(o&&ht!==o)return;if(!bt){ht=null;return}const s=bt,l=Qe;bt=null,ht=null,!(ti(s,e)&&l===_)&&(P.push(s),rt.push(l),P.length>Ve&&(P.shift(),rt.shift()),gt=[],zt=[],tt())},M=o=>{o&&ht===o&&bt||(v(),bt=Ct(e),Qe=_,ht=o??null)},wi=o=>{const s=Number(o.min),l=Number(o.max),c=Number(o.value),p=l>s?(c-s)/(l-s)*100:0;o.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,p))}%`)};let Se=e.cardHeight/Math.max(1,e.cardWidth),et={cardWidth:e.cardWidth,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY};const Zt=()=>{Se=e.cardHeight/Math.max(1,e.cardWidth),et={cardWidth:e.cardWidth,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY}};let N=null,kt=1,it=[];const Si=()=>e.imageWidth*kt,Jt=()=>{e.cardWidth=X(e.cardWidth),e.cardHeight=X(e.cardHeight),e.imageWidth=Ht(e.imageWidth)},ot=(o,s,l)=>{o.value=String(l),document.activeElement!==s&&(s.value=String(l))},Mi=()=>{const o=fe(e.cardWidth),s=String(Math.max(o,e.titleSize)),l=String(Math.max(o,e.bodySize));for(const c of[S,H])c.min="5",c.max=s;for(const c of[G,B])c.min="5",c.max=l;ot(a,d,e.cardWidth),ot(f,h,e.cardWidth),ot(m,b,e.cardHeight),ot(S,H,e.titleSize),ot(G,B,e.bodySize),ot(Pt,Ot,e.imageWidth)},Me=()=>{E.value=String(e.radius),E.setAttribute("aria-valuenow",String(e.radius)),A.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},Ee=(o,s)=>{e.themeSlug=o;for(const l of t.querySelectorAll("[data-theme-slug]")){const c=l.dataset.themeSlug===o;l.setAttribute("aria-checked",c?"true":"false"),l.tabIndex=c?0:-1,c&&s&&l.focus()}I()},Vt=o=>{var p,x;e.panel=o;const s=o==="design";(p=t.querySelector("#studio-panel-design"))==null||p.toggleAttribute("hidden",!s),(x=t.querySelector("#studio-panel-code"))==null||x.toggleAttribute("hidden",s);const l=t.querySelector("#studio-tab-design"),c=t.querySelector("#studio-tab-code");l==null||l.setAttribute("aria-selected",s?"true":"false"),c==null||c.setAttribute("aria-selected",s?"false":"true"),l&&(l.tabIndex=s?0:-1),c&&(c.tabIndex=s?-1:0),I()},Ei=()=>{r.value=e.presetId,document.activeElement!==g&&(g.value=e.title),document.activeElement!==L&&(L.value=e.body),document.activeElement!==y&&(w.value=e.titleColor,y.value=e.titleColor),document.activeElement!==j&&(lt.value=e.bodyColor,j.value=e.bodyColor),document.activeElement!==St&&(Bt.value=e.color,St.value=e.color),T.value=e.titleFontId,V.value=e.bodyFontId,document.activeElement!==R&&(R.value=e.code);for(const o of t.querySelectorAll("[data-theme-slug]")){const s=o.dataset.themeSlug===e.themeSlug;o.setAttribute("aria-checked",s?"true":"false"),o.tabIndex=s?0:-1}},I=async()=>{const o=++It;Jt(),Ei(),Mi(),t.querySelectorAll('input[type="range"]').forEach(wi);const s=_t(e.presetId),l=e.cardWidth===s.width&&e.cardHeight===s.height,c=l&&s.safe?` · 안전 영역 ${s.safe.width} × ${s.safe.height}`:"";be.textContent=`${e.cardWidth} × ${e.cardHeight} · ${s.name}${c}`,jt.textContent=ue(),Me(),Q(),l&&s.safe?(ct.hidden=!1,ct.style.width=`${s.safe.width}px`,ct.style.height=`${s.safe.height}px`):ct.hidden=!0;const p=(mt,Ii,ki)=>{var Xe;const De=(Xe=$t(mt,wt()).split(",")[0])==null?void 0:Xe.replaceAll('"',"").trim();return De?document.fonts.load(`${Ii} ${ki}px "${De}"`):Promise.resolve()};try{await Promise.all([p(e.titleFontId,600,e.titleSize),p(e.bodyFontId,400,e.bodySize)])}catch{}if(o!==It)return;const x=$e();if(e.code.trim()){$.hidden=!0,Mt.hidden=!1;const mt=x?await ii(x):"";if(o!==It)return;Mt.srcdoc=Oi(ni(e,mt));return}if(Mt.hidden=!0,$.hidden=!1,x)try{N=await yi(x),N.naturalWidth>0&&(kt=N.naturalHeight/N.naturalWidth)}catch{N=null,kt=1}else N=null,kt=1;o===It&&(Jt(),it=oe($,e,N))},nt=(o,s,l,c)=>{o.addEventListener("pointerdown",()=>M(o)),o.addEventListener("keydown",()=>M(o)),o.addEventListener("pointerup",()=>v(o)),o.addEventListener("pointercancel",()=>v(o)),o.addEventListener("keyup",()=>v(o)),o.addEventListener("input",()=>{l(Number(o.value)),I()});const p=()=>{Jt(),s.value=String(c()),v(s)};s.addEventListener("focus",()=>M(s)),s.addEventListener("input",()=>{s.value.trim()!==""&&(l(Number(s.value)),I())}),s.addEventListener("change",p),s.addEventListener("blur",p)};r.addEventListener("focus",()=>M(r)),r.addEventListener("change",()=>{const o=_t(r.value);e.presetId=o.id,e.cardWidth=o.width,e.cardHeight=o.height,v(r),I()}),r.addEventListener("blur",()=>v(r)),a.addEventListener("pointerdown",Zt),a.addEventListener("keydown",Zt),d.addEventListener("focus",Zt),nt(a,d,o=>{const s=Kt(e.cardWidth,e.cardHeight)*_,l=qi(Math.max(1,e.cardWidth),Math.max(1,Math.round(e.cardWidth*Se)),o);e.cardWidth=l.cardWidth,e.cardHeight=l.cardHeight;const c=e.cardWidth/Math.max(1,et.cardWidth);e.imageWidth=Ht(et.imageWidth*c);const p=e.imageWidth/Math.max(1,et.imageWidth);e.imageX=Math.round(et.imageX*p),e.imageY=Math.round(et.imageY*p);const x=Kt(e.cardWidth,e.cardHeight);x>0&&Number.isFinite(s)&&s>0&&(_=s/x)},()=>e.cardWidth),nt(f,h,o=>{e.cardWidth=X(o),e.titleSize=Y(e.titleSize,e.cardWidth),e.bodySize=Y(e.bodySize,e.cardWidth)},()=>e.cardWidth),nt(m,b,o=>{e.cardHeight=o},()=>e.cardHeight),nt(S,H,o=>{e.titleSize=Y(o,e.cardWidth)},()=>e.titleSize),nt(G,B,o=>{e.bodySize=Y(o,e.cardWidth)},()=>e.bodySize),nt(Pt,Ot,o=>{e.imageWidth=o},()=>e.imageWidth);const Le=(o,s)=>{o.addEventListener("focus",()=>M(o)),o.addEventListener("change",()=>{s(),v(o),I()}),o.addEventListener("blur",()=>v(o))};Le(T,()=>{e.titleFontId=T.value}),Le(V,()=>{e.bodyFontId=V.value}),(Fe=t.querySelector("#studio-reset"))==null||Fe.addEventListener("click",()=>{v();const o=Ct(e),s=_;n(),(!ti(o,e)||s!==_)&&(P.push(o),rt.push(s),P.length>Ve&&(P.shift(),rt.shift()),gt=[],zt=[]),tt()}),g.addEventListener("focus",()=>M(g)),g.addEventListener("input",()=>{e.title=g.value,I()}),g.addEventListener("blur",()=>v(g)),L.addEventListener("focus",()=>M(L)),L.addEventListener("input",()=>{e.body=L.value,I()}),L.addEventListener("blur",()=>v(L));const Qt=(o,s,l,c)=>{o.addEventListener("pointerdown",()=>M(o)),o.addEventListener("change",()=>v(o)),o.addEventListener("input",()=>{const p=F(o.value);p&&(l(p),s.value=p,I())}),s.addEventListener("focus",()=>M(s)),s.addEventListener("input",()=>{const p=F(s.value);p&&(l(p),o.value=p,I())}),s.addEventListener("blur",()=>{F(s.value)||(s.value=c()),v(s)})};Qt(Bt,St,o=>{e.color=o},()=>e.color),Qt(w,y,o=>{e.titleColor=o},()=>e.titleColor),Qt(lt,j,o=>{e.bodyColor=o},()=>e.bodyColor);const Ie=o=>{e.radius=ci(Number(o)),Me(),I()};E.addEventListener("pointerdown",()=>M(E)),E.addEventListener("keydown",()=>M(E)),E.addEventListener("pointerup",()=>v(E)),E.addEventListener("pointercancel",()=>v(E)),E.addEventListener("keyup",()=>v(E)),E.addEventListener("input",()=>Ie(E.value)),A.addEventListener("focus",()=>M(A)),A.addEventListener("input",()=>Ie(A.value)),A.addEventListener("blur",()=>v(A)),A.addEventListener("change",()=>v(A)),R.addEventListener("focus",()=>M(R)),R.addEventListener("input",()=>{e.code=R.value,I()}),R.addEventListener("blur",()=>v(R));const ke=(o,s)=>{Object.assign(e,o),_=s,tt(),I()};ve.addEventListener("click",()=>{v();const o=P.pop(),s=rt.pop();if(!o||s===void 0){tt();return}gt.push(Ct(e)),zt.push(_),ke(o,s)}),_e.addEventListener("click",()=>{v();const o=gt.pop(),s=zt.pop();if(!o||s===void 0){tt();return}P.push(Ct(e)),rt.push(_),ke(o,s)}),tt(),(He=t.querySelector("#studio-tab-design"))==null||He.addEventListener("click",()=>Vt("design")),(Te=t.querySelector("#studio-tab-code"))==null||Te.addEventListener("click",()=>Vt("code")),(Re=t.querySelector(".studio__tabs"))==null||Re.addEventListener("keydown",o=>{var l;if(!(o instanceof KeyboardEvent)||o.key!=="ArrowRight"&&o.key!=="ArrowLeft")return;o.preventDefault();const s=e.panel==="design"?"code":"design";Vt(s),(l=t.querySelector(s==="design"?"#studio-tab-design":"#studio-tab-code"))==null||l.focus()});const pt=[...t.querySelectorAll("[data-theme-slug]")];for(const o of pt)o.addEventListener("click",()=>{const s=o.dataset.themeSlug;!s||s===e.themeSlug||(M(o),Ee(s,!1),v(o))});(Ne=t.querySelector(".studio__themes"))==null||Ne.addEventListener("keydown",o=>{if(!(o instanceof KeyboardEvent))return;const s=o.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(s))return;o.preventDefault();const l=pt.findIndex(mt=>mt.dataset.themeSlug===e.themeSlug),p=pt[(l+(s==="ArrowLeft"||s==="ArrowUp"?-1:1)+pt.length)%pt.length],x=p==null?void 0:p.dataset.themeSlug;!x||x===e.themeSlug||(M(p),Ee(x,!0),v(p))}),(Pe=t.querySelector("#studio-copy"))==null||Pe.addEventListener("click",async()=>{const o=ue();jt.textContent=o;try{await navigator.clipboard.writeText(o)}catch{const l=document.createElement("textarea");l.value=o,document.body.append(l),l.select(),document.execCommand("copy"),l.remove()}const s=t.querySelector("#studio-copy");s&&(s.textContent="복사됨",window.setTimeout(()=>{s.textContent="현재 디자인을 코드로 복사"},1200))}),(Oe=t.querySelector("#studio-download"))==null||Oe.addEventListener("click",()=>{(async()=>{const o=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){si($,o);return}const s=$e(),l=s?await ii(s):"",c=document.createElement("canvas");await vo(c,pi(ni(e,l)),e.cardWidth,e.cardHeight),si(c,o)})()});const We=o=>{const s=$.getBoundingClientRect();return{x:s.width>0?(o.clientX-s.left)/s.width*e.cardWidth:0,y:s.height>0?(o.clientY-s.top)/s.height*e.cardHeight:0}},ze=(o,s)=>{for(let c=it.length-1;c>=0;c-=1){const p=it[c];if(p&&o>=p.x-8&&s>=p.y-8&&o<=p.x+p.w+8&&s<=p.y+p.h+8)return p}return null},Li=o=>{const s=$.getContext("2d");if(!s)return;const l=$.getBoundingClientRect().width,c=l>0?e.cardWidth/l:1;s.save(),s.lineJoin="round",s.lineCap="round",s.strokeStyle="rgba(0, 0, 0, 0.7)",s.lineWidth=c*3,s.strokeRect(o.x,o.y,Math.max(c,o.w),Math.max(c,o.h)),s.strokeStyle="rgba(255, 255, 255, 0.92)",s.lineWidth=c*1.5,s.strokeRect(o.x,o.y,Math.max(c,o.w),Math.max(c,o.h)),s.restore()},Ce=()=>{if(!k)return;const o=it.find(s=>s.kind===(k==null?void 0:k.kind));o&&Li(o)};let k=null;$.addEventListener("pointerdown",o=>{if(e.code.trim())return;const s=We(o),l=ze(s.x,s.y);if(l){try{$.setPointerCapture(o.pointerId)}catch{}M($),k={kind:l.kind,dx:s.x-l.x,dy:s.y-l.y,pointerId:o.pointerId},$.dataset.dragging="true",Ce()}}),$.addEventListener("pointermove",o=>{const s=We(o);if(!k||k.pointerId!==o.pointerId){$.dataset.hover=ze(s.x,s.y)?"true":"false";return}const l=s.x-k.dx,c=s.y-k.dy;k.kind==="title"?(e.titleX=U(l,e.cardWidth,e.titleSize),e.titleY=U(c,e.cardHeight,e.titleSize)):k.kind==="body"?(e.bodyX=U(l,e.cardWidth,e.bodySize),e.bodyY=U(c,e.cardHeight,e.bodySize)):(e.imageX=je(l,e.cardWidth,e.imageWidth),e.imageY=je(c,e.cardHeight,Si())),it=oe($,e,N),Ce()});const Ae=o=>{!k||k.pointerId!==o.pointerId||(k=null,delete $.dataset.dragging,v($),it=oe($,e,N))};$.addEventListener("pointerup",Ae),$.addEventListener("pointercancel",Ae);const te=o=>{const s=Gt.getBoundingClientRect().width,l=at+le+ce,c=Number.isFinite(o)?o:e.controlsWidth;e.controlsWidth=s>=l?Fi(c,s):Math.max(at,Math.round(c)),Gt.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),z.setAttribute("aria-valuenow",String(e.controlsWidth)),z.setAttribute("aria-valuemax",String(s>=l?Math.max(at,Math.round(s)-le-ce):e.controlsWidth)),Q()};te(e.controlsWidth),z.addEventListener("pointerdown",o=>{if(window.matchMedia("(max-width: 767px)").matches)return;try{z.setPointerCapture(o.pointerId)}catch{}const s=o.clientX,l=e.controlsWidth,c=x=>{x.pointerId===o.pointerId&&te(l+x.clientX-s)},p=x=>{x.pointerId===o.pointerId&&(z.removeEventListener("pointermove",c),z.removeEventListener("pointerup",p),z.removeEventListener("pointercancel",p))};z.addEventListener("pointermove",c),z.addEventListener("pointerup",p),z.addEventListener("pointercancel",p)}),z.addEventListener("keydown",o=>{if(o.key!=="ArrowLeft"&&o.key!=="ArrowRight")return;o.preventDefault();const s=o.shiftKey?48:16;te(e.controlsWidth+(o.key==="ArrowRight"?s:-s))}),(Be=t.querySelector("#studio-controls"))==null||Be.addEventListener("submit",o=>{o.preventDefault()}),yt==null||yt.disconnect(),yt=new ResizeObserver(()=>Q()),yt.observe(Lt),I()}const vi="ax-design-studio-mode",ri="./data/index.json";let q={status:"loading"},Nt=Rt(),_i="all",O=null,ne=null,W=he();function me(){const t=localStorage.getItem(vi);return t==="light"||t==="dark"?t:"dark"}function ai(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(vi,t)}function se(t,e,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${e}" ${i?'aria-current="page"':""}>${t}</a>`}function xo(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function $i(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=ge(t);return e?Tt(e.r,e.g,e.b):F(t)??Tt(216,241,255)}function wo(t,e){var n;const i=t&&e.some(r=>r.slug===t)?t:null;return O?(t&&t!==ne&&i&&(O.themeSlug=i,ne=t),O):(O=ui(i??((n=e[0])==null?void 0:n.slug)??"",$i()),ne=t,O)}function So(t){const e=me(),i=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",n=W.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${se("Graphic Library",J({name:"archive"}),W.name==="archive"||W.name==="capture")}
        ${se("Online Marketing Studio",J({name:"studio",theme:null}),W.name==="studio")}
        ${se("History",J({name:"history"}),W.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${xo(e)}
        </button>
      </div>
    </header>
    <main class="shell${n?" shell--studio":""}" id="main">${t}</main>
  `}function Mo(){if(q.status==="loading")return`
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
    `;const t=q.index;switch(W.name){case"archive":return Ji(t,Nt,_i);case"capture":return uo(t,W.slug,Nt);case"studio":return _o(wo(W.theme,t.captures),t.captures);case"history":return po(t);case"notfound":return mo(W.path)}}function Z(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");ai(me()),Nt=Rt(),t.innerHTML=So(Mo()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{ai(me()==="dark"?"light":"dark"),Z()}),q.status==="ready"&&(W.name==="archive"&&Vi(t,{onTabChange:i=>{var n;_i=i,Z(),(n=document.querySelector(`[data-archive-tab="${i}"]`))==null||n.focus()}}),W.name==="capture"&&ho(t,i=>{Nt=Di(i),Z()}),W.name==="studio"&&q.status==="ready"&&O&&$o(t,O,q.index.captures,()=>{var i;O&&(Ti(O,$i()),Z(),(i=document.querySelector("#studio-reset"))==null||i.focus())}))}async function Eo(){q={status:"loading"},Z();try{const t=await fetch(ri,{cache:"no-store"});if(!t.ok)throw new Error(`${ri} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");q={status:"ready",index:e}}catch(t){q={status:"error",message:t instanceof Error?t.message:String(t)}}Z()}Yi(t=>{if(bi(window.location.hash)){window.location.replace(J({name:"studio",theme:null}));return}W=t,Z()});Eo();
