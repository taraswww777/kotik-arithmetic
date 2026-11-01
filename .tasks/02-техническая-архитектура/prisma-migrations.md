# Prisma Migrations Guide

## Создание миграции:
```bash
cd apps/server
npx prisma migrate dev --name init_schema
```

## Применение миграций в production:
```bash
npx prisma migrate deploy
```

## Генерация клиента:
```bash
npx prisma generate
```

## Схемы сущностей:

### User
- id: uuid (primary key)
- email: unique string
- password: hashed string
- createdAt, updatedAt: datetime

### GameResult
- id: uuid (primary key)
- userId: relation to User
- crosswordId: reference
- timeSpent, mistakes: number
- operations: array
- difficulty: enum [basic, advanced]
- completedAt: datetime

### Group
- id: uuid
- name: unique string
- createdAt, updatedAt: datetime

### GroupMember (composite)
- groupId + userId: composite primary key
- Relation to Group и User

### Competition
- id: uuid
- name, description: strings
- startDate, endDate: datetime

### CompetitionEntry (composite)
- competitionId + userId: composite primary key
- Relation to Competition и User