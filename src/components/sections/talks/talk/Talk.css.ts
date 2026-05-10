import { globalStyle, style } from "@vanilla-extract/css";
import {
  colors,
  radii,
  shadows,
  transitions,
  spacing,
  typography,
} from "../../../../ui/tokens/theme";

export const talkArticle = style({
  display: "grid",
  gridTemplateColumns: "minmax(280px, 0.95fr) minmax(0, 1.05fr)",
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
    "(max-width: 760px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const talkMedia = style({
  minHeight: "100%",
  backgroundColor: colors.background.body,
});

export const talkVideo = style({
  width: "100%",
  height: "100%",
  minHeight: "260px",
  border: 0,
  display: "block",
  "@media": {
    "(max-width: 760px)": {
      aspectRatio: "16 / 9",
      minHeight: "auto",
    },
  },
});

export const talkContent = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: spacing[3],
  padding: spacing[5],
});

globalStyle(`${talkContent} h3`, {
  margin: 0,
  fontSize: typography.fontSize.xl,
  lineHeight: typography.lineHeight.heading,
});

export const talkParagraphs = style({
  margin: 0,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  color: colors.accent.highlight,
  textTransform: "uppercase",
});

export const talkMeta = style({
  display: "flex",
  alignItems: "center",
  gap: spacing[2],
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.muted,
});

export const dot = style({
  opacity: 0.7,
});
