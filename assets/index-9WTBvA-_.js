(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=i(r);fetch(r.href,a)}})();const Si="ig-feed-square",ie=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function yt(t){return ie.find(e=>e.id===t)??ie[0]}const bt=0,Wt=120,Mi=28,X=100,j=4e3,oe=5,oi=10,At=100,ne=4e3,ot=240,ni=360,se=280,re=6,Ei="시즌",Li=`새로운 컬렉션
브랜드의 첫 인상을 한 장으로 전합니다.`,Ct=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],De="rgb(0, 0, 0)",Be="rgb(255, 255, 255)";function si(t){return Number.isFinite(t)?Math.min(Wt,Math.max(bt,Math.round(t))):bt}function K(t){return Number.isFinite(t)?Math.min(j,Math.max(X,Math.round(t))):X}function Ii(t,e,i){const n=Math.max(1,Math.round(t)),a=Math.max(1,Math.round(e))/n;let d=K(i);const f=Math.round(d*a);let u=K(f);return f!==u&&(d=K(Math.round(u/a)),u=K(Math.round(d*a))),{cardWidth:d,cardHeight:u}}function ue(t){return Math.max(oe,K(t)-oi*2)}function st(t,e){const i=ue(e);return Number.isFinite(t)?Math.min(i,Math.max(oe,Math.round(t))):oe}function he(t){return Number.isFinite(t)?Math.min(ne,Math.max(At,Math.round(t))):At}function A(t,e,i){const n=Math.max(0,Math.round(e)-Math.min(Math.max(i,0),Math.round(e)));return Number.isFinite(t)?Math.min(n,Math.max(0,Math.round(t))):0}function Lt(t,e,i){const n=Math.round(-i+40),r=Math.round(e-40);return Number.isFinite(t)?n>r?Math.round((e-i)/2):Math.min(r,Math.max(n,Math.round(t))):0}function ki(t,e){const i=Math.max(ot,Math.round(e)-se-re);return Number.isFinite(t)?Math.min(i,Math.max(ot,Math.round(t))):ni}function Wi(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function vt(t,e=[]){var n;const i=Ct.find(r=>r.id===t);return i?i.stack:((n=e.find(r=>r.id===t))==null?void 0:n.stack)??Ct[0].stack}function ri(t,e){const i=yt(Si),n=st(Math.round(i.width*.046),i.width),r=st(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:Ei,body:Li,themeSlug:t,color:e,radius:Mi,code:"",panel:"design",controlsWidth:ni,titleSize:n,bodySize:r,titleX:A(Math.round(i.width*.06),i.width,n),titleY:A(a,i.height,n),bodyX:A(Math.round(i.width*.06),i.width,r),bodyY:A(a+Math.round(n*1.6),i.height,r),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:_t(e),bodyColor:_t(e),imageWidth:he(i.width),imageX:0,imageY:0}}function Ai(t,e){const i=ri(t.themeSlug,e);i.controlsWidth=t.controlsWidth,i.panel=t.panel,Object.assign(t,i)}function F(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function zt(t,e,i){const n=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${n(t)}${n(e)}${n(i)}`}function pe(t){const e=F(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const i=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function it(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function Xe(t,e){const i=.2126*it(t.r)+.7152*it(t.g)+.0722*it(t.b),n=.2126*it(e.r)+.7152*it(e.g)+.0722*it(e.b),r=Math.max(i,n),a=Math.min(i,n);return(r+.05)/(a+.05)}function _t(t){const e=pe(ai(t));return e?zt(e.r,e.g,e.b):zt(0,0,0)}function ai(t){const e=pe(t)??{r:255,g:255,b:255},i=Xe({r:0,g:0,b:0},e),n=Xe({r:255,g:255,b:255},e);return i>=4.5&&i>=n?De:n>=4.5?Be:i>=n?De:Be}function Ci(t,e,i){if(e<=0)return[];const n=[];for(const r of t.split(`
`)){const a=r.split(/\s+/).filter(Boolean);if(a.length===0){n.push("");continue}let d="";const f=u=>{if(i(u)<=e){d=u;return}let h="";for(const b of u){const g=h+b;i(g)<=e?h=g:(h&&n.push(h),h=b)}d=h};for(const u of a){const h=d?`${d} ${u}`:u;i(h)<=e?d=h:(d&&n.push(d),f(u))}d&&n.push(d)}return n}function Zt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function zi(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function qi(t,e){return zi(t).replaceAll("{{title}}",Zt(e.title)).replaceAll("{{body}}",Zt(e.body)).replaceAll("{{themeImage}}",Zt(e.themeImage))}function ae(){return`<article class="studio-card">
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
</style>`}function di(t){const e=F(t.color)??t.color,i=ai(e),n=F(t.titleColor)??_t(e),r=F(t.bodyColor)??_t(e),a=si(t.radius),d=yt("ig-feed-square"),f=t.width>0?t.width:d.width,u=t.height>0?t.height:d.height,h=t.titleFontStack.replaceAll(";",""),b=t.bodyFontStack.replaceAll(";",""),g=qi(t.code.trim()||ae(),t),$=[`--studio-color:${e}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${f}px`,`--studio-height:${u}px`,`--studio-title-font:${h}`,`--studio-body-font:${b}`,`--studio-title-size:${st(t.titleSize,f)}px`,`--studio-body-size:${st(t.bodySize,f)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${he(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${n}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${u}px;margin:0;background:transparent;${$}">${g}</div>`}function Fi(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${di(t)}</body>
</html>`}const li="design-llm-wiki-pins";function qt(){try{const t=localStorage.getItem(li);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(i=>typeof i=="string"):[]}catch{return[]}}function Hi(t){const e=[...new Set(t)];localStorage.setItem(li,JSON.stringify(e))}function Ri(t){const e=qt(),i=e.includes(t)?e.filter(n=>n!==t):[...e,t];return Hi(i),qt()}const ci="[a-z0-9]+(?:-[a-z0-9]+)*";function ui(t){const e=t.startsWith("#")?t.slice(1):t,i=e.indexOf("?"),n=i>=0?e.slice(0,i):e,r=i>=0?e.slice(i+1):"",a=n.startsWith("/")?n:`/${n}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:r}}function Ti(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${ci}$`).test(e)?null:e}function hi(t){const{path:e}=ui(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function de(t=window.location.hash){const{path:e,query:i}=ui(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||hi(t))return{name:"studio",theme:e==="/studio"?Ti(i):null};const n=e.match(new RegExp(`^/capture/(${ci})$`));return n?{name:"capture",slug:n[1]}:{name:"notfound",path:e}}function J(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function Ni(t){const e=()=>t(de());return window.addEventListener("hashchange",e),t(de()),()=>window.removeEventListener("hashchange",e)}function Pi(t){return[...t].sort((e,i)=>e.capturedAt!==i.capturedAt?e.capturedAt<i.capturedAt?1:-1:e.slug.localeCompare(i.slug))}function c(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function nt(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let It=null;function Oi(t){const e=t.querySelector(".archive-tabs__indicator"),i=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!i)return;const n=i.offsetLeft,r=i.offsetWidth;It&&(e.style.transition="none",e.style.transform=`translateX(${It.left}px)`,e.style.width=`${It.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${n}px)`,e.style.width=`${r}px`,It={left:n,width:r}})}function Vt(t){const e=t.querySelector(".capture-grid");if(!e)return;const i=window.getComputedStyle(e),n=Number.parseFloat(i.gridAutoRows)||1,r=Number.parseFloat(i.rowGap)||0;e.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,u=Math.ceil((d+f+r)/(n+r));a.style.gridRowEnd=`span ${Math.max(1,u)}`})}function Di(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${c(nt(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function Bi(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${J({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${Di(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${c(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${c(t.title)}</h2>
          <p class="capture-card__insight">${c(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Xi(t,e){const i=new Set(e),n=Pi(t),r=n.filter(h=>i.has(h.slug)),a=n.filter(h=>!i.has(h.slug)),d=new Map(n.map(h=>[h.slug,h])),f=e.map(h=>d.get(h)).filter(h=>!!h),u=r.filter(h=>!e.includes(h.slug));return[...f,...u,...a]}function Yi(t,e,i){const n=new Set(e),r=i==="pin"?t.captures.filter(d=>n.has(d.slug)):t.captures,a=Xi(r,e);return t.captures.length===0?`
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
              </section>`:`<div class="capture-grid">${a.map(d=>Bi(d,e.includes(d.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Ui(t,e){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.archiveTab;(a==="all"||a==="pin")&&e.onTabChange(a)})}),Oi(t),requestAnimationFrame(()=>Vt(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>Vt(t),{once:!0})});const i=new ResizeObserver(()=>Vt(t)),n=t.querySelector(".capture-grid");n&&i.observe(n)}function ji(t){const e=t.replace(/\r\n/g,`
`).split(`
`),i=[];let n=!1;const r=()=>{n&&(i.push("</ul>"),n=!1)};for(const a of e){const d=a.trim();if(!d){r();continue}if(d.startsWith("### ")){r(),i.push(`<h3>${pt(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){r(),i.push(`<h2>${pt(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){r(),i.push(`<h1>${pt(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){n||(i.push("<ul>"),n=!0),i.push(`<li>${pt(d.slice(2))}</li>`);continue}r(),i.push(`<p>${pt(d)}</p>`)}return r(),i.join(`
`)}function pt(t){let e=c(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,n)=>`<a href="${J({name:"capture",slug:n})}">${n}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,n,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${n}</span>`:`<a href="${c(r)}">${n}</a>`),e}const Ki=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Gi(t){return Math.max(35,Math.min(98,Math.round(t)))}function Ji(t){let e=0;for(const i of t)e=(e*31+i.charCodeAt(0))%997;return e}function Zi(t){var h;if((h=t.analysisScores)!=null&&h.length)return t.analysisScores;const e=Ji(`${t.slug}:${t.title}:${t.insight}`),i=t.tags.includes("density")?7:0,n=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),a=t.asset.width/Math.max(1,t.asset.height),d=a>1.2?6:0,f=a<.75?5:0,u=[68+r+d+e%9,66+i+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+n+(t.uiPatterns.includes("filter-chips")?7:0),62+f+r+(e>>3)%8].map(Gi);return Ki.map(([b,g],$)=>({key:b,label:g,score:u[$]??60,description:Qi(g,u[$]??60,t)}))}function Vi(t){return t.length===0?0:Math.round(t.reduce((e,i)=>e+i.score,0)/t.length)}function Qi(t,e,i){return t==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function to(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function eo(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${c(nt(t.asset.posterPath))}"`:""}>
        <source src="${c(nt(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${c(nt(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function io(t){const e=Zi(t),i=t.analysisTotal??Vi(e),n=160,r=110,a=[.25,.5,.75,1].map(u=>e.map((h,b)=>{const g=-Math.PI/2+b*Math.PI*2/e.length,$=n+Math.cos(g)*r*u,y=n+Math.sin(g)*r*u;return`${$.toFixed(1)},${y.toFixed(1)}`}).join(" ")).map(u=>`<polygon class="spider-grid" points="${u}" />`).join(""),d=e.map((u,h)=>{const b=-Math.PI/2+h*Math.PI*2/e.length,g=r*(u.score/100),$=n+Math.cos(b)*g,y=n+Math.sin(b)*g;return`${$.toFixed(1)},${y.toFixed(1)}`}).join(" "),f=e.map((u,h)=>{const b=-Math.PI/2+h*Math.PI*2/e.length,g=n+Math.cos(b)*r,$=n+Math.sin(b)*r,y=n+Math.cos(b)*r*(u.score/100),x=n+Math.sin(b)*r*(u.score/100),H=n+Math.cos(b)*(r+26),E=n+Math.sin(b)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${n}" y1="${n}" x2="${g.toFixed(1)}" y2="${$.toFixed(1)}" />
          <circle class="spider-point" cx="${y.toFixed(1)}" cy="${x.toFixed(1)}" r="6" />
          <text class="spider-label" x="${H.toFixed(1)}" y="${E.toFixed(1)}">${c(u.label)}</text>
          <text class="spider-callout" x="${H.toFixed(1)}" y="${(E+18).toFixed(1)}">${u.score}</text>
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
          ${e.map(u=>`
            <div class="score-list__item">
              <dt>${c(u.label)} <strong>${u.score}</strong></dt>
              <dd>${c(u.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function oo(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${c(i)}</span>`).join("")}function no(t,e,i){const n=t.captures.find(a=>a.slug===e);if(!n)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${c(e)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=i.includes(e);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${c(n.service)} · ${c(n.platform)}</p>
          <h1 class="detail__title">${c(n.title)}</h1>
          <p class="detail__insight">${c(n.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${c(J({name:"studio",theme:e}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${c(e)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${eo(n)}</div>

      ${io(n)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${c(n.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${c(n.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${n.asset.width} × ${n.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${to(n.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${n.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${n.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${c(n.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${oo(n)}
        </p>
        <p class="detail__meta-line">
          ${c(n.screenType)} · ${c(n.tone)} · ${c(n.copyTone)} · ${c(n.capturedAt)}
          ${n.sourceUrl?` · <a href="${c(n.sourceUrl)}">${c(n.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${ji(n.body)}
      </section>
    </article>
  `}function so(t,e){var i;(i=t.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",n=>{const r=n.currentTarget.dataset.pinSlug;r&&e(r)})}function ro(t){const e=t.wiki.logEntries;return e.length===0?`
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
  `}function ao(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${c(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Ye=.5,Ue=3,je=.25,Ke=40;let B=1,P=[],mt=[],ft=null;function kt(t){return{...t}}function Ge(t,e){return JSON.stringify(t)===JSON.stringify(e)}const le=new Map,Je=new Map;function pi(t){const e=le.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((i,n)=>{const r=e??new Image;r.onload=()=>i(r),r.onerror=()=>n(new Error(`Image failed: ${t}`)),e||(le.set(t,r),r.src=t)})}function Ze(t){const e=Je.get(t);if(e)return e;const i=fetch(t).then(n=>{if(!n.ok)throw new Error(`Theme image HTTP ${n.status}`);return n.blob()}).then(n=>new Promise((r,a)=>{const d=new FileReader;d.onload=()=>r(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(n)}));return Je.set(t,i),i}const lo=Object.assign({}),Ve=new Set;function co(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function $t(){const t=new Set(Ct.map(i=>i.label.toLowerCase())),e=[];for(const[i,n]of Object.entries(lo)){const r=Wi(i);if(!r||t.has(r.toLowerCase()))continue;const a=`local:${r}`;if(!e.some(d=>d.id===a)){if(!Ve.has(r)){Ve.add(r);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${n}") format("${co(n)}");font-display:swap;}`,document.head.append(d)}e.push({id:a,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return e}function uo(){return[...Ct,...$t()]}function ho(t,e,i,n){const r=Math.max(0,Math.min(n,e/2,i/2));t.beginPath(),t.roundRect(0,0,e,i,r)}function Qe(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:vt(t.titleFontId,$t()),bodyFontStack:vt(t.bodyFontId,$t()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function Qt(t,e,i){const n=t.getContext("2d");if(!n)return[];const r=e.cardWidth,a=e.cardHeight;t.width=r,t.height=a,n.clearRect(0,0,r,a),n.save(),ho(n,r,a,e.radius),n.clip(),n.fillStyle=e.color,n.fillRect(0,0,r,a);const d=[];if(i&&i.naturalWidth>0){const b=e.imageWidth,g=b*(i.naturalHeight/i.naturalWidth);n.drawImage(i,e.imageX,e.imageY,b,g),d.push({kind:"image",x:e.imageX,y:e.imageY,w:b,h:g})}const f=Math.max(1,r-oi*2);n.textBaseline="top";const u=(b,g,$,y,x,H,E,rt)=>{if(!g.trim())return;n.fillStyle=rt,n.font=`${H} ${x}px ${E}`;const Y=Ci(g.trim(),f,R=>n.measureText(R).width),U=Math.round(x*1.25);let D=0;Y.forEach((R,Z)=>{n.fillText(R,$,y+Z*U),D=Math.max(D,n.measureText(R).width)}),d.push({kind:b,x:$,y,w:Math.max(D,x),h:Math.max(Y.length,1)*U})},h=$t();return u("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,vt(e.bodyFontId,h),e.bodyColor),u("title",e.title,e.titleX,e.titleY,e.titleSize,600,vt(e.titleFontId,h),e.titleColor),n.restore(),d}function ti(t,e){t.toBlob(i=>{if(!i)return;const n=URL.createObjectURL(i),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)},"image/png")}async function po(t,e,i,n){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${n}"><foreignObject x="0" y="0" width="${i}" height="${n}">${e}</foreignObject></svg>`,a=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const f=await pi(d),u=t.getContext("2d");if(!u)return;t.width=i,t.height=n,u.clearRect(0,0,i,n),u.drawImage(f,0,0,i,n)}finally{URL.revokeObjectURL(d),le.delete(d)}}let gt=null;function mo(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=_t(t.color);t.titleColor=F(String(t.titleColor??""))??i,t.bodyColor=F(String(t.bodyColor??""))??i;const n=t.fontId;t.titleFontId||(t.titleFontId=n||"pretendard"),t.bodyFontId||(t.bodyFontId=n||"pretendard");const r=yt(t.presetId),a=ie.map(y=>`<option value="${c(y.id)}"${y.id===r.id?" selected":""}>${c(y.name)} · ${y.width}×${y.height}</option>`).join(""),d=e.map(y=>{const x=y.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${c(y.slug)}"
          aria-checked="${x?"true":"false"}"
          tabindex="${x?"0":"-1"}"
        >
          <img src="${c(nt(y.asset.path))}" alt="${c(y.title)}" />
        </button>
      `}).join(""),f=t.panel==="design",u=uo(),h=ue(t.cardWidth),b=y=>u.map(x=>`<option value="${c(x.id)}"${x.id===y?" selected":""}>${c(x.label)}</option>`).join("");return`
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
              <input id="studio-size" type="range" min="${X}" max="${j}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${X}" max="${j}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${X}" max="${j}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${X}" max="${j}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${X}" max="${j}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${X}" max="${j}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
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
            <select id="studio-title-font" class="studio__control">${b(t.titleFontId)}</select>
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
              <input id="studio-image-width" type="range" min="${At}" max="${ne}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${At}" max="${ne}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius" type="range" min="${bt}" max="${Wt}" step="1" value="${t.radius}" aria-valuemin="${bt}" aria-valuemax="${Wt}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${bt}" max="${Wt}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${f?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${c(t.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>
      <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${ot}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
  `}function fo(t,e,i,n){var Ce,ze,qe,Fe,He,Re,Te,Ne;if(i.length===0)return;const r=t.querySelector("#studio-preset"),a=t.querySelector("#studio-size"),d=t.querySelector("#studio-size-number"),f=t.querySelector("#studio-width"),u=t.querySelector("#studio-width-number"),h=t.querySelector("#studio-height"),b=t.querySelector("#studio-height-number"),g=t.querySelector("#studio-title"),$=t.querySelector("#studio-title-color"),y=t.querySelector("#studio-title-hex"),x=t.querySelector("#studio-title-size"),H=t.querySelector("#studio-title-size-number"),E=t.querySelector("#studio-body"),rt=t.querySelector("#studio-body-color"),Y=t.querySelector("#studio-body-hex"),U=t.querySelector("#studio-body-size"),D=t.querySelector("#studio-body-size-number"),R=t.querySelector("#studio-title-font"),Z=t.querySelector("#studio-body-font"),Ht=t.querySelector("#studio-image-width"),Rt=t.querySelector("#studio-image-width-number"),Tt=t.querySelector("#studio-color"),xt=t.querySelector("#studio-hex"),M=t.querySelector("#studio-radius"),z=t.querySelector("#studio-radius-number"),T=t.querySelector("#studio-code"),_=t.querySelector("#studio-canvas"),wt=t.querySelector("#studio-iframe"),me=t.querySelector("#studio-meta"),at=t.querySelector("#studio-safe"),St=t.querySelector("#studio-scaler"),Nt=t.querySelector("#studio-fit"),Pt=t.querySelector("#studio-stage"),Ot=t.querySelector("#studio-zoom-out"),Dt=t.querySelector("#studio-zoom-in"),fe=t.querySelector("#studio-zoom-label"),ge=t.querySelector("#studio-undo"),be=t.querySelector("#studio-redo"),dt=t.querySelector("#studio-scroll-thumb"),Bt=t.querySelector(".studio__controls-wrap"),Xt=t.querySelector("#studio-export"),W=t.querySelector("#studio-splitter"),Yt=t.querySelector(".studio");if(!r||!a||!d||!f||!u||!h||!b||!g||!$||!y||!x||!H||!E||!rt||!Y||!U||!D||!R||!Z||!Ht||!Rt||!Tt||!xt||!M||!z||!T||!_||!wt||!me||!at||!St||!Nt||!Pt||!Ot||!Dt||!fe||!ge||!be||!dt||!Bt||!Xt||!W||!Yt)return;const ye=()=>{const o=i.find(s=>s.slug===e.themeSlug)??i[0];return o?nt(o.asset.path):""};let Mt=0;const bi=()=>{B=Math.min(Ue,Math.max(Ye,Math.round(B*4)/4)),Ot.disabled=B<=Ye,Dt.disabled=B>=Ue,fe.textContent=`${Math.round(B*100)}%`},lt=()=>{const o=Pt.getBoundingClientRect(),s=48,l=Math.min(Math.max(o.width-s,1)/e.cardWidth,Math.max(o.height-s,1)/e.cardHeight),p=Number.isFinite(l)&&l>0?l:1;bi();const m=p*B;Nt.style.width=`${e.cardWidth*m}px`,Nt.style.height=`${e.cardHeight*m}px`,St.style.width=`${e.cardWidth}px`,St.style.height=`${e.cardHeight}px`,St.style.transform=`scale(${m})`};Ot.addEventListener("click",()=>{B-=je,lt()}),Dt.addEventListener("click",()=>{B+=je,lt()});const C=t.querySelector("#studio-controls");let ve=0;const _e=()=>{if(!C)return;const o=C.scrollHeight-C.clientHeight;if(o<=1){dt.hidden=!0;return}dt.hidden=!1;const s=Math.max(32,C.clientHeight/C.scrollHeight*C.clientHeight),l=Math.max(0,C.clientHeight-s);dt.style.height=`${s}px`,dt.style.transform=`translateY(${C.scrollTop/o*l}px)`};C==null||C.addEventListener("scroll",()=>{_e(),Bt.classList.add("is-scrolling"),window.clearTimeout(ve),ve=window.setTimeout(()=>Bt.classList.remove("is-scrolling"),700)}),_e();const V=()=>{const o=document.querySelector("#studio-undo"),s=document.querySelector("#studio-redo");o&&(o.disabled=P.length===0),s&&(s.disabled=mt.length===0)};let ct=null;const v=o=>{if(o&&ct!==o)return;if(!ft){ct=null;return}const s=ft;ft=null,ct=null,!Ge(s,e)&&(P.push(s),P.length>Ke&&P.shift(),mt=[],V())},w=o=>{o&&ct===o&&ft||(v(),ft=kt(e),ct=o??null)},yi=o=>{const s=Number(o.min),l=Number(o.max),p=Number(o.value),m=l>s?(p-s)/(l-s)*100:0;o.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,m))}%`)};let $e=e.cardHeight/Math.max(1,e.cardWidth);const Ut=()=>{$e=e.cardHeight/Math.max(1,e.cardWidth)};let N=null,Et=1,Q=[];const xe=()=>e.imageWidth*Et,jt=()=>{e.cardWidth=K(e.cardWidth),e.cardHeight=K(e.cardHeight),e.titleSize=st(e.titleSize,e.cardWidth),e.bodySize=st(e.bodySize,e.cardWidth),e.imageWidth=he(e.imageWidth),e.titleX=A(e.titleX,e.cardWidth,e.titleSize),e.titleY=A(e.titleY,e.cardHeight,e.titleSize),e.bodyX=A(e.bodyX,e.cardWidth,e.bodySize),e.bodyY=A(e.bodyY,e.cardHeight,e.bodySize),e.imageX=Lt(e.imageX,e.cardWidth,e.imageWidth),e.imageY=Lt(e.imageY,e.cardHeight,xe())},tt=(o,s,l)=>{o.value=String(l),document.activeElement!==s&&(s.value=String(l))},vi=()=>{const o=String(ue(e.cardWidth));for(const s of[x,H,U,D])s.min="5",s.max=o;tt(a,d,e.cardWidth),tt(f,u,e.cardWidth),tt(h,b,e.cardHeight),tt(x,H,e.titleSize),tt(U,D,e.bodySize),tt(Ht,Rt,e.imageWidth)},we=()=>{M.value=String(e.radius),M.setAttribute("aria-valuenow",String(e.radius)),z.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},Se=(o,s)=>{e.themeSlug=o;for(const l of t.querySelectorAll("[data-theme-slug]")){const p=l.dataset.themeSlug===o;l.setAttribute("aria-checked",p?"true":"false"),l.tabIndex=p?0:-1,p&&s&&l.focus()}L()},Kt=o=>{var m,S;e.panel=o;const s=o==="design";(m=t.querySelector("#studio-panel-design"))==null||m.toggleAttribute("hidden",!s),(S=t.querySelector("#studio-panel-code"))==null||S.toggleAttribute("hidden",s);const l=t.querySelector("#studio-tab-design"),p=t.querySelector("#studio-tab-code");l==null||l.setAttribute("aria-selected",s?"true":"false"),p==null||p.setAttribute("aria-selected",s?"false":"true"),l&&(l.tabIndex=s?0:-1),p&&(p.tabIndex=s?-1:0),L()},_i=()=>{r.value=e.presetId,document.activeElement!==g&&(g.value=e.title),document.activeElement!==E&&(E.value=e.body),document.activeElement!==y&&($.value=e.titleColor,y.value=e.titleColor),document.activeElement!==Y&&(rt.value=e.bodyColor,Y.value=e.bodyColor),document.activeElement!==xt&&(Tt.value=e.color,xt.value=e.color),R.value=e.titleFontId,Z.value=e.bodyFontId,document.activeElement!==T&&(T.value=e.code);for(const o of t.querySelectorAll("[data-theme-slug]")){const s=o.dataset.themeSlug===e.themeSlug;o.setAttribute("aria-checked",s?"true":"false"),o.tabIndex=s?0:-1}},L=async()=>{const o=++Mt;jt(),_i(),vi(),t.querySelectorAll('input[type="range"]').forEach(yi);const s=yt(e.presetId),l=e.cardWidth===s.width&&e.cardHeight===s.height,p=l&&s.safe?` · 안전 영역 ${s.safe.width} × ${s.safe.height}`:"";me.textContent=`${e.cardWidth} × ${e.cardHeight} · ${s.name}${p}`,Xt.textContent=ae(),we(),lt(),l&&s.safe?(at.hidden=!1,at.style.width=`${s.safe.width}px`,at.style.height=`${s.safe.height}px`):at.hidden=!0;const m=(ht,xi,wi)=>{var Oe;const Pe=(Oe=vt(ht,$t()).split(",")[0])==null?void 0:Oe.replaceAll('"',"").trim();return Pe?document.fonts.load(`${xi} ${wi}px "${Pe}"`):Promise.resolve()};try{await Promise.all([m(e.titleFontId,600,e.titleSize),m(e.bodyFontId,400,e.bodySize)])}catch{}if(o!==Mt)return;const S=ye();if(e.code.trim()){_.hidden=!0,wt.hidden=!1;const ht=S?await Ze(S):"";if(o!==Mt)return;wt.srcdoc=Fi(Qe(e,ht));return}if(wt.hidden=!0,_.hidden=!1,S)try{N=await pi(S),N.naturalWidth>0&&(Et=N.naturalHeight/N.naturalWidth)}catch{N=null,Et=1}else N=null,Et=1;o===Mt&&(jt(),Q=Qt(_,e,N))},et=(o,s,l,p)=>{o.addEventListener("pointerdown",()=>w(o)),o.addEventListener("keydown",()=>w(o)),o.addEventListener("pointerup",()=>v(o)),o.addEventListener("pointercancel",()=>v(o)),o.addEventListener("keyup",()=>v(o)),o.addEventListener("input",()=>{l(Number(o.value)),L()});const m=()=>{jt(),s.value=String(p()),v(s)};s.addEventListener("focus",()=>w(s)),s.addEventListener("input",()=>{s.value.trim()!==""&&(l(Number(s.value)),L())}),s.addEventListener("change",m),s.addEventListener("blur",m)};r.addEventListener("focus",()=>w(r)),r.addEventListener("change",()=>{const o=yt(r.value);e.presetId=o.id,e.cardWidth=o.width,e.cardHeight=o.height,v(r),L()}),r.addEventListener("blur",()=>v(r)),a.addEventListener("pointerdown",Ut),a.addEventListener("keydown",Ut),d.addEventListener("focus",Ut),et(a,d,o=>{const s=Ii(Math.max(1,e.cardWidth),Math.max(1,Math.round(e.cardWidth*$e)),o);e.cardWidth=s.cardWidth,e.cardHeight=s.cardHeight},()=>e.cardWidth),et(f,u,o=>{e.cardWidth=o},()=>e.cardWidth),et(h,b,o=>{e.cardHeight=o},()=>e.cardHeight),et(x,H,o=>{e.titleSize=o},()=>e.titleSize),et(U,D,o=>{e.bodySize=o},()=>e.bodySize),et(Ht,Rt,o=>{e.imageWidth=o},()=>e.imageWidth);const Me=(o,s)=>{o.addEventListener("focus",()=>w(o)),o.addEventListener("change",()=>{s(),v(o),L()}),o.addEventListener("blur",()=>v(o))};Me(R,()=>{e.titleFontId=R.value}),Me(Z,()=>{e.bodyFontId=Z.value}),(Ce=t.querySelector("#studio-reset"))==null||Ce.addEventListener("click",()=>{v();const o=kt(e);n(),Ge(o,e)||(P.push(o),P.length>Ke&&P.shift(),mt=[]),V()}),g.addEventListener("focus",()=>w(g)),g.addEventListener("input",()=>{e.title=g.value,L()}),g.addEventListener("blur",()=>v(g)),E.addEventListener("focus",()=>w(E)),E.addEventListener("input",()=>{e.body=E.value,L()}),E.addEventListener("blur",()=>v(E));const Gt=(o,s,l,p)=>{o.addEventListener("pointerdown",()=>w(o)),o.addEventListener("change",()=>v(o)),o.addEventListener("input",()=>{const m=F(o.value);m&&(l(m),s.value=m,L())}),s.addEventListener("focus",()=>w(s)),s.addEventListener("input",()=>{const m=F(s.value);m&&(l(m),o.value=m,L())}),s.addEventListener("blur",()=>{F(s.value)||(s.value=p()),v(s)})};Gt(Tt,xt,o=>{e.color=o},()=>e.color),Gt($,y,o=>{e.titleColor=o},()=>e.titleColor),Gt(rt,Y,o=>{e.bodyColor=o},()=>e.bodyColor);const Ee=o=>{e.radius=si(Number(o)),we(),L()};M.addEventListener("pointerdown",()=>w(M)),M.addEventListener("keydown",()=>w(M)),M.addEventListener("pointerup",()=>v(M)),M.addEventListener("pointercancel",()=>v(M)),M.addEventListener("keyup",()=>v(M)),M.addEventListener("input",()=>Ee(M.value)),z.addEventListener("focus",()=>w(z)),z.addEventListener("input",()=>Ee(z.value)),z.addEventListener("blur",()=>v(z)),z.addEventListener("change",()=>v(z)),T.addEventListener("focus",()=>w(T)),T.addEventListener("input",()=>{e.code=T.value,L()}),T.addEventListener("blur",()=>v(T));const Le=o=>{Object.assign(e,o),V(),L()};ge.addEventListener("click",()=>{v();const o=P.pop();if(!o){V();return}mt.push(kt(e)),Le(o)}),be.addEventListener("click",()=>{v();const o=mt.pop();if(!o){V();return}P.push(kt(e)),Le(o)}),V(),(ze=t.querySelector("#studio-tab-design"))==null||ze.addEventListener("click",()=>Kt("design")),(qe=t.querySelector("#studio-tab-code"))==null||qe.addEventListener("click",()=>Kt("code")),(Fe=t.querySelector(".studio__tabs"))==null||Fe.addEventListener("keydown",o=>{var l;if(!(o instanceof KeyboardEvent)||o.key!=="ArrowRight"&&o.key!=="ArrowLeft")return;o.preventDefault();const s=e.panel==="design"?"code":"design";Kt(s),(l=t.querySelector(s==="design"?"#studio-tab-design":"#studio-tab-code"))==null||l.focus()});const ut=[...t.querySelectorAll("[data-theme-slug]")];for(const o of ut)o.addEventListener("click",()=>{const s=o.dataset.themeSlug;!s||s===e.themeSlug||(w(o),Se(s,!1),v(o))});(He=t.querySelector(".studio__themes"))==null||He.addEventListener("keydown",o=>{if(!(o instanceof KeyboardEvent))return;const s=o.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(s))return;o.preventDefault();const l=ut.findIndex(ht=>ht.dataset.themeSlug===e.themeSlug),m=ut[(l+(s==="ArrowLeft"||s==="ArrowUp"?-1:1)+ut.length)%ut.length],S=m==null?void 0:m.dataset.themeSlug;!S||S===e.themeSlug||(w(m),Se(S,!0),v(m))}),(Re=t.querySelector("#studio-copy"))==null||Re.addEventListener("click",async()=>{const o=ae();Xt.textContent=o;try{await navigator.clipboard.writeText(o)}catch{const l=document.createElement("textarea");l.value=o,document.body.append(l),l.select(),document.execCommand("copy"),l.remove()}const s=t.querySelector("#studio-copy");s&&(s.textContent="복사됨",window.setTimeout(()=>{s.textContent="현재 디자인을 코드로 복사"},1200))}),(Te=t.querySelector("#studio-download"))==null||Te.addEventListener("click",()=>{(async()=>{const o=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){ti(_,o);return}const s=ye(),l=s?await Ze(s):"",p=document.createElement("canvas");await po(p,di(Qe(e,l)),e.cardWidth,e.cardHeight),ti(p,o)})()});const Ie=o=>{const s=_.getBoundingClientRect();return{x:s.width>0?(o.clientX-s.left)/s.width*e.cardWidth:0,y:s.height>0?(o.clientY-s.top)/s.height*e.cardHeight:0}},ke=(o,s)=>{for(let p=Q.length-1;p>=0;p-=1){const m=Q[p];if(m&&o>=m.x-8&&s>=m.y-8&&o<=m.x+m.w+8&&s<=m.y+m.h+8)return m}return null},$i=o=>{const s=_.getContext("2d");if(!s)return;const l=_.getBoundingClientRect().width,p=l>0?e.cardWidth/l:1;s.save(),s.lineJoin="round",s.lineCap="round",s.strokeStyle="rgba(0, 0, 0, 0.7)",s.lineWidth=p*3,s.strokeRect(o.x,o.y,Math.max(p,o.w),Math.max(p,o.h)),s.strokeStyle="rgba(255, 255, 255, 0.92)",s.lineWidth=p*1.5,s.strokeRect(o.x,o.y,Math.max(p,o.w),Math.max(p,o.h)),s.restore()},We=()=>{if(!I)return;const o=Q.find(s=>s.kind===(I==null?void 0:I.kind));o&&$i(o)};let I=null;_.addEventListener("pointerdown",o=>{if(e.code.trim())return;const s=Ie(o),l=ke(s.x,s.y);if(l){try{_.setPointerCapture(o.pointerId)}catch{}w(_),I={kind:l.kind,dx:s.x-l.x,dy:s.y-l.y,pointerId:o.pointerId},_.dataset.dragging="true",We()}}),_.addEventListener("pointermove",o=>{const s=Ie(o);if(!I||I.pointerId!==o.pointerId){_.dataset.hover=ke(s.x,s.y)?"true":"false";return}const l=s.x-I.dx,p=s.y-I.dy;I.kind==="title"?(e.titleX=A(l,e.cardWidth,e.titleSize),e.titleY=A(p,e.cardHeight,e.titleSize)):I.kind==="body"?(e.bodyX=A(l,e.cardWidth,e.bodySize),e.bodyY=A(p,e.cardHeight,e.bodySize)):(e.imageX=Lt(l,e.cardWidth,e.imageWidth),e.imageY=Lt(p,e.cardHeight,xe())),Q=Qt(_,e,N),We()});const Ae=o=>{!I||I.pointerId!==o.pointerId||(I=null,delete _.dataset.dragging,v(_),Q=Qt(_,e,N))};_.addEventListener("pointerup",Ae),_.addEventListener("pointercancel",Ae);const Jt=o=>{const s=Yt.getBoundingClientRect().width,l=ot+se+re,p=Number.isFinite(o)?o:e.controlsWidth;e.controlsWidth=s>=l?ki(p,s):Math.max(ot,Math.round(p)),Yt.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),W.setAttribute("aria-valuenow",String(e.controlsWidth)),W.setAttribute("aria-valuemax",String(s>=l?Math.max(ot,Math.round(s)-se-re):e.controlsWidth)),lt()};Jt(e.controlsWidth),W.addEventListener("pointerdown",o=>{if(window.matchMedia("(max-width: 1023px)").matches)return;try{W.setPointerCapture(o.pointerId)}catch{}const s=o.clientX,l=e.controlsWidth,p=S=>{S.pointerId===o.pointerId&&Jt(l+S.clientX-s)},m=S=>{S.pointerId===o.pointerId&&(W.removeEventListener("pointermove",p),W.removeEventListener("pointerup",m),W.removeEventListener("pointercancel",m))};W.addEventListener("pointermove",p),W.addEventListener("pointerup",m),W.addEventListener("pointercancel",m)}),W.addEventListener("keydown",o=>{if(o.key!=="ArrowLeft"&&o.key!=="ArrowRight")return;o.preventDefault();const s=o.shiftKey?48:16;Jt(e.controlsWidth+(o.key==="ArrowRight"?s:-s))}),(Ne=t.querySelector("#studio-controls"))==null||Ne.addEventListener("submit",o=>{o.preventDefault()}),gt==null||gt.disconnect(),gt=new ResizeObserver(()=>lt()),gt.observe(Pt),L()}const mi="ax-design-studio-mode",ei="./data/index.json";let q={status:"loading"},Ft=qt(),fi="all",O=null,te=null,k=de();function ce(){const t=localStorage.getItem(mi);return t==="light"||t==="dark"?t:"dark"}function ii(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(mi,t)}function ee(t,e,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${e}" ${i?'aria-current="page"':""}>${t}</a>`}function go(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function gi(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=pe(t);return e?zt(e.r,e.g,e.b):F(t)??zt(216,241,255)}function bo(t,e){var n;const i=t&&e.some(r=>r.slug===t)?t:null;return O?(t&&t!==te&&i&&(O.themeSlug=i,te=t),O):(O=ri(i??((n=e[0])==null?void 0:n.slug)??"",gi()),te=t,O)}function yo(t){const e=ce(),i=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",n=k.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${ee("Archive",J({name:"archive"}),k.name==="archive"||k.name==="capture")}
        ${ee("Online Marketing Studio",J({name:"studio",theme:null}),k.name==="studio")}
        ${ee("History",J({name:"history"}),k.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${go(e)}
        </button>
      </div>
    </header>
    <main class="shell${n?" shell--studio":""}" id="main">${t}</main>
  `}function vo(){if(q.status==="loading")return`
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
    `;const t=q.index;switch(k.name){case"archive":return Yi(t,Ft,fi);case"capture":return no(t,k.slug,Ft);case"studio":return mo(bo(k.theme,t.captures),t.captures);case"history":return ro(t);case"notfound":return ao(k.path)}}function G(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");ii(ce()),Ft=qt(),t.innerHTML=yo(vo()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{ii(ce()==="dark"?"light":"dark"),G()}),q.status==="ready"&&(k.name==="archive"&&Ui(t,{onTabChange:i=>{var n;fi=i,G(),(n=document.querySelector(`[data-archive-tab="${i}"]`))==null||n.focus()}}),k.name==="capture"&&so(t,i=>{Ft=Ri(i),G()}),k.name==="studio"&&q.status==="ready"&&O&&fo(t,O,q.index.captures,()=>{var i;O&&(Ai(O,gi()),G(),(i=document.querySelector("#studio-reset"))==null||i.focus())}))}async function _o(){q={status:"loading"},G();try{const t=await fetch(ei,{cache:"no-store"});if(!t.ok)throw new Error(`${ei} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");q={status:"ready",index:e}}catch(t){q={status:"error",message:t instanceof Error?t.message:String(t)}}G()}Ni(t=>{if(hi(window.location.hash)){window.location.replace(J({name:"studio",theme:null}));return}k=t,G()});_o();
