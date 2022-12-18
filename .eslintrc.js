const DISABLED = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'espree',
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-unused-expressions': DISABLED,
    'vue/multi-word-component-names': DISABLED,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
};
