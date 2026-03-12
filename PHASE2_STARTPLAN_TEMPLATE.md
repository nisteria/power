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

## First-72h Kill-Switch (nach GO)
- Wenn in den ersten 72h ein P1-Risiko ohne benannten Owner auftritt: sofortiger Scope-Freeze (keine neuen Workstreams starten).
- Re-Start nur mit kurzer 3-Punkte-Entscheidung: Risiko isoliert, Owner gesetzt, Mitigation datiert.
- Ziel: Frühe Fehlstarts begrenzen und GO-Disziplin sichern.

## GO-Meeting Minimal Agenda (10 Minuten)
- 2 Min: A/B/C-Signale kurz bestätigen (Owner, Timing, Legal).
- 4 Min: Offene Risiken (Top-3) + jeweilige Mitigation/Owner.
- 2 Min: Entscheidung GO | GO mit Auflage | HOLD treffen.
- 2 Min: Nächsten Termin + Verantwortliche verbindlich festhalten.

## GO-Decision Log (3 Zeilen, direkt in PROJECT_STATUS übernehmen)
- Entscheidung: GO | GO mit Auflage | HOLD
- Begründung (1 Satz): _tbd_
- Verantwortlich + nächster Termin (Datum/Uhrzeit): _tbd_

## Pre-GO Stakeholder Ping (Copy/Paste, 2 Zeilen)
- Status: "Phase 2 ist startklar, Freigabeentscheidung steht aus (GO | GO mit Auflage | HOLD)."
- Bedarf: "Bitte Entscheidung + nächster Termin bestätigen, damit Sprint-0-Planung verbindlich bleibt."

## GO mit Auflage — Condition Tracker (Micro)
- Auflage 1: _tbd_ | Owner: _tbd_ | Fällig: _tbd_ | Status: offen/erledigt
- Auflage 2: _tbd_ | Owner: _tbd_ | Fällig: _tbd_ | Status: offen/erledigt
- Regel: Sprint-Start nur für Workstreams ohne offene kritische Auflage.

## HOLD Exit-Kriterien (Ready-for-Re-Decision)
- Mindestens 2 von 3 A/B/C-Signalen sind nachweisbar geschlossen.
- Für verbleibendes Signal liegt ein datierter Entblockungsplan mit Owner vor.
- Nächster Re-Decision-Termin ist im Kalender fixiert (keine offenen TODO-Platzhalter).

## Re-Decision Outcome Codes (Micro)
- **RD-GO:** Re-Decision ergibt GO, Sprint-0 Starttermin wird sofort gesetzt.
- **RD-GO+COND:** Re-Decision ergibt GO mit Auflage, offene Conditions in den Tracker eintragen.
- **RD-HOLD:** Re-Decision bestätigt HOLD, nächster Termin + fehlendes Signal verpflichtend dokumentieren.

## Governance Watchdog (bei Decision-Drift)
- Trigger: Wenn nach einer Freigabeanfrage >72h kein neues Decision-Log-Update vorliegt.
- Aktion: Automatischer 2-Zeilen-Status-Ping + Vorschlag für einen 20-Minuten Re-Decision-Slot.
- Ziel: HOLD-Schleifen ohne klaren Owner-/Termin-Fortschritt früh sichtbar machen.

## Decision-Input Freshness Check (vor GO in 60 Sekunden)
- Prüfe, ob A/B/C-Nachweise jünger als 7 Tage sind; ältere Nachweise gelten als "stale".
- Bei stale Nachweis: nur GO mit Auflage oder HOLD, bis der Nachweis aktualisiert ist.
- Ziel: Verhindern, dass mit veralteten Entscheidungsgrundlagen in Sprint-0 gestartet wird.

## GO-Decision Confidence Score (Micro)
- Score je Signal A/B/C: 0 = fehlt, 1 = vorhanden aber stale, 2 = vorhanden & fresh.
- Entscheidungsregel: 6 Punkte = GO möglich; 4-5 = GO mit Auflage; <=3 = HOLD.
- Ziel: Freigaben konsistent und in 30 Sekunden quantifizierbar machen.

