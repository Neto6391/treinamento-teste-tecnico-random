# Desafio: Treinamento NestJS + Angular com Bugs para Correção

Este repositório contém **um projeto full‑stack propositalmente com erros**. Sua missão é corrigir os problemas
indicados nas instruções abaixo e fazer tudo rodar: build, testes e pipeline.

## Stack / Requisitos

- Node.js **>= 20**
- **NestJS 10+**
- **Angular 18+** (projeto standalone, sem NgModule)
- **SQLite** (config via `.env` do backend)
- Docker + docker-compose (opcional, mas pedido no exercício)
- GitHub Actions (pipeline CI/CD de exemplo)

## Como rodar (local)

```bash
# 1) Backend
cd backend
cp .env.example .env
npm install
npm run start:dev

# 2) Frontend
cd ../frontend
npm install
npm start
```

---

## Scripts

### Backend

- `npm run start:dev` — serve com `ts-node-dev`
- `npm test` — unit tests (Jest)
- `npm run test:e2e` — E2E (Supertest)

### Frontend

- `npm start` — serve via Angular CLI
- `npm test` — unit tests (Karma/Jasmine)
- `npm run e2e` — E2E (Playwright simplificado)
