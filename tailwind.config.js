/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'clouds': "url('/src/bg.jpg') !important",
      }
    },
    screens: {
      'sm': '300px',
      // => @media (max-width: 300px) { ... }

      'md': '500px',
      // => @media (max-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (max-width: 1280px) { ... }
    },
  },
  plugins: [],
}