## GO-Decision Escalation Trigger (Micro)
- Trigger: Wenn 2 aufeinanderfolgende Re-Decision-Termine ohne Outcome-Code enden.
- Aktion: CEO-Review in 24h ansetzen (Owner + Datum fix), bis dahin nur Entblockungsarbeit zulassen.
- Ziel: Endlosschleifen stoppen und eine harte Entscheidungsinstanz erzwingen.


## Pre-GO Artifact Links (Micro)
- Owner-Entscheidung: Name + Rolle + Stellvertretung in einem Block dokumentieren.
- Kickoff-Nachweis: Kalendereintrag/Termin-ID als Referenz notieren.
- Legal-Nachweis: geplanter Review-Termin + verantwortliche Person festhalten.
- Decision-Log-Referenz: Link/Dateipfad zur letzten GO/HOLD-Entscheidung ergänzen.

## GO-First-2 Activation Pack (Micro)
- Paket 1 (Owner+Kickoff) — **verbindlich fixiert**:
  - Owner (Rolle): **ceo-agent**
  - Zieltermin: **2026-03-13, 12:00 Europe/Warsaw**
  - Deliverable: Sprint-Owner je Stream (Backend/Frontend/QA/Product) benannt + Kickoff-Slot mit Termin-ID dokumentiert.
- Paket 2 (Smart-Meter API-Story) — **verbindlich fixiert**:
  - Owner (Rolle): **backend-agent**
  - Zieltermin: **2026-03-14, 16:00 Europe/Warsaw**
  - Kurz-Scope (In/Out):
    - **In:** API-Story-Schnitt (Input/Output/Fehlerfälle) für Smart-Meter-Datenpfad zur Tarif-Engine v1.
    - **In:** Minimales Datenmodell + Beispiel-Payloads für Day-Ahead-Verarbeitung.
    - **Out:** Keine vollständige Geräteorchestrierung und keine produktive Deployment-Freigabe.`r`n  - Abhängigkeit: Paket 2 startet mit Scope-Freeze, sobald Paket-1-Kickoff protokolliert ist (Termin-ID gesetzt).
- Ziel: Die zwei hoechsten Prioritaeten sind nach GO konkret terminiert und owner-seitig eindeutig zugeordnet.

## Top-2 Readiness Check (5-Minuten Gate)
- Paket 1 bereit, wenn: Kickoff-Termin-ID dokumentiert + alle Stream-Owner bestaetigt.
- Paket 2 bereit, wenn: API-Story In/Out im Repo verlinkt + Abnahmeverantwortlicher benannt.
- Regel: Ohne beide Ready-Haken kein "Start executed"-Status in PROJECT_STATUS.

## Paket-1 Abnahmekriterien (Kickoff, Micro)
- Kickoff-Termin-ID dokumentiert und fuer Kernrollen sichtbar.
- Owner je Stream (Backend/Frontend/QA/Product) auf Personenebene benannt.
- Offene Risiken (Top-3) mit Owner + naechstem Termin versehen.


## Top-2 Ready-Check (vor Kickoff)
- [ ] Paket 1: Termin-ID fuer Kickoff dokumentiert.
- [ ] Paket 1: Stream-Owner je Backend/Frontend/QA/Product namentlich gesetzt.
- [ ] Paket 2: API-Story Akzeptanzkriterien (3 Punkte) im Scope-Block ergaenzt.
- [ ] Paket 2: Review-Slot mit Backend + QA terminiert.

## Top-2 Handover Checklist (nach GO, 5-Minuten-Check)
- [ ] Paket 1: Kickoff-Termin-ID in PROJECT_STATUS.md eingetragen.
- [ ] Paket 1: Stream-Owner (Backend/Frontend/QA/Product) namentlich bestätigt.
- [ ] Paket 2: API-Story Scope (In/Out) von Backend + Product gegengezeichnet.
- [ ] Paket 2: Abnahmetermin im Kalender mit Ownern gesetzt.
- Ziel: Verhindert Lücken zwischen Plan-Fixierung und operativer Übergabe.


