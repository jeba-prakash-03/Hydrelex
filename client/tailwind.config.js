/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0A0A0B',
          900: '#0E0E0F',
        },
        graphite: {
          900: '#141416',
          800: '#1C1C1E',
          700: '#26262A',
          600: '#3A3A3D',
        },
        steel: {
          300: '#C9CDD2',
          200: '#D8DBDF',
          100: '#E9EBEE',
        },
        ivory: {
          50: '#FBF8F2',
          100: '#F2ECE0',
        },
        copper: {
          400: '#FF934A',
          500: '#E8782E', // PRIMARY ACCENT
          600: '#CC6320',
          700: '#B4531A', // High-contrast on ivory
        },
        // Direct compatibility aliases
        champagne: {
          500: '#E8782E',
          600: '#B4531A',
        },
        silver: {
          400: '#C9CDD2',
        },
        danger: {
          500: '#C0463C',
        },
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'technical': '0.12em',
        'architectural': '0.08em',
      },
      boxShadow: {
        'copper-glow': '0 0 35px rgba(232, 120, 46, 0.35)',
        'copper-glow-sm': '0 0 15px rgba(232, 120, 46, 0.25)',
        'copper-glow-lg': '0 0 60px rgba(232, 120, 46, 0.45)',
        'elevated-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'technical-grid': 'linear-gradient(to right, rgba(232, 120, 46, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(232, 120, 46, 0.06) 1px, transparent 1px)',
        'technical-grid-light': 'linear-gradient(to right, rgba(20, 20, 22, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 20, 22, 0.04) 1px, transparent 1px)',
        'brushed-metal': 'linear-gradient(135deg, #E9EBEE 0%, #F2ECE0 100%)',
      },
    },
  },
  plugins: [],
}
