const sequelize = require('../config/database');
const Categorie = require('./Categorie');
const Artisan = require('./Artisan');

Categorie.hasMany(Artisan, { foreignKey: 'categorie_id', as: 'artisans', onDelete: 'RESTRICT' });
Artisan.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });

module.exports = { sequelize, Categorie, Artisan };
