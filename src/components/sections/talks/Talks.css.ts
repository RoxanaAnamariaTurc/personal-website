import { style } from "@vanilla-extract/css";
import { colors, typography, spacing } from "../../../ui/tokens/theme";

export const talksSection = style({
  display: "flex",
  flexDirection: "column",
  padding: `${spacing[8]} ${spacing[4]}`,
  alignItems: "center",
  gap: spacing[5],
});

export const talksTitle = style({
  width: "100%",
  maxWidth: "1440px",
  margin: 0,
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "left",
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
    },
  },
});

export const talksDiv = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: spacing[4],
  width: "100%",
  maxWidth: "1440px",
});
