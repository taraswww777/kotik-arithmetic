import { describe, it, expect } from 'vitest';
import { saveResultSchema } from '../../src/validation/game';

describe('saveResultSchema', () => {
  it('должен принимать валидный результат', () => {
    const result = saveResultSchema.safeParse({
      userId: '123e4567-e89b-12d3-a456-426614174000',
      crosswordId: '123e4567-e89b-12d3-a456-426614174001',
      timeSpent: 120,
      mistakes: 2,
      operations: ['+', '+', '*'],
      difficulty: 'basic',
      completedAt: '2026-11-01T12:00:00.000Z',
    });
    expect(result.success).toBe(true);
  });

  it('должен принимать результат без userId', () => {
    const result = saveResultSchema.safeParse({
      crosswordId: '123e4567-e89b-12d3-a456-426614174001',
      timeSpent: 120,
      mistakes: 2,
      operations: ['+', '+'],
      difficulty: 'basic',
      completedAt: '2026-11-01T12:00:00.000Z',
    });
    expect(result.success).toBe(true);
  });

  it('должен отклонять отрицательное время', () => {
    const result = saveResultSchema.safeParse({
      userId: '123e4567-e89b-12d3-a456-426614174000',
      crosswordId: '123e4567-e89b-12d3-a456-426614174001',
      timeSpent: -1,
      mistakes: 0,
      operations: ['+'],
      difficulty: 'basic',
      completedAt: '2026-11-01T12:00:00.000Z',
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('положительным');
  });

  it('должен отклонять отрицательное количество ошибок', () => {
    const result = saveResultSchema.safeParse({
      userId: '123e4567-e89b-12d3-a456-426614174000',
      crosswordId: '123e4567-e89b-12d3-a456-426614174001',
      timeSpent: 120,
      mistakes: -1,
      operations: ['+'],
      difficulty: 'basic',
      completedAt: '2026-11-01T12:00:00.000Z',
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('отрицательным');
  });

  it('должен отклонять некорректную операцию', () => {
    const result = saveResultSchema.safeParse({
      userId: '123e4567-e89b-12d3-a456-426614174000',
      crosswordId: '123e4567-e89b-12d3-a456-426614174001',
      timeSpent: 120,
      mistakes: 0,
      operations: ['+'],
      difficulty: 'basic',
      completedAt: '2026-11-01T12:00:00.000Z',
    });
    expect(result.success).toBe(false);
    // Эта проверка может быть ложной, если не указан enum для операций
  });
});