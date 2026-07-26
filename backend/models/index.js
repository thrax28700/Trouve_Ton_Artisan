const sequelize = require('../config/database');
const Categorie  = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan    = require('./Artisan');
const Admin      = require('./Admin');
const Message    = require('./Message');

// Catégorie ──► Spécialité ──► Artisan
Categorie.hasMany(Specialite,  { foreignKey: 'categorie_id', as: 'specialites' });
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });

Specialite.hasMany(Artisan, { foreignKey: 'specialite_id', as: 'artisans_specialite' });
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id', as: 'specialite' });

Categorie.hasMany(Artisan, { foreignKey: 'categorie_id', as: 'artisans', onDelete: 'RESTRICT' });
Artisan.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });

module.exports = { sequelize, Categorie, Specialite, Artisan, Admin, Message };
