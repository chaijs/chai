import jsdoc from "eslint-plugin-jsdoc";
import {configs as tseslintConfigs} from 'typescript-eslint';

export default [
  ...tseslintConfigs.recommended,
  jsdoc.configs["flat/recommended"],
  {
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
        "caughtErrorsIgnorePattern": "^_"
      }]
    },
  },
];
