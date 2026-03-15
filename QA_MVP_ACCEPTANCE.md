# QA_MVP_ACCEPTANCE.md

## Zweck & Scope (MVP Abnahme)
Dieser Rahmen definiert die QA-/Abnahmebedingungen für den **MVP Live (Q3 2026)** in Österreich.

**In Scope (aus ROADMAP + Regulatory):**
- Web Onboarding live
- Device-Steuerung für 2 Gerätetypen (**Battery**, **Wallbox**)
- Tarif-Engine v1 (Day-Ahead Optimierung) mit 2 dynamischen Tarifen (AT)
- First-party Monitoring + Alerting
- Pilotbetrieb mit 20 Kunden in Österreich

**Regulatorische Leitplanke (REGULATORY_AT):**
Power agiert als Energie-Management-/Steuerungsplattform, **nicht** als Stromlieferant. Stromvertrag bleibt beim Kunden.

---

## 1) Abnahmekriterien

## 1.1 Funktional
1. **Onboarding Ende-zu-Ende:** Kunde kann Account anlegen, Standort erfassen, Tarif wählen, Geräte koppeln und Regeln speichern.
2. **Tarifintegration (2 AT-Tarife):** Tarifdaten werden täglich korrekt importiert und versioniert.
3. **Day-Ahead Optimierung:** Für den Folgetag wird ein valider Fahrplan pro Standort erzeugt.
4. **Device-Steuerung Battery:** Lade-/Entladebefehle werden korrekt und nachvollziehbar ausgeführt.
5. **Device-Steuerung Wallbox:** Ladefenster und Leistungsfreigabe werden gemäß Optimierungsplan gesetzt.
6. **Fallback-Betrieb:** Bei Ausfall externer Daten oder Device-Verbindung bleibt ein sicherer Defaultbetrieb aktiv.
7. **Auditierbarkeit:** Jede automatische oder manuelle Steuerentscheidung ist mit Zeitstempel, Quelle und Ergebnis protokolliert.

## 1.2 Sicherheit
1. **Zugriffsschutz:** Rollen- und Rechtekonzept verhindert unbefugte Aktionen (mind. Kunde vs. Admin/Support).
2. **Transportschutz:** Alle externen API- und UI-Verbindungen via TLS.
3. **Secrets-Handling:** Keine Klartext-Secrets in Logs oder UI; Schlüsselrotation dokumentiert.
4. **Command Safety:** Nur whitelisted Kommandos/Parameter für Battery/Wallbox, harte Grenzen gegen unsichere Sollwerte.
5. **Incident-Reaktion:** Kritische Sicherheits- oder Betriebsvorfälle erzeugen Alarm und Runbook-Schritt.

## 1.3 Observability
1. **Monitoring-Abdeckung:** Kernpfade (Onboarding, Tarifimport, Optimierung, Device Dispatch, Alerts) sind metrisch erfasst.
2. **Alerting-Wirksamkeit:** Alarme für Datenstau, Optimierungsfehler, Command-Failures, erhöhte Latenz.
3. **SLO-Basis MVP:**
   - Tarifimport für Folgetag bis definiertem Cutoff erfolgreich: **>= 99%**
   - Erfolgreich zugestellte Device-Kommandos: **>= 98%**
   - Kritische Alarme mit Erstreaktion (Ack) innerhalb **15 Minuten** (Betriebszeitfenster)
4. **Diagnosefähigkeit:** Dashboard/Logs erlauben Root-Cause in < 30 Minuten für P1/P2.

## 1.4 Datenschutz (DSGVO-orientiert)
1. **Datenminimierung:** Nur für Optimierung/Betrieb erforderliche Smart-Meter-/Verbrauchsdaten werden verarbeitet.
2. **Zweckbindung & Transparenz:** Onboarding enthält klare Information, dass Power Software-Service ist (keine Energielieferung).
3. **Einwilligung/Vertragsgrundlage:** Verarbeitung hat dokumentierte Rechtsgrundlage.
4. **Betroffenenrechte-Prozess:** Export/Löschung/Korrektur innerhalb definierter Fristen testbar.
5. **Speicher- & Löschkonzept:** Aufbewahrungsfristen und Löschjobs sind implementiert und überprüfbar.

---

## 2) Konkrete Testfälle (12) - Given / When / Then

### TC-01 Onboarding Happy Path
**Given** ein neuer Kunde ohne Account
**When** der Kunde Registrierung, Standortanlage, Tarifauswahl und Gerätekopplung abschließt
**Then** wird der Standort als "aktiv" markiert und ist für Optimierung eingeplant.

