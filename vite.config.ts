// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from '@nabla/vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // 1. 使用 shouldLint 函数进行更灵活的文件筛选
      // 只检查 src 目录下的 .ts, .js, .vue 文件
      // 可以根据需要自由调整这个匹配逻辑
      shouldLint: (path) => {
        return /\/src\/.*\.(ts|js|vue)$/.test(path);
      },

      // 2. 所有原生的 ESLint 配置项，都放在 eslintOptions 里
      eslintOptions: {
        cache: true, // 开启缓存，提高性能
        fix: false // 是否自动修复 (默认 false)
      }
    })
  ]
});
