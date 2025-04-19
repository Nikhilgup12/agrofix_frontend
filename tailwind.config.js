/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F8A10',
        'primary-dark': '#3D6A0D',
        secondary: '#FB8B24',
        'secondary-dark': '#E67D15',
      },
    },
  },
  plugins: [],
} 