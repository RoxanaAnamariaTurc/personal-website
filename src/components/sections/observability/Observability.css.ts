import { globalStyle, style } from "@vanilla-extract/css";
import { colors, radii, spacing, typography } from "../../../ui/tokens/theme";

export const observabilitySection = style({
  padding: `${spacing[8]} ${spacing[4]}`,
  backgroundColor: colors.background.surface,
});

export const observabilityContent = style({
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: spacing[7],
  alignItems: "center",
  maxWidth: "1440px",
  margin: "0 auto",
  "@media": {
    "(max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const sectionHeading = style({
  margin: 0,
  maxWidth: "680px",
  fontSize: typography.fontSize.xxxl,
  lineHeight: 1,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
      lineHeight: typography.lineHeight.heading,
    },
  },
});

export const architecture = style({
  display: "grid",
  gap: spacing[3],
  padding: spacing[5],
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  backgroundColor: colors.background.body,
});

export const architectureStep = style({
  position: "relative",
  padding: `${spacing[3]} ${spacing[4]}`,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.sm,
  color: colors.text.primary,
  backgroundColor: colors.background.surfaceAlt,
  selectors: {
    "&:not(:last-child)::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      bottom: "-13px",
      width: "1px",
      height: "13px",
      backgroundColor: colors.accent.highlight,
    },
  },
});

export const communityGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: spacing[4],
  maxWidth: "1440px",
  margin: `${spacing[5]} auto 0`,
  "@media": {
    "(max-width: 760px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const observabilityCard = style({
  padding: spacing[5],
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  backgroundColor: colors.background.body,
});

globalStyle(`${observabilityCard} h3`, {
  margin: `0 0 ${spacing[3]}`,
  fontSize: typography.fontSize.xl,
});

export const communityList = style({
  display: "grid",
  gap: spacing[2],
  margin: 0,
  paddingLeft: spacing[5],
  color: colors.text.muted,
  lineHeight: typography.lineHeight.body,
});

export const skillGroup = style({
  padding: spacing[4],
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  backgroundColor: "rgba(255,255,255,0.035)",
});

globalStyle(`${skillGroup} h3`, {
  margin: `0 0 ${spacing[3]}`,
  fontSize: typography.fontSize.lg,
});

export const skillList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[2],
  listStyle: "none",
  margin: 0,
  padding: 0,
});

globalStyle(`${skillList} li`, {
  color: colors.accent.highlight,
  backgroundColor: `${colors.accent.highlight}12`,
  borderRadius: radii.sm,
  padding: `${spacing[1]} ${spacing[2]}`,
  fontSize: typography.fontSize.sm,
});
