const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { notEmpty: true, len: [2, 100] }
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { is: /^[a-z0-9-]+$/i }
  },
  icone: {
    type: DataTypes.STRING(60),
    allowNull: true,
    defaultValue: 'bi-tools'
  }
}, {
  tableName: 'categories',
  timestamps: false
});

module.exports = Categorie;
