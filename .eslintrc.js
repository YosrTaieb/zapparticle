module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parserOptions: {
    ecmaVersion: 2020, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'prettier/prettier': [1, {}, { usePrettierrc: true }], // Use our .prettierrc file as source
    'react/function-component-definition': [
      0,
      { namedComponents: 'function-declaration' },
    ],
    'react/jsx-filename-extension': 'error',
    'react/prop-types': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'eslint-disable-next-line react/react-in-jsx-scope': 0,
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/alt-text': 1,
    'jsx-a11y/label-has-associated-control': 0,
  },
};
