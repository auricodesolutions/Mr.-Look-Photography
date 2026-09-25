import { Link } from 'react-router-dom';
import { aboutImage, projects } from '../../data.js';
import { useAdminContent } from '../../hooks/useAdminContent.js';
import Arrow from '../common/Arrow.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import './About.css';

const beliefs = [
  { title: 'Honest moments', text: 'We look for the feeling beneath the pose—the glance, movement and laughter that could never be repeated.' },
  { title: 'Quiet direction', text: 'Gentle guidance keeps you comfortable while leaving enough space for the day to unfold naturally.' },
  { title: 'Timeless craft', text: 'Thoughtful composition and restrained colour create photographs that will still feel beautiful decades from now.' },
  { title: 'Your story first', text: 'Every celebration has its own character. Our approach adapts to you rather than asking you to fit a formula.' }
];

export default function About() {
  const image = useAdminContent('aboutImage', aboutImage);
  return <>
    <section className="section about" id="about">
      <SectionTitle title="Meet the photographer">A personal approach to photography, grounded in observation and shaped by every couple.</SectionTitle>
      <div className="about-grid">
        <figure className="about-portrait" data-reveal>
          <div className="about-portrait-frame"><img src={image} alt="Mr.Look photographer" loading="lazy" decoding="async"/></div>
          <figcaption><span>Founder &amp; lead photographer</span><strong>Mr.Look Photography</strong></figcaption>
        </figure>
        <div className="about-copy" data-reveal>
          <p className="about-lead">We document the heart of your day—the nervous hands, effortless laughter and small glances that say everything.</p>
          <p>Our work blends considered editorial composition with the freedom of documentary photography. The result is elegant, emotional and unmistakably yours.</p>
          <blockquote>“The best photographs never interrupt the moment. They let you feel it again.”</blockquote>
          <ul><li>Calm, personal direction</li><li>Story-first visual approach</li><li>Carefully finished galleries</li><li>Islandwide availability</li></ul>
          <Link className="text-link" to="/packages">Explore packages <Arrow/></Link>
        </div>
      </div>
    </section>

    <section className="about-beliefs" aria-labelledby="beliefs-title">
      <header className="about-beliefs-heading" data-reveal>
        <h2 id="beliefs-title">What we believe</h2>
        <span>Photography should feel as meaningful as the moments it preserves.</span>
      </header>
      <div className="belief-grid">
        {beliefs.map((belief, index) => <article key={belief.title} tabIndex="0" data-reveal style={{ '--delay': `${index * 70}ms` }}>
          <span className="belief-mark" aria-hidden="true" />
          <h3>{belief.title}</h3>
          <p>{belief.text}</p>
        </article>)}
      </div>
    </section>

    <section className="about-action" aria-labelledby="about-action-title">
      <img src={projects[6].src} alt="A timeless Mr.Look photography story" loading="lazy" decoding="async" />
      <div className="about-action-shade" aria-hidden="true" />
      <div className="about-action-copy" data-reveal>
        <p>Begin your story</p>
        <h2 id="about-action-title">Your moments deserve<br />to be remembered honestly.</h2>
        <div className="about-action-buttons">
          <Link to="/packages">View packages <Arrow /></Link>
          <Link to="/booking">Start a conversation <Arrow /></Link>
        </div>
      </div>
    </section>
  </>;
}
