# Skincare × Kava parity blueprint

Status: coordination contract for the six parallel skincare brand passes.
Baseline branch: `agent/skincare-final-six` at `4e07906863745367894150d191156b4df769b6f1`.
Reference repository: `danielvendzur-code/kava.chatbot.backend`, current `main` at `dbe6b5c40ab9e05c6707ab888963b7614029ceea`.

## Mission

Bring all six skincare demos to the product, visual, UX, robustness and QA standard reached by the coffee demos, while keeping each skincare brand recognizably its own. Do not create six recolors of one generic template. The result must feel like a believable mini version of the real brand website with an integrated Chat / Výber starostlivosti assistant.

The six brands are MYLO, PONIO, TWO COSMETICS, BELLCORIA, BIOFY and ANEMONE.

The current implementation is a useful baseline, not the final architecture. It already has local brand assets, six routes, a React widget, a 4-step advisor, fallback chat, Playwright coverage and desktop/mobile screenshot boards. Preserve working accessibility and regression protections unless a replacement is demonstrably stronger.

## Reference hierarchy

Study the coffee repository before editing. Use it as a source of product patterns and solved edge cases, not as code to blindly paste.

Highest-signal reference files and areas:

- `coffee-owner-brand.js` / `coffee-owner-brand.css`
- `coffee-owner-page.js` / `coffee-owner-page.css`
- `coffee-owner-sales-polish.css`
- `coffee-widget-final.js` / `coffee-widget-final.css`
- `coffee-usability-release.js` / `coffee-usability-release.css`
- `coffee-release-contract.js`
- `coffee-runtime-safety.js`
- `coffee-final-tune.js` / `coffee-final-tune.css`
- `coffee-final-qa.css`
- `coffee-review-pass.js` / `coffee-review-pass.css`
- `praziarnicka-v13.js` / `praziarnicka-v13.css`
- `praziarnicka-jolka-scale.css`
- `api/chat.js`
- `tests/widget-smoke.spec.mjs`
- `tests/release-repair.spec.mjs`
- `tests/final-user-feedback.spec.mjs`
- `tests/final-usability-release.spec.mjs`
- `tests/chat-final-state.spec.mjs`
- `tests/praziarnicka-contract.test.mjs`
- `tests/praziarnicka-live.spec.mjs`
- `AUDIT_2026-08_OWNER_VIEW.md`

Do not revive known coffee mistakes: stacked override layers fighting each other, MutationObservers that continuously reorder stylesheets, invisible CTA states, duplicate teaser close buttons, logo stacking, content that overflows upward, runtime patches that rewrite the same text on timers, or generic owner pages that erase brand identity.

## Non-negotiable experience parity

### 1. Believable fake storefront

Each route must be a believable mini storefront inspired by that brand's real website, not a generic sales presentation page.

Required:

- brand-correct header and navigation;
- real logo and coherent typography/palette/radius system;
- hero or editorial/product composition that resembles the brand's visual language;
- at least one meaningful product/category section using real catalog data already present in the repo or newly verified against official sources;
- working navigation interactions and product links;
- no dead fake controls: every visible interactive element must do something coherent;
- product cards with strong cropping, correct aspect ratio and local fallbacks;
- desktop and mobile composition designed independently, not merely squeezed;
- no horizontal overflow;
- no layout shift caused by late remote image failures.

The storefront can be intentionally compact, but it must look like a real site where the widget has been installed.

### 2. Widget shell

Required parity with the best coffee behavior:

- launcher with brand mark/logo;
- compact invitation/teaser with working close behavior;
- Chat / Výber starostlivosti mode switch;
- clear online/active state when visually appropriate;
- accessible close and reset controls;
- focus trap while open;
- Escape closes;
- body scroll lock that does not break return scrolling;
- reliable reopen state;
- reduced-motion support;
- no duplicate close buttons or duplicate headers;
- no blank flash between states;
- no element smaller than a practical mobile tap target;
- no UI text below 11 px unless it is genuinely nonessential metadata and remains legible.

### 3. Chat

The assistant must be useful without Anthropic and better with Anthropic.

Required:

- preserve conversation history across turns while the widget is open;
- quick questions that answer things the storefront alone cannot immediately explain;
- deterministic catalog-grounded fallback for every quick question class;
- concise typing state; no fake long delay loops;
- timestamp/message rhythm only if it improves readability;
- never invent a product, ingredient, price, availability or medical claim;
- never diagnose skin disease or claim to treat/cure medical conditions;
- when a question is medical or symptom-heavy, clearly keep scope to product guidance and recommend qualified medical advice when appropriate;
- errors/timeouts must degrade to a useful catalog answer, never an empty bubble.

API requirements:

- never commit secrets;
- use `ANTHROPIC_API_KEY` from environment;
- make the model configurable via `CHAT_MODEL` rather than hardcoding an old model identifier;
- default to a currently supported lightweight Claude model suitable for low-latency chat;
- validate body and brand slug;
- limit history and per-message length;
- use an upstream timeout and clear it reliably;
- return deterministic fallback on upstream failure;
- set `Cache-Control: no-store`;
- add CORS only for explicitly allowed production/preview/local origins if cross-origin embedding is used;
- do not pass arbitrary HTML, secrets or server state into the model.

### 4. Advisor / configurator

The current result selection based on concatenated answer-string length is not acceptable as production recommendation logic.

Replace it with explicit deterministic scoring:

