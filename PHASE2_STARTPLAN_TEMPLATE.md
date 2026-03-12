# PHASE2_STARTPLAN_TEMPLATE.md

Status: Draft-Vorlage (nur Vorbereitung, keine Phase-2-Umsetzung ohne explizite Freigabe)

## Ziel
Eine freigabefähige Startvorlage für Phase 2 (MVP Build & Pilotfähigkeit), damit nach GO sofort strukturiert gestartet werden kann.

## Geplanter Scope nach Freigabe
1. Sprint 0: Architektur-/Repo-Freeze + Team-Setup
2. Sprint 1: Device-Integration Core (Battery/Wallbox)
3. Sprint 2: Tarif-Engine + Optimierungslogik v1
4. Sprint 3: Observability + QA-Acceptance + Pilot-Readiness

## Milestones (Template)
- M1: Scope & Architektur signiert
- M2: End-to-End Steuerpfad im Staging
- M3: Savings-Tracking + KPI Dashboard
- M4: Pilot-Checkliste Go/No-Go

## Risiken vor Start
- Juristischer Final-Review noch offen
- Integrationsrisiko heterogene Hardware
- Ressourcen-/Timing-Abhängigkeiten

## GO-Check
- [ ] Lech-Freigabe erteilt
- [ ] Rechts-Check eingeplant
- [ ] Sprint-Owner benannt

## Sprint-0 Definition of Done (nach GO)
- Repo/Branching-Konvention bestätigt (inkl. PR-Review-Owner)
- Architekturentscheidungen als ADR v1 abgelegt
- MVP-Scope v1 mit Out-of-Scope-Liste fixiert

## First-48h Checklist nach GO (Micro)
- Day 0: Kickoff-Termin (45 min) mit klaren Owners für Backend/Frontend/QA
- Day 1: KPI-Baseline festhalten (Savings, Peak-Reduktion, Stabilität)
- Day 2: Pilot-Risiken priorisieren (Top-3 mit Owner + Mitigation)

## Freigabe-Message (Copy/Paste)
"Phase 1 ist abgeschlossen und dokumentiert. Soll ich Phase 2 (MVP Build & Pilotfähigkeit) jetzt freigeben und mit Sprint 0 starten?"

## Entscheidungsoptionen für Lech (kompakt)
- **GO jetzt:** Start mit Sprint 0 innerhalb von 24h
- **GO mit Auflage:** Start erst nach fixem Termin für juristischen Final-Review
- **HOLD:** Kein Start, nur weitere Vorbereitung ohne Build-Beginn

## Owner-Mapping (nach GO, vorzubelegen)
- Backend-Owner: _tbd_
- Frontend-Owner: _tbd_
- QA-Owner: _tbd_
- Product/Delivery-Owner: _tbd_

## KPI-Zielkorridor (erste 14 Tage nach GO)
- Steuerpfad-Stabilität Staging: >= 95% erfolgreiche Durchläufe
- Messbarkeit Savings: tägliche Erfassung für >= 90% der Testläufe
- Incident-Reaktionszeit: Erstreaktion <= 4h bei P1/P2

## No-Go-Kriterien (vor Sprint-Start prüfen)
- Kein namentlicher Owner pro Stream (Backend/Frontend/QA)
- Kein fixierter Termin für juristischen Final-Review
- Kritische Zugänge/Repos nicht funktionsfähig am Day-0

## GO-Decision Inputs (60-Sekunden-Check)
- **Signal A (Owner):** Für jeden Stream ist ein namentlicher Owner eingetragen.
- **Signal B (Timing):** Kickoff-Slot ist datiert und mit Kernrollen bestätigt.
- **Signal C (Legal):** Juristischer Final-Review hat fixen Termin + Verantwortlichen.
- **Interpretation:** Nur bei A+B+C = GO ohne Auflage. Fehlt ein Signal -> GO mit Auflage oder HOLD.

## HOLD-Modus (wenn kein GO in 7 Tagen)
- Scope bleibt eingefroren (keine neue Feature-Umsetzung, nur Entscheidungsreife erhöhen).
- Wöchentlich 1-Page Update an Lech: offene Signale A/B/C + konkret nächster Entblockungsschritt.
- Trigger für Re-Decision: sobald alle fehlenden Signale dokumentiert sind.

## Escalation-Trigger (wenn kein GO in 14 Tagen)
- Eskalations-Notiz vorbereiten: "Top-3 Gründe für HOLD" + "2 Entscheidungsoptionen mit Risiko".
- 20-Minuten-Entscheidungstermin mit Lech anfordern (GO mit Auflagen vs. bewusstes Parken bis Datum X).
- Ergebnis verpflichtend dokumentieren (Entscheidung, Owner, nächster Termin).

## Pre-GO Evidence Pack (90-Sekunden-Check)
- Owner-Mapping vollständig mit Namen + Stellvertretung je Stream.
- Kickoff-Slot (Datum/Uhrzeit) inkl. eingeladenem Kernteam dokumentiert.
- Legal-Review-Termin inkl. Verantwortlichem + erwarteter Output festgehalten.
- Go/No-Go-Entscheidung als 3-Zeilen-Protokoll in `PROJECT_STATUS.md` hinterlegt.

## Decision-SLA nach Freigabeanfrage (Governance)
- SLA: Auf eine GO/HOLD-Freigabeanfrage erfolgt innerhalb von 24h eine explizite Entscheidung oder ein datierter Re-Decision-Termin.
- Wenn keine Entscheidung innerhalb von 24h: automatische HOLD-Fortführung mit kurzem Blocker-Log (A/B/C-Signal fehlt).
- Ziel: Entscheidungsdrift vermeiden, ohne Phase-2-Umsetzung vor GO zu starten.

## Delegate-Absence Fallback (wenn Decision Owner nicht erreichbar)
- Wenn GO/HOLD-Owner >48h nicht erreichbar ist: Stellvertretung übernimmt Entscheidung im selben SLA-Rahmen.
- Fehlt auch Stellvertretung: automatische HOLD-Fortführung + Eskalationsnotiz mit neuem Entscheidungstermin.
- Ziel: Keine stillen Deadlocks im Freigabeprozess.
