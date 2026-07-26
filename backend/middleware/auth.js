const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant.' });
  }
  const token = header.slice(7);
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide ou expiré.' });
  }
};

module.exports = auth;
