import { style } from "@vanilla-extract/css";
import { colors, typography, spacing } from "../../../ui/tokens/theme";

export const talksSection = style({
  display: "flex",
  flexDirection: "column",
  padding: `${spacing[8]} ${spacing[4]}`,
  alignItems: "center",
  gap: spacing[7],
});

export const talksTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "center",
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
    },
  },
  "::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: colors.accent.highlight,
    margin: `${spacing[4]} auto 0`,
    borderRadius: "2px",
  },
});

export const talksDiv = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: spacing[6],
  width: "100%",
  maxWidth: "1200px",
  justifyItems: "start",
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
      justifyItems: "center",
    },
  },
});