### TC-02 Onboarding Pflichtangaben & Validierung
**Given** ein Kunde im Onboarding
**When** Pflichtfelder (z. B. Zählpunkt-/Standortdaten) fehlen oder ungültig sind
**Then** verhindert das System den Abschluss und zeigt konkrete Validierungsfehler.

### TC-03 Tarifimport Erfolgreich (2 dynamische Tarife)
**Given** beide AT-Tarifquellen sind erreichbar
**When** der tägliche Importjob läuft
**Then** werden Preise für den Folgetag vollständig gespeichert und als "gültig" markiert.

### TC-04 Tarifimport Fallback bei Ausfall
**Given** eine Tarifquelle ist temporär nicht verfügbar
**When** der Importjob läuft
**Then** wird ein Alert erzeugt, der letzte valide Datensatz/fallback-Strategie angewendet und kein fehlerhafter Plan publiziert.

### TC-05 Day-Ahead Optimierungsergebnis
**Given** valide Tarif-, Geräte- und Nutzerregel-Daten
**When** die Tarif-Engine v1 den Tagesplan berechnet
**Then** entsteht ein konfliktfreier Fahrplan, der harte Gerätegrenzen und Nutzerregeln einhält.

### TC-06 Battery Dispatch korrekt
**Given** ein aktiver Battery-Standort mit geplantem Ladefenster
**When** die Dispatch-Zeit erreicht ist
**Then** wird genau der erwartete Lade-/Entladebefehl gesendet und als erfolgreich quittiert/protokolliert.

### TC-07 Wallbox Dispatch korrekt
**Given** ein aktiver Wallbox-Standort mit geplantem Ladefenster
**When** die Dispatch-Zeit erreicht ist
**Then** werden Freigabe und Leistungslimit korrekt gesetzt und der Status im Monitoring aktualisiert.

### TC-08 Safety Guardrails bei unsicheren Werten
**Given** ein Steuerkommando mit Wert außerhalb definierter Sicherheitsgrenzen
**When** das Kommando validiert wird
**Then** wird es blockiert, als Sicherheitsereignis geloggt und ein Alert ausgelöst.

### TC-09 Rollen/Rechte gegen unbefugte Steuerung
**Given** ein Benutzer ohne Steuerberechtigung
**When** er versucht, ein manuelles Device-Kommando auszulösen
**Then** wird der Zugriff verweigert (HTTP/UI Fehler "forbidden") und revisionssicher protokolliert.

### TC-10 Observability: Alerting & Ack
**Given** ein simuliertes Command-Failure-Event
**When** das Event im Monitoring eingeht
**Then** wird innerhalb des definierten Fensters ein Alarm erstellt und vom Betriebsteam quittiert.

### TC-11 Datenschutz: Datenauskunft (Export)
**Given** ein Kunde stellt Auskunftsanfrage
**When** der Exportprozess gestartet wird
**Then** erhält der Kunde einen vollständigen, strukturierten Export seiner personenbezogenen/verhaltensbezogenen Daten.

### TC-12 Datenschutz: Löschung/Deaktivierung
**Given** ein Kunde kündigt den Service bzw. fordert Löschung
**When** der Löschworkflow ausgeführt wird
**Then** werden personenbezogene Daten gemäß Löschkonzept entfernt/anonymisiert und die Steuerung am Standort deaktiviert.

---

## 3) Go/No-Go Checkliste für Pilot (20 Kunden)

## A. Funktionaler Reifegrad
- [ ] E2E Onboarding in Staging + Prod mit realistischen Daten bestanden
- [ ] Battery- und Wallbox-Steuerung in Feldtest stabil (kein P1-Sicherheitsvorfall)
- [ ] Tarif-Engine v1 liefert täglich verwertbare Day-Ahead-Pläne
- [ ] Fallback-Verhalten bei Daten-/Geräteausfällen erfolgreich getestet

## B. Sicherheit & Betrieb
- [ ] Rollen-/Rechtekonzept abgenommen
- [ ] TLS/Secrets/Logging-Checks ohne kritische Findings
- [ ] Runbooks für P1/P2 Incident vorhanden und geübt
- [ ] On-Call/Ack-Prozess für kritische Alerts steht (inkl. Eskalationskette)

## C. Observability
- [ ] Dashboards für Kernmetriken live
- [ ] Alarme für Import, Optimierung, Dispatch, API-Latenz, Datenstau konfiguriert
- [ ] Mindestens 2 Last-/Stabilitätstests ohne kritischen Ausfall absolviert
- [ ] Nachweis, dass P1/P2 in <30 Minuten diagnostizierbar sind

