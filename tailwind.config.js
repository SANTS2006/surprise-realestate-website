/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Logo blues (kept under the name "navy") —
        // this site is the public face of the same company.
        navy: {
          50: '#EAF3FC',
          100: '#CFE3F8',
          200: '#A2C8F0',
          300: '#6FA6E3',
          400: '#3F83D2',
          500: '#1F63B8',
          600: '#174F9A',
          700: '#123F7D',
          800: '#0D3166',
          900: '#08234A',
          950: '#041630',
        },
        // Logo green (kept under the name "gold") — used for
        // CTAs, price tags, and featured badges against the navy.
        gold: {
          50: '#E8F9F2',
          100: '#C6F0DE',
          200: '#92E3C0',
          300: '#5DD3A2',
          400: '#2FBF86',
          500: '#1A9E6C',
          600: '#137F57',
          700: '#0F6446',
          800: '#0C4D37',
          900: '#08382A',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(8,35,74,0.08), 0 8px 24px -8px rgba(8,35,74,0.12)',
        'card-hover': '0 8px 16px -4px rgba(8,35,74,0.12), 0 16px 40px -12px rgba(8,35,74,0.20)',
      },
    },
  },
  plugins: [],
}
