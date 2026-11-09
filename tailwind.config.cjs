/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effaf5',
          100: '#d9f2e5',
          500: '#22966a',
          600: '#187b56',
          700: '#146347',
          800: '#115039',
          900: '#103f31'
        }
      },
      boxShadow: {
        soft: '0 12px 35px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
};
