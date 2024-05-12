/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "dark-1": "#000000", //bg-color
        "dark-2": "#09090A", //input-box color
        "dark-3": "#101012", //unknown
        "dark-4": "#1F1F22", //unknown
        "light-1": "#FFFFFF", //bg-color(light mode)
        "light-2": "#EFEFEF", //input-box color(light mode)
        "light-3": "#7878A3", //unknown
        "light-4": "#5C5C78", //unknown
        red: "#FF5A5A", //error-color
        "input-bg-light": "#F0F0F0",
        "primary-500": "#877EFF",
        "primary-600": "#5D5FEF",
        "secondary-500": "#FFB620",
        "off-white": "#D0DFFF",
      },

      fontFamily: { ubuntu: ["Ubuntu", "sans-serif"] },

      screens: {
        tablet: "425px", //tablet
        laptop: "768px", //laptop
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
