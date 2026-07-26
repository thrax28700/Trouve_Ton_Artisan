import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getCategories } from '../../services/api';
import './Header.scss';

const CATEGORY_METIERS = {
  alimentation: ['Boucher', 'Boulanger', 'Chocolatier', 'Traiteur'],
  batiment:     ['Chauffagiste', 'Électricien', 'Menuisier', 'Plombier'],
  fabrication:  ['Bijoutier', 'Couturier', 'Ferronnier'],
  services:     ['Coiffeur', 'Fleuriste', 'Toiletteur', 'Webdesigner'],
};

function DropdownItem({ cat, onClose }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const metiers = CATEGORY_METIERS[cat.slug] || [];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <li ref={ref} className={`nav-item nav-item--dropdown ${open ? 'is-open' : ''}`}>
      <button
        className="nav-dropdown-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <i className={`bi ${cat.icone}`} aria-hidden="true" />
        {cat.nom}
        <i className="bi bi-chevron-down nav-chevron" aria-hidden="true" />
      </button>

      {open && (
        <ul className="nav-dropdown" role="menu">
          <li role="none">
            <NavLink
              to={`/artisans?categorie=${cat.slug}`}
              role="menuitem"
              onClick={() => { setOpen(false); onClose(); }}
            >
              <i className="bi bi-grid" aria-hidden="true" />
              Tous — {cat.nom}
            </NavLink>
          </li>
          <li className="nav-dropdown__divider" role="separator" />
          {metiers.map((m) => (
            <li key={m} role="none">
              <NavLink
                to={`/artisans?categorie=${cat.slug}&search=${encodeURIComponent(m)}`}
                role="menuitem"
                onClick={() => { setOpen(false); onClose(); }}
              >
                <i className="bi bi-person-workspace" aria-hidden="true" />
                {m}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch]         = useState('');
  const [menuOpen, setMenuOpen]     = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
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

      {/* Barre blanche — logo + recherche */}
      <div className="header-identity">
        <div className="container">
          <div className="header-identity__inner">

            <Link to="/" className="header-identity__logo" aria-label="Trouve ton artisan — Accueil">
              <img
                src="/Logo.png"
                alt="Trouve ton artisan ! — Avec la région Auvergne-Rhône-Alpes"
                className="logo-img"
              />
            </Link>

            <div className="header-identity__right">
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
                <button type="submit" className="header-search__btn" aria-label="Rechercher">
                  <i className="bi bi-search" aria-hidden="true" />
                </button>
              </form>

              <Link to="/artisans" className="btn-region d-none d-lg-inline-flex">
                <i className="bi bi-search" aria-hidden="true" />
                Trouver un artisan
              </Link>
            </div>

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

      {/* Nav bleue foncée avec dropdowns */}
      <nav
        id="main-nav"
        className={`header-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label="Navigation principale"
      >
        <div className="container">
          <ul className="header-nav__list" role="list">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                <i className="bi bi-house" aria-hidden="true" />
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/artisans" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setMenuOpen(false)}>
                <i className="bi bi-grid" aria-hidden="true" />
                Tous les artisans
              </NavLink>
            </li>

            {categories.map((cat) => (
              <DropdownItem key={cat.id} cat={cat} onClose={() => setMenuOpen(false)} />
            ))}
          </ul>

          {/* Recherche mobile */}
          <form className="header-search d-lg-none my-2" role="search" onSubmit={handleSearch}>
            <label htmlFor="header-search-mobile" className="visually-hidden">Rechercher</label>
            <input
              id="header-search-mobile"
              type="search"
              className="header-search__input"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="header-search__btn" aria-label="Rechercher">
              <i className="bi bi-search" aria-hidden="true" />
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
