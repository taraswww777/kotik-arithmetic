# Статистика и прогресс

## Реализованное

### ✅ Локальное хранение (IndexedDB)

#### Схема хранилища:
```ts
interface GameRecord {
  id: string; // auto-generated
  solvedCount: number;      // количество решённых примеров
  totalSolved: number;      // всего примеров
  timeSpent: number;        // время в секундах
  mistakes: number;         // количество ошибок
  operations: string[];     // использованные операции
  difficultyLevel: 'basic' | 'advanced';
  crosswordId?: string;     // уникальный ID кроссворда
  completedAt: number;      // timestamp завершения
  userId?: string;          // опциональный userId
}
```

#### Хранилище предоставляет:
- `saveGameResult(stats, crosswordId?)` — сохраняет результат игры
- `getAggregatedStats()` — получает агрегированную статистику
- `getAllGameRecords()` — все записи
- `getUserGameRecords(userId?)` — по пользователю
- `getGameRecordsByDifficulty(difficulty)` — по сложности
- `deleteGameRecord(id)` — удаление записи
- `clearAllGameRecords()` — очистка всего хранилища
- `resetStorage()` — полный сброс (удаление и пересоздание)

**Примечание:** Используется нативный IndexedDB API с фоллбэком на localStorage.

### ✅ Синхронизация (PostgreSQL)

#### Таблица GameResult:
```prisma
model GameResult {
  id          String   @id @default(uuid())
  userId      String
  crosswordId String
  timeSpent   Int
  mistakes    Int
  operations  String[]
  difficulty  String
  completedAt DateTime
  
  user        User      @relation(fields: [userId], references: [id])
  
  @@index([userId])
  @@index([crosswordId])
}
```

#### API Endpoints (NestJS):
- `GET /stats` — Общая статистика (по всем или по сложности)
- `POST /stats/game-result` — Сохранение результата игры
- `GET /stats/user/:userId` — История результатов пользователя
- `GET /stats/top-players` — Топ игроков
- `GET /stats/difficulty-distribution` — Распределение по сложности

## Использование

### Сохранение результата:
```tsx
import { saveGameResult } from 'kotik-client-services/storage';

const stats = {
  solvedCount: 10,
  totalSolved: 10,
  timeSpent: 300,
  mistakes: 2,
  difficultyLevel: 'basic',
};

// Сохранение в IndexedDB
await saveGameResult(stats, `crossword-${Date.now()}`);
```

### Получение агрегированной статистики:
```tsx
import { getAggregatedStats } from 'kotik-client-services/storage';

const stats = await getAggregatedStats();
console.log({
  totalGames: stats.totalGames,
  solvedCount: stats.solvedCount,
  averageTimeSpent: stats.averageTimeSpent,
  averageMistakes: stats.averageMistakes,
});
```

### Интеграция с сервером:
```tsx
import { saveGameResult } from 'kotik-client-services/storage';

const onSaveResult = async (stats: any, crosswordId?: string) => {
  // Сохранение в IndexedDB
  await saveGameResult(stats, crosswordId);
  
  // Отправка на сервер (опционально)
  try {
    await fetch('/api/stats/game-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: getUserToken(),
        crosswordId,
        timeSpent: stats.timeSpent,
        mistakes: stats.mistakes,
        operations: [],
        difficulty: stats.difficultyLevel,
      }),
    });
  } catch (error) {
    console.error('Ошибка отправки:', error);
  }
};
```

## Интеграция в игру

### CrosswordGame компонент:
- Автоматически вызывает `saveGameResult()` при завершении игры
- Генерирует уникальный `crosswordId` на основе timestamps
- Передает статистику в родительский компонент через callback

### App компонент:
- Вызывает `onSaveResult()` с параметром `crosswordId`
- Получает агрегированную статистику для отображения

## Миграции базы данных

```bash
cd apps/server
npx prisma generate
npx prisma migrate dev --name add_game_result_table
```

## Документация полного API

См. [`apps/server/docs/api-stats.md`](api-stats.md)