/**
 * HYDRELEX LIFT SYSTEMS - Architectural Luxury Design Tokens
 * 
 * Philosophy: Architectural Editorial + Industrial Luxury + Modern Engineering
 * Core Palette: Warm Architectural Ivory, Deep Graphite, Obsidian Matte Black,
 * Brushed Metallic Silver, Restrained Champagne & Copper Accent.
 */

export const theme = {
  colors: {
    // Obsidian & Deep Dark Surfaces
    black: '#0C0D0E',
    graphite: '#18191B',
    charcoal: '#23252A',
    surfaceDark: '#131416',

    // Brushed Metallic & Slates
    steel: '#383B42',
    slate: '#747780',
    sand: '#C5C3BB',
    silver: '#DCD9D1',
    bone: '#EAE8E1',

    // Warm Architectural Ivory & Warm Neutrals
    ivory: '#F9F8F5',
    ivoryAlt: '#F3F0E9',
    ivoryCard: '#FFFFFF',
    ivoryBorder: '#E3DFD5',

    // Restrained Accents: Champagne & Architectural Copper
    champagne: '#C5A880',
    champagneLight: '#E3CCA8',
    champagneDark: '#997D56',
    copper: '#C67D5A',
    copperLight: '#E29774',
    copperDark: '#9C5837',
  },

  typography: {
    display: '"Syne", "Space Grotesk", sans-serif',
    sans: '"Plus Jakarta Sans", "Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },

  fluidHeading: {
    hero: 'clamp(2.75rem, 7vw, 6.5rem)',
    h1: 'clamp(2.25rem, 5vw, 4.25rem)',
    h2: 'clamp(1.75rem, 3.5vw, 3rem)',
    h3: 'clamp(1.25rem, 2.2vw, 1.85rem)',
  },

  layout: {
    fullWidthPadding: 'px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 2xl:px-36',
    gutterPadding: 'py-20 md:py-32',
  },

  transitions: {
    smooth: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    quick: { duration: 0.25, ease: 'easeOut' },
  },
};

