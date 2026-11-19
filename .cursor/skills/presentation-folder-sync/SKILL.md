---
name: presentation-folder-sync
description: >-
  Syncs images and videos attached to AX Presentation pages into
  presentation/project 1/pages after the current deck was saved as the
  built-in default. Use when the user asks to folder or sync those page
  resources, including 폴더 동기화해줘, 폴더 맞춰줘, 페이지 폴더 정리,
  리소스 폴더에 넣어줘, 프리뷰랑 폴더 맞춰, 이미지·영상 폴더 반영,
  sync the page folders, or the same request in other words. Do not use
  this for 일괄 이미지 정리.
---

# Presentation folder sync

The user designs preview pages, presses **전체 페이지 현상태 기본값으로 세팅**, then asks to folder the resources. **폴더 동기화해줘** is the usual wording. Run this for the same request in other words: 폴더 맞춰줘, 페이지 폴더 정리해줘, 리소스 폴더에 넣어줘, 프리뷰랑 폴더 맞춰줘, 이미지·영상 폴더에 반영해줘, or sync the page folders. The ask has to be about this presentation's page folders and the images or videos on those pages. Leave 일괄 이미지 정리 to the page-assets skill. Ignore git sync and folders outside `presentation/project 1/pages`. The saved default is the source. Do not sync from an unsaved preview.

Do not click 모드 전환, 초기화, 초기화로 세팅, 원, or either 기본값으로 세팅 button. Do not bump `DECK_VERSION`. Do not rewrite layer `src` or `presentation-defaults.json`. Do not commit. Do not add `image-pick/` or `image-pick-hermes/`.

## Stop first

1. Read `src/shared/presentation-defaults.json`. The page list is `pages`, in deck order. Each page has `id` and `state`.
2. If that file has no pages, stop and say the default deck is empty.
3. If a Presentation tab is open, read `localStorage['ax-presentation-deck']`. Compare page ids, in order, with the defaults file. If they differ, stop. Tell the user the preview changed after the default was saved, and to press **전체 페이지 현상태 기본값으로 세팅** again. Do not write localStorage.

## What is attached to a page

From that page's `state` only:

- An image layer `src` of `conf:…`, `pres:<pageId>/<file>`, `upload:…`, or a graphic-library slug (any other non-empty src).
- A background with `file` (`pres:…`).
- A background with an `id` and no `file`: `bg:<id>` when `mode` is `image`, `bgv:<id>` when `mode` is `video`.

Skip empty `src`. A file used on two pages is copied into both folders.

## Folders

Dev server must be `npm run dev` on localhost. `POST http://localhost:5173/__presentation-project` with every default page, in order, and no others:

```json
{ "pages": [{ "id": "<page id>", "copy": ["conf:…", "bg:…", "bgv:…"] }] }
```

`copy` is only `conf:`, `bg:`, and `bgv:` keys. The route copies those from `phase 2-resources`, names folders `page 1`, `page 2`, … by this list, and moves files with the page id. A page id missing from this list has its folder deleted. Say which folders were removed.

The route does not copy these. Copy them after it returns, into the folder whose `page.json` `id` is that page:

- `pres:<pageId>/<file>` — the file already in some page folder. Copy it into this page's folder when it is not already there. Do not pull a file from a folder that was just deleted unless it was copied first.
- A graphic-library slug — resolve `captures[].slug` in the index served at `http://localhost:5173/data/index.json`, then copy `dist/internal/` + `asset.path`. Copy the asset, not the thumb.
- `upload:` — the bytes are in IndexedDB `ax-studio-uploads` / store `images` on the open localhost origin. Write that blob into the page folder using the stored file name. If the database has no such id, report it and leave the layer alone.

Extensions: png, jpg, jpeg, webp, gif, svg, avif, mp4, webm, mov. Skip `page.json` and dotfiles. Do not rename or renumber folders by hand.

## placed

`page.json` is `{ "id": "<page id>", "placed": ["file.png"] }`. A name in `placed` is already on the page, so a reload must not lay it out again.

After the extra copies, `POST` the same route with only:

```json
{ "placed": [{ "id": "<page id>", "names": ["file.png"] }] }
```

Send names that exist in that folder and are attached to the page. Do not remove names already in `placed`. Do not add a file that is only sitting in the folder.

## Finish

Report each page as `page N` (`<id>`): files copied, files already present, `upload:` ids that were not in the browser, and folders removed. Leave the editor deck and the defaults file unchanged.
