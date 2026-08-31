import { useEffect, useState } from 'react';

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

function MenuIcon({ open }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}</svg>;
}

function ProductCard({ product, compact = false }) {
  return <article className={`an-product${compact ? ' an-product--compact' : ''}`}>
    <a className="an-product__image" href={product.url} target="_blank" rel="noreferrer" aria-label={`Pozrieť ${product.name}`}>
      <img src={product.image} alt={product.name} loading={compact ? 'lazy' : 'eager'} />
    </a>
    <div className="an-product__copy">
      <span>{product.role === 'water' ? 'Kvetová voda' : product.role === 'oil' ? 'Pleťový olej' : product.role === 'balm' ? 'Starostlivosť o pery' : 'Starostlivosť o vlasy'}</span>
      <h3><a href={product.url} target="_blank" rel="noreferrer">{product.name}</a></h3>
      <div><b>{product.price}</b><a href={product.url} target="_blank" rel="noreferrer">Detail produktu <ArrowIcon /></a></div>
    </div>
  </article>;
}

export function AnemoneStorefront({ brand, openAdvisor, openChat }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const [rose, chamomile, oil, balm, shampoo] = brand.products;
  const closeMenu = () => setMenuOpen(false);
  const navItems = [
    ['Kvetové vody', '#kvetove-vody'],
    ['Pleťové oleje', '#pletove-oleje'],
    ['Pery', '#pery'],
    ['Vlasy', '#vlasy'],
  ];

  return <main className="an-store" aria-label="ANEMONE prírodná kozmetika">
    <header className="an-header">
      <a className="an-logo" href="#top" aria-label="ANEMONE — hore" onClick={closeMenu}><img src={brand.logo} alt="ANEMONE" /></a>
      <nav className="an-nav" aria-label="Hlavná navigácia">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <button className="an-header__advisor" type="button" onClick={openAdvisor}>Pomôcť s výberom <ArrowIcon /></button>
      <button className="an-menu-button" type="button" aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><MenuIcon open={menuOpen} /></button>
      {menuOpen ? <nav className="an-mobile-nav" aria-label="Mobilná navigácia">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
        <button type="button" onClick={() => { closeMenu(); openAdvisor(); }}>Výber starostlivosti</button>
      </nav> : null}
    </header>

    <section className="an-hero" id="top">
      <div className="an-hero__copy">
        <h1>Kozmetika,<br />čo dýcha prírodou.</h1>
        <p>Ručne vyrábaná na Slovensku v malých množstvách. Prejdite si kvetové vody, pleťový olej, starostlivosť o pery a vlasy — alebo si nechajte výber zúžiť podľa toho, aký krok hľadáte.</p>
        <div className="an-hero__actions">
          <a className="an-button an-button--dark" href="#kvetove-vody">Pozrieť starostlivosť <ArrowIcon /></a>
          <button className="an-button an-button--light" type="button" onClick={openChat}>Opýtať sa v chate</button>
        </div>
      </div>
      <div className="an-hero__media">
        <img src={brand.hero} alt="Pleťový olej ANEMONE" />
        <a className="an-hero__product" href={oil.url} target="_blank" rel="noreferrer">
          <span>Pleťová starostlivosť</span>
          <b>{oil.name}</b>
          <small>{oil.price} <ArrowIcon /></small>
        </a>
      </div>
    </section>

    <section className="an-waters an-section" id="kvetove-vody">
      <header className="an-section__head">
        <div><span>01</span><h2>Kvetové vody</h2></div>
        <p>Ruža damascénska alebo Harmanček. Obe sú ľahké vodné kroky; ak váhate medzi nimi, chat ich porovná bez miešania s úplne iným typom produktu.</p>
      </header>
      <div className="an-waters__grid"><ProductCard product={rose} /><ProductCard product={chamomile} /></div>
    </section>

    <section className="an-oil an-section an-product an-product--feature" id="pletove-oleje">
      <div className="an-oil__media"><img src={oil.image} alt={oil.name} loading="lazy" /></div>
      <div className="an-oil__copy">
        <span>02 · Pleťové oleje</span>
        <h2>Iný formát.<br />Iné miesto v rutine.</h2>
        <p>{oil.name} je 30 ml olej v sklenenej fľaške s pipetou. Výrobca ho uvádza na čistú, jemne vlhkú pleť; ak sa rozhodujete medzi vodným a olejovým krokom, poradca vám rozdiel vysvetlí priamo.</p>
        <div><b>{oil.price}</b><a className="an-text-link" href={oil.url} target="_blank" rel="noreferrer">Pozrieť produkt <ArrowIcon /></a></div>
      </div>
    </section>

    <section className="an-essentials an-section" aria-label="Pery a vlasy">
      <header className="an-section__head an-section__head--compact"><div><span>03</span><h2>Malé každodenné formáty</h2></div><button type="button" onClick={openAdvisor}>Neviete, čo patrí kam? Spustiť výber <ArrowIcon /></button></header>
      <div className="an-essentials__grid">
        <div id="pery"><ProductCard product={balm} compact /></div>
        <div id="vlasy"><ProductCard product={shampoo} compact /></div>
      </div>
    </section>

    <footer className="an-footer">
      <div><img src={brand.logo} alt="ANEMONE" /><p>Produkty vyrábané ručne v malých množstvách na Slovensku.</p></div>
      <div><a href="#kvetove-vody">Pleť</a><a href="#pery">Pery</a><a href="#vlasy">Vlasy</a><a href="https://anemone.sk/" target="_blank" rel="noreferrer">anemone.sk <ArrowIcon /></a></div>
    </footer>
  </main>;
}
