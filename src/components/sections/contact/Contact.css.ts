import { style } from "@vanilla-extract/css";
import { typography, colors, spacing } from "../../../ui/tokens/theme";

export const contactParagraphs = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.bold,
  color: colors.accent.highlight,
});
export const contactMeta = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  marginBottom: spacing[6],
  padding: spacing[4],
  flexWrap: "wrap",
});

export const dot = style({
  opacity: 0.7,
});

export const contactTitle = style({
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
