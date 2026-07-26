const { Artisan, Categorie, Specialite, Message } = require('../models');
const { Op } = require('sequelize');

// ── Stats ──────────────────────────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    const [artisans, categories, specialites, messages, unread] = await Promise.all([
      Artisan.count(),
      Categorie.count(),
      Specialite.count(),
      Message.count(),
      Message.count({ where: { lu: false } })
    ]);
    res.json({ artisans, categories, specialites, messages, unread });
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

// ── Artisans ───────────────────────────────────────────────────────────────
const getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        { model: Categorie,  as: 'categorie',  attributes: ['id', 'nom', 'slug'] },
        { model: Specialite, as: 'specialite', attributes: ['id', 'nom'] }
      ],
      order: [['nom', 'ASC']]
    });
    res.json(artisans);
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

const createArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.create(req.body);
    res.status(201).json(artisan);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const updateArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé.' });
    await artisan.update(req.body);
    res.json(artisan);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const deleteArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé.' });
    await artisan.destroy();
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

// ── Catégories ─────────────────────────────────────────────────────────────
const getAllCategories = async (req, res) => {
  try {
    const cats = await Categorie.findAll({ order: [['nom', 'ASC']] });
    res.json(cats);
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

const createCategorie = async (req, res) => {
  try {
    const cat = await Categorie.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const updateCategorie = async (req, res) => {
  try {
    const cat = await Categorie.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Catégorie non trouvée.' });
    await cat.update(req.body);
    res.json(cat);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const cat = await Categorie.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Catégorie non trouvée.' });
    await cat.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(422).json({ error: 'Impossible de supprimer : des artisans utilisent cette catégorie.' });
  }
};

// ── Spécialités ────────────────────────────────────────────────────────────
const getAllSpecialites = async (req, res) => {
  try {
    const specs = await Specialite.findAll({
      include: [{ model: Categorie, as: 'categorie', attributes: ['id', 'nom'] }],
      order: [['nom', 'ASC']]
    });
    res.json(specs);
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

const createSpecialite = async (req, res) => {
  try {
    const spec = await Specialite.create(req.body);
    res.status(201).json(spec);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const updateSpecialite = async (req, res) => {
  try {
    const spec = await Specialite.findByPk(req.params.id);
    if (!spec) return res.status(404).json({ error: 'Spécialité non trouvée.' });
    await spec.update(req.body);
    res.json(spec);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

const deleteSpecialite = async (req, res) => {
  try {
    const spec = await Specialite.findByPk(req.params.id);
    if (!spec) return res.status(404).json({ error: 'Spécialité non trouvée.' });
    await spec.destroy();
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

// ── Messages ───────────────────────────────────────────────────────────────
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['created_at', 'DESC']] });
    res.json(messages);
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

const markMessageLu = async (req, res) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message non trouvé.' });
    await msg.update({ lu: true });
    res.json(msg);
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message non trouvé.' });
    await msg.destroy();
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Erreur serveur.' }); }
};

module.exports = {
  getStats,
  getAllArtisans, createArtisan, updateArtisan, deleteArtisan,
  getAllCategories, createCategorie, updateCategorie, deleteCategorie,
  getAllSpecialites, createSpecialite, updateSpecialite, deleteSpecialite,
  getAllMessages, markMessageLu, deleteMessage
};
