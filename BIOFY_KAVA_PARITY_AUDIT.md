# BIOFY × Kava parity audit

QA_STATUS: FINAL RERUN REQUIRED — previous BIOFY QA was green; this commit reruns it on the post-shared-SVG head and refreshes the required BIOFY → ANEMONE peer review.

Date: 2026-08-30  
Branch: `agent/skincare-biofy-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main, `docs/KAVA_PARITY_BLUEPRINT.md` and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

The original BIOFY route reused the generic family owner presentation and pseudo-random answer-length recommendation. It also exposed choices such as body/gift despite the baseline catalog having no honest result for those areas. Face and hair were not structurally isolated enough for a trustworthy recommendation flow.

## 2. Storefront delivered

`/ukazka/biofy` now uses a BIOFY-specific mini storefront with:

- compact branded header,
- explicit Pleť and Vlasy navigation,
- product-led hero,
- three face-care product cards,
- two hair-care product cards,
- working official product destinations,
- local images,
- Chat and advisor entry points,
- responsive mobile navigation,
- a restrained warm mineral/botanical visual system rather than a generic all-green eco template.

Customer-facing copy has been polished to remove internal terms such as `demo`, `deterministic`, `branch` and scoring mechanics. Earlier strike-through `regularPrice` presentation was also removed because a captured reference price should not visually imply a live promotion unless that promotion is verified at send time.

## 3. Catalog and claims

The verified baseline is limited to:

1. Hydratačný krém na suchú a citlivú pleť 60 ml
2. Výživný krém na normálnu a zmiešanú pleť 60 ml
3. Konopný krém na suchú a problematickú pleť 50 ml
4. Vlasové tonikum s rozmarínom 100 ml
5. Ošetrujúci olejček na vlasy — 9 vzácnych olejov 50 ml

The experience does not fabricate body/gift products and does not make hair-growth guarantees, medical treatment promises or unsupported dermatological claims. Source/claim decisions remain documented under the BIOFY brand module.

## 4. Advisor architecture

BIOFY is modularized under `src/brands/biofy/` with brand configuration, pure scoring logic, storefront, theme and source documentation.

The first advisor choice is a hard category gate:

- `Pleť` can only rank the three face products,
- `Vlasy` can only rank the two hair products.

Compatibility, goal/role, format, texture and routine preference rank only candidates that already passed the category gate. Ties are deterministic and the alternative remains in the same category.

The result reason is assembled from matched customer-facing dimensions instead of exposing implementation scores. The same answers always return the same result.

## 5. Chat/API

BIOFY Chat preserves bounded conversation history and supports comparisons such as:

- Hydratačný vs Výživný krém,
- Hydratačný vs Konopný krém,
- Výživný vs Konopný krém,
- face cream selection by skin feel,
- Vlasové tonikum vs Ošetrujúci olejček,
- Pleť vs Vlasy.

The server API retains environment-only Anthropic credentials, configurable model, validation, bounded history, timeout, no-store behavior and deterministic fallback. Hair-growth and medical-treatment claims remain explicitly outside allowed reply behavior.

## 6. Reliability/accessibility

The shared widget changes used by BIOFY include:

- functional teaser close,
- preserved Chat history during mode switching,
- bounded input/history,
- guarded advisor transitions,
- timer cleanup,
- Escape close,
- focus containment/restoration,
- body scroll lock cleanup,
- Reset for advisor and chat state.

The final cross-family sweep also corrected a malformed shared SVG path at source rather than suppressing its browser console error.

## 7. Test coverage

BIOFY-specific coverage includes:

- deterministic scoring contract,
- exhaustive reachable advisor combinations,
- same-category primary and alternative assertions,
- expected recommendations for the five baseline products,
- desktop 1440×900,
- mobile 390×844 and 360×800,
- category separation and navigation,
- local image loading,
- external product CTAs,
- horizontal overflow,
- no internal advisor question scroll,
- multi-turn Chat persistence,
- Back / Reset / Escape,
- focus containment,
- invalid API brand/message behavior.

The BIOFY workflow also captures viewport screenshots and checks console/page errors and failed asset requests before refreshing its QA artifacts.

## 8. Cross-review — BIOFY → ANEMONE

The old audit incorrectly described ANEMONE as still being on the shared baseline. That is no longer true. The current ANEMONE branch was reviewed after its dedicated implementation landed.

Current ANEMONE now has:

- a brand-specific storefront rather than the generic owner page,
- local logo, hero and five product images,
- working categories for kvetové vody, pleťový olej, pery and vlasy,
- official ANEMONE product links,
- a four-step advisor whose first choice is a hard product-role constraint,
- role-isolated result/alternative behavior,
- deterministic tie-breaking between the two kvetové vody,
- multi-turn Chat/API tests,
- mobile navigation,
- 1440×900, 390×844 and 360×800 brand QA,
- no-overflow / no-internal-question-scroll assertions,
- reduced-motion coverage.

Concrete issues caught during this current-head review cycle were not ignored:

1. ANEMONE browser QA originally generated two `/api/chat` 404s because it ran against a plain Vite dev server. The browser test now mocks the supported API contract while the server handler remains independently contract-tested.
2. The family suite still searched for the old generic `Otvoriť Chat` CTA after ANEMONE adopted the branded `Opýtať sa v chate` CTA. The family test now uses the actual branded control.
3. Customer-facing explanations that exposed `hard constraint`, scoring and `verified demo catalog` terminology were removed.
4. The shared malformed SVG path was corrected at source across parity branches.

No remaining BIOFY-blocking category/scoring defect was found in the current ANEMONE brand module. ANEMONE still has its own final current-head workflow/audit gate, handled on its branch.

## 9. Remaining release gate

BIOFY had a meaningful green QA baseline before the shared SVG repair. This audit update intentionally triggers one final workflow on the current head. Only a green current-head run is considered sufficient for final six-brand integration.
