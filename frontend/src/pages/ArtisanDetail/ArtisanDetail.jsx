import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArtisanById, sendContact } from '../../services/api';
import StarRating from '../../components/StarRating/StarRating';
import './ArtisanDetail.scss';

const CATEGORY_ICONS = {
  alimentation: 'bi-basket',
  batiment:     'bi-building',
  fabrication:  'bi-tools',
  services:     'bi-person-badge'
};

function ArtisanDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [artisan, setArtisan]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [form, setForm]           = useState({ nom: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [sendError, setSendError] = useState('');

  useEffect(() => {
    setLoading(true);
    getArtisanById(id)
      .then((data) => {
        setArtisan(data);
        document.title = `${data.nom} — ${data.metier} | Trouve ton artisan`;
      })
      .catch((err) => {
        if (err.message.includes('non trouvé')) navigate('/404', { replace: true });
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.nom.trim() || form.nom.trim().length < 2)      errs.nom     = 'Veuillez saisir votre nom (min. 2 caractères).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))      errs.email   = 'Adresse email invalide.';
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Message trop court (min. 10 caractères).';
    if (form.message.trim().length > 1000)                   errs.message = 'Message trop long (max. 1000 caractères).';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }

    setSending(true);
    setSendError('');
    try {
      await sendContact({ ...form, artisan_id: artisan.id });
      setSent(true);
      setForm({ nom: '', email: '', message: '' });
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) return (
    <div className="page-loader">
      <div className="spinner-border" role="status"><span className="visually-hidden">Chargement…</span></div>
    </div>
  );

  if (error) return (
    <div className="container py-5">
      <div className="alert alert-danger" role="alert"><i className="bi bi-exclamation-triangle" /> {error}</div>
    </div>
  );

  if (!artisan) return null;

  const icon = CATEGORY_ICONS[artisan.categorie?.slug] || 'bi-person-workspace';

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
            <li className="breadcrumb-item">
              <Link to={`/artisans?categorie=${artisan.categorie?.slug}`}>
                {artisan.categorie?.nom}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">{artisan.nom}</li>
          </ol>
        </div>
      </nav>

      <div className="container detail-layout">
        {/* Fiche artisan */}
        <article className="artisan-profile" aria-labelledby="artisan-name">
          <div className="artisan-profile__header">
            <div className="artisan-profile__icon" aria-hidden="true">
              <i className={`bi ${icon}`} />
            </div>
            <div>
              {artisan.en_vedette && (
                <span className="badge-vedette">
                  <i className="bi bi-star-fill" aria-hidden="true" /> En vedette
                </span>
              )}
              <span className="artisan-profile__metier">{artisan.metier}</span>
              <h1 id="artisan-name" className="artisan-profile__name">{artisan.nom}</h1>
            </div>
          </div>

          <dl className="artisan-profile__info">
            <div className="info-row">
              <dt><i className="bi bi-geo-alt-fill" aria-hidden="true" /> Ville</dt>
              <dd>{artisan.ville}</dd>
            </div>
            <div className="info-row">
              <dt><i className="bi bi-grid" aria-hidden="true" /> Catégorie</dt>
              <dd>
                <Link to={`/artisans?categorie=${artisan.categorie?.slug}`}>
                  {artisan.categorie?.nom}
                </Link>
              </dd>
            </div>
            <div className="info-row">
              <dt><i className="bi bi-star-fill" aria-hidden="true" /> Note</dt>
              <dd>
                <StarRating note={parseFloat(artisan.note)} size="lg" />
              </dd>
            </div>
            {artisan.site_web && (
              <div className="info-row">
                <dt><i className="bi bi-globe" aria-hidden="true" /> Site web</dt>
                <dd>
                  <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">
                    {artisan.site_web.replace(/^https?:\/\//, '')}
                    <i className="bi bi-box-arrow-up-right ms-1" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            )}
          </dl>

          {artisan.description && (
            <div className="artisan-profile__desc">
              <h2>À propos</h2>
              <p>{artisan.description}</p>
            </div>
          )}
        </article>

        {/* Formulaire de contact */}
        <aside className="contact-aside">
          <div className="contact-card">
            <h2 className="contact-card__title">
              <i className="bi bi-envelope" aria-hidden="true" />
              Contacter {artisan.nom}
            </h2>

            {sent ? (
              <div className="contact-success" role="alert" aria-live="polite">
                <i className="bi bi-check-circle-fill" aria-hidden="true" />
                <p><strong>Message envoyé !</strong></p>
                <p>Votre message a bien été transmis. L'artisan vous répondra dans les plus brefs délais.</p>
                <button className="btn-region mt-2" onClick={() => setSent(false)}>
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
                {sendError && (
                  <div className="alert alert-danger mb-3" role="alert">
                    <i className="bi bi-exclamation-triangle" /> {sendError}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="contact-nom" className="form-label">
                    Votre nom <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-nom"
                    name="nom"
                    type="text"
                    className={`form-control ${formErrors.nom ? 'is-invalid' : ''}`}
                    value={form.nom}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-describedby={formErrors.nom ? 'nom-error' : undefined}
                  />
                  {formErrors.nom && (
                    <div id="nom-error" className="invalid-feedback">{formErrors.nom}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-email" className="form-label">
                    Votre email <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                  />
                  {formErrors.email && (
                    <div id="email-error" className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-message" className="form-label">
                    Votre message <span aria-hidden="true" className="text-danger">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className={`form-control ${formErrors.message ? 'is-invalid' : ''}`}
                    value={form.message}
                    onChange={handleChange}
                    maxLength={1000}
                    required
                    aria-required="true"
                    aria-describedby={formErrors.message ? 'message-error' : 'message-count'}
                  />
                  <div id="message-count" className="form-text text-end">
                    {form.message.length}/1000
                  </div>
                  {formErrors.message && (
                    <div id="message-error" className="invalid-feedback">{formErrors.message}</div>
                  )}
                </div>

                <p className="form-text mb-3">
                  <span aria-hidden="true" className="text-danger">*</span> Champs obligatoires
                </p>

                <button
                  type="submit"
                  className="btn-region w-100"
                  disabled={sending}
                  aria-busy={sending}
                >
                  {sending ? (
                    <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Envoi en cours…</>
                  ) : (
                    <><i className="bi bi-send" aria-hidden="true" /> Envoyer le message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ArtisanDetail;
