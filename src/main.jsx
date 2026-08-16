import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { brands, brandOrder } from './brands.js';
import './styles.css';

const Icon = ({ name }) => {
  const paths = {
    chat: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4.2A2.5 2.5 0 0 1 4 12.5z"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    reset: <><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    send: <><path d="m4 4 17 8-17 8 3-8zM7 12h14"/></>,
    spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4z"/><path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

function Logo({ brand, compact = false }) {
  return <img className={`brand-logo ${compact ? 'brand-logo--compact' : ''}`} src={brand.logo} alt={brand.name} />;
}

function OwnerPage({ brand, openAdvisor, openChat }) {
  return <main className="owner" aria-label={`Prezentácia poradcu pre ${brand.name}`}>
    <header className="owner__header">
      <Logo brand={brand} />
      <a href="https://mojchatbot.sk/kontakt" target="_blank" rel="noreferrer">Chcem to na svoj web <Icon name="arrow" /></a>
    </header>
    <section className="owner__hero">
      <div className="owner__copy">
        <span className="owner__eyebrow">Čo poradca robí</span>
        <h1>Odpovie na otázky. Odporučí konkrétny produkt.</h1>
        <p>Pracuje s ponukou {brand.name}, vysvetlí rozdiely a podľa štyroch odpovedí zúži výber na vhodnú starostlivosť.</p>
        <div className="owner__actions">
          <button className="button button--primary" onClick={openAdvisor}>Vyskúšať Výber starostlivosti <Icon name="arrow" /></button>
          <button className="button button--secondary" onClick={openChat}>Skúsiť Chat <Icon name="chat" /></button>
        </div>
        <section className="owner-benefits" aria-label="Prínosy pre e-shop">
          <span className="owner-benefits__label">Prínosy pre e-shop</span>
          <div>{brand.benefits.map((benefit) => <p key={benefit}><b>✓</b>{benefit}</p>)}</div>
        </section>
      </div>
      <div className="owner__visual" aria-hidden="true">
        <img src={brand.hero} alt="" />
        <div className="workflow">
          {['Chat', 'Výber', 'Produkt'].map((item, index) => <React.Fragment key={item}>
            <div><b>{item}</b><small>{['Odpovie na otázku', '4 jednoduché rozhodnutia', 'Konkrétny produkt'][index]}</small></div>
            {index < 2 && <Icon name="arrow" />}
          </React.Fragment>)}
        </div>
      </div>
    </section>
    <footer><a href="https://mojchatbot.sk" target="_blank" rel="noreferrer">mojchatbot.sk</a><span>Pripravené pre {brand.name}</span></footer>
  </main>;
}

function Chat({ brand, startAdvisor }) {
  const [messages, setMessages] = useState(() => [{ from: 'bot', text: `Dobrý deň. Povedzte mi, čo hľadáte alebo s čím potrebujete poradiť. Pomôžem vám zúžiť výber z ponuky ${brand.name}.` }]);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const initial = messages.length === 1;
  const send = async (text) => {
    const clean = text.trim();
    if (!clean || busy) return;
    setMessages((items) => [...items, { from: 'user', text: clean }]);
    setValue(''); setBusy(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ brand: brand.slug, message: clean }) });
      if (!response.ok) throw new Error('network');
      const data = await response.json();
      setMessages((items) => [...items, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages((items) => [...items, { from: 'bot', text: brand.fallback(clean) }]);
    } finally { setBusy(false); }
  };
  return <div className="chat-view">
    {initial && <button className="handoff" onClick={startAdvisor}>
      <span className="handoff__icon"><Icon name="spark" /></span>
      <span><b>Nájsť svoju starostlivosť za 4 kroky</b><small>Typ · cieľ · rutina · textúra</small></span>
      <Icon name="arrow" />
    </button>}
    <div className="messages" aria-live="polite">
      {messages.map((message, index) => <div key={index} className={`message-row message-row--${message.from}`}>
        {message.from === 'bot' ? <span className="chat-avatar" aria-hidden="true"><Logo brand={brand} compact /></span> : null}
        <div className={`bubble bubble--${message.from}`}>{message.text}</div>
      </div>)}
      {busy && <div className="message-row message-row--bot"><span className="chat-avatar" aria-hidden="true"><Logo brand={brand} compact /></span><div className="bubble bubble--bot bubble--typing">•••</div></div>}
    </div>
    {initial && <div className="quick-chips">{brand.chips.map((chip) => <button key={chip} onClick={() => send(chip)}>{chip}</button>)}</div>}
    <form className="composer" onSubmit={(event) => { event.preventDefault(); send(value); }}>
      <input aria-label="Napíšte správu" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Napíšte správu…" />
      <button aria-label="Odoslať" type="submit"><Icon name="send" /></button>
    </form>
  </div>;
}

function ChoiceImage({ option }) {
  return <span className="choice-image" aria-hidden="true"><img src={option.image} alt="" /></span>;
}

