# BELLCORIA — Kava parity audit

QA_STATUS: PASS

Date: 2026-08-28  
Branch: `agent/skincare-bellcoria-kava-parity`  
Baseline: `dbc800da2f9b25ec959e4044bf20056dde7c51fd`  
Reference: current `danielvendzur-code/kava.chatbot.backend` main and `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`.

## 1. Baseline diagnosis

The baseline Bellcoria route was not a credible brand storefront. It reused the family owner-sales presentation and a generic cosmetic advisor. The most important correctness defect was the advisor result selection: the chosen product depended on the combined answer-string length modulo the product count, so the apparent recommendation was unrelated to compatibility. That also meant a body product could win a face-oriented flow.

The baseline client posted only the latest chat `message` even though the API already accepted a bounded `messages` history array, so provider-side multi-turn behavior was not being used by the UI.

The local Bellcoria asset set was sufficient to avoid fabricated packshots: `public/assets/brands/bellcoria/` already contained the logo, hero image and five product images.

## 2. Storefront implementation

`/ukazka/bellcoria` now renders a Bellcoria-specific mini storefront from `src/brands/bellcoria/` rather than the generic owner page.

Implemented structure:

- compact Bellcoria header and logo,
- desktop category navigation,
- working mobile navigation,
- editorial/product-led hero,
- explicit `Čistenie` section,
- explicit `Pleťové oleje a elixíry` section,
- explicit `Telo` section,
- five product cards using the baseline products,
- external product links,
- in-page Chat and advisor entry points,
- launcher/teaser outside the storefront content flow,
- footer links back to Bellcoria.

The visual system uses warm paper/clay surfaces with restrained berry/aubergine accents and editorial serif typography. It intentionally avoids gold-border luxury styling, sage gradients, decorative leaf overlays, glass cards, decorative emoji and glow-based "premium" effects.

## 3. Catalog used by the demo

1. Organický opunciový olej — 30,90 €
2. Elixír proti vráskam s bakuchiolom — 27,90 €
3. Pleťový čistiaci gél — 9,90 €
4. Nočný elixír s vitamínom C a brusnicovým olejom — 27,90 €
5. Telový olej s astaxantínom — 10,90 €

The storefront uses already-vendored local imagery. Source URLs and the recommendation-classification caveat are recorded in `src/brands/bellcoria/SOURCES.md`.

The advisor classification is intentionally about product role, area, texture and routine. It does not introduce medical efficacy claims.

## 4. Advisor architecture

Bellcoria-specific catalog traits and questions live in `src/brands/bellcoria/config.js`.

Four steps:

1. area — face / body,
2. role — cleanse / oil / elixir / body-oil,
3. texture — gel / oil / light / no preference,
4. routine — cleansing / daily / evening / body.

Scoring contract:

| Signal | Weight / behavior |
|---|---:|
| area | hard constraint applied before scoring |
| matching area | +12 |
| role | +9 match, -4 mismatch |
| texture | +5 match, -2 mismatch |
| routine | +7 match, -2 mismatch |
| tie-break | stable product `rank` / catalog order |

The area hard constraint is evaluated before any weighted score. `face` and `face-neck` flows can rank only face products; `body` flows can rank only body products. Consequently `Telový olej s astaxantínom` cannot win a face flow regardless of the remaining answers.

The result reason is generated from the traits that actually matched. The alternative is selected deterministically from the same eligible pool, preferring a compatible same-role alternative when the user explicitly chose a role.

## 5. Chat and fallback behavior

The shared client now sends bounded conversation history to `/api/chat`, preserving the previous user and assistant turns instead of sending only the latest message.

Bellcoria deterministic handling covers:

- pleťový olej vs elixír,
- čistiaci gél vs olej/elixír,
- evening care,
- bakuchiol,
- face vs body,
- body-only branch handling,
- named-product comparisons,
- follow-up comparison questions using recent conversation context.

The deterministic fallback remains available with `ANTHROPIC_API_KEY` absent. Medical/diagnostic requests are intercepted before the Bellcoria intent logic and are not converted into cosmetic treatment claims.

## 6. Interaction and accessibility fixes

The parity pass also covers the widget behaviors exercised by Bellcoria:

- functional teaser dismiss,
- multi-turn Chat history payload,
- mode switch Chat ↔ Výber starostlivosti,
- Back during advisor flow,
- Back from result to the last advisor question,
- Reset to step 1,
- Escape close,
- body scroll lock while dialog is open,
- focus containment inside the open dialog,
- focus restoration after close with launcher fallback,
- reduced-motion styling,
- full-screen mobile widget behavior.

The first CI run exposed a real focus-restoration defect after Escape. It was fixed in `cec1aeb40ea238966dec751eb8b329c253cc42e7` by restoring focus after the dialog has actually unmounted and falling back to the newly rendered launcher if the original opener no longer exists.

## 7. Automated QA

GitHub Actions workflow: `.github/workflows/bellcoria-qa.yml`.

