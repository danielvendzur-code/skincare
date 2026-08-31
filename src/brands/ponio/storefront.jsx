import { useState } from 'react';
import { ponioCategories, ponioProducts } from './config.js';

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
}

function MenuIcon({ open }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <><path d="M6 6l12 12M18 6 6 18" /></> : <><path d="M4 7h16M4 12h16M4 17h16" /></>}</svg>;
}

function ProductImage({ product }) {
  const [failed, setFailed] = useState(false);
  return <span className={`ponio-product-image${failed ? ' is-fallback' : ''}`}>
    {!failed && <img src={product.image} alt={product.name} loading="lazy" onError={() => setFailed(true)} />}
    {failed && <span role="img" aria-label={`Fotografia produktu ${product.name} sa nenačítala`}>Fotografia sa nenačítala</span>}
  </span>;
}

export function PonioStorefront({ openChat, openAdvisor }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const featured = ponioProducts.filter((product) => ['lumina-shield', 'healthy-aging', 'mint-dry', 'banana-dry', 'double-lavender'].includes(product.id));

  return <main className="ponio-store" aria-label="PONIO mini e-shop">
    <header className="ponio-site-header">
      <a className="ponio-site-logo" href="https://ponio.sk/" target="_blank" rel="noreferrer" aria-label="PONIO domov">
        <img src="/assets/brands/ponio/logo.png" alt="PONIO" />
      </a>
      <nav className="ponio-desktop-nav" aria-label="Hlavné kategórie PONIO">
        {ponioCategories.map((category) => <a key={category.id} href={category.url} target="_blank" rel="noreferrer">{category.label}</a>)}
      </nav>
      <button className="ponio-header-advisor" type="button" onClick={openAdvisor}>Vybrať starostlivosť <ArrowIcon /></button>
      <button className="ponio-mobile-toggle" type="button" aria-expanded={mobileNavOpen} aria-controls="ponio-mobile-nav" aria-label={mobileNavOpen ? 'Zavrieť menu' : 'Otvoriť menu'} onClick={() => setMobileNavOpen((value) => !value)}><MenuIcon open={mobileNavOpen} /></button>
      <div id="ponio-mobile-nav" className={`ponio-mobile-nav${mobileNavOpen ? ' is-open' : ''}`} hidden={!mobileNavOpen}>
        {ponioCategories.map((category) => <a key={category.id} href={category.url} target="_blank" rel="noreferrer" onClick={() => setMobileNavOpen(false)}>{category.label}<ArrowIcon /></a>)}
        <button type="button" onClick={() => { setMobileNavOpen(false); openAdvisor(); }}>Vybrať starostlivosť</button>
      </div>
    </header>

    <section className="ponio-hero">
      <div className="ponio-hero-copy">
        <h1>Starostlivosť podľa toho, čo práve potrebujete.</h1>
        <p>Prejdite si pleť, vlasy, telo alebo pery. Ak sa v ponuke nechcete prehrabávať sami, štyri krátke otázky vám pomôžu zúžiť výber na konkrétny produkt.</p>
        <div className="ponio-hero-actions">
          <button type="button" className="ponio-primary-button" onClick={openAdvisor}>Vybrať starostlivosť <ArrowIcon /></button>
          <button type="button" className="ponio-text-action" onClick={openChat}>Opýtať sa v chate</button>
        </div>
        <div className="ponio-hero-note"><strong>Ručnú výrobu kombinujeme s inováciou.</strong><span>Od denného krému po tuhý šampúch — začnite tým, čo hľadáte dnes.</span></div>
      </div>
      <div className="ponio-hero-media">
        <img src="/assets/brands/ponio/hero.jpg" alt="Produkty PONIO" />
        <button className="ponio-hero-helper" type="button" onClick={openAdvisor}><span>Neviete, kde začať?</span><strong>4 otázky k produktu</strong><ArrowIcon /></button>
      </div>
    </section>

    <section className="ponio-category-band" aria-labelledby="ponio-categories-title">
      <div className="ponio-section-heading">
        <span id="ponio-categories-title">Starostlivosť o</span>
        <p>Vyberte oblasť a pokračujte priamo do ponuky PONIO.</p>
      </div>
      <div className="ponio-category-grid">
        {ponioCategories.map((category, index) => <a className="ponio-category-link" key={category.id} data-category={category.id} href={category.url} target="_blank" rel="noreferrer">
          <small>0{index + 1}</small><strong>{category.label}</strong><span>{category.detail}</span><ArrowIcon />
        </a>)}
      </div>
    </section>

    <section className="ponio-products" aria-labelledby="ponio-products-title">
      <div className="ponio-products-intro">
        <div><span>Výber z ponuky</span><h2 id="ponio-products-title">Od denného krému po šampúch.</h2></div>
        <a href="https://ponio.sk/collections/vsetky-produkty" target="_blank" rel="noreferrer">Všetky produkty <ArrowIcon /></a>
      </div>
      <div className="ponio-product-rail">
        {featured.map((product) => <a className="ponio-product-card" data-product-id={product.id} key={product.id} href={product.url} target="_blank" rel="noreferrer">
          <ProductImage product={product} />
          <span className="ponio-product-meta"><small>{product.area === 'face' ? 'Pleť' : 'Vlasy'}</small><strong>{product.name}</strong><span>{product.subtitle}</span><b>{product.price}</b></span>
        </a>)}
      </div>
    </section>

    <section className="ponio-editorial" aria-label="Rozdiel vlasových formátov">
      <div className="ponio-editorial-copy">
        <span>Vlasy · dva rozdielne kroky</span>
        <h2>Suchý šampón nie je tuhý šampón.</h2>
        <p>Mint a Banán & kokos sú suché šampóny na osvieženie medzi umytiami. Dvojitá levanduľa je tuhý šampúch na samotné umývanie vlasov. Ak váhate, chat ich porovná vedľa seba.</p>
        <button type="button" className="ponio-text-action" onClick={openChat}>Opýtať sa na rozdiel <ArrowIcon /></button>
      </div>
      <div className="ponio-editorial-products" aria-hidden="true">
        <span><img src="/assets/brands/ponio/product-3.jpg" alt="" /><small>medzi umytiami</small><b>Mint</b></span>
        <span><img src="/assets/brands/ponio/product-5.jpg" alt="" /><small>na umývanie</small><b>Dvojitá levanduľa</b></span>
      </div>
    </section>

    <footer className="ponio-site-footer">
      <img src="/assets/brands/ponio/logo.png" alt="PONIO" />
      <nav aria-label="PONIO odkazy"><a href="https://ponio.sk/pages/home" target="_blank" rel="noreferrer">O PONIO</a><a href="https://ponio.sk/collections/vsetky-produkty" target="_blank" rel="noreferrer">Produkty</a><button type="button" onClick={openChat}>Poradiť s výberom</button></nav>
      <span>Objavte PONIO podľa kategórie alebo si nechajte výber zúžiť.</span>
    </footer>
  </main>;
}