## D. Datenschutz & Regulatory Fit (AT)
- [ ] Vertrags-/Onboarding-Texte trennen klar Software-Service vs. Energielieferung
- [ ] Rechtsgrundlage + Datenschutzhinweise dokumentiert und freigegeben
- [ ] Prozesse für Auskunft, Löschung, Korrektur sind operativ testbestanden
- [ ] Datenminimierung, Aufbewahrung, Löschfristen technisch umgesetzt

## E. Pilot-Readiness (20 Kunden)
- [ ] 20 geeignete Pilotkunden identifiziert und eingeplant
- [ ] Qualifizierte Elektro-Partner für Installationen bestätigt
- [ ] Supportkanal + SLA-Light für Pilot kommuniziert
- [ ] Rollout in Wellen (z. B. 5/5/10) inkl. Stop-Kriterien definiert
- [ ] Erfolgskriterien Pilot festgelegt (z. B. Aktivierungsrate, Command Success, NPS/Feedback)

## Go/No-Go Entscheidung
**GO**, wenn:
- keine offenen kritischen Security-/Safety-Findings,
- alle 12 Testfälle bestanden oder mit akzeptiertem, terminiertem Mitigationsplan,
- Monitoring/Alerting + Incident-Prozess nachweislich funktionieren,
- regulatorische Leitplanke (kein Lieferantenauftritt) in Produkt/Vertrag/Kommunikation konsistent eingehalten ist.

**NO-GO**, wenn mindestens einer der Punkte zutrifft:
- ungeklärte P1-Sicherheits-/Datenschutzlücke,
- wiederholte Fehlsteuerung ohne verlässlichen Fallback,
- fehlende Alarmierung bei kritischen Pfaden,
- regulatorische Unklarheit in Kundenvertrag oder Außendarstellung.

---

## Phase-2 Ergänzung (GO-Umsetzung) - Tarif-Engine Slice v0.1
Referenz: `API_SPEC.md` → "Phase-2 API Story Slice - Tarif-Engine Scope-Freeze v0.1".

### Zusätzliche Acceptance-Regel (Paket 3)
- Prioritätsregel muss im Verhalten nachweisbar greifen: **Safety > Contract > Cost**.

### Reproduzierbare Zusatztestfälle (Tarif-Engine)
Referenz-Mapping auf API-Beispiele: `TC-TAR-OK-01`, `TC-TAR-422-01`, `TC-TAR-409-01`, `TC-TAR-400-01` in `API_SPEC.md`.


#### TC-13 Prioritätsregel erzwingt Safety vor Kostenoptimierung
**Given** ein Day-Ahead-Profil mit günstigen Zeitfenstern und gleichzeitigem Sicherheitslimit (z. B. max. Ladeleistung)
**When** die Tarif-Engine den Plan validiert/erzeugt
**Then** wird ein sicherheitskonformer Plan ausgegeben, auch wenn dadurch der günstigste Kostenslot nur teilweise genutzt wird.

#### TC-14 Fehlerfall 422 `invalid_slot_coverage`
**Given** ein Tarifprofil mit Lücke oder Überlappung in den 24h-Slots
**When** `POST /sites/:siteId/tariff/day-ahead/validate` aufgerufen wird
**Then** antwortet die API mit `422 invalid_slot_coverage` und einem klaren Feldhinweis auf die fehlerhafte Slot-Definition.

#### TC-15 Fehlerfall 409 `version_conflict`
**Given** ein bestehendes Profil `v1.1` ist gespeichert
**When** ein Update mit älterer Version (z. B. `v1.0`) gesendet wird
**Then** antwortet die API mit `409 version_conflict` und speichert keine Änderung.

#### TC-16 Fehlerfall 400 `invalid_timezone`
**Given** ein Profil-Request ohne gültige IANA-Zeitzone
**When** der Request verarbeitet wird
**Then** antwortet die API mit `400 invalid_timezone` und validierbarer Fehlermeldung.

---

## Phase-2 Ergänzung (GO-Umsetzung) - Auth Skeleton v0.1
Referenz: `API_SPEC.md` → "Auth Skeleton v0.1".

### Zusätzliche Acceptance-Regel (Paket 1)
- Rollen- und Token-Verhalten muss reproduzierbar testbar sein für `owner`, `installer`, `support`.

### Reproduzierbare Zusatztestfälle (Auth)

