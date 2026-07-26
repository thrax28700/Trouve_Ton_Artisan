-- ============================================================
-- Trouve ton artisan — Jeu de données initial
-- Source : data.xlsx fourni par la Région Auvergne-Rhône-Alpes
-- ============================================================

USE trouve_ton_artisan;

-- ── Catégories ──────────────────────────────────────────────
INSERT INTO categories (nom, slug, icone) VALUES
  ('Alimentation', 'alimentation', 'bi-basket'),
  ('Bâtiment',     'batiment',     'bi-building'),
  ('Fabrication',  'fabrication',  'bi-tools'),
  ('Services',     'services',     'bi-person-badge');

-- ── Spécialités (rattachées à leur catégorie) ───────────────
INSERT INTO specialites (nom, slug, categorie_id) VALUES
  ('Boucher',      'boucher',      (SELECT id FROM categories WHERE slug = 'alimentation')),
  ('Boulanger',    'boulanger',    (SELECT id FROM categories WHERE slug = 'alimentation')),
  ('Chocolatier',  'chocolatier',  (SELECT id FROM categories WHERE slug = 'alimentation')),
  ('Traiteur',     'traiteur',     (SELECT id FROM categories WHERE slug = 'alimentation')),
  ('Chauffagiste', 'chauffagiste', (SELECT id FROM categories WHERE slug = 'batiment')),
  ('Électricien',  'electricien',  (SELECT id FROM categories WHERE slug = 'batiment')),
  ('Menuisier',    'menuisier',    (SELECT id FROM categories WHERE slug = 'batiment')),
  ('Plombier',     'plombier',     (SELECT id FROM categories WHERE slug = 'batiment')),
  ('Bijoutier',    'bijoutier',    (SELECT id FROM categories WHERE slug = 'fabrication')),
  ('Couturier',    'couturier',    (SELECT id FROM categories WHERE slug = 'fabrication')),
  ('Ferronnier',   'ferronnier',   (SELECT id FROM categories WHERE slug = 'fabrication')),
  ('Coiffeur',     'coiffeur',     (SELECT id FROM categories WHERE slug = 'services')),
  ('Fleuriste',    'fleuriste',    (SELECT id FROM categories WHERE slug = 'services')),
  ('Toiletteur',   'toiletteur',   (SELECT id FROM categories WHERE slug = 'services')),
  ('Webdesigner',  'webdesigner',  (SELECT id FROM categories WHERE slug = 'services'));

-- ── Artisans ────────────────────────────────────────────────
-- Catégorie : Alimentation
INSERT INTO artisans (nom, metier, note, ville, description, email, site_web, en_vedette, categorie_id, specialite_id) VALUES
(
  'Boucherie Dumont', 'Boucher', 4.5, 'Lyon',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Artisan boucher depuis plus de 20 ans, je sélectionne mes viandes auprès d''éleveurs locaux de la région Auvergne-Rhône-Alpes pour vous garantir fraîcheur et qualité.',
  'boucherie.dumond@gmail.com', NULL, 0,
  (SELECT id FROM categories  WHERE slug = 'alimentation'),
  (SELECT id FROM specialites WHERE slug = 'boucher')
),
(
  'Au pain chaud', 'Boulanger', 4.8, 'Montélimar',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Boulangerie artisanale proposant pains, viennoiseries et pâtisseries confectionnés chaque matin avec des ingrédients locaux et de saison.',
  'aupainchaud@hotmail.com', NULL, 1,
  (SELECT id FROM categories  WHERE slug = 'alimentation'),
  (SELECT id FROM specialites WHERE slug = 'boulanger')
),
(
  'Chocolaterie Labbé', 'Chocolatier', 4.9, 'Lyon',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Chocolatier artisan passionné, je crée des ganaches, pralinés et tablettes de chocolat à partir de fèves de cacao soigneusement sélectionnées.',
  'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1,
  (SELECT id FROM categories  WHERE slug = 'alimentation'),
  (SELECT id FROM specialites WHERE slug = 'chocolatier')
),
(
  'Traiteur Truchon', 'Traiteur', 4.1, 'Lyon',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Traiteur événementiel spécialisé dans la cuisine lyonnaise traditionnelle. Mariages, séminaires, anniversaires — je m''occupe de tout.',
  'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0,
  (SELECT id FROM categories  WHERE slug = 'alimentation'),
  (SELECT id FROM specialites WHERE slug = 'traiteur')
);

