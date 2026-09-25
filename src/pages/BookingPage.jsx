import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { packages } from '../data.js';
import Arrow from '../components/common/Arrow.jsx';
import PageIntro from '../components/common/PageIntro.jsx';
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

  return <main className="inner-page">
    <PageIntro eyebrow="Bookings / Start a conversation" title="Tell us about your day.">
      Share the essentials below. We will reply with availability, recommendations and a tailored package.
    </PageIntro>
    <div className="booking-layout">
      <aside data-reveal>
        <p>What happens next</p>
        <ol><li>We check your date</li><li>We shape your coverage</li><li>You reserve the story</li></ol>
        <a href="tel:+94776767239">+94 77 676 7239</a>
        <a href="mailto:mr.lookphotographer@gmail.com">mr.lookphotographer@gmail.com</a>
      </aside>
      <form className="editorial-form" onSubmit={submit} data-reveal>
        <label><span>Your name</span><input name="name" value={form.name} onChange={update} required /></label>
        <label><span>Email</span><input type="email" name="email" value={form.email} onChange={update} required /></label>
        <label><span>Phone</span><input type="tel" name="phone" value={form.phone} onChange={update} required /></label>
        <label><span>Service</span><select name="service" value={form.service} onChange={update}>{serviceOptions.map(service => <option key={service}>{service}</option>)}</select></label>
        <label><span>Event date</span><input type="date" name="date" value={form.date} onChange={update} required /></label>
        <label><span>Preferred time</span><input type="time" name="time" value={form.time} onChange={update} required /></label>
        <label><span>Package</span><select name="package" value={form.package} onChange={update}>{packages.map(item => <option key={item.title}>{item.title}</option>)}</select></label>
        <label className="field-wide"><span>Tell us more</span><textarea name="message" value={form.message} onChange={update} rows="5" /></label>
        {status && <p className="form-status success" role="status">{status}</p>}
        <button className="button button-dark field-wide" type="submit">Create email request <Arrow /></button>
      </form>
    </div>
  </main>;
}
