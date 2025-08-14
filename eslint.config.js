import jsdoc from "eslint-plugin-jsdoc";
import eslintjs from "@eslint/js";
import globals from "globals";

const {configs: eslintConfigs} = eslintjs;

export default [
  jsdoc.configs["flat/recommended"],
  eslintConfigs["recommended"],
  {
    languageOptions: {
      globals: {
        console: false,
        ...globals.browser, // EventTarget, Event
        ...globals.nodeBuiltin,
      }
    },
    rules: {
      "no-var": "error",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],
      "no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }]
    },
  },
];
