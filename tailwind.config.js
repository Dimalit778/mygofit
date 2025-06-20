/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#1A1A1A',
        surface: '#242424',
        textPrimary: '#F7F7F7',
        textSecondary: '#A0A0A0',
        border: '#333333',
        primary: '#8AB4F8',
        // primary: '#5523EB',
        // background: '#181818',
        // card: '#444444 ',
        // text: '#F7F7F7',
        // aOrange: '#FF5722 ',
        // aYellow: '#FFEB3B',
      },
    },
  },
  plugins: [],
};
