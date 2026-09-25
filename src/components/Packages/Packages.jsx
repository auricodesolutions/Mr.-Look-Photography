import { Link } from 'react-router-dom';
import { packages } from '../../data.js';
import { useAdminContent } from '../../hooks/useAdminContent.js';
import Arrow from '../common/Arrow.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import './Packages.css';

const packageDetails = {
  wedding: {
    label: 'Wedding',
    description: 'Wedding photography coverage for an intimate but complete celebration.',
    price: 'LKR 120,000',
    features: [
      'Main photo session at location',
      'Wedding ceremony and reception — up to 10 hours',
      '10 × 30 magazine album — 60 pages',
      'Wood or glass album cover with rexine or wood album box',
      '16 × 24 enlargement — 2 fibre frames',
      '100 thank-you cards — 6 × 8, one side'
    ]
  },
  engagement: {
    label: 'Wedding',
    description: 'Extended wedding coverage with an additional active photographer.',
    price: 'LKR 150,000',
    features: [
      'Main photo session at location',
      'Wedding ceremony and reception — up to 10 hours',
      '10 × 30 magazine album — 60 pages',
      'Glass or wood cover with rexine or wood album box',
      '16 × 24 enlargement — 2 fibre frames',
      '100 thank-you cards — 6 × 8, one side',
      '2 active photographers'
    ]
  },
  'pre-shoot': {
    label: 'Wedding + pre-shoot',
    description: 'Wedding and pre-shoot coverage with albums, frames and a two-photographer team.',
    price: 'LKR 190,000',
    features: [
       'Main photo session at location',
      'Wedding ceremony and reception — up to 12 hours',
      '10 × 30 magazine album — 40 pages with album box',
      '8 × 24 family album — 20 pages',
      '16 × 24 enlargement — 2 fibre frames',
      '100 thank-you cards — 6 × 8, one side',
      'Casual pre-shoot session — 1 dress',
      'Pre-shoot slideshow and one 12 × 18 frame',
      '2 active photographers on the wedding day'
    ]
  },
  custom: {
    label: 'Wedding + pre-shoot',
    description: 'An expanded wedding and pre-shoot collection with additional presentation products.',
    price: 'LKR 250,000',
    features: [
      'Wedding ceremony and reception — up to 12 hours',
      '10 × 30 magazine album — 40 pages with album box',
      '8 × 24 family album — 20 pages',
      '16 × 24 enlargement — 2 fibre frames',
      '100 thank-you cards — 6 × 8, one side',
      'Casual pre-shoot session — 2 dresses',
      '8 × 24 pre-shoot album — 20 pages',
      'Pre-shoot slideshow and two 12 × 18 frames',
      '2 active photographers'
    ]
  },
  editorial: {
    label: 'Wedding + pre-shoot + homecoming',
    description: 'Complete wedding, pre-shoot and homecoming photography coverage.',
    price: 'LKR 320,000',
    features: [
      'Wedding ceremony and reception — up to 12 hours',
      '10 × 30 magazine album — 40 pages with album box',
      '8 × 24 family album — 20 pages',
      '16 × 24 enlargements — 4 for wedding and homecoming',
      '100 thank-you cards — 6 × 8, one side',
      'Casual pre-shoot session — 3 dresses',
      '8 × 24 pre-shoot album — 20 pages',
      'Pre-shoot slideshow and three 12 × 18 frames',
      'Homecoming photo session and function coverage',
      '2 active photographers'
    ]
  },
  homecoming: {
    label: 'Homecoming',
    description: 'Choose portrait-only coverage, ceremony coverage, or a complete homecoming collection with an album and framed enlargement.',
    price: 'From LKR 30,000',
    options: [
      { title: 'Portrait session', price: 'LKR 30,000', features: ['Main photo session at one location', 'Homecoming portrait session only'] },
      { title: 'Portrait + ceremony', price: 'LKR 40,000', features: ['Main photo session at one location', 'Homecoming portrait session and ceremony'] },
      { title: 'Album collection', price: 'LKR 60,000', features: ['Portrait session and ceremony', '8 x 24 magazine album - 30 pages', 'One 16 x 24 enlargement with fibre frame'] }
    ]
  },
  'pre-shoot-options': {
    label: 'Pre-shoot',
    description: 'Three clear pre-shoot choices, from a relaxed two-dress session to a complete album and framed-print collection.',
    price: 'From LKR 30,000',
    options: [
      { title: 'Essential session', price: 'LKR 30,000', features: ['Location session with 2 dresses', 'Pre-shoot slideshow'] },
      { title: 'Framed collection', price: 'LKR 40,000', features: ['Location session with 2 dresses', 'Two 12 x 18 enlargements with fibre frames', 'Pre-shoot slideshow'] },
      { title: 'Album collection', price: 'LKR 60,000', features: ['Location session with 3 dresses', '8 x 24 magazine album - 30 pages', 'Three 12 x 18 enlargements with fibre frames', 'Pre-shoot slideshow'] }
    ]
  },
  'engagement-options': {
    label: 'Engagement',
    description: 'Flexible engagement coverage for portraits, the complete function, or a finished album and framed-print collection.',
    price: 'From LKR 25,000',
    options: [
      { title: 'Portrait session', price: 'LKR 25,000', features: ['Engagement portrait session'] },
      { title: 'Function coverage', price: 'LKR 35,000', features: ['Engagement portraits and function coverage', 'Two 12 x 18 enlargements with fibre frames'] },
      { title: 'Album collection', price: 'LKR 65,000', features: ['Engagement portrait session', '8 x 24 magazine album - 30 pages with rexine box', 'Two 16 x 24 enlargements with fibre frames'] }
    ]
  }
};

