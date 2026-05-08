import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './NotFound.scss';

function NotFound() {
  useEffect(() => {
    document.title = 'Page introuvable (404) — Trouve ton artisan';
  }, []);

  return (
    <main className="notfound" aria-labelledby="notfound-title">
      <div className="container">
        <div className="notfound__inner">
          <div className="notfound__code" aria-hidden="true">404</div>
          <h1 id="notfound-title" className="notfound__title">
            Page introuvable
          </h1>
          <p className="notfound__desc">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="notfound__actions">
            <Link to="/" className="btn-region">
              <i className="bi bi-house" aria-hidden="true" />
              Retour à l'accueil
            </Link>
            <Link to="/artisans" className="btn-region-outline">
              <i className="bi bi-search" aria-hidden="true" />
              Trouver un artisan
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
