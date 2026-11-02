import styled from '@emotion/styled';
import NumberInput from './NumberInput';

export const EmptyCell = ({ onInput }: { onInput: (value: string) => void }) => (
  <NumberInput 
    inputMode="numeric"
    placeholder=" "
    onChange={(e) => onInput(e.target.value)}
  />
);

const Container = styled.div({
  width: '40px', // ширина клетки
  height: '40px', // высота клетки
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Подсчитываем количество заполненных клеток в сетке
export const countFilledCells = (cells: Array<Cell & { isAnswered: boolean }>): number => {
  return cells.reduce((acc, cell) => acc + (cell.isAnswered ? 1 : 0), 0);
};