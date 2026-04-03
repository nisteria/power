# Power Energy Orchestrator

<div align="center">

![Power Energy](https://img.shields.io/badge/Power-Energy-22c55e?style=for-the-badge)
![Made in Austria](https://img.shields.io/badge/Made_in-Austria-000000?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Intelligent energy management for Austrian households and businesses.

</div>

## 🎯 What is Power?

Power is an AI-driven energy orchestration platform that automatically optimizes:
- **Battery storage** charging/discharging
- **Wallbox** (EV charging) scheduling
- **Heat pumps** and smart appliances
- **Dynamic tariff** selection

Built for the Austrian market with local grid operator integrations.

## 🚀 Quick Start

```bash
# Clone and setup
git clone https://github.com/power-energy/power.git
cd power

# Start development
docker-compose up -d
pnpm install
pnpm dev
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for production setup.

## 📱 Features

- 📊 **Real-time Dashboard** - Live energy flow monitoring
- ⚡ **Smart Scheduling** - AI-optimized device control
- 💰 **Dynamic Tariffs** - Automatic EPEX spot price optimization
- 📈 **Analytics** - Consumption patterns and savings reports
- 🔌 **Device Integration** - Battery, Wallbox, Heat Pump support
- 📱 **Mobile Ready** - Progressive Web App

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Web UI    │────▶│  Fastify    │────▶│ PostgreSQL  │
│  (Next.js)  │     │     API     │     │ +TimescaleDB│
└─────────────┘     └──────┬──────┘     └─────────────┘
                         │
                  ┌──────▼──────┐
                  │   Worker    │
                  │  (Jobs)     │
                  └──────┬──────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐     ┌───────────┐     ┌─────────┐
   │  EPEX   │     │  Netzb.   │     │ Devices │
   │  Prices │     │   APIs    │     │  (IoT)  │
   └─────────┘     └───────────┘     └─────────┘
```

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [API_SPEC.md](docs/API_SPEC.md) - API documentation
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Data model

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, Tailwind |
| Backend | Node.js, Fastify, TypeScript |
| Database | PostgreSQL, TimescaleDB |
| Cache | Redis |
| AI | Custom optimization algorithm |
| Deploy | Docker, Kubernetes |

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🇦🇹 Made in Austria

Power Energy - Intelligent energy management, Austrian engineered.
