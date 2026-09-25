import { Link } from 'react-router-dom';
import Arrow from '../components/common/Arrow.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
import useAlbums from '../hooks/useAlbums.js';
import './Pages.css';

export default function AlbumsPage() {
  const albums = useAlbums();
  return <main className="inner-page"><PageIntro eyebrow="Archive / Complete stories" title="Signature albums.">Explore celebrations as they unfolded, from the quiet anticipation to the final dance.</PageIntro>{albums.length ? <div className="albums-page-grid">{albums.map((album,index) => <article key={album.slug || album.title} data-reveal style={{'--delay':`${(index%2)*100}ms`}}><Link to={`/albums/${album.slug}`}><img src={album.src} alt={album.title} loading="lazy" decoding="async"/><div><small>Wedding album</small><h2>{album.title}</h2><span>View album <Arrow/></span></div></Link></article>)}</div> : <p className="content-message">No albums have been published yet.</p>}</main>;
}
