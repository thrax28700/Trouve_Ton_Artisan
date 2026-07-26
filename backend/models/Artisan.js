const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true, len: [2, 150] }
  },
  metier: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true }
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    defaultValue: 0.0,
    validate: { min: 0, max: 5 }
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { isEmail: true }
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: { isUrl: true }
  },
  en_vedette: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  categorie_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  specialite_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  }
}, {
  tableName: 'artisans',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Artisan;
