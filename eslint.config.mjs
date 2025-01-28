// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: "@babel/eslint-parser",
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Disable specific rules
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",

      // Adjust @typescript-eslint/ban-ts-comment to allow @ts-ignore
      // "@typescript-eslint/ban-ts-comment": [
      //   "error",
      //   {
      //     "ts-ignore": false, // Allow @ts-ignore
      //     "ts-expect-error": true, // Allow @ts-expect-error
      //   },
      // ],
    },
  },
];
