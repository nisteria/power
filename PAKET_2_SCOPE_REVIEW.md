# PAKET 2: SCOPE-REVIEW SMART-METER API

**Status:** ABGESCHLOSSEN - 14.03.2026 23:39  
**Reviewer:** Main Agent  
**Sign-off:** Bereit für Implementation  

## SCOPE DEFINITION

### IN-SCOPE
- Austrian Smart-Meter Standards (IEC 62056-21, DLMS/COSEM)
- Real-time Verbrauchsdaten (15-Min Intervalle)
- Historische Daten (90 Tage Rückblick)
- Standardisierte API für alle österreichischen Netzbetreiber:
  - Wiener Netze GmbH
  - Netz Oberösterreich GmbH  
  - Salzburg Netz GmbH
  - TINETZ (Tirol)
  - Kärnten Netz
  - Netz Burgenland
  - Stromnetz Steiermark
- OAuth2 Authentication mit Customer Consent
- Fehlerbehandlung und Retry-Logic
- Rate Limiting Compliance

### OUT-OF-SCOPE
- Deutsche/EU Netzbetreiber (Phase 3+)
- Gas-Meter Integration (v2.0)
- Manuelle Meter-Eingaben
- Eigenentwicklung Hardware-Reader

## TECHNISCHE SPEZIFIKATION

### API Endpoints (MVP)
```
GET /api/v1/smartmeter/consumption
- Parameter: customer_id, date_from, date_to, interval(15min/1h/1d)
- Response: JSON Array mit Zeitstempel + kWh Werten
- Rate Limit: 100 req/hour per customer

GET /api/v1/smartmeter/realtime
- Parameter: customer_id
- Response: Aktuelle Leistung (kW), letzte 15-Min (kWh)
- Rate Limit: 10 req/min per customer

POST /api/v1/smartmeter/authorize
- Parameter: customer_id, netzbetreiber, smart_meter_id
- Response: OAuth redirect URL für Customer Consent
```

### Datenmodell
```json
{
  "customer_id": "string",
  "smart_meter_id": "string", 
  "netzbetreiber": "string",
  "timestamp": "2026-03-14T22:45:00Z",
  "consumption_kwh": 2.34,
  "power_kw": 5.67,
  "status": "valid|estimated|error",
  "quality": "high|medium|low"
}
```

### Integration Pattern
- Adapter Pattern für verschiedene Netzbetreiber
- Circuit Breaker für Upstream-Ausfälle
- Caching (Redis) für Historical Data (1h TTL)
- Background Jobs für Bulk Import
- Monitoring: 99.5% Uptime SLA

## IMPLEMENTIERUNG

### Phase 1: Foundation (Woche 1-2)
- [ ] Smart-Meter Datenmodell + Database Schema
- [ ] OAuth2 Flow für Customer Consent
- [ ] Base API Struktur mit Authentication

### Phase 2: Netzbetreiber Integration (Woche 3-4)  
- [ ] Wiener Netze Adapter (Prio 1 - größter Markt)
- [ ] Netz OÖ + Salzburg Netz Adapter
- [ ] Error Handling + Retry Logic

### Phase 3: Optimization (Woche 5-6)
- [ ] Caching Layer implementieren
- [ ] Rate Limiting + Circuit Breaker
- [ ] Monitoring + Alerting Setup

## ABNAHMEKRITERIEN (QA TESTFÄLLE TC-27..TC-43)

### Funktional
- TC-27: Erfolgreiche OAuth2 Autorisierung Wiener Netze
- TC-28: 15-Min Verbrauchsdaten abrufen (7 Tage Zeitraum)
- TC-29: Real-time Daten < 2 Minuten Latenz
- TC-30: Historische Daten 90 Tage korrekt
- TC-31: Fehlerbehandlung bei Netzbetreiber-Ausfall
- TC-32: Rate Limiting greift bei Überschreitung

### Performance  
- TC-33: API Response < 500ms (95th percentile)
- TC-34: 1000 parallele Requests ohne Fehler
- TC-35: Bulk Import 10.000 Datenpunkte < 30 Sekunden

### Security
- TC-36: OAuth2 Token Validation korrekt
- TC-37: Keine Customer Data Leakage zwischen Accounts
- TC-38: GDPR Compliance (Data Export/Delete)

### Integration
- TC-39: Tarif-Engine erhält korrekte Consumption Data
- TC-40: Device Scheduler nutzt Real-time Power korrekt
- TC-41: Monitoring Alerts bei Smart-Meter Offline

### Resilience
- TC-42: Graceful Degradation bei Partial Outages
- TC-43: Recovery nach Netzbetreiber-Reconnect

## RISIKEN & MITIGATIONEN

### HOCH
- **Netzbetreiber API Changes:** Monitoring + Alerting auf Schema Changes
- **GDPR Customer Consent:** Rechtsprüfung durch Legal Team

### MITTEL  
- **Rate Limiting zu streng:** Fallback auf Cached Data + Customer Communication
- **Smart-Meter Coverage:** Pilotierung mit 100% Abdeckung in Wien

### NIEDRIG
- **Performance bei Scale:** Horizontal Scaling + CDN für Static Data

## DEPENDENCIES

- Legal Team: GDPR Consent Flow Review (2 Tage)
- Infrastructure: Redis Cluster Setup (1 Tag) 
- QA Team: Testdaten für 7 Netzbetreiber (3 Tage)
- Product: Customer Consent UX Flow (2 Tage)

## TIMELINE

- **KW 12 (18.03-22.03):** Phase 1 Foundation
- **KW 13-14:** Phase 2 Netzbetreiber Integration  
- **KW 15:** Phase 3 Optimization + QA
- **KW 16:** Production Deployment

## SIGN-OFF

**Technical:** ✅ Ready for Implementation  
**Product:** ✅ Requirements Complete  
**QA:** ✅ Test Cases Defined  
**Legal:** ⏳ GDPR Review Pending (2 days)  

**GO/NO-GO DECISION:** **GO** - Start Implementation KW 12

**Next Action:** Legal Team GDPR Review einleiten + Infrastructure Redis Setup