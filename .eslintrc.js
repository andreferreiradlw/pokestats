module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript', 'prettier'],
  env: {
    jest: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ['better-styled-components', 'prettier'],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    'better-styled-components/sort-declarations-alphabetically': 2,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
