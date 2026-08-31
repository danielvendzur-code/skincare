import { useEffect, useRef, useState } from 'react';
import { PonioStorefront } from './storefront.jsx';
import { PonioWidget } from './widget.jsx';
import './theme.css';

export function PonioExperience() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('chat');
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;
    if (!wasOpen || open) return undefined;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const active = document.activeElement;
        if (!active || active === document.body || active === document.documentElement) {
          document.querySelector('.ponio-launcher')?.focus();
        }
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [open]);

  function launch(nextMode) {
    setMode(nextMode);
    setOpen(true);
  }

  return <>
    <PonioStorefront openChat={() => launch('chat')} openAdvisor={() => launch('advisor')} />
    <PonioWidget open={open} setOpen={setOpen} mode={mode} setMode={setMode} />
  </>;
}