function Advisor({ brand, onDone }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const choose = (option, index) => {
    const next = [...answers.slice(0, step), option.value];
    setAnswers(next);
    window.setTimeout(() => {
      if (step === 3) { setResult(brand.products[Math.abs(next.join('').length) % brand.products.length]); onDone?.(); }
      else setStep((value) => value + 1);
    }, 180);
  };
  if (result) return <Result brand={brand} product={result} alternative={brand.products.find((item) => item.url !== result.url)} restart={() => { setStep(0); setAnswers([]); setResult(null); }} />;
  const question = brand.questions[step];
  return <div className="advisor-view">
    <div className="advisor-top">
      <button className="icon-button" aria-label="Späť" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}><Icon name="back" /></button>
      <div className="progress"><b>{step + 1}/4</b><span>{[0,1,2,3].map((item) => <i key={item} className={item <= step ? 'is-on' : ''} />)}</span></div>
    </div>
    <h2>{question.title}</h2>
    <p>{question.hint}</p>
    <div className="choice-grid">{question.options.map((option, index) => <button key={option.value} className={answers[step] === option.value ? 'is-selected' : ''} onClick={() => choose(option, index)}>
      <ChoiceImage option={option} /><span>{option.label}</span>
    </button>)}</div>
  </div>;
}

function Result({ brand, product, alternative, restart }) {
  return <div className="result-view">
    <div className="result-kicker">Na základe vašich preferencií</div>
    <div className="result-card">
      <img src={product.image} alt={product.name} />
      <div><h2>{product.name}</h2><b className="price">{product.price}</b><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
    </div>
    <div className="why"><b>Prečo tento produkt</b><p>{product.reason}</p></div>
    <a className="button button--primary result-cta" href={product.url} target="_blank" rel="noreferrer">Pozrieť produkt <Icon name="arrow" /></a>
    <div className="alternative"><span>Alternatíva</span><a href={alternative.url} target="_blank" rel="noreferrer">{alternative.name} · {alternative.price}</a></div>
    <button className="text-button" onClick={restart}>Vybrať znova</button>
  </div>;
}

function Widget({ brand, open, setOpen, initialMode, onModeChange }) {
  const [mode, setMode] = useState(initialMode);
  const [resetKey, setResetKey] = useState(0);
  const panelRef = useRef(null);
  useEffect(() => setMode(initialMode), [initialMode, open]);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('widget-open');
    panelRef.current?.focus();
    const keydown = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll('button:not(:disabled),a[href],input')];
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.classList.remove('widget-open'); document.removeEventListener('keydown', keydown); };
  }, [open, setOpen]);
  const switchMode = (next) => { setMode(next); onModeChange?.(next); };
  return <>
    {!open && <div className="launcher-wrap"><div className="teaser"><button aria-label="Zavrieť pozvánku">×</button><b>{brand.teaserTitle}</b><span>{brand.teaser}</span></div><button className="launcher" aria-label={`Otvoriť poradcu ${brand.name}`} onClick={() => setOpen(true)}><Logo brand={brand} compact /></button></div>}
    {open && <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="widget" role="dialog" aria-modal="true" aria-label={`Poradca ${brand.name}`} tabIndex="-1" ref={panelRef}>
        <header className="widget__header"><Logo brand={brand} /><div><button aria-label="Začať odznova" onClick={() => setResetKey((value) => value + 1)}><Icon name="reset" /></button><button aria-label="Zavrieť" onClick={() => setOpen(false)}><Icon name="close" /></button></div></header>
        <div className={`mode-switch ${mode === 'advisor' ? 'is-advisor' : ''}`} role="tablist"><span className="mode-thumb" aria-hidden="true" /><button role="tab" aria-selected={mode === 'chat'} onClick={() => switchMode('chat')}><Icon name="chat" />Chat</button><button role="tab" aria-selected={mode === 'advisor'} onClick={() => switchMode('advisor')}><Icon name="spark" />Výber starostlivosti</button></div>
        <div className="widget__body" key={`${resetKey}-${mode}`}>{mode === 'chat' ? <Chat brand={brand} startAdvisor={() => switchMode('advisor')} /> : <Advisor brand={brand} />}</div>
      </section>
    </div>}
  </>;
}

function App() {
  const slug = location.pathname.split('/').filter(Boolean).at(-1) || new URLSearchParams(location.search).get('brand') || 'mylo';
  const brand = brands[brandOrder.includes(slug) ? slug : 'mylo'];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('chat');
  useEffect(() => { document.documentElement.dataset.brand = brand.slug; document.title = `${brand.name} · Výber starostlivosti`; }, [brand]);
  const launch = (next) => { setMode(next); setOpen(true); };
  return <><OwnerPage brand={brand} openAdvisor={() => launch('advisor')} openChat={() => launch('chat')} /><Widget brand={brand} open={open} setOpen={setOpen} initialMode={mode} onModeChange={setMode} /></>;
}

createRoot(document.getElementById('root')).render(<App />);
