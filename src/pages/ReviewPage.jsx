import { useState } from 'react';
import useReviews from '../hooks/useReviews.js';
import Arrow from '../components/common/Arrow.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import './Pages.css';
import './ReviewPage.css';

const today = new Date().toISOString().slice(0, 10);

function Stars({ value }) {
  return <span className="review-stars" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map(star => <span className={star <= value ? 'is-filled' : ''} key={star} aria-hidden="true">★</span>)}
  </span>;
}

export default function ReviewPage() {
  const reviews = useReviews(50);
  const [form, setForm] = useState({ name: '', rating: 5, text: '', date: today });
  const [status, setStatus] = useState('');
  const update = (field, value) => setForm(current => ({ ...current, [field]: value }));

  const submit = event => {
    event.preventDefault();
    const subject = encodeURIComponent(`Client review — ${form.name || 'Anonymous'}`);
    const body = encodeURIComponent([
      `Name: ${form.name || 'Anonymous'}`,
      `Rating: ${form.rating} / 5`,
      `Date: ${form.date}`,
      '',
      form.text
    ].join('\n'));
    setStatus('Thank you. Your email app is opening with your review.');
    window.location.href = `mailto:mr.lookphotographer@gmail.com?subject=${subject}&body=${body}`;
  };

  return <main className="inner-page reviews-page">
    

    <section className="all-reviews" aria-labelledby="all-reviews-title">
      <header className="all-reviews-heading" data-reveal>
        <div><span>Client notes</span><h2 id="all-reviews-title">All reviews</h2></div>
        <p>Honest reflections on the experience, the photographs and the stories preserved.</p>
      </header>
      <div className="review-directory">
        {reviews.map((review, index) => <article key={`${review.name}-${review.date}`} data-reveal style={{ '--delay': `${(index % 3) * 70}ms` }}>
          <header><Stars value={review.rating || 5} /><time dateTime={review.date}>{new Date(`${review.date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</time></header>
          <blockquote>“{review.quote}”</blockquote>
          <footer><i aria-hidden="true" />{review.name}</footer>
        </article>)}
      </div>
    </section>

    <section className="write-review" aria-labelledby="write-review-title">
      <div className="write-review-intro" data-reveal>
        <span>Share your experience</span>
        <h2 id="write-review-title">Write a review.</h2>
        <p>Your words help future couples understand what it feels like to work with Mr.Look Photography.</p>
      </div>

      <form className="review-entry-form" onSubmit={submit} data-reveal>
        <label><span>Your name</span><input value={form.name} onChange={event => update('name', event.target.value)} placeholder="Your name or couple names" required /></label>
        <label><span>Review date</span><input type="date" value={form.date} max={today} onChange={event => update('date', event.target.value)} required /></label>
        <fieldset>
          <legend>Your rating</legend>
          <div className="review-star-picker" aria-label={`${form.rating} out of 5 stars selected`}>
            {[1, 2, 3, 4, 5].map(star => <button type="button" className={star <= form.rating ? 'is-filled' : ''} aria-label={`${star} star${star === 1 ? '' : 's'}`} aria-pressed={star === form.rating} onClick={() => update('rating', star)} key={star}>★</button>)}
          </div>
        </fieldset>
        <label className="review-message"><span>Your review</span><textarea rows="7" required value={form.text} onChange={event => update('text', event.target.value)} placeholder="Tell us about your experience..." /></label>
        {status && <p className="review-form-status" role="status">{status}</p>}
        <button className="review-submit" type="submit">Send your review <Arrow /></button>
      </form>
    </section>
  </main>;
}
