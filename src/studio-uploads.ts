/**
 * Images added with the theme list's + button. Browser-local (IndexedDB), not written to the vault.
 * Layers point at them as upload:<id>.
 */
import { UPLOAD_PREFIX } from "./shared/studio.ts";

export type StudioUpload = { id: string; name: string; createdAt: string; url: string };
type StoredUpload = { id: string; name: string; createdAt: string; blob: Blob };

const DB_NAME = "ax-studio-uploads";
const STORE = "images";

let uploads: StudioUpload[] = [];

export function getUploads(): StudioUpload[] {
  return uploads;
}

export function uploadSrc(upload: StudioUpload): string {
  return `${UPLOAD_PREFIX}${upload.id}`;
}

export function uploadBySrc(src: string): StudioUpload | undefined {
  return uploads.find((upload) => uploadSrc(upload) === src);
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("indexedDB open failed"));
  });
}

function run(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest): Promise<unknown> {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const request = action(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => {
          db.close();
          resolve(request.result);
        };
        request.onerror = () => {
          db.close();
          reject(request.error ?? new Error("indexedDB request failed"));
        };
      }),
  );
}

function toUpload(stored: StoredUpload): StudioUpload {
  return { id: stored.id, name: stored.name, createdAt: stored.createdAt, url: URL.createObjectURL(stored.blob) };
}

export async function loadUploads(): Promise<void> {
  try {
    const stored = ((await run("readonly", (store) => store.getAll())) as StoredUpload[] | undefined) ?? [];
    for (const upload of uploads) URL.revokeObjectURL(upload.url);
    uploads = stored.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)).map(toUpload);
  } catch {
    uploads = [];
  }
}

export async function addUpload(file: File): Promise<StudioUpload | null> {
  const stored: StoredUpload = {
    id: `upload-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    createdAt: new Date().toISOString(),
    blob: file,
  };
  try {
    await run("readwrite", (store) => store.put(stored));
    const upload = toUpload(stored);
    uploads = [...uploads, upload];
    return upload;
  } catch {
    return null;
  }
}

export async function removeUpload(id: string): Promise<boolean> {
  try {
    await run("readwrite", (store) => store.delete(id));
    const gone = uploads.find((upload) => upload.id === id);
    if (gone) URL.revokeObjectURL(gone.url);
    uploads = uploads.filter((upload) => upload.id !== id);
    return true;
  } catch {
    return false;
  }
}
