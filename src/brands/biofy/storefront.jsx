import { useEffect, useState } from 'react';

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

function MenuIcon({ open }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></> : <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>}</svg>;
}

function ProductCard({ product, tone = 'light' }) {
  return <article className={`biofy-product biofy-product--${tone}`} data-product-id={product.id}>
    <a className="biofy-product__image" href={product.url} target="_blank" rel="noreferrer" aria-label={`Pozrieť produkt ${product.name} na biofy.sk`}>
      <img src={product.image} alt={product.name} loading="lazy" />
    </a>
    <div className="biofy-product__body">
      <span className="biofy-product__category">{product.area === 'face' ? 'Pleť' : 'Vlasy'}</span>
      <h3>{product.shortName}</h3>
      <p>{product.summary}</p>
      <div className="biofy-product__meta">
        <span><s>{product.regularPrice}</s><strong>{product.price}</strong></span>
        <a href={product.url} target="_blank" rel="noreferrer">Detail <ArrowIcon /></a>
      </div>
    </div>
  </article>;
}

export function BiofyStorefront({ brand, openAdvisor, openChat }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return <main className="biofy-storefront" aria-label="BIOFY mini obchod">
    <header className="biofy-header">
      <a className="biofy-header__brand" href="#top" aria-label="BIOFY — hore">
        <img src={brand.logo} alt="BIOFY" />
      </a>
      <nav className="biofy-nav biofy-nav--desktop" aria-label="Kategórie BIOFY">
        <a href="#plet">Pleť</a>
        <a href="#vlasy">Vlasy</a>
        <a href="https://biofy.sk/obchod/" target="_blank" rel="noreferrer">Celý obchod</a>
      </nav>
      <button className="biofy-header__advisor" type="button" onClick={openAdvisor}>Vybrať starostlivosť <ArrowIcon /></button>
      <button className="biofy-menu-button" type="button" aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'} aria-expanded={menuOpen} aria-controls="biofy-mobile-nav" onClick={() => setMenuOpen((value) => !value)}><MenuIcon open={menuOpen} /></button>
      <nav id="biofy-mobile-nav" className="biofy-nav biofy-nav--mobile" data-open={menuOpen ? 'true' : 'false'} aria-label="Mobilné kategórie BIOFY">
        <a href="#plet" onClick={closeMenu}>Pleť</a>
        <a href="#vlasy" onClick={closeMenu}>Vlasy</a>
        <button type="button" onClick={() => { closeMenu(); openAdvisor(); }}>Výber starostlivosti</button>
        <a href="https://biofy.sk/obchod/" target="_blank" rel="noreferrer" onClick={closeMenu}>Celý obchod</a>
      </nav>
    </header>

    <section className="biofy-hero" id="top">
      <div className="biofy-hero__copy">
        <p className="biofy-eyebrow">BIOFY · starostlivosť podľa oblasti</p>
        <h1>Pleť a vlasy.<br/>Každá rutina samostatne.</h1>
        <p className="biofy-hero__lead">Tri pleťové krémy a dva vlasové produkty z aktuálneho výberu. Poradca najprv oddelí kategóriu a až potom porovná konkrétne možnosti.</p>
        <div className="biofy-hero__actions">
          <button className="biofy-button biofy-button--primary" type="button" onClick={openAdvisor}>Nájsť svoj produkt <ArrowIcon /></button>
          <button className="biofy-button biofy-button--text" type="button" onClick={openChat}>Opýtať sa v chate</button>
        </div>
        <div className="biofy-category-jump" aria-label="Rýchly výber kategórie">
          <a href="#plet"><span>01</span><b>Pleť</b><small>3 krémy</small></a>
          <a href="#vlasy"><span>02</span><b>Vlasy</b><small>tonikum + olej</small></a>
        </div>
      </div>
      <div className="biofy-hero__visual">
        <img src={brand.hero} alt="BIOFY starostlivosť o pleť a vlasy" />
        <button type="button" className="biofy-hero__advisor-card" onClick={openAdvisor}>
          <span>4 krátke kroky</span>
          <b>Pleť alebo vlasy?</b>
          <small>Výsledok zostane v správnej kategórii.</small>
          <ArrowIcon />
        </button>
      </div>
    </section>

    <section className="biofy-face" id="plet" aria-labelledby="biofy-face-title">
      <header className="biofy-section-heading">
        <div><span>01 / PLEŤ</span><h2 id="biofy-face-title">Krém podľa typu pleti.</h2></div>
        <p>Hydratačný, výživný alebo konopný. Porovnanie vychádza z určenia produktu a preferovanej textúry, nie zo zdravotnej diagnózy.</p>
      </header>
      <div className="biofy-products biofy-products--face">
        {brand.faceProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>

    <section className="biofy-hair" id="vlasy" aria-labelledby="biofy-hair-title">
      <header className="biofy-section-heading biofy-section-heading--inverse">
        <div><span>02 / VLASY</span><h2 id="biofy-hair-title">Tonikum alebo olejček?</h2></div>
        <p>Dve odlišné formy vlasovej starostlivosti. Poradca rozlišuje pokožku hlavy, dĺžky, formát a jednoduchosť rutiny — bez garancií rastu vlasov.</p>
      </header>
      <div className="biofy-products biofy-products--hair">
        {brand.hairProducts.map((product) => <ProductCard key={product.id} product={product} tone="dark" />)}
        <aside className="biofy-hair__editorial">
          <span>Nie ste si istí?</span>
          <h3>Najprv oblasť. Potom formát.</h3>
          <p>Chat porovná pomenované produkty. Výber starostlivosti použije štyri deterministické kroky.</p>
          <button type="button" onClick={openAdvisor}>Spustiť výber <ArrowIcon /></button>
        </aside>
      </div>
    </section>

    <footer className="biofy-footer">
      <img src={brand.logo} alt="BIOFY" />
      <p>Ukážka používa produkty a ceny zachytené z biofy.sk. Aktuálna cena a dostupnosť sa vždy overujú na oficiálnom webe.</p>
      <a href="https://biofy.sk/" target="_blank" rel="noreferrer">biofy.sk <ArrowIcon /></a>
    </footer>
  </main>;
}
