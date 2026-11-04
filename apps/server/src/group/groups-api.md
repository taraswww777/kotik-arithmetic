# API для групп и соревнований

## Введение

Эндпоинты для работы с группами пользователей и соревнованиями. Архитектурный задел — эти функции могут отсутствовать в первом релизе UI, но схема данных и API готовы к их использованию.

---

## Группы (CRUD)

### Создание группы

**POST** `/groups`

Создаёт новую группу с организатором.

#### Запрос

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `name` | string | Да | Имя группы (класс, семья) |
| `organizerId` | string | Нет | ID организатора группы (учителя/родителя) |

#### Ответ

```json
{
  "id": "uuid-...",
  "name": "5-A",
  "organizer": {
    "id": "uuid-...",
    "email": "teacher@example.com",
    "userId": "mock_teacher123",
    "role": "USER_ROLE_PARENT",
    "externalId": null
  },
  "createdAt": "2026-11-04T12:00:00.000Z",
  "updatedAt": "2026-11-04T12:00:00.000Z"
}
```

### Список групп

**GET** `/groups`

Возвращает все группы с участниками и организаторами.

#### Ответ

```json
[
  {
    "id": "uuid-...",
    "name": "5-A",
    "organizer": { ... },
    "members": [
      {
        "groupId": "uuid-...",
        "userId": "mock_student123",
        "role": "MEMBER_ROLE_MEMBER"
      }
    ],
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

### Получение группы по ID

**GET** `/groups/:id`

#### Ответ

Структура аналогична списку, но для одной группы.

### Обновление группы

**PUT** `/groups/:id`

Обновляет данные группы.

#### Запрос

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `name` | string | Нет | Новое имя группы |
| `organizerId` | string | Нет | Новый ID организатора |

### Удаление группы

**DELETE** `/groups/:id`

Удаляет группу и всех её участников (cascade delete).

---

## Соревнования (CRUD)

### Создание соревнования

**POST** `/competitions`

Создаёт новое соревнование.

#### Запрос

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `name` | string | Да | Название соревнования |
| `description` | string | Нет | Описание (опционально) |
| `startDate` | string (ISO datetime) | Нет | Дата старта |
| `endDate` | string (ISO datetime) | Нет | Дата окончания |

#### Ответ

```json
{
  "id": "uuid-...",
  "name": "Пасхальные каникулы",
  "description": "Весёлые задания для детей 5-9 лет",
  "startDate": "2026-11-15T00:00:00.000Z",
  "endDate": "2026-11-22T23:59:59.000Z",
  "entries": [],
  "createdAt": "2026-11-04T12:00:00.000Z",
  "updatedAt": "2026-11-04T12:00:00.000Z"
}
```

### Список соревнований

**GET** `/competitions`

#### Ответ

Массив всех соревнований с полями `startDate`, `endDate` в ISO datetime и списком `entries`.

### Получение соревнования по ID

**GET** `/competitions/:id`

### Обновление соревнования

**PUT** `/competitions/:id`

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `name` | string | Нет | Новое название |
| `description` | string | Нет | Новое описание |
| `startDate` | string (ISO datetime) | Нет | Новая дата старта |
| `endDate` | string (ISO datetime) | Нет | Новая дата окончания |

### Удаление соревнования

**DELETE** `/competitions/:id`

Удаляет соревнование и все записи участников.

---

## Регистрация участника в соревновании

**POST** `/competitions/:competitionId/entries`

Регистрирует пользователя в соревновании (создаёт `CompetitionEntry`).

#### Запрос

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `userId` | string | Да | ID пользователя для регистрации |

#### Ответ

```json
{
  "competitionId": "uuid-...",
  "userId": "mock_student123",
  "user": {
    "id": "mock_student123",
    "email": "student@example.com",
    "role": "USER_ROLE_CHILD"
  },
  "createdAt": "2026-11-04T12:00:00.000Z"
}
```

### Список участников соревнования

**GET** `/competitions/:competitionId/entries`

Возвращает всех зарегистрированных участников с их данными.

---

## Таблицы базы данных

### Group

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | String (uuid) | PK |
| `name` | String | Название группы, уникальный |
| `createdAt` | DateTime | Дата создания |
| `updatedAt` | DateTime | Дата обновления |

### GroupMember (связь User ↔ Group)

| Поле | Тип | Описание |
|------|-----|----------|
| `groupId` | String | FK → Group.id |
| `userId` | String | FK → User.id |
| `role` | MemberRole | Роль в группе: MEMBER или ORGANIZER |

### Competition

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | String (uuid) | PK |
| `name` | String | Название соревнования, уникальный |
| `description` | String? | Описание (nullable) |
| `startDate` | DateTime | Дата старта (по умолчанию now()) |
| `endDate` | DateTime? | Дата окончания (nullable) |
| `createdAt` | DateTime | Дата создания |
| `updatedAt` | DateTime | Дата обновления |

### CompetitionEntry

| Поле | Тип | Описание |
|------|-----|----------|
| `competitionId` | String | FK → Competition.id |
| `userId` | String | FK → User.id |
| `createdAt` | DateTime | Дата регистрации |

---

## Примечание

На первом релизе группы и соревнования могут отсутствовать в UI, но схема данных и API готовы к их использованию без переработки ядра.