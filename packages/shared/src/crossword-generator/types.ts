import { difficultyLevels } from '../config/difficulty';
import { operationSets, Operation } from '../config/operations';
import { Settings } from '../config/settings';

export type Example = {
  leftOperand: number;
  rightOperand: number;
  operator: '+' | '-' | '*' | '/';
  result: number;
};

export type Difficulty = 'basic' | 'advanced';

export type GridPosition = {
  row: number;
  col: number;
  width: number;
  height: number;
};

export type CrosswordExample = {
  id: string;
  expression: string;
  answer: number;
  direction: 'horizontal' | 'vertical';
  position: GridPosition;
};

export type Grid = {
  cells: Cell[];
  examples: Record<string, CrosswordExample>;
};

export type Cell = {
  id: string;
  row: number;
  col: number;
  isFilled: boolean;
  expectedValue?: number;
  expression?: CrosswordExpression;
};

export type CrosswordExpression = {
  leftOperand: number;
  rightOperand: number;
  operator: Operation;
  result: number;
  expressionString: string; // "2 + 3", "5 × 7", "9 ÷ 3" и т.д.
};

export type GeneratorOptions = {
  difficultyLevel: Difficulty;
  operationSet: keyof typeof operationSets;
};