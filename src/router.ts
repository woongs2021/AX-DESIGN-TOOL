export type Route =
  | { name: "archive" }
  | { name: "capture"; slug: string }
  | { name: "studio"; theme: string | null; card: string | null }
  | { name: "history" }
  | { name: "notfound"; path: string };

const SLUG = "[a-z0-9]+(?:-[a-z0-9]+)*";

function splitHash(hash: string): { path: string; query: string } {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const queryAt = raw.indexOf("?");
  const pathPart = queryAt >= 0 ? raw.slice(0, queryAt) : raw;
  const query = queryAt >= 0 ? raw.slice(queryAt + 1) : "";
  const path = pathPart.startsWith("/") ? pathPart : `/${pathPart}`;
  const cleaned = path === "/" || path === "" ? "/" : path.replace(/\/+$/, "") || "/";
  return { path: cleaned, query };
}

function readSlugParam(query: string, key: string): string | null {
  const value = new URLSearchParams(query).get(key);
  if (!value || !new RegExp(`^${SLUG}$`).test(value)) return null;
  return value;
}

export function isLegacyStudioHash(hash: string): boolean {
  const { path } = splitHash(hash);
  return path === "/intake" || path === "/design-system" || path === "/stats";
}

export function parseHash(hash = window.location.hash): Route {
  const { path, query } = splitHash(hash);

  if (path === "/" || path === "/gallery") return { name: "archive" };
  if (path === "/history") return { name: "history" };
  if (path === "/studio" || isLegacyStudioHash(hash)) {
    return {
      name: "studio",
      theme: path === "/studio" ? readSlugParam(query, "theme") : null,
      card: path === "/studio" ? readSlugParam(query, "card") : null,
    };
  }

  const capture = path.match(new RegExp(`^/capture/(${SLUG})$`));
  if (capture) return { name: "capture", slug: capture[1]! };

  return { name: "notfound", path };
}

export function hrefFor(route: Route): string {
  switch (route.name) {
    case "archive":
      return "#/";
    case "capture":
      return `#/capture/${route.slug}`;
    case "studio": {
      const params = new URLSearchParams();
      if (route.card) params.set("card", route.card);
      else if (route.theme) params.set("theme", route.theme);
      const query = params.toString();
      return query ? `#/studio?${query}` : "#/studio";
    }
    case "history":
      return "#/history";
    case "notfound":
      return `#${route.path}`;
  }
}

export function onRouteChange(handler: (route: Route) => void): () => void {
  const listener = () => handler(parseHash());
  window.addEventListener("hashchange", listener);
  handler(parseHash());
  return () => window.removeEventListener("hashchange", listener);
}
