# Výskum a QA

## Oficiálne zdroje

Katalógy, ceny, produktové názvy, odkazy, logá a obrazové assety boli overené 16. augusta 2026 priamo na oficiálnych weboch: [Mylo](https://www.mylo.sk/), [Ponio](https://ponio.sk/), [TWO COSMETICS](https://www.twocosmetics.cz/), [Bellcoria](https://bellcoria.sk/), [Biofy](https://biofy.sk/) a [Anemone](https://anemone.sk/).

Texty poradcu ostávajú pri výbere kozmetiky, nevytvárajú diagnózy ani liečebné tvrdenia. Ceny sú zachytené ako stav pri výskume a cieľový e-shop ostáva zdrojom aktuálnej ceny.

## Vizuálny smer

Spoločný systém drží rovnakú logiku chatu a poradcu, no každá značka má vlastné farby, typografický smer, rádiusy, kompozíciu hero sekcie a charakter povrchov. Koncepty boli vytvorené pred implementáciou; finálna realizácia z nich prebrala jasnú hierarchiu, 2×2 voľby a kompaktnú produktovú kartu, nie doslovné makety.

## QA matica

- Viewporty: 1440×1000, 390×844, kritický mobil 360×800.
- Stavy na každej značke: owner page, úvodný chat, každá zo 4 otázok, výsledok.
- Interakcie: prepínač režimov, quick chips, automatický posun, späť, reset, Escape, focus trap, body scroll lock.
- Prístupnosť: focus-visible, aria popisy, 44 px dotykové ciele, reduced-motion.
- Technické: build, API fallback, bez vnorených buttonov, bez horizontálneho overflowu a bez scrollu v otázkových krokoch.

Kompozitné QA boardy a samostatné PNG snímky sú v `artifacts/screenshots/`.
