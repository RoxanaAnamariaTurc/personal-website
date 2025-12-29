import { style } from "@vanilla-extract/css";
import { spacing, typography, colors } from "../../../ui/tokens/theme";

export const projectsWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: spacing[7],
  padding: `${spacing[8]} 0`,
});

export const sectionTitle = style({
  fontSize: typography.fontSize.xxxl,
  fontWeight: typography.fontWeight.bold,
  color: colors.text.primary,
  textAlign: "center",
  position: "relative",
  "::after": {
    content: '""',
    display: "block",
    width: "80px",
    height: "4px",
    backgroundColor: colors.accent.highlight,
    margin: `${spacing[4]} auto 0`,
    borderRadius: "2px",
  },
});

export const projectsSection = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: spacing[6],
  justifyItems: "center",
  width: "100%",
  maxWidth: "1200px",
});
