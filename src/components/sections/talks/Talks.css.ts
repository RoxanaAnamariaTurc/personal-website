import { style } from "@vanilla-extract/css";
import { colors, typography, spacing } from "../../../ui/tokens/theme";

export const talksSection = style({
  display: "flex",
  flexDirection: "column",
  padding: `${spacing[8]} 0`,
  alignItems: "center",
  gap: spacing[7],
});

export const talksTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "center",
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: spacing[7],
  flexWrap: "wrap",
});
