# Power Energy GmbH — Financial Model (Investor Version)

**Stage:** Pre-Seed | **Raise:** €150,000 | **Date:** März 2026  
**Horizont:** 24 Monate (April 2026 – März 2028)

---

## 1. Revenue Model

### 1.1 Pricing Tiers

| Tier | Monatlich | Jährlich | Zielgruppe | Enthalten |
|------|-----------|----------|-------------|-----------|
| Basic | €9,90 | €118,80 | Haushalt | Tarifalarme, Analytics |
| **Pro** | **€19,90** | **€238,80** | **Haushalt + PV** | **Auto-Optimierung, Gerätesteuerung** |
| Business | €49,90 | €598,80 | SME | Multi-Site, API, SLA |

**Annahme:** Gewichteter durchschnittlicher ARPU = **€15/Monat** (70% Pro, 20% Basic, 10% Business)

### 1.2 Kundenszenarien

| | **Bear** | **Basis** | **Bull** |
|---|---|---|---|
| Y1 Endkunden | 150 | 500 | 800 |
| Y2 Endkunden | 1.500 | 3.000 | 6.000 |
| Y3 Endkunden | 5.000 | 10.000 | 15.000 |
| Y1 ARR | €27.000 | €90.000 | €144.000 |
| Y2 ARR | €270.000 | €540.000 | €1.080.000 |
| Y3 ARR | €900.000 | €1.800.000 | €2.700.000 |

### 1.3 Monthly Recurring Revenue (MRR) — Basis-Szenario

| Monat | Kunden | ARPU | MRR |
|-------|--------|------|-----|
| Jun 2026 | 20 | €15 | €300 |
| Sep 2026 | 100 | €16 | €1.600 |
| Dez 2026 | 500 | €17 | €8.500 |
| Mär 2027 | 1.200 | €18 | €21.600 |
| Jun 2027 | 1.800 | €19 | €34.200 |
| Sep 2027 | 2.400 | €19 | €45.600 |
| Dez 2027 | 3.000 | €19,50 | €58.500 |
| Mär 2028 | 4.000 | €20 | €80.000 |

---

## 2. Cost Structure

### 2.1 Fixkosten (monatlich, ab Y1)

| Position | Y1 (€/Mt) | Y2 (€/Mt) |
|----------|-----------|-----------|
| Server/Infrastructure (AWS) | 800 | 2.500 |
| Software-Lizenzen (SaaS) | 300 | 800 |
| Buchhaltung/Legal | 400 | 600 |
| Office & Admin | 200 | 500 |
| **Total Fixkosten** | **€1.700** | **€4.400** |

### 2.2 Personalkosten (monatlich)

| Rolle | Wann | Gehalt (brutto) | Anmerkung |
|-------|------|-----------------|-----------|
| CTO (Gründer-seitig) | ab Apr 2026 | €0 (equity) | Erstes Jahr ohne Gehalt |
| CEO (Gründer-seitig) | ab Apr 2026 | €0 (equity) | Erstes Jahr ohne Gehalt |
| Customer Support | ab Jul 2026 | €3.500 | Wachstum mit Kunden |
| Backend Developer | ab Jan 2027 | €6.500 | Seed-finanziert |
| Frontend Developer | ab Jan 2027 | €5.500 | Seed-finanziert |
| CEO Gehalt | ab Jul 2027 | €6.000 | Nach Seed-Runde |

### 2.3 Variable Kosten (pro Kunde)

| Position | Kosten | Bemerkung |
|----------|--------|-----------|
| Support-Kosten | €2/Kunde/Mt | Skaliert mit Kundenbasis |
| Payment Gateway | 2,5% v. Revenue | SEPA/Kreditkarte |
| Cloud Costs (追加) | €0,50/Kunde/Mt | Bei >500 Kunden relevant |

### 2.4 CAC (Customer Acquisition Cost)

| Kanal | Kosten | Conversion |
|-------|--------|------------|
| Solar-Installateure (Partner) | €50 | Hoch |
| Google Ads | €150 | Mittel |
| Content/SEO | €80 | Niedrig |
| **Ø CAC** | **€150** | — |

---

## 3. Cashflow-Planung (24 Monate) — Basis-Szenario

### Monatlicher Burn (Detail)

