import { z } from 'zod';

export const statsRequestSchema = z.object({
  difficulty: z.enum(['basic', 'advanced']).optional(),
});

export type StatsRequestInput = z.infer<typeof statsRequestSchema>;

// Схема для сохранения результата игры на сервере
export const gameResultSchema = z.object({
  userId: z.string().uuid('userId должен быть UUID'),
  crosswordId: z.string(),
  timeSpent: z.number().min(0, 'Время не может быть отрицательным'),
  mistakes: z.number().min(0, 'Количество ошибок не может быть отрицательным'),
  operations: z.array(z.string()).min(1, 'Должен быть хотя бы один оператор'),
  difficulty: z.enum(['basic', 'advanced']),
});

export type GameResultInput = z.infer<typeof gameResultSchema>;