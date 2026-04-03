# POWER_WEBDASHBOARD.md

## Power CEO Web-Dashboard starten

```powershell
cd C:\Users\lechd\OneDrive\Dokumente\GitHub\power\dashboard
node .\server.js
```

Dann im Browser öffnen:
- http://localhost:4177

## Was zeigt die Seite?
- Agent aktiv/inaktiv
- Letzte Agentenläufe (Arbeitsgang)
- Projektstatus, TODOs, Roadmap live aus den Markdown-Dateien

## Aktivitätsquelle
Der Cron-Loop schreibt in `POWER_AGENT_ACTIVITY.md`.

## Update 2026-03-12 (Professional Layout)
- KPI-Karten fuer offene/erledigte Aufgaben + Fortschrittsquote.
- Grafische ToDo-Darstellung (Offen vs. Erledigt) und getrennte Listen.
- Live-Bereich "Werdegang/Arbeitsgang" fuer die letzten Agentenlaeufe.
- Abschnitt "Dokumente zum Nachlesen" mit direkten Links auf referenzierte `.md`-Dateien.

### Dokumente direkt im Browser oeffnen
- Route: `http://localhost:4177/docs/<DATEI>.md`
- Beispiel: `http://localhost:4177/docs/PROJECT_STATUS.md`
