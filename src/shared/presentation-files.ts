/** Files kept under presentation/project 1/pages. The dev server serves them on localhost; a site build copies the ones the default deck uses. */
export const PRESENTATION_FILE_PREFIX = "pres:";
export const PRESENTATION_PROJECT_ROUTE = "/__presentation-project";
export const PRESENTATION_UPLOAD_ROUTE = "/__presentation-upload";
export const PRESENTATION_MEDIA_PREFIX = "/__presentation-media/";
/** Where a site build puts page files, relative to index.html. */
export const PRESENTATION_STATIC_DIR = "presentation-media";
/** The open presentation page replaced its control-panel files. */
export const PAGE_FILES_EVENT = "ax-page-files";
/** The open page's preview was clicked again, so its entrance plays once more. */
export const PAGE_ENTER_EVENT = "ax-page-enter";
/** Presentation mode started or ended, so the slide refits the screen. */
export const PRESENT_LAYOUT_EVENT = "ax-present-layout";

export function presentationFileSrc(pageId: string, name: string): string {
  return `${PRESENTATION_FILE_PREFIX}${pageId}/${name}`;
}

/** The page id and file name in a pres: source. Null when the source is not a page file. */
export function parsePresentationFile(src: string): { pageId: string; name: string } | null {
  if (!src.startsWith(PRESENTATION_FILE_PREFIX)) return null;
  const rest = src.slice(PRESENTATION_FILE_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash <= 0 || slash === rest.length - 1) return null;
  const pageId = rest.slice(0, slash);
  const name = rest.slice(slash + 1);
  if (name.includes("/") || name.includes("\\") || name.startsWith(".")) return null;
  return { pageId, name };
}

/** URL for a pres: source: the dev server on localhost, the copy beside a built site elsewhere. Null when the source is not a page file. */
export function presentationFileUrl(src: string): string | null {
  const file = parsePresentationFile(src);
  if (!file) return null;
  const pageId = encodeURIComponent(file.pageId);
  if (presentationProjectEnabled()) return `${PRESENTATION_MEDIA_PREFIX}${pageId}/${encodeURIComponent(file.name)}`;
  // Git on macOS stores names in NFC, and Pages matches paths byte for byte.
  return `${PRESENTATION_STATIC_DIR}/${pageId}/${encodeURIComponent(file.name.normalize("NFC"))}`;
}

export function presentationProjectEnabled(): boolean {
  return typeof location !== "undefined" && (location.hostname === "localhost" || location.hostname === "127.0.0.1");
}
