# API Статистики (Stats API) — Документация

## Эндпоинты

### GET /stats - Общая статистика
Получение агрегированной статистики по всем результатам или по сложности.

**Параметры:**
- `difficulty` (опционально): 'basic' | 'advanced'

**Пример запроса:**
```
GET /stats
```

**Ответ:**
```json
{
  "totalGames": 5,
  "solvedCount": 15,
  "averageTimeSpent": 280.5,
  "averageMistakes": 3.2,
  "difficultyCounts: {
    "basic": 4,
    "advanced": 1
  }
}
```

### GET /stats/:difficulty - Статистика по сложности
Получение статистики только для конкретной сложности.

**Параметры:**
- `difficulty` (в URL): 'basic' | 'advanced'

**Пример запроса:**
```
GET /stats/advanced
```

### POST /stats/game-result - Сохранение результата игры
Сохранение результата завершения кроссворда в базу данных.

**Заголовок Content-Type:** `application/json`

**Тело запроса:**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "crosswordId": "crossword-1234567890",
  "timeSpent": 300,
  "mistakes": 2,
  "operations": ["+", "-"],
  "difficulty": "basic"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Результат сохранён"
}
```

### GET /stats/user/:userId - История результатов пользователя
Получение истории всех результатов игры для конкретного пользователя.

**Параметры:**
- `userId`: UUID пользователя

**Пример запроса:**
```
GET /stats/user/550e8400-e29b-41d4-a716-446655440000
```

### GET /stats/top-players - Топ игроков
Получение списка лучших игроков по количеству решённых кроссвордов.

**Параметры:**
- `limit` (опционально): число, сколько игроков вывести (по умолчанию 10)

**Пример запроса:**
```
GET /stats/top-players?limit=5
```

### GET /stats/difficulty-distribution - Распределение по сложности
Получение количества игр на каждой сложности.

**Ответ:**
```json
{
  "basic": 4,
  "advanced": 1
}
```

## Локальное хранение (IndexedDB)

Клиент также сохраняет результаты в IndexedDB для офлайн-работы:

### saveGameResult(stats, crosswordId?)
Сохраняет результат игры в локальное хранилище.

**Параметры:**
- `stats`: Объект со статистикой (`solvedCount`, `totalSolved`, `timeSpent`, `mistakes`, `difficultyLevel`)
- `crosswordId` (опционально): ID кроссворда для группировки

### getAggregatedStats()
Получение агрегированной статистики из локального хранилища.

**Ответ:**
```json
{
  "totalGames": 5,
  "solvedCount": 15,
  "averageTimeSpent": 280.5,
  "averageMistakes": 3.2,
  "difficultyCounts: {
    "basic": 4,
    "advanced": 1
  }
}
```

## Архитектура

```
┌─────────────────────────────────────────────┐
│           Frontend (Client)                 │
│  ┌─────────────────────────────────────┐   │
│  │  IndexedDB (localStorage fallback)  │   │
│  │  - saveGameResult()                 │   │
│  │  - getAggregatedStats()             │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                  ↕ HTTP/POST
┌─────────────────────────────────────────────┐
│          Backend API (NestJS)               │
│  ┌─────────────────────────────────────┐   │
│  │  PostgreSQL + Prisma                │   │
│  │  - GameResult table                 │   │
│  │  - User relation                    │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │  StatsController / API              │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

## Миграции базы данных

После изменений в схеме необходимо выполнить:
```bash
cd apps/server
npm run prisma:generate
npm run prisma:migrate
```

## Реализованные функции

### ✅ IndexedDB Schema (Этап 1)
- [x] Схема хранилища для записей о кроссвордах
  - id, crosswordId, timeSpent, mistakes, operations, difficulty, completedAt, userId
- [x] Реализация persistence через перезапуск приложения
- [x] Сохранение статистики при завершении каждого кроссворда

### ✅ PostgreSQL (Этап 2)
- [x] Таблица `game_results` с привязкой к `user_id`
- [x] API для выгрузки статистики на сервер (`POST /stats/game-result`)
- [x] API для чтения агрегированной статистики с сервера (`GET /stats`)

## Интеграция

### Сохранение результата в App.tsx:
```tsx
import { saveGameResult } from './services/storage';

const onSaveResult = async (stats: any, crosswordId?: string) => {
  // Сохранение в IndexedDB
  await saveGameResult(stats, crosswordId);
  
  // Отправка на сервер (если нужно)
  try {
    const response = await fetch('/stats/game-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUserToken(), // получить токен пользователя
        crosswordId,
        timeSpent: stats.timeSpent,
        mistakes: stats.mistakes,
        operations: [], // можно собирать во время игры
        difficulty: stats.difficultyLevel,
      }),
    });
    
    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Ошибка отправки на сервер:', error);
  }
};
```

### Получение агрегированной статистики:
```tsx
import { getAggregatedStats } from './services/storage';

const aggregated = await getAggregatedStats();
console.log('Total games:', aggregated.totalGames);
console.log('Average time spent:', aggregated.averageTimeSpent);
```