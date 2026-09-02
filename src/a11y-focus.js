let returnTarget = null;
let dialogWasOpen = false;

function currentWidget() {
  return document.querySelector('.widget[role="dialog"]');
}

document.addEventListener('pointerdown', (event) => {
  if (currentWidget()) return;
  const candidate = event.target instanceof Element ? event.target.closest('button, a[href], input, [tabindex]') : null;
  if (candidate instanceof HTMLElement) returnTarget = candidate;
}, true);

const observer = new MutationObserver(() => {
  const dialogIsOpen = Boolean(currentWidget());
  if (dialogWasOpen && !dialogIsOpen) {
    window.requestAnimationFrame(() => {
      const connectedTarget = returnTarget?.isConnected ? returnTarget : null;
      const fallbackLauncher = document.querySelector('.launcher');
      const target = connectedTarget || (fallbackLauncher instanceof HTMLElement ? fallbackLauncher : null);
      target?.focus();
      returnTarget = null;
    });
  }
  dialogWasOpen = dialogIsOpen;
});

observer.observe(document.documentElement, { childList:true, subtree:true });
