import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { brands as legacyBrands, brandOrder as legacyBrandOrder } from './brands.js';
import { biofy } from './brands/biofy/config.js';
import { BiofyStorefront } from './brands/biofy/storefront.jsx';
import './styles.css';
import './brands/biofy/theme.css';

const brands = { ...legacyBrands, biofy };
const brandOrder = [...new Set([...legacyBrandOrder, 'biofy'])];

const OWNER_BENEFITS = [
  { title: 'Menej nerozhodných zákazníkov', detail: 'Pomoc priamo vo chvíli, keď si vyberajú.' },
  { title: 'Viac návštev konkrétnych produktov', detail: 'Každý výber končí jasným odporúčaním.' },
  { title: 'Menej opakovaných otázok', detail: 'Chat vysvetlí rozdiely a nasmeruje zákazníka.' },
];

const Icon = ({ name }) => {
  const paths = {
    chat: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4.2A2.5 2.5 0 0 1 4 12.5z"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    reset: <><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    send: <><path d="m4 4 17 8-17 8 3-8zM7 12h14"/></>,
    spark: <><path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4z"/><path d="m18.5 14 .8 2.2 2.2 .8-2.2 .8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

function Logo({ brand, compact = false }) {
  if (compact && brand.slug === 'anemone') return <span className="brand-logo brand-logo--compact brand-logo--letter" role="img" aria-label={brand.name}>A</span>;
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
        <h1>Odpovie na otázky. Odporučí konkrétny produkt.</h1>
        <section className="owner-benefits" aria-label="Čo poradca prinesie e-shopu">
          {OWNER_BENEFITS.map((benefit) => <article key={benefit.title}>
            <b aria-hidden="true">✓</b>
            <span><strong>{benefit.title}</strong><small>{benefit.detail}</small></span>
          </article>)}
        </section>
        <div className="owner__actions">
          <button className="button button--primary owner__primary-action" onClick={openAdvisor}><span><b>Vyskúšať výber starostlivosti</b><small>4 otázky · konkrétny produkt</small></span><Icon name="arrow" /></button>
          <button className="button button--secondary" onClick={openChat}>Otvoriť Chat <Icon name="chat" /></button>
        </div>
      </div>
      <div className="owner__visual" aria-hidden="true">
        <img src={brand.hero} alt="" />
      </div>
    </section>
    <footer><a href="https://mojchatbot.sk" target="_blank" rel="noreferrer">mojchatbot.sk</a><span>Pripravené pre {brand.name}</span></footer>
  </main>;
}

function Chat({ brand, startAdvisor, messages, setMessages }) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const initial = messages.length === 1;

  const send = async (text) => {
    const clean = text.trim();
    if (!clean || busy) return;

    const nextMessages = [...messages, { from: 'user', text: clean }];
    setMessages(nextMessages);
    setValue('');
    setBusy(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6500);
    try {
      const history = nextMessages.map((message) => ({ role: message.from === 'bot' ? 'assistant' : 'user', content: message.text }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand: brand.slug, messages: history }),
      });
      if (!response.ok) throw new Error(`chat-${response.status}`);
      const data = await response.json();
      if (!data || typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('chat-empty');
      setMessages((items) => [...items, { from: 'bot', text: data.reply.trim() }]);
    } catch {
      setMessages((items) => [...items, { from: 'bot', text: brand.fallback(clean) }]);
    } finally {
      window.clearTimeout(timeout);
      setBusy(false);
    }
  };

  return <div className="chat-view">
    {initial && <button className="handoff" onClick={startAdvisor}>
      <span className="handoff__icon"><Icon name="spark" /></span>
      <span><b>Nájsť svoju starostlivosť</b><small>4 krátke otázky · konkrétny produkt</small></span>
      <span className="handoff__arrow"><Icon name="arrow" /></span>
    </button>}
    <div className="messages" aria-live="polite">
      {messages.map((message, index) => <div key={`${message.from}-${index}`} className={`message-row message-row--${message.from}`}>
        {message.from === 'bot' ? <span className="chat-avatar" aria-hidden="true"><Logo brand={brand} compact /></span> : null}
        <div className={`bubble bubble--${message.from}`}>{message.text}</div>
      </div>)}
      {busy && <div className="message-row message-row--bot"><span className="chat-avatar" aria-hidden="true"><Logo brand={brand} compact /></span><div className="bubble bubble--bot bubble--typing" aria-label="Poradca píše">•••</div></div>}
    </div>
    {initial && <div className="quick-chips">{brand.chips.map((chip) => <button key={chip} onClick={() => send(chip)}>{chip}</button>)}</div>}
    <form className="composer" onSubmit={(event) => { event.preventDefault(); send(value); }}>
      <input aria-label="Napíšte správu" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Napíšte správu…" maxLength={700} />
      <button aria-label="Odoslať" type="submit" disabled={busy || !value.trim()}><Icon name="send" /></button>
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
  const [transitioning, setTransitioning] = useState(false);
  const transitionRef = useRef(null);
  const totalSteps = brand.advisorSteps ?? brand.questions?.length ?? 4;

  useEffect(() => () => window.clearTimeout(transitionRef.current), []);

  const question = brand.getAdvisorQuestion ? brand.getAdvisorQuestion(step, answers) : brand.questions[step];

  const choose = (option) => {
    if (transitioning) return;
    const next = [...answers.slice(0, step), option.value];
    setAnswers(next);
    setTransitioning(true);
    transitionRef.current = window.setTimeout(() => {
      if (step === totalSteps - 1) {
        const recommendation = brand.recommend
          ? brand.recommend(next)
          : (() => {
              const product = brand.products[Math.abs(next.join('').length) % brand.products.length];
              return { product, alternative: brand.products.find((item) => item.url !== product.url), reason: product.reason };
            })();
        setResult(recommendation);
        onDone?.();
      } else {
        setStep((value) => value + 1);
      }
      setTransitioning(false);
    }, 180);
  };

  const goBack = () => {
    if (transitioning) return;
    setStep((value) => Math.max(0, value - 1));
  };

  const restart = () => {
    window.clearTimeout(transitionRef.current);
    setStep(0);
    setAnswers([]);
    setResult(null);
    setTransitioning(false);
  };

  if (result) return <Result brand={brand} product={result.product} alternative={result.alternative} reason={result.reason} restart={restart} />;

  return <div className="advisor-view">
    <div className="advisor-top">
      <button className="icon-button" aria-label="Späť" disabled={step === 0 || transitioning} onClick={goBack}><Icon name="back" /></button>
      <div className="progress"><b>{step + 1}/{totalSteps}</b><span>{Array.from({ length: totalSteps }, (_, item) => <i key={item} className={item <= step ? 'is-on' : ''} />)}</span></div>
    </div>
    <h2>{question.title}</h2>
    <p>{question.hint}</p>
    <div className={`choice-grid choice-grid--${question.options.length}`}>{question.options.map((option) => <button key={option.value} disabled={transitioning} className={answers[step] === option.value ? 'is-selected' : ''} onClick={() => choose(option)}>
      <ChoiceImage option={option} /><span>{option.label}</span>
    </button>)}</div>
  </div>;
}

