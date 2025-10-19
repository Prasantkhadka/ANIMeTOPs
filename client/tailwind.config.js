/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./index.css"],
  theme: {
    extend: {
      colors: {
        primary: "#f4f4f4",
        primaryDeep: "#1b1b1726",
        secondary: "#777777",
        tertiary: "#272727",
        gray: { 30: "#7b7b7b", 50: "#585858" },
      },
      screens: {
        xs: "480px",
      },
      backgroundImage: {
        hero: "url(/src/assets/bg.jpg)",
      },
      fontFamily: {
        paci: ["Pacifico", "Cursive"],
      },
    },
  },
  plugins: [],
};
