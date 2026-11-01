# 🐱 Kotik in the World of Arithmetic

Обучающая игра-кроссворд с арифметическими примерами для детей 5–9 лет.

## Технологии:

### Frontend (Client):
- React 18 + TypeScript + Vite
- PWA (offline mode)
- Emotion (CSS-in-JS стилизация)
- Адаптивная верстка (мобильные + десктоп)

### Backend (Server):
- NestJS 10.x + TypeScript
- Prisma ORM (PostgreSQL)
- Zod валидация
- Модульная архитектура

## Структура проекта:
```
kotik-arithmetic/
├── apps/
│   ├── client/          # React приложение (PWA)
│   └── server/          # NestJS API сервер
├── packages/
│   └── shared/          # Shared типы и валидация (Zod)
└── .tasks/              # Задания по архитектуре
```

## Локальный запуск:

### Backend:
```bash
cd apps/server
npm install
npm run dev
```

### Frontend:
```bash
cd apps/client
npm install
npm run dev
```

### База данных (PostgreSQL):
```bash
npx prisma migrate dev
npx prisma generate
```

## API Endpoints:
- `POST /auth/register` — Регистрация
- `POST /auth/login` — Вход
- `GET /stats` — Статистика

## Документация:
- [DevOps Guide](./.tasks/02-техническая-архитектура/devops-guide.md)
- [PM2 Config](./.tasks/02-техническая-архитектура/pm2-guide.md)
- [PostgreSQL Backup](./.tasks/02-техническая-архитектура/postgres-backup-guide.md)
- [Prisma Migrations](./.tasks/02-техническая-архитектура/prisma-migrations.md)
- [Nginx Config](./.tasks/02-техническая-архитектура/nginx-config-example.conf)

## Требования к системе:
- Node.js >= 18.0.0
- PostgreSQL >= 15
- Docker (опционально)

## Лицензия:
MIT License