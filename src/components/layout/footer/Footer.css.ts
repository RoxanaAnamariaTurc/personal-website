import { style } from "@vanilla-extract/css";
import { colors, radii, spacing, typography } from "../../../ui/tokens/theme";

export const footer = style({
  display: "grid",
  gap: spacing[5],
  maxWidth: "1440px",
  margin: "0 auto",
  padding: `${spacing[8]} ${spacing[4]} ${spacing[6]}`,
  borderTop: `1px solid ${colors.border.subtle}`,
});

export const footerTitle = style({
  maxWidth: "780px",
  margin: `${spacing[2]} 0 ${spacing[3]}`,
  fontSize: typography.fontSize.xxxl,
  lineHeight: 1,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
    },
  },
});

export const footerCopy = style({
  maxWidth: "720px",
  margin: 0,
  color: colors.text.muted,
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.body,
});

export const footerMeta = style({
  margin: 0,
  color: colors.accent.highlight,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
});

export const footerActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[3],
});

export const footerLink = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: `${spacing[2]} ${spacing[4]}`,
  color: colors.text.primary,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.full,
  textDecoration: "none",
  fontWeight: typography.fontWeight.bold,
  ":hover": {
    color: colors.background.body,
    backgroundColor: colors.accent.highlight,
  },
});
