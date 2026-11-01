export type Operation = '+' | '-' | '*' | '/';

export type Difficulty = 'basic' | 'advanced';

export interface Crossword {
  id: string;
  title: string;
  gridSize: number;
  difficulty: Difficulty;
  startTime: Date;
  crosswordData: CrosswordGrid;
}

export type CrosswordGrid = GridRow[];

export type GridRow = GridCell[];

export type GridCellStatus = 'empty' | 'filled';

export interface GridCell {
  row: number;
  col: number;
  wordIndex?: number;
  letter?: string;
  status: GridCellStatus;
}

export interface UserAnswer {
  crosswordId: string;
  startTime: Date;
  endTime: Date | null;
  timeSpent: number;
  mistakes: number;
  operations: Operation[];
  difficulty: Difficulty;
  completedAt: string;
}