const extraCharges = [
  ['Wedding or homecoming photo session only', 'LKR 30,000'],
  ['Additional thank-you card', 'LKR 120'],
  ['Additional 20 x 30 enlargement', 'LKR 12,000'],
  ['Additional 16 x 24 enlargement', 'LKR 8,000'],
  ['Additional 12 x 18 enlargement', 'LKR 4,500'],
  ['Additional album page', 'LKR 1,000'],
  ['8 x 24 album', 'LKR 20,000'],
  ['10 x 30 album', 'LKR 30,000'],
  ['Additional photographer', 'LKR 20,000']
];

export default function Packages() {
  const items = useAdminContent('packages', packages);
  return <section className="section packages" id="packages">
    <SectionTitle title="Photography packages">Clear, flexible coverage created around the scale, rhythm and feeling of your celebration.</SectionTitle>

    <div className="package-guide" data-reveal>
      <p>Every collection can be tailored after a conversation about your date, location and priorities.</p>
      <Link to="/booking">Request a recommendation <Arrow /></Link>
    </div>

    <div className="package-grid">
      {items.map((item, index) => {
        const details = packageDetails[item.slug] || packageDetails.custom;
        return <article className="package-card" key={item.title} data-reveal style={{ '--delay': `${index * 75}ms` }}>
          <figure>
            <img src={item.src} alt={`${item.title} photography package`} loading="lazy" decoding="async" />
            <figcaption>{details.label}</figcaption>
          </figure>
          <div className="package-content">
            <header>
              <small>Mr.Look collection</small>
              <h3>{item.title}</h3>
              <strong className="package-price"><span>{details.options ? 'Starting from' : 'Package price'}</span>{details.price}</strong>
            </header>
            <p>{details.description}</p>
            {details.options
              ? <div className="package-options">{details.options.map(option => <section key={option.title}>
                <div><h4>{option.title}</h4><strong>{option.price}</strong></div>
                <ul>{option.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              </section>)}</div>
              : <ul>{details.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
            <Link to={`/booking?pkg=${item.slug}`}>Discuss this package <Arrow /></Link>
          </div>
        </article>;
      })}
    </div>

    <aside className="package-terms" data-reveal aria-label="Package booking notes">
      <p><strong>Complimentary:</strong> 12 × 18 signing photo frame and wooden laser-cut pen drive.</p>
      <p><strong>Please note:</strong> Transport fees are not included. A 10% advance payment is required to reserve the date.</p>
    </aside>

    <section className="package-extras" aria-labelledby="extra-charges-title">
      <figure data-reveal><img src="/assets/packages/extra.jpeg" alt="Mr.Look wedding rings and extra services" loading="lazy" decoding="async" /></figure>
      <div className="package-extras-content" data-reveal>
        <header><small>Optional additions</small><h2 id="extra-charges-title">Extra charges</h2><p>Add only what your story needs. Confirm availability and the final quotation with the studio before booking.</p></header>
        <ul>{extraCharges.map(([label, price]) => <li key={label}><span>{label}</span><strong>{price}</strong></li>)}</ul>
      </div>
    </section>

    <section className="package-booking-info" aria-labelledby="booking-information-title">
      <header data-reveal><small>Before you reserve</small><h2 id="booking-information-title">Booking information</h2></header>
      <div className="package-booking-grid">
        <article data-reveal><h3>Reserve your date</h3><p>A 10% advance is required. Tentative reservations are held for seven days, and the advance is non-refundable once the date is confirmed.</p></article>
        <article data-reveal><h3>Final payment</h3><p>The remaining 90% must be settled one week before the function. Any approved additions will appear in your final quotation.</p></article>
        <article data-reveal><h3>Travel and timing</h3><p>Travel and accommodation outside the included service area are quoted by distance. Getting-ready coverage begins the package's allocated coverage time.</p></article>
      </div>
      <Link className="package-terms-link" to="/terms-and-conditions">Read full terms &amp; conditions <Arrow /></Link>
    </section>


    <div className="package-custom" data-reveal>
      <span>Need something different?</span>
      <p>Tell us how you imagine your day and we will shape the coverage around it.</p>
      <Link to="/booking?pkg=custom">Create a custom package <Arrow /></Link>
    </div>
  </section>;
}
