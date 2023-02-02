/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'city-bg': "url('./src/bg-city.jpg')",
    },
  },
  plugins: [],
}