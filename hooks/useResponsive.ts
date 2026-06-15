import { useWindowDimensions } from 'react-native';
import { Breakpoints } from '@/constants/Layout';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export function useResponsive(): {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
} {
  const { width, height } = useWindowDimensions();

  const isMobile = width < Breakpoints.tablet;
  const isTablet = width >= Breakpoints.tablet && width < Breakpoints.desktop;
  const isDesktop = width >= Breakpoints.desktop;

  const breakpoint: Breakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  return { breakpoint, isMobile, isTablet, isDesktop, width, height };
}
