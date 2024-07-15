const alias = require("./alias.cjs");

module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // Disable React import requirement
    "plugin:jsx-a11y/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
      alias: {
        map: alias.aliasArray,
      },
    },
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "alias.cjs",
    "postcss.config.js",
    "stylelint.config.js",
    "tailwind.config.js",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: { jsx: true },
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["import", "react", "react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@typescript-eslint/consistent-type-definitions": "off",

    // Disable ForOfStatement rule, since that disallows for of loops.
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],

    // Allow underscore in front of variables
    "no-underscore-dangle": "off",

    // Ignore unused variables with an underscore in front
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],

    // Ignore error due to react-hook-form handleSubmit
    // Resolution based on: https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { attributes: false } },
    ],

    // Allow passing functions as props (without having to memoize)
    "react/jsx-no-bind": ["error", { allowFunctions: true }],
    // Allow prop spreading on input elements when using react-hook-form
    "react/jsx-props-no-spreading": ["error", { exceptions: ["input"] }],
    // defaultProps not required when using TypeScript
    "react/require-default-props": "off",

    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          // Enforce unidirectional codebase
          // e.g. src/features is not allowed to imports from src/pages
          {
            target: ["./src/features", "./src/layouts"],
            from: "./src/pages",
          },

          {
            target: [
              "./src/components",
              "./src/contexts",
              "./src/data",
              "./src/hooks",
              "./src/schemas",
              "./src/services",
              "./src/utils",
            ],
            from: ["./src/features", "./src/pages", "./src/layouts"],
          },
        ],
      },
    ],
  },
};
