# PHASE2_KICKOFF_PREP.md

> Stand: 2026-03-12 21:11  
> Status: **Bereit für Kickoff** (nur Termin-ID + Namen fehlen)

---

## Kickoff-Details

| Feld | Wert | Status |
|------|------|--------|
| **Datum** | 2026-03-13 | ✅ fix |
| **Uhrzeit** | 12:00 Europe/Warsaw | ✅ fix |
| **Dauer** | 45 Minuten | ✅ fix |
| **Termin-ID** | _tbd_ (aus Kalender) | ⏳ |
| **Moderator** | _tbd_ | ⏳ |
| **Protokollführung** | _tbd_ | ⏳ |

---

## Agenda-Entwurf (3 Punkte)

1. **Top-2 Activation Pack bestätigen** (Paket 1+2 Scope + Termine)
2. **Top-3 Risiken mit Owner + Datum fixieren**
3. **Day-1 Exit Criteria beschließen**

### Agenda-Zeitverteilung
- 0-15 min: Punkt 1 (Scope + Termine)
- 15-30 min: Punkt 2 (Risiken + Owner)
- 30-45 min: Punkt 3 (Exit Criteria) + Wrap-up

---

## Teilnehmer-Liste (Platzhalter)

| Rolle | Name | Stellvertretung | Kanal |
|-------|------|-----------------|-------|
| CEO / Product | _tbd_ | _tbd_ | #power-product |
| Backend | _tbd_ | _tbd_ | #power-backend |
| Frontend | _tbd_ | _tbd_ | #power-frontend |
| QA | _tbd_ | _tbd_ | #power-qa |

---

## DoD-Checkliste (Definition of Done)

### Vor Kickoff (Pre-Flight)
- [ ] Termin-ID aus Kalender eingetragen
- [ ] Pflichtrollen eingeladen
- [ ] 3-Punkte-Agenda im Invite enthalten
- [ ] Link auf API_SPEC.md (Smart-Meter Block) im Invite

### Nach Kickoff (Evidence)
- [ ] Termin-ID in Protocol eingetragen
- [ ] Kein Pflicht-Owner mehr auf `_tbd_`
- [ ] 3 Top-Risiken mit Ownern dokumentiert
- [ ] Decision-Outcome + Checkpoint ausgefuellt
- [ ] Referenz in PROJECT_STATUS.md eingetragen

---

## Day-1 Exit Criteria Vorschlag

| Stream | Deliverable | Erfolgskriterium | Deadline |
|--------|-------------|------------------|----------|
| Backend | Erste API-Endpoint-Skizze | `/api/v1/meter/{id}/consumption` Mock liefert JSON | 17:00 |
| Frontend | Wireframe Dashboard-Startseite | Figma/HTML-Prototyp mit Batterie-Symbol + aktuellem Verbrauch | 17:00 |
| QA | Testfall-Mapping TC-01..TC-10 | Jeder TC hat einen Verantwortlichen + Ausführungsdatum | 17:00 |
| Product | Scope-Confirmation | Paket-2 APIs schriftlich abgenommen (Ja/Nein + Kommentar) | 17:00 |

---

## Paket-2 Übergabeanker (für Scope-Review)

- **Referenz:** `API_SPEC.md` (Smart-Meter API Story v0.1)
- **Vorgeschlagener Slot:** 2026-03-14 16:00 (20 Min)
- **Teilnehmer:** Backend + QA + Product
- **QA-Status:** TC-27..TC-43 complete

---

## Vorbereitete Einladung (Copy/Paste)

**Betreff:** Phase-2 Paket-1 Kickoff — Morgen 12:00 — Stream-Owner & Top-3 Risiken

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

---

## Blocker / Offene Punkte

| Blocker | Workaround | Status |
|---------|------------|--------|
| Echte Termin-ID fehlt | Im Kickoff nachtragen, 24h Zeit für echte ID | ⏳ |
| Stream-Owner Namen fehlen | Im Kickoff final besetzen | ⏳ |

---

## Verknüpfte Dokumente

- `PHASE2_KICKOFF_PROTOCOL_TEMPLATE.md` - Vollständiges Protokoll-Template
- `KICKOFF_PREFLIGHT_CHECKLIST.md` - Pre-Flight Check
- `PROJECT_STATUS.md` - Status-Referenz
- `PROJECT_TODO.md` - Aufgaben-Tracker
