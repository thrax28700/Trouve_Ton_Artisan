# Trouve ton artisan — Région Auvergne-Rhône-Alpes

> Plateforme de mise en relation entre particuliers et artisans qualifiés de la région Auvergne-Rhône-Alpes.

---

## Présentation

**Trouve ton artisan** est une application web Full Stack permettant aux particuliers de :
- Parcourir les artisans par catégorie (Alimentation, Bâtiment, Fabrication, Services)
- Rechercher par nom, métier ou ville
- Consulter la fiche détaillée d'un artisan
- Contacter un artisan via un formulaire sécurisé

---

## Stack technique

| Côté          | Technologies |
|---------------|-------------|
| **Frontend**  | React 18, React Router 6, Bootstrap 5, Sass, Axios |
| **Backend**   | Node.js, Express 4, Sequelize 6, MySQL/MariaDB |
| **Sécurité**  | Helmet, CORS, Rate limiting, XSS Clean, HPP, express-validator, clé API |
| **Email**     | Nodemailer (SMTP) |

---

## Prérequis

- Node.js ≥ 18.x
- npm ≥ 9.x
- MySQL 8.x ou MariaDB 10.6+
- Git

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE-COMPTE/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données

```bash
# Connexion à MySQL
mysql -u root -p

# Création et remplissage
source database/create.sql
source database/insert.sql
```

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec vos paramètres (BDD, email, clé API)
npm run dev
```

### 4. Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# Éditer .env : VITE_API_KEY doit correspondre à API_KEY dans backend/.env
npm run dev
```

---

## Variables d'environnement

### `backend/.env`
```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mot_de_passe

API_KEY=votre-cle-api-secrete

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=votre@email.com
MAIL_PASS=votre-mot-de-passe-app
MAIL_RECIPIENT=votre@email.com

FRONTEND_URL=http://localhost:5173
```

### `frontend/.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=votre-cle-api-secrete
```

---

## Lancement

```bash
# Terminal 1 — Backend
cd backend && npm run dev
# → http://localhost:5000

# Terminal 2 — Frontend
cd frontend && npm run dev
# → http://localhost:5173
```

---

## Routes API

| Méthode | Route                  | Description                    |
|---------|------------------------|--------------------------------|
| GET     | `/api/health`          | Santé de l'API                 |
| GET     | `/api/categories`      | Liste des catégories           |
| GET     | `/api/categories/:slug`| Catégorie par slug             |
| GET     | `/api/artisans`        | Liste artisans (filtres + pagination) |
| GET     | `/api/artisans/vedette`| Artisans en vedette            |
| GET     | `/api/artisans/:id`    | Fiche artisan                  |
| POST    | `/api/contact`         | Envoi d'un message de contact  |

> Toutes les routes nécessitent le header `x-api-key: VOTRE_CLE`.

---

## Sécurité

| Mesure | Outil | Intérêt |
|--------|-------|---------|
| En-têtes HTTP sécurisés | `helmet` | Protection XSS, clickjacking, sniffing |
| Clé API | Middleware custom | Accès API restreint au frontend autorisé |
| CORS restreint | `cors` | Requêtes uniquement depuis l'URL du frontend |
| Rate limiting | `express-rate-limit` | Limite 100 req/15min (5/h pour le contact) |
| Nettoyage XSS | `xss-clean` | Supprime les balises malveillantes du body |
| Anti-pollution params | `hpp` | Empêche la pollution des paramètres HTTP |
| Validation des entrées | `express-validator` | Validation + sanitisation de chaque champ |
| ORM sécurisé | `sequelize` | Requêtes préparées → protège des injections SQL |
| Comparaison timing-safe | `crypto.timingSafeEqual` | Protection timing attacks sur la clé API |
| HTTPS (production) | Hébergeur | Chiffrement des données en transit |

---

## Scripts SQL

```bash
# Création
mysql -u root -p < database/create.sql

# Insertion du jeu de données
mysql -u root -p < database/insert.sql
```

---

## Déploiement

| Service | Usage recommandé |
|---------|-----------------|
| **Railway** | Backend Node.js + MySQL |
| **Vercel** ou **Netlify** | Frontend React (build statique) |
| **Render** | Alternative backend gratuite |

```bash
# Build frontend pour production
cd frontend && npm run build
# Le dossier dist/ est prêt à déployer
```

---

## Structure du projet

```
Trouve_Ton_Artisan/
├── backend/
│   ├── config/database.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/   (Header, Footer, ArtisanCard, CategoryCard, SearchBar, StarRating)
│   │   ├── pages/        (Home, ArtisanList, ArtisanDetail, NotFound)
│   │   ├── services/     (api.js)
│   │   └── styles/       (_variables.scss, _base.scss, main.scss)
│   └── index.html
├── database/
│   ├── create.sql
│   ├── insert.sql
│   ├── MCD.md
│   └── MLD.md
├── .gitignore
└── README.md
```

---

## Liens

- **Site en ligne** : *(à compléter après déploiement)*
- **Dépôt GitHub** : *(à compléter après création du repo)*
- **Dossier PDF** : *(à compléter)*

---

*Projet réalisé dans le cadre du parcours Développeur Web — Région Auvergne-Rhône-Alpes.*
