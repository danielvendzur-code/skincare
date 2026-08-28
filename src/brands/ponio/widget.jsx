import { useEffect, useRef, useState } from 'react';
import { choosePonioRecommendation, getPonioQuestion, ponioFallbackReply, ponioQuickQuestions } from './config.js';

function Icon({ name }) {
  const paths = {
    chat: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4.2A2.5 2.5 0 0 1 4 12.5z" />,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    reset: <><path d="M20 11a8 8 0 1 0-2.3 5.7" /><path d="M20 4v7h-7" /></>,
    back: <path d="m15 18-6-6 6-6" />,
    send: <><path d="m4 4 17 8-17 8 3-8z" /><path d="M7 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    care: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function PonioMark({ compact = false }) {
  return <img className={`ponio-mark${compact ? ' is-compact' : ''}`} src="/assets/brands/ponio/logo.png" alt={compact ? '' : 'PONIO'} />;
}

const initialMessage = { role: 'assistant', text: 'Dobrý deň. Pomôžem vám rozlíšiť starostlivosť o pleť, vlasy, telo alebo pery a vysvetliť rozdiely medzi konkrétnymi produktmi PONIO.' };

function ChatPanel({ active, openAdvisor, resetSignal }) {
  const [messages, setMessages] = useState([initialMessage]);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const messagesRef = useRef(null);
  const requestRef = useRef(null);
  const busyRef = useRef(false);
  const generationRef = useRef(0);

  useEffect(() => {
    generationRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    busyRef.current = false;
    setMessages([initialMessage]);
    setValue('');
    setBusy(false);
  }, [resetSignal]);

  useEffect(() => () => {
    generationRef.current += 1;
    requestRef.current?.abort();
  }, []);

  useEffect(() => {
    if (active && messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [active, messages, busy]);

  const userHasInteracted = messages.some((message) => message.role === 'user');

  async function send(rawText) {
    const clean = String(rawText || '').trim().slice(0, 700);
    if (!clean || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);

    const generation = generationRef.current;
    const userMessage = { role: 'user', text: clean };
    const nextMessages = [...messages, userMessage];
    const apiMessages = nextMessages.slice(-10).map((message) => ({ role: message.role, content: message.text }));
    setMessages(nextMessages);
    setValue('');

    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 7_000);
    let reply = ponioFallbackReply(apiMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ brand: 'ponio', messages: apiMessages }),
      });
      if (response.ok) {
        const data = await response.json();
        if (typeof data.reply === 'string' && data.reply.trim()) reply = data.reply.trim();
      }
    } catch {
      // Keep the deterministic catalog-grounded reply when the provider is unavailable.
    } finally {
      window.clearTimeout(timeout);
      if (generationRef.current === generation) {
        if (requestRef.current === controller) requestRef.current = null;
        setMessages((current) => [...current, { role: 'assistant', text: reply }]);
        busyRef.current = false;
        setBusy(false);
      }
    }
  }

  return <section className={`ponio-chat${active ? ' is-active' : ''}`} aria-hidden={!active}>
    <div className="ponio-chat-messages" ref={messagesRef} aria-live="polite">
      {!userHasInteracted && <button className="ponio-chat-handoff" type="button" onClick={openAdvisor} tabIndex={active ? 0 : -1}>
        <span><Icon name="care" /></span><div><strong>Nájsť konkrétny produkt</strong><small>4 kroky · oblasť je pevné pravidlo</small></div><Icon name="arrow" />
      </button>}
      {messages.map((message, index) => <div className={`ponio-message is-${message.role}`} key={`${message.role}-${index}`}>
        {message.role === 'assistant' && <span className="ponio-avatar" aria-hidden="true"><PonioMark compact /></span>}
        <div className="ponio-bubble">{message.text}</div>
      </div>)}
      {busy && <div className="ponio-message is-assistant"><span className="ponio-avatar" aria-hidden="true"><PonioMark compact /></span><div className="ponio-bubble ponio-typing" aria-label="Poradca píše"><i /><i /><i /></div></div>}
    </div>
    <div className="ponio-chat-bottom">
      {!userHasInteracted && <div className="ponio-quick-questions">{ponioQuickQuestions.map((question) => <button type="button" key={question} onClick={() => send(question)} disabled={busy} tabIndex={active ? 0 : -1}>{question}</button>)}</div>}
      <form className="ponio-composer" onSubmit={(event) => { event.preventDefault(); send(value); }}>
        <input value={value} onChange={(event) => setValue(event.target.value)} maxLength={700} autoComplete="off" placeholder="Opýtajte sa na produkt…" aria-label="Otázka pre PONIO poradcu" tabIndex={active ? 0 : -1} />
        <button type="submit" aria-label="Odoslať správu" disabled={busy || !value.trim()} tabIndex={active ? 0 : -1}><Icon name="send" /></button>
      </form>
    </div>
  </section>;
}