function Result({ brand, product, alternative, reason, restart }) {
  return <div className="result-view">
    <div className="result-kicker">Na základe vašich preferencií</div>
    <div className="result-card">
      <img src={product.image} alt={product.name} />
      <div><h2>{product.name}</h2><b className="price">{product.price}</b><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
    </div>
    <div className="why"><b>Prečo tento produkt</b><p>{reason || product.reason}</p></div>
    <a className="button button--primary result-cta" href={product.url} target="_blank" rel="noreferrer">Pozrieť produkt <Icon name="arrow" /></a>
    {alternative && <div className="alternative"><span>Alternatíva v rovnakej kategórii</span><a href={alternative.url} target="_blank" rel="noreferrer">{alternative.name} · {alternative.price}</a></div>}
    <button className="text-button" onClick={restart}>Vybrať znova</button>
  </div>;
}

function Widget({ brand, open, setOpen, initialMode, onModeChange }) {
  const [mode, setMode] = useState(initialMode);
  const [resetKey, setResetKey] = useState(0);
  const [teaserVisible, setTeaserVisible] = useState(true);
  const [messages, setMessages] = useState(() => [{ from: 'bot', text: brand.welcome || `Dobrý deň. Čo dnes hľadáte v ponuke ${brand.name}?` }]);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    setMessages([{ from: 'bot', text: brand.welcome || `Dobrý deň. Čo dnes hľadáte v ponuke ${brand.name}?` }]);
    setTeaserVisible(true);
  }, [brand.slug, brand.name, brand.welcome]);

  useEffect(() => setMode(initialMode), [initialMode, open]);

  useEffect(() => {
    if (!open) return undefined;
    previousFocusRef.current = document.activeElement;
    document.body.classList.add('widget-open');
    panelRef.current?.focus();

    const keydown = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'Tab' && panelRef.current) {
        const items = [...panelRef.current.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled)')];
        if (!items.length) {
          event.preventDefault();
          panelRef.current.focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (active === panelRef.current || !panelRef.current.contains(active)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', keydown);
    return () => {
      document.body.classList.remove('widget-open');
      document.removeEventListener('keydown', keydown);
      window.setTimeout(() => {
        const previous = previousFocusRef.current;
        if (previous && previous.isConnected && typeof previous.focus === 'function') previous.focus();
        else document.querySelector('.launcher')?.focus();
      }, 0);
    };
  }, [open, setOpen]);

  const switchMode = (next) => { setMode(next); onModeChange?.(next); };
  const reset = () => {
    setResetKey((value) => value + 1);
    setMessages([{ from: 'bot', text: brand.welcome || `Dobrý deň. Čo dnes hľadáte v ponuke ${brand.name}?` }]);
  };

  return <>
    {!open && <div className="launcher-wrap">
      {teaserVisible && <div className="teaser"><button aria-label="Zavrieť pozvánku" onClick={() => setTeaserVisible(false)}>×</button><b>{brand.teaserTitle}</b><span>{brand.teaser}</span></div>}
      <button className="launcher" aria-label={`Otvoriť poradcu ${brand.name}`} onClick={() => setOpen(true)}><Logo brand={brand} compact /></button>
    </div>}
    {open && <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="widget" role="dialog" aria-modal="true" aria-label={`Poradca ${brand.name}`} tabIndex="-1" ref={panelRef}>
        <header className="widget__header"><Logo brand={brand} /><div><button aria-label="Začať odznova" onClick={reset}><Icon name="reset" /></button><button aria-label="Zavrieť" onClick={() => setOpen(false)}><Icon name="close" /></button></div></header>
        <div className={`mode-switch ${mode === 'advisor' ? 'is-advisor' : ''}`} role="tablist"><span className="mode-thumb" aria-hidden="true" /><button role="tab" aria-selected={mode === 'chat'} onClick={() => switchMode('chat')}><Icon name="chat" />Chat</button><button role="tab" aria-selected={mode === 'advisor'} onClick={() => switchMode('advisor')}><Icon name="spark" />Výber starostlivosti</button></div>
        <div className="widget__body" key={resetKey}>{mode === 'chat' ? <Chat brand={brand} startAdvisor={() => switchMode('advisor')} messages={messages} setMessages={setMessages} /> : <Advisor brand={brand} />}</div>
      </section>
    </div>}
  </>;
}

function App() {
  const slug = location.pathname.split('/').filter(Boolean).at(-1) || new URLSearchParams(location.search).get('brand') || 'mylo';
  const brand = brands[brandOrder.includes(slug) ? slug : 'mylo'];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('chat');

  useEffect(() => {
    document.documentElement.dataset.brand = brand.slug;
    document.title = `${brand.name} · Výber starostlivosti`;
  }, [brand]);

  const launch = (next) => { setMode(next); setOpen(true); };
  const storefront = brand.slug === 'biofy'
    ? <BiofyStorefront brand={brand} openAdvisor={() => launch('advisor')} openChat={() => launch('chat')} />
    : <OwnerPage brand={brand} openAdvisor={() => launch('advisor')} openChat={() => launch('chat')} />;

  return <>{storefront}<Widget brand={brand} open={open} setOpen={setOpen} initialMode={mode} onModeChange={setMode} /></>;
}

createRoot(document.getElementById('root')).render(<App />);
