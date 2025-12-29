import { style } from "@vanilla-extract/css";
import {
  colors,
  spacing,
  radii,
  shadows,
  cardSizes,
  typography,
  transitions,
} from "../../../../ui/tokens/theme";

export const projectCard = style({
  display: "flex",
  flexDirection: "column",
  width: cardSizes.md.width,
  backgroundColor: colors.background.surface,
  borderRadius: radii.lg,
  border: `1px solid ${colors.border.subtle}`,
  overflow: "hidden",
  boxShadow: shadows.md,
  transition: `transform ${transitions.normal}, box-shadow ${transitions.normal}, border-color ${transitions.normal}`,
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: shadows.glow,
    borderColor: colors.accent.highlight,
  },
});

export const imgCard = style({
  width: "100%",
  height: cardSizes.md.imageHeight,
  overflow: "hidden",
  backgroundColor: colors.background.surfaceAlt,
});

export const projectImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: `transform ${transitions.slow}`,
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
  padding: spacing[5],
});

export const projectTitle = style({
  fontSize: typography.fontSize.lg,
  fontWeight: typography.fontWeight.semiBold,
  color: colors.text.primary,
  margin: 0,
  lineHeight: typography.lineHeight.heading,
});

export const projectDescription = style({
  fontSize: typography.fontSize.sm,
  color: colors.text.muted,
  lineHeight: typography.lineHeight.body,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 3,
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
  gap: spacing[3],
  marginTop: spacing[2],
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
