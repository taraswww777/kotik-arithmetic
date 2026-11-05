import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import styled from '@emotion/styled';

const CacheContainer = styled.div({});

// Эмуляция кэша для PWA (упрощённо)
const cacheLocation = () => null;

PWA.registerServiceWorker();
PWA.cacheStaticAssets();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheContainer>
      <App />
    </CacheContainer>
  </StrictMode>
);