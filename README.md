# SouthWesties ABQ

Website for SouthWesties ABQ, a West Coast Swing dance organization in Albuquerque, NM. Built with [Eleventy](https://www.11ty.dev/) and deployed to both GitHub Pages and GitLab Pages.

## Local development

Requires [Docker](https://www.docker.com/).

```bash
docker compose up --build   # first run — builds the image and starts a dev server
docker compose up           # subsequent runs
```

The site is served at **http://localhost:8081** with live reload.

## Deployment

Built output is written to `docs/`. This happens automatically via CI on every push to `main`/`master`:

- **GitHub Actions** — commits the rebuilt `docs/` back to the repo; served via GitHub Pages. (Staging site)
- **GitLab CI** — publishes `docs/` as a Pages artifact; served via GitLab Pages. (Live site)

A nightly scheduled pipeline also runs the build at midnight Mountain Time to keep event dates current (upcoming vs. past is computed at build time).

## Updating content

All site content is driven by JSON files in `src/_data/`. See [`src/_data/README.md`](src/_data/README.md) for full documentation on every field and example objects for each file.

**Quick reference:**

| File | What it controls |
|---|---|
| `src/_data/events.json` | All events — regular Thursdays and special events with schedules |
| `src/_data/faq.json` | FAQ accordion on the `/faq/` page |
| `src/_data/carousel.json` | Homepage carousel (empty = carousel hidden) |

### Adding a Thursday dance

Add an object to `src/_data/events.json`:

```json
{
  "title": "Thursday WCS Social Dance",
  "date": "2026-10-02",
  "time": "7:00 PM",
  "location": "Lloyd Shaw Dance Center",
  "mapsUrl": "https://maps.google.com/?q=Lloyd+Shaw+Dance+Center,+5506+Coal+Ave+SE,+Albuquerque,+NM",
  "address": "5506 Coal Ave SE, Albuquerque, NM 87108",
  "description": [
    "Beginner lesson from 7:00–7:45 PM — no experience or partner needed!",
    "Social dance from 7:45–10:00 PM. All levels welcome."
  ]
}
```

### Adding a special event

Add `endDate`, `pricing`, and `schedule` fields. See [`src/_data/README.md`](src/_data/README.md) for the full schema including session-level registration links.

## Project structure

```
src/                  Eleventy source (Nunjucks templates)
  _data/              JSON content files
  _includes/          Shared partials (header, footer, event-card macro)
  _layouts/           HTML shell
  events/             Upcoming, past, and per-event detail pages
assets/               CSS, JS, images, documents (copied verbatim to docs/)
docs/                 Built output (committed for GitHub Pages)
.github/workflows/    GitHub Actions CI
.gitlab-ci.yml        GitLab CI
```

## Tech stack

- **[Eleventy 11ty](https://www.11ty.dev/)** — static site generator
- **Nunjucks** — templating language
- **[Luxon](https://moment.github.io/luxon/)** — date formatting
- **Docker** — local dev environment
