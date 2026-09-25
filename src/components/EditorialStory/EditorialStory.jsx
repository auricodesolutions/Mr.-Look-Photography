import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data.js';
import Arrow from '../common/Arrow.jsx';
import useInView from '../../hooks/useInView.js';
import './EditorialStory.css';

function RotatingPhoto({ images, frame, offset, direction, priority = false }) {
  const currentIndex = (frame + offset) % images.length;
  const previousIndex = (currentIndex - 1 + images.length) % images.length;
  const current = images[currentIndex];
  const previous = images[previousIndex];

  return <div className={`editorial-photo-stage editorial-photo-${direction}`}>
    <img
      className="editorial-photo editorial-photo-out"
      key={`${direction}-out-${frame}`}
      src={previous.src}
      alt=""
      loading="lazy"
      decoding="async"
    />
    <img
      className="editorial-photo editorial-photo-in"
      key={`${direction}-in-${frame}`}
      src={current.src}
      alt={current.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  </div>;
}

export default function EditorialStory() {
  const [frame, setFrame] = useState(0);
  const [sectionRef, sectionInView] = useInView();
  const storyImages = projects.slice(0, 9);

  useEffect(() => {
    if (storyImages.length < 2 || !sectionInView || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setFrame(value => (value + 1) % storyImages.length), 4600);
    return () => clearInterval(timer);
  }, [storyImages.length, sectionInView]);

  return <section ref={sectionRef} className="editorial-story" aria-labelledby="editorial-story-title">
    <div className="editorial-story-shell">
      <header className="editorial-story-intro" data-reveal>
        <p className="editorial-story-kicker">A Mr.Look wedding highlight</p>
        <h2 id="editorial-story-title">Stories, honestly remembered.</h2>
      </header>

      <figure className="editorial-frame editorial-frame-portrait" data-reveal style={{ '--delay': '70ms', '--reveal-x': '-24px' }}>
        <RotatingPhoto images={storyImages} frame={frame} offset={0} direction="up" priority />
      </figure>

      <figure className="editorial-frame editorial-frame-wide" data-reveal style={{ '--delay': '130ms' }}>
        <RotatingPhoto images={storyImages} frame={frame} offset={2} direction="right" />
      </figure>

      <figure className="editorial-frame editorial-frame-scene" data-reveal style={{ '--delay': '190ms' }}>
        <RotatingPhoto images={storyImages} frame={frame} offset={4} direction="down" />
      </figure>

      <figure className="editorial-frame editorial-frame-close" data-reveal style={{ '--delay': '250ms', '--reveal-x': '24px' }}>
        <RotatingPhoto images={storyImages} frame={frame} offset={6} direction="left" />
      </figure>

      <figure className="editorial-frame editorial-frame-accent-top" data-reveal style={{ '--delay': '285ms', '--reveal-x': '24px' }}>
        <RotatingPhoto images={storyImages} frame={frame} offset={7} direction="down" />
      </figure>

      <figure className="editorial-frame editorial-frame-accent-bottom" data-reveal style={{ '--delay': '320ms', '--reveal-x': '24px' }}>
        <RotatingPhoto images={storyImages} frame={frame} offset={8} direction="left" />
      </figure>

      <aside className="editorial-story-action" data-reveal style={{ '--delay': '350ms' }}>
        <Link to="/gallery">View gallery <Arrow /></Link>
      </aside>

     
    </div>
  </section>;
}
