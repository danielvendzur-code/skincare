import { useEffect, useState } from 'react';
import { myloProducts } from './config.js';
import './theme.css';

const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
const MenuIcon = ({ open }) => <svg viewBox="0 0 24 24" aria-hidden="true">{open ? <path d="m6 6 12 12M18 6 6 18" /> : <><path d="M4 7h16M4 12h16M4 17h16" /></>}</svg>;

function ProductCard({ product, featured = false }) {
  return <article className={`mylo-product ${featured ? 'mylo-product--featured' : ''}`}>
    <a className="mylo-product__image" href={product.url} target="_blank" rel="noreferrer" aria-label={`Pozrieť ${product.name} na mylo.sk`}>
      <img src={product.image} alt={product.name} loading={featured ? 'eager' : 'lazy'} />
    </a>
    <div className="mylo-product__copy">
      <span>{product.category}</span>
      <h3>{product.shortName}</h3>
      <p>{product.storefrontNote}</p>
      <div><strong>{product.price}</strong><a href={product.url} target="_blank" rel="noreferrer">Detail <Arrow /></a></div>
    </div>
  </article>;
}

export function MyloStorefront({ brand, openAdvisor, openChat }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnWide = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener('resize', closeOnWide);
    return () => window.removeEventListener('resize', closeOnWide);
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  return <main className="mylo-site owner" id="mylo-top" aria-label="MYLO — mini obchod s produktovým poradcom">
    <header className="mylo-header">
      <button className="mylo-logo-button" type="button" onClick={() => goTo('mylo-top')} aria-label="MYLO — hore">
        <img src={brand.logo} alt="MYLO" />
      </button>
      <nav className="mylo-nav" aria-label="Hlavná navigácia MYLO">
        <button type="button" onClick={() => goTo('mylo-products')}>Produkty</button>
        <button type="button" onClick={() => goTo('mylo-routine')}>Pleť</button>
        <button type="button" onClick={() => goTo('mylo-routine')}>Rutina</button>
        <button className="mylo-nav__advisor" type="button" onClick={openAdvisor}>Výber starostlivosti</button>
      </nav>
      <button className="mylo-menu" type="button" aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
        <MenuIcon open={menuOpen} />
      </button>
      {menuOpen && <nav className="mylo-mobile-nav" aria-label="Mobilná navigácia MYLO">
        <button type="button" onClick={() => goTo('mylo-products')}>Produkty</button>
        <button type="button" onClick={() => goTo('mylo-routine')}>Pleť a rutina</button>
        <button type="button" onClick={() => { setMenuOpen(false); openAdvisor(); }}>Výber starostlivosti</button>
        <a href="https://www.mylo.sk/obchod/" target="_blank" rel="noreferrer">Celý obchod na mylo.sk <Arrow /></a>
      </nav>}
    </header>

    <section className="mylo-hero" aria-labelledby="mylo-hero-title">
      <div className="mylo-hero__copy">
        <span className="mylo-eyebrow">Kozmetika založená na sile rastlín</span>
        <h1 id="mylo-hero-title">Starostlivosť, ktorá ostáva jednoduchá.</h1>
        <p>Prejdite si pleťové produkty MYLO alebo si nechajte výber zúžiť podľa pocitu pleti, kroku rutiny a textúry, ktorá vám vyhovuje.</p>
        <div className="mylo-hero__actions">
          <button className="mylo-button mylo-button--dark" type="button" onClick={openAdvisor}>Nájsť starostlivosť <Arrow /></button>
          <button className="mylo-button mylo-button--plain" type="button" onClick={openChat}>Opýtať sa v Chate</button>
        </div>
        <div className="mylo-philosophy" aria-label="Princípy MYLO">
          <span><b>01</b> Príroda</span>
          <span><b>02</b> Jednoduchosť</span>
          <span><b>03</b> Premyslená rutina</span>
        </div>
      </div>

      <div className="mylo-hero__visual">
        <img className="mylo-hero__photo" src={brand.hero} alt="Produkty a prírodný vizuál MYLO" />
        <a className="mylo-hero-product" href={myloProducts[0].url} target="_blank" rel="noreferrer">
          <img src={myloProducts[0].image} alt="" />
          <span><small>Ľahký hydratačný krok</small><b>INOVAŤ</b><strong>{myloProducts[0].price}</strong></span>
          <Arrow />
        </a>
      </div>
    </section>

    <section className="mylo-products" id="mylo-products" aria-labelledby="mylo-products-title">
      <header className="mylo-section-head">
        <div><span className="mylo-eyebrow">Pleťová starostlivosť</span><h2 id="mylo-products-title">Päť produktov. Päť miest v rutine.</h2></div>
        <a href="https://www.mylo.sk/starostlivost-o-tvar/" target="_blank" rel="noreferrer">Celá kategória na mylo.sk <Arrow /></a>
      </header>
      <div className="mylo-product-grid">
        {myloProducts.map((product, index) => <ProductCard key={product.id} product={product} featured={index === 0} />)}
      </div>
    </section>

    <section className="mylo-routine" id="mylo-routine" aria-labelledby="mylo-routine-title">
      <div className="mylo-routine__intro">
        <span className="mylo-eyebrow">Jednoduchší výber</span>
        <h2 id="mylo-routine-title">Najprv krok. Potom textúra.</h2>
        <p>Štyri krátke otázky pomôžu rozlíšiť, či hľadáte čistenie, ľahšiu hydratáciu, krémový komfort alebo olejový krok. Na konci dostanete konkrétny produkt aj stručné vysvetlenie výberu.</p>
        <button className="mylo-button mylo-button--dark" type="button" onClick={openAdvisor}>Spustiť 4 otázky <Arrow /></button>
      </div>
      <div className="mylo-routine__steps">
        <article><span>01</span><div><b>Čistenie</b><p>MOISSANIT je čistiace a odličovacie mlieko pre prvý krok rutiny.</p><a href={myloProducts[1].url} target="_blank" rel="noreferrer">MOISSANIT <Arrow /></a></div></article>
        <article><span>02</span><div><b>Hydratácia</b><p>INOVAŤ ponúka ľahkú hydrogélovú textúru, RADOSŤ krémový formát.</p><button type="button" onClick={openChat}>Porovnať v Chate <Arrow /></button></div></article>
        <article><span>03</span><div><b>Olejový krok</b><p>KVETOVÁ ROSA môže rutinu pripraviť na následný pleťový olej; FLÓRA je olejový krok pre suchú a citlivú pleť.</p><a href={myloProducts[2].url} target="_blank" rel="noreferrer">FLÓRA <Arrow /></a></div></article>
      </div>
    </section>

    <footer className="mylo-footer">
      <div><img src={brand.logo} alt="MYLO" /><span>Objavte produkty MYLO alebo si nechajte výber zúžiť podľa svojej rutiny.</span></div>
      <nav aria-label="Odkazy MYLO">
        <a href="https://www.mylo.sk/obchod/" target="_blank" rel="noreferrer">Obchod</a>
        <a href="https://www.mylo.sk/vsetko-o-nakupe/o-mylo/" target="_blank" rel="noreferrer">O Mylo</a>
        <a href="https://www.mylo.sk/blog/" target="_blank" rel="noreferrer">Blog</a>
        <a href="https://www.mylo.sk/kontakt/" target="_blank" rel="noreferrer">Kontakt</a>
      </nav>
    </footer>
  </main>;
}
