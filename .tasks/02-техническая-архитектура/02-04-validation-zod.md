# 02-04. Валидация через Zod (shared схемы)

## Подзадачи:
- [ ] Установить Zod в shared пакет:
  ```bash
  cd /packages/shared && npm install zod
  ```
- [ ] Создать каталог `src/validation/` или `/shared/zod/`:
  ```text
  /packages/shared/src/validation
    ├── auth.ts                 // schemas для регистрации/логина
    ├── game.ts                 // schemas для сохранения результатов
    ├── stats.ts                // schemas для запросов статистики
    └── crossword.ts            // schemas для настроек сложности
  ```

## Схемы аутентификации (`auth.ts`):
```ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
});

export const registerSchema = z.object({
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  password: z.string().min(8, 'Пароль должен быть >= 8 символов'),
});
```

## Схемы для результатов (`game.ts`):
```ts
export const saveResultSchema = z.object({
  userId: z.string().uuid().optional(),
  crosswordId: z.string().uuid(),
  timeSpent: z.number().positive('Время должно быть положительным'),
  mistakes: z.number().nonnegative('Количество ошибок не может быть отрицательным'),
  operations: z.array(z.enum(['+', '-', '*', '/'])),
  difficulty: z.enum(['basic', 'advanced']),
  completedAt: z.string().datetime(),
});
```

## Интеграция с NestJS (`ValidationPipe`):
- [ ] Создать `src/common/validation.validation.pipe.ts`:
  ```ts
  import { ValidationPipe } from '@nestjs/common';
  
  export const validationPipe = new ValidationPipe({
    transform: true,              // автоматически преобразует запрос по схеме
    whitelist: true,              // удаляет лишние поля
    forbidNonWhitelisted: true,   // запрещает лишние поля
  });
  ```
- [ ] Настроить в `src/main.ts` или модуле контроллеров

## Тестирование схем:
- [ ] Написать тесты для каждой схемы в `/packages/shared/tests/validation/`:
  ```ts
  import { describe, it, expect } from 'vitest';
  import { registerSchema } from '../../src/validation/auth';
  
  describe('registerSchema', () => {
    it('должен принимать валидный email', () => {
      const result = registerSchema.safeParse({ email: 'test@example.com' });
      expect(result.success).toBe(true);
    });
    
    it('должен отклонять короткий пароль', () => {
      const result = registerSchema.safeParse({ 
        email: 'a@b.ru', 
        password: '12345' 
      });
      expect(result.success).toBe(false);
    });
  });
  ```

## Критерии готовности:
- Все схемы валидации готовы и протестированы
- `ValidationPipe` настроена во всех контроллерах