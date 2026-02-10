import { style } from "@vanilla-extract/css";
import { spacing, typography, colors, radii } from "../../../ui/tokens/theme";

export const projectsWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing[7],
  padding: `${spacing[8]} ${spacing[4]}`,
});

export const sectionTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "center",
  position: "relative",
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

export const projectsSection = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: spacing[6],
  justifyItems: "center",
  width: "100%",
  maxWidth: "1200px",
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const searchInput = style({
  width: "400px",
  border: `1px solid ${colors.border.subtle}`,
  height: "44px",
  backgroundColor: "transparent",
  borderRadius: radii.sm,
  padding: `0 ${spacing[3]}`,
  fontSize: typography.fontSize.md,
  color: colors.text.primary,
  "@media": {
    "(max-width: 640px)": {
      width: "100%",
    },
  },
});
