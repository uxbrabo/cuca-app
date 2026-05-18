import { MD3LightTheme } from 'react-native-paper';

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

export const Colors = {
  // Brand
  primary: '#30628C',
  primaryLight: '#E8F1F8',
  primaryDark: '#1E4766',
  secondary: '#CDE5FF',
  accent: '#0052CC',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F7F9FF',
  surfaceTint: '#EEF4FB',

  // Text
  textPrimary: '#1A1C1E',
  textSecondary: '#44474F',
  textDisabled: '#9E9E9E',
  textHint: '#757575',
  textInverse: '#FFFFFF',

  // Semantic
  success: '#2E7D32',
  successLight: '#E8F5E9',
  error: '#C62828',
  errorLight: '#FFEBEE',
  warning: '#E65100',
  warningLight: '#FFF3E0',
  info: '#0277BD',
  infoLight: '#E1F5FE',

  // UI
  divider: '#E8ECEF',
  border: '#D0D7DE',
  overlay: 'rgba(0,0,0,0.5)',
  shadow: 'rgba(48, 98, 140, 0.12)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 100,
};

export const Typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 30 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 26 },
  h4: { fontSize: 16, fontWeight: '600' as const, lineHeight: 24 },
  body1: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  body2: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  label: { fontSize: 14, fontWeight: '500' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  overline: { fontSize: 11, fontWeight: '600' as const, lineHeight: 16, letterSpacing: 0.8 },
};

export const Shadows = {
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

// ─── REACT NATIVE PAPER THEME ────────────────────────────────────────────────

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    primaryContainer: Colors.primaryLight,
    secondary: Colors.secondary,
    secondaryContainer: Colors.secondary,
    background: Colors.background,
    surface: Colors.surface,
    surfaceVariant: Colors.surfaceVariant,
    onPrimary: Colors.white,
    onSecondary: Colors.textPrimary,
    onBackground: Colors.textPrimary,
    onSurface: Colors.textPrimary,
    onSurfaceVariant: Colors.textSecondary,
    outline: Colors.border,
    outlineVariant: Colors.divider,
    error: Colors.error,
    success: Colors.success,
    warning: Colors.warning,
    grey: Colors.textHint,
    // legacy custom
    screenBackground: Colors.surfaceVariant,
    brand: Colors.accent,
    footerText: Colors.textHint,
  },
  // legacy
  spacing: Spacing,
  fontSizes: { brand: 48, footer: 14 },
  logoSize: 150,
};
