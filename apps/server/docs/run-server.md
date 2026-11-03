# Запуск сервера

## Локальный запуск:

```bash
cd apps/server
npm run dev
```

## База данных:

```bash
npx prisma migrate dev --name add_user_role_and_external_ids
npx prisma generate
```

## Настройка .env:

```bash
cp .env.example .env
```

Изменить переменные в `.env`:
- `DATABASE_URL` — подключение к PostgreSQL
- `JWT_SECRET` — секрет для JWT токенов

## Тестирование API:

```bash
# Регистрация
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'

# Вход
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'

# Проверка роли
curl -X POST http://localhost:3000/auth/role \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Структура проекта:

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
├── database/           # Prisma конфигурация
├── config/jwt/         # JWT токены и утилиты
│   ├── jwt.ts
│   ├── jwt.strategy.ts
│   ├── tokens.ts
│   └── passwords.ts
└── guards/             # Guards для защиты API
    └── jwt-auth.guard.ts
```

## API Endpoints:

- `POST /auth/register` — Регистрация
- `POST /auth/login` — Вход
- `GET /auth/role` — Проверка роли пользователя
- `POST /auth/validate` — Валидация токена
- `POST /auth/refresh` — Обновление токена

## Документация:

- [Auth API](../api-auth.md) — Детальная документация по аутентификации
- [Role Model](../../docs/architecture/role-model.md) — Ролевая модель и архитектура