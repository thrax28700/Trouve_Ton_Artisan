import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.scss';

function MentionsLegales() {
  useEffect(() => {
    document.title = 'Mentions légales — Trouve ton artisan';
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Mentions légales</li>
          </ol>
        </nav>

        <h1 className="legal-title">Mentions légales</h1>
        <p className="legal-updated">Dernière mise à jour : juin 2026</p>

        <section className="legal-section">
          <h2>1. Éditeur du site</h2>
          <p>Le site <strong>Trouve Ton Artisan</strong> est édité dans le cadre d'un projet pédagogique :</p>
          <ul>
            <li><strong>Nom :</strong> Renaud VAILLANT</li>
            <li><strong>Formation :</strong> Développeur Web &amp; Web Mobile — Centre Européen de Formation</li>
            <li><strong>Année :</strong> 2026</li>
            <li><strong>Email :</strong> contact@trouvetonartisan.fr</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. Hébergement</h2>
          <p>Ce site est hébergé localement dans un contexte de développement. En production, l'hébergement sera assuré par des prestataires tiers conformes à la réglementation française.</p>
        </section>

        <section className="legal-section">
          <h2>3. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu de ce site (textes, images, logos, code source) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite.</p>
          <p>Les données des artisans proviennent du fichier artisans régional Auvergne-Rhône-Alpes fourni dans le cadre du projet pédagogique.</p>
        </section>

        <section className="legal-section">
          <h2>4. Responsabilité</h2>
          <p>Les informations contenues sur ce site sont fournies à titre indicatif. L'éditeur ne saurait être tenu responsable des erreurs ou omissions dans le contenu, ni des dommages directs ou indirects résultant de l'utilisation du site.</p>
        </section>

        <section className="legal-section">
          <h2>5. Droit applicable</h2>
          <p>Ce site est soumis au droit français. Tout litige sera porté devant les tribunaux compétents.</p>
        </section>

        <div className="legal-nav">
          <Link to="/donnees-personnelles">Données personnelles →</Link>
          <Link to="/accessibilite">Accessibilité →</Link>
          <Link to="/cookies">Cookies →</Link>
        </div>
      </div>
    </div>
  );
}

export default MentionsLegales;
