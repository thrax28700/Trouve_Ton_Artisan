# MLD — Modèle Logique de Données
## Trouve ton artisan — Région Auvergne-Rhône-Alpes

---

## Règles de passage MCD → MLD

L'association **APPARTIENT (1,1 — 0,N)** génère une clé étrangère dans la table **ARTISAN** vers **CATEGORIE**.

---

## Modèle Logique

### Table `categories`
```
categories (
  id      INT UNSIGNED  PK  AUTO_INCREMENT,
  nom     VARCHAR(100)  NOT NULL  UNIQUE,
  slug    VARCHAR(100)  NOT NULL  UNIQUE,
  icone   VARCHAR(60)   NULL
)
```

### Table `artisans`
```
artisans (
  id           INT UNSIGNED  PK  AUTO_INCREMENT,
  nom          VARCHAR(150)  NOT NULL,
  metier       VARCHAR(100)  NOT NULL,
  note         DECIMAL(2,1)  NOT NULL  CHECK (note BETWEEN 0 AND 5),
  ville        VARCHAR(100)  NOT NULL,
  description  TEXT          NULL,
  email        VARCHAR(150)  NOT NULL,
  site_web     VARCHAR(255)  NULL,
  en_vedette   TINYINT(1)    NOT NULL  DEFAULT 0,
  categorie_id INT UNSIGNED  NOT NULL  FK → categories(id),
  created_at   DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME      NOT NULL  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

---

## MPD — Modèle Physique de Données (MySQL/MariaDB)

```sql
categories
┌──────────────────────────────────────────┐
│ PK id           INT UNSIGNED             │
│    nom          VARCHAR(100)  NOT NULL   │
│    slug         VARCHAR(100)  NOT NULL   │
│    icone        VARCHAR(60)              │
│ UK nom, UK slug                          │
└──────────────────────────────────────────┘
            │
            │ 1
            │
            │ N
┌─────────────────────────────────────────────────────┐
│ PK id           INT UNSIGNED                        │
│    nom          VARCHAR(150)  NOT NULL              │
│    metier       VARCHAR(100)  NOT NULL              │
│    note         DECIMAL(2,1)  NOT NULL              │
│    ville        VARCHAR(100)  NOT NULL              │
│    description  TEXT                               │
│    email        VARCHAR(150)  NOT NULL              │
│    site_web     VARCHAR(255)                        │
│    en_vedette   TINYINT(1)    NOT NULL DEFAULT 0   │
│ FK categorie_id INT UNSIGNED → categories(id)       │
│    created_at   DATETIME      NOT NULL              │
│    updated_at   DATETIME      NOT NULL              │
│ INDEX (categorie_id), INDEX (note DESC)             │
│ CHECK note BETWEEN 0 AND 5                         │
└─────────────────────────────────────────────────────┘
```

---

## Données de référence — Catégories

| id | nom          | slug         | icone           |
|----|--------------|--------------|-----------------|
| 1  | Alimentation | alimentation | bi-basket       |
| 2  | Bâtiment     | batiment     | bi-building     |
| 3  | Fabrication  | fabrication  | bi-tools        |
| 4  | Services     | services     | bi-person-badge |
