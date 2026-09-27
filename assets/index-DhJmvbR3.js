(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const Ue="ig-feed-square",V=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function I(e){return V.find(t=>t.id===e)??V[0]}const B=0,j=120,Be=28,fe="rgb(0, 0, 0)",ge="rgb(255, 255, 255)";function Se(e){return Number.isFinite(e)?Math.min(j,Math.max(B,Math.round(e))):B}function P(e){const t=e.trim().match(/^#([0-9a-fA-F]{6})$/);return t?`#${t[1].toLowerCase()}`:null}function me(e,t,i){const s=n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,"0");return`#${s(e)}${s(t)}${s(i)}`}function ke(e){const t=P(e);if(t)return{r:Number.parseInt(t.slice(1,3),16),g:Number.parseInt(t.slice(3,5),16),b:Number.parseInt(t.slice(5,7),16)};const i=e.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function L(e){const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4}function ye(e,t){const i=.2126*L(e.r)+.7152*L(e.g)+.0722*L(e.b),s=.2126*L(t.r)+.7152*L(t.g)+.0722*L(t.b),n=Math.max(i,s),r=Math.min(i,s);return(n+.05)/(r+.05)}function Ae(e){const t=ke(e)??{r:255,g:255,b:255},i=ye({r:0,g:0,b:0},t),s=ye({r:255,g:255,b:255},t);return i>=4.5&&i>=s?fe:s>=4.5?ge:i>=s?fe:ge}function De(e,t,i){if(t<=0)return[];const s=[];for(const n of e.split(`
`)){const r=n.split(/\s+/).filter(Boolean);if(r.length===0){s.push("");continue}let a="";const h=o=>{if(i(o)<=t){a=o;return}let d="";for(const p of o){const g=d+p;i(g)<=t?d=g:(d&&s.push(d),d=p)}a=d};for(const o of r){const d=a?`${a} ${o}`:o;i(d)<=t?a=d:(a&&s.push(a),h(o))}a&&s.push(a)}return s}function je(e,t,i,s){const n=Math.max(i/e,s/t),r=e*n,a=t*n;return{x:(i-r)/2,y:(s-a)/2,w:r,h:a}}function Y(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Oe(e){return e.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function He(e,t){return Oe(e).replaceAll("{{title}}",Y(t.title)).replaceAll("{{body}}",Y(t.body)).replaceAll("{{themeImage}}",Y(t.themeImage))}function Q(){return`<article class="studio-card">
  <img src="{{themeImage}}" alt="" />
  <div class="studio-card__copy">
    <h1>{{title}}</h1>
    <p>{{body}}</p>
  </div>
</article>
<style>
  .studio-card {
    box-sizing: border-box;
    width: var(--studio-width);
    height: var(--studio-height);
    margin: 0;
    overflow: hidden;
    background: var(--studio-color);
    border-radius: var(--studio-radius);
    font-family: "Pretendard Variable", Pretendard, system-ui, sans-serif;
    color: var(--studio-ink);
  }
  .studio-card img {
    display: block;
    width: 100%;
    height: 72%;
    object-fit: cover;
  }
  .studio-card__copy { padding: 4% 5% 0; }
  .studio-card h1:empty, .studio-card p:empty { display: none; }
  .studio-card h1 {
    margin: 0 0 0.35em;
    font-size: calc(var(--studio-width) * 0.046);
    font-weight: 600;
    line-height: 1.15;
  }
  .studio-card p {
    margin: 0;
    font-size: calc(var(--studio-width) * 0.026);
    line-height: 1.4;
  }
</style>`}function Me(e){const t=P(e.color)??e.color,i=Ae(t),s=Se(e.radius),n=I("ig-feed-square"),r=e.width>0?e.width:n.width,a=e.height>0?e.height:n.height,h=He(e.code.trim()||Q(),e);return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${r}px;height:${a}px;margin:0;background:transparent;--studio-color:${t};--studio-ink:${i};--studio-radius:${s}px;--studio-width:${r}px;--studio-height:${a}px">${h}</div>`}function We(e){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Me(e)}</body>
</html>`}const Ee="design-llm-wiki-pins";function H(){try{const e=localStorage.getItem(Ee);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter(i=>typeof i=="string"):[]}catch{return[]}}function ze(e){const t=[...new Set(e)];localStorage.setItem(Ee,JSON.stringify(t))}function Ke(e){const t=H(),i=t.includes(e)?t.filter(s=>s!==e):[...t,e];return ze(i),H()}const qe="[a-z0-9]+(?:-[a-z0-9]+)*";function Le(e){const t=e.startsWith("#")?e.slice(1):e,i=t.indexOf("?"),s=i>=0?t.slice(0,i):t,n=i>=0?t.slice(i+1):"",r=s.startsWith("/")?s:`/${s}`;return{path:r==="/"||r===""?"/":r.replace(/\/+$/,"")||"/",query:n}}function Ye(e){const t=new URLSearchParams(e).get("theme");return!t||!new RegExp(`^${qe}$`).test(t)?null:t}function Ie(e){const{path:t}=Le(e);return t==="/intake"||t==="/design-system"||t==="/stats"}function Z(e=window.location.hash){const{path:t,query:i}=Le(e);if(t==="/"||t==="/gallery")return{name:"archive"};if(t==="/history")return{name:"history"};if(t==="/studio"||Ie(e))return{name:"studio",theme:t==="/studio"?Ye(i):null};const s=t.match(new RegExp(`^/capture/(${qe})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:t}}function q(e){switch(e.name){case"archive":return"#/";case"capture":return`#/capture/${e.slug}`;case"studio":return e.theme?`#/studio?theme=${e.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${e.path}`}}function Ge(e){const t=()=>e(Z());return window.addEventListener("hashchange",t),e(Z()),()=>window.removeEventListener("hashchange",t)}function Pe(e){return[...e].sort((t,i)=>t.capturedAt!==i.capturedAt?t.capturedAt<i.capturedAt?1:-1:t.slug.localeCompare(i.slug))}function ve(e,t){return t.every(i=>e.includes(i))}function Xe(e,t){const i=t.trim().toLowerCase();return i?[e.slug,e.title,e.service,e.insight,e.platform,e.screenType,e.tone,e.copyTone,e.body,...e.tags,...e.uiPatterns].join(`
`).toLowerCase().includes(i):!0}function Je(e,t){return Pe(e).filter(i=>!(!Xe(i,t.query)||t.platforms.length>0&&!t.platforms.includes(i.platform)||t.screenTypes.length>0&&!t.screenTypes.includes(i.screenType)||t.uiPatterns.length>0&&!ve(i.uiPatterns,t.uiPatterns)||t.tags.length>0&&!ve(i.tags,t.tags)||t.tones.length>0&&!t.tones.includes(i.tone)))}function l(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function T(e){return e.startsWith("./")||e.startsWith("/")||e.startsWith("blob:")||e.startsWith("data:")||e.startsWith("http://")||e.startsWith("https://")?e:`./${e}`}const Te=[{dim:"platform",field:"platforms",label:"Platform"},{dim:"screenType",field:"screenTypes",label:"Screen type"},{dim:"uiPattern",field:"uiPatterns",label:"UI pattern"},{dim:"tone",field:"tones",label:"Tone"},{dim:"tag",field:"tags",label:"Tags"}];function Ve(e){return Object.entries(e).sort((t,i)=>t[1]!==i[1]?i[1]-t[1]:t[0].localeCompare(i[0]))}function Qe(e){return Te.reduce((t,{field:i})=>t+e[i].length,0)}function Ze(e,t,i){const s=e[t],n=s.includes(i)?s.filter(r=>r!==i):[...s,i];return{...e,[t]:n}}function et(e,t){const i=Te.map(({dim:r,field:a,label:h})=>{const o=Ve(e.facets[r]);if(o.length===0)return"";const d=o.map(([p,g])=>{const m=t[a].includes(p);return`
          <button type="button" class="chip" data-facet-field="${a}" data-facet-value="${l(p)}" aria-pressed="${m?"true":"false"}">
            ${l(p)} <span class="chip__count">${g}</span>
          </button>`}).join("");return`
      <div class="facet-group">
        <h2 class="facet-group__title">${h}</h2>
        <div class="facet-group__chips">${d}</div>
      </div>
    `}).join(""),s=Qe(t),n=s>0?`<button type="button" class="button button--secondary" id="archive-clear-facets">Clear filters (${s})</button>`:"";return`
    <details class="archive-filter-panel" ${s>0?"open":""}>
      <summary class="archive-filter-panel__summary">
        Filters${s>0?` (${s} active)`:""}
      </summary>
      <div class="archive-filter-panel__body">
        ${n}${i}
      </div>
    </details>
  `}let D=null;function tt(e){const t=e.querySelector(".archive-tabs__indicator"),i=e.querySelector('.archive-tab[aria-selected="true"]');if(!t||!i)return;const s=i.offsetLeft,n=i.offsetWidth;D&&(t.style.transition="none",t.style.transform=`translateX(${D.left}px)`,t.style.width=`${D.width}px`,t.offsetWidth,t.style.transition=""),requestAnimationFrame(()=>{t.style.transform=`translateX(${s}px)`,t.style.width=`${n}px`,D={left:s,width:n}})}function G(e){const t=e.querySelector(".capture-grid");if(!t)return;const i=window.getComputedStyle(t),s=Number.parseFloat(i.gridAutoRows)||1,n=Number.parseFloat(i.rowGap)||0;t.querySelectorAll(".capture-card").forEach(r=>{r.style.gridRowEnd="";const a=r.getBoundingClientRect().height,h=Number.parseFloat(window.getComputedStyle(r).marginBottom)||0,o=Math.ceil((a+h+n)/(s+n));r.style.gridRowEnd=`span ${Math.max(1,o)}`})}function st(e){const t=e.asset.kind==="motion"&&e.asset.posterPath?e.asset.posterPath:e.asset.path;return`<img class="capture-card__media" src="${l(T(t))}" alt="" loading="lazy" width="${e.asset.width}" height="${e.asset.height}" />`}function it(e,t){return`
    <article class="capture-card${t?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${q({name:"capture",slug:e.slug})}">
        <div class="capture-card__frame">
          ${st(e)}
          ${e.asset.kind==="still"?"":`<span class="capture-card__kind">${l(e.asset.kind)}</span>`}
          ${t?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${l(e.title)}</h2>
          <p class="capture-card__insight">${l(e.insight)}</p>
        </div>
      </a>
    </article>
  `}function nt(e,t){const i=new Set(t),s=Pe(e),n=s.filter(d=>i.has(d.slug)),r=s.filter(d=>!i.has(d.slug)),a=new Map(s.map(d=>[d.slug,d])),h=t.map(d=>a.get(d)).filter(d=>!!d),o=n.filter(d=>!t.includes(d.slug));return[...h,...o,...r]}function at(e,t,i,s){const n=Je(e.captures,t),r=new Set(i),a=s==="pin"?n.filter(o=>r.has(o.slug)):n,h=nt(a,i);return e.captures.length===0?`
      <section class="state-panel state-panel--soft" aria-live="polite">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">이 번들에 캡처가 없습니다.</p>
      </section>
    `:`
    <section class="gallery archive">
      <header class="gallery__header archive__header">
        <div>
          <h1 class="gallery__title">Archive</h1>
          <p class="gallery__meta">Target ${l(e.target)} · ${h.length} of ${e.captures.length} · ${i.length} pinned</p>
        </div>
      </header>

      <div class="archive-search-panel">
        <label class="search-field archive-search">
          <span class="search-field__label">Search archive</span>
          <input id="archive-search" class="search-field__input archive-search__input" type="search" value="${l(t.query)}" placeholder="타이틀, 서비스, 태그, 패턴, 인사이트 검색…" />
          ${t.query?'<button type="button" class="archive-search__clear" id="archive-search-clear" aria-label="검색어 지우기">×</button>':""}
        </label>
      </div>

      <div class="archive-filter-wrap">
        <div class="gallery__filters" aria-label="Facet filters">
          ${et(e,t)}
        </div>
      </div>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${s==="all"?"true":"false"}">
          All <span class="archive-tab__count">${n.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${s==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${i.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${h.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${s==="pin"?"No pinned captures":"No matches"}</h2>
                <p class="state-panel__text">${s==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"검색어나 필터를 지우거나 더 넓은 조건으로 다시 시도하세요."}</p>
              </section>`:`<div class="capture-grid">${h.map(o=>it(o,i.includes(o.slug))).join("")}</div>`}
      </div>
    </section>
  `}function rt(e,t,i){var a,h;const s=e.querySelector("#archive-search");s==null||s.addEventListener("input",()=>{i.onFilterChange({...t,query:s.value})}),s==null||s.addEventListener("keydown",o=>{o.key==="Escape"&&(o.preventDefault(),i.onClearFilters())}),(a=e.querySelector("#archive-search-clear"))==null||a.addEventListener("click",()=>{i.onClearFilters()}),(h=e.querySelector("#archive-clear-facets"))==null||h.addEventListener("click",()=>i.onClearFilters()),e.querySelectorAll("[data-facet-field]").forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.facetField,p=o.dataset.facetValue;!d||p===void 0||i.onFilterChange(Ze(t,d,p))})}),e.querySelectorAll("[data-archive-tab]").forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.archiveTab;(d==="all"||d==="pin")&&i.onTabChange(d)})}),tt(e),requestAnimationFrame(()=>G(e)),e.querySelectorAll(".capture-card__media").forEach(o=>{o.addEventListener("load",()=>G(e),{once:!0})});const n=new ResizeObserver(()=>G(e)),r=e.querySelector(".capture-grid");r&&n.observe(r)}function ot(e){const t=e.replace(/\r\n/g,`
`).split(`
`),i=[];let s=!1;const n=()=>{s&&(i.push("</ul>"),s=!1)};for(const r of t){const a=r.trim();if(!a){n();continue}if(a.startsWith("### ")){n(),i.push(`<h3>${N(a.slice(4))}</h3>`);continue}if(a.startsWith("## ")){n(),i.push(`<h2>${N(a.slice(3))}</h2>`);continue}if(a.startsWith("# ")){n(),i.push(`<h1>${N(a.slice(2))}</h1>`);continue}if(a.startsWith("- ")){s||(i.push("<ul>"),s=!0),i.push(`<li>${N(a.slice(2))}</li>`);continue}n(),i.push(`<p>${N(a)}</p>`)}return n(),i.join(`
`)}function N(e){let t=l(e);return t=t.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,s)=>`<a href="${q({name:"capture",slug:s})}">${s}</a>`),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,s,n)=>n.endsWith(".md")&&!n.includes("://")?`<span>${s}</span>`:`<a href="${l(n)}">${s}</a>`),t}const ct=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function lt(e){return Math.max(35,Math.min(98,Math.round(e)))}function dt(e){let t=0;for(const i of e)t=(t*31+i.charCodeAt(0))%997;return t}function ut(e){var d;if((d=e.analysisScores)!=null&&d.length)return e.analysisScores;const t=dt(`${e.slug}:${e.title}:${e.insight}`),i=e.tags.includes("density")?7:0,s=e.asset.kind==="motion"?8:0,n=Math.min(12,e.uiPatterns.length*3),r=e.asset.width/Math.max(1,e.asset.height),a=r>1.2?6:0,h=r<.75?5:0,o=[68+n+a+t%9,66+i+(t>>1)%10,64+(e.insight.length>45?8:3)+(t>>2)%9,58+s+(e.uiPatterns.includes("filter-chips")?7:0),62+h+n+(t>>3)%8].map(lt);return ct.map(([p,g],m)=>({key:p,label:g,score:o[m]??60,description:pt(g,o[m]??60,e)}))}function ht(e){return e.length===0?0:Math.round(e.reduce((t,i)=>t+i.score,0)/e.length)}function pt(e,t,i){return e==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:e==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":e==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":e==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":t>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function ft(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(2)} MB`}function gt(e){return e.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${e.asset.posterPath?` poster="${l(T(e.asset.posterPath))}"`:""}>
        <source src="${l(T(e.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${l(T(e.asset.path))}"
      alt=""
      width="${e.asset.width}"
      height="${e.asset.height}"
    />
  `}function mt(e){const t=ut(e),i=e.analysisTotal??ht(t),s=160,n=110,r=[.25,.5,.75,1].map(o=>t.map((d,p)=>{const g=-Math.PI/2+p*Math.PI*2/t.length,m=s+Math.cos(g)*n*o,_=s+Math.sin(g)*n*o;return`${m.toFixed(1)},${_.toFixed(1)}`}).join(" ")).map(o=>`<polygon class="spider-grid" points="${o}" />`).join(""),a=t.map((o,d)=>{const p=-Math.PI/2+d*Math.PI*2/t.length,g=n*(o.score/100),m=s+Math.cos(p)*g,_=s+Math.sin(p)*g;return`${m.toFixed(1)},${_.toFixed(1)}`}).join(" "),h=t.map((o,d)=>{const p=-Math.PI/2+d*Math.PI*2/t.length,g=s+Math.cos(p)*n,m=s+Math.sin(p)*n,_=s+Math.cos(p)*n*(o.score/100),x=s+Math.sin(p)*n*(o.score/100),S=s+Math.cos(p)*(n+26),k=s+Math.sin(p)*(n+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${g.toFixed(1)}" y2="${m.toFixed(1)}" />
          <circle class="spider-point" cx="${_.toFixed(1)}" cy="${x.toFixed(1)}" r="6" />
          <text class="spider-label" x="${S.toFixed(1)}" y="${k.toFixed(1)}">${l(o.label)}</text>
          <text class="spider-callout" x="${S.toFixed(1)}" y="${(k+18).toFixed(1)}">${o.score}</text>
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
          ${r}
          <polygon class="spider-area" points="${a}" />
          ${h}
        </svg>
        <dl class="score-list">
          ${t.map(o=>`
            <div class="score-list__item">
              <dt>${l(o.label)} <strong>${o.score}</strong></dt>
              <dd>${l(o.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function yt(e){const t=[...e.tags,...e.uiPatterns,e.screenType,e.platform,e.tone,e.copyTone];return[...new Set(t)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${l(i)}</span>`).join("")}function vt(e,t,i){const s=e.captures.find(r=>r.slug===t);if(!s)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${l(t)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const n=i.includes(t);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${l(s.service)} · ${l(s.platform)}</p>
          <h1 class="detail__title">${l(s.title)}</h1>
          <p class="detail__insight">${l(s.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${l(q({name:"studio",theme:t}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${l(t)}" aria-pressed="${n?"true":"false"}">
            ${n?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${gt(s)}</div>

      ${mt(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${l(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${l(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${ft(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${l(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${yt(s)}
        </p>
        <p class="detail__meta-line">
          ${l(s.screenType)} · ${l(s.tone)} · ${l(s.copyTone)} · ${l(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${l(s.sourceUrl)}">${l(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${ot(s.body)}
      </section>
    </article>
  `}function bt(e,t){var i;(i=e.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",s=>{const n=s.currentTarget.dataset.pinSlug;n&&t(n)})}function _t(e){const t=e.wiki.logEntries;return t.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${t.length} entries · target ${l(e.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${t.map(i=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${l(i.date)}">${l(i.date)}</time>
            <span class="history-item__op">${l(i.operation)}</span>
            <strong class="history-item__title">${l(i.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function $t(e){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${l(e)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const ee=new Map,be=new Map;function Ce(e){const t=ee.get(e);return t!=null&&t.complete&&t.naturalWidth>0?Promise.resolve(t):new Promise((i,s)=>{const n=t??new Image;n.onload=()=>i(n),n.onerror=()=>s(new Error(`Image failed: ${e}`)),t||(ee.set(e,n),n.src=e)})}function _e(e){const t=be.get(e);if(t)return t;const i=fetch(e).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((n,r)=>{const a=new FileReader;a.onload=()=>n(String(a.result)),a.onerror=()=>r(a.error??new Error("data url failed")),a.readAsDataURL(s)}));return be.set(e,i),i}function wt(e,t,i,s){const n=Math.max(0,Math.min(s,t/2,i/2));e.beginPath(),e.roundRect(0,0,t,i,n)}function xt(e,t,i){const s=I(t.presetId),n=e.getContext("2d");if(!n)return;e.width=s.width,e.height=s.height,n.clearRect(0,0,s.width,s.height),n.save(),wt(n,s.width,s.height,t.radius),n.clip(),n.fillStyle=t.color,n.fillRect(0,0,s.width,s.height);const r=Math.round(s.height*.28),a=s.height-r;if(i&&i.naturalWidth>0){const m=je(i.naturalWidth,i.naturalHeight,s.width,a);n.drawImage(i,m.x,m.y,m.w,m.h)}const h=Ae(t.color),o=Math.round(s.width*.05),d=s.width-o*2;let p=a+o;n.fillStyle=h,n.textBaseline="top";const g=(m,_,x,S)=>{if(!m.trim()||d<=0)return;n.font=`${x} ${_}px "Pretendard Variable", Pretendard, system-ui, sans-serif`;const k=Math.round(_*1.25);for(const C of De(m.trim(),d,F=>n.measureText(F).width)){if(p+k>s.height-o/2)break;n.fillText(C,o,p),p+=k}p+=S};g(t.title,Math.max(16,Math.round(s.width*.046)),600,Math.round(s.width*.012)),g(t.body,Math.max(14,Math.round(s.width*.026)),400,0),n.restore()}function $e(e,t){e.toBlob(i=>{if(!i)return;const s=URL.createObjectURL(i),n=document.createElement("a");n.href=s,n.download=t,n.click(),URL.revokeObjectURL(s)},"image/png")}async function St(e,t,i,s){const n=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${s}"><foreignObject x="0" y="0" width="${i}" height="${s}">${t}</foreignObject></svg>`,r=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),a=URL.createObjectURL(r);try{const h=await Ce(a),o=e.getContext("2d");if(!o)return;e.width=i,e.height=s,o.clearRect(0,0,i,s),o.drawImage(h,0,0,i,s)}finally{URL.revokeObjectURL(a),ee.delete(a)}}let U=null;function kt(e,t){if(t.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=I(e.presetId),s=V.map(a=>`<option value="${l(a.id)}"${a.id===i.id?" selected":""}>${l(a.name)} · ${a.width}×${a.height}</option>`).join(""),n=t.map(a=>{const h=a.slug===e.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${l(a.slug)}"
          aria-checked="${h?"true":"false"}"
          tabindex="${h?"0":"-1"}"
        >
          <img src="${l(T(a.asset.path))}" alt="${l(a.title)}" />
        </button>
      `}).join(""),r=e.panel==="design";return`
    <section class="studio">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${r?"true":"false"}" tabindex="${r?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${r?"false":"true"}" tabindex="${r?"-1":"0"}">Code</button>
        </div>

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${r?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기</label>
            <select id="studio-preset" class="studio__control">${s}</select>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${l(e.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${l(e.body)}</textarea>
          </div>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${n}</div>
          </div>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${l(e.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${l(e.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${B}" max="${j}" step="1" value="${e.radius}" aria-valuemin="${B}" aria-valuemax="${j}" aria-valuenow="${e.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${B}" max="${j}" step="1" value="${e.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${r?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${l(e.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>

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
  `}function At(e,t,i){var oe,ce,le,de,ue,he,pe;if(i.length===0)return;const s=e.querySelector("#studio-preset"),n=e.querySelector("#studio-title"),r=e.querySelector("#studio-body"),a=e.querySelector("#studio-color"),h=e.querySelector("#studio-hex"),o=e.querySelector("#studio-radius"),d=e.querySelector("#studio-radius-number"),p=e.querySelector("#studio-code"),g=e.querySelector("#studio-canvas"),m=e.querySelector("#studio-iframe"),_=e.querySelector("#studio-meta"),x=e.querySelector("#studio-safe"),S=e.querySelector("#studio-scaler"),k=e.querySelector("#studio-fit"),C=e.querySelector("#studio-stage"),F=e.querySelector("#studio-export");if(!s||!n||!r||!a||!h||!o||!d||!p||!g||!m||!_||!x||!S||!k||!C||!F)return;const se=()=>{const c=i.find(u=>u.slug===t.themeSlug)??i[0];return c?T(c.asset.path):""};let z=0;const ie=()=>{const c=I(t.presetId),u=C.getBoundingClientRect(),f=48,y=Math.min(Math.max(u.width-f,1)/c.width,Math.max(u.height-f,1)/c.height),v=Number.isFinite(y)&&y>0?y:1;k.style.width=`${c.width*v}px`,k.style.height=`${c.height*v}px`,S.style.width=`${c.width}px`,S.style.height=`${c.height}px`,S.style.transform=`scale(${v})`},ne=()=>{o.value=String(t.radius),o.setAttribute("aria-valuenow",String(t.radius)),d.value=String(t.radius),e.style.setProperty("--studio-card-radius",`${t.radius}px`)},ae=(c,u)=>{t.themeSlug=c;for(const f of e.querySelectorAll("[data-theme-slug]")){const y=f.dataset.themeSlug===c;f.setAttribute("aria-checked",y?"true":"false"),f.tabIndex=y?0:-1,y&&u&&f.focus()}$()},K=c=>{var v,M;t.panel=c;const u=c==="design";(v=e.querySelector("#studio-panel-design"))==null||v.toggleAttribute("hidden",!u),(M=e.querySelector("#studio-panel-code"))==null||M.toggleAttribute("hidden",u);const f=e.querySelector("#studio-tab-design"),y=e.querySelector("#studio-tab-code");f==null||f.setAttribute("aria-selected",u?"true":"false"),y==null||y.setAttribute("aria-selected",u?"false":"true"),f&&(f.tabIndex=u?0:-1),y&&(y.tabIndex=u?-1:0),$()},$=async()=>{const c=++z,u=I(t.presetId),f=u.safe?` · 안전 영역 ${u.safe.width} × ${u.safe.height}`:"";_.textContent=`${u.width} × ${u.height} · ${u.name}${f}`,F.textContent=Q(),ne(),ie(),u.safe?(x.hidden=!1,x.style.width=`${u.safe.width}px`,x.style.height=`${u.safe.height}px`):x.hidden=!0;const y=se();if(t.code.trim()){g.hidden=!0,m.hidden=!1;const M=y?await _e(y):"";if(c!==z)return;m.srcdoc=We({title:t.title,body:t.body,themeImage:M,color:t.color,radius:t.radius,width:u.width,height:u.height,code:t.code});return}m.hidden=!0,g.hidden=!1;let v=null;if(y)try{v=await Ce(y)}catch{v=null}c===z&&xt(g,t,v)};s.addEventListener("change",()=>{t.presetId=s.value,$()}),n.addEventListener("input",()=>{t.title=n.value,$()}),r.addEventListener("input",()=>{t.body=r.value,$()}),a.addEventListener("input",()=>{const c=P(a.value);c&&(t.color=c,h.value=c,$())}),h.addEventListener("input",()=>{const c=P(h.value);c&&(t.color=c,a.value=c,$())}),h.addEventListener("blur",()=>{P(h.value)||(h.value=t.color)});const re=c=>{t.radius=Se(Number(c)),ne(),$()};o.addEventListener("input",()=>re(o.value)),d.addEventListener("input",()=>re(d.value)),p.addEventListener("input",()=>{t.code=p.value,$()}),(oe=e.querySelector("#studio-tab-design"))==null||oe.addEventListener("click",()=>K("design")),(ce=e.querySelector("#studio-tab-code"))==null||ce.addEventListener("click",()=>K("code")),(le=e.querySelector(".studio__tabs"))==null||le.addEventListener("keydown",c=>{var f;if(!(c instanceof KeyboardEvent)||c.key!=="ArrowRight"&&c.key!=="ArrowLeft")return;c.preventDefault();const u=t.panel==="design"?"code":"design";K(u),(f=e.querySelector(u==="design"?"#studio-tab-design":"#studio-tab-code"))==null||f.focus()});const R=[...e.querySelectorAll("[data-theme-slug]")];for(const c of R)c.addEventListener("click",()=>{const u=c.dataset.themeSlug;u&&ae(u,!1)});(de=e.querySelector(".studio__themes"))==null||de.addEventListener("keydown",c=>{if(!(c instanceof KeyboardEvent))return;const u=c.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(u))return;c.preventDefault();const f=R.findIndex(Ne=>Ne.dataset.themeSlug===t.themeSlug),v=R[(f+(u==="ArrowLeft"||u==="ArrowUp"?-1:1)+R.length)%R.length],M=v==null?void 0:v.dataset.themeSlug;M&&ae(M,!0)}),(ue=e.querySelector("#studio-copy"))==null||ue.addEventListener("click",async()=>{const c=Q();F.textContent=c;try{await navigator.clipboard.writeText(c)}catch{const f=document.createElement("textarea");f.value=c,document.body.append(f),f.select(),document.execCommand("copy"),f.remove()}const u=e.querySelector("#studio-copy");u&&(u.textContent="복사됨",window.setTimeout(()=>{u.textContent="현재 디자인을 코드로 복사"},1200))}),(he=e.querySelector("#studio-download"))==null||he.addEventListener("click",()=>{(async()=>{const c=I(t.presetId),u=`ax-studio-${c.id}-${t.themeSlug||"theme"}.png`;if(!t.code.trim()){$e(g,u);return}const f=se(),y=f?await _e(f):"",v=document.createElement("canvas");await St(v,Me({title:t.title,body:t.body,themeImage:y,color:t.color,radius:t.radius,width:c.width,height:c.height,code:t.code}),c.width,c.height),$e(v,u)})()}),(pe=e.querySelector("#studio-controls"))==null||pe.addEventListener("submit",c=>{c.preventDefault()}),U==null||U.disconnect(),U=new ResizeObserver(()=>ie()),U.observe(C),$()}const Fe="design-llm-wiki-mode",we="./data/index.json";let w={status:"loading"},O={query:"",platforms:[],screenTypes:[],uiPatterns:[],tags:[],tones:[]},W=H(),Re="all",E=null,X=null,b=Z();function te(){return localStorage.getItem(Fe)==="dark"?"dark":"light"}function xe(e){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=e,localStorage.setItem(Fe,e)}function J(e,t,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${t}" ${i?'aria-current="page"':""}>${e}</a>`}function Mt(e){return e==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function Et(){const e=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),t=ke(e);return t?me(t.r,t.g,t.b):P(e)??me(216,241,255)}function qt(e,t){var s;const i=e&&t.some(n=>n.slug===e)?e:null;return E?(e&&e!==X&&i&&(E.themeSlug=i,X=e),E):(E={presetId:Ue,title:"",body:"",themeSlug:i??((s=t[0])==null?void 0:s.slug)??"",color:Et(),radius:Be,code:"",panel:"design"},X=e,E)}function Lt(e){const t=te(),i=t==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=b.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${J("Archive",q({name:"archive"}),b.name==="archive"||b.name==="capture")}
        ${J("Online Marketing Studio",q({name:"studio",theme:null}),b.name==="studio")}
        ${J("History",q({name:"history"}),b.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${Mt(t)}
        </button>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${e}</main>
  `}function It(){if(w.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(w.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${w.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
      </section>
    `;const e=w.index;switch(b.name){case"archive":return at(e,O,W,Re);case"capture":return vt(e,b.slug,W);case"studio":return kt(qt(b.theme,e.captures),e.captures);case"history":return _t(e);case"notfound":return $t(b.path)}}function A(){var t;const e=document.querySelector("#app");if(!e)throw new Error("#app not found");xe(te()),W=H(),e.innerHTML=Lt(It()),(t=e.querySelector("#mode-toggle"))==null||t.addEventListener("click",()=>{xe(te()==="dark"?"light":"dark"),A()}),w.status==="ready"&&(b.name==="archive"&&rt(e,O,{onFilterChange:i=>{const s=document.activeElement,n=(s==null?void 0:s.id)==="archive-search"?"search":null;if(O=i,A(),n==="search"){const r=document.querySelector("#archive-search");r==null||r.focus();const a=(r==null?void 0:r.value.length)??0;r==null||r.setSelectionRange(a,a)}},onClearFilters:()=>{var i;O={query:"",platforms:[],screenTypes:[],uiPatterns:[],tags:[],tones:[]},A(),(i=document.querySelector("#archive-search"))==null||i.focus()},onTabChange:i=>{var s;Re=i,A(),(s=document.querySelector(`[data-archive-tab="${i}"]`))==null||s.focus()}}),b.name==="capture"&&bt(e,i=>{W=Ke(i),A()}),b.name==="studio"&&w.status==="ready"&&E&&At(e,E,w.index.captures))}async function Pt(){w={status:"loading"},A();try{const e=await fetch(we,{cache:"no-store"});if(!e.ok)throw new Error(`${we} → HTTP ${e.status}`);const t=await e.json();if(!t||!Array.isArray(t.captures)||!t.facets)throw new Error("Index JSON is missing captures or facets");w={status:"ready",index:t}}catch(e){w={status:"error",message:e instanceof Error?e.message:String(e)}}A()}Ge(e=>{if(Ie(window.location.hash)){window.location.replace(q({name:"studio",theme:null}));return}b=e,A()});Pt();
