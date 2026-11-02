import type { GameStats } from 'kotik-client-components/results';

// Типы для IndexedDB
export interface GameRecord extends GameStats {
  id: string;
  crosswordId?: string;
  completedAt: number; // timestamp
  userId?: string;
}

// Инициализация IndexedDB
const DB_NAME = 'kotik-arithmetic-db';
const STORE_NAME = 'gameResults';

let dbPromise: IDBDatabase | null = null;

export async function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        dbPromise = request.result;
        resolve(dbPromise);
      };
      
      request.onupgradeneeded = (event: any) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Создание хранилища, если оно не существует
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: false
          });
          
          // Индексы для запросов
          store.createIndex('completedAt', 'completedAt', { unique: false });
          store.createIndex('difficulty', 'difficulty', { unique: false });
          store.createIndex('userId', 'userId', { unique: false });
        }
      };
    });
  }
  return dbPromise;
}

// Сохранение записи
export async function saveGameResult(
  stats: GameStats, 
  crosswordId?: string,
  userId?: string
): Promise<void> {
  const id = `result-${Date.now()}`; // простой ID на основе времени
  
  const record: GameRecord = {
    ...stats,
    id,
    crosswordId,
    completedAt: Date.now(),
    userId,
  };
  
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await new Promise((resolve, reject) => {
      const request = store.add(record);
      request.onsuccess = resolve;
      request.onerror = reject;
    });
    
    // Удаляем старый JSON storage (если есть)
    try {
      localStorage.removeItem('kotik-game-history');
    } catch (e) {
      console.warn('Не удалось очистить localStorage:', e);
    }
  } catch (error) {
    console.error('Ошибка сохранения в IndexedDB:', error);
    // Фоллбэк на localStorage
    try {
      const history = JSON.parse(localStorage.getItem('kotik-game-history') || '[]');
      history.push({
        ...record,
        id: `local-${Date.now()}`,
      });
      localStorage.setItem('kotik-game-history', JSON.stringify(history));
    } catch (e) {
      console.error('Ошибка сохранения в localStorage:', e);
    }
  }
}

// Получение всех записей для отображения истории
export async function getAllGameRecords(): Promise<GameRecord[]> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  } catch (error) {
    console.error('Ошибка чтения из IndexedDB:', error);
    // Фоллбэк на localStorage
    try {
      const history = JSON.parse(localStorage.getItem('kotik-game-history') || '[]');
      return history.map((item: any) => ({ ...item, completedAt: Number(item.completedAt) }));
    } catch (e) {
      console.error('Ошибка чтения из localStorage:', e);
      return [];
    }
  }
}

// Получение записей по пользователю
export async function getUserGameRecords(userId?: string): Promise<GameRecord[]> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    if (!userId) {
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = reject;
      });
    }
    
    const index = store.index('userId');
    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  } catch (error) {
    console.error('Ошибка:', error);
    return [];
  }
}

// Получение записей по сложности
export async function getGameRecordsByDifficulty(
  difficulty: string
): Promise<GameRecord[]> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    const index = store.index('difficulty');
    return new Promise((resolve, reject) => {
      const request = index.getAllEntries(difficulty);
      request.onsuccess = () => resolve(request.result.map((entry: any) => ({
        ...entry.value,
      })));
      request.onerror = reject;
    });
  } catch (error) {
    console.error('Ошибка:', error);
    return [];
  }
}

// Удаление записи по ID
export async function deleteGameRecord(id: string): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    await new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onsuccess = resolve;
      request.onerror = reject;
    });
  } catch (error) {
    console.error('Ошибка удаления:', error);
  }
}

// Удаление всех записей
export async function clearAllGameRecords(): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    await new Promise((resolve, reject) => {
      const request = store.clear();
      request.onsuccess = resolve;
      request.onerror = reject;
    });
    
    try {
      localStorage.removeItem('kotik-game-history');
    } catch (e) {
      // игнорируем ошибки очистки localStorage
    }
  } catch (error) {
    console.error('Ошибка очистки:', error);
  }
}

// Получение агрегированной статистики
export async function getAggregatedStats(): Promise<{
  totalGames: number;
  solvedCount: number;
  averageTimeSpent: number;
  averageMistakes: number;
  difficultyCounts: Record<string, number>;
  lastPlayedAt?: number;
}> {
  try {
    const records = await getAllGameRecords();
    
    if (records.length === 0) {
      return {
        totalGames: 0,
        solvedCount: 0,
        averageTimeSpent: 0,
        averageMistakes: 0,
        difficultyCounts: {},
      };
    }
    
    const totalGames = records.length;
    const solvedCount = records.reduce((sum, r) => sum + r.solvedCount, 0);
    const totalTimeSpent = records.reduce((sum, r) => sum + r.timeSpent, 0);
    const totalMistakes = records.reduce((sum, r) => sum + r.mistakes, 0);
    
    const difficultyCounts: Record<string, number> = {};
    records.forEach(r => {
      difficultyCounts[r.difficultyLevel] = (difficultyCounts[r.difficultyLevel] || 0) + 1;
    });
    
    const lastPlayedAt = Math.max(...records.map(r => r.completedAt));
    
    return {
      totalGames,
      solvedCount,
      averageTimeSpent: Math.round((totalTimeSpent / totalGames) * 100) / 100,
      averageMistakes: Math.round((totalMistakes / totalGames) * 100) / 100,
      difficultyCounts,
      lastPlayedAt,
    };
  } catch (error) {
    console.error('Ошибка получения агрегированной статистики:', error);
    return {
      totalGames: 0,
      solvedCount: 0,
      averageTimeSpent: 0,
      averageMistakes: 0,
      difficultyCounts: {},
    };
  }
}

// Сброс хранилища (удаление и пересоздание)
export async function resetStorage(): Promise<void> {
  try {
    const request = indexedDB.deleteDatabase(DB_NAME);
    await new Promise((resolve, reject) => {
      request.onsuccess = resolve;
      request.onerror = reject;
    });
    
    // Очистка localStorage
    try {
      localStorage.removeItem('kotik-game-history');
    } catch (e) {
      console.warn('Не удалось очистить localStorage:', e);
    }
  } catch (error) {
    console.error('Ошибка сброса хранилища:', error);
  }
}