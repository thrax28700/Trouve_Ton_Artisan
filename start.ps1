# ============================================================
# Trouve Ton Artisan — Script de démarrage local
# Prérequis : Node.js >= 18  |  XAMPP (MySQL démarré)
# Usage     : .\start.ps1
# ============================================================

$root = $PSScriptRoot

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Trouve Ton Artisan — Demarrage local    " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERREUR] Node.js n'est pas installe." -ForegroundColor Red
    Write-Host "         Telecharge-le sur https://nodejs.org (LTS)" -ForegroundColor Yellow
    Read-Host "Appuie sur Entree pour quitter"
    exit 1
}
$nodeVersion = node --version
Write-Host "[OK] Node.js $nodeVersion detecte." -ForegroundColor Green

# Rappel XAMPP
Write-Host ""
Write-Host "[INFO] Assurez-vous que MySQL est demarré dans XAMPP." -ForegroundColor Yellow
Write-Host "       La base 'trouve_ton_artisan' doit exister." -ForegroundColor Yellow
Write-Host ""

# Installer les dépendances si node_modules manquant
function Install-Deps($folder) {
    if (-not (Test-Path "$root\$folder\node_modules")) {
        Write-Host "[...] Installation des dependances $folder ..." -ForegroundColor Yellow
        Push-Location "$root\$folder"
        npm install
        Pop-Location
    } else {
        Write-Host "[OK] Dependances $folder deja installees." -ForegroundColor Green
    }
}

Install-Deps "backend"
Install-Deps "frontend"

if (-not (Test-Path "$root\node_modules")) {
    Write-Host "[...] Installation de concurrently (racine)..." -ForegroundColor Yellow
    Push-Location $root
    npm install
    Pop-Location
} else {
    Write-Host "[OK] Dependances racine deja installees." -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Acces a l'application                    " -ForegroundColor Cyan
Write-Host "--------------------------------------------" -ForegroundColor Cyan
Write-Host "  Site       : http://localhost:5173        " -ForegroundColor White
Write-Host "  Admin      : http://localhost:5173/admin  " -ForegroundColor White
Write-Host "  API health : http://localhost:5000/api/health" -ForegroundColor White
Write-Host "  Arret      : Ctrl+C                       " -ForegroundColor White
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Push-Location $root
npm run dev
