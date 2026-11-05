// Временно закомментировано для проверки сборки
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePWA } from 'vite-plugin-pwa';

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'prompt',
//       injectRegister: 'auto',
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
//       manifest: {
//         name: 'Котик в мире арифметики',
//         short_name: 'Котик-Арифметика',
//         description: 'Обучающая игра-кроссворд с арифметическими примерами для детей 5–9 лет',
//         theme_color: '#4CAF50',
//         background_color: '#fafafa',
//         display: 'standalone',
//         scope: '/',
//         start_url: '/',
//       },
//       workbox: {
//         globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
//         runtimeCaching: [
//           // Кэширование оболочки приложения (index.html, манифест)
//           {
//             urlPattern: /^https?:\/\/[^?]*\/(.*\.(html|json))$/,
//             handler: 'NetworkFirst',
//             options: {
//               cacheName: 'shell-cache',
//               expiration: {
//                 maxEntries: 10,
//                 maxAgeSeconds: 60 * 60 * 24 * 365,
//               },
//               cacheableResponse: {
//                 statuses: [0, 200],
//               },
//             },
//           },
//           // Кэширование контента кроссвордов (для офлайн режима)
//           {
//             urlPattern: /^https?:\/\/[^?]*\/(.*\.(js|css|png|svg|woff2))$/,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'content-cache',
//               expiration: {
//                 maxEntries: 30,
//                 maxAgeSeconds: 60 * 60 * 24 * 7, // 7 дней
//               },
//             },
//           },
//           // Кэширование иконок
//           {
//             urlPattern: /^https?:\/\/[^/]+\/(favicon\.ico|apple-touch-icon\.png)$/,
//             handler: 'CacheFirst',
//             options: {
//               cacheName: 'icons-cache',
//               expiration: {
//                 maxEntries: 10,
//                 maxAgeSeconds: 60 * 60 * 24 * 365,
//               },
//             },
//           },
//         ],
//       },
//     }),
//   ],
// });