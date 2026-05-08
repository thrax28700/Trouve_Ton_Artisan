const router = require('express').Router();
const { getAll, getById, getEnVedette } = require('../controllers/artisanController');
const checkApiKey = require('../middleware/apiKey');

router.get('/vedette', checkApiKey, getEnVedette);
router.get('/', checkApiKey, getAll);
router.get('/:id', checkApiKey, getById);

module.exports = router;
