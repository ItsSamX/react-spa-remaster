export const Colors = {
  // Base surfaces
  bg: '#070708',
  bgElevated: '#0d0d11',
  surface: 'rgba(255, 255, 255, 0.035)',
  surfaceHover: 'rgba(255, 255, 255, 0.07)',
  surfaceStrong: 'rgba(255, 255, 255, 0.06)',
  elevated: 'rgba(255, 255, 255, 0.06)',
  inset: 'rgba(0, 0, 0, 0.25)',

  // Brand
  brand: '#f97316',
  brandBright: '#fb923c',
  brandDeep: '#ea580c',
  brandDim: 'rgba(249, 115, 22, 0.14)',
  brandGlow: 'rgba(249, 115, 22, 0.45)',
  brandText: '#ffedd5',

  // Borders
  border: 'rgba(255, 255, 255, 0.07)',
  borderStrong: 'rgba(255, 255, 255, 0.13)',
  borderBrand: 'rgba(249, 115, 22, 0.4)',
  highlight: 'rgba(255, 255, 255, 0.08)',

  // Text
  text: '#fafafa',
  textSecondary: 'rgba(255, 255, 255, 0.56)',
  textMuted: 'rgba(255, 255, 255, 0.32)',

  // Data / status
  success: '#22c55e',
  info: '#38bdf8',
  purple: '#a855f7',
  biology: '#ec4899',
  danger: '#f43f5e',
  warning: '#eab308',
} as const;

export const SubjectColors = {
  Physics: Colors.info,
  Math: Colors.success,
  Chemistry: Colors.purple,
  Biology: Colors.biology,
  All: Colors.brand,
} as const;

// Bolder, more saturated subject gradients for thumbnails / accents
export const SubjectGradients = {
  Physics: ['#0a1f44', '#1e4fa3'],
  Math: ['#0a2e16', '#1b7a3c'],
  Chemistry: ['#27114d', '#5b21b6'],
  Biology: ['#3d0f29', '#9d1457'],
  All: ['#3a1705', '#b8510f'],
} as const;

// Signature brand gradient used for hero / primary accents
export const BrandGradient = ['#fb923c', '#f97316', '#ea580c'] as const;

// Glow halo behind brand elements
export const BrandHalo = ['rgba(249, 115, 22, 0.30)', 'rgba(249, 115, 22, 0)'] as const;
