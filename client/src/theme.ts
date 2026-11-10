/**
 * HYDRELEX LIFT SYSTEMS — Design System Tokens (Vivid Visual Upgrade)
 *
 * Visual Direction: Architectural Luxury + Heavy Industrial Engineering
 * Palette: Ink-950, Graphite-900, Graphite-700, Brushed Steel-300/100,
 * Warm Architectural Ivory-50/100, Forged Copper-500/400/700, and Ember Glow.
 */

export const theme = {
  colors: {
    // Page black & dark surfaces
    ink: {
      950: '#0A0A0B', // Pure page black
      900: '#0E0E0F',
    },
    graphite: {
      900: '#141416', // Primary dark card/section surface
      800: '#1C1C1E',
      700: '#26262A', // Elevated surface, cards, panels
      600: '#3A3A3D',
    },
    // Brushed metallic mid-tones
    steel: {
      300: '#C9CDD2', // Brushed steel, secondary text & hairline borders on dark
      200: '#D8DBDF',
      100: '#E9EBEE', // Bright brushed metallic highlight
    },
    // Warm light architectural surfaces
    ivory: {
      50: '#FBF8F2',  // Crisp ivory panel & card background
      100: '#F2ECE0', // Warm architectural ivory, light sections
    },
    // Primary Vivid Forged Copper Accent
    copper: {
      400: '#FF934A', // Hover/glow state
      500: '#E8782E', // PRIMARY ACCENT: bright forged copper/amber; CTAs, key words, lines, numerals
      600: '#CC6320',
      700: '#B4531A', // Accent text on ivory (passes WCAG AA contrast)
    },
    // Glows and highlights
    ember: {
      glow: 'rgba(232, 120, 46, 0.35)',
      subtle: 'rgba(232, 120, 46, 0.15)',
    },
    // Accessible error red
    danger: {
      500: '#C0463C',
    },

    // Backwards-compatible aliases
    silver: {
      400: '#C9CDD2',
    },
    champagne: {
      500: '#E8782E',
      600: '#B4531A',
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
