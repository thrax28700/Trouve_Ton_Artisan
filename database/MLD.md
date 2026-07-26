# MLD — Modèle Logique de Données
## Trouve ton artisan — Région Auvergne-Rhône-Alpes

---

## Règles de passage MCD → MLD

- L'association **POSSEDE (1,1 — 0,N)** génère une clé étrangère `categorie_id` dans **SPECIALITES** vers **CATEGORIES**.
- L'association **CONCERNE (0,1 — 0,N)** génère une clé étrangère nullable `specialite_id` dans **ARTISANS** vers **SPECIALITES** (`ON DELETE SET NULL`).
- L'association **CLASSE (1,1 — 0,N)** génère une clé étrangère `categorie_id` dans **ARTISANS** vers **CATEGORIES**.
- L'association **RECOIT (0,1 — 0,N)** est représentée dans **MESSAGES** par `artisan_id` (sans contrainte FK stricte) et `artisan_nom` (copie dénormalisée pour l'historique).
- **ADMIN** reste une table indépendante.

---

## Modèle Logique

```
categories (
  id      INT UNSIGNED  PK  AUTO_INCREMENT,
  nom     VARCHAR(100)  NOT NULL  UNIQUE,
  slug    VARCHAR(100)  NOT NULL  UNIQUE,
  icone   VARCHAR(60)   NULL
)

specialites (
  id           INT UNSIGNED  PK  AUTO_INCREMENT,
  nom          VARCHAR(100)  NOT NULL,
  slug         VARCHAR(100)  NOT NULL  UNIQUE,
  categorie_id INT UNSIGNED  NOT NULL  FK → categories(id)  ON DELETE RESTRICT
)

artisans (
  id            INT UNSIGNED  PK  AUTO_INCREMENT,
  nom           VARCHAR(150)  NOT NULL,
  metier        VARCHAR(100)  NOT NULL,
  note          DECIMAL(2,1)  NOT NULL  CHECK (note BETWEEN 0 AND 5),
  ville         VARCHAR(100)  NOT NULL,
  description   TEXT          NULL,
  email         VARCHAR(150)  NOT NULL,
  site_web      VARCHAR(255)  NULL,
  en_vedette    TINYINT(1)    NOT NULL  DEFAULT 0,
  categorie_id  INT UNSIGNED  NOT NULL  FK → categories(id)   ON DELETE RESTRICT,
  specialite_id INT UNSIGNED  NULL      FK → specialites(id)  ON DELETE SET NULL,
  created_at    DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

messages (
  id          INT UNSIGNED  PK  AUTO_INCREMENT,
  nom         VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  objet       VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  artisan_id  INT UNSIGNED  NULL,           -- pas de contrainte FK (historique conservé)
  artisan_nom VARCHAR(150)  NULL,           -- copie dénormalisée du nom de l'artisan
  lu          TINYINT(1)    NOT NULL  DEFAULT 0,
  created_at  DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP
)

admins (
  id         INT UNSIGNED  PK  AUTO_INCREMENT,
  email      VARCHAR(150)  NOT NULL  UNIQUE,
  password   VARCHAR(255)  NOT NULL,       -- haché avec bcrypt
  created_at DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

---

## MPD — Modèle Physique de Données (MySQL/MariaDB)

```sql
categories                              specialites
┌───────────────────────────┐          ┌───────────────────────────────────┐
│ PK id      INT UNSIGNED   │          │ PK id            INT UNSIGNED     │
│    nom     VARCHAR(100)   │  1     N │    nom           VARCHAR(100)     │
│    slug    VARCHAR(100)   ├──────────┤    slug          VARCHAR(100)     │
│    icone   VARCHAR(60)    │          │ FK categorie_id  → categories(id) │
│ UK nom, UK slug           │          │ UK slug                           │
└─────────────┬─────────────┘          └───────────────┬───────────────────┘
              │ 1                                       │ 0..N
              │                                         │
              │ N                                       │
┌─────────────┴─────────────────────────────────────────┴───────────────────┐
│                                artisans                                    │
├─────────────────────────────────────────────────────────────────────────-─┤
│ PK id             INT UNSIGNED                                            │
│    nom            VARCHAR(150)  NOT NULL                                  │
│    metier         VARCHAR(100)  NOT NULL                                  │
│    note           DECIMAL(2,1)  NOT NULL   CHECK (0-5)                    │
│    ville          VARCHAR(100)  NOT NULL                                  │
│    description    TEXT                                                    │
│    email          VARCHAR(150)  NOT NULL                                  │
│    site_web       VARCHAR(255)                                            │
│    en_vedette     TINYINT(1)    NOT NULL   DEFAULT 0                      │
│ FK categorie_id   INT UNSIGNED  → categories(id)   ON DELETE RESTRICT     │
│ FK specialite_id  INT UNSIGNED  → specialites(id)  ON DELETE SET NULL     │
│    created_at     DATETIME      NOT NULL                                  │
│    updated_at     DATETIME      NOT NULL                                  │
│ INDEX (categorie_id, specialite_id, note DESC, ville, en_vedette)         │
└──────────────────────────────┬─────────────────────────────────────────--─┘
                                │ 1
                                │
                                │ N
┌───────────────────────────────┴──────────────────────────┐
│                          messages                          │
├────────────────────────────────────────────────────────────┤
│ PK id           INT UNSIGNED                               │
│    nom          VARCHAR(100)  NOT NULL                     │
│    email        VARCHAR(150)  NOT NULL                     │
│    objet        VARCHAR(200)  NOT NULL                     │
│    message      TEXT          NOT NULL                     │
│    artisan_id   INT UNSIGNED  (sans contrainte FK)          │
│    artisan_nom  VARCHAR(150)  (copie dénormalisée)          │
│    lu           TINYINT(1)    NOT NULL  DEFAULT 0           │
│    created_at   DATETIME      NOT NULL                      │
│ INDEX (artisan_id), INDEX (lu)                              │
└──────────────────────────────────────────────────────────┘

admins (table indépendante — authentification back-office)
┌───────────────────────────────────┐
│ PK id          INT UNSIGNED       │
│    email       VARCHAR(150)       │
│    password    VARCHAR(255)       │
│ UK email                          │
│    created_at  DATETIME           │
│    updated_at  DATETIME           │
└───────────────────────────────────┘
```

---

## Données de référence — Catégories

| id | nom          | slug         | icone           |
|----|--------------|--------------|-----------------|
| 1  | Alimentation | alimentation | bi-basket       |
| 2  | Bâtiment     | batiment     | bi-building     |
| 3  | Fabrication  | fabrication  | bi-tools        |
| 4  | Services     | services     | bi-person-badge |

## Données de référence — Spécialités

| nom          | catégorie    | nom          | catégorie   |
|--------------|--------------|--------------|-------------|
| Boucher      | Alimentation | Bijoutier    | Fabrication |
| Boulanger    | Alimentation | Couturier    | Fabrication |
| Chocolatier  | Alimentation | Ferronnier   | Fabrication |
| Traiteur     | Alimentation | Coiffeur     | Services    |
| Chauffagiste | Bâtiment     | Fleuriste    | Services    |
| Électricien  | Bâtiment     | Toiletteur   | Services    |
| Menuisier    | Bâtiment     | Webdesigner  | Services    |
| Plombier     | Bâtiment     |              |             |
