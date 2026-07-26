# Trouve ton artisan — Région Auvergne-Rhône-Alpes

> Plateforme de mise en relation entre particuliers et artisans qualifiés de la région Auvergne-Rhône-Alpes.

---

## Présentation

**Trouve ton artisan** est une application web Full Stack permettant aux particuliers de :

- Parcourir les artisans par catégorie (Alimentation, Bâtiment, Fabrication, Services)
- Rechercher un artisan par nom, métier ou ville
- Consulter la fiche détaillée d'un artisan
- Contacter un artisan via un formulaire sécurisé

Un **espace d'administration** protégé permet de gérer l'ensemble du contenu : artisans, catégories, spécialités et messages reçus.

---

## Stack technique

| Couche | Technologies |
|--------|-------------|
| **Frontend** | React 18, React Router 6, Bootstrap 5, Sass/SCSS, Axios |
| **Backend** | Node.js 18, Express 4, Sequelize 6 |
| **Base de données** | MySQL 8 / MariaDB 10.6 |
| **Authentification** | JWT (espace admin), clé API (routes publiques) |
| **Sécurité** | Helmet, CORS, Rate Limiting, XSS Clean, HPP, express-validator |
| **Email** | Nodemailer (SMTP Gmail) |

---

## Prérequis

- [Node.js ≥ 18.x](https://nodejs.org) (inclut npm)
- [XAMPP](https://www.apachefriends.org) ou tout serveur MySQL 8 / MariaDB 10.6+
- Git

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE-COMPTE/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données

Démarrer MySQL (via XAMPP ou autre), puis créer la base et importer les données :

```sql
-- Dans phpMyAdmin ou MySQL Workbench :
CREATE DATABASE trouve_ton_artisan CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

> Les tables et les données sont créées **automatiquement** au premier démarrage du backend grâce à Sequelize (`sync`) et au script de seed.

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env
# Éditer .env avec vos identifiants MySQL et vos clés secrètes
npm run dev
```

### 4. Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# Vérifier que VITE_API_KEY correspond à API_KEY dans backend/.env
npm run dev
```

---

## Démarrage rapide (Windows)

```powershell
# Démarrer XAMPP (MySQL), puis lancer :
.\start.ps1
```

---

## Accès à l'application

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Site public |
| `http://localhost:5173/admin` | Espace administration |
| `http://localhost:5000/api/health` | Santé de l'API |

### Compte administrateur par défaut

Un compte administrateur est créé automatiquement au premier démarrage.  
Les identifiants sont définis dans `backend/seed.js`.

---

## Variables d'environnement

### `backend/.env` (à créer depuis `.env.example`)

```env
PORT=5000
NODE_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mot_de_passe

API_KEY=votre-cle-api-secrete
JWT_SECRET=votre-secret-jwt

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=votre@email.com
MAIL_PASS=votre-mot-de-passe-application
MAIL_RECIPIENT=votre@email.com

FRONTEND_URL=http://localhost:5173
```

### `frontend/.env` (à créer depuis `.env.example`)

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_KEY=votre-cle-api-secrete
```

> `API_KEY` (backend) et `VITE_API_KEY` (frontend) doivent être identiques.

---

## Routes API

### Publiques (header `x-api-key` requis)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/health` | Santé de l'API |
| GET | `/api/categories` | Liste des catégories |
| GET | `/api/categories/:slug` | Catégorie par slug |
| GET | `/api/artisans` | Liste des artisans (filtres, pagination) |
| GET | `/api/artisans/vedette` | Artisans mis en avant |
| GET | `/api/artisans/:id` | Fiche détaillée d'un artisan |
| POST | `/api/contact` | Envoi d'un message de contact |

### Administration (JWT requis)

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/login` | Connexion administrateur |
| GET | `/api/admin/stats` | Statistiques du tableau de bord |
| GET · POST · PUT · DELETE | `/api/admin/artisans` | Gestion des artisans |
| GET · POST · PUT · DELETE | `/api/admin/categories` | Gestion des catégories |
| GET · POST · PUT · DELETE | `/api/admin/specialites` | Gestion des spécialités |
| GET · PATCH · DELETE | `/api/admin/messages` | Gestion des messages |

---

## Mesures de sécurité

| Mesure | Outil | Rôle |
|--------|-------|------|
| En-têtes HTTP sécurisés | `helmet` | Prévention XSS, clickjacking, sniffing MIME |
| Authentification API | Clé API (middleware custom) | Restreint l'accès aux routes publiques |
| Authentification admin | JWT | Sessions sécurisées pour l'espace admin |
| CORS restreint | `cors` | Autorise uniquement l'origine du frontend |
| Limitation de débit | `express-rate-limit` | 100 req/15 min, 5 contacts/heure |
| Nettoyage XSS | `xss-clean` | Supprime les balises malveillantes du corps |
| Prévention HPP | `hpp` | Empêche la pollution des paramètres HTTP |
| Validation des entrées | `express-validator` | Validation et sanitisation de chaque champ |
| Requêtes préparées | Sequelize ORM | Protection contre les injections SQL |
| Comparaison timing-safe | `crypto.timingSafeEqual` | Protection contre les attaques temporelles |

---

## Structure du projet

```
Trouve_Ton_Artisan/
├── backend/
│   ├── config/
│   │   └── database.js          # Connexion MySQL via Sequelize
│   ├── controllers/
│   │   ├── adminController.js   # CRUD admin
│   │   ├── artisanController.js # Routes publiques artisans
│   │   ├── authController.js    # Authentification JWT
│   │   └── contactController.js # Formulaire de contact
│   ├── middleware/
│   │   ├── auth.js              # Vérification JWT
│   │   └── errorHandler.js      # Gestionnaire d'erreurs global
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Artisan.js
│   │   ├── Categorie.js
│   │   ├── Message.js
│   │   ├── Specialite.js
│   │   └── index.js             # Associations Sequelize
│   ├── routes/
│   │   ├── admin.js
│   │   ├── artisans.js
│   │   ├── auth.js
│   │   ├── categories.js
│   │   └── contact.js
│   ├── .env.example
│   ├── app.js                   # Configuration Express
│   ├── seed.js                  # Données initiales
│   └── server.js                # Point d'entrée
├── frontend/
│   ├── public/                  # Assets statiques
│   └── src/
│       ├── components/          # Header, Footer, ArtisanCard, CategoryCard, SearchBar
│       ├── context/             # AuthContext (gestion JWT côté client)
│       ├── pages/
│       │   ├── Admin/           # Dashboard, Artisans, Catégories, Spécialités, Messages
│       │   ├── ArtisanDetail/
│       │   ├── ArtisanList/
│       │   ├── Home/
│       │   ├── Legal/           # Mentions légales, RGPD, Accessibilité, Cookies
│       │   └── NotFound/
│       ├── services/
│       │   ├── api.js           # Appels API publics
│       │   └── adminApi.js      # Appels API administration
│       └── styles/              # Variables SCSS, styles globaux
├── database/
│   ├── MCD.md                   # Modèle Conceptuel de Données
│   └── MLD.md                   # Modèle Logique de Données
├── start.ps1                    # Script de démarrage Windows
└── README.md
```

---

## Déploiement

| Service | Usage |
|---------|-------|
| **Railway** | Backend Node.js + MySQL |
| **PlanetScale** | Base de données MySQL managée |
| **Vercel** / **Netlify** | Frontend React (build statique) |
| **Render** | Alternative gratuite pour le backend |

```bash
# Build de production (frontend)
cd frontend && npm run build
# → Le dossier dist/ est prêt à déployer
```

---

*Projet réalisé dans le cadre du parcours Développeur Web — Région Auvergne-Rhône-Alpes.*
