import styled from '@emotion/styled';
import { EmptyCell } from './EmptyCell';
import { FilledCell } from './FilledCell';
import type { Cell } from 'shared-crossword-generator';

export const Cell = ({ cellData, isAnswered, userInput, onInput }: { 
  cellData: Cell;
  isAnswered: boolean;
  userInput: number;
  onInput: (value: string) => void;
}) => {
  return cellData.isFilled ? (
    <FilledCell value={cellData.expression?.expressionString || String(userInput)} />
  ) : (
    <EmptyCell 
      inputMode="numeric"
      onChange={(e) => onInput(e.target.value)}
    />
  );
};

const CellContainer = styled.div(({ heightMultiplier }) => ({
  width: '40px', // ширина клетки
  height: `calc(${CELL_HEIGHT}px * ${heightMultiplier || 1})`, // высота зависит от оператора
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CELL_HEIGHT = 40; // px