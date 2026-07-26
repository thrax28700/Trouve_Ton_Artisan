-- ============================================================
-- Trouve ton artisan — Région Auvergne-Rhône-Alpes
-- Script de création de la base de données
-- Version : 2.0  |  Date : 2026-06-16
-- ============================================================

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- ── Table des catégories ────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id     INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nom    VARCHAR(100)  NOT NULL,
  slug   VARCHAR(100)  NOT NULL,
  icone  VARCHAR(60)   NULL DEFAULT 'bi-tools',
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_nom  (nom),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Table des spécialités ───────────────────────────────────
-- Une spécialité est rattachée à une seule catégorie
CREATE TABLE IF NOT EXISTS specialites (
  id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nom          VARCHAR(100)  NOT NULL,
  slug         VARCHAR(100)  NOT NULL,
  categorie_id INT UNSIGNED  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_specialites_slug (slug),
  CONSTRAINT fk_specialites_categorie
    FOREIGN KEY (categorie_id)
    REFERENCES categories (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Table des artisans ──────────────────────────────────────
-- Un artisan apparaît dans une seule spécialité
CREATE TABLE IF NOT EXISTS artisans (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nom           VARCHAR(150)  NOT NULL,
  metier        VARCHAR(100)  NOT NULL,
  note          DECIMAL(2,1)  NOT NULL DEFAULT 0.0,
  ville         VARCHAR(100)  NOT NULL,
  description   TEXT          NULL,
  email         VARCHAR(150)  NOT NULL,
  site_web      VARCHAR(255)  NULL,
  en_vedette    TINYINT(1)    NOT NULL DEFAULT 0,
  categorie_id  INT UNSIGNED  NOT NULL,
  specialite_id INT UNSIGNED  NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_artisans_categorie  (categorie_id),
  KEY idx_artisans_specialite (specialite_id),
  KEY idx_artisans_note       (note DESC),
  KEY idx_artisans_ville      (ville),
  KEY idx_artisans_vedette    (en_vedette),
  CONSTRAINT fk_artisans_categorie
    FOREIGN KEY (categorie_id)
    REFERENCES categories (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT fk_artisans_specialite
    FOREIGN KEY (specialite_id)
    REFERENCES specialites (id)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT chk_note CHECK (note >= 0 AND note <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Table des messages de contact ───────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nom         VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  objet       VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  artisan_id  INT UNSIGNED  NULL,
  artisan_nom VARCHAR(150)  NULL,
  lu          TINYINT(1)    NOT NULL DEFAULT 0,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_messages_artisan (artisan_id),
  KEY idx_messages_lu      (lu)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Table des administrateurs ───────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  email      VARCHAR(150)  NOT NULL,
  password   VARCHAR(255)  NOT NULL,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
