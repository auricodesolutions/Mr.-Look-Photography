import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Arrow from '../components/common/Arrow.jsx';
import { albums } from '../data.js';
import './Pages.css';

export default function AlbumPage() {
  const { slug } = useParams();
  const [selected, setSelected] = useState(null);
  const album = albums.find(item => item.slug === slug);
  const photos = album
    ? Array.from({ length: 10 }, (_, index) => ({
        src: `/assets/optimized/albums/${album.slug}/img${index + 1}.webp`,
        title: `${album.title} photograph ${index + 1}`
      }))
    : [];

  if (!album) {
    return <main className="inner-page album-detail">
      <p className="kicker">Album unavailable</p>
      <h1>This story could not be found.</h1>
      <Link className="text-link" to="/albums">Back to albums <Arrow /></Link>
    </main>;
  }

  return <main className="inner-page album-detail">
    <header className="album-detail-hero">
      <div>
        <p className="kicker">Complete story</p>
        <h1>{album.title}</h1>
        <p>{photos.length} photographs</p>
      </div>
      <img src={album.src} alt={album.title} decoding="async" fetchPriority="high" />
    </header>

    <div className="album-photo-grid">
      {photos.map((photo, index) => <button type="button" key={photo.src} onClick={() => setSelected(index)}>
        <img src={photo.src} alt={photo.title} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" fetchPriority={index === 0 ? 'high' : 'low'} />
      </button>)}
    </div>

    <Link className="text-link album-back-link" to="/albums">Back to all albums <Arrow direction="left" /></Link>

    {selected !== null && photos[selected] && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
      <button type="button" className="lightbox-close">Close</button>
      <figure onClick={event => event.stopPropagation()}>
        <img src={photos[selected].src} alt={photos[selected].title} />
        <figcaption>{album.title}</figcaption>
      </figure>
    </div>}
  </main>;
}
