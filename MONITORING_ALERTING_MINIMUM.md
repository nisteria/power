# MONITORING_ALERTING_MINIMUM.md

## Ziel
Minimaler, umsetzbarer Monitoring/Alerting-Slice fuer Phase 2 Pilotbetrieb (Battery + Wallbox + Tarif-Engine), damit kritische Fehler frueh sichtbar sind und klar eskaliert werden.

## Scope (v0.1)
In Scope:
- API-Health Smart-Meter Ingest
- Tarif-Engine Job-Lauf (Day-Ahead)
- Device Command Execution (Battery/Wallbox)
- Basis-Datenqualitaet (Zeitreihen-Luecken, Monotonie kWh)
- Pilot-Betriebsalarmierung (P1/P2)

Out of Scope:
- Vollstaendige SIEM/Threat Detection
- Kostenoptimierte Long-Term-Analytics
- Multi-Region Failover

## Kernmetriken (Minimum)
1. **Ingest Availability**
   - `smart_meter_ingest_success_rate_15m`
   - Ziel: >= 99.0% / 15 Minuten
2. **Tarif-Engine Freshness**
   - `tariff_schedule_age_minutes`
   - Ziel: <= 30 Minuten nach Day-Ahead-Updatefenster
3. **Command Success Ratio**
   - `device_command_success_rate_15m`
   - Ziel: >= 98.0% / 15 Minuten
4. **Data Quality Flags**
   - `meter_monotonicity_violations_1h`
   - `timeseries_gap_events_1h`
5. **Latency**
   - `api_p95_latency_ms` fuer ingest + command endpoints

## Alarmregeln (Pilot-Minimum)
### P1 (sofort eskalieren)
- Ingest Success Rate < 95% fuer 15 Minuten
- Tarif-Schedule alter > 120 Minuten waehrend aktiver Steuerzeit
- Device Command Success Rate < 90% fuer 10 Minuten

### P2 (innerhalb Arbeitstag behandeln)
- Ingest Success Rate < 99% fuer 60 Minuten
- >= 5 Monotonie-Verletzungen in 1 Stunde
- >= 3 Zeitreihen-Luecken > 10 Minuten in 1 Stunde

## Alert Routing (v0.1)
- P1 -> `backend-agent` (primary), `qa-agent` (secondary), `ceo-agent` (visibility)
- P2 -> `backend-agent` Ticket + taeglicher Review-Slot

## P1 Trigger-Definitionen (v0.2, reviewbar)
| P1-Alarmklasse | Metrik / Query (PromQL-Stil) | Trigger | Dauer | Sofortaktion |
|---|---|---|---|---|
| Ingest-Ausfall | `sum(rate(smart_meter_ingest_events_total{status="ok"}[5m])) / sum(rate(smart_meter_ingest_events_total[5m])) * 100` | `< 95` | `15m` | Ingest-Retry aktivieren, letzte fehlerhafte Payload-ID sichern |
| Tarif-Freshness kritisch | `max(tariff_schedule_age_minutes{scope="active_control_window"})` | `> 120` | `10m` | Fallback-Tarifprofil aktivieren, Day-Ahead-Job manuell rerun |
| Device-Command Failure Spike | `sum(rate(device_command_total{status="success"}[5m])) / sum(rate(device_command_total[5m])) * 100` | `< 90` | `10m` | Command-Queue drosseln, letzte 20 Fehler nach `error_code` clustern |

### Konkrete PromQL-Beispiele (Copy-Paste-Ready fuer Implementierung)
```promql
# P1: Ingest Success Rate < 95% fuer 15 Minuten
(
  sum(rate(smart_meter_ingest_total{status="ok"}[5m])) 
  / 
  sum(rate(smart_meter_ingest_total[5m]))
) * 100 < 95

# P1: Tarif-Freshness kritisch (>120min)
max(tariff_schedule_age_minutes{scope="active_control_window"}) > 120

# P1: Device Command Success < 90% fuer 10 Minuten
(
  sum(rate(device_command_total{status="success"}[5m])) 
  / 
  sum(rate(device_command_total[5m]))
) * 100 < 90

# P2: Monotonie-Verletzungen >= 5 in 1 Stunde
sum_over_time(meter_monotonicity_violations_total[1h]) >= 5

# P2: Zeitreihen-Luecken >= 3 in 1 Stunde
sum_over_time(timeseries_gap_events_total[1h]) >= 3

# P2: Ingest Success < 99% fuer 60 Minuten
(
  sum(rate(smart_meter_ingest_total{status="ok"}[5m])) 
  / 
  sum(rate(smart_meter_ingest_total[5m]))
) * 100 < 99
```

