import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-watermark" aria-hidden="true">
        <span>ARA</span>
      </div>

      <div className="container footer-inner">
        <div className="footer-grid">

          {/* Colonne marque */}
          <div className="footer-brand">
            <div className="footer-brand__logo">
              <img src="/Logo.png" alt="Trouve ton artisan — Région Auvergne-Rhône-Alpes" className="footer-logo-img" height="48" />
            </div>
            <p className="footer-brand__desc">
              Plateforme officielle de mise en relation entre particuliers
              et artisans qualifiés de la région Auvergne-Rhône-Alpes.
            </p>
          </div>

          {/* Catégories */}
          <nav aria-label="Catégories d'artisans">
            <h2 className="footer-heading">Catégories</h2>
            <ul className="footer-links">
              <li><Link to="/artisans?categorie=alimentation"><i className="bi bi-basket" aria-hidden="true" />Alimentation</Link></li>
              <li><Link to="/artisans?categorie=batiment"><i className="bi bi-building" aria-hidden="true" />Bâtiment</Link></li>
              <li><Link to="/artisans?categorie=fabrication"><i className="bi bi-tools" aria-hidden="true" />Fabrication</Link></li>
              <li><Link to="/artisans?categorie=services"><i className="bi bi-person-badge" aria-hidden="true" />Services</Link></li>
            </ul>
          </nav>

          {/* Navigation */}
          <nav aria-label="Navigation du site">
            <h2 className="footer-heading">Navigation</h2>
            <ul className="footer-links">
              <li><Link to="/"><i className="bi bi-house" aria-hidden="true" />Accueil</Link></li>
              <li><Link to="/artisans"><i className="bi bi-search" aria-hidden="true" />Tous les artisans</Link></li>
            </ul>
          </nav>

          {/* Informations légales */}
          <nav aria-label="Informations légales">
            <h2 className="footer-heading">Informations légales</h2>
            <ul className="footer-links">
              <li><Link to="/mentions-legales"><i className="bi bi-file-text" aria-hidden="true" />Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles"><i className="bi bi-shield-check" aria-hidden="true" />Données personnelles</Link></li>
              <li><Link to="/accessibilite"><i className="bi bi-universal-access" aria-hidden="true" />Accessibilité</Link></li>
              <li><Link to="/cookies"><i className="bi bi-cookie" aria-hidden="true" />Cookies</Link></li>
            </ul>
          </nav>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {year} Trouve ton artisan — Renaud VAILLANT</p>
          <p className="footer-bottom__mention">
            Données issues du fichier artisans régional — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
