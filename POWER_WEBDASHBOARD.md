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
