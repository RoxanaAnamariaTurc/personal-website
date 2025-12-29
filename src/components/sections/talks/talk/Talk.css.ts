import { style } from "@vanilla-extract/css";
import {
  cardSizes,
  colors,
  radii,
  shadows,
  transitions,
  spacing,
  typography,
} from "../../../../ui/tokens/theme";

export const talkArticle = style({
  width: cardSizes.md.width,
  padding: `${spacing[4]} ${spacing[4]}`,
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

export const talkVideo = style({
  width: cardSizes.md.width,
});

export const talkParagraphs = style({
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  color: colors.accent.highlight,
});

export const talkMeta = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const dot = style({
  opacity: 0.7,
});
