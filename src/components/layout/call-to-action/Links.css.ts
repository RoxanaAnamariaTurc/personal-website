import { style } from "@vanilla-extract/css";
import { colors, radii, spacing, typography } from "../../../ui/tokens/theme";

export const links = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  padding: spacing[3],
  backgroundColor: "rgba(12, 15, 18, 0.86)",
  backdropFilter: "blur(16px)",
  borderTop: `1px solid ${colors.border.subtle}`,
  borderBottom: `1px solid ${colors.border.subtle}`,
});

export const nav = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: spacing[2],
  flexWrap: "wrap",
  maxWidth: "1440px",
  margin: "0 auto",
});

export const link = style({
  color: colors.text.primary,
  textDecoration: "none",
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.full,
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
  "@media": {
    "(max-width: 768px)": {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.xs,
    },
  },

  selectors: {
    "&:hover": {
      color: "black",
      backgroundColor: colors.accent.highlight,
      transform: "translateY(2px)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
  },
});
