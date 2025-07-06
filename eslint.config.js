// @ts-check
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import pegasus from "eslint-config-pegasus";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      pegasus.configs.default,
      ...pegasus.configs.typescript,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/max-params": [
        "error",
        {
          max: 4,
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "tiptap",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "tiptap",
          style: "kebab-case",
        },
      ],
      'max-classes-per-file': [
        "error",
        {
          max: 3,
        },
      ]
    },
  },
  {
    files: ["projects/demo/**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      'no-console': "off",
      'no-confusing-arrow': "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: ["scripts/**/*.js"],
    extends: [
      pegasus.configs.default,
      pegasus.configs.node,
    ],
    rules: {},
  },
  {
    files: [
      "docs/**/*.ts",
      "docs/**/*.tsx"
    ],
    extends: [
      pegasus.configs.default,
      pegasus.configs.typescript,
      pegasus.configs.react,
    ],
  },
  {
    files: [
      "scripts/**/*.js"
    ],
    extends: [
      pegasus.configs.default,
      pegasus.configs.node,
      pegasus.configs.browser,
    ],
    rules: {
      "no-console": "off"
    }
  }
);
