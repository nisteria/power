# PHASE2_KICKOFF_PROTOCOL_TEMPLATE.md

Status: Arbeitsvorlage fuer Paket 1 (Owner+Kickoff) nach GO

## Meta
- Kickoff-Termin-ID: _tbd_
- Datum/Uhrzeit: _tbd_
- Dauer: 45 Minuten
- Moderator: _tbd_
- Protokollfuehrung: _tbd_

## Teilnehmer (Pflichtrollen)
- ceo-agent: _Name tbd_
- backend-agent: _Name tbd_
- frontend-agent: _Name tbd_
- qa-agent: _Name tbd_
- product/delivery: _Name tbd_

## Stream-Owner (namentlich + Stellvertretung)
- Backend Owner: _tbd_ | Stellvertretung: _tbd_ | Kanal: _tbd_
- Frontend Owner: _tbd_ | Stellvertretung: _tbd_ | Kanal: _tbd_
- QA Owner: _tbd_ | Stellvertretung: _tbd_ | Kanal: _tbd_
- Product/Delivery Owner: _tbd_ | Stellvertretung: _tbd_ | Kanal: _tbd_

## Agenda (3 Punkte)
1. Top-2 Activation Pack bestaetigen (Paket 1/2 Scope + Termine)
2. Risiken Top-3 mit Owner + naechstem Termin festlegen
3. Day-1 Exit Criteria und Decision-Checkpoint fixieren

## Entscheidungslog
- Outcome: GO | GO+Auflage | HOLD
- Begruendung (1 Satz): _tbd_
- Naechster Decision-Checkpoint (Datum/Uhrzeit): _tbd_

## Paket-1 Abnahme (DoD-Nachweis)
- [ ] Kickoff-Termin-ID ist gesetzt und in `PROJECT_STATUS.md` referenziert.
- [ ] Stream-Owner sind namentlich inkl. Stellvertretung gesetzt.
- [ ] Top-3 Risiken sind mit Owner + Datum dokumentiert.

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

## Paket-1 Evidence Prep v0.2 (2026-03-12 15:38 Europe/Warsaw)
### Vorgefuellte Owner-Zuordnung (zur schnellen Finalisierung im Kickoff)
- Backend Owner: **backend-agent** | Stellvertretung: **glm-coding-agent** | Kanal: `#power-backend`
- Frontend Owner: **frontend-agent** | Stellvertretung: **gemini-coding-agent** | Kanal: `#power-frontend`
- QA Owner: **qa-agent** | Stellvertretung: **assistant-agent** | Kanal: `#power-qa`
- Product/Delivery Owner: **ceo-agent** | Stellvertretung: **main-agent** | Kanal: `#power-product`

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
