/**
 * HYDRELEX LIFT SYSTEMS — Design System Tokens (Color-Blocked System)
 *
 * Visual Direction: Architectural Luxury + Industrial Color Blocking
 * Palette:
 * - Deep Teal: #0B4F5C, dark #073842, light #1C7C8C
 * - Copper Orange: #E8782E, hover #FF934A, dark text-safe #B4531A
 * - Amber Gold: #F6B93B, soft #FFD97A
 * - Warm Sand: #F6E9D7, #EFD9BC
 * - Peach Tint: #FFE3CF
 * - Mint Tint: #D9EEE6
 * - Ink: #0F1416
 * - Ivory: #FBF8F2
 */

export const theme = {
  colors: {
    // Primary Brand: Deep Teal
    teal: {
      900: '#073842', // Dark teal
      700: '#0B4F5C', // Primary brand deep teal
      500: '#1C7C8C', // Light teal
    },
    // Action Accent: Copper Orange
    copper: {
      400: '#FF934A', // Hover/glow state
      500: '#E8782E', // Primary action accent: CTAs, active lines, numerals
      600: '#CC6320',
      700: '#B4531A', // Dark text-safe copper on sand/mint/ivory (AA contrast)
    },
    // Highlight Accent: Amber Gold
    amber: {
      300: '#FFD97A', // Soft amber
      500: '#F6B93B', // Highlight gold: stars, numerals, key words on teal
      600: '#D99B26',
    },
    // Light Surfaces & Warm Accents
    sand: {
      100: '#F6E9D7', // Primary warm sand surface
      200: '#EFD9BC', // Darker sand / border
    },
    peach: {
      100: '#FFE3CF', // Peach tint surface
      200: '#FCD2B3',
    },
    mint: {
      100: '#D9EEE6', // Mint tint surface
      200: '#C2E5D8',
    },
    // Dark & Deep Surfaces
    ink: {
      950: '#0A0A0B',
      900: '#0F1416', // Primary deep ink text and dark sections
      800: '#192024',
    },
    // Pure & Architectural Light Surfaces
    ivory: {
      50: '#FBF8F2',  // Crisp ivory
      100: '#F2ECE0',
    },
    // Metallic Accents
    steel: {
      100: '#E9EBEE',
      300: '#C9CDD2', // Brushed steel lines and diagrams
    },
    // Error & Status
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
