import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      common: path.resolve(__dirname, './style/common.ts'),
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BASE_URL,
        changeOrigin: true,
        cors: true, // cors 허용
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react(), svgr()],
  build: { chunkSizeWarningLimit: 1600 },
});
