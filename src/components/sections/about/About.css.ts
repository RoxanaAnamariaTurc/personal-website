import { style } from "@vanilla-extract/css";
import { colors, layout, spacing, typography } from "../../../ui/tokens/theme";

export const aboutSection = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: layout.section.md,
  clipPath: "polygon(0 50%, 100% 0, 100% 70%, 0 70%)",
  padding: spacing[4],
  backgroundColor: colors.background.surface,
  "@media": {
    "(max-width: 768px)": {
      minHeight: "auto",
      clipPath: "none",
      padding: `${spacing[7]} ${spacing[4]}`,
    },
  },
});

export const aboutTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "center",
  position: "relative",
  padding: spacing[4],
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
