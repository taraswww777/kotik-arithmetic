# 03-01. Генератор арифметических примеров (core)

## Подзадачи:
- [ ] Создать пакет `/packages/shared/src/crossword-generator/` с функциями:
  - `generateExample(level: 'basic' | 'advanced', options: GeneratorOptions): Example`
  - `type Example = { leftOperand?: number, rightOperand?: number, operator: '+', result?: number }`

### Базовый уровень (сложение и вычитание):
- [ ] Реализовать генератор сложения: `a + b = c`
  ```ts
  const example: Example = { leftOperand: a, rightOperand: b, operator: '+', result: c }
  ```
- [ ] Реализовать генератор вычитания: `a - b = c`
  ```ts
  const example: Example = { leftOperand: a, rightOperand: b, operator: '-', result: c }
  ```

### Продвинутый уровень (умножение и деление):
- [ ] Реализовать генератор умножения: `a × b = c`
  ```ts
  const example: Example = { leftOperand: a, rightOperand: b, operator: '*', result: c }
  ```
- [ ] Реализовать генератор деления: `a ÷ b = c` (только нацелое деление!)
  ```ts
  const example: Example = { leftOperand: a, rightOperand: b, operator: '/', result: c }
  ```

## Диапазон чисел:
- [ ] Конфигурация в `/packages/shared/src/config/difficulty.ts`:
  ```ts
  export const difficultyLevels = {
    elementary: { maxNumber: 10 },     // 1 + 2, 5 - 3
    primary: { maxNumber: 20 },        // 7 × 8, 48 ÷ 6
    lowerSecondary: { maxNumber: 30 }, // 12 × 9, 72 ÷ 8
    upperSecondary: { maxNumber: 50 }, // 15 × 7, 90 ÷ 5
  };
  ```

## Операции (комбинации):
- [ ] Конфигурация в `/packages/shared/src/config/operations.ts`:
  ```ts
  export type Operation = '+' | '-' | '*' | '/';
  export const operationSets = {
    addition: ['+', '+'],             // только сложение
    subtraction: ['-', '-'],          // только вычитание
    multiplication: ['*', '*'],       // только умножение
    division: ['/', '/'],             // только деление
    mixedAdditionSubtraction: ['+', '-'],
    mixedMultiplicationDivision: ['*', '/'],
    allOperations: ['+', '-', '*', '/'],
  };
  ```

## Критерии готовности:
- Генератор создаёт корректные примеры для всех уровней сложности
- Деление — только нацело (без остатка)