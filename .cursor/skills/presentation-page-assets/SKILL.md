---
name: presentation-page-assets
description: >-
  Organizes AX Presentation images and videos into each page folder and keeps
  the control panel tied to that folder. Use when the user asks to organize
  images in bulk (일괄 이미지 정리), sort assets by page, or put pictures and
  videos into presentation/project 1/pages.
---

# Presentation page assets

Each presentation page has one folder. The control panel for the open page lists that folder only. Speecher and SVG stay available for layers that already point at `conf:` sources. They are not the page library.

```
presentation/project 1/pages/page 1/
  page.json
  …images and videos for that page
```

`page.json` is `{ "id": "<page id>", "placed": ["file.png"] }`. The dev server names folders `page 1`, `page 2`, … in deck order and moves files with the page id. Do not rename or renumber folders by hand.

## 일괄 이미지 정리

When the user asks to organize images in bulk, sort by page folder:

1. Read the live deck in `localStorage['ax-presentation-deck']` on localhost. Do not bump `DECK_VERSION`. Do not click 모드 전환, 초기화, or 원.
2. For each page, list image layers and the background. Copy each file that page uses into that page's folder. Match `conf:` ids to `phase 2-resources` (`[Speecher]`, `[SVG]`, `[Graphic_Resources] 2`). A file used on two pages is copied into both folders.
3. Add those filenames to that folder's `placed` array so a reload does not lay them out a second time. A file that is not on the page yet stays out of `placed`. The editor then inserts it like a type 3 frame.
4. Leave existing layer `src` values as they are unless the user asked to retarget them. `pres:<pageId>/<file>` is the folder source and works on localhost only.
5. Do not put page media back into the fixed Speecher or SVG control lists. Do not commit `image-pick/` or `dist/`. The `presentation/` folders are part of the repo.

Images: png, jpg, jpeg, webp, gif, svg, avif. Videos: mp4, webm, mov. Skip `page.json` and dotfiles.

## How a file gets into the folder

All three write the same page folder and show up under **이 페이지**:

- The + button in the control panel
- A file dropped on the edit canvas (also placed at the drop point; a video becomes the background)
- A file saved directly in the page folder (inserted like type 3 on the next load when it is not in `placed`)

This link runs only on localhost. The files themselves are what a later commit uploads.
