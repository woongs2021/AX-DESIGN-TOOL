---
name: presentation-motion
description: >-
  Builds infographic and faux-3D motion graphics for AX Presentation pages
  (3840×2160 Slide). Use when the user asks for motion graphics, infographic
  animation, 3D motion, animated charts, or a moving background on a
  Presentation page.
---

# Presentation motion

Presentation pages are Slide canvases, 3840×2160. Motion is a short looping video or a still sequence the page can use as its background or as an image layer. The editor has no keyframe timeline. Do not add one unless the user asks.

Type 1 is a divider or the end page and has no light/dark version. Types 2 and 3 do. A motion clip must not force a type 1 page into a light or dark theme. On types 2 and 3, keep title and body readable on the page color after the clip is in place.

## Where the clip goes

- Type 1 and a type 3 full-bleed page: the clip is the page background video (`background.mode = "video"`), with the still frame as the image background.
- Type 2 and a type 3 page that keeps images in the center: the clip is an image layer, or a video the user drops on that layer. Do not cover the title.
- If the user already placed their own video, keep it and add motion only where they asked.

## Infographic

Draw with canvas 2D. One idea per clip: a bar that grows, a count that ticks, or two or three shapes that enter in order. 4 to 6 seconds, then loop. Flat fills from `rgbToHex` values already used on the page. No extra color literals in `src/`.

Frames stay 16:9. Prefer 1920×1080 when a 3840 encode is slow, and say which size was written.

## Faux 3D

Project boxes and planes in canvas 2D. Each face is a four-point fill, lighter on top and darker on the side. Rotate slowly around one axis. No WebGL, no new dependency. Keep the motion behind the type, not instead of the title.

## Encode

Use the Mediabunny path the Conference MP4 export already uses. Write the file under the presentation working files, then point the page at it. Do not commit `image-pick/` or `dist/`.
