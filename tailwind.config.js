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
          50: '#f0edff',
          100: '#e4ddff',
          200: '#cdc0ff',
          300: '#b19aff',
          400: '#9670ff',
          500: '#5B47E0',
          600: '#5239d1',
          700: '#472bb7',
          800: '#3c2394',
          900: '#331d78'
        },
        secondary: {
          50: '#f3f1ff',
          100: '#ebe6ff',
          200: '#d9d1ff',
          300: '#bfb0ff',
          400: '#a085ff',
          500: '#8B7FE8',
          600: '#7c6dd9',
          700: '#6b5ac5',
          800: '#594ba5',
          900: '#4a3f86'
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-out': 'slideOut 0.3s ease-in-out'
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(20px)', opacity: '0.5' }
        }
      }
    },
  },
  plugins: [],
}