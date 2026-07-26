# Documentation de Sécurité — Trouve ton artisan

> Région Auvergne-Rhône-Alpes — Renaud VAILLANT

---

## 1. Architecture de sécurité

### Séparation Frontend / Backend

L'application est architecturée en deux couches distinctes :

- **Frontend** (React/Vite) : application statique servie sur le port 5173 en développement. Ne contient aucune logique métier sensible, aucun secret, aucune donnée d'authentification.
- **Backend** (Express/Node.js) : API REST privée exposée sur le port 5000. Toutes les opérations sur la base de données passent exclusivement par ce serveur.

La base de données n'est **jamais** accessible directement depuis le frontend.

---

## 2. Mesures de sécurité en place

### 2.1 Authentification par clé API

Chaque requête vers l'API doit inclure l'en-tête :

```
X-API-Key: <valeur de API_KEY dans .env>
```

Le middleware `backend/middleware/apiKey.js` vérifie cette clé (comparaison en temps constant via `crypto.timingSafeEqual`) et retourne `401 Unauthorized` si elle est absente ou incorrecte. Il est appliqué à toutes les routes publiques (`/api/artisans`, `/api/categories`, `/api/contact`).

L'authentification de l'espace d'administration repose sur un mécanisme distinct : un JWT vérifié par `backend/middleware/auth.js`, appliqué aux routes `/api/admin/*`.

**Règles impératives :**
- La clé API doit être une chaîne aléatoire d'au moins 32 caractères en production
- Elle ne doit jamais être commitée dans le dépôt Git (fichier `.env` dans `.gitignore`)
- Elle doit être renouvelée régulièrement en production

### 2.2 Limitation du débit (Rate Limiting)

Middleware : `express-rate-limit`

| Environnement | Limite           |
|---------------|------------------|
| Développement | 2 000 req/15 min |
| Production    | 100 req/15 min   |

En cas de dépassement, l'API répond `429 Too Many Requests` avec le message `Trop de requêtes. Réessayez dans 15 minutes.`

### 2.3 En-têtes HTTP sécurisés (Helmet)

Le middleware `helmet` ajoute automatiquement les en-têtes de sécurité :

| En-tête                        | Rôle                                              |
|-------------------------------|---------------------------------------------------|
| `Content-Security-Policy`     | Restreint les sources de contenu autorisées       |
| `X-Frame-Options: DENY`       | Protège contre le clickjacking                    |
| `X-Content-Type-Options: nosniff` | Empêche le MIME sniffing                     |
| `Strict-Transport-Security`   | Force HTTPS (en production)                       |
| `Referrer-Policy`             | Contrôle les informations envoyées au référent    |

### 2.4 Protection contre les injections XSS

Middleware : `xss-clean`

Toutes les données entrantes (body, query, params) sont automatiquement nettoyées pour supprimer les balises et scripts malveillants avant traitement.

### 2.5 Protection contre la pollution des paramètres HTTP (HPP)

Middleware : `hpp`

Empêche les attaques par duplication de paramètres dans les query strings (ex : `?categorie=foo&categorie=bar`).

### 2.6 CORS (Cross-Origin Resource Sharing)

La liste des origines autorisées est définie dans `backend/app.js` via la variable `FRONTEND_URL` :

```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:4173'
];
```

En production, `FRONTEND_URL` doit pointer vers le domaine réel du site. Toute requête d'une origine non listée est rejetée avec une erreur `403`.

### 2.7 Protection contre les injections SQL

L'ORM Sequelize utilise des **requêtes paramétrées** pour toutes les interactions avec la base de données. Aucune interpolation directe de chaînes SQL n'est présente dans le code.

### 2.8 Validation des entrées côté serveur

Middleware : `express-validator`

Les champs du formulaire de contact (`backend/routes/contact.js`) sont validés et échappés (`.escape()`) :

| Champ        | Règle de validation                              |
|--------------|---------------------------------------------------|
| `nom`        | Non vide, 2 à 100 caractères                       |
| `email`      | Format email valide, normalisé, max 150 caractères |
| `objet`      | Non vide, 2 à 200 caractères                       |
| `message`    | Non vide, 10 à 1000 caractères                     |
| `artisan_id` | Entier positif                                     |

Un rate-limit dédié restreint le formulaire à 5 envois par heure et par IP.

### 2.9 Masquage des données sensibles

Le champ `email` des artisans est **exclu** de toutes les réponses API (liste et fiche) via Sequelize `attributes: { exclude: ['email'] }`. L'email n'est utilisé que côté serveur pour l'envoi de formulaire de contact.

---

