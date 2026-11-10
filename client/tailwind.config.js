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
          900: '#0E0E0F',
        },
        graphite: {
          800: '#1C1C1E',
          600: '#3A3A3D',
        },
        silver: {
          400: '#B8BBBE',
        },
        ivory: {
          100: '#F4EFE6',
          50: '#FAF7F1',
        },
        champagne: {
          500: '#B08D57',
          600: '#8F7144',
        },
        danger: {
          500: '#C0463C',
        },
        // Direct theme tokens mapped for easy access
        'arch-ink': '#0E0E0F',
        'arch-graphite': '#1C1C1E',
        'arch-graphite-light': '#3A3A3D',
        'arch-silver': '#B8BBBE',
        'arch-ivory': '#F4EFE6',
        'arch-ivory-light': '#FAF7F1',
        'arch-champagne': '#B08D57',
        'arch-champagne-dark': '#8F7144',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'technical': '0.14em',
        'architectural': '0.08em',
      },
      backgroundImage: {
        'technical-grid': 'linear-gradient(to right, rgba(176, 141, 87, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(176, 141, 87, 0.05) 1px, transparent 1px)',
        'technical-grid-light': 'linear-gradient(to right, rgba(28, 28, 30, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(28, 28, 30, 0.035) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
