module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:mocha/recommended'],
  plugins: ['mocha'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    // Add here all the extra rules based on the developer preferences
    camelcase: 'off',
  },
};
