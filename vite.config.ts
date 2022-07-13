import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: '0.0.0.0',
    port: 4000, // 你需要定义的端口号
    open: true, // open支持boolean/string类型，为true时打开默认浏览器，为string类型时，打开指定浏览器，具体查看官网即可
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
