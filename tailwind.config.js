/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-1": "#000000", //bg-color
        "dark-2": "#09090A", //input-box color
        "dark-3": "#101012", //unknown
        "dark-4": "#1F1F22", //unknown
        "light-1": "#FFFFFF", //bg-color(light mode)
        "light-2": "#EFEFEF", //input-box color(light mode)
        "light-3": "#7878A3", //unknown
        "light-4": "5C5C78", //unknown
        red: "#FF5A5A", //error-color
      },

      screens: {
        xs: "480px",
      },

      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};
