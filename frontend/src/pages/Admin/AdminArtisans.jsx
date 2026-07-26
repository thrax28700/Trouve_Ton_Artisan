import { useState, useEffect } from 'react';
import {
  getAdminArtisans, createAdminArtisan, updateAdminArtisan, deleteAdminArtisan,
  getAdminCategories, getAdminSpecialites
} from '../../services/adminApi';
import './Admin.scss';

const EMPTY = { nom: '', metier: '', note: 0, ville: '', email: '', site_web: '', description: '', en_vedette: false, categorie_id: '', specialite_id: '' };

function ArtisanModal({ artisan, categories, specialites, onClose, onSave }) {
  const [form, setForm]   = useState(artisan ? { ...artisan, site_web: artisan.site_web || '', description: artisan.description || '', specialite_id: artisan.specialite_id || '' } : EMPTY);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const filteredSpecs = specialites.filter(s => !form.categorie_id || s.categorie_id === parseInt(form.categorie_id));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const payload = {
        ...form,
        note: parseFloat(form.note),
        categorie_id: parseInt(form.categorie_id),
        specialite_id: form.specialite_id ? parseInt(form.specialite_id) : null,
        site_web: form.site_web || null,
        description: form.description || null
      };
      if (artisan) await updateAdminArtisan(artisan.id, payload);
      else await createAdminArtisan(payload);
      onSave();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="admin-modal">
        <h2 className="admin-modal__title" id="modal-title">
          {artisan ? 'Modifier l\'artisan' : 'Ajouter un artisan'}
        </h2>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nom *</label>
              <input name="nom" className="form-control" value={form.nom} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Métier *</label>
              <input name="metier" className="form-control" value={form.metier} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Catégorie *</label>
              <select name="categorie_id" className="form-select" value={form.categorie_id} onChange={handleChange} required>
                <option value="">Choisir…</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Spécialité</label>
              <select name="specialite_id" className="form-select" value={form.specialite_id} onChange={handleChange}>
                <option value="">Aucune</option>
                {filteredSpecs.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Note (0–5) *</label>
              <input type="number" name="note" className="form-control" value={form.note} onChange={handleChange} min="0" max="5" step="0.1" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Ville *</label>
              <input name="ville" className="form-control" value={form.ville} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label">Email *</label>
              <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>
            <div className="col-12">
              <label className="form-label">Site web</label>
              <input type="url" name="site_web" className="form-control" value={form.site_web} onChange={handleChange} placeholder="https://" />
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input id="vedette" type="checkbox" name="en_vedette" className="form-check-input" checked={form.en_vedette} onChange={handleChange} />
                <label htmlFor="vedette" className="form-check-label">En vedette</label>
              </div>
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

function AdminArtisans() {
  const [artisans, setArtisans]       = useState([]);
  const [categories, setCategories]   = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [modal, setModal]             = useState(null);
  const [search, setSearch]           = useState('');

  const load = () =>
    Promise.all([getAdminArtisans(), getAdminCategories(), getAdminSpecialites()])
      .then(([a, c, s]) => { setArtisans(a); setCategories(c); setSpecialites(s); })
      .finally(() => setLoading(false));

  useEffect(() => { document.title = 'Artisans — Admin'; load(); }, []);

  const handleDelete = async (id, nom) => {
    if (!confirm(`Supprimer "${nom}" ?`)) return;
    await deleteAdminArtisan(id);
    load();
  };

  const filtered = artisans.filter(a =>
    a.nom.toLowerCase().includes(search.toLowerCase()) ||
    a.metier.toLowerCase().includes(search.toLowerCase()) ||
    a.ville.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1><i className="bi bi-person-workspace me-2" />Artisans</h1>
        <button className="admin-btn admin-btn--primary" onClick={() => setModal('new')}>
          <i className="bi bi-plus-lg" /> Ajouter
        </button>
      </div>

      <div className="mb-3">
        <input className="form-control" placeholder="Rechercher par nom, métier, ville…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Métier</th>
              <th>Catégorie</th>
              <th>Ville</th>
              <th>Note</th>
              <th>Vedette</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td className="fw-semibold">{a.nom}</td>
                <td>{a.metier}</td>
                <td><span className="badge bg-light text-dark border">{a.categorie?.nom || '—'}</span></td>
                <td>{a.ville}</td>
                <td>⭐ {parseFloat(a.note).toFixed(1)}</td>
                <td>{a.en_vedette ? '✅' : '—'}</td>
                <td>
                  <div className="d-flex gap-1">
                    <button className="admin-btn admin-btn--warning" onClick={() => setModal(a)}>
                      <i className="bi bi-pencil" />
                    </button>
                    <button className="admin-btn admin-btn--danger" onClick={() => handleDelete(a.id, a.nom)}>
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center text-muted py-4">Aucun artisan trouvé.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <ArtisanModal
          artisan={modal === 'new' ? null : modal}
          categories={categories}
          specialites={specialites}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); load(); }}
        />
      )}
    </div>
  );
}

export default AdminArtisans;
