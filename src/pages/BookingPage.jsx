import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { packages } from '../data.js';
import Arrow from '../components/common/Arrow.jsx';
import './Pages.css';

const initial = { name: '', email: '', phone: '', service: 'Wedding', date: '', time: '', package: 'Wedding Story', message: '' };
const serviceOptions = ['Wedding', 'Engagement', 'Pre-shoot', 'Portrait', 'Event', 'Commercial'];

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service');
  const requestedPackage = packages.find(item => item.slug === searchParams.get('pkg'))?.title;
  const [form, setForm] = useState(() => ({
    ...initial,
    service: serviceOptions.includes(requestedService) ? requestedService : initial.service,
    package: requestedPackage || initial.package
  }));
  const [status, setStatus] = useState('');
  const update = ({ target }) => setForm(value => ({ ...value, [target.name]: target.value }));

  const submit = event => {
    event.preventDefault();
    const subject = encodeURIComponent(`Photography booking request — ${form.name}`);
    const body = encodeURIComponent([
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Package: ${form.package}`,
      `Event date: ${form.date}`,
      `Preferred time: ${form.time}`,
      '',
      form.message
    ].join('\n'));
    setStatus('Your email app is opening with the booking details.');
    window.location.href = `mailto:mr.lookphotographer@gmail.com?subject=${subject}&body=${body}`;
  };

  return <main className="inner-page booking-page">
    <section className="booking-layout" aria-labelledby="booking-form-title">
      <aside className="booking-guide" data-reveal>
        <p className="booking-label">Your enquiry</p>
        <h2>A simple beginning to your story.</h2>
        <p>Share the essentials now. We will guide you through the details personally once we confirm availability.</p>
        <ul>
          <li>Date and service availability</li>
          <li>Coverage tailored to your plans</li>
          <li>Clear package recommendations</li>
        </ul>
        <div className="booking-contact">
          <small>Prefer to speak directly?</small>
          <a href="tel:+94770037239">077 003 7239</a>
          <a href="mailto:mr.lookphotographer@gmail.com">mr.lookphotographer@gmail.com</a>
        </div>
      </aside>

      <form className="editorial-form booking-form" id="booking-form" onSubmit={submit} data-reveal>
        <header className="booking-form-heading">
          <span>Enquiry details</span>
          <h2 id="booking-form-title">Tell us about your celebration.</h2>
          <p>Fields marked as required help us check your date and prepare the right recommendation.</p>
        </header>
        <label><span>Your name *</span><input name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Your full name" required /></label>
        <label><span>Email *</span><input type="email" name="email" value={form.email} onChange={update} autoComplete="email" placeholder="you@example.com" required /></label>
        <label><span>Phone *</span><input type="tel" name="phone" value={form.phone} onChange={update} autoComplete="tel" placeholder="Your contact number" required /></label>
        <label><span>Photography service</span><select name="service" value={form.service} onChange={update}>{serviceOptions.map(service => <option key={service}>{service}</option>)}</select></label>
        <label><span>Event date *</span><input type="date" name="date" value={form.date} onChange={update} required /></label>
        <label><span>Preferred time *</span><input type="time" name="time" value={form.time} onChange={update} required /></label>
        <label className="field-wide"><span>Package</span><select name="package" value={form.package} onChange={update}>{packages.map(item => <option key={item.title}>{item.title}</option>)}</select></label>
        <label className="field-wide"><span>Tell us more</span><textarea name="message" value={form.message} onChange={update} rows="5" placeholder="Venue, ideas, guest experience, or anything you would love us to know..." /></label>
        {status && <p className="form-status success" role="status">{status}</p>}
        <div className="booking-submit field-wide">
          <p>Your details are used only to respond to this enquiry.</p>
          <button className="button button-dark" type="submit">Send booking request <Arrow /></button>
        </div>
      </form>
    </section>
  </main>;
}
