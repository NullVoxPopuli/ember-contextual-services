module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['ember', 'prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
  },
  rules: {
    // eslint
    'prefer-const': 'off',

    // ember
    'ember/no-jquery': 'error',

    // typescript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',

    // prettier
    'prettier/prettier': 'error',
  },
  overrides: [
    // tricky files
    {
      files: ['addon/decorators.ts'],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
      },
    },
    // node files
    {
      files: [
        '.ember-cli.js',
        '.eslintrc.js',
        '.template-lintrc.js',
        '.prettierrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
        'tests/**/.ember-cli.js',
      ],
      excludedFiles: ['addon/**', 'addon-test-support/**', 'app/**', 'tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here

        // specifically for testem...
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      }),
    },
  ],
};