-- Catégorie : Bâtiment
INSERT INTO artisans (nom, metier, note, ville, description, email, site_web, en_vedette, categorie_id, specialite_id) VALUES
(
  'Orville Salmons', 'Chauffagiste', 5.0, 'Évian-les-Bains',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Expert en installation et maintenance de systèmes de chauffage, je propose des solutions économiques et écologiques adaptées à chaque logement.',
  'o-salmons@live.com', NULL, 1,
  (SELECT id FROM categories  WHERE slug = 'batiment'),
  (SELECT id FROM specialites WHERE slug = 'chauffagiste')
),
(
  'Mont Blanc Électricité', 'Électricien', 4.5, 'Chamonix',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Électricien certifié RGE, j''interviens pour vos installations électriques, domotique et bornes de recharge. Devis gratuit sous 48h.',
  'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0,
  (SELECT id FROM categories  WHERE slug = 'batiment'),
  (SELECT id FROM specialites WHERE slug = 'electricien')
),
(
  'Boutot & Fils', 'Menuisier', 4.7, 'Bourg-en-Bresse',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Menuisier-ébéniste de père en fils depuis 3 générations. Fabrication sur mesure de meubles, escaliers, portes et fenêtres en bois massif.',
  'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0,
  (SELECT id FROM categories  WHERE slug = 'batiment'),
  (SELECT id FROM specialites WHERE slug = 'menuisier')
),
(
  'Vallis Bellemare', 'Plombier', 4.0, 'Vienne',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Plombier-chauffagiste intervenant pour dépannages d''urgence, rénovations de salles de bain et installation de chauffe-eau thermodynamiques.',
  'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0,
  (SELECT id FROM categories  WHERE slug = 'batiment'),
  (SELECT id FROM specialites WHERE slug = 'plombier')
);

-- Catégorie : Fabrication
INSERT INTO artisans (nom, metier, note, ville, description, email, site_web, en_vedette, categorie_id, specialite_id) VALUES
(
  'Claude Quinn', 'Bijoutier', 4.2, 'Aix-les-Bains',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Bijoutier-joaillier créateur, je conçois des bijoux uniques en or, argent et pierres précieuses. Créations sur mesure et réparations.',
  'claude.quinn@gmail.com', NULL, 0,
  (SELECT id FROM categories  WHERE slug = 'fabrication'),
  (SELECT id FROM specialites WHERE slug = 'bijoutier')
),
(
  'Amitée Lécuyer', 'Couturière', 4.5, 'Annecy',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Couturière et styliste, je réalise des vêtements sur mesure, retouches et robes de mariée. Chaque pièce est unique et confectionnée avec soin.',
  'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0,
  (SELECT id FROM categories  WHERE slug = 'fabrication'),
  (SELECT id FROM specialites WHERE slug = 'couturier')
),
(
  'Ernest Carignan', 'Ferronnier', 5.0, 'Le Puy-en-Velay',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Ferronnier d''art spécialisé dans la création de portails, rampes d''escalier, mobilier et sculptures en fer forgé. Travail traditionnel à la main.',
  'e-carigan@hotmail.com', NULL, 0,
  (SELECT id FROM categories  WHERE slug = 'fabrication'),
  (SELECT id FROM specialites WHERE slug = 'ferronnier')
);

-- Catégorie : Services
INSERT INTO artisans (nom, metier, note, ville, description, email, site_web, en_vedette, categorie_id, specialite_id) VALUES
(
  'Royden Charbonneau', 'Coiffeur', 3.8, 'Saint-Priest',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Coiffeur mixte proposant coupes tendance, colorations végétales et soins capillaires personnalisés dans un salon chaleureux.',
  'r.charbonneau@gmail.com', NULL, 0,
  (SELECT id FROM categories  WHERE slug = 'services'),
  (SELECT id FROM specialites WHERE slug = 'coiffeur')
),
(
  'Leala Dennis', 'Coiffeuse', 3.8, 'Chambéry',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Coiffeuse spécialisée en techniques de coloration naturelle et coiffures de mariées. Prise de rendez-vous en ligne disponible.',
  'l.dennos@gmail.com', 'https://coiffure-leala-chambery.fr', 0,
  (SELECT id FROM categories  WHERE slug = 'services'),
  (SELECT id FROM specialites WHERE slug = 'coiffeur')
),
(
  'C''est Sup''Hair', 'Coiffeur', 4.1, 'Romans-sur-Isère',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Salon de coiffure moderne proposant coupes hommes et femmes, balayages et soins kératine. Équipe dynamique et passionnée.',
  'sup-hair@gmail.com', 'https://sup-hair.fr', 0,
  (SELECT id FROM categories  WHERE slug = 'services'),
  (SELECT id FROM specialites WHERE slug = 'coiffeur')
),
(
  'Le Monde des Fleurs', 'Fleuriste', 4.6, 'Annonay',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Fleuriste artisan créateur de bouquets sur mesure pour mariages, événements et décoration d''intérieur. Livraison à domicile disponible.',
  'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0,
  (SELECT id FROM categories  WHERE slug = 'services'),
  (SELECT id FROM specialites WHERE slug = 'fleuriste')
),
(
  'Valérie Laderoute', 'Toiletteuse', 4.5, 'Valence',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Toiletteuse professionnelle pour chiens et chats. Bain, coupe, soin et épilation dans un cadre calme et rassurant pour votre animal.',
  'v-laderoute@gmail.com', NULL, 0,
  (SELECT id FROM categories  WHERE slug = 'services'),
  (SELECT id FROM specialites WHERE slug = 'toiletteur')
),
(
  'CM Graphisme', 'Webdesigner', 4.4, 'Valence',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend mauris vel efficitur commodo. Studio de création graphique et web. Logos, identités visuelles, sites internet et supports de communication pour artisans et PME.',
  'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0,
  (SELECT id FROM categories  WHERE slug = 'services'),
  (SELECT id FROM specialites WHERE slug = 'webdesigner')
);
