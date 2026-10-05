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
