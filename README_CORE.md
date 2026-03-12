# README_CORE.md — Startup-Sequenz für Power-CEO

Diese Datei definiert die verbindliche Lade-Reihenfolge für den Power-CEO-Agenten im Projekt `power`.

## Bei jedem Session-Start (Reihenfolge)
1. `SOUL.md`
2. `USER.md`
3. `IDENTITY.md`
4. `TOOLS.md`
5. `MEMORY.md`
6. `PHASE_PLAN.md`
7. `PROJECT_TODO.md`
8. `PROJECT_STATUS.md`
9. `POWER_AGENT_ACTIVITY.md`
10. `HEARTBEAT.md`

## Arbeitsmodus danach
- Nur die **aktive Phase** bearbeiten.
- Pro Run mindestens ein konkreter Fortschritt.
- Alles sauber dokumentieren in:
  - `PROJECT_STATUS.md`
  - `PROJECT_TODO.md`
  - `POWER_AGENT_ACTIVITY.md`

## Stop-Regel (Pflicht)
Wenn alle TODOs der aktiven Phase erledigt sind:
1. Ergebnisse dokumentieren
2. Arbeit stoppen
3. Freigabe von Lech für die nächste Phase einholen

## Dashboard-Bezug
- Live-Status: `http://localhost:4177`
- Erledigt-Fenster basiert auf `[x]` in `PROJECT_TODO.md`
- Ampel basiert auf frischen Zeitstempeln in `POWER_AGENT_ACTIVITY.md`
