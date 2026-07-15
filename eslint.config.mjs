import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
export default [
  { ignores: ['dist/**', 'node_modules/**', '.vscode-test/**', '.git/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
      globals: { console: 'readonly', document: 'readonly', window: 'readonly', crypto: 'readonly' },
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  prettier,
];
