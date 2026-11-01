import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import Mascot from './components/mascot/Mascot';
import './App.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '20px', textAlign: 'center' }}>
          <h1>🐱 Котик в мире арифметики</h1>
          <p style={{ fontSize: '18px' }}>Увлекательные математические кроссворды для детей!</p>
        </header>
        <main style={{ maxWidth: '600px', margin: '20px auto', padding: '0 16px' }}>
          <div className="content">
            <section className="crossword-section">
              <h2 style={{ color: '#4CAF50', fontSize: '24px' }}>Кроссворд</h2>
              <p>Решайте примеры и заполняйте кроссворд!</p>
            </section>
          </div>
        </main>
        <footer style={{ backgroundColor: '#f5f5f5', color: '#757575', padding: '16px', textAlign: 'center' }}>
          <p>© 2026 Котик в мире арифметики</p>
        </footer>
        <Mascot />
      </div>
    </ThemeProvider>
  );
}