const router = require('express').Router();
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendContact } = require('../controllers/contactController');
const checkApiKey = require('../middleware/apiKey');

// Rate limit spécifique au formulaire de contact
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Trop de messages envoyés. Veuillez réessayer dans une heure.' }
});

const validateContact = [
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est requis.')
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères.')
    .escape(),
  body('email')
    .isEmail().withMessage("L'adresse email est invalide.")
    .normalizeEmail()
    .isLength({ max: 150 }),
  body('objet')
    .trim()
    .notEmpty().withMessage("L'objet est requis.")
    .isLength({ min: 2, max: 200 }).withMessage("L'objet doit contenir entre 2 et 200 caractères.")
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Le message est requis.')
    .isLength({ min: 10, max: 1000 }).withMessage('Le message doit contenir entre 10 et 1000 caractères.')
    .escape(),
  body('artisan_id')
    .isInt({ min: 1 }).withMessage("L'identifiant de l'artisan est invalide.")
];

router.post('/', checkApiKey, contactLimiter, validateContact, sendContact);

module.exports = router;
