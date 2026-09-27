import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo.jsx';
import './Footer.css';

const studioAddress = '372, Horana Road, Mahabellana, Panadura 12524';
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`;
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(studioAddress)}&output=embed`;

function Icon({ name }) {
  const paths = {
    phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.5-1.5-6-4-7.5-7.5l2-2z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    facebook: <path d="M14 21v-8h3l.5-3H14V8.5c0-1 .5-1.5 1.7-1.5H18V4.2c-.7-.1-1.7-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.8V10H8v3h2.5v8z" fill="currentColor" stroke="none"/>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 3 2 4.5 5 5l1-1.2 2 .8c-.2 1.4-1.2 2.1-2.5 2.1-3.8-.3-6.9-3.3-7.2-7.1C7.3 7 8 6 9.2 6l.8 2z"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

const contacts = [
  ['phone', '077 003 7239', 'tel:+94770037239'],
  ['mail', 'mr.lookphotographer@gmail.com', 'mailto:mr.lookphotographer@gmail.com'],
  ['clock', 'Monday to Saturday · By appointment', null],
];

const socials = [
  ['instagram', 'Instagram', 'https://www.instagram.com/mr_look_weddding'],
  ['facebook', 'Facebook', 'https://www.facebook.com/share/18PYFh14oV/'],
  ['whatsapp', 'WhatsApp', 'https://wa.me/94770037239'],
];

export default function Footer() {
  return <footer className="footer" id="contact">
    <div className="footer-main">
      <div className="footer-info" data-reveal>
        <p className="footer-kicker">Sri Lanka · Available worldwide</p>
        <BrandLogo className="footer-brand"/>
        <p className="footer-description">We craft honest, timeless stories for weddings, portraits, events and brands.</p>

        <div className="footer-contact-list">
          {contacts.map(([icon, label, href]) => href
            ? <a className="footer-pill" href={href} key={label}><Icon name={icon}/><span>{label}</span></a>
            : <div className="footer-pill" key={label}><Icon name={icon}/><span>{label}</span></div>)}
        </div>

        <div className="footer-socials" aria-label="Social media">
          {socials.map(([icon, label, href], index) => <a href={href} target="_blank" rel="noreferrer" aria-label={label} key={label} style={{'--social-delay':`${index * 80}ms`}}>
            <Icon name={icon}/><span>{label}</span>
          </a>)}
        </div>
      </div>

      <div className="footer-map" data-reveal>
        <iframe src={mapEmbed} title="Mr.Look Photography studio location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
        <div className="footer-map-card">
          <span className="footer-pin"><Icon name="pin"/></span>
          <div>
            <strong>Mr.Look Photography Studio</strong>
            <address>{studioAddress}</address>
            <a href={mapLink} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} Mr.Look Photography · All rights reserved</span>
      <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
      <a className="footer-credit" href="https://auricodesolutions.com/" target="_blank" rel="noreferrer">Designed &amp; crafted by <strong>Auricode Solutions</strong></a>

    </div>
  </footer>;
}
