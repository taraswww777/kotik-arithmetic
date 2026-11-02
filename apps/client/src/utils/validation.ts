import type { Grid, CrosswordExample } from 'shared-crossword-generator';

/**
 * Валидация ввода пользователя в клетку
 */
export const validateCellInput = (value: string, expected?: number): { 
  valid: boolean; 
  error?: string 
} => {
  // Простая валидация чисел без знака минус для детей
  if (!/^[0-9]+$/.test(value)) {
    return { valid: false, error: 'Введите только числа' };
  }

  const num = parseInt(value);
  
  if (isNaN(num) || num < 0 || num > 100) {
    return { valid: false, error: 'Число должно быть от 0 до 100' };
  }

  // Если ожидаемое значение задано — проверяем правильность ответа
  if (expected !== undefined && expected !== num) {
    return { 
      valid: true,
      isCorrect: false,
      message: `Ответ должен быть ${expected}` 
    };
  }

  return { valid: true };
};

/**
 * Проверка правильного ответа
 */
export const checkAnswer = (
  userInput: number,
  expected: number
): { 
  isCorrect: boolean;
  message?: string 
} => {
  if (userInput === expected) {
    return { isCorrect: true };
  }
  return { 
    isCorrect: false,
    message: `Ответ должен быть ${expected}` 
  };
};

/**
 * Результат проверки завершения кроссворда
 */
export type CompletionResult = {
  isComplete: boolean;
  remainingEmptyCells: number;
  incorrectAnswers: number[]; // массив неверных ответов
  correctCount: number;      // количество правильных ответов
};

/**
 * Проверка завершения кроссворда
 */
export const checkCrosswordCompletion = (
  grid: Grid, 
  userInput: Record<string, number>
): CompletionResult => {
  let remainingEmpty = 0;
  let incorrect = 0;
  let correct = 0;
  
  // Для простоты считаем все клетки кроссворда-примеров
  const crosswordsExamples = grid.examples;

  for (const [cellId, example] of Object.entries(crosswordsExamples)) {
    if (!userInput[cellId]) {
      remainingEmpty++;
    } else if (userInput[cellId] !== example.answer) {
      incorrect++;
    } else {
      correct++;
    }
  }

  return {
    isComplete: remainingEmpty === 0 && incorrect === 0,
    remainingEmptyCells: remainingEmpty,
    incorrectAnswers: incorrect,
    correctCount: correct,
  };
};

/**
 * Получение всех пустых клеток в сетке
 */
export const getEmptyCells = (grid: Grid): Cell[] => {
  const flatCells = grid.cells.flat();
  return flatCells.filter(cell => !cell.isFilled);
};

/**
 * Вспомогательная функция для обработки ошибок UI
 */
export const showErrorPopup = ({ message }: { message: string }): JSX.Element => (
  <Container>
    <EmojiIcon>😕</EmojiIcon>
    <p>{message}</p>
  </Container>
);

interface ContainerProps {
  children: React.ReactNode;
}

const Container = styled.div<ContainerProps>(({ message }) => ({
  position: 'absolute' as const,
  top: '-40px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#f44336',
  color: 'white',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  zIndex: 200,
}));

const EmojiIcon = styled.span({
  marginRight: '8px',
});