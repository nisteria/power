# TECH_MVP_SCOPE_V1

## 1) Zielbild (MVP v1)

Bis Ende Q3 2026 läuft in Österreich ein technisch belastbarer MVP für **Battery + Wallbox + Tarif-Engine**, der an Pilotstandorten täglich automatisch günstige Lade-/Entladestrategien erzeugt und sicher ausführt.

**Erfolgskriterien (MVP):**
- Day-Ahead Optimierung (24h Horizont) mit stündlichen Preisdaten ist produktiv.
- Zwei steuerbare Gerätetypen sind live: **Batteriespeicher** und **Wallbox**.
- Smart-Meter Datenpfad ist stabil (Ingestion, Validierung, Speicherung, Nutzung im Optimizer).
- API und Web-Frontend können Policies setzen, Schedules auslösen und Ergebnisse sichtbar machen.
- Fallback bei Ausfällen (letzte gültige Policy, sichere Device-Grenzen) ist umgesetzt.

---

## 2) Scope v1 (klarer In/Out-Scope)

### In-Scope (MVP v1)
1. **AT Fokus**: ein Land (Österreich), ein initiales regulatorisches Profil.
2. **Geräteklassen**: Battery + Wallbox (mind. je 1 priorisierter Herstelleradapter produktiv).
3. **Tarif-Engine v1**:
   - Day-Ahead Preisimport (hourly)
   - Rule-basierte Optimierung (Kostenfokus)
   - 24h Schedule-Generierung
4. **Smart-Meter Datenpfad v1**:
   - Site-Mapping (meter -> site)
   - periodische Ingestion (15/60 min je Quelle)
   - Datenqualitätschecks (Lücken, Zeitversatz, Ausreißer)
5. **Device Control v1**:
   - standardisierte Befehle: `charge`, `discharge`, `pause`, `set_power`
   - harte Safety-Limits (SoC min/max, Leistungslimits)
6. **API v1** gemäß `API_SPEC.md`:
   - Sites/Devices, Tarife/Preise, Optimize-Run, Schedule-Abfrage, Telemetrie
7. **Observability v1**:
   - technische Healthchecks
   - Audit-Logs für Steuerbefehle
   - Basis-Alerting für fehlgeschlagene Runs/Commands
8. **Pilotbetrieb**:
   - 20 Pilotkunden (Q3-Ziel), kontrolliertes Rollout mit Feature Flags.

### Out-of-Scope (explizit nicht in v1)
1. Mobile App (React Native) und Consumer-Notifications in voller Tiefe.
2. Wärmepumpe/Boiler/PV-Inverter als steuerbare Geräte.
3. 15-Minuten-Optimierung mit Prognosemodellen (v2-Thema).
4. Multi-Objective Optimierung (CO2, Netzdienlichkeit, Marktbitrage in Tiefe).
5. Vollständiges Installer-Portal mit komplexen Workflows.
6. Mehrländerfähigkeit außerhalb AT.
7. Echtzeitsteuerung <1 Minute Zykluszeit.

---

## 3) Kernkomponenten (technischer MVP-Umfang)

### 3.1 Smart-Meter Datenpfad

**Ziel:** Verlässliche Last-/Energiezeitreihen pro Site als Input für Optimierung und Monitoring.

**Pipeline:**
1. **Connector/Ingestion Job**
   - holt Messwerte aus Smart-Meter Quelle(n) in Intervallen
   - schreibt Rohdaten mit Source-Metadaten
2. **Normalizer**
   - vereinheitlicht Zeitstempel (UTC), Einheiten (kW/kWh), Intervalllänge
3. **Validator**
   - prüft Vollständigkeit, Ausreißer, Duplikate, Zeitdrift
   - markiert Quality-Flags pro Datensatz
4. **Storage**
   - persistiert in Telemetrie-Store (MVP: relationale Tabelle + Raw JSON)
5. **Feature-View für Optimizer**
   - aggregierte Lastprofile, letzte SoC/Leistungswerte, aktuelle Preise

