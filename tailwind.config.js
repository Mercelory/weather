/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      'bg': "url('./src/bg.jpg')",
    },
    screens: {
      'sm': '300px',
      // => @media (max-width: 300px) { ... }

      'laptop': '1024px',
      // => @media (max-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (max-width: 1280px) { ... }
    },
  },
  plugins: [],
}