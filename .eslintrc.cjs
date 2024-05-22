module.exports = {
  root: true,
  env: { browser: true, es2020: true },
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
  ignorePatterns: [".eslintrc.cjs"],
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
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],

    // Disable ForOfStatement rule, since that disallows for of loops.
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
  },
};
