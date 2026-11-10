/**
 * HYDRELEX LIFT SYSTEMS — Design System Tokens
 *
 * Visual Direction: Architectural Editorial + Industrial Luxury + Modern Engineering
 * Core Palette: Matte Obsidian Ink, Deep Graphite, Brushed Silver, Warm Architectural Ivory, Restrained Champagne
 */

export const theme = {
  colors: {
    // Dark surfaces
    ink: {
      900: '#0E0E0F', // Matte obsidian black
    },
    graphite: {
      800: '#1C1C1E', // Primary dark surface & solid nav on scroll
      600: '#3A3A3D', // Secondary dark surface, subtle borders & dark cards
    },
    // Metallic mid-tones
    silver: {
      400: '#B8BBBE', // Brushed metallic silver, secondary text & hairline borders on dark
    },
    // Warm light architectural surfaces
    ivory: {
      100: '#F4EFE6', // Warm architectural ivory, light sections
      50: '#FAF7F1',  // Crisp ivory panel & card background
    },
    // Restrained champagne accent
    champagne: {
      500: '#B08D57', // Primary accent: CTAs, active highlights, key lines
      600: '#8F7144', // Accent hover, high-contrast accent text on light ivory
    },
    // Accessible error red
    danger: {
      500: '#C0463C', // Clear readable error red on both dark and light backgrounds
    },
  },

  fonts: {
    heading: '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace',
  },

  fluid: {
    heroH1: 'clamp(3rem, 9vw, 9rem)',
    sectionH2: 'clamp(2rem, 5vw, 4.5rem)',
    sectionH3: 'clamp(1.25rem, 2.5vw, 2rem)',
    body: 'clamp(1rem, 1.1vw, 1.125rem)',
    paddingInline: 'clamp(1.25rem, 4vw, 4rem)',
  },

  transitions: {
    smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    quick: { duration: 0.25, ease: 'easeOut' },
  },
} as const;

export type Theme = typeof theme;
