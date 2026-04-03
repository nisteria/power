# Power Energy GmbH — Businessplan (Kombiniert)

**Version:** 1.0 | **Datum:** April 2026  
**Hinweis:** Dies ist eine komprimierte Fassung. Alle 17 Kapitel sind als einzelne Dateien im `businessplan/` Ordner verfügbar.

---

# Executive Summary

## Das Wichtigste zuerst

| | |
|---|---|
| **Unternehmen** | Power Energy GmbH |
| **Standort** | Wien, Österreich |
| **Stage** | Pre-Seed |
| **Raise** | €150.000 für 5–10% Anteile |
| **Datum** | April 2026 |

## Problem

Strompreise schwanken stündlich am Day-Ahead-Markt — aber kein System automatisiert die Reaktion darauf. Batterien, Wallboxen und Wärmepumpen arbeiten isoliert. Millionen an Einsparungen gehen verloren.

## Lösung

**Power** ist der AI Energy Orchestrator für Österreich — eine SaaS-Plattform die Verbrauch, Speicherung und Ladevorgänge automatisch optimiert.

## Markt

| Segment | Marktgröße Österreich |
|---|---|
| Haushalte mit PV + Speicher | €900M |
| SMEs mit Lastmanagement | €450M |
| Mehrfamilienhäuser | €300M |
| **TAM Gesamt** | **€1,65B** |

## Geschäftsmodell

| Tier | Monatspreis | Zielgruppe |
|---|---|---|
| Basic | €9,90 | Tarif-Alerts, Analytics |
| Pro | €19,90 | Auto-Optimierung, Gerätesteuerung |
| Business | €49,90 | Multi-Standort, API, SLA |

**Unit Economics:** CAC €150 | LTV €2.400 | LTV:CAC 16:1 | Payback 8 Monate | Bruttomarge 75%

## Status

| Meilenstein | Status |
|---|---|
| MVP Architektur | ✅ Fertig (152 Files, 17K+ LOC) |
| E-Control Positionierung | ✅ EMS-Modell |
| Vollständige API + Frontend + Pipeline | ✅ |

## Kapitalbedarf

**Raise:** €150.000 Pre-Seed

| Position | Betrag | % |
|---|---|---|
| MVP-Entwicklung | €80K | 53% |
| Pilot-Betrieb | €40K | 27% |
| Regulatory/Legal | €20K | 13% |
| Team/G&A | €10K | 7% |

---

# Unternehmen & Geschäftsidee

## Kernidee

Power entwickelt eine KI-gesteuerte Plattform zur automatischen Optimierung von Energieverbrauch, -speicherung und -erzeugung für Haushalte und KMUs in Österreich.

## Alleinstellungsmerkmal

- End-to-End Orchestrierung: Smart-Meter → Tarif → Gerätesteuerung
- E-Control Konformität: EMS-Modell (kein Lieferant)
- Made in Austria: Datenresidenz garantiert
- Dynamic Tariff Optimization: Echtzeit-Reaktion auf stündliche Day-Ahead-Preise

## Regulatorische Positionierung

Power tritt **nicht als Stromlieferant** auf, sondern als EMS-Plattform (Energie-Management-System). Keine Bilanzkreisverantwortung, keine Lieferantenpflichten.

---

# Problem & Lösung

## Das Problem

1. Dynamische Strompreise erfordern ständige Aufmerksamkeit
2. Isolierte Geräte ohne Koordination (Batterie, Wallbox, Wärmepumpe)
3. Kein österreichischer Champion im AI Energy Orchestration

## Lösung: Power

```
[Smart-Meter] ──→ [Power Cloud] ──→ [Tarif-Engine]
                                    ↓
[PV-Anlage] ────→ [Daten-Hub] ──→ [KI-Optimierung]
                                    ↓
[Batterie] ←──── [Device Orchestrator] ←─→ [Wallbox]
```

Automatischer Ablauf:
1. Smart-Meter liefert Echtzeit-Verbrauchsdaten
2. EPEX-Spot-Preise werden für nächsten Tag geladen
3. KI berechnet optimalen Ladungs-/Entladungsplan
4. Device Orchestrator steuert Geräte automatisch
5. Dashboard zeigt Ersparnis und Entscheidungen

---

# Angebot

