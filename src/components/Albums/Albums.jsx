import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useAlbums from '../../hooks/useAlbums.js';
import Arrow from '../common/Arrow.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import './Albums.css';

export default function Albums() {
  const albums = useAlbums();
  const featuredAlbums = albums.slice(0, 8);
  const carouselRef = useRef(null);

  const slide = direction => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * carousel.clientWidth, behavior: 'smooth' });
  };

  return <section className="section albums" id="albums">
    <div className="albums-heading-row">
      <SectionTitle title="Signature albums">Meet the couples and explore each celebration as a complete, thoughtfully sequenced story.</SectionTitle>
      <div className="albums-carousel-controls" aria-label="Album carousel navigation">
        <button type="button" onClick={() => slide(-1)} aria-label="Show previous albums"><Arrow direction="left" /></button>
        <button type="button" onClick={() => slide(1)} aria-label="Show next albums"><Arrow /></button>
      </div>
    </div>
    <div className="album-carousel" ref={carouselRef}>
      <div className="album-featured-grid">
        {featuredAlbums.map((album, index) => <article className="album-card" key={album.slug || album.title} data-reveal style={{ '--delay': `${(index % 4) * 85}ms` }}>
          <Link to={`/albums/${album.slug}`} aria-label={`View ${album.title} album`}>
            <img src={album.src} alt={album.title} loading="lazy" decoding="async"/>
            <span className="album-wash" aria-hidden="true"/>
            <div className="album-copy">
              <h3>{album.title}</h3>
              <span className="album-action">View album <Arrow/></span>
            </div>
          </Link>
        </article>)}
      </div>
    </div>
    <div className="albums-archive-action" data-reveal>
      <Link className="button button-dark albums-view-all" to="/albums">View all albums <Arrow/></Link>
    </div>
  </section>;
}
