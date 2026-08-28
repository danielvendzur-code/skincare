import { useState } from 'react';
import { PonioStorefront } from './storefront.jsx';
import { PonioWidget } from './widget.jsx';
import './theme.css';

export function PonioExperience() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('chat');

  function launch(nextMode) {
    setMode(nextMode);
    setOpen(true);
  }

  return <>
    <PonioStorefront openChat={() => launch('chat')} openAdvisor={() => launch('advisor')} />
    <PonioWidget open={open} setOpen={setOpen} mode={mode} setMode={setMode} />
  </>;
}
