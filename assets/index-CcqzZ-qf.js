(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();const Rt="ig-feed-square",ze=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function ee(e){return ze.find(t=>t.id===e)??ze[0]}const Z=0,he=120,Nt=28,O=100,Q=4e3,Te=5,wt=10,fe=100,Pe=4e3,D=240,xt=360,Fe=280,me=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],ct="rgb(0, 0, 0)",ut="rgb(255, 255, 255)";function St(e){return Number.isFinite(e)?Math.min(he,Math.max(Z,Math.round(e))):Z}function Re(e){return Number.isFinite(e)?Math.min(Q,Math.max(O,Math.round(e))):O}function Xe(e){return Math.max(Te,Re(e)-wt*2)}function Y(e,t){const i=Xe(t);return Number.isFinite(e)?Math.min(i,Math.max(Te,Math.round(e))):Te}function Ye(e){return Number.isFinite(e)?Math.min(Pe,Math.max(fe,Math.round(e))):fe}function M(e,t,i){const n=Math.max(0,Math.round(t)-Math.min(Math.max(i,0),Math.round(t)));return Number.isFinite(e)?Math.min(n,Math.max(0,Math.round(e))):0}function ce(e,t,i){const n=Math.round(-i+40),o=Math.round(t-40);return Number.isFinite(e)?n>o?Math.round((t-i)/2):Math.min(o,Math.max(n,Math.round(e))):0}function Ht(e,t){const i=Math.max(D,Math.round(t)-Fe-10);return Number.isFinite(e)?Math.min(i,Math.max(D,Math.round(e))):xt}function Ot(e){return(e.split(/[/\\]/).pop()??e).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function Ue(e,t=[]){var n;const i=me.find(o=>o.id===e);return i?i.stack:((n=t.find(o=>o.id===e))==null?void 0:n.stack)??me[0].stack}function Dt(e,t){const i=ee(Rt),n=Y(Math.round(i.width*.046),i.width),o=Y(Math.round(i.width*.026),i.width),a=Math.round(i.height*.7);return{presetId:i.id,cardWidth:i.width,cardHeight:i.height,title:"",body:"",themeSlug:e,color:t,radius:Nt,code:"",panel:"design",controlsWidth:xt,titleSize:n,bodySize:o,titleX:M(Math.round(i.width*.06),i.width,n),titleY:M(a,i.height,n),bodyX:M(Math.round(i.width*.06),i.width,o),bodyY:M(a+Math.round(n*1.6),i.height,o),fontId:"pretendard",titleColor:te(t),bodyColor:te(t),imageWidth:Ye(i.width),imageX:0,imageY:0}}function I(e){const t=e.trim().match(/^#([0-9a-fA-F]{6})$/);return t?`#${t[1].toLowerCase()}`:null}function ge(e,t,i){const n=o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0");return`#${n(e)}${n(t)}${n(i)}`}function Be(e){const t=I(e);if(t)return{r:Number.parseInt(t.slice(1,3),16),g:Number.parseInt(t.slice(3,5),16),b:Number.parseInt(t.slice(5,7),16)};const i=e.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return i?{r:Number(i[1]),g:Number(i[2]),b:Number(i[3])}:null}function H(e){const t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4}function ht(e,t){const i=.2126*H(e.r)+.7152*H(e.g)+.0722*H(e.b),n=.2126*H(t.r)+.7152*H(t.g)+.0722*H(t.b),o=Math.max(i,n),a=Math.min(i,n);return(o+.05)/(a+.05)}function te(e){const t=Be(Mt(e));return t?ge(t.r,t.g,t.b):ge(0,0,0)}function Mt(e){const t=Be(e)??{r:255,g:255,b:255},i=ht({r:0,g:0,b:0},t),n=ht({r:255,g:255,b:255},t);return i>=4.5&&i>=n?ct:n>=4.5?ut:i>=n?ct:ut}function Xt(e,t,i){if(t<=0)return[];const n=[];for(const o of e.split(`
`)){const a=o.split(/\s+/).filter(Boolean);if(a.length===0){n.push("");continue}let d="";const g=l=>{if(i(l)<=t){d=l;return}let h="";for(const p of l){const y=h+p;i(y)<=t?h=y:(h&&n.push(h),h=p)}d=h};for(const l of a){const h=d?`${d} ${l}`:l;i(h)<=t?d=h:(d&&n.push(d),g(l))}d&&n.push(d)}return n}function Le(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Yt(e){return e.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Ut(e,t){return Yt(e).replaceAll("{{title}}",Le(t.title)).replaceAll("{{body}}",Le(t.body)).replaceAll("{{themeImage}}",Le(t.themeImage))}function Ne(){return`<article class="studio-card">
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
    font-family: var(--studio-font);
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
    color: var(--studio-title-color);
  }
  .studio-card p {
    left: var(--studio-body-x);
    top: var(--studio-body-y);
    font-size: var(--studio-body-size);
    font-weight: 400;
    color: var(--studio-body-color);
  }
</style>`}function Ct(e){const t=I(e.color)??e.color,i=Mt(t),n=I(e.titleColor)??te(t),o=I(e.bodyColor)??te(t),a=St(e.radius),d=ee("ig-feed-square"),g=e.width>0?e.width:d.width,l=e.height>0?e.height:d.height,h=e.fontStack.replaceAll(";",""),p=Ut(e.code.trim()||Ne(),e),y=[`--studio-color:${t}`,`--studio-ink:${i}`,`--studio-radius:${a}px`,`--studio-width:${g}px`,`--studio-height:${l}px`,`--studio-font:${h}`,`--studio-title-size:${Y(e.titleSize,g)}px`,`--studio-body-size:${Y(e.bodySize,g)}px`,`--studio-title-x:${Math.round(e.titleX)}px`,`--studio-title-y:${Math.round(e.titleY)}px`,`--studio-body-x:${Math.round(e.bodyX)}px`,`--studio-body-y:${Math.round(e.bodyY)}px`,`--studio-image-width:${Ye(e.imageWidth)}px`,`--studio-image-x:${Math.round(e.imageX)}px`,`--studio-image-y:${Math.round(e.imageY)}px`,`--studio-title-color:${n}`,`--studio-body-color:${o}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${g}px;height:${l}px;margin:0;background:transparent;${y}">${p}</div>`}function Bt(e){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Ct(e)}</body>
</html>`}const kt="design-llm-wiki-pins";function ye(){try{const e=localStorage.getItem(kt);if(!e)return[];const t=JSON.parse(e);return Array.isArray(t)?t.filter(i=>typeof i=="string"):[]}catch{return[]}}function jt(e){const t=[...new Set(e)];localStorage.setItem(kt,JSON.stringify(t))}function Kt(e){const t=ye(),i=t.includes(e)?t.filter(n=>n!==e):[...t,e];return jt(i),ye()}const It="[a-z0-9]+(?:-[a-z0-9]+)*";function Et(e){const t=e.startsWith("#")?e.slice(1):e,i=t.indexOf("?"),n=i>=0?t.slice(0,i):t,o=i>=0?t.slice(i+1):"",a=n.startsWith("/")?n:`/${n}`;return{path:a==="/"||a===""?"/":a.replace(/\/+$/,"")||"/",query:o}}function Gt(e){const t=new URLSearchParams(e).get("theme");return!t||!new RegExp(`^${It}$`).test(t)?null:t}function Lt(e){const{path:t}=Et(e);return t==="/intake"||t==="/design-system"||t==="/stats"}function He(e=window.location.hash){const{path:t,query:i}=Et(e);if(t==="/"||t==="/gallery")return{name:"archive"};if(t==="/history")return{name:"history"};if(t==="/studio"||Lt(e))return{name:"studio",theme:t==="/studio"?Gt(i):null};const n=t.match(new RegExp(`^/capture/(${It})$`));return n?{name:"capture",slug:n[1]}:{name:"notfound",path:t}}function R(e){switch(e.name){case"archive":return"#/";case"capture":return`#/capture/${e.slug}`;case"studio":return e.theme?`#/studio?theme=${e.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${e.path}`}}function Jt(e){const t=()=>e(He());return window.addEventListener("hashchange",t),e(He()),()=>window.removeEventListener("hashchange",t)}function At(e){return[...e].sort((t,i)=>t.capturedAt!==i.capturedAt?t.capturedAt<i.capturedAt?1:-1:t.slug.localeCompare(i.slug))}function pt(e,t){return t.every(i=>e.includes(i))}function Vt(e,t){const i=t.trim().toLowerCase();return i?[e.slug,e.title,e.service,e.insight,e.platform,e.screenType,e.tone,e.copyTone,e.body,...e.tags,...e.uiPatterns].join(`
`).toLowerCase().includes(i):!0}function Qt(e,t){return At(e).filter(i=>!(!Vt(i,t.query)||t.platforms.length>0&&!t.platforms.includes(i.platform)||t.screenTypes.length>0&&!t.screenTypes.includes(i.screenType)||t.uiPatterns.length>0&&!pt(i.uiPatterns,t.uiPatterns)||t.tags.length>0&&!pt(i.tags,t.tags)||t.tones.length>0&&!t.tones.includes(i.tone)))}function c(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function X(e){return e.startsWith("./")||e.startsWith("/")||e.startsWith("blob:")||e.startsWith("data:")||e.startsWith("http://")||e.startsWith("https://")?e:`./${e}`}const qt=[{dim:"platform",field:"platforms",label:"Platform"},{dim:"screenType",field:"screenTypes",label:"Screen type"},{dim:"uiPattern",field:"uiPatterns",label:"UI pattern"},{dim:"tone",field:"tones",label:"Tone"},{dim:"tag",field:"tags",label:"Tags"}];function Zt(e){return Object.entries(e).sort((t,i)=>t[1]!==i[1]?i[1]-t[1]:t[0].localeCompare(i[0]))}function ei(e){return qt.reduce((t,{field:i})=>t+e[i].length,0)}function ti(e,t,i){const n=e[t],o=n.includes(i)?n.filter(a=>a!==i):[...n,i];return{...e,[t]:o}}function ii(e,t){const i=qt.map(({dim:a,field:d,label:g})=>{const l=Zt(e.facets[a]);if(l.length===0)return"";const h=l.map(([p,y])=>{const b=t[d].includes(p);return`
          <button type="button" class="chip" data-facet-field="${d}" data-facet-value="${c(p)}" aria-pressed="${b?"true":"false"}">
            ${c(p)} <span class="chip__count">${y}</span>
          </button>`}).join("");return`
      <div class="facet-group">
        <h2 class="facet-group__title">${g}</h2>
        <div class="facet-group__chips">${h}</div>
      </div>
    `}).join(""),n=ei(t),o=n>0?`<button type="button" class="button button--secondary" id="archive-clear-facets">Clear filters (${n})</button>`:"";return`
    <details class="archive-filter-panel" ${n>0?"open":""}>
      <summary class="archive-filter-panel__summary">
        Filters${n>0?` (${n} active)`:""}
      </summary>
      <div class="archive-filter-panel__body">
        ${o}${i}
      </div>
    </details>
  `}let ue=null;function ni(e){const t=e.querySelector(".archive-tabs__indicator"),i=e.querySelector('.archive-tab[aria-selected="true"]');if(!t||!i)return;const n=i.offsetLeft,o=i.offsetWidth;ue&&(t.style.transition="none",t.style.transform=`translateX(${ue.left}px)`,t.style.width=`${ue.width}px`,t.offsetWidth,t.style.transition=""),requestAnimationFrame(()=>{t.style.transform=`translateX(${n}px)`,t.style.width=`${o}px`,ue={left:n,width:o}})}function Ae(e){const t=e.querySelector(".capture-grid");if(!t)return;const i=window.getComputedStyle(t),n=Number.parseFloat(i.gridAutoRows)||1,o=Number.parseFloat(i.rowGap)||0;t.querySelectorAll(".capture-card").forEach(a=>{a.style.gridRowEnd="";const d=a.getBoundingClientRect().height,g=Number.parseFloat(window.getComputedStyle(a).marginBottom)||0,l=Math.ceil((d+g+o)/(n+o));a.style.gridRowEnd=`span ${Math.max(1,l)}`})}function oi(e){const t=e.asset.kind==="motion"&&e.asset.posterPath?e.asset.posterPath:e.asset.path;return`<img class="capture-card__media" src="${c(X(t))}" alt="" loading="lazy" width="${e.asset.width}" height="${e.asset.height}" />`}function ri(e,t){return`
    <article class="capture-card${t?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${R({name:"capture",slug:e.slug})}">
        <div class="capture-card__frame">
          ${oi(e)}
          ${e.asset.kind==="still"?"":`<span class="capture-card__kind">${c(e.asset.kind)}</span>`}
          ${t?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${c(e.title)}</h2>
          <p class="capture-card__insight">${c(e.insight)}</p>
        </div>
      </a>
    </article>
  `}function si(e,t){const i=new Set(t),n=At(e),o=n.filter(h=>i.has(h.slug)),a=n.filter(h=>!i.has(h.slug)),d=new Map(n.map(h=>[h.slug,h])),g=t.map(h=>d.get(h)).filter(h=>!!h),l=o.filter(h=>!t.includes(h.slug));return[...g,...l,...a]}function ai(e,t,i,n){const o=Qt(e.captures,t),a=new Set(i),d=n==="pin"?o.filter(l=>a.has(l.slug)):o,g=si(d,i);return e.captures.length===0?`
      <section class="state-panel state-panel--soft" aria-live="polite">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">이 번들에 캡처가 없습니다.</p>
      </section>
    `:`
    <section class="gallery archive">
      <header class="gallery__header archive__header">
        <div>
          <h1 class="gallery__title">Archive</h1>
          <p class="gallery__meta">Target ${c(e.target)} · ${g.length} of ${e.captures.length} · ${i.length} pinned</p>
        </div>
      </header>

      <div class="archive-search-panel">
        <label class="search-field archive-search">
          <span class="search-field__label">Search archive</span>
          <input id="archive-search" class="search-field__input archive-search__input" type="search" value="${c(t.query)}" placeholder="타이틀, 서비스, 태그, 패턴, 인사이트 검색…" />
          ${t.query?'<button type="button" class="archive-search__clear" id="archive-search-clear" aria-label="검색어 지우기">×</button>':""}
        </label>
      </div>

      <div class="archive-filter-wrap">
        <div class="gallery__filters" aria-label="Facet filters">
          ${ii(e,t)}
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
        ${g.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${n==="pin"?"No pinned captures":"No matches"}</h2>
                <p class="state-panel__text">${n==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"검색어나 필터를 지우거나 더 넓은 조건으로 다시 시도하세요."}</p>
              </section>`:`<div class="capture-grid">${g.map(l=>ri(l,i.includes(l.slug))).join("")}</div>`}
      </div>
    </section>
  `}function di(e,t,i){var d,g;const n=e.querySelector("#archive-search");n==null||n.addEventListener("input",()=>{i.onFilterChange({...t,query:n.value})}),n==null||n.addEventListener("keydown",l=>{l.key==="Escape"&&(l.preventDefault(),i.onClearFilters())}),(d=e.querySelector("#archive-search-clear"))==null||d.addEventListener("click",()=>{i.onClearFilters()}),(g=e.querySelector("#archive-clear-facets"))==null||g.addEventListener("click",()=>i.onClearFilters()),e.querySelectorAll("[data-facet-field]").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.facetField,p=l.dataset.facetValue;!h||p===void 0||i.onFilterChange(ti(t,h,p))})}),e.querySelectorAll("[data-archive-tab]").forEach(l=>{l.addEventListener("click",()=>{const h=l.dataset.archiveTab;(h==="all"||h==="pin")&&i.onTabChange(h)})}),ni(e),requestAnimationFrame(()=>Ae(e)),e.querySelectorAll(".capture-card__media").forEach(l=>{l.addEventListener("load",()=>Ae(e),{once:!0})});const o=new ResizeObserver(()=>Ae(e)),a=e.querySelector(".capture-grid");a&&o.observe(a)}function li(e){const t=e.replace(/\r\n/g,`
`).split(`
`),i=[];let n=!1;const o=()=>{n&&(i.push("</ul>"),n=!1)};for(const a of t){const d=a.trim();if(!d){o();continue}if(d.startsWith("### ")){o(),i.push(`<h3>${J(d.slice(4))}</h3>`);continue}if(d.startsWith("## ")){o(),i.push(`<h2>${J(d.slice(3))}</h2>`);continue}if(d.startsWith("# ")){o(),i.push(`<h1>${J(d.slice(2))}</h1>`);continue}if(d.startsWith("- ")){n||(i.push("<ul>"),n=!0),i.push(`<li>${J(d.slice(2))}</li>`);continue}o(),i.push(`<p>${J(d)}</p>`)}return o(),i.join(`
`)}function J(e){let t=c(e);return t=t.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(i,n)=>`<a href="${R({name:"capture",slug:n})}">${n}</a>`),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(i,n,o)=>o.endsWith(".md")&&!o.includes("://")?`<span>${n}</span>`:`<a href="${c(o)}">${n}</a>`),t}const ci=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function ui(e){return Math.max(35,Math.min(98,Math.round(e)))}function hi(e){let t=0;for(const i of e)t=(t*31+i.charCodeAt(0))%997;return t}function pi(e){var h;if((h=e.analysisScores)!=null&&h.length)return e.analysisScores;const t=hi(`${e.slug}:${e.title}:${e.insight}`),i=e.tags.includes("density")?7:0,n=e.asset.kind==="motion"?8:0,o=Math.min(12,e.uiPatterns.length*3),a=e.asset.width/Math.max(1,e.asset.height),d=a>1.2?6:0,g=a<.75?5:0,l=[68+o+d+t%9,66+i+(t>>1)%10,64+(e.insight.length>45?8:3)+(t>>2)%9,58+n+(e.uiPatterns.includes("filter-chips")?7:0),62+g+o+(t>>3)%8].map(ui);return ci.map(([p,y],b)=>({key:p,label:y,score:l[b]??60,description:mi(y,l[b]??60,e)}))}function fi(e){return e.length===0?0:Math.round(e.reduce((t,i)=>t+i.score,0)/e.length)}function mi(e,t,i){return e==="레이아웃"?`${i.screenType} 화면 구조와 ${i.uiPatterns.join(", ")} 패턴의 배치 안정성.`:e==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":e==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":e==="인터랙션 단서"?i.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":t>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function gi(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(2)} MB`}function yi(e){return e.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${e.asset.posterPath?` poster="${c(X(e.asset.posterPath))}"`:""}>
        <source src="${c(X(e.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${c(X(e.asset.path))}"
      alt=""
      width="${e.asset.width}"
      height="${e.asset.height}"
    />
  `}function bi(e){const t=pi(e),i=e.analysisTotal??fi(t),n=160,o=110,a=[.25,.5,.75,1].map(l=>t.map((h,p)=>{const y=-Math.PI/2+p*Math.PI*2/t.length,b=n+Math.cos(y)*o*l,x=n+Math.sin(y)*o*l;return`${b.toFixed(1)},${x.toFixed(1)}`}).join(" ")).map(l=>`<polygon class="spider-grid" points="${l}" />`).join(""),d=t.map((l,h)=>{const p=-Math.PI/2+h*Math.PI*2/t.length,y=o*(l.score/100),b=n+Math.cos(p)*y,x=n+Math.sin(p)*y;return`${b.toFixed(1)},${x.toFixed(1)}`}).join(" "),g=t.map((l,h)=>{const p=-Math.PI/2+h*Math.PI*2/t.length,y=n+Math.cos(p)*o,b=n+Math.sin(p)*o,x=n+Math.cos(p)*o*(l.score/100),L=n+Math.sin(p)*o*(l.score/100),z=n+Math.cos(p)*(o+26),E=n+Math.sin(p)*(o+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${n}" y1="${n}" x2="${y.toFixed(1)}" y2="${b.toFixed(1)}" />
          <circle class="spider-point" cx="${x.toFixed(1)}" cy="${L.toFixed(1)}" r="6" />
          <text class="spider-label" x="${z.toFixed(1)}" y="${E.toFixed(1)}">${c(l.label)}</text>
          <text class="spider-callout" x="${z.toFixed(1)}" y="${(E+18).toFixed(1)}">${l.score}</text>
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
          ${g}
        </svg>
        <dl class="score-list">
          ${t.map(l=>`
            <div class="score-list__item">
              <dt>${c(l.label)} <strong>${l.score}</strong></dt>
              <dd>${c(l.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function vi(e){const t=[...e.tags,...e.uiPatterns,e.screenType,e.platform,e.tone,e.copyTone];return[...new Set(t)].map(i=>`<span class="chip detail-hashtag" aria-pressed="true">#${c(i)}</span>`).join("")}function _i(e,t,i){const n=e.captures.find(a=>a.slug===t);if(!n)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${c(t)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const o=i.includes(t);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${c(n.service)} · ${c(n.platform)}</p>
          <h1 class="detail__title">${c(n.title)}</h1>
          <p class="detail__insight">${c(n.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${c(R({name:"studio",theme:t}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${c(t)}" aria-pressed="${o?"true":"false"}">
            ${o?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${yi(n)}</div>

      ${bi(n)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${c(n.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${c(n.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${n.asset.width} × ${n.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${gi(n.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${n.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${n.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${c(n.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${vi(n)}
        </p>
        <p class="detail__meta-line">
          ${c(n.screenType)} · ${c(n.tone)} · ${c(n.copyTone)} · ${c(n.capturedAt)}
          ${n.sourceUrl?` · <a href="${c(n.sourceUrl)}">${c(n.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${li(n.body)}
      </section>
    </article>
  `}function $i(e,t){var i;(i=e.querySelector("[data-pin-slug]"))==null||i.addEventListener("click",n=>{const o=n.currentTarget.dataset.pinSlug;o&&t(o)})}function wi(e){const t=e.wiki.logEntries;return t.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${t.length} entries · target ${c(e.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${t.map(i=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${c(i.date)}">${c(i.date)}</time>
            <span class="history-item__op">${c(i.operation)}</span>
            <strong class="history-item__title">${c(i.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function xi(e){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${c(e)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Oe=new Map,ft=new Map;function Wt(e){const t=Oe.get(e);return t!=null&&t.complete&&t.naturalWidth>0?Promise.resolve(t):new Promise((i,n)=>{const o=t??new Image;o.onload=()=>i(o),o.onerror=()=>n(new Error(`Image failed: ${e}`)),t||(Oe.set(e,o),o.src=e)})}function mt(e){const t=ft.get(e);if(t)return t;const i=fetch(e).then(n=>{if(!n.ok)throw new Error(`Theme image HTTP ${n.status}`);return n.blob()}).then(n=>new Promise((o,a)=>{const d=new FileReader;d.onload=()=>o(String(d.result)),d.onerror=()=>a(d.error??new Error("data url failed")),d.readAsDataURL(n)}));return ft.set(e,i),i}const Si=Object.assign({}),gt=new Set;function Mi(e){return e.includes(".woff2")?"woff2":e.includes(".woff")?"woff":e.includes(".otf")?"opentype":"truetype"}function ve(){const e=new Set(me.map(i=>i.label.toLowerCase())),t=[];for(const[i,n]of Object.entries(Si)){const o=Ot(i);if(!o||e.has(o.toLowerCase()))continue;const a=`local:${o}`;if(!t.some(d=>d.id===a)){if(!gt.has(o)){gt.add(o);const d=document.createElement("style");d.textContent=`@font-face{font-family:${JSON.stringify(o)};src:url("${n}") format("${Mi(n)}");font-display:swap;}`,document.head.append(d)}t.push({id:a,label:o,stack:`${JSON.stringify(o)}, system-ui, sans-serif`})}}return t}function Ci(){return[...me,...ve()]}function ki(e,t,i,n){const o=Math.max(0,Math.min(n,t/2,i/2));e.beginPath(),e.roundRect(0,0,t,i,o)}function yt(e,t){return{title:e.title,body:e.body,themeImage:t,color:e.color,radius:e.radius,width:e.cardWidth,height:e.cardHeight,code:e.code,fontStack:Ue(e.fontId,ve()),titleSize:e.titleSize,bodySize:e.bodySize,titleX:e.titleX,titleY:e.titleY,bodyX:e.bodyX,bodyY:e.bodyY,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY,titleColor:e.titleColor,bodyColor:e.bodyColor}}function bt(e,t,i){const n=e.getContext("2d");if(!n)return[];const o=t.cardWidth,a=t.cardHeight;e.width=o,e.height=a,n.clearRect(0,0,o,a),n.save(),ki(n,o,a,t.radius),n.clip(),n.fillStyle=t.color,n.fillRect(0,0,o,a);const d=[];if(i&&i.naturalWidth>0){const p=t.imageWidth,y=p*(i.naturalHeight/i.naturalWidth);n.drawImage(i,t.imageX,t.imageY,p,y),d.push({kind:"image",x:t.imageX,y:t.imageY,w:p,h:y})}const g=Ue(t.fontId,ve()),l=Math.max(1,o-wt*2);n.textBaseline="top";const h=(p,y,b,x,L,z,E)=>{if(!y.trim())return;n.fillStyle=E,n.font=`${z} ${L}px ${g}`;const T=Xt(y.trim(),l,A=>n.measureText(A).width),N=Math.round(L*1.25);let P=0;T.forEach((A,ie)=>{n.fillText(A,b,x+ie*N),P=Math.max(P,n.measureText(A).width)}),d.push({kind:p,x:b,y:x,w:Math.max(P,L),h:Math.max(T.length,1)*N})};return h("body",t.body,t.bodyX,t.bodyY,t.bodySize,400,t.bodyColor),h("title",t.title,t.titleX,t.titleY,t.titleSize,600,t.titleColor),n.restore(),d}function vt(e,t){e.toBlob(i=>{if(!i)return;const n=URL.createObjectURL(i),o=document.createElement("a");o.href=n,o.download=t,o.click(),URL.revokeObjectURL(n)},"image/png")}async function Ii(e,t,i,n){const o=`<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${n}"><foreignObject x="0" y="0" width="${i}" height="${n}">${t}</foreignObject></svg>`,a=new Blob([o],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(a);try{const g=await Wt(d),l=e.getContext("2d");if(!l)return;e.width=i,e.height=n,l.clearRect(0,0,i,n),l.drawImage(g,0,0,i,n)}finally{URL.revokeObjectURL(d),Oe.delete(d)}}let V=null;function Ei(e,t){if(t.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const i=te(e.color);e.titleColor=I(String(e.titleColor??""))??i,e.bodyColor=I(String(e.bodyColor??""))??i;const n=ee(e.presetId),o=ze.map(p=>`<option value="${c(p.id)}"${p.id===n.id?" selected":""}>${c(p.name)} · ${p.width}×${p.height}</option>`).join(""),a=t.map(p=>{const y=p.slug===e.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${c(p.slug)}"
          aria-checked="${y?"true":"false"}"
          tabindex="${y?"0":"-1"}"
        >
          <img src="${c(X(p.asset.path))}" alt="${c(p.title)}" />
        </button>
      `}).join(""),d=e.panel==="design",g=Ci(),l=Xe(e.cardWidth),h=g.map(p=>`<option value="${c(p.id)}"${p.id===e.fontId?" selected":""}>${c(p.label)}</option>`).join("");return`
    <section class="studio" style="--studio-controls-width:${e.controlsWidth}px">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${d?"true":"false"}" tabindex="${d?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${d?"false":"true"}" tabindex="${d?"-1":"0"}">Code</button>
        </div>

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${d?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${o}</select>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${O}" max="${Q}" step="1" value="${e.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${O}" max="${Q}" step="1" value="${e.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${O}" max="${Q}" step="1" value="${e.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${O}" max="${Q}" step="1" value="${e.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${c(e.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker" type="color" value="${c(e.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${c(e.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${l}" step="1" value="${e.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${l}" step="1" value="${e.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${c(e.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker" type="color" value="${c(e.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${c(e.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${l}" step="1" value="${e.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${l}" step="1" value="${e.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-font">폰트</label>
            <select id="studio-font" class="studio__control">${h}</select>
          </div>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${a}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${fe}" max="${Pe}" step="1" value="${e.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${fe}" max="${Pe}" step="1" value="${e.imageWidth}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮길 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${c(e.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${c(e.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${Z}" max="${he}" step="1" value="${e.radius}" aria-valuemin="${Z}" aria-valuemax="${he}" aria-valuenow="${e.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${Z}" max="${he}" step="1" value="${e.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${d?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${c(e.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${D}" aria-valuenow="${e.controlsWidth}" tabindex="0"></div>

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
  `}function Li(e,t,i){var nt,ot,rt,st,at,dt,lt;if(i.length===0)return;const n=e.querySelector("#studio-preset"),o=e.querySelector("#studio-width"),a=e.querySelector("#studio-width-number"),d=e.querySelector("#studio-height"),g=e.querySelector("#studio-height-number"),l=e.querySelector("#studio-title"),h=e.querySelector("#studio-title-color"),p=e.querySelector("#studio-title-hex"),y=e.querySelector("#studio-title-size"),b=e.querySelector("#studio-title-size-number"),x=e.querySelector("#studio-body"),L=e.querySelector("#studio-body-color"),z=e.querySelector("#studio-body-hex"),E=e.querySelector("#studio-body-size"),T=e.querySelector("#studio-body-size-number"),N=e.querySelector("#studio-font"),P=e.querySelector("#studio-image-width"),A=e.querySelector("#studio-image-width-number"),ie=e.querySelector("#studio-color"),je=e.querySelector("#studio-hex"),U=e.querySelector("#studio-radius"),ne=e.querySelector("#studio-radius-number"),_e=e.querySelector("#studio-code"),v=e.querySelector("#studio-canvas"),oe=e.querySelector("#studio-iframe"),Ke=e.querySelector("#studio-meta"),B=e.querySelector("#studio-safe"),re=e.querySelector("#studio-scaler"),$e=e.querySelector("#studio-fit"),we=e.querySelector("#studio-stage"),xe=e.querySelector("#studio-export"),S=e.querySelector("#studio-splitter"),Se=e.querySelector(".studio");if(!n||!o||!a||!d||!g||!l||!h||!p||!y||!b||!x||!L||!z||!E||!T||!N||!P||!A||!ie||!je||!U||!ne||!_e||!v||!oe||!Ke||!B||!re||!$e||!we||!xe||!S||!Se)return;const Ge=()=>{const r=i.find(s=>s.slug===t.themeSlug)??i[0];return r?X(r.asset.path):""};let se=0;const Me=()=>{const r=we.getBoundingClientRect(),s=48,u=Math.min(Math.max(r.width-s,1)/t.cardWidth,Math.max(r.height-s,1)/t.cardHeight),f=Number.isFinite(u)&&u>0?u:1;$e.style.width=`${t.cardWidth*f}px`,$e.style.height=`${t.cardHeight*f}px`,re.style.width=`${t.cardWidth}px`,re.style.height=`${t.cardHeight}px`,re.style.transform=`scale(${f})`};let q=null,ae=1,de=[];const Je=()=>t.imageWidth*ae,Ce=()=>{t.cardWidth=Re(t.cardWidth),t.cardHeight=Re(t.cardHeight),t.titleSize=Y(t.titleSize,t.cardWidth),t.bodySize=Y(t.bodySize,t.cardWidth),t.imageWidth=Ye(t.imageWidth),t.titleX=M(t.titleX,t.cardWidth,t.titleSize),t.titleY=M(t.titleY,t.cardHeight,t.titleSize),t.bodyX=M(t.bodyX,t.cardWidth,t.bodySize),t.bodyY=M(t.bodyY,t.cardHeight,t.bodySize),t.imageX=ce(t.imageX,t.cardWidth,t.imageWidth),t.imageY=ce(t.imageY,t.cardHeight,Je())},j=(r,s,u)=>{r.value=String(u),document.activeElement!==s&&(s.value=String(u))},Pt=()=>{const r=String(Xe(t.cardWidth));for(const s of[y,b,E,T])s.min="5",s.max=r;j(o,a,t.cardWidth),j(d,g,t.cardHeight),j(y,b,t.titleSize),j(E,T,t.bodySize),j(P,A,t.imageWidth)},Ve=()=>{U.value=String(t.radius),U.setAttribute("aria-valuenow",String(t.radius)),ne.value=String(t.radius),e.style.setProperty("--studio-card-radius",`${t.radius}px`)},Qe=(r,s)=>{t.themeSlug=r;for(const u of e.querySelectorAll("[data-theme-slug]")){const f=u.dataset.themeSlug===r;u.setAttribute("aria-checked",f?"true":"false"),u.tabIndex=f?0:-1,f&&s&&u.focus()}$()},ke=r=>{var m,_;t.panel=r;const s=r==="design";(m=e.querySelector("#studio-panel-design"))==null||m.toggleAttribute("hidden",!s),(_=e.querySelector("#studio-panel-code"))==null||_.toggleAttribute("hidden",s);const u=e.querySelector("#studio-tab-design"),f=e.querySelector("#studio-tab-code");u==null||u.setAttribute("aria-selected",s?"true":"false"),f==null||f.setAttribute("aria-selected",s?"false":"true"),u&&(u.tabIndex=s?0:-1),f&&(f.tabIndex=s?-1:0),$()},$=async()=>{var le;const r=++se;Ce(),Pt();const s=ee(t.presetId),u=t.cardWidth===s.width&&t.cardHeight===s.height,f=u&&s.safe?` · 안전 영역 ${s.safe.width} × ${s.safe.height}`:"";Ke.textContent=`${t.cardWidth} × ${t.cardHeight} · ${s.name}${f}`,xe.textContent=Ne(),Ve(),Me(),u&&s.safe?(B.hidden=!1,B.style.width=`${s.safe.width}px`,B.style.height=`${s.safe.height}px`):B.hidden=!0;const m=(le=Ue(t.fontId,ve()).split(",")[0])==null?void 0:le.replaceAll('"',"").trim();if(m)try{await Promise.all([document.fonts.load(`600 ${t.titleSize}px "${m}"`),document.fonts.load(`400 ${t.bodySize}px "${m}"`)])}catch{}if(r!==se)return;const _=Ge();if(t.code.trim()){v.hidden=!0,oe.hidden=!1;const Ft=_?await mt(_):"";if(r!==se)return;oe.srcdoc=Bt(yt(t,Ft));return}if(oe.hidden=!0,v.hidden=!1,_)try{q=await Wt(_),q.naturalWidth>0&&(ae=q.naturalHeight/q.naturalWidth)}catch{q=null,ae=1}else q=null,ae=1;r===se&&(Ce(),de=bt(v,t,q))},K=(r,s,u,f)=>{r.addEventListener("input",()=>{u(Number(r.value)),$()});const m=()=>{Ce(),s.value=String(f())};s.addEventListener("input",()=>{s.value.trim()!==""&&(u(Number(s.value)),$())}),s.addEventListener("change",m),s.addEventListener("blur",m)};n.addEventListener("change",()=>{const r=ee(n.value);t.presetId=r.id,t.cardWidth=r.width,t.cardHeight=r.height,$()}),K(o,a,r=>{t.cardWidth=r},()=>t.cardWidth),K(d,g,r=>{t.cardHeight=r},()=>t.cardHeight),K(y,b,r=>{t.titleSize=r},()=>t.titleSize),K(E,T,r=>{t.bodySize=r},()=>t.bodySize),K(P,A,r=>{t.imageWidth=r},()=>t.imageWidth),N.addEventListener("change",()=>{t.fontId=N.value,$()}),l.addEventListener("input",()=>{t.title=l.value,$()}),x.addEventListener("input",()=>{t.body=x.value,$()});const Ie=(r,s,u,f)=>{r.addEventListener("input",()=>{const m=I(r.value);m&&(u(m),s.value=m,$())}),s.addEventListener("input",()=>{const m=I(s.value);m&&(u(m),r.value=m,$())}),s.addEventListener("blur",()=>{I(s.value)||(s.value=f())})};Ie(ie,je,r=>{t.color=r},()=>t.color),Ie(h,p,r=>{t.titleColor=r},()=>t.titleColor),Ie(L,z,r=>{t.bodyColor=r},()=>t.bodyColor);const Ze=r=>{t.radius=St(Number(r)),Ve(),$()};U.addEventListener("input",()=>Ze(U.value)),ne.addEventListener("input",()=>Ze(ne.value)),_e.addEventListener("input",()=>{t.code=_e.value,$()}),(nt=e.querySelector("#studio-tab-design"))==null||nt.addEventListener("click",()=>ke("design")),(ot=e.querySelector("#studio-tab-code"))==null||ot.addEventListener("click",()=>ke("code")),(rt=e.querySelector(".studio__tabs"))==null||rt.addEventListener("keydown",r=>{var u;if(!(r instanceof KeyboardEvent)||r.key!=="ArrowRight"&&r.key!=="ArrowLeft")return;r.preventDefault();const s=t.panel==="design"?"code":"design";ke(s),(u=e.querySelector(s==="design"?"#studio-tab-design":"#studio-tab-code"))==null||u.focus()});const G=[...e.querySelectorAll("[data-theme-slug]")];for(const r of G)r.addEventListener("click",()=>{const s=r.dataset.themeSlug;s&&Qe(s,!1)});(st=e.querySelector(".studio__themes"))==null||st.addEventListener("keydown",r=>{if(!(r instanceof KeyboardEvent))return;const s=r.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(s))return;r.preventDefault();const u=G.findIndex(le=>le.dataset.themeSlug===t.themeSlug),m=G[(u+(s==="ArrowLeft"||s==="ArrowUp"?-1:1)+G.length)%G.length],_=m==null?void 0:m.dataset.themeSlug;_&&Qe(_,!0)}),(at=e.querySelector("#studio-copy"))==null||at.addEventListener("click",async()=>{const r=Ne();xe.textContent=r;try{await navigator.clipboard.writeText(r)}catch{const u=document.createElement("textarea");u.value=r,document.body.append(u),u.select(),document.execCommand("copy"),u.remove()}const s=e.querySelector("#studio-copy");s&&(s.textContent="복사됨",window.setTimeout(()=>{s.textContent="현재 디자인을 코드로 복사"},1200))}),(dt=e.querySelector("#studio-download"))==null||dt.addEventListener("click",()=>{(async()=>{const r=`ax-studio-${t.cardWidth}x${t.cardHeight}-${t.themeSlug||"theme"}.png`;if(!t.code.trim()){vt(v,r);return}const s=Ge(),u=s?await mt(s):"",f=document.createElement("canvas");await Ii(f,Ct(yt(t,u)),t.cardWidth,t.cardHeight),vt(f,r)})()});const et=r=>{const s=v.getBoundingClientRect();return{x:s.width>0?(r.clientX-s.left)/s.width*t.cardWidth:0,y:s.height>0?(r.clientY-s.top)/s.height*t.cardHeight:0}},tt=(r,s)=>{for(let f=de.length-1;f>=0;f-=1){const m=de[f];if(m&&r>=m.x-8&&s>=m.y-8&&r<=m.x+m.w+8&&s<=m.y+m.h+8)return m}return null};let C=null;v.addEventListener("pointerdown",r=>{if(t.code.trim())return;const s=et(r),u=tt(s.x,s.y);if(u){try{v.setPointerCapture(r.pointerId)}catch{}C={kind:u.kind,dx:s.x-u.x,dy:s.y-u.y,pointerId:r.pointerId},v.dataset.dragging="true"}}),v.addEventListener("pointermove",r=>{const s=et(r);if(!C||C.pointerId!==r.pointerId){v.dataset.hover=tt(s.x,s.y)?"true":"false";return}const u=s.x-C.dx,f=s.y-C.dy;C.kind==="title"?(t.titleX=M(u,t.cardWidth,t.titleSize),t.titleY=M(f,t.cardHeight,t.titleSize)):C.kind==="body"?(t.bodyX=M(u,t.cardWidth,t.bodySize),t.bodyY=M(f,t.cardHeight,t.bodySize)):(t.imageX=ce(u,t.cardWidth,t.imageWidth),t.imageY=ce(f,t.cardHeight,Je())),de=bt(v,t,q)});const it=r=>{!C||C.pointerId!==r.pointerId||(C=null,delete v.dataset.dragging)};v.addEventListener("pointerup",it),v.addEventListener("pointercancel",it);const Ee=r=>{const s=Se.getBoundingClientRect().width,u=D+Fe+10,f=Number.isFinite(r)?r:t.controlsWidth;t.controlsWidth=s>=u?Ht(f,s):Math.max(D,Math.round(f)),Se.style.setProperty("--studio-controls-width",`${t.controlsWidth}px`),S.setAttribute("aria-valuenow",String(t.controlsWidth)),S.setAttribute("aria-valuemax",String(s>=u?Math.max(D,Math.round(s)-Fe-10):t.controlsWidth)),Me()};Ee(t.controlsWidth),S.addEventListener("pointerdown",r=>{if(window.matchMedia("(max-width: 1023px)").matches)return;try{S.setPointerCapture(r.pointerId)}catch{}const s=r.clientX,u=t.controlsWidth,f=_=>{_.pointerId===r.pointerId&&Ee(u+_.clientX-s)},m=_=>{_.pointerId===r.pointerId&&(S.removeEventListener("pointermove",f),S.removeEventListener("pointerup",m),S.removeEventListener("pointercancel",m))};S.addEventListener("pointermove",f),S.addEventListener("pointerup",m),S.addEventListener("pointercancel",m)}),S.addEventListener("keydown",r=>{if(r.key!=="ArrowLeft"&&r.key!=="ArrowRight")return;r.preventDefault();const s=r.shiftKey?48:16;Ee(t.controlsWidth+(r.key==="ArrowRight"?s:-s))}),(lt=e.querySelector("#studio-controls"))==null||lt.addEventListener("submit",r=>{r.preventDefault()}),V==null||V.disconnect(),V=new ResizeObserver(()=>Me()),V.observe(we),$()}const zt="design-llm-wiki-mode",_t="./data/index.json";let k={status:"loading"},pe={query:"",platforms:[],screenTypes:[],uiPatterns:[],tags:[],tones:[]},be=ye(),Tt="all",F=null,qe=null,w=He();function De(){return localStorage.getItem(zt)==="dark"?"dark":"light"}function $t(e){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=e,localStorage.setItem(zt,e)}function We(e,t,i){return`<a class="nav-link${i?" nav-link--current":""}" href="${t}" ${i?'aria-current="page"':""}>${e}</a>`}function Ai(e){return e==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function qi(){const e=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),t=Be(e);return t?ge(t.r,t.g,t.b):I(e)??ge(216,241,255)}function Wi(e,t){var n;const i=e&&t.some(o=>o.slug===e)?e:null;return F?(e&&e!==qe&&i&&(F.themeSlug=i,qe=e),F):(F=Dt(i??((n=t[0])==null?void 0:n.slug)??"",qi()),qe=e,F)}function zi(e){const t=De(),i=t==="dark"?"라이트 모드로 전환":"다크 모드로 전환",n=w.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${We("Archive",R({name:"archive"}),w.name==="archive"||w.name==="capture")}
        ${We("Online Marketing Studio",R({name:"studio",theme:null}),w.name==="studio")}
        ${We("History",R({name:"history"}),w.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${i}" title="${i}">
          ${Ai(t)}
        </button>
      </div>
    </header>
    <main class="shell${n?" shell--studio":""}" id="main">${e}</main>
  `}function Ti(){if(k.status==="loading")return`
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
    `;const e=k.index;switch(w.name){case"archive":return ai(e,pe,be,Tt);case"capture":return _i(e,w.slug,be);case"studio":return Ei(Wi(w.theme,e.captures),e.captures);case"history":return wi(e);case"notfound":return xi(w.path)}}function W(){var t;const e=document.querySelector("#app");if(!e)throw new Error("#app not found");$t(De()),be=ye(),e.innerHTML=zi(Ti()),(t=e.querySelector("#mode-toggle"))==null||t.addEventListener("click",()=>{$t(De()==="dark"?"light":"dark"),W()}),k.status==="ready"&&(w.name==="archive"&&di(e,pe,{onFilterChange:i=>{const n=document.activeElement,o=(n==null?void 0:n.id)==="archive-search"?"search":null;if(pe=i,W(),o==="search"){const a=document.querySelector("#archive-search");a==null||a.focus();const d=(a==null?void 0:a.value.length)??0;a==null||a.setSelectionRange(d,d)}},onClearFilters:()=>{var i;pe={query:"",platforms:[],screenTypes:[],uiPatterns:[],tags:[],tones:[]},W(),(i=document.querySelector("#archive-search"))==null||i.focus()},onTabChange:i=>{var n;Tt=i,W(),(n=document.querySelector(`[data-archive-tab="${i}"]`))==null||n.focus()}}),w.name==="capture"&&$i(e,i=>{be=Kt(i),W()}),w.name==="studio"&&k.status==="ready"&&F&&Li(e,F,k.index.captures))}async function Pi(){k={status:"loading"},W();try{const e=await fetch(_t,{cache:"no-store"});if(!e.ok)throw new Error(`${_t} → HTTP ${e.status}`);const t=await e.json();if(!t||!Array.isArray(t.captures)||!t.facets)throw new Error("Index JSON is missing captures or facets");k={status:"ready",index:t}}catch(e){k={status:"error",message:e instanceof Error?e.message:String(e)}}W()}Jt(e=>{if(Lt(window.location.hash)){window.location.replace(R({name:"studio",theme:null}));return}w=e,W()});Pi();
