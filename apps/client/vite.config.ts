import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': __dirname + '/src',
      'shared-config': '../../packages/shared/src/config/index.ts',
      'shared-crossword-generator': '../../packages/shared/src/crossword-generator/index.ts',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});