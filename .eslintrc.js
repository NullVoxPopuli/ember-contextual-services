'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended', // removes redundant warnings between TS & ESLint
        'plugin:@typescript-eslint/recommended', // rules specific to typescript, e.g., writing interfaces
      ],
      rules: {
        // eslint
        'prefer-const': 'off',

        // typescript
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
      },
      overrides: [
        // tricky files
        {
          files: ['addon/decorators.ts'],
          rules: {
            '@typescript-eslint/ban-ts-ignore': 'off',
          },
        },
      ],
    },
  ],
};
