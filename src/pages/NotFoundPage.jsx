import { Link } from 'react-router-dom';import './Pages.css';
export default function NotFoundPage(){return <main className="not-found"><p>404 / Page not found</p><h1>That frame is missing.</h1><Link className="button button-dark" to="/">Return home</Link></main>}