- each product defines supported traits/tags;
- each answer contributes weighted traits;
- score every eligible product against the selected traits;
- support hard exclusions when needed;
- deterministic tie-breaking;
- expose a human-readable reason derived from actual matching traits;
- choose an alternative that is meaningfully different but still compatible;
- never present a random result as personalized.

The four questions may differ by brand. They should map to that brand's actual catalog structure rather than force every brand into `skin type → goal → routine → texture` when a different sequence is more useful.

Required interaction behavior:

- 4 short steps unless a brand genuinely benefits from fewer/more and the change is justified;
- 2×2 choices where this fits without internal scrolling;
- clear progress;
- Back restores the prior selection correctly;
- Reset clears all advisor state;
- fast selection feedback;
- no internal scroll on question screens at 1440×900, 390×844 and 360×800;
- result card may scroll if content requires it, but key recommendation + CTA must be visible quickly;
- result includes photo, exact product name, captured price, key properties, reason, external product CTA and a useful alternative;
- current official site remains authority for final price/availability.

### 5. Owner-facing/demo communication

Do not add AI-sounding marketing filler. The demo should explain the product by showing it.

When owner-facing copy exists:

- plain Slovak;
- short concrete language;
- no invented performance metrics;
- no unsupported claims such as guaranteed conversion uplift;
- avoid repeated benefit lists that restate the same point;
- make the brand name visible enough that the owner immediately sees the demo is for them;
- contact CTA may prefill brand/site/demo context when a contact flow exists, but must not fabricate owner details.

### 6. Brand fidelity

Use official source material first. Existing local assets in `public/assets/brands/{slug}` are preferred over hotlinks. If new imagery is added, save it locally and document its source/date in `docs/research-and-qa.md` or a brand-specific `SOURCES.md`.

Do not create generic AI-generated cosmetic packshots when the official brand already provides usable photography. Do not copy proprietary UI code from third-party sites. Inspiration is allowed; implementation must be original.

### 7. Anti-slop rules

Forbidden:

- gradients/glows merely to make a weak layout look "premium";
- random glassmorphism;
- generic purple AI visuals unrelated to the brand;
- decorative emoji where real icons/photos exist;
- fake reviews, fake sales counts, fake awards, fake scientific claims;
- repeated oversized rounded cards without hierarchy;
- unnecessary animation on every element;
- uncontrolled CSS override accumulation;
- timers/MutationObservers that repeatedly fight source DOM;
- placeholder lorem ipsum or TODOs in the final branch;
- broken controls justified as "demo only".

If unsure about a pattern, inspect the coffee repo history/tests and established public open-source UI patterns. Do not guess library APIs.

## Parallel ownership contract

Each agent owns one branch and one brand. Brand-specific implementation should move toward modular files so six branches can later be integrated without a six-way conflict in `src/main.jsx` and `src/styles.css`.

Preferred direction:

- `src/core/` — shared shell, state, accessibility and API client;
- `src/brands/<slug>/config.js` — catalog, questions, scoring, copy;
- `src/brands/<slug>/theme.css` — brand visual layer;
- `src/brands/<slug>/storefront.jsx` — brand-specific fake site composition;
- `src/brands/<slug>/SOURCES.md` — source log when new assets are introduced;
- `tests/<slug>.spec.js` — brand-specific behavioral and visual contracts.

Do not perform a broad shared-core rewrite unless required for your brand and covered by regression tests. If shared code must change, keep it generic and explain why in the commit/PR body.

Cross-review ring:

- MYLO reviews PONIO
- PONIO reviews TWO COSMETICS
- TWO COSMETICS reviews BELLCORIA
- BELLCORIA reviews BIOFY
- BIOFY reviews ANEMONE
- ANEMONE reviews MYLO

Before declaring work complete, each agent must inspect the assigned peer branch/PR and leave concrete findings. "Looks good" is not a review.

## Quality gates

Every brand branch must pass all applicable gates before it is complete:

1. `pnpm build` passes.
2. Existing family tests pass or are intentionally superseded by stronger tests.
3. Brand-specific Playwright tests cover storefront, launcher, Chat, quick chip, typed message, advisor all steps, Back, Reset, result, product CTA, Escape, focus/scroll lock and reduced motion.
4. Desktop QA at minimum 1440×900.
5. Mobile QA at minimum 390×844 and 360×800.
6. No console error caused by app code.
7. No uncaught promise rejection.
8. No missing/broken critical image.
9. No horizontal overflow.
10. No hidden CTA caused by unresolved CSS variables.
11. No duplicate launcher/teaser controls.
12. No question screen requiring internal scroll at target viewports.
13. Chat fallback works with `ANTHROPIC_API_KEY` absent.
14. Invalid API method/body/brand is handled explicitly.
15. Recommendation logic is deterministic and trait-based, not pseudo-random.
16. All visible product names/URLs/prices used for recommendations are traceable to the brand catalog/source record.
17. Screenshot artifacts are refreshed for owner/storefront, Chat, advisor and result on desktop/mobile.
18. A short audit file records what was changed, what was tested and any remaining limitation.

## Completion definition

A branch is not complete because it compiles. It is complete when a skeptical store owner can open the route, recognize their brand, navigate the fake storefront, discover the launcher, ask realistic questions, complete the product selection without layout friction, receive a credible catalog-grounded recommendation, follow the product CTA, and repeat the flow on mobile without errors or visual breakage.

Do not merge to `main` automatically. Keep all six brand branches reviewable until cross-review and final integration are complete.
