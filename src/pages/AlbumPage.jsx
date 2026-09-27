import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../components/common/Arrow.jsx';
import { albums } from '../data.js';
import './Pages.css';

export default function AlbumPage() {
  const { slug } = useParams();
  const [selected, setSelected] = useState(null);
  const albumIndex = albums.findIndex(item => item.slug === slug);
  const album = albums[albumIndex];
  const nextAlbum = album ? albums[(albumIndex + 1) % albums.length] : null;
  const photos = album
    ? Array.from({ length: 10 }, (_, index) => ({
        src: `/assets/optimized/albums/${album.sourceSlug || album.slug}/img${index + 1}.webp`,
        title: `${album.title} photograph ${index + 1}`
      }))
    : [];

  const previousPhoto = () => setSelected(value => (value - 1 + photos.length) % photos.length);
  const nextPhoto = () => setSelected(value => (value + 1) % photos.length);

  useEffect(() => {
    if (selected === null) return undefined;
    const handleKey = event => {
      if (event.key === 'Escape') setSelected(null);
      if (event.key === 'ArrowLeft') previousPhoto();
      if (event.key === 'ArrowRight') nextPhoto();
    };
    addEventListener('keydown', handleKey);
    document.body.classList.add('lightbox-open');
    return () => {
      removeEventListener('keydown', handleKey);
      document.body.classList.remove('lightbox-open');
    };
  }, [selected, photos.length]);

  if (!album) {
    return <main className="inner-page album-detail album-missing">
      <p className="kicker">Album unavailable</p>
      <h1>This story could not be found.</h1>
      <Link className="text-link" to="/albums">Back to albums <Arrow /></Link>
    </main>;
  }

  const lightbox = selected !== null && photos[selected]
    ? createPortal(<div className="album-lightbox" role="dialog" aria-modal="true" aria-label={`${album.title} photo viewer`} onClick={() => setSelected(null)}>
      <header>
        <span>{album.title}</span>
        <button type="button" className="album-lightbox-close" onClick={() => setSelected(null)}>Close</button>
      </header>
      <button type="button" className="album-lightbox-arrow prev" aria-label="Previous photograph" onClick={event => { event.stopPropagation(); previousPhoto(); }}><Arrow direction="left" /></button>
      <figure key={selected} onClick={event => event.stopPropagation()}>
        <img src={photos[selected].src} alt={photos[selected].title} />
        <figcaption>{album.title}</figcaption>
      </figure>
      <button type="button" className="album-lightbox-arrow next" aria-label="Next photograph" onClick={event => { event.stopPropagation(); nextPhoto(); }}><Arrow /></button>
    </div>, document.body)
    : null;

  return <>
    <main className="inner-page album-detail">
      <header className="album-detail-hero">
        <figure className="album-cover" data-reveal>
          <img src={album.src} alt={`${album.title} wedding story cover`} decoding="async" fetchPriority="high" />
        </figure>
        <div className="album-detail-hero-shade" aria-hidden="true" />
        <div className="album-detail-intro" data-reveal>
          <Link className="album-hero-back" to="/albums"><Arrow direction="left" /> All albums</Link>
          <p className="kicker">Mr.Look wedding story</p>
          <h1>{album.title}</h1>
          <div className="album-hero-details">
            <p className="album-detail-summary">A complete collection of honest moments, quiet details and everything that made this celebration their own.</p>
            <div className="album-hero-actions">
              <a className="album-explore-link" href="#album-gallery">View the album <Arrow /></a>
            </div>
          </div>
        </div>
      </header>

      <section className="album-gallery-section" id="album-gallery" aria-labelledby="album-gallery-title">
        <header className="album-gallery-heading" data-reveal>
          <div><span>Selected frames</span><h2 id="album-gallery-title">The complete story.</h2></div>
          <p>Select any photograph to view it full screen. Use the arrow keys to move through the album.</p>
        </header>

        <div className="album-photo-grid">
          {photos.map((photo, index) => <button type="button" key={photo.src} onClick={() => setSelected(index)} aria-label={`Open photograph ${index + 1} of ${photos.length}`} data-reveal style={{ '--delay': `${(index % 2) * 70}ms` }}>
            <img src={photo.src} alt={photo.title} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} />
            <span className="album-photo-action"><b>View photograph <Arrow /></b></span>
          </button>)}
        </div>
      </section>


    </main>
    {lightbox}
  </>;
}
