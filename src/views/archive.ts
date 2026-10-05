import { sortCaptures } from "../shared/filter.ts";
import type { CaptureRecord, SiteIndex } from "../shared/index-types.ts";
import { assetUrl, escapeHtml } from "../lib/dom.ts";
import { hrefFor } from "../router.ts";
import type { SavedCard } from "../saved-cards.ts";

export type ArchiveTab = "all" | "pin" | "saved";

export type ArchiveCallbacks = {
  onTabChange: (tab: ArchiveTab) => void;
};

let lastTabIndicator: { left: number; width: number } | null = null;

function syncTabIndicator(root: HTMLElement): void {
  const indicator = root.querySelector<HTMLElement>(".archive-tabs__indicator");
  const selected = root.querySelector<HTMLElement>(
    '.archive-tab[aria-selected="true"]',
  );
  if (!indicator || !selected) return;

  const left = selected.offsetLeft;
  const width = selected.offsetWidth;

  if (lastTabIndicator) {
    indicator.style.transition = "none";
    indicator.style.transform = `translateX(${lastTabIndicator.left}px)`;
    indicator.style.width = `${lastTabIndicator.width}px`;
    void indicator.offsetWidth;
    indicator.style.transition = "";
  }

  requestAnimationFrame(() => {
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
    lastTabIndicator = { left, width };
  });
}

function layoutMasonry(root: HTMLElement): void {
  const grid = root.querySelector<HTMLElement>(".capture-grid");
  if (!grid) return;

  const styles = window.getComputedStyle(grid);
  const rowHeight = Number.parseFloat(styles.gridAutoRows) || 1;
  const rowGap = Number.parseFloat(styles.rowGap) || 0;

  grid.querySelectorAll<HTMLElement>(".capture-card").forEach((card) => {
    card.style.gridRowEnd = "";
    const height = card.getBoundingClientRect().height;
    const marginBottom =
      Number.parseFloat(window.getComputedStyle(card).marginBottom) || 0;
    const span = Math.ceil(
      (height + marginBottom + rowGap) / (rowHeight + rowGap),
    );
    card.style.gridRowEnd = `span ${Math.max(1, span)}`;
  });
}

function cardImage(capture: CaptureRecord): string {
  const src =
    capture.asset.kind === "motion" && capture.asset.posterPath
      ? capture.asset.posterPath
      : capture.asset.path;
  return `<img class="capture-card__media" src="${escapeHtml(assetUrl(src))}" alt="" loading="lazy" width="${capture.asset.width}" height="${capture.asset.height}" />`;
}

function renderSavedCard(card: SavedCard): string {
  const size = `${card.state.cardWidth} × ${card.state.cardHeight}`;
  return `
    <article class="capture-card">
      <a class="capture-card__link" href="${hrefFor({ name: "studio", theme: null, card: card.id })}">
        <div class="capture-card__frame">
          <img class="capture-card__media" src="${escapeHtml(card.thumbnail)}" alt="" width="${card.state.cardWidth}" height="${card.state.cardHeight}" />
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${escapeHtml(card.title)}</h2>
          <p class="capture-card__insight">${escapeHtml(size)}</p>
        </div>
      </a>
    </article>
  `;
}

function renderCard(capture: CaptureRecord, pinned: boolean): string {
  return `
    <article class="capture-card${pinned ? " capture-card--pinned" : ""}">
      <a class="capture-card__link" href="${hrefFor({ name: "capture", slug: capture.slug })}">
        <div class="capture-card__frame">
          ${cardImage(capture)}
          ${
            capture.asset.kind === "still"
              ? ""
              : `<span class="capture-card__kind">${escapeHtml(capture.asset.kind)}</span>`
          }
          ${pinned ? `<span class="capture-card__pin-badge">Pinned</span>` : ""}
        </div>
        <div class="capture-card__body">
          <h2 class="capture-card__title">${escapeHtml(capture.title)}</h2>
          <p class="capture-card__insight">${escapeHtml(capture.insight)}</p>
        </div>
      </a>
    </article>
  `;
}

function orderWithPins(
  captures: CaptureRecord[],
  pinnedSlugs: string[],
): CaptureRecord[] {
  const pinSet = new Set(pinnedSlugs);
  const sorted = sortCaptures(captures);
  const pinned = sorted.filter((c) => pinSet.has(c.slug));
  const rest = sorted.filter((c) => !pinSet.has(c.slug));
  const bySlug = new Map(sorted.map((c) => [c.slug, c]));
  const pinnedOrdered = pinnedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((c): c is CaptureRecord => Boolean(c));
  const pinnedExtra = pinned.filter((c) => !pinnedSlugs.includes(c.slug));
  return [...pinnedOrdered, ...pinnedExtra, ...rest];
}

