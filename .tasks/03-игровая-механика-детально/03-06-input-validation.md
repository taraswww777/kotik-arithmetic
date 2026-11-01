# 03-06. Обработка пользовательского ввода (input validation)

## Подзадачи:
- [ ] Создать модуль валидации во фронтенде `/apps/client/src/utils/validation.ts`:
  - `validateCellInput(value: string, expected: number): { valid: boolean, error?: string }`
  - `checkCrosswordCompletion(grid: Grid, userInput: Record<string, number>): CompletionResult`

### Валидация одной клетки (`validateCellInput`):
```tsx
export const validateCellInput = (value: string, expected: number): { 
  valid: boolean, 
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

  return { valid: true };
};
```

### Проверка правильного ответа:
- [ ] При вводе числа в пустую клетку проверить равенство с примером:
  ```tsx
  export const checkAnswer = (
    userInput: number,
    expected: number
  ): { 
    isCorrect: boolean,
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
  ```

### Проверка завершения кроссворда:
- [ ] Кроссворд завершен если все пустые клетки заполнены правильно:
  ```tsx
  export type CompletionResult = {
    isComplete: boolean;
    remainingEmptyCells: number;
    incorrectAnswers: number[]; // массив неверных ответов
  };

  export const checkCrosswordCompletion = (
    grid: Grid, 
    userInput: Record<string, number>
  ): CompletionResult => {
    let remainingEmpty = 0;
    let incorrect = 0;
    
    grid.cells.forEach((cell) => {
      if (!cell.isFilled && !userInput[cell.id]) {
        remainingEmpty++;
      } else if (userInput[cell.id] !== cell.expectedValue) {
        incorrect++;
      }
    });

    return {
      isComplete: remainingEmpty === 0 && incorrect === 0,
      remainingEmptyCells: remainingEmpty,
      incorrectAnswers: incorrect,
    };
  };
  ```

### Обработка ошибок в UI:
- [ ] Подсказка при ошибке ввода:
  ```tsx
  export const ErrorPopup = ({ message }: { message: string }) => (
    <Container>
      <EmojiIcon>😕</EmojiIcon>
      <p>{message}</p>
    </Container>
  );
  ```

## Критерии готовности:
- Ввод проверяется на корректность перед сохранением
- Ошибки отображаются пользователю понятным языком
- Завершение кроссворда определяется корректно