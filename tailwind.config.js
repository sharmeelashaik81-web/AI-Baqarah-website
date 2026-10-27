/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        islamic: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        emerald: {
          850: '#044230',
          900: '#064e3b',
          950: '#022c22',
          975: '#011c16',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        darkbg: {
          DEFAULT: '#07130e',
          card: '#0c1e17',
          hover: '#112920',
          border: '#1b3b2f',
          elevated: '#143126',
        }
      },
      fontFamily: {
        arabic: ['"Amiri"', '"Scheherazade New"', '"Traditional Arabic"', 'serif'],
        scheherazade: ['"Scheherazade New"', '"Amiri"', 'serif'],
        kufi: ['"Reem Kufi"', '"Amiri"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Outfit"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'islamic-pattern': "radial-gradient(#10b981 0.75px, transparent 0.75px), radial-gradient(#10b981 0.75px, #07130e 0.75px)",
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
