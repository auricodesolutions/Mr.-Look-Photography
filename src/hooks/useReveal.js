import { useEffect } from 'react';

export default function useReveal(routeKey) {
  useEffect(() => {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observed = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -3%' });

    const register = (root = document) => {
      const elements = root.matches?.('[data-reveal]')
        ? [root, ...root.querySelectorAll('[data-reveal]')]
        : root.querySelectorAll('[data-reveal]');
      elements.forEach((element, index) => {
        if (observed.has(element)) return;
        observed.add(element);
        if (!element.style.getPropertyValue('--delay')) {
          element.style.setProperty('--delay', `${Math.min(index % 6, 5) * 45}ms`);
        }
        if (!element.classList.contains('section-heading') && !element.classList.contains('page-intro')) {
          const direction = index % 3 === 1 ? -1 : index % 3 === 2 ? 1 : 0;
          element.style.setProperty('--reveal-x', `${direction * 14}px`);
        }
        if (reduceMotion) element.classList.add('is-visible');
        else observer.observe(element);
      });
    };

    register();
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) register(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [routeKey]);
}
