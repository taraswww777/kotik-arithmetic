import { difficultyLevels } from 'shared-config';

export type Difficulty = 'basic' | 'advanced';
export type Operation = '+' | '-' | '*' | '/';

export interface GameResult {
  crosswordId: string;
  timeSpent: number;         // сколько секунд затрачено
  mistakes: number;
  operations: Operation[];
  difficulty: Difficulty;
  completedAt: string;       // ISO timestamp
}

export interface UserStats {
  totalGames: number;
  completedGames: number;
  totalTimeSpent: number;
  bestTime: number | null;
  mostUsedOperation: Operation;
}

// Типы для генератора и сетки (интерфейсы для совместимости)
export interface Example {
  leftOperand: number;
  rightOperand: number;
  operator: Operation;
  result: number;
}

export interface GridPosition {
  row: number;
  col: number;
  width: number;
  height: number;
}

export interface CrosswordExample {
  id: string;
  expression: string;
  answer: number;
  direction: 'horizontal' | 'vertical';
  position: GridPosition;
}

export interface Cell {
  id: string;
  row: number;
  col: number;
  isFilled: boolean;
  expectedValue?: number;
  expression?: CrosswordExpression;
}

export interface CrosswordExpression {
  leftOperand: number;
  rightOperand: number;
  operator: Operation;
  result: number;
  expressionString: string;
}

export interface Grid {
  cells: Array<Array<Cell | null>>;
  examples: Record<string, CrosswordExample>;
}