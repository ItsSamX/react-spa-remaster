export const Colors = {
  bg: '#070709',
  surface: 'rgba(255, 255, 255, 0.03)',
  surfaceHover: 'rgba(255, 255, 255, 0.06)',
  elevated: 'rgba(255, 255, 255, 0.05)',
  brand: '#f97316',
  brandDim: 'rgba(249, 115, 22, 0.12)',
  brandGlow: 'rgba(249, 115, 22, 0.25)',
  border: 'rgba(255, 255, 255, 0.06)',
  borderStrong: 'rgba(255, 255, 255, 0.10)',
  borderBrand: 'rgba(249, 115, 22, 0.3)',
  text: '#f8f8f8',
  textSecondary: 'rgba(255, 255, 255, 0.45)',
  textMuted: 'rgba(255, 255, 255, 0.22)',
  success: '#22c55e',
  info: '#3b82f6',
  purple: '#a855f7',
  biology: '#ec4899',
} as const;

export const SubjectColors = {
  Physics: Colors.info,
  Math: Colors.success,
  Chemistry: Colors.purple,
  Biology: Colors.biology,
  All: Colors.brand,
} as const;

export const SubjectGradients = {
  Physics: ['#0a1628', '#0d2440'],
  Math: ['#0a1f0d', '#0d2e15'],
  Chemistry: ['#1a0a2e', '#2a1045'],
  Biology: ['#2e0a1c', '#45102e'],
} as const;
