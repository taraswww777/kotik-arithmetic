# 03-03. UI компоненты кроссворда (client-side)

## Подзадачи:
- [ ] Создать компоненты в `/apps/client/src/components/crossword-ui/`:
  - `CrosswordGrid.tsx` — сетка кроссворда (реактивный рендеринг через Emotion)
  - `Cell.tsx` — отдельная клетка (пустая/заполненная)
  - `NumberInput.tsx` — поле ввода для чисел (крупное, без клавиатуры)
  - `CrosswordHeader.tsx` — заголовок уровня сложности

### Сетка кроссворда (`CrosswordGrid.tsx`):
```tsx
import styled from '@emotion/styled';
import { Cell } from './Cell';

export const CrosswordGrid = ({ grid, examples }: { grid: Grid; examples: Example[] }) => {
  return (
    <GridContainer>
      {grid.cells.map((cell, index) => (
        <Cell 
          key={index} 
          cellData={cell}
          isAnswered={false} // будет вычисляться из состояния
        />
      ))}
    </GridContainer>
  );
};
```

### Клетка (`Cell.tsx`):
- [ ] Пустая клетка:
  ```tsx
  export const EmptyCell = ({ onInput }: { onInput: (value: string) => void }) => (
    <NumberInput 
      inputMode="numeric"
      placeholder=" "
      onChange={(e) => onInput(e.target.value)}
    />
  );
  ```

- [ ] Заполненная клетка (подсказка):
  ```tsx
  export const FilledCell = ({ value }: { value: number | string }) => (
    <StaticText>{value}</StaticText>
  );
  ```

### Поле ввода чисел (`NumberInput.tsx`):
- [ ] Крупный шрифт (≥18px) — для детей
- [ ] Без клавиатуры (inputMode="numeric")
- [ ] Подсказка валидации (красная обводка при ошибке)

## Критерии готовности:
- Сетка рендерится корректно на мобильных и десктопах
- Поля ввода работают без ошибок валидации