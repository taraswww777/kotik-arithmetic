import { describe, it, expect } from 'vitest';
import { crosswordSettingsSchema, crosswordOptionsSchema } from '../../src/validation/crossword';

describe('crosswordSettingsSchema', () => {
  it('должен принимать базовую сетку', () => {
    const result = crosswordSettingsSchema.safeParse({
      gridSize: 5,
      difficulty: 'basic',
    });
    expect(result.success).toBe(true);
  });

  it('должен принимать расширенную сетку', () => {
    const result = crosswordSettingsSchema.safeParse({
      gridSize: 15,
      difficulty: 'advanced',
    });
    expect(result.success).toBe(true);
  });

  it('должен отклонять слишком маленькую сетку', () => {
    const result = crosswordSettingsSchema.safeParse({
      gridSize: 2,
      difficulty: 'basic',
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('от 3 до 25');
  });

  it('должен отклонять слишком большую сетку', () => {
    const result = crosswordSettingsSchema.safeParse({
      gridSize: 26,
      difficulty: 'basic',
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('от 3 до 25');
  });

  it('должен принимать валидный difficulty', () => {
    const result = crosswordSettingsSchema.safeParse({
      gridSize: 10,
      difficulty: 'advanced',
    });
    expect(result.success).toBe(true);
  });

  it('должен отклонять некорректный difficulty', () => {
    const result = crosswordSettingsSchema.safeParse({
      gridSize: 10,
      difficulty: 'hard',
    });
    expect(result.success).toBe(false);
  });
});

describe('crosswordOptionsSchema', () => {
  it('должен принимать базовые настройки', () => {
    const result = crosswordOptionsSchema.safeParse({
      includeMultiplication: true,
      includeDivision: false,
      maxNumbers: 10,
    });
    expect(result.success).toBe(true);
  });

  it('должен принимать все операции включённые', () => {
    const result = crosswordOptionsSchema.safeParse({
      includeMultiplication: true,
      includeDivision: true,
      maxNumbers: 20,
    });
    expect(result.success).toBe(true);
  });

  it('должен отклонять maxNumbers < 2', () => {
    const result = crosswordOptionsSchema.safeParse({
      includeMultiplication: false,
      includeDivision: false,
      maxNumbers: 1,
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('2');
  });

  it('должен отклонять maxNumbers > 50', () => {
    const result = crosswordOptionsSchema.safeParse({
      includeMultiplication: false,
      includeDivision: false,
      maxNumbers: 51,
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('50');
  });
});