**MVP-Definition of Done:**
- Für Pilot-Sites sind >98% der erwarteten Intervalle pro Tag verfügbar.
- Fehlende Daten triggern Fallback-Regeln (konservative Schedule-Generierung).

### 3.2 Device Adapter Layer (Battery + Wallbox)

**Ziel:** Einheitliche Steuerung unterschiedlicher Hersteller über ein gemeinsames Command-Modell.

**Architekturprinzip:**
- `DeviceAdapter` Interface pro Gerätetyp mit Capability-Discovery.
- Herstelleradapter implementieren Mapping API/Protokoll -> Standardbefehle.

**MVP-Capabilities:**
- **Battery**: read SoC, set charge/discharge power, pause.
- **Wallbox**: set max charging power/current, start/stop charging.
- Command-Idempotenz, Retries (begrenzt), Timeout-Handling.
- Sicherheitsgrenzen im Adapter **und** zentraler Policy-Layer.

### 3.3 Optimizer (Tarif-Engine v1)

**Ziel:** Kostenoptimierte Fahrpläne für die nächsten 24h erzeugen.

**Inputs:**
- Preiszeiten (day-ahead)
- Site Policy (z. B. `min_battery_soc_pct`, max. Ladeleistung)
- Device Constraints (Capabilities, aktuelle Zustände)
- Smart-Meter/Telemetrie (Lastprofil, Verfügbarkeit)

**Output:**
- Versionierter Schedule mit `schedule_actions` je Device.

**MVP-Logik (regelbasiert):**
- Ladefenster in günstigen Stunden priorisieren.
- Mindest-SoC jederzeit einhalten.
- Wallbox-Laden auf definierte Zeitfenster/Leistungsgrenzen legen.
- Konfliktauflösung bei gleichzeitigen Lastspitzen (site power cap).

### 3.4 API & Orchestrierung

**Ziel:** Steuerbare, beobachtbare Endpunkte für App/Ops/Installer.

**MVP-Endpunkte (Kern):**
- Tarife/Preise: `GET/PUT tariff`, `GET prices`
- Policy/Optimierung: `GET/PUT policy`, `POST optimize/run`, `GET schedules/latest`
- Devices: `GET/POST devices`, `POST commands`
- Telemetrie: `POST device telemetry`, `GET site telemetry`
- Ops/Admin: `health`, `audit-logs`

**Ablauf Run-to-Execute:**
1. API triggert `optimize/run`
2. Optimizer erstellt Schedule-Version
3. Scheduler/Executor sendet Commands an Adapter
4. Telemetrie + Command Result in Audit/Monitoring

---

## 4) Minimal-Datenmodell (MVP v1)

Basierend auf `DATABASE_SCHEMA.md`, für v1 essenziell:

1. **Core Context**
   - `organizations`, `users`, `sites`
2. **Geräte & Fähigkeiten**
   - `devices` (+ empfohlenes Feld `capabilities_json`)
3. **Tarifdaten**
   - `tariffs`, `price_timeslots`
4. **Optimierungsregeln**
   - `optimization_policies`
5. **Planung & Ausführung**
   - `schedules`, `schedule_actions`
6. **Messwerte**
   - `telemetry` (inkl. `raw_json` + Quality Marker)
7. **Nachvollziehbarkeit**
   - `audit_logs`

**Empfohlene Minimal-Erweiterungen für v1-Stabilität:**
- `telemetry.quality_flag` (ok|estimated|missing|invalid)
- `schedule_actions.status` (planned|sent|ack|failed|skipped)
- `devices.last_seen_at` für Device-Verfügbarkeit

---

## 5) Milestones (Q2 -> Q3 2026, 8 Meilensteine)

### Q2 2026

**M1 — Architektur-Freeze & Vertragsgrenzen (KW 14-15)**
- API/DB/Service-Contracts für Smart-Meter, Adapter, Optimizer final.
- DoD/SLIs für Datenqualität und Command-Erfolg festgelegt.

**M2 — Smart-Meter Ingestion v1 (KW 16-18)**
- Connector + Normalizer + Validator implementiert.
- Persistenz und Basismonitoring für Datenlücken aktiv.

