import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Color Shades Generator: https://mdigi.tools/color-shades
      colors: {
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        accentPink: {
          50: "var(--acc-pink-50)",
          100: "var(--acc-pink-100)",
          200: "var(--acc-pink-200)",
          300: "var(--acc-pink-300)",
          400: "var(--acc-pink-400)",
          500: "var(--acc-pink-500)",
          600: "var(--acc-pink-600)",
          700: "var(--acc-pink-700)",
          800: "var(--acc-pink-800)",
          900: "var(--acc-pink-900)",
        },
        accentYellow: {
          50: "var(--acc-yellow-50)",
          100: "var(--acc-yellow-100)",
          200: "var(--acc-yellow-200)",
          300: "var(--acc-yellow-300)",
          400: "var(--acc-yellow-400)",
          500: "var(--acc-yellow-500)",
          600: "var(--acc-yellow-600)",
          700: "var(--acc-yellow-700)",
          800: "var(--acc-yellow-800)",
          900: "var(--acc-yellow-900)",
        },
        "fire-orange": "var(--fire-orange)",
        "fire-red": "var(--fire-red)",
        "link-color": "var(--link-color)",
        "link-color-hover": "var(--link-color-hover)",
        black: "oklch(13% 0 0) / <alpha-value>)",
      },

      fontFamily: {
        chocolateWithBrownie: ["chocolateWithBrownie", "serif"],
        noticia: ["Noticia Text", "serif"],
      },

      dropShadow: {
        logo: "0 0 2rem theme(colors.accentPink.500)",
      },

      spacing: {
        "2px": "2px",
        "4px": "4px",
        "6px": "6px",
        "8px": "8px",
        "10px": "10px",
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "28px": "28px",
        "32px": "32px",
        "36px": "36px",
        "40px": "40px",
        "44px": "44px",
        "48px": "48px",
        "56px": "56px",
        "64px": "64px",
        "80px": "80px",
        "96px": "96px",
        "card-tb": "var(--card-top-bottom)",
        "card-lr": "var(--card-left-right)",
      },
    },

    /**
     * Default tailwind values converted from rem to px:
     * */
    borderRadius: {
      none: "0px",
      sm: "2px",
      DEFAULT: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
      "2xl": "16px",
      "3xl": "24px",
      full: "999px",
    },
  },
  plugins: [],
};
