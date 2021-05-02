module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:json/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/comma-spacing': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/method-signature-style': 0,
    '@typescript-eslint/array-type': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/export': 0,
    'eol-last': 0,
    semi: [2, 'never']
  },
  env: {
    node: true,
    commonjs: true
  }
}