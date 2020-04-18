module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier/@typescript-eslint",
    "plugin:react/recommended",
    "plugin:json/recommended",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  env: { browser: true, node: true, es6: true },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true
  },
  settings: {
    react: {
      createClass: "createReactClass",
      pragma: "React",
      version: "16.12"
    }
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array-simple"
      }
    ]
  }
};
