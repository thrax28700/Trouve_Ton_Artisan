import { Link } from 'react-router-dom';
import './CategoryCard.scss';

function CategoryCard({ categorie }) {
  const { nom, slug, icone } = categorie;

  return (
    <Link
      to={`/artisans?categorie=${slug}`}
      className="category-card"
      aria-label={`Voir les artisans de la catégorie ${nom}`}
    >
      <div className="category-card__icon" aria-hidden="true">
        <i className={`bi ${icone}`} />
      </div>
      <span className="category-card__name">{nom}</span>
      <span className="category-card__arrow" aria-hidden="true">
        <i className="bi bi-arrow-right" />
      </span>
    </Link>
  );
}

export default CategoryCard;
