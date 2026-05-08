# MCD — Modèle Conceptuel de Données
## Trouve ton artisan — Région Auvergne-Rhône-Alpes

---

## Entités et attributs

### CATEGORIE
| Attribut | Type        | Contrainte         |
|----------|-------------|--------------------|
| **id**   | Entier      | Identifiant, clé primaire |
| nom      | Chaîne(100) | Obligatoire, unique |
| slug     | Chaîne(100) | Obligatoire, unique |
| icone    | Chaîne(60)  | Optionnel           |

### ARTISAN
| Attribut    | Type          | Contrainte               |
|-------------|---------------|--------------------------|
| **id**      | Entier        | Identifiant, clé primaire |
| nom         | Chaîne(150)   | Obligatoire              |
| metier      | Chaîne(100)   | Obligatoire              |
| note        | Décimal(2,1)  | Obligatoire, entre 0 et 5 |
| ville       | Chaîne(100)   | Obligatoire              |
| description | Texte long    | Optionnel                |
| email       | Chaîne(150)   | Obligatoire, format email |
| site_web    | Chaîne(255)   | Optionnel, format URL    |
| en_vedette  | Booléen       | Défaut : faux            |
| created_at  | Date/heure    | Automatique              |
| updated_at  | Date/heure    | Automatique              |

---

## Association

```
CATEGORIE ----< APPARTIENT >---- ARTISAN
   1..1                            0..N
```

**APPARTIENT**
- Une CATEGORIE peut regrouper de **0 à N** artisans.
- Un ARTISAN appartient à **exactement 1** catégorie.
- Cardinalités : (1,1) côté ARTISAN — (0,N) côté CATEGORIE.

---

## Schéma MCD textuel

```
┌─────────────────────┐        ┌──────────────────────────────┐
│      CATEGORIE      │        │           ARTISAN            │
├─────────────────────┤        ├──────────────────────────────┤
│ # id                │        │ # id                         │
│   nom               │        │   nom                        │
│   slug              │1    N  │   metier                     │
│   icone             ├────────┤   note                       │
└─────────────────────┘        │   ville                      │
                               │   description                │
                               │   email                      │
                               │   site_web                   │
                               │   en_vedette                 │
                               │   created_at                 │
                               │   updated_at                 │
                               └──────────────────────────────┘
```
