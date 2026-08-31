import { useEffect, useMemo, useState } from 'react';

function parsePrice(value) {
  const text = String(value || '').trim();
  const match = text.match(/\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const token = match[0];
  const separator = token.includes(',') ? ',' : token.includes('.') ? '.' : '';
  return {
    target: Number(token.replace(',', '.')),
    decimals: separator ? token.split(separator)[1].length : 0,
    separator,
    prefix: text.slice(0, match.index),
    suffix: text.slice(match.index + token.length),
    original: text,
  };
}

export function AnimatedPrice({ value, className, as: Tag = 'span' }) {
  const parsed = useMemo(() => parsePrice(value), [value]);
  const [display, setDisplay] = useState(() => String(value || ''));

  useEffect(() => {
    if (!parsed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(String(value || ''));
      return undefined;
    }

    let frameId = 0;
    const started = performance.now();
    const duration = 680;
    const format = (number) => {
      const numeric = number.toFixed(parsed.decimals).replace('.', parsed.separator || '.');
      return `${parsed.prefix}${numeric}${parsed.suffix}`;
    };

    setDisplay(format(0));
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(progress === 1 ? parsed.original : format(parsed.target * eased));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [parsed, value]);

  return <Tag className={className} data-price-animated="true">{display}</Tag>;
}
