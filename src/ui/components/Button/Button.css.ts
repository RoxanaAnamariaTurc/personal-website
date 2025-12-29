import { style, styleVariants } from "@vanilla-extract/css";
import { colors, radii, spacing, typography } from "../../tokens/theme";

export const base = style({
  padding: `${spacing[2]} ${spacing[4]}`,
  borderRadius: radii.sm,
  border: "none",
  cursor: "pointer",
  fontWeight: typography.fontWeight.medium,
});

export const variants = styleVariants({
  primary: {
    backgroundColor: colors.accent.primary,
    color: colors.text.primary,
    ":hover": {
      backgroundColor: colors.background.surface,
    },
  },
  secondary: {
    backgroundColor: colors.background.surface,
    color: colors.text.primary,
    border: `1px solid ${colors.border.subtle}`,
    ":hover": {
      backgroundColor: colors.background.surfaceAlt,
    },
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.accent.primary,
    border: "none",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.04)",
    },
  },
});

export const sizes = styleVariants({
  sm: {
    padding: `${spacing[1]} ${spacing[3]}`,
    fontSize: typography.fontSize.sm,
  },
  md: {
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: typography.fontSize.md,
  },
  lg: {
    padding: `${spacing[3]} ${spacing[5]}`,
    fontSize: typography.fontSize.lg,
  },
});
