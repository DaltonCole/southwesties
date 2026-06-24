# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
docker compose up --build   # dev server at http://localhost:8081 with live reload (host 8081 → container 8080)
docker compose up           # start without rebuilding (after first build)
```

No test suite exists. Build output lands in `docs/` (for GitHub Pages).

## Architecture

[Eleventy (11ty)](https://www.11ty.dev/) static site for SouthWesties ABQ, a West Coast Swing dance organization in Albuquerque, NM. Runs in Docker; built output goes to `docs/`.

**Source layout:**
- `src/` — Nunjucks (`.njk`) templates; Eleventy input root
- `src/_layouts/base.njk` — single HTML shell (loads all CSS/JS, includes header/footer)
- `src/_includes/` — `header.njk` and `footer.njk` partials
- `src/_data/` — JSON data files consumed as template globals
- `assets/` — CSS, JS, images, documents; copied verbatim to `docs/`

**Data files drive content:**
- `src/_data/events.json` — event objects (`title`, `date` ISO string, `time`, `location`, `address`, `description[]`, optional `image`, optional `gallery[]`). Upcoming vs. past split at render time via `toMillis` filter.
- `src/_data/faq.json` — FAQ entries (`question`, `answer`, optional `links[]`)
- `src/_data/carousel.json` — ordered array of image paths for homepage carousel; currently empty (add paths to enable carousel)

**Custom Eleventy filters** (`.eleventy.js`):
- `date(format)` — formats ISO date strings with Luxon (default `"MMMM d, yyyy"`)
- `toMillis` — converts ISO date string or `"now"` to epoch ms; used to split upcoming/past events

**Pages:**
- `/` — Home: carousel (only renders if `carousel.json` has entries), hero, weekly info bar, feature cards, next-event highlight, WCS explainer
- `/about/` — Mission, what WCS is, Thursday schedule, contact
- `/events/` — Upcoming events (date ≥ now), first card gets `event-highlight` styling + "Next Up" badge
- `/events/past/` — Past events (date < now), newest first; supports `gallery[]` with lightbox
- `/faq/` — Accordion FAQ from `faq.json`
- `/conduct/` — Inline PDF embed + download link; PDF lives at `assets/documents/code-of-conduct.pdf`

**Design tokens** (`assets/css/main.css`):
- `--accent`: `#bf4e1e` (terracotta — primary CTA color)
- `--accent2`: `#1d8a7b` (turquoise — secondary/links)
- `--bg`: `#faf7f2` (warm cream), `--bg-alt`: `#f0ebe2`, `--bg-dark`: `#2b1a0f` (footer/info bar)
- Font: Nunito via Google Fonts

**Logo:** Place logo file at `assets/images/logo.png` (referenced in `src/_includes/header.njk`).

**Adding events:** Add an object to `src/_data/events.json` with at minimum `title`, `date`, `location`, and `description[]`. Optional: `image` (path under `assets/images/events/`) and `gallery[]` (paths under `assets/images/events/gallery/YYYY-MM-DD/`).

**Enabling the carousel:** Add image paths to `src/_data/carousel.json` (e.g. `["/assets/images/carousel/photo.jpg"]`). The carousel section is hidden when the array is empty.