## Paket-2 Abnahmekriterien (Scope-Freeze, Micro)
- Scope-Dokument enthaelt exakt In/Out fuer die API-Story (keine offenen TODO-Platzhalter).
- Mindestens 1 Beispiel-Payload + 3 Fehlerfaelle sind dokumentiert (Validation/Timeout/Missing-Data).
- Freigabe durch Backend + QA ist mit Datum/Uhrzeit im Decision-Log referenziert.

## Day-1 Handover Check (Micro)
- Kickoff-Protokoll mit Termin-ID in PROJECT_STATUS.md verlinken.
- Owner-Handshake: Backend/Frontend/QA bestaetigen in 1 Sammelkommentar.
- Ziel: Nach GO ist innerhalb von 24h klar, dass die Top-2 Pakete operativ uebernommen wurden.

## Paket-1 Completion Checklist (Micro)
- Owner-Mapping final namentlich bestätigt (Backend/Frontend/QA/Product).
- Kickoff-Termin-ID in PROJECT_STATUS verlinkt.
- Sprint-0 Startsignal als GO-Decision-Log-Eintrag dokumentiert.

## Kickoff Input Checklist (15-Minuten Readiness)
- Repo-Link + Branching-Regel im Kickoff-Invite verlinkt.
- Owner je Stream (Backend/Frontend/QA/Product) mit Stellvertretung bestätigt.
- Paket-1 Deliverable als 1-Satz-Abnahmekriterium dokumentiert.
- Paket-2 API-Story Scope (In/Out) im Terminanhang verlinkt.
- Nächster Decision-Checkpoint (Datum/Uhrzeit) vorab gesetzt.

## Paket-1 Completion Criteria (Owner+Kickoff, Micro)
- Sprint-Owner je Stream (Backend/Frontend/QA/Product) namentlich gesetzt.
- Kickoff-Termin-ID im Dokument verlinkt.
- Day-1 KPI-Baseline-Verantwortung je Stream zugeordnet.

## Kickoff Invite-Set (Micro, nach GO)
- Pflichtteilnehmer: ceo-agent, backend-agent, frontend-agent, qa-agent.
- Ziel: Termin steht nur als "fix" wenn alle 4 Rollen eingeladen sind (Kalender-ID im Status loggen).

## Top-2 Day-1 Exit Criteria (Micro)
- Paket 1 gilt als Day-1 abgeschlossen, wenn Kickoff-Termin-ID dokumentiert und alle Stream-Owner (Backend/Frontend/QA/Product) eingetragen sind.
- Paket 2 gilt als Day-1 abgeschlossen, wenn Smart-Meter API-Story In/Out final signiert und ein Beispiel-Payload im Scope referenziert ist.
- Ziel: Nach GO ist innerhalb von 24h ein objektiv prüfbarer Fortschrittsnachweis vorhanden.

## GO-First-2 Acceptance (Micro)
- Paket 1 gilt als abgeschlossen, wenn Termin-ID des Kickoffs + benannte Stream-Owner im Startplan dokumentiert sind.
- Paket 2 gilt als abgeschlossen, wenn In/Out-Scope einmalig von Product/Backend gegengezeichnet und im Status verlinkt ist.

## GO-First-2 Dependency Check (Micro)
- Paket 1 darf nur als "ready" gelten, wenn Kickoff-Termin-ID + Kernteilnehmer (Backend/Frontend/QA/Product) dokumentiert sind.
- Paket 2 darf nur als "ready" gelten, wenn API-In/Out-Scope gegengezeichnet und ein Beispiel-Payload referenziert ist.
- Ziel: Startpakete nicht nur terminieren, sondern auch mit minimalen Abhaengigkeiten belastbar machen.
