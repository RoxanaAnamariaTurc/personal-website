import { style } from "@vanilla-extract/css";
import {
  colors,
  radii,
  shadows,
  spacing,
  typography,
} from "../../ui/tokens/theme";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: spacing[4],
  background: "rgba(12, 15, 18, 0.64)",
});

export const panel = style({
  width: "min(720px, 100%)",
  padding: spacing[5],
  color: colors.text.primary,
  backgroundColor: colors.background.surface,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.lg,
  boxShadow: shadows.xl,
});

export const titleRow = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: spacing[4],
});

export const title = style({
  fontSize: typography.fontSize.xl,
  lineHeight: typography.lineHeight.heading,
});

export const copy = style({
  margin: `${spacing[3]} 0 0`,
  color: colors.text.muted,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.body,
});

export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[3],
  marginTop: spacing[5],
});

const actionBase = style({
  minHeight: "44px",
  padding: `${spacing[2]} ${spacing[4]}`,
  borderRadius: radii.full,
  cursor: "pointer",
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  transition: "background-color 150ms ease, color 150ms ease",
  selectors: {
    "&:focus-visible": {
      outline: `3px solid ${colors.accent.highlight}`,
      outlineOffset: "3px",
    },
  },
});

export const acceptButton = style([
  actionBase,
  {
    color: colors.background.body,
    backgroundColor: colors.accent.highlight,
    border: `1px solid ${colors.accent.highlight}`,
    ":hover": {
      backgroundColor: colors.text.primary,
      borderColor: colors.text.primary,
    },
  },
]);

export const declineButton = style([
  actionBase,
  {
    color: colors.text.primary,
    backgroundColor: "transparent",
    border: `1px solid ${colors.text.muted}`,
    ":hover": {
      backgroundColor: colors.background.surfaceAlt,
    },
  },
]);

export const closeButton = style({
  flexShrink: 0,
  width: "44px",
  height: "44px",
  color: colors.text.primary,
  background: "transparent",
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.full,
  cursor: "pointer",
  fontSize: typography.fontSize.lg,
  selectors: {
    "&:focus-visible": {
      outline: `3px solid ${colors.accent.highlight}`,
      outlineOffset: "3px",
    },
  },
});
