/* Brand symbol for the new demos. Loaded last, after every older layer has
   settled the launcher. A brand with a `mark` (a square symbol cut from its
   official logo) shows that symbol in the round launcher and in every
   assistant avatar, the way Cyprianus and Modrá púpava already do; the full
   logo stays in the page and widget header. */
(() => {
  'use strict';

  const slug = document.body?.dataset?.cosmeticsDemo;
  const brand = window.COSMETICS_DEMOS?.brands?.[slug];
  const launcher = document.querySelector('#cx-open');
  if (!brand || !brand.mark || !launcher) return;

  document.body.dataset.cxNewMark = 'true';
  /* A masked span, not an <img>: skincare-launcher-logo-fix.js swaps any
     avatar that contains an image for a letter, and the two observers would
     otherwise keep undoing each other. */
  const markup = `<span class="cx-new-mark${brand.markWide ? ' cx-new-mark--wide' : ''}" aria-hidden="true" style="--cx-mark:url('${brand.mark}')"></span>`;

  launcher.classList.remove('is-image-logo', 'cx-launcher-has-wordmark', 'cx-launcher-has-image-logo');
  launcher.classList.add('cx-launcher-has-new-mark');
  launcher.innerHTML = markup;

  const syncAvatars = () => {
    document.querySelectorAll('.cx-message-avatar').forEach((avatar) => {
      if (avatar.querySelector('.cx-new-mark')) return;
      avatar.innerHTML = markup;
    });
  };
  syncAvatars();
  const root = document.querySelector('#cosmetics-root');
  if (root) new MutationObserver(syncAvatars).observe(root, { childList: true, subtree: true });
})();
