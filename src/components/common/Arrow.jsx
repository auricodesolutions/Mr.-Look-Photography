export default function Arrow({ direction = 'right' }) {
  return <span className="arrow" aria-hidden="true">{direction === 'left' ? '\u2190' : '\u2192'}</span>;
}
