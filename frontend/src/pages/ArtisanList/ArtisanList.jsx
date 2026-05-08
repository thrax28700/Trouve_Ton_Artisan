import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getArtisans, getCategories } from '../../services/api';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import './ArtisanList.scss';

function ArtisanList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artisans, setArtisans]         = useState([]);
  const [categories, setCategories]     = useState([]);
  const [total, setTotal]               = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');

  const categorie = searchParams.get('categorie') || '';
  const search    = searchParams.get('search')    || '';
  const page      = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const fetchArtisans = useCallback(() => {
    setLoading(true);
    setError('');
    const params = { page, limit: 12 };
    if (categorie) params.categorie = categorie;
    if (search)    params.search    = search;

    getArtisans(params)
      .then((data) => {
        setArtisans(data.artisans);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [categorie, search, page]);

  useEffect(() => {
    const catLabel = categories.find(c => c.slug === categorie)?.nom || '';
    const titleParts = [];
    if (catLabel) titleParts.push(catLabel);
    if (search)   titleParts.push(`"${search}"`);
    document.title = `${titleParts.length ? titleParts.join(' — ') + ' — ' : ''}Artisans | Trouve ton artisan`;
    fetchArtisans();
  }, [fetchArtisans]);

  const handleSearch = (term) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (term) next.set('search', term); else next.delete('search');
      next.set('page', '1');
      return next;
    });
  };

  const handleCategorie = (slug) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug) next.set('categorie', slug); else next.delete('categorie');
      next.set('page', '1');
      return next;
    });
  };

  const handlePage = (p) => {
    setSearchParams((prev) => { const n = new URLSearchParams(prev); n.set('page', String(p)); return n; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categorieLabel = categories.find(c => c.slug === categorie)?.nom || '';

  return (
    <div className="artisanlist-page">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb-item active" aria-current="page">
              {categorieLabel || 'Tous les artisans'}
            </li>
          </ol>
        </div>
      </nav>

      {/* En-tête */}
      <section className="artisanlist-header">
        <div className="container">
          <h1 className="artisanlist-header__title">
            {categorieLabel ? `Artisans — ${categorieLabel}` : 'Tous les artisans'}
          </h1>
          {!loading && (
            <p className="artisanlist-header__count" aria-live="polite" aria-atomic="true">
              {total} artisan{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
              {search ? ` pour « ${search} »` : ''}
            </p>
          )}
        </div>
      </section>

      <div className="container artisanlist-layout">
        {/* Filtres */}
        <aside className="artisanlist-filters" aria-label="Filtres">
          <div className="filter-block">
            <h2 className="filter-block__title">Recherche</h2>
            <SearchBar
              onSearch={handleSearch}
              initialValue={search}
              placeholder="Artisan, métier, ville…"
            />
          </div>

          <div className="filter-block">
            <h2 className="filter-block__title">Catégories</h2>
            <ul className="filter-list" role="list">
              <li>
                <button
                  className={`filter-item ${!categorie ? 'active' : ''}`}
                  onClick={() => handleCategorie('')}
                  aria-pressed={!categorie}
                >
                  <i className="bi bi-grid" aria-hidden="true" />
                  Toutes les catégories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`filter-item ${categorie === cat.slug ? 'active' : ''}`}
                    onClick={() => handleCategorie(cat.slug)}
                    aria-pressed={categorie === cat.slug}
                  >
                    <i className={`bi ${cat.icone}`} aria-hidden="true" />
                    {cat.nom}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Résultats */}
        <main aria-label="Liste des artisans">
          {loading && (
            <div className="page-loader">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Chargement des artisans…</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle" aria-hidden="true" /> {error}
            </div>
          )}

          {!loading && !error && artisans.length === 0 && (
            <div className="no-results">
              <i className="bi bi-search" aria-hidden="true" />
              <p>Aucun artisan trouvé{search ? ` pour « ${search} »` : ''}.</p>
              <button className="btn-region-outline" onClick={() => handleSearch('')}>
                Effacer la recherche
              </button>
            </div>
          )}

          {!loading && artisans.length > 0 && (
            <>
              <div className="artisans-grid" role="list">
                {artisans.map((artisan) => (
                  <div key={artisan.id} role="listitem">
                    <ArtisanCard artisan={artisan} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Pagination" className="pagination-nav">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePage(page - 1)} disabled={page <= 1} aria-label="Page précédente">
                        <i className="bi bi-chevron-left" aria-hidden="true" />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePage(p)} aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined}>
                          {p}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePage(page + 1)} disabled={page >= totalPages} aria-label="Page suivante">
                        <i className="bi bi-chevron-right" aria-hidden="true" />
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ArtisanList;
