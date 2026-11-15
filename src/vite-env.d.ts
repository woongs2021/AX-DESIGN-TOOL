/// <reference types="vite/client" />

interface ProgressiveBlurApi {
  writeText(el: Element | string, options?: { autoplay?: boolean; blur?: number; rise?: number; delay?: number; step?: number }): {
    finished: Promise<unknown>;
  };
  writeContent(
    parts: { text?: Element | string | null; rows?: ArrayLike<Element> },
    options?: { autoplay?: boolean; blur?: number; rise?: number; delay?: number; step?: number },
  ): { finished: Promise<unknown> };
  WRITE: { blur: number; rise: number };
}

interface Window {
  ProgressiveBlur?: ProgressiveBlurApi;
}
