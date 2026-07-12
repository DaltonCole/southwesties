# Data Files

All site content is driven by the JSON files in this directory. Edit them to add events, update the FAQ, or enable the homepage carousel. `pastEvents.js` is computed automatically — do not edit it.

---

## events.json

An array of event objects. Events are split automatically at build time: dates on or after today appear on the Upcoming Events page; dates before today appear on the Past Events page. Each event also gets its own permalink at `/events/YYYY-MM-DD/`.

### Regular event (Thursday social dance)

```json
{
  "title": "Thursday WCS Social Dance",
  "date": "2026-09-18",
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

| Field | Required | Description |
|---|---|---|
| `title` | yes | Displayed as the event heading |
| `date` | yes | ISO date string (`YYYY-MM-DD`). Used for sorting and the event's URL |
| `time` | no | Start time shown below the location (e.g. `"7:00 PM"`) |
| `location` | yes | Venue name |
| `mapsUrl` | no | Google Maps URL; wraps the location name in a link |
| `address` | no | Street address shown after the venue name |
| `description` | yes | Array of strings — each becomes a paragraph |
| `instagramUrl` | no | URL of an Instagram post; shows an embedded post on the card |
| `image` | no | Path to a locally hosted image (e.g. `/assets/images/events/2026-09-18.jpg`); shown on the card |
| `gallery` | no | Array of image paths shown as a photo grid on the Past Events page (e.g. `["/assets/images/events/gallery/2026-09-18/photo1.jpg"]`) |

### Special event (multi-day with schedule)

Add `endDate` and `schedule` to turn a regular event into a special event card with a full schedule table.

```json
{
  "title": "Lizzy Spann Workshop Weekend",
  "date": "2026-07-30",
  "endDate": "2026-08-02",
  "location": "Lloyd Shaw Dance Center",
  "mapsUrl": "https://maps.google.com/?q=Lloyd+Shaw+Dance+Center,+5506+Coal+Ave+SE,+Albuquerque,+NM",
  "address": "5506 Coal Ave SE, Albuquerque, NM 87108",
  "image": "/assets/images/events/sw-july-event.jpg",
  "description": [
    "Join us for a special workshop weekend with guest instructor Lizzy Spann!"
  ],
  "pricing": [
    "Thursday social dance — $3 (returning dancers); free for first-timers.",
    "Saturday workshops — $20 each or $50 for all three."
  ],
  "pricingNote": "* A small surcharge will be added to Venmo transactions.",
  "schedule": [
    {
      "label": "Saturday, August 1",
      "sessions": [
        {
          "time": "12:00–1:00 PM",
          "title": "Workshop 1 with Lizzy Spann",
          "description": "Lloyd Shaw Dance Center."
        },
        {
          "time": "5:30–7:30 PM",
          "title": "Guided Practice",
          "description": "RSVP required — limit 30.",
          "registrationUrl": "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform",
          "registrationLabel": "RSVP for Guided Practice"
        }
      ]
    }
  ]
}
```

Additional fields beyond the regular event:

| Field | Required | Description |
|---|---|---|
| `endDate` | no | ISO date string; if set, the date displays as a range (e.g. "July 30 – August 2, 2026") and the event stays upcoming until this date passes |
| `pricing` | no | Array of strings shown as a bulleted pricing list |
| `pricingNote` | no | Single string shown below the pricing list (use for footnotes like surcharge notices) |
| `schedule` | no | Array of day objects (see below) |

#### Schedule day

| Field | Required | Description |
|---|---|---|
| `label` | yes | Day heading displayed above the sessions (e.g. `"Saturday, August 1"`) |
| `sessions` | yes | Array of session objects (see below) |

#### Schedule session

| Field | Required | Description |
|---|---|---|
| `time` | yes | Time string displayed in the left column (e.g. `"12:00–1:00 PM"`) |
| `title` | yes | Session name |
| `description` | no | Short description shown below the title |
| `registrationUrl` | no | URL of a registration form; renders a button below the description |
| `registrationLabel` | no | Custom button text (defaults to `"Register Now"` if omitted) |

---

## faq.json

An array of FAQ entries rendered as an accordion on the `/faq/` page.

```json
[
  {
    "question": "Do I need a partner to come?",
    "answer": "Nope! We rotate partners throughout the night."
  },
  {
    "question": "Where else can I dance WCS in New Mexico?",
    "answer": "Check out the wider New Mexico WCS community:",
    "links": [
      {
        "name": "ABQueer WCS (Albuquerque)",
        "url": "https://abqueerwcs.com/"
      },
      {
        "name": "Roadrunner Westies (Las Cruces)",
        "url": "https://www.instagram.com/roadrunner.westies"
      }
    ]
  }
]
```

| Field | Required | Description |
|---|---|---|
| `question` | yes | The accordion heading |
| `answer` | yes | The body text shown when expanded |
| `links` | no | Array of `{ "name", "url" }` objects rendered as a bulleted link list below the answer |

---

## carousel.json

An array of image paths for the homepage carousel. The carousel section is hidden when this array is empty.

```json
[
  "/assets/images/carousel/photo1.jpg",
  "/assets/images/carousel/photo2.jpg"
]
```

Add image files to `assets/images/carousel/` and list their paths here to enable the carousel.

---

## pastEvents.js

Computed automatically from `events.json` — do not edit. It filters and sorts events whose date has passed and provides them to the Past Events page with pagination.
