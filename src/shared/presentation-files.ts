/** Files kept under presentation/project 1/pages. The dev server is the only reader. */
export const PRESENTATION_FILE_PREFIX = "pres:";
export const PRESENTATION_PROJECT_ROUTE = "/__presentation-project";
export const PRESENTATION_UPLOAD_ROUTE = "/__presentation-upload";
export const PRESENTATION_MEDIA_PREFIX = "/__presentation-media/";
/** The open presentation page replaced its control-panel files. */
export const PAGE_FILES_EVENT = "ax-page-files";
/** The open page's preview was clicked again, so its entrance plays once more. */
export const PAGE_ENTER_EVENT = "ax-page-enter";
/** Presentation mode started or ended, so the slide refits the screen. */
export const PRESENT_LAYOUT_EVENT = "ax-present-layout";

export function presentationFileSrc(pageId: string, name: string): string {
  return `${PRESENTATION_FILE_PREFIX}${pageId}/${name}`;
}

/** Dev-server URL for a pres: source. Null when the source is not a page file. */
export function presentationFileUrl(src: string): string | null {
  if (!src.startsWith(PRESENTATION_FILE_PREFIX)) return null;
  const rest = src.slice(PRESENTATION_FILE_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash <= 0 || slash === rest.length - 1) return null;
  const pageId = rest.slice(0, slash);
  const name = rest.slice(slash + 1);
  if (name.includes("/") || name.includes("\\") || name.startsWith(".")) return null;
  return `${PRESENTATION_MEDIA_PREFIX}${encodeURIComponent(pageId)}/${encodeURIComponent(name)}`;
}

export function presentationProjectEnabled(): boolean {
  return location.hostname === "localhost" || location.hostname === "127.0.0.1";
}