**M3 — Device Adapter SDK + erster Battery Adapter (KW 19-21)**
- Adapter-Interface, Retry/Timeout-Policy, Safety-Guardrails.
- End-to-End Steuerung Battery in Staging nachgewiesen.

**M4 — Wallbox Adapter + Command Pipeline (KW 22-24)**
- Einheitliche Command-Ausführung (`commands` Endpoint bis Gerät).
- Auditierbare Command-Events und Fehlerpfad.

### Q3 2026

**M5 — Tarif-Engine v1 (Day-Ahead) (KW 27-29)**
- Preisimport, Policy-Parsing, regelbasierte 24h-Optimierung live.
- Schedule-Versionierung + Vergleich alter/neuer Runs.

**M6 — Scheduler/Executor Hardening (KW 30-31)**
- Idempotente Ausführung, Wiederanlauf nach Fehlern, sichere Defaults.
- Fallback auf letzte gültige Policy bei Daten-/Serviceausfall.

**M7 — Pilot Rollout 5 -> 20 Sites (KW 32-36)**
- Stufenweiser Rollout mit Feature Flags.
- Monitoring-Dashboards für Run-Erfolg, Device-Health, Datenqualität.

**M8 — MVP Readiness Gate (KW 37-39)**
- SLO-Check (Optimizer, Command Success, Data Completeness).
- Go/No-Go Dokumentation für Q4 Skalierung in AT.

---

## 6) Top-5 technische Risiken + Mitigation

### Risiko 1: Heterogene Geräte-APIs / instabile Hersteller-Integrationen
**Auswirkung:** Steuerbefehle schlagen fehl oder verhalten sich inkonsistent.
**Mitigation:**
- striktes Adapter-Interface + Capability-Matrix
- Contract-Tests pro Adapter
- Canary-Rollout pro Hersteller/Firmware

### Risiko 2: Unvollständige oder verspätete Smart-Meter Daten
**Auswirkung:** Schlechte Optimierungsentscheidungen, falsche Schedules.
**Mitigation:**
- Quality-Flags und Mindestdatenquote vor Optimierung
- konservativer Fallback-Modus (safe schedule)
- Alarmierung bei Datenlücken > Schwellwert

### Risiko 3: Optimizer erzeugt nicht-ausführbare Pläne
**Auswirkung:** Konflikte mit Device-Limits oder Netzgrenzen.
**Mitigation:**
- Constraint-Validation vor Persistenz
- Simulationsschritt vor Command Dispatch
- harte Sicherheitsgrenzen in zentraler Policy + Adapter

### Risiko 4: Teilfehler in Command-Ausführung (Race Conditions / Retries)
**Auswirkung:** Doppelbefehle, inkonsistente Gerätezustände.
**Mitigation:**
- idempotente Command-IDs
- genau definierte Retry-Strategie + Dead-Letter Queue
- Status-Tracking `planned -> sent -> ack/failed`

### Risiko 5: Unzureichende Observability im Pilotbetrieb
**Auswirkung:** Fehler werden zu spät erkannt, Rollout-Risiko steigt.
**Mitigation:**
- End-to-End Tracing (Run-ID über alle Komponenten)
- Pflichtmetriken: Optimizer-Dauer, Erfolgsquote Commands, Datenvollständigkeit
- klare On-Call Runbooks für häufige Störungen

---

## 7) Technischer Scope-Schnitt (kompakt)

**MVP v1 liefert:**
- belastbaren Datenpfad Smart Meter,
- produktive Steuerung von Battery + Wallbox,
- Day-Ahead Tarif-Optimierung mit sicheren Fallbacks,
- API-zentrierte Orchestrierung + Audit/Monitoring,
- Pilotfähigkeit für Q3 2026 (20 Sites in AT).

**Nicht enthalten in v1:**
- zusätzliche Gerätetypen, hochfrequente Optimierung, Multi-Länder, Vollausbau Installer-/Mobile-Erlebnis.