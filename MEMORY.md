# MEMORY.md — Long-Term Project Memory (Power)

## Projektkern
- Power = Austrian Energy Orchestrator (Made in Austria)
- Fokus: Tarifoptimierung + Geräteorchestrierung + Web/App-Steuerung
- Startstrategie: zuerst EMS-Plattform, nicht sofort eigener Stromlieferant

## Konkurrenz-Referenz
- EcoFlow als Benchmark:
  - Crowdfunding → strategische Supply-Chain-Investoren → VC-Scale
  - Produktpfad von mobiler Powerstation zu Home-Energy-Ökosystem

## Build-Strategie Power
- 4-Phasen-Modell in `PHASE_PLAN.md`
- Arbeit nur auf aktiver Phase
- Nach Phasenabschluss: Stop + Freigabe durch Lech

## Operatives System
- Live-Dashboard auf `http://localhost:4177`
- Activity-Log als zentrale Wahrheit: `POWER_AGENT_ACTIVITY.md`
- Erledigte Aufgaben werden in `PROJECT_TODO.md` per `[x]` markiert

## Governance
- Eigener OpenClaw Agent: `power-ceo`
- Power-Repo als dedizierter Workspace
