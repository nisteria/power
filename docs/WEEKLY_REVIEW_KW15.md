# Power Weekly Review — KW15 (2026-03-24 bis 2026-03-27)

## Projekt: Power
**Periode:** 24.03.–27.03.2026 (KW15)
**Review durch:** power-ceo
**Datum:** 27.03.2026

---

## 1. Was hat diese Woche funktioniert? ✅

### Strategischer Pivots ✅
| Was | Status | Notes |
|-----|--------|-------|
| **Investor-Docs erstellt** | ✅ | Teaser, Financial Model, Outreach List (10 Investoren), Email Templates |
| **PreSeed verworfen** | ✅ | Direkt-Investorsuche beschlossen |
| **Struktur für Outreach** | ✅ | Alle Docs vorhanden, kein Förder-Bürokratie-Overhead |

### agent4my (Nebenschauplatz, aber relevant für Learnings)
| Was | Status | Notes |
|-----|--------|-------|
| **Website gebaut** | ✅ | Next.js, Dark Theme, deploy-fertig |
| **Social Media Posts** | ✅ | Facebook, LinkedIn, X — Posts erfolgreich |
| **Canva Connect OAuth** | ✅ | Bildgenerierung möglich (API funktioniert) |
| **Voice-Proxy Server** | ✅ | Node.js + Ed25519, Gateway-Verbindung ✅ |

### Social Media Posting
- Facebook/LinkedIn/X Browser-Automation funktioniert (Text + Links)
- **Learnings:** Bild-Upload via Browser-Sandbox nicht möglich; Facebook Graph API mit Page Token ist die Lösung

### Gateway/Config
- Config-Patch-Regel verinnerlicht: NIEMALS `hooks.token` = `gateway.auth.token`
- OpenClaw Protocol v3 nutzt Ed25519 (nicht RSA)

---

## 2. Blocker & Risiken 🔴

| Blocker | Impact | Status |
|---------|--------|--------|
| **Gmail nicht eingerichtet** | Kann keine Cold Emails senden — Investor-Outreach blockiert | 🔴 KRITISCH |
| **Data Room nicht live** | Investoren haben nichts zum Downloaden | 🔴 KRITISCH |
| **Andreas Wirth Email** | Erste BA-Kontaktaufnahme seit Tagen bereit, nicht gesendet | 🟡 HOCH |
| **Respark.io Profil** | BA-Netzwerk noch nicht aktiviert | 🟡 HOCH |
| **LinkedIn-Kommentar von Chris** | ROI-Frage offen — sollte beantwortet werden | 🟡 MITTEL |

### Risiken
| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **Investoren-Outreach verzögert sich** | HOCH | HOCH | Gmail + Data Room SOFORT einrichten |
| **Cap Table + Financial Model veraltet** | MITTEL | HOCH | Nach Investor-Feedback aktualisieren |
| **Power vs. agent4my Kapazitätskonflikt** | HOCH | MITTEL | Klare Priorisierung: Power PRIMARY |

---

## 3. Fortschritt diese Woche

### KW15 Fortschritt
| Meilenstein | Status | Datum |
|-------------|--------|-------|
| MVP Phasen 1-3 | ✅ ABGESCHLOSSEN | KW13 |
| Strategiewechsel → Investoren | ✅ | 24.03. |
| Investor-Docs erstellt | ✅ | 24.03. |
| agent4my Website + Posts | ✅ | 25.03. |
| Canva Connect OAuth | ✅ | 27.03. |
| Voice-Proxy Server | ✅ | 26.03. |
| Gmail-Alias einrichten | 🔴 OFFEN | — |
| Data Room live | 🔴 OFFEN | — |
| Erste Cold Email senden | 🔴 OFFEN | — |

### Kennzahlen
- **Letzte aktive Arbeit an Power:** 24.03. (Investor-Docs)
- **Tage seit letzter Power-Arbeit:** 3 (25.–27.03. war agent4my fokussiert)
- **Investor-Docs:** 100% vorhanden
- **Gmail-Versand:** 0% (blockiert)
- **Data Room:** 0% (nicht gestartet)

---

## 4. KW16 Prioritäten mit ETA

### 🔴 KRITISCH (diese Woche)
| # | Action | ETA | Blocker |
|---|--------|-----|---------|
| 1 | **Gmail Email-Versand einrichten** (App-Password oder Alias) | 28.03. (Sa) | gmail credentials nötig |
| 2 | **Data Room auf OneDrive erstellen** + alle Unterlagen hochladen | 28.03. (Sa) | OneDrive-Zugang |
| 3 | **Erste Cold Email an Andreas Wirth** (BA, Test-Outreach) | 28.03. (Sa) | gmail + email template fertig |
| 4 | **Respark.io Profil erstellen/aktivieren** | 29.03. (So) | respark.io Account |
| 5 | **Cap Table prüfen/aktualisieren** | 29.03. (So) | Lech muss Zahlen liefern |

### 🟡 WICHTIG (kommende Woche)
| # | Action | ETA | Notes |
|---|--------|-----|-------|
| 6 | **Weitere 5–10 Investoren kontaktieren** (VCs + BAs) | KW16 | Outreach List vorhanden |
| 7 | **Executive Summary finalisieren** (1-Pager) | KW16 | Template vorhanden, ausfüllen |
| 8 | **LinkedIn Kommentar Chris beantworten** | SOFORT | ROI-Zahlen für agent4my |
| 9 | **Pitch Meeting vorbereiten** (wenn sich Investor meldet) | KW16 | Alle Docs vorhanden |

---

## 5. Learnings

### Diese Woche gelernt
1. **Browser-Automation Bild-Upload:** Facebook/LinkedIn Browser-Upload schlägt in Sandbox fehl → Lösung: Facebook Graph API mit Page Access Token
2. **Config-Patch-Regel:** hooks.token ≠ gateway.auth.token (Gateway stirbt sonst)
3. **Protocol v3 Auth:** Ed25519-Signatur statt RSA — Voice-Proxy Server nutzt korrektes Protokoll
4. **Investoren-Outreach:** Docs sind da — jetzt braucht es nur funktionierende Email + Data Room

### Agent-Evaluation KW15
- **power-ceo:** 8/12 — Investor-Docs ✅, Outreach blockiert durch Gmail/Email
- **Voltag:** Nicht diese Woche evaluiert
- **agent4my:** Aktiv (parallel, aber eigenes Projekt)

---

## 6. Nächste konkrete Schritte (priorisiert)

```
1. [Sa 28.03.] Gmail einrichten → Email-Versand möglich machen
2. [Sa 28.03.] OneDrive Data Room erstellen → Unterlagen hochladen
3. [Sa 28.03.] Erste Cold Email an Andreas Wirth
4. [So 29.03.] Respark.io Account aktivieren/profilieren
5. [So 29.03.] Cap Table mit Lech finalisieren
6. [KW16]    5–10 weitere Investoren kontaktieren
7. [OFFEN]   LinkedIn Kommentar Chris beantworten
```

---

## 7. Entscheidungen die Lech braucht

| # | Frage | Optionen | Priorität |
|---|-------|----------|-----------|
| 1 | **Welches Gmail für Investor-Emails?** | Eigenes Gmail vs. Business-Alias | 🔴 SOFORT |
| 2 | **OneDrive oder SharePoint für Data Room?** | OneDrive (schneller) vs. SharePoint (professioneller) | 🔴 Sa 28.03. |
| 3 | **Wieviel Zeit für Power vs. agent4my?** | Power PRIMARY bis Investor-Funding gesichert | 🟡 KW16 |
