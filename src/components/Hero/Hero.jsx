import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroImages } from '../../data.js';
import { useAdminContent } from '../../hooks/useAdminContent.js';
import Arrow from '../common/Arrow.jsx';
import useInView from '../../hooks/useInView.js';
import './Hero.css';

const heroSentences = [
    'Book Now For Your Event.',
  'Moments made permanent.',
  'Stories of love, told in light.',
  'Love in every frame.'
];

export default function Hero() {
  const images = useAdminContent('heroImages', heroImages);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [heroRef, heroInView] = useInView('80px 0px');
  const pointerFrame = useRef(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !images.length || !heroInView) return undefined;
    const timer = setInterval(() => setActive(index => {
      setPrevious(index);
      return (index + 1) % images.length;
    }), 6000);
    return () => clearInterval(timer);
  }, [images.length, heroInView]);

  useEffect(() => () => {
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
  }, []);

  const updatePerspective = event => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = heroRef.current;
    if (!hero) return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      hero.style.setProperty('--hero-rotate-x', `${y * -2.2}deg`);
      hero.style.setProperty('--hero-rotate-y', `${x * 3.2}deg`);
      hero.style.setProperty('--hero-bg-x', `${x * -11}px`);
      hero.style.setProperty('--hero-bg-y', `${y * -8}px`);
      hero.style.setProperty('--hero-copy-x', `${x * 10}px`);
      hero.style.setProperty('--hero-copy-y', `${y * 7}px`);
    });
  };

  const resetPerspective = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.setProperty('--hero-rotate-x', '0deg');
    hero.style.setProperty('--hero-rotate-y', '0deg');
    hero.style.setProperty('--hero-bg-x', '0px');
    hero.style.setProperty('--hero-bg-y', '0px');
    hero.style.setProperty('--hero-copy-x', '0px');
    hero.style.setProperty('--hero-copy-y', '0px');
  };

  return <section ref={heroRef} className="hero" id="home" onPointerMove={updatePerspective} onPointerLeave={resetPerspective}>
    <div className="hero-visual" aria-hidden="true">
      {images.map((src, index) => {
        const mobileSrc = src.replace('/optimized/hero/', '/optimized/hero-mobile/');
        return <picture key={src}>
          <source media="(max-width: 700px)" srcSet={mobileSrc}/>
          <img
            className={`${active === index ? 'is-active' : ''}${previous === index ? ' is-previous' : ''}`}
            src={src}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'low'}
            decoding="async"
          />
        </picture>;
      })}
    </div>
    <div className="hero-shade"/>
    <div className="hero-copy">
      <h1 className="hero-enter" aria-live="polite">
        <span className="hero-sentence" key={`sentence-${active}`}>{heroSentences[active % heroSentences.length]}</span>
      </h1>
      <p className="hero-signature hero-enter delay-1">Mr.Look Weddings</p>
      <div className="hero-actions hero-enter delay-2">
        <Link className="hero-button hero-button-secondary" to="/albums">View Albums <Arrow/></Link>
        <Link className="hero-button hero-button-primary" to="/booking">Book now <Arrow/></Link>
      </div>
    </div>
    <div className="hero-scroll-mark" aria-hidden="true"><span>Explore</span><i/></div>
  </section>;
}
