/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arch: {
          black: '#0C0D0E',        // Obsidian matte black
          graphite: '#18191B',     // Deep graphite
          charcoal: '#23252A',     // Secondary deep architectural surface
          surfaceDark: '#131416',  // Pure dark surface
          steel: '#383B42',        // Muted metallic stroke
          slate: '#747780',        // Architectural slate text
          sand: '#C5C3BB',         // Warm sand text on dark
          silver: '#DCD9D1',       // Brushed metallic silver
          bone: '#EAE8E1',         // Off-white soft highlight
          ivory: '#F9F8F5',        // Warm architectural ivory (page bg)
          ivoryAlt: '#F3F0E9',     // Warm neutral secondary panel
          ivoryCard: '#FFFFFF',    // Crisp ivory card
          ivoryBorder: '#E3DFD5',  // Subtle architectural hairline
          champagne: '#C5A880',    // Restrained champagne gold accent
          champagneLight: '#E3CCA8',
          champagneDark: '#997D56',
          copper: '#C67D5A',       // Architectural copper accent
          copperLight: '#E29774',
          copperDark: '#9C5837',
        },
      },
      fontFamily: {
        heading: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.22em',
        'architectural': '0.15em',
      },
      backgroundImage: {
        'blueprint-grid': 'linear-gradient(to right, rgba(197, 168, 128, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(197, 168, 128, 0.08) 1px, transparent 1px)',
        'light-blueprint': 'linear-gradient(to right, rgba(24, 25, 27, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(24, 25, 27, 0.04) 1px, transparent 1px)',
        'architectural-gradient': 'linear-gradient(180deg, rgba(12, 13, 14, 0.95) 0%, rgba(24, 25, 27, 0.85) 50%, rgba(12, 13, 14, 0.95) 100%)',
      },
      boxShadow: {
        'architectural': '0 24px 48px -12px rgba(12, 13, 14, 0.08)',
        'architectural-dark': '0 32px 64px -16px rgba(0, 0, 0, 0.5)',
        'champagne-glow': '0 0 35px rgba(197, 168, 128, 0.22)',
      },
    },
  },
  plugins: [],
}
