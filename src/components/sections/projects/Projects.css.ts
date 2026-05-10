import { globalStyle, style } from "@vanilla-extract/css";
import { spacing, typography, colors, radii } from "../../../ui/tokens/theme";

export const projectsWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing[5],
  padding: `${spacing[8]} ${spacing[4]}`,
});

export const projectsIntro = style({
  display: "grid",
  gap: spacing[2],
  width: "100%",
  maxWidth: "1440px",
});

globalStyle(`${projectsIntro} p`, {
  margin: 0,
  color: colors.accent.highlight,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
});

export const sectionTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  maxWidth: "680px",
  margin: 0,
  lineHeight: 1,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
    },
  },
});

export const projectsSection = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: spacing[4],
  justifyItems: "stretch",
  width: "100%",
  maxWidth: "1440px",
  "@media": {
    "(max-width: 1050px)": {
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
