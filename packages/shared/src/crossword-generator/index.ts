// Экспорт всех модулей генератора примеров кроссворда
export * from './types';
export * from './config';
export * from './examples';
export * from './grid/placement';

// Функция для генерации примеров
export function generateExamples(
  level: 'basic' | 'advanced',
  options?: { difficultyLevel?: number; operationSet?: string }
): Example[] {
  const count = level === 'basic' ? 4 : 6; // базовый уровень - меньше примеров
  
  return Array.from({ length: count }, () => 
    generateExample(level, { 
      operationSet: options?.operationSet || 'allOperations',
      difficultyLevel: options?.difficultyLevel || 1
    })
  );
}

// Тип для сетки кроссворда (Grid)
export type Grid = {
  cells: Array<Array<Cell | null>>;
  examples: Record<string, Example>;
};

// Тип для примера кроссворда
export type Example = {
  leftOperand: number;
  rightOperand: number;
  operator: '+' | '-' | '*' | '/';
  result: number;
};

// Тип для клетки
export type Cell = {
  row: number;
  col: number;
  expression: string;
  answer: number;
  isFilled: boolean;
};