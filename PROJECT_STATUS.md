# PROJECT_STATUS.md

## Projekt
- Name: Power
- Standort: Österreich
- Positionierung: Made-in-Austria Energy Orchestrator

## Ampelstatus
- Product: 🟡 Konzeption
- Tech: 🟡 Repository Setup
- Regulatory: 🟡 Vorprüfung
- Go-To-Market: 🟡 Partneraufbau
- Funding: 🟡 Förder-Scouting

## Fokus diese Woche
1. Regulatorische Produktgrenze (EMS vs. Lieferant) final schriftlich fixieren
2. MVP-Scope v1 (Battery + Wallbox + Tarif-Engine) technisch einfrieren
3. Förderfähigkeits-Matrix + Unterlagenfahrplan für AT-Programme erstellen
4. ICP + Value Proposition auf 2 Kernsegmente zuspitzen

## Risiken
- Regulatorische Abgrenzung zwischen EMS-Plattform vs. Stromlieferant
- Hardware-Lieferkette und Zertifizierungsaufwand
- Integrationskomplexität bei heterogenen Geräten

## Kurzes Update (2026-03-12, 12:51)
- Funding-Workplan erstellt: `FUNDING_WORKPLAN.md` mit Förderfähigkeits-Matrix für aws/FFG, Prioritäten (A/B/C), Timing (Q2–Q4 2026), Unterlagenliste und nächstem Schritt je Programm.
- Priorisierte Einreichungslogik festgelegt: Q2 (Preseed+FFG), Q3 (Seedfinancing+Fertigungsüberleitung), Q4 (ERP-Darlehen).
- Nächste Engpässe bleiben: regulatorische Finalabgrenzung und technischer MVP-Scope-Freeze.

## Phase-1 Update — EcoFlow Wettbewerbsanalyse (strukturiert)
- **Historie:** Früher Markteintritt über portable Power Stations, danach Ausbau Richtung Home-Energy-Ökosystem.
- **Funding:** Stark finanzierter Scale-up-Ansatz ermöglicht schnelle Produktzyklen und aggressive Marktabdeckung.
- **Produktstrategie:** Hardware-first (Speicher/Power Stations) plus Ökosystem-Erweiterung (Solar, Smart Home, App-Layer).
- **Lücken/Chancen für Power (AT):**
  - Lokale Differenzierung „Made in Austria" + regionale Partnernetzwerke
  - Fokus auf orchestrierte EMS-Logik statt reiner Geräteverkauf
  - Klare regulatorische Positionierung und transparente Tarifschnittstellen als Vertrauenshebel
  - Vertical MVP (Battery + Wallbox + Tarif-Engine) mit messbarer Einspar-Story für AT-Haushalte/KMU

## 15-Minuten-Loop Update (2026-03-12 12:14 Europe/Warsaw)
- **Priorität A (jetzt):** Regulatory Boundary + MVP Scope Freeze + Funding-Workplan als kritischer Pfad für Q2.
- **Priorität B (als Nächstes):** ICP/Value Proposition verdichten und GTM-Hypothesen darauf ausrichten.
- **Delegation / Output-Status:**
  - ✅ finance-agent → `FUNDING_WORKPLAN.md` geliefert (Förderfähigkeits-Matrix, Timing, Unterlagen)
  - ✅ backend-agent → `TECH_MVP_SCOPE_V1.md` geliefert (In/Out Scope, Architektur, 8 Milestones, Risiken)
  - ✅ qa-agent → `QA_MVP_ACCEPTANCE.md` geliefert (Abnahmekriterien, 12 Testfälle, Pilot Go/No-Go)
- **Nächste konkrete Aktionen (bis zum nächsten Loop):**
  1. Eingang der 3 delegierten Deliverables prüfen und auf Konsistenz zusammenführen.
  2. Aus Regulatory + Tech Scope eine verbindliche MVP-Definition (v1.0) in `PROJECT_STATUS.md` nachziehen.
  3. 2 ICP-Kernsegmente mit je 1 quantifizierter Einspar-Story festlegen (Haushalt/KMU).

