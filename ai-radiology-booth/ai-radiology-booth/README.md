# AI in Radiology — Booth 5

A bilingual (English default / Arabic toggle) interactive kiosk app for a
hospital awareness campaign. Visitors read eight teaching cases before the
AI does, see where the AI is right, and see it get two of them wrong.

No backend, no database, no API keys — a static Vite + React + TypeScript
build that runs fully offline after the first load.

## Local development

```bash
npm install
npm run dev
```

Open the printed local URL. Hot-reload works as normal with Vite.

To type-check and produce a production build locally:

```bash
npm run build
npm run preview   # serves the dist/ build for a final check
```

## Deploying to Render

This repo includes `render.yaml`. In Render:

1. New → Static Site → connect this repo.
2. Render reads `render.yaml` automatically:
   - Build command: `npm ci && npm run build`
   - Publish directory: `dist`
   - `/* → /index.html` rewrite is already configured, so refreshing on any
     scroll position or a shared link won't 404.
3. Deploy. No environment variables are required.

The app makes **zero runtime network requests** after the first page load —
booth Wi-Fi can drop and the experience keeps working.

## Adding a 9th case

Everything about a case lives in `src/data/cases.ts` — no component code
needs to change. Copy an existing entry and edit it:

```ts
{
  id: "unique-slug",                 // stable id, used as the React key
  order: 9,                          // display order in the grid
  modality: { en: "X-ray", ar: "أشعة سينية" },
  imageKind: "wrist",                // one of: wrist | chest | head-ct | chest-ct | mammo | knee
  variant: 0,                        // 0 or 1 — just varies grain/texture, not anatomy
  bodyRegion: { en: "Wrist", ar: "الرسغ" },
  history: { en: "…one-line fictional vignette…", ar: "…" },

  expected: "region",                // "region" = something real is there to find
                                      // "none"   = correct answer is "I don't see anything"
                                      //            (use this for a false-positive teaching case)

  groundTruth: [{ x: 40, y: 40, width: 16, height: 12 }], // percent coords, 0-100,
                                                            // against ScanCanvas's 100x100 viewBox
  groundTruthLabel: { en: "…", ar: "…" },

  aiFindings: [                      // empty array [] = AI found nothing (a "miss" case)
    {
      x: 40, y: 40, width: 16, height: 12,
      label: { en: "Fracture", ar: "كسر" },
      confidence: 95,                // 0-100
    },
  ],
  aiOutcome: "correct",              // "correct" | "false_positive" | "miss"
  aiResponseSeconds: 0.6,

  radiologistReport: { en: "…the actual report line…", ar: "…" },
  doctorAddedNote: { en: "…what the image alone couldn't say…", ar: "…" },
  takeaway: { en: "…one sentence…", ar: "…" },
  difficulty: "easy",                // "easy" | "subtle" — only shown when aiOutcome is "correct";
                                      // false_positive/miss cases get their own grid tag automatically
}
```

Notes:
- Coordinates are percentages (0–100) of a square `viewBox="0 0 100 100"` —
  the same space `ScanCanvas` draws the illustrative anatomy in. Nudge
  values and reload to line a box up visually; there's no separate pixel
  math to do.
- Every case must include **both** `en` and `ar` for every bilingual field —
  there's no fallback language.
- To build a second false-positive or miss case, follow case 7
  (`knee-false-positive`) or case 8 (`chest-foreign-body-miss`) as templates.

## Adding a triage-queue row

Same idea in `src/data/triageQueue.ts` — add an object with `initialPosition`
(arrival order) and `aiPosition` (urgency-sorted order), 1-indexed.

## Swapping in real teaching images

`ScanCanvas.tsx` currently draws every case as a stylized, hand-built SVG
illustration — grayscale silhouettes with grain and vignette, not real
radiographs. That's a deliberate choice for a public booth with no licensed
patient imagery on hand: it removes every privacy and licensing risk while
still reading clearly as "a scan" at booth-viewing distance.

If you get institutional sign-off to use real teaching images instead:

1. Openly-licensed sources to consider:
   - **Radiopaedia** case images — each case states its own CC license; check
     per-image before reuse.
   - **Wikimedia Commons** — search "radiograph" / "CT scan"; filter to
     public-domain or CC-BY/CC-BY-SA images.
   - **NIH ChestX-ray14** — a public, de-identified chest X-ray research
     dataset (NIH Clinical Center).
   - **MIMIC-CXR** (PhysioNet) — de-identified chest X-rays; requires a
     credentialed PhysioNet account and a signed data use agreement.
2. Add files to `public/cases/` — suggested naming matches each case `id`,
   e.g. `public/cases/wrist-fracture-obvious.jpg`, sized around
   1000×1000px (square, to match the current 1:1 `viewBox`).
3. In `ScanCanvas.tsx`, replace the relevant `<AnatomyGraphic>` branch (or
   the whole component) with an `<image href="/cases/…jpg" />` inside the
   existing `<svg viewBox="0 0 100 100">`, keeping the grain/vignette/corner
   annotation layers as-is so the region-overlay math in `cases.ts` still
   lines up without changes.
4. **Before doing any of this:** confirm with your institution that the
   specific image carries no patient identifiers or burned-in PHI, and that
   its license permits this use. A booth is a public display — treat it with
   the same scrutiny as a publication figure, not a private teaching file.

## Adding your logos

Drop KSAU-HS / National Guard Health Affairs logo files into `public/` (e.g.
`public/logo-ksauhs.svg`) and reference them in `src/components/Header.tsx`
inside `.header__brand`, alongside the existing status dot and booth label.

## Fonts

See `public/fonts/README.md` — the app works with system fallbacks out of
the box, but for the intended look, add the listed woff2 files there before
building.

## Project structure

```
src/
  App.tsx                 Page shell, case-viewer modal state, scoring, idle reset
  config.ts                CAMPAIGN_NAME and QR_URL — the two values to edit per event
  i18n/                     en.ts / ar.ts copy dictionaries + LanguageContext
  data/                     cases.ts, triageQueue.ts, shared types.ts
  components/               one file per section (see below)
  styles/                   tokens.css (design system) + global/scan/components CSS
```

| Component | Role |
|---|---|
| `Header` | Sticky bar, EN/ع language toggle |
| `AttractHero` | Idle-loop signature visual + headline |
| `CaseGrid` | The 8 case cards |
| `CaseViewer` | The 4-step read-the-scan modal flow |
| `ScanCanvas` | Illustrative scan graphic + tap capture |
| `AIOverlay` | Animated AI/radiologist region boxes |
| `Scoreboard` | You / AI / Radiologist running tally |
| `TriageSim` | Queue-reordering demo |
| `CompareColumns` | AI-helps-with vs. radiologist-only |
| `AlertCards` | The six safety reminders |
| `FAQ` | Accordion |
| `Closing` | Takeaway line + QR code |
| `IdleReset` | 90s idle detection, 5s warning, resets the booth |

## A note on scope

This app makes a deliberate editorial choice, spelled out in the build
brief: it never claims AI outperforms radiologists. Two of the eight cases
exist specifically to show the AI getting it wrong (a confident false alarm
on a benign finding, and a miss outside its training scope), because that
honest limitation is the whole point of the booth's message.
