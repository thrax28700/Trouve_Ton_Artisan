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
    await sequelize.sync({ alter: true });
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
