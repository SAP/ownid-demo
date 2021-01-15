module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'eslint-comments', 'jest', 'promise', 'unicorn', 'prettier'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    project: [
      'tsconfig.json',
      './projects/demo-app/tsconfig.app.json',
      './projects/demo-app/tsconfig.spec.json',
      './projects/demo-screens-app/tsconfig.app.json',
      './projects/demo-screens-app/tsconfig.spec.json',
    ],
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'jest/no-standalone-expect': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'unicorn/no-null': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },

      // use <root>/path/to/folder/tsconfig.json
      typescript: {
        project: ['./projects/demo-app/tsconfig.app.json', './projects/demo-screens-app/tsconfig.app.json'],
      },
    },
  },
};
