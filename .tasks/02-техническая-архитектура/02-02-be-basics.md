# 02-02. Бэкенд: базовая настройка (NestJS + Prisma)

## Подзадачи:
- [ ] Выбрать фреймворк: **NestJS** (рекомендуется для модульной архитектуры и будущих OAuth провайдеров)
- [ ] Настроить TypeScript + ESLint + Prettier
- [ ] Установить NestJS + `@nestjs/common`, `@nestjs/core`, `@nestjs/config`
- [ ] Настроить Prisma ORM с PostgreSQL:
  - Создать `prisma/schema.prisma`
  - Реализовать базовые сущности: `User`, `GameResult`, `Group`, `GroupMember`, `Competition`, `CompetitionEntry`
  - Создать миграции (`npx prisma migrate dev`)

## Валидация (Zod):
- [ ] Установить `zod`: `npm install zod`
- [ ] Создать валидационные схемы в `/src/shared/zod/`:
  - `auth.validation.ts` — схема регистрации/логина (email, password)
  - `game.validation.ts` — schema для сохранения результатов кроссворда
  - `stats.validation.ts` — schema для запросов статистики
- [ ] Интегрировать валидацию в контроллеры через `ValidationPipe`:
  ```ts
  @UsePipes(new ValidationPipe({ transform: true }))
  getStats(@Body() statsDto: StatsRequestDto) { ... }
  ```

## Контроллеры/Сервисы (базовые):
- [ ] Контроллер аутентификации (`AuthController`)
- [ ] Контроллер статистики (`StatsController`)
- [ ] Базовый сервис генерации кроссвордов (`CrosswordGeneratorService`)

## Критерии готовности:
- API работает, валидация запросов через Zod корректна
- Простые миграции выполнены в PostgreSQL