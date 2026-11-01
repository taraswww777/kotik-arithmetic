import { z } from 'zod';

export const statsRequestSchema = z.object({
  difficulty: z.enum(['basic', 'advanced']).optional(),
});

export type StatsRequestInput = z.infer<typeof statsRequestSchema>;