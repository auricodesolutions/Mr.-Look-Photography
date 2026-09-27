import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo.jsx';
import './Preloader.css';

export default function Preloader() {
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let active = true;
    let exitTimer;
    document.body.classList.add('preloading');

    const firstImage = matchMedia('(max-width: 700px)').matches
      ? '/assets/optimized/hero-mobile/img01.jpg'
      : '/assets/optimized/hero/img01.jpg';
    const image = new Image();
    image.src = firstImage;
    const imageReady = typeof image.decode === 'function'
      ? image.decode().catch(() => undefined)
      : new Promise(resolve => {
        image.onload = resolve;
        image.onerror = resolve;
      });
    const pageReady = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise(resolve => addEventListener('load', resolve, { once:true }));
    const minimumDisplay = new Promise(resolve => setTimeout(resolve, 950));
    const imageTimeout = Promise.race([imageReady, new Promise(resolve => setTimeout(resolve, 3500))]);

    Promise.all([pageReady, minimumDisplay, imageTimeout]).then(() => {
      if (!active) return;
      setLeaving(true);
      document.body.classList.remove('preloading');
      exitTimer = setTimeout(() => setHidden(true), 1000);
    });

    return () => {
      active = false;
      clearTimeout(exitTimer);
      document.body.classList.remove('preloading');
    };
  }, []);

  if (hidden) return null;

  return <div className={`page-loader brand-preloader${leaving ? ' is-leaving' : ''}`} role="status" aria-label="Loading Mr.Look Photography">
    <BrandLogo className="loader-logo"/>
    <div className="loader-rule" aria-hidden="true"><i/></div>
    <p className="loader-caption">Stories, honestly remembered</p>
  </div>;
}
