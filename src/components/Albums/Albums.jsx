import { Link } from 'react-router-dom';
import useAlbums from '../../hooks/useAlbums.js';
import Arrow from '../common/Arrow.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import './Albums.css';

export default function Albums() {
  const albums = useAlbums();
  const featuredAlbums = albums.slice(0, 4);

  return <section className="section albums" id="albums">
    <SectionTitle title="Signature albums">Meet the couples and explore each celebration as a complete, thoughtfully sequenced story.</SectionTitle>
    <div className="album-featured-grid">
      {featuredAlbums.map((album, index) => <article className="album-card" key={album.slug || album.title} data-reveal style={{ '--delay': `${index * 85}ms` }}>
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
    <div className="albums-archive-action" data-reveal>
      <Link className="button button-dark albums-view-all" to="/albums">View all albums <Arrow/></Link>
    </div>
  </section>;
}
