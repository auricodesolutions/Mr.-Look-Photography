import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';
import './Navbar.css';

const items = [
  ['home', 'Home', '/#home'],
  ['stories', 'Stories', '/#stories'],
  ['albums', 'Albums', '/#albums'],
  ['about', 'About', '/about'],
  ['packages', 'Packages', '/packages'],
  ['contact', 'Contact', '/#contact'],
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const sections = items.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-35% 0px -55%', threshold: [0,.2,.6] });
    sections.forEach((section) => observer.observe(section));
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const isActive = id => {
    if (location.pathname === '/') return active === id;
    if (id === 'about') return location.pathname === '/about';
    if (id === 'packages') return location.pathname === '/packages';
    return false;
  };

  const followLink = (event, to) => {
    setOpen(false);
    const hash = to.includes('#') ? to.slice(to.indexOf('#') + 1) : '';
    if (location.pathname !== '/' || !hash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    navigate(to);
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return <>
    <header className={`site-header ${scrolled || location.pathname !== '/' ? 'is-scrolled' : ''}`}>
      <Link className="brand" to="/#home" onClick={event => followLink(event, '/#home')} aria-label="MR.LOOK Photography home"><BrandLogo/></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {items.map(([id,label,to]) => <Link key={id} className={isActive(id)?'is-active':''} to={to} onClick={event => followLink(event, to)} aria-current={isActive(id)?'page':undefined}>{label}</Link>)}
      </nav>
      <button className={`menu-toggle ${open?'is-open':''}`} type="button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
    </header>
    <div className={`mobile-menu ${open?'is-open':''}`} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">{items.map(([id,label,to],index) => <Link key={id} to={to} style={{'--menu-delay':`${index*65}ms`}} onClick={event => followLink(event, to)}>{label}</Link>)}</nav>
    </div>
  </>;
}
