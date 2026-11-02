import styled from '@emotion/styled';
import { Cell } from './Cell';
import { Grid, Example, CrosswordExample } from 'shared-crossword-generator';

// Определяем высоту ячейки (примеры умножения/деления занимают 2 строки)
const CELL_HEIGHT = 40; // px

export const CrosswordGrid = ({ grid, examples, userInput, onInput }: { 
  grid: Grid;
  examples: Example[];
  userInput: Record<string, number>;
  onInput: (cellId: string, value: string) => void;
}) => {
  const totalCells = grid.cells.flat().length;
  
  return (
    <GridContainer>
      {grid.cells.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, colIndex) => (
            cell ? (
              <Cell 
                key={`${cell.row}-${cell.col}`} 
                cellData={cell}
                isAnswered={!!userInput[cell.id]}
                userInput={userInput[cell.id] || 0}
                onInput={(value) => onInput(cell.id, value)}
                heightMultiplier={cell.expression?.operator === '*' || cell.expression?.operator === '/' ? 2 : 1}
              />
            ) : null
          ))}
        </Row>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div({
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '4px',
  padding: '8px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  border: '2px solid #e0e0e0',
});

const Row = styled.div({
  display: 'flex',
  gap: '4px',
});

// Подсчитываем количество заполненных/незаполненных клеток
export const getGridStats = (grid: Grid): { filledCells: number; emptyCells: number } => {
  const flatCells = grid.cells.flat();
  return {
    filledCells: flatCells.filter(cell => cell.isFilled).length,
    emptyCells: flatCells.length - flatCells.filter(cell => cell.isFilled).length,
  };
};