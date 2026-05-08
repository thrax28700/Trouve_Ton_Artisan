const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
    await sequelize.sync({ alter: false });
    console.log('✅ Modèles synchronisés.');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`📋 Environnement : ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Impossible de démarrer le serveur :', err.message);
    process.exit(1);
  }
}

start();
