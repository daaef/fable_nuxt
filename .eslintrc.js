module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'prettier',
    'prettier/vue',
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
}