## 3. Variables d'environnement

Le fichier `.env` contient les secrets de l'application. Il ne doit **jamais** être versionné.

| Variable       | Rôle                          | Valeur de production recommandée          |
|----------------|-------------------------------|-------------------------------------------|
| `DB_HOST`      | Hôte MySQL                    | Adresse du serveur de base de données     |
| `DB_PORT`      | Port MySQL                    | `3306`                                    |
| `DB_USER`      | Utilisateur MySQL             | Compte dédié avec droits limités          |
| `DB_PASSWORD`  | Mot de passe MySQL            | Mot de passe fort (≥ 20 caractères)       |
| `DB_NAME`      | Nom de la base de données     | `trouve_ton_artisan`                      |
| `API_KEY`      | Clé d'authentification API    | Chaîne aléatoire ≥ 32 caractères          |
| `PORT`         | Port d'écoute du serveur      | `5000` (ou via proxy inverse)             |
| `SMTP_HOST`    | Hôte SMTP pour les emails     | Serveur mail de production                |
| `SMTP_PORT`    | Port SMTP                     | `587` (STARTTLS) ou `465` (SSL)           |
| `SMTP_USER`    | Identifiant SMTP              | Compte email dédié                        |
| `SMTP_PASS`    | Mot de passe SMTP             | Mot de passe fort                         |

---

## 4. Checklist de mise en production

Avant tout déploiement en environnement de production :

- [ ] Changer `API_KEY` par une valeur aléatoire forte (ex: `openssl rand -hex 32`)
- [ ] Définir un mot de passe MySQL fort et créer un utilisateur dédié (pas `root`)
- [ ] Mettre à jour `NODE_ENV=production` dans `.env`
- [ ] Configurer CORS avec le domaine de production uniquement
- [ ] Activer HTTPS (certificat SSL/TLS via Let's Encrypt ou équivalent)
- [ ] Configurer un proxy inverse (Nginx ou Apache) devant Node.js
- [ ] Vérifier que le fichier `.env` n'est pas accessible publiquement
- [ ] Activer les logs d'accès et d'erreur en production
- [ ] Mettre en place des sauvegardes automatiques de la base de données
- [ ] Vérifier l'absence de `console.log` contenant des données sensibles

---

## 5. Vulnérabilités non couvertes (hors périmètre)

Les éléments suivants sont intentionnellement hors périmètre pour cette version (application locale/pédagogique) :

- Authentification utilisateur (pas de compte, pas de session)
- Chiffrement des données au repos (MySQL sans TDE)
- Audit de sécurité tiers (pentest)
- WAF (Web Application Firewall)

---

## 6. Dépendances de sécurité

| Package           | Version | Rôle                          |
|-------------------|---------|-------------------------------|
| `helmet`          | ^7.x    | En-têtes HTTP sécurisés       |
| `cors`            | ^2.x    | Contrôle d'origine            |
| `express-rate-limit` | ^7.x | Limitation de débit          |
| `xss-clean`       | ^0.x    | Nettoyage XSS des entrées     |
| `hpp`             | ^0.x    | Protection pollution HTTP     |
| `express-validator` | ^7.x  | Validation des formulaires    |

Pour vérifier les vulnérabilités connues dans les dépendances :

```bash
cd backend
npm audit

cd frontend
npm audit
```

**Audit réalisé le 26/07/2026** (`npm audit` côté backend) : 8 vulnérabilités détectées.

| Dépendance | Sévérité | Action |
|---|---|---|
| `body-parser`, `brace-expansion`, `morgan`, `qs` | Modérée à haute | Corrigées via `npm audit fix` (mise à jour non-cassante) |
| `nodemailer` (6.10.1 → 9.0.3) | Haute (7 CVE : injection SMTP, CRLF, SSRF) | Mise à jour manuelle vers la dernière version, testée sans régression |
| `uuid` (transitive via `sequelize`) | Modérée | Non corrigée — `npm audit fix --force` proposait de rétrograder `sequelize` en v3 (obsolète), ce qui aurait cassé tout l'ORM. La faille exige qu'un buffer soit fourni explicitement à une fonction `uuid`, ce que le code ne fait jamais : risque résiduel jugé nul. À réévaluer à la prochaine montée de version de Sequelize. |

La dépendance `sqlite3`, présente par erreur dans `package.json` mais jamais utilisée dans le code (le projet interroge exclusivement MySQL, conformément au cahier des charges), a été retirée pour réduire la surface d'attaque.

---

*Document rédigé par Renaud VAILLANT — Projet "Trouve ton artisan" — Région Auvergne-Rhône-Alpes*
