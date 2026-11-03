# Auth API Endpoints

## Регистрация
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response:
{
  "message": "Регистрация успешна",
  "userId": "mock_userexample"
}
```

## Вход
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Вход успешен"
}
```

## Проверка роли пользователя (для UI)
```http
GET /auth/role
Content-Type: application/json

Request Body:
{
  "email": "user@example.com"
}

Response:
{
  "email": "user@example.com",
  "role": "USER_ROLE_CHILD",
  "isChild": true,
  "isParent": false
}
```

## Валидация токена
```http
POST /auth/validate
Content-Type: application/json

Request Body:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (valid):
{
  "valid": true,
  "user": {
    "userId": "mock_userexample",
    "role": "USER_ROLE_CHILD"
  }
}
```

## Обновление токена
```http
POST /auth/refresh
Content-Type: application/json

Request Body:
{
  "userId": "mock_userexample"
}

Response:
{
  "message": "Токен обновлён",
  "userId": "mock_userexample"
}
```

---

## Ролевая модель

### Роль `USER_ROLE_CHILD` (ребёнок):
- Доступ к игровым функциям
- Просмотр своей статистики
- Участие в кроссвордах и конкурсах

### Роль `USER_ROLE_PARENT` (родитель):
- Просмотр общей статистики детей
- Управление группой/классом
- Создание и редактирование контента

---

## Архитектура для OAuth провайдеров (VK, MAX, ЕСИА)

При интеграции с внешними OAuth провайдерами:
- `userId` остаётся внутренним идентификатором в системе
- `externalId` хранит внешний ID (VK ID, MAX ID, ЕСИА ID)
- Роли сохраняются через поле `role` в модели User