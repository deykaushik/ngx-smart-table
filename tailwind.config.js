/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        "brown-pro": ['"Brown-Pro"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
