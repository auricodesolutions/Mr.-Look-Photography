import { Link } from 'react-router-dom';
import Arrow from '../components/common/Arrow.jsx';
import useAlbums from '../hooks/useAlbums.js';
import './Pages.css';

export default function AlbumsPage() {
  const albums = useAlbums();
  return (
    <main className="inner-page albums-archive">
      <header className="albums-archive-intro" data-reveal>
        <div>
          <p className="kicker">The archive / Complete stories</p>
          <h1>All Albums</h1>
        </div>
        <div className="albums-archive-copy">
          <p>Step inside a collection of celebrations photographed with quiet direction, honest emotion and a timeless editorial eye.</p>
          <span>Wedding stories, honestly preserved</span>
        </div>
      </header>

      {albums.length ? (
        <section className="albums-page-grid" aria-label="Wedding albums">
          {albums.map((album, index) => (
            <article
              className="album-archive-card"
              key={album.slug || album.title}
              data-reveal
              style={{ '--delay': `${(index % 2) * 100}ms` }}
            >
              <Link to={`/albums/${album.slug}`} aria-label={`View ${album.title} wedding album`}>
                <figure>
                  <img src={album.src} alt={`${album.title} wedding`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="album-card-view">Open story <Arrow /></span>
                </figure>
                <div className="album-archive-meta">
                  <div>
                    <small>Wedding story</small>
                    <h2>{album.title}</h2>
                  </div>
                  <span className="album-archive-link">View album <Arrow /></span>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <p className="content-message">No albums have been published yet.</p>
      )}
    </main>
  );
}
