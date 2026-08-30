# Skincare chatbot family

Produkčná ukážková rodina chatbotov a 4-krokových produktových poradcov pre šesť skincare značiek:

- `/ukazka/mylo`
- `/ukazka/ponio`
- `/ukazka/two`
- `/ukazka/bellcoria`
- `/ukazka/biofy`
- `/ukazka/anemone`

Každá trasa má vlastnú vizuálnu identitu, reálne produkty a priame odkazy na oficiálny e-shop. Logo, hero fotografie, produktové obrázky aj ilustrácie volieb sú lokálne assety.

## Lokálne spustenie

```bash
pnpm install
pnpm dev
```

Chat funguje bez konfigurácie cez deterministický fallback. Pre voliteľnú odpoveď modelu nastavte `ANTHROPIC_API_KEY`; serverless endpoint má timeout a pri chybe automaticky použije fallback.

## Overenie

```bash
pnpm build
pnpm test
```

Playwright suite kontroluje všetkých šesť značiek, desktop aj mobil, 4 kroky poradcu, chat, Escape, focus/scroll správanie, reálne cieľové URL a reduced-motion. Vizuálne artefakty sú v `artifacts/screenshots/`.

Podrobnosti o zdrojoch a QA: [`docs/research-and-qa.md`](docs/research-and-qa.md).
