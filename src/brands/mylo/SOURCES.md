# MYLO sources

Verified against the official MYLO site on 2026-08-28. The demo uses only local repository copies of imagery under `public/assets/brands/mylo/`; no production UI image is hotlinked.

## Storefront and brand context

- https://www.mylo.sk/
  - official MYLO brand/site context and navigation;
  - current public language around plant-based cosmetics and simple care.
- https://www.mylo.sk/obchod/
- https://www.mylo.sk/starostlivost-o-tvar/
  - current catalog names and captured prices used in this demo.

## Products used by the advisor

- INOVAŤ — https://www.mylo.sk/starostlivost-o-tvar/inovat/
  - captured price: 19,00 €;
  - hydrogél serum; official page lists niacinamide, sea algae, prebiotics and hyaluronic acid;
  - official use text recommends normal-to-oily skin and morning/evening daily use.
- MOISSANIT — https://www.mylo.sk/starostlivost-o-tvar/moissanit/
  - captured shop price: 20,00 €;
  - cleansing/removing milk for all skin types including sensitive skin and eyes.
- FLÓRA — https://www.mylo.sk/starostlivost-o-tvar/flora/
  - catalog currently presents variants from 2,50 €; the demo deliberately shows only `od 2,50 €` because the maximum depends on variant/current catalog state;
  - oil serum for dry and sensitive skin; official page lists 1–2× daily use.
- KVETOVÁ ROSA — https://www.mylo.sk/starostlivost-o-tvar/kvetova-rosa/
  - captured price: 22,00 €;
  - toner supporting hydration; official use text places it immediately before face oil.
- RADOSŤ — https://www.mylo.sk/starostlivost-o-tvar/ceramidovy-krem-s-vitaminmi-radost/
  - captured shop price: 14,75 €;
  - ceramide cream described by MYLO around hydration/regeneration; official use text allows morning and evening use.

## Local assets

Existing repository assets reused:

- `/assets/brands/mylo/logo.png`
- `/assets/brands/mylo/hero.jpg`
- `/assets/brands/mylo/product-1.jpg` through `/assets/brands/mylo/product-5.jpg`

The storefront does not reproduce reviews, review counts, stock state, discounts, scarcity or certificates from the live shop. Those values can change and are not needed for the product-selection demo.