## Phase-1 Update — ICP Snapshot
- ICP_SNAPSHOT.md v0.1 angelegt (Primär/sekundär + Early-Adopter Kriterien).

## Phase-1 Micro-Update — ICP Draft (AT)
- Primäres Segment bestätigt: Haushalte mit PV + Heimspeicher + dynamischem Tarifinteresse.
- Sekundäres Segment: KMU mit Lastspitzen und planbarer Lastverschiebung.
- Nächster Schritt: Nutzenversprechen je Segment quantifizieren (€/Monat, Autarkie, Komfort).

### Keepalive-Update 2026-03-12 13:26:31
- MVP Fokus bestätigt: Phase 1 bleibt aktiv bis alle Strategy-TODOs abgeschlossen sind.
- Nächster konkreter Schritt: ICP-Definition (Haushalt vs. KMU) final textlich ausarbeiten.

## Phase-1 Micro-Update — ICP Finalisierung (2026-03-12 13:27)
- `ICP_SNAPSHOT.md` auf v1.0 angehoben und um Buying Trigger für Haushalt/KMU ergänzt.
- Early-Adopter-Kriterien präzisiert (Smart Meter, dynamischer Tarif, ≥2 steuerbare Assets).
- Disqualifier definiert, damit GTM-Fokus sauber bleibt.
- Ergebnis: ICP-Task in `PROJECT_TODO.md` als erledigt markiert.

## Phase-1 Micro-Update — ICP Drafting Fortschritt
- Haushalts-ICP und KMU-ICP als nächste priorisierte Entscheidungsfrage festgelegt.
- Entscheidungsvorbereitung: Fokus zuerst auf Haushalte mit PV+Speicher + dynamischem Tarif.

## Phase-1 Micro-Update — Value Proposition Draft (2026-03-12 13:30)
- `VALUE_PROPOSITION_AT.md` v0.1 erstellt (Haushalt/KMU Nutzenversprechen + Made-in-Austria Differenzierung).
- Struktur für Quantifizierung je Segment vorbereitet (v0.2 mit Einsparmetriken).

## Phase-1 Micro-Update — Value Proposition Quantified (2026-03-12 13:29)
- `VALUE_PROPOSITION_AT.md` auf v0.2 erweitert: Referenzprofile für Haushalt und KMU mit Einspar-Bandbreiten ergänzt.
- Haushalt-Hypothese ergänzt: 30–70 €/Monat, Autarkie +8 bis +18 pp (profil-/saisonabhängig).
- KMU-Hypothese ergänzt: Peak-Reduktion 10–25 %, Einsparung 120–450 €/Monat.
- Ergebnis: Value-Proposition-Task in `PROJECT_TODO.md` als erledigt markiert.


## Phase-1 Micro-Update — GTM Hypothesen v1 (2026-03-12 13:31)
- Neues Artefakt erstellt: `GTM_HYPOTHESES_AT.md`.
- Vier testbare GTM-Hypothesen definiert (Partnerkanal, Einspar-Story, KMU-Peak-Shaving, Compliance-Differenzierung).
- Messkriterien + 2-Wochen-Validierungsplan ergänzt, damit Phase 2 datenbasiert starten kann.
- Ergebnis: GTM-Task in `PROJECT_TODO.md` als erledigt markiert.

## Phase-1 Micro-Update — Regulatory Finalisierung (2026-03-12 13:34:08)
- REGULATORY_AT.md auf Finalfassung v1.0 ergänzt (Kurzform für Website/Sales + Vertrag/AGB).
- "Darf/Darf nicht"-Abgrenzung durch standardisierbare Formulierungen für externe Kommunikation abgesichert.
- Open-Items für juristischen Final-Review als klare Checkliste ergänzt.
- Ergebnis: Regulatory-Task in PROJECT_TODO.md als erledigt markiert.

