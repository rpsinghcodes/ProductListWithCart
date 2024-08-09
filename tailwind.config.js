/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rose50":"hsl(20, 50%, 98%)",
        "customRed":"hsl(14, 86%, 42%)",
        "customeGreen":"hsl(159, 69%, 38%)"
      },
      screens: {
        'mobile': {"max": "376px"}
      }
    },
    fontFamily: {
      redHot: ["Red Hat Text", "sans-serif"]
    }
  },
  plugins: [],
}