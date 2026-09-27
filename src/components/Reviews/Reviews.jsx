import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../../hooks/useReviews.js';
import useInView from '../../hooks/useInView.js';
import { projects } from '../../data.js';
import Arrow from '../common/Arrow.jsx';
import './Reviews.css';

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

export default function Reviews() {
  const reviews = useReviews(5);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sectionRef, sectionInView] = useInView();

  useEffect(() => {
    if (paused || !sectionInView || reviews.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => setActive(value => (value + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, [paused, reviews.length, sectionInView]);

  useEffect(() => {
    if (active >= reviews.length) setActive(0);
  }, [active, reviews.length]);

  if (!reviews.length) return null;

  const review = reviews[active];
  const image = projects[(active * 2) % projects.length];
  const previous = () => setActive(value => (value - 1 + reviews.length) % reviews.length);
  const next = () => setActive(value => (value + 1) % reviews.length);

  return <section ref={sectionRef} className="reviews" id="reviews">
    <div
      className="review-editorial"
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <figure className="review-visual" key={`review-image-${active}`}>
        <img src={image.src} alt={`A celebration photographed by Mr.Look for ${review.name}`} loading="lazy" decoding="async" />
        <figcaption>
          <small>Honest</small>
          <strong>Memories</strong>
          <span>{review.name}</span>
        </figcaption>
      </figure>

      <article className="review-panel" key={`review-copy-${active}`} aria-live="polite">
        <div className="review-copy">
          <time dateTime={review.date}>{formatDate(review.date)}</time>
          <blockquote>&ldquo;{review.quote}&rdquo;</blockquote>
          <div className="review-author">
            <strong>{review.name}</strong>
            <span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{'\u2605'.repeat(review.rating)}</span>
          </div>
        </div>

        <footer className="review-navigation" aria-label="Review navigation">
          <div className="review-navigation-arrows">
            <button type="button" onClick={previous} aria-label="Previous review"><Arrow direction="left" /></button>
            <button type="button" onClick={next} aria-label="Next review"><Arrow /></button>
          </div>
          <Link to="/review">View all reviews <Arrow /></Link>
        </footer>
      </article>
    </div>
  </section>;
}
