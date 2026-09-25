import PageIntro from '../components/common/PageIntro.jsx';
import './TermsPage.css';

const sections = [
  ['Reserving your date', 'A 10% advance payment is required to confirm a booking. A tentative pencil reservation is held for seven days only; the date remains available until the advance and booking confirmation are received.'],
  ['Advance payments', 'Advance payments are non-refundable because Mr.Look Photography accepts one main function per date and reserves the team for the confirmed client.'],
  ['Remaining balance', 'The remaining 90% of the confirmed quotation must be settled one week before the function unless a different written payment schedule has been agreed.'],
  ['Package coverage', 'The team, coverage hours, locations, albums, frames, cards and other deliverables are limited to those listed in the confirmed package or written quotation. Approved extras are charged separately.'],
  ['Travel and accommodation', 'Travel and accommodation charges may apply outside the included Kalutara-to-Colombo service area. Any charge is calculated according to distance, current transport costs and the requirements of the assignment.'],
  ['Getting-ready photographs', 'Getting-ready coverage is available when the hotel room or salon is reasonably close to the function venue. This coverage marks the beginning of the time allocated to the selected package.'],
  ['Crew arrangements', 'Please reserve a separate table for the photography and film team away from the band or loudspeakers. The crew should be included in the buffet; if this is not possible, notify the studio in advance so a one-hour meal break can be arranged.'],
  ['Social media and privacy', 'A limited selection of wedding and pre-shoot photographs may be considered for Mr.Look Photography social media and portfolio use. Clients with privacy requirements should discuss them with the studio in writing before the event.'],
  ['Cost changes', 'If significant and unpredictable supplier or production cost increases occur, a necessary surcharge may be added. Any adjustment will be explained and based on the actual increased cost rather than used to generate additional profit.'],
  ['Creative style and RAW files', 'By booking Mr.Look Photography, you acknowledge the visual and editing style shown in our portfolio. Final image selection and treatment remain part of our professional process. RAW or unedited files are not included unless agreed in writing.'],
  ['Delivery, albums and copyright', 'Delivery estimates are confirmed with the booking. Album production begins after selections and design approval. Mr.Look Photography retains copyright, while clients receive personal-use rights for their delivered photographs and films.'],
  ['Changes beyond our control', 'If weather, venue restrictions, illness, safety concerns or events outside reasonable control affect coverage, we will work with the client in good faith to identify the most practical available solution.'],
];

export default function TermsPage() {
  return <main className="inner-page terms-page">
    <PageIntro eyebrow="Client information" title="Terms & Conditions">Clear expectations help us create with confidence and give every celebration the care it deserves.</PageIntro>
    <div className="terms-layout">
      <aside data-reveal>
        <p>Effective August 5, 2026</p>
        <span>These general terms should be read together with your individual quotation and booking agreement.</span>
        <ul><li>10% to reserve the date</li><li>90% due one week before</li><li>Extras confirmed in writing</li></ul>
        <a href="mailto:mr.lookphotographer@gmail.com">Ask us a question</a>
      </aside>
      <div className="terms-content">
        {sections.map(([title, copy], index) => <article key={title} data-reveal style={{'--delay':`${(index % 3) * 70}ms`}}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div><h2>{title}</h2><p>{copy}</p></div>
        </article>)}
        <article data-reveal>
          <span>{String(sections.length + 1).padStart(2, '0')}</span>
          <div>
            <h2>Contact</h2>
            <p>Questions about these terms can be sent to <a href="mailto:mr.lookphotographer@gmail.com">mr.lookphotographer@gmail.com</a> or discussed with the studio before confirming a booking.</p>
          </div>
        </article>
      </div>
    </div>
  </main>;
}
