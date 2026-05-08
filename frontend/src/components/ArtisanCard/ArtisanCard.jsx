import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import './ArtisanCard.scss';

const CATEGORY_ICONS = {
  alimentation: 'bi-basket',
  batiment:     'bi-building',
  fabrication:  'bi-tools',
  services:     'bi-person-badge'
};

function ArtisanCard({ artisan }) {
  const { id, nom, metier, ville, note, en_vedette, categorie } = artisan;
  const icon = CATEGORY_ICONS[categorie?.slug] || 'bi-person-workspace';

  return (
    <article className={`artisan-card ${en_vedette ? 'artisan-card--vedette' : ''}`}>
      {en_vedette && (
        <span className="artisan-card__badge" aria-label="Artisan en vedette">
          <i className="bi bi-star-fill" aria-hidden="true" /> En vedette
        </span>
      )}

      <div className="artisan-card__icon" aria-hidden="true">
        <i className={`bi ${icon}`} />
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
              <i className={`bi ${icon}`} aria-hidden="true" />
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
