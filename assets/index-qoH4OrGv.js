(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=o(r);fetch(r.href,l)}})();const $n="ig-feed-square",Ce=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function Ot(t){return Ce.find(e=>e.id===t)??Ce[0]}const Nt=0,ae=120,wn=28,et=100,ct=4e3,qe=5,Ye=10,le=100,Fe=4e3,wt=240,Ui=360,Te=280,He=6,Sn="시즌",Mn=`새로운 컬렉션
브랜드의 첫 인상을 한 장으로 전합니다.`,ce=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Ii="rgb(0, 0, 0)",Wi="rgb(255, 255, 255)";function ji(t){return Number.isFinite(t)?Math.min(ae,Math.max(Nt,Math.round(t))):Nt}function it(t){return Number.isFinite(t)?Math.min(ct,Math.max(et,Math.round(t))):et}function En(t,e,o){const s=Math.max(1,Math.round(t)),l=Math.max(1,Math.round(e))/s;let c=it(o);const g=Math.round(c*l);let p=it(g);return g!==p&&(c=it(Math.round(p/l)),p=it(Math.round(c*l))),{cardWidth:c,cardHeight:p}}function De(t){return Math.max(qe,it(t)-Ye*2)}function nt(t,e){const o=De(e);return Number.isFinite(t)?Math.min(o,Math.max(qe,Math.round(t))):qe}function Yt(t){return Number.isFinite(t)?Math.min(Fe,Math.max(le,Math.round(t))):le}function ot(t,e,o){const s=Math.max(0,Math.round(e)-Math.min(Math.max(o,0),Math.round(e)));return Number.isFinite(t)?Math.min(s,Math.max(0,Math.round(t))):0}function te(t,e,o){const s=Math.round(-o+40),r=Math.round(e-40);return Number.isFinite(t)?s>r?Math.round((e-o)/2):Math.min(r,Math.max(s,Math.round(t))):0}function ee(t,e,o,s){const r=Yt(e),l=r/Math.max(1,t.width);return{x:Math.round(o-(o-t.x)*l),y:Math.round(s-(s-t.y)*l),width:r}}function Ln(t,e){const o=Math.max(wt,Math.round(e)-Te-He);return Number.isFinite(t)?Math.min(o,Math.max(wt,Math.round(t))):Ui}function kn(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function Mt(t,e=[]){var s;const o=ce.find(r=>r.id===t);return o?o.stack:((s=e.find(r=>r.id===t))==null?void 0:s.stack)??ce[0].stack}function Ki(t,e){const o=Ot($n),s=nt(Math.round(o.width*.046),o.width),r=nt(Math.round(o.width*.026),o.width),l=Math.round(o.height*.7);return{presetId:o.id,cardWidth:o.width,cardHeight:o.height,title:Sn,body:Mn,themeSlug:t,color:e,radius:wn,code:"",panel:"design",controlsWidth:Ui,titleSize:s,bodySize:r,titleX:ot(Math.round(o.width*.06),o.width,s),titleY:ot(l,o.height,s),bodyX:ot(Math.round(o.width*.06),o.width,r),bodyY:ot(l+Math.round(s*1.6),o.height,r),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:Dt(e),bodyColor:Dt(e),imageWidth:Yt(o.width),imageX:0,imageY:0}}function In(t,e){const o=Ki(t.themeSlug,e);o.controlsWidth=t.controlsWidth,o.panel=t.panel,Object.assign(t,o)}function U(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function ue(t,e,o){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(t)}${s(e)}${s(o)}`}function Xe(t){const e=U(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const o=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return o?{r:Number(o[1]),g:Number(o[2]),b:Number(o[3])}:null}function xt(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function Ai(t,e){const o=.2126*xt(t.r)+.7152*xt(t.g)+.0722*xt(t.b),s=.2126*xt(e.r)+.7152*xt(e.g)+.0722*xt(e.b),r=Math.max(o,s),l=Math.min(o,s);return(r+.05)/(l+.05)}function Dt(t){const e=Xe(Zi(t));return e?ue(e.r,e.g,e.b):ue(0,0,0)}function Zi(t){const e=Xe(t)??{r:255,g:255,b:255},o=Ai({r:0,g:0,b:0},e),s=Ai({r:255,g:255,b:255},e);return o>=4.5&&o>=s?Ii:s>=4.5?Wi:o>=s?Ii:Wi}function Wn(t,e,o){if(e<=0)return[];const s=[];for(const r of t.split(`
`)){const l=r.split(/\s+/).filter(Boolean);if(l.length===0){s.push("");continue}let c="";const g=p=>{if(o(p)<=e){c=p;return}let f="";for(const _ of p){const y=f+_;o(y)<=e?f=y:(f&&s.push(f),f=_)}c=f};for(const p of l){const f=c?`${c} ${p}`:p;o(f)<=e?c=f:(c&&s.push(c),g(p))}c&&s.push(c)}return s}function Ie(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function An(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function zn(t,e){return An(t).replaceAll("{{title}}",Ie(e.title)).replaceAll("{{body}}",Ie(e.body)).replaceAll("{{themeImage}}",Ie(e.themeImage))}function Re(){return`<article class="studio-card">
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
</style>`}function Gi(t){const e=U(t.color)??t.color,o=Zi(e),s=U(t.titleColor)??Dt(e),r=U(t.bodyColor)??Dt(e),l=ji(t.radius),c=Ot("ig-feed-square"),g=t.width>0?t.width:c.width,p=t.height>0?t.height:c.height,f=t.titleFontStack.replaceAll(";",""),_=t.bodyFontStack.replaceAll(";",""),y=zn(t.code.trim()||Re(),t),S=[`--studio-color:${e}`,`--studio-ink:${o}`,`--studio-radius:${l}px`,`--studio-width:${g}px`,`--studio-height:${p}px`,`--studio-title-font:${f}`,`--studio-body-font:${_}`,`--studio-title-size:${nt(t.titleSize,g)}px`,`--studio-body-size:${nt(t.bodySize,g)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${Yt(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${g}px;height:${p}px;margin:0;background:transparent;${S}">${y}</div>`}function Cn(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Gi(t)}</body>
</html>`}const Ji="design-llm-wiki-pins";function he(){try{const t=localStorage.getItem(Ji);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(o=>typeof o=="string"):[]}catch{return[]}}function qn(t){const e=[...new Set(t)];localStorage.setItem(Ji,JSON.stringify(e))}function Fn(t){const e=he(),o=e.includes(t)?e.filter(s=>s!==t):[...e,t];return qn(o),he()}const Vi="[a-z0-9]+(?:-[a-z0-9]+)*";function Qi(t){const e=t.startsWith("#")?t.slice(1):t,o=e.indexOf("?"),s=o>=0?e.slice(0,o):e,r=o>=0?e.slice(o+1):"",l=s.startsWith("/")?s:`/${s}`;return{path:l==="/"||l===""?"/":l.replace(/\/+$/,"")||"/",query:r}}function Tn(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${Vi}$`).test(e)?null:e}function tn(t){const{path:e}=Qi(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function Pe(t=window.location.hash){const{path:e,query:o}=Qi(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||tn(t))return{name:"studio",theme:e==="/studio"?Tn(o):null};const s=e.match(new RegExp(`^/capture/(${Vi})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:e}}function ht(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function Hn(t){const e=()=>t(Pe());return window.addEventListener("hashchange",e),t(Pe()),()=>window.removeEventListener("hashchange",e)}function Rn(t){return[...t].sort((e,o)=>e.capturedAt!==o.capturedAt?e.capturedAt<o.capturedAt?1:-1:e.slug.localeCompare(o.slug))}function h(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function St(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let ie=null;function Pn(t){const e=t.querySelector(".archive-tabs__indicator"),o=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!o)return;const s=o.offsetLeft,r=o.offsetWidth;ie&&(e.style.transition="none",e.style.transform=`translateX(${ie.left}px)`,e.style.width=`${ie.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${s}px)`,e.style.width=`${r}px`,ie={left:s,width:r}})}function We(t){const e=t.querySelector(".capture-grid");if(!e)return;const o=window.getComputedStyle(e),s=Number.parseFloat(o.gridAutoRows)||1,r=Number.parseFloat(o.rowGap)||0;e.querySelectorAll(".capture-card").forEach(l=>{l.style.gridRowEnd="";const c=l.getBoundingClientRect().height,g=Number.parseFloat(window.getComputedStyle(l).marginBottom)||0,p=Math.ceil((c+g+r)/(s+r));l.style.gridRowEnd=`span ${Math.max(1,p)}`})}function Nn(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${h(St(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function On(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${ht({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${Nn(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${h(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${h(t.title)}</h2>
          <p class="capture-card__insight">${h(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Yn(t,e){const o=new Set(e),s=Rn(t),r=s.filter(f=>o.has(f.slug)),l=s.filter(f=>!o.has(f.slug)),c=new Map(s.map(f=>[f.slug,f])),g=e.map(f=>c.get(f)).filter(f=>!!f),p=r.filter(f=>!e.includes(f.slug));return[...g,...p,...l]}function Dn(t,e,o){const s=new Set(e),r=o==="pin"?t.captures.filter(c=>s.has(c.slug)):t.captures,l=Yn(r,e);return t.captures.length===0?`
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
          <p class="gallery__meta">Target ${h(t.target)} · ${l.length} · ${e.length} pinned</p>
        </div>
      </header>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${o==="all"?"true":"false"}">
          All <span class="archive-tab__count">${t.captures.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${o==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${e.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${l.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${o==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${o==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${l.map(c=>On(c,e.includes(c.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Xn(t,e){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.archiveTab;(l==="all"||l==="pin")&&e.onTabChange(l)})}),Pn(t),requestAnimationFrame(()=>We(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>We(t),{once:!0})});const o=new ResizeObserver(()=>We(t)),s=t.querySelector(".capture-grid");s&&o.observe(s)}function Bn(t){const e=t.replace(/\r\n/g,`
`).split(`
`),o=[];let s=!1;const r=()=>{s&&(o.push("</ul>"),s=!1)};for(const l of e){const c=l.trim();if(!c){r();continue}if(c.startsWith("### ")){r(),o.push(`<h3>${Tt(c.slice(4))}</h3>`);continue}if(c.startsWith("## ")){r(),o.push(`<h2>${Tt(c.slice(3))}</h2>`);continue}if(c.startsWith("# ")){r(),o.push(`<h1>${Tt(c.slice(2))}</h1>`);continue}if(c.startsWith("- ")){s||(o.push("<ul>"),s=!0),o.push(`<li>${Tt(c.slice(2))}</li>`);continue}r(),o.push(`<p>${Tt(c)}</p>`)}return r(),o.join(`
`)}function Tt(t){let e=h(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(o,s)=>`<a href="${ht({name:"capture",slug:s})}">${s}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(o,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${h(r)}">${s}</a>`),e}const Un=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function jn(t){return Math.max(35,Math.min(98,Math.round(t)))}function Kn(t){let e=0;for(const o of t)e=(e*31+o.charCodeAt(0))%997;return e}function Zn(t){var f;if((f=t.analysisScores)!=null&&f.length)return t.analysisScores;const e=Kn(`${t.slug}:${t.title}:${t.insight}`),o=t.tags.includes("density")?7:0,s=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),l=t.asset.width/Math.max(1,t.asset.height),c=l>1.2?6:0,g=l<.75?5:0,p=[68+r+c+e%9,66+o+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+s+(t.uiPatterns.includes("filter-chips")?7:0),62+g+r+(e>>3)%8].map(jn);return Un.map(([_,y],S)=>({key:_,label:y,score:p[S]??60,description:Jn(y,p[S]??60,t)}))}function Gn(t){return t.length===0?0:Math.round(t.reduce((e,o)=>e+o.score,0)/t.length)}function Jn(t,e,o){return t==="레이아웃"?`${o.screenType} 화면 구조와 ${o.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?o.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function Vn(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Qn(t){return t.asset.kind==="motion"?`
      <video class="detail-media" controls preload="metadata"${t.asset.posterPath?` poster="${h(St(t.asset.posterPath))}"`:""}>
        <source src="${h(St(t.asset.path))}" />
      </video>
    `:`
    <img
      class="detail-media"
      src="${h(St(t.asset.path))}"
      alt=""
      width="${t.asset.width}"
      height="${t.asset.height}"
    />
  `}function to(t){const e=Zn(t),o=t.analysisTotal??Gn(e),s=160,r=110,l=[.25,.5,.75,1].map(p=>e.map((f,_)=>{const y=-Math.PI/2+_*Math.PI*2/e.length,S=s+Math.cos(y)*r*p,A=s+Math.sin(y)*r*p;return`${S.toFixed(1)},${A.toFixed(1)}`}).join(" ")).map(p=>`<polygon class="spider-grid" points="${p}" />`).join(""),c=e.map((p,f)=>{const _=-Math.PI/2+f*Math.PI*2/e.length,y=r*(p.score/100),S=s+Math.cos(_)*y,A=s+Math.sin(_)*y;return`${S.toFixed(1)},${A.toFixed(1)}`}).join(" "),g=e.map((p,f)=>{const _=-Math.PI/2+f*Math.PI*2/e.length,y=s+Math.cos(_)*r,S=s+Math.sin(_)*r,A=s+Math.cos(_)*r*(p.score/100),Y=s+Math.sin(_)*r*(p.score/100),b=s+Math.cos(_)*(r+26),M=s+Math.sin(_)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${y.toFixed(1)}" y2="${S.toFixed(1)}" />
          <circle class="spider-point" cx="${A.toFixed(1)}" cy="${Y.toFixed(1)}" r="6" />
          <text class="spider-label" x="${b.toFixed(1)}" y="${M.toFixed(1)}">${h(p.label)}</text>
          <text class="spider-callout" x="${b.toFixed(1)}" y="${(M+18).toFixed(1)}">${p.score}</text>
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
          ${l}
          <polygon class="spider-area" points="${c}" />
          ${g}
        </svg>
        <dl class="score-list">
          ${e.map(p=>`
            <div class="score-list__item">
              <dt>${h(p.label)} <strong>${p.score}</strong></dt>
              <dd>${h(p.description)}</dd>
            </div>
          `).join("")}
        </dl>
      </div>
    </section>
  `}function eo(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(o=>`<span class="chip detail-hashtag" aria-pressed="true">#${h(o)}</span>`).join("")}function io(t,e,o){const s=t.captures.find(l=>l.slug===e);if(!s)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${h(e)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=o.includes(e);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${h(s.service)} · ${h(s.platform)}</p>
          <h1 class="detail__title">${h(s.title)}</h1>
          <p class="detail__insight">${h(s.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${h(ht({name:"studio",theme:e}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${h(e)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Qn(s)}</div>

      ${to(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${h(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${h(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${Vn(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${h(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${eo(s)}
        </p>
        <p class="detail__meta-line">
          ${h(s.screenType)} · ${h(s.tone)} · ${h(s.copyTone)} · ${h(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${h(s.sourceUrl)}">${h(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Bn(s.body)}
      </section>
    </article>
  `}function no(t,e){var o;(o=t.querySelector("[data-pin-slug]"))==null||o.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&e(r)})}function oo(t){const e=t.wiki.logEntries;return e.length===0?`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">History</h1>
        <p class="state-panel__text">아직 로그가 없습니다. ingest / query / lint 후 <code>obsidian/wiki/log.md</code>에 쌓이면 여기에 표시됩니다.</p>
      </section>
    `:`
    <section class="page history">
      <header class="page__header">
        <div>
          <h1 class="page__title">History</h1>
          <p class="page__meta">Obsidian wiki 로그의 작업 이력 · ${e.length} entries · target ${h(t.target)}</p>
        </div>
      </header>

      <ol class="history-timeline">
        ${e.map(o=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${h(o.date)}">${h(o.date)}</time>
            <span class="history-item__op">${h(o.operation)}</span>
            <strong class="history-item__title">${h(o.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function so(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${h(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const zi=.5,Ci=3,qi=.25,Fi=40;let L=1,J=[],Ht=[],$t=[],ne=[],Rt=null,Ti=1;const ro=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],en="(min-width: 768px)",nn="(min-width: 1025px)";let de=null,oe=null,se=null;function Be(){return window.matchMedia(nn).matches?"desktop":window.matchMedia(en).matches?"tablet":"mobile"}function on(){const t=["mobile","tablet","desktop"],e=Be();return de&&t.indexOf(de)<=t.indexOf(e)?de:e}function re(t){return{...t}}function Hi(t,e){return JSON.stringify(t)===JSON.stringify(e)}const Ne=new Map,Ri=new Map;function sn(t){const e=Ne.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((o,s)=>{const r=e??new Image;r.onload=()=>o(r),r.onerror=()=>s(new Error(`Image failed: ${t}`)),e||(Ne.set(t,r),r.src=t)})}function Pi(t){const e=Ri.get(t);if(e)return e;const o=fetch(t).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,l)=>{const c=new FileReader;c.onload=()=>r(String(c.result)),c.onerror=()=>l(c.error??new Error("data url failed")),c.readAsDataURL(s)}));return Ri.set(t,o),o}const ao=Object.assign({}),Ni=new Set;function lo(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function Et(){const t=new Set(ce.map(o=>o.label.toLowerCase())),e=[];for(const[o,s]of Object.entries(ao)){const r=kn(o);if(!r||t.has(r.toLowerCase()))continue;const l=`local:${r}`;if(!e.some(c=>c.id===l)){if(!Ni.has(r)){Ni.add(r);const c=document.createElement("style");c.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${lo(s)}");font-display:swap;}`,document.head.append(c)}e.push({id:l,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return e}function co(){return[...ce,...Et()]}function uo(t,e,o,s){const r=Math.max(0,Math.min(s,e/2,o/2));t.beginPath(),t.roundRect(0,0,e,o,r)}function Oi(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:Mt(t.titleFontId,Et()),bodyFontStack:Mt(t.bodyFontId,Et()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function ho(t,e,o,s){const r=t.getContext("2d");if(!r)return[];const l=e.cardWidth,c=e.cardHeight;t.width=l,t.height=c,r.clearRect(0,0,l,c),r.save(),uo(r,l,c,e.radius),r.clip(),r.fillStyle=e.color,r.fillRect(0,0,l,c);const g=[];if(o&&o.naturalWidth>0){const y=e.imageWidth,S=y*(o.naturalHeight/o.naturalWidth);r.drawImage(o,e.imageX,e.imageY,y,S),g.push({kind:"image",x:e.imageX,y:e.imageY,w:y,h:S})}const p=Math.max(1,l-Ye*2);r.textBaseline="top";const f=(y,S,A,Y,b,M,Lt,pt)=>{if(!S.trim())return;r.fillStyle=pt,r.font=`${M} ${b}px ${Lt}`;const st=Wn(S.trim(),p,j=>r.measureText(j).width),rt=Math.round(b*1.25);let Q=0;st.forEach((j,kt)=>{y!==s&&r.fillText(j,A,Y+kt*rt),Q=Math.max(Q,r.measureText(j).width)}),g.push({kind:y,x:A,y:Y,w:Math.max(Q,b),h:Math.max(st.length,1)*rt})},_=Et();return f("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,Mt(e.bodyFontId,_),e.bodyColor),f("title",e.title,e.titleX,e.titleY,e.titleSize,600,Mt(e.titleFontId,_),e.titleColor),r.restore(),g}function Yi(t,e){t.toBlob(o=>{if(!o)return;const s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=e,r.click(),URL.revokeObjectURL(s)},"image/png")}async function po(t,e,o,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${s}"><foreignObject x="0" y="0" width="${o}" height="${s}">${e}</foreignObject></svg>`,l=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),c=URL.createObjectURL(l);try{const g=await sn(c),p=t.getContext("2d");if(!p)return;t.width=o,t.height=s,p.clearRect(0,0,o,s),p.drawImage(g,0,0,o,s)}finally{URL.revokeObjectURL(c),Ne.delete(c)}}let Pt=null;function Di(t,e,o){let s=0;const r=()=>{const l=t.scrollHeight-t.clientHeight;if(l<=1){e.hidden=!0;return}e.hidden=!1;const c=Math.max(32,t.clientHeight/t.scrollHeight*t.clientHeight),g=Math.max(0,t.clientHeight-c);e.style.height=`${c}px`,e.style.transform=`translateY(${t.scrollTop/l*g}px)`};return t.addEventListener("scroll",()=>{r(),o.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>o.classList.remove("is-scrolling"),700)}),r(),r}function mo(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const o=Dt(t.color);t.titleColor=U(String(t.titleColor??""))??o,t.bodyColor=U(String(t.bodyColor??""))??o;const s=t.fontId;t.titleFontId||(t.titleFontId=s||"pretendard"),t.bodyFontId||(t.bodyFontId=s||"pretendard");const r=Ot(t.presetId),l=Ce.map(b=>`<option value="${h(b.id)}"${b.id===r.id?" selected":""}>${h(b.name)} · ${b.width}×${b.height}</option>`).join(""),c=e.map(b=>{const M=b.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${h(b.slug)}"
          aria-checked="${M?"true":"false"}"
          tabindex="${M?"0":"-1"}"
        >
          <img src="${h(St(b.asset.path))}" alt="${h(b.title)}" />
        </button>
      `}).join(""),g=t.panel==="design",p=co(),f=De(t.cardWidth),_=b=>p.map(M=>`<option value="${h(M.id)}"${M.id===b?" selected":""}>${h(M.label)}</option>`).join(""),y='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',S='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',A=on();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${ro.map(b=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${b.id}" aria-label="${b.label}" title="${b.label}" aria-pressed="${b.id===A?"true":"false"}">${b.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${A}" data-framed="${A===Be()?"false":"true"}">
    <section class="studio" style="--studio-controls-width:${t.controlsWidth}px">
      <div class="studio__controls-wrap">
      <form class="studio__controls" id="studio-controls">
        <div class="studio__tabs" role="tablist" aria-label="컨트롤 패널">
          <button type="button" class="studio__tab" role="tab" id="studio-tab-design" aria-controls="studio-panel-design" aria-selected="${g?"true":"false"}" tabindex="${g?"0":"-1"}">Design</button>
          <button type="button" class="studio__tab" role="tab" id="studio-tab-code" aria-controls="studio-panel-code" aria-selected="${g?"false":"true"}" tabindex="${g?"-1":"0"}">Code</button>
        </div>

        <div id="studio-panel-design" role="tabpanel" aria-labelledby="studio-tab-design"${g?"":" hidden"}>
          <div class="studio__field">
            <label for="studio-preset">카드 크기 프리셋</label>
            <select id="studio-preset" class="studio__control">${l}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${et}" max="${ct}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${et}" max="${ct}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${et}" max="${ct}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${et}" max="${ct}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${et}" max="${ct}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${et}" max="${ct}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title">카드 타이틀</label>
            <input id="studio-title" class="studio__control" type="text" value="${h(t.title)}" placeholder="타이틀" />
          </div>
          <div class="studio__field">
            <label for="studio-title-color">타이틀 컬러</label>
            <div class="studio__color">
              <input id="studio-title-color" class="studio__color-picker studio__color-picker--text" type="color" value="${h(t.titleColor)}" aria-label="타이틀 컬러 피커" />
              <input id="studio-title-hex" class="studio__control" type="text" value="${h(t.titleColor)}" spellcheck="false" aria-label="타이틀 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-size">타이틀 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-title-size" type="range" min="5" max="${f}" step="1" value="${t.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${f}" step="1" value="${t.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${_(t.titleFontId)}</select>
          </div>
          <div class="studio__field">
            <label for="studio-body">본문</label>
            <textarea id="studio-body" class="studio__control studio__control--area" placeholder="본문">${h(t.body)}</textarea>
          </div>
          <div class="studio__field">
            <label for="studio-body-color">본문 컬러</label>
            <div class="studio__color">
              <input id="studio-body-color" class="studio__color-picker studio__color-picker--text" type="color" value="${h(t.bodyColor)}" aria-label="본문 컬러 피커" />
              <input id="studio-body-hex" class="studio__control" type="text" value="${h(t.bodyColor)}" spellcheck="false" aria-label="본문 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-size">본문 폰트 크기</label>
            <div class="studio__radius">
              <input id="studio-body-size" type="range" min="5" max="${f}" step="1" value="${t.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${f}" step="1" value="${t.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${_(t.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${c}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${le}" max="${Fe}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${le}" max="${Fe}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
            </div>
          </div>
          <p class="studio__hint">프리뷰에서 이미지를 드래그해 옮기고, 핀치하거나 클릭 후 가장자리 핸들을 끌어 크기를 조절할 수 있습니다.</p>
          <div class="studio__field">
            <label for="studio-color">카드 컬러</label>
            <div class="studio__color">
              <input id="studio-color" class="studio__color-picker" type="color" value="${h(t.color)}" aria-label="카드 컬러 피커" />
              <input id="studio-hex" class="studio__control" type="text" value="${h(t.color)}" spellcheck="false" aria-label="카드 컬러 hex" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-radius">카드 radius</label>
            <div class="studio__radius">
              <input id="studio-radius" type="range" min="${Nt}" max="${ae}" step="1" value="${t.radius}" aria-valuemin="${Nt}" aria-valuemax="${ae}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${Nt}" max="${ae}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${g?" hidden":""}>
          <div class="studio__field">
            <label for="studio-code">코드</label>
            <textarea id="studio-code" class="studio__control studio__control--code" spellcheck="false" placeholder="HTML + CSS 조각을 붙여 넣으세요.">${h(t.code)}</textarea>
          </div>
          <button type="button" class="button button--secondary studio__copy" id="studio-copy">현재 디자인을 코드로 복사</button>
          <pre class="studio__export" id="studio-export"></pre>
        </div>
      </form>
      <div class="studio__scroll-thumb" id="studio-scroll-thumb" hidden></div>
      </div>
      <div class="studio__splitter" id="studio-splitter" role="separator" aria-orientation="vertical" aria-label="컨트롤 패널과 프리뷰 너비" aria-valuemin="${wt}" aria-valuenow="${t.controlsWidth}" tabindex="0"></div>

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
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled>${S}</button>
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
  `}function fo(t,e,o,s){var bi,vi,_i,xi,$i,wi,Si,Mi,Ei;if(o.length===0)return;const r=t.querySelector("#studio-preset"),l=t.querySelector("#studio-size"),c=t.querySelector("#studio-size-number"),g=t.querySelector("#studio-width"),p=t.querySelector("#studio-width-number"),f=t.querySelector("#studio-height"),_=t.querySelector("#studio-height-number"),y=t.querySelector("#studio-title"),S=t.querySelector("#studio-title-color"),A=t.querySelector("#studio-title-hex"),Y=t.querySelector("#studio-title-size"),b=t.querySelector("#studio-title-size-number"),M=t.querySelector("#studio-body"),Lt=t.querySelector("#studio-body-color"),pt=t.querySelector("#studio-body-hex"),st=t.querySelector("#studio-body-size"),rt=t.querySelector("#studio-body-size-number"),Q=t.querySelector("#studio-title-font"),j=t.querySelector("#studio-body-font"),kt=t.querySelector("#studio-image-width"),me=t.querySelector("#studio-image-width-number"),fe=t.querySelector("#studio-color"),Xt=t.querySelector("#studio-hex"),C=t.querySelector("#studio-radius"),D=t.querySelector("#studio-radius-number"),K=t.querySelector("#studio-code"),x=t.querySelector("#studio-canvas"),Bt=t.querySelector("#studio-iframe"),Ue=t.querySelector("#studio-meta"),It=t.querySelector("#studio-safe"),Ut=t.querySelector("#studio-scaler"),ge=t.querySelector("#studio-fit"),Wt=t.querySelector("#studio-stage"),ye=t.querySelector("#studio-zoom-out"),be=t.querySelector("#studio-zoom-in"),je=t.querySelector("#studio-zoom-label"),ve=t.querySelector("#studio-undo"),_e=t.querySelector("#studio-redo"),Ke=t.querySelector("#studio-scroll-thumb"),Ze=t.querySelector(".studio__controls-wrap"),xe=t.querySelector("#studio-export"),N=t.querySelector("#studio-splitter"),jt=t.querySelector(".studio"),ln=[...t.querySelectorAll(".studio__select-frame")],w=t.querySelector("#studio-editor"),$e=[...t.querySelectorAll(".studio__handle")];if(!w||!r||!l||!c||!g||!p||!f||!_||!y||!S||!A||!Y||!b||!M||!Lt||!pt||!st||!rt||!Q||!j||!kt||!me||!fe||!Xt||!C||!D||!K||!x||!Bt||!Ue||!It||!Ut||!ge||!Wt||!ye||!be||!je||!ve||!_e||!Ke||!Ze||!xe||!N||!jt)return;const Ge=()=>{const i=o.find(n=>n.slug===e.themeSlug)??o[0];return i?St(i.asset.path):""};let Kt=0,Z=1;const k=new Set;let W=null,q=()=>{},At=()=>{};const cn=()=>{(!Number.isFinite(L)||L<=0)&&(L=1),ye.disabled=L<=zi+.001,be.disabled=L>=Ci-.001,je.textContent=`${Math.round(L*100)}%`},we=(i,n)=>{const a=Wt.getBoundingClientRect(),d=20,u=Math.min(Math.max(a.width-d,1)/i,Math.max(a.height-d,1)/n);return Number.isFinite(u)&&u>0?u:1},mt=()=>{const i=we(e.cardWidth,e.cardHeight);cn();const n=i*L;ge.style.width=`${e.cardWidth*n}px`,ge.style.height=`${e.cardHeight*n}px`,Ut.style.width=`${e.cardWidth}px`,Ut.style.height=`${e.cardHeight}px`,Ut.style.transform=`scale(${n})`,Z=n,At()};ye.addEventListener("click",()=>{L=Math.max(zi,L-qi),mt()}),be.addEventListener("click",()=>{L=Math.min(Ci,L+qi),mt()}),(bi=t.querySelector("#studio-zoom-fit"))==null||bi.addEventListener("click",()=>{L=1,mt(),Wt.scrollTo(0,0)});const Je=t.querySelector("#studio-controls");Je&&Di(Je,Ke,Ze);const ft=()=>{const i=document.querySelector("#studio-undo"),n=document.querySelector("#studio-redo");i&&(i.disabled=J.length===0),n&&(n.disabled=Ht.length===0)};let zt=null;const v=i=>{if(i&&zt!==i)return;if(!Rt){zt=null;return}const n=Rt,a=Ti;Rt=null,zt=null,!(Hi(n,e)&&a===L)&&(J.push(n),$t.push(a),J.length>Fi&&(J.shift(),$t.shift()),Ht=[],ne=[],ft())},E=i=>{i&&zt===i&&Rt||(v(),Rt=re(e),Ti=L,zt=i??null)},un=i=>{const n=Number(i.min),a=Number(i.max),d=Number(i.value),u=a>n?(d-n)/(a-n)*100:0;i.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,u))}%`)};let Ve=e.cardHeight/Math.max(1,e.cardWidth),gt={cardWidth:e.cardWidth,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY};const Se=()=>{Ve=e.cardHeight/Math.max(1,e.cardWidth),gt={cardWidth:e.cardWidth,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY}};let X=null,yt=1,at=[];const Qe=()=>e.imageWidth*yt,Me=()=>{e.cardWidth=it(e.cardWidth),e.cardHeight=it(e.cardHeight),e.imageWidth=Yt(e.imageWidth)},bt=(i,n,a)=>{i.value=String(a),document.activeElement!==n&&(n.value=String(a))},hn=()=>{const i=De(e.cardWidth),n=String(Math.max(i,e.titleSize)),a=String(Math.max(i,e.bodySize));for(const d of[Y,b])d.min="5",d.max=n;for(const d of[st,rt])d.min="5",d.max=a;bt(l,c,e.cardWidth),bt(g,p,e.cardWidth),bt(f,_,e.cardHeight),bt(Y,b,e.titleSize),bt(st,rt,e.bodySize),bt(kt,me,e.imageWidth)},ti=()=>{C.value=String(e.radius),C.setAttribute("aria-valuenow",String(e.radius)),D.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},ei=(i,n)=>{e.themeSlug=i;for(const a of t.querySelectorAll("[data-theme-slug]")){const d=a.dataset.themeSlug===i;a.setAttribute("aria-checked",d?"true":"false"),a.tabIndex=d?0:-1,d&&n&&a.focus()}I()},Ee=i=>{var u,m;e.panel=i;const n=i==="design";(u=t.querySelector("#studio-panel-design"))==null||u.toggleAttribute("hidden",!n),(m=t.querySelector("#studio-panel-code"))==null||m.toggleAttribute("hidden",n);const a=t.querySelector("#studio-tab-design"),d=t.querySelector("#studio-tab-code");a==null||a.setAttribute("aria-selected",n?"true":"false"),d==null||d.setAttribute("aria-selected",n?"false":"true"),a&&(a.tabIndex=n?0:-1),d&&(d.tabIndex=n?-1:0),I()},ii=()=>{r.value=e.presetId,document.activeElement!==y&&(y.value=e.title),document.activeElement!==M&&(M.value=e.body),document.activeElement!==A&&(S.value=e.titleColor,A.value=e.titleColor),document.activeElement!==pt&&(Lt.value=e.bodyColor,pt.value=e.bodyColor),document.activeElement!==Xt&&(fe.value=e.color,Xt.value=e.color),Q.value=e.titleFontId,j.value=e.bodyFontId,document.activeElement!==K&&(K.value=e.code);for(const i of t.querySelectorAll("[data-theme-slug]")){const n=i.dataset.themeSlug===e.themeSlug;i.setAttribute("aria-checked",n?"true":"false"),i.tabIndex=n?0:-1}},I=async()=>{const i=++Kt;Me(),ii(),hn(),t.querySelectorAll('input[type="range"]').forEach(un);const n=Ot(e.presetId),a=e.cardWidth===n.width&&e.cardHeight===n.height,d=a&&n.safe?` · 안전 영역 ${n.safe.width} × ${n.safe.height}`:"";Ue.textContent=`${e.cardWidth} × ${e.cardHeight} · ${n.name}${d}`,xe.textContent=Re(),ti(),mt(),a&&n.safe?(It.hidden=!1,It.style.width=`${n.safe.width}px`,It.style.height=`${n.safe.height}px`):It.hidden=!0;const u=($,T,z)=>{var Ft;const R=(Ft=Mt($,Et()).split(",")[0])==null?void 0:Ft.replaceAll('"',"").trim();return R?document.fonts.load(`${T} ${z}px "${R}"`):Promise.resolve()};try{await Promise.all([u(e.titleFontId,600,e.titleSize),u(e.bodyFontId,400,e.bodySize)])}catch{}if(i!==Kt)return;const m=Ge();if(e.code.trim()){x.hidden=!0,Bt.hidden=!1;const $=m?await Pi(m):"";if(i!==Kt)return;Bt.srcdoc=Cn(Oi(e,$)),At();return}if(Bt.hidden=!0,x.hidden=!1,m)try{X=await sn(m),X.naturalWidth>0&&(yt=X.naturalHeight/X.naturalWidth)}catch{X=null,yt=1}else X=null,yt=1;i===Kt&&(Me(),q())},vt=(i,n,a,d)=>{i.addEventListener("pointerdown",()=>E(i)),i.addEventListener("keydown",()=>E(i)),i.addEventListener("pointerup",()=>v(i)),i.addEventListener("pointercancel",()=>v(i)),i.addEventListener("keyup",()=>v(i)),i.addEventListener("input",()=>{a(Number(i.value)),I()});const u=()=>{Me(),n.value=String(d()),v(n)};n.addEventListener("focus",()=>E(n)),n.addEventListener("input",()=>{n.value.trim()!==""&&(a(Number(n.value)),I())}),n.addEventListener("change",u),n.addEventListener("blur",u)};r.addEventListener("focus",()=>E(r)),r.addEventListener("change",()=>{const i=Ot(r.value);e.presetId=i.id,e.cardWidth=i.width,e.cardHeight=i.height,v(r),I()}),r.addEventListener("blur",()=>v(r)),l.addEventListener("pointerdown",Se),l.addEventListener("keydown",Se),c.addEventListener("focus",Se),vt(l,c,i=>{const n=we(e.cardWidth,e.cardHeight)*L,a=En(Math.max(1,e.cardWidth),Math.max(1,Math.round(e.cardWidth*Ve)),i);e.cardWidth=a.cardWidth,e.cardHeight=a.cardHeight;const d=e.cardWidth/Math.max(1,gt.cardWidth);e.imageWidth=Yt(gt.imageWidth*d);const u=e.imageWidth/Math.max(1,gt.imageWidth);e.imageX=Math.round(gt.imageX*u),e.imageY=Math.round(gt.imageY*u);const m=we(e.cardWidth,e.cardHeight);m>0&&Number.isFinite(n)&&n>0&&(L=n/m)},()=>e.cardWidth),vt(g,p,i=>{e.cardWidth=it(i),e.titleSize=nt(e.titleSize,e.cardWidth),e.bodySize=nt(e.bodySize,e.cardWidth)},()=>e.cardWidth),vt(f,_,i=>{e.cardHeight=i},()=>e.cardHeight),vt(Y,b,i=>{e.titleSize=nt(i,e.cardWidth)},()=>e.titleSize),vt(st,rt,i=>{e.bodySize=nt(i,e.cardWidth)},()=>e.bodySize),vt(kt,me,i=>{e.imageWidth=i},()=>e.imageWidth);const ni=(i,n)=>{i.addEventListener("focus",()=>E(i)),i.addEventListener("change",()=>{n(),v(i),I()}),i.addEventListener("blur",()=>v(i))};ni(Q,()=>{e.titleFontId=Q.value}),ni(j,()=>{e.bodyFontId=j.value}),(vi=t.querySelector("#studio-reset"))==null||vi.addEventListener("click",()=>{v();const i=re(e),n=L;s(),(!Hi(i,e)||n!==L)&&(J.push(i),$t.push(n),J.length>Fi&&(J.shift(),$t.shift()),Ht=[],ne=[]),ft()}),y.addEventListener("focus",()=>E(y)),y.addEventListener("input",()=>{e.title=y.value,I()}),y.addEventListener("blur",()=>v(y)),M.addEventListener("focus",()=>E(M)),M.addEventListener("input",()=>{e.body=M.value,I()}),M.addEventListener("blur",()=>v(M));const Le=(i,n,a,d)=>{i.addEventListener("pointerdown",()=>E(i)),i.addEventListener("change",()=>v(i)),i.addEventListener("input",()=>{const u=U(i.value);u&&(a(u),n.value=u,I())}),n.addEventListener("focus",()=>E(n)),n.addEventListener("input",()=>{const u=U(n.value);u&&(a(u),i.value=u,I())}),n.addEventListener("blur",()=>{U(n.value)||(n.value=d()),v(n)})};Le(fe,Xt,i=>{e.color=i},()=>e.color),Le(S,A,i=>{e.titleColor=i},()=>e.titleColor),Le(Lt,pt,i=>{e.bodyColor=i},()=>e.bodyColor);const oi=i=>{e.radius=ji(Number(i)),ti(),I()};C.addEventListener("pointerdown",()=>E(C)),C.addEventListener("keydown",()=>E(C)),C.addEventListener("pointerup",()=>v(C)),C.addEventListener("pointercancel",()=>v(C)),C.addEventListener("keyup",()=>v(C)),C.addEventListener("input",()=>oi(C.value)),D.addEventListener("focus",()=>E(D)),D.addEventListener("input",()=>oi(D.value)),D.addEventListener("blur",()=>v(D)),D.addEventListener("change",()=>v(D)),K.addEventListener("focus",()=>E(K)),K.addEventListener("input",()=>{e.code=K.value,I()}),K.addEventListener("blur",()=>v(K));const si=(i,n)=>{Object.assign(e,i),L=n,ft(),I()};ve.addEventListener("click",()=>{v();const i=J.pop(),n=$t.pop();if(!i||n===void 0){ft();return}Ht.push(re(e)),ne.push(L),si(i,n)}),_e.addEventListener("click",()=>{v();const i=Ht.pop(),n=ne.pop();if(!i||n===void 0){ft();return}J.push(re(e)),$t.push(L),si(i,n)}),ft(),(_i=t.querySelector("#studio-tab-design"))==null||_i.addEventListener("click",()=>Ee("design")),(xi=t.querySelector("#studio-tab-code"))==null||xi.addEventListener("click",()=>Ee("code")),($i=t.querySelector(".studio__tabs"))==null||$i.addEventListener("keydown",i=>{var a;if(!(i instanceof KeyboardEvent)||i.key!=="ArrowRight"&&i.key!=="ArrowLeft")return;i.preventDefault();const n=e.panel==="design"?"code":"design";Ee(n),(a=t.querySelector(n==="design"?"#studio-tab-design":"#studio-tab-code"))==null||a.focus()});const Ct=[...t.querySelectorAll("[data-theme-slug]")];for(const i of Ct)i.addEventListener("click",()=>{const n=i.dataset.themeSlug;!n||n===e.themeSlug||(E(i),ei(n,!1),v(i))});(wi=t.querySelector(".studio__themes"))==null||wi.addEventListener("keydown",i=>{if(!(i instanceof KeyboardEvent))return;const n=i.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(n))return;i.preventDefault();const a=Ct.findIndex($=>$.dataset.themeSlug===e.themeSlug),u=Ct[(a+(n==="ArrowLeft"||n==="ArrowUp"?-1:1)+Ct.length)%Ct.length],m=u==null?void 0:u.dataset.themeSlug;!m||m===e.themeSlug||(E(u),ei(m,!0),v(u))}),(Si=t.querySelector("#studio-copy"))==null||Si.addEventListener("click",async()=>{const i=Re();xe.textContent=i;try{await navigator.clipboard.writeText(i)}catch{const a=document.createElement("textarea");a.value=i,document.body.append(a),a.select(),document.execCommand("copy"),a.remove()}const n=t.querySelector("#studio-copy");n&&(n.textContent="복사됨",window.setTimeout(()=>{n.textContent="현재 디자인을 코드로 복사"},1200))}),(Mi=t.querySelector("#studio-download"))==null||Mi.addEventListener("click",()=>{(async()=>{const i=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){Yi(x,i);return}const n=Ge(),a=n?await Pi(n):"",d=document.createElement("canvas");await po(d,Gi(Oi(e,a)),e.cardWidth,e.cardHeight),Yi(d,i)})()});const dt=i=>{const n=x.getBoundingClientRect();return{x:n.width>0?(i.clientX-n.left)/n.width*e.cardWidth:0,y:n.height>0?(i.clientY-n.top)/n.height*e.cardHeight:0}},ri=(i,n)=>{for(let d=at.length-1;d>=0;d-=1){const u=at[d];if(u&&i>=u.x-8&&n>=u.y-8&&i<=u.x+u.w+8&&n<=u.y+u.h+8)return u}return null},pn=i=>{const n=x.getContext("2d");if(!n)return;const a=x.getBoundingClientRect().width,d=a>0?e.cardWidth/a:1;n.save(),n.lineJoin="round",n.lineCap="round",n.strokeStyle="rgba(0, 0, 0, 0.7)",n.lineWidth=d*3,n.strokeRect(i.x,i.y,Math.max(d,i.w),Math.max(d,i.h)),n.strokeStyle="rgba(255, 255, 255, 0.92)",n.lineWidth=d*1.5,n.strokeRect(i.x,i.y,Math.max(d,i.w),Math.max(d,i.h)),n.restore()},mn=()=>{if(F)for(const i of at)F.kinds.includes(i.kind)&&pn(i)};let F=null,O=null,lt=null;const G=new Map;let H=null;const Zt=()=>({x:e.imageX,y:e.imageY,width:e.imageWidth}),fn=i=>i==="title"?{x:e.titleX,y:e.titleY}:i==="body"?{x:e.bodyX,y:e.bodyY}:{x:e.imageX,y:e.imageY},ai=(i,n,a)=>i==="title"?{x:ot(n,e.cardWidth,e.titleSize),y:ot(a,e.cardHeight,e.titleSize)}:i==="body"?{x:ot(n,e.cardWidth,e.bodySize),y:ot(a,e.cardHeight,e.bodySize)}:{x:te(n,e.cardWidth,e.imageWidth),y:te(a,e.cardHeight,Qe())},gn=(i,n)=>{i==="title"?(e.titleX=n.x,e.titleY=n.y):i==="body"?(e.bodyX=n.x,e.bodyY=n.y):(e.imageX=n.x,e.imageY=n.y)},Gt=i=>{e.imageWidth=i.width,e.imageX=te(i.x,e.cardWidth,e.imageWidth),e.imageY=te(i.y,e.cardHeight,Qe())};q=()=>{at=ho(x,e,X,W==null?void 0:W.kind),mn(),At()};const _t=(i,n,a)=>{i.style.left=`${n*Z}px`,i.style.top=`${a*Z}px`},yn=()=>{if(!W)return;const i=W.kind==="title",n=i?e.titleSize:e.bodySize,a=n*Z,d=Math.max(16,a),u=a/d;_t(w,i?e.titleX:e.bodyX,i?e.titleY:e.bodyY),w.style.font=`${i?600:400} ${d}px ${Mt(i?e.titleFontId:e.bodyFontId,Et())}`,w.style.lineHeight=`${Math.round(n*1.25)*Z/u}px`,w.style.color=i?e.titleColor:e.bodyColor,w.style.width=`${Math.max(1,e.cardWidth-Ye*2)*Z/u}px`,w.style.transform=`scale(${u})`,w.style.height="auto",w.style.height=`${w.scrollHeight}px`};At=()=>{const i=!W&&!e.code.trim();for(const d of ln){const u=at.find($=>$.kind===d.dataset.frame),m=i&&!!u&&k.has(d.dataset.frame);d.hidden=!m,m&&u&&(_t(d,u.x,u.y),d.style.width=`${u.w*Z}px`,d.style.height=`${u.h*Z}px`)}const n=at.find(d=>d.kind==="image"),a=i&&k.size===1&&k.has("image")&&!!n;for(const d of $e)d.hidden=!a;if(a&&n){const d=12/Math.max(Z,.001),u=z=>Math.min(e.cardWidth-d,Math.max(d,z)),m=z=>Math.min(e.cardHeight-d,Math.max(d,z)),$=u(n.x+n.w/2),T=m(n.y+n.h/2);for(const z of $e){const R=z.dataset.handle;R==="top"?_t(z,$,m(n.y)):R==="bottom"?_t(z,$,m(n.y+n.h)):R==="left"?_t(z,u(n.x),T):_t(z,u(n.x+n.w),T)}}yn()};for(const i of $e)i.addEventListener("pointerdown",n=>{const a=at.find(R=>R.kind==="image");if(!a)return;n.preventDefault();try{i.setPointerCapture(n.pointerId)}catch{}E(i);const d=i.dataset.handle,u=Zt(),m=d==="right"?{x:a.x,y:a.y+a.h/2}:d==="left"?{x:a.x+a.w,y:a.y+a.h/2}:d==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},$=dt(n),T=R=>{if(R.pointerId!==n.pointerId)return;const Ft=dt(R),Li=Ft.x-$.x,ki=Ft.y-$.y,xn=d==="right"?a.w+Li:d==="left"?a.w-Li:d==="bottom"?(a.h+ki)/yt:(a.h-ki)/yt;Gt(ee(u,xn,m.x,m.y)),q()},z=R=>{R.pointerId===n.pointerId&&(i.removeEventListener("pointermove",T),i.removeEventListener("pointerup",z),i.removeEventListener("pointercancel",z),v(i),I())};i.addEventListener("pointermove",T),i.addEventListener("pointerup",z),i.addEventListener("pointercancel",z)});const bn=i=>{e.code.trim()||(W={kind:i,original:e[i]},k.clear(),E(w),w.value=e[i],w.hidden=!1,q(),w.focus(),w.setSelectionRange(w.value.length,w.value.length))},Jt=i=>{W&&(i||(e[W.kind]=W.original),W=null,w.hidden=!0,q(),v(w),I())};w.addEventListener("input",()=>{W&&(e[W.kind]=W.kind==="title"?w.value.replace(/\n/g," "):w.value,q(),ii())}),w.addEventListener("keydown",i=>{i.isComposing||(i.key==="Escape"?(i.preventDefault(),Jt(!1)):i.key==="Enter"&&((W==null?void 0:W.kind)==="title"||i.metaKey||i.ctrlKey)&&(i.preventDefault(),Jt(!0)))}),w.addEventListener("blur",()=>Jt(!0));const vn=(i,n)=>{if(lt&&lt.kind===i&&n.timeStamp-lt.time<400&&Math.hypot(n.clientX-lt.x,n.clientY-lt.y)<24&&i!=="image"){lt=null,bn(i);return}lt={kind:i,time:n.timeStamp,x:n.clientX,y:n.clientY}},di=()=>{const[i,n]=[...G.values()];return!i||!n?null:{distance:Math.hypot(n.x-i.x,n.y-i.y),mid:dt({clientX:(i.x+n.x)/2,clientY:(i.y+n.y)/2})}},_n=()=>{const i=di();i&&(F=null,O=null,delete x.dataset.dragging,E(x),H={...i,image:Zt()},q())};x.addEventListener("pointerdown",i=>{if(e.code.trim())return;if(W&&Jt(!0),i.pointerType==="touch"){G.set(i.pointerId,{x:i.clientX,y:i.clientY});try{x.setPointerCapture(i.pointerId)}catch{}if(G.size===2&&X){_n();return}if(G.size>1)return}const n=dt(i),a=ri(n.x,n.y),d=i.pointerType==="mouse";if(d?i.shiftKey?a&&k.has(a.kind)?k.delete(a.kind):a&&k.add(a.kind):a?k.has(a.kind)||(k.clear(),k.add(a.kind)):k.clear():k.clear(),!a||d&&!k.has(a.kind)){O=null,q();return}O={x:i.clientX,y:i.clientY,moved:!1,shift:i.shiftKey};try{x.setPointerCapture(i.pointerId)}catch{}E(x);const u=d?[...k]:[a.kind];F={kind:a.kind,kinds:u,origin:n,start:new Map(u.map(m=>[m,fn(m)])),pointerId:i.pointerId},x.dataset.dragging="true",q()}),x.addEventListener("pointermove",i=>{if(G.has(i.pointerId)&&G.set(i.pointerId,{x:i.clientX,y:i.clientY}),H){const m=G.has(i.pointerId)?di():null;if(!m)return;const $=m.distance/Math.max(1,H.distance),T=ee(H.image,H.image.width*$,H.mid.x,H.mid.y);Gt({x:T.x+m.mid.x-H.mid.x,y:T.y+m.mid.y-H.mid.y,width:T.width}),q();return}O&&Math.hypot(i.clientX-O.x,i.clientY-O.y)>6&&(O.moved=!0);const n=dt(i);if(!F||F.pointerId!==i.pointerId){x.dataset.hover=ri(n.x,n.y)?"true":"false";return}const a=(m,$)=>Math.abs($)<Math.abs(m)?$:m;let d=n.x-F.origin.x,u=n.y-F.origin.y;for(const[m,$]of F.start){const T=ai(m,$.x+d,$.y+u);d=a(d,T.x-$.x),u=a(u,T.y-$.y)}for(const[m,$]of F.start)gn(m,ai(m,$.x+d,$.y+u));q()});const li=i=>{if(G.delete(i.pointerId),H){G.size<2&&(H=null,v(x),I());return}if(!F||F.pointerId!==i.pointerId)return;const n=F.kind;F=null,delete x.dataset.dragging,v(x),i.type==="pointerup"&&O&&!O.moved&&!O.shift&&(k.size>1&&(k.clear(),k.add(n)),vn(n,i)),O=null,q()};x.addEventListener("pointerup",li),x.addEventListener("pointercancel",li);const ci=new EventTarget;let ui=0;x.addEventListener("wheel",i=>{if(!i.ctrlKey||e.code.trim()||!X)return;i.preventDefault(),E(ci);const n=dt(i);Gt(ee(Zt(),e.imageWidth*Math.exp(-i.deltaY*.01),n.x,n.y)),q(),window.clearTimeout(ui),ui=window.setTimeout(()=>{v(ci),I()},250)},{passive:!1});const hi=new EventTarget;let qt=null;x.addEventListener("gesturestart",i=>{i.preventDefault(),!(H||e.code.trim()||!X)&&(E(hi),qt={image:Zt(),anchor:dt(i)})}),x.addEventListener("gesturechange",i=>{if(i.preventDefault(),!qt||H)return;const{image:n,anchor:a}=qt;Gt(ee(n,n.width*i.scale,a.x,a.y)),q()}),x.addEventListener("gestureend",i=>{i.preventDefault(),qt&&(qt=null,v(hi),I())}),Wt.addEventListener("pointerdown",i=>{i.target===x||k.size===0||i.target instanceof Element&&i.target.closest(".studio__handle")||(k.clear(),At())});const Vt=i=>{const n=jt.getBoundingClientRect().width,a=wt+Te+He,d=Number.isFinite(i)?i:e.controlsWidth;e.controlsWidth=n>=a?Ln(d,n):Math.max(wt,Math.round(d)),jt.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),N.setAttribute("aria-valuenow",String(e.controlsWidth)),N.setAttribute("aria-valuemax",String(n>=a?Math.max(wt,Math.round(n)-Te-He):e.controlsWidth)),mt()};Vt(e.controlsWidth);const tt=t.querySelector("#studio-device"),pi=[...t.querySelectorAll(".studio-devices__btn")],mi=t.querySelector("#studio-device-thumb"),fi=tt==null?void 0:tt.parentElement,ke=tt&&mi&&fi?Di(tt,mi,fi):null,Qt=()=>{if(!tt)return;const i=on();tt.dataset.device=i,tt.dataset.framed=i===Be()?"false":"true";for(const n of pi)n.setAttribute("aria-pressed",n.dataset.device===i?"true":"false");Vt(e.controlsWidth),ke==null||ke()};Qt();for(const i of pi)i.addEventListener("click",()=>{de=i.dataset.device,Qt()});oe==null||oe();const gi=[window.matchMedia(en),window.matchMedia(nn)];for(const i of gi)i.addEventListener("change",Qt);oe=()=>{for(const i of gi)i.removeEventListener("change",Qt)},se==null||se();const yi=i=>{if(!(i.metaKey||i.ctrlKey)||i.altKey)return;const n=i.code==="KeyZ"&&i.shiftKey||i.code==="KeyY"&&i.ctrlKey&&!i.shiftKey;if(!(i.code==="KeyZ"&&!i.shiftKey)&&!n)return;const d=n?_e:ve;if(!d.isConnected||d.disabled)return;const u=i.target;u instanceof HTMLElement&&(u.isContentEditable||u.matches("textarea, input:not([type=range], [type=color], [type=radio], [type=checkbox], [type=button])"))||(i.preventDefault(),d.click())};document.addEventListener("keydown",yi),se=()=>document.removeEventListener("keydown",yi),N.addEventListener("pointerdown",i=>{if(jt.getBoundingClientRect().width<768)return;try{N.setPointerCapture(i.pointerId)}catch{}const n=i.clientX,a=e.controlsWidth,d=m=>{m.pointerId===i.pointerId&&Vt(a+m.clientX-n)},u=m=>{m.pointerId===i.pointerId&&(N.removeEventListener("pointermove",d),N.removeEventListener("pointerup",u),N.removeEventListener("pointercancel",u))};N.addEventListener("pointermove",d),N.addEventListener("pointerup",u),N.addEventListener("pointercancel",u)}),N.addEventListener("keydown",i=>{if(i.key!=="ArrowLeft"&&i.key!=="ArrowRight")return;i.preventDefault();const n=i.shiftKey?48:16;Vt(e.controlsWidth+(i.key==="ArrowRight"?n:-n))}),(Ei=t.querySelector("#studio-controls"))==null||Ei.addEventListener("submit",i=>{i.preventDefault()}),Pt==null||Pt.disconnect(),Pt=new ResizeObserver(()=>mt()),Pt.observe(Wt),I()}const rn="ax-design-studio-mode",Xi="./data/index.json";let B={status:"loading"},pe=he(),an="all",V=null,Ae=null,P=Pe();function Oe(){const t=localStorage.getItem(rn);return t==="light"||t==="dark"?t:"dark"}function Bi(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(rn,t)}function ze(t,e,o){return`<a class="nav-link${o?" nav-link--current":""}" href="${e}" ${o?'aria-current="page"':""}>${t}</a>`}function go(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function dn(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=Xe(t);return e?ue(e.r,e.g,e.b):U(t)??ue(216,241,255)}function yo(t,e){var s;const o=t&&e.some(r=>r.slug===t)?t:null;return V?(t&&t!==Ae&&o&&(V.themeSlug=o,Ae=t),V):(V=Ki(o??((s=e[0])==null?void 0:s.slug)??"",dn()),Ae=t,V)}function bo(t){const e=Oe(),o=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=P.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${ze("Graphic Library",ht({name:"archive"}),P.name==="archive"||P.name==="capture")}
        ${ze("Online Marketing Studio",ht({name:"studio",theme:null}),P.name==="studio")}
        ${ze("History",ht({name:"history"}),P.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${o}" title="${o}">
          ${go(e)}
        </button>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${t}</main>
  `}function vo(){if(B.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(B.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${B.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
      </section>
    `;const t=B.index;switch(P.name){case"archive":return Dn(t,pe,an);case"capture":return io(t,P.slug,pe);case"studio":return mo(yo(P.theme,t.captures),t.captures);case"history":return oo(t);case"notfound":return so(P.path)}}function ut(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Bi(Oe()),pe=he(),t.innerHTML=bo(vo()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{Bi(Oe()==="dark"?"light":"dark"),ut()}),B.status==="ready"&&(P.name==="archive"&&Xn(t,{onTabChange:o=>{var s;an=o,ut(),(s=document.querySelector(`[data-archive-tab="${o}"]`))==null||s.focus()}}),P.name==="capture"&&no(t,o=>{pe=Fn(o),ut()}),P.name==="studio"&&B.status==="ready"&&V&&fo(t,V,B.index.captures,()=>{var o;V&&(In(V,dn()),ut(),(o=document.querySelector("#studio-reset"))==null||o.focus())}))}async function _o(){B={status:"loading"},ut();try{const t=await fetch(Xi,{cache:"no-store"});if(!t.ok)throw new Error(`${Xi} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");B={status:"ready",index:e}}catch(t){B={status:"error",message:t instanceof Error?t.message:String(t)}}ut()}Hn(t=>{if(tn(window.location.hash)){window.location.replace(ht({name:"studio",theme:null}));return}P=t,ut()});_o();
