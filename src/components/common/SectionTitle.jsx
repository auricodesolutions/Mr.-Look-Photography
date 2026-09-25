export default function SectionTitle({ title, children }) {
  return (
    <header className="section-heading" data-reveal>
      <div><h2>{title}</h2></div>
      <p>{children}</p>
    </header>
  );
}
