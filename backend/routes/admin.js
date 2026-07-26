const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/adminController');

router.use(auth);

// Stats
router.get('/stats', ctrl.getStats);

// Artisans
router.get('/artisans',       ctrl.getAllArtisans);
router.post('/artisans',      ctrl.createArtisan);
router.put('/artisans/:id',   ctrl.updateArtisan);
router.delete('/artisans/:id', ctrl.deleteArtisan);

// Catégories
router.get('/categories',       ctrl.getAllCategories);
router.post('/categories',      ctrl.createCategorie);
router.put('/categories/:id',   ctrl.updateCategorie);
router.delete('/categories/:id', ctrl.deleteCategorie);

// Spécialités
router.get('/specialites',       ctrl.getAllSpecialites);
router.post('/specialites',      ctrl.createSpecialite);
router.put('/specialites/:id',   ctrl.updateSpecialite);
router.delete('/specialites/:id', ctrl.deleteSpecialite);

// Messages
router.get('/messages',          ctrl.getAllMessages);
router.patch('/messages/:id/lu', ctrl.markMessageLu);
router.delete('/messages/:id',   ctrl.deleteMessage);

module.exports = router;
