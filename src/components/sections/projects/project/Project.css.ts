import { style } from "@vanilla-extract/css";
import {
  colors,
  spacing,
  radii,
  shadows,
  typography,
  transitions,
} from "../../../../ui/tokens/theme";

export const projectCard = style({
  display: "grid",
  gridTemplateColumns: "minmax(170px, 0.85fr) minmax(0, 1.15fr)",
  width: "100%",
  height: "100%",
  backgroundColor: colors.background.surface,
  borderRadius: radii.md,
  border: `1px solid ${colors.border.subtle}`,
  overflow: "hidden",
  boxShadow: shadows.md,
  transition: `transform ${transitions.normal}, box-shadow ${transitions.normal}, border-color ${transitions.normal}`,
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: shadows.glow,
    borderColor: colors.accent.highlight,
  },
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const projectVisual = style({
  position: "relative",
  minHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg, rgba(84,242,199,0.18), rgba(143,92,255,0.16))",
});

export const imgCard = style({
  width: "100%",
  minHeight: "100%",
  aspectRatio: "4 / 3",
  overflow: "hidden",
  backgroundColor: colors.background.surfaceAlt,
  "@media": {
    "(max-width: 640px)": {
      minHeight: "220px",
      aspectRatio: "16 / 9",
    },
  },
});

export const fallbackVisual = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "260px",
  padding: spacing[4],
  textAlign: "center",
  color: colors.text.primary,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
});

export const projectImage = style({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  padding: spacing[3],
  transition: `transform ${transitions.slow}`,
  backgroundColor: colors.background.body,
  selectors: {
    [`${projectCard}:hover &`]: {
      transform: "scale(1.05)",
    },
  },
});

export const detailsCard = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[3],
  padding: spacing[4],
  flex: 1,
  minWidth: 0,
});

export const projectEyebrow = style({
  margin: 0,
  color: colors.accent.highlight,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  textTransform: "uppercase",
});

export const projectTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semiBold,
  color: colors.text.primary,
  margin: 0,
  lineHeight: typography.lineHeight.heading,
});

export const projectImpact = style({
  fontSize: typography.fontSize.sm,
  color: colors.text.primary,
  lineHeight: typography.lineHeight.body,
  margin: 0,
  paddingLeft: spacing[3],
  borderLeft: `3px solid ${colors.accent.highlight}`,
});

export const projectDescription = style({
  fontSize: typography.fontSize.sm,
  color: colors.text.muted,
  lineHeight: typography.lineHeight.body,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const techList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[2],
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const techTag = style({
  fontSize: typography.fontSize.xs,
  color: colors.accent.highlight,
  backgroundColor: `${colors.accent.highlight}15`,
  padding: `${spacing[1]} ${spacing[2]}`,
  borderRadius: radii.sm,
  fontWeight: typography.fontWeight.medium,
});

export const cardActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[3],
  marginTop: "auto",
  paddingTop: spacing[3],
});

export const actionButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: spacing[1],
  padding: `${spacing[2]} ${spacing[4]}`,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.medium,
  color: colors.text.primary,
  backgroundColor: "transparent",
  border: `1px solid ${colors.border.subtle}`,
  borderRadius: radii.md,
  cursor: "pointer",
  textDecoration: "none",
  transition: `all ${transitions.fast}`,
  ":hover": {
    borderColor: colors.accent.highlight,
    color: colors.accent.highlight,
    backgroundColor: `${colors.accent.highlight}10`,
  },
});

export const primaryButton = style({
  backgroundColor: colors.accent.highlight,
  color: colors.background.body,
  border: "none",
  ":hover": {
    backgroundColor: colors.accent.highlight,
    opacity: 0.9,
    color: colors.background.body,
  },
});
