import './BrandLogo.css';

export default function BrandLogo({ className = '' }) {
  return <span className={`brand-logo${className ? ` ${className}` : ''}`}>
    <img src="/assets/mrlook-logo.png" alt="MR.LOOK Weddings"/>
  </span>;
}
