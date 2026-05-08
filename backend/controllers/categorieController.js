const { Categorie, Artisan } = require('../models');

const getAll = async (req, res, next) => {
  try {
    const categories = await Categorie.findAll({
      attributes: ['id', 'nom', 'slug', 'icone'],
      order: [['nom', 'ASC']]
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const getBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!/^[a-z0-9-]+$/i.test(slug)) return res.status(400).json({ error: 'Slug invalide' });

    const categorie = await Categorie.findOne({
      where: { slug },
      attributes: ['id', 'nom', 'slug', 'icone']
    });

    if (!categorie) return res.status(404).json({ error: 'Catégorie non trouvée' });

    res.json(categorie);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getBySlug };
