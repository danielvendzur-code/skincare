# ANEMONE × Kava parity audit

QA_STATUS: FINAL RERUN REQUIRED — this audit commit triggers ANEMONE QA on the post-family-selector and post-shared-SVG head.

Date: 2026-08-30  
Branch: `agent/skincare-anemone-kava-parity`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main, `docs/KAVA_PARITY_BLUEPRINT.md` and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

ANEMONE originally reused the generic owner-sales presentation and the same pseudo-random answer-length recommendation as the other skincare routes. Its product roles are unusually distinct — kvetová voda, pleťový olej, balzam na pery and tuhý šampón — so a generic skin-type flow could easily return a logically invalid cross-role product.

## 2. Storefront delivered

`/ukazka/anemone` now renders a dedicated small-batch botanical storefront with:

- ANEMONE brand header and working mobile navigation,
- editorial hero,
- separate Kvetové vody section,
- featured Pleťový olej section,
- Pery and Vlasy sections,
- real product cards and official ANEMONE destinations,
- local logo/hero/product imagery,
- branded `Opýtať sa v chate` and advisor CTAs,
- responsive 1440/390/360 treatment.

The visual direction is calm, small-batch and botanical without becoming rustic Etsy, retro or a generic beige-green clean-beauty template. There are no fake reviews, awards, stock claims, scarcity counters or invented botanical efficacy promises.

## 3. Verified product scope

The baseline is intentionally limited to:

1. Kvetová voda Ruža damascénska
2. Kvetová voda Harmanček
3. Pleťový olej na zrelú pleť
4. Balzam na pery Mandarínka & grep
5. Tuhý šampón Šalvia & levanduľa

All product images are local and product links point to `anemone.sk` destinations. Customer copy stays with verifiable format/routine information instead of inventing medical or botanical outcomes.

## 4. Advisor model

The previous pseudo-random selector is gone. Step one is now a hard product-role gate:

- water,
- oil,
- balm,
- hair.

Only candidates in the selected role can be ranked. Format, place in routine and botanical preference then refine the eligible set. Tie-breaking is stable by catalog order; the two floral waters can be deterministically separated by the named rose/chamomile preference.

Hard invariants:

- lip-care choice cannot return a facial oil,
- hair choice cannot return a floral water,
- oil choice cannot return a balm,
- alternatives remain in the same selected product role.

Customer-facing reasons no longer expose terms such as `hard constraint`, score, branch or verified demo catalog.

## 5. Chat/API behavior

Deterministic ANEMONE fallback covers:

- Ruža vs Harmanček,
- kvetová voda vs pleťový olej,
- lip balm,
- solid shampoo,
- simple routine ordering,
- named product questions.

The API contract supports bounded multi-turn history and keeps model credentials server-side. ANEMONE's direct API tests cover multi-turn context and invalid request handling.

A previous browser QA problem generated two 404 console errors because the Playwright page ran against plain Vite while sending real requests to the serverless `/api/chat` route. The fix preserves correct test layering: browser interaction now mocks the same API response contract, while the server handler itself remains directly contract-tested. No console assertion was disabled.

## 6. UX/accessibility

ANEMONE QA covers:

- mobile menu open/close and Escape behavior,
- functional category anchors,
- launcher/teaser,
- dialog focus and focus restoration,
- body scroll lock,
- Chat → advisor mode switching while preserving messages,
- Back and Reset,
- result product CTA,
- reduced motion,
- no horizontal overflow,
- no broken local images,
- no internal scroll in advisor question screens.

The family suite was also updated after the branded storefront changed its Chat CTA from the generic `Otvoriť Chat` to `Opýtať sa v chate`; tests now follow the real customer-facing control instead of forcing old generic wording back into the design.

## 7. Viewport/test coverage

Brand tests explicitly exercise:

- desktop 1440×900,
- mobile 390×844,
- mobile 360×800,
- deterministic role exclusions,
- stable floral-water tie behavior,
- local asset paths,
- official product links,
- multi-turn fallback/API behavior,
- invalid method/brand/body validation,
- Chat interactions,
- advisor result and CTA,
- console/page errors,
- reduced motion.

The final current-head workflow must finish green before the branch is declared complete.

## 8. Cross-review — ANEMONE → MYLO

Reviewed the current MYLO branch rather than the original shared template. MYLO now has:

- a dedicated MYLO storefront,
- local real-product imagery and official links,
- explicit deterministic trait/role ranking rather than string-length selection,
- bounded multi-turn Chat,
- polished customer-facing advisor reasons,
- mobile/fullscreen widget behavior,
- focus/Escape/scroll-lock/reduced-motion coverage.

The current MYLO review specifically checked the acceptance gates that were previously missing. MYLO's brand test now explicitly sets desktop to 1440×900 and captures both `console.error` and `pageerror` on desktop plus 390×844 and 360×800 mobile runs. This was added as a real regression gate rather than documented as an assumed pass.

The earlier `Späť` strict-mode collision was correctly fixed at test-selection level rather than weakening MYLO accessibility. No remaining ANEMONE-blocking product-logic defect was found in the current MYLO module; MYLO is running its own final current-head QA after the shared SVG repair.

## 9. Remaining release gate

ANEMONE is ready for integration only after the workflow triggered by this audit commit finishes green on the current head and refreshes its required QA evidence. No deployment should use a pre-audit/pre-selector head.
