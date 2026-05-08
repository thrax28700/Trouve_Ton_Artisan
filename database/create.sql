-- ============================================================
-- Trouve ton artisan — Région Auvergne-Rhône-Alpes
-- Script de création de la base de données
-- Version : 1.0  |  Date : 2026-05-08
-- ============================================================

CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
  id     INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  nom    VARCHAR(100)    NOT NULL,
  slug   VARCHAR(100)    NOT NULL,
  icone  VARCHAR(60)     NULL DEFAULT 'bi-tools',
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_nom  (nom),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des artisans
CREATE TABLE IF NOT EXISTS artisans (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  nom          VARCHAR(150)   NOT NULL,
  metier       VARCHAR(100)   NOT NULL,
  note         DECIMAL(2,1)   NOT NULL DEFAULT 0.0,
  ville        VARCHAR(100)   NOT NULL,
  description  TEXT           NULL,
  email        VARCHAR(150)   NOT NULL,
  site_web     VARCHAR(255)   NULL,
  en_vedette   TINYINT(1)     NOT NULL DEFAULT 0,
  categorie_id INT UNSIGNED   NOT NULL,
  created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_artisans_categorie (categorie_id),
  KEY idx_artisans_note      (note DESC),
  KEY idx_artisans_ville     (ville),
  KEY idx_artisans_vedette   (en_vedette),
  CONSTRAINT fk_artisans_categorie
    FOREIGN KEY (categorie_id)
    REFERENCES categories (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT chk_note CHECK (note >= 0 AND note <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
