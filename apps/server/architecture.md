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

### 3. Group Module (Группы — архитектурный задел)
- **Controller**: CRUD для групп (`/groups`)
- **Service**: Работа с таблицами `Group`, `GroupMember`
- **Schema**: Prisma модели `User ↔ Group ↔ GroupMember`
- **Note**: На первом релизе может отсутствовать в UI

### 4. Competition Module (Соревнования — архитектурный задел)
- **Controller**: CRUD для соревнований и регистрация участников (`/competitions`, `/competitions/:id/entries`)
- **Service**: Работа с таблицами `Competition`, `CompetitionEntry`
- **Schema**: Prisma модели `Competition ↔ CompetitionEntry`
- **Note**: На первом релизе может отсутствовать в UI

### 5. Database (Prisma ORM)
- Сущности: User, GameResult, Group, GroupMember, Competition, CompetitionEntry
- Миграции через Prisma Migrate
- Схема: [`prisma/schema.prisma`](<apps/server/prisma/schema.prisma>)

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

## Flow создания группы:
```
POST /groups
1. Validation (name, organizerId optional)
2. Создание записи Group в БД
3. Включение organizer через include
4. Возврат созданной группы
```

## Flow регистрации участника в соревновании:
```
POST /competitions/:competitionId/entries
1. Проверка существования соревнования
2. Проверка существования пользователя
3. Проверка на дублирование записи (unique constraint)
4. Создание CompetitionEntry
5. Возврат созданной записи с данными user и competition
```

## Валидация через ValidationPipe:
```typescript
@UsePipes(new ValidationPipe({ transform: true }))
async getStats(@Body() statsDto: StatsRequestDto) { ... }
```

## Типобезопасность:
- Все типы определены в `packages/shared/src/validation/`
- Импорт как `shared-validation`

## Примечание:
На первом релизе модули Group и Competition могут отсутствовать в UI, но схема данных и API готовы к их использованию без переработки ядра системы.