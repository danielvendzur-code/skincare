# BELLCORIA sources

Verified for the Kava parity pass on 2026-08-28.

## Official catalogue references

- https://bellcoria.sk/
- https://bellcoria.sk/produkty/
- https://bellcoria.sk/produkty/organicky-opunciovy-olej/
- https://bellcoria.sk/produkty/elixir-proti-vraskam-s-bakuchiolom/
- https://bellcoria.sk/produkty/pletovy-cistiaci-gel/
- https://bellcoria.sk/produkty/nocny-elixir-proti-vraskam-so-stabilizovanym-vitaminom-c-a-brusnicovym-olejom/
- https://bellcoria.sk/produkty/telovy-olej-na-podporu-opalenia-s-astaxantinom/

## Local assets

The storefront uses the already-vendored Bellcoria assets in `public/assets/brands/bellcoria/` and does not hotlink remote imagery.

## Recommendation contract

For this demo advisor the five baseline products are intentionally classified by product role and area rather than by medical or efficacy claims. `Telový olej s astaxantínom` is treated as body-only in recommendation scoring so that a body product can never win a face flow. This is an interaction constraint for the demo, not a claim about every possible use of the product.