Hinweise:
- Wenn Nenner `0` ist (kein Traffic), gilt Regel als `no_data` und erzeugt **keinen** P1, sondern P2-Check.
- `for`-Dauer ist Pflicht, um Alert-Flapping in kurzen Lastspitzen zu vermeiden.
- Review-Outcome je Regel im Alignment als `GO / ADJUST / HOLD` dokumentieren.

## Runbook-Skeleton (pro Alert)
1. Alert-ID + Timestamp notieren
2. Betroffenen Service + letzte erfolgreiche Ausfuehrung pruefen
3. Quick-Mitigation (Retry, Scope-Freeze, Fallback-Tarifprofil)
4. Root-Cause-Hypothese dokumentieren
5. Status in `PROJECT_STATUS.md` als Incident-Micro-Update spiegeln

## Definition of Ready fuer Paket 5
- [ ] Alle 5 Kernmetriken im Monitoring sichtbar
- [ ] P1/P2 Regeln technisch hinterlegt
- [ ] Alert-Routing getestet (Testalarm)
- [ ] 1 Beispiel-Runbook pro P1-Alarmklasse vorhanden

## P1 Runbook-Mini-Playbooks (v0.3)

### 1) Ingest-Ausfall (`ingest_success_rate < 95% for 15m`)
- **Check 0-2 min:** Letzte fehlgeschlagene `ingestionId` + `traceId` aus API-Logs ziehen.
- **Check 2-5 min:** Fehlercluster nach Ursache bilden (`validation_error`, `source_timeout`, `duplicate_reading`).
- **Sofortaktion:** Retry nur fuer `source_timeout`, fehlerhafte Payloads mit `validation_error` in Quarantaene-Queue.
- **Escalation-Kriterium:** Wenn trotz Retry weitere 10 Minuten <95%, P1 an `backend-agent` + Sichtbarkeit `ceo-agent`.
- **Recovery-Nachweis:** 2 aufeinanderfolgende 5m-Fenster >=97% + kein neuer kritischer Fehlercluster.

### 2) Tarif-Freshness kritisch (`schedule_age > 120m for 10m`)
- **Check 0-3 min:** Letzte erfolgreiche Day-Ahead-Berechnung (`jobId`, `finishedAt`) pruefen.
- **Check 3-6 min:** Trigger-Ursache klassifizieren (Scheduler-Ausfall, Input fehlt, Validierungsfehler).
- **Sofortaktion:** Fallback-Tarifprofil aktivieren + Day-Ahead-Job einmal manuell rerun.
- **Escalation-Kriterium:** Wenn Freshness nach 15 Minuten weiter >120m, HOLD fuer neue Optimierungen setzen.
- **Recovery-Nachweis:** `tariff_schedule_age_minutes <= 30` im aktiven Steuerfenster + Job-Status `success`.

### 3) Device-Command Failure Spike (`command_success_rate < 90% for 10m`)
- **Check 0-2 min:** Letzte 20 Command-Fehler nach `error_code` clustern (timeout/auth/device_busy).
- **Check 2-5 min:** Pruefen, ob ein einzelnes Device den Spike treibt (Top-N Device-IDs).
- **Sofortaktion:** Command-Queue auf 50% drosseln, Wiederholungen mit Jitter aktivieren.
- **Escalation-Kriterium:** Wenn Erfolg weiter <90% nach 10 Minuten Mitigation, betroffene Device-Klasse in Safe-Mode.
- **Recovery-Nachweis:** 3 aufeinanderfolgende 5m-Fenster >=95% + keine neuen auth/device_busy-Spikes.

## Naechster konkreter Schritt
20-min Alignment mit backend-agent + qa-agent: P1-Trigger + diese drei Mini-Playbooks als `GO/ADJUST/HOLD` gegenzeichnen und danach DoR-Checkboxen aktualisieren.

## Alignment-Sign-off Sheet (v0.4, ausfuellbar)

### Review-Slot
- Datum/Uhrzeit:
- Teilnehmer: backend-agent, qa-agent
- Moderation: ceo-agent
- Outcome gesamt: GO / GO+AUFLAGE / HOLD

### Entscheidungen je P1-Regel
| Regel | Vorschlag v0.3 | Entscheidung (GO/ADJUST/HOLD) | Auflage/Anpassung | Owner | Faellig bis |
|---|---|---|---|---|---|
| Ingest-Ausfall | `<95% for 15m`, Retry nur `source_timeout`, Quarantaene bei Validation |  |  |  |  |
| Tarif-Freshness kritisch | `>120m for 10m`, Fallback + 1x manueller rerun |  |  |  |  |
| Command Failure Spike | `<90% for 10m`, Queue 50%, Jitter-Retry, ggf. Safe-Mode |  |  |  |  |

