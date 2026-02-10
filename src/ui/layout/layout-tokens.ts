// Tokens compartidos para layout
export const layoutSpacing = {
  none: 0,
  "2xs": 1, // 4px
  xs: 2, // 8px
  sm: 3, // 12px
  md: 4, // 16px
  lg: 6, // 24px
  xl: 8, // 32px
  "2xl": 12, // 48px
} as const;

export type SpacingToken = keyof typeof layoutSpacing;
