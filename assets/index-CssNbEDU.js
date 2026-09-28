(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const l of d.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerPolicy&&(d.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?d.credentials="include":r.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(r){if(r.ep)return;r.ep=!0;const d=n(r);fetch(r.href,d)}})();const yn="ig-feed-square",Ae=[{id:"ig-feed-square",name:"Instagram Feed",width:1080,height:1080},{id:"ig-feed-portrait",name:"Instagram Feed Portrait",width:1080,height:1350},{id:"ig-story",name:"Instagram Story / Reels",width:1080,height:1920},{id:"fb-feed",name:"Facebook Feed",width:1200,height:630},{id:"fb-cover",name:"Facebook Cover",width:1640,height:624},{id:"yt-thumbnail",name:"YouTube Thumbnail",width:1280,height:720},{id:"yt-banner",name:"YouTube Channel Cover",width:2560,height:1440,safe:{width:1546,height:423}},{id:"yt-shorts",name:"YouTube Shorts",width:1080,height:1920}];function Dt(t){return Ae.find(e=>e.id===t)??Ae[0]}const Ot=0,ae=120,bn=28,tt=100,dt=4e3,ze=5,Pe=10,le=100,Ce=4e3,wt=240,Xi=360,qe=280,Fe=6,vn="시즌",_n=`새로운 컬렉션
브랜드의 첫 인상을 한 장으로 전합니다.`,ce=[{id:"pretendard",label:"Pretendard",stack:'"Pretendard Variable", Pretendard, system-ui, sans-serif'},{id:"roboto",label:"Roboto",stack:"Roboto, system-ui, sans-serif"},{id:"montserrat",label:"Montserrat",stack:"Montserrat, system-ui, sans-serif"}],Ii="rgb(0, 0, 0)",ki="rgb(255, 255, 255)";function Ui(t){return Number.isFinite(t)?Math.min(ae,Math.max(Ot,Math.round(t))):Ot}function et(t){return Number.isFinite(t)?Math.min(dt,Math.max(tt,Math.round(t))):tt}function xn(t,e,n){const s=Math.max(1,Math.round(t)),d=Math.max(1,Math.round(e))/s;let l=et(n);const f=Math.round(l*d);let p=et(f);return f!==p&&(l=et(Math.round(p/d)),p=et(Math.round(l*d))),{cardWidth:l,cardHeight:p}}function Oe(t){return Math.max(ze,et(t)-Pe*2)}function it(t,e){const n=Oe(e);return Number.isFinite(t)?Math.min(n,Math.max(ze,Math.round(t))):ze}function Yt(t){return Number.isFinite(t)?Math.min(Ce,Math.max(le,Math.round(t))):le}function nt(t,e,n){const s=Math.max(0,Math.round(e)-Math.min(Math.max(n,0),Math.round(e)));return Number.isFinite(t)?Math.min(s,Math.max(0,Math.round(t))):0}function ee(t,e,n){const s=Math.round(-n+40),r=Math.round(e-40);return Number.isFinite(t)?s>r?Math.round((e-n)/2):Math.min(r,Math.max(s,Math.round(t))):0}function ie(t,e,n,s){const r=Yt(e),d=r/Math.max(1,t.width);return{x:Math.round(n-(n-t.x)*d),y:Math.round(s-(s-t.y)*d),width:r}}function $n(t,e){const n=Math.max(wt,Math.round(e)-qe-Fe);return Number.isFinite(t)?Math.min(n,Math.max(wt,Math.round(t))):Xi}function wn(t){return(t.split(/[/\\]/).pop()??t).replace(/\.(woff2|woff|ttf|otf)$/i,"").replace(/[-_]+/g," ").trim()}function Mt(t,e=[]){var s;const n=ce.find(r=>r.id===t);return n?n.stack:((s=e.find(r=>r.id===t))==null?void 0:s.stack)??ce[0].stack}function ji(t,e){const n=Dt(yn),s=it(Math.round(n.width*.046),n.width),r=it(Math.round(n.width*.026),n.width),d=Math.round(n.height*.7);return{presetId:n.id,cardWidth:n.width,cardHeight:n.height,title:vn,body:_n,themeSlug:t,color:e,radius:bn,code:"",panel:"design",controlsWidth:Xi,titleSize:s,bodySize:r,titleX:nt(Math.round(n.width*.06),n.width,s),titleY:nt(d,n.height,s),bodyX:nt(Math.round(n.width*.06),n.width,r),bodyY:nt(d+Math.round(s*1.6),n.height,r),titleFontId:"pretendard",bodyFontId:"pretendard",titleColor:Bt(e),bodyColor:Bt(e),imageWidth:Yt(n.width),imageX:0,imageY:0}}function Sn(t,e){const n=ji(t.themeSlug,e);n.controlsWidth=t.controlsWidth,n.panel=t.panel,Object.assign(t,n)}function Y(t){const e=t.trim().match(/^#([0-9a-fA-F]{6})$/);return e?`#${e[1].toLowerCase()}`:null}function ue(t,e,n){const s=r=>Math.max(0,Math.min(255,Math.round(r))).toString(16).padStart(2,"0");return`#${s(t)}${s(e)}${s(n)}`}function De(t){const e=Y(t);if(e)return{r:Number.parseInt(e.slice(1,3),16),g:Number.parseInt(e.slice(3,5),16),b:Number.parseInt(e.slice(5,7),16)};const n=t.trim().match(/^rgba?\(\s*([0-9.]+)[\s,]+([0-9.]+)[\s,]+([0-9.]+)/i);return n?{r:Number(n[1]),g:Number(n[2]),b:Number(n[3])}:null}function xt(t){const e=t/255;return e<=.03928?e/12.92:((e+.055)/1.055)**2.4}function Wi(t,e){const n=.2126*xt(t.r)+.7152*xt(t.g)+.0722*xt(t.b),s=.2126*xt(e.r)+.7152*xt(e.g)+.0722*xt(e.b),r=Math.max(n,s),d=Math.min(n,s);return(r+.05)/(d+.05)}function Bt(t){const e=De(Ki(t));return e?ue(e.r,e.g,e.b):ue(0,0,0)}function Ki(t){const e=De(t)??{r:255,g:255,b:255},n=Wi({r:0,g:0,b:0},e),s=Wi({r:255,g:255,b:255},e);return n>=4.5&&n>=s?Ii:s>=4.5?ki:n>=s?Ii:ki}function Mn(t,e,n){if(e<=0)return[];const s=[];for(const r of t.split(`
`)){const d=r.split(/\s+/).filter(Boolean);if(d.length===0){s.push("");continue}let l="";const f=p=>{if(n(p)<=e){l=p;return}let m="";for(const v of p){const g=m+v;n(g)<=e?m=g:(m&&s.push(m),m=v)}l=m};for(const p of d){const m=l?`${l} ${p}`:p;n(m)<=e?l=m:(l&&s.push(l),f(p))}l&&s.push(l)}return s}function Le(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function En(t){return t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<script\b[^>]*\/?>/gi,"").replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")}function Ln(t,e){return En(t).replaceAll("{{title}}",Le(e.title)).replaceAll("{{body}}",Le(e.body)).replaceAll("{{themeImage}}",Le(e.themeImage))}function Te(){return`<article class="studio-card">
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
</style>`}function Zi(t){const e=Y(t.color)??t.color,n=Ki(e),s=Y(t.titleColor)??Bt(e),r=Y(t.bodyColor)??Bt(e),d=Ui(t.radius),l=Dt("ig-feed-square"),f=t.width>0?t.width:l.width,p=t.height>0?t.height:l.height,m=t.titleFontStack.replaceAll(";",""),v=t.bodyFontStack.replaceAll(";",""),g=Ln(t.code.trim()||Te(),t),w=[`--studio-color:${e}`,`--studio-ink:${n}`,`--studio-radius:${d}px`,`--studio-width:${f}px`,`--studio-height:${p}px`,`--studio-title-font:${m}`,`--studio-body-font:${v}`,`--studio-title-size:${it(t.titleSize,f)}px`,`--studio-body-size:${it(t.bodySize,f)}px`,`--studio-title-x:${Math.round(t.titleX)}px`,`--studio-title-y:${Math.round(t.titleY)}px`,`--studio-body-x:${Math.round(t.bodyX)}px`,`--studio-body-y:${Math.round(t.bodyY)}px`,`--studio-image-width:${Yt(t.imageWidth)}px`,`--studio-image-x:${Math.round(t.imageX)}px`,`--studio-image-y:${Math.round(t.imageY)}px`,`--studio-title-color:${s}`,`--studio-body-color:${r}`].join(";");return`<div xmlns="http://www.w3.org/1999/xhtml" style="width:${f}px;height:${p}px;margin:0;background:transparent;${w}">${g}</div>`}function In(t){return`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@400;600&display=swap" />
<style>
  html, body { margin: 0; width: 100%; height: 100%; background: transparent; }
</style>
</head>
<body>${Zi(t)}</body>
</html>`}const Gi="design-llm-wiki-pins";function he(){try{const t=localStorage.getItem(Gi);if(!t)return[];const e=JSON.parse(t);return Array.isArray(e)?e.filter(n=>typeof n=="string"):[]}catch{return[]}}function kn(t){const e=[...new Set(t)];localStorage.setItem(Gi,JSON.stringify(e))}function Wn(t){const e=he(),n=e.includes(t)?e.filter(s=>s!==t):[...e,t];return kn(n),he()}const Ji="[a-z0-9]+(?:-[a-z0-9]+)*";function Vi(t){const e=t.startsWith("#")?t.slice(1):t,n=e.indexOf("?"),s=n>=0?e.slice(0,n):e,r=n>=0?e.slice(n+1):"",d=s.startsWith("/")?s:`/${s}`;return{path:d==="/"||d===""?"/":d.replace(/\/+$/,"")||"/",query:r}}function An(t){const e=new URLSearchParams(t).get("theme");return!e||!new RegExp(`^${Ji}$`).test(e)?null:e}function Qi(t){const{path:e}=Vi(t);return e==="/intake"||e==="/design-system"||e==="/stats"}function He(t=window.location.hash){const{path:e,query:n}=Vi(t);if(e==="/"||e==="/gallery")return{name:"archive"};if(e==="/history")return{name:"history"};if(e==="/studio"||Qi(t))return{name:"studio",theme:e==="/studio"?An(n):null};const s=e.match(new RegExp(`^/capture/(${Ji})$`));return s?{name:"capture",slug:s[1]}:{name:"notfound",path:e}}function ct(t){switch(t.name){case"archive":return"#/";case"capture":return`#/capture/${t.slug}`;case"studio":return t.theme?`#/studio?theme=${t.theme}`:"#/studio";case"history":return"#/history";case"notfound":return`#${t.path}`}}function zn(t){const e=()=>t(He());return window.addEventListener("hashchange",e),t(He()),()=>window.removeEventListener("hashchange",e)}function Cn(t){return[...t].sort((e,n)=>e.capturedAt!==n.capturedAt?e.capturedAt<n.capturedAt?1:-1:e.slug.localeCompare(n.slug))}function h(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function St(t){return t.startsWith("./")||t.startsWith("/")||t.startsWith("blob:")||t.startsWith("data:")||t.startsWith("http://")||t.startsWith("https://")?t:`./${t}`}let ne=null;function qn(t){const e=t.querySelector(".archive-tabs__indicator"),n=t.querySelector('.archive-tab[aria-selected="true"]');if(!e||!n)return;const s=n.offsetLeft,r=n.offsetWidth;ne&&(e.style.transition="none",e.style.transform=`translateX(${ne.left}px)`,e.style.width=`${ne.width}px`,e.offsetWidth,e.style.transition=""),requestAnimationFrame(()=>{e.style.transform=`translateX(${s}px)`,e.style.width=`${r}px`,ne={left:s,width:r}})}function Ie(t){const e=t.querySelector(".capture-grid");if(!e)return;const n=window.getComputedStyle(e),s=Number.parseFloat(n.gridAutoRows)||1,r=Number.parseFloat(n.rowGap)||0;e.querySelectorAll(".capture-card").forEach(d=>{d.style.gridRowEnd="";const l=d.getBoundingClientRect().height,f=Number.parseFloat(window.getComputedStyle(d).marginBottom)||0,p=Math.ceil((l+f+r)/(s+r));d.style.gridRowEnd=`span ${Math.max(1,p)}`})}function Fn(t){const e=t.asset.kind==="motion"&&t.asset.posterPath?t.asset.posterPath:t.asset.path;return`<img class="capture-card__media" src="${h(St(e))}" alt="" loading="lazy" width="${t.asset.width}" height="${t.asset.height}" />`}function Tn(t,e){return`
    <article class="capture-card${e?" capture-card--pinned":""}">
      <a class="capture-card__link" href="${ct({name:"capture",slug:t.slug})}">
        <div class="capture-card__frame">
          ${Fn(t)}
          ${t.asset.kind==="still"?"":`<span class="capture-card__kind">${h(t.asset.kind)}</span>`}
          ${e?'<span class="capture-card__pin-badge">Pinned</span>':""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${h(t.title)}</h2>
          <p class="capture-card__insight">${h(t.insight)}</p>
        </div>
      </a>
    </article>
  `}function Hn(t,e){const n=new Set(e),s=Cn(t),r=s.filter(m=>n.has(m.slug)),d=s.filter(m=>!n.has(m.slug)),l=new Map(s.map(m=>[m.slug,m])),f=e.map(m=>l.get(m)).filter(m=>!!m),p=r.filter(m=>!e.includes(m.slug));return[...f,...p,...d]}function Rn(t,e,n){const s=new Set(e),r=n==="pin"?t.captures.filter(l=>s.has(l.slug)):t.captures,d=Hn(r,e);return t.captures.length===0?`
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
          <p class="gallery__meta">Target ${h(t.target)} · ${d.length} · ${e.length} pinned</p>
        </div>
      </header>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${n==="all"?"true":"false"}">
          All <span class="archive-tab__count">${t.captures.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${n==="pin"?"true":"false"}">
          Pin <span class="archive-tab__count">${e.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${d.length===0?`<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${n==="pin"?"No pinned captures":"No captures"}</h2>
                <p class="state-panel__text">${n==="pin"?"상세 화면에서 Pin을 누르면 이 탭에 모입니다.":"공개된 그래픽 에셋이 없습니다."}</p>
              </section>`:`<div class="capture-grid">${d.map(l=>Tn(l,e.includes(l.slug))).join("")}</div>`}
      </div>
    </section>
  `}function Nn(t,e){t.querySelectorAll("[data-archive-tab]").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.archiveTab;(d==="all"||d==="pin")&&e.onTabChange(d)})}),qn(t),requestAnimationFrame(()=>Ie(t)),t.querySelectorAll(".capture-card__media").forEach(r=>{r.addEventListener("load",()=>Ie(t),{once:!0})});const n=new ResizeObserver(()=>Ie(t)),s=t.querySelector(".capture-grid");s&&n.observe(s)}function Pn(t){const e=t.replace(/\r\n/g,`
`).split(`
`),n=[];let s=!1;const r=()=>{s&&(n.push("</ul>"),s=!1)};for(const d of e){const l=d.trim();if(!l){r();continue}if(l.startsWith("### ")){r(),n.push(`<h3>${Ht(l.slice(4))}</h3>`);continue}if(l.startsWith("## ")){r(),n.push(`<h2>${Ht(l.slice(3))}</h2>`);continue}if(l.startsWith("# ")){r(),n.push(`<h1>${Ht(l.slice(2))}</h1>`);continue}if(l.startsWith("- ")){s||(n.push("<ul>"),s=!0),n.push(`<li>${Ht(l.slice(2))}</li>`);continue}r(),n.push(`<p>${Ht(l)}</p>`)}return r(),n.join(`
`)}function Ht(t){let e=h(t);return e=e.replace(/\[\[([a-z0-9]+(?:-[a-z0-9]+)*)\]\]/g,(n,s)=>`<a href="${ct({name:"capture",slug:s})}">${s}</a>`),e=e.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(n,s,r)=>r.endsWith(".md")&&!r.includes("://")?`<span>${s}</span>`:`<a href="${h(r)}">${s}</a>`),e}const On=[["layout","레이아웃"],["hierarchy","시각 위계"],["clarity","정보 명확성"],["interaction","인터랙션 단서"],["reuse","재사용성"]];function Dn(t){return Math.max(35,Math.min(98,Math.round(t)))}function Yn(t){let e=0;for(const n of t)e=(e*31+n.charCodeAt(0))%997;return e}function Bn(t){var m;if((m=t.analysisScores)!=null&&m.length)return t.analysisScores;const e=Yn(`${t.slug}:${t.title}:${t.insight}`),n=t.tags.includes("density")?7:0,s=t.asset.kind==="motion"?8:0,r=Math.min(12,t.uiPatterns.length*3),d=t.asset.width/Math.max(1,t.asset.height),l=d>1.2?6:0,f=d<.75?5:0,p=[68+r+l+e%9,66+n+(e>>1)%10,64+(t.insight.length>45?8:3)+(e>>2)%9,58+s+(t.uiPatterns.includes("filter-chips")?7:0),62+f+r+(e>>3)%8].map(Dn);return On.map(([v,g],w)=>({key:v,label:g,score:p[w]??60,description:Un(g,p[w]??60,t)}))}function Xn(t){return t.length===0?0:Math.round(t.reduce((e,n)=>e+n.score,0)/t.length)}function Un(t,e,n){return t==="레이아웃"?`${n.screenType} 화면 구조와 ${n.uiPatterns.join(", ")} 패턴의 배치 안정성.`:t==="시각 위계"?"대표 정보, 보조 설명, 메타 정보가 얼마나 빠르게 구분되는지의 점수.":t==="정보 명확성"?"카드에 들어갈 타이틀과 간단 내용이 즉시 이해되는 정도.":t==="인터랙션 단서"?n.asset.kind==="motion"?"모션 파일이라 상태 변화 단서를 더 강하게 반영.":"정지 이미지라 실제 hover나 전환은 확인 필요.":e>=75?"다른 캡처나 프롬프트에 재사용하기 좋은 관찰값이 있음.":"재사용하려면 추가 캡처나 비교가 더 있으면 좋음."}function jn(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KB`:`${(t/(1024*1024)).toFixed(2)} MB`}function Kn(t){return t.asset.kind==="motion"?`
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
  `}function Zn(t){const e=Bn(t),n=t.analysisTotal??Xn(e),s=160,r=110,d=[.25,.5,.75,1].map(p=>e.map((m,v)=>{const g=-Math.PI/2+v*Math.PI*2/e.length,w=s+Math.cos(g)*r*p,k=s+Math.sin(g)*r*p;return`${w.toFixed(1)},${k.toFixed(1)}`}).join(" ")).map(p=>`<polygon class="spider-grid" points="${p}" />`).join(""),l=e.map((p,m)=>{const v=-Math.PI/2+m*Math.PI*2/e.length,g=r*(p.score/100),w=s+Math.cos(v)*g,k=s+Math.sin(v)*g;return`${w.toFixed(1)},${k.toFixed(1)}`}).join(" "),f=e.map((p,m)=>{const v=-Math.PI/2+m*Math.PI*2/e.length,g=s+Math.cos(v)*r,w=s+Math.sin(v)*r,k=s+Math.cos(v)*r*(p.score/100),R=s+Math.sin(v)*r*(p.score/100),y=s+Math.cos(v)*(r+26),S=s+Math.sin(v)*(r+26);return`
        <g class="spider-axis" tabindex="0">
          <line class="spider-axis__line" x1="${s}" y1="${s}" x2="${g.toFixed(1)}" y2="${w.toFixed(1)}" />
          <circle class="spider-point" cx="${k.toFixed(1)}" cy="${R.toFixed(1)}" r="6" />
          <text class="spider-label" x="${y.toFixed(1)}" y="${S.toFixed(1)}">${h(p.label)}</text>
          <text class="spider-callout" x="${y.toFixed(1)}" y="${(S+18).toFixed(1)}">${p.score}</text>
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
          ${d}
          <polygon class="spider-area" points="${l}" />
          ${f}
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
  `}function Gn(t){const e=[...t.tags,...t.uiPatterns,t.screenType,t.platform,t.tone,t.copyTone];return[...new Set(e)].map(n=>`<span class="chip detail-hashtag" aria-pressed="true">#${h(n)}</span>`).join("")}function Jn(t,e,n){const s=t.captures.find(d=>d.slug===e);if(!s)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Capture not found</h1>
        <p class="state-panel__text">${h(e)} is not in this bundle.</p>
        <p><a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a></p>
      </section>
    `;const r=n.includes(e);return`
    <article class="detail">
      <header class="detail__header">
        <a class="detail__back" href="#/"><span class="detail__back-icon" aria-hidden="true">←</span> Back</a>
        <div class="detail__heading">
          <p class="detail__eyebrow">${h(s.service)} · ${h(s.platform)}</p>
          <h1 class="detail__title">${h(s.title)}</h1>
          <p class="detail__insight">${h(s.insight)}</p>
        </div>
        <div class="detail__actions">
          <a class="button button--secondary" href="${h(ct({name:"studio",theme:e}))}">이 테마로 만들기</a>
          <button type="button" class="button button--secondary" data-pin-slug="${h(e)}" aria-pressed="${r?"true":"false"}">
            ${r?"Unpin":"Pin"}
          </button>
        </div>
      </header>

      <div class="detail__media-wrap detail__hero">${Kn(s)}</div>

      ${Zn(s)}

      <section class="detail__section">
        <h2>Derived asset meta</h2>
        <dl class="meta-grid">
          <div><dt>Format</dt><dd>${h(s.asset.format)}</dd></div>
          <div><dt>Kind</dt><dd>${h(s.asset.kind)}</dd></div>
          <div><dt>Dimensions</dt><dd>${s.asset.width} × ${s.asset.height}</dd></div>
          <div><dt>Bytes</dt><dd>${jn(s.asset.bytes)}</dd></div>
          <div><dt>Frame count</dt><dd>${s.asset.frameCount??"—"}</dd></div>
          <div><dt>Duration</dt><dd>${s.asset.durationSec??"—"}</dd></div>
          <div class="meta-grid__wide"><dt>Hash</dt><dd><code>${h(s.asset.hash)}</code></dd></div>
        </dl>
      </section>

      <section class="detail__section">
        <h2>Hashtags</h2>
        <p class="detail__chips">
          ${Gn(s)}
        </p>
        <p class="detail__meta-line">
          ${h(s.screenType)} · ${h(s.tone)} · ${h(s.copyTone)} · ${h(s.capturedAt)}
          ${s.sourceUrl?` · <a href="${h(s.sourceUrl)}">${h(s.sourceUrl)}</a>`:""}
        </p>
      </section>

      <section class="detail__section prose">
        <h2>Analysis</h2>
        ${Pn(s.body)}
      </section>
    </article>
  `}function Vn(t,e){var n;(n=t.querySelector("[data-pin-slug]"))==null||n.addEventListener("click",s=>{const r=s.currentTarget.dataset.pinSlug;r&&e(r)})}function Qn(t){const e=t.wiki.logEntries;return e.length===0?`
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
        ${e.map(n=>`
          <li class="history-item">
            <time class="history-item__date" datetime="${h(n.date)}">${h(n.date)}</time>
            <span class="history-item__op">${h(n.operation)}</span>
            <strong class="history-item__title">${h(n.title)}</strong>
          </li>`).join("")}
      </ol>
    </section>
  `}function to(t){return`
    <section class="state-panel state-panel--tint">
      <h1 class="state-panel__title">Route not found</h1>
      <p class="state-panel__text">No page for <code>${h(t)}</code>.</p>
      <p><a class="button button--secondary" href="#/">Back to gallery</a></p>
    </section>
  `}const Ai=.5,zi=3,Ci=.25,qi=40;let E=1,G=[],Rt=[],$t=[],oe=[],Nt=null,Fi=1;const eo=[{id:"mobile",label:"모바일 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2.5h8a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Z"/><path d="M11 18.5h2"/></svg>'},{id:"tablet",label:"타블렛 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 2.5h13A1.5 1.5 0 0 1 20 4v16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 20V4a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="M10.5 18.5h3"/></svg>'},{id:"desktop",label:"데스크탑 뷰",icon:'<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v10a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 15.5v-10A1.5 1.5 0 0 1 3.5 4Z"/><path d="M8.5 21h7M12 17v4"/></svg>'}],tn="(min-width: 768px)",en="(min-width: 1025px)";let de=null,se=null;function Ye(){return window.matchMedia(en).matches?"desktop":window.matchMedia(tn).matches?"tablet":"mobile"}function nn(){const t=["mobile","tablet","desktop"],e=Ye();return de&&t.indexOf(de)<=t.indexOf(e)?de:e}function re(t){return{...t}}function Ti(t,e){return JSON.stringify(t)===JSON.stringify(e)}const Re=new Map,Hi=new Map;function on(t){const e=Re.get(t);return e!=null&&e.complete&&e.naturalWidth>0?Promise.resolve(e):new Promise((n,s)=>{const r=e??new Image;r.onload=()=>n(r),r.onerror=()=>s(new Error(`Image failed: ${t}`)),e||(Re.set(t,r),r.src=t)})}function Ri(t){const e=Hi.get(t);if(e)return e;const n=fetch(t).then(s=>{if(!s.ok)throw new Error(`Theme image HTTP ${s.status}`);return s.blob()}).then(s=>new Promise((r,d)=>{const l=new FileReader;l.onload=()=>r(String(l.result)),l.onerror=()=>d(l.error??new Error("data url failed")),l.readAsDataURL(s)}));return Hi.set(t,n),n}const io=Object.assign({}),Ni=new Set;function no(t){return t.includes(".woff2")?"woff2":t.includes(".woff")?"woff":t.includes(".otf")?"opentype":"truetype"}function Et(){const t=new Set(ce.map(n=>n.label.toLowerCase())),e=[];for(const[n,s]of Object.entries(io)){const r=wn(n);if(!r||t.has(r.toLowerCase()))continue;const d=`local:${r}`;if(!e.some(l=>l.id===d)){if(!Ni.has(r)){Ni.add(r);const l=document.createElement("style");l.textContent=`@font-face{font-family:${JSON.stringify(r)};src:url("${s}") format("${no(s)}");font-display:swap;}`,document.head.append(l)}e.push({id:d,label:r,stack:`${JSON.stringify(r)}, system-ui, sans-serif`})}}return e}function oo(){return[...ce,...Et()]}function so(t,e,n,s){const r=Math.max(0,Math.min(s,e/2,n/2));t.beginPath(),t.roundRect(0,0,e,n,r)}function Pi(t,e){return{title:t.title,body:t.body,themeImage:e,color:t.color,radius:t.radius,width:t.cardWidth,height:t.cardHeight,code:t.code,titleFontStack:Mt(t.titleFontId,Et()),bodyFontStack:Mt(t.bodyFontId,Et()),titleSize:t.titleSize,bodySize:t.bodySize,titleX:t.titleX,titleY:t.titleY,bodyX:t.bodyX,bodyY:t.bodyY,imageWidth:t.imageWidth,imageX:t.imageX,imageY:t.imageY,titleColor:t.titleColor,bodyColor:t.bodyColor}}function ro(t,e,n,s){const r=t.getContext("2d");if(!r)return[];const d=e.cardWidth,l=e.cardHeight;t.width=d,t.height=l,r.clearRect(0,0,d,l),r.save(),so(r,d,l,e.radius),r.clip(),r.fillStyle=e.color,r.fillRect(0,0,d,l);const f=[];if(n&&n.naturalWidth>0){const g=e.imageWidth,w=g*(n.naturalHeight/n.naturalWidth);r.drawImage(n,e.imageX,e.imageY,g,w),f.push({kind:"image",x:e.imageX,y:e.imageY,w:g,h:w})}const p=Math.max(1,d-Pe*2);r.textBaseline="top";const m=(g,w,k,R,y,S,Lt,ut)=>{if(!w.trim())return;r.fillStyle=ut,r.font=`${S} ${y}px ${Lt}`;const ot=Mn(w.trim(),p,B=>r.measureText(B).width),st=Math.round(y*1.25);let V=0;ot.forEach((B,It)=>{g!==s&&r.fillText(B,k,R+It*st),V=Math.max(V,r.measureText(B).width)}),f.push({kind:g,x:k,y:R,w:Math.max(V,y),h:Math.max(ot.length,1)*st})},v=Et();return m("body",e.body,e.bodyX,e.bodyY,e.bodySize,400,Mt(e.bodyFontId,v),e.bodyColor),m("title",e.title,e.titleX,e.titleY,e.titleSize,600,Mt(e.titleFontId,v),e.titleColor),r.restore(),f}function Oi(t,e){t.toBlob(n=>{if(!n)return;const s=URL.createObjectURL(n),r=document.createElement("a");r.href=s,r.download=e,r.click(),URL.revokeObjectURL(s)},"image/png")}async function ao(t,e,n,s){const r=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${s}"><foreignObject x="0" y="0" width="${n}" height="${s}">${e}</foreignObject></svg>`,d=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(d);try{const f=await on(l),p=t.getContext("2d");if(!p)return;t.width=n,t.height=s,p.clearRect(0,0,n,s),p.drawImage(f,0,0,n,s)}finally{URL.revokeObjectURL(l),Re.delete(l)}}let Pt=null;function Di(t,e,n){let s=0;const r=()=>{const d=t.scrollHeight-t.clientHeight;if(d<=1){e.hidden=!0;return}e.hidden=!1;const l=Math.max(32,t.clientHeight/t.scrollHeight*t.clientHeight),f=Math.max(0,t.clientHeight-l);e.style.height=`${l}px`,e.style.transform=`translateY(${t.scrollTop/d*f}px)`};return t.addEventListener("scroll",()=>{r(),n.classList.add("is-scrolling"),window.clearTimeout(s),s=window.setTimeout(()=>n.classList.remove("is-scrolling"),700)}),r(),r}function lo(t,e){if(e.length===0)return`
      <section class="state-panel state-panel--soft">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">스튜디오에서 쓸 아카이브 작업물이 없습니다.</p>
      </section>
    `;const n=Bt(t.color);t.titleColor=Y(String(t.titleColor??""))??n,t.bodyColor=Y(String(t.bodyColor??""))??n;const s=t.fontId;t.titleFontId||(t.titleFontId=s||"pretendard"),t.bodyFontId||(t.bodyFontId=s||"pretendard");const r=Dt(t.presetId),d=Ae.map(y=>`<option value="${h(y.id)}"${y.id===r.id?" selected":""}>${h(y.name)} · ${y.width}×${y.height}</option>`).join(""),l=e.map(y=>{const S=y.slug===t.themeSlug;return`
        <button
          type="button"
          class="studio__theme"
          role="radio"
          data-theme-slug="${h(y.slug)}"
          aria-checked="${S?"true":"false"}"
          tabindex="${S?"0":"-1"}"
        >
          <img src="${h(St(y.asset.path))}" alt="${h(y.title)}" />
        </button>
      `}).join(""),f=t.panel==="design",p=oo(),m=Oe(t.cardWidth),v=y=>p.map(S=>`<option value="${h(S.id)}"${S.id===y?" selected":""}>${h(S.label)}</option>`).join(""),g='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',w='<svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/></svg>',k=nn();return`
    <div class="studio-view">
    <div class="studio-devices" role="group" aria-label="디바이스 뷰">${eo.map(y=>`<button type="button" class="studio__zoom-btn studio-devices__btn" data-device="${y.id}" aria-label="${y.label}" title="${y.label}" aria-pressed="${y.id===k?"true":"false"}">${y.icon}</button>`).join("")}</div>
    <div class="studio-device-frame">
    <div class="studio-device" id="studio-device" data-device="${k}" data-framed="${k===Ye()?"false":"true"}">
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
            <select id="studio-preset" class="studio__control">${d}</select>
          </div>
          <div class="studio__field">
            <label for="studio-size">너비·높이 함께</label>
            <div class="studio__radius">
              <input id="studio-size" type="range" min="${tt}" max="${dt}" step="1" value="${t.cardWidth}" />
              <input id="studio-size-number" class="studio__control studio__control--number" type="number" min="${tt}" max="${dt}" step="1" value="${t.cardWidth}" aria-label="너비·높이 함께 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-width">카드 너비</label>
            <div class="studio__radius">
              <input id="studio-width" type="range" min="${tt}" max="${dt}" step="1" value="${t.cardWidth}" />
              <input id="studio-width-number" class="studio__control studio__control--number" type="number" min="${tt}" max="${dt}" step="1" value="${t.cardWidth}" aria-label="카드 너비 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-height">카드 높이</label>
            <div class="studio__radius">
              <input id="studio-height" type="range" min="${tt}" max="${dt}" step="1" value="${t.cardHeight}" />
              <input id="studio-height-number" class="studio__control studio__control--number" type="number" min="${tt}" max="${dt}" step="1" value="${t.cardHeight}" aria-label="카드 높이 수치" />
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
              <input id="studio-title-size" type="range" min="5" max="${m}" step="1" value="${t.titleSize}" />
              <input id="studio-title-size-number" class="studio__control studio__control--number" type="number" min="5" max="${m}" step="1" value="${t.titleSize}" aria-label="타이틀 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-title-font">타이틀 폰트</label>
            <select id="studio-title-font" class="studio__control">${v(t.titleFontId)}</select>
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
              <input id="studio-body-size" type="range" min="5" max="${m}" step="1" value="${t.bodySize}" />
              <input id="studio-body-size-number" class="studio__control studio__control--number" type="number" min="5" max="${m}" step="1" value="${t.bodySize}" aria-label="본문 폰트 크기 수치" />
            </div>
          </div>
          <div class="studio__field">
            <label for="studio-body-font">본문 폰트</label>
            <select id="studio-body-font" class="studio__control">${v(t.bodyFontId)}</select>
          </div>
          <p class="studio__hint">프리뷰에서 타이틀과 본문을 드래그해 옮기고, 더블 클릭(탭)해 바로 수정할 수 있습니다.</p>
          <div class="studio__field">
            <span id="studio-theme-label">아카이브 테마</span>
            <div class="studio__themes" role="radiogroup" aria-labelledby="studio-theme-label">${l}</div>
          </div>
          <div class="studio__field">
            <label for="studio-image-width">카드 이미지 크기</label>
            <div class="studio__radius">
              <input id="studio-image-width" type="range" min="${le}" max="${Ce}" step="1" value="${t.imageWidth}" />
              <input id="studio-image-width-number" class="studio__control studio__control--number" type="number" min="${le}" max="${Ce}" step="1" value="${t.imageWidth}" aria-label="카드 이미지 크기 수치" />
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
              <input id="studio-radius" type="range" min="${Ot}" max="${ae}" step="1" value="${t.radius}" aria-valuemin="${Ot}" aria-valuemax="${ae}" aria-valuenow="${t.radius}" />
              <input id="studio-radius-number" class="studio__control studio__control--number" type="number" min="${Ot}" max="${ae}" step="1" value="${t.radius}" aria-label="카드 radius 수치" />
            </div>
          </div>
          <button type="button" class="button button--secondary studio__reset" id="studio-reset">초기화</button>
        </div>

        <div id="studio-panel-code" role="tabpanel" aria-labelledby="studio-tab-code"${f?" hidden":""}>
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
                <div class="studio__image-frame" id="studio-image-frame" hidden></div>
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
              <button type="button" class="studio__zoom-btn" id="studio-undo" aria-label="이전 동작" disabled>${g}</button>
              <button type="button" class="studio__zoom-btn" id="studio-redo" aria-label="원래대로" disabled>${w}</button>
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
  `}function co(t,e,n,s){var yi,bi,vi,_i,xi,$i,wi,Si,Mi;if(n.length===0)return;const r=t.querySelector("#studio-preset"),d=t.querySelector("#studio-size"),l=t.querySelector("#studio-size-number"),f=t.querySelector("#studio-width"),p=t.querySelector("#studio-width-number"),m=t.querySelector("#studio-height"),v=t.querySelector("#studio-height-number"),g=t.querySelector("#studio-title"),w=t.querySelector("#studio-title-color"),k=t.querySelector("#studio-title-hex"),R=t.querySelector("#studio-title-size"),y=t.querySelector("#studio-title-size-number"),S=t.querySelector("#studio-body"),Lt=t.querySelector("#studio-body-color"),ut=t.querySelector("#studio-body-hex"),ot=t.querySelector("#studio-body-size"),st=t.querySelector("#studio-body-size-number"),V=t.querySelector("#studio-title-font"),B=t.querySelector("#studio-body-font"),It=t.querySelector("#studio-image-width"),me=t.querySelector("#studio-image-width-number"),fe=t.querySelector("#studio-color"),Xt=t.querySelector("#studio-hex"),A=t.querySelector("#studio-radius"),N=t.querySelector("#studio-radius-number"),X=t.querySelector("#studio-code"),_=t.querySelector("#studio-canvas"),Ut=t.querySelector("#studio-iframe"),Be=t.querySelector("#studio-meta"),kt=t.querySelector("#studio-safe"),jt=t.querySelector("#studio-scaler"),ge=t.querySelector("#studio-fit"),Wt=t.querySelector("#studio-stage"),ye=t.querySelector("#studio-zoom-out"),be=t.querySelector("#studio-zoom-in"),Xe=t.querySelector("#studio-zoom-label"),Ue=t.querySelector("#studio-undo"),je=t.querySelector("#studio-redo"),Ke=t.querySelector("#studio-scroll-thumb"),Ze=t.querySelector(".studio__controls-wrap"),ve=t.querySelector("#studio-export"),T=t.querySelector("#studio-splitter"),Kt=t.querySelector(".studio"),At=t.querySelector("#studio-image-frame"),$=t.querySelector("#studio-editor"),_e=[...t.querySelectorAll(".studio__handle")];if(!At||!$||!r||!d||!l||!f||!p||!m||!v||!g||!w||!k||!R||!y||!S||!Lt||!ut||!ot||!st||!V||!B||!It||!me||!fe||!Xt||!A||!N||!X||!_||!Ut||!Be||!kt||!jt||!ge||!Wt||!ye||!be||!Xe||!Ue||!je||!Ke||!Ze||!ve||!T||!Kt)return;const Ge=()=>{const i=n.find(o=>o.slug===e.themeSlug)??n[0];return i?St(i.asset.path):""};let Zt=0,U=1,zt=!1,I=null,H=()=>{},ht=()=>{};const dn=()=>{(!Number.isFinite(E)||E<=0)&&(E=1),ye.disabled=E<=Ai+.001,be.disabled=E>=zi-.001,Xe.textContent=`${Math.round(E*100)}%`},xe=(i,o)=>{const a=Wt.getBoundingClientRect(),c=20,u=Math.min(Math.max(a.width-c,1)/i,Math.max(a.height-c,1)/o);return Number.isFinite(u)&&u>0?u:1},pt=()=>{const i=xe(e.cardWidth,e.cardHeight);dn();const o=i*E;ge.style.width=`${e.cardWidth*o}px`,ge.style.height=`${e.cardHeight*o}px`,jt.style.width=`${e.cardWidth}px`,jt.style.height=`${e.cardHeight}px`,jt.style.transform=`scale(${o})`,U=o,ht()};ye.addEventListener("click",()=>{E=Math.max(Ai,E-Ci),pt()}),be.addEventListener("click",()=>{E=Math.min(zi,E+Ci),pt()}),(yi=t.querySelector("#studio-zoom-fit"))==null||yi.addEventListener("click",()=>{E=1,pt(),Wt.scrollTo(0,0)});const Je=t.querySelector("#studio-controls");Je&&Di(Je,Ke,Ze);const mt=()=>{const i=document.querySelector("#studio-undo"),o=document.querySelector("#studio-redo");i&&(i.disabled=G.length===0),o&&(o.disabled=Rt.length===0)};let Ct=null;const b=i=>{if(i&&Ct!==i)return;if(!Nt){Ct=null;return}const o=Nt,a=Fi;Nt=null,Ct=null,!(Ti(o,e)&&a===E)&&(G.push(o),$t.push(a),G.length>qi&&(G.shift(),$t.shift()),Rt=[],oe=[],mt())},M=i=>{i&&Ct===i&&Nt||(b(),Nt=re(e),Fi=E,Ct=i??null)},ln=i=>{const o=Number(i.min),a=Number(i.max),c=Number(i.value),u=a>o?(c-o)/(a-o)*100:0;i.style.setProperty("--range-fill",`${Math.min(100,Math.max(0,u))}%`)};let Ve=e.cardHeight/Math.max(1,e.cardWidth),ft={cardWidth:e.cardWidth,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY};const $e=()=>{Ve=e.cardHeight/Math.max(1,e.cardWidth),ft={cardWidth:e.cardWidth,imageWidth:e.imageWidth,imageX:e.imageX,imageY:e.imageY}};let P=null,gt=1,yt=[];const Qe=()=>e.imageWidth*gt,we=()=>{e.cardWidth=et(e.cardWidth),e.cardHeight=et(e.cardHeight),e.imageWidth=Yt(e.imageWidth)},bt=(i,o,a)=>{i.value=String(a),document.activeElement!==o&&(o.value=String(a))},cn=()=>{const i=Oe(e.cardWidth),o=String(Math.max(i,e.titleSize)),a=String(Math.max(i,e.bodySize));for(const c of[R,y])c.min="5",c.max=o;for(const c of[ot,st])c.min="5",c.max=a;bt(d,l,e.cardWidth),bt(f,p,e.cardWidth),bt(m,v,e.cardHeight),bt(R,y,e.titleSize),bt(ot,st,e.bodySize),bt(It,me,e.imageWidth)},ti=()=>{A.value=String(e.radius),A.setAttribute("aria-valuenow",String(e.radius)),N.value=String(e.radius),t.style.setProperty("--studio-card-radius",`${e.radius}px`)},ei=(i,o)=>{e.themeSlug=i;for(const a of t.querySelectorAll("[data-theme-slug]")){const c=a.dataset.themeSlug===i;a.setAttribute("aria-checked",c?"true":"false"),a.tabIndex=c?0:-1,c&&o&&a.focus()}L()},Se=i=>{var u,x;e.panel=i;const o=i==="design";(u=t.querySelector("#studio-panel-design"))==null||u.toggleAttribute("hidden",!o),(x=t.querySelector("#studio-panel-code"))==null||x.toggleAttribute("hidden",o);const a=t.querySelector("#studio-tab-design"),c=t.querySelector("#studio-tab-code");a==null||a.setAttribute("aria-selected",o?"true":"false"),c==null||c.setAttribute("aria-selected",o?"false":"true"),a&&(a.tabIndex=o?0:-1),c&&(c.tabIndex=o?-1:0),L()},ii=()=>{r.value=e.presetId,document.activeElement!==g&&(g.value=e.title),document.activeElement!==S&&(S.value=e.body),document.activeElement!==k&&(w.value=e.titleColor,k.value=e.titleColor),document.activeElement!==ut&&(Lt.value=e.bodyColor,ut.value=e.bodyColor),document.activeElement!==Xt&&(fe.value=e.color,Xt.value=e.color),V.value=e.titleFontId,B.value=e.bodyFontId,document.activeElement!==X&&(X.value=e.code);for(const i of t.querySelectorAll("[data-theme-slug]")){const o=i.dataset.themeSlug===e.themeSlug;i.setAttribute("aria-checked",o?"true":"false"),i.tabIndex=o?0:-1}},L=async()=>{const i=++Zt;we(),ii(),cn(),t.querySelectorAll('input[type="range"]').forEach(ln);const o=Dt(e.presetId),a=e.cardWidth===o.width&&e.cardHeight===o.height,c=a&&o.safe?` · 안전 영역 ${o.safe.width} × ${o.safe.height}`:"";Be.textContent=`${e.cardWidth} × ${e.cardHeight} · ${o.name}${c}`,ve.textContent=Te(),ti(),pt(),a&&o.safe?(kt.hidden=!1,kt.style.width=`${o.safe.width}px`,kt.style.height=`${o.safe.height}px`):kt.hidden=!0;const u=(z,C,O)=>{var Tt;const Z=(Tt=Mt(z,Et()).split(",")[0])==null?void 0:Tt.replaceAll('"',"").trim();return Z?document.fonts.load(`${C} ${O}px "${Z}"`):Promise.resolve()};try{await Promise.all([u(e.titleFontId,600,e.titleSize),u(e.bodyFontId,400,e.bodySize)])}catch{}if(i!==Zt)return;const x=Ge();if(e.code.trim()){_.hidden=!0,Ut.hidden=!1;const z=x?await Ri(x):"";if(i!==Zt)return;Ut.srcdoc=In(Pi(e,z)),ht();return}if(Ut.hidden=!0,_.hidden=!1,x)try{P=await on(x),P.naturalWidth>0&&(gt=P.naturalHeight/P.naturalWidth)}catch{P=null,gt=1}else P=null,gt=1;i===Zt&&(we(),H())},vt=(i,o,a,c)=>{i.addEventListener("pointerdown",()=>M(i)),i.addEventListener("keydown",()=>M(i)),i.addEventListener("pointerup",()=>b(i)),i.addEventListener("pointercancel",()=>b(i)),i.addEventListener("keyup",()=>b(i)),i.addEventListener("input",()=>{a(Number(i.value)),L()});const u=()=>{we(),o.value=String(c()),b(o)};o.addEventListener("focus",()=>M(o)),o.addEventListener("input",()=>{o.value.trim()!==""&&(a(Number(o.value)),L())}),o.addEventListener("change",u),o.addEventListener("blur",u)};r.addEventListener("focus",()=>M(r)),r.addEventListener("change",()=>{const i=Dt(r.value);e.presetId=i.id,e.cardWidth=i.width,e.cardHeight=i.height,b(r),L()}),r.addEventListener("blur",()=>b(r)),d.addEventListener("pointerdown",$e),d.addEventListener("keydown",$e),l.addEventListener("focus",$e),vt(d,l,i=>{const o=xe(e.cardWidth,e.cardHeight)*E,a=xn(Math.max(1,e.cardWidth),Math.max(1,Math.round(e.cardWidth*Ve)),i);e.cardWidth=a.cardWidth,e.cardHeight=a.cardHeight;const c=e.cardWidth/Math.max(1,ft.cardWidth);e.imageWidth=Yt(ft.imageWidth*c);const u=e.imageWidth/Math.max(1,ft.imageWidth);e.imageX=Math.round(ft.imageX*u),e.imageY=Math.round(ft.imageY*u);const x=xe(e.cardWidth,e.cardHeight);x>0&&Number.isFinite(o)&&o>0&&(E=o/x)},()=>e.cardWidth),vt(f,p,i=>{e.cardWidth=et(i),e.titleSize=it(e.titleSize,e.cardWidth),e.bodySize=it(e.bodySize,e.cardWidth)},()=>e.cardWidth),vt(m,v,i=>{e.cardHeight=i},()=>e.cardHeight),vt(R,y,i=>{e.titleSize=it(i,e.cardWidth)},()=>e.titleSize),vt(ot,st,i=>{e.bodySize=it(i,e.cardWidth)},()=>e.bodySize),vt(It,me,i=>{e.imageWidth=i},()=>e.imageWidth);const ni=(i,o)=>{i.addEventListener("focus",()=>M(i)),i.addEventListener("change",()=>{o(),b(i),L()}),i.addEventListener("blur",()=>b(i))};ni(V,()=>{e.titleFontId=V.value}),ni(B,()=>{e.bodyFontId=B.value}),(bi=t.querySelector("#studio-reset"))==null||bi.addEventListener("click",()=>{b();const i=re(e),o=E;s(),(!Ti(i,e)||o!==E)&&(G.push(i),$t.push(o),G.length>qi&&(G.shift(),$t.shift()),Rt=[],oe=[]),mt()}),g.addEventListener("focus",()=>M(g)),g.addEventListener("input",()=>{e.title=g.value,L()}),g.addEventListener("blur",()=>b(g)),S.addEventListener("focus",()=>M(S)),S.addEventListener("input",()=>{e.body=S.value,L()}),S.addEventListener("blur",()=>b(S));const Me=(i,o,a,c)=>{i.addEventListener("pointerdown",()=>M(i)),i.addEventListener("change",()=>b(i)),i.addEventListener("input",()=>{const u=Y(i.value);u&&(a(u),o.value=u,L())}),o.addEventListener("focus",()=>M(o)),o.addEventListener("input",()=>{const u=Y(o.value);u&&(a(u),i.value=u,L())}),o.addEventListener("blur",()=>{Y(o.value)||(o.value=c()),b(o)})};Me(fe,Xt,i=>{e.color=i},()=>e.color),Me(w,k,i=>{e.titleColor=i},()=>e.titleColor),Me(Lt,ut,i=>{e.bodyColor=i},()=>e.bodyColor);const oi=i=>{e.radius=Ui(Number(i)),ti(),L()};A.addEventListener("pointerdown",()=>M(A)),A.addEventListener("keydown",()=>M(A)),A.addEventListener("pointerup",()=>b(A)),A.addEventListener("pointercancel",()=>b(A)),A.addEventListener("keyup",()=>b(A)),A.addEventListener("input",()=>oi(A.value)),N.addEventListener("focus",()=>M(N)),N.addEventListener("input",()=>oi(N.value)),N.addEventListener("blur",()=>b(N)),N.addEventListener("change",()=>b(N)),X.addEventListener("focus",()=>M(X)),X.addEventListener("input",()=>{e.code=X.value,L()}),X.addEventListener("blur",()=>b(X));const si=(i,o)=>{Object.assign(e,i),E=o,mt(),L()};Ue.addEventListener("click",()=>{b();const i=G.pop(),o=$t.pop();if(!i||o===void 0){mt();return}Rt.push(re(e)),oe.push(E),si(i,o)}),je.addEventListener("click",()=>{b();const i=Rt.pop(),o=oe.pop();if(!i||o===void 0){mt();return}G.push(re(e)),$t.push(E),si(i,o)}),mt(),(vi=t.querySelector("#studio-tab-design"))==null||vi.addEventListener("click",()=>Se("design")),(_i=t.querySelector("#studio-tab-code"))==null||_i.addEventListener("click",()=>Se("code")),(xi=t.querySelector(".studio__tabs"))==null||xi.addEventListener("keydown",i=>{var a;if(!(i instanceof KeyboardEvent)||i.key!=="ArrowRight"&&i.key!=="ArrowLeft")return;i.preventDefault();const o=e.panel==="design"?"code":"design";Se(o),(a=t.querySelector(o==="design"?"#studio-tab-design":"#studio-tab-code"))==null||a.focus()});const qt=[...t.querySelectorAll("[data-theme-slug]")];for(const i of qt)i.addEventListener("click",()=>{const o=i.dataset.themeSlug;!o||o===e.themeSlug||(M(i),ei(o,!1),b(i))});($i=t.querySelector(".studio__themes"))==null||$i.addEventListener("keydown",i=>{if(!(i instanceof KeyboardEvent))return;const o=i.key;if(!["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(o))return;i.preventDefault();const a=qt.findIndex(z=>z.dataset.themeSlug===e.themeSlug),u=qt[(a+(o==="ArrowLeft"||o==="ArrowUp"?-1:1)+qt.length)%qt.length],x=u==null?void 0:u.dataset.themeSlug;!x||x===e.themeSlug||(M(u),ei(x,!0),b(u))}),(wi=t.querySelector("#studio-copy"))==null||wi.addEventListener("click",async()=>{const i=Te();ve.textContent=i;try{await navigator.clipboard.writeText(i)}catch{const a=document.createElement("textarea");a.value=i,document.body.append(a),a.select(),document.execCommand("copy"),a.remove()}const o=t.querySelector("#studio-copy");o&&(o.textContent="복사됨",window.setTimeout(()=>{o.textContent="현재 디자인을 코드로 복사"},1200))}),(Si=t.querySelector("#studio-download"))==null||Si.addEventListener("click",()=>{(async()=>{const i=`ax-studio-${e.cardWidth}x${e.cardHeight}-${e.themeSlug||"theme"}.png`;if(!e.code.trim()){Oi(_,i);return}const o=Ge(),a=o?await Ri(o):"",c=document.createElement("canvas");await ao(c,Zi(Pi(e,a)),e.cardWidth,e.cardHeight),Oi(c,i)})()});const rt=i=>{const o=_.getBoundingClientRect();return{x:o.width>0?(i.clientX-o.left)/o.width*e.cardWidth:0,y:o.height>0?(i.clientY-o.top)/o.height*e.cardHeight:0}},ri=(i,o)=>{for(let c=yt.length-1;c>=0;c-=1){const u=yt[c];if(u&&i>=u.x-8&&o>=u.y-8&&i<=u.x+u.w+8&&o<=u.y+u.h+8)return u}return null},un=i=>{const o=_.getContext("2d");if(!o)return;const a=_.getBoundingClientRect().width,c=a>0?e.cardWidth/a:1;o.save(),o.lineJoin="round",o.lineCap="round",o.strokeStyle="rgba(0, 0, 0, 0.7)",o.lineWidth=c*3,o.strokeRect(i.x,i.y,Math.max(c,i.w),Math.max(c,i.h)),o.strokeStyle="rgba(255, 255, 255, 0.92)",o.lineWidth=c*1.5,o.strokeRect(i.x,i.y,Math.max(c,i.w),Math.max(c,i.h)),o.restore()},ai=()=>{if(!W)return;const i=yt.find(o=>o.kind===(W==null?void 0:W.kind));i&&un(i)};let W=null,j=null,at=null;const K=new Map;let q=null;const Gt=()=>({x:e.imageX,y:e.imageY,width:e.imageWidth}),Jt=i=>{e.imageWidth=i.width,e.imageX=ee(i.x,e.cardWidth,e.imageWidth),e.imageY=ee(i.y,e.cardHeight,Qe())};H=()=>{yt=ro(_,e,P,I==null?void 0:I.kind),ai(),ht()};const _t=(i,o,a)=>{i.style.left=`${o*U}px`,i.style.top=`${a*U}px`},hn=()=>{if(!I)return;const i=I.kind==="title",o=i?e.titleSize:e.bodySize,a=o*U,c=Math.max(16,a),u=a/c;_t($,i?e.titleX:e.bodyX,i?e.titleY:e.bodyY),$.style.font=`${i?600:400} ${c}px ${Mt(i?e.titleFontId:e.bodyFontId,Et())}`,$.style.lineHeight=`${Math.round(o*1.25)*U/u}px`,$.style.color=i?e.titleColor:e.bodyColor,$.style.width=`${Math.max(1,e.cardWidth-Pe*2)*U/u}px`,$.style.transform=`scale(${u})`,$.style.height="auto",$.style.height=`${$.scrollHeight}px`};ht=()=>{const i=yt.find(a=>a.kind==="image"),o=zt&&!I&&!e.code.trim()&&!!i;At.hidden=!o;for(const a of _e)a.hidden=!o;if(o&&i){_t(At,i.x,i.y),At.style.width=`${i.w*U}px`,At.style.height=`${i.h*U}px`;const a=12/Math.max(U,.001),c=C=>Math.min(e.cardWidth-a,Math.max(a,C)),u=C=>Math.min(e.cardHeight-a,Math.max(a,C)),x=c(i.x+i.w/2),z=u(i.y+i.h/2);for(const C of _e){const O=C.dataset.handle;O==="top"?_t(C,x,u(i.y)):O==="bottom"?_t(C,x,u(i.y+i.h)):O==="left"?_t(C,c(i.x),z):_t(C,c(i.x+i.w),z)}}hn()};for(const i of _e)i.addEventListener("pointerdown",o=>{const a=yt.find(Z=>Z.kind==="image");if(!a)return;o.preventDefault();try{i.setPointerCapture(o.pointerId)}catch{}M(i);const c=i.dataset.handle,u=Gt(),x=c==="right"?{x:a.x,y:a.y+a.h/2}:c==="left"?{x:a.x+a.w,y:a.y+a.h/2}:c==="bottom"?{x:a.x+a.w/2,y:a.y}:{x:a.x+a.w/2,y:a.y+a.h},z=rt(o),C=Z=>{if(Z.pointerId!==o.pointerId)return;const Tt=rt(Z),Ei=Tt.x-z.x,Li=Tt.y-z.y,gn=c==="right"?a.w+Ei:c==="left"?a.w-Ei:c==="bottom"?(a.h+Li)/gt:(a.h-Li)/gt;Jt(ie(u,gn,x.x,x.y)),H()},O=Z=>{Z.pointerId===o.pointerId&&(i.removeEventListener("pointermove",C),i.removeEventListener("pointerup",O),i.removeEventListener("pointercancel",O),b(i),L())};i.addEventListener("pointermove",C),i.addEventListener("pointerup",O),i.addEventListener("pointercancel",O)});const pn=i=>{e.code.trim()||(I={kind:i,original:e[i]},zt=!1,M($),$.value=e[i],$.hidden=!1,H(),$.focus(),$.setSelectionRange($.value.length,$.value.length))},Vt=i=>{I&&(i||(e[I.kind]=I.original),I=null,$.hidden=!0,H(),b($),L())};$.addEventListener("input",()=>{I&&(e[I.kind]=I.kind==="title"?$.value.replace(/\n/g," "):$.value,H(),ii())}),$.addEventListener("keydown",i=>{i.isComposing||(i.key==="Escape"?(i.preventDefault(),Vt(!1)):i.key==="Enter"&&((I==null?void 0:I.kind)==="title"||i.metaKey||i.ctrlKey)&&(i.preventDefault(),Vt(!0)))}),$.addEventListener("blur",()=>Vt(!0));const mn=(i,o)=>{if(at&&at.kind===i&&o.timeStamp-at.time<400&&Math.hypot(o.clientX-at.x,o.clientY-at.y)<24&&i!=="image"){at=null,pn(i);return}at={kind:i,time:o.timeStamp,x:o.clientX,y:o.clientY}},di=()=>{const[i,o]=[...K.values()];return!i||!o?null:{distance:Math.hypot(o.x-i.x,o.y-i.y),mid:rt({clientX:(i.x+o.x)/2,clientY:(i.y+o.y)/2})}},fn=()=>{const i=di();i&&(W=null,j=null,delete _.dataset.dragging,M(_),q={...i,image:Gt()},H())};_.addEventListener("pointerdown",i=>{if(e.code.trim())return;if(I&&Vt(!0),i.pointerType==="touch"){K.set(i.pointerId,{x:i.clientX,y:i.clientY});try{_.setPointerCapture(i.pointerId)}catch{}if(K.size===2&&P){fn();return}if(K.size>1)return}const o=rt(i),a=ri(o.x,o.y);if(zt=i.pointerType==="mouse"&&(a==null?void 0:a.kind)==="image",j=a?{x:i.clientX,y:i.clientY,moved:!1}:null,ht(),!!a){try{_.setPointerCapture(i.pointerId)}catch{}M(_),W={kind:a.kind,dx:o.x-a.x,dy:o.y-a.y,pointerId:i.pointerId},_.dataset.dragging="true",ai()}}),_.addEventListener("pointermove",i=>{if(K.has(i.pointerId)&&K.set(i.pointerId,{x:i.clientX,y:i.clientY}),q){const u=K.has(i.pointerId)?di():null;if(!u)return;const x=u.distance/Math.max(1,q.distance),z=ie(q.image,q.image.width*x,q.mid.x,q.mid.y);Jt({x:z.x+u.mid.x-q.mid.x,y:z.y+u.mid.y-q.mid.y,width:z.width}),H();return}j&&Math.hypot(i.clientX-j.x,i.clientY-j.y)>6&&(j.moved=!0);const o=rt(i);if(!W||W.pointerId!==i.pointerId){_.dataset.hover=ri(o.x,o.y)?"true":"false";return}const a=o.x-W.dx,c=o.y-W.dy;W.kind==="title"?(e.titleX=nt(a,e.cardWidth,e.titleSize),e.titleY=nt(c,e.cardHeight,e.titleSize)):W.kind==="body"?(e.bodyX=nt(a,e.cardWidth,e.bodySize),e.bodyY=nt(c,e.cardHeight,e.bodySize)):(e.imageX=ee(a,e.cardWidth,e.imageWidth),e.imageY=ee(c,e.cardHeight,Qe())),H()});const li=i=>{if(K.delete(i.pointerId),q){K.size<2&&(q=null,b(_),L());return}if(!W||W.pointerId!==i.pointerId)return;const o=W.kind;W=null,delete _.dataset.dragging,b(_),H(),i.type==="pointerup"&&j&&!j.moved&&mn(o,i),j=null};_.addEventListener("pointerup",li),_.addEventListener("pointercancel",li);const ci=new EventTarget;let ui=0;_.addEventListener("wheel",i=>{if(!i.ctrlKey||e.code.trim()||!P)return;i.preventDefault(),M(ci);const o=rt(i);Jt(ie(Gt(),e.imageWidth*Math.exp(-i.deltaY*.01),o.x,o.y)),H(),window.clearTimeout(ui),ui=window.setTimeout(()=>{b(ci),L()},250)},{passive:!1});const hi=new EventTarget;let Ft=null;_.addEventListener("gesturestart",i=>{i.preventDefault(),!(q||e.code.trim()||!P)&&(M(hi),Ft={image:Gt(),anchor:rt(i)})}),_.addEventListener("gesturechange",i=>{if(i.preventDefault(),!Ft||q)return;const{image:o,anchor:a}=Ft;Jt(ie(o,o.width*i.scale,a.x,a.y)),H()}),_.addEventListener("gestureend",i=>{i.preventDefault(),Ft&&(Ft=null,b(hi),L())}),Wt.addEventListener("pointerdown",i=>{i.target===_||!zt||i.target instanceof Element&&i.target.closest(".studio__handle")||(zt=!1,ht())});const Qt=i=>{const o=Kt.getBoundingClientRect().width,a=wt+qe+Fe,c=Number.isFinite(i)?i:e.controlsWidth;e.controlsWidth=o>=a?$n(c,o):Math.max(wt,Math.round(c)),Kt.style.setProperty("--studio-controls-width",`${e.controlsWidth}px`),T.setAttribute("aria-valuenow",String(e.controlsWidth)),T.setAttribute("aria-valuemax",String(o>=a?Math.max(wt,Math.round(o)-qe-Fe):e.controlsWidth)),pt()};Qt(e.controlsWidth);const Q=t.querySelector("#studio-device"),pi=[...t.querySelectorAll(".studio-devices__btn")],mi=t.querySelector("#studio-device-thumb"),fi=Q==null?void 0:Q.parentElement,Ee=Q&&mi&&fi?Di(Q,mi,fi):null,te=()=>{if(!Q)return;const i=nn();Q.dataset.device=i,Q.dataset.framed=i===Ye()?"false":"true";for(const o of pi)o.setAttribute("aria-pressed",o.dataset.device===i?"true":"false");Qt(e.controlsWidth),Ee==null||Ee()};te();for(const i of pi)i.addEventListener("click",()=>{de=i.dataset.device,te()});se==null||se();const gi=[window.matchMedia(tn),window.matchMedia(en)];for(const i of gi)i.addEventListener("change",te);se=()=>{for(const i of gi)i.removeEventListener("change",te)},T.addEventListener("pointerdown",i=>{if(Kt.getBoundingClientRect().width<768)return;try{T.setPointerCapture(i.pointerId)}catch{}const o=i.clientX,a=e.controlsWidth,c=x=>{x.pointerId===i.pointerId&&Qt(a+x.clientX-o)},u=x=>{x.pointerId===i.pointerId&&(T.removeEventListener("pointermove",c),T.removeEventListener("pointerup",u),T.removeEventListener("pointercancel",u))};T.addEventListener("pointermove",c),T.addEventListener("pointerup",u),T.addEventListener("pointercancel",u)}),T.addEventListener("keydown",i=>{if(i.key!=="ArrowLeft"&&i.key!=="ArrowRight")return;i.preventDefault();const o=i.shiftKey?48:16;Qt(e.controlsWidth+(i.key==="ArrowRight"?o:-o))}),(Mi=t.querySelector("#studio-controls"))==null||Mi.addEventListener("submit",i=>{i.preventDefault()}),Pt==null||Pt.disconnect(),Pt=new ResizeObserver(()=>pt()),Pt.observe(Wt),L()}const sn="ax-design-studio-mode",Yi="./data/index.json";let D={status:"loading"},pe=he(),rn="all",J=null,ke=null,F=He();function Ne(){const t=localStorage.getItem(sn);return t==="light"||t==="dark"?t:"dark"}function Bi(t){document.documentElement.dataset.theme="cool",document.documentElement.dataset.mode=t,localStorage.setItem(sn,t)}function We(t,e,n){return`<a class="nav-link${n?" nav-link--current":""}" href="${e}" ${n?'aria-current="page"':""}>${t}</a>`}function uo(t){return t==="dark"?`
      <svg class="mode-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v3M12 18.5v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2.5 12h3M18.5 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    `:`
    <svg class="mode-icon mode-icon--moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3A7 7 0 0 0 21 12.8Z" />
    </svg>
  `}function an(){const t=getComputedStyle(document.documentElement).getPropertyValue("--soft").trim(),e=De(t);return e?ue(e.r,e.g,e.b):Y(t)??ue(216,241,255)}function ho(t,e){var s;const n=t&&e.some(r=>r.slug===t)?t:null;return J?(t&&t!==ke&&n&&(J.themeSlug=n,ke=t),J):(J=ji(n??((s=e[0])==null?void 0:s.slug)??"",an()),ke=t,J)}function po(t){const e=Ne(),n=e==="dark"?"라이트 모드로 전환":"다크 모드로 전환",s=F.name==="studio";return`
    <header class="top-nav">
      <a class="wordmark" href="#/">AX Design Studio</a>
      <nav class="nav-menu" aria-label="Primary">
        ${We("Graphic Library",ct({name:"archive"}),F.name==="archive"||F.name==="capture")}
        ${We("Online Marketing Studio",ct({name:"studio",theme:null}),F.name==="studio")}
        ${We("History",ct({name:"history"}),F.name==="history")}
      </nav>
      <div class="nav-actions">
        <button type="button" class="button button--secondary" id="mode-toggle" aria-label="${n}" title="${n}">
          ${uo(e)}
        </button>
      </div>
    </header>
    <main class="shell${s?" shell--studio":""}" id="main">${t}</main>
  `}function mo(){if(D.status==="loading")return`
      <section class="state-panel state-panel--canvas" aria-busy="true">
        <h1 class="state-panel__title">Loading index</h1>
        <p class="state-panel__text">Reading build JSON. Markdown is never fetched by the browser.</p>
      </section>
    `;if(D.status==="error")return`
      <section class="state-panel state-panel--soft" role="alert">
        <h1 class="state-panel__title">Index failed to load</h1>
        <p class="state-panel__text">${D.message}</p>
        <p class="state-panel__text">Run <code>npm run build -- --target=internal</code> before <code>npm run dev</code>.</p>
      </section>
    `;const t=D.index;switch(F.name){case"archive":return Rn(t,pe,rn);case"capture":return Jn(t,F.slug,pe);case"studio":return lo(ho(F.theme,t.captures),t.captures);case"history":return Qn(t);case"notfound":return to(F.path)}}function lt(){var e;const t=document.querySelector("#app");if(!t)throw new Error("#app not found");Bi(Ne()),pe=he(),t.innerHTML=po(mo()),(e=t.querySelector("#mode-toggle"))==null||e.addEventListener("click",()=>{Bi(Ne()==="dark"?"light":"dark"),lt()}),D.status==="ready"&&(F.name==="archive"&&Nn(t,{onTabChange:n=>{var s;rn=n,lt(),(s=document.querySelector(`[data-archive-tab="${n}"]`))==null||s.focus()}}),F.name==="capture"&&Vn(t,n=>{pe=Wn(n),lt()}),F.name==="studio"&&D.status==="ready"&&J&&co(t,J,D.index.captures,()=>{var n;J&&(Sn(J,an()),lt(),(n=document.querySelector("#studio-reset"))==null||n.focus())}))}async function fo(){D={status:"loading"},lt();try{const t=await fetch(Yi,{cache:"no-store"});if(!t.ok)throw new Error(`${Yi} → HTTP ${t.status}`);const e=await t.json();if(!e||!Array.isArray(e.captures)||!e.facets)throw new Error("Index JSON is missing captures or facets");D={status:"ready",index:e}}catch(t){D={status:"error",message:t instanceof Error?t.message:String(t)}}lt()}zn(t=>{if(Qi(window.location.hash)){window.location.replace(ct({name:"studio",theme:null}));return}F=t,lt()});fo();
