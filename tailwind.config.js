/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '18': '10rem',
      },
      maxHeight: {
        '150': '48rem',
        '155': '57.6rem',

      },
      height: {
        '145': '47.6rem',
        '150': '48rem',
        '155': '57.1rem',

      },
      borderRadius: {
        'large': '3rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}