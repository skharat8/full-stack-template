/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge",
  ],
  tailwindFunctions: ["clsx", "tw"], // For prettier-plugin-tailwindcss
  customFunctions: ["clsx", "tw"], // For prettier-plugin-classnames
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
  ],
};

export default config;
