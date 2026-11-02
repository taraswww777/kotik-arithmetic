import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { CrosswordGrid } from './crossword-ui/CrosswordGrid';
import { Timer } from './timer/Timer';
import { useGameTimer } from './timer/useGameTimer';
import { DifficultySettings } from './settings/DifficultySettings';
import { OperationsSettings } from './settings/OperationsSettings';
import { OperatorsDisplaySettings } from './settings/OperatorsDisplaySettings';
import { generateExamples, Grid, Example, Cell } from 'shared-crossword-generator';
import { validateCellInput, checkCrosswordCompletion } from '../utils/validation';
import type { GameStats } from './results/ResultsScreen';
import { saveGameResult } from '../services/storage';

// Типы состояния игры
type GameState = 'playing' | 'finished';

export interface CrosswordGameProps {
  settings: {
    difficultyLevel: number;
    operations: ('+' | '-' | '*' | '/')[];
    multiplicationSymbol: '×' | '*';
    divisionSymbol: '÷' | ':';
  };
  examples: Example[];
  setExamples: (examples: Example[]) => void;
  onSaveResult?: (stats: GameStats, crosswordId: string) => void;
}

// Контейнер игры
const GameContainer = styled.div(({ gameState, inverted }) => ({
  maxWidth: '600px',
  margin: '20px auto',
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  border: '3px solid #4CAF50',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  position: 'relative' as const,
}));

const SettingsPanel = styled.div(({ inverted }) => ({
  backgroundColor: '#f9f9f9',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
}));

export const CrosswordGame = ({ 
  settings,
  examples,
  setExamples,
  onSaveResult,
}: CrosswordGameProps) => {
  // Состояние игры
  const [grid, setGrid] = useState<Grid | null>(null);
  const [userInput, setUserInput] = useState<Record<string, number>>({});
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  
  // Настройки таймера (5 минут по умолчанию)
  const initialTime = 5 * 60; // в секундах
  
  // Эффект при загрузке/смене настроек
  useEffect(() => {
    if (examples.length === 0) {
      // Генерация примеров при загрузке или смене настроек
      const generatedExamples = generateExamples(
        'basic', // базовый уровень по умолчанию
        { 
          difficultyLevel: 'basic',
          operationSet: 'allOperations'
        }
      );
      
      setExamples(generatedExamples);
    }

    // Генерация сетки кроссворда при смене примеров
    const grid = generateGridFromExamples(examples);
    setGrid(grid);

  }, [examples]);

  // Обработка ввода пользователя в клетку
  const handleCellInput = (cellId: string, value: string): void => {
    // Валидация ввода
    const validation = validateCellInput(value);
    
    if (validation.valid) {
      setUserInput(prev => ({ ...prev, [cellId]: parseInt(value) }));
    }

    // Обновление статуса клетки (заполненная/незаполненная)
    setGrid(currentGrid => currentGrid ? updateGridWithInput(currentGrid, cellId, value) : null);
  };

  // Обновление сетки с учетом ввода
  const updateGridWithInput = (grid: Grid, cellId: string, value: string): Grid => {
    return {
      ...grid,
      cells: grid.cells.map(row => 
        row.map(cell => {
          if (!cell || !cell.expression) return null as any; // Пустая клетка

          const newIsFilled = cellId === `${cell.row}-${cell.col}` ? true : cell.isFilled;
          
          return { ...cell, isFilled: newIsFilled };
        })
      )
    };
  };

  // Проверка завершения кроссворда
  const checkCompletion = (): boolean => {
    if (!grid) return false;
    
    const result = checkCrosswordCompletion(grid, userInput);
    return result.isComplete;
  };

  // Обработка завершения игры (таймер или все решено)
  const handleGameEnd = (reason: 'timer' | 'completed'): void => {
    if (!grid) return;
    
    // Сбор статистики перед завершением
    const result = checkCrosswordCompletion(grid, userInput);
    
    // Генерация UUID для crosswordId
    const crosswordId = `crossword-${Date.now()}`;

    const stats: GameStats = {
      solvedCount: result.correctCount || 0,
      totalSolved: examples.length,
      timeSpent: initialTime,
      mistakes: result.incorrectAnswers || 0,
      difficultyLevel: 'basic',
    };

    // Сохранение в IndexedDB/LocalStorage
    saveGameResult(stats, crosswordId);
    
    onSaveResult?.(stats, crosswordId);
    setGameState('finished');
    
    // Показываем экран результатов (можно добавить отдельный компонент)
    console.log('Game stats:', stats);
  };

  // Эффект таймера
  const { timeLeft, secondsUntilEnd, isWarningPhase, remainingTime } = useGameTimer({
    initialTime,
    onComplete: () => handleGameEnd('timer'),
  });

  return (
    <GameContainer 
      gameState={gameState}
    >
      {/* Заголовок игры */}
      <CrosswordHeader />
      
      {/* Панель настроек */}
      <SettingsPanel>
        <DifficultySettings 
          level={settings.difficultyLevel}
          onChange={(newLevel) => setGameSettings({ ...gameSettings, difficultyLevel: newLevel })}
        />
        
        <OperationsSettings 
          operations={settings.operations}
          onChange={(newOps) => {}} // можно реализовать пересборку примеров
        />
      </SettingsPanel>
      
      {/* Таймер */}
      <Timer 
        timeLeft={timeLeft}
        initialTime={initialTime}
        onComplete={() => handleGameEnd('timer')}
      />
      
      {/* Сетка кроссворда */}
      {grid && (
        <CrosswordGrid 
          grid={grid}
          examples={examples}
          userInput={userInput}
          onInput={handleCellInput}
        />
      )}

      {/* Статистика прогресса */}
      <ProgressBarContainer>
        <ProgressBarText>
          Заполнено: {((Object.keys(userInput).length / examples.length) * 100).toFixed(0)}%
          ({userInput.length}/{examples.length})
        </ProgressBarText>
      </ProgressBarContainer>
    </GameContainer>
  );
};

// Генерация сетки из примеров (упрощённая версия для интеграции)
function generateGridFromExamples(examples: Example[]): Grid {
  const cells: Array<Array<Cell | null>> = [];
  const examplesMap: Record<string, any> = {};
  
  examples.forEach((example, index) => {
    const row = index;
    if (!cells[row]) cells[row] = [];
    
    // Создаём клетку для примера
    const cellId = `${row}-${index}`;
    
    if (!cells[row][index]) {
      cells[row][index] = {
        id: cellId,
        row,
        col: index,
        isFilled: false,
        expression: {
          leftOperand: example.leftOperand,
          rightOperand: example.rightOperand,
          operator: example.operator,
          result: example.result,
          expressionString: `${example.leftOperand}${example.operator}${example.rightOperand}`,
        },
      };
      
      examplesMap[cellId] = {
        id: cellId,
        expression: `${example.leftOperand}${example.operator}${example.rightOperand}`,
        answer: example.result,
        direction: 'horizontal',
        position: { row, col: index, width: 3, height: 1 },
      };
    }
  });

  return {
    cells,
    examples: examplesMap,
  };
}

// Прогресс-бар для отображения заполнения сетки
const ProgressBarContainer = styled.div({
  marginTop: '16px',
  backgroundColor: '#f0f0f0',
  borderRadius: '4px',
  overflow: 'hidden',
});

const ProgressBarText = styled.p({
  fontSize: '14px',
  color: '#757575',
  padding: '8px',
  textAlign: 'center' as const,
});

// Типы для экспорта
export type Example = {
  leftOperand: number;
  rightOperand: number;
  operator: '+' | '-' | '*' | '/';
  result: number;
};