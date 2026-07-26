import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.scss';

function Cookies() {
  useEffect(() => {
    document.title = 'Politique de cookies — Trouve ton artisan';
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Cookies</li>
          </ol>
        </nav>

        <h1 className="legal-title">Politique de cookies</h1>
        <p className="legal-updated">Dernière mise à jour : juin 2026</p>

        <section className="legal-section">
          <h2>Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser des informations liées à votre navigation.</p>
        </section>

        <section className="legal-section">
          <h2>Cookies utilisés sur ce site</h2>
          <p>Ce site n'utilise <strong>aucun cookie de tracking ou publicitaire</strong>.</p>
          <p>Le seul élément stocké localement est :</p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Durée</th>
                <th>Utilisation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>admin_token</code></td>
                <td>localStorage (JWT)</td>
                <td>8 heures</td>
                <td>Authentification de l'espace administrateur uniquement</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3">Ce token JWT n'est accessible qu'à l'interface administrateur et n'est pas partagé avec des tiers.</p>
        </section>

        <section className="legal-section">
          <h2>Cookies tiers</h2>
          <p>Ce site ne charge aucun contenu tiers (Google Analytics, Facebook Pixel, etc.) qui pourrait déposer des cookies sur votre appareil.</p>
        </section>

        <section className="legal-section">
          <h2>Gestion de vos préférences</h2>
          <p>Vous pouvez à tout moment supprimer le contenu du localStorage via les outils de votre navigateur :</p>
          <ul>
            <li><strong>Chrome / Edge :</strong> F12 → Application → Local Storage → Supprimer</li>
            <li><strong>Firefox :</strong> F12 → Stockage → Stockage local → Supprimer</li>
            <li><strong>Safari :</strong> Développement → Afficher l'inspecteur → Stockage</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Contact</h2>
          <p>Pour toute question relative aux cookies : <strong>contact@trouvetonartisan.fr</strong></p>
        </section>

        <div className="legal-nav">
          <Link to="/accessibilite">← Accessibilité</Link>
          <Link to="/mentions-legales">Mentions légales →</Link>
        </div>
      </div>
    </div>
  );
}

export default Cookies;
