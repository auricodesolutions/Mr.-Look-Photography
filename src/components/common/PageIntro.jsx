export default function PageIntro({ eyebrow, title, children }) {
  return (
    <header className="page-intro" data-reveal>
      <p className="kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}
