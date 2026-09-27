import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { projects } from '../../data.js';
import { useAdminContent } from '../../hooks/useAdminContent.js';
import Arrow from '../common/Arrow.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import useInView from '../../hooks/useInView.js';
import './Projects.css';

export default function Projects() {
  const items = useAdminContent('projects', projects).slice(0, 9);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);
  const [sectionRef, sectionInView] = useInView();
  const movingItems = items.length > 1 ? [...items, ...items] : items;

  useEffect(() => {
    if (items.length < 2 || !sectionInView) return undefined;
    const timer = setInterval(() => setActive(value => (value + 1) % items.length), 3600);
    return () => clearInterval(timer);
  }, [items.length, sectionInView]);

  useEffect(() => {
    if (selected === null || !items.length) return undefined;
    const handleKey = event => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowRight') setSelected(value => (value + 1) % items.length);
      if (event.key === 'ArrowLeft') setSelected(value => (value - 1 + items.length) % items.length);
    };
    addEventListener('keydown', handleKey);
    document.body.classList.add('lightbox-open');
    return () => {
      removeEventListener('keydown', handleKey);
      document.body.classList.remove('lightbox-open');
    };
  }, [selected, items.length]);

  const lightbox = selected !== null && items[selected]
    ? createPortal(<div className="lightbox" role="dialog" aria-modal="true" aria-label={items[selected].alt} onClick={() => setSelected(null)}>
      <button type="button" className="lightbox-close" onClick={() => setSelected(null)}>Close</button>
      <button type="button" className="lightbox-arrow prev" aria-label="Previous photograph" onClick={event => { event.stopPropagation(); setSelected((selected - 1 + items.length) % items.length); }}><Arrow direction="left" /></button>
      <figure key={selected} onClick={event => event.stopPropagation()}>
        <img src={items[selected].src} alt={items[selected].alt} />
        <figcaption>{items[selected].alt}</figcaption>
      </figure>
      <button type="button" className="lightbox-arrow next" aria-label="Next photograph" onClick={event => { event.stopPropagation(); setSelected((selected + 1) % items.length); }}><Arrow /></button>
    </div>, document.body)
    : null;

  return <>
    <section ref={sectionRef} className="section projects" id="stories">
      <SectionTitle title="Selected stories">A curated collection of honest emotion, thoughtful details and celebrations remembered exactly as they felt.</SectionTitle>
      <div className="project-showcase" data-reveal>
        <div className="project-backdrops" aria-hidden="true">
          {items[active] && <img className="is-active" src={items[active].src} alt="" key={`background-${active}`} />}
        </div>
        <div className="project-shade" aria-hidden="true" />
        <div className="project-filmstrip">
          <div className="project-track">
            {movingItems.map((project, index) => {
              const itemIndex = index % items.length;
              const duplicate = index >= items.length;
              return <button
                className={`project-card${itemIndex === active ? ' is-active' : ''}`}
                type="button"
                key={`${duplicate ? 'loop' : 'main'}-${project.alt}-${itemIndex}`}
                onMouseEnter={() => setActive(itemIndex)}
                onFocus={() => setActive(itemIndex)}
                onClick={() => setSelected(itemIndex)}
                tabIndex={duplicate ? -1 : undefined}
                aria-hidden={duplicate || undefined}
                aria-label={duplicate ? undefined : `Open ${project.alt}`}
              >
                <img src={project.src} alt={duplicate ? '' : project.alt} loading="lazy" decoding="async" fetchPriority="low" />
              </button>;
            })}
          </div>
        </div>
        <p className="project-showcase-note">Move through the stories · Hover to explore</p>
      </div>
    </section>
    {lightbox}
  </>;
}
