export const colors = {
  // Primary green
  primary: "#8BC34A",
  primaryDark: "#7CB342",
  primaryLight: "#9CCC65",

  // Neutral colors
  background: "#FFFFFF",
  surface: "#F5F5F5",
  surfaceVariant: "#E8E8E8",
  outline: "#999999",
  outlineLight: "#CCCCCC",

  // Text colors
  text: "#1A1A1A",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textOnPrimary: "#FFFFFF",

  // Semantic colors
  error: "#F44336",
  success: "#4CAF50",

  // Special
  transparent: "rgba(0, 0, 0, 0)",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
};

export const NAV_THEME = {
  light: {
    background: colors.background,
    border: colors.outlineLight,
    card: colors.surface,
    text: colors.text,
    primary: colors.primary,
  },
  dark: {
    background: "#000000",
    border: "#333333",
    card: "#121212",
    text: "#FFFFFF",
    primary: colors.primary,
  },
};
