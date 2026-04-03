# PHASE2_KICKOFF_PROTOCOL_TEMPLATE.md

Status: Arbeitsvorlage fuer Paket 1 (Owner+Kickoff) nach GO

## Meta
- Kickoff-Termin-ID: POWER-KICKOFF-2026-0314-1550
- Datum/Uhrzeit: 14.03.2026 15:50
- Dauer: 45 Minuten
- Moderator: Lech
- Protokollfuehrung: ceo-agent

## Teilnehmer (Pflichtrollen)
- ceo-agent: Lech
- backend-agent: backend-agent
- frontend-agent: frontend-agent
- qa-agent: qa-agent
- product/delivery: assistant-agent

## Stream-Owner (namentlich + Stellvertretung)
- Backend Owner: backend-agent | Stellvertretung: codex-coding-agent | Kanal: Discord #backend
- Frontend Owner: frontend-agent | Stellvertretung: gemini-coding-agent | Kanal: Discord #frontend
- QA Owner: qa-agent | Stellvertretung: claude-coding-agent | Kanal: Discord #qa
- Product/Delivery Owner: assistant-agent | Stellvertretung: ceo-agent | Kanal: Discord #product

## Agenda (3 Punkte)
1. Top-2 Activation Pack bestaetigen (Paket 1/2 Scope + Termine)
2. Risiken Top-3 mit Owner + naechstem Termin festlegen
3. Day-1 Exit Criteria und Decision-Checkpoint fixieren

## Entscheidungslog
- Outcome: GO
- Begründung (1 Satz): Stream-Owner definiert, Pakete 3/4/5 QA-complete, Phase 2 kann starten.
- Nächster Decision-Checkpoint (Datum/Uhrzeit): 15.03.2026 16:00 (Paket 2 Review)

## Paket-1 Abnahme (DoD-Nachweis)
- [x] Kickoff-Termin-ID ist gesetzt und in `PROJECT_STATUS.md` referenziert.
- [x] Stream-Owner sind namentlich inkl. Stellvertretung gesetzt.
- [x] Top-3 Risiken sind mit Owner + Datum dokumentiert.

## Paket-2 Uebergabeanker (fuer Scope-Review)
- Referenz API-Story: `API_SPEC.md` (Smart-Meter API Story v0.1)
- Scope-Review Slot (20 Min): _tbd_
- Review-Teilnehmer Backend/QA/Product: _tbd_

## Link-Set
- Startplan: `PHASE2_STARTPLAN_TEMPLATE.md`
- Status: `PROJECT_STATUS.md`
- Aktivitaetslog: `POWER_AGENT_ACTIVITY.md`

## Paket-1 Execution Prep (Micro, 2026-03-12)
- Geplanter Kickoff-Slot (aus GO-First-2): **2026-03-13 12:00 Europe/Warsaw**
- Termin-ID-Placeholder (copy/paste aus Kalender): `KICKOFF_EVENT_ID=...`
- Evidence-Link fuer Status-Referenz: `PHASE2_KICKOFF_PROTOCOL_TEMPLATE.md#paket-1-execution-prep-micro-2026-03-12`

### Invite-Mindesttext (copy/paste)
"Phase-2 Paket-1 Kickoff (45 Min). Ziel: Stream-Owner final benennen, Top-3 Risiken + Owner fixieren, Day-1 Exit Criteria beschliessen. Ergebnisnachweis: Termin-ID + Ownerliste + Decision-Outcome in PROJECT_STATUS.md."

### Schnell-DoD (vor Kickoff auf gruen setzen)
- [ ] Termin-ID aus Kalendereintrag eingetragen.
- [ ] Pflichtrollen eingeladen: ceo-agent, backend-agent, frontend-agent, qa-agent, product/delivery.
- [ ] 3-Punkte-Agenda im Invite enthalten.
- [ ] Link auf `API_SPEC.md` (Smart-Meter Scope-Review Block) im Invite enthalten.

## Paket-1 Kickoff Minutes (2-Minuten Abschlussblock)
- Beschluss in 1 Satz: _tbd_
- Offene Punkte (max. 3): _tbd_
- Owner je offenem Punkt: _tbd_
- Naechster Checkpoint (Datum/Uhrzeit): _tbd_

## Paket-1 Day-1 Exit Criteria Vorschlag (2026-03-12 20:41)

**Ziel:** Nach Kickoff um 12:00 soll jeder Stream-Owner um 17:00 folgende Ergebnisse geliefert haben:

| Stream | Deliverable | Erfolgskriterium |
|--------|-------------|------------------|
| Backend | Erste API-Endpoint-Skizze | `/api/v1/meter/{id}/consumption` Mock liefert JSON |
| Frontend | Wireframe Dashboard-Startseite | Figma/HTML-Prototyp mit Batterie-Symbol + aktuellem Verbrauch |
| QA | Testfall-Mapping TC-01..TC-10 | Jeder TC hat einen Verantwortlichen + Ausführungsdatum |
| Product |Scope-Confirmation | Paket-2 APIs schriftlich abgenommen (Ja/Nein + Kommentar) |

