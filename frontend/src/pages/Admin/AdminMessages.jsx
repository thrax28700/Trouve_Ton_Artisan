import { useState, useEffect } from 'react';
import { getAdminMessages, markAdminMessageLu, deleteAdminMessage } from '../../services/adminApi';
import './Admin.scss';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');

  const load = () => getAdminMessages().then(setMessages).finally(() => setLoading(false));
  useEffect(() => { document.title = 'Messages — Admin'; load(); }, []);

  const handleMarkLu = async (id) => { await markAdminMessageLu(id); load(); };
  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    await deleteAdminMessage(id); load();
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const filtered = messages.filter(m => {
    if (filter === 'unread') return !m.lu;
    if (filter === 'read')   return m.lu;
    return true;
  });

  const unreadCount = messages.filter(m => !m.lu).length;

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1>
          <i className="bi bi-envelope me-2" />Messages
          {unreadCount > 0 && <span className="badge-unread">{unreadCount}</span>}
        </h1>
      </div>

      <div className="d-flex gap-2 mb-3">
        {[['all','Tous'], ['unread','Non lus'], ['read','Lus']].map(([val, label]) => (
          <button key={val} className={`admin-btn ${filter === val ? 'admin-btn--primary' : 'admin-btn--ghost'}`} onClick={() => setFilter(val)}>
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card p-4 text-center text-muted">
          <i className="bi bi-inbox fs-2 d-block mb-2" />
          Aucun message {filter !== 'all' ? (filter === 'unread' ? 'non lu' : 'lu') : ''}.
        </div>
      ) : (
        filtered.map(m => (
          <div key={m.id} className={`msg-card ${!m.lu ? 'msg-card--unread' : ''}`}>
            <div className="msg-card__header">
              <div>
                <span className="msg-card__from">{m.nom}</span>
                {' '}
                <a href={`mailto:${m.email}`} className="text-muted" style={{ fontSize: '0.85rem' }}>{m.email}</a>
                {!m.lu && <span className="badge bg-primary ms-2" style={{ fontSize: '0.7rem' }}>Nouveau</span>}
              </div>
              <div className="msg-card__meta">
                {m.artisan_nom && <span className="me-2">Pour : <strong>{m.artisan_nom}</strong></span>}
                <span>{formatDate(m.created_at)}</span>
              </div>
            </div>
            {m.objet && <p className="msg-card__objet"><strong>Objet :</strong> {m.objet}</p>}
            <p className="msg-card__text">{m.message}</p>
            <div className="msg-card__actions">
              {!m.lu && (
                <button className="admin-btn admin-btn--success" onClick={() => handleMarkLu(m.id)}>
                  <i className="bi bi-check2" /> Marquer comme lu
                </button>
              )}
              <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(m.id)}>
                <i className="bi bi-trash" /> Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminMessages;
