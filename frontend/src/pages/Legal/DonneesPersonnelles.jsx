import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Legal.scss';

function DonneesPersonnelles() {
  useEffect(() => {
    document.title = 'Données personnelles — Trouve ton artisan';
  }, []);

  return (
    <div className="legal-page">
      <div className="container">
        <nav aria-label="Fil d'Ariane" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Données personnelles</li>
          </ol>
        </nav>

        <h1 className="legal-title">Politique de confidentialité &amp; données personnelles</h1>
        <p className="legal-updated">Dernière mise à jour : juin 2026</p>

        <section className="legal-section">
          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
          <ul>
            <li><strong>Renaud VAILLANT</strong> — Développeur Web &amp; Web Mobile</li>
            <li><strong>Email :</strong> contact@trouvetonartisan.fr</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. Données collectées</h2>
          <p>Le site collecte les données suivantes via le formulaire de contact :</p>
          <ul>
            <li><strong>Nom</strong> : identification de l'expéditeur</li>
            <li><strong>Adresse email</strong> : permettre une réponse de l'artisan</li>
            <li><strong>Message</strong> : contenu de la demande</li>
          </ul>
          <p>Ces données sont collectées uniquement avec votre consentement explicite (soumission du formulaire).</p>
        </section>

        <section className="legal-section">
          <h2>3. Finalité du traitement</h2>
          <p>Les données collectées sont utilisées uniquement pour :</p>
          <ul>
            <li>Transmettre votre message à l'artisan concerné</li>
            <li>Permettre à l'artisan de vous répondre</li>
          </ul>
          <p>Elles ne sont pas utilisées à des fins commerciales, de prospection ou de profilage.</p>
        </section>

        <section className="legal-section">
          <h2>4. Durée de conservation</h2>
          <p>Les messages de contact sont conservés pendant <strong>12 mois</strong> maximum à des fins d'archivage, puis supprimés.</p>
        </section>

        <section className="legal-section">
          <h2>5. Vos droits (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit d'opposition</strong> : s'opposer au traitement de vos données</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format lisible</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à : <strong>contact@trouvetonartisan.fr</strong></p>
        </section>

        <section className="legal-section">
          <h2>6. Sécurité des données</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :</p>
          <ul>
            <li>Chiffrement des communications (HTTPS en production)</li>
            <li>Accès restreint aux données (authentification admin sécurisée)</li>
            <li>Validation et nettoyage des données saisies</li>
            <li>Protection contre les injections SQL via l'ORM Sequelize</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Réclamation</h2>
          <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
        </section>

        <div className="legal-nav">
          <Link to="/mentions-legales">← Mentions légales</Link>
          <Link to="/accessibilite">Accessibilité →</Link>
        </div>
      </div>
    </div>
  );
}

export default DonneesPersonnelles;
