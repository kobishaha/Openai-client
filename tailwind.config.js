/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fuchsia': {
          '50': '#fdf4ff',
          '100': '#fae8ff',
          '200': '#f5d0fe',
          '300': '#f0abfc',
          '400': '#e879f9',
          '500': '#d946ef',
          '600': '#c026d3',
          '700': '#a21caf',
          '800': '#86198f',
          '900': '#701a75',
          '950': '#4a044e',
        },
        'gray': {
          '900': '#1e1e1e',
          '800': '#222222',
          '700': '#333333',
        },
      },
      boxShadow: {
        'neon': '0 0 10px rgba(232, 121, 249, 0.5), 0 0 20px rgba(217, 70, 239, 0.3)',
        'neon-hover': '0 0 15px rgba(232, 121, 249, 0.7), 0 0 30px rgba(217, 70, 239, 0.5)',
      },
    },
  },
  plugins: [],
}