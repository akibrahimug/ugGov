export const colour = {
  // Flag palette
  black: '#0A0A0B',
  blackSoft: '#16161A',
  white: '#FFFFFF',

  flagYellow: '#FCDC04',
  flagYellowDeep: '#C9A800',
  flagYellowSoft: '#FFF5B5',

  flagRed: '#D90000',
  flagRedDeep: '#8B0000',
  flagRedSoft: '#FFE5E5',

  gold: '#A16207',
  crimson: '#B91C1C',

  // Links
  link: '#B91C1C',
  linkHover: '#8B0000',

  // Greyscale (neutrals)
  ink900: '#0A0A0B',
  ink800: '#18181B',
  ink700: '#27272A',
  ink600: '#3F3F46',
  ink500: '#52525B',
  ink400: '#71717A',
  ink300: '#A1A1AA',
  ink200: '#D4D4D8',
  ink100: '#E4E4E7',
  ink50: '#F4F4F5',
  ink25: '#FAFAFA',

  // Semantic
  success: '#A16207',
  warning: '#C9A800',
  error: '#D90000',
  info: '#27272A',
} as const;

export const typography = {
  fontFamilyBase:
    '"Inter", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, system-ui, -apple-system, sans-serif',
  fontFamilyDisplay:
    '"Inter", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',
  fontFamilyMono: '"JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace',
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, black: 800 },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    '2xl': '1.75rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
    '5xl': '4rem',
    '6xl': '5.5rem',
    '7xl': '7rem',
  },
  lineHeight: { tight: 1.05, snug: 1.15, normal: 1.5, relaxed: 1.65 },
  tracking: {
    tight: '-0.03em',
    snug: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.08em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
} as const;

export const radius = {
  none: '0',
  sm: '6px',
  base: '10px',
  md: '14px',
  lg: '20px',
  xl: '28px',
  '2xl': '36px',
  '3xl': '48px',
  full: '9999px',
} as const;

export const shadow = {
  xs: '0 1px 2px rgba(9, 9, 11, 0.04)',
  sm: '0 2px 6px rgba(9, 9, 11, 0.05), 0 1px 2px rgba(9, 9, 11, 0.04)',
  base: '0 6px 16px rgba(9, 9, 11, 0.06), 0 2px 4px rgba(9, 9, 11, 0.04)',
  md: '0 14px 28px rgba(9, 9, 11, 0.08), 0 4px 8px rgba(9, 9, 11, 0.05)',
  lg: '0 24px 48px rgba(9, 9, 11, 0.10), 0 8px 16px rgba(9, 9, 11, 0.06)',
  xl: '0 40px 80px rgba(9, 9, 11, 0.14), 0 14px 28px rgba(9, 9, 11, 0.08)',
  focus: '0 0 0 3px #FCDC04, 0 0 0 5px #0A0A0B',
} as const;

export const motion = {
  fast: '160ms',
  base: '240ms',
  slow: '400ms',
  slower: '640ms',
  spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const breakpoint = {
  sm: '480px',
  md: '640px',
  lg: '900px',
  xl: '1200px',
  '2xl': '1440px',
} as const;

export const maxWidth = {
  content: '1040px',
  wide: '1280px',
  max: '1440px',
  prose: '42rem',
} as const;

export type Colour = keyof typeof colour;
export type SpacingToken = keyof typeof spacing;