function AdvisorProductImage({ product }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [product.id]);
  return <div className={`ponio-result-image${failed ? ' is-fallback' : ''}`}>
    {!failed && <img src={product.image} alt={product.name} onError={() => setFailed(true)} />}
    {failed && <span>{product.name}</span>}
  </div>;
}

function AdvisorPanel({ active, resetSignal }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  function resetAdvisor() {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
  }

  useEffect(() => { resetAdvisor(); }, [resetSignal]);

  function choose(option) {
    const question = getPonioQuestion(step, answers);
    const nextAnswers = { ...answers, [question.key]: option.value };
    if (question.key === 'area' && answers.area && answers.area !== option.value) {
      delete nextAnswers.goal;
      delete nextAnswers.format;
      delete nextAnswers.timing;
    }
    setAnswers(nextAnswers);
    if (step === 3) setRecommendation(choosePonioRecommendation(nextAnswers));
    else setStep((current) => current + 1);
  }

  function goBack() {
    if (recommendation) {
      setRecommendation(null);
      setStep(3);
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  }

  if (recommendation) {
    const { product, alternative, reason } = recommendation;
    return <section className={`ponio-advisor ponio-result${active ? ' is-active' : ''}`} aria-hidden={!active} data-product-area={product.area}>
      <header className="ponio-advisor-progress">
        <button type="button" onClick={goBack} tabIndex={active ? 0 : -1}><Icon name="back" /><span>Späť</span></button>
        <div>{[0, 1, 2, 3].map((index) => <i className="is-on" key={index} />)}</div><strong>Výsledok</strong>
      </header>
      <div className="ponio-result-body">
        <span className="ponio-advisor-label">Vaša starostlivosť</span>
        <article className="ponio-result-product">
          <AdvisorProductImage product={product} />
          <div className="ponio-result-copy"><small>{product.subtitle}</small><h2>{product.name}</h2><strong className="ponio-result-price">{product.price}</strong><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
        </article>
        <div className="ponio-result-reason"><strong>Prečo tento produkt</strong><p>{reason}</p></div>
        <a className="ponio-result-cta" href={product.url} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1}>Pozrieť produkt na ponio.sk <Icon name="arrow" /></a>
        {alternative && <a className="ponio-alternative" href={alternative.url} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1}><span><small>Ďalšia vhodná voľba v rovnakej oblasti</small><strong>{alternative.name}</strong></span><Icon name="arrow" /></a>}
        <div className="ponio-result-footer"><button type="button" onClick={resetAdvisor} tabIndex={active ? 0 : -1}>Vybrať znova</button><small>Aktuálna cena a dostupnosť na ponio.sk sú rozhodujúce.</small></div>
      </div>
    </section>;
  }

  const question = getPonioQuestion(step, answers);
  return <section className={`ponio-advisor${active ? ' is-active' : ''}`} aria-hidden={!active}>
    <header className="ponio-advisor-progress">
      <button type="button" onClick={goBack} disabled={step === 0} tabIndex={active ? 0 : -1}><Icon name="back" /><span>Späť</span></button>
      <div>{[0, 1, 2, 3].map((index) => <i className={index <= step ? 'is-on' : ''} key={index} />)}</div><strong>{step + 1} z 4</strong>
    </header>
    <div className="ponio-advisor-body">
      <span className="ponio-advisor-label">{step === 0 ? 'Oblasť' : step === 1 ? 'Cieľ' : step === 2 ? 'Formát' : 'Použitie'}</span>
      <h2>{question.title}</h2><p>{question.hint}</p>
      <div className="ponio-choice-grid">{question.options.map((option, index) => {
        const selected = answers[question.key] === option.value;
        return <button type="button" key={`${question.key}-${option.value}-${index}`} className={selected ? 'is-selected' : ''} aria-pressed={selected} onClick={() => choose(option)} tabIndex={active ? 0 : -1}>
          <span className="ponio-choice-index" aria-hidden="true">{selected ? <Icon name="check" /> : null}</span><strong>{option.label}</strong><small>{option.detail}</small><span className="ponio-choice-arrow"><Icon name="arrow" /></span>
        </button>;
      })}</div>
    </div>
  </section>;
}

