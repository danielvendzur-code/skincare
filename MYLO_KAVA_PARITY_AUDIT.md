# MYLO × Kava parity audit

QA_STATUS: FINAL CURRENT-HEAD RERUN — MYLO now includes explicit 1440×900/browser-error gates, sticky-header-aware in-page navigation and a bottom-section visibility assertion that tests real user visibility instead of an impossible fixed top offset.

Date: 2026-08-30  
Branch: `agent/skincare-mylo-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main, `docs/KAVA_PARITY_BLUEPRINT.md` and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

The original MYLO route was a generic family owner page rather than a MYLO storefront. Its recommendation result was selected from answer-string length, so the product could change for reasons unrelated to compatibility. Chat lacked useful conversation history and the page did not give a MYLO owner the impression of a real product-led web integration.

## 2. MYLO storefront

`/ukazka/mylo` now uses a dedicated MYLO storefront with:

- MYLO-specific header and clickable home/logo behavior,
- product-led hero,
- real catalog products and official product links,
- routine/product composition rather than an owner-sales explainer,
- direct Chat and Výber starostlivosti entry points,
- local product imagery,
- responsive mobile layout,
- customer-facing wording instead of internal scoring/QA terminology.

The design stays calm, natural and editorial. It deliberately avoids AI-dashboard styling, decorative glow, glassmorphism, emoji and repetitive generic skincare cards.

The in-page Produkty/Pleť/Rutina navigation compensates for the sticky header instead of letting anchored content disappear under it. For the routine section near the bottom of the document, QA validates actual viewport visibility and header clearance rather than demanding a scroll position the browser cannot reach once the document bottom is clamped.

## 3. Catalog

The verified baseline includes:

1. Hydratačné sérum INOVAŤ
2. Čistiace a odličovacie mlieko MOISSANIT
3. Pleťový olej FLÓRA
4. Pleťová voda KVETOVÁ ROSA
5. Ceramidový krém s vitamínmi RADOSŤ

Product names, price snapshots, role metadata and claims are kept traceable to MYLO product information. Product links go to the official MYLO destinations and product imagery is local.

## 4. Recommendation model

The pseudo-random modulo selector is removed. MYLO now has explicit product traits and weighted deterministic ranking.

The advisor considers:

- how the skin feels,
- the customer's primary routine goal,
- preferred product format/texture,
- morning/evening/minimal routine context,
- explicit product-role preferences where relevant.

Role preferences receive strong bonuses/penalties, traits contribute transparent weights and catalog order provides a stable final tie-break. The same answers therefore produce the same recommendation.

The displayed reason uses matched customer-friendly traits rather than exposing scores or implementation terminology. Alternative selection prefers a logically complementary, sufficiently relevant product rather than simply returning the first different catalog item.

## 5. Chat/API

MYLO Chat sends bounded multi-turn history through the shared `messages` API contract. Deterministic fallback behavior handles dry/dehydrated or sensitive-skin product selection, gentle cleansing, hydration, morning/evening routine questions, named products and comparisons such as INOVAŤ vs RADOSŤ.

Medical questions are kept outside diagnostic/treatment scope, while normal shopping answers are no longer burdened by repetitive safety or internal-catalog disclaimers.

## 6. UX/accessibility

The widget supports independent teaser dismissal, launcher reopen, Chat / Výber switching, Back and Reset, Escape close, body scroll lock, focus containment/restoration, reduced motion, bounded input and no duplicate visible controls.

A previous Playwright failure was traced to an accessibility-selector collision: advisor `Späť` matched the logo aria-label `MYLO — späť hore`. The test now selects the exact advisor control instead of weakening accessibility or changing working UI behavior.

## 7. Final QA gates

`tests/mylo.spec.js` explicitly enforces:

- desktop 1440×900,
- mobile 390×844 and 360×800,
- `console.error` and `pageerror` collection,
- empty browser-error arrays,
- horizontal-overflow rejection,
- no internal advisor question scrolling,
- real storefront navigation visibility,
- local product images and official product links,
- deterministic ranking,
- multi-turn Chat,
- Back/Reset/Escape/focus behavior.

Fullscreen widget geometry uses a sub-pixel-safe tolerance so a browser coordinate such as `0.00096px` cannot create a false failure while still enforcing full-screen placement.

## 8. Cross-review — MYLO → PONIO

Reviewed the current PONIO implementation rather than the original shared baseline. PONIO now materially differs from MYLO and exposes its broader range through face, hair, body and lip care categories.

The review checked its dedicated experience, hard care-area eligibility, local expanded-catalog imagery, multi-turn Chat, mobile/desktop QA and official category/product destinations.

A concrete PONIO defect found in the final sweep was a stale Pleť category destination (`collections/plet-pletove-kremy`). It has been corrected to the current official `collections/pletove-kremy` path and is protected by an exact-href regression assertion. Previously remote imagery for the expanded PONIO products was also localized. PONIO's audited current-head workflow is green.

## 9. Current release gate

This commit triggers the complete MYLO branch workflow against the post-navigation and corrected QA head. MYLO is suitable for six-brand integration only when that current-head run passes all 18 family + brand tests and the strengthened viewport/browser-error gates.
