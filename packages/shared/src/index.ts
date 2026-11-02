// Экспорт типов и констант кроссвордов
export * from './config/difficulty';
export * from './config/operations';
export * from './config/settings';
export * from './config/mascot';

// Генератор примеров кроссворда
export * from './crossword-generator';

// Типы для статистики игры
export interface GameStats {
  id?: string;
  solvedCount: number;
  totalSolved: number;
  timeSpent: number;
  mistakes: number;
  difficultyLevel: 'basic' | 'advanced';
  crosswordId?: string; // для локального хранения
}

// Валидационные схемы
export { statsRequestSchema, gameResultSchema } from './validation/stats';
export type { StatsRequestInput, GameResultInput } from './validation/stats';