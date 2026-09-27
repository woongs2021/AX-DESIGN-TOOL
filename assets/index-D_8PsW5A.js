(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}})();const Ii="ig-feed-square",ne=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function vt(t){return ne.find(e=>e.id===t)??ne[0]}const yt=0,Ct=120,ki=28,B=100,K=4e3,se=5,ri=10,At=100,re=4e3,st=240,ai=360,ae=280,de=6,Wi="시즌",Ci=`새로운 컬렉션
브랜드의 첫 인상을 한 장으로 전합니다.`,zt=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Be="rgb(0, 0, 0)",Ue="rgb(255, 255, 255)";function di(t){return Number.isFinite(t)?Math.min(Ct,Math.max(yt,Math.round(t))):yt}function U(t){return Number.isFinite(t)?Math.min(K,Math.max(B,Math.round(t))):B}function Ai(t,e,i){const n=Math.max(1,Math.round(t)),a=Math.max(1,Math.round(e))/n;let d=U(i);const f=Math.round(d*a);let h=U(f);return f!==h&&(d=U(Math.round(h/a)),h=U(Math.round(d*a))),{cardWidth:d,cardHeight:h}}function pe(t){return Math.max(se,U(t)-ri*2)}function X(t,e){const i=pe(e);return Number.isFinite(t)?Math.min(i,Math.max(se,Math.round(t))):se}function me(t){return Number.isFinite(t)?Math.min(re,Math.max(At,Math.round(t))):At}function Y(t,e,i){const n=Math.max(0,Math.round(e)-Math.min(Math.max(i,0),Math.round(e)));return Number.isFinite(t)?Math.min(n,Math.max(0,Math.round(t))):0}function Xe(t,e,i){const n=Math.round(-i+40),r=Math.round(e-40);return Number.isFinite(t)?n>r?Math.round((e-i)/2):Math.min(r,Math.max(n,Math.round(t))):0}function zi(t,e){const i=Math.max(st,Math.round(e)-ae-de);return Number.isFinite(t)?Math.min(i,Math.max(st,Math.round(t))):ai}function qi(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function _t(t,e=[]){var n;const i=zt.find(r=>r.id===t);return i?i.stack:((n=e.find(r=>r.id===t))==null?void 0:n.stack)??zt[0].stack}function li(t,e){const i=vt(Ii),n=X(Math.round(i.width*.046),i.width),r=X(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:Wi,body:Ci,themeSlug:t,color:e,radius:ki,code:"",panel:"design",controlsWidth:ai,titleSize:n,bodySize:r,titleX:Y(Math.round(i.width*.06),i.width,n),titleY:Y(a,i.height,n),bodyX:Y(Math.round(i.width*.06),i.width,r),bodyY:Y(a+Math.round(n*1.6),i.height,r),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:$t(e),bodyColor:$t(e),imageWidth:me(i.width),imageX:0,imageY:0}}function Fi(t,e){const i=li(t.themeSlug,e);i.controlsWidth=t.controlsWidth,i.panel=t.panel,Object.assign(t,i)}function F(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function qt(t,e,i){const n=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${n(t)}${n(e)}${n(i)}`}function fe(t){const e=F(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const i=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function ot(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function Ye(t,e){const i=.2126*ot(t.r)+.7152*ot(t.g)+.0722*ot(t.b),n=.2126*ot(e.r)+.7152*ot(e.g)+.0722*ot(e.b),r=Math.max(i,n),a=Math.min(i,n);return(r+.05)/(a+.05)}function $t(t){const e=fe(ci(t));return e?qt(e.r,e.g,e.b):qt(0,0,0)}function ci(t){const e=fe(t)??{r:255,g:255,b:255},i=Ye({r:0,g:0,b:0},e),n=Ye({r:255,g:255,b:255},e);return i>=4.5&&i>=n?Be:n>=4.5?Ue:i>=n?Be:Ue}function Hi(t,e,i){if(e<=0)return[];const n=[];for(const r of t.split(`
`)){const a=r.split(/\s+/).filter(Boolean);if(a.length===0){n.push("");continue}let d="";const f=h=>{if(i(h)<=e){d=h;return}let p="";for(const b of h){const g=p+b;i(g)<=e?p=g:(p&&n.push(p),p=b)}d=p};for(const h of a){const p=d?`${d} ${h}`:h;i(p)<=e?d=p:(d&&n.push(d),f(h))}d&&n.push(d)}return n}function Qt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ri(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Ti(t,e){return Ri(t).replaceAll("{{title}}",Qt(e.title)).replaceAll("{{body}}",Qt(e.body)).replaceAll("{{themeImage}}",Qt(e.themeImage))}function le(){return`<article class="studio-card">
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
</style>`}function ui(t){const e=F(t.color)??t.color,i=ci(e),n=F(t.titleColor)??$t(e),r=F(t.bodyColor)??$t(e),a=di(t.radius),d=vt("ig-feed-square"),f=t.width>0?t.width:d.width,h=t.height>0?t.height:d.height,p=t.titleFontStack.replaceAll(";",""),b=t.bodyFontStack.replaceAll(";",""),g=Ti(t.code.trim()||le(),t),x=[`--studio-color:${e}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${f}px`,`--studio-height:${h}px`,`--studio-title-font:${p}`,`--studio-body-font:${b}`,`--studio-title-size:${X(t.titleSize,f)}px`,`--studio-body-size:${X(t.bodySize,f)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${me(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${n}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${h}px;margin:0;background:transparent;${x}">${g}</div>`}function Ni(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${ui(t)}</body>
</html>`}const hi="design-llm-wiki-pins";function Ft(){try{const t=localStorage.getItem(hi);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(i=>typeof i=="string"):[]}catch{return[]}}function Pi(t){const e=[...new Set(t)];localStorage.setItem(hi,JSON.stringify(e))}function Oi(t){const e=Ft(),i=e.includes(t)?e.filter(n=>n!==t):[...e,t];return Pi(i),Ft()}const pi="[a-z0-9]+(?:-[a-z0-9]+)*";function mi(t){const e=t.startsWith("#")?t.slice(1):t,i=e.indexOf("?"),n=i>=0?e.slice(0,i):e,r=i>=0?e.slice(i+1):"",a=n.startsWith("/")?n:`/${n}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:r}}function Di(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${pi}$`).test(e)?null:e}function fi(t){const{path:e}=mi(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function ce(t=window.location.hash){const{path:e,query:i}=mi(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||fi(t))return{name:"studio",theme:e==="/studio"?Di(i):null};const n=e.match(new RegExp(`^/capture/(${pi})$`));return n?{name:"capture",slug:n[1]}:{name:"notfound",path:e}}function J(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function Bi(t){const e=()=>t(ce());return window.addEventListener("hashchange",e),t(ce()),()=>window.removeEventListener("hashchange",e)}function Ui(t){return[...t].sort((e,i)=>e.capturedAt!==i.capturedAt?e.capturedAt<i.capturedAt?1:-1:e.slug.localeCompare(i.slug))}function u(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function rt(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let It=null;function Xi(t){const e=t.querySelector(".archive-tabs__indicator"),i=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!i)return;const n=i.offsetLeft,r=i.offsetWidth;It&&(e.style.transition="none",e.style.transform=`translateX(${It.left}px)`,e.style.width=`${It.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${n}px)`,e.style.width=`${r}px`,It={left:n,width:r}})}function te(t){const e=t.querySelector(".capture-grid");if(!e)return;const i=window.getComputedStyle(e),n=Number.parseFloat(i.gridAutoRows)||1,r=Number.parseFloat(i.rowGap)||0;e.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,h=Math.ceil((d+f+r)/(n+r));a.style.gridRowEnd=`span ${Math.max(1,h)}`})}function Yi(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${u(rt(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function ji(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${J({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${Yi(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${u(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${u(t.title)}</h2>
          <p class="capture-card__insight">${u(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Gi(t,e){const i=new Set(e),n=Ui(t),r=n.filter(p=>i.has(p.slug)),a=n.filter(p=>!i.has(p.slug)),d=new Map(n.map(p=>[p.slug,p])),f=e.map(p=>d.get(p)).filter(p=>!!p),h=r.filter(p=>!e.includes(p.slug));return[...f,...h,...a]}function Ki(t,e,i){const n=new Set(e),r=i==="pin"?t.captures.filter(d=>n.has(d.slug)):t.captures,a=Gi(r,e);return t.captures.length===0?`
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
              </section>`:`<div class="capture-grid">${a.map(d=>ji(d,e.includes(d.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Zi(t,e){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.archiveTab;(a==="all"||a==="pin")&&e.onTabChange(a)})}),Xi(t),requestAnimationFrame(()=>te(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>te(t),{once:!0})});const i=new ResizeObserver(()=>te(t)),n=t.querySelector(".capture-grid");n&&i.observe(n)}function Ji(t){const e=t.replace(/\r\n/g,`
`).split(`
`),i=[];let n=!1;const r=()=>{n&&(i.push("</ul>"),n=!1)};for(const a of e){const d=a.trim();if(!d){r();continue}if(d.startsWith("### ")){r(),i.push(`<h3>${mt(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){r(),i.push(`<h2>${mt(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){r(),i.push(`<h1>${mt(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){n||(i.push("<ul>"),n=!0),i.push(`<li>${mt(d.slice(2))}</li>`);continue}r(),i.push(`<p>${mt(d)}</p>`)}return r(),i.join(`
`)}function mt(t){let e=u(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,n)=>`<a href="${J({name:"capture",slug:n})}">${n}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,n,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${n}</span>`:`<a href="${u(r)}">${n}</a>`),e}const Vi=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Qi(t){return Math.max(35,Math.min(98,Math.round(t)))}function to(t){let e=0;for(const i of t)e=(e*31+i.charCodeAt(0))%997;return e}function eo(t){var p;if((p=t.analysisScores)!=null&&p.length)return t.analysisScores;const e=to(`${t.slug}:${t.title}:${t.insight}`),i=t.tags.includes("density")?7:0,n=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),a=t.asset.width/Math.max(1,t.asset.height),d=a>1.2?6:0,f=a<.75?5:0,h=[68+r+d+e%9,66+i+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+n+(t.uiPatterns.includes("filter-chips")?7:0),62+f+r+(e>>3)%8].map(Qi);return Vi.map(([b,g],x)=>({key:b,label:g,score:h[x]??60,description:oo(g,h[x]??60,t)}))}function io(t){return t.length===0?0:Math.round(t.reduce((e,i)=>e+i.score,0)/t.length)}function oo(t,e,i){return t==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function no(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function so(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${u(rt(t.asset.posterPath))}"`:""}>
        <source src="${u(rt(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${u(rt(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function ro(t){const e=eo(t),i=t.analysisTotal??io(e),n=160,r=110,a=[.25,.5,.75,1].map(h=>e.map((p,b)=>{const g=-Math.PI/2+b*Math.PI*2/e.length,x=n+Math.cos(g)*r*h,y=n+Math.sin(g)*r*h;return`${x.toFixed(1)},${y.toFixed(1)}`}).join(" ")).map(h=>`<polygon class="spider-grid" points="${h}" />`).join(""),d=e.map((h,p)=>{const b=-Math.PI/2+p*Math.PI*2/e.length,g=r*(h.score/100),x=n+Math.cos(b)*g,y=n+Math.sin(b)*g;return`${x.toFixed(1)},${y.toFixed(1)}`}).join(" "),f=e.map((h,p)=>{const b=-Math.PI/2+p*Math.PI*2/e.length,g=n+Math.cos(b)*r,x=n+Math.sin(b)*r,y=n+Math.cos(b)*r*(h.score/100),w=n+Math.sin(b)*r*(h.score/100),H=n+Math.cos(b)*(r+26),L=n+Math.sin(b)*(r+26);return`
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
  `}function ao(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${u(i)}</span>`).join("")}function lo(t,e,i){const n=t.captures.find(a=>a.slug===e);if(!n)return`
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

      <div class="detail__media-wrap detail__hero">${so(n)}</div>

      ${ro(n)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${u(n.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${u(n.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${n.asset.width} × ${n.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${no(n.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${n.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${n.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${u(n.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${ao(n)}
        </p>
        <p class="detail__meta-line">
          ${u(n.screenType)} · ${u(n.tone)} · ${u(n.copyTone)} · ${u(n.capturedAt)}
          ${n.sourceUrl?` · <a href="${u(n.sourceUrl)}">${u(n.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Ji(n.body)}
      </section>
    </article>
  `}function co(t,e){var i;(i=t.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",n=>{const r=n.currentTarget.dataset.pinSlug;r&&e(r)})}function uo(t){const e=t.wiki.logEntries;return e.length===0?`
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
  `}function ho(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${u(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const je=.5,Ge=3,Ke=.25,Ze=40;let $=1,P=[],ft=[],nt=[],kt=[],gt=null,Je=1;function Wt(t){return{...t}}function Ve(t,e){return JSON.stringify(t)===JSON.stringify(e)}const ue=new Map,Qe=new Map;function gi(t){const e=ue.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((i,n)=>{const r=e??new Image;r.onload=()=>i(r),r.onerror=()=>n(new Error(`Image failed: ${t}`)),e||(ue.set(t,r),r.src=t)})}function ti(t){const e=Qe.get(t);if(e)return e;const i=fetch(t).then(n=>{if(!n.ok)throw new Error(`Theme image HTTP ${n.status}`);return n.blob()}).then(n=>new Promise((r,a)=>{const d=new FileReader;d.onload=()=>r(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(n)}));return Qe.set(t,i),i}const po=Object.assign({}),ei=new Set;function mo(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function xt(){const t=new Set(zt.map(i=>i.label.toLowerCase())),e=[];for(const[i,n]of Object.entries(po)){const r=qi(i);if(!r||t.has(r.toLowerCase()))continue;const a=`local:${r}`;if(!e.some(d=>d.id===a)){if(!ei.has(r)){ei.add(r);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${n}") format("${mo(n)}");font-display:swap;}`,document.head.append(d)}e.push({id:a,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return e}function fo(){return[...zt,...xt()]}function go(t,e,i,n){const r=Math.max(0,Math.min(n,e/2,i/2));t.beginPath(),t.roundRect(0,0,e,i,r)}function ii(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:_t(t.titleFontId,xt()),bodyFontStack:_t(t.bodyFontId,xt()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function ee(t,e,i){const n=t.getContext("2d");if(!n)return[];const r=e.cardWidth,a=e.cardHeight;t.width=r,t.height=a,n.clearRect(0,0,r,a),n.save(),go(n,r,a,e.radius),n.clip(),n.fillStyle=e.color,n.fillRect(0,0,r,a);const d=[];if(i&&i.naturalWidth>0){const b=e.imageWidth,g=b*(i.naturalHeight/i.naturalWidth);n.drawImage(i,e.imageX,e.imageY,b,g),d.push({kind:"image",x:e.imageX,y:e.imageY,w:b,h:g})}const f=Math.max(1,r-ri*2);n.textBaseline="top";const h=(b,g,x,y,w,H,L,at)=>{if(!g.trim())return;n.fillStyle=at,n.font=`${H} ${w}px ${L}`;const j=Hi(g.trim(),f,R=>n.measureText(R).width),G=Math.round(w*1.25);let D=0;j.forEach((R,V)=>{n.fillText(R,x,y+V*G),D=Math.max(D,n.measureText(R).width)}),d.push({kind:b,x,y,w:Math.max(D,w),h:Math.max(j.length,1)*G})},p=xt();return h("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,_t(e.bodyFontId,p),e.bodyColor),h("title",e.title,e.titleX,e.titleY,e.titleSize,600,_t(e.titleFontId,p),e.titleColor),n.restore(),d}function oi(t,e){t.toBlob(i=>{if(!i)return;const n=URL.createObjectURL(i),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)},"image/png")}async function bo(t,e,i,n){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${n}"><foreignObject x="0" y="0" width="${i}" height="${n}">${e}</foreignObject></svg>`,a=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const f=await gi(d),h=t.getContext("2d");if(!h)return;t.width=i,t.height=n,h.clearRect(0,0,i,n),h.drawImage(f,0,0,i,n)}finally{URL.revokeObjectURL(d),ue.delete(d)}}let bt=null;function yo(t,e){if(e.length===0)return`
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
          <img src="${u(rt(y.asset.path))}" alt="${u(y.title)}" />
        </button>
      `}).join(""),f=t.panel==="design",h=fo(),p=pe(t.cardWidth),b=y=>h.map(w=>`<option value="${u(w.id)}"${w.id===y?" selected":""}>${u(w.label)}</option>`).join("");return`
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
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${st}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
            </div>
            <button type="button" class="button" id="studio-download">PNG 다운로드</button>
          </div>
        </div>
      </div>
    </section>
  `}function vo(t,e,i,n){var ze,qe,Fe,He,Re,Te,Ne,Pe;if(i.length===0)return;const r=t.querySelector("#studio-preset"),a=t.querySelector("#studio-size"),d=t.querySelector("#studio-size-number"),f=t.querySelector("#studio-width"),h=t.querySelector("#studio-width-number"),p=t.querySelector("#studio-height"),b=t.querySelector("#studio-height-number"),g=t.querySelector("#studio-title"),x=t.querySelector("#studio-title-color"),y=t.querySelector("#studio-title-hex"),w=t.querySelector("#studio-title-size"),H=t.querySelector("#studio-title-size-number"),L=t.querySelector("#studio-body"),at=t.querySelector("#studio-body-color"),j=t.querySelector("#studio-body-hex"),G=t.querySelector("#studio-body-size"),D=t.querySelector("#studio-body-size-number"),R=t.querySelector("#studio-title-font"),V=t.querySelector("#studio-body-font"),Rt=t.querySelector("#studio-image-width"),Tt=t.querySelector("#studio-image-width-number"),Nt=t.querySelector("#studio-color"),wt=t.querySelector("#studio-hex"),E=t.querySelector("#studio-radius"),z=t.querySelector("#studio-radius-number"),T=t.querySelector("#studio-code"),_=t.querySelector("#studio-canvas"),St=t.querySelector("#studio-iframe"),ge=t.querySelector("#studio-meta"),dt=t.querySelector("#studio-safe"),Mt=t.querySelector("#studio-scaler"),Pt=t.querySelector("#studio-fit"),Ot=t.querySelector("#studio-stage"),Dt=t.querySelector("#studio-zoom-out"),Bt=t.querySelector("#studio-zoom-in"),be=t.querySelector("#studio-zoom-label"),ye=t.querySelector("#studio-undo"),ve=t.querySelector("#studio-redo"),lt=t.querySelector("#studio-scroll-thumb"),Ut=t.querySelector(".studio__controls-wrap"),Xt=t.querySelector("#studio-export"),C=t.querySelector("#studio-splitter"),Yt=t.querySelector(".studio");if(!r||!a||!d||!f||!h||!p||!b||!g||!x||!y||!w||!H||!L||!at||!j||!G||!D||!R||!V||!Rt||!Tt||!Nt||!wt||!E||!z||!T||!_||!St||!ge||!dt||!Mt||!Pt||!Ot||!Dt||!Bt||!be||!ye||!ve||!lt||!Ut||!Xt||!C||!Yt)return;const _e=()=>{const o=i.find(s=>s.slug===e.themeSlug)??i[0];return o?rt(o.asset.path):""};let Et=0;const _i=()=>{(!Number.isFinite($)||$<=0)&&($=1),Dt.disabled=$<=je+.001,Bt.disabled=$>=Ge-.001,be.textContent=`${Math.round($*100)}%`},jt=(o,s)=>{const l=Ot.getBoundingClientRect(),c=48,m=Math.min(Math.max(l.width-c,1)/o,Math.max(l.height-c,1)/s);return Number.isFinite(m)&&m>0?m:1},ct=()=>{const o=jt(e.cardWidth,e.cardHeight);_i();const s=o*$;Pt.style.width=`${e.cardWidth*s}px`,Pt.style.height=`${e.cardHeight*s}px`,Mt.style.width=`${e.cardWidth}px`,Mt.style.height=`${e.cardHeight}px`,Mt.style.transform=`scale(${s})`};Dt.addEventListener("click",()=>{$=Math.max(je,$-Ke),ct()}),Bt.addEventListener("click",()=>{$=Math.min(Ge,$+Ke),ct()});const A=t.querySelector("#studio-controls");let $e=0;const xe=()=>{if(!A)return;const o=A.scrollHeight-A.clientHeight;if(o<=1){lt.hidden=!0;return}lt.hidden=!1;const s=Math.max(32,A.clientHeight/A.scrollHeight*A.clientHeight),l=Math.max(0,A.clientHeight-s);lt.style.height=`${s}px`,lt.style.transform=`translateY(${A.scrollTop/o*l}px)`};A==null||A.addEventListener("scroll",()=>{xe(),Ut.classList.add("is-scrolling"),window.clearTimeout($e),$e=window.setTimeout(()=>Ut.classList.remove("is-scrolling"),700)}),xe();const Q=()=>{const o=document.querySelector("#studio-undo"),s=document.querySelector("#studio-redo");o&&(o.disabled=P.length===0),s&&(s.disabled=ft.length===0)};let ut=null;const v=o=>{if(o&&ut!==o)return;if(!gt){ut=null;return}const s=gt,l=Je;gt=null,ut=null,!(Ve(s,e)&&l===$)&&(P.push(s),nt.push(l),P.length>Ze&&(P.shift(),nt.shift()),ft=[],kt=[],Q())},S=o=>{o&&ut===o&&gt||(v(),gt=Wt(e),Je=$,ut=o??null)},$i=o=>{const s=Number(o.min),l=Number(o.max),c=Number(o.value),m=l>s?(c-s)/(l-s)*100:0;o.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,m))}%`)};let we=e.cardHeight/Math.max(1,e.cardWidth);const Gt=()=>{we=e.cardHeight/Math.max(1,e.cardWidth)};let N=null,Lt=1,tt=[];const xi=()=>e.imageWidth*Lt,Kt=()=>{e.cardWidth=U(e.cardWidth),e.cardHeight=U(e.cardHeight),e.imageWidth=me(e.imageWidth)},et=(o,s,l)=>{o.value=String(l),document.activeElement!==s&&(s.value=String(l))},wi=()=>{const o=pe(e.cardWidth),s=String(Math.max(o,e.titleSize)),l=String(Math.max(o,e.bodySize));for(const c of[w,H])c.min="5",c.max=s;for(const c of[G,D])c.min="5",c.max=l;et(a,d,e.cardWidth),et(f,h,e.cardWidth),et(p,b,e.cardHeight),et(w,H,e.titleSize),et(G,D,e.bodySize),et(Rt,Tt,e.imageWidth)},Se=()=>{E.value=String(e.radius),E.setAttribute("aria-valuenow",String(e.radius)),z.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},Me=(o,s)=>{e.themeSlug=o;for(const l of t.querySelectorAll("[data-theme-slug]")){const c=l.dataset.themeSlug===o;l.setAttribute("aria-checked",c?"true":"false"),l.tabIndex=c?0:-1,c&&s&&l.focus()}I()},Zt=o=>{var m,M;e.panel=o;const s=o==="design";(m=t.querySelector("#studio-panel-design"))==null||m.toggleAttribute("hidden",!s),(M=t.querySelector("#studio-panel-code"))==null||M.toggleAttribute("hidden",s);const l=t.querySelector("#studio-tab-design"),c=t.querySelector("#studio-tab-code");l==null||l.setAttribute("aria-selected",s?"true":"false"),c==null||c.setAttribute("aria-selected",s?"false":"true"),l&&(l.tabIndex=s?0:-1),c&&(c.tabIndex=s?-1:0),I()},Si=()=>{r.value=e.presetId,document.activeElement!==g&&(g.value=e.title),document.activeElement!==L&&(L.value=e.body),document.activeElement!==y&&(x.value=e.titleColor,y.value=e.titleColor),document.activeElement!==j&&(at.value=e.bodyColor,j.value=e.bodyColor),document.activeElement!==wt&&(Nt.value=e.color,wt.value=e.color),R.value=e.titleFontId,V.value=e.bodyFontId,document.activeElement!==T&&(T.value=e.code);for(const o of t.querySelectorAll("[data-theme-slug]")){const s=o.dataset.themeSlug===e.themeSlug;o.setAttribute("aria-checked",s?"true":"false"),o.tabIndex=s?0:-1}},I=async()=>{const o=++Et;Kt(),Si(),wi(),t.querySelectorAll('input[type="range"]').forEach($i);const s=vt(e.presetId),l=e.cardWidth===s.width&&e.cardHeight===s.height,c=l&&s.safe?` · 안전 영역 ${s.safe.width} × ${s.safe.height}`:"";ge.textContent=`${e.cardWidth} × ${e.cardHeight} · ${s.name}${c}`,Xt.textContent=le(),Se(),ct(),l&&s.safe?(dt.hidden=!1,dt.style.width=`${s.safe.width}px`,dt.style.height=`${s.safe.height}px`):dt.hidden=!0;const m=(pt,Ei,Li)=>{var De;const Oe=(De=_t(pt,xt()).split(",")[0])==null?void 0:De.replaceAll('"',"").trim();return Oe?document.fonts.load(`${Ei} ${Li}px "${Oe}"`):Promise.resolve()};try{await Promise.all([m(e.titleFontId,600,e.titleSize),m(e.bodyFontId,400,e.bodySize)])}catch{}if(o!==Et)return;const M=_e();if(e.code.trim()){_.hidden=!0,St.hidden=!1;const pt=M?await ti(M):"";if(o!==Et)return;St.srcdoc=Ni(ii(e,pt));return}if(St.hidden=!0,_.hidden=!1,M)try{N=await gi(M),N.naturalWidth>0&&(Lt=N.naturalHeight/N.naturalWidth)}catch{N=null,Lt=1}else N=null,Lt=1;o===Et&&(Kt(),tt=ee(_,e,N))},it=(o,s,l,c)=>{o.addEventListener("pointerdown",()=>S(o)),o.addEventListener("keydown",()=>S(o)),o.addEventListener("pointerup",()=>v(o)),o.addEventListener("pointercancel",()=>v(o)),o.addEventListener("keyup",()=>v(o)),o.addEventListener("input",()=>{l(Number(o.value)),I()});const m=()=>{Kt(),s.value=String(c()),v(s)};s.addEventListener("focus",()=>S(s)),s.addEventListener("input",()=>{s.value.trim()!==""&&(l(Number(s.value)),I())}),s.addEventListener("change",m),s.addEventListener("blur",m)};r.addEventListener("focus",()=>S(r)),r.addEventListener("change",()=>{const o=vt(r.value);e.presetId=o.id,e.cardWidth=o.width,e.cardHeight=o.height,v(r),I()}),r.addEventListener("blur",()=>v(r)),a.addEventListener("pointerdown",Gt),a.addEventListener("keydown",Gt),d.addEventListener("focus",Gt),it(a,d,o=>{const s=jt(e.cardWidth,e.cardHeight)*$,l=Ai(Math.max(1,e.cardWidth),Math.max(1,Math.round(e.cardWidth*we)),o);e.cardWidth=l.cardWidth,e.cardHeight=l.cardHeight;const c=jt(e.cardWidth,e.cardHeight);c>0&&Number.isFinite(s)&&s>0&&($=s/c)},()=>e.cardWidth),it(f,h,o=>{e.cardWidth=U(o),e.titleSize=X(e.titleSize,e.cardWidth),e.bodySize=X(e.bodySize,e.cardWidth)},()=>e.cardWidth),it(p,b,o=>{e.cardHeight=o},()=>e.cardHeight),it(w,H,o=>{e.titleSize=X(o,e.cardWidth)},()=>e.titleSize),it(G,D,o=>{e.bodySize=X(o,e.cardWidth)},()=>e.bodySize),it(Rt,Tt,o=>{e.imageWidth=o},()=>e.imageWidth);const Ee=(o,s)=>{o.addEventListener("focus",()=>S(o)),o.addEventListener("change",()=>{s(),v(o),I()}),o.addEventListener("blur",()=>v(o))};Ee(R,()=>{e.titleFontId=R.value}),Ee(V,()=>{e.bodyFontId=V.value}),(ze=t.querySelector("#studio-reset"))==null||ze.addEventListener("click",()=>{v();const o=Wt(e),s=$;n(),(!Ve(o,e)||s!==$)&&(P.push(o),nt.push(s),P.length>Ze&&(P.shift(),nt.shift()),ft=[],kt=[]),Q()}),g.addEventListener("focus",()=>S(g)),g.addEventListener("input",()=>{e.title=g.value,I()}),g.addEventListener("blur",()=>v(g)),L.addEventListener("focus",()=>S(L)),L.addEventListener("input",()=>{e.body=L.value,I()}),L.addEventListener("blur",()=>v(L));const Jt=(o,s,l,c)=>{o.addEventListener("pointerdown",()=>S(o)),o.addEventListener("change",()=>v(o)),o.addEventListener("input",()=>{const m=F(o.value);m&&(l(m),s.value=m,I())}),s.addEventListener("focus",()=>S(s)),s.addEventListener("input",()=>{const m=F(s.value);m&&(l(m),o.value=m,I())}),s.addEventListener("blur",()=>{F(s.value)||(s.value=c()),v(s)})};Jt(Nt,wt,o=>{e.color=o},()=>e.color),Jt(x,y,o=>{e.titleColor=o},()=>e.titleColor),Jt(at,j,o=>{e.bodyColor=o},()=>e.bodyColor);const Le=o=>{e.radius=di(Number(o)),Se(),I()};E.addEventListener("pointerdown",()=>S(E)),E.addEventListener("keydown",()=>S(E)),E.addEventListener("pointerup",()=>v(E)),E.addEventListener("pointercancel",()=>v(E)),E.addEventListener("keyup",()=>v(E)),E.addEventListener("input",()=>Le(E.value)),z.addEventListener("focus",()=>S(z)),z.addEventListener("input",()=>Le(z.value)),z.addEventListener("blur",()=>v(z)),z.addEventListener("change",()=>v(z)),T.addEventListener("focus",()=>S(T)),T.addEventListener("input",()=>{e.code=T.value,I()}),T.addEventListener("blur",()=>v(T));const Ie=(o,s)=>{Object.assign(e,o),$=s,Q(),I()};ye.addEventListener("click",()=>{v();const o=P.pop(),s=nt.pop();if(!o||s===void 0){Q();return}ft.push(Wt(e)),kt.push($),Ie(o,s)}),ve.addEventListener("click",()=>{v();const o=ft.pop(),s=kt.pop();if(!o||s===void 0){Q();return}P.push(Wt(e)),nt.push($),Ie(o,s)}),Q(),(qe=t.querySelector("#studio-tab-design"))==null||qe.addEventListener("click",()=>Zt("design")),(Fe=t.querySelector("#studio-tab-code"))==null||Fe.addEventListener("click",()=>Zt("code")),(He=t.querySelector(".studio__tabs"))==null||He.addEventListener("keydown",o=>{var l;if(!(o instanceof KeyboardEvent)||o.key!=="ArrowRight"&&o.key!=="ArrowLeft")return;o.preventDefault();const s=e.panel==="design"?"code":"design";Zt(s),(l=t.querySelector(s==="design"?"#studio-tab-design":"#studio-tab-code"))==null||l.focus()});const ht=[...t.querySelectorAll("[data-theme-slug]")];for(const o of ht)o.addEventListener("click",()=>{const s=o.dataset.themeSlug;!s||s===e.themeSlug||(S(o),Me(s,!1),v(o))});(Re=t.querySelector(".studio__themes"))==null||Re.addEventListener("keydown",o=>{if(!(o instanceof KeyboardEvent))return;const s=o.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(s))return;o.preventDefault();const l=ht.findIndex(pt=>pt.dataset.themeSlug===e.themeSlug),m=ht[(l+(s==="ArrowLeft"||s==="ArrowUp"?-1:1)+ht.length)%ht.length],M=m==null?void 0:m.dataset.themeSlug;!M||M===e.themeSlug||(S(m),Me(M,!0),v(m))}),(Te=t.querySelector("#studio-copy"))==null||Te.addEventListener("click",async()=>{const o=le();Xt.textContent=o;try{await navigator.clipboard.writeText(o)}catch{const l=document.createElement("textarea");l.value=o,document.body.append(l),l.select(),document.execCommand("copy"),l.remove()}const s=t.querySelector("#studio-copy");s&&(s.textContent="복사됨",window.setTimeout(()=>{s.textContent="현재 디자인을 코드로 복사"},1200))}),(Ne=t.querySelector("#studio-download"))==null||Ne.addEventListener("click",()=>{(async()=>{const o=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){oi(_,o);return}const s=_e(),l=s?await ti(s):"",c=document.createElement("canvas");await bo(c,ui(ii(e,l)),e.cardWidth,e.cardHeight),oi(c,o)})()});const ke=o=>{const s=_.getBoundingClientRect();return{x:s.width>0?(o.clientX-s.left)/s.width*e.cardWidth:0,y:s.height>0?(o.clientY-s.top)/s.height*e.cardHeight:0}},We=(o,s)=>{for(let c=tt.length-1;c>=0;c-=1){const m=tt[c];if(m&&o>=m.x-8&&s>=m.y-8&&o<=m.x+m.w+8&&s<=m.y+m.h+8)return m}return null},Mi=o=>{const s=_.getContext("2d");if(!s)return;const l=_.getBoundingClientRect().width,c=l>0?e.cardWidth/l:1;s.save(),s.lineJoin="round",s.lineCap="round",s.strokeStyle="rgba(0, 0, 0, 0.7)",s.lineWidth=c*3,s.strokeRect(o.x,o.y,Math.max(c,o.w),Math.max(c,o.h)),s.strokeStyle="rgba(255, 255, 255, 0.92)",s.lineWidth=c*1.5,s.strokeRect(o.x,o.y,Math.max(c,o.w),Math.max(c,o.h)),s.restore()},Ce=()=>{if(!k)return;const o=tt.find(s=>s.kind===(k==null?void 0:k.kind));o&&Mi(o)};let k=null;_.addEventListener("pointerdown",o=>{if(e.code.trim())return;const s=ke(o),l=We(s.x,s.y);if(l){try{_.setPointerCapture(o.pointerId)}catch{}S(_),k={kind:l.kind,dx:s.x-l.x,dy:s.y-l.y,pointerId:o.pointerId},_.dataset.dragging="true",Ce()}}),_.addEventListener("pointermove",o=>{const s=ke(o);if(!k||k.pointerId!==o.pointerId){_.dataset.hover=We(s.x,s.y)?"true":"false";return}const l=s.x-k.dx,c=s.y-k.dy;k.kind==="title"?(e.titleX=Y(l,e.cardWidth,e.titleSize),e.titleY=Y(c,e.cardHeight,e.titleSize)):k.kind==="body"?(e.bodyX=Y(l,e.cardWidth,e.bodySize),e.bodyY=Y(c,e.cardHeight,e.bodySize)):(e.imageX=Xe(l,e.cardWidth,e.imageWidth),e.imageY=Xe(c,e.cardHeight,xi())),tt=ee(_,e,N),Ce()});const Ae=o=>{!k||k.pointerId!==o.pointerId||(k=null,delete _.dataset.dragging,v(_),tt=ee(_,e,N))};_.addEventListener("pointerup",Ae),_.addEventListener("pointercancel",Ae);const Vt=o=>{const s=Yt.getBoundingClientRect().width,l=st+ae+de,c=Number.isFinite(o)?o:e.controlsWidth;e.controlsWidth=s>=l?zi(c,s):Math.max(st,Math.round(c)),Yt.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),C.setAttribute("aria-valuenow",String(e.controlsWidth)),C.setAttribute("aria-valuemax",String(s>=l?Math.max(st,Math.round(s)-ae-de):e.controlsWidth)),ct()};Vt(e.controlsWidth),C.addEventListener("pointerdown",o=>{if(window.matchMedia("(max-width: 1023px)").matches)return;try{C.setPointerCapture(o.pointerId)}catch{}const s=o.clientX,l=e.controlsWidth,c=M=>{M.pointerId===o.pointerId&&Vt(l+M.clientX-s)},m=M=>{M.pointerId===o.pointerId&&(C.removeEventListener("pointermove",c),C.removeEventListener("pointerup",m),C.removeEventListener("pointercancel",m))};C.addEventListener("pointermove",c),C.addEventListener("pointerup",m),C.addEventListener("pointercancel",m)}),C.addEventListener("keydown",o=>{if(o.key!=="ArrowLeft"&&o.key!=="ArrowRight")return;o.preventDefault();const s=o.shiftKey?48:16;Vt(e.controlsWidth+(o.key==="ArrowRight"?s:-s))}),(Pe=t.querySelector("#studio-controls"))==null||Pe.addEventListener("submit",o=>{o.preventDefault()}),bt==null||bt.disconnect(),bt=new ResizeObserver(()=>ct()),bt.observe(Ot),I()}const bi="ax-design-studio-mode",ni="./data/index.json";let q={status:"loading"},Ht=Ft(),yi="all",O=null,ie=null,W=ce();function he(){const t=localStorage.getItem(bi);return t==="light"||t==="dark"?t:"dark"}function si(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(bi,t)}function oe(t,e,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${e}" ${i?'aria-current="page"':""}>${t}</a>`}function _o(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function vi(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=fe(t);return e?qt(e.r,e.g,e.b):F(t)??qt(216,241,255)}function $o(t,e){var n;const i=t&&e.some(r=>r.slug===t)?t:null;return O?(t&&t!==ie&&i&&(O.themeSlug=i,ie=t),O):(O=li(i??((n=e[0])==null?void 0:n.slug)??"",vi()),ie=t,O)}function xo(t){const e=he(),i=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",n=W.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${oe("Graphic Library",J({name:"archive"}),W.name==="archive"||W.name==="capture")}
        ${oe("Online Marketing Studio",J({name:"studio",theme:null}),W.name==="studio")}
        ${oe("History",J({name:"history"}),W.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${_o(e)}
        </button>
      </div>
    </header>
    <main class="shell${n?" shell--studio":""}" id="main">${t}</main>
  `}function wo(){if(q.status==="loading")return`
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
    `;const t=q.index;switch(W.name){case"archive":return Ki(t,Ht,yi);case"capture":return lo(t,W.slug,Ht);case"studio":return yo($o(W.theme,t.captures),t.captures);case"history":return uo(t);case"notfound":return ho(W.path)}}function Z(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");si(he()),Ht=Ft(),t.innerHTML=xo(wo()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{si(he()==="dark"?"light":"dark"),Z()}),q.status==="ready"&&(W.name==="archive"&&Zi(t,{onTabChange:i=>{var n;yi=i,Z(),(n=document.querySelector(`[data-archive-tab="${i}"]`))==null||n.focus()}}),W.name==="capture"&&co(t,i=>{Ht=Oi(i),Z()}),W.name==="studio"&&q.status==="ready"&&O&&vo(t,O,q.index.captures,()=>{var i;O&&(Fi(O,vi()),Z(),(i=document.querySelector("#studio-reset"))==null||i.focus())}))}async function So(){q={status:"loading"},Z();try{const t=await fetch(ni,{cache:"no-store"});if(!t.ok)throw new Error(`${ni} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");q={status:"ready",index:e}}catch(t){q={status:"error",message:t instanceof Error?t.message:String(t)}}Z()}Bi(t=>{if(fi(window.location.hash)){window.location.replace(J({name:"studio",theme:null}));return}W=t,Z()});So();
