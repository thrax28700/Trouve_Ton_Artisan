import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategories } from '../../services/api';
import './Header.scss';

function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch]         = useState('');
  const [menuOpen, setMenuOpen]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/artisans?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="site-header" role="banner">
      <div className="header-top">
        <div className="container">
          <div className="header-top__inner">
            <Link to="/" className="site-header__logo" aria-label="Trouve ton artisan — Accueil">
              <span className="logo-title">Trouve ton artisan&nbsp;!</span>
              <span className="logo-sub">Avec la région Auvergne-Rhône-Alpes</span>
            </Link>

            <form className="header-search d-none d-lg-flex" role="search" onSubmit={handleSearch}>
              <label htmlFor="header-search-input" className="visually-hidden">Rechercher un artisan</label>
              <input
                id="header-search-input"
                type="search"
                className="header-search__input"
                placeholder="Rechercher un artisan, une ville…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="header-search__btn" aria-label="Lancer la recherche">
                <i className="bi bi-search" aria-hidden="true" />
              </button>
            </form>

            <button
              className={`hamburger d-lg-none ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      <nav
        id="main-nav"
        className={`header-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label="Navigation principale"
      >
        <div className="container">
          <ul className="header-nav__list" role="list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/artisans"
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Tous les artisans
              </NavLink>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <NavLink
                  to={`/artisans?categorie=${cat.slug}`}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className={`bi ${cat.icone}`} aria-hidden="true" />
                  {cat.nom}
                </NavLink>
              </li>
            ))}
          </ul>

          <form className="header-search d-lg-none mt-3" role="search" onSubmit={handleSearch}>
            <label htmlFor="header-search-mobile" className="visually-hidden">Rechercher un artisan</label>
            <input
              id="header-search-mobile"
              type="search"
              className="header-search__input"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="header-search__btn" aria-label="Lancer la recherche">
              <i className="bi bi-search" aria-hidden="true" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
