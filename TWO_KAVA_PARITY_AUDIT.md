# TWO COSMETICS × Kava parity audit

QA_STATUS: FINAL CURRENT-HEAD RERUN — the branch now includes valid shared SVG geometry, branded visual-capture selectors and real result → last-question navigation that preserves the selected answers.

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

Primary product photography and the hero are stored locally under `public/assets/brands/two/`. The earlier runtime dependencies on Lakrem, Makeup, Notino, Hebe and remote TWO image URLs were removed. `tests/two.spec.js` rejects non-local product image paths so this cannot silently regress.

Displayed prices are treated as captured storefront information rather than invented promotional pricing. Product CTAs continue to the verified official TWO product pages.

## 4. Advisor scoring

The pseudo-random modulo/string-length selector is gone. The advisor uses explicit product metadata and deterministic ranking.

Important rules:

- selected product role is a hard eligibility constraint,
- sensitive-skin compatibility is a hard exclusion when a product does not have that verified property,
- goal, texture and AM/PM routine rank only eligible candidates,
- ties use stable catalog order,
- the result reason is assembled from matched customer choices,
- an alternative must remain logically eligible instead of simply selecting the first different product.

Repeating the same answers returns the same product.

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
- Back during the questionnaire,
- result → `Späť k poslednej otázke` with the previous fourth answer preserved,
- full Reset,
- result / alternative / product CTA,
- Escape and focus behavior,
- mobile 390×844 and 360×800,
- desktop 1440×900 visual capture,
- horizontal overflow and advisor internal scrolling,
- local image paths.

The result-back control was restored as real product behavior rather than deleting the existing test. This matches the usability contract and lets a customer change only the final preference without restarting all four questions.

## 7. Visual QA

`scripts/capture-two-qa.mjs` uses the actual branded `Poradiť s výberom` control instead of the obsolete shared-template `Otvoriť Chat` label. It captures storefront, chat, advisor and result states at:

- 1440×900,
- 390×844,
- 360×800.

The capture fails on browser console/page errors and horizontal overflow and produces `two-qa-board.png` for visual inspection.

A malformed shared sparkle SVG was found by this gate and replaced with explicit valid SVG geometry instead of suppressing the console error.

## 8. Cross-review — TWO → BELLCORIA

Re-reviewed the current Bellcoria implementation rather than the old shared baseline. Current Bellcoria is a real brand-specific storefront with five product cards, separate cleansing / face-oil-elixir / body structure, deterministic area constraints, multi-turn chat, local assets, responsive navigation and its own QA suite.

Checks performed against the current Bellcoria head included:

- face flows cannot return the body oil,
- body flow remains isolated to body care,
- customer-facing copy no longer exposes scoring jargon,
- mobile menu has dynamic accessible open/close naming,
- product links remain Bellcoria destinations,
- current Bellcoria QA is green,
- no new TWO-blocking integration defect was found in the Bellcoria brand module.

## 9. Current release gate

This commit deliberately triggers the complete TWO workflow against the post-SVG, post-result-navigation head. TWO is branch-ready only when that workflow passes functional Playwright coverage and refreshed visual capture on this exact behavior set.
