/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy anchor, shared with the tenant/staff portal's brand mark —
        // this site is the public face of the same company.
        navy: {
          50: '#EAF0F6',
          100: '#CBD9E8',
          200: '#9FB9D3',
          300: '#6E93B8',
          400: '#3F6D9C',
          500: '#204E7D',
          600: '#153A64',
          700: '#0F2C4E',
          800: '#0A1E38',
          900: '#061426',
          950: '#030B16',
        },
        // Warm gold accent — the "premium listing" color, used sparingly for
        // CTAs, price tags, and featured badges against the navy.
        gold: {
          50: '#FDF8EC',
          100: '#FAEDC9',
          200: '#F4D98D',
          300: '#EDC155',
          400: '#E3A82C',
          500: '#C88A1B',
          600: '#A06B15',
          700: '#7A5013',
          800: '#5A3B12',
          900: '#3D2810',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(10,30,56,0.08), 0 8px 24px -8px rgba(10,30,56,0.12)',
        'card-hover': '0 8px 16px -4px rgba(10,30,56,0.12), 0 16px 40px -12px rgba(10,30,56,0.20)',
      },
    },
  },
  plugins: [],
}