## Phase-1 Abschluss-Gate (2026-03-12 13:35)
- Stop-Regel geprüft: Alle TODOs der aktiven Phase 1 sind erledigt.
- Ergebnis in PROJECT_STATUS konsolidiert; Projekt ist bereit für Freigabeentscheidung zu Phase 2.
- Nächster Schritt: Lech um explizite Freigabe für Start von Phase 2 bitten (noch nicht starten).

## Freigabe-Vorlage vorbereitet (2026-03-12 13:36)
- Entscheidungsfrage an Lech vorbereitet: „Phase 2 (MVP Build & Pilotfähigkeit) jetzt freigeben?“
- Guardrail festgehalten: Ohne explizite Freigabe keine Phase-2-Umsetzung.
- Bei Freigabe: erster Schritt ist nur ein Phase-2-Startplan mit Milestones, keine parallelen Build-Starts.

## Phase-2 Prep Micro-Update (2026-03-12 13:37)
- `PHASE2_STARTPLAN_TEMPLATE.md` als freigabefähige Startvorlage angelegt (Milestones, Risiken, GO-Check).
- Guardrail bleibt aktiv: Dokument ist Vorbereitung, keine Umsetzung ohne explizite Freigabe.

## Phase-2 Prep Micro-Update (2026-03-12 13:45)
- `PHASE2_STARTPLAN_TEMPLATE.md` um „GO-Decision Inputs (60-Sekunden-Check)" ergänzt.
- Pflichtsignale vor GO konkretisiert: Owner benannt, Kickoff datiert, Legal-Review terminiert.
- Wirkung: Freigabeentscheidung ist schneller und konsistenter, ohne neue Phase-2-Umsetzung zu starten.

## Phase-2 Prep Micro-Update (2026-03-12 13:48:20)
- PHASE2_STARTPLAN_TEMPLATE.md um Abschnitt „HOLD-Modus (wenn kein GO in 7 Tagen)“ ergänzt.
- Klarstellung: Bei ausbleibender Freigabe bleibt Scope eingefroren; nur Entblockungsarbeit für A/B/C-Signale.
- Wirkung: Entscheidungsstau wird reduziert, ohne Phase-2-Umsetzung vorzeitig zu starten.

## Phase-2 Prep Micro-Update (2026-03-12 13:50:23)
- `PHASE2_STARTPLAN_TEMPLATE.md` um „Pre-GO Evidence Pack (90-Sekunden-Check)“ erweitert.
- Fokus: vor Freigabe vier harte Nachweise bündeln (Owner, Kickoff, Legal-Termin, Go/No-Go-Protokoll).
- Wirkung: GO-Entscheidung wird auditierbar und weniger anfällig für implizite Annahmen.

## Phase-2 Prep Micro-Update (2026-03-12 13:52:23)
- PHASE2_STARTPLAN_TEMPLATE.md um Abschnitt „Decision-SLA nach Freigabeanfrage (Governance)“ erweitert.
- Regel ergänzt: GO/HOLD-Entscheidung innerhalb 24h oder datierter Re-Decision-Termin; sonst HOLD mit Blocker-Log.
- Wirkung: Weniger Entscheidungsdrift, klare Governance ohne vorzeitige Phase-2-Umsetzung.

## Phase-2 Prep Micro-Update (2026-03-12 13:53:23)
- PHASE2_STARTPLAN_TEMPLATE.md um Abschnitt „Delegate-Absence Fallback“ ergänzt.
- Regel ergänzt: Bei Nicht-Erreichbarkeit des Decision-Owners greift Stellvertretung, sonst HOLD + Eskalationsnotiz.
- Wirkung: Governance bleibt handlungsfähig ohne vorzeitige Phase-2-Umsetzung.

## Phase-2 Prep Micro-Update (2026-03-12 13:54:23)
- PHASE2_STARTPLAN_TEMPLATE.md um Abschnitt „First-72h Kill-Switch (nach GO)“ ergänzt.
- Regel ergänzt: Bei P1-Risiko ohne Owner in den ersten 72h greift Scope-Freeze bis Risiko/Owner/Mitigation klar sind.
- Wirkung: Frühphase nach GO wird kontrollierter, ohne vorzeitige Ausweitung der Umsetzung.

