import { useState, useEffect } from 'react';
import { getAdminSpecialites, createAdminSpecialite, updateAdminSpecialite, deleteAdminSpecialite, getAdminCategories } from '../../services/adminApi';
import { autoSlug } from '../../utils/slug';
import './Admin.scss';

const EMPTY = { nom: '', slug: '', categorie_id: '' };

function SpecialiteModal({ specialite, categories, onClose, onSave }) {
  const [form, setForm]   = useState(specialite ? { ...specialite } : EMPTY);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleNomChange = (e) => {
    const nom = e.target.value;
    setForm(p => ({ ...p, nom, slug: autoSlug(nom) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const payload = { ...form, categorie_id: parseInt(form.categorie_id) };
      if (specialite) await updateAdminSpecialite(specialite.id, payload);
      else await createAdminSpecialite(payload);
      onSave();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal">
        <h2 className="admin-modal__title">{specialite ? 'Modifier la spécialité' : 'Ajouter une spécialité'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Catégorie *</label>
            <select name="categorie_id" className="form-select" value={form.categorie_id} onChange={e => setForm(p => ({ ...p, categorie_id: e.target.value }))} required>
              <option value="">Choisir…</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Nom *</label>
            <input name="nom" className="form-control" value={form.nom} onChange={handleNomChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Slug *</label>
            <input name="slug" className="form-control" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} required />
          </div>
          <div className="admin-modal__footer">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>Annuler</button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminSpecialites() {
  const [specialites, setSpecialites] = useState([]);
  const [categories, setCategories]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);

  const load = () =>
    Promise.all([getAdminSpecialites(), getAdminCategories()])
      .then(([s, c]) => { setSpecialites(s); setCategories(c); })
      .finally(() => setLoading(false));

  useEffect(() => { document.title = 'Spécialités — Admin'; load(); }, []);

  const handleDelete = async (id, nom) => {
    if (!confirm(`Supprimer "${nom}" ?`)) return;
    await deleteAdminSpecialite(id); load();
  };

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1><i className="bi bi-tags me-2" />Spécialités</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => setModal('new')}>
          <i className="bi bi-plus-lg" /> Ajouter
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr><th>Nom</th><th>Slug</th><th>Catégorie</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {specialites.map(s => (
              <tr key={s.id}>
                <td className="fw-semibold">{s.nom}</td>
                <td><code>{s.slug}</code></td>
                <td><span className="badge bg-light text-dark border">{s.categorie?.nom || '—'}</span></td>
                <td>
                  <div className="d-flex gap-1">
                    <button className="admin-btn admin-btn--warning" onClick={() => setModal(s)}>
                      <i className="bi bi-pencil" />
                    </button>
                    <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(s.id, s.nom)}>
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {specialites.length === 0 && (
              <tr><td colSpan={4} className="text-center text-muted py-4">Aucune spécialité.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <SpecialiteModal
          specialite={modal === 'new' ? null : modal}
          categories={categories}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}

export default AdminSpecialites;