#### TC-17 Fehlerfall 401 `invalid_credentials`
**Given** ein Login-Request mit ungültiger E-Mail/Passwort-Kombination
**When** `POST /auth/login` aufgerufen wird
**Then** antwortet die API mit `401 invalid_credentials`, liefert kein Access-/Refresh-Token und erzeugt einen auditierbaren Security-Logeintrag ohne Passwort-Leak.

#### TC-18 Fehlerfall 401 `token_expired`
**Given** ein abgelaufenes Access-Token
**When** ein geschützter Endpunkt aufgerufen wird
**Then** antwortet die API mit `401 token_expired`; ein gültiger Refresh-Flow ist erforderlich, bevor erneut zugegriffen werden kann.

#### TC-19 Fehlerfall 403 `role_forbidden`
**Given** ein `support`-Benutzer ohne Berechtigung für kritische Owner-Aktion
**When** ein geschützter Owner-Only-Endpunkt aufgerufen wird
**Then** antwortet die API mit `403 role_forbidden` und protokolliert den verweigerten Zugriff revisionssicher.

---

## Phase-2 Ergänzung (GO-Umsetzung) - Device Control Pilot Flow v0.1
Referenz: `API_SPEC.md` → "Phase-2 API Story Slice - Device Control Pilot Flow v0.1".

### Zusätzliche Acceptance-Regel (Paket 4)
- Für **Battery** und **Wallbox** ist je ein Happy Path sowie je zwei Negativpfade reproduzierbar testbar.

#### TC-19a Rate-Limiting bei fehlgeschlagenen Login-Versuchen
**Given** ein Angreifer oder Benutzer mit falschem Passwort
**When** mehr als 5 Login-Versuche innerhalb von 5 Minuten auf denselben Account erfolgen
**Then** antwortet die API mit `429 too_many_requests` und blockiert weitere Versuche für mindestens 15 Minuten; dies wird als Sicherheitsereignis protokolliert.

### Reproduzierbare Zusatztestfälle (Device Control)

#### TC-20 Wallbox Happy Path `set_power_limit`
**Given** eine verbundene Wallbox mit aktivem Site-Kontext und gültigem Owner-Token
**When** `POST /devices/:deviceId/commands` mit `action=set_power_limit`, gültigem `powerKw` und `ttlSec` gesendet wird
**Then** antwortet die API mit `202 accepted`, der Status wechselt innerhalb des SLA auf `applied` und ein Event-Log-Eintrag mit `commandId` ist abrufbar.

#### TC-21 Battery Happy Path `set_charge_mode`
**Given** eine verbundene Battery und ein gültiger Fahrplan-Kontext
**When** ein zulässiger Lade-/Entlademodus via `POST /devices/:deviceId/commands` gesetzt wird
**Then** wird der Befehl akzeptiert (`accepted`), innerhalb SLA angewendet (`applied`) und inklusive `requestedBy`, Zeitstempel und Ergebnis auditierbar geloggt.

#### TC-22 Battery Intent Happy Path `charge_now`
**Given** eine verbundene Battery im zulässigen SoC-Fenster und gültigem Owner-Token
**When** `POST /devices/:deviceId/commands` mit `intent=charge_now`, gültigem `targetSocPct` und `ttlSec` gesendet wird
**Then** antwortet die API mit `202 accepted`, der Status wechselt innerhalb SLA auf `applied` und ein Audit-Log enthält `intent=charge_now`, `targetSocPct`, `requestedBy` und `commandId`.

#### TC-23 Battery Intent Happy Path `discharge_now`
**Given** eine verbundene Battery oberhalb der minimalen Entladegrenze und aktiver Site-Kontext
**When** `POST /devices/:deviceId/commands` mit `intent=discharge_now` und zulässigem Zielwert gesendet wird
**Then** wird der Befehl angenommen (`accepted`), innerhalb SLA umgesetzt (`applied`) und die Sicherheitsgrenzen (minSoC/maxPower) bleiben nachweisbar eingehalten.

#### TC-24 Fehlerfall 422 `invalid_command_params`
**Given** ein Command-Request mit technisch unzulässigen Parametern (z. B. Wallbox `powerKw` über Gerätegrenze)
**When** `POST /devices/:deviceId/commands` aufgerufen wird
**Then** antwortet die API mit `422 invalid_command_params`, weist das fehlerhafte Feld aus und erzeugt keine aktive Steueraktion.

