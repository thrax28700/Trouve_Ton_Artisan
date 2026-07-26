import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.scss';

function Accessibilite() {
  useEffect(() => {
    document.title = 'Accessibilité — Trouve ton artisan';
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Accessibilité</li>
          </ol>
        </nav>

        <h1 className="legal-title">Déclaration d'accessibilité</h1>
        <p className="legal-updated">Dernière mise à jour : juin 2026</p>

        <section className="legal-section">
          <h2>Engagement</h2>
          <p><strong>Trouve Ton Artisan</strong> s'engage à rendre son site accessible conformément aux Règles pour l'Accessibilité des Contenus Web (<strong>WCAG 2.1</strong>), niveau AA.</p>
        </section>

        <section className="legal-section">
          <h2>État de conformité</h2>
          <p>Le site est <strong>partiellement conforme</strong> aux WCAG 2.1 (niveau AA). Les non-conformités identifiées sont listées ci-dessous.</p>
        </section>

        <section className="legal-section">
          <h2>Mesures prises pour l'accessibilité</h2>
          <ul>
            <li>Structure HTML sémantique (balises <code>header</code>, <code>main</code>, <code>footer</code>, <code>nav</code>, <code>section</code>, <code>article</code>)</li>
            <li>Attributs ARIA pour les éléments interactifs (<code>aria-label</code>, <code>aria-required</code>, <code>aria-live</code>, <code>aria-current</code>)</li>
            <li>Contraste des couleurs conforme au niveau AA (ratio ≥ 4,5:1)</li>
            <li>Navigation au clavier entièrement fonctionnelle</li>
            <li>Lien d'évitement (<em>skip to content</em>) en début de page</li>
            <li>Textes alternatifs sur toutes les images (<code>alt</code>)</li>
            <li>Labels explicites sur tous les champs de formulaire</li>
            <li>Messages d'erreur accessibles associés aux champs</li>
            <li>Responsive design mobile-first</li>
            <li>Validation W3C HTML et CSS</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Non-conformités connues</h2>
          <ul>
            <li>Les étoiles de notation utilisent des icônes Bootstrap Icons sans texte alternatif détaillé dans certains contextes — une amélioration est prévue.</li>
            <li>Certains composants dynamiques pourraient bénéficier d'annonces ARIA plus détaillées.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Technologies utilisées</h2>
          <ul>
            <li>HTML5</li>
            <li>CSS3 / SCSS</li>
            <li>JavaScript (React 18)</li>
            <li>Bootstrap 5.3</li>
            <li>Bootstrap Icons</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Signaler un problème d'accessibilité</h2>
          <p>Si vous rencontrez une difficulté d'accès à une fonctionnalité, contactez-nous :</p>
          <ul>
            <li><strong>Email :</strong> contact@trouvetonartisan.fr</li>
          </ul>
          <p>Nous nous engageons à traiter votre demande dans un délai de <strong>5 jours ouvrés</strong>.</p>
        </section>

        <div className="legal-nav">
          <Link to="/donnees-personnelles">← Données personnelles</Link>
          <Link to="/cookies">Cookies →</Link>
        </div>
      </div>
    </div>
  );
}

export default Accessibilite;