export function renderArchive(
  index: SiteIndex,
  pinnedSlugs: string[],
  tab: ArchiveTab,
  savedCards: SavedCard[],
): string {
  const pinSet = new Set(pinnedSlugs);
  const scoped =
    tab === "pin"
      ? index.captures.filter((capture) => pinSet.has(capture.slug))
      : index.captures;
  const filtered = orderWithPins(scoped, pinnedSlugs);

  if (index.captures.length === 0) {
    return `
      <section class="state-panel state-panel--soft" aria-live="polite">
        <h1 class="state-panel__title">Archive is empty</h1>
        <p class="state-panel__text">이 번들에 캡처가 없습니다.</p>
      </section>
    `;
  }

  return `
    <section class="gallery archive">
      <header class="gallery__header archive__header">
        <div>
          <h1 class="gallery__title">Graphic Library</h1>
          <p class="gallery__lede">모든 마케팅 비주얼의 출발점이 되는 그래픽 라이브러리입니다. 브랜드 톤에 맞춰 선별한 에셋을 <span class="gallery__nowrap">형태·색·질감</span> 기준으로 탐색하고, Online Marketing Studio에서 채널별 규격에 맞는 카드로 바로 완성할 수 있습니다.</p>
          <p class="gallery__meta">${
            tab === "saved"
              ? `Saved ${savedCards.length}`
              : `Target ${escapeHtml(index.target)} · ${filtered.length} · ${pinnedSlugs.length} pinned`
          }</p>
        </div>
      </header>

      <div class="archive-tabs" role="tablist" aria-label="Archive lists">
        <span class="archive-tabs__indicator" aria-hidden="true"></span>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-all" data-archive-tab="all" aria-selected="${tab === "all" ? "true" : "false"}">
          All <span class="archive-tab__count">${index.captures.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-pin" data-archive-tab="pin" aria-selected="${tab === "pin" ? "true" : "false"}">
          Pin <span class="archive-tab__count">${pinnedSlugs.length}</span>
        </button>
        <button type="button" class="archive-tab" role="tab" id="archive-tab-saved" data-archive-tab="saved" aria-selected="${tab === "saved" ? "true" : "false"}">
          Saved <span class="archive-tab__count">${savedCards.length}</span>
        </button>
      </div>

      <div class="gallery__results archive__results" aria-live="polite">
        ${
          tab === "saved"
            ? savedCards.length === 0
              ? `<section class="state-panel state-panel--tint">
                  <h2 class="state-panel__title">저장된 카드가 없습니다</h2>
                  <p class="state-panel__text">스튜디오에서 그래픽 라이브러리에 추가를 누르면 이 탭에 모입니다.</p>
                </section>`
              : `<div class="capture-grid">${savedCards.map((card) => renderSavedCard(card)).join("")}</div>`
            : filtered.length === 0
            ? `<section class="state-panel state-panel--tint">
                <h2 class="state-panel__title">${tab === "pin" ? "No pinned captures" : "No captures"}</h2>
                <p class="state-panel__text">${
                  tab === "pin"
                    ? "상세 화면에서 Pin을 누르면 이 탭에 모입니다."
                    : "공개된 그래픽 에셋이 없습니다."
                }</p>
              </section>`
            : `<div class="capture-grid">${filtered
                .map((capture) =>
                  renderCard(capture, pinnedSlugs.includes(capture.slug)),
                )
                .join("")}</div>`
        }
      </div>
    </section>
  `;
}

export function bindArchive(
  root: HTMLElement,
  callbacks: ArchiveCallbacks,
): void {
  root.querySelectorAll<HTMLButtonElement>("[data-archive-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.dataset.archiveTab;
      if (next === "all" || next === "pin" || next === "saved") callbacks.onTabChange(next);
    });
  });

  syncTabIndicator(root);
  requestAnimationFrame(() => layoutMasonry(root));

  root.querySelectorAll<HTMLImageElement>(".capture-card__media").forEach((image) => {
    image.addEventListener("load", () => layoutMasonry(root), { once: true });
  });

  const observer = new ResizeObserver(() => layoutMasonry(root));
  const grid = root.querySelector<HTMLElement>(".capture-grid");
  if (grid) observer.observe(grid);
}
