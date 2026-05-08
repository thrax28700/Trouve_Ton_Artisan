const checkApiKey = (req, res, next) => {
  const key = req.headers['x-api-key'];

  if (!key || !process.env.API_KEY) {
    return res.status(401).json({ error: 'Authentification requise.' });
  }

  // Comparaison en temps constant pour éviter les timing attacks
  const crypto = require('crypto');
  const expected = Buffer.from(process.env.API_KEY);
  const provided = Buffer.from(key);

  if (expected.length !== provided.length) {
    return res.status(401).json({ error: 'Clé API invalide.' });
  }

  if (!crypto.timingSafeEqual(expected, provided)) {
    return res.status(401).json({ error: 'Clé API invalide.' });
  }

  next();
};

module.exports = checkApiKey;
