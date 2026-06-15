import { Platform, ViewStyle } from 'react-native';

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
  xxl: 28,
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

/**
 * Elevation tokens. On web these resolve to layered box-shadows for real depth;
 * on native they map to the standard shadow* props.
 */
function makeShadow(y: number, blur: number, opacity: number, color = '0,0,0'): ViewStyle {
  if (Platform.OS === 'web') {
    return {
      // @ts-expect-error web-only boxShadow string
      boxShadow: `0 ${y}px ${blur}px rgba(${color}, ${opacity})`,
    };
  }
  return {
    shadowColor: `rgb(${color})`,
    shadowOffset: { width: 0, height: y },
    shadowRadius: blur,
    shadowOpacity: opacity,
    elevation: Math.round(blur / 2),
  };
}

export const Shadow = {
  card: makeShadow(8, 24, 0.35),
  raised: makeShadow(16, 40, 0.45),
  brand: makeShadow(10, 30, 0.45, '249,115,22'),
} as const;
