# Nasadenie rastliny-demo

Samostatný Vercel projekt z `danielvendzur-code/skincare`, Root Directory `rastliny-demo`. Framework Other, bez build príkazu, Output Directory `.`. Produkčná vetva sa nastaví až pri zaradení zmien; pracovná vetva je `codex/rastliny-ukazky`. PR sa neotvára automaticky.

`python3 tools/routes.py` vytvorí index, adresáre, `.htaccess` a `vercel.json`. Ukážka sa dá otvoriť ako `/cosmetics.html?demo=<slug>`, `/<slug>/` alebo `/rastliny/<slug>`. Host rewrite a index rozpoznajú nižšie uvedené subdomény.

API bez kľúča vracia katalógové odpovede. Na rozšírenie použite serverové `ANTHROPIC_API_KEY` a voliteľné `CHAT_MODEL` (predvolené `claude-haiku-4-5` podľa základného segmentu). Použité rozhranie: [oficiálna Messages dokumentácia](https://platform.claude.com/docs/en/api/messages/create). Kľúč nepatrí do klienta. Na bežnom statickom hostingu funguje lokálna odpoveď v prehliadači; serverové rozhranie vyžaduje Vercel alebo vlastný Node server.

Subdomény sú pripravené v routách. DNS a nový Vercel projekt sa touto zmenou nevytvárajú.

| Subdoména na pripojenie | Ukážka |
|---|---|
| `plantizia.mojchatbot.sk` | `/cosmetics.html?demo=plantizia` |
