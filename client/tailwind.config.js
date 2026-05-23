/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a8a',
          light: '#2563eb', // lighter blue
          dark: '#1e1b4b',
        },
        secondary: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
        },
        accent: {
          DEFAULT: '#3b82f6',
        },
        background: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
