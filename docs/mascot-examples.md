# 🐱 Примеры использования маскота-котика

## 1. Базовая интеграция в компонент игры

```tsx
import { useMascot } from '@kotik-arithmetic/config/mascot';

export const ArithmeticPuzzle = ({ cell, onAnswer }: { 
  cell: any; 
  onAnswer: (correct: boolean) => void 
}) => {
  const { showSuccessMessage, showError } = useMascot();

  const handleCheck = () => {
    // Проверка ответа
    const isCorrect = checkAnswer(cell.answer, userAnswer);
    
    if (isCorrect) {
      showSuccessMessage();
      onAnswer(true);
    } else {
      showError();
      onAnswer(false);
    }
  };

  return (
    <div>
      <Input value={userAnswer} onChange={setValue} />
      <Button onClick={handleCheck}>Проверить</Button>
    </div>
  );
};
```

## 2. Подсказки при застревании

```tsx
import { useState, useEffect } from 'react';
import { useMascot } from '@kotik-arithmetic/config/mascot';

export const InteractiveGrid = ({ examples }: { examples: any[] }) => {
  const [hintsCount, setHintsCount] = useState<Record<string, number>>({});
  const { showHint } = useMascot();

  // Проверка на застревание (3 попытки подряд)
  const attemptHistoryRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const cellId = activeCell?.id;
    
    if (!cellId || attempts[cellId] < 2) return; // не более 1 подсказки за сессию

    // Показываем подсказку
    showHint();
    setHintsCount(prev => ({ ...prev, [cellId]: (hintsCount[cellId] || 0) + 1 }));
  }, [userAnswer]);

  return <Grid cells={grid} hintsDisplayed={hintsCount} />;
};
```

## 3. Кастомные реплики для разных уровней сложности

```tsx
import { MascotConfig, defaultMascotConfig } from '@kotik-arithmetic/config/mascot';

export const AdvancedMascot = () => {
  // Разные сообщения для elementary и upperSecondary
  const getDifficultyMessages = (level: string) => {
    if (level === 'elementary') {
      return [
        { id: 'elem_good', text: 'Молодец, малыш!', type: 'success' },
        { id: 'elem_hint', text: 'Подсказка: это маленькое число', type: 'hint' },
      ];
    }
    return defaultMascotConfig.mascotMessages;
  };

  return <Mascot />;
};
```

## 4. Интеграция с настройками (settings)

```tsx
import { SettingsContext } from '../Settings';
import { Mascot } from '../components/mascot/Mascot';

export const GameWithSettings = ({ onSaveResult }: any) => {
  const settings = useContext(SettingsContext);
  
  return (
    <div>
      <CrosswordGame 
        grid={grid} 
        settings={settings.difficultyLevel === 'easy' ? easyConfig : hardConfig} 
      />
      
      {/* Маскот реагирует на настройки */}
      {settings.showMascot && <Mascot autoHide={!settings.autoHideMascot} />}
    </div>
  );
};
```

## 5. Озвучка реплик (Web Speech API)

```tsx
import { useState } from 'react';
import { mascotMessages } from '@kotik-arithmetic/config/mascot';

export const SpeakingMascot = () => {
  const [speaking, setSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const speakMessage = (text: string) => {
    if (speaking) return; // не прерывать текущую речь
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2; // более высокий голос для котика
    utterance.rate = 0.9; // чуть медленнее
    
    utterance.onend = () => setSpeaking(false);
    
    synth.speak(utterance);
    setSpeaking(true);
  };

  return (
    <div>
      {/* Кнопка включения/выключения озвучки */}
      <button onClick={() => speakMessage('Привет! Я твой проводник в арифметике!')}>
        🗣 Озвучить
      </button>
      
      {speaking && <SpeakingIndicator />}
    </div>
  );
};
```

## 6. Мини-игра "Разминка с котиком"

```tsx
export const MascotWarmUp = () => {
  const [questions, setQuestions] = useState<Example[]>([]);
  
  // Генерируем простые примеры для разминки
  useEffect(() => {
    generateSimpleQuestions(5);
  }, []);

  return (
    <div>
      <h3>🐱 Разминка с котиком!</h3>
      <p>Решите несколько простых примеров:</p>
      
      {questions.map((q, i) => (
        <Question key={i} expression={q} />
      ))}
    </div>
  );
};
```

## 7. Адаптация под мобильные устройства

```tsx
import styled from '@emotion/styled';

const MobileMascot = styled.div(({ isMobile }: { isMobile: boolean }) => ({
  position: 'fixed',
  bottom: isMobile ? '10px' : '20px',
  right: isMobile ? '10px' : '20px',
  fontSize: isMobile ? '60px' : '100px',
  zIndex: 99, // ниже мобильных элементов управления
}));
```

## 8. История успеха (постепенная сложность)

```tsx
export const ProgressiveDifficulty = ({ userStats }: any) => {
  const [difficultyMultiplier, setDifficultyMultiplier] = useState(1);

  // Увеличиваем сложность по мере успехов
  useEffect(() => {
    if (userStats.successRate > 0.9 && difficultyMultiplier < 5) {
      setDifficultyMultiplier(prev => prev + 1);
    }
  }, [userStats.successRate]);

  return (
    <div>
      <CrosswordGrid difficulty={difficultyMultiplier} />
      <Mascot 
        config={{
          positionChangeInterval: userStats.streak > 5 ? 10000 : 15000
          // Быстрее меняем позу при хорошем прогрессе!
        }} 
      />
    </div>
  );
};
```

---

**Совет:** Для сложных интеграций создайте новые хуки в `apps/client/src/components/mascot/hooks/`, чтобы не перегружать существующие компоненты!