| Phase | Zeitraum | Burn/Monat | Kumuliert |
|-------|----------|------------|-----------|
| **Foundation** | Q2 2026 (Apr–Jun) | ~€12.000 | -€36.000 |
| **MVP Live** | Q3 2026 (Jul–Sep) | ~€15.000 | -€81.000 |
| **Launch** | Q4 2026 (Okt–Dez) | ~€18.000 | -€135.000 |
| **Scale** | Q1 2027 (Jan–Mär) | ~€28.000 | -€219.000 |
| **Wachstum** | Q2 2027 (Apr–Jun) | ~€35.000 | -€324.000 |
| **Revenue Takeoff** | Q3–Q4 2027 | €35.000→€20.000 | -€420.000 |
| **Break-Even Path** | Q1–Q2 2028 | €20.000→€5.000 | -€470.000 |

### Cashflow-Tabelle (Quartalsweise, Basis)

| Quartal | Einnahmen | Personalkosten | Fixkosten | Var. Kosten | **Netto** | **Kumuliert** |
|---------|-----------|---------------|-----------|-------------|-----------|--------------|
| Q2 2026 | €0 | €0 | €5.100 | €0 | **-€5.100** | -€5.100 |
| Q3 2026 | €1.500 | €7.000 | €5.100 | €200 | **-€10.800** | -€15.900 |
| Q4 2026 | €10.000 | €14.000 | €5.100 | €1.000 | **-€10.100** | -€26.000 |
| Q1 2027 | €22.000 | €26.000 | €7.500 | €2.400 | **-€11.900** | -€37.900 |
| Q2 2027 | €38.000 | €26.000 | €7.500 | €3.600 | **+€900** | -€37.000 |
| Q3 2027 | €54.000 | €30.000 | €8.000 | €5.400 | **+€10.600** | -€26.400 |
| Q4 2027 | €75.000 | €35.000 | €8.500 | €7.500 | **+€24.000** | -€2.400 |
| Q1 2028 | €95.000 | €40.000 | €9.000 | €9.500 | **+€36.500** | +€34.100 |

> **Hinweis:** Cashflow ab Q2 2027 positiv (operativ). Annahme: Seed-Runde €500K im Q1 2027 sichert Payroll.

---

## 4. Break-Even-Analyse

### 4.1 Break-Even Point

| Metrik | Wert |
|--------|------|
| Monatliche Fixkosten (Y1 avg) | €13.200 |
| Variable Kosten pro Kunde/Mt | €2,50 |
| Ø ARPU/Mt | €17 |
| **Bruttomarge pro Kunde/Mt** | **€14,50** |
| **Break-Even Kunden (Fixkosten)** | **910 Kunden** |
| **Break-Even inkl. variable Kosten** | **~1.050 Kunden** |

### 4.2 Burn Rate & Runway

| Phase | Burn Rate | Runway mit €150K |
|-------|-----------|------------------|
| Pre-Seed (Q2–Q4 2026) | €11.500/Mt | 13 Monate |
| Nach Seed €500K (Q1 2027) | €28.000/Mt | 18 Monate |
| Nach Series A €2M (Q3 2028) | €50.000/Mt | 40 Monate |

---

## 5. Cap Table (Vorschlag)

### 5.1 Aktuelle Struktur (Post-Money €150K)

| Gesellschafter | Anteil | Anteile | Bewertung |
|----------------|--------|---------|-----------|
| Gründer (CEO + CTO) | 80% | 800 | €800.000 |
| Advisors | 5% | 50 | €50.000 |
| **Investoren (Pre-Seed €150K)** | **15%** | 150 | €150.000 |
| **Gesamt** | **100%** | **1.000** | **€1.000.000** |

### 5.2 Verdünnung (Full Dilution)

| Runde | Bewertung | Investition | Gesamtinvestoren | Gründer | Advisory Pool |
|-------|-----------|-------------|-------------------|---------|---------------|
| Pre-Seed | €1M (post) | €150K | 15% | 80% | 5% |
| Seed | €3–5M | €500K | ~25% | ~70% | 5% |
| Series A | €10–15M | €2M | ~30% | ~65% | 5% |

> **Empfehlung:** 5% Advisor Pool zum Start, 5% Employee Option Pool bei Seed.

### 5.3 Optionen / ESOP