#### TC-25 Fehlerfall 409 `command_conflict`
**Given** ein bereits aktiver, inkompatibler Befehl für dasselbe Gerät (z. B. laufender Battery-Mode-Wechsel)
**When** ein zweiter konfliktärer Command mit neuer `commandId` gesendet wird
**Then** antwortet die API mit `409 command_conflict`, der laufende Befehl bleibt unverändert aktiv und der Konflikt ist im Event-Log nachvollziehbar.

#### TC-26 Fehlerfall 504 `device_ack_timeout`
**Given** ein Device, das im definierten ACK-SLA nicht antwortet
**When** ein gültiger Command gesendet wird
**Then** wechselt der Command-Status auf `failed` oder `expired`, die API liefert `504 device_ack_timeout` (bzw. äquivalenten Fehlerpfad) und ein P1/P2-Alarm gemäß Monitoring-Policy wird ausgelöst.

#### TC-30 Idempotenz `commandId` (gleiches Payload)
**Given** ein bereits akzeptierter Command mit `commandId=cmd_X`
**When** derselbe Request (identisches Payload) innerhalb von 24h erneut an `POST /devices/:deviceId/commands` gesendet wird
**Then** behandelt die API den Request idempotent (kein neuer Command), liefert den bestehenden Status zurück und erzeugt keinen zweiten aktiven Write-Command.

#### TC-31 Fehlerfall 409 `command_id_reused_with_different_payload`
**Given** ein bereits akzeptierter Command mit `commandId=cmd_X`
**When** dieselbe `commandId` mit abweichenden Parametern erneut gesendet wird
**Then** antwortet die API mit `409 command_conflict` und `reason=command_id_reused_with_different_payload`, inklusive `traceId` für Incident-Nachweis.

---

## Phase-2 Ergänzung (GO-Umsetzung) - Smart-Meter Data Path v0.1
Referenz: `API_SPEC.md` → "Phase-2 API Story Slice - Smart-Meter Data Path v0.1".

### Zusätzliche Acceptance-Regel (Paket 2)
- Fehler- und Qualitätspfade sind reproduzierbar nachweisbar für `ok|estimated|missing|invalid` sowie Pflichtfehler `422/408/409`.

### Reproduzierbare Zusatztestfälle (Smart-Meter)

#### TC-27 Fehlerfall 422 `validation_error` (↔ `SM-422-01`)
**Given** ein Ingestion-Request mit negativem `energyImportKwh` oder fehlendem Pflichtfeld
**When** `POST /sites/:siteId/smart-meter/readings` aufgerufen wird
**Then** antwortet die API mit `422 validation_error` im vereinbarten Error-Contract inkl. `field`, `reason` und `traceId`; valide Datensätze des Batches bleiben gemäß Partial-Accept-Regel verarbeitbar.

#### TC-28 Fehlerfall 408 `source_timeout` (↔ `SM-408-01`)
**Given** die Datenquelle liefert innerhalb des Ingestion-SLA keine Antwort
**When** der Ingestion-Call verarbeitet wird
**Then** antwortet die API mit `408 source_timeout`, erzeugt einen Alert im Monitoring und dokumentiert den Retry-Hinweis gemäß Scope-Review-Default (Backoff 2s/5s/10s).

#### TC-29 Fehlerfall 409 `duplicate_reading` (↔ `SM-409-01`)
**Given** für dieselbe Kombination `meterId + timestamp` wurde bereits ein Datensatz angenommen
**When** derselbe Reading erneut gesendet wird
**Then** antwortet die API mit `409 duplicate_reading`, ohne den vorhandenen Datensatz zu überschreiben; der Konflikt ist im Audit/Event-Log nachvollziehbar.

#### TC-32 Batch-Partial-Accept (2/1) (↔ `SM-BATCH-01`)
**Given** ein Batch mit 3 Readings (2 valide, 1 invalide)
**When** `POST /sites/:siteId/smart-meter/readings` verarbeitet wird
**Then** antwortet die API mit `202 accepted`, `accepted=2`, `rejected=1` und liefert den invaliden Datensatz mit `validation_error` strukturiert zurück.

#### TC-33 Happy Path `SM-OK-01` (↔ `SM-OK-01`)
**Given** ein technisch valider Ingestion-Request mit vollständig befüllten Pflichtfeldern und zulässigen Grenzwerten
**When** `POST /sites/:siteId/smart-meter/readings` mit einem Batch ohne fehlerhafte Datensätze verarbeitet wird
**Then** antwortet die API mit `202 accepted`, `accepted=n`, `rejected=0`; alle Readings sind versioniert gespeichert und im Audit-Log mit `traceId` nachvollziehbar.

