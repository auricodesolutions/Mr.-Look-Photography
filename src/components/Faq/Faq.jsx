import { faqs } from '../../data.js';
import SectionTitle from '../common/SectionTitle.jsx';
import './Faq.css';

export default function Faq() {
  return <section className="section faq" id="faq">
    <SectionTitle title="Before we begin">A few useful details. For everything else, start a conversation with us.</SectionTitle>
    <div className="faq-list">
      {faqs.map(([question, answer], index) => <details key={question} data-reveal style={{'--delay':`${index * 55}ms`}}>
        <summary><span>{question}</span><i aria-hidden="true"/></summary>
        <p>{answer}</p>
      </details>)}
    </div>
  </section>;
}