## Phase-2 Priorisierung vorbereitet (2026-03-12 14:09:52)
- PROJECT_TODO.md um Sektion **"Phase 2 Priorisierung (bei GO)"** erweitert.
- Konkrete Reihenfolge fuer die ersten 5 Arbeitspakete nach Freigabe festgelegt: Owner/Kickoff, Smart-Meter Datenpfad, Tarif-Engine Scope-Freeze, Device-Flow, Monitoring-Minimum.
- Wirkung: Nach GO liegt ein sofort umsetzbarer Startfokus vor, ohne Guardrail "nicht starten ohne Freigabe" zu verletzen.

## GO-Execution Update (2026-03-12 14:13:40 Europe/Warsaw)
- GO von Lech ist erteilt; operative Konkretisierung der Top-2 Startpakete (Owner + Zieltermine) wurde angestoßen.
- Guardrail bleibt aktiv: nur Plan-Fixierung, keine unkontrollierte Scope-Ausweitung.
- Nächster Schritt: Startplan-Eintrag der Top-2 final gegenprüfen und als Source-of-Truth markieren.

## GO-Execution Update (2026-03-12 14:18 Europe/Warsaw)
- Top-2 aus der Phase-2-Priorisierung sind jetzt verbindlich im `PHASE2_STARTPLAN_TEMPLATE.md` eingetragen.
- Fixiert wurden:
  1. Paket 1 (Owner+Kickoff) — Owner: `ceo-agent`, Zieltermin: 2026-03-13 12:00.
  2. Paket 2 (Smart-Meter API-Story) — Owner: `backend-agent`, Zieltermin: 2026-03-14 16:00.
- Relevanz: Der GO-Übergang ist damit von "angestoßen" auf "operativ fixiert" gehoben; reduziert Anlaufverlust und Entscheidungsdrift in den ersten 48h nach Freigabe.


## GO-Execution Follow-up (2026-03-12 14:18 Europe/Warsaw)
- Micro-step: Top-2 Aktivierung gegen Startplan gegengeprueft (Owner+Termine vorhanden, In/Out fuer Paket 2 vorhanden).
- Relevanz: Verhindert Inkonsistenzen zwischen Freigabe-Entscheidung und operativer Sprint-0 Vorbereitung.
- Next: Namentliche Owner-Zuordnung im Kickoff finalisieren und Termin-ID im Status nachtragen.

## GO-Execution Micro-Update (2026-03-12 14:20 Europe/Warsaw)
- Tiny Progress: Reihenfolge fuer GO-First-2 validiert (Paket 1 zuerst Owner/Kickoff, danach Paket 2 Scope-Freeze).
- Relevanz: Reduziert Übergaberisiko zwischen den ersten 48h nach GO und haelt die Aktivierungslogik konsistent.

## GO-Execution Micro-Update (2026-03-12 14:22 Europe/Warsaw)
- Tiny step: Reihenfolge der naechsten 2 operativen Aktionen nach GO praezisiert.
  1) Paket 1: Kickoff-Termin-ID im Startplan dokumentieren.
  2) Paket 2: Smart-Meter API-Story Scope-Review als 20-Min Slot terminieren.
- Relevanz: Verhindert Leerlauf zwischen terminierter Planung und operativer Aktivierung.

## GO-Execution Micro-Update (2026-03-12 14:23 Europe/Warsaw)
- Tiny progress: Reihenfolge fuer die naechsten zwei operativen Checkpoints nach GO klargezogen: (1) Paket-1 Kickoff mit Termin-ID verifizieren, (2) Paket-2 In/Out-Abnahme protokollieren.
- Warum relevant: Sichert einen sauberen Uebergang von Plan-Fixierung zu kontrollierter Ausfuehrung ohne Entscheidungsdrift.


## GO-Execution Micro-Update (2026-03-12 14:25 Europe/Warsaw)
- Check ausgefuehrt: Top-2 Aktivierung bleibt konsistent (Owner-Rollen + Zieltermine im Startplan gesetzt).
- Relevanz: Reduziert Umsetzungsrisiko zwischen Freigabe und operativem Start; verhindert Re-Priorisierung im Kickoff.
- Offener Punkt: Owner auf Personenebene im Kickoff final eintragen.

