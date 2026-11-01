# Shared Validation Schemas

Zod схемы для валидации данных между клиентом и сервером.

## Схемы аутентификации (`auth.ts`):
```typescript
import { registerSchema, loginSchema } from 'shared-validation';

registerSchema.safeParse({ email: 'test@example.com', password: 'secure123' });
loginSchema.safeParse({ email: 'test@example.com' });
```

## Схемы результатов (`game.ts`):
```typescript
import { saveResultSchema } from 'shared-validation';

saveResultSchema.safeParse({
  userId: 'uuid',
  crosswordId: 'uuid',
  timeSpent: 120,
  mistakes: 2,
  operations: ['+', '+'],
  difficulty: 'basic',
  completedAt: '2026-11-01T12:00:00.000Z',
});
```

## Схемы статистики (`stats.ts`):
```typescript
import { statsRequestSchema } from 'shared-validation';

statsRequestSchema.safeParse({ difficulty: 'basic' });
```

## Использование в контроллерах:
```typescript
@UsePipes(new ValidationPipe({ transform: true }))
getStats(@Body() statsDto: StatsRequestDto) { ... }
```

## Тесты:
Находятся в `/tests/validation/`