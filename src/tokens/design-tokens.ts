/**
 * design-tokens.ts - Noah Dean Portfolio
 * Single source of truth for all design decisions.
 * Aesthetic: Refined Retro-Futuristic / Blade Runner 2049
 */

export const colors = {
  bg:            '#0a0d12',
  bgAlt:         '#0f1318',
  bgSurface:     '#141920',
  bgBorder:      '#1e2630',
  accent:        '#4ecdc4',
  accentDim:     '#2a8f88',
  accentGlow:    'rgba(78,205,196,0.15)',
  amber:         '#f0a500',
  amberDim:      '#a87300',
  amberGlow:     'rgba(240,165,0,0.12)',
  textPrimary:   '#e8edf2',
  textSecondary: '#8a9bb0',
  textMuted:     '#4a5568',
  textAccent:    '#4ecdc4',
  error:         '#e05c5c',
  success:       '#4ecdc4',
  white:         '#ffffff',
  black:         '#000000',
} as const

export type ColorKey = keyof typeof colors

export const fonts = {
  display: "'Orbitron', 'Exo 2', sans-serif",
  body:    "'DM Sans', 'Outfit', sans-serif",
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
} as const

export const fontSizes = {
  xs:    '0.75rem',
  sm:    '0.875rem',
  base:  '1rem',
  md:    '1.125rem',
  lg:    '1.25rem',
  xl:    '1.5rem',
  '2xl': '2rem',
  '3xl': '2.75rem',
  '4xl': '3.5rem',
  '5xl': '4.5rem',
  '6xl': '6rem',
} as const

export const spacing = {
  xs:    '0.25rem',
  sm:    '0.5rem',
  md:    '1rem',
  lg:    '1.5rem',
  xl:    '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
  '5xl': '8rem',
} as const

export const radii = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '20px',
  full: '9999px',
} as const

export const shadows = {
  accentGlow: '0 0 20px rgba(78,205,196,0.25), 0 0 60px rgba(78,205,196,0.08)',
  amberGlow:  '0 0 20px rgba(240,165,0,0.25), 0 0 60px rgba(240,165,0,0.08)',
  card:       '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset',
  subtle:     '0 2px 12px rgba(0,0,0,0.3)',
} as const

export const transitions = {
  fast:   '150ms ease',
  base:   '250ms ease',
  slow:   '450ms ease',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const breakpoints = {
  sm:    '640px',
  md:    '768px',
  lg:    '1024px',
  xl:    '1280px',
  '2xl': '1536px',
} as const

export const zIndex = {
  base:    0,
  raised:  10,
  overlay: 100,
  modal:   200,
  toast:   300,
} as const

const tokens = { colors, fonts, fontSizes, spacing, radii, shadows, transitions, breakpoints, zIndex }
export default tokens
