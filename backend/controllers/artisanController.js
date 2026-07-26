const { Artisan, Categorie } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res, next) => {
  try {
    const { categorie, search, page = 1, limit = 12 } = req.query;
    const safeLimit = Math.min(parseInt(limit) || 12, 50);
    const offset = (Math.max(parseInt(page) || 1, 1) - 1) * safeLimit;

    const where = {};
    const categorieWhere = {};

    if (categorie) {
      categorieWhere.slug = categorie;
    }

    if (search) {
      const term = `%${search.trim().substring(0, 100)}%`;
      where[Op.or] = [
        { nom: { [Op.like]: term } },
        { metier: { [Op.like]: term } },
        { ville: { [Op.like]: term } }
      ];
    }

    const includeOpts = {
      model: Categorie,
      as: 'categorie',
      attributes: ['id', 'nom', 'slug', 'icone'],
      ...(Object.keys(categorieWhere).length ? { where: categorieWhere, required: true } : { required: false })
    };

    const { count, rows } = await Artisan.findAndCountAll({
      where,
      include: [includeOpts],
      limit: safeLimit,
      offset,
      order: [['note', 'DESC'], ['nom', 'ASC']],
      attributes: { exclude: ['email'] },
      distinct: true
    });

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / safeLimit),
      artisans: rows
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) return res.status(400).json({ error: 'ID invalide' });

    const artisan = await Artisan.findByPk(parseInt(id), {
      include: [{ model: Categorie, as: 'categorie', attributes: ['id', 'nom', 'slug', 'icone'] }],
      attributes: { exclude: ['email'] }
    });

    if (!artisan) return res.status(404).json({ error: 'Artisan non trouvé' });

    res.json(artisan);
  } catch (err) {
    next(err);
  }
};

const getEnVedette = async (req, res, next) => {
  try {
    const artisans = await Artisan.findAll({
      where: { en_vedette: true },
      include: [{ model: Categorie, as: 'categorie', attributes: ['id', 'nom', 'slug', 'icone'] }],
      order: [['note', 'DESC']],
      limit: 6,
      attributes: { exclude: ['email'] }
    });

    res.json(artisans);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, getEnVedette };
