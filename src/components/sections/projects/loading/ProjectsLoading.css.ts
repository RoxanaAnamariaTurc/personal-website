import { style, keyframes } from "@vanilla-extract/css";
import {
  colors,
  radii,
  spacing,
  typography,
} from "../../../../ui/tokens/theme";

const fadeInUp = keyframes({
  "0%": { opacity: 0, transform: "translateY(20px) scale(0.95)" },
  "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
});

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200% 0" },
  "100%": { backgroundPosition: "200% 0" },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 0.4 },
  "50%": { opacity: 0.8 },
});

export const loadingWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: spacing[6],
  padding: `${spacing[8]} ${spacing[4]}`,
  minHeight: "60vh",
});

export const loadingText = style({
  fontSize: typography.fontSize.lg,
  color: colors.text.muted,
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const skeletonGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: spacing[6],
  width: "100%",
  maxWidth: "1200px",
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const skeletonCard = style({
  display: "flex",
  flexDirection: "column",
  gap: spacing[3],
  backgroundColor: colors.background.surface,
  borderRadius: radii.lg,
  border: `1px solid ${colors.border.subtle}`,
  padding: spacing[5],
  overflow: "hidden",
  animation: `${fadeInUp} 0.5s ease-out both`,
  selectors: {
    "&:nth-child(1)": { animationDelay: "0s" },
    "&:nth-child(2)": { animationDelay: "0.15s" },
    "&:nth-child(3)": { animationDelay: "0.3s" },
    "&:nth-child(4)": { animationDelay: "0.45s" },
    "&:nth-child(5)": { animationDelay: "0.6s" },
    "&:nth-child(6)": { animationDelay: "0.75s" },
  },
});

const shimmerBase = style({
  borderRadius: radii.sm,
  background: `linear-gradient(
    90deg,
    ${colors.background.surfaceAlt} 25%,
    ${colors.accent.primary} 50%,
    ${colors.background.surfaceAlt} 75%
  )`,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.8s ease-in-out infinite`,
});

export const skeletonImage = style([
  shimmerBase,
  {
    width: "100%",
    height: "140px",
    borderRadius: radii.md,
  },
]);

export const skeletonTitle = style([
  shimmerBase,
  {
    width: "60%",
    height: "20px",
    marginTop: spacing[2],
  },
]);

export const skeletonDescription = style([
  shimmerBase,
  {
    width: "90%",
    height: "14px",
  },
]);

export const skeletonDescriptionShort = style([
  shimmerBase,
  {
    width: "70%",
    height: "14px",
  },
]);

export const skeletonTags = style({
  display: "flex",
  gap: spacing[2],
  marginTop: spacing[2],
});

export const skeletonTag = style([
  shimmerBase,
  {
    width: "60px",
    height: "22px",
    borderRadius: radii.full,
  },
]);
