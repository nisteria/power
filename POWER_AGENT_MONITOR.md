# POWER_AGENT_MONITOR.md

## Zweck
Schnell sehen, was der Power-CEO-Agent gerade macht.

## 1) Live in Terminal verfolgen
```powershell
cd C:\Users\lechd\OneDrive\Dokumente\GitHub\power
powershell -ExecutionPolicy Bypass -File .\scripts\watch-power-agent.ps1
```

## 2) Was du siehst
- letzte Agentenläufe
- aktuelle Prioritäten
- Delegationen und Entscheidungen

## 3) Update-Frequenz
- Agentenloop: alle 5 Minuten
- Datei-Refresh im Watcher: alle 5 Sekunden
