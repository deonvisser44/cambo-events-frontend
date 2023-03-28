const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#7336ED',
      },
      fontFamily: {
        mono: ['var(--font-montserrat)', ...fontFamily.mono],
      },
    },
  },
  plugins: [require('tailwindcss-aria-attributes')],
};