#### TC-34 Monotonie-Prüfung bei kumulativen Zählern (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit kumulativen kWh-Werten, wobei der neue Wert `energyImportKwh=150` niedriger ist als der vorherige gespeicherte Wert `200`
**When** `POST /sites/:siteId/smart-meter/readings` aufgerufen wird
**Then** antwortet die API mit `422 validation_error` und `reason="monotonie_violation"`, da kumulative Zählerstände nicht sinken dürfen; der Datensatz wird abgelehnt.
**Hinweis:** Dies gilt nur für Zählertypen mit monotonem Verhalten (`counterType="cumulative"`).

#### TC-35 Batterie-Zustand bei kombinierten Messwerten (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit simultanen Werten für Batterie-Entladung (`energyDischargeKwh`) und Netzbezug (`energyImportKwh`)
**When** `POST /sites/:siteId/smart-meter/readings` verarbeitet wird
**Then** akzeptiert die API beide Werte als separate Messungen, protokolliert sie mit unterschiedlichen `meterId` und verhindert doppelte Zählung; die Summe wird konsistent als `totalGridImport` berechnet.

#### TC-36 Zeitstempel-Lücken-Erkennung (Edge Case)
**Given** ein Smart-Meter-Request mit 5-Minuten-Intervallen, wobei ein Intervall (`14:00`) fehlt
**When** `POST /sites/:siteId/smart-meter/readings` aufgerufen wird
**Then** antwortet die API mit `202 accepted`, `warnings=["missing_interval_14:00"]`, markiert die Lücke im Audit-Log und löst optional einen P2-Alarm aus (`TC-MON-8`).

**Monitoring-Traceability:**
- TC-36 löst P2-Alarm `timeseries_gap_events_1h` aus (≥3 Lücken >10min in 1h → MON-P2-03)
- Verknüpft mit Monitoring-Regel in `MONITORING_ALERTING_MINIMUM.md`: P2-Alarm-Kategorie "Data Quality"

#### TC-37 Extremwert-Behandlung (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit Extremwerten (z. B. `energyImportKwh=999999` jenseits physikalischer Plausibilität oder `0` bei laufendem Verbrauch)
**When** `POST /sites/:siteId/smart-meter/readings` verarbeitet wird
**Then** antwortet die API mit `202 accepted`, aber mit einem Warning-Flag (`warning="extreme_value_detected"`) und protokolliert den Wert im Audit-Log; gleichzeitig wird ein P2-Monitoring-Alarm ausgelöst zur manuellen Prüfung.
**Hinweis:** Dies verhindert keine physikalisch unmöglichen Werte, macht sie aber transparent und nachverfolgbar.

#### TC-38 Hohe Frequenz / Mehrfache Messwerte pro Minute (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit mehreren Readings pro同一 Minute (z. B. 3 Datensätze innerhalb derselben Minute `14:05:00`, `14:05:30`, `14:05:45`)
**When** `POST /sites/:siteId/smart-meter/readings` verarbeitet wird
**Then** akzeptiert die API alle Readings gemäß dem 5-Minuten-Intervall-Grid, antwortet mit `202 accepted`, `accepted=3`, und protokolliert jeden Datensatz mit eindeutiger Sequenznummer im Audit-Log.
**Hinweis:** Die Reihenfolge innerhalb derselben Minute muss chronologisch stimmen; bei falscher Reihenfolge wird der Datensatz mit `422 validation_error` und `reason="timestamp_order_violation"` abgelehnt.

#### TC-39 Zeitzonen-Wechsel / Sommer-/Winterzeit (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit Readings um den Zeitpunkt der Zeitumstellung (z. B. 30.3.2025 02:30 MEZ -> MESZ oder 26.10.2025 03:00 MESZ -> MEZ)
**When** `POST /sites/:siteId/smart-meter/readings` aufgerufen wird
**Then** antwortet die API mit `202 accepted`, interpretiert die Timestamps gemäß ISO 8601 mit explizitem Offset (z. B. `+02:00` oder `+01:00`), und protokolliert die Zeitumstellung im Audit-Log mit einem Warning-Flag (`warning="dst_transition"`).
**Hinweis:** Die API darf keine Readings aufgrund von Zeitlücken (DST-Spring forward) oder doppelten Timestamps (DST-Fall back) ablehnen; stattdessen werden diese markiert und zur manuellen Prüfung vorgemerkt.

