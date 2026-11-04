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
- Группы и соревнования (архитектурный задел)

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

### Аутентификация
- `POST /auth/register` — Регистрация
- `POST /auth/login` — Вход

### Статистика
- `GET /stats` — Статистика

### Группы (архитектурный задел)
- `POST /groups` — Создание группы
- `GET /groups` — Список групп
- `GET /groups/:id` — Получить группу по ID
- `PUT /groups/:id` — Обновить группу
- `DELETE /groups/:id` — Удалить группу

### Соревнования (архитектурный задел)
- `POST /competitions` — Создание соревнования
- `GET /competitions` — Список соревнований
- `GET /competitions/:id` — Получить соревнование по ID
- `PUT /competitions/:id` — Обновить соревнование
- `DELETE /competitions/:id` — Удалить соревнование
- `POST /competitions/:id/entries` — Регистрация участника в соревновании
- `GET /competitions/:id/entries` — Список участников соревнования

## Документация:
- [DevOps Guide](./.tasks/02-техническая-архитектура/devops-guide.md)
- [PM2 Config](./.tasks/02-техническая-архитектура/pm2-guide.md)
- [PostgreSQL Backup](./.tasks/02-техническая-архитектура/postgres-backup-guide.md)
- [Prisma Migrations](./.tasks/02-техническая-архитектура/prisma-migrations.md)
- [Nginx Config](./.tasks/02-техническая-архитектура/nginx-config-example.conf)
- [API Групп и Соревнований](<apps/server/docs/groups-api.md>)

## Требования к системе:
- Node.js >= 18.0.0
- PostgreSQL >= 15
- Docker (опционально)

## Примечание:
На первом релизе группы и соревнования могут отсутствовать в UI, но схема данных и API готовы к их использованию без переработки ядра.

## Лицензия:
MIT License