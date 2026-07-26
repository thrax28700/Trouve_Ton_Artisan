import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.scss';

function AdminLogin() {
  const { signIn, isAuth } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Connexion admin — Trouve ton artisan';
    if (isAuth) navigate('/admin');
  }, [isAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(form);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-card__logo">
          <i className="bi bi-tools" />
        </div>
        <h1 className="admin-login-card__title">Espace administrateur</h1>
        <p className="admin-login-card__subtitle">Trouve Ton Artisan — Région Auvergne-Rhône-Alpes</p>

        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="admin-email" className="form-label fw-semibold">Adresse email</label>
            <input
              id="admin-email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="admin-password" className="form-label fw-semibold">Mot de passe</label>
            <input
              id="admin-password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Connexion…</>
              : <><i className="bi bi-box-arrow-in-right me-2" />Se connecter</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
