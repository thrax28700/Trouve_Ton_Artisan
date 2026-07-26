import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.scss';

const NAV_ITEMS = [
  { to: '/admin',             icon: 'bi-speedometer2', label: 'Tableau de bord', end: true },
  { to: '/admin/artisans',    icon: 'bi-person-workspace', label: 'Artisans' },
  { to: '/admin/categories',  icon: 'bi-grid',         label: 'Catégories' },
  { to: '/admin/specialites', icon: 'bi-tags',         label: 'Spécialités' },
  { to: '/admin/messages',    icon: 'bi-envelope',     label: 'Messages' },
];

function AdminLayout() {
  const { email, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { signOut(); navigate('/admin/login'); };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <i className="bi bi-tools" />
          <span>Admin</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Navigation admin">
          {NAV_ITEMS.map(({ to, icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
              <i className={`bi ${icon}`} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <span className="admin-user-email">
            <i className="bi bi-person-circle" aria-hidden="true" /> {email}
          </span>
          <button onClick={handleLogout} className="admin-logout-btn">
            <i className="bi bi-box-arrow-right" aria-hidden="true" /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
