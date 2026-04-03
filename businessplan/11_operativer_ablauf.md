# 11 Operativer Ablauf — Power Energy GmbH

## 11.1 Wertschöpfungskette

```
                    Kunden-Onboarding
                          ↓
[Kunde] → [Smart-Meter] → [Power Cloud] ← [Geräte]
              ↓               ↓               ↓
         Datenfluss    KI-Optimierung   Steuerung
                          ↓
                    [Dashboard]
                          ↓
                    [Support/Success]
```

---

## 11.2 Kernprozesse

### 11.2.1 Kunden-Onboarding

| Phase | Beschreibung | Dauer | Verantwortlich |
|---|---|---|---|
| 1. Registration | Kunde erstellt Account | 5 Min | Self-Service |
| 2. Smart-Meter | Anbindung über Gateway/API | 15 Min | Support |
| 3. Geräte | Verbindung der Geräte | 10–30 Min | Kunde/Partner |
| 4. Konfiguration | Einstellungen, Präferenzen | 10 Min | Kunde |
| 5. Go-Live | Optimierung startet | 1 Min | Automatisch |

**Gesamt:** 30–60 Minuten

---

### 11.2.2 Laufender Betrieb

| Prozess | Beschreibung | Häufigkeit |
|---|---|---|
| **Datensynchronisation** | Smart-Meter Daten → Cloud | Minütlich |
| **Preis-Updates** | EPEX-Spot laden | Täglich (14:00) |
| **Optimierung** | KI berechnet optimalen Plan | Täglich |
| **Steuerung** | Geräte werden angesteuert | Bei Bedarf |
| **Reporting** | Dashboard-Daten aktualisiert | Echtzeit |
| **Backup** | Daten-Backup | Täglich |

---

### 11.2.3 Support-Prozess

| Tier | Problem | Reaktionszeit | Lösung |
|---|---|---|---|
| **Tier 1** | Allgemeine Fragen | <24h | Dokumentation, FAQ |
| **Tier 2** | Technische Probleme | <8h | Remote-Support |
| **Tier 3** | Kritische Ausfälle | <1h | Engineer Escalation |

**Support-Kanäle:**
- In-App Chat
- Email: support@power-energy.at
- Dokumentation: docs.power-energy.at

---

## 11.3 Technische Architektur

### 11.3.1 Systemübersicht

```
                    ┌─────────────────┐
                    │   Kunden-Device   │
                    │  (Smartphone/PC)  │
                    └────────┬──────────┘
                             │ HTTPS
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                     AWS Cloud (Frankfurt)                    │
│                                                              │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────────┐    │
│  │  Next.js │   │ Fastify  │   │   ML Pipeline        │    │
│  │ Frontend │◄──│   API    │◄──│   (Python/scikit)   │    │
│  └──────────┘   └────┬─────┘   └──────────────────────┘    │
│                      │                                       │
│             ┌────────▼────────┐                              │
│             │   PostgreSQL /  │                              │
│             │   TimescaleDB   │                              │
│             └─────────────────┘                              │
│                                                              │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────────┐    │
│  │  Smart   │   │  Device  │   │   External APIs       │    │
│  │  Meter   │   │  Hub     │   │   (EPEX, Weather)    │    │
│  │  Gateway │   │          │   │                      │    │
│  └──────────┘   └──────────┘   └──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 11.3.2 Tech Stack

| Komponente | Technologie |备注 |
|---|---|---|
| **Frontend** | Next.js, React, TailwindCSS | PWA-fähig |
| **Backend** | Fastify, Node.js, TypeScript | REST API |
| **Database** | PostgreSQL, TimescaleDB | Zeitreihendaten |
| **ML** | Python, scikit-learn, pandas | Optimierung |
| **Infrastructure** | AWS ECS, RDS, S3 | Production |
| **CI/CD** | GitHub Actions | Automatisiert |
| **Monitoring** | [Benötigte Information] | Observability |

---

## 11.4 Qualitätssicherung

### 11.4.1 Test-Strategie

| Test-Typ | Abdeckung | Automatisiert |
|---|---|---|
| **Unit Tests** | Alle Functions | ✅ Ja |
| **Integration Tests** | API Endpoints | ✅ Ja |
| **E2E Tests** | Kritische Flows | ⚠️ Teilweise |
| **Performance Tests** | API Latenz | ❌ Manuell |
| **Security Tests** | OWASP Top 10 | ⚠️ Teilweise |

### 11.4.2 Monitoring & Alerting

| Metrik | Schwellwert | Alert |
|---|---|---|
| **API Response Time** | >500ms | Warning |
| **Error Rate** | >1% | Critical |
| **Database Connections** | >80% | Warning |
| **Disk Usage** | >70% | Warning |

---

## 11.5 Sicherheit & Compliance

### 11.5.1 Datensicherheit

| Maßnahme | Umsetzung |
|---|---|
| **Verschlüsselung (Transit)** | TLS 1.3 |
| **Verschlüsselung (at Rest)** | AES-256 |
| **Zwei-Faktor-Auth** | Für Admin-Zugänge |
| **Regelmäßige Backups** | Täglich, 30 Tage Retention |
| **Penetration Testing** | [Benötigte Information] |

### 11.5.2 DSGVO-Compliance

| Anforderung | Umsetzung |
|---|---|
| **Einwilligung** | Klare Opt-In bei Registration |
| **Auskunftsrecht** | Export-Funktion in Dashboard |
| **Löschrecht** | "Account löschen" Funktion |
| **Auftragsverarbeitung** | AV-Verträge mit AWS |
| **Datenspeicherort** | AWS Frankfurt (EU) |

---

## 11.6 Infrastruktur-Kosten (monatlich)

| Service | Y1 (ø Kunden) | Y2 | Y3 |
|---|---|---|---|
| **AWS ECS (Compute)** | €200 | €500 | €1.000 |
| **AWS RDS (Database)** | €150 | €300 | €600 |
| **AWS S3 (Storage)** | €50 | €100 | €200 |
| **Datentransfer** | €100 | €300 | €600 |
| **Domain/SSL** | €20 | €20 | €20 |
| **Monitoring** | €50 | €100 | €200 |
| **Sonstiges** | €30 | €80 | €180 |
| **Gesamt** | **€600** | **€1.400** | **€2.800** |

---

*Erstellt: April 2026 | BusinessPlan Architect Pro*
