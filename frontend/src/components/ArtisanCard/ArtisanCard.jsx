import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './ArtisanCard.scss';

const METIER_ICONS = {
  'Boucher':      '/butcher.png',
  'Boulanger':    '/baker.png',
  'Chocolatier':  '/chocolate.png',
  'Traiteur':     '/catering.png',
  'Chauffagiste': '/engineer.png',
  'Électricien':  '/electrician.png',
  'Menuisier':    '/carpenter.png',
  'Plombier':     '/plumber.png',
  'Bijoutier':    '/jeweler.png',
  'Couturier':    '/dressmaker.png',
  'Couturière':   '/dressmaker.png',
  'Ferronnier':   '/ironworker.png',
  'Coiffeur':     '/hairdresser.png',
  'Coiffeuse':    '/hairdresser.png',
  'Fleuriste':    '/florist.png',
  'Toiletteur':   '/dog.png',
  'Toiletteuse':  '/dog.png',
  'Webdesign':    '/webdisgner.png',
  'Webdesigner':  '/webdisgner.png',
};

function ArtisanCard({ artisan }) {
  const { id, nom, metier, ville, note, en_vedette, categorie } = artisan;
  const iconPng = METIER_ICONS[metier];

  return (
    <article className={`artisan-card ${en_vedette ? 'artisan-card--vedette' : ''}`}>
      {en_vedette && (
        <span className="artisan-card__badge">
          <i className="bi bi-star-fill" aria-hidden="true" /> En vedette
        </span>
      )}

      <div className="artisan-card__icon" aria-hidden="true">
        {iconPng
          ? <img src={iconPng} alt={metier} className="artisan-card__icon-img" />
          : <i className="bi bi-person-workspace" />
        }
      </div>

      <div className="artisan-card__body">
        <span className="artisan-card__metier">{metier}</span>
        <h2 className="artisan-card__name">{nom}</h2>

        <div className="artisan-card__meta">
          <span className="artisan-card__ville">
            <i className="bi bi-geo-alt-fill" aria-hidden="true" />
            {ville}
          </span>
          {categorie && (
            <span className="artisan-card__cat">
              {categorie.nom}
            </span>
          )}
        </div>

        <div className="artisan-card__note">
          <StarRating note={parseFloat(note)} size="sm" />
        </div>
      </div>

      <Link
        to={`/artisans/${id}`}
        className="artisan-card__link btn-region"
        aria-label={`Voir la fiche de ${nom}`}
      >
        Voir la fiche
        <i className="bi bi-arrow-right" aria-hidden="true" />
      </Link>
    </article>
  );
}

export default ArtisanCard;
