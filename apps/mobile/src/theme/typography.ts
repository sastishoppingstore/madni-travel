import { TextStyle } from 'react-native';

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const FontWeight: Record<string, TextStyle['fontWeight']> = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const LineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const FontFamily = {
  inter: 'Inter',
  interBold: 'Inter_700Bold',
  interExtraBold: 'Inter_800ExtraBold',
  interSemiBold: 'Inter_600SemiBold',
  playfairItalic: 'PlayfairDisplay_400Regular_Italic',
} as const;
