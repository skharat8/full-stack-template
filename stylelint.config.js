/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  plugins: ["stylelint-gamut"],
  rules: {
    // Units
    "declaration-property-unit-allowed-list": {
      "/^font-size|^@media/": ["rem"],
      "/^border|^padding/": ["px"],
    },

    // Colors
    "color-named": "never",
    "color-no-hex": true,
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla", "hwb", "lch"],
    "alpha-value-notation": "number",
    "gamut/color-no-out-gamut-range": true,

    // Disabled Rules
    "hue-degree-notation": null,
    "selector-class-pattern": null,
    "custom-property-empty-line-before": null,
    "function-no-unknown": [true, { ignoreFunctions: "theme" }],
    "at-rule-no-unknown": [true, { ignoreAtRules: "tailwind" }],
  },
};
