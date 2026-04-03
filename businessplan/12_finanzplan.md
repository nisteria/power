# 12 Finanzplan — Power Energy GmbH

## 12.1 Revenue-Projektion

### 12.1.1 Umsatzannahmen

| Annahme | Wert | Quelle |
|---|---|---|
| Ø ARPU/Monat | €15 | Gewichtet (70% Pro, 20% Basic, 10% Business) |
| J1 Kunden (Basis) | 500 | Konservativ |
| J2 Kunden (Basis) | 3.000 | Wachstum 500% YoY |
| J3 Kunden (Basis) | 10.000 | Fortgesetztes Wachstum |
| Preissteigerung | +5%/Jahr | Erhöhung bei Upsells |

### 12.1.2 Szenarien

| | Bear | Basis | Bull |
|---|---|---|---|
| **J1 Kunden** | 150 | 500 | 800 |
| **J2 Kunden** | 1.500 | 3.000 | 6.000 |
| **J3 Kunden** | 5.000 | 10.000 | 15.000 |
| **J1 ARR** | €27.000 | €90.000 | €144.000 |
| **J2 ARR** | €270.000 | €540.000 | €1.080.000 |
| **J3 ARR** | €900.000 | €1.800.000 | €2.700.000 |

---

## 12.2 Kostenplanung

### 12.2.1 Personalkosten

| Position | J1 | J2 | J3 |
|---|---|---|---|
| CEO (Gründer, equity) | €0 | €0 | €6.000/Mt |
| CTO (Gründer, equity) | €0 | €0 | €6.000/Mt |
| Backend Developer | €0 | €6.500/Mt | €6.500/Mt |
| Frontend Developer | €0 | €5.500/Mt | €5.500/Mt |
| Customer Success | €3.500/Mt | €4.000/Mt | €5.000/Mt |
| Marketing Manager | €0 | €0 | €5.000/Mt |
| **Total/Monat** | **€3.500** | **€16.000** | **€28.000** |
| **Total/Jahr** | **€42.000** | **€192.000** | **€336.000** |

### 12.2.2 Fixkosten

| Position | J1 | J2 | J3 |
|---|---|---|---|
| Server/Infrastruktur | €800/Mt | €2.500/Mt | €5.000/Mt |
| Software-Lizenzen | €300/Mt | €800/Mt | €1.200/Mt |
| Marketing (安排了) | €2.000/Mt | €5.000/Mt | €10.000/Mt |
| Buchhaltung/Legal | €400/Mt | €600/Mt | €800/Mt |
| Office/Admin | €200/Mt | €500/Mt | €1.000/Mt |
| **Total/Monat** | **€3.700** | **€9.400** | **€18.000** |
| **Total/Jahr** | **€44.400** | **€112.800** | **€216.000** |

### 12.2.3 Variable Kosten

| Position | Kosten | Bemerkung |
|---|---|---|
| Support pro Kunde | €2/Kunde/Mt | Skaliert mit Kundenbasis |
| Payment Gateway | 2,5% Revenue | SEPA/Kreditkarte |
| Cloud-Zusatz ab 500 Kunden | €0,50/Kunde/Mt | Ab J2 relevant |

---

## 12.3 Profit & Loss Statement (Basis-Szenario)

| | J1 | J2 | J3 |
|---|---|---|---|
| **Umsatz** | €90.000 | €540.000 | €1.800.000 |
| - Variable Kosten | €2.700 | €16.200 | €54.000 |
| **Bruttomarge** | €87.300 | €523.800 | €1.746.000 |
| **Bruttomarge %** | 97% | 97% | 97% |
| | | | |
| - Personalkosten | €42.000 | €192.000 | €336.000 |
| - Fixkosten | €44.400 | €112.800 | €216.000 |
| **Operating Expense** | €86.400 | €304.800 | €552.000 |
| | | | |
| **EBITDA** | €900 | €219.000 | €1.194.000 |
| **EBITDA %** | 1% | 41% | 66% |
| | | | |
| - Abschreibungen | €5.000 | €10.000 | €15.000 |
| **EBIT** | €-4.100 | €209.000 | €1.179.000 |
| **EBIT %** | -5% | 39% | 65% |

---

## 12.4 Cashflow-Planung (24 Monate)

### Quartalsweise

| Quartal | Einnahmen | Ausgaben | Netto | Kumuliert |
|---|---|---|---|---|
| Q2 2026 | €0 | €5.100 | **-€5.100** | -€5.100 |
| Q3 2026 | €1.500 | €12.100 | **-€10.600** | -€15.700 |
| Q4 2026 | €10.000 | €19.000 | **-€9.000** | -€24.700 |
| Q1 2027 | €22.000 | €25.000 | **-€3.000** | -€27.700 |
| Q2 2027 | €38.000 | €26.500 | **+€11.500** | -€16.200 |
| Q3 2027 | €54.000 | €30.000 | **+€24.000** | +€7.800 |
| Q4 2027 | €75.000 | €35.000 | **+€40.000** | +€47.800 |
| Q1 2028 | €95.000 | €40.000 | **+€55.000** | +€102.800 |

### Annahmen
- PreSeed €150K fließt Q2 2026 ein
- Seed €500K fließt Q1 2027 ein
- Personalausbau wie geplant

---

## 12.5 Break-Even-Analyse

| Metrik | Wert |
|---|---|
| Monatliche Fixkosten (J1 avg) | €7.200 |
| Variable Kosten pro Kunde/Mt | €2,50 |
| Ø ARPU/Mt | €15 |
| **Bruttomarge pro Kunde/Mt** | **€12,50** |
| **Break-Even Kunden** | **~580 Kunden** |
| **Break-Even Zeitpunkt** | **Q2 2027** |

---

## 12.6 Bilanz (Vorschau)

| | J1 | J2 | J3 |
|---|---|---|---|
| **Aktiva** | | | |
| Kasse | €80.000 | €400.000 | €1.500.000 |
| Forderungen | €7.500 | €45.000 | €150.000 |
| Anlagevermögen | €15.000 | €25.000 | €35.000 |
| **Gesamt** | **€102.500** | **€470.000** | **€1.685.000** |
| | | | |
| **Passiva** | | | |
| Eigenkapital | €85.000 | €435.000 | €1.635.000 |
| Verbindlichkeiten | €17.500 | €35.000 | €50.000 |
| **Gesamt** | **€102.500** | **€470.000** | **€1.685.000** |

---

## 12.7 Key Metrics Dashboard

| Metrik | J1 | J2 | J3 | Ziel |
|---|---|---|---|---|
| **ARR** | €90K | €540K | €1,8M | €1M by Y3 |
| **MRR** | €7.500 | €45.000 | €150.000 | — |
| **Kunden** | 500 | 3.000 | 10.000 | 3K by Y2 |
| **CAC** | €150 | €130 | €120 | <€150 |
| **LTV:CAC** | 12:1 | 14:1 | 15:1 | >10:1 |
| **Churn (mtl.)** | 2% | 1,5% | 1% | <2% |
| **Burn Rate** | €7.200/Mt | €15.000/Mt | €20.000/Mt | — |
| **Runway** | 18 Monate | 24 Monate | 36 Monate | >12 Monate |

---

## 12.8 Finanzierungsbedarf

| Runde | Betrag | Zeitpunkt | Use of Funds |
|---|---|---|---|
| **Pre-Seed (jetzt)** | €150K | Q2 2026 | MVP, Pilot |
| **Seed** | €500K | Q1 2027 | Team, Wachstum |
| **Series A** | €2M | Q3 2028 | Skalierung DACH |

---

*Erstellt: April 2026 | BusinessPlan Architect Pro*
