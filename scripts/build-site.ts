import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { GITHUB_PAGES_MAX_BYTES, GIT_MAX_FILE_BYTES } from "../src/shared/limits.ts";
import { PRESENTATION_STATIC_DIR, parsePresentationFile } from "../src/shared/presentation-files.ts";
import { stableStringify } from "../src/shared/stable-json.ts";
import type { SiteIndex } from "../src/shared/index-types.ts";

function parseTarget(argv: string[]): "internal" | "public" {
  for (const arg of argv) {
    if (arg.startsWith("--target=")) {
      const value = arg.slice("--target=".length);
      if (value === "internal" || value === "public") return value;
    }
  }
  const idx = argv.indexOf("--target");
  const value = idx >= 0 ? argv[idx + 1] : undefined;
  if (value === "internal" || value === "public") return value;
  console.error("Usage: npm run build:site -- --target=internal|public");
  process.exit(2);
}

const target = parseTarget(process.argv.slice(2));

function run(command: string, args: string[], env: NodeJS.ProcessEnv = {}): void {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`\n==> Building index (${target})`);
run("npm", ["run", "build", "--", `--target=${target}`]);

console.log(`\n==> Building UI with DATA_TARGET=${target}`);
run("npm", ["run", "build:ui"], { DATA_TARGET: target });

/** Copies the page-folder files the default deck uses next to the app, where presentationFileUrl looks off localhost. Returns their bytes. */
function copyPresentationMedia(appDir: string): number {
  const root = join("presentation", "project 1", "pages");
  const folders = new Map<string, string>();
  for (const name of existsSync(root) ? readdirSync(root) : []) {
    const meta = join(root, name, "page.json");
    if (!existsSync(meta)) continue;
    const id = (JSON.parse(readFileSync(meta, "utf8")) as { id?: unknown }).id;
    if (typeof id === "string") folders.set(id, join(root, name));
  }
  const deck = JSON.parse(readFileSync(join("src", "shared", "presentation-defaults.json"), "utf8")) as {
    pages?: { state?: { layers?: { src?: unknown }[]; background?: { file?: unknown } } }[];
  };
  const srcs = new Set<string>();
  for (const page of deck.pages ?? []) {
    for (const layer of page.state?.layers ?? []) if (typeof layer.src === "string") srcs.add(layer.src);
    if (typeof page.state?.background?.file === "string") srcs.add(page.state.background.file);
  }
  let bytes = 0;
  for (const src of srcs) {
    const file = parsePresentationFile(src);
    if (!file) continue;
    const folder = folders.get(file.pageId);
    const from = folder ? join(folder, file.name) : "";
    if (!from || !existsSync(from)) {
      console.warn(`WARN: ${src} is on a default page but missing from its page folder`);
      continue;
    }
    const to = join(appDir, PRESENTATION_STATIC_DIR, file.pageId, file.name.normalize("NFC"));
    mkdirSync(dirname(to), { recursive: true });
    copyFileSync(from, to);
    bytes += statSync(to).size;
  }
  return bytes;
}

console.log("\n==> Copying presentation page files the default deck uses");
const presentationMediaBytes = copyPresentationMedia("dist/app");

const indexPath = join("dist/app/data/index.json");
if (!existsSync(indexPath)) {
  console.error(`FAIL: ${indexPath} missing after site build`);
  process.exit(1);
}

const index = JSON.parse(readFileSync(indexPath, "utf8")) as SiteIndex;
const reportPath = join("reports", `${target}-build-report.json`);
const report = existsSync(reportPath)
  ? (JSON.parse(readFileSync(reportPath, "utf8")) as {
      assetBytesCopied: number;
      bundleBytes?: number;
      oversizeFiles: { path: string; bytes: number }[];
      capturesIncluded: number;
      capturesTotal: number;
    })
  : null;

const bundleBytes = (report?.bundleBytes ?? report?.assetBytesCopied ?? 0) + presentationMediaBytes;

if (report && report.oversizeFiles.length > 0) {
  console.error("FAIL: oversize files above Git 100MB limit:");
  for (const file of report.oversizeFiles) {
    console.error(`  ${file.path} (${file.bytes})`);
  }
  process.exit(1);
}

if (report && bundleBytes > GITHUB_PAGES_MAX_BYTES) {
  console.error(
    `FAIL: bundle bytes ${bundleBytes} exceed GitHub Pages ${GITHUB_PAGES_MAX_BYTES}`,
  );
  process.exit(1);
}

mkdirSync("reports", { recursive: true });
const inventory = {
  target,
  appDir: "dist/app",
  capturesInBundle: index.captures.length,
  collectionsInBundle: index.collections.length,
  wikiPagesInBundle: index.wiki.pages.length,
  assetBytesCopied: report?.assetBytesCopied ?? null,
  bundleBytes: report ? bundleBytes : null,
  githubPagesMaxBytes: GITHUB_PAGES_MAX_BYTES,
  githubPagesRemainingBytes: report
    ? GITHUB_PAGES_MAX_BYTES - bundleBytes
    : null,
  gitMaxFileBytes: GIT_MAX_FILE_BYTES,
  oversizeFiles: report?.oversizeFiles ?? [],
  builtAtNote:
    "No timestamp embedded in site JSON. Inventory is for the human deploying this run.",
};
writeFileSync(
  join("reports", `${target}-site-inventory.json`),
  stableStringify(inventory),
);

console.log(`\nOK: site ready in dist/app for target=${target}`);
console.log(`captures: ${index.captures.length}`);
if (report) {
  console.log(`asset bytes: ${report.assetBytesCopied}`);
  console.log(`presentation media bytes: ${presentationMediaBytes}`);
  console.log(`bundle bytes: ${bundleBytes}`);
  console.log(
    `GitHub Pages remaining: ${GITHUB_PAGES_MAX_BYTES - bundleBytes}`,
  );
}
console.log("Deploy manually — see docs/deploy.md. No CI/watcher deploy is configured.");
