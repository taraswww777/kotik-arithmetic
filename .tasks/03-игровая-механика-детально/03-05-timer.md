# 03-05. Таймер и завершение игры (timer)

## Подзадачи:
- [ ] Создать таймер в `/apps/client/src/components/timer/`:
  - `Timer.tsx` — отображение времени до конца
  - `useGameTimer` — кук для управления временем

### Компонент таймера (`Timer.tsx`):
```tsx
import styled from '@emotion/styled';

export const Timer = ({ timeLeft, onComplete }: { 
  timeLeft: number,
  onComplete: () => void 
}) => {
  const seconds = Math.floor((timeLeft % 60));
  const minutes = Math.floor(timeLeft / 60);

  return (
    <Container>
      <TimeDisplay>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </TimeDisplay>
      <ProgressBar 
        max={initialTime} 
        current={timeLeft}
      />
    </Container>
  );
};

// Emotion styled component
export const Container = styled.div({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#fff3cd',
  padding: '8px 16px',
  borderRadius: '8px',
  border: '2px solid #ffc107',
});

export const TimeDisplay = styled.div({
  fontFamily: 'monospace',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
});
```

### Кук `useGameTimer`:
- [ ] Начальное время: **5 минут** (можно настроить через настройки)
- [ ] Автозапуск при открытии кроссворда
- [ ] Уведомление за 30 секунд до конца

```tsx
import { useState, useEffect } from 'react';

export const useGameTimer = ({ 
  initialTime = 5 * 60,      // в секундах (по умолчанию 5 минут)
  onComplete 
}: { 
  initialTime?: number,
  onComplete: () => void 
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          onComplete();       // завершить игру
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, onComplete]);

  const [secondsUntilEnd, setSecondsUntilEnd] = useState(30);
  
  useEffect(() => {
    if (timeLeft <= 30) {
      const countdown = setInterval(() => {
        setSecondsUntilEnd(prev => prev - 1);
        if (prev <= 0) clearInterval(countdown);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timeLeft]);

  return { timeLeft, secondsUntilEnd };
};
```

### Завершение игры:
- [ ] По истечении времени показать экран результатов:
  ```tsx
  export const GameOverScreen = ({ 
    solvedCount, 
    totalSolved 
  }) => (
    <Container>
      <h2>Время вышло!</h2>
      <p>Вы решили {solvedCount} из {totalSolved} примеров</p>
      <Button onClick={() => startNewGame()}>Начать заново</Button>
    </Container>
  );
  ```

## Сохранение в статистике:
- [ ] В `GameResult`:
  ```ts
  {
    crosswordId: string;
    timeSpent: number;         // сколько секунд затрачено
    mistakes: number;
    operations: Operation[];
    difficulty: 'basic' | 'advanced';
    completedAt: string;       // ISO timestamp
  }
  ```

## Критерии готовности:
- Таймер корректно отсчитывает время с точностью до секунды
- Автозавершение по истечении времени
- Сохранение результата в статистику при завершении