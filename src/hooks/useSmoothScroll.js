import { useEffect } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchPrimary = matchMedia('(pointer: coarse)').matches;
    if (reducedMotion || touchPrimary) return undefined;

    const root = document.documentElement;
    let target = window.scrollY;
    let frame = 0;
    let previousTime = performance.now();

    const maximum = () => Math.max(0, root.scrollHeight - window.innerHeight);

    const render = time => {
      const elapsed = Math.min(32, time - previousTime);
      previousTime = time;
      const current = window.scrollY;
      const distance = target - current;
      const easing = 1 - Math.pow(0.001, elapsed / 380);
      const next = current + distance * easing;

      if (Math.abs(distance) < .35) {
        window.scrollTo(0, target);
        frame = 0;
        return;
      }

      window.scrollTo(0, next);
      frame = requestAnimationFrame(render);
    };

    const onWheel = event => {
      if (event.ctrlKey || event.metaKey || document.body.classList.contains('menu-open') || document.body.classList.contains('lightbox-open')) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const mode = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 18
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      const movement = clamp(event.deltaY * mode, -280, 280);
      if (!movement) return;

      event.preventDefault();
      if (!frame) target = window.scrollY;
      target = clamp(target + movement, 0, maximum());
      if (!frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    const sync = () => {
      if (!frame) target = window.scrollY;
      else target = clamp(target, 0, maximum());
    };

    root.classList.add('inertial-scroll');
    addEventListener('wheel', onWheel, { passive: false });
    addEventListener('resize', sync, { passive: true });

    return () => {
      root.classList.remove('inertial-scroll');
      removeEventListener('wheel', onWheel);
      removeEventListener('resize', sync);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
