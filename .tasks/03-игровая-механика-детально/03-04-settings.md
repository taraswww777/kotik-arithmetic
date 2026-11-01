# 03-04. Настройки сложности (settings)

## Подзадачи:
- [ ] Создать компонент настроек в `/apps/client/src/components/settings/`:
  - `DifficultySettings.tsx` — выбор диапазона чисел
  - `OperationsSettings.tsx` — выбор операций
  - `OperatorsDisplaySettings.tsx` — выбор отображения знаков

### Компонент выбора диапазона (`DifficultySettings.tsx`):
```tsx
import styled from '@emotion/styled';

export const DifficultySettings = ({ level, onChange }: { 
  level: number, 
  onChange: (level: number) => void 
}) => {
  return (
    <Container>
      <h3>Сложность:</h3>
      <DifficultySelector>
        {difficultyLevels.map((d) => (
          <Button key={d.maxNumber} onClick={() => onChange(d.maxNumber)}>
            До {d.maxNumber}
          </Button>
        ))}
      </DifficultySelector>
    </Container>
  );
};
```

### Компонент выбора операций (`OperationsSettings.tsx`):
- [ ] Выбор комбинаций операций:
  ```tsx
  export const OperationsSettings = ({ operations, onChange }: { 
    operations: Operation[], 
    onChange: (ops: Operation[]) => void 
  }) => {
    return (
      <Container>
        <h3>Операции:</h3>
        <CheckboxList>
          {operationSets.mixedAdditionSubtraction.map((set) => (
            <Checkbox 
              key={set[0]} 
              label={`${set[0]} и ${set[1]}`}
              checked={operations.includes(set[0]) && operations.includes(set[1])}
              onChange={(checked) => {}}
            />
          ))}
        </CheckboxList>
      </Container>
    );
  };
  ```

### Компонент выбора отображения знаков (`OperatorsDisplaySettings.tsx`):
```tsx
export const OperatorsDisplaySettings = ({ 
  multiplicationSymbol, 
  divisionSymbol,
  onChange 
}) => {
  return (
    <Container>
      <h3>Символы операций:</h3>
      <RadioGroup>
        <Radio value="×">
          Умножение: × или *?
        </Radio>
        
        <Radio value="÷">
          Деление: ÷ или :?
        </Radio>
      </RadioGroup>
    </Container>
  );
};
```

## Конфигурация настроек в `/packages/shared/src/config/settings.ts`:
```ts
export type Settings = {
  difficultyLevel: 'elementary' | 'primary' | 'lowerSecondary' | 'upperSecondary';
  operations: ('+' | '-' | '*' | '/')[];
  multiplicationSymbol: '×' | '*';
  divisionSymbol: '÷' | ':';
};

export const defaultSettings: Settings = {
  difficultyLevel: 'elementary',       // до 10
  operations: ['+', '+'],              // только сложение
  multiplicationSymbol: '×',          // × вместо *
  divisionSymbol: '÷',                // ÷ вместо :
};
```

## Критерии готовности:
- Все настройки сохраняются в sessionStorage/IndexedDB
- UI настроек понятен для детей (мало текста, крупные кнопки)