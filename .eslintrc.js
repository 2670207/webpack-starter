module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  plugins: ["babel"],
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    "no-param-reassign": 0
  },
};
