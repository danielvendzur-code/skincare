# Pražiarnička layout reference for skincare

Reference repository: `danielvendzur-code/kava.chatbot.backend`
Reference branch: current `main` (`dbe6b5c40ab9e05c6707ab888963b7614029ceea`).

Do **not** use `agent/praziarnicka-live-fix-v14` as the baseline: it is currently behind `main` and has no commits ahead of it.

Primary implementation references:

- `praziarnicka-v13.js`
- `praziarnicka-v13.css`
- the final coffee owner/widget/runtime/release layers listed in `KAVA_PARITY_BLUEPRINT.md`

This document describes the composition to learn from. It is not permission to copy Pražiarnička colors, coffee content, logos, or exact styling into skincare.

## What the current desktop composition does well

The current Pražiarnička page is intentionally dense and legible in one desktop viewport:

1. **Compact brand header**
   - restrained height (the CSS grid reserves roughly a 76 px header row);
   - brand/logo on the left;
   - navigation/actions on the right when present;
   - thin separator instead of a heavy card shell.

2. **Two-column hero**
   - desktop ratio is approximately `1.08fr / 1fr`;
   - left side carries the minimum explanatory copy and primary action;
   - right side is not another text card: it is a large product/image composition with a small advisor/recommendation affordance layered into it;
   - product imagery carries much of the visual weight.

3. **Compact catalog/product rail below the hero**
   - a narrow section label/intro column;
   - four product cards in a dense horizontal grid on desktop;
   - real product imagery, short name/context, price/metadata and clear click target;
   - cards support the fake-site illusion instead of repeating owner-facing benefits.

4. **Very light proof/footer band**
   - small supporting information rather than another oversized section;
   - visual hierarchy stays with hero + products + widget.

5. **Launcher outside page flow**
   - fixed bottom-right;
   - small invitation bubble plus circular launcher;
   - the invitation can be dismissed independently;
   - the page still looks complete even if the user never opens the widget.

6. **Widget has product-like proportions**
   - current desktop target is about 458 px wide and up to ~726 px high, bounded by viewport;
   - header is compact;
   - mode switch is separated from message/advisor content;
   - internal stage is the only flexible area;
   - the shell feels like a real installed commerce widget, not a giant modal centered in the page.

## How to translate this into skincare

Use the same **information architecture rhythm**, but let each skincare brand determine the actual visual system.

Recommended desktop order:

`brand header → two-column brand/product hero → compact category/product rail or editorial catalog section → minimal supporting/footer band`

The right hero column should normally be real product/brand photography, a product composition, or a visually useful category composition. Do not replace it with another paragraph card.

At least one product/category region must be visible without requiring the user to first open the assistant. The fake site must independently look believable.

The widget launcher belongs at bottom-right as a site integration. Its teaser should communicate one concrete job, e.g. helping choose a product, rather than generic AI copy.

Inside the widget, keep the density and hierarchy lessons from Pražiarnička:

- compact brand header;
- immediately understandable Chat / Výber starostlivosti switch;
- generous content area without nested card-on-card clutter;
- 2×2 answer layout where it fits;
- strong product image and CTA on the result;
- no blank transitional flashes;
- no duplicate close/reset/mode controls.

## What NOT to copy literally

Do not force every skincare route to `height:100svh` with `body{overflow:hidden}`. Pražiarnička uses this because its current fake customer page is deliberately a one-screen presentation. A skincare fake shop may need real vertical browsing; allow natural page scroll when the brand/content benefits from it.

Do not copy:

- Pražiarnička green/orange palette;
- its radii/shadows verbatim;
- coffee product-card dimensions when skincare packaging needs a different aspect ratio;
- coffee-specific questions or two-mode explanatory owner copy;
- any fake cart behavior that does not make sense for the skincare demo.

Do not increase visual density by shrinking text below readable mobile sizes. The goal is compact hierarchy, not miniature UI.

## Mobile translation

Mobile should preserve the sequence, not the desktop geometry:

- real brand header / compact mobile navigation;
- product-led hero with copy and CTA in a deliberate order;
- category/product region that becomes horizontal scroll, compact grid, or vertical cards depending on the brand;
- launcher placed clear of safe-area and critical page controls;
- widget can become fullscreen/near-fullscreen, retaining working close, mode switch, Back/Reset, focus handling and body-scroll restoration.

Do not squeeze a desktop two-column hero into tiny side-by-side columns.

## Acceptance check

A successful skincare translation should pass this visual question:

> If the launcher were temporarily hidden, would this still look like a believable small website for this exact skincare brand?

If the answer is no, the fake storefront is still too close to an owner-facing chatbot presentation page and must be redesigned before final QA.
