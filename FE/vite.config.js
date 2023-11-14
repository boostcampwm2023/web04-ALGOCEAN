import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      common: path.resolve(__dirname, './style/common.ts'),
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src/'),
    },
  },
  plugins: [react()],
});
