import { useEffect } from 'react';

export default function useSiteMotion(routeKey) {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = [...document.querySelectorAll('main > section:not(.hero), main.inner-page, .footer')];

    sections.forEach((section, index) => {
      section.classList.add('motion-section');
      section.dataset.motionSide = index % 2 ? 'right' : 'left';
      section.querySelectorAll('figure > img:not(.story-photo), .package-card > img, .album-card img, .full-gallery img, .albums-page-grid img, .about-grid img').forEach(image => image.classList.add('motion-media'));
    });

    document.documentElement.classList.add('site-motion-ready');

    if (reduced) {
      sections.forEach(section => section.classList.add('is-motion-visible'));
      return () => document.documentElement.classList.remove('site-motion-ready');
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-motion-visible', entry.isIntersecting));
    }, { rootMargin: '10% 0px', threshold: 0.02 });

    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('site-motion-ready');
    };
  }, [routeKey]);
}
