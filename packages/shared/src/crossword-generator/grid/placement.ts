import { Grid, CrosswordExample, Cell } from '../types';
import { Example } from '../types';

export function generateGrid(examples: Example[]): Grid {
  // Определяем пример и создаём кроссворд-примеры (каждый пример может занимать несколько строк)
  const crosswordExamples = examples.map(example => ({
    id: `ex-${example.leftOperand}-${example.rightOperand}`,
    expression: buildExpressionString(example),
    answer: example.result,
    direction: 'horizontal', // для простоты начинаем с горизонтальных
    position: getGridPosition(example)
  }));

  // Создаём пустую сетку (например, 10x10)
  const gridWidth = 15;
  const gridHeight = Math.max(6, examples.length + 3); // минимум несколько строк
  
  const grid: Grid = {
    cells: Array.from({ length: gridHeight }, () => 
      Array.from({ length: gridWidth }, () => null as Cell | null)
    ),
    examples: {},
  };

  // Размещаем примеры в сетке без конфликтов
  const placedExamples: CrosswordExample[] = [];
  for (const example of crosswordExamples) {
    const position = findValidPosition(grid, example);
    if (position) {
      placeExampleInGrid(grid, example, position);
      placedExamples.push(example);
    }
  }

  // Конвертируем примеры в клетки и добавляем пустые клетки для ввода
  convertToCells(grid, placedExamples);

  return grid;
}

function buildExpressionString(example: Example): string {
  const parts = [example.leftOperand, example.operator, example.rightOperand];
  if (example.operator === '*') return `${example.leftOperand} × ${example.rightOperand}`;
  if (example.operator === '/') return `${example.leftOperand} ÷ ${example.rightOperand}`;
  return `${example.leftOperand}${example.operator}${example.rightOperand}`;
}

function getGridPosition(example: Example): GridPosition {
  const width = 3; // left + operator + right
  return {
    row: 1,
    col: Math.floor(Math.random() * (8 - width)) + 1, // не слишком близко к краям
    width,
    height: 1,
  };
}

function findValidPosition(grid: Grid, example: CrosswordExample): GridPosition | null {
  const width = 3;
  const maxCol = grid.cells[0].length - width; // ширина сетки
  
  for (let col = 0; col <= maxCol; col++) {
    if (!canPlaceAt(grid, { row: 1, col, width, height: 1 }, example)) {
      continue;
    }
    
    return {
      row: 1,
      col,
      width,
      height: 1,
    };
  }
  
  return null;
}

function canPlaceAt(grid: Grid, pos: GridPosition, example: CrosswordExample): boolean {
  // Для упрощения проверяем только горизонтальное размещение в первой строке
  const startRow = pos.row;
  const endRow = pos.row + pos.height - 1;
  
  for (let row = startRow; row <= endRow; row++) {
    if (!grid.cells[row]) return false;
    
    for (let col = pos.col; col < pos.col + pos.width; col++) {
      const cell = grid.cells[row][col];
      
      // Если клетка уже занята — не размещаем
      if (cell) {
        return false;
      }
    }
  }
  
  return true;
}

function placeExampleInGrid(grid: Grid, example: CrosswordExample, pos: GridPosition): void {
  const startRow = pos.row;
  const endRow = startRow + pos.height - 1;
  
  for (let row = startRow; row <= endRow; row++) {
    if (!grid.cells[row]) continue;
    
    for (let col = pos.col; col < pos.col + pos.width; col++) {
      const cellId = `${row}-${col}`;
      grid.cells[row][col] = createCell(cellId, false, example);
      grid.examples[cellId] = example;
    }
  }
}

function createCell(
  id: string,
  isFilled: boolean,
  expression?: CrosswordExpression
): Cell {
  return {
    id,
    row: parseInt(id.split('-')[0]),
    col: parseInt(id.split('-')[1]),
    isFilled,
    expectedValue: undefined,
    expression: expression ? createCrosswordExpression(expression) : undefined,
  };
}

function createCrosswordExpression(expr: CrosswordExample): CrosswordExpression {
  // Парсинг строки выражения обратно в объект
  const parts = expr.expression.split(/([+\-×÷=])/);
  if (parts.length < 4) return expr;
  
  const leftOperand = parseInt(parts[0]);
  const operatorChar = parts[1];
  const rightOperand = parseInt(parts[2]);
  const result = parseInt(parts[3].trim());
  const operator = operatorChar as '+' | '-' | '*' | '/';
  
  return {
    leftOperand,
    rightOperand,
    operator,
    result,
    expressionString: expr.expression,
  };
}

function convertToCells(grid: Grid, placedExamples: CrosswordExample[]): void {
  // Добавляем пустые клетки для ввода пользователя
  // В простейшем случае — все клетки кроссворда-примеров становятся клетками сетки
  
  grid.cells = grid.cells.map(row => 
    row.map(cell => cell || createEmptyCell())
  );
}

function createEmptyCell(): Cell {
  const id = `empty-${Math.random().toString(36).substr(2, 9)}`;
  return {
    id,
    row: parseInt(id.split('-')[0]),
    col: parseInt(id.split('-')[1]),
    isFilled: false,
    expectedValue: undefined,
    expression: undefined,
  };
}