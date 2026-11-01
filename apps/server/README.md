# Kotik Arithmetic Server

NestJS + TypeScript + Prisma API сервер.

## Стек:
- NestJS 10.3.0
- TypeScript 5.3.3
- Prisma ORM (PostgreSQL)
- Zod для валидации

## Структура:
```
src/
├── auth/                # Аутентификация
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── stats/               # Статистика
│   ├── stats.controller.ts
│   ├── stats.service.ts
│   └── stats.module.ts
├── crossword-generator/ # Генерация кроссвордов
│   └── crossword-generator.service.ts
└── database/            # Prisma конфигурация
```

## Локальный запуск:
```bash
npm run dev
```

## База данных:
```bash
npx prisma migrate dev
npx prisma generate
```

## API Endpoints:
- POST /auth/register - Регистрация
- POST /auth/login - Вход
- GET /stats - Статистика