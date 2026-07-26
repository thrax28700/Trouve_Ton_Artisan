import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStats } from '../../services/adminApi';
import './Admin.scss';

const STAT_CARDS = [
  { key: 'artisans',    label: 'Artisans',    icon: 'bi-person-workspace', color: 'blue',   link: '/admin/artisans' },
  { key: 'categories',  label: 'Catégories',  icon: 'bi-grid',             color: 'green',  link: '/admin/categories' },
  { key: 'specialites', label: 'Spécialités', icon: 'bi-tags',             color: 'orange', link: '/admin/specialites' },
  { key: 'messages',    label: 'Messages',    icon: 'bi-envelope',         color: 'purple', link: '/admin/messages' },
];

function AdminDashboard() {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Tableau de bord — Admin';
    getStats().then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <h1><i className="bi bi-speedometer2 me-2" />Tableau de bord</h1>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement…</span>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-stats-grid">
            {STAT_CARDS.map(({ key, label, icon, color, link }) => (
              <Link to={link} key={key} style={{ textDecoration: 'none' }}>
                <div className="admin-stat-card">
                  <div className={`admin-stat-card__icon admin-stat-card__icon--${color}`}>
                    <i className={`bi ${icon}`} />
                  </div>
                  <div>
                    <div className="admin-stat-card__value">
                      {stats?.[key] ?? '—'}
                      {key === 'messages' && stats?.unread > 0 && (
                        <span className="badge-unread">{stats.unread}</span>
                      )}
                    </div>
                    <div className="admin-stat-card__label">{label}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {stats?.unread > 0 && (
            <div className="alert alert-info d-flex align-items-center gap-2">
              <i className="bi bi-envelope-fill fs-5" />
              <div>
                <strong>{stats.unread} message{stats.unread > 1 ? 's' : ''} non lu{stats.unread > 1 ? 's' : ''}</strong> —{' '}
                <Link to="/admin/messages" className="alert-link">Voir les messages</Link>
              </div>
            </div>
          )}

          <div className="admin-card p-4 mt-2">
            <h2 className="fs-5 fw-semibold text-secondary mb-3">Accès rapides</h2>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/admin/artisans" className="admin-btn admin-btn--ghost">
                <i className="bi bi-plus-circle" /> Ajouter un artisan
              </Link>
              <Link to="/admin/categories" className="admin-btn admin-btn--ghost">
                <i className="bi bi-plus-circle" /> Ajouter une catégorie
              </Link>
              <Link to="/admin/specialites" className="admin-btn admin-btn--ghost">
                <i className="bi bi-plus-circle" /> Ajouter une spécialité
              </Link>
              <Link to="/" target="_blank" className="admin-btn admin-btn--ghost">
                <i className="bi bi-box-arrow-up-right" /> Voir le site
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
