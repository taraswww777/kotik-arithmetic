# 03-08. Интеграция и игровой цикл (integration)

## Подзадачи:
- [ ] Создать главный компонент игры `/apps/client/src/components/CrosswordGame.tsx`:
  - Объединение всех компонентов в единый интерфейс
  - Управление состоянием игры
  - Связь генератора с UI

### Главный компонент (`CrosswordGame.tsx`):
```tsx
import { CrosswordGrid } from './crossword-ui/CrosswordGrid';
import { Timer } from './timer/Timer';
import { SettingsPanel } from './settings/DifficultySettings';
import { useGameTimer } from './timer/useGameTimer';
import { generateExamples } from 'shared-c crossword-generator/examples';

export const CrosswordGame = ({ settings, onSaveResult }) => {
  const [examples, setExamples] = useState<Example[]>([]);
  const [userInput, setUserInput] = useState<Record<string, number>>({});
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');

  // Генерация при загрузке или смене настроек
  useEffect(() => {
    const generatedExamples = generateExamples(settings);
    setExamples(generatedExamples);
    
    // Сброс состояния игры
    setUserInput({});
    setGameState('playing');
  }, [settings]);

  // Обработка завершения таймера
  const handleTimerComplete = () => {
    setGameState('finished');
    onSaveResult(examples, userInput);
  };

  return (
    <GameContainer>
      <SettingsPanel 
        level={settings.difficultyLevel}
        operations={settings.operations}
        onChange={setSettings}
      />
      
      <Timer 
        timeLeft={initialTime}
        onComplete={handleTimerComplete}
      />
      
      <CrosswordGrid 
        grid={generatedExamplesToGrid(examples)}
        examples={examples}
        userInput={userInput}
        onInput={(cellId, value) => {
          setUserInput(prev => ({ ...prev, [cellId]: parseInt(value) }));
        }}
      />
    </GameContainer>
  );
};
```

### Типы состояния:
- `PlayingState`: кроссворд открыт, таймер тикает
- `FinishedState`: таймер истёк или все решено (по желанию)

## Критерии готовности:
- Все компоненты интегрированы в единый игровой цикл
- Переключение состояний работает корректно