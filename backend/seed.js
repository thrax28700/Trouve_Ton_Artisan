const bcrypt = require('bcryptjs');
const { Categorie, Specialite, Artisan, Admin } = require('./models');

// ── Données ────────────────────────────────────────────────────────────────

const categoriesData = [
  { nom: 'Alimentation', slug: 'alimentation', icone: 'bi-basket' },
  { nom: 'Bâtiment',     slug: 'batiment',     icone: 'bi-building' },
  { nom: 'Fabrication',  slug: 'fabrication',  icone: 'bi-tools' },
  { nom: 'Services',     slug: 'services',     icone: 'bi-person-badge' },
];

const specialitesData = [
  { nom: 'Boucher',       slug: 'boucher',       categorie_slug: 'alimentation' },
  { nom: 'Boulanger',     slug: 'boulanger',     categorie_slug: 'alimentation' },
  { nom: 'Chocolatier',   slug: 'chocolatier',   categorie_slug: 'alimentation' },
  { nom: 'Traiteur',      slug: 'traiteur',      categorie_slug: 'alimentation' },
  { nom: 'Chauffagiste',  slug: 'chauffagiste',  categorie_slug: 'batiment' },
  { nom: 'Électricien',   slug: 'electricien',   categorie_slug: 'batiment' },
  { nom: 'Menuisier',     slug: 'menuisier',     categorie_slug: 'batiment' },
  { nom: 'Plombier',      slug: 'plombier',      categorie_slug: 'batiment' },
  { nom: 'Bijoutier',     slug: 'bijoutier',     categorie_slug: 'fabrication' },
  { nom: 'Couturier',     slug: 'couturier',     categorie_slug: 'fabrication' },
  { nom: 'Ferronnier',    slug: 'ferronnier',    categorie_slug: 'fabrication' },
  { nom: 'Coiffeur',      slug: 'coiffeur',      categorie_slug: 'services' },
  { nom: 'Fleuriste',     slug: 'fleuriste',     categorie_slug: 'services' },
  { nom: 'Toiletteur',    slug: 'toiletteur',    categorie_slug: 'services' },
  { nom: 'Webdesigner',   slug: 'webdesigner',   categorie_slug: 'services' },
];

