# ARCHITECTURE.md

## 1) Systemübersicht
Power besteht aus 5 Kernschichten:
1. **Customer Layer**: Website, Onboarding, Kundenkonto
2. **Control Layer**: Tarif-Engine, Device Scheduler, Rule Engine
3. **Device Layer**: Energy Hub + Geräteadapter (Wallbox, Speicher, WP, Boiler)
4. **Data Layer**: Telemetrie, Smart-Meter-Daten, Preisfeeds, Prognosen
5. **Partner Layer**: Lieferanten-Integrationen, Installateur-Portal, Support

## 2) Hauptkomponenten
- **Web App (Next.js)**: Signup, Vertrags-/Tarifansicht, Gerätestatus
- **Mobile App (React Native später)**: Alerts, manuelle Overrides, Live-Flow
- **Backend API (Node.js + TypeScript)**: Auth, Device Control, Billing Events
- **Scheduler Service**: Optimierung je 15/60-Minuten-Fenster
- **Hub Agent (Edge Runtime)**: Lokale Fallback-Logik bei Internetausfall
- **Data Ingestion**: EPEX-Preise, Wetter, PV-Prognose, Smart-Meter API

## 3) Steuerlogik (MVP)
Input:
- Spotpreise, Netzgebührenmodell, Nutzerpräferenzen, Device Constraints

Output:
- Lade-/Entladeplan pro Gerät für nächsten Horizont (24h)

Regeln:
- Mindestreserve Akku (z. B. 20 %)
- Komfortfenster (Warmwasser bis 06:00)
- Peak-Shaving optional
- PV-Überschuss zuerst lokal nutzen

## 4) Security & Resilience
- OAuth2/JWT + Device Certificates
- Rollen: Customer, Installer, Ops, Admin
- Audit-Logs bei Steuerbefehlen
- Hub Offline-Modus mit letzter gültiger Policy

## 5) Deployment
- Cloud: EU Region
- Edge: Hub pro Standort
- Monitoring: OpenTelemetry, Alerting auf Scheduler-Fehler
