import { style } from "@vanilla-extract/css";
import { layout, spacing, radii, typography } from "../../../ui/tokens/theme";

export const section = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  height: layout.section.lg,
  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
  overflow: "hidden",
  padding: spacing[4],
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const headingText = style({
  fontSize: typography.fontSize.xxxl,
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