#### TC-40 Null-Wert bei aktiver Last (Edge Case)
**Given** ein Smart-Meter meldet `energyImportKwh=0` gleichzeitig mit einem aktiven Wallbox-Ladevorgang (`powerKw > 0`)
**When** `POST /sites/:siteId/smart-meter/readings` verarbeitet wird
**Then** akzeptiert die API den Null-Wert als technisch möglich (z. B. Batteriespeicher liefert exakt so viel, wie Wallbox verbraucht), protokolliert die Kombination mit `warning="zero_import_with_active_device"` und berechnet die Netzbilanz konsistent als Summe aus Import/Export/Battery/Charging.
**Hinweis:** Dieser Edge Case wird als Warning markiert und im Audit-Log zur Plausibilitätsprüfung vorgemerkt, aber nicht als Fehler abgelehnt.

#### TC-41 DC-Wandler-Verlust (Edge Case)
**Given** ein Smart-Meter meldet gleichzeitig Import und Export innerhalb derselben 5-Minuten-Periode (z. B. Haus verbraucht 2 kWh vom Netz, während Batteriespeicher 1 kWh einspeist)
**When** `POST /sites/:siteId/smart-meter/readings` mit widersprüchlichen Vorzeichen verarbeitet wird
**Then** akzeptiert die API beide Werte, berechnet die Netzbilanz korrekt als `netto = import - export`, und protokolliert die Kombination mit `warning="simultaneous_import_export"` zur Plausibilitätsprüfung.
**Hinweis:** Die API validiert physikalische Plausibilität (Export sollte bei Batterie-SOC < 20% unwahrscheinlich sein), markiert aber als Warning, nicht als Fehler.

#### TC-42 Negativer Energieverbrauch / Messgerätefehler (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit negativem `energyImportKwh` (z. B. `-5.2` kWh, was auf Messgerätefehler oder Korruptionsdaten hinweist)
**When** `POST /sites/:siteId/smart-meter/readings` aufgerufen wird
**Then** antwortet die API mit `422 validation_error` und `reason="negative_value_not_allowed"`, der Datensatz wird abgelehnt und ein P2-Monitoring-Alarm ausgelöst.
**Hinweis:** Negativer Verbrauch ist physikalisch unmöglich und deutet auf Datenkorruption oder Messgerätefehler hin - Ablehnung schützt nachgelagerte Systeme.

#### TC-43 Batch-Größen-Limit-Überschreitung (Edge Case)
**Given** ein Smart-Meter-Ingestion-Request mit mehr als 500 Readings (`maxItems=500` lt. API-Contract) in einem einzigen Batch
**When** `POST /sites/:siteId/smart-meter/readings` mit oversized Batch aufgerufen wird
**Then** antwortet die API mit `422 validation_error` und `reason="batch_size_exceeded"`, inkl. Angabe der max. erlaubten Anzahl (`maxItems=500`).
**Hinweis:** Der Request muss in mehrere valid große Batches aufgeteilt werden.

### Paket-2 Abnahmelink (QA ↔ API)
- Diese Testfälle dienen als QA-Gegenstück zum Paket-2-DoR in `API_SPEC.md`.
- Referenz-Mapping auf API-Canonical-Vektoren: `SM-OK-01` (Happy Path), `SM-422-01` (TC-27), `SM-408-01` (TC-28), `SM-409-01` (TC-29), `SM-BATCH-01` (TC-32).
- Paket 2 gilt erst als review-ready, wenn TC-27 bis TC-29 **sowie TC-32, TC-33, TC-34, TC-35, TC-36, TC-37, TC-38, TC-39, TC-41, TC-42 und TC-43** als reproduzierbare Testskripte (Request/Expected Response) im Test-Backlog referenziert sind.

## Phase-2 Addendum - Tarif-Engine Day-Ahead Slice v0.1 (Review-Ready Sync)

Ziel: Paket 3 (`API_SPEC.md` Tarif-Engine v0.1) testbar und abnahmefaehig spiegeln.

### Referenzierte API-Scopes
- `PUT /sites/:siteId/tariff/day-ahead-profile`
- `GET /sites/:siteId/tariff/day-ahead-profile?date=YYYY-MM-DD`
- `POST /sites/:siteId/tariff/day-ahead/validate`

### Zusätzliche Testfälle (Tarif-Engine)
- **TC-34 (Happy Path):** Gueltiges Day-Ahead-Profil wird gespeichert, Version + Zeitfenster konsistent.
- **TC-35 (Validation):** Ueberlappende `validFrom/validTo`-Fenster werden mit eindeutigem Fehlercode abgewiesen.
- **TC-36 (Priority Rule):** Konfliktfall prueft deterministische Regel `Safety > Contract > Cost`.
- **TC-37 (Timezone Integrity):** `Europe/Vienna` bleibt bei Sommer-/Winterzeitwechsel konsistent auswertbar.

