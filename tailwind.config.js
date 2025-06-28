/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,tsx}',
    './src/components/**/*.{js,ts,tsx}',
    './src/screens/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#8AB4F8',
        secondary: '#f9c04a',
        background: '#1A1A1A',
        surface: '#242424',
        textPrimary: '#F7F7F7',
        textSecondary: '#A0A0A0',
        border: '#333333',
      },
    },
  },
  plugins: [],
};
