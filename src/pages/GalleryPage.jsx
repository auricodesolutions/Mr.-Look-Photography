import { useState } from 'react';
import { projects } from '../data.js';
import { useAdminContent } from '../hooks/useAdminContent.js';
import PageIntro from '../components/common/PageIntro.jsx';
import './Pages.css';

export default function GalleryPage() {
  const gallery = useAdminContent('gallery', projects);
  const [selected, setSelected] = useState(null);
  return <main className="inner-page"><PageIntro eyebrow="Portfolio / Selected work" title="Stories in stillness and motion.">Weddings, portraits and celebrations photographed with an editorial eye and a documentary heart.</PageIntro><div className="full-gallery">{gallery.map((project, index) => <button type="button" key={project.src} onClick={() => setSelected(index)} data-reveal style={{'--delay':`${(index%4)*65}ms`}}><img src={project.src} alt={project.alt} loading="lazy" decoding="async"/><span>{project.alt}</span></button>)}</div>{selected !== null && gallery[selected] && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)}><button type="button" className="lightbox-close">Close</button><figure onClick={event => event.stopPropagation()}><img src={gallery[selected].src} alt={gallery[selected].alt}/><figcaption>{gallery[selected].alt}</figcaption></figure></div>}</main>;
}
