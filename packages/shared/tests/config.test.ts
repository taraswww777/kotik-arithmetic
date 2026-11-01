import { describe, it, expect } from 'vitest';
import { difficultyLevels } from '../../src/config/difficulty';
import { operationSets } from '../../src/config/operations';

describe('difficultyLevels', () => {
  it('elementary — диапазон до 10', () => {
    expect(difficultyLevels.elementary.maxNumber).toBe(10);
  });

  it('primary — диапазон до 20', () => {
    expect(difficultyLevels.primary.maxNumber).toBe(20);
  });

  it('lowerSecondary — диапазон до 30', () => {
    expect(difficultyLevels.lowerSecondary.maxNumber).toBe(30);
  });

  it('upperSecondary — диапазон до 50', () => {
    expect(difficultyLevels.upperSecondary.maxNumber).toBe(50);
  });
});

describe('operationSets', () => {
  it('addition содержит только сложение', () => {
    expect(operationSets.addition).toEqual(['+', '+']);
  });

  it('subtraction содержит только вычитание', () => {
    expect(operationSets.subtraction).toEqual(['-', '-']);
  });

  it('multiplication содержит умножение', () => {
    expect(operationSets.multiplication).toEqual(['*', '*']);
  });

  it('division содержит деление', () => {
    expect(operationSets.division).toEqual(['/', '/']);
  });
});
