# Ролевая модель: Ребёнок vs Родитель

## Реализация на первом этапе

### Модель данных (Prisma):

```prisma
enum UserRole {
  USER_ROLE_CHILD       // Игрок (ребёнок)
  USER_ROLE_PARENT      // Просмотр статистики (родитель)
}

model User {
  role UserRole @default(USER_ROLE_CHILD)
  
  // Для организаторов групп:
  organizerId String? 
}
```

### Роли пользователей:

#### `USER_ROLE_CHILD` (ребёнок/игрок):
- Доступ к игровым функциям (кроссворды, задачи)
- Просмотр своей статистики
- Участие в конкурсах
- **НЕ видит** функции управления группой/классом

#### `USER_ROLE_PARENT` (родитель):
- Просмотр общей статистики детей
- Управление группой/классом
- Создание и редактирование контента
- Видит кроссворды только для своих детей

### UI: Скрытие/показ функций в зависимости от роли

```typescript
// Пример проверки роли в клиенте (после входа)
const userRole = await fetch('/auth/role', {
  method: 'POST',
  body: JSON.stringify({ email: user.email })
}).then(r => r.json());

if (!userRole.isParent) {
  // Скрываем панель управления группой
  document.querySelector('.parent-controls')?.classList.add('hidden');
}
```

## Архитектурный задел для организатора группы

### Модель `Group`:

```prisma
model Group {
  organizer User?  // Организатор группы (учитель/родитель)
}
```

### API для групповых функций:

```typescript
// Пример эндпоинтов:
GET    /groups/:groupId/stats      # Статистика группы (только организатор)
POST   /groups                     # Создать группу (только организатор)
DELETE /groups/:groupId            # Удалить группу (только организатор)
```

## Архитектурный задел для будущих OAuth провайдеров

### Единый внутренний `userId`:

```typescript
interface JwtPayload {
  userId: string;      // Внутренний ID системы
  email: string;
  role: UserRole;
  externalId?: string; // VK ID, MAX ID, ЕСИА ID
}
```

### Модуль аутентификации с абстракцией провайдера:

```typescript
// Базовый интерфейс OAuth провайдера
abstract class OAuthProvider {
  abstract connect(email: string): Promise<{ userId: string; role: UserRole }>;
  
  // Пример реализации для VK
  async connectVK(
    vkId: string, 
    vkAccessToken: string
  ): Promise<{ userId: string; role: UserRole }> {
    // 1. Создаём/находим пользователя по email или создаём нового
    const user = await prisma.user.upsert({
      where: { email },
      create: { email, password: 'default' },
      update: {},
    });

    // 2. Сохраняем внешний ID
    await prisma.user.update({
      where: { id: user.id },
      data: { externalId: vkId },
    });

    return { userId: user.id, role: UserRole.CHILD };
  }
}
```

### Готовность к интеграции `nestjs-vkid` или `passport-vk-id`:

```typescript
// Пример подключения VK ID в будущем:
import { PassportModule } from '@nestjs/passport';
import { Strategy as VkidStrategy } from 'passport-vkid';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'vkid' }),
  ],
})
export class VkAuthModule {}
```