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

/** The web app has no Figma MCP bridge yet, so 생성 always reports a missing connection. */
export function openFigmaMcpDialog(): void {
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
        <div class="confirm-dialog__actions">
          <button type="submit" class="button">생성</button>
        </div>
      </form>
  `;
  const form = backdrop.querySelector<HTMLFormElement>("form");
  const input = backdrop.querySelector<HTMLInputElement>("input");
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const close = () => {
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
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input?.value.trim()) {
      showToast("Figma 페이지 주소를 넣어 주세요.");
      input?.focus();
      return;
    }
    showToast("피그마 MCP 연동이 되어 있지 않습니다. 다시 연결한 뒤 생성해 주세요.");
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