Verified run: `33199973040` on code commit `cec1aeb40ea238966dec751eb8b329c253cc42e7`.

Result: PASS.

The successful run completed:

- frozen dependency install,
- Playwright Edge install,
- `pnpm build`,
- full `pnpm test`,
- 18/18 Playwright tests,
- local QA server,
- Bellcoria capture at all required viewports,
- QA board generation,
- screenshot commit.

Bellcoria-specific test coverage includes:

- exhaustive face scoring constraint combinations,
- deterministic repeatability and tie behavior,
- explicit expected results for body, evening elixir and pleťový oil flows,
- local deterministic chat intents,
- API multi-turn payload,
- storefront navigation,
- all five product cards and external URLs,
- quick-chip Chat,
- typed second Chat turn,
- persisted history payload,
- all four advisor steps,
- explainable result,
- external result CTA,
- result Back,
- Reset,
- Escape,
- focus restoration,
- body scroll unlock,
- 1440×900,
- 390×844,
- 360×800,
- mobile navigation,
- no internal advisor-question scroll,
- no horizontal page overflow,
- reduced motion,
- teaser dismiss,
- no captured console/page errors.

The first workflow run (`33199736659`) passed build and 17/18 tests but failed the focus assertion. Screenshots were intentionally not accepted from that failed run. The second run passed all gates and only then refreshed the artifacts.

## 8. Screenshot artifacts

Verified screenshots are committed under `artifacts/screenshots/`:

- `bellcoria-desktop-owner.png`
- `bellcoria-desktop-chat.png`
- `bellcoria-desktop-advisor.png`
- `bellcoria-desktop-result.png`
- `bellcoria-mobile-owner.png`
- `bellcoria-mobile-chat.png`
- `bellcoria-mobile-advisor.png`
- `bellcoria-mobile-result.png`
- `bellcoria-mobile360-owner.png`
- `bellcoria-mobile360-chat.png`
- `bellcoria-mobile360-advisor.png`
- `bellcoria-mobile360-result.png`
- `bellcoria-qa-board.jpg`

The verified screenshot-only commit is `855819dda726b168bb2c64efce9a57f80f92b077`.

## 9. Peer review — `agent/skincare-biofy-kava-parity`

Reviewed peer head: `70221ff177232ee6768d51d382b7c807a142fb0d` (`Build BIOFY storefront and deterministic advisor parity`).

Positive implementation notes:

- BIOFY has moved its catalog/scoring/storefront/theme into `src/brands/biofy/`.
- Its scorer applies a real `face`/`hair` hard constraint before scoring and uses explicit weights plus catalog-order tie-breaking.
- Its client sends history and keeps Chat messages across mode switching.
- Its audit correctly remains `QA_STATUS: PENDING` rather than claiming unexecuted QA passed.

Concrete findings that must be resolved before BIOFY is parity-complete:

1. **Blocking CI failure.** BIOFY workflow run `33200005347` is red. Build passes and 18 tests pass, but `tests/biofy.spec.js` fails because `getByRole('button', { name:'Pleť' })` resolves both the hero advisor card and the exact advisor choice. Use a scoped locator or `exact: true`; then rerun the full workflow. Because the regression suite failed, screenshot capture/QA-board/PASS-marker stages were skipped.
2. **Fallback multi-turn is not actually contextual.** The client sends `messages`, but `deterministicReply()` receives only `latestMessage` and `slug`; the recent history is discarded when the provider is unavailable. A follow-up such as “A ktorý z nich je ľahší?” after a Hydratačný-vs-Výživný comparison therefore cannot resolve the referenced pair from deterministic history. Pass bounded recent messages/context into the BIOFY fallback, and add a provider-absent multi-turn API test.
3. **Typed-message Playwright coverage is missing.** The BIOFY browser Chat test clicks a quick chip and then tests isolated API fallbacks through `offlineReply()`, but it never fills/submits the composer. The blueprint requires brand-specific coverage for both quick chip and typed message. Add a real typed second turn and assert the outgoing `messages` history.
4. **Reduced-motion behavior exists but is not brand-specifically verified.** `theme.css` has a `prefers-reduced-motion` block, but `tests/biofy.spec.js` never calls `page.emulateMedia({ reducedMotion:'reduce' })` or verifies the affected transitions/scroll behavior. The parity quality gate explicitly requires reduced-motion coverage.

There is currently no pull request for the BIOFY branch, so no PR review thread exists to attach these findings to. They are recorded here against the exact reviewed commit and should be rechecked after BIOFY publishes its fix commit.

## 10. Integration notes and limitations

Bellcoria-specific code is isolated under `src/brands/bellcoria/`, but the current family baseline still requires a small adapter/import in `src/main.jsx` and shared Chat/API behavior changes. Those shared changes are covered by the family suite.

No automatic merge to `main` was performed.

This QA was executed against the repository's Vite application in GitHub Actions, not against a production Vercel deployment. The repository currently has no skincare Vercel project available through the connected deployment account, so deployment behavior is outside this branch's verified claim.
