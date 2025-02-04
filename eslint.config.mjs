import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
      "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
    },
    ignores: [".node_modules/*"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
