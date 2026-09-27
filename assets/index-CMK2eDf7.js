(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const je="ig-feed-square",Pt=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function nt(t){return Pt.find(e=>e.id===t)??Pt[0]}const it=0,mt=120,Be=28,D=100,et=4e3,Tt=5,ke=10,yt=100,Rt=4e3,X=240,Ce=360,Nt=280,bt=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],me="rgb(0, 0, 0)",ge="rgb(255, 255, 255)";function Ee(t){return Number.isFinite(t)?Math.min(mt,Math.max(it,Math.round(t))):it}function Ht(t){return Number.isFinite(t)?Math.min(et,Math.max(D,Math.round(t))):D}function Ut(t){return Math.max(Tt,Ht(t)-ke*2)}function U(t,e){const i=Ut(e);return Number.isFinite(t)?Math.min(i,Math.max(Tt,Math.round(t))):Tt}function jt(t){return Number.isFinite(t)?Math.min(Rt,Math.max(yt,Math.round(t))):yt}function M(t,e,i){const n=Math.max(0,Math.round(e)-Math.min(Math.max(i,0),Math.round(e)));return Number.isFinite(t)?Math.min(n,Math.max(0,Math.round(t))):0}function pt(t,e,i){const n=Math.round(-i+40),o=Math.round(e-40);return Number.isFinite(t)?n>o?Math.round((e-i)/2):Math.min(o,Math.max(n,Math.round(t))):0}function Ke(t,e){const i=Math.max(X,Math.round(e)-Nt-10);return Number.isFinite(t)?Math.min(i,Math.max(X,Math.round(t))):Ce}function Ge(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function ot(t,e=[]){var n;const i=bt.find(o=>o.id===t);return i?i.stack:((n=e.find(o=>o.id===t))==null?void 0:n.stack)??bt[0].stack}function Le(t,e){const i=nt(je),n=U(Math.round(i.width*.046),i.width),o=U(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:"",body:"",themeSlug:t,color:e,radius:Be,code:"",panel:"design",controlsWidth:Ce,titleSize:n,bodySize:o,titleX:M(Math.round(i.width*.06),i.width,n),titleY:M(a,i.height,n),bodyX:M(Math.round(i.width*.06),i.width,o),bodyY:M(a+Math.round(n*1.6),i.height,o),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:rt(e),bodyColor:rt(e),imageWidth:jt(i.width),imageX:0,imageY:0}}function Je(t,e){const i=Le(t.themeSlug,e);i.controlsWidth=t.controlsWidth,i.panel=t.panel,Object.assign(t,i)}function C(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function vt(t,e,i){const n=o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0");return`#${n(t)}${n(e)}${n(i)}`}function Bt(t){const e=C(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const i=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function O(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function ye(t,e){const i=.2126*O(t.r)+.7152*O(t.g)+.0722*O(t.b),n=.2126*O(e.r)+.7152*O(e.g)+.0722*O(e.b),o=Math.max(i,n),a=Math.min(i,n);return(o+.05)/(a+.05)}function rt(t){const e=Bt(Ae(t));return e?vt(e.r,e.g,e.b):vt(0,0,0)}function Ae(t){const e=Bt(t)??{r:255,g:255,b:255},i=ye({r:0,g:0,b:0},e),n=ye({r:255,g:255,b:255},e);return i>=4.5&&i>=n?me:n>=4.5?ge:i>=n?me:ge}function Ve(t,e,i){if(e<=0)return[];const n=[];for(const o of t.split(`
`)){const a=o.split(/\s+/).filter(Boolean);if(a.length===0){n.push("");continue}let d="";const f=l=>{if(i(l)<=e){d=l;return}let u="";for(const m of l){const p=u+m;i(p)<=e?u=p:(u&&n.push(u),u=m)}d=u};for(const l of a){const u=d?`${d} ${l}`:l;i(u)<=e?d=u:(d&&n.push(d),f(l))}d&&n.push(d)}return n}function Ft(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Qe(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Ze(t,e){return Qe(t).replaceAll("{{title}}",Ft(e.title)).replaceAll("{{body}}",Ft(e.body)).replaceAll("{{themeImage}}",Ft(e.themeImage))}function Ot(){return`<article class="studio-card">
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
</style>`}function Fe(t){const e=C(t.color)??t.color,i=Ae(e),n=C(t.titleColor)??rt(e),o=C(t.bodyColor)??rt(e),a=Ee(t.radius),d=nt("ig-feed-square"),f=t.width>0?t.width:d.width,l=t.height>0?t.height:d.height,u=t.titleFontStack.replaceAll(";",""),m=t.bodyFontStack.replaceAll(";",""),p=Ze(t.code.trim()||Ot(),t),b=[`--studio-color:${e}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${f}px`,`--studio-height:${l}px`,`--studio-title-font:${u}`,`--studio-body-font:${m}`,`--studio-title-size:${U(t.titleSize,f)}px`,`--studio-body-size:${U(t.bodySize,f)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${jt(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${n}`,`--studio-body-color:${o}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${l}px;margin:0;background:transparent;${b}">${p}</div>`}function ti(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Fe(t)}</body>
</html>`}const qe="design-llm-wiki-pins";function _t(){try{const t=localStorage.getItem(qe);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(i=>typeof i=="string"):[]}catch{return[]}}function ei(t){const e=[...new Set(t)];localStorage.setItem(qe,JSON.stringify(e))}function ii(t){const e=_t(),i=e.includes(t)?e.filter(n=>n!==t):[...e,t];return ei(i),_t()}const We="[a-z0-9]+(?:-[a-z0-9]+)*";function ze(t){const e=t.startsWith("#")?t.slice(1):t,i=e.indexOf("?"),n=i>=0?e.slice(0,i):e,o=i>=0?e.slice(i+1):"",a=n.startsWith("/")?n:`/${n}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:o}}function ni(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${We}$`).test(e)?null:e}function Pe(t){const{path:e}=ze(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function Dt(t=window.location.hash){const{path:e,query:i}=ze(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||Pe(t))return{name:"studio",theme:e==="/studio"?ni(i):null};const n=e.match(new RegExp(`^/capture/(${We})$`));return n?{name:"capture",slug:n[1]}:{name:"notfound",path:e}}function R(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function oi(t){const e=()=>t(Dt());return window.addEventListener("hashchange",e),t(Dt()),()=>window.removeEventListener("hashchange",e)}function Te(t){return[...t].sort((e,i)=>e.capturedAt!==i.capturedAt?e.capturedAt<i.capturedAt?1:-1:e.slug.localeCompare(i.slug))}function be(t,e){return e.every(i=>t.includes(i))}function ri(t,e){const i=e.trim().toLowerCase();return i?[t.slug,t.title,t.service,t.insight,t.platform,t.screenType,t.tone,t.copyTone,t.body,...t.tags,...t.uiPatterns].join(`
`).toLowerCase().includes(i):!0}function si(t,e){return Te(t).filter(i=>!(!ri(i,e.query)||e.platforms.length>0&&!e.platforms.includes(i.platform)||e.screenTypes.length>0&&!e.screenTypes.includes(i.screenType)||e.uiPatterns.length>0&&!be(i.uiPatterns,e.uiPatterns)||e.tags.length>0&&!be(i.tags,e.tags)||e.tones.length>0&&!e.tones.includes(i.tone)))}function c(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Y(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}const Re=[{dim:"platform",field:"platforms",label:"Platform"},{dim:"screenType",field:"screenTypes",label:"Screen type"},{dim:"uiPattern",field:"uiPatterns",label:"UI pattern"},{dim:"tone",field:"tones",label:"Tone"},{dim:"tag",field:"tags",label:"Tags"}];function ai(t){return Object.entries(t).sort((e,i)=>e[1]!==i[1]?i[1]-e[1]:e[0].localeCompare(i[0]))}function di(t){return Re.reduce((e,{field:i})=>e+t[i].length,0)}function li(t,e,i){const n=t[e],o=n.includes(i)?n.filter(a=>a!==i):[...n,i];return{...t,[e]:o}}function ci(t,e){const i=Re.map(({dim:a,field:d,label:f})=>{const l=ai(t.facets[a]);if(l.length===0)return"";const u=l.map(([m,p])=>{const b=e[d].includes(m);return`
          <button type="button" class="chip" data-facet-field="${d}" data-facet-value="${c(m)}" aria-pressed="${b?"true":"false"}">
            ${c(m)} <span class="chip__count">${p}</span>
          </button>`}).join("");return`
      <div class="facet-group">
        <h2 class="facet-group__title">${f}</h2>
        <div class="facet-group__chips">${u}</div>
      </div>
    `}).join(""),n=di(e),o=n>0?`<button type="button" class="button button--secondary" id="archive-clear-facets">Clear filters (${n})</button>`:"";return`
    <details class="archive-filter-panel" ${n>0?"open":""}>
      <summary class="archive-filter-panel__summary">
        Filters${n>0?` (${n} active)`:""}
      </summary>
      <div class="archive-filter-panel__body">
        ${o}${i}
      </div>
    </details>
  `}let ft=null;function ui(t){const e=t.querySelector(".archive-tabs__indicator"),i=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!i)return;const n=i.offsetLeft,o=i.offsetWidth;ft&&(e.style.transition="none",e.style.transform=`translateX(${ft.left}px)`,e.style.width=`${ft.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${n}px)`,e.style.width=`${o}px`,ft={left:n,width:o}})}function qt(t){const e=t.querySelector(".capture-grid");if(!e)return;const i=window.getComputedStyle(e),n=Number.parseFloat(i.gridAutoRows)||1,o=Number.parseFloat(i.rowGap)||0;e.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,l=Math.ceil((d+f+o)/(n+o));a.style.gridRowEnd=`span ${Math.max(1,l)}`})}function hi(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${c(Y(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function pi(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${R({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${hi(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${c(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${c(t.title)}</h2>
          <p class="capture-card__insight">${c(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function fi(t,e){const i=new Set(e),n=Te(t),o=n.filter(u=>i.has(u.slug)),a=n.filter(u=>!i.has(u.slug)),d=new Map(n.map(u=>[u.slug,u])),f=e.map(u=>d.get(u)).filter(u=>!!u),l=o.filter(u=>!e.includes(u.slug));return[...f,...l,...a]}function mi(t,e,i,n){const o=si(t.captures,e),a=new Set(i),d=n==="pin"?o.filter(l=>a.has(l.slug)):o,f=fi(d,i);return t.captures.length===0?`
      <section class="state-panel state-panel--soft" aria-live="polite">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">이 번들에 캡처가 없습니다.</p>
      </section>
    `:`
    <section class="gallery archive">
      <header class="gallery__header archive__header">
        <div>
          <h1 class="gallery__title">Archive</h1>
          <p class="gallery__meta">Target ${c(t.target)} · ${f.length} of ${t.captures.length} · ${i.length} pinned</p>
        </div>
      </header>

      <div class="archive-search-panel">
        <label class="search-field archive-search">
          <span class="search-field__label">Search archive</span>
          <input id="archive-search" class="search-field__input archive-search__input" type="search" value="${c(e.query)}" placeholder="타이틀, 서비스, 태그, 패턴, 인사이트 검색…" />
          ${e.query?'<button type="button" class="archive-search__clear" id="archive-search-clear" aria-label="검색어 지우기">×</button>':""}
        </label>
      </div>

      <div class="archive-filter-wrap">
        <div class="gallery__filters" aria-label="Facet filters">
          ${ci(t,e)}
        </div>
      </div>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${n==="all"?"true":"false"}">
          All <span class="archive-tab__count">${o.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${n==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${i.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${f.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${n==="pin"?"No pinned captures":"No matches"}</h2>
                <p class="state-panel__text">${n==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"검색어나 필터를 지우거나 더 넓은 조건으로 다시 시도하세요."}</p>
              </section>`:`<div class="capture-grid">${f.map(l=>pi(l,i.includes(l.slug))).join("")}</div>`}
      </div>
    </section>
  `}function gi(t,e,i){var d,f;const n=t.querySelector("#archive-search");n==null||n.addEventListener("input",()=>{i.onFilterChange({...e,query:n.value})}),n==null||n.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),i.onClearFilters())}),(d=t.querySelector("#archive-search-clear"))==null||d.addEventListener("click",()=>{i.onClearFilters()}),(f=t.querySelector("#archive-clear-facets"))==null||f.addEventListener("click",()=>i.onClearFilters()),t.querySelectorAll("[data-facet-field]").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset.facetField,m=l.dataset.facetValue;!u||m===void 0||i.onFilterChange(li(e,u,m))})}),t.querySelectorAll("[data-archive-tab]").forEach(l=>{l.addEventListener("click",()=>{const u=l.dataset.archiveTab;(u==="all"||u==="pin")&&i.onTabChange(u)})}),ui(t),requestAnimationFrame(()=>qt(t)),t.querySelectorAll(".capture-card__media").forEach(l=>{l.addEventListener("load",()=>qt(t),{once:!0})});const o=new ResizeObserver(()=>qt(t)),a=t.querySelector(".capture-grid");a&&o.observe(a)}function yi(t){const e=t.replace(/\r\n/g,`
`).split(`
`),i=[];let n=!1;const o=()=>{n&&(i.push("</ul>"),n=!1)};for(const a of e){const d=a.trim();if(!d){o();continue}if(d.startsWith("### ")){o(),i.push(`<h3>${Z(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){o(),i.push(`<h2>${Z(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){o(),i.push(`<h1>${Z(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){n||(i.push("<ul>"),n=!0),i.push(`<li>${Z(d.slice(2))}</li>`);continue}o(),i.push(`<p>${Z(d)}</p>`)}return o(),i.join(`
`)}function Z(t){let e=c(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,n)=>`<a href="${R({name:"capture",slug:n})}">${n}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,n,o)=>o.endsWith(".md")&&!o.includes("://")?`<span>${n}</span>`:`<a href="${c(o)}">${n}</a>`),e}const bi=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function vi(t){return Math.max(35,Math.min(98,Math.round(t)))}function _i(t){let e=0;for(const i of t)e=(e*31+i.charCodeAt(0))%997;return e}function $i(t){var u;if((u=t.analysisScores)!=null&&u.length)return t.analysisScores;const e=_i(`${t.slug}:${t.title}:${t.insight}`),i=t.tags.includes("density")?7:0,n=t.asset.kind==="motion"?8:0,o=Math.min(12,t.uiPatterns.length*3),a=t.asset.width/Math.max(1,t.asset.height),d=a>1.2?6:0,f=a<.75?5:0,l=[68+o+d+e%9,66+i+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+n+(t.uiPatterns.includes("filter-chips")?7:0),62+f+o+(e>>3)%8].map(vi);return bi.map(([m,p],b)=>({key:m,label:p,score:l[b]??60,description:xi(p,l[b]??60,t)}))}function wi(t){return t.length===0?0:Math.round(t.reduce((e,i)=>e+i.score,0)/t.length)}function xi(t,e,i){return t==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function Si(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Mi(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${c(Y(t.asset.posterPath))}"`:""}>
        <source src="${c(Y(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${c(Y(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function Ii(t){const e=$i(t),i=t.analysisTotal??wi(e),n=160,o=110,a=[.25,.5,.75,1].map(l=>e.map((u,m)=>{const p=-Math.PI/2+m*Math.PI*2/e.length,b=n+Math.cos(p)*o*l,w=n+Math.sin(p)*o*l;return`${b.toFixed(1)},${w.toFixed(1)}`}).join(" ")).map(l=>`<polygon class="spider-grid" points="${l}" />`).join(""),d=e.map((l,u)=>{const m=-Math.PI/2+u*Math.PI*2/e.length,p=o*(l.score/100),b=n+Math.cos(m)*p,w=n+Math.sin(m)*p;return`${b.toFixed(1)},${w.toFixed(1)}`}).join(" "),f=e.map((l,u)=>{const m=-Math.PI/2+u*Math.PI*2/e.length,p=n+Math.cos(m)*o,b=n+Math.sin(m)*o,w=n+Math.cos(m)*o*(l.score/100),E=n+Math.sin(m)*o*(l.score/100),W=n+Math.cos(m)*(o+26),z=n+Math.sin(m)*(o+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${n}" y1="${n}" x2="${p.toFixed(1)}" y2="${b.toFixed(1)}" />
          <circle class="spider-point" cx="${w.toFixed(1)}" cy="${E.toFixed(1)}" r="6" />
          <text class="spider-label" x="${W.toFixed(1)}" y="${z.toFixed(1)}">${c(l.label)}</text>
          <text class="spider-callout" x="${W.toFixed(1)}" y="${(z+18).toFixed(1)}">${l.score}</text>
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
          ${e.map(l=>`
            <div class="score-list__item">
              <dt>${c(l.label)} <strong>${l.score}</strong></dt>
              <dd>${c(l.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function ki(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${c(i)}</span>`).join("")}function Ci(t,e,i){const n=t.captures.find(a=>a.slug===e);if(!n)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${c(e)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const o=i.includes(e);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${c(n.service)} · ${c(n.platform)}</p>
          <h1 class="detail__title">${c(n.title)}</h1>
          <p class="detail__insight">${c(n.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${c(R({name:"studio",theme:e}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${c(e)}" aria-pressed="${o?"true":"false"}">
            ${o?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Mi(n)}</div>

      ${Ii(n)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${c(n.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${c(n.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${n.asset.width} × ${n.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${Si(n.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${n.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${n.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${c(n.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${ki(n)}
        </p>
        <p class="detail__meta-line">
          ${c(n.screenType)} · ${c(n.tone)} · ${c(n.copyTone)} · ${c(n.capturedAt)}
          ${n.sourceUrl?` · <a href="${c(n.sourceUrl)}">${c(n.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${yi(n.body)}
      </section>
    </article>
  `}function Ei(t,e){var i;(i=t.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",n=>{const o=n.currentTarget.dataset.pinSlug;o&&e(o)})}function Li(t){const e=t.wiki.logEntries;return e.length===0?`
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
  `}function Ai(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${c(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Xt=new Map,ve=new Map;function Ne(t){const e=Xt.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((i,n)=>{const o=e??new Image;o.onload=()=>i(o),o.onerror=()=>n(new Error(`Image failed: ${t}`)),e||(Xt.set(t,o),o.src=t)})}function _e(t){const e=ve.get(t);if(e)return e;const i=fetch(t).then(n=>{if(!n.ok)throw new Error(`Theme image HTTP ${n.status}`);return n.blob()}).then(n=>new Promise((o,a)=>{const d=new FileReader;d.onload=()=>o(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(n)}));return ve.set(t,i),i}const Fi=Object.assign({}),$e=new Set;function qi(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function st(){const t=new Set(bt.map(i=>i.label.toLowerCase())),e=[];for(const[i,n]of Object.entries(Fi)){const o=Ge(i);if(!o||t.has(o.toLowerCase()))continue;const a=`local:${o}`;if(!e.some(d=>d.id===a)){if(!$e.has(o)){$e.add(o);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(o)};src:url("${n}") format("${qi(n)}");font-display:swap;}`,document.head.append(d)}e.push({id:a,label:o,stack:`${JSON.stringify(o)}, system-ui, sans-serif`})}}return e}function Wi(){return[...bt,...st()]}function zi(t,e,i,n){const o=Math.max(0,Math.min(n,e/2,i/2));t.beginPath(),t.roundRect(0,0,e,i,o)}function we(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:ot(t.titleFontId,st()),bodyFontStack:ot(t.bodyFontId,st()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function xe(t,e,i){const n=t.getContext("2d");if(!n)return[];const o=e.cardWidth,a=e.cardHeight;t.width=o,t.height=a,n.clearRect(0,0,o,a),n.save(),zi(n,o,a,e.radius),n.clip(),n.fillStyle=e.color,n.fillRect(0,0,o,a);const d=[];if(i&&i.naturalWidth>0){const m=e.imageWidth,p=m*(i.naturalHeight/i.naturalWidth);n.drawImage(i,e.imageX,e.imageY,m,p),d.push({kind:"image",x:e.imageX,y:e.imageY,w:m,h:p})}const f=Math.max(1,o-ke*2);n.textBaseline="top";const l=(m,p,b,w,E,W,z,N)=>{if(!p.trim())return;n.fillStyle=N,n.font=`${W} ${E}px ${z}`;const P=Ve(p.trim(),f,F=>n.measureText(F).width),H=Math.round(E*1.25);let T=0;P.forEach((F,j)=>{n.fillText(F,b,w+j*H),T=Math.max(T,n.measureText(F).width)}),d.push({kind:m,x:b,y:w,w:Math.max(T,E),h:Math.max(P.length,1)*H})},u=st();return l("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,ot(e.bodyFontId,u),e.bodyColor),l("title",e.title,e.titleX,e.titleY,e.titleSize,600,ot(e.titleFontId,u),e.titleColor),n.restore(),d}function Se(t,e){t.toBlob(i=>{if(!i)return;const n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=e,o.click(),URL.revokeObjectURL(n)},"image/png")}async function Pi(t,e,i,n){const o=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${n}"><foreignObject x="0" y="0" width="${i}" height="${n}">${e}</foreignObject></svg>`,a=new Blob([o],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const f=await Ne(d),l=t.getContext("2d");if(!l)return;t.width=i,t.height=n,l.clearRect(0,0,i,n),l.drawImage(f,0,0,i,n)}finally{URL.revokeObjectURL(d),Xt.delete(d)}}let tt=null;function Ti(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=rt(t.color);t.titleColor=C(String(t.titleColor??""))??i,t.bodyColor=C(String(t.bodyColor??""))??i;const n=t.fontId;t.titleFontId||(t.titleFontId=n||"pretendard"),t.bodyFontId||(t.bodyFontId=n||"pretendard");const o=nt(t.presetId),a=Pt.map(p=>`<option value="${c(p.id)}"${p.id===o.id?" selected":""}>${c(p.name)} · ${p.width}×${p.height}</option>`).join(""),d=e.map(p=>{const b=p.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${c(p.slug)}"
          aria-checked="${b?"true":"false"}"
          tabindex="${b?"0":"-1"}"
        >
          <img src="${c(Y(p.asset.path))}" alt="${c(p.title)}" />
        </button>
      `}).join(""),f=t.panel==="design",l=Wi(),u=Ut(t.cardWidth),m=p=>l.map(b=>`<option value="${c(b.id)}"${b.id===p?" selected":""}>${c(b.label)}</option>`).join("");return`
    <section class="studio" style="--studio-controls-width:${t.controlsWidth}px">
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
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${D}" max="${et}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${D}" max="${et}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${D}" max="${et}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${D}" max="${et}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${c(t.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker" type="color" value="${c(t.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${c(t.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${u}" step="1" value="${t.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${u}" step="1" value="${t.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${m(t.titleFontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${c(t.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker" type="color" value="${c(t.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${c(t.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${u}" step="1" value="${t.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${u}" step="1" value="${t.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${m(t.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${d}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${yt}" max="${Rt}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${yt}" max="${Rt}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius" type="range" min="${it}" max="${mt}" step="1" value="${t.radius}" aria-valuemin="${it}" aria-valuemax="${mt}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${it}" max="${mt}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
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
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${X}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

      <div class="studio__preview">
        <div class="studio__stage" id="studio-stage">
          <div class="studio__fit" id="studio-fit">
            <div class="studio__scaler" id="studio-scaler">
              <canvas id="studio-canvas" aria-label="카드 프리뷰"></canvas>
              <iframe id="studio-iframe" title="카드 코드 프리뷰" sandbox="" referrerpolicy="no-referrer" hidden></iframe>
              <div class="studio__safe" id="studio-safe" hidden></div>
            </div>
          </div>
        </div>
        <div class="studio__bar">
          <p class="studio__meta" id="studio-meta" aria-live="polite"></p>
          <button type="button" class="button" id="studio-download">PNG 다운로드</button>
        </div>
      </div>
    </section>
  `}function Ri(t,e,i,n){var re,se,ae,de,le,ce,ue,he;if(i.length===0)return;const o=t.querySelector("#studio-preset"),a=t.querySelector("#studio-width"),d=t.querySelector("#studio-width-number"),f=t.querySelector("#studio-height"),l=t.querySelector("#studio-height-number"),u=t.querySelector("#studio-title"),m=t.querySelector("#studio-title-color"),p=t.querySelector("#studio-title-hex"),b=t.querySelector("#studio-title-size"),w=t.querySelector("#studio-title-size-number"),E=t.querySelector("#studio-body"),W=t.querySelector("#studio-body-color"),z=t.querySelector("#studio-body-hex"),N=t.querySelector("#studio-body-size"),P=t.querySelector("#studio-body-size-number"),H=t.querySelector("#studio-title-font"),T=t.querySelector("#studio-body-font"),F=t.querySelector("#studio-image-width"),j=t.querySelector("#studio-image-width-number"),Kt=t.querySelector("#studio-color"),Gt=t.querySelector("#studio-hex"),B=t.querySelector("#studio-radius"),at=t.querySelector("#studio-radius-number"),wt=t.querySelector("#studio-code"),v=t.querySelector("#studio-canvas"),dt=t.querySelector("#studio-iframe"),Jt=t.querySelector("#studio-meta"),K=t.querySelector("#studio-safe"),lt=t.querySelector("#studio-scaler"),xt=t.querySelector("#studio-fit"),St=t.querySelector("#studio-stage"),Mt=t.querySelector("#studio-export"),S=t.querySelector("#studio-splitter"),It=t.querySelector(".studio");if(!o||!a||!d||!f||!l||!u||!m||!p||!b||!w||!E||!W||!z||!N||!P||!H||!T||!F||!j||!Kt||!Gt||!B||!at||!wt||!v||!dt||!Jt||!K||!lt||!xt||!St||!Mt||!S||!It)return;const Vt=()=>{const r=i.find(s=>s.slug===e.themeSlug)??i[0];return r?Y(r.asset.path):""};let ct=0;const kt=()=>{const r=St.getBoundingClientRect(),s=48,h=Math.min(Math.max(r.width-s,1)/e.cardWidth,Math.max(r.height-s,1)/e.cardHeight),g=Number.isFinite(h)&&h>0?h:1;xt.style.width=`${e.cardWidth*g}px`,xt.style.height=`${e.cardHeight*g}px`,lt.style.width=`${e.cardWidth}px`,lt.style.height=`${e.cardHeight}px`,lt.style.transform=`scale(${g})`};let q=null,ut=1,ht=[];const Qt=()=>e.imageWidth*ut,Ct=()=>{e.cardWidth=Ht(e.cardWidth),e.cardHeight=Ht(e.cardHeight),e.titleSize=U(e.titleSize,e.cardWidth),e.bodySize=U(e.bodySize,e.cardWidth),e.imageWidth=jt(e.imageWidth),e.titleX=M(e.titleX,e.cardWidth,e.titleSize),e.titleY=M(e.titleY,e.cardHeight,e.titleSize),e.bodyX=M(e.bodyX,e.cardWidth,e.bodySize),e.bodyY=M(e.bodyY,e.cardHeight,e.bodySize),e.imageX=pt(e.imageX,e.cardWidth,e.imageWidth),e.imageY=pt(e.imageY,e.cardHeight,Qt())},G=(r,s,h)=>{r.value=String(h),document.activeElement!==s&&(s.value=String(h))},Xe=()=>{const r=String(Ut(e.cardWidth));for(const s of[b,w,N,P])s.min="5",s.max=r;G(a,d,e.cardWidth),G(f,l,e.cardHeight),G(b,w,e.titleSize),G(N,P,e.bodySize),G(F,j,e.imageWidth)},Zt=()=>{B.value=String(e.radius),B.setAttribute("aria-valuenow",String(e.radius)),at.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},te=(r,s)=>{e.themeSlug=r;for(const h of t.querySelectorAll("[data-theme-slug]")){const g=h.dataset.themeSlug===r;h.setAttribute("aria-checked",g?"true":"false"),h.tabIndex=g?0:-1,g&&s&&h.focus()}$()},Et=r=>{var y,_;e.panel=r;const s=r==="design";(y=t.querySelector("#studio-panel-design"))==null||y.toggleAttribute("hidden",!s),(_=t.querySelector("#studio-panel-code"))==null||_.toggleAttribute("hidden",s);const h=t.querySelector("#studio-tab-design"),g=t.querySelector("#studio-tab-code");h==null||h.setAttribute("aria-selected",s?"true":"false"),g==null||g.setAttribute("aria-selected",s?"false":"true"),h&&(h.tabIndex=s?0:-1),g&&(g.tabIndex=s?-1:0),$()},$=async()=>{const r=++ct;Ct(),Xe();const s=nt(e.presetId),h=e.cardWidth===s.width&&e.cardHeight===s.height,g=h&&s.safe?` · 안전 영역 ${s.safe.width} × ${s.safe.height}`:"";Jt.textContent=`${e.cardWidth} × ${e.cardHeight} · ${s.name}${g}`,Mt.textContent=Ot(),Zt(),kt(),h&&s.safe?(K.hidden=!1,K.style.width=`${s.safe.width}px`,K.style.height=`${s.safe.height}px`):K.hidden=!0;const y=(Q,Ye,Ue)=>{var fe;const pe=(fe=ot(Q,st()).split(",")[0])==null?void 0:fe.replaceAll('"',"").trim();return pe?document.fonts.load(`${Ye} ${Ue}px "${pe}"`):Promise.resolve()};try{await Promise.all([y(e.titleFontId,600,e.titleSize),y(e.bodyFontId,400,e.bodySize)])}catch{}if(r!==ct)return;const _=Vt();if(e.code.trim()){v.hidden=!0,dt.hidden=!1;const Q=_?await _e(_):"";if(r!==ct)return;dt.srcdoc=ti(we(e,Q));return}if(dt.hidden=!0,v.hidden=!1,_)try{q=await Ne(_),q.naturalWidth>0&&(ut=q.naturalHeight/q.naturalWidth)}catch{q=null,ut=1}else q=null,ut=1;r===ct&&(Ct(),ht=xe(v,e,q))},J=(r,s,h,g)=>{r.addEventListener("input",()=>{h(Number(r.value)),$()});const y=()=>{Ct(),s.value=String(g())};s.addEventListener("input",()=>{s.value.trim()!==""&&(h(Number(s.value)),$())}),s.addEventListener("change",y),s.addEventListener("blur",y)};o.addEventListener("change",()=>{const r=nt(o.value);e.presetId=r.id,e.cardWidth=r.width,e.cardHeight=r.height,$()}),J(a,d,r=>{e.cardWidth=r},()=>e.cardWidth),J(f,l,r=>{e.cardHeight=r},()=>e.cardHeight),J(b,w,r=>{e.titleSize=r},()=>e.titleSize),J(N,P,r=>{e.bodySize=r},()=>e.bodySize),J(F,j,r=>{e.imageWidth=r},()=>e.imageWidth),H.addEventListener("change",()=>{e.titleFontId=H.value,$()}),T.addEventListener("change",()=>{e.bodyFontId=T.value,$()}),(re=t.querySelector("#studio-reset"))==null||re.addEventListener("click",()=>{n()}),u.addEventListener("input",()=>{e.title=u.value,$()}),E.addEventListener("input",()=>{e.body=E.value,$()});const Lt=(r,s,h,g)=>{r.addEventListener("input",()=>{const y=C(r.value);y&&(h(y),s.value=y,$())}),s.addEventListener("input",()=>{const y=C(s.value);y&&(h(y),r.value=y,$())}),s.addEventListener("blur",()=>{C(s.value)||(s.value=g())})};Lt(Kt,Gt,r=>{e.color=r},()=>e.color),Lt(m,p,r=>{e.titleColor=r},()=>e.titleColor),Lt(W,z,r=>{e.bodyColor=r},()=>e.bodyColor);const ee=r=>{e.radius=Ee(Number(r)),Zt(),$()};B.addEventListener("input",()=>ee(B.value)),at.addEventListener("input",()=>ee(at.value)),wt.addEventListener("input",()=>{e.code=wt.value,$()}),(se=t.querySelector("#studio-tab-design"))==null||se.addEventListener("click",()=>Et("design")),(ae=t.querySelector("#studio-tab-code"))==null||ae.addEventListener("click",()=>Et("code")),(de=t.querySelector(".studio__tabs"))==null||de.addEventListener("keydown",r=>{var h;if(!(r instanceof KeyboardEvent)||r.key!=="ArrowRight"&&r.key!=="ArrowLeft")return;r.preventDefault();const s=e.panel==="design"?"code":"design";Et(s),(h=t.querySelector(s==="design"?"#studio-tab-design":"#studio-tab-code"))==null||h.focus()});const V=[...t.querySelectorAll("[data-theme-slug]")];for(const r of V)r.addEventListener("click",()=>{const s=r.dataset.themeSlug;s&&te(s,!1)});(le=t.querySelector(".studio__themes"))==null||le.addEventListener("keydown",r=>{if(!(r instanceof KeyboardEvent))return;const s=r.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(s))return;r.preventDefault();const h=V.findIndex(Q=>Q.dataset.themeSlug===e.themeSlug),y=V[(h+(s==="ArrowLeft"||s==="ArrowUp"?-1:1)+V.length)%V.length],_=y==null?void 0:y.dataset.themeSlug;_&&te(_,!0)}),(ce=t.querySelector("#studio-copy"))==null||ce.addEventListener("click",async()=>{const r=Ot();Mt.textContent=r;try{await navigator.clipboard.writeText(r)}catch{const h=document.createElement("textarea");h.value=r,document.body.append(h),h.select(),document.execCommand("copy"),h.remove()}const s=t.querySelector("#studio-copy");s&&(s.textContent="복사됨",window.setTimeout(()=>{s.textContent="현재 디자인을 코드로 복사"},1200))}),(ue=t.querySelector("#studio-download"))==null||ue.addEventListener("click",()=>{(async()=>{const r=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){Se(v,r);return}const s=Vt(),h=s?await _e(s):"",g=document.createElement("canvas");await Pi(g,Fe(we(e,h)),e.cardWidth,e.cardHeight),Se(g,r)})()});const ie=r=>{const s=v.getBoundingClientRect();return{x:s.width>0?(r.clientX-s.left)/s.width*e.cardWidth:0,y:s.height>0?(r.clientY-s.top)/s.height*e.cardHeight:0}},ne=(r,s)=>{for(let g=ht.length-1;g>=0;g-=1){const y=ht[g];if(y&&r>=y.x-8&&s>=y.y-8&&r<=y.x+y.w+8&&s<=y.y+y.h+8)return y}return null};let I=null;v.addEventListener("pointerdown",r=>{if(e.code.trim())return;const s=ie(r),h=ne(s.x,s.y);if(h){try{v.setPointerCapture(r.pointerId)}catch{}I={kind:h.kind,dx:s.x-h.x,dy:s.y-h.y,pointerId:r.pointerId},v.dataset.dragging="true"}}),v.addEventListener("pointermove",r=>{const s=ie(r);if(!I||I.pointerId!==r.pointerId){v.dataset.hover=ne(s.x,s.y)?"true":"false";return}const h=s.x-I.dx,g=s.y-I.dy;I.kind==="title"?(e.titleX=M(h,e.cardWidth,e.titleSize),e.titleY=M(g,e.cardHeight,e.titleSize)):I.kind==="body"?(e.bodyX=M(h,e.cardWidth,e.bodySize),e.bodyY=M(g,e.cardHeight,e.bodySize)):(e.imageX=pt(h,e.cardWidth,e.imageWidth),e.imageY=pt(g,e.cardHeight,Qt())),ht=xe(v,e,q)});const oe=r=>{!I||I.pointerId!==r.pointerId||(I=null,delete v.dataset.dragging)};v.addEventListener("pointerup",oe),v.addEventListener("pointercancel",oe);const At=r=>{const s=It.getBoundingClientRect().width,h=X+Nt+10,g=Number.isFinite(r)?r:e.controlsWidth;e.controlsWidth=s>=h?Ke(g,s):Math.max(X,Math.round(g)),It.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),S.setAttribute("aria-valuenow",String(e.controlsWidth)),S.setAttribute("aria-valuemax",String(s>=h?Math.max(X,Math.round(s)-Nt-10):e.controlsWidth)),kt()};At(e.controlsWidth),S.addEventListener("pointerdown",r=>{if(window.matchMedia("(max-width: 1023px)").matches)return;try{S.setPointerCapture(r.pointerId)}catch{}const s=r.clientX,h=e.controlsWidth,g=_=>{_.pointerId===r.pointerId&&At(h+_.clientX-s)},y=_=>{_.pointerId===r.pointerId&&(S.removeEventListener("pointermove",g),S.removeEventListener("pointerup",y),S.removeEventListener("pointercancel",y))};S.addEventListener("pointermove",g),S.addEventListener("pointerup",y),S.addEventListener("pointercancel",y)}),S.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;r.preventDefault();const s=r.shiftKey?48:16;At(e.controlsWidth+(r.key==="ArrowRight"?s:-s))}),(he=t.querySelector("#studio-controls"))==null||he.addEventListener("submit",r=>{r.preventDefault()}),tt==null||tt.disconnect(),tt=new ResizeObserver(()=>kt()),tt.observe(St),$()}const He="design-llm-wiki-mode",Me="./data/index.json";let k={status:"loading"},gt={query:"",platforms:[],screenTypes:[],uiPatterns:[],tags:[],tones:[]},$t=_t(),Oe="all",A=null,Wt=null,x=Dt();function Yt(){return localStorage.getItem(He)==="dark"?"dark":"light"}function Ie(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(He,t)}function zt(t,e,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${e}" ${i?'aria-current="page"':""}>${t}</a>`}function Ni(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function De(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=Bt(t);return e?vt(e.r,e.g,e.b):C(t)??vt(216,241,255)}function Hi(t,e){var n;const i=t&&e.some(o=>o.slug===t)?t:null;return A?(t&&t!==Wt&&i&&(A.themeSlug=i,Wt=t),A):(A=Le(i??((n=e[0])==null?void 0:n.slug)??"",De()),Wt=t,A)}function Oi(t){const e=Yt(),i=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",n=x.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${zt("Archive",R({name:"archive"}),x.name==="archive"||x.name==="capture")}
        ${zt("Online Marketing Studio",R({name:"studio",theme:null}),x.name==="studio")}
        ${zt("History",R({name:"history"}),x.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${Ni(e)}
        </button>
      </div>
    </header>
    <main class="shell${n?" shell--studio":""}" id="main">${t}</main>
  `}function Di(){if(k.status==="loading")return`
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
    `;const t=k.index;switch(x.name){case"archive":return mi(t,gt,$t,Oe);case"capture":return Ci(t,x.slug,$t);case"studio":return Ti(Hi(x.theme,t.captures),t.captures);case"history":return Li(t);case"notfound":return Ai(x.path)}}function L(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Ie(Yt()),$t=_t(),t.innerHTML=Oi(Di()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{Ie(Yt()==="dark"?"light":"dark"),L()}),k.status==="ready"&&(x.name==="archive"&&gi(t,gt,{onFilterChange:i=>{const n=document.activeElement,o=(n==null?void 0:n.id)==="archive-search"?"search":null;if(gt=i,L(),o==="search"){const a=document.querySelector("#archive-search");a==null||a.focus();const d=(a==null?void 0:a.value.length)??0;a==null||a.setSelectionRange(d,d)}},onClearFilters:()=>{var i;gt={query:"",platforms:[],screenTypes:[],uiPatterns:[],tags:[],tones:[]},L(),(i=document.querySelector("#archive-search"))==null||i.focus()},onTabChange:i=>{var n;Oe=i,L(),(n=document.querySelector(`[data-archive-tab="${i}"]`))==null||n.focus()}}),x.name==="capture"&&Ei(t,i=>{$t=ii(i),L()}),x.name==="studio"&&k.status==="ready"&&A&&Ri(t,A,k.index.captures,()=>{var i;A&&(Je(A,De()),L(),(i=document.querySelector("#studio-reset"))==null||i.focus())}))}async function Xi(){k={status:"loading"},L();try{const t=await fetch(Me,{cache:"no-store"});if(!t.ok)throw new Error(`${Me} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");k={status:"ready",index:e}}catch(t){k={status:"error",message:t instanceof Error?t.message:String(t)}}L()}oi(t=>{if(Pe(window.location.hash)){window.location.replace(R({name:"studio",theme:null}));return}x=t,L()});Xi();
