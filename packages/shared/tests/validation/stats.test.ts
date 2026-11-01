import { describe, it, expect } from 'vitest';
import { statsRequestSchema } from '../../src/validation/stats';

describe('statsRequestSchema', () => {
  it('должен принимать пустой запрос', () => {
    const result = statsRequestSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('должен принимать difficulty basic', () => {
    const result = statsRequestSchema.safeParse({ difficulty: 'basic' });
    expect(result.success).toBe(true);
  });

  it('должен принимать difficulty advanced', () => {
    const result = statsRequestSchema.safeParse({ difficulty: 'advanced' });
    expect(result.success).toBe(true);
  });

  it('должен отклонять некорректный difficulty', () => {
    const result = statsRequestSchema.safeParse({ difficulty: 'invalid' });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('advanced');
  });

  it('должен отклонять пустой объект с невалидным типом', () => {
    const result = statsRequestSchema.safeParse({ difficulty: 'intermediate' });
    expect(result.success).toBe(false);
  });
});