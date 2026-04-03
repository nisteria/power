# 04 Angebot — Power Energy GmbH

## 4.1 Produktübersicht

### 4.1.1 Was Power ist

Power ist eine **Cloud-basierte SaaS-Plattform** (Subscription-Modell), die Haushalte und KMUs dabei unterstützt, ihre Energiekosten automatisch zu optimieren. Das Produkt besteht aus:

| Komponente | Beschreibung |
|---|---|
| **Cloud-Plattform** | Zentrale Intelligence für Optimierung |
| **Smart-Meter Gateway** | Konnektor für Echtzeit-Daten (ohne eigene Hardware) |
| **Device Integration** | Anbindung an Batterien, Wallboxen, Wärmepumpen |
| **Nutzer-Dashboard** | Web- und Mobile-App zur Visualisierung |
| **KI-Optimierer** | ML-Modell für Verbrauchsprognose und Ersparnis-Maximierung |

---

## 4.2 Produktmodule

### Modul 1: Smart-Meter Gateway

| Feature | Beschreibung |
|---|---|
| **Echtzeit-Dateningestion** | Minutengenaue Verbrauchsdaten |
| **Produktionsdaten PV** | Einspeiseleistung von Solaranlagen |
| **Netzdaten** | Netzlast, Anschlusswert |
| **Historie** | 12 Monate Datenaufbewahrung |

**Integration:** Über standardisierte Smart-Meter-APIs (AMM-Schnittstelle)

---

### Modul 2: Tarif-Engine

| Feature | Beschreibung |
|---|---|
| **Day-Ahead-Preise** | EPEX Spot für Österreich |
| **Netzpreise** | Netzkosten nach Verbrauchszeit |
| **Steuerung** | Automatische Tarifoptimierung |
| **Vergleich** | Laufende Marktbeobachtung |

---

### Modul 3: Device Orchestrator

| Feature | Beschreibung |
|---|---|
| **Batteriesteuerung** | Lade-/Entladungsplanung |
| **Wallbox-Steuerung** | EV-Ladung in günstigen Zeiten |
| **Wärmepumpen-Integration** | Heiz-/Kühloptimierung |
| **Lastmanagement** | Peak-Shaving für SMEs |

**Unterstützte Protokolle:** Modbus TCP, REST API, MQTT, EEBUS

---

### Modul 4: KI-Optimierung

| Feature | Beschreibung |
|---|---|
| **Verbrauchsprognose** | ML-Modell für 24h-Vorhersage |
| **Preisprognose** | EPEX-Spot-Vorhersage |
| **Optimierungsalgorithmus** | Maximiert Ersparnis bei gegebenen Constraints |
| **Auto-Learning** | Passt sich an Nutzerverhalten an |

---

### Modul 5: Dashboard & Reporting

| Feature | Beschreibung |
|---|---|
| **Live-Übersicht** | Aktueller Verbrauch, Preise, Ersparnis |
| **Historie** | Vergleichbare Zeiträume |
| **Einsparungsnachweis** | Konkrete Euro-Beträge |
| **Export** | CSV/PDF für Berichte |

---

## 4.3 Preisstufen

| | Basic | Pro | Business |
|---|---|---|---|
| **Monatspreis** | €9,90 | €19,90 | €49,90 |
| **Jahrespreis** | €99 | €199 | €499 |
| | | | |
| **Smart-Meter Dashboard** | ✅ | ✅ | ✅ |
| **Tarif-Alerts** | ✅ | ✅ | ✅ |
| **EPEX-Spot-Übersicht** | ✅ | ✅ | ✅ |
| **Auto-Optimierung** | ❌ | ✅ | ✅ |
| **Gerätesteuerung (1 Gerät)** | ❌ | ✅ | ✅ |
| **Gerätesteuerung (Multi)** | ❌ | ❌ | ✅ |
| **Multi-Standort** | ❌ | ❌ | ✅ |
| **API-Zugang** | ❌ | ❌ | ✅ |
| **SLA** | ❌ | ❌ | ✅ |
| **Priority Support** | ❌ | ❌ | ✅ |

---

## 4.4 Produkt-Roadmap

| Phase | Zeitplan | Features |
|---|---|---|
| **MVP** | Q2 2026 | Smart-Meter, Tarif-Engine, Dashboard |
| **V1.1** | Q3 2026 | Batteriesteuerung, Wallbox-Integration |
| **V1.2** | Q4 2026 | Wärmepumpen, KI-Optimierung |
| **V2.0** | 2027 | Multi-User, SME-Features, API |
| **V2.1** | 2027 | White-Label für Partner |

---

## 4.5 Technische Spezifikationen

| Komponente | Technologie |
|---|---|
| **Frontend** | Next.js, React, TailwindCSS |
| **Backend** | Fastify (Node.js), TypeScript |
| **Database** | PostgreSQL, TimescaleDB |
| **ML-Pipeline** | Python, scikit-learn |
| **Infrastructure** | AWS (Frankfurt), Kubernetes |
| **Monitoring** | [Benötigte Information] |

---

## 4.6 Anforderungen an Kundenseite

| | Minimum | Empfohlen |
|---|---|---|
| **Smart Meter** | AMR-fähiger Zähler | Moderner Smart Meter mit M-Bus/AMM |
| **Internet** | 1 Mbps stabil | 10+ Mbps |
| **Geräte** | Optional | PV-Anlage, Batterie, Wallbox |
| **Browser** | Chrome, Firefox, Safari, Edge | Aktuelle Versionen |

---

## 4.7 Installation & Setup

| Schritt | Aufwand | Wer |
|---|---|---|
| 1. Account erstellen | 5 Min | Kunde selbst |
| 2. Smart-Meter anbinden | 15 Min | Technischer Support |
| 3. Geräte verbinden | 10–30 Min | Kunde/Partner |
| 4. Optimierung aktivieren | 5 Min | Kunde selbst |

**Gesamt:** 30–60 Minuten bis zur ersten Ersparnis

---

*Erstellt: April 2026 | BusinessPlan Architect Pro*
