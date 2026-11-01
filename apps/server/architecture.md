# Архитектура Kotik Arithmetic API

## Модульная архитектура:

### 1. Auth Module (Аутентификация)
- **Controller**: Обработчик HTTP запросов
- **Service**: Логика регистрации и входа
- **Validation**: Zod схемы через ValidationPipe

### 2. Stats Module (Статистика)
- **Controller**: Запросы к статистике
- **Service**: Агрегация данных из БД
- **Validation**: Валидация параметров запроса

### 3. Database (Prisma ORM)
- Сущности: User, GameResult, Group, Competition, CompetitionEntry
- Миграции через Prisma Migrate

## Flow регистрации:
```
POST /auth/register
1. Body validation (registerSchema)
2. Пароль хеширование
3. Сохранение в БД (Prisma)
4. Возврат JWT токен
```

## Flow входа:
```
POST /auth/login
1. Body validation (loginSchema)
2. Проверка пароля
3. Генерация JWT токена
4. Возврат токена
```

## Валидация через ValidationPipe:
```typescript
@UsePipes(new ValidationPipe({ transform: true }))
async getStats(@Body() statsDto: StatsRequestDto) { ... }
```

## Типобезопасность:
- Все типы определены в `packages/shared/src/validation/`
- Импорт как `shared-validation`