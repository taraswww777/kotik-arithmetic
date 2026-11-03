# JWT Authentication Module

Модуль конфигурации и утилиты для работы с JWT токенами.

## Структура:

```
src/config/jwt/
├── jwt.ts              # Сервис конфигурации JWT (секрет, expiration)
├── jwt.strategy.ts     # Passport JWT стратегия
├── tokens.ts           # Утилиты для создания/проверки токенов
└── passwords.ts        # Утилиты для хэширования паролей
```

## Использование:

### Создание токена:
```typescript
import { createJwtToken } from 'apps/server/src/config/jwt/utils/tokens';

const payload = {
  userId: 'user-123',
  email: 'user@example.com',
  role: 'USER_ROLE_CHILD',
};

const token = createJwtToken(payload);
```

### Проверка токена:
```typescript
import { verifyJwtToken } from 'apps/server/src/config/jwt/utils/tokens';

const payload = verifyJwtToken(token);
if (!payload) {
  throw new UnauthorizedException('Invalid token');
}
```

## Настройки:

- `JWT_SECRET` — секрет для подписи токенов (из .env)
- `JWT_EXPIRES_IN` — время жизни токена в секундах (по умолчанию 86400 = 24 часа)

## OAuth интеграция:

При подключении OAuth провайдеров (VK, MAX, ЕСИА):
1. Создаётся токен с `userId` (внутренний ID системы)
2. Сохраняется `externalId` для внешнего идентификатора
3. Роли сохраняются через поле `role` в модели User