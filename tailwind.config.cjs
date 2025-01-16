const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Radikal", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        paper: "#f0f0df",
        "code-bg": "#2d2d2d",
      },
    },
  },
  plugins: [],
};
