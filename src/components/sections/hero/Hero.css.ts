import { globalStyle, style } from "@vanilla-extract/css";
import { spacing, radii, typography, colors } from "../../../ui/tokens/theme";

export const section = style({
  display: "grid",
  gridTemplateColumns: "minmax(260px, 0.8fr) minmax(0, 1.2fr)",
  gap: spacing[7],
  alignItems: "center",
  maxWidth: "1440px",
  minHeight: "calc(100vh - 92px)",
  margin: "0 auto",
  padding: `${spacing[7]} ${spacing[4]} ${spacing[6]}`,
  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr",
      minHeight: "auto",
      padding: `${spacing[6]} ${spacing[4]}`,
      gap: spacing[5],
    },
  },
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});

export const headingText = style({
  margin: `${spacing[2]} 0 ${spacing[3]}`,
  fontSize: "clamp(3rem, 8vw, 7rem)",
  lineHeight: 0.92,
  maxWidth: "760px",
  "@media": {
    "(max-width: 768px)": {
      lineHeight: 1,
    },
  },
});

export const role = style({
  margin: 0,
  color: colors.accent.highlight,
  fontSize: typography.fontSize.md,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
  letterSpacing: 0,
});

export const intro = style({
  maxWidth: "720px",
  margin: 0,
  color: colors.text.primary,
  fontSize: typography.fontSize.xl,
  lineHeight: 1.45,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.lg,
    },
  },
});

export const location = style({
  margin: `${spacing[3]} 0 0`,
  color: colors.text.muted,
  fontSize: typography.fontSize.md,
});

export const introGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: spacing[3],
  width: "100%",
  maxWidth: "780px",
  marginTop: spacing[5],
  "@media": {
    "(max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const introCard = style({
  padding: spacing[3],
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  backgroundColor: "rgba(255,255,255,0.035)",
});

globalStyle(`${introCard} h2`, {
  margin: `0 0 ${spacing[1]}`,
  fontSize: typography.fontSize.md,
});

globalStyle(`${introCard} p`, {
  margin: 0,
  color: colors.text.muted,
  fontSize: typography.fontSize.sm,
  lineHeight: typography.lineHeight.body,
});

export const imageWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "42% 58% 48% 52% / 48% 38% 62% 52%",
  overflow: "hidden",
  border: `1px solid rgba(84, 242, 199, 0.28)`,
  backgroundColor: colors.background.surface,
  boxShadow:
    "0 24px 80px rgba(0, 0, 0, 0.38), inset 0 0 46px rgba(84, 242, 199, 0.12)",
  transform: "rotate(-1.5deg)",
  "::before": {
    content: '""',
    position: "absolute",
    inset: "14px",
    zIndex: 2,
    borderRadius: "48% 52% 56% 44% / 42% 54% 46% 58%",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    pointerEvents: "none",
  },
  "@media": {
    "(max-width: 768px)": {
      maxWidth: "420px",
      margin: "0 auto",
      transform: "rotate(-1deg)",
    },
  },
});

export const imagePicture = style({
  display: "block",
  width: "100%",
});

export const img = style({
  width: "100%",
  height: "auto",
  display: "block",
  transform: "rotate(1.5deg) scale(1.08)",
});
export const imageOverlay = style({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  background:
    "radial-gradient(circle at 34% 22%, rgba(255,255,255,0.08), transparent 30%), linear-gradient(180deg, rgba(12,15,18,0.28), rgba(12,15,18,0.68))",
  pointerEvents: "none",
  width: "100%",
});

export const badgesWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[2],
  justifyContent: "flex-start",
  marginTop: spacing[5],
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: spacing[1],
  padding: `${spacing[1]} ${spacing[3]}`,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  color: colors.accent.highlight,
  backgroundColor: colors.background.surfaceAlt,
  border: "none",
  borderRadius: radii.md,
  whiteSpace: "nowrap",
});

export const heroActions = style({
  display: "flex",
  gap: spacing[3],
  flexWrap: "wrap",
  marginTop: spacing[5],
});

export const primaryLink = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: `${spacing[2]} ${spacing[5]}`,
  color: colors.background.body,
  backgroundColor: colors.accent.highlight,
  borderRadius: radii.sm,
  textDecoration: "none",
  fontWeight: typography.fontWeight.bold,
});

export const secondaryLink = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "44px",
  padding: `${spacing[2]} ${spacing[5]}`,
  color: colors.text.primary,
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.sm,
  textDecoration: "none",
  fontWeight: typography.fontWeight.bold,
});
