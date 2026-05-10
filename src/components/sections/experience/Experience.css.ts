import { globalStyle, style } from "@vanilla-extract/css";
import { colors, radii, spacing, typography } from "../../../ui/tokens/theme";

export const experienceSection = style({
  padding: `${spacing[8]} ${spacing[4]}`,
  maxWidth: "1440px",
  margin: "0 auto",
});

export const experienceHeader = style({
  marginBottom: spacing[7],
});

export const eyebrow = style({
  margin: 0,
  color: colors.accent.highlight,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
  letterSpacing: 0,
});

export const sectionHeading = style({
  margin: 0,
  fontSize: typography.fontSize.xxxl,
  lineHeight: 1,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
      lineHeight: typography.lineHeight.heading,
    },
  },
});

export const experienceGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: spacing[4],
});

export const experienceCard = style({
  display: "grid",
  gridTemplateColumns: "minmax(260px, 0.9fr) minmax(190px, 0.45fr) minmax(0, 1.05fr)",
  gap: spacing[5],
  alignItems: "start",
  minHeight: "100%",
  padding: spacing[5],
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  "@media": {
    "(max-width: 920px)": {
      gridTemplateColumns: "1fr",
      gap: spacing[4],
    },
  },
});

globalStyle(`${experienceCard} h3`, {
  margin: `${spacing[2]} 0 ${spacing[1]}`,
  fontSize: typography.fontSize.xl,
});

globalStyle(`${experienceCard} p`, {
  margin: 0,
  color: colors.text.muted,
  lineHeight: typography.lineHeight.body,
});

export const experienceMeta = style({
  fontSize: typography.fontSize.sm,
});

export const roleSummary = style({
  marginTop: `${spacing[3]} !important`,
  maxWidth: "520px",
  fontSize: `${typography.fontSize.md} !important`,
});

export const impactLabel = style({
  margin: `0 0 ${spacing[2]} !important`,
  color: `${colors.accent.highlight} !important`,
  fontSize: `${typography.fontSize.xs} !important`,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
});

export const experienceStack = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[2],
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const experienceStackItem = style({
  color: colors.text.primary,
  backgroundColor: colors.background.surfaceAlt,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.sm,
  padding: `${spacing[1]} ${spacing[2]}`,
  fontSize: typography.fontSize.xs,
});

export const highlightList = style({
  display: "grid",
  gap: spacing[2],
  margin: 0,
  paddingLeft: spacing[5],
  color: colors.text.muted,
  lineHeight: typography.lineHeight.body,
  fontSize: typography.fontSize.sm,
});
