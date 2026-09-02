# BELLCORIA × Kava parity audit

QA_STATUS: FINAL RERUN REQUIRED — Bellcoria previously passed its full branch QA; this commit reruns the current post-shared-SVG head and replaces the stale BIOFY peer review with the current implementation.

Date: 2026-08-30  
Branch: `agent/skincare-bellcoria-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main, `docs/KAVA_PARITY_BLUEPRINT.md` and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

Bellcoria originally reused the generic family owner page and the pseudo-random answer-length recommendation. That meant a body product could win a face flow for reasons unrelated to product compatibility. Chat also posted only the latest user message instead of the bounded history already supported by the API.

## 2. Storefront delivered

`/ukazka/bellcoria` now uses a dedicated Bellcoria storefront under `src/brands/bellcoria/` with:

- branded compact header,
- working desktop/mobile category navigation,
- editorial product-led hero,
- separate Čistenie section,
- separate Pleťové oleje a elixíry section,
- separate Telo section,
- five real product cards and official Bellcoria destinations,
- direct Chat/advisor entry points,
- local brand/product imagery,
- responsive mobile treatment.

The visual system uses warm paper/clay surfaces, restrained berry/aubergine accents and editorial typography. It avoids generic beige clean-beauty cards, gold-border fake luxury, decorative leaf overlays, AI glow, glassmorphism and emoji.

## 3. Catalog

The verified baseline remains:

1. Organický opunciový olej
2. Elixír proti vráskam s bakuchiolom
3. Pleťový čistiaci gél
4. Nočný elixír s vitamínom C a brusnicovým olejom
5. Telový olej s astaxantínom

Product imagery is local and product/source decisions are documented in the Bellcoria brand module. The advisor deals with verified product area, role, texture and routine rather than inventing medical efficacy.

## 4. Deterministic advisor

Bellcoria's scoring contract starts with a hard area gate:

- face / face-neck flows can only rank face products,
- body flow can only rank body products.

Role, texture and routine then rank only the eligible products, with stable catalog-order tie-breaking. `Telový olej s astaxantínom` therefore cannot become the primary result or alternative in a face flow.

Customer-facing result reasons are generated from matched choices and no longer expose terms such as `hard constraint`, score or internal product-role mechanics.

## 5. Chat/API

The UI sends bounded multi-turn history and deterministic Bellcoria behavior covers:

- facial oil vs elixir,
- cleansing gel vs oil/elixir,
- evening care,
- bakuchiol,
- face vs body,
- named-product follow-ups.

The provider-less fallback remains useful and the shared server API retains validation, bounded history, timeout, no-store behavior and environment-only Anthropic credentials. Medical/diagnostic requests are kept outside cosmetic treatment claims.

## 6. Interaction/accessibility

Bellcoria's branch QA exercises:

- teaser dismiss,
- Chat and typed multi-turn follow-up,
- Chat ↔ advisor switch,
- Back during flow and from result,
- Reset,
- Escape close,
- body scroll lock/unlock,
- focus containment and restoration,
- mobile navigation,
- reduced motion,
- no horizontal overflow,
- no internal advisor question scroll.

The mobile menu accessible name now reflects its real state (`Otvoriť menu` / `Zavrieť menu`). A prior focus-restoration defect after Escape was fixed at the component lifecycle level instead of weakening the assertion.

## 7. Automated QA

Bellcoria previously completed a full green workflow including:

- `pnpm build`,
- 18/18 Playwright tests,
- 1440×900,
- 390×844,
- 360×800,
- product/navigation checks,
- deterministic scoring constraints,
- multi-turn Chat,
- accessibility behavior,
- console/page-error collection,
- screenshot/QA-board generation.

During the cross-family final sweep, a malformed shared sparkle SVG path was found through browser console capture. It was repaired at source across the parity branches; this audit commit deliberately triggers a fresh Bellcoria current-head run so the previous green status is not reused blindly after a shared UI change.

## 8. Cross-review — BELLCORIA → BIOFY

The previous audit reviewed an early BIOFY commit and correctly found several blockers. Those blockers have since been addressed, so the cross-review has been repeated against current BIOFY.

Current BIOFY now has:

- a dedicated BIOFY storefront,
- clearly separated Pleť and Vlasy areas,
- hard category eligibility before scoring,
- deterministic product ranking and same-category alternatives,
- local assets and official product destinations,
- multi-turn Chat history,
- typed-message browser coverage,
- reduced-motion coverage,
- 1440×900 / 390×844 / 360×800 QA,
- horizontal-overflow and advisor no-scroll gates,
- provider-less multi-turn fallback behavior,
- a green QA history before the shared SVG repair.

Customer-facing BIOFY copy was also cleaned to remove internal `demo`, `deterministic`, `branch` language and misleading strike-through regular pricing. The stale BIOFY → ANEMONE review has now been replaced with a current review of ANEMONE's real implementation.

No remaining Bellcoria-blocking defect was found in the current BIOFY product/scoring module. BIOFY is undergoing its own final post-SVG current-head rerun.

## 9. Remaining release gate

Bellcoria is considered branch-ready only after the workflow triggered by this audit commit passes on the current post-shared-SVG head. Nothing from this branch is merged to `main` as part of this audit.
