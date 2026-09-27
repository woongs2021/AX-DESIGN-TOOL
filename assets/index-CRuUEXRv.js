(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const ti="ig-feed-square",Ht=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function rt(t){return Ht.find(e=>e.id===t)??Ht[0]}const st=0,yt=120,ei=28,X=100,nt=4e3,Ot=5,Te=10,vt=100,Dt=4e3,Y=240,Re=360,Xt=280,Yt=6,ii="빛을 담은 표면",oi="고요한 원과 따뜻한 색이 만나는 자리. 브랜드의 첫 인상을 한 장으로 전합니다.",_t=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],we="rgb(0, 0, 0)",xe="rgb(255, 255, 255)";function Pe(t){return Number.isFinite(t)?Math.min(yt,Math.max(st,Math.round(t))):st}function Ut(t){return Number.isFinite(t)?Math.min(nt,Math.max(X,Math.round(t))):X}function Jt(t){return Math.max(Ot,Ut(t)-Te*2)}function B(t,e){const i=Jt(e);return Number.isFinite(t)?Math.min(i,Math.max(Ot,Math.round(t))):Ot}function Zt(t){return Number.isFinite(t)?Math.min(Dt,Math.max(vt,Math.round(t))):vt}function M(t,e,i){const o=Math.max(0,Math.round(e)-Math.min(Math.max(i,0),Math.round(e)));return Number.isFinite(t)?Math.min(o,Math.max(0,Math.round(t))):0}function gt(t,e,i){const o=Math.round(-i+40),n=Math.round(e-40);return Number.isFinite(t)?o>n?Math.round((e-i)/2):Math.min(n,Math.max(o,Math.round(t))):0}function ni(t,e){const i=Math.max(Y,Math.round(e)-Xt-Yt);return Number.isFinite(t)?Math.min(i,Math.max(Y,Math.round(t))):Re}function si(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function at(t,e=[]){var o;const i=_t.find(n=>n.id===t);return i?i.stack:((o=e.find(n=>n.id===t))==null?void 0:o.stack)??_t[0].stack}function Ne(t,e){const i=rt(ti),o=B(Math.round(i.width*.046),i.width),n=B(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:ii,body:oi,themeSlug:t,color:e,radius:ei,code:"",panel:"design",controlsWidth:Re,titleSize:o,bodySize:n,titleX:M(Math.round(i.width*.06),i.width,o),titleY:M(a,i.height,o),bodyX:M(Math.round(i.width*.06),i.width,n),bodyY:M(a+Math.round(o*1.6),i.height,n),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:dt(e),bodyColor:dt(e),imageWidth:Zt(i.width),imageX:0,imageY:0}}function ri(t,e){const i=Ne(t.themeSlug,e);i.controlsWidth=t.controlsWidth,i.panel=t.panel,Object.assign(t,i)}function L(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function $t(t,e,i){const o=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${o(t)}${o(e)}${o(i)}`}function Vt(t){const e=L(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const i=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function D(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function Se(t,e){const i=.2126*D(t.r)+.7152*D(t.g)+.0722*D(t.b),o=.2126*D(e.r)+.7152*D(e.g)+.0722*D(e.b),n=Math.max(i,o),a=Math.min(i,o);return(n+.05)/(a+.05)}function dt(t){const e=Vt(He(t));return e?$t(e.r,e.g,e.b):$t(0,0,0)}function He(t){const e=Vt(t)??{r:255,g:255,b:255},i=Se({r:0,g:0,b:0},e),o=Se({r:255,g:255,b:255},e);return i>=4.5&&i>=o?we:o>=4.5?xe:i>=o?we:xe}function ai(t,e,i){if(e<=0)return[];const o=[];for(const n of t.split(`
`)){const a=n.split(/\s+/).filter(Boolean);if(a.length===0){o.push("");continue}let d="";const b=u=>{if(i(u)<=e){d=u;return}let h="";for(const g of u){const m=h+g;i(m)<=e?h=m:(h&&o.push(h),h=g)}d=h};for(const u of a){const h=d?`${d} ${u}`:u;i(h)<=e?d=h:(d&&o.push(d),b(u))}d&&o.push(d)}return o}function Tt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function di(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function li(t,e){return di(t).replaceAll("{{title}}",Tt(e.title)).replaceAll("{{body}}",Tt(e.body)).replaceAll("{{themeImage}}",Tt(e.themeImage))}function Bt(){return`<article class="studio-card">
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
</style>`}function Oe(t){const e=L(t.color)??t.color,i=He(e),o=L(t.titleColor)??dt(e),n=L(t.bodyColor)??dt(e),a=Pe(t.radius),d=rt("ig-feed-square"),b=t.width>0?t.width:d.width,u=t.height>0?t.height:d.height,h=t.titleFontStack.replaceAll(";",""),g=t.bodyFontStack.replaceAll(";",""),m=li(t.code.trim()||Bt(),t),y=[`--studio-color:${e}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${b}px`,`--studio-height:${u}px`,`--studio-title-font:${h}`,`--studio-body-font:${g}`,`--studio-title-size:${B(t.titleSize,b)}px`,`--studio-body-size:${B(t.bodySize,b)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${Zt(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${o}`,`--studio-body-color:${n}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${b}px;height:${u}px;margin:0;background:transparent;${y}">${m}</div>`}function ci(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Oe(t)}</body>
</html>`}const De="design-llm-wiki-pins";function wt(){try{const t=localStorage.getItem(De);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(i=>typeof i=="string"):[]}catch{return[]}}function ui(t){const e=[...new Set(t)];localStorage.setItem(De,JSON.stringify(e))}function hi(t){const e=wt(),i=e.includes(t)?e.filter(o=>o!==t):[...e,t];return ui(i),wt()}const Xe="[a-z0-9]+(?:-[a-z0-9]+)*";function Ye(t){const e=t.startsWith("#")?t.slice(1):t,i=e.indexOf("?"),o=i>=0?e.slice(0,i):e,n=i>=0?e.slice(i+1):"",a=o.startsWith("/")?o:`/${o}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:n}}function pi(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${Xe}$`).test(e)?null:e}function Ue(t){const{path:e}=Ye(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function jt(t=window.location.hash){const{path:e,query:i}=Ye(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||Ue(t))return{name:"studio",theme:e==="/studio"?pi(i):null};const o=e.match(new RegExp(`^/capture/(${Xe})$`));return o?{name:"capture",slug:o[1]}:{name:"notfound",path:e}}function N(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function mi(t){const e=()=>t(jt());return window.addEventListener("hashchange",e),t(jt()),()=>window.removeEventListener("hashchange",e)}function fi(t){return[...t].sort((e,i)=>e.capturedAt!==i.capturedAt?e.capturedAt<i.capturedAt?1:-1:e.slug.localeCompare(i.slug))}function c(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function U(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let bt=null;function gi(t){const e=t.querySelector(".archive-tabs__indicator"),i=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!i)return;const o=i.offsetLeft,n=i.offsetWidth;bt&&(e.style.transition="none",e.style.transform=`translateX(${bt.left}px)`,e.style.width=`${bt.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${o}px)`,e.style.width=`${n}px`,bt={left:o,width:n}})}function Rt(t){const e=t.querySelector(".capture-grid");if(!e)return;const i=window.getComputedStyle(e),o=Number.parseFloat(i.gridAutoRows)||1,n=Number.parseFloat(i.rowGap)||0;e.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,b=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,u=Math.ceil((d+b+n)/(o+n));a.style.gridRowEnd=`span ${Math.max(1,u)}`})}function bi(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${c(U(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function yi(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${N({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${bi(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${c(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${c(t.title)}</h2>
          <p class="capture-card__insight">${c(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function vi(t,e){const i=new Set(e),o=fi(t),n=o.filter(h=>i.has(h.slug)),a=o.filter(h=>!i.has(h.slug)),d=new Map(o.map(h=>[h.slug,h])),b=e.map(h=>d.get(h)).filter(h=>!!h),u=n.filter(h=>!e.includes(h.slug));return[...b,...u,...a]}function _i(t,e,i){const o=new Set(e),n=i==="pin"?t.captures.filter(d=>o.has(d.slug)):t.captures,a=vi(n,e);return t.captures.length===0?`
      <section class="state-panel state-panel--soft" aria-live="polite">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">이 번들에 캡처가 없습니다.</p>
      </section>
    `:`
    <section class="gallery archive">
      <header class="gallery__header archive__header">
        <div>
          <h1 class="gallery__title">Archive</h1>
          <p class="gallery__meta">Target ${c(t.target)} · ${a.length} · ${e.length} pinned</p>
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
              </section>`:`<div class="capture-grid">${a.map(d=>yi(d,e.includes(d.slug))).join("")}</div>`}
      </div>
    </section>
  `}function $i(t,e){t.querySelectorAll("[data-archive-tab]").forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.archiveTab;(a==="all"||a==="pin")&&e.onTabChange(a)})}),gi(t),requestAnimationFrame(()=>Rt(t)),t.querySelectorAll(".capture-card__media").forEach(n=>{n.addEventListener("load",()=>Rt(t),{once:!0})});const i=new ResizeObserver(()=>Rt(t)),o=t.querySelector(".capture-grid");o&&i.observe(o)}function wi(t){const e=t.replace(/\r\n/g,`
`).split(`
`),i=[];let o=!1;const n=()=>{o&&(i.push("</ul>"),o=!1)};for(const a of e){const d=a.trim();if(!d){n();continue}if(d.startsWith("### ")){n(),i.push(`<h3>${it(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){n(),i.push(`<h2>${it(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){n(),i.push(`<h1>${it(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){o||(i.push("<ul>"),o=!0),i.push(`<li>${it(d.slice(2))}</li>`);continue}n(),i.push(`<p>${it(d)}</p>`)}return n(),i.join(`
`)}function it(t){let e=c(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,o)=>`<a href="${N({name:"capture",slug:o})}">${o}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,o,n)=>n.endsWith(".md")&&!n.includes("://")?`<span>${o}</span>`:`<a href="${c(n)}">${o}</a>`),e}const xi=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Si(t){return Math.max(35,Math.min(98,Math.round(t)))}function Mi(t){let e=0;for(const i of t)e=(e*31+i.charCodeAt(0))%997;return e}function Ii(t){var h;if((h=t.analysisScores)!=null&&h.length)return t.analysisScores;const e=Mi(`${t.slug}:${t.title}:${t.insight}`),i=t.tags.includes("density")?7:0,o=t.asset.kind==="motion"?8:0,n=Math.min(12,t.uiPatterns.length*3),a=t.asset.width/Math.max(1,t.asset.height),d=a>1.2?6:0,b=a<.75?5:0,u=[68+n+d+e%9,66+i+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+o+(t.uiPatterns.includes("filter-chips")?7:0),62+b+n+(e>>3)%8].map(Si);return xi.map(([g,m],y)=>({key:g,label:m,score:u[y]??60,description:Li(m,u[y]??60,t)}))}function ki(t){return t.length===0?0:Math.round(t.reduce((e,i)=>e+i.score,0)/t.length)}function Li(t,e,i){return t==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function Ei(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Ai(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${c(U(t.asset.posterPath))}"`:""}>
        <source src="${c(U(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${c(U(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function Ci(t){const e=Ii(t),i=t.analysisTotal??ki(e),o=160,n=110,a=[.25,.5,.75,1].map(u=>e.map((h,g)=>{const m=-Math.PI/2+g*Math.PI*2/e.length,y=o+Math.cos(m)*n*u,w=o+Math.sin(m)*n*u;return`${y.toFixed(1)},${w.toFixed(1)}`}).join(" ")).map(u=>`<polygon class="spider-grid" points="${u}" />`).join(""),d=e.map((u,h)=>{const g=-Math.PI/2+h*Math.PI*2/e.length,m=n*(u.score/100),y=o+Math.cos(g)*m,w=o+Math.sin(g)*m;return`${y.toFixed(1)},${w.toFixed(1)}`}).join(" "),b=e.map((u,h)=>{const g=-Math.PI/2+h*Math.PI*2/e.length,m=o+Math.cos(g)*n,y=o+Math.sin(g)*n,w=o+Math.cos(g)*n*(u.score/100),E=o+Math.sin(g)*n*(u.score/100),z=o+Math.cos(g)*(n+26),F=o+Math.sin(g)*(n+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${o}" y1="${o}" x2="${m.toFixed(1)}" y2="${y.toFixed(1)}" />
          <circle class="spider-point" cx="${w.toFixed(1)}" cy="${E.toFixed(1)}" r="6" />
          <text class="spider-label" x="${z.toFixed(1)}" y="${F.toFixed(1)}">${c(u.label)}</text>
          <text class="spider-callout" x="${z.toFixed(1)}" y="${(F+18).toFixed(1)}">${u.score}</text>
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
          ${b}
        </svg>
        <dl class="score-list">
          ${e.map(u=>`
            <div class="score-list__item">
              <dt>${c(u.label)} <strong>${u.score}</strong></dt>
              <dd>${c(u.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function Wi(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${c(i)}</span>`).join("")}function qi(t,e,i){const o=t.captures.find(a=>a.slug===e);if(!o)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${c(e)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const n=i.includes(e);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${c(o.service)} · ${c(o.platform)}</p>
          <h1 class="detail__title">${c(o.title)}</h1>
          <p class="detail__insight">${c(o.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${c(N({name:"studio",theme:e}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${c(e)}" aria-pressed="${n?"true":"false"}">
            ${n?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Ai(o)}</div>

      ${Ci(o)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${c(o.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${c(o.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${o.asset.width} × ${o.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${Ei(o.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${o.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${o.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${c(o.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${Wi(o)}
        </p>
        <p class="detail__meta-line">
          ${c(o.screenType)} · ${c(o.tone)} · ${c(o.copyTone)} · ${c(o.capturedAt)}
          ${o.sourceUrl?` · <a href="${c(o.sourceUrl)}">${c(o.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${wi(o.body)}
      </section>
    </article>
  `}function zi(t,e){var i;(i=t.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",o=>{const n=o.currentTarget.dataset.pinSlug;n&&e(n)})}function Fi(t){const e=t.wiki.logEntries;return e.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${e.length} entries · target ${c(t.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${e.map(i=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${c(i.date)}">${c(i.date)}</time>
            <span class="history-item__op">${c(i.operation)}</span>
            <strong class="history-item__title">${c(i.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function Ti(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${c(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Me=.5,Ie=3,ke=.25;let q=1;const Kt=new Map,Le=new Map;function Be(t){const e=Kt.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((i,o)=>{const n=e??new Image;n.onload=()=>i(n),n.onerror=()=>o(new Error(`Image failed: ${t}`)),e||(Kt.set(t,n),n.src=t)})}function Ee(t){const e=Le.get(t);if(e)return e;const i=fetch(t).then(o=>{if(!o.ok)throw new Error(`Theme image HTTP ${o.status}`);return o.blob()}).then(o=>new Promise((n,a)=>{const d=new FileReader;d.onload=()=>n(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(o)}));return Le.set(t,i),i}const Ri=Object.assign({}),Ae=new Set;function Pi(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function lt(){const t=new Set(_t.map(i=>i.label.toLowerCase())),e=[];for(const[i,o]of Object.entries(Ri)){const n=si(i);if(!n||t.has(n.toLowerCase()))continue;const a=`local:${n}`;if(!e.some(d=>d.id===a)){if(!Ae.has(n)){Ae.add(n);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(n)};src:url("${o}") format("${Pi(o)}");font-display:swap;}`,document.head.append(d)}e.push({id:a,label:n,stack:`${JSON.stringify(n)}, system-ui, sans-serif`})}}return e}function Ni(){return[..._t,...lt()]}function Hi(t,e,i,o){const n=Math.max(0,Math.min(o,e/2,i/2));t.beginPath(),t.roundRect(0,0,e,i,n)}function Ce(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:at(t.titleFontId,lt()),bodyFontStack:at(t.bodyFontId,lt()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function We(t,e,i){const o=t.getContext("2d");if(!o)return[];const n=e.cardWidth,a=e.cardHeight;t.width=n,t.height=a,o.clearRect(0,0,n,a),o.save(),Hi(o,n,a,e.radius),o.clip(),o.fillStyle=e.color,o.fillRect(0,0,n,a);const d=[];if(i&&i.naturalWidth>0){const g=e.imageWidth,m=g*(i.naturalHeight/i.naturalWidth);o.drawImage(i,e.imageX,e.imageY,g,m),d.push({kind:"image",x:e.imageX,y:e.imageY,w:g,h:m})}const b=Math.max(1,n-Te*2);o.textBaseline="top";const u=(g,m,y,w,E,z,F,H)=>{if(!m.trim())return;o.fillStyle=H,o.font=`${z} ${E}px ${F}`;const T=ai(m.trim(),b,C=>o.measureText(C).width),O=Math.round(E*1.25);let R=0;T.forEach((C,j)=>{o.fillText(C,y,w+j*O),R=Math.max(R,o.measureText(C).width)}),d.push({kind:g,x:y,y:w,w:Math.max(R,E),h:Math.max(T.length,1)*O})},h=lt();return u("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,at(e.bodyFontId,h),e.bodyColor),u("title",e.title,e.titleX,e.titleY,e.titleSize,600,at(e.titleFontId,h),e.titleColor),o.restore(),d}function qe(t,e){t.toBlob(i=>{if(!i)return;const o=URL.createObjectURL(i),n=document.createElement("a");n.href=o,n.download=e,n.click(),URL.revokeObjectURL(o)},"image/png")}async function Oi(t,e,i,o){const n=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${o}"><foreignObject x="0" y="0" width="${i}" height="${o}">${e}</foreignObject></svg>`,a=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const b=await Be(d),u=t.getContext("2d");if(!u)return;t.width=i,t.height=o,u.clearRect(0,0,i,o),u.drawImage(b,0,0,i,o)}finally{URL.revokeObjectURL(d),Kt.delete(d)}}let ot=null;function Di(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=dt(t.color);t.titleColor=L(String(t.titleColor??""))??i,t.bodyColor=L(String(t.bodyColor??""))??i;const o=t.fontId;t.titleFontId||(t.titleFontId=o||"pretendard"),t.bodyFontId||(t.bodyFontId=o||"pretendard");const n=rt(t.presetId),a=Ht.map(m=>`<option value="${c(m.id)}"${m.id===n.id?" selected":""}>${c(m.name)} · ${m.width}×${m.height}</option>`).join(""),d=e.map(m=>{const y=m.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${c(m.slug)}"
          aria-checked="${y?"true":"false"}"
          tabindex="${y?"0":"-1"}"
        >
          <img src="${c(U(m.asset.path))}" alt="${c(m.title)}" />
        </button>
      `}).join(""),b=t.panel==="design",u=Ni(),h=Jt(t.cardWidth),g=m=>u.map(y=>`<option value="${c(y.id)}"${y.id===m?" selected":""}>${c(y.label)}</option>`).join("");return`
    <section class="studio" style="--studio-controls-width:${t.controlsWidth}px">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${b?"true":"false"}" tabindex="${b?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${b?"false":"true"}" tabindex="${b?"-1":"0"}">Code</button>
        </div>

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${b?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${a}</select>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${X}" max="${nt}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${X}" max="${nt}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${X}" max="${nt}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${X}" max="${nt}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${c(t.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${c(t.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${c(t.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${h}" step="1" value="${t.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${h}" step="1" value="${t.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${g(t.titleFontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${c(t.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${c(t.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${c(t.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${h}" step="1" value="${t.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${h}" step="1" value="${t.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${g(t.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${d}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${vt}" max="${Dt}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${vt}" max="${Dt}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${c(t.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${c(t.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${st}" max="${yt}" step="1" value="${t.radius}" aria-valuemin="${st}" aria-valuemax="${yt}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${st}" max="${yt}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${b?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${c(t.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${Y}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
  `}function Xi(t,e,i,o){var he,pe,me,fe,ge,be,ye,ve;if(i.length===0)return;const n=t.querySelector("#studio-preset"),a=t.querySelector("#studio-width"),d=t.querySelector("#studio-width-number"),b=t.querySelector("#studio-height"),u=t.querySelector("#studio-height-number"),h=t.querySelector("#studio-title"),g=t.querySelector("#studio-title-color"),m=t.querySelector("#studio-title-hex"),y=t.querySelector("#studio-title-size"),w=t.querySelector("#studio-title-size-number"),E=t.querySelector("#studio-body"),z=t.querySelector("#studio-body-color"),F=t.querySelector("#studio-body-hex"),H=t.querySelector("#studio-body-size"),T=t.querySelector("#studio-body-size-number"),O=t.querySelector("#studio-title-font"),R=t.querySelector("#studio-body-font"),C=t.querySelector("#studio-image-width"),j=t.querySelector("#studio-image-width-number"),Qt=t.querySelector("#studio-color"),te=t.querySelector("#studio-hex"),K=t.querySelector("#studio-radius"),ct=t.querySelector("#studio-radius-number"),St=t.querySelector("#studio-code"),v=t.querySelector("#studio-canvas"),ut=t.querySelector("#studio-iframe"),ee=t.querySelector("#studio-meta"),G=t.querySelector("#studio-safe"),ht=t.querySelector("#studio-scaler"),Mt=t.querySelector("#studio-fit"),It=t.querySelector("#studio-stage"),kt=t.querySelector("#studio-zoom-out"),Lt=t.querySelector("#studio-zoom-in"),ie=t.querySelector("#studio-zoom-label"),Et=t.querySelector("#studio-export"),S=t.querySelector("#studio-splitter"),At=t.querySelector(".studio");if(!n||!a||!d||!b||!u||!h||!g||!m||!y||!w||!E||!z||!F||!H||!T||!O||!R||!C||!j||!Qt||!te||!K||!ct||!St||!v||!ut||!ee||!G||!ht||!Mt||!It||!kt||!Lt||!ie||!Et||!S||!At)return;const oe=()=>{const s=i.find(r=>r.slug===e.themeSlug)??i[0];return s?U(s.asset.path):""};let pt=0;const Je=()=>{q=Math.min(Ie,Math.max(Me,Math.round(q*4)/4)),kt.disabled=q<=Me,Lt.disabled=q>=Ie,ie.textContent=`${Math.round(q*100)}%`},J=()=>{const s=It.getBoundingClientRect(),r=48,l=Math.min(Math.max(s.width-r,1)/e.cardWidth,Math.max(s.height-r,1)/e.cardHeight),f=Number.isFinite(l)&&l>0?l:1;Je();const p=f*q;Mt.style.width=`${e.cardWidth*p}px`,Mt.style.height=`${e.cardHeight*p}px`,ht.style.width=`${e.cardWidth}px`,ht.style.height=`${e.cardHeight}px`,ht.style.transform=`scale(${p})`};kt.addEventListener("click",()=>{q-=ke,J()}),Lt.addEventListener("click",()=>{q+=ke,J()});const Z=t.querySelector("#studio-controls");let ne=0,Ct=!1;Z==null||Z.addEventListener("scroll",()=>{Ct||(Z.classList.add("is-scrolling"),window.clearTimeout(ne),ne=window.setTimeout(()=>{Ct=!0,Z.classList.remove("is-scrolling"),window.setTimeout(()=>{Ct=!1},80)},700))});let W=null,mt=1,ft=[];const se=()=>e.imageWidth*mt,Wt=()=>{e.cardWidth=Ut(e.cardWidth),e.cardHeight=Ut(e.cardHeight),e.titleSize=B(e.titleSize,e.cardWidth),e.bodySize=B(e.bodySize,e.cardWidth),e.imageWidth=Zt(e.imageWidth),e.titleX=M(e.titleX,e.cardWidth,e.titleSize),e.titleY=M(e.titleY,e.cardHeight,e.titleSize),e.bodyX=M(e.bodyX,e.cardWidth,e.bodySize),e.bodyY=M(e.bodyY,e.cardHeight,e.bodySize),e.imageX=gt(e.imageX,e.cardWidth,e.imageWidth),e.imageY=gt(e.imageY,e.cardHeight,se())},V=(s,r,l)=>{s.value=String(l),document.activeElement!==r&&(r.value=String(l))},Ze=()=>{const s=String(Jt(e.cardWidth));for(const r of[y,w,H,T])r.min="5",r.max=s;V(a,d,e.cardWidth),V(b,u,e.cardHeight),V(y,w,e.titleSize),V(H,T,e.bodySize),V(C,j,e.imageWidth)},re=()=>{K.value=String(e.radius),K.setAttribute("aria-valuenow",String(e.radius)),ct.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},ae=(s,r)=>{e.themeSlug=s;for(const l of t.querySelectorAll("[data-theme-slug]")){const f=l.dataset.themeSlug===s;l.setAttribute("aria-checked",f?"true":"false"),l.tabIndex=f?0:-1,f&&r&&l.focus()}$()},qt=s=>{var p,_;e.panel=s;const r=s==="design";(p=t.querySelector("#studio-panel-design"))==null||p.toggleAttribute("hidden",!r),(_=t.querySelector("#studio-panel-code"))==null||_.toggleAttribute("hidden",r);const l=t.querySelector("#studio-tab-design"),f=t.querySelector("#studio-tab-code");l==null||l.setAttribute("aria-selected",r?"true":"false"),f==null||f.setAttribute("aria-selected",r?"false":"true"),l&&(l.tabIndex=r?0:-1),f&&(f.tabIndex=r?-1:0),$()},$=async()=>{const s=++pt;Wt(),Ze();const r=rt(e.presetId),l=e.cardWidth===r.width&&e.cardHeight===r.height,f=l&&r.safe?` · 안전 영역 ${r.safe.width} × ${r.safe.height}`:"";ee.textContent=`${e.cardWidth} × ${e.cardHeight} · ${r.name}${f}`,Et.textContent=Bt(),re(),J(),l&&r.safe?(G.hidden=!1,G.style.width=`${r.safe.width}px`,G.style.height=`${r.safe.height}px`):G.hidden=!0;const p=(et,Ve,Qe)=>{var $e;const _e=($e=at(et,lt()).split(",")[0])==null?void 0:$e.replaceAll('"',"").trim();return _e?document.fonts.load(`${Ve} ${Qe}px "${_e}"`):Promise.resolve()};try{await Promise.all([p(e.titleFontId,600,e.titleSize),p(e.bodyFontId,400,e.bodySize)])}catch{}if(s!==pt)return;const _=oe();if(e.code.trim()){v.hidden=!0,ut.hidden=!1;const et=_?await Ee(_):"";if(s!==pt)return;ut.srcdoc=ci(Ce(e,et));return}if(ut.hidden=!0,v.hidden=!1,_)try{W=await Be(_),W.naturalWidth>0&&(mt=W.naturalHeight/W.naturalWidth)}catch{W=null,mt=1}else W=null,mt=1;s===pt&&(Wt(),ft=We(v,e,W))},Q=(s,r,l,f)=>{s.addEventListener("input",()=>{l(Number(s.value)),$()});const p=()=>{Wt(),r.value=String(f())};r.addEventListener("input",()=>{r.value.trim()!==""&&(l(Number(r.value)),$())}),r.addEventListener("change",p),r.addEventListener("blur",p)};n.addEventListener("change",()=>{const s=rt(n.value);e.presetId=s.id,e.cardWidth=s.width,e.cardHeight=s.height,$()}),Q(a,d,s=>{e.cardWidth=s},()=>e.cardWidth),Q(b,u,s=>{e.cardHeight=s},()=>e.cardHeight),Q(y,w,s=>{e.titleSize=s},()=>e.titleSize),Q(H,T,s=>{e.bodySize=s},()=>e.bodySize),Q(C,j,s=>{e.imageWidth=s},()=>e.imageWidth),O.addEventListener("change",()=>{e.titleFontId=O.value,$()}),R.addEventListener("change",()=>{e.bodyFontId=R.value,$()}),(he=t.querySelector("#studio-reset"))==null||he.addEventListener("click",()=>{o()}),h.addEventListener("input",()=>{e.title=h.value,$()}),E.addEventListener("input",()=>{e.body=E.value,$()});const zt=(s,r,l,f)=>{s.addEventListener("input",()=>{const p=L(s.value);p&&(l(p),r.value=p,$())}),r.addEventListener("input",()=>{const p=L(r.value);p&&(l(p),s.value=p,$())}),r.addEventListener("blur",()=>{L(r.value)||(r.value=f())})};zt(Qt,te,s=>{e.color=s},()=>e.color),zt(g,m,s=>{e.titleColor=s},()=>e.titleColor),zt(z,F,s=>{e.bodyColor=s},()=>e.bodyColor);const de=s=>{e.radius=Pe(Number(s)),re(),$()};K.addEventListener("input",()=>de(K.value)),ct.addEventListener("input",()=>de(ct.value)),St.addEventListener("input",()=>{e.code=St.value,$()}),(pe=t.querySelector("#studio-tab-design"))==null||pe.addEventListener("click",()=>qt("design")),(me=t.querySelector("#studio-tab-code"))==null||me.addEventListener("click",()=>qt("code")),(fe=t.querySelector(".studio__tabs"))==null||fe.addEventListener("keydown",s=>{var l;if(!(s instanceof KeyboardEvent)||s.key!=="ArrowRight"&&s.key!=="ArrowLeft")return;s.preventDefault();const r=e.panel==="design"?"code":"design";qt(r),(l=t.querySelector(r==="design"?"#studio-tab-design":"#studio-tab-code"))==null||l.focus()});const tt=[...t.querySelectorAll("[data-theme-slug]")];for(const s of tt)s.addEventListener("click",()=>{const r=s.dataset.themeSlug;r&&ae(r,!1)});(ge=t.querySelector(".studio__themes"))==null||ge.addEventListener("keydown",s=>{if(!(s instanceof KeyboardEvent))return;const r=s.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(r))return;s.preventDefault();const l=tt.findIndex(et=>et.dataset.themeSlug===e.themeSlug),p=tt[(l+(r==="ArrowLeft"||r==="ArrowUp"?-1:1)+tt.length)%tt.length],_=p==null?void 0:p.dataset.themeSlug;_&&ae(_,!0)}),(be=t.querySelector("#studio-copy"))==null||be.addEventListener("click",async()=>{const s=Bt();Et.textContent=s;try{await navigator.clipboard.writeText(s)}catch{const l=document.createElement("textarea");l.value=s,document.body.append(l),l.select(),document.execCommand("copy"),l.remove()}const r=t.querySelector("#studio-copy");r&&(r.textContent="복사됨",window.setTimeout(()=>{r.textContent="현재 디자인을 코드로 복사"},1200))}),(ye=t.querySelector("#studio-download"))==null||ye.addEventListener("click",()=>{(async()=>{const s=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){qe(v,s);return}const r=oe(),l=r?await Ee(r):"",f=document.createElement("canvas");await Oi(f,Oe(Ce(e,l)),e.cardWidth,e.cardHeight),qe(f,s)})()});const le=s=>{const r=v.getBoundingClientRect();return{x:r.width>0?(s.clientX-r.left)/r.width*e.cardWidth:0,y:r.height>0?(s.clientY-r.top)/r.height*e.cardHeight:0}},ce=(s,r)=>{for(let f=ft.length-1;f>=0;f-=1){const p=ft[f];if(p&&s>=p.x-8&&r>=p.y-8&&s<=p.x+p.w+8&&r<=p.y+p.h+8)return p}return null};let I=null;v.addEventListener("pointerdown",s=>{if(e.code.trim())return;const r=le(s),l=ce(r.x,r.y);if(l){try{v.setPointerCapture(s.pointerId)}catch{}I={kind:l.kind,dx:r.x-l.x,dy:r.y-l.y,pointerId:s.pointerId},v.dataset.dragging="true"}}),v.addEventListener("pointermove",s=>{const r=le(s);if(!I||I.pointerId!==s.pointerId){v.dataset.hover=ce(r.x,r.y)?"true":"false";return}const l=r.x-I.dx,f=r.y-I.dy;I.kind==="title"?(e.titleX=M(l,e.cardWidth,e.titleSize),e.titleY=M(f,e.cardHeight,e.titleSize)):I.kind==="body"?(e.bodyX=M(l,e.cardWidth,e.bodySize),e.bodyY=M(f,e.cardHeight,e.bodySize)):(e.imageX=gt(l,e.cardWidth,e.imageWidth),e.imageY=gt(f,e.cardHeight,se())),ft=We(v,e,W)});const ue=s=>{!I||I.pointerId!==s.pointerId||(I=null,delete v.dataset.dragging)};v.addEventListener("pointerup",ue),v.addEventListener("pointercancel",ue);const Ft=s=>{const r=At.getBoundingClientRect().width,l=Y+Xt+Yt,f=Number.isFinite(s)?s:e.controlsWidth;e.controlsWidth=r>=l?ni(f,r):Math.max(Y,Math.round(f)),At.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),S.setAttribute("aria-valuenow",String(e.controlsWidth)),S.setAttribute("aria-valuemax",String(r>=l?Math.max(Y,Math.round(r)-Xt-Yt):e.controlsWidth)),J()};Ft(e.controlsWidth),S.addEventListener("pointerdown",s=>{if(window.matchMedia("(max-width: 1023px)").matches)return;try{S.setPointerCapture(s.pointerId)}catch{}const r=s.clientX,l=e.controlsWidth,f=_=>{_.pointerId===s.pointerId&&Ft(l+_.clientX-r)},p=_=>{_.pointerId===s.pointerId&&(S.removeEventListener("pointermove",f),S.removeEventListener("pointerup",p),S.removeEventListener("pointercancel",p))};S.addEventListener("pointermove",f),S.addEventListener("pointerup",p),S.addEventListener("pointercancel",p)}),S.addEventListener("keydown",s=>{if(s.key!=="ArrowLeft"&&s.key!=="ArrowRight")return;s.preventDefault();const r=s.shiftKey?48:16;Ft(e.controlsWidth+(s.key==="ArrowRight"?r:-r))}),(ve=t.querySelector("#studio-controls"))==null||ve.addEventListener("submit",s=>{s.preventDefault()}),ot==null||ot.disconnect(),ot=new ResizeObserver(()=>J()),ot.observe(It),$()}const je="ax-design-studio-mode",ze="./data/index.json";let k={status:"loading"},xt=wt(),Ke="all",A=null,Pt=null,x=jt();function Gt(){const t=localStorage.getItem(je);return t==="light"||t==="dark"?t:"dark"}function Fe(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(je,t)}function Nt(t,e,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${e}" ${i?'aria-current="page"':""}>${t}</a>`}function Yi(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function Ge(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=Vt(t);return e?$t(e.r,e.g,e.b):L(t)??$t(216,241,255)}function Ui(t,e){var o;const i=t&&e.some(n=>n.slug===t)?t:null;return A?(t&&t!==Pt&&i&&(A.themeSlug=i,Pt=t),A):(A=Ne(i??((o=e[0])==null?void 0:o.slug)??"",Ge()),Pt=t,A)}function Bi(t){const e=Gt(),i=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",o=x.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${Nt("Archive",N({name:"archive"}),x.name==="archive"||x.name==="capture")}
        ${Nt("Online Marketing Studio",N({name:"studio",theme:null}),x.name==="studio")}
        ${Nt("History",N({name:"history"}),x.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${Yi(e)}
        </button>
      </div>
    </header>
    <main class="shell${o?" shell--studio":""}" id="main">${t}</main>
  `}function ji(){if(k.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(k.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${k.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
      </section>
    `;const t=k.index;switch(x.name){case"archive":return _i(t,xt,Ke);case"capture":return qi(t,x.slug,xt);case"studio":return Di(Ui(x.theme,t.captures),t.captures);case"history":return Fi(t);case"notfound":return Ti(x.path)}}function P(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Fe(Gt()),xt=wt(),t.innerHTML=Bi(ji()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{Fe(Gt()==="dark"?"light":"dark"),P()}),k.status==="ready"&&(x.name==="archive"&&$i(t,{onTabChange:i=>{var o;Ke=i,P(),(o=document.querySelector(`[data-archive-tab="${i}"]`))==null||o.focus()}}),x.name==="capture"&&zi(t,i=>{xt=hi(i),P()}),x.name==="studio"&&k.status==="ready"&&A&&Xi(t,A,k.index.captures,()=>{var i;A&&(ri(A,Ge()),P(),(i=document.querySelector("#studio-reset"))==null||i.focus())}))}async function Ki(){k={status:"loading"},P();try{const t=await fetch(ze,{cache:"no-store"});if(!t.ok)throw new Error(`${ze} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");k={status:"ready",index:e}}catch(t){k={status:"error",message:t instanceof Error?t.message:String(t)}}P()}mi(t=>{if(Ue(window.location.hash)){window.location.replace(N({name:"studio",theme:null}));return}x=t,P()});Ki();
