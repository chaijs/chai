import jsdoc from "eslint-plugin-jsdoc";
import {configs as tseslintConfigs} from 'typescript-eslint';
import eslintjs from "@eslint/js";

const {configs: eslintConfigs} = eslintjs;

export default [
  jsdoc.configs["flat/recommended"],
  eslintConfigs["recommended"],
  ...tseslintConfigs.recommended,
  {
    languageOptions: {
      // if we ever use more globals than this, pull in the `globals` package
      globals: {
        console: false
      }
    },
    rules: {
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/tag-lines": ["error", "any", { startLines: 1 }],

      // temporary until we do a cleanup
      "no-var": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "prefer-rest-params": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
    },
  },
];
