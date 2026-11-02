import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import Mascot from './components/mascot/Mascot';
import { CrosswordGame, type Example } from './components/CrosswordGame';
import { defaultSettings } from 'shared-config';
import { getAggregatedStats } from './services/storage';

export default function App() {
  // Состояние настроек игры (можно сделать из sessionStorage)
  const [gameSettings, setGameSettings] = useState({
    difficultyLevel: defaultSettings.difficultyLevel,     // например 10
    operations: defaultSettings.operations,                // ['+', '+']
    multiplicationSymbol: defaultSettings.multiplicationSymbol,
    divisionSymbol: defaultSettings.divisionSymbol,
  });

  const [examples, setExamples] = useState<Example[]>([]);

  // Обработка сохранения результата
  const onSaveResult = async (stats: any, crosswordId?: string) => {
    console.log('Game result saved:', stats);

    // Агрегированная статистика из IndexedDB
    try {
      const aggregated = await getAggregatedStats();
      console.log('Aggregated stats:', aggregated);
    } catch (e) {
      console.warn('Не удалось получить агрегированную статистику:', e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1>🐱 Котик в мире арифметики</h1>
          <p style={{ fontSize: '18px' }}>Увлекательные математические кроссворды для детей!</p>
        </header>
        
        <main style={{ maxWidth: '600px', margin: '20px auto', padding: '0 16px' }}>
          {/* Вставляем компонент игры */}
          <CrosswordGame 
            settings={gameSettings}
            examples={examples}
            setExamples={setExamples}
            onSaveResult={onSaveResult}
          />
        </main>

        <footer style={{ backgroundColor: '#f5f5f5', color: '#757575', padding: '16px', textAlign: 'center' }}>
          <p>© 2026 Котик в мире арифметики</p>
        </footer>
        
        <Mascot />
      </div>
    </ThemeProvider>
  );
}