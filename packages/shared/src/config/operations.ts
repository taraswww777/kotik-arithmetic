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

export const defaultOperationSet = 'addition';
