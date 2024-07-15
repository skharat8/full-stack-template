module.exports = {
  root: true,
  env: { node: true, es2022: true },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  ignorePatterns: [".eslintrc.cjs", "backend/dist", "prettier.config.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["import", "@typescript-eslint"],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-console": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],

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

    // Allow modification of function parameter properties.
    "no-param-reassign": "off",
  },
};
