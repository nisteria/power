# 03 Problem & Lösung — Power Energy GmbH

## 3.1 Das Problem

### 3.1.1 Dynamische Strompreise erfordern ständige Aufmerksamkeit

Der österreichische Strommarkt hat sich fundamental verändert: Preise am Day-Ahead-Markt schwanken stündlich. Aber:

- Verbraucher können nicht manuell auf Preisänderungen reagieren
- Tarife werden selten gewechselt (Komplexität, Angst vor Fehlern)
- Millionen an Einsparungen bleiben ungenutzt

### 3.1.2 Isolierte Geräte ohne Koordination

Batteriespeicher, Wallboxen und Wärmepumpen arbeiten heute isoliert:

| Gerät | Problem |
|---|---|
| **Batterie** | Lädt auf wenn Strom billig ist, aber nicht optimiert auf Tarife |
| **Wallbox** | Lädt ohne Rücksicht auf Strompreise oder Netzlast |
| **Wärmepumpe** | Arbeitet auf festen Zeitplänen, nicht basierend auf Preisen |
| **Smart Home** | Keine Integration in Energieoptimierung |

Jedes Gerät trifft eigene Entscheidungen — ohne Gesamtsicht.

### 3.1.3 Marktfragmentierung

| Problem | Auswirkung |
|---|---|
| Kein österreichischer Champion | Internationale Anbieter dominieren, aber ohne lokalen Fokus |
| Komplexe Regulierung | Neueinsteiger scheitern an E-Control-Anforderungen |
| Keine Smart-Meter-Integration | Markt wartet auf flächendeckende Infrastruktur |
| Hohe Komplexität für Endkunden | Vielzahl an Apps, keine ganzheitliche Lösung |

### 3.1.4 Konkrete Auswirkungen für Haushalte

[Annahme — basierend auf Marktanalysen]

| Haushaltstyp | Jährliches Einsparpotenzial | Verlust durch Nicht-Optimierung |
|---|---|---|
| Haushalt mit PV + Batterie | €360–840 | €200–400 |
| Haushalt mit PV nur | €180–420 | €100–200 |
| Haushalt mit E-Auto | €240–600 | €150–300 |
| SME mit Lastmanagement | €1.440–5.400 | €500–2.000 |

---

## 3.2 Die Lösung

### 3.2.1 Power — AI Energy Orchestrator

Power ist die erste ganzheitliche SaaS-Plattform für Österreich, die:

1. **Echtzeit-Daten** von Smart-Metern, Batterien, Wallboxen und Wärmepumpen zusammenführt
2. **KI-gestützte Optimierung** auf Basis von Day-Ahead-Tarifen ermöglicht
3. **Automatische Steuerung** von Geräten für maximale Ersparnis übernimmt

### 3.2.2 Kernkomponenten

| Komponente | Funktion | Technologie |
|---|---|---|
| **Smart-Meter Gateway** | Echtzeit-Dateningestion von Verbrauch/Produktion | REST API, MQTT |
| **Tarif-Engine** | Tag-für-Tag Optimierung basierend auf EPEX-Spotpreisen | ML-Modell |
| **Device Orchestrator** | Steuerung von Battery, Wallbox, Wärmepumpe | Modbus, REST |
| **Dashboard** | Visualisierung für Endkunden | Next.js, Charts |
| **KI-Optimierung** | Lernt Verbrauchsmuster, maximiert Ersparnis | Python ML-Pipeline |

### 3.2.3 So funktioniert Power

```
[Smart-Meter] ──→ [Power Cloud] ──→ [Tarif-Engine]
                                    ↓
[PV-Anlage] ────→ [Daten-Hub] ──→ [KI-Optimierung]
                                    ↓
[Batterie] ←──── [Device Orchestrator] ←─→ [Wallbox]
[Wärmepumpe]
```

**Automatischer Ablauf:**
1. Smart-Meter liefert Echtzeit-Verbrauchsdaten
2. EPEX-Spot-Preise werden für nächsten Tag geladen
3. KI berechnet optimalen Ladungs-/Entladungsplan
4. Device Orchestrator steuert Geräte automatisch
5. Dashboard zeigt Ersparnis und Entscheidungen

---

## 3.3 Nutzenversprechen

| Für | Nutzen | Beweis |
|---|---|---|
| **Haushalt mit PV + Batterie** | €30–70/Monat sparen | Simulation zeigt 15–25% Stromkostenreduktion |
| **Haushalt mit E-Auto** | Optimal laden, Kosten minimieren | Ladung in günstigsten Stunden |
| **SME mit Lastspitzen** | Peak-Shaving, Netzgebühren reduzieren | Lastmanagement senkt Netzgebühren um 10–20% |
| **Netzbetreiber** | Netzstabilität verbessern | Lastverschiebung hilft bei Engpässen |

---

## 3.4 Differenzierung zu Alternativen

| Lösung | Steuerung | Tarife | Smart-Meter | KI |
|---|---|---|---|---|
| **Power** | ✅ | ✅ | ✅ | ✅ |
| **VOLTAG.Ai** | ✅ | Teilweise | ✅ | ✅ |
| **Enpal (DE)** | ✅ | ❌ | ❌ | ❌ |
| **Tibber** | ❌ | ✅ | Teilweise | ❌ |
| **aWATTar** | ❌ | ✅ | ❌ | ❌ |
| **Virtueller Assistent** | ❌ | ❌ | ❌ | ❌ |

---

*Erstellt: April 2026 | BusinessPlan Architect Pro*
