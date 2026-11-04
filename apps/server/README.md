# Kotik Arithmetic Server

NestJS + TypeScript + Prisma API сервер для кроссвордной арифметической игры.

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
├── group/               # Группы пользователей (архитектурный задел)
│   ├── groups.controller.ts
│   ├── group.service.ts
│   └── group.module.ts
├── competition/         # Соревнования и регистрация участников (архитектурный задел)
│   ├── competitions.controller.ts
│   ├── competition.service.ts
│   └── competition.module.ts
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

### Аутентификация
- `POST /auth/register` — Регистрация
- `POST /auth/login` — Вход
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
- [API групп и соревнований](<apps/server/docs/groups-api.md>)
- [Schema Prisma](<apps/server/prisma/schema.prisma>)

## Примечание:
На первом релизе группы и соревнования могут отсутствовать в UI, но схема данных и API готовы к их использованию без переработки ядра.