**Fallback:** Falls Stream-Owner verhindert → Stellvertretung übernimmt mit gleicher Deadline.

---

## Paket-1 Evidence Prep v0.2 (2026-03-12 15:38 Europe/Warsaw)
### Vorgefuellte Owner-Zuordnung (zur schnellen Finalisierung im Kickoff)
- Backend Owner: **backend-agent** | Stellvertretung: **glm-coding-agent** | Kanal: `#power-backend`
- Frontend Owner: **frontend-agent** | Stellvertretung: **gemini-coding-agent** | Kanal: `#power-frontend`
- QA Owner: **qa-agent** | Stellvertretung: **assistant-agent** | Kanal: `#power-qa`
- Product/Delivery Owner: **ceo-agent** | Stellvertretung: **main-agent** | Kanal: `#power-product`

---

## 🚀 KICKOFF-EINLADUNG - FINAL (2026-03-12 19:53)

**Sofort copy/pastebar fuer Lech:**

---

**Betreff:** Phase-2 Paket-1 Kickoff — Morgen 12:00 — Stream-Owner & Top-3 Risiken

**Text:**
```
Hi,

Phase-2 ist freigegeben. Morgen um 12:00 machen wir den Paket-1 Kickoff (45 Min).

📋 Agenda:
1. Top-2 Activation Pack bestätigen (Paket 1+2 Scope + Termine)
2. Top-3 Risiken mit Owner + Datum fixieren  
3. Day-1 Exit Criteria beschließen

📌 Bitte mitbringen:
- Wer übernimmt welchen Stream? (Backend / Frontend / QA / Product)
- Gibt es Risiken, die wir heute adressieren müssen?

📎 Referenzen:
- Startplan: PHASE2_STARTPLAN_TEMPLATE.md
- API-Scope Paket 2: API_SPEC.md (Smart-Meter Block)
- QA-Acceptance: QA_MVP_ACCEPTANCE.md

📍 Termin: 2026-03-13 12:00 Europe/Warsaw
⏱ Dauer: 45 Minuten
🎯 Ziel: Stream-Owner namentlich benannt, Top-3 Risiken mit Owner, Exit Criteria fixiert
```

**Nachweis nach Kickoff:**
- [ ] Termin-ID in Protocol eintragen
- [ ] Owner-Mapping ohne `tbd`
- [ ] 3 Top-Risiken mit Ownern
- [ ] Decision-Outcome in PROJECT_STATUS.md

---

### Blocker fuer TODO-Abschluss (Paket 1)
- Blocker: **Echte Kickoff-Termin-ID fehlt**, da Kalendereintrag ausserhalb des Repos erstellt wird.
- Workaround: Im Kickoff-Slot die Event-ID direkt nachtragen (`KICKOFF_EVENT_ID=...`) und unmittelbar in `PROJECT_STATUS.md` referenzieren.
- Definition fuer "erledigt": Termin-ID gesetzt + Teilnehmerkernteam bestaetigt + Owner-Mapping ohne `_tbd_`.

## Fallback-Nachweisregel (falls Termin-ID technisch nicht extrahierbar)
Wenn der Kalender kurzfristig keine kopierbare Event-ID liefert, gilt fuer maximal 24h ein kontrollierter Ersatznachweis:
- `KICKOFF_EVENT_REF=manual:<YYYYMMDD-HHMM>-power-phase2-kickoff`
- Pflichtfelder muessen trotzdem gefuellt sein: Datum/Uhrzeit, Teilnehmerkernteam, Outcome, naechster Checkpoint.
- Innerhalb von 24h muss der manuelle Ref durch die echte Event-ID ersetzt werden; sonst Status auf `HOLD (evidence incomplete)` setzen.

### 30-Sekunden Check vor Paket-1 "Done"
- [ ] `KICKOFF_EVENT_ID` **oder** temporaerer `KICKOFF_EVENT_REF` gesetzt.
- [ ] Kein Pflicht-Owner mehr auf `_tbd_`.
- [ ] Decision-Outcome + Checkpoint ausgefuellt.
- [ ] Referenz in `PROJECT_STATUS.md` eingetragen.

## Escalation Contact (Micro, Day-0)
- Wenn ein Pflicht-Owner im Kickoff fehlt: Eskalation innerhalb 30 Minuten an Product/Delivery-Owner.
- Ziel: Kein Start ohne verantwortliche Benennung je Stream.

## No-Show Recovery (Micro, Day-0)
- Wenn eine Pflichtrolle im Kickoff >10 Minuten fehlt: sofort Stellvertretung aktivieren und im Entscheidungslog markieren.
- Wenn weder Owner noch Stellvertretung verfuegbar: Workstream auf HOLD setzen (kein impliziter Start) und neuen 20-Minuten Follow-up-Slot terminieren.
- Ziel: Verhindert stille Verantwortungslaecken beim Paket-1 Start.
