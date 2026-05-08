const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('[ERROR]', err.stack);
  } else {
    console.error('[ERROR]', err.message);
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(422).json({
      error: 'Données invalides',
      details: err.errors?.map(e => e.message) || []
    });
  }

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({ error: 'Erreur de base de données.' });
  }

  if (err.message === 'CORS non autorisé') {
    return res.status(403).json({ error: 'Accès refusé (CORS).' });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Une erreur interne est survenue.'
      : err.message
  });
};

module.exports = errorHandler;
