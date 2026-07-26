import { useState, useEffect } from 'react';
import { getAdminCategories, createAdminCategorie, updateAdminCategorie, deleteAdminCategorie } from '../../services/adminApi';
import { autoSlug } from '../../utils/slug';
import './Admin.scss';

const ICONS = ['bi-basket','bi-building','bi-tools','bi-person-badge','bi-scissors','bi-hammer','bi-wrench','bi-brush','bi-truck','bi-shop'];
const EMPTY = { nom: '', slug: '', icone: 'bi-tools' };

function CategorieModal({ categorie, onClose, onSave }) {
  const [form, setForm]   = useState(categorie ? { ...categorie } : EMPTY);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleNomChange = (e) => {
    const nom = e.target.value;
    setForm(p => ({ ...p, nom, slug: autoSlug(nom) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      if (categorie) await updateAdminCategorie(categorie.id, form);
      else await createAdminCategorie(form);
      onSave();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true">
      <div className="admin-modal">
        <h2 className="admin-modal__title">{categorie ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom *</label>
            <input name="nom" className="form-control" value={form.nom} onChange={handleNomChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Slug *</label>
            <input name="slug" className="form-control" value={form.slug} onChange={handleChange} required pattern="[a-z0-9-]+" />
            <div className="form-text">Minuscules, sans accents, tirets uniquement</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Icône Bootstrap</label>
            <select name="icone" className="form-select" value={form.icone} onChange={handleChange}>
              {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
            <div className="mt-2">
              <i className={`bi ${form.icone}`} style={{ fontSize: '1.5rem', color: '#003189' }} />
            </div>
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

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null);

  const load = () => getAdminCategories().then(setCategories).finally(() => setLoading(false));
  useEffect(() => { document.title = 'Catégories — Admin'; load(); }, []);

  const handleDelete = async (id, nom) => {
    if (!confirm(`Supprimer la catégorie "${nom}" ?`)) return;
    try { await deleteAdminCategorie(id); load(); }
    catch (err) { alert(err.message); }
  };

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1><i className="bi bi-grid me-2" />Catégories</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => setModal('new')}>
          <i className="bi bi-plus-lg" /> Ajouter
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr><th>Icône</th><th>Nom</th><th>Slug</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id}>
                <td><i className={`bi ${c.icone}`} style={{ fontSize: '1.3rem', color: '#003189' }} /></td>
                <td className="fw-semibold">{c.nom}</td>
                <td><code>{c.slug}</code></td>
                <td>
                  <div className="d-flex gap-1">
                    <button className="admin-btn admin-btn--warning" onClick={() => setModal(c)}>
                      <i className="bi bi-pencil" />
                    </button>
                    <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(c.id, c.nom)}>
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={4} className="text-center text-muted py-4">Aucune catégorie.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <CategorieModal
          categorie={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}

export default AdminCategories;