export function PonioWidget({ open, setOpen, mode, setMode }) {
  const [teaserVisible, setTeaserVisible] = useState(true);
  const [resetSignal, setResetSignal] = useState(0);
  const dialogRef = useRef(null);
  const lastFocusRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!open) return undefined;
    lastFocusRef.current = document.activeElement;
    scrollYRef.current = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    body.classList.add('ponio-widget-open');
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    const focusDialog = window.requestAnimationFrame(() => {
      if (dialogRef.current && !dialogRef.current.contains(document.activeElement)) dialogRef.current.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled):not([tabindex="-1"]), a[href]:not([tabindex="-1"]), input:not(:disabled):not([tabindex="-1"])')];
      if (!focusable.length) { event.preventDefault(); dialogRef.current.focus(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      const previousFocus = lastFocusRef.current;
      window.cancelAnimationFrame(focusDialog);
      document.removeEventListener('keydown', onKeyDown);
      body.classList.remove('ponio-widget-open');
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      window.scrollTo(0, scrollYRef.current);
      window.requestAnimationFrame(() => {
        if (previousFocus?.isConnected) previousFocus.focus();
        else document.querySelector('.ponio-launcher')?.focus();
      });
    };
  }, [open, setOpen]);

  return <>
    {!open && <div className="ponio-launcher-wrap">
      {teaserVisible && <div className="ponio-teaser" data-testid="ponio-teaser">
        <button className="ponio-teaser-body" type="button" onClick={() => { setMode('advisor'); setOpen(true); }}><strong>Pleť, vlasy, telo alebo pery?</strong><span>4 kroky k produktu z ponuky PONIO</span></button>
        <button className="ponio-teaser-close" type="button" aria-label="Skryť pozvánku" onClick={() => setTeaserVisible(false)}><Icon name="close" /></button>
      </div>}
      <button className="ponio-launcher" type="button" aria-label="Otvoriť poradcu PONIO" aria-expanded="false" onClick={() => setOpen(true)}><PonioMark compact /><span className="ponio-launcher-status" aria-hidden="true" /></button>
    </div>}

    {open && <div className="ponio-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="ponio-widget" role="dialog" aria-modal="true" aria-label="Produktový poradca PONIO" tabIndex={-1} ref={dialogRef}>
        <header className="ponio-widget-header"><div className="ponio-widget-brand"><PonioMark /><span><strong>PONIO</strong><small><i /> Online poradca</small></span></div><div className="ponio-widget-actions"><button type="button" aria-label="Začať odznova" onClick={() => setResetSignal((value) => value + 1)}><Icon name="reset" /></button><button type="button" aria-label="Zavrieť poradcu" onClick={() => setOpen(false)}><Icon name="close" /></button></div></header>
        <div className={`ponio-mode-switch${mode === 'advisor' ? ' is-advisor' : ''}`} role="tablist" aria-label="Režim poradcu"><span aria-hidden="true" /><button type="button" role="tab" aria-selected={mode === 'chat'} onClick={() => setMode('chat')}><Icon name="chat" />Chat</button><button type="button" role="tab" aria-selected={mode === 'advisor'} onClick={() => setMode('advisor')}><Icon name="care" />Výber starostlivosti</button></div>
        <div className="ponio-widget-stage"><ChatPanel active={mode === 'chat'} openAdvisor={() => setMode('advisor')} resetSignal={resetSignal} /><AdvisorPanel active={mode === 'advisor'} resetSignal={resetSignal} /></div>
      </section>
    </div>}
  </>;
}
