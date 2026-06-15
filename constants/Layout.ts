export const Breakpoints = {
  tablet: 768,
  desktop: 1024,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const MaxContentWidth = 1400;

export const Fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semibold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  extrabold: 'Inter-ExtraBold',
  displayRegular: 'SpaceGrotesk-Regular',
  displayMedium: 'SpaceGrotesk-Medium',
  displaySemibold: 'SpaceGrotesk-SemiBold',
  displayBold: 'SpaceGrotesk-Bold',
} as const;
