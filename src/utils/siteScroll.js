export default function siteScrollTo(top, behavior = 'smooth') {
  const destination = Math.max(0, Number(top) || 0);

  if (document.documentElement.classList.contains('inertial-scroll')) {
    window.dispatchEvent(new CustomEvent('site-scroll-to', {
      detail: { top: destination, behavior }
    }));
    return;
  }

  window.scrollTo({ top: destination, left: 0, behavior });
}
