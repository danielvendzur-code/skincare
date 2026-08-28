# TWO COSMETICS × Kava parity audit

Date: 2026-08-28
Branch: `agent/skincare-two-kava-parity`
Reference: `danielvendzur-code/kava.chatbot.backend` current `main`

## Baseline diagnosis

1. `/ukazka/two` was an owner-facing generic presentation rather than a believable TWO storefront.
2. Advisor result selection used `next.join('').length % brand.products.length`, so a recommendation was unrelated to product compatibility.
3. Chat UI sent only the latest message even though the API already accepted history, so multi-turn comparison could not work reliably.
4. TWO used the shared generic four-question skin-type flow rather than product-role/routine dimensions appropriate to its baseline catalogue.
5. The baseline local TWO asset set contains extremely small images and `product-3.jpeg` / `product-4.jpeg` share the same blob SHA, while the baseline remote mapping also reused an unrelated image for the cleansing gel.
6. The invitation close control had no behavior.
7. Product metadata/prices were stale relative to the official catalogue checked on 2026-08-28.

## Implemented architecture

Active TWO-specific code moved to:

- `src/brands/two/config.js` — verified baseline catalogue, questions, tags, weighted scoring, hard exclusions, stable ranking, explainable reason, deterministic fallback.
- `src/brands/two/storefront.jsx` — brand-specific mini storefront.
- `src/brands/two/theme.css` — science + nature visual system and responsive/widget layer.
- `src/brands/two/SOURCES.md` — source/asset record.
- `api/two-chat.js` — validated history-aware API with deterministic catalogue fallback and strict medical boundary.
- `tests/two.spec.js` — TWO-specific behavioral contracts.
- `scripts/capture-two-qa.mjs` — required viewport screenshots and QA board generator.

## Recommendation model

Hard exclusions:

- explicit product role (`cleanse`, `serum`, `cream`) must match;
- when the user explicitly asks for a product with source-verified sensitive-skin suitability, products without that verified property are excluded. This is not a claim that excluded products are unsafe; it prevents inference from missing data.

Weighted signals:

- product role: 30
- hydration: 18
- simple routine: 10
- active-care preference: 18
- source-verified sensitivity: 22
- texture: 12
- AM/PM match: 8 (+2 when both are explicitly supported)

Ties are stable by catalogue order. The reason shown to the user is assembled only from matched traits plus a source-grounded product fact. The alternative is the next compatible ranked product; when the product role is open it preferentially differs in role.

## Medical scope

The UI/API do not copy therapeutic claims from product pages. Symptom/diagnosis/treatment language is intercepted before product matching and redirected to a qualified medical professional while keeping the assistant available for non-medical product comparison.

## Cross-review — `agent/skincare-bellcoria-kava-parity`

At review time the Bellcoria branch still pointed to the shared baseline commit `dbc800da2f9b25ec959e4044bf20056dde7c51fd`; there was no Bellcoria agent implementation ahead of it to review. Concrete baseline findings for that peer branch:

1. Bellcoria inherits the same string-length/modulo advisor defect and therefore needs deterministic trait scoring before completion.
2. Its page is still the generic owner-benefit shell, so it fails the blueprint's storefront-with-launcher acceptance test when the launcher is hidden.
3. Chat sends only the latest message, preventing reliable multi-turn product comparison even though the backend supports message history.
4. The shared teaser close control is dead.

A second cross-review is required once that peer branch has commits ahead of the baseline; this audit does not falsely mark an unavailable peer implementation as approved.

## QA contract

Required commands:

```bash
npm run build
npm test -- tests/family.spec.js tests/two.spec.js
npm run preview -- --host 127.0.0.1 &
QA_BASE_URL=http://127.0.0.1:4173 node scripts/capture-two-qa.mjs
```

Target viewports in the TWO suite/capture script: 1440×900, 390×844, 360×800.

Two visual passes must verify: storefront hierarchy without widget, product photography/crops, desktop density, mobile sequence, widget proportions, all four advisor question screens, result CTA/alternative visibility, horizontal overflow, text clipping and reduced motion.

## Known source limitation

The repository's baseline localized TWO imagery is not sufficient as primary high-resolution storefront photography. The implementation therefore uses documented product imagery with deterministic local fallbacks. A later integration pass may replace those remote display images with correctly localized full-resolution official assets without changing catalogue/scoring behavior.
