const app = require('./app');
const { sequelize } = require('./models');
const seed = require('./seed');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
    // Le schéma est défini par database/create.sql (source de vérité). `sync()` sans
    // `alter: true` crée les tables manquantes sans jamais toucher aux tables existantes :
    // `alter: true` réexécute un ALTER TABLE à chaque démarrage et finit par empiler des
    // contraintes UNIQUE en double jusqu'à dépasser la limite MySQL de 64 clés par table.
    await sequelize.sync();
    console.log('✅ Modèles synchronisés.');
    await seed();
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📋 Environnement : ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Impossible de démarrer le serveur :', err);
    process.exit(1);
  }
}

start();
