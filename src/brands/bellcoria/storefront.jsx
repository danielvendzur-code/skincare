import { useState } from 'react';

function StoreLogo({ brand }) {
  return <img className="bellcoria-logo" src={brand.logo} alt="Bellcoria" />;
}

function ProductCard({ product, featured = false }) {
  return <article className={`bellcoria-product${featured ? ' bellcoria-product--featured' : ''}`} data-testid="bellcoria-product">
    <a className="bellcoria-product__image" href={product.url} target="_blank" rel="noreferrer" aria-label={`Pozrieť ${product.name}`}>
      <img src={product.image} alt={product.name} />
    </a>
    <div className="bellcoria-product__copy">
      <span>{product.role === 'cleanse' ? 'Čistenie pleti' : product.role === 'body-oil' ? 'Starostlivosť o telo' : product.role === 'oil' ? 'Pleťový olej' : 'Pleťový elixír'}</span>
      <h3>{product.name}</h3>
      <div className="bellcoria-product__meta"><b>{product.price}</b><small>{product.features.slice(0, 2).join(' · ')}</small></div>
      <a className="bellcoria-product__link" href={product.url} target="_blank" rel="noreferrer">Pozrieť produkt <span aria-hidden="true">↗</span></a>
    </div>
  </article>;
}

export function BellcoriaStorefront({ brand, openAdvisor, openChat }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);
  const byId = Object.fromEntries(brand.products.map((product) => [product.id, product]));

  return <main className="owner bellcoria-storefront" aria-label="Bellcoria mini obchod">
    <header className="bellcoria-header">
      <a className="bellcoria-brand" href="#top" aria-label="Bellcoria — späť hore" onClick={closeMenu}><StoreLogo brand={brand} /></a>
      <button className="bellcoria-menu-toggle" type="button" aria-label="Otvoriť menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>
        <span /><span />
      </button>
      <nav className={`bellcoria-nav${mobileOpen ? ' is-open' : ''}`} aria-label="Hlavná navigácia">
        <a href="#cistenie" onClick={closeMenu}>Čistenie</a>
        <a href="#plet" onClick={closeMenu}>Oleje a elixíry</a>
        <a href="#telo" onClick={closeMenu}>Telo</a>
        <button type="button" onClick={() => { closeMenu(); openChat(); }}>Poradca</button>
        <a className="bellcoria-nav__external" href="https://bellcoria.sk/produkty/" target="_blank" rel="noreferrer">Všetky produkty ↗</a>
      </nav>
    </header>

    <section className="bellcoria-hero" id="top">
      <div className="bellcoria-hero__copy">
        <span className="bellcoria-eyebrow">Organická kozmetika · Bellcoria</span>
        <h1>Olej, elixír alebo gél. Každý má v rutine inú úlohu.</h1>
        <p>Objavte čistenie, pleťové oleje, elixíry a telovú starostlivosť. Ak váhate medzi produktmi, poradca ich rozlíši podľa oblasti, textúry a času použitia.</p>
        <div className="bellcoria-hero__actions">
          <button className="bellcoria-button bellcoria-button--solid" type="button" onClick={openAdvisor}>Vybrať starostlivosť</button>
          <a className="bellcoria-button bellcoria-button--text" href="#plet">Pozrieť produkty <span aria-hidden="true">↓</span></a>
        </div>
        <div className="bellcoria-hero__index" aria-label="Kategórie v ukážke">
          <span><b>01</b> Čistenie</span><span><b>02</b> Pleťové oleje a elixíry</span><span><b>03</b> Telo</span>
        </div>
      </div>
      <div className="owner__visual bellcoria-hero__visual">
        <div className="bellcoria-hero__photo"><img src={brand.hero} alt="Bellcoria pleťová starostlivosť" /></div>
        <a className="bellcoria-hero__product" href={byId['night-elixir'].url} target="_blank" rel="noreferrer">
          <img src={byId['night-elixir'].image} alt={byId['night-elixir'].name} />
          <span><small>Večerná starostlivosť</small><b>{byId['night-elixir'].name}</b><em>{byId['night-elixir'].price}</em></span>
        </a>
      </div>
    </section>

    <section className="bellcoria-category bellcoria-category--cleanse" id="cistenie">
      <header className="bellcoria-section-head">
        <span>01 / Čistenie</span>
        <div><h2>Začnite ľahkým čistiacim krokom.</h2><p>Gél a olejová starostlivosť nie sú zameniteľné. Poradca ich preto vedie ako samostatné roly.</p></div>
      </header>
      <div className="bellcoria-cleanse-layout">
        <ProductCard product={byId.cleanser} featured />
        <aside className="bellcoria-editorial-note">
          <span>Čistenie → následná starostlivosť</span>
          <h3>Neviete, čo patrí po géle?</h3>
          <p>Opýtajte sa na rozdiel medzi pleťovým olejom a elixírom alebo prejdite štyri krátke kroky.</p>
          <button type="button" onClick={openChat}>Otvoriť Chat</button>
        </aside>
      </div>
    </section>

    <section className="bellcoria-category" id="plet">
      <header className="bellcoria-section-head">
        <span>02 / Pleť</span>
        <div><h2>Pleťové oleje a elixíry.</h2><p>Tri olejové produkty, tri odlišné roly v ponuke. Výber sa riadi tým, či chcete olej, elixír a dennú alebo večernú rutinu.</p></div>
      </header>
      <div className="bellcoria-products bellcoria-products--three">
        <ProductCard product={byId.opuntia} />
        <ProductCard product={byId.bakuchiol} />
        <ProductCard product={byId['night-elixir']} />
      </div>
    </section>

    <section className="bellcoria-category bellcoria-category--body" id="telo">
      <header className="bellcoria-section-head">
        <span>03 / Telo</span>
        <div><h2>Telová starostlivosť zostáva v telovej vetve.</h2><p>Pri výbere pre tvár poradca telový olej vylúči. Tým sa odporúčanie nemieša medzi rozdielne oblasti starostlivosti.</p></div>
      </header>
      <div className="bellcoria-body-layout">
        <ProductCard product={byId['body-astaxanthin']} featured />
        <div className="bellcoria-body-copy">
          <span>Potrebujete porovnať tvár a telo?</span>
          <h3>Štyri otázky. Jedna produktová rola.</h3>
          <p>Výber najprv určí oblasť a potom zohľadní rolu, textúru a rutinu. Výsledok vždy ukáže aj dôvod zhody.</p>
          <button className="bellcoria-button bellcoria-button--solid" type="button" onClick={openAdvisor}>Spustiť výber</button>
        </div>
      </div>
    </section>

    <footer className="bellcoria-footer">
      <StoreLogo brand={brand} />
      <p>Mini storefront používa produkty Bellcoria z aktuálneho katalógu ukážky.</p>
      <div><a href="#top">Hore ↑</a><a href="https://bellcoria.sk/" target="_blank" rel="noreferrer">bellcoria.sk ↗</a></div>
    </footer>
  </main>;
}
