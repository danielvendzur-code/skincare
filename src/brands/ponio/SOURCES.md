# PONIO source ledger

Verified on 2026-08-28. This file records the public PONIO catalogue facts used by the PONIO storefront, Chat fallback and deterministic advisor. The implementation must not broaden claims beyond these sources without re-verifying the catalogue.

## Catalogue structure

- PONIO navigation distinguishes `Telo`, `Vlasy`, `Pery` and `Pleť` as separate product areas.
- Hair navigation distinguishes `Šampúchy` from `Suché šampóny`.
- Source: https://ponio.sk/
- Face collection used by the demo: https://ponio.sk/collections/plet-pletove-kremy
- Hair collection used by the demo: https://ponio.sk/collections/sampuchy
- Body collection used by the demo: https://ponio.sk/collections/deodoranty-so-sodou-a-kaolinom

## Verified products

### Lumina shield
- URL: https://ponio.sk/products/lumina-shield-pletovy-krem
- Area: face.
- Verified role used in the demo: daily protective face cream; PONIO describes it for a morning routine and as suitable under SPF or make-up.
- Demo price captured during verification: 25,30 €.

### Healthy aging
- URL: https://ponio.sk/products/healthy-aging-pletovy-krem
- Area: face.
- Verified role used in the demo: face cream for mature skin; PONIO describes daily and evening use.
- Demo price captured during verification: 25,30 €.

### Vanilka & kokos
- URL: https://ponio.sk/products/vanilka-a-kokos-pletovy-krem
- Area: face.
- PONIO explicitly describes it as suitable for sensitive, normal to drier skin. This is the only sensitivity-specific claim used by the advisor.
- Demo price captured during verification: 13,00 €.
- Image source used as resilient remote fallback: https://ponio.sk/cdn/shop/files/P1200306.jpg?v=1700644929&width=600

### Mint — suchý šampón
- URL: https://ponio.sk/products/suchy-sampon-mint
- Area: hair.
- Role: powder dry shampoo for refreshing hair between washes.
- PONIO explicitly mentions travel use; therefore `travel` is allowed for this product.
- Demo price captured during verification: 7,70 €.

### Banán & kokos — suchý šampón
- URL: https://ponio.sk/products/banan-kokos-suchy-sampon
- Area: hair.
- Role: powder dry shampoo for refreshing hair between washes.
- Demo price captured during verification: 7,70 €.
- No generic travel claim is inferred in the advisor.

### Dvojitá levanduľa — žihľavový šampúch
- URL: https://ponio.sk/products/dvojita-levandula-zihlavovy-sampuch-30g-60g
- Area: hair.
- Role: solid shampoo for washing hair, not a dry shampoo.
- PONIO describes the solid shampoo format as compact/practical for travel, therefore `travel` is allowed for this product.
- Demo price captured during verification: from 4,70 €.

### Fresh air — prírodný deodorant
- URL: https://ponio.sk/products/fresh-air-prirodny-deodorant
- Area: body.
- Verified claims used in the demo: natural deodorant, not an antiperspirant; paper packaging; fresh scent profile.
- Demo price captured during verification: 9,30 €.
- Image source used as resilient remote fallback: https://ponio.sk/cdn/shop/products/P1130396.JPG?v=1444655355&width=600

### Rúž na pery v ceruzke
- URL: https://ponio.sk/products/ruz-na-pery-v-ceruzke
- Area: lips.
- Verified claims used in the demo: pencil format, six shades, hydration and matte appearance.
- Demo price captured during verification: 8,30 €.
- Image source used as resilient remote fallback: https://ponio.sk/cdn/shop/files/P1200606.jpg?v=1709818979&width=600

## Safety and scoring rules derived from the ledger

1. `area` is a hard constraint before scoring. A face flow cannot rank hair/body/lips products and vice versa.
2. `sensitive` is used only where the catalogue explicitly supports it; currently that is Vanilka & kokos in this curated set.
3. `travel` is used only for products with an explicit or directly supported travel/compact-use statement above.
4. Dry shampoo and solid shampoo are different care steps. Dry shampoo refreshes between washes; a solid shampoo is used to wash hair.
5. Prices are demo snapshots. The result screen tells the customer that current price and availability on ponio.sk are authoritative.
6. No medical diagnosis, treatment claim or invented efficacy claim is allowed.
