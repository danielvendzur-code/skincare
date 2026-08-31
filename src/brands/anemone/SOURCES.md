# ANEMONE source record

Verified on 2026-08-28 before implementation.

## Official brand and catalog

- https://anemone.sk/
  - storefront taxonomy: Starostlivosť o pleť → Kvetinové vody / Pleťové oleje a séra / Balzamy na pery; Starostlivosť o vlasy
  - brand copy used as factual context: „Kozmetika, čo dýcha prírodou.“, products made by hand in small quantities in Slovakia
  - visible current catalog/prices captured: Ruža damascénska 5,30 €, Harmanček 4,00 € sale from 5,00 €, Balzam Mandarínka & grep 3,70 €, Tuhý šampón Šalvia & levanduľa 7,00 €
- https://anemone.sk/pletove-oleje-a-sera/pletovy-olej-na-zrelu-plet.html
  - Pleťový olej na zrelú pleť: 8,90 €, 30 ml, glass bottle with pipette
  - usage context used by the demo: clean, slightly damp skin; manufacturer explicitly mentions combining with floral water
- Product URLs already present in the skincare repository were retained for the five baseline products and matched to the official ANEMONE domain.

## Local assets

The implementation only renders the existing locally stored assets under:

`public/assets/brands/anemone/`

- `logo.jpg`
- `hero.jpg`
- `product-1.jpg` — Ruža damascénska
- `product-2.jpg` — Harmanček
- `product-3.jpg` — Pleťový olej na zrelú pleť
- `product-4.jpg` — Balzam na pery Mandarínka & grep
- `product-5.jpg` — Tuhý šampón Šalvia & levanduľa

No generated product image, review, stock level, testimonial, certification, clinical result, or medical claim was added.

## Reference implementation

- `danielvendzur-code/kava.chatbot.backend`, current `main` at audit time: `dbe6b5c40ab9e05c6707ab888963b7614029ceea`
- `praziarnicka-v13.js`: explicit trait scoring, stable tie-break, history-aware chat fallback, compact widget behavior
- `docs/KAVA_PARITY_BLUEPRINT.md`
- `docs/PRAZIARNICKA_LAYOUT_REFERENCE.md`
