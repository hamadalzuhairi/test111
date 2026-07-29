# Fonts to add here

The app works without these (system fallbacks in `tokens.css` cover it), but
for the intended look, download these open-license families and drop the
`.woff2` files directly in this folder — no subfolders, filenames must match
exactly:

| File | Family | Source |
|---|---|---|
| `Fraunces-Regular.woff2`, `Fraunces-SemiBold.woff2` | Fraunces | fonts.google.com/specimen/Fraunces (OFL) |
| `Inter-Regular.woff2`, `Inter-Medium.woff2`, `Inter-SemiBold.woff2` | Inter | fonts.google.com/specimen/Inter (OFL) |
| `IBMPlexMono-Regular.woff2`, `IBMPlexMono-Medium.woff2` | IBM Plex Mono | fonts.google.com/specimen/IBM+Plex+Mono (OFL) |
| `IBMPlexSansArabic-Regular.woff2`, `IBMPlexSansArabic-Medium.woff2`, `IBMPlexSansArabic-SemiBold.woff2` | IBM Plex Sans Arabic | fonts.google.com/specimen/IBM+Plex+Sans+Arabic (OFL) |

Google Fonts serves TTF/OTF by default — convert to woff2 with a tool such as
`fonttools varLib.instancer` + `woff2_compress`, or download pre-built woff2
from a mirror like fontsource (npm packages `@fontsource/fraunces`,
`@fontsource/inter`, `@fontsource/ibm-plex-mono`,
`@fontsource/ibm-plex-sans-arabic` each ship woff2 files you can copy
straight out of `node_modules`).

Never point `@font-face` at a Google Fonts CDN URL directly — the booth must
keep working with no network after the first load.
