import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../common/Arrow.jsx';
import useInView from '../../hooks/useInView.js';
import './Services.css';

const services = [
  {
    slug: 'wedding',
    title: 'Weddings',
    bookingService: 'Wedding',
    packageSlug: 'wedding',
    eyebrow: 'Complete wedding stories',
    description: 'From quiet preparations to the final celebration, photographed with honesty, elegance and a timeless editorial eye.',
    image: '/assets/optimized/stories/img16.jpg',
  },
  {
    slug: 'engagement',
    title: 'Engagements',
    bookingService: 'Engagement',
    packageSlug: 'engagement',
    eyebrow: 'Natural connection',
    description: 'Relaxed photographs that celebrate your connection and preserve the anticipation before your wedding day.',
    image: '/assets/optimized/stories/img17.jpg',
  },
  {
    slug: 'pre-shoot',
    title: 'Pre-shoots',
    bookingService: 'Pre-shoot',
    packageSlug: 'pre-shoot',
    eyebrow: 'Creative portraits',
    description: 'An art-directed portrait experience shaped around your style, personality and favourite places.',
    image: '/assets/optimized/stories/img23.jpg',
  },
  {
    slug: 'portraits',
    title: 'Portraits',
    bookingService: 'Portrait',
    packageSlug: 'editorial',
    eyebrow: 'Editorial portraiture',
    description: 'Refined portraits shaped with considered styling, expressive light and a quietly timeless finish.',
    image: '/assets/optimized/stories/Img9.jpg',
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [sectionRef, sectionInView] = useInView();

  useEffect(() => {
    if (!sectionInView || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setActive(value => (value + 1) % services.length), 5600);
    return () => clearInterval(timer);
  }, [sectionInView]);

  const selected = services[active];

  return <section ref={sectionRef} className="services" id="services">
    <div className="services-layout">
      <div className="services-panel" data-reveal>
        <h2>What we do</h2>
        <p className="services-lead">Choose a service to discover how Mr.Look shapes each experience around your story.</p>

        <nav className="service-selector" aria-label="Book a photography service">
          {services.map((service, index) => <Link
            to={`/booking?service=${encodeURIComponent(service.bookingService)}&pkg=${service.packageSlug}`}
            aria-current={active === index ? 'true' : undefined}
            className={active === index ? 'is-active' : ''}
            key={service.slug}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <span>{service.title}</span>
            <Arrow />
          </Link>)}
        </nav>
      </div>

      <div className="service-visual" id="service-visual" role="tabpanel" aria-live="polite" data-reveal>
        <div className="service-image-stage" key={selected.slug}>
          <img src={selected.image} alt={`${selected.title} photography by Mr.Look`} loading="lazy" decoding="async" />
          <span className="service-image-frame" aria-hidden="true" />
          <span className="service-image-brand" aria-hidden="true">MR.LOOK</span>
        </div>
        <div className="service-visual-copy" key={`copy-${selected.slug}`}>
          <p>{selected.eyebrow}</p>
          <h3>{selected.title}</h3>
          <span>{selected.description}</span>
          <Link to={`/booking?service=${encodeURIComponent(selected.bookingService)}&pkg=${selected.packageSlug}`}>Book this service <Arrow /></Link>
        </div>
      </div>
    </div>
  </section>;
}