### Traceability-Mapping (Paket 3: API -> QA)
- `TC-TAR-OK-01` -> **TC-34 (Happy Path)**
- `TC-TAR-422-01` -> **TC-35 (Validation / invalid_slot_coverage)**
- `TC-TAR-409-01` -> **TC-36 (Priority Rule / version_conflict)**
- `TC-TAR-400-01` -> **TC-37 (Timezone Integrity / invalid_timezone)**

#### Zusätzlicher Edge-Case Testfall
- **TC-38 (Version-Conflict bei Update):** Ein bestehendes Day-Ahead-Profil wird mit älterer `version` erneut gesendet; API antwortet mit `409 version_conflict` und liefert die aktuelle Version als Response-Body zurück.

## Phase-2 Addendum - Monitoring/Alerting Minimum (Paket 5)

Ziel: Monitoring/Alerting-Slice aus `MONITORING_ALERTING_MINIMUM.md` mit QA-Testfall-Verknüpfung absichern.

### Referenzierte Metriken (API ↔ QA)
- **TC-MON-1 (Ingest Availability):** `smart_meter_ingest_success_rate_15m` >= 99.0% / 15 Min → Happy Path.
- **TC-MON-2 (Ingest Degradation):** Success Rate < 95% für 15 Min → P1-Alarm-Trigger.
- **TC-MON-3 (Tarif Freshness):** `tariff_schedule_age_minutes` <= 30 Min nach Day-Ahead-Updatefenster → Happy Path.
- **TC-MON-4 (Tarif Freshness Critical):** Age > 120 Min während aktiver Steuerzeit → P1-Alarm-Trigger.
- **TC-MON-5 (Command Success):** `device_command_success_rate_15m` >= 98.0% / 15 Min → Happy Path.
- **TC-MON-6 (Command Failure Spike):** Success Rate < 90% für 10 Min → P1-Alarm-Trigger.
- **TC-MON-7 (Monotonicity Violations):** >= 5 Monotonie-Verletzungen in 1 Stunde → P2-Alarm-Trigger.
- **TC-MON-8 (Timeseries Gaps):** >= 3 Zeitreihen-Lücken > 10 Min in 1 Stunde → P2-Alarm-Trigger.

### Traceability-Mapping (Paket 5: Monitoring Spec -> QA)
- `TC-MON-1` ↔ Metrik `smart_meter_ingest_success_rate_15m` (Ziel: >= 99%)
- `TC-MON-2` ↔ P1-Regel Ingest-Ausfall (< 95% / 15m)
- `TC-MON-3` ↔ Metrik `tariff_schedule_age_minutes` (Ziel: <= 30m)
- `TC-MON-4` ↔ P1-Regel Tarif-Freshness kritisch (> 120m)
- `TC-MON-5` ↔ Metrik `device_command_success_rate_15m` (Ziel: >= 98%)
- `TC-MON-6` ↔ P1-Regel Command Failure Spike (< 90% / 10m)
- `TC-MON-7` ↔ P2-Regel Monotonie-Verletzungen (>= 5 / 1h)
- `TC-MON-8` ↔ P2-Regel Zeitreihen-Lücken (>= 3 / 1h)

### Review-Ready Check (Paket 5)
- [ ] Metriken + P1/P2-Regeln aus MONITORING_ALERTING_MINIMUM.md sind als TC-Nummern referenzierbar.
- [ ] Je P1-Regel (TC-MON-2, TC-MON-4, TC-MON-6) ist mindestens 1 reproduzierbarer Alarm-Test dokumentiert.
- [ ] Alert-Routing (P1 → backend-agent/qa-agent/ceo-agent, P2 → backend-agent Ticket) ist als Acceptance-Kriterium markiert.
- [ ] Sign-off-Block in MONITORING_ALERTING_MINIMUM.md mit realen Namen + Zeitstempel.

### Review-Ready Check (Paket 3)
- [ ] API-Contract fuer Day-Ahead ist fuer Backend+QA gegengezeichnet.
- [ ] Mindestens 1 Negativtest fuer Profilvalidierung (Fensterkonflikt) dokumentiert.
- [ ] Prioritaetsregel wurde als reproduzierbarer QA-Check spezifiziert.
- [ ] Rueckverlinkung nach `API_SPEC.md` ist im Sign-off-Protokoll enthalten.
- [ ] Traceability-Mapping `TC-TAR-*` -> `TC-34..TC-37` ist im Review referenziert.
