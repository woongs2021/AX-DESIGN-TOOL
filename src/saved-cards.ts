/**
 * Cards added from the studio. Thumbnails are PNG data URLs, so they live in
 * IndexedDB rather than localStorage. Not written to the vault.
 */
import { firstLayer, type StudioState } from "./shared/studio.ts";

export type SavedCard = {
  id: string;
  title: string;
  createdAt: string;
  state: StudioState;
  thumbnail: string;
};

const DB_NAME = "ax-design-studio";
const STORE = "cards";

let cards: SavedCard[] = [];

export function getSavedCards(): SavedCard[] {
  return cards;
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

function newCardId(): string {
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `saved-${time}-${rand}`;
}

export async function loadSavedCards(): Promise<void> {
  try {
    const db = await openDb();
    const stored = await new Promise<SavedCard[]>((resolve, reject) => {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
      request.onsuccess = () => resolve((request.result as SavedCard[]) ?? []);
      request.onerror = () => reject(request.error ?? new Error("indexedDB read failed"));
    });
    db.close();
    cards = stored.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch {
    cards = [];
  }
}

export async function addSavedCard(state: StudioState, thumbnail: string): Promise<SavedCard | null> {
  const card: SavedCard = {
    id: newCardId(),
    title: firstLayer(state, "title")?.text.trim() || "제목 없음",
    createdAt: new Date().toISOString(),
    state: structuredClone(state),
    thumbnail,
  };
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const request = db.transaction(STORE, "readwrite").objectStore(STORE).put(card);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error ?? new Error("indexedDB write failed"));
    });
    db.close();
    cards = [card, ...cards];
    return card;
  } catch {
    return null;
  }
}