const artisansData = [
  // Alimentation
  { nom: 'Boucherie Dumont',  metier: 'Boucher',      specialite_slug: 'boucher',      note: 4.5, ville: 'Lyon',            email: 'boucherie.dumond@gmail.com',              site_web: null,                              en_vedette: false, categorie_slug: 'alimentation',
    description: "Artisan boucher depuis plus de 20 ans, je sélectionne mes viandes auprès d'éleveurs locaux de la région Auvergne-Rhône-Alpes pour vous garantir fraîcheur et qualité." },
  { nom: 'Au pain chaud',     metier: 'Boulanger',     specialite_slug: 'boulanger',    note: 4.8, ville: 'Montélimar',      email: 'aupainchaud@hotmail.com',                 site_web: null,                              en_vedette: true,  categorie_slug: 'alimentation',
    description: "Boulangerie artisanale proposant pains, viennoiseries et pâtisseries confectionnés chaque matin avec des ingrédients locaux et de saison." },
  { nom: 'Chocolaterie Labbé', metier: 'Chocolatier', specialite_slug: 'chocolatier',  note: 4.9, ville: 'Lyon',            email: 'chocolaterie-labbe@gmail.com',            site_web: 'https://chocolaterie-labbe.fr',   en_vedette: true,  categorie_slug: 'alimentation',
    description: "Chocolatier artisan passionné, je crée des ganaches, pralinés et tablettes de chocolat à partir de fèves de cacao soigneusement sélectionnées." },
  { nom: 'Traiteur Truchon',  metier: 'Traiteur',      specialite_slug: 'traiteur',     note: 4.1, ville: 'Lyon',            email: 'contact@truchon-traiteur.fr',             site_web: 'https://truchon-traiteur.fr',      en_vedette: false, categorie_slug: 'alimentation',
    description: "Traiteur événementiel spécialisé dans la cuisine lyonnaise traditionnelle. Mariages, séminaires, anniversaires — je m'occupe de tout." },
  // Bâtiment
  { nom: 'Orville Salmons',        metier: 'Chauffagiste', specialite_slug: 'chauffagiste', note: 5.0, ville: 'Évian-les-Bains', email: 'o-salmons@live.com',                  site_web: null,                                    en_vedette: true,  categorie_slug: 'batiment',
    description: "Expert en installation et maintenance de systèmes de chauffage, je propose des solutions économiques et écologiques adaptées à chaque logement." },
  { nom: 'Mont Blanc Électricité', metier: 'Électricien', specialite_slug: 'electricien', note: 4.5, ville: 'Chamonix',         email: 'contact@mont-blanc-electricite.com',    site_web: 'https://mont-blanc-electricite.com',    en_vedette: false, categorie_slug: 'batiment',
    description: "Électricien certifié RGE, j'interviens pour vos installations électriques, domotique et bornes de recharge. Devis gratuit sous 48h." },
  { nom: 'Boutot & Fils',          metier: 'Menuisier',   specialite_slug: 'menuisier',   note: 4.7, ville: 'Bourg-en-Bresse',  email: 'boutot-menuiserie@gmail.com',           site_web: 'https://boutot-menuiserie.com',         en_vedette: false, categorie_slug: 'batiment',
    description: "Menuisier-ébéniste de père en fils depuis 3 générations. Fabrication sur mesure de meubles, escaliers, portes et fenêtres en bois massif." },
  { nom: 'Vallis Bellemare',       metier: 'Plombier',    specialite_slug: 'plombier',    note: 4.0, ville: 'Vienne',           email: 'v.bellemare@gmail.com',                 site_web: 'https://plomberie-bellemare.com',       en_vedette: false, categorie_slug: 'batiment',
    description: "Plombier-chauffagiste intervenant pour dépannages d'urgence, rénovations de salles de bain et installation de chauffe-eau thermodynamiques." },
  // Fabrication
  { nom: 'Claude Quinn',    metier: 'Bijoutier',   specialite_slug: 'bijoutier',   note: 4.2, ville: 'Aix-les-Bains', email: 'claude.quinn@gmail.com',    site_web: null,                          en_vedette: false, categorie_slug: 'fabrication',
    description: "Bijoutier-joaillier créateur, je conçois des bijoux uniques en or, argent et pierres précieuses. Créations sur mesure et réparations." },
  { nom: 'Amitée Lécuyer', metier: 'Couturière',  specialite_slug: 'couturier',   note: 4.5, ville: 'Annecy',        email: 'a.amitee@hotmail.com',      site_web: 'https://lecuyer-couture.com', en_vedette: false, categorie_slug: 'fabrication',
    description: "Couturière et styliste, je réalise des vêtements sur mesure, retouches et robes de mariée. Chaque pièce est unique et confectionnée avec soin." },
  { nom: 'Ernest Carignan', metier: 'Ferronnier', specialite_slug: 'ferronnier',  note: 5.0, ville: 'Le Puy-en-Velay', email: 'e-carigan@hotmail.com',   site_web: null,                          en_vedette: false, categorie_slug: 'fabrication',
    description: "Ferronnier d'art spécialisé dans la création de portails, rampes d'escalier, mobilier et sculptures en fer forgé. Travail traditionnel à la main." },
  // Services
  { nom: 'Royden Charbonneau', metier: 'Coiffeur',     specialite_slug: 'coiffeur',    note: 3.8, ville: 'Saint-Priest',    email: 'r.charbonneau@gmail.com',              site_web: null,                                 en_vedette: false, categorie_slug: 'services',
    description: "Coiffeur mixte proposant coupes tendance, colorations végétales et soins capillaires personnalisés dans un salon chaleureux." },
  { nom: 'Leala Dennis',       metier: 'Coiffeuse',    specialite_slug: 'coiffeur',    note: 3.8, ville: 'Chambéry',        email: 'l.dennos@gmail.com',                   site_web: 'https://coiffure-leala-chambery.fr', en_vedette: false, categorie_slug: 'services',
    description: "Coiffeuse spécialisée en techniques de coloration naturelle et coiffures de mariées. Prise de rendez-vous en ligne disponible." },
  { nom: "C'est Sup'Hair",     metier: 'Coiffeur',     specialite_slug: 'coiffeur',    note: 4.1, ville: 'Romans-sur-Isère', email: 'sup-hair@gmail.com',                   site_web: 'https://sup-hair.fr',                en_vedette: false, categorie_slug: 'services',
    description: "Salon de coiffure moderne proposant coupes hommes et femmes, balayages et soins kératine. Équipe dynamique et passionnée." },
  { nom: 'Le Monde des Fleurs', metier: 'Fleuriste',  specialite_slug: 'fleuriste',   note: 4.6, ville: 'Annonay',         email: 'contact@le-monde-des-fleurs-annonay.fr', site_web: 'https://le-monde-des-fleurs-annonay.fr', en_vedette: false, categorie_slug: 'services',
    description: "Fleuriste artisan créateur de bouquets sur mesure pour mariages, événements et décoration d'intérieur. Livraison à domicile disponible." },
  { nom: 'Valérie Laderoute', metier: 'Toiletteuse', specialite_slug: 'toiletteur',  note: 4.5, ville: 'Valence',         email: 'v-laderoute@gmail.com',                  site_web: null,                                    en_vedette: false, categorie_slug: 'services',
    description: "Toiletteuse professionnelle pour chiens et chats. Bain, coupe, soin et épilation dans un cadre calme et rassurant pour votre animal." },
  { nom: 'CM Graphisme',       metier: 'Webdesigner', specialite_slug: 'webdesigner', note: 4.4, ville: 'Valence',         email: 'contact@cm-graphisme.com',               site_web: 'https://cm-graphisme.com',              en_vedette: false, categorie_slug: 'services',
    description: "Studio de création graphique et web. Logos, identités visuelles, sites internet et supports de communication pour artisans et PME." },
];

