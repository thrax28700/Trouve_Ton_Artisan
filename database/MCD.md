# MCD — Modèle Conceptuel de Données
## Trouve ton artisan — Région Auvergne-Rhône-Alpes

---

## Entités et attributs

### CATEGORIE
| Attribut | Type        | Contrainte                |
|----------|-------------|----------------------------|
| **id**   | Entier      | Identifiant, clé primaire  |
| nom      | Chaîne(100) | Obligatoire, unique        |
| slug     | Chaîne(100) | Obligatoire, unique        |
| icone    | Chaîne(60)  | Optionnel                  |

### SPECIALITE
| Attribut | Type        | Contrainte                |
|----------|-------------|----------------------------|
| **id**   | Entier      | Identifiant, clé primaire  |
| nom      | Chaîne(100) | Obligatoire                |
| slug     | Chaîne(100) | Obligatoire, unique        |

### ARTISAN
| Attribut    | Type          | Contrainte                 |
|-------------|---------------|------------------------------|
| **id**      | Entier        | Identifiant, clé primaire    |
| nom         | Chaîne(150)   | Obligatoire                  |
| metier      | Chaîne(100)   | Obligatoire                  |
| note        | Décimal(2,1)  | Obligatoire, entre 0 et 5    |
| ville       | Chaîne(100)   | Obligatoire                  |
| description | Texte long    | Optionnel                    |
| email       | Chaîne(150)   | Obligatoire, format email    |
| site_web    | Chaîne(255)   | Optionnel, format URL        |
| en_vedette  | Booléen       | Défaut : faux                |
| created_at  | Date/heure    | Automatique                  |
| updated_at  | Date/heure    | Automatique                  |

### MESSAGE
| Attribut    | Type        | Contrainte                          |
|-------------|-------------|---------------------------------------|
| **id**      | Entier      | Identifiant, clé primaire             |
| nom         | Chaîne(100) | Obligatoire (nom de l'expéditeur)     |
| email       | Chaîne(150) | Obligatoire, format email             |
| objet       | Chaîne(200) | Obligatoire                           |
| message     | Texte long  | Obligatoire                           |
| artisan_nom | Chaîne(150) | Optionnel — copie du nom de l'artisan |
| lu          | Booléen     | Défaut : faux                         |
| created_at  | Date/heure  | Automatique                           |

### ADMIN
| Attribut   | Type        | Contrainte                |
|------------|-------------|----------------------------|
| **id**     | Entier      | Identifiant, clé primaire  |
| email      | Chaîne(150) | Obligatoire, unique        |
| password   | Chaîne(255) | Obligatoire (haché bcrypt) |
| created_at | Date/heure  | Automatique                |
| updated_at | Date/heure  | Automatique                |

---

## Associations

```
CATEGORIE ----< POSSEDE >---- SPECIALITE
   1..1                          0..N

SPECIALITE ----< CONCERNE >---- ARTISAN
   0..1 *                        0..N

CATEGORIE ----< CLASSE >---- ARTISAN
   1..1                        0..N

ARTISAN ----< RECOIT >---- MESSAGE
   0..1 **                     0..N
```

**POSSEDE**
- Une CATEGORIE regroupe **0 à N** spécialités.
- Une SPECIALITE est rattachée à **exactement 1** catégorie.
- Cardinalités : (1,1) côté SPECIALITE — (0,N) côté CATEGORIE.

**CONCERNE**
- Une SPECIALITE regroupe **0 à N** artisans.
- Un ARTISAN relève d'**au plus une** spécialité (règle métier : *« un artisan apparaît dans une seule spécialité »*).
- \* Cardinalité (0,1) côté ARTISAN dans le schéma physique : la clé étrangère est nullable pour permettre `ON DELETE SET NULL` (un artisan n'est pas supprimé si sa spécialité l'est).

**CLASSE**
- Une CATEGORIE regroupe **0 à N** artisans.
- Un ARTISAN appartient à **exactement 1** catégorie (redondance volontaire avec `SPECIALITE → CATEGORIE`, conservée pour simplifier les filtres et requêtes côté API).
- Cardinalités : (1,1) côté ARTISAN — (0,N) côté CATEGORIE.

**RECOIT**
- Un ARTISAN peut recevoir **0 à N** messages de contact.
- Un MESSAGE concerne **au plus un** artisan.
- \*\* Le lien `MESSAGE → ARTISAN` n'est pas contraint par une clé étrangère stricte : le nom de l'artisan est dupliqué (`artisan_nom`) dans MESSAGE afin de conserver l'historique des échanges même si l'artisan est supprimé par la suite.

**ADMIN** est une entité autonome, sans association avec les autres entités : elle sert uniquement à l'authentification de l'espace de gestion.

---

## Schéma MCD textuel

```
┌─────────────────┐        ┌──────────────────────┐        ┌────────────────────────────────┐
│    CATEGORIE     │        │      SPECIALITE      │        │             ARTISAN             │
├─────────────────┤        ├──────────────────────┤        ├────────────────────────────────┤
│ # id             │ 1   N  │ # id                 │ 0   N  │ # id                            │
│   nom            ├────────┤   nom                ├────────┤   nom                           │
│   slug           │        │   slug               │        │   metier                        │
│   icone          │        └──────────────────────┘        │   note                          │
└────────┬─────────┘                                        │   ville                         │
         │ 1                                                 │   description                   │
         │                                                    │   email                         │
         │ N                                                  │   site_web                      │
         └───────────────────────────────────────────────────┤   en_vedette                    │
                                                               │   created_at                    │
                                                               │   updated_at                    │
                                                               └────────────────┬─────────────────┘
                                                                                │ 1
                                                                                │
                                                                                │ N
                                                               ┌────────────────┴─────────────────┐
                                                               │              MESSAGE              │
                                                               ├───────────────────────────────────┤
                                                               │ # id                               │
                                                               │   nom                              │
                                                               │   email                            │
                                                               │   objet                            │
                                                               │   message                          │
                                                               │   artisan_nom                      │
                                                               │   lu                               │
                                                               │   created_at                       │
                                                               └───────────────────────────────────┘

┌─────────────────────────┐
│          ADMIN          │   (entité indépendante — authentification back-office)
├─────────────────────────┤
│ # id                     │
│   email                  │
│   password               │
│   created_at             │
│   updated_at             │
└─────────────────────────┘
```
