# Cycle Route Planner 🚲

This project is a specialized routing application designed to provide optimized cycling paths, utilizing advanced routing engines to offer a professional-grade experience.

## 🔗 Project Resources
* **Task Management:** [Linear Board](https://linear.app/vanemarendajaks/project/bike-routing-project-8f5335b90c85)
* **Meetings:** [Google Meet Link](https://meet.google.com/gbi-prhd-seq)
* **Estimation Tool:** [Planning Poker Online](https://planningpokeronline.com/)

## 👥 Project Team
* **Infrastructure & Setup:** Raivo (@RaivoT), Oliver (@olivertiks)
* **Frontend Development:** Gretlin (@gretlin-prukk)
* **Backend Development:** Lukas (@lukashaavel)
* **Quality Assurance & Documentation:** Natalia Egorova (@velesegorova12-code), Anett (@anettagr)

## 🛠 Tech Stack
* **Routing Engines:** BRouter, Digitransit (OTP2)
* **Backend:** Java (Spring Boot)
* **Frontend:** React + Vite SPA, TypeScript

---

# 💻 Technical Documentation & Standards

## 🏗 Architectural Structure
The project follows a strict modular directory structure:
* **src/api/** — HTTP layer & **apiClient** (axios wrapper)
* **src/app/** — Core setup (routes, providers, navigation)
* **src/components/** — Shared UI primitives
* **src/features/** — Feature modules (pages and business logic)
* **src/lib/** — Third-party library wrappers (Dependency Abstraction)
* **src/models/** — Domain types and entity models
* **src/theme/** — Design tokens and global styles

## 🛠 Automation Scripts
* `npm run dev` — Starts development server
* `npm run build` — Production bundling
* `npm run lint` — Code validation (ESLint)
* `npm run format` — Enforces code style (Prettier)
* `npm run i18n:extract` — Translation key management

## 🐳 Deploying with Docker
```bash
docker compose build --build-arg VITE_API_BASE_URL=https://api.example.com
docker compose up -d
