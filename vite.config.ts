import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        content_script: 'src/content_script.ts',
      },
      output: {
        entryFileNames: `[name].js`,
      },
    },
  },
});
