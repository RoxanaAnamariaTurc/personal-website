import { globalStyle, style } from "@vanilla-extract/css";
import { colors, radii, spacing, typography } from "../../../ui/tokens/theme";

export const writingSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing[5],
  padding: `${spacing[8]} ${spacing[4]}`,
  backgroundColor: colors.background.surface,
});

export const sectionIntro = style({
  display: "grid",
  gap: spacing[2],
  width: "100%",
  maxWidth: "1440px",
});

globalStyle(`${sectionIntro} p`, {
  margin: 0,
  color: colors.accent.highlight,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
});

export const sectionTitle = style({
  maxWidth: "760px",
  margin: 0,
  color: colors.text.primary,
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  lineHeight: 1,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
      lineHeight: typography.lineHeight.heading,
    },
  },
});

export const writingGrid = style({
  display: "grid",
  gap: spacing[5],
  width: "100%",
  maxWidth: "1440px",
});

export const postCard = style({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: "minmax(280px, 0.9fr) minmax(0, 1.1fr)",
  overflow: "hidden",
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.lg,
  backgroundColor: colors.background.body,
  "@media": {
    "(max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const postImage = style({
  width: "100%",
  height: "auto",
  minHeight: "420px",
  aspectRatio: "4 / 3",
  display: "block",
  objectFit: "cover",
  objectPosition: "center top",
  backgroundColor: colors.background.surfaceAlt,
  "@media": {
    "(max-width: 900px)": {
      minHeight: "260px",
      aspectRatio: "16 / 10",
    },
  },
});

export const postContent = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[4],
  padding: spacing[6],
  "@media": {
    "(max-width: 640px)": {
      padding: spacing[4],
    },
  },
});

export const postHeader = style({
  display: "flex",
  justifyContent: "space-between",
  gap: spacing[3],
  color: colors.text.muted,
  fontSize: typography.fontSize.sm,
  "@media": {
    "(max-width: 520px)": {
      flexDirection: "column",
    },
  },
});

globalStyle(`${postHeader} p`, {
  margin: 0,
  color: colors.accent.highlight,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
});

globalStyle(`${postCard} h3`, {
  margin: 0,
  maxWidth: "760px",
  color: colors.text.primary,
  fontSize: typography.fontSize.xxl,
  lineHeight: typography.lineHeight.heading,
});

export const postSummary = style({
  margin: 0,
  maxWidth: "760px",
  color: colors.text.muted,
  fontSize: typography.fontSize.lg,
  lineHeight: typography.lineHeight.body,
});

export const postTags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[2],
  margin: 0,
  padding: 0,
  listStyle: "none",
});

globalStyle(`${postTags} li`, {
  padding: `${spacing[1]} ${spacing[2]}`,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.sm,
  color: colors.accent.highlight,
  backgroundColor: `${colors.accent.highlight}12`,
  fontSize: typography.fontSize.sm,
});

export const detailPanel = style({
  marginTop: spacing[2],
});

globalStyle(`${detailPanel} summary`, {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "44px",
  padding: `${spacing[2]} ${spacing[4]}`,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.sm,
  color: colors.text.primary,
  cursor: "pointer",
});

globalStyle(`${detailPanel} summary:focus-visible`, {
  outline: `2px solid ${colors.accent.highlight}`,
  outlineOffset: "3px",
});

globalStyle(`${detailPanel} summary span:last-child`, {
  display: "none",
});

globalStyle(`${detailPanel}[open] summary span:first-child`, {
  display: "none",
});

globalStyle(`${detailPanel}[open] summary span:last-child`, {
  display: "inline",
});

export const articleGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: spacing[5],
  marginTop: spacing[5],
  paddingTop: spacing[5],
  borderTop: `1px solid ${colors.border.subtle}`,
});

export const articleBody = style({
  color: colors.text.muted,
  lineHeight: typography.lineHeight.body,
});

export const articleFigure = style({
  display: "grid",
  gap: spacing[2],
  margin: `${spacing[4]} 0`,
});

globalStyle(`${articleFigure} img`, {
  width: "100%",
  display: "block",
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  backgroundColor: colors.background.surfaceAlt,
});

globalStyle(`${articleFigure} figcaption`, {
  color: colors.text.muted,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.body,
});

globalStyle(`${articleBody} p`, {
  margin: `0 0 ${spacing[4]}`,
});

globalStyle(`${articleBody} code`, {
  padding: `${spacing[1]} ${spacing[2]}`,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.sm,
  color: colors.text.primary,
  backgroundColor: "rgba(255,255,255,0.06)",
  overflowWrap: "anywhere",
});

globalStyle(`${articleBody} a`, {
  color: colors.accent.highlight,
  textDecorationColor: `${colors.accent.highlight}80`,
  textUnderlineOffset: "3px",
});

globalStyle(`${articleBody} h4`, {
  margin: `${spacing[5]} 0 ${spacing[3]}`,
  color: colors.text.primary,
  fontSize: typography.fontSize.lg,
});

globalStyle(`${articleBody} ul`, {
  margin: 0,
  paddingLeft: spacing[5],
});

export const stepList = style({
  display: "grid",
  gap: spacing[2],
  margin: 0,
  paddingLeft: spacing[5],
});

export const articleHero = style({
  display: "grid",
  gap: spacing[3],
  alignContent: "start",
});

export const screenshotStack = style({
  display: "grid",
  gap: spacing[3],
});

globalStyle(`${articleHero} img`, {
  width: "100%",
  display: "block",
  borderRadius: radii.md,
  border: `1px solid ${colors.border.subtle}`,
});

export const dashboardPlaceholder = style({
  display: "grid",
  gap: spacing[2],
  minHeight: "220px",
  alignContent: "center",
  padding: spacing[4],
  border: `1px dashed ${colors.border.subtle}`,
  borderRadius: radii.md,
  backgroundColor: "rgba(255,255,255,0.035)",
  textAlign: "center",
});

globalStyle(`${dashboardPlaceholder} p`, {
  margin: 0,
  color: colors.text.primary,
  fontWeight: typography.fontWeight.bold,
});

globalStyle(`${dashboardPlaceholder} span`, {
  color: colors.text.muted,
});

export const metaList = style({
  display: "grid",
  gap: spacing[2],
  margin: 0,
  paddingLeft: spacing[5],
  color: colors.text.muted,
  fontSize: typography.fontSize.sm,
});
