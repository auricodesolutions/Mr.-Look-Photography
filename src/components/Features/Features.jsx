import './Features.css';

const services = ['Portraits', 'Commercials', 'Weddings', 'Baby portraits', 'Portraits', 'Events', 'Weddings'];

export default function Features() {
  return <section className="features-marquee" id="features" aria-label="Photography services">
    <div>{[...services, ...services].map((service, index) => <span key={`${service}-${index}`}>{service}</span>)}</div>
  </section>;
}
