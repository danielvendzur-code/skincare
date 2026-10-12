/* A header logo with a flat plate must not sit as a white sticker in the coloured header:
   remove only the plate and show the real wordmark in white. Loaded after the widget. */
(() => {
  'use strict';
  const head = document.querySelector('#cosmetics-root .cx-widget-head');
  const logo = head?.querySelector('.cx-widget-brand img.cx-logo');
  if (!logo) return;
  /* Logos whose emblem is a filled disc have a hand-checked light version. */
  const LIGHT = {rastlinkovo:'/assets/plants/rastlinkovo-logo-light.png'};
  const ready = LIGHT[document.body.dataset.cosmeticsDemo];
  if (ready) { logo.src = ready; logo.classList.add('cx-logo-clean'); return; }
  const rgb = (getComputedStyle(head).backgroundColor.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  if (rgb.length < 3 || (rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722) > 140) return;
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  logo.classList.add('cx-logo-pending');
  const image = new Image();
  image.onerror = () => logo.classList.remove('cx-logo-pending');
  image.onload = () => {
    try {
      const scale = Math.min(1, 640 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      const w = canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      const h = canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const ctx = canvas.getContext('2d', {willReadFrequently:true});
      ctx.drawImage(image, 0, 0, w, h);
      const pixels = ctx.getImageData(0, 0, w, h), px = pixels.data;
      const corners = [0, w - 1, (h - 1) * w, h * w - 1].map((p) => Array.from(px.slice(p * 4, p * 4 + 4)));
      const plate = corners.find((c) => c[3] > 245 && corners.filter((o) => o[3] > 245 && distance(o, c) < 18).length >= 3);
      let x0 = w, y0 = h, x1 = -1, y1 = -1, solid = 0, far = 0;
      if (plate) for (let i = 0; i < px.length; i += 4) if (px[i + 3] > 200) far = Math.max(far, distance([px[i], px[i + 1], px[i + 2]], plate));
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        /* Graded by contrast with the plate, so lighter detail inside a dark emblem stays visible. */
        if (plate) px[i + 3] = Math.round(px[i + 3] * Math.min(1, Math.max(0, (distance([px[i], px[i + 1], px[i + 2]], plate) - 30) / Math.max(42, far - 30))));
        px[i] = px[i + 1] = px[i + 2] = 255;
        if (px[i + 3] > 12) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
        if (px[i + 3] > 128) solid++;
      }
      if (x1 >= x0 && y1 >= y0 && solid / ((x1 - x0 + 1) * (y1 - y0 + 1)) <= .72) {
        ctx.putImageData(pixels, 0, 0);
        const out = document.createElement('canvas');
        out.width = x1 - x0 + 5; out.height = y1 - y0 + 5;
        out.getContext('2d').drawImage(canvas, x0, y0, x1 - x0 + 1, y1 - y0 + 1, 2, 2, x1 - x0 + 1, y1 - y0 + 1);
        logo.src = out.toDataURL('image/png');
        logo.classList.add('cx-logo-clean');
      }
    } catch (_) { /* Keep the original logo if canvas access is unavailable. */ }
    logo.classList.remove('cx-logo-pending');
  };
  image.src = logo.currentSrc || logo.getAttribute('src');
})();

/* Launcher and message avatars: a one-colour brand mark is drawn as a mask, so the closed bubble can
   invert on hover (brand circle with a white mark, white circle with a brand mark) and the whole mark
   always fits inside the avatar circle. Multi-colour marks keep their own artwork. */
(() => {
  'use strict';
  const root = document.querySelector('#cosmetics-root');
  const launcher = document.querySelector('#cx-open');
  const source = launcher?.querySelector('img.cx-brand-mark')?.getAttribute('src');
  if (!root || !source) return;
  const image = new Image();
  image.onload = () => {
    let flat = false;
    try {
      const canvas = document.createElement('canvas'), size = 64;
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d', {willReadFrequently:true});
      ctx.drawImage(image, 0, 0, size, size);
      const px = ctx.getImageData(0, 0, size, size).data;
      let n = 0, opaque = 0, min = 255, max = 0;
      for (let i = 0; i < px.length; i += 4) { n++; if (px[i + 3] < 128) continue; opaque++; const lum = px[i] * .2126 + px[i + 1] * .7152 + px[i + 2] * .0722; min = Math.min(min, lum); max = Math.max(max, lum); }
      flat = opaque > 0 && opaque / n < .8 && max - min < 60;
    } catch (_) { flat = false; }
    if (!flat) return;
    document.body.classList.add('cx-mark-mask');
    const paint = (host) => {
      if (host.querySelector('.cx-mark-shape')) return;
      const shape = document.createElement('span');
      shape.className = 'cx-mark-shape';
      shape.style.setProperty('--cx-mark-art', 'url(' + JSON.stringify(source) + ')');
      host.replaceChildren(shape);
    };
    const sync = () => { paint(launcher); root.querySelectorAll('.cx-message--assistant .cx-message-avatar').forEach(paint); };
    sync();
    new MutationObserver(sync).observe(root, {childList:true, subtree:true});
  };
  image.src = source;
})();
