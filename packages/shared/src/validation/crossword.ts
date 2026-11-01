import { z } from 'zod';

export const crosswordSettingsSchema = z.object({
  gridSize: z.number().min(3).max(25, 'Размер сетки должен быть от 3 до 25'),
  difficulty: z.enum(['basic', 'advanced']),
});

export type CrosswordSettingsInput = z.infer<typeof crosswordSettingsSchema>;

export const crosswordOptionsSchema = z.object({
  includeMultiplication: z.boolean(),
  includeDivision: z.boolean(),
  maxNumbers: z.number().min(2).max(50),
});

export type CrosswordOptionsInput = z.infer<typeof crosswordOptionsSchema>;