// ── Fonctions de seed ──────────────────────────────────────────────────────

async function seedCategories() {
  if (await Categorie.count() > 0) return null;
  return Categorie.bulkCreate(categoriesData);
}

async function seedSpecialites(catMap) {
  if (await Specialite.count() > 0) return null;
  const data = specialitesData.map(({ categorie_slug, ...rest }) => ({
    ...rest,
    categorie_id: catMap[categorie_slug]
  }));
  return Specialite.bulkCreate(data);
}

async function seedArtisans(catMap, specMap) {
  if (await Artisan.count() > 0) return null;
  const data = artisansData.map(({ categorie_slug, specialite_slug, ...rest }) => ({
    ...rest,
    categorie_id: catMap[categorie_slug],
    specialite_id: specMap[specialite_slug] || null
  }));
  return Artisan.bulkCreate(data);
}

async function seedAdmin() {
  if (await Admin.count() > 0) return;
  const password = await bcrypt.hash('Admin@2026', 10);
  await Admin.create({ email: 'admin@trouvetonartisan.fr', password });
  console.log('👤 Admin créé — email: admin@trouvetonartisan.fr | mdp: Admin@2026');
}

// ── Entrée principale ──────────────────────────────────────────────────────

async function seed() {
  // Catégories
  let cats = await Categorie.findAll();
  if (cats.length === 0) {
    console.log('🌱 Initialisation de la base de données...');
    cats = await seedCategories();
    console.log(`  ✅ ${cats.length} catégories insérées.`);
  }

  const catMap = {};
  (await Categorie.findAll()).forEach(c => { catMap[c.slug] = c.id; });

  // Spécialités
  let specs = await Specialite.findAll();
  if (specs.length === 0) {
    specs = await seedSpecialites(catMap) || [];
    console.log(`  ✅ ${specs.length || 0} spécialités insérées.`);
    specs = await Specialite.findAll();
  }

  const specMap = {};
  specs.forEach(s => { specMap[s.slug] = s.id; });

  // Artisans
  if (await Artisan.count() === 0) {
    const artisans = await seedArtisans(catMap, specMap);
    console.log(`  ✅ ${artisans?.length || 0} artisans insérés.`);
  }

  // Admin
  await seedAdmin();
}

module.exports = seed;
