# Setup Guide - Power Energy

## Voraussetzungen
- Node.js 24+
- Docker Desktop
- PostgreSQL 16+
- Redis 7+

## Installation

### 1. Repository klonen
```bash
git clone https://github.com/power-energy/power.git
cd power
```

### 2. Abhängigkeiten installieren
```bash
pnpm install
```

### 3. Umgebung konfigurieren
```bash
cp .env.example .env
# .env bearbeiten mit deinen Werten
```

### 4. Entwicklung starten
```bash
pnpm dev
```

## Verfügbare Befehle

| Befehl | Beschreibung |
|--------|---------------|
| pnpm dev | Alle Apps starten |
| pnpm build | Alle Apps bauen |
| pnpm test | Tests ausführen |
| pnpm lint | Code prüfen |

## Support
- Discord: discord.gg/power-energy
- Email: support@power.energy
