/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic Surface Variables
        surface: {
          bg: 'var(--bg)',
          'bg-elevated': 'var(--bg-elevated)',
          fg: 'var(--fg)',
          muted: 'var(--fg-muted)',
          heading: 'var(--heading)',
          accent: 'var(--accent-text)',
          border: 'var(--border)',
        },
        // Color-Blocked Palette
        teal: {
          900: '#073842',
          700: '#0B4F5C',
          500: '#1C7C8C',
        },
        copper: {
          400: '#FF934A',
          500: '#E8782E',
          600: '#CC6320',
          700: '#9A3F0D',
        },
        amber: {
          300: '#FFD97A',
          500: '#F6B93B',
          600: '#D99B26',
        },
        sand: {
          100: '#F6E9D7',
          200: '#EFD9BC',
        },
        peach: {
          100: '#FFE3CF',
          200: '#FCD2B3',
        },
        mint: {
          100: '#D9EEE6',
          200: '#C2E5D8',
        },
        ink: {
          950: '#0A0A0B',
          900: '#0F1416',
          800: '#192024',
        },
        ivory: {
          50: '#FBF8F2',
          100: '#F2ECE0',
        },
        steel: {
          100: '#E9EBEE',
          300: '#C9CDD2',
        },
        danger: {
          500: '#C0463C',
        },
        // Compatibility aliases
        graphite: {
          900: '#0F1416',
          800: '#14181A',
          700: '#1E2529',
          600: '#3A4447',
        },
        champagne: {
          500: '#E8782E',
          600: '#B4531A',
        },
        silver: {
          400: '#C9CDD2',
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
        'amber-glow': '0 0 35px rgba(246, 185, 59, 0.4)',
        'teal-glow': '0 0 35px rgba(11, 79, 92, 0.45)',
        'elevated-card': '0 20px 40px -15px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'technical-grid': 'linear-gradient(to right, rgba(232, 120, 46, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(232, 120, 46, 0.08) 1px, transparent 1px)',
        'technical-grid-light': 'linear-gradient(to right, rgba(15, 20, 22, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 20, 22, 0.05) 1px, transparent 1px)',
        'brushed-metal': 'linear-gradient(135deg, #E9EBEE 0%, #F2ECE0 100%)',
      },
    },
  },
  plugins: [],
}
