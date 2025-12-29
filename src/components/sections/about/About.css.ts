import { style } from "@vanilla-extract/css";
import { colors, layout, spacing, typography } from "../../../ui/tokens/theme";

export const aboutSection = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: layout.section.md,
  clipPath: "polygon(0 50%, 100% 0, 100% 70%, 0 70%)",
  padding: spacing[4],
  backgroundColor: colors.background.surface,
});

export const aboutTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "center",
  position: "relative",
  padding: spacing[4],
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
