import { style } from "@vanilla-extract/css";
import { colors, spacing, typography } from "../../../ui/tokens/theme";

export const links = style({
  padding: spacing[3],
});

export const nav = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: spacing[3],
});

export const link = style({
  color: colors.text.primary,
  textDecoration: "none",
  border: `1px solid ${colors.border.subtle}`,
  padding: `${spacing[4]} ${spacing[9]}`,
  fontSize: typography.fontSize.xl,
  transition: "transform 0.15s ease, box-shadow 0.15s ease",

  selectors: {
    "&:hover": {
      color: "black",
      backgroundColor: colors.accent.highlight,
      transform: "translateY(2px)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
  },
});
