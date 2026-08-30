# MYLO × Kava parity audit

QA_STATUS: FINAL RERUN REQUIRED — this audit commit triggers the MYLO workflow on the post-viewport/error-gate and post-SVG head.

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

MYLO Chat sends bounded multi-turn history through the shared `messages` API contract. Deterministic fallback behavior handles:

- dry/dehydrated or sensitive-skin product selection,
- gentle cleansing,
- hydration,
- morning/evening routine questions,
- named product questions,
- comparisons such as INOVAŤ vs RADOSŤ.

Medical questions are kept outside diagnostic/treatment scope, while normal shopping answers are no longer burdened by repetitive safety or internal-catalog disclaimers.

## 6. UX/accessibility

The widget supports:

- independent teaser dismissal,
- launcher reopen,
- Chat / Výber mode switching,
- Back and Reset,
- Escape close,
- body scroll lock,
- focus containment and focus restoration,
- reduced motion,
- bounded input,
- no duplicate visible controls.

A previous Playwright failure was traced to an accessibility-selector collision: advisor `Späť` matched the logo aria-label `MYLO — späť hore`. The test now selects the exact advisor control instead of weakening accessibility or changing working UI behavior.

## 7. Final QA gates

`tests/mylo.spec.js` now explicitly enforces all required viewport/error gates rather than relying on the Playwright default viewport:

- desktop is explicitly set to 1440×900,
- mobile runs at 390×844 and 360×800,
- desktop and mobile collect `console.error`,
- desktop and mobile collect `pageerror`,
- all those error arrays must remain empty,
- horizontal overflow is rejected,
- advisor question screens must fit without internal scrolling,
- storefront navigation/product images/product links are exercised,
- deterministic ranking and Chat behavior are covered.

The strengthened gates were added before the shared SVG cleanup and remain in the current branch history.

## 8. Cross-review — MYLO → PONIO

Reviewed the current PONIO implementation rather than the original shared baseline. PONIO now materially differs from MYLO and exposes its broader range through face, hair, body and lip care categories.

The review checked:

- dedicated PONIO experience rather than a MYLO recolor,
- hard care-area eligibility before recommendation scoring,
- local runtime product imagery for the expanded catalog,
- multi-turn Chat support,
- mobile and desktop QA coverage,
- official category/product destinations.

A concrete PONIO defect found in the final sweep was a stale Pleť category destination (`collections/plet-pletove-kremy`). It has been corrected to the current official `collections/pletove-kremy` path and is now protected by an exact-href regression assertion. Previously remote imagery for the expanded PONIO products was also localized.

No remaining MYLO-blocking product-logic defect was found on the current PONIO brand module. PONIO is undergoing its own final current-head workflow rerun.

## 9. Remaining release gate

MYLO is not marked PASS solely because earlier runs were green. This commit triggers a final current-head QA run that must validate the newly explicit 1440×900 and zero-browser-error gates together with the shared SVG repair. A green result makes MYLO suitable for the six-brand integration branch.