## Preisstufen

| | Basic | Pro | Business |
|---|---|---|---|
| **Monatspreis** | €9,90 | €19,90 | €49,90 |
| **Smart-Meter Dashboard** | ✅ | ✅ | ✅ |
| **Auto-Optimierung** | ❌ | ✅ | ✅ |
| **Gerätesteuerung** | ❌ | 1 Gerät | Multi |

---

# Marktanalyse

## Marktgröße

| Segment | TAM Österreich |
|---|---|
| Haushalte mit PV + Speicher | €900M |
| SMEs mit Lastmanagement | €450M |
| Mehrfamilienhäuser | €300M |
| **Gesamt** | **€1,65B** |

## Markttrends

- Dynamische Tarife werden Standard
- EU Energy Efficiency Directive 2023 verpflichtet zur Flexibilität
- PV-Booms + EV-Adoption schaffen Nachfrage

---

# Wettbewerb

## Wettbewerbsvergleich

| Feature | Power | VOLTAG.Ai | Tibber | Enpal |
|---|---|---|---|---|
| Cloud-basiert | ✅ | ❌ | ✅ | ❌ |
| Smart-Meter Integration | ✅ | ✅ | Teilw. | ❌ |
| KI-Optimierung | ✅ | ✅ | ❌ | ❌ |
| Made in Austria | ✅ | ✅ | ❌ | ❌ |
| Keine Hardware nötig | ✅ | ❌ | ✅ | ❌ |

## Differenzierung

> "Sie brauchen kein teures Gateway — starten Sie mit €0"

---

# Geschäftsmodell

## Unit Economics

| Metrik | Wert |
|---|---|
| **CAC** | €150 |
| **LTV** | €1.800 |
| **LTV:CAC** | 12:1 |
| **Payback** | 8 Monate |
| **Bruttomarge** | 75% |

---

# Finanzplan

## Szenarien

| | Bear | Basis | Bull |
|---|---|---|---|
| **J1 Kunden** | 150 | 500 | 800 |
| **J2 Kunden** | 1.500 | 3.000 | 6.000 |
| **J1 ARR** | €27.000 | €90.000 | €144.000 |
| **J2 ARR** | €270.000 | €540.000 | €1.080.000 |

## Break-Even

- Break-Even Kunden: ~580
- Break-Even Zeitpunkt: Q2 2027

---

# Roadmap

| Phase | Zeitraum | Meilensteine |
|---|---|---|
| **Pre-Seed** | Q2 2026 | MVP Launch, Pilot-Start |
| **Launch** | Q3–Q4 2026 | 500 Kunden |
| **Seed** | Q1 2027 | €500K, 1.000 Kunden |
| **Wachstum** | 2027 | 5.000 Kunden, Break-Even |
| **Series A** | Q3 2028 | DACH-Expansion |

---

# Kapitalbedarf

## Pre-Seed (aktuell)

| | |
|---|---|
| **Betrag** | €150.000 |
| **Post-Money Bewertung** | €1.000.000 |
| **Anteile** | 15% |

## Exit-Szenarien

| Szenario | ARR bei Exit | Multiple | Exit-Wert |
|---|---|---|---|
| Konservativ | €2M | 8x ARR | €16M |
| Basis | €5M | 10x ARR | €50M |
| Optimistisch | €10M | 12x ARR | €120M |

---

# Fazit

**Power Energy GmbH** ist timing-perfect positioniert im Bereich AI-gesteuerter Energieoptimierung für Österreich.

## Investment-Thesis

- **Markt:** €1,65B TAM, wachsend durch Regulierung
- **Produkt:** Cloud-basierter AI Energy Orchestrator, MVP fertig
- **Differenzierung:** E-Control-konform, Made in Austria, keine Hardware-Einstiegskosten
- **Ökonomie:** 12:1 LTV:CAC, 8 Monate Payback, 75% Bruttomarge

## Was wir suchen

| | |
|---|---|
| **Investment** | €150.000 Pre-Seed |
| **Anteile** | 15% |
| **Use of Funds** | MVP Launch, Pilot, Regulatory |

## Kontakt

- **Email:** hello@power-energy.at
- **Website:** www.power-energy.at (coming soon)

---

*Erstellt: April 2026 | BusinessPlan Architect Pro*
