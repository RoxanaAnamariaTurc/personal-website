import { style } from "@vanilla-extract/css";
import {
  layout,
  spacing,
  radii,
  typography,
  colors,
} from "../../../ui/tokens/theme";

export const section = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  minHeight: layout.section.lg,
  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
  overflow: "hidden",
  padding: spacing[4],
  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr",
      minHeight: "auto",
      clipPath: "none",
      padding: `${spacing[6]} ${spacing[4]}`,
      gap: spacing[5],
    },
  },
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "-20px",
});

export const headingText = style({
  fontSize: typography.fontSize.xxxl,
  "@media": {
    "(max-width: 768px)": {
      fontSize: typography.fontSize.xxl,
    },
  },
});

export const imageWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: radii.lg,
  overflow: "hidden",
});

export const img = style({
  width: "100%",
  height: "auto",
  display: "block",
});
export const imageOverlay = style({
  position: "absolute",
  inset: 0,
  background: "rgba(0, 0, 0, 0.80)",
  pointerEvents: "none",
  width: "100%",
});

export const badgesWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: spacing[2],
  justifyContent: "center",
  marginTop: spacing[3],
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