### DoR-Update nach Alignment
- Wenn alle drei Regeln mindestens `GO` oder `GO+AUFLAGE` haben -> DoR-Checkbox "P1/P2 Regeln technisch hinterlegt" auf erledigt setzen.
- Wenn mindestens eine Regel `HOLD` bleibt -> Blocker in `PROJECT_STATUS.md` dokumentieren (Regel + fehlender Nachweis + Workaround).

## Alignment Pre-Fill (v0.5, 2026-03-12 15:36 Europe/Warsaw)

Ziel dieses Mini-Schritts: Review-Aufwand senken, indem der v0.4-Sign-off-Bogen bereits mit einem konkreten Slot, Owners und vorgeschlagenen Entscheidungen vorbelegt wird.

### Vorgeplantes Review-Fenster
- Datum/Uhrzeit: **2026-03-13 12:50 Europe/Warsaw** (20 Min, direkt nach Paket-1-Kickoff-Slot)
- Teilnehmer: backend-agent, qa-agent
- Moderation: ceo-agent (Lech)
- Erwartetes Outcome: `GO` oder `GO+AUFLAGE` pro Regel (kein Blanko-`HOLD` ohne dokumentierten Blocker)

### Vorbelegte Entscheidungs-Entwuerfe (zur Gegenzeichnung im Slot)
| Regel | Vorschlag v0.3 | Vorbelegung | Owner | Faellig bis | Notiz fuer Slot |
|---|---|---|---|---|---|
| Ingest-Ausfall | `<95% for 15m`, Retry nur `source_timeout`, Quarantaene bei Validation | GO | backend-agent | 2026-03-14 18:00 | Query direkt in Alertmanager-Regel uebernehmen |
| Tarif-Freshness kritisch | `>120m for 10m`, Fallback + 1x manueller rerun | GO+AUFLAGE | backend-agent | 2026-03-14 18:00 | Auflage: Fallback-Aktivierung als Audit-Event loggen |
| Command Failure Spike | `<90% for 10m`, Queue 50%, Jitter-Retry, ggf. Safe-Mode | GO+AUFLAGE | qa-agent | 2026-03-14 18:00 | Auflage: Safe-Mode-Testfall mit reproduzierbarem Nachweis in QA-Matrix |

### Blocker-Vorpruefung
- Aktueller harter Blocker: **keiner**.
- Potenzieller Risiko-Punkt: Fehlende final benannte reale Personen fuer Backend/QA-Gegenzeichnung.
- Workaround bis zur namentlichen Finalisierung: Review im Slot durchfuehren, Rollen-Gegenzeichnung sofort eintragen und reale Namen spaetestens bis 2026-03-14 18:00 nachziehen.

## Alert-Drill Acceptance Matrix (v0.6, review-ready)

Ziel: Vor Pilotstart jede P1-Regel einmal kontrolliert ausloesen (synthetisch), damit Routing + Mini-Playbook nicht nur auf Papier existieren.

| Drill-ID | Regel | Synthetic Trigger (Beispiel) | Erwarteter Alarm | Erwartete Sofortaktion | Erfolgsnachweis |
|---|---|---|---|---|---|
| DRILL-P1-INGEST-01 | Ingest-Ausfall | Testdatensatz mit 20% `source_timeout` in 15m Fenster einspeisen (Test-Env) | P1 "Ingest-Ausfall" innerhalb 2 min nach `for:15m` | Retry nur fuer `source_timeout`, Validation in Quarantaene | Alert im Kanal + Quarantaene-Queue-Eintrag + Recovery auf >=97% in 2x5m |
| DRILL-P1-TARIFF-01 | Tarif-Freshness kritisch | Day-Ahead Job absichtlich pausieren, `tariff_schedule_age_minutes` >120m erzeugen | P1 "Tarif-Freshness kritisch" | Fallback-Tarifprofil aktiv + 1x manueller rerun | Audit-Event fuer Fallback + erfolgreicher rerun + `age <=30` |
| DRILL-P1-CMD-01 | Command Failure Spike | 30% Commands mit simuliertem `device_busy`/`timeout` in 10m erzeugen | P1 "Command Failure Spike" | Queue auf 50%, Jitter-Retry aktivieren, ggf. Safe-Mode | Alert + Queue-Drosselungs-Log + 3x5m Recovery >=95% |

### Drill-DoD (Paket 5 Erweiterung)
- [ ] Alle drei P1-Drills einmal durchgefuehrt (Test- oder Staging-Umgebung)
- [ ] Pro Drill ein Incident-Nachweis (`drillId`, Zeitstempel, Owner, Outcome)
- [ ] Routing verifiziert: P1 kommt bei backend-agent + qa-agent an
- [ ] Learnings in `PROJECT_STATUS.md` als 3-Zeilen-Micro-Update gespiegelt
