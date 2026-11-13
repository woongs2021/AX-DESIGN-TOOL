/** Centered confirm dialog and a short toast. Both mount on document.body. */

let toastTimer = 0;

export function confirmProceed(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const backdrop = document.createElement("div");
    backdrop.className = "confirm-backdrop";
    backdrop.innerHTML = `
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-message">
        <p class="confirm-dialog__message" id="confirm-message"></p>
        <div class="confirm-dialog__actions">
          <button type="button" class="button button--secondary" data-confirm="cancel">취소</button>
          <button type="button" class="button" data-confirm="ok">진행</button>
        </div>
      </div>
    `;
    const text = backdrop.querySelector<HTMLElement>("#confirm-message");
    if (text) text.textContent = message;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      document.removeEventListener("keydown", onKey);
      backdrop.remove();
      previous?.focus();
      resolve(ok);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish(false);
      }
    };
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) finish(false);
    });
    backdrop.querySelector("[data-confirm='cancel']")?.addEventListener("click", () => finish(false));
    backdrop.querySelector("[data-confirm='ok']")?.addEventListener("click", () => finish(true));
    document.addEventListener("keydown", onKey);
    document.body.append(backdrop);
    backdrop.querySelector<HTMLButtonElement>("[data-confirm='ok']")?.focus();
  });
}

export const FIGMA_PAGE_URL_KEY = "ax-figma-page-url";

/** `onGenerate` resolves true when the card was placed and the dialog should close. */
export function openFigmaMcpDialog(onGenerate: (pageUrl: string) => Promise<boolean>): void {
  if (document.querySelector(".mcp-dialog")) return;
  const backdrop = document.createElement("div");
  backdrop.className = "confirm-backdrop";
  backdrop.innerHTML = `
      <form class="confirm-dialog mcp-dialog" role="dialog" aria-modal="true" aria-labelledby="mcp-dialog-title" novalidate>
        <div class="mcp-dialog__head">
          <h2 class="mcp-dialog__title" id="mcp-dialog-title">Figma MCP 연결</h2>
          <button type="button" class="studio__zoom-btn" data-mcp="close" aria-label="닫기"><svg class="studio__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg></button>
        </div>
        <label class="mcp-dialog__field">
          <span>Figma 페이지</span>
          <input class="studio__control" type="url" name="figma-url" placeholder="https://www.figma.com/design/..." spellcheck="false" autocomplete="off" />
        </label>
        <p class="mcp-dialog__hint">Figma 데스크톱에서 AX Design Tool 플러그인을 실행해 두면, 이 카드를 그 페이지에 넣습니다.</p>
        <div class="confirm-dialog__actions">
          <button type="submit" class="button">생성</button>
        </div>
      </form>
  `;
  const form = backdrop.querySelector<HTMLFormElement>("form");
  const input = backdrop.querySelector<HTMLInputElement>("input");
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  if (input) {
    try {
      input.value = localStorage.getItem(FIGMA_PAGE_URL_KEY) ?? "";
    } catch {
      input.value = "";
    }
  }
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener("keydown", onKey);
    backdrop.remove();
    previous?.focus();
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  backdrop.querySelector("[data-mcp='close']")?.addEventListener("click", close);
  let pending = false;
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (pending) return;
    const pageUrl = input?.value.trim() ?? "";
    if (!pageUrl) {
      showToast("Figma 페이지 주소를 넣어 주세요.");
      input?.focus();
      return;
    }
    const submit = form.querySelector<HTMLButtonElement>("button[type='submit']");
    pending = true;
    if (submit) {
      submit.disabled = true;
      submit.textContent = "생성하는 중";
    }
    void onGenerate(pageUrl)
      .then((done) => {
        if (done) close();
      })
      .catch(() => {
        showToast("카드를 Figma에 넣지 못했습니다.");
      })
      .finally(() => {
        pending = false;
        if (!submit?.isConnected) return;
        submit.disabled = false;
        submit.textContent = "생성";
      });
  });
  document.addEventListener("keydown", onKey);
  document.body.append(backdrop);
  input?.focus();
}

export function showToast(message: string): void {
  document.querySelector(".toast")?.remove();
  window.clearTimeout(toastTimer);
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.append(toast);
  toastTimer = window.setTimeout(() => toast.remove(), 2400);
}
