# BIOFY source log

Verified against the official BIOFY website on 2026-08-28.

## Storefront and categories
- https://biofy.sk/
- https://biofy.sk/obchod/

The official shop exposes separate face, hair, body and gift categories. This demo intentionally scopes the advisor to the five requested baseline products, which only cover face and hair. The advisor therefore asks only `Pleť` or `Vlasy`; it does not expose body/gift paths without a matching result.

## Baseline product sources
- Hydratačný krém na suchú a citlivú pleť 60 ml: https://biofy.sk/produkt/hydratacny-krem-na-suchu-a-citlivu-plet-60ml-2/
- Výživný krém na normálnu a zmiešanú pleť 60 ml: https://biofy.sk/produkt/vyzivny-krem-na-normalnu-a-zmiesanu-plet-60ml/
- Konopný krém na suchú a problematickú pleť 50 ml: https://biofy.sk/produkt/konopny-krem-na-suchu-a-problematicku-plet-50ml/
- Official product page for the rosemary hair tonic: https://biofy.sk/produkt/tonikum-na-rast-vlasov-s-rozmarinom-100ml/
- Ošetrujúci olejček na vlasy — 9 vzácnych olejov 50 ml: https://biofy.sk/produkt/osetrujuci-olejcek-na-vlasy-9-vzacnych-olejov-50ml/

## Claim policy used by this demo
The official site contains stronger cosmetic/marketing claims, especially on hair-growth and problem-skin pages. This implementation deliberately does not repeat or amplify growth guarantees, medical-treatment language, dermatological claims, or absolute clean-beauty claims. The rosemary product is displayed as `Vlasové tonikum s rozmarínom 100 ml` while retaining the official product URL.

## Local assets
No new remote images were added in this branch. The implementation reuses the already-localized BIOFY assets under `public/assets/brands/biofy/` so the storefront and advisor do not depend on third-party image loading.
