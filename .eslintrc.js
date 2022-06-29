module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  rules: {
    // fix: use require in script/create-daily-record.js
    '@typescript-eslint/no-var-requires': 'off',
  },
};
