import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["node_modules/"],
  },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
      "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