| Pool | Zeitpunkt | Anteil |
|------|-----------|--------|
| Advisor Pool | Jetzt | 5% |
| Employee Pool | Seed-Runde | 5–10% |

---

## 6. Key Metrics für Investoren

### 6.1 Unit Economics

| Metrik | Wert | Benchmark |
|--------|------|-----------|
| **CAC** | €150 | SaaS Avg: €200–300 |
| **LTV** (10 Jahre, 75% Bruttomarge) | €1.800 | — |
| **LTV:CAC Ratio** | **12:1** | Gut: >3, Exzellent: >5 |
| **Payback Period** | 8 Monate | SaaS Avg: 12–18 Mt |
| **Gross Margin** | 75% | SaaS Avg: 70–80% |
| **Magic Number** (ab Y2) | >1,5 | >1 = gut |

### 6.2 Wachstums-KPIs

| Metrik | Y1 | Y2 | Y3 |
|--------|----|----|-----|
| Aktive Kunden | 500 | 3.000 | 10.000 |
| ARR | €90K | €540K | €1,8M |
| MRR | €7.500 | €45.000 | €150.000 |
| YoY Growth | — | 500% | 233% |
| Net Revenue Retention | — | >100% | >110% |

### 6.3 Investoren-Dashboard (monatlich)

| Metrik | Ziel |
|--------|------|
| New MRR | €5K+/Mt ab Launch |
| Churn Rate | <2%/Mt |
| CAC Payback | <12 Monate |
| NRR | >100% |
| Rule of 40 | >40 ab Y3 |

---

## 7. Szenario-Vergleich (24 Monate)

| | **Bear** | **Basis** | **Bull** |
|---|---|---|---|
| Y2 ARR | €270K | €540K | €1.080K |
| Kumulierter Cashburn (24Mt) | -€380K | -€470K | -€400K |
| Break-Even (operativ) | Q4 2027 | Q2 2027 | Q1 2027 |
| **Investor ROI (5x exit, Y5)** | 5x | 8x | 12x |

---

## 8. Use of Funds (€150K Pre-Seed)

| Position | Betrag | % | Ziel |
|----------|--------|---|------|
| MVP-Entwicklung | €80.000 | 53% | Produkt live bringen |
| Pilot-Betrieb | €40.000 | 27% | 50 Pilotkunden |
| Regulatory/Legal | €20.000 | 13% | E-Control, Verträge |
| Team/G&A | €10.000 | 7% | Gründungskosten |
| **Gesamt** | **€150.000** | **100%** | |

**Milestones (12 Monate):**
- M1: MVP komplett (Mt 3)
- M2: 50 Pilotkunden (Mt 6)
- M3: Seed-Ready (Mt 12) — Ziel: €100K+ ARR Pipeline

---

## 9. Exit-Pfade

| Exit-Typ | Voraussetzung | Vergleich |
|----------|---------------|-----------|
| Strategic Acquisition | €1M ARR, marktführend AT | Enpal (DE): €350M Series D |
| Series A Bridge | €500K ARR | €2M @ €10M pre-money |
| IPO | Marktführer Punkt上场 AT | MyTotalEnergies: €1,2B |

**Comparable Multiples:**
- SaaS Energy: 8–15x ARR
- Hardware + SaaS: 5–8x Revenue
- At €1,8M ARR (Y3) → €14–27M Exit-Wert möglich

---

## 10. Annahmen & Risiken

### Annahmen
- Launch Q4 2026 wie geplant
- Seed-Runde €500K im Q1 2027 gesichert
- CAC bleibt bei €150 (Partner-Kanal effektiv)
- Churn <2% Mt (Early Adopters, hohe Zufriedenheit)
- Strompreise bleiben dynamisch (Regulatorik bleibt)

### Risiken

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Verzögerung MVP | Mittel | Hoch | MVP Architektur bereits fertig |
| Seed nicht gesichert | Mittel | Hoch | Pilot-Validierung als Proof |
| Regulatorik-Änderung | Niedrig | Hoch | E-Control-Dialog aktiv |
| Wettbewerb (DE-Anbieter) | Hoch | Mittel | Fokus Österreich, Speed |
| Churn hoch | Mittel | Hoch | 30-Tage-Zufriedenheits-Garantie |

---

*Erstellt: März 2026 | Finance Agent für Power Energy GmbH*
