import { useState } from 'react';

const external = { target: '_blank', rel: 'noreferrer' };

function SmartImage({ src, fallback, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  return <img className={className} src={failed ? fallback : src} alt={alt} onError={() => setFailed(true)} />;
}

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

export function TwoStorefront({ brand, openAdvisor, openChat }) {
  const featured = brand.products[0];
  const bakuchiol = brand.products[1];
  return <main className="owner two-storefront" aria-label="TWO COSMETICS mini obchod">
    <header className="two-site__header">
      <a className="two-site__brand" href="https://www.twocosmetics.sk/" {...external} aria-label="TWO COSMETICS — oficiálny web">
        <img src={brand.logo} alt="TWO COSMETICS" />
      </a>
      <nav className="two-site__nav" aria-label="Hlavná navigácia">
        <a href="https://www.twocosmetics.sk/plet" {...external}>Pleť</a>
        <a href="https://www.twocosmetics.sk/sera" {...external}>Séra</a>
        <a href="https://www.twocosmetics.sk/kremy" {...external}>Krémy</a>
        <a href="https://www.twocosmetics.sk/cistenie-pleti" {...external}>Čistenie</a>
      </nav>
      <button className="two-site__chat" type="button" onClick={openChat}>Otvoriť Chat</button>
    </header>

    <section className="two-hero">
      <div className="two-hero__copy">
        <span className="two-eyebrow">NATURALLY SCIENTIFIC</span>
        <h1>Veda a príroda.<br />V jednej rutine.</h1>
        <p>Vyberte si podľa kroku rutiny, textúry a aktívnej látky. Keď váhate medzi produktmi, poradca porovná iba overené údaje z katalógu.</p>
        <div className="two-hero__actions">
          <a className="two-button two-button--dark" href="#two-products">Objaviť produkty <Arrow /></a>
          <button className="two-button two-button--line" type="button" onClick={openAdvisor}>Vybrať starostlivosť <Arrow /></button>
        </div>
        <div className="two-chemistry" aria-label="Témy kolekcie">
          <span><b>HA⁶</b><small>hydratácia</small></span>
          <span><b>1 %</b><small>bakuchiol</small></span>
          <span><b>2 %</b><small>salicylová kyselina</small></span>
        </div>
      </div>

      <div className="two-hero__visual">
        <div className="two-hero__field" aria-hidden="true"><span>H</span><i>2</i><span>O</span></div>
        <article className="two-featured-product">
          <span className="two-featured-product__kicker">HYDRATATION / 01</span>
          <SmartImage src={featured.image} fallback={featured.fallbackImage} alt={featured.name} />
          <div className="two-featured-product__meta">
            <div><small>6 FORMS OF HYALURONIC ACID</small><strong>{featured.shortName}</strong></div>
            <a href={featured.url} {...external} aria-label={`Detail produktu ${featured.name}`}><Arrow /></a>
          </div>
        </article>
        <div className="two-hero__note"><b>science × nature</b><span>produkt → rutina → konkrétny výber</span></div>
      </div>
    </section>

    <section className="two-products" id="two-products" aria-labelledby="two-products-title">
      <header className="two-section-head">
        <div><span>01 / PLEŤ</span><h2 id="two-products-title">Produkty v jednej rutine</h2></div>
        <button type="button" onClick={openAdvisor}>Neviete ktorý? Spustiť výber <Arrow /></button>
      </header>
      <div className="two-product-grid">
        {brand.products.map((product, index) => <article className={`two-product-card two-product-card--${index + 1}`} key={product.id}>
          <a className="two-product-card__image" href={product.url} {...external} aria-label={`Pozrieť ${product.name}`}>
            <SmartImage src={product.image} fallback={product.fallbackImage} alt={product.name} />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </a>
          <div className="two-product-card__copy">
            <small>{product.eyebrow}</small>
            <h3><a href={product.url} {...external}>{product.name}</a></h3>
            <div><span>{product.subtitle}</span><b>{product.price}</b></div>
          </div>
        </article>)}
      </div>
      <p className="two-price-note">Ceny sú zachytené z oficiálneho katalógu 28. 8. 2026. Pre aktuálnu cenu a dostupnosť je rozhodujúci oficiálny e-shop TWO COSMETICS.</p>
    </section>

    <section className="two-routine" aria-labelledby="two-routine-title">
      <div className="two-routine__intro">
        <span>02 / ROUTINE</span>
        <h2 id="two-routine-title">Tri roly. Menej hádania.</h2>
        <p>Čistenie, sérum a krém sú odlišné kroky. Výber ich najprv oddelí a až potom porovná hydratáciu, aktívnu starostlivosť, textúru a čas použitia.</p>
      </div>
      <div className="owner-benefits two-routine-rail" aria-label="Základ rutiny">
        <article><b>01</b><span><strong>Čistenie</strong><small>AM/PM Cleansing Gel · 2 % salicylová kyselina</small></span></article>
        <article><b>02</b><span><strong>Sérum</strong><small>HA⁶ pre hydratáciu alebo 1 % bakuchiol podľa preferencie</small></span></article>
        <article><b>03</b><span><strong>Krém</strong><small>Hydratačný alebo produktovo zameraný krém</small></span></article>
      </div>
      <aside className="two-routine__feature">
        <SmartImage src={bakuchiol.image} fallback={bakuchiol.fallbackImage} alt={bakuchiol.name} />
        <div><small>TEXTURE / OIL</small><strong>Bakuchiol 1 %</strong><span>Ráno aj večer podľa oficiálneho návodu.</span><a href={bakuchiol.url} {...external}>Detail produktu <Arrow /></a></div>
      </aside>
    </section>

    <footer className="two-site__footer">
      <img src={brand.logo} alt="TWO COSMETICS" />
      <div><a href="https://www.twocosmetics.sk/o-nas" {...external}>O nás</a><a href="https://www.twocosmetics.sk/kontakty" {...external}>Kontakt</a><a href="https://www.twocosmetics.sk/" {...external}>Oficiálny e-shop</a></div>
      <button type="button" onClick={openAdvisor}>Výber starostlivosti <Arrow /></button>
    </footer>
  </main>;
}
