import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero__content">
            <p className="hero__eyebrow">Région Auvergne-Rhône-Alpes</p>
            <h1 id="hero-title" className="hero__title">
              Trouve ton artisan&nbsp;!
            </h1>
            <p className="hero__subtitle">
              Découvrez les artisans qualifiés de votre région — bouchers, boulangers,
              plombiers, coiffeurs et bien plus encore.
            </p>
            <div className="hero__search">
              <SearchBar onSearch={handleSearch} placeholder="Rechercher un artisan, un métier, une ville…" />
            </div>
            <div className="hero__stats" aria-label="Statistiques">
              <div className="hero__stat">
                <strong>17</strong>
                <span>Artisans référencés</span>
              </div>
              <div className="hero__stat">
                <strong>4</strong>
                <span>Catégories</span>
              </div>
              <div className="hero__stat">
                <strong>12+</strong>
                <span>Villes couvertes</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#F5F7FA" />
          </svg>
        </div>
      </section>

      {/* Catégories */}
      <section className="section bg-light-gray" aria-labelledby="categories-title">
        <div className="container">
          <h2 id="categories-title" className="section-title">Nos catégories</h2>
          {loading ? (
            <div className="page-loader"><div className="spinner-border" role="status"><span className="visually-hidden">Chargement…</span></div></div>
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

      {/* Artisans en vedette */}
      {vedette.length > 0 && (
        <section className="section" aria-labelledby="vedette-title">
          <div className="container">
            <h2 id="vedette-title" className="section-title">Artisans en vedette</h2>
            <p className="section-desc">Une sélection de nos meilleurs artisans de la région.</p>
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

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-box">
            <h2 id="cta-title">Vous êtes artisan&nbsp;?</h2>
            <p>Rejoignez la plateforme et faites-vous connaître auprès des particuliers de la région.</p>
            <a
              href="mailto:contact@trouvetonartisan.fr"
              className="btn-region"
              aria-label="Contacter pour rejoindre la plateforme"
            >
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
