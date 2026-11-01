import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { createCache, cacheLocation } from '@emotion/cache';
import * as PWA from './services/pwa';

const cache = createCache({
  name: 'kotik-arithmetic',
  version: 1,
});

document.head.appendChild(cache.insertStyleElement(cacheLocation));

PWA.registerServiceWorker();
PWA.cacheStaticAssets();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);