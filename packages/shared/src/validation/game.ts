import { z } from 'zod';

export const saveResultSchema = z.object({
  userId: z.string().uuid().optional(),
  crosswordId: z.string().uuid(),
  timeSpent: z.number().positive('Время должно быть положительным'),
  mistakes: z.number().nonnegative('Количество ошибок не может быть отрицательным'),
  operations: z.array(z.enum(['+', '-', '*', '/'])),
  difficulty: z.enum(['basic', 'advanced']),
  completedAt: z.string().datetime(),
});

export type SaveResultInput = z.infer<typeof saveResultSchema>;