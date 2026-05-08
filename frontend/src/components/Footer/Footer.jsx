import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-brand__title">Trouve ton artisan&nbsp;!</p>
            <p className="footer-brand__sub">Avec la région Auvergne-Rhône-Alpes</p>
            <p className="footer-brand__desc">
              Plateforme de mise en relation entre particuliers et artisans
              qualifiés de la région Auvergne-Rhône-Alpes.
            </p>
          </div>

          <nav aria-label="Catégories">
            <h3 className="footer-heading">Catégories</h3>
            <ul className="footer-links">
              <li><Link to="/artisans?categorie=alimentation"><i className="bi bi-basket" aria-hidden="true" /> Alimentation</Link></li>
              <li><Link to="/artisans?categorie=batiment"><i className="bi bi-building" aria-hidden="true" /> Bâtiment</Link></li>
              <li><Link to="/artisans?categorie=fabrication"><i className="bi bi-tools" aria-hidden="true" /> Fabrication</Link></li>
              <li><Link to="/artisans?categorie=services"><i className="bi bi-person-badge" aria-hidden="true" /> Services</Link></li>
            </ul>
          </nav>

          <nav aria-label="Informations">
            <h3 className="footer-heading">Informations</h3>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/artisans">Tous les artisans</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="footer-heading">Région Auvergne-Rhône-Alpes</h3>
            <p className="footer-region-text">
              Initiative portée par la Région pour valoriser l'artisanat local
              et favoriser les circuits courts.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {year} Trouve ton artisan — Région Auvergne-Rhône-Alpes. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
