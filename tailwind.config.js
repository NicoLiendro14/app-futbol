/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          700: '#1e3a8a',
          800: '#112240',
          900: '#0a192f',
        },
        cyan: {
          400: '#64ffda',
        },
        purple: {
          600: '#6b46c1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};