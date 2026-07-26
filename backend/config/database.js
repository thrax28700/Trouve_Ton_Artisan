require('dotenv').config();
const { Sequelize } = require('sequelize');

// Railway (et la plupart des hébergeurs MySQL managés) fournissent une URL de connexion
// unique (MYSQL_URL / DATABASE_URL) en plus des variables séparées. On la privilégie
// quand elle est présente : une seule variable à référencer, donc moins d'erreurs de
// configuration que 5 variables (DB_HOST/PORT/NAME/USER/PASSWORD) à câbler à la main.
const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

const commonOptions = {
  dialect: 'mysql',
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  dialectOptions: { connectTimeout: 30000 },
};

const sequelize = connectionUrl
  ? new Sequelize(connectionUrl, commonOptions)
  : new Sequelize(
      process.env.DB_NAME || 'trouve_ton_artisan',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT) || 3306,
        ...commonOptions,
      }
    );

module.exports = sequelize;
