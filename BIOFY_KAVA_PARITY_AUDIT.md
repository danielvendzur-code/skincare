# BIOFY — Kava parity audit

QA_STATUS: PASS — GitHub Actions 2026-08-28 18:44 UTC

Date: 2026-08-28  
Branch: `agent/skincare-biofy-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main (`dbe6b5c40ab9e05c6707ab888963b7614029ceea`) and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

The pre-change BIOFY route was not a storefront. It reused the family-wide owner-sales presentation, one hero image and the generic widget shell. The advisor's result was selected with `next.join('').length % products.length`, which made the apparent recommendation unrelated to product compatibility. The first BIOFY question also exposed `Telo` and `Darčekové balenie` despite the five-product baseline containing no body or gift result.

The existing catalog/assets were usable: a local BIOFY logo, local hero and five local product images already existed. The correct strategy was therefore to fix information architecture, scoring, storefront composition and chat behavior rather than fabricate new products or imagery.

## 2. Implemented storefront

`/ukazka/biofy` now uses a BIOFY-specific storefront instead of the owner-sales page:

- compact BIOFY brand header,
- desktop category navigation,
- accessible mobile navigation,
- product-led editorial hero,
- explicit `Pleť` category with three real product cards,
- explicit `Vlasy` category with two real product cards,
- official external product links,
- current captured official prices plus regular prices,
- advisor launcher and in-page advisor/chat CTAs,
- separate visual language for face and hair sections,
- local images only.

The palette intentionally avoids a generic all-green eco template: warm mineral/cream surfaces, dark botanical green and a restrained terracotta accent create clearer editorial hierarchy while preserving the BIOFY logo and product imagery.

## 3. Catalog and claims

Baseline catalog is limited to these verified products:

1. Hydratačný krém na suchú a citlivú pleť 60 ml
2. Výživný krém na normálnu a zmiešanú pleť 60 ml
3. Konopný krém na suchú a problematickú pleť 50 ml
4. Vlasové tonikum s rozmarínom 100 ml
5. Ošetrujúci olejček na vlasy — 9 vzácnych olejov 50 ml

The official rosemary-tonic URL/name includes a hair-growth phrase. The demo deliberately uses a neutral display name and does not promise growth, stop hair loss, diagnose/treat skin conditions, or use unsupported dermatological/clean-beauty absolutes. Source decisions are documented in `src/brands/biofy/SOURCES.md`.

## 4. Advisor architecture

BIOFY is moved toward `src/brands/biofy/`:

- `config.js` — catalog, questions, storefront-safe copy and brand adapter,
- `scoring.js` — pure deterministic ranking,
- `storefront.jsx` — BIOFY page shell,
- `theme.css` — BIOFY-only design system,
- `SOURCES.md` — source and claim log.

The advisor uses a four-step flow. Step 1 is a hard category gate with only `Pleť` and `Vlasy`; body/gift were removed rather than inventing results.

Scoring dimensions and weights:

| Dimension | Weight | Behavior |
|---|---:|---|
| area | hard constraint | candidates are filtered before any scoring |
| skin/area compatibility | 12 | dry/sensitive, normal/mixed, dry/problematic, scalp, lengths |
| role | 10 | hydration, nourishment, hemp-care, tonic, conditioning |
| format | 7 | cream, tonic, oil |
| texture | 5 | light, rich |
| routine simplicity | 3 | simple routine preference |

Ties are deterministic and resolved by catalog order. The alternative is selected from the same already-filtered category. Result reasoning is generated from matched dimensions rather than a generic static sentence.

Hard invariant: choosing `Pleť` can only rank three face products; choosing `Vlasy` can only rank the two hair products. There is no code path where a cross-category product can become either the primary result or its alternative.

## 5. Chat changes

The client now sends bounded conversation history to the existing API instead of only the latest message. Chat history remains available while switching between Chat and Výber starostlivosti inside an open widget.

BIOFY deterministic fallback explicitly handles:

- Hydratačný vs Výživný krém,
- Hydratačný vs Konopný krém,
- Výživný vs Konopný krém,
- dry/sensitive vs normal/mixed face selection,
- Konopný krém,
- Vlasové tonikum vs Ošetrujúci olejček,
- Pleť vs Vlasy,
- generic face and hair questions.

The API prompt adds BIOFY-specific constraints against hair-growth guarantees, medical-treatment copy and category mixing. Existing model configurability, timeout, no-store response and bounded history are preserved.

## 6. Widget reliability fixes

Shared shell changes are intentionally small and family-compatible:

- teaser close button is now functional,
- chat history is lifted so mode switching does not erase the conversation,
- request payload uses the API's supported `messages` history format,
- input is bounded to 700 characters,
- advisor click transition is guarded against double selection,
- pending advisor timer is cleaned up on unmount,
- Escape closes the dialog,
- focus remains trapped inside the open dialog,
- close restores prior focus when possible,
- body scroll lock is removed during cleanup,
- Reset clears both advisor state and chat history.

## 7. Test coverage

`tests/biofy.spec.js` adds BIOFY-specific gates for:

- explicit scoring contract and weights,
- deterministic repeated recommendations,
- expected recommendation for all five baseline products,
- exhaustive traversal of every reachable advisor path (128 combinations) with same-category result and alternative assertions,
- desktop storefront/category separation,
- local image loading,
- external product CTAs,
- mobile navigation at 390×844 and 360×800,
- horizontal overflow,
- Chat history preservation,
- required deterministic chat comparisons,
- Back,
- Reset,
- Escape,
- focus containment,
- mobile/desktop advisor no-scroll at 1440×900, 390×844 and 360×800,
- invalid API brand/message handling.

`tests/family.spec.js` is updated only where the BIOFY storefront legitimately differs from the legacy owner page and where the first BIOFY advisor step intentionally has two category choices.

## 8. Automated QA and screenshots

The branch adds `.github/workflows/biofy-kava-parity-qa.yml`. On a non-`[skip ci]` push it performs:

1. frozen dependency install,
2. Playwright Chromium install,
3. `pnpm build`,
4. full `pnpm test` family + BIOFY suite,
5. Vite preview,
6. screenshot capture at 1440×900, 390×844 and 360×800,
7. console/page error and failed-request checks during capture,
8. local image load checks,
9. QA board generation,
10. commit of the refreshed BIOFY screenshots and this audit's PASS marker only after all gates pass.

Until that workflow succeeds this document intentionally remains `QA_STATUS: PASS — GitHub Actions 2026-08-28 18:44 UTC`; no unexecuted build or test is represented as passing.

## 9. Peer review — `agent/skincare-anemone-kava-parity`

At review time the ANEMONE branch still pointed to the shared baseline commit `dbc800da2f9b25ec959e4044bf20056dde7c51fd`; no ANEMONE agent implementation or pull request was present yet. Concrete blockers visible in that baseline are therefore:

1. ANEMONE still uses the generic owner-sales page rather than a brand storefront.
2. ANEMONE inherits the same pseudo-scoring-by-string-length advisor logic from the shared baseline.
3. Its first question mixes product roles (`Pleťová voda`, `Pleťový olej`, `Balzam`, `Vlasy`) while later questions are generic skin/routine questions, so answer semantics are not consistently tied to product traits.
4. ANEMONE has only one hair product in the five-product baseline, so any expanded hair questions must avoid suggesting non-existent alternatives.
5. The peer branch should keep its brand code modular to avoid competing edits to `src/main.jsx`, `src/styles.css` and `src/brands.js` during integration.

No review comment was posted because there was no PR and no branch delta to comment on. These findings should be re-run once the ANEMONE agent publishes code.

## 10. Integration notes

BIOFY is registered as an override of the legacy `brands.js` entry in `src/main.jsx`, which keeps all other routes intact while allowing the brand to move into its own module. Shared edits are limited to widget state/reliability and the conditional storefront adapter. This keeps later cherry-pick/integration conflicts materially smaller than rewriting the full family registry or CSS architecture in one brand branch.
