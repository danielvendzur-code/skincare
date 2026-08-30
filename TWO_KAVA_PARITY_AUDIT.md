# TWO COSMETICS × Kava parity audit

QA_STATUS: FINAL RERUN REQUIRED — functional suite 21/21 passed before the shared SVG console repair; this audit commit triggers the complete branch workflow again.

Date: 2026-08-30  
Branch: `agent/skincare-two-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main plus `docs/KAVA_PARITY_BLUEPRINT.md` and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

The original `/ukazka/two` was a generic owner presentation shared with the other skincare routes. Recommendation selection depended on the length of concatenated answers rather than product compatibility, chat did not preserve useful multi-turn history, the storefront lacked a real TWO product context and the first implementation depended on third-party/runtime image URLs.

Those are release blockers because an owner must see a believable TWO mini-store with a recommendation that can be explained and reproduced, not a reskinned demo shell.

## 2. Storefront delivered

The route now uses a TWO-specific storefront with:

- branded sticky header and working navigation,
- product-led hero rather than an owner-sales hero,
- real baseline products with official TWO destinations,
- serum, cream and cleansing hierarchy,
- routine/editorial content that explains product roles in normal customer language,
- direct Chat and Výber starostlivosti entry points,
- responsive desktop/mobile layout,
- no fake reviews, sales counters, scarcity, awards or efficacy percentages.

The visual direction is intentionally science + nature: high contrast typography, restrained editorial surfaces and product photography. It avoids generic pharma UI, purple/AI styling, glassmorphism and repetitive dashboard cards.

## 3. Catalog and local assets

Baseline products:

1. HA⁶ HYDRATATION BOOSTER SERUM
2. BAKUCHIOL 1 % ANTI-AGE SERUM
3. Hydratačný krém
4. Krém pre problematickú pleť
5. AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID

Primary product photography and the hero are now stored locally under `public/assets/brands/two/`. The earlier runtime dependencies on Lakrem, Makeup, Notino, Hebe and remote TWO image URLs were removed. `tests/two.spec.js` rejects non-local product image paths so this cannot silently regress.

Displayed prices are explicitly treated as captured storefront information rather than invented promotional pricing. Product CTAs continue to the verified official TWO product pages.

## 4. Advisor scoring

The pseudo-random modulo/string-length selector is gone. The advisor uses explicit product metadata and deterministic ranking.

Important rules:

- selected product role is a hard eligibility constraint,
- sensitive-skin compatibility is a hard exclusion when a product does not have that verified property,
- goal, texture and AM/PM routine then rank only eligible candidates,
- ties use stable catalog order,
- the result reason is assembled from matched customer choices,
- an alternative must remain logically eligible instead of simply selecting the first different product.

The weighting model prioritizes product role first, then verified goal/compatibility, texture and routine. Repeating the same answers returns the same product.

## 5. Chat/API behavior

The widget keeps bounded conversation history and sends the supported `messages` contract to `/api/chat`. TWO-specific fallback behavior covers named products, hydration, serum-vs-cream, bakuchiol, cleansing and AM/PM comparisons while staying inside cosmetic product-selection scope.

No API key is present in browser code or committed files. The shared server handler keeps environment-based `ANTHROPIC_API_KEY`, configurable `CHAT_MODEL`, bounded history, input validation, timeout, no-store responses and deterministic fallback behavior.

## 6. UX/accessibility gates

The branch tests:

- working storefront navigation and official product links,
- teaser close and launcher behavior,
- Chat and multi-turn history,
- all advisor steps,
- deterministic recommendations and hard exclusions,
- Back / Reset / result / alternative / product CTA,
- Escape and focus behavior,
- mobile 390×844 and 360×800,
- desktop 1440×900 visual capture,
- horizontal overflow and advisor internal scrolling,
- local image paths.

The full family + TWO Playwright regression reached 21/21 passing on the pre-final visual-capture run. The remaining visual-capture blocker was then traced to a malformed shared SVG numeric token (`2.2.8`) that produced a real browser console error. That root cause has been repaired in `src/main.jsx`; the final workflow rerun is required to verify both functional tests and refreshed screenshots on the repaired head.

## 7. Visual QA

`scripts/capture-two-qa.mjs` was updated to use the actual branded `Poradiť s výberom` control instead of the obsolete shared-template `Otvoriť Chat` label. It captures storefront, chat, advisor and result states at:

- 1440×900,
- 390×844,
- 360×800.

The capture fails on browser console/page errors and horizontal overflow and produces `two-qa-board.png` for visual inspection.

## 8. Cross-review — TWO → BELLCORIA

Re-reviewed the current Bellcoria implementation rather than the old shared baseline. Current Bellcoria is a real brand-specific storefront with five product cards, separate cleansing / face-oil-elixir / body structure, deterministic area constraints, multi-turn chat, local assets, responsive navigation and its own QA suite.

Checks performed against the current Bellcoria head included:

- face flows cannot return the body oil,
- body flow remains isolated to body care,
- customer-facing copy no longer exposes scoring jargon such as hard constraints or internal product-role mechanics,
- mobile menu has dynamic accessible open/close naming,
- product links remain Bellcoria destinations,
- the prior Bellcoria QA run passed before the shared SVG cleanup,
- no new TWO-blocking integration defect was found in the Bellcoria brand module.

The only cross-family defect found during the final sweep was the malformed shared SVG path, which was repaired centrally across the parity branches rather than left as a Bellcoria-specific workaround.

## 9. Remaining release gate

Do not mark TWO complete solely from this document. Completion requires the branch workflow on the current post-SVG head to finish green and regenerate the visual QA artifacts. After that, the branch is suitable for integration into the six-brand release branch.
