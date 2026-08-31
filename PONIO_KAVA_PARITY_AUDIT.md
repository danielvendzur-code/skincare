# PONIO × Kava parity audit

QA_STATUS: FINAL RERUN REQUIRED — this audit commit triggers the branch QA on the post-asset, post-category-link and post-SVG head.

Date: 2026-08-30  
Branch: `agent/skincare-ponio-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main, `docs/KAVA_PARITY_BLUEPRINT.md` and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

The original PONIO route reused the family-wide owner presentation and shared pseudo-random advisor. It did not expose PONIO's broader assortment as a believable storefront, chat sent only the latest message, care areas were not treated as hard eligibility constraints and several later-added product images depended on remote runtime URLs.

PONIO also needs materially different information architecture from the face-only brands because its relevant range spans face, hair, body and lip care.

## 2. Storefront delivered

`/ukazka/ponio` now renders a dedicated `PonioExperience` rather than a reskinned generic owner page. The experience includes:

- PONIO-specific header/navigation,
- product-led hero,
- explicit Pleť / Vlasy / Telo / Pery categories,
- real product cards and official destinations,
- working category navigation,
- Chat and Výber starostlivosti entry points,
- responsive desktop/mobile treatment,
- no fake testimonials, scarcity, ratings, stock numbers or unsupported efficacy copy.

The visual language is intentionally broader and more product/craft-led than MYLO. It avoids a generic green eco template, AI glow, glassmorphism and decorative emoji.

## 3. Catalog, links and assets

The branch uses eight verified PONIO products across the four care areas. The expanded set includes the original five baseline products plus verified additions needed to make face/body/lips flows honest rather than fabricate results.

All runtime product images are now local under `public/assets/brands/ponio/`, including the previously remote Vanilka & kokos, Fresh air and lip-pencil imagery. `tests/ponio.spec.js` rejects non-local product image URLs.

A final link sweep also found that the Pleť category still pointed at the stale path `collections/plet-pletove-kremy`. It was corrected to the current official PONIO collection `https://ponio.sk/collections/pletove-kremy`, and the exact destination is now protected by a regression assertion.

## 4. Advisor architecture

The old string-length/modulo result selector is gone. The PONIO advisor uses explicit catalog metadata and deterministic scoring.

The first choice — care area — is a hard eligibility gate:

- face answers rank only face products,
- hair answers rank only hair products,
- body answers rank only body products,
- lips answers rank only lip products.

Goal, format, routine/timing and verified compatibility then rank only candidates in the selected area. Ties remain deterministic. A result explanation is derived from matched customer choices and an alternative cannot cross the selected care-area boundary.

This prevents the highest-risk logical failure in a broad catalog: recommending a hair product to a face-care customer or vice versa.

## 5. Chat and API behavior

The PONIO experience preserves bounded conversation context for multi-turn questions and comparisons. Deterministic fallback behavior covers category and named-product questions without inventing products or medical outcomes.

The shared server API remains environment-based and keeps:

- `ANTHROPIC_API_KEY` server-side only,
- configurable `CHAT_MODEL`,
- bounded history,
- input validation,
- timeout/abort behavior,
- no-store responses,
- safe fallback when Anthropic is unavailable.

Customer-facing copy stays in cosmetic product-selection scope; it does not promise diagnosis, treatment or cure.

## 6. UX and QA coverage

`tests/ponio.spec.js` covers the PONIO-specific storefront and advisor, including:

- desktop 1440×900 behavior,
- mobile 390×844 and 360×800,
- category navigation and official product destinations,
- local image loading,
- no horizontal overflow,
- no internal question-screen scroll,
- launcher/teaser behavior,
- Chat and multi-turn payload history,
- advisor Back / Reset / result / product CTA,
- Escape, focus restoration and scroll lock,
- deterministic same-answer results,
- hard care-area constraints,
- the corrected Pleť category destination.

The branch previously had successful QA after localizing the expanded imagery. The current audit deliberately requires one final workflow run after the category-link and shared-SVG repairs so no stale PASS claim is used for release.

## 7. Cross-review — PONIO → TWO COSMETICS

Reviewed the current TWO branch rather than the old baseline. TWO now has:

- a real TWO-specific storefront,
- local primary product/hero assets,
- real official product destinations,
- deterministic role-based recommendation logic,
- hard product-role and verified sensitivity exclusions,
- bounded multi-turn Chat history,
- brand-specific Playwright coverage,
- 21/21 family + TWO functional tests on its latest pre-capture run.

The current TWO final sweep exposed one cross-family browser-console defect in the shared sparkle SVG path. This was not ignored or suppressed: the malformed path was identified at the source and replaced with valid SVG geometry. TWO's visual capture is being rerun on that corrected head.

No remaining PONIO-specific integration defect was found in TWO's brand module. The meaningful cross-review finding was therefore the shared SVG console error, which is exactly the type of cross-family defect the review ring is intended to catch.

## 8. Remaining release gate

PONIO is not marked complete until the current-head branch workflow finishes green after this audit commit. A green run must validate build, functional Playwright coverage and the required viewport/asset/overflow gates. Once green, PONIO is suitable for the final six-brand integration branch.
