/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: () => ({
        "primary-1": {
            DEFAULT: "#FFC93E",
        },
        "primary-2": {
            DEFAULT: "#725114",
        },
        "primary-3": {
            DEFAULT: "#111D5E",
        },
    }),
    screens: {
        "3xl": { min: "1730px" },
        "2xl": { min: "1535px" },
        xl: { min: "1279px" },
        lg: { min: "1023px" },
        md: { min: "767px" },
        sm: { min: "576px" },
        xs: { min: "425px" },
    },
    },
  },
  plugins: [],
}