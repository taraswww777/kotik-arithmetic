import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Котик в мире арифметики',
        short_name: 'Котик-Арифметика',
        description: 'Обучающая игра-кроссворд с арифметическими примерами для детей',
        theme_color: '#4CAF50',
        background_color: '#fafafa',
        display: 'standalone',
        scope: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[^/]+\/(favicon\.ico|apple-touch-icon\.png)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'icons-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
