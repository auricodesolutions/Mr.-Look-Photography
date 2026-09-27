import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './FloatingWhatsApp.css';

const phone = '94770037239';
const questions = [
  'Is our wedding date available?',
  'Can you travel to our venue?',
  'How will we receive our photographs?',
  'We have another question'
];

function WhatsAppIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607m-5.607 12.2a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.497.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.588-6.592 6.588m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.066-.315-.099-.445.099-.133.197-.513.646-.627.775-.116.133-.232.148-.43.05-.197-.099-.836-.308-1.592-.985-.59-.525-.985-1.175-1.099-1.372-.115-.198-.013-.305.086-.404.089-.088.197-.23.296-.345.1-.116.133-.198.198-.33.066-.133.033-.248-.016-.347-.05-.099-.445-1.075-.611-1.47-.16-.387-.323-.335-.445-.34-.114-.006-.247-.006-.38-.006a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.132 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.151.906.129 1.248.078.38-.058 1.171-.48 1.338-.943.164-.462.164-.858.114-.943-.049-.084-.182-.132-.38-.23" />
  </svg>;
}

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = event => { if (event.key === 'Escape') setOpen(false); };
    document.body.classList.add('whatsapp-open');
    addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('whatsapp-open');
      removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const whatsappUrl = useMemo(() => {
    const details = message.trim() ? `\n\n${message.trim()}` : '';
    const text = encodeURIComponent(`Hello Mr.Look Photography, ${selectedQuestion}${details}`);
    return `https://wa.me/${phone}?text=${text}`;
  }, [message, selectedQuestion]);

  const dialog = open ? createPortal(
    <div className="whatsapp-dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="whatsapp-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsapp-dialog-title">
        <header className="whatsapp-dialog-header">
          <div className="whatsapp-dialog-monogram" aria-hidden="true">ML</div>
          <div>
            <strong>MR.LOOK WEDDINGS</strong>
            <span><i aria-hidden="true" /> Online · We usually reply soon</span>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp enquiry">×</button>
        </header>

        <div className="whatsapp-dialog-content">
          <p className="whatsapp-dialog-kicker">Wedding enquiry</p>
          <h2 id="whatsapp-dialog-title">How can we help with your special day?</h2>
          <div className="whatsapp-question-list" role="group" aria-label="Choose a question">
            {questions.map(question => <button
              type="button"
              className={selectedQuestion === question ? 'is-selected' : ''}
              onClick={() => setSelectedQuestion(question)}
              aria-pressed={selectedQuestion === question}
              key={question}
            >{question}</button>)}
          </div>
          <label className="whatsapp-message-field">
            <span>Your message</span>
            <textarea value={message} onChange={event => setMessage(event.target.value)} rows="4" placeholder="Tell us your date, venue, or anything you would like us to know..." />
          </label>
        </div>

        <footer className="whatsapp-dialog-footer">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <WhatsAppIcon /> Continue on WhatsApp
          </a>
          <p>Your message will be ready to send in WhatsApp.</p>
        </footer>
      </section>
    </div>,
    document.body
  ) : null;

  return <>
    <button
      className="floating-whatsapp"
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open WhatsApp enquiry"
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <span className="floating-whatsapp-label">WhatsApp</span>
      <span className="floating-whatsapp-icon" aria-hidden="true"><WhatsAppIcon /></span>
    </button>
    {dialog}
  </>;
}
