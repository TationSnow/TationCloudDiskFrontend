// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  // 1. 忽略不需要检查的文件/目录
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '*.config.js'
    ]
  },

  // 2. 基础 JavaScript/TypeScript 配置
  ...tseslint.configs.recommended, // TypeScript 推荐配置
  js.configs.recommended, // JavaScript 推荐配置

  // 3. Vue 文件配置
  ...pluginVue.configs['flat/recommended'], // Vue 推荐配置

  // 4. 针对 .vue 文件的 TypeScript 配置覆盖
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },

  // 5. 全局环境变量配置
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // 6. 自定义规则（可根据项目需求调整）
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      'vue/multi-word-component-names': 'off'
    }
  },

  // 7. 集成 Prettier（关键！）
  eslintConfigPrettier, // 关闭 ESLint 中与 Prettier 冲突的规则
  eslintPluginPrettier // 让 Prettier 作为 ESLint 规则运行
];
