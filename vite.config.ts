import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        content_script: 'src/content_script.ts',
      },
      output: {
        assetFileNames: '[name].[ext]',
        entryFileNames: '[name].js',
        manualChunks(id) {
          if (id.includes('globals.css')) {
            return 'kk_styles';
          }
        },
      },
    },
  },
});
