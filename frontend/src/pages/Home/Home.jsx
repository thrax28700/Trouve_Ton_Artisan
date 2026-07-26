import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCategories, getArtisansVedette } from '../../services/api';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.scss';

function Home() {
  const [categories, setCategories] = useState([]);
  const [vedette, setVedette]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Accueil — Trouve ton artisan | Région Auvergne-Rhône-Alpes';
    Promise.all([getCategories(), getArtisansVedette()])
      .then(([cats, arts]) => { setCategories(cats); setVedette(arts); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (term) => {
    if (term) navigate(`/artisans?search=${encodeURIComponent(term)}`);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__overlay" aria-hidden="true" />
        <div className="container">
          <div className="hero__content">

            <div className="hero__logo-wrap">
              <img
                src="/transparentlogo.png"
                onError={(e) => { e.target.style.display = 'none'; }}
                alt="Trouve ton artisan ! — Avec la région Auvergne-Rhône-Alpes"
                className="hero__logo"
              />
            </div>
            <p className="hero__subtitle">
              Découvrez les artisans qualifiés près de chez vous — bouchers,
              boulangers, plombiers, coiffeurs et bien plus encore.
            </p>

            {/* Barre de recherche */}
            <div className="hero__search">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Rechercher un artisan, un métier, une ville…"
              />
            </div>

            {/* Raccourcis catégories */}
            {categories.length > 0 && (
              <div className="hero__cats">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/artisans?categorie=${cat.slug}`}
                    className="hero__cat-pill"
                  >
                    <i className={`bi ${cat.icone}`} aria-hidden="true" />
                    {cat.nom}
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Vague de séparation */}
        <div className="hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none">
            <path d="M0,35 C480,70 960,0 1440,35 L1440,70 L0,70 Z" fill="#F5F7FA" />
          </svg>
        </div>
      </section>

      {/* ── Statistiques ─────────────────────────────────── */}
      <section className="stats-bar" aria-label="Chiffres clés">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <strong>17</strong>
              <span>Artisans référencés</span>
            </div>
            <div className="stat-item">
              <strong>4</strong>
              <span>Catégories de métiers</span>
            </div>
            <div className="stat-item">
              <strong>12+</strong>
              <span>Villes couvertes</span>
            </div>
            <div className="stat-item">
              <strong>100%</strong>
              <span>Artisans locaux</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comment trouver mon artisan ? ───────────────────── */}
      <section className="section how-it-works" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title" className="section-title text-center">Comment trouver mon artisan&nbsp;?</h2>
          <p className="section-desc text-center how-it-works__intro">
            Quatre étapes simples pour entrer en contact avec l'artisan qu'il vous faut.
          </p>
          <ol className="steps-grid">
            <li className="step-card">
              <span className="step-card__number" aria-hidden="true">1</span>
              <i className="bi bi-grid step-card__icon" aria-hidden="true" />
              <h3 className="step-card__title">Choisir la catégorie d'artisanat dans le menu</h3>
            </li>
            <li className="step-card">
              <span className="step-card__number" aria-hidden="true">2</span>
              <i className="bi bi-person-workspace step-card__icon" aria-hidden="true" />
              <h3 className="step-card__title">Choisir un artisan</h3>
            </li>
            <li className="step-card">
              <span className="step-card__number" aria-hidden="true">3</span>
              <i className="bi bi-envelope step-card__icon" aria-hidden="true" />
              <h3 className="step-card__title">Le contacter via le formulaire de contact</h3>
            </li>
            <li className="step-card">
              <span className="step-card__number" aria-hidden="true">4</span>
              <i className="bi bi-clock-history step-card__icon" aria-hidden="true" />
              <h3 className="step-card__title">Une réponse sera apportée sous 48h</h3>
            </li>
          </ol>
        </div>
      </section>

      {/* ── Catégories ───────────────────────────────────── */}
      <section className="section bg-light-gray" aria-labelledby="categories-title">
        <div className="container">
          <h2 id="categories-title" className="section-title">Parcourir par catégorie</h2>
          {loading ? (
            <div className="page-loader">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Chargement…</span>
              </div>
            </div>
          ) : (
            <div className="categories-grid" role="list">
              {categories.map((cat) => (
                <div key={cat.id} role="listitem">
                  <CategoryCard categorie={cat} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Artisans en vedette ───────────────────────────── */}
      {!loading && vedette.length > 0 && (
        <section className="section" aria-labelledby="vedette-title">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 id="vedette-title" className="section-title">Artisans en vedette</h2>
                <p className="section-desc">Une sélection de nos meilleurs artisans de la région.</p>
              </div>
              <Link to="/artisans" className="btn-region-outline">
                Voir tous les artisans
                <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
            <div className="artisans-grid" role="list">
              {vedette.map((artisan) => (
                <div key={artisan.id} role="listitem">
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-box">
            <div className="cta-box__text">
              <h2 id="cta-title">Vous êtes artisan&nbsp;?</h2>
              <p>Rejoignez la plateforme et faites-vous connaître auprès des particuliers de la région.</p>
            </div>
            <a href="mailto:contact@trouvetonartisan.fr" className="btn-region cta-box__btn">
              <i className="bi bi-envelope" aria-hidden="true" />
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