## GO-Execution Micro-Update (2026-03-12 14:26 Europe/Warsaw)
- Paket 1 remains on track: Owner/Kickoff slot fixed for 2026-03-13 12:00.
- Paket 2 prep remains on track: Smart-Meter API scope freeze targeted for 2026-03-14 16:00.
- Relevanz: Verbindliche Termin-/Owner-Linie bleibt stabil und reduziert Re-Planning-Risiko bis Sprint-0.

## GO-Execution Micro-Update (2026-03-12 14:27 Europe/Warsaw)
- Top-2 Activation Pack bleibt verbindlich: Paket 1 (ceo-agent, 2026-03-13 12:00), Paket 2 (backend-agent, 2026-03-14 16:00).
- Ergänzung: Für Paket 1 ist das erwartete Ergebnis nun explizit als "Owner-Benennung je Stream + Kickoff mit Termin-ID" festgehalten.
- Relevanz: Erhöht Abnahme-Klarheit für den ersten GO-Tag ohne Scope-Erweiterung.

## GO-Execution Micro-Update (2026-03-12 14:30 Europe/Warsaw)
- Paket-1 Kickoff-Readiness präzisiert: Vor dem Kickoff müssen Termin-ID, Teilnehmerkreis (Backend/Frontend/QA/Product) und ein 3-Punkte-Agenda-Link im Startplan hinterlegt sein.
- Relevanz: Reduziert Last-Minute-Koordination und erhöht Wahrscheinlichkeit, dass der 12:00-Kickoff ohne Rework startet.

## GO-Execution Micro-Update (2026-03-12 14:31 Europe/Warsaw)
- Tiny step: Acceptance-Check fuer die Top-2 Aktivierung konkretisiert (Paket-1 Abschlussnachweis = Kickoff-Termin-ID + Owner-Liste; Paket-2 Abschlussnachweis = API-Story In/Out freigegeben).
- Relevanz: Macht den Uebergang von "terminiert" zu "nachweisbar abgeschlossen" messbar und reduziert Interpretationsspielraum im Sprint-0 Start.

## GO-Execution Micro-Update (2026-03-12 14:39 Europe/Warsaw)
- Tiny Progress: In PHASE2_STARTPLAN_TEMPLATE.md die Top-2-Fixierung auf Umsetzbarkeit gecheckt und den naechsten operativen Checkpoint praezisiert: **Kickoff-Termin-ID fuer Paket 1 im Startplan nachtragen**.
- Relevanz: Schiebt den Plan von "terminiert" zu "ausfuehrbar mit konkreter Terminreferenz" und reduziert Start-Unsicherheit im Day-0.

### Keepalive Micro-Update (2026-03-12 14:40 Europe/Warsaw)
- Tiny step: GO-Top-2 Startklarheit geprueft (Owner-Rollen + Zieltermine weiterhin konsistent in PHASE2_STARTPLAN_TEMPLATE).
- Relevanz: Verhindert stilles Driften nach GO und haelt den Startplan operativ belastbar.

## GO-Followup Micro-Update (2026-03-12 14:41 Europe/Warsaw)
- Top-2 Activation Pack bleibt verbindlich (Owner+Termin gesetzt); Fokus bis morgen 12:00 auf Paket-1 Kickoff-Execution.
- Relevanz: Verhindert Drift zwischen Plan-Fixierung und tatsächlichem Start (GO -> Day-1 Ausführung).

## GO-Execution Micro-Update (2026-03-12 14:49 Europe/Warsaw)
- Tiny progress: Paket-2 wurde inhaltlich konkretisiert: `API_SPEC.md` enthält jetzt eine **Smart-Meter API Story v0.1** mit In/Out-Scope, 2 Endpunkten, Beispiel-Request/-Response und 3 Pflicht-Fehlerfällen (Validation/Timeout/Duplicate).
- Relevanz: Der Scope-Freeze für Paket-2 ist von "nur Plan" auf "umsetzbare Schnittdefinition" gehoben; Backend/QA können auf derselben Spezifikation reviewen.
- Nächster Schritt: Backend+QA Scope-Review terminieren und die Gegenzeichnung (Datum/Uhrzeit) im Status als Paket-2-Abnahme referenzieren.

## GO-Execution Micro-Update (2026-03-12 14:52 Europe/Warsaw)
- Tiny progress: `API_SPEC.md` um einen **Scope-Review Sign-off Block (Paket 2)** erweitert (Mindestteilnehmer, 20-min Timebox, Pflichtfelder für Gegenzeichnung inkl. Ergebnis GO/GO+Auflage/HOLD).
- Relevanz: Die Paket-2-Abnahme ist jetzt nicht nur inhaltlich, sondern auch prozessual sauber auditierbar; reduziert Missverständnisse zwischen Backend/QA beim Scope-Freeze.
- Nächster Schritt: Review-Slot durchführen und den Sign-off Block mit realen Namen + Zeitstempel ausfüllen; Ergebnis danach in `PROJECT_STATUS.md` spiegeln.

## GO-Execution Micro-Update (2026-03-12 14:52 Europe/Warsaw)
- Top-2 Startpakete bleiben verbindlich priorisiert, aktuell ohne gemeldete neue Blocker.
- Fokus bleibt auf Paket-1 Kickoff-Operationalisierung (Termin-ID + Kernteam-Dokumentation).

## GO-Execution Micro-Update (2026-03-12 14:52 Europe/Warsaw)
- Neues Arbeitsartefakt angelegt: `PHASE2_KICKOFF_PROTOCOL_TEMPLATE.md` als ausfuellbare Vorlage fuer Paket 1 (Kickoff-Termin-ID, namentliche Stream-Owner inkl. Stellvertretung, 3-Punkte-Agenda, DoD-Checkboxen).
- Relevanz: Schiebt Paket 1 von "Checklisten-Absicht" auf "ausfuehrbares Kickoff-Protokoll" und reduziert Reibung beim Day-1 Nachweis in `PROJECT_STATUS.md`.
- Naechster Schritt: Vorlage mit realen Namen + Termin-ID fuellen und als Paket-1-Abnahme verlinken.

## GO-Followup Micro-Update (2026-03-12 14:53 Europe/Warsaw)
- Tiny step: Acceptance-Orientierung für GO-Top-2 nachgezogen (Fokus: evidenzbasierte Abnahme statt nur Termintracking).
- Relevanz: Hält Übergang von Plan zu messbarer Ausführung stabil und reduziert Interpretationsspielraum im Sprint-0-Start.

## GO-Execution Micro-Update (2026-03-12 14:54 Europe/Warsaw)
- Tiny progress: `API_SPEC.md` für Paket 2 um **DoR-Check (Definition of Ready)** ergänzt (Sign-off, Idempotenzregel, Zeitfensterregel, QA-Referenz der Qualitätsflags, Pflicht-Testfälle für 422/408/409).
- Zusätzlich ergänzt: **3 Open Questions vor Implementierung** (Payload-Grenze, Retry-Backoff bei 408, Raw-Data-Retention).
- Relevanz: Scope-Freeze ist jetzt nicht nur dokumentiert, sondern mit einem klaren Start-Gate für die Umsetzung operationalisiert.
- Nächster Schritt: Open Questions im 20-min Scope-Review entscheiden und im Sign-off-Block mit Ergebnis/Ownern festhalten.

## GO-Micro-Update (2026-03-12 14:55 Europe/Warsaw)
- Tiny Step: Acceptance-Fokus fuer Top-2 Startpakete konkretisiert (Paket-1 Kickoff-Nachweis + Paket-2 Scope-Gegenzeichnung als naechster harter Checkpoint).
- Relevanz: Haltet den Uebergang von "terminiert" zu "nachweisbar abgeschlossen" messbar und reduziert Drift in den ersten 24h.
