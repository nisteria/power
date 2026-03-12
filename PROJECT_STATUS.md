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
