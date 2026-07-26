require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const artisanRoutes   = require('./routes/artisans');
const categorieRoutes = require('./routes/categories');
const contactRoutes   = require('./routes/contact');
const authRoutes      = require('./routes/auth');
const adminRoutes     = require('./routes/admin');
const errorHandler    = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(xssClean());
app.use(hpp());

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:4173'
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS non autorisé'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization']
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 100 : 2000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes. Réessayez dans 15 minutes.' }
});
app.use('/api', apiLimiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes publiques
app.use('/api/artisans',    artisanRoutes);
app.use('/api/categories',  categorieRoutes);
app.use('/api/contact',     contactRoutes);

// Auth admin
app.use('/api/auth', authRoutes);

// Routes admin protégées (JWT)
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'Trouve ton artisan API', timestamp: new Date().toISOString() });
});

app.use((req, res) => res.status(404).json({ error: 'Route non trouvée' }));
app.use(errorHandler);

module.exports = app;
