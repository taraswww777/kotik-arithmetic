# 03-07. Экран результатов (results screen)

## Подзадачи:
- [ ] Создать компонент результатов в `/apps/client/src/components/results/`:
  - `ResultsScreen.tsx` — отображение статистики после завершения кроссворда
  - `useResults` — хук для обработки завершения игры

### Экран результатов (`ResultsScreen.tsx`):
```tsx
import styled from '@emotion/styled';

export const ResultsScreen = ({ 
  solvedCount,
  totalSolved,
  timeSpent,
  mistakes,
  difficultyLevel
}) => {
  return (
    <Container>
      <EmojiResult>🎉</EmojiResult>
      
      <Title>Молодец!</Title>
      
      <StatsGrid>
        <StatCard icon="✅">
          <Label>Правильно</Label>
          <Value>{solvedCount}</Value>
        </StatCard>
        
        <StatCard icon="⏱️">
          <Label>Время</Label>
          <Value>{timeSpent}s</Value>
        </StatCard>
        
        <StatCard icon="❌">
          <Label>Ошибки</Label>
          <Value>{mistakes}</Value>
        </StatCard>
        
        <StatCard icon="📊">
          <Label>Уровень</Label>
          <Value>{difficultyLevel === 'basic' ? 'Базовый' : 'Продвинутый'}</Value>
        </StatCard>
      </StatsGrid>
      
      <ActionButtons>
        <Button primary onClick={resetGame}>
          Новый кроссворд
        </Button>
        
        {solvedCount > 0 && (
          <Button onClick={() => saveToHistory()}>
          Сохранить в историю
        </Button>
        )}
      </ActionButtons>
    </Container>
  );
};
```

### Стилизация:
- [ ] Крупные цифры для детей (≥24px)
- [ ] Эмодзи для визуальной привлекательности
- [ ] Кнопки контрастных цветов

## Хук `useResults`:
```tsx
import { useState, useEffect } from 'react';

export const useResults = ({
  onComplete,
  onContinue
}: { 
  onComplete: (stats: GameStats) => void,
  onContinue: () => void
}) => {
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    if (!showResults && onComplete) {
      // Сбор статистики перед показом результатов
      const stats = calculateGameStats();
      onComplete(stats);
    }
  }, []);

  return { showResults, setShowResults };
};
```

## Критерии готовности:
- Результаты отображаются корректно после завершения игры
- Кнопки "Новый кроссворд" и "Сохранить в историю" работают