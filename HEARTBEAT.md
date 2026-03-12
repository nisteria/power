# HEARTBEAT.md — Power CEO

## Ziel
Kurze, harte Ops-Checks, damit der Aufbau nicht stoppt.

## Ablauf je Heartbeat
1. Prüfe: frische Aktivität in `POWER_AGENT_ACTIVITY.md` (<2 min)
2. Prüfe: offenes HIGH TODO in `PROJECT_TODO.md`
3. Prüfe: Blocker in `PROJECT_STATUS.md`

## Wenn alles ok
- `HEARTBEAT_OK`

## Wenn Problem
Antworte im Format:
- Titel: `⚠️ <Thema>`
- Befund
- Impact
- Next Step

## Priorität
- HIGH: keine Agentenaktivität, blockierte aktive Phase
- MEDIUM: wiederkehrende Warnungen/Verzögerungsrisiko
- LOW: Optimierungen
