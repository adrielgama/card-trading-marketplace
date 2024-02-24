/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'in-gold-200': '#FFD60A',
        'in-gold-300': '#FFC300',
        'in-gold-400': '#FF7B00',
        'in-gold-500': '#CCA000',
        'in-gold-800': '#A63C06',
        'in-green-50': '#ECFFF9',
        'in-green-100': '#009264',
        'in-green-300': '#386D52',
        'in-green-400': '#386D53',
        'in-green-500': '#244932',
        'in-green-600': '#2A493A',
        'in-green-800': '#30433D',
        'in-green-900': '#080D0C',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
