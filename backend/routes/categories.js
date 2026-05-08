const router = require('express').Router();
const { getAll, getBySlug } = require('../controllers/categorieController');
const checkApiKey = require('../middleware/apiKey');

router.get('/', checkApiKey, getAll);
router.get('/:slug', checkApiKey, getBySlug);

module.